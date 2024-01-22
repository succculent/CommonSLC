import * as THREE from 'three'

export default class Camera
{
    constructor( sizes )
    {
        this.camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
        this.camera.position.set( 0, 0, -1 );
        this.camera.lookAt( 0, 0, 0 );
    }
    resize( sizes ) {
        this.camera.aspect = sizes.width / sizes.height
        this.camera.updateProjectionMatrix()
    }
};