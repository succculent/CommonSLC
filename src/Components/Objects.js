import * as THREE from 'three'
import vertexFairy from '../shaders/vertexFairy.glsl'
import fragmentFairy from '../shaders/fragmentFairy.glsl'
import vertexCircles from '../shaders/vertexCirlces.glsl'
import fragmentCircles from '../shaders/fragmentCirlces.glsl'
import vertexVoronoi from '../shaders/vertexVoronoi.glsl'
import fragmentVoronoi from '../shaders/fragmentVoronoi.glsl'

export default class Objects
{
    constructor() 
    {

    }
    //SCENE 1
    objects1( scene )
    {
        var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
        var boxMaterial1 = new THREE.MeshPhongMaterial( );
        this.cubes = [ ];
        var color1 = new THREE.Color( 1.0, 0.0, 0.5 ); //hot pink
        var color2 = new THREE.Color( 0.0, 0.6, 0.2 ); //forest green
        this.squaresRadius = 25;
        for( var j = -1 * this.squaresRadius; j < this.squaresRadius; j += 1 ) {
            for( var i = -1 * this.squaresRadius; i < this.squaresRadius; i += 1 ) {
                var temp = new THREE.Mesh( boxGeometry , boxMaterial1 );
                temp.position.set( i, 0, j );
                var iScale = ( i + this.squaresRadius ) / ( 2 * this.squaresRadius ); //0 to 1 scale for i value
                var jScale = ( j + this.squaresRadius ) / ( 2 * this.squaresRadius ); //0 to 1 scale for j value
                var iScaleNorm = iScale / ( jScale );
                var jScaleNorm = jScale / ( iScale );
                temp.material.color.r = color1.r * iScaleNorm + color2.r * jScaleNorm;
                temp.material.color.g = color1.g * ( iScaleNorm/1.5 ) + color2.g * ( jScaleNorm * 1.5 );
                temp.material.color.b = color1.b * iScaleNorm + color2.b * jScaleNorm;
                temp.castShadow = true;
                temp.receiveShadow = true;
                this.cubes.push( temp );
            }
        }
        for ( let index in this.cubes ) { scene.add( this.cubes[ index ] ); };
    }
    tick1( A, deltaTime ) {
        this.cubes.forEach( ( e, i ) => {
            e.scale.y = A.data[ i % ( this.squaresRadius * this.squaresRadius ) ] / 10 + 1;
            e.rotateY( deltaTime * Math.PI/4 * A.data[ i % ( this.squaresRadius * this.squaresRadius ) ] * 0.05 );
        });
    }
    //SCENE 2
    objects2( scene, sizes, A )
    {
        var planeGeometry = new THREE.PlaneGeometry( sizes.width/2, sizes.height/2 );
        this.planeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexFairy,
            fragmentShader: fragmentFairy,
            uniforms: {
                uTime: {value: 0.0},
                uResY: {value: sizes.height},
                uResX: {value: sizes.width},
                uFFT: { type: "fv1",  value: A.data }
            },
        });
        this.planeMaterial.needsUpdate = true;
        this.plane = new THREE.Mesh( planeGeometry, this.planeMaterial );
        this.plane.lookAt(new THREE.Vector3(-0.7, -0.7, -0.7));
        scene.add( this.plane );
    }
    resize2( sizes ) {
        this.planeMaterial.uniforms.uResY.value = sizes.height;
        this.planeMaterial.uniforms.uResX.value = sizes.width;
    }
    tick2( A, elapsedTime )
    {
        this.planeMaterial.uniforms.uTime.value = elapsedTime;
        this.planeMaterial.uniforms.uFFT.value = A.data;
    }
    //SCENE 3
    objects3( scene )
    {
        var boxGeometry = new THREE.OctahedronGeometry( 1, 0 );
        var boxMaterial = new THREE.MeshPhongMaterial( );
        this.cubes = [ ];
        var color = new THREE.Color( 0.0, 0.6, 0.2 ); //forest green
        for( let i = 0; i < 40; i++ ) {
            for( let j = 0; j < 20; j++) {
                let temp = new THREE.Mesh( boxGeometry , boxMaterial );
                temp.position.set( i + Math.random( ) / 2 - 20, j + Math.random( ) / 2 - 10, Math.random( ) * 15 - 15 );
                temp.rotateX( Math.random( ) );
                temp.rotateY( Math.random( ) );
                temp.rotateZ( Math.random( ) );
                temp.material.color.r = color.r + ( Math.random( ) / 8) ;
                temp.material.color.g = color.g + ( Math.random( ) / 2) - 0.4 ;
                temp.material.color.b = color.b + ( Math.random( ) / 8) ;
                temp.castShadow = true;
                temp.receiveShadow = true;
                this.cubes.push( [ temp, false, temp.position.z, temp.position.x, temp.position.y ] );
            }
        }
        for ( let index in this.cubes ) { scene.add( this.cubes[ index ][ 0 ] ); };
    }
    tick3( A, deltaTime )
    {
        this.cubes.forEach( ( e, i ) => {
            let dataValue =  A.data[ i % 1024 ];
            if ( e[ 1 ] ) {
                this.triggerCube( e );
            }
            else if ( dataValue > 120 ) {
                e[ 0 ].position.z -= 7;
                e[ 1 ] = true;
            }
            e[ 0 ].rotateX( deltaTime * Math.PI/4 * dataValue * 0.1);
            e[ 0 ].rotateY( deltaTime * Math.PI/6 * dataValue * 0.1);
            e[ 0 ].rotateZ( deltaTime * Math.PI/2 * dataValue * 0.1);
        });
    }
    triggerCube( e ) {
        if( e[ 0 ].position.z >= e[ 2 ] ) {
            e[ 1 ] = false;
            return;
        }
        e[ 0 ].position.z += 0.01;
    }
    //SCENE 4
    objects4( scene, sizes, A )
    {
        var planeGeometry = new THREE.PlaneGeometry( sizes.width/2, sizes.height/2 );
        this.planeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexCircles,
            fragmentShader: fragmentCircles,
            uniforms: {
                uTime: {value: 0.0},
                uResY: {value: sizes.height},
                uResX: {value: sizes.width},
            },
        });
        this.planeMaterial.needsUpdate = true;
        this.plane = new THREE.Mesh( planeGeometry, this.planeMaterial );
        this.plane.lookAt(new THREE.Vector3(-0.7, -0.7, -0.7));
        scene.add( this.plane );
    }
    tick4( A, elapsedTime )
    {
        this.planeMaterial.uniforms.uTime.value = elapsedTime;
    }
    //SCENE 5
    createCircle( r, d )
    {
        let geometry = new THREE.CircleGeometry( r, d );
        return geometry;
    }
    objects5( scene )
    {
        this.colors = [ 0xffff00, 0xff00ff, 0x00ffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffffff];
        this.cubes = [ ];
        for ( let i = 0; i < 40; i++ ) {
            let r = 27 - Math.random()*5;
            let d = 64 - Math.random()*32;
            let geometry = this.createCircle( r,  d );
            let material = new THREE.MeshBasicMaterial( { wireframe: true, wireframeLinewidth: 2.0, color: this.colors[ i % 7 ] } );
            let temp = new THREE.Mesh( geometry, material );
            temp.geometry.verticesNeedUpdate = true;
            temp.geometry.dynamic = true;
            scene.add( temp );
            this.cubes.push( [ temp, r, d ] );
        }
    }
    tick5( A, deltaTime )
    {
        this.cubes.forEach( ( e, i ) => {
            let dataValue =  A.data[ (i * 25) % 1024 ];
            e[0].rotateX( deltaTime * Math.PI/4 * dataValue * 0.01 );
            e[0].rotateY( deltaTime * Math.PI/6 * dataValue * 0.01 );
            e[0].rotateZ( deltaTime * Math.PI/2 * dataValue * 0.01 );
            let r = (dataValue - e[1] ) * deltaTime;
            let geometry = this.createCircle( r , e[2] );
            let material = new THREE.MeshBasicMaterial( { wireframe: true, wireframeLinewidth: 2.0, color: this.colors[ i % 7 ] } );
            this.cubes[i] = new THREE.Mesh( geometry, material );
        });
    }
    //SCENE 6
    objects6( scene, sizes, A )
    {
        var planeGeometry = new THREE.PlaneGeometry( sizes.width/2, sizes.height/2 );
        this.planeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexVoronoi,
            fragmentShader: fragmentVoronoi,
            uniforms: {
                uTime: {value: 0.0},
                uResY: {value: sizes.height},
                uResX: {value: sizes.width},
                uFFT: { type: "fv1",  value: A.data }
            },
        });
        this.planeMaterial.needsUpdate = true;
        this.plane = new THREE.Mesh( planeGeometry, this.planeMaterial );
        this.plane.lookAt(new THREE.Vector3(-0.7, -0.7, -0.7));
        scene.add( this.plane );
    }
    tick6( A, elapsedTime )
    {
        this.planeMaterial.uniforms.uTime.value = elapsedTime;
        this.planeMaterial.uniforms.uFFT.value = A.data;
    }
};