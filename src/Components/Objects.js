import * as THREE from 'three'
import vertexFairy from '../shaders/vertexFairy.glsl'
import fragmentFairy from '../shaders/fragmentFairy.glsl'

export default class Objects
{
    constructor( scene, sizes, A ) 
    {
        var planeGeometry = new THREE.PlaneGeometry( sizes.width, sizes.height );
        this.planeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexFairy,
            fragmentShader: fragmentFairy,
            uniforms: {
                uTime: { value: 0.0 },
                uResY: { value: sizes.height },
                uResX: { value: sizes.width },
                uFFT: { type: "fv1",  value: A.data }
            },
        });
        this.planeMaterial.needsUpdate = true;
        this.planeMaterial.side = THREE.DoubleSide;
        this.plane = new THREE.Mesh( planeGeometry, this.planeMaterial );
        this.plane.lookAt( new THREE.Vector3( 0.0, 0.0, -1.0 ) );
        scene.add( this.plane );
    }
    resize( sizes ) {
        this.planeMaterial.uniforms.uResY.value = sizes.height;
        this.planeMaterial.uniforms.uResX.value = sizes.width;
    }
    tick( A, elapsedTime )
    {
        this.planeMaterial.uniforms.uTime.value = elapsedTime;
        this.planeMaterial.uniforms.uFFT.value = A.data;
    }
};