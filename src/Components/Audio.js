import song1 from '../assets/MUSIC/Aden_Tanz 2 - Grau.mp3'
import song2 from '../assets/MUSIC/Aleksandir_Technicolour.mp3'
import song3 from '../assets/MUSIC/Djrum_Hard to Say.mp3'
import song4 from '../assets/MUSIC/EDDIE, The Arcturians_No Tomorrow.mp3'
import song5 from '../assets/MUSIC/I Hate Models_Two Steps From Heaven.mp3'
import song6 from '../assets/MUSIC/KILL SCRIPT_EMPTY SPACE.mp3'
import song7 from '../assets/MUSIC/Pavel K Novalis_Form Follows Function.mp3'
import song8 from '../assets/MUSIC/Rezz, PVRIS_Sacrificial (feat PVRIS).mp3'
import song9 from '../assets/MUSIC/Sara Landry, Scmeep_About Last Night (feat Shmeep).mp3'

export default class AudioInstance
{
    /*
     * fftSize must be a power of 2
     */
    constructor( fftSize )
    {
        this.audio = new Audio( );
        this.audio.autoplay = false;
        this.audio.loop = false;
        this.audioCtx = new AudioContext( );
        this.analyser = this.audioCtx.createAnalyser( );
        this.fft = fftSize;
        this.analyser.fftSize = fftSize;
        this.data = new Uint8Array( this.analyser.frequencyBinCount );
        this.data = new Uint8Array( this.analyser.frequencyBinCount );
        this.pauseFlag = false;
        this.initFlag = true;
        this.songs = [ song1, song2, song3, song4, song5, song6, song7, song8, song9 ];
        this.curSongIndex = Math.floor( Math.random() * this.songs.length );
        this.loadTrack( );
    }
    destructor( )
    {
        this.audioCtx.close( );
    } 
    loadTrack( )
    {
        this.audio.src = this.songs[this.curSongIndex];
        this.audio.load( );
        if (!this.initFlag) this.audio.play( );
        // else this.init( )
    }
    onTick( )
    {
        if (this.audio.ended) this.nextSong( )
        this.analyser.getByteFrequencyData( this.data );
    }
    toggleAudio( ) {
        if (this.pauseFlag) {
            this.audioCtx.resume(); // Resume the AudioContext
            this.pauseFlag = false;
        }
        else {
            this.audioCtx.suspend(); // Pause the AudioContext
            this.pauseFlag = true;
        }
    }
    init( ) {
        this.initFlag = false;
        this.source = this.audioCtx.createMediaElementSource( this.audio );
        this.source.connect( this.analyser );
        this.source.connect( this.audioCtx.destination );
        this.audio.play( );
    }
    prevSong( ) {
        if ( this.curSongIndex == 0 ) this.curSongIndex = this.songs.length - 1;
        else this.curSongIndex--;
        this.loadTrack( );
    }
    nextSong( ) {
        this.curSongIndex = ( this.curSongIndex + 1 ) % this.songs.length;
        this.loadTrack( );
    }
};