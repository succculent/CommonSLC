import * as THREE from 'three'

export default class Renderer
{
    constructor( canvas, sizes )
    {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize( sizes.width, sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) ); //reconsider for performance issues
        this.renderer.setClearAlpha(0x000000, 0);
    }
    resize( sizes )
    {
        this.renderer.setSize( sizes.width, sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) ); //reconsider for performance issues
    }
    render( scene, camera )
    {
        this.renderer.render( scene, camera );
    }
};