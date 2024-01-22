import * as THREE from 'three'
import smokePNG from '../assets/Smoke.png'

export default class Smoke
{
  constructor( scene, sizes, pointer )
  {
    //parameters
    this.lifeRange = [0.2, 0.6]; //min, range
    this.rotRange = 2 * Math.PI;

    //objects
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load( smokePNG );
    this.material = new THREE.SpriteMaterial( { alphaMap: map, map: map, color: 0xffffff, sizeAttenuation: false } );
    this.currentParticles = [];
    this.X = pointer.X;
    this.Y = pointer.Y;
    this.spawnSprite( scene )
    this.windDirection = new THREE.Vector3(0.64, 0.36, 0.0);
    this.windSpeed = 0.2;
  }
  tick( scene, deltaTime, elapsedTime )
  {
    // spawn new particle
    for (let i = 0; i < 30; i++) this.spawnSprite( scene )

    // update windDirection
    let windRotate = Math.PI * 0.001 * (
      0.2 * Math.cos( elapsedTime * 0.2 + 1.6 ) +
      0.67 * Math.cos( elapsedTime * 0.8 + 2.1 ) -
      1.0 * Math.cos( Math.cos( elapsedTime * 0.45 + 3.9 ) )
    );

    let rm = new THREE.Matrix4().makeRotationZ( windRotate );
    let rt = this.windDirection.applyMatrix4(rm);
    //update particles
    for( let i = 0; i < this.currentParticles.length; i++) {
      //position
      this.currentParticles[i][0].position.x += deltaTime * rt.x * this.windSpeed;
      this.currentParticles[i][0].position.y += deltaTime * rt.y * this.windSpeed;
      //lifespan
      this.currentParticles[i][1] -= deltaTime;
      if (0 > this.currentParticles[i][1]) scene.remove(this.currentParticles[i][0]);
    }

    // remove dead particles
    this.currentParticles = this.currentParticles.filter(([p, l]) => l > 0);
  }
  mouseMove( point )
  {
    this.X = point.x
    this.Y = point.y
  }
  spawnSprite( scene )
  {
    let sprite = new THREE.Sprite( this.material );
    sprite.scale.set( 0.02, 0.02, 1 );
    sprite.position.set( this.X + (Math.random()*0.04 - 0.02), this.Y + (Math.random()*0.03 - 0.015), 0 )
    sprite.rotateZ(Math.random() * this.rotRange)
    this.currentParticles.push( [sprite, this.lifeRange[0] + Math.random() * this.lifeRange[1]] );
    scene.add( sprite );
  }
};