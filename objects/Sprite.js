/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 点对象，也就是粒子对象
 * @desc 通过BufferGeometry创建一个正对相机的类似buildborad的粒子点
 * @param {THREE.Material} material 材质
 * @constructor
 */
THREE.Sprite = ( function () {

	var indices = new Uint16Array( [ 0, 1, 2,  0, 2, 3 ] );
	var vertices = new Float32Array( [ - 0.5, - 0.5, 0,   0.5, - 0.5, 0,   0.5, 0.5, 0,   - 0.5, 0.5, 0 ] );
	var uvs = new Float32Array( [ 0, 0,   1, 0,   1, 1,   0, 1 ] );

	// 使用buffergeometry对象
	var geometry = new THREE.BufferGeometry();
	// 索引，顶点，UV
	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

	return function ( material ) {

		THREE.Object3D.call( this );

		this.type = 'Sprite';

		this.geometry = geometry;
		this.material = ( material !== undefined ) ? material : new THREE.SpriteMaterial();

	};

} )();
/**
 * @desc Sprite.Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Sprite.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @function
 * @desc 粒子对象的拾取判断函数
 * @param {THREE.Raycaster} raycaster 拾取射线对象
 * @param {*} intersects 拾取结果对象数组
 */
THREE.Sprite.prototype.raycast = ( function () {

	var matrixPosition = new THREE.Vector3();

	return function ( raycaster, intersects ) {

		matrixPosition.setFromMatrixPosition( this.matrixWorld );
		// 点距离判断
		var distance = raycaster.ray.distanceToPoint( matrixPosition );

		if ( distance > this.scale.x ) {

			return;

		}

		intersects.push( {

			distance: distance,
			point: this.position,
			face: null,
			object: this

		} );

	};

}() );
/**
 * @desc Three.Sprite 克隆函数
 * @param {THREE.Sprite} object
 * @returns {THREE.Sprite}
 */
THREE.Sprite.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Sprite( this.material );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};

// Backwards compatibility
/**
 * @memberof THREE
 * @desc 粒子对象,其实就是Sprite对象
 */
THREE.Particle = THREE.Sprite;
