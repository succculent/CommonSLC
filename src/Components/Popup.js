import { update } from 'lodash'
import * as THREE from 'three'

export default class Popup
{
    constructor( title, artist )
    {
        this.countDown = 0.0;
        this.title = document.createElement( 'h1' );
        this.title.innerHTML = title;
        this.artist = document.createElement( 'h2' );
        this.artist.innerHTML = artist;
        this.divv = document.createElement( 'div' );
        this.divv.appendChild( this.title );
        this.divv.appendChild( this.artist );
        this.divv.classList.add( 'popup' );
        this.divv.classList.add( 'hidden' );
    }
    update( deltaTime )
    {
        if ( this.countDown > 0.0 ) {
            this.countDown -= deltaTime;
        }
        if ( this.countDown < 0.0 ) {
            this.countDown = 0.0;
            this.divv.classList.add( 'hidden' );
        }
    }
    activate( )
    {
        this.countDown = 5.0;
        this.divv.classList.remove( 'hidden' );
    }
    deactivate( )
    {
        this.countDown = 0.0;
        this.divv.classList.add( 'hidden' );
    }
};