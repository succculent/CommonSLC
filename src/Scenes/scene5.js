import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'
import Lights from '../Components/Lights.js'

export default class scene3
{
    constructor( sizes, A )
    {
        //member variables

        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 0.5, 0.5, 0.5 );
        //create objects
        this.O = new Objects( );
        this.O.objects5( this.scene );
        //create camera
        this.C = new Camera( );
        this.C.createCamera3( sizes );
        //add lights
        this.L = new Lights( this.diameter );
        this.L.lights3( this.scene );
    }
    resize( sizes )
    {
        // Update camera
        this.C.resize( sizes );
    }
    tick( deltaTime, elapsedTime, A )
    {
        this.O.tick5( A, deltaTime );
    }
};