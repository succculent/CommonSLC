import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'

export default class scene6
{
    constructor( sizes, A )
    {
        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 0.5, 0.5, 0.5 );
        //create objects
        this.O = new Objects( );
        this.O.objects6( this.scene, sizes, A );
        //create camera
        this.C = new Camera( );
        this.C.createCamera2( sizes );
    }
    resize( sizes )
    {
        // Update camera
        this.C.resize( sizes );
        // Update uniforms
        this.O.resize2( sizes );
    }
    tick( deltaTime, elapsedTime, A )
    {
        // uniforms
        this.O.tick6( A, elapsedTime );
    }
};