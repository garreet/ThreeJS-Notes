/**
 * @author bhouston / http://exocortex.com
 */
/**
 * @classdesc 平面类
 * @desc 法线向量为normal,从原点到平面的距离为constant的无限延展的2维平面对象
 * @param {THREE.Vector3} normal	法线向量
 * @param {number} constant 原点到平面的距离
 * @constructor
 */
THREE.Plane = function ( normal, constant ) {
	/**
	 * @desc 平面法线
	 * @default (1,0,0)
	 * @type {THREE.Vector3}
	 */
	this.normal = ( normal !== undefined ) ? normal : new THREE.Vector3( 1, 0, 0 );
	/**
	 * @desc 原点到平面的距离
	 * @default 0
	 * @type {float}
	 */
	this.constant = ( constant !== undefined ) ? constant : 0;

};

THREE.Plane.prototype = {

	constructor: THREE.Plane,
	/**
	 * @desc 根据 normal 和 constant 设置平面
	 * @param {THREE.Vector3} normal	法线向量
	 * @param {float} constant 原点到平面的距离
	 * @returns {THREE.Plane}
	 */
	set: function ( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	},
	/**
	 * @desc 过x,y,z,w分量重新设置二维平面
	 * @param {float} x	平面法线向量x坐标
	 * @param {float} y	平面法线向量y坐标
	 * @param {float} z	平面法线向量z坐标
	 * @param {float} w	二维平面离原点的距离
	 * @returns {THREE.Plane}
	 */
	setComponents: function ( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	},
	/**
	 * @desc 通过参数normal(平面法线向量)和参数point(共面的点)重新设置二维平面
	 * @param {THREE.Vector3} normal
	 * @param {THREE.Vector3} point
	 * @returns {THREE.Plane}
	 */
	setFromNormalAndCoplanarPoint: function ( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );	// must be this.normal, not normal, as this.normal is normalized

		return this;

	},

	/**
	 * @function
	 * @desc 通过共面的点a,b,c重新设置二维平面
	 * @param {THREE.Vector3} a
	 * @param {THREE.Vector3} b
	 * @param {THREE.Vector3} c
	 * @returns {THREE.Plane}
	 */
	setFromCoplanarPoints: function () {

		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();

		return function ( a, b, c ) {

			var normal = v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

			// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

			this.setFromNormalAndCoplanarPoint( normal, a );

			return this;

		};

	}(),

	/**
	 * @desc 二维平面的拷贝
	 * @param {THREE.Plane} plane
	 * @returns {THREE.Plane}
	 */
	copy: function ( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	},
	/**
	 * @desc 二维平面的单位化<br />
	 * 几何意义：单位化法线向量,并调整constant常量的值
	 * @returns {THREE.Plane}
	 */
	normalize: function () {

		// Note: will lead to a divide by zero if the plane is invalid.

		var inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	},
	/**
	 * @desc 获得二维平面的负平面<br />
	 * 几何意义：获得二维平面的背面
	 * @returns {THREE.Plane}
	 */
	negate: function () {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	},
	/**
	 * @desc 三维空间内一点到Plane二维平面对象表面的最小长度.<br />
	 * 几何意义：点到面上的投影等于从参数point到平面上的垂距
	 * @param {THREE.Vector3} point
	 * @returns {float}
	 */
	distanceToPoint: function ( point ) {

		return this.normal.dot( point ) + this.constant;

	},
	/**
	 * @desc 三维空间内球体到Plane二维平面对象表面的最小长度<br />
	 * 几何意义：球体到面上的投影等于从球体表面到平面上的最小垂距
	 * @param {THREE.Sphere} sphere
	 * @returns {float}
	 */
	distanceToSphere: function ( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	},
	/**
	 * @desc 三维空间中一点到当前平面的投影<br />
	 * 几何意义：点到面上的投影等于从参数point到平面上的垂足
	 * @param {THREE.Vector3} point
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	projectPoint: function ( point, optionalTarget ) {

		return this.orthoPoint( point, optionalTarget ).sub( point ).negate();

	},

	/**
	 * @desc 当前二维平面对象法线向量方向相同,与参数point到平面距离相等大小的向量<br />
	 * 几何意义：点到面上的投影等于从参数point到平面上的垂足向量
	 * @param {THREE.Vector3} point
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	orthoPoint: function ( point, optionalTarget ) {

		var perpendicularMagnitude = this.distanceToPoint( point );

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( this.normal ).multiplyScalar( perpendicularMagnitude );

	},
	/**
	 * @desc 当前二维平面是否与参数line相交
	 * @param {THREE.Line3} line
	 * @returns {boolean}
	 */
	isIntersectionLine: function ( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		var startSign = this.distanceToPoint( line.start );
		var endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	},
	/**
	 * @function
	 * @desc 当前二维平面与参数line相交的交点
	 * @param {THREE.Line3} line
	 * @param {THREE.Vector3} optionalTarget
	 * @return {THREE.Vector3}
	 */
	intersectLine: function () {

		var v1 = new THREE.Vector3();

		return function ( line, optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			var direction = line.delta( v1 );

			var denominator = this.normal.dot( direction );

			if ( denominator == 0 ) {

				// line is coplanar, return origin
				if ( this.distanceToPoint( line.start ) == 0 ) {

					return result.copy( line.start );

				}

				// Unsure if this is the correct method to handle this case.
				return undefined;

			}

			var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

			if ( t < 0 || t > 1 ) {

				return undefined;

			}

			return result.copy( direction ).multiplyScalar( t ).add( line.start );

		};

	}(),

	/**
	 * @desc 当前二维平面的法线向量到当前二维平面投影点
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	coplanarPoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( this.normal ).multiplyScalar( - this.constant );

	},
	/**
	 * @function
	 * @desc 通过传递matrix(旋转,缩放,移动等变换矩阵)对当前Plane二维平面对象的法线向量normal和,应用变换.
	 * @param {THREE.Matrix4} matrix
	 * @param {THREE.Matrix4} optionalNormalMatrix	若设置了，可以对法线变换
	 * @return {THREE.Plane}
	 */
	applyMatrix4: function () {

		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();
		var m1 = new THREE.Matrix3();

		return function ( matrix, optionalNormalMatrix ) {

			// compute new normal based on theory here:
			// http://www.songho.ca/opengl/gl_normaltransform.html
			var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix( matrix );
			var newNormal = v1.copy( this.normal ).applyMatrix3( normalMatrix );

			var newCoplanarPoint = this.coplanarPoint( v2 );
			newCoplanarPoint.applyMatrix4( matrix );

			this.setFromNormalAndCoplanarPoint( newNormal, newCoplanarPoint );

			return this;

		};

	}(),

	/**
	 * @desc 移动当前二维平面的位置
	 * @param {THREE.Vector3} offset
	 * @returns {THREE.Plane}
	 */
	translate: function ( offset ) {

		this.constant = this.constant - offset.dot( this.normal );

		return this;

	},
	/**
	 * @desc 判断二维平面是否相等
	 * @param plane
	 * @returns {boolean}
	 */
	equals: function ( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant == this.constant );

	},
	/**
	 * @desc 克隆二维平面
	 * @returns {THREE.Plane}
	 */
	clone: function () {

		return new THREE.Plane().copy( this );

	}

};
