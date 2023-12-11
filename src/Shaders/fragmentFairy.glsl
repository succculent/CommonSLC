uniform float uTime;
uniform float uResX;
uniform float uResY;
uniform float uFFT[ 1020 ];

//snoise2

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main(){

    //constants

    vec2 st = gl_FragCoord.xy/vec2 ( uResX * 2.0 , uResY * 2.0 );
    vec2 center = st - vec2 ( 0.5, 0.5 );
    vec2 topR = st - vec2 ( 1.0, 1.0 );
    vec2 botL = st - vec2 ( 0.0, 0.0 );
    vec2 botR = st - vec2 ( 0.0, 1.0 );
    vec2 topL = st - vec2 ( 1.0, 0.0 );

    vec3 color1 = vec3 ( 1.0, 0.0, 0.5 ); //hot pink
    vec3 color2 = vec3 ( 1.0, 0.5, 0.5 ); //peach
    vec3 color3 = vec3 ( 1.0, 0.5, 0.2 ); //orange
    vec3 color4 = vec3 ( 1.0, 0.7, 0.8 ); //light pink
    vec3 color5 = vec3 ( 0.0, 0.4, 0.1 ); //forest green
    vec3 color6 = vec3 ( 0.0, 0.2, 0.5 ); //blue
    vec3 color7 = vec3 ( 0.0, 0.4, 0.0 ); //green
    
    float fft1 = cos ( uFFT[ 100 ] * 0.01 ) * 5.0;
    float fft2 = cos ( uFFT[ 200 ] * 0.1 ) * 0.3;
    float fft3 = cos ( uFFT[ 300 ] * 0.01 ) * 5.0;
    float fft4 = cos ( uFFT[ 400 ] * 0.01 ) * 5.0;
    float fft5 = cos ( uFFT[ 500 ] * 0.01 ) * 5.5;
    float fft6 = cos ( uFFT[ 600 ] * 0.01 ) * 5.5;
    float fft7 = uFFT[ 100 ];
    float fft8 = uFFT[ 250 ];
    float fft9 = cos ( uFFT[ 400 ] * 0.05 ) * 1.5;
    float fft10 = uFFT[ 550 ];
    float fft11 = uFFT[ 700 ];

    float t1 = cos ( uTime );
    float t2 = cos ( uTime * 0.1 );
    float t3 = cos ( uTime * 0.01 );
    float t4 = cos ( uTime * 0.1 ) + sin ( uTime * 0.2 );

    float noise1 = snoise ( vec2 ( fft7 * 0.1, uTime * 0.01 ) );
    float noise2 = snoise ( fft8 * cos ( fft8 * t3 ) * vec2 ( st.x, st.y ) );
    float noise3 = snoise ( vec2 ( noise1, noise2 ) );
    float noise4 = snoise ( vec2 ( noise3, st.x + st.y ) );
    float noise5 = snoise ( vec2 ( noise4, fft8 * 0.1 ) );
    float noise6 = snoise ( vec2 ( noise5, center.x + center.y ) );

    //color4

    float leafBase = 0.1;
    float leavesTop = cos ( atan ( topR.y / topR.x ) * fft7 );
    leavesTop *= cos ( atan ( center.y / center.x ) * fft8 );
    leavesTop *= cos ( atan ( botR.y / botR.x ) * fft10 );
    leavesTop *= cos ( atan ( topL.y / topL.x ) * fft11 );
    leavesTop *= cos ( t4 + atan ( botL.y / botL.x ) * fft5 );
    float leaves1 = leafBase + leavesTop;
    color4 *= smoothstep ( leaves1, leaves1 + fft2, length ( center ) );
    color1 *= smoothstep ( leaves1, leaves1 + fft2, length ( center ) );
    color7 *= smoothstep ( leaves1, leaves1 + 0.1 + fft2, length ( center ) );

    //color5

    color5.y *= noise6;
    color5.z *= noise6;

    //color6

    color6.y *= noise5;
    color6.z *= noise5;

    //final color

    vec3 colorNoise = color6 + color5;
    vec3 color = normalize ( exp2 ( colorNoise ) + exp2 ( color4 ) - color1 + color7 );
    // color = min( color, color7 );
    gl_FragColor = vec4( color, 1.0 );
}