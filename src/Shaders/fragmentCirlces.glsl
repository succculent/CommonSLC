uniform float uTime;
uniform float uResX;
uniform float uResY;
varying vec3 vPosition;

//snoise2

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise2(vec2 v){
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

void main()
{
  float scale = 0.5;
  float nTime = uTime * 0.5;
  float xy = snoise(vPosition.xy);
  float yz = snoise(vPosition.yz);
  float zx = snoise(vPosition.zx);
  float V = snoise2(vec2((xy + yz + zx) * scale * 2.0, cos(nTime)));
  float V1 = snoise2(1.2+(cos(0.25*nTime))*0.25* vec2((vPosition.x + vPosition.y + vPosition.z) * scale * 20.0, sin(nTime)));
  float V2 = snoise2(sin(nTime)*0.77*vec2(V1, sin(0.5*nTime)));
  float V3 = snoise2(sin(0.5*nTime)*30.9*vec2(V2, cos(0.2*nTime)));
  float V5 = snoise2(0.30*vec2(V3, sin(0.3*nTime)));
  float r = snoise2(vec2(vPosition.x + vPosition.y + vPosition.z, cos(nTime)));
  float g = snoise2(vec2(vPosition.x + vPosition.y + vPosition.z, cos(nTime + 0.1)));
  float b = snoise2(vec2(vPosition.x + vPosition.y + vPosition.z, cos(nTime + 0.2)));
  float a = snoise2(vec2(vPosition.x + vPosition.y + vPosition.z, sin(nTime)));
  vec4 color1 = vec4(V, V, V, min(V+0.3, 1.0));
  vec4 color2 = vec4(r, min(g+0.05, 1.0), b, min(a+0.1, 1.0));
  vec4 color3 = vec4(min(V5-0.2, 1.0), min(V5-0.2, 1.0), min(V5-0.2, 1.0), min(V5+0.4, 1.0));
  vec4 color = color1*0.45 + color2*0.05 + color3*0.50;
  gl_FragColor = color;
}