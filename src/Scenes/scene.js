import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'
import Smoke from '../Components/Smoke.js'

export default class Scene
{
    constructor( sizes, A )
    {
        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 0.5, 0.5, 0.5 );

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2(-1, -1);

        this.O = new Objects( this.scene, sizes, A );
        this.S = new Smoke( this.scene, sizes, this.pointer );
        this.C = new Camera( sizes );
    }
    resize( sizes )
    {
        this.C.resize( sizes );
        this.O.resize( sizes );
    }
    tick( deltaTime, elapsedTime, A )
    {
        this.O.tick( A, elapsedTime );
        this.S.tick( this.scene, deltaTime, elapsedTime );
    }
    mouseMove( pointer )
    {
        this.pointer.x = pointer.x;
        this.pointer.y = pointer.y;
		this.raycaster.setFromCamera( this.pointer, this.C.camera );
		const intersects = this.raycaster.intersectObject( this.O.plane, false );
        this.S.mouseMove( intersects[0].point );
    }
};