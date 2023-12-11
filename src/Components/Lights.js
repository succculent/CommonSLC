import * as THREE from 'three'

export default class Lights
{
    constructor( diameter )
    {
        this.diameter = diameter
    }
    lights1( scene )
    {
        //sun
        var sun = new THREE.DirectionalLight( 0xffffff, 0.9 );
        sun.position.set( 2 * this.diameter, 5 * this.diameter, 0 );
        sun.castShadow = true;
        scene.add( sun );

        //ambient light
        var ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
        scene.add( ambient );

        //hem
        var hem = new THREE.HemisphereLight( 'orange', 'purple' );
        hem.rotateX(Math.PI/2);
        scene.add( hem );
    }
    lights3( scene )
    {       
        //sun 1
        var sun1 = new THREE.DirectionalLight( 0xffffff, 0.6 );
        sun1.position.set( 20, 0, -30 );
        sun1.castShadow = true;
        scene.add( sun1 );

        //sun 2
        var sun2 = new THREE.DirectionalLight( 0xffffff, 0.6 );
        sun2.position.set( -20, 0, -30 );
        sun2.castShadow = true;
        scene.add( sun2 );

        //hem
        var hem = new THREE.HemisphereLight( 'orange', 'purple', 1.0 );
        scene.add( hem );
    }
};