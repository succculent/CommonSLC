#define _FFT 64.0
#define _PI 3.141592654

uniform float uTime;
uniform float uResX;
uniform float uResY;
uniform float uFFT[ 64 ];

vec2 rot(vec2 uv, float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * uv;
}

float sdTri(vec2 p, vec2 q) {
    p.x = abs(p.x);
    vec2 a = p - q * clamp(dot(p, q) / dot(q, q), 0.0, 1.0);
    vec2 b = p - q * vec2(clamp(p.x / q.x, 0.0, 1.0), 1.0);
    float s = -sign(q.y);
    vec2 d = min(vec2(dot(a, a), s * (p.x * q.y - p.y * q.x)),
                 vec2(dot(b, b), s * (p.y - q.y)));
    return -sqrt(d.x) * sign(d.y);
}

float sdBox(vec2 p, vec2 q) {
    p = abs(p) - q;
    return max(p.y, p.x);
}

float sdLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float xorOp(float a, float b, float c) {
    return min(max(a, -b), max(-a + c, b));
}

float rmod(float a, vec2 uv, float md, float amt) {
    return max(a, -abs(mod(atan(uv.y, uv.x), md * 3.14159265359) - md * 3.14159265359 * 0.5) + md * 3.14159265359 * amt);
}

void main() {
    vec2 iResolution = vec2( uResX, uResY );
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    uv *= 0.5;
    uv = rot(uv, -0.25 * _PI);
    vec3 col = vec3(0.0);
    float d = 10e6;
    vec2 A = vec2(0.04, 0.1);
    vec2 B = vec2(0.3, 0.3);
    vec2 offs = vec2(0.04, 0.0);
    d = min(d, sdLine(uv, A * 10.0, -B * 1.5) - 0.0);
    offs = vec2(-0.47, 0.0);
    d = min(d, sdLine(uv, A * 10.0 - offs, -B * 3.0 - offs) - 0.0);
    offs -= offs;
    A *= rot(vec2(1.0, 1.0), 0.75 * _PI);
    B *= rot(vec2(1.0, 1.0), 0.75 * _PI);
    offs -= vec2(0.1, 0.04);
    A *= rot(vec2(1.0, 1.0), 0.5 * _PI);
    B *= rot(vec2(1.0, 1.0), 0.5 * _PI);
    offs -= vec2(0.0, -0.08);
    offs = vec2(0.03, -0.01);
    vec2 p = vec2(-0.1, 0.0);
    d = xorOp(d, length(uv - vec2(0.1, 0.0)) - 0.15, 0.004);
    d = xorOp(d, length(uv - vec2(-0.2, 0.0)) - 0.2, 0.01);
    d = xorOp(d, sdBox(uv * rot(vec2(1.0, 1.0), 0.25 * _PI), vec2(0.3)), 0.01);
    col = mix(col, vec3(1.0), smoothstep(dFdx(uv.x) * 2.0, 0.0, d + dFdx(uv.x) * 0.0));
    float n = 0.0;
    n = min(n, 0.5);
    col = max(col, 0.002);

    if (col.x > 0.1) {
        col -= n * 1.7;
    } else {
        col += pow(n, 2.0) * 0.1;
    }
    col *= vec3(1.06, 0.98, 0.9);
    col = pow(col, vec3(0.4545));
    gl_FragColor = vec4(col, 1.0);
}
