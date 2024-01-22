import * as THREE from 'three'

export default class Lights
{
    constructor( diameter )
    {
        this.diameter = diameter
    }
    lights( scene )
    {
        //ambient light
        var ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
        scene.add( ambient );
    }
};