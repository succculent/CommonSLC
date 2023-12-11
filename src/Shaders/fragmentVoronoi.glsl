uniform float uTime;
uniform float uResX;
uniform float uResY;
uniform float uFFT[ 1020 ];

vec3 hash3( vec2 p )
{
    vec3 q = vec3( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)), 
				   dot(p,vec2(419.2,371.9)) );
	return fract(sin(q * uFFT[100] * 0.001)*43758.5453);
}

float voronoise( in vec2 p, float u, float v )
{
	float k = 1.0+63.0*pow(1.0-v,6.0);

    vec2 i = floor(p);
    vec2 f = fract(p);
    
	vec2 a = vec2(0.0,0.0);
    for( int y=-2; y<=2; y++ )
    for( int x=-2; x<=2; x++ )
    {
        vec2  g = vec2( x, y );
		vec3  o = hash3( i + g )*vec3(u,u,1.0);
		vec2  d = g - f + o.xy;
		float w = pow( 1.0-smoothstep(0.0,1.414,length(d)), k );
		a += vec2(o.z*w,w);
    }
	
    return a.x/a.y;
}

void main() {
    vec3 red = vec3(1.0, 1.0, 1.0);
    vec3 blue = vec3(0.0, 0.0, 1.0);
    vec2 uv = gl_FragCoord.xy / vec2(uResX, uResY);
    float one = uFFT[400];
    float two = cos(cos(uTime)) * uFFT[100];
	float f = voronoise( (10.0 + one * 0.01) * uv, two * 0.1, sin(cos(sin(uTime)) * uFFT[800] * 0.001));
    float f2 = voronoise( (3.0 * one * 0.01) * uv, two * 0.1, sin(cos(sin(uTime)) * uFFT[800] * 0.01));
    float f3 = voronoise( (40.0 * one * 0.1) * uv, two * 0.3, sin(cos(sin(uTime)) * uFFT[800] * 0.02));
    vec3 color = red;
    vec3 lerpVec = blue-red;
    lerpVec = lerpVec / length(lerpVec);
    color += lerpVec * (f + 0.1);
    color.g += f2;
    color.b += f3;
    color = color / length(color);
    gl_FragColor = vec4(color, 1.0);
}