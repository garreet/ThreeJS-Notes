/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 球体类<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @desc center,半径为radius的球体
 * @param {THREE.Vector3} center	中心点坐标
 * @param {float} radius 	半径
 * @constructor
 */
THREE.Sphere = function ( center, radius ) {
	/**
	 * @desc 球体中心点
	 * @type {THREE.Vector3}
	 */
	this.center = ( center !== undefined ) ? center : new THREE.Vector3();
	/**
	 * @desc 球体半径
	 * @default 0
	 * @type {float}
	 */
	this.radius = ( radius !== undefined ) ? radius : 0;

};

THREE.Sphere.prototype = {

	constructor: THREE.Sphere,
	/**
	 * @desc 根据圆心和半径设置球体
	 * @param center
	 * @param radius
	 * @returns {THREE.Sphere}
	 */
	set: function ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;
	},
	/**
	 * @function
	 * @desc Vector3对象组成的points数组中的到圆心距离最大的值重新设置球体的半径
	 * @param {THREE.Vector3[]} points
	 * @param {THREE.Vector3} optionalCenter 球体中心
	 * @returns {THREE.Sphere}
	 */
	setFromPoints: function () {

		var box = new THREE.Box3();

		return function ( points, optionalCenter )  {

			var center = this.center;

			if ( optionalCenter !== undefined ) {

				center.copy( optionalCenter );

			} else {

				box.setFromPoints( points ).center( center );

			}

			var maxRadiusSq = 0;

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

			}

			this.radius = Math.sqrt( maxRadiusSq );

			return this;

 		};

	}(),

	/**
	 * @desc 拷贝球体
	 * @param {THREE.Sphere} sphere
	 * @returns {THREE.Sphere}
	 */
	copy: function ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	},
	/**
	 * @desc 判断球体是否合法
	 * @returns {boolean}
	 */
	empty: function () {

		return ( this.radius <= 0 );

	},

	/**
	 * @desc 判断点是否在球体内
	 * @param {THREE.Vector3} point
	 * @returns {boolean}
	 */
	containsPoint: function ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	},

	/**
	 * @desc 点到球心的距离
	 * @param {THREE.Vector3} point
	 * @returns {float}
	 */
	distanceToPoint: function ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	},
	/**
	 * @desc 两个球体是否相交
	 * @param {THREE.Sphere} sphere
	 * @returns {boolean}
	 */
	intersectsSphere: function ( sphere ) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	},
	/**
	 * @desc 根据点来重新定义球体半径<br />
	 * 如果point在球体外,强制将point设置到球体表面,如果point在球体内,重新设置球体半径为point到当前球体半径的距离
	 * @param {THREE.Vector3} point
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	clampPoint: function ( point, optionalTarget ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		var result = optionalTarget || new THREE.Vector3();
		result.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			result.sub( this.center ).normalize();
			result.multiplyScalar( this.radius ).add( this.center );

		}

		return result;

	},

	/**
	 * @desc 计算球体的外包围盒
	 * @param {THREE.Box3} optionalTarget
	 * @returns {THREE.Box3}
	 */
	getBoundingBox: function ( optionalTarget ) {

		var box = optionalTarget || new THREE.Box3();

		box.set( this.center, this.center );
		box.expandByScalar( this.radius );

		return box;

	},
	/**
	 * @desc 球体的投影变换<br />
	 * 平移相对于球心，缩放相对于半径
	 * @param {THREE.Matrix4} matrix
	 * @returns {THREE.Sphere}
	 */
	applyMatrix4: function ( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	},
	/**
	 * @desc 球体平移
	 * @param {THREE.Vector3} offset
	 * @returns {THREE.Sphere}
	 */
	translate: function ( offset ) {

		this.center.add( offset );

		return this;

	},
	/**
	 * @desc 球体是否相等
	 * @param {THREE.Sphere} sphere
	 * @returns {boolean}
	 */
	equals: function ( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	},

	/**
	 * @desc 球体克隆
	 * @returns {THREE.Sphere}
	 */
	clone: function () {

		return new THREE.Sphere().copy( this );

	}

};
