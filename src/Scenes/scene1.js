import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'
import Lights from '../Components/Lights.js'

export default class scene1
{
    constructor( sizes, A )
    {
        //member variables
        this.diameter = 30;
        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 0.9, 0.9, 0.9 );
        //create objects
        this.O = new Objects( );
        this.O.objects1( this.scene );
        //create camera
        this.C = new Camera( );
        this.C.createCamera1( this.diameter, sizes );
        //add lights
        this.L = new Lights( this.diameter );
        this.L.lights1( this.scene );
    }
    resize( sizes )
    {
        // Update camera
        this.C.resize( sizes );
    }
    tick( deltaTime, elapsedTime, A )
    {
        //update camera position
        this.C.tick1( elapsedTime, deltaTime );
        //cubes
        this.O.tick1( A, deltaTime );
    }
};