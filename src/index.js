import _ from 'lodash';
import './style.css';
import * as THREE from 'three'
import AudioInstance from './Components/Audio.js'
import Renderer from './Components/Renderer.js' 
import Scene from './Scenes/scene.js'
import instaIcon from './assets/insta.png'
import twitterIcon from './assets/twitter.png'
import playIcon from './assets/play.png'
import nextIcon from './assets/next.png'
import prevIcon from './assets/prev.png'

function createLink(url, icon, alt) {
  var link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  var icon_ = document.createElement('img');
  icon_.src = icon;
  icon_.alt = alt;
  link.appendChild(icon_);
  return link;
}

function component() {
    /*
     * Page Setup
     */
    const element = document.createElement( 'div' );
    var canvas = document.createElement( 'canvas' );
    canvas.classList.add( 'webgl' );
    element.appendChild( canvas );

    var sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    let A = new AudioInstance( 64 );
    element.appendChild( A.audio );

    let curScene = new Scene( sizes, A );
    let R = new Renderer( canvas, sizes );

    window.addEventListener( 'resize', ( ) => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        curScene.resize( sizes );
        R.resize( sizes );
    });

    window.addEventListener( 'mousemove', ( e ) => {
      e.preventDefault();
      const pointer = new THREE.Vector2();
      pointer.x = (e.clientX / sizes.width) * 2 - 1;
      pointer.y = (e.clientY / sizes.height) * -2 + 1;
      curScene.mouseMove( pointer )
    });

    const clock = new THREE.Clock( );
    const tick = ( ) =>
    {   
        var deltaTime = clock.getDelta( );
        var elapsedTime = clock.getElapsedTime( );
        A.onTick( );
        R.render( curScene.scene, curScene.C.camera );
        curScene.tick( deltaTime, elapsedTime, A );
        window.requestAnimationFrame( tick );
    };
    tick( );


    var _titleDiv = document.createElement( 'div' );
    var _title = document.createElement( 'h1' );
    _title.innerHTML = "Common<br>Collective";
    _title.classList.add( 'title' );
    _titleDiv.appendChild( _title );
    _titleDiv.classList.add( 'titleDiv' );
    element.appendChild( _titleDiv );

    var _bodyDiv = document.createElement( 'div' );
    var _body = document.createElement( 'p' );
    _body.innerHTML = "Harmonizing Art and Music<br><br><br>Salt Lake City's Creative Essence<br><br><br>Unveiling Exceptional Artistry";
    _body.classList.add( 'bodyText' );
    _bodyDiv.classList.add( 'bodyDiv' );
    _bodyDiv.appendChild( _body );
    element.appendChild( _bodyDiv );

    var links = document.createElement( 'div' );

    //prev
    var prevButton = document.createElement('img');
    prevButton.src = prevIcon;
    prevButton.alt = 'Prev Song';
    function prevClick( ) { A.prevSong(); }
    prevButton.onclick = prevClick;
    prevButton.classList.add( 'link' );
    prevButton.classList.add( 'changeSong' )
    links.appendChild(prevButton);

    //PlayPause
    var play_pause = document.createElement('img');
    play_pause.src = playIcon;
    play_pause.alt = 'Play/Pause';
    function playPauseClick( ) {
      if (A.initFlag) A.init( );
      else A.toggleAudio( );
    }
    play_pause.onclick = playPauseClick;
    play_pause.classList.add( 'link' );
    links.appendChild(play_pause);

    //Next
    var nextButton = document.createElement('img');
    nextButton.src = nextIcon;
    nextButton.alt = 'Next Song';
    function nextClick( ) { A.nextSong(); }
    nextButton.onclick = nextClick;
    nextButton.classList.add( 'link' );
    nextButton.classList.add( 'changeSong' )
    links.appendChild(nextButton);

    // Instagram link
    var instagramLink = createLink( 'https://www.instagram.com/commonslc/', instaIcon, "Instagram");
    instagramLink.classList.add( 'link' );
    links.appendChild(instagramLink);

    // Twitter link
    var twitterLink = createLink( 'https://twitter.com/commonslc_', twitterIcon, "Twitter");
    twitterLink.classList.add( 'link' );
    links.appendChild(twitterLink);

    _titleDiv.appendChild( links );
    links.classList.add( 'links' );

    return element;
}

document.body.appendChild( component() );