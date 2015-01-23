/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 线对象
 * @desc WebGL中好像线不能设置宽度
 * @param {THREE.Geometry} geometry 几何信息
 * @param {THREE.Material} material 材质信息
 * @param {number} mode 线型
 * @extends {THREE.Object3D}
 * @constructor
 */
THREE.Line = function ( geometry, material, mode ) {

	THREE.Object3D.call( this );
	/**
	 * @default 'Line'
	 * @type {string}
	 */
	this.type = 'Line';

	/**
	 * @desc 几何信息
	 * @default THREE.Geometry()
	 * @type {THREE.Geometry}
	 */
	this.geometry = geometry !== undefined ? geometry : new THREE.Geometry();
	/**
	 * @desc 材质信息
	 * @default THREE.LineBasicMaterial() 随机颜色的线
	 * @type {THREE.Geometry}
	 */
	this.material = material !== undefined ? material : new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );
	/**
	 * @desc 线的绘制方式
	 * @default THREE.LineStrip
	 * @type {number}
	 */
	this.mode = ( mode !== undefined ) ? mode : THREE.LineStrip;

};
/**
 * @memberof THREE
 * @desc 线型定义
 * @default
 * @type {number}
 */
THREE.LineStrip = 0;
/**
 * @memberof THREE
 * @desc 线型定义
 * @default
 * @type {number}
 */
THREE.LinePieces = 1;
/**
 * @desc Line对象从THREE.Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Line.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @function
 * @desc 线的拾取判断函数
 * @param {THREE.Raycaster} raycaster 拾取射线对象
 * @param {*} intersects 拾取结果对象数组
 */
THREE.Line.prototype.raycast = ( function () {

	var inverseMatrix = new THREE.Matrix4();
	var ray = new THREE.Ray();
	var sphere = new THREE.Sphere();

	return function ( raycaster, intersects ) {

		var precision = raycaster.linePrecision;
		var precisionSq = precision * precision;

		var geometry = this.geometry;

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		// Checking boundingSphere distance to ray
		// 先进行外包围球体判断
		sphere.copy( geometry.boundingSphere );
		sphere.applyMatrix4( this.matrixWorld );

		if ( raycaster.ray.isIntersectionSphere( sphere ) === false ) {

			return;

		}

		inverseMatrix.getInverse( this.matrixWorld );
		ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

		/* if ( geometry instanceof THREE.BufferGeometry ) {

		} else */ if ( geometry instanceof THREE.Geometry ) {

			var vertices = geometry.vertices;
			var nbVertices = vertices.length;
			var interSegment = new THREE.Vector3();
			var interRay = new THREE.Vector3();
			var step = this.mode === THREE.LineStrip ? 1 : 2;

			// 三角面判断
			for ( var i = 0; i < nbVertices - 1; i = i + step ) {

				var distSq = ray.distanceSqToSegment( vertices[ i ], vertices[ i + 1 ], interRay, interSegment );

				if ( distSq > precisionSq ) continue;

				var distance = ray.origin.distanceTo( interRay );

				if ( distance < raycaster.near || distance > raycaster.far ) continue;

				// 加入结果数组内
				intersects.push( {

					distance: distance,
					// What do we want? intersection point on the ray or on the segment??
					// point: raycaster.ray.at( distance ),
					point: interSegment.clone().applyMatrix4( this.matrixWorld ),
					face: null,
					faceIndex: null,
					object: this

				} );

			}

		}

	};

}() );
/**
 * @desc Three.Line 拷贝函数
 * @param {THREE.Line} object
 * @returns {THREE.Line}
 */
THREE.Line.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Line( this.geometry, this.material, this.mode );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};
