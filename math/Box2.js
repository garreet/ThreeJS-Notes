/**
 * @author bhouston / http://exocortex.com
 */
/**
 * @classdesc 2维矩形类
 * @param {THREE.Vector2} min  	未定义则为无穷大
 * @param {THREE.Vector2} max	未定义则为无穷小
 * @constructor
 */
THREE.Box2 = function ( min, max ) {
	/**
	 * @desc 最小值
	 * @default ( Infinity, Infinity )
	 * @type {THREE.Vector2}
	 */
	this.min = ( min !== undefined ) ? min : new THREE.Vector2( Infinity, Infinity );
	/**
	 * @desc 最大值
	 * @default ( - Infinity, - Infinity )
	 * @type {THREE.Vector2}
	 */
	this.max = ( max !== undefined ) ? max : new THREE.Vector2( - Infinity, - Infinity );

};

THREE.Box2.prototype = {

	constructor: THREE.Box2,
	/**
	 * @desc 设置2维矩形
	 * @param {THREE.Vector2} min
	 * @param {THREE.Vector2} max
	 * @returns {THREE.Box2}
	 */
	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},
	/**
	 * @desc 2维坐标数组的外包围盒
	 * @param {THREE.Vector2[]}points
	 * @returns {THREE.Box2}
	 */
	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] )

		}

		return this;

	},
	/**
	 * @function
	 * @desc 由中心点和边长设置2维矩形
	 * @param {THREE.Vector2} center 中心点
	 * @param {float} size 边长
	 * @returns {THREE.Box2}
	 */
	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector2();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );
			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),
	/**
	 * @desc 拷贝2维矩形
	 * @param {THREE.Box2} box
	 * @returns {THREE.Box2}
	 */
	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},
	/**
	 * @desc 设置无效2维矩形
	 * @returns {THREE.Box2}
	 */
	makeEmpty: function () {

		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = - Infinity;

		return this;

	},
	/**
	 * @desc 是否是无效2维矩形
	 * @returns {boolean}
	 */
	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );

	},
	/**
	 * @desc 获得2维矩形中心点
	 * @param {THREE.Vector2} optionalTarget
	 * @returns {THREE.Vector2}
	 */
	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},
	/**
	 * @desc 获得2维矩形边界尺寸向量
	 * @param {THREE.Vector2} optionalTarget
	 * @returns {THREE.Vector2}
	 */
	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.subVectors( this.max, this.min );

	},
	/**
	 * @desc 通过vector2对象(point参数)扩展二维矩形边界的最小值,最大值
	 * @param {THREE.Vector2} point
	 * @returns {THREE.Box2}
	 */
	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;
	},
	/**
	 * @desc 通过Vector2对象(vector参数)扩展二维矩形边界的最小值,最大值
	 * @param {THREE.Vector2} vector
	 * @returns {THREE.Box2}
	 */
	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;
	},
	/**
	 * @desc 通过scalar值(scalar参数)扩展二维矩形边界的最小值,最大值
	 * @param {float} scalar
	 * @returns {THREE.Box2}
	 */
	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;
	},
	/**
	 * @desc 判断点是否在2维矩形内
	 * @param {THREE.Vector2} point
	 * @returns {boolean}
	 */
	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ) {

			return false;

		}

		return true;

	},
	/**
	 * @desc 判断box是否在当前2维矩形内
	 * @param {THREE.Box2} box
	 * @returns {boolean}
	 */
	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
		     ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) ) {

			return true;

		}

		return false;

	},
	/**
	 * @desc 获得参数point(一个Vector2的二维点坐标)在当前二维矩形边界的高宽比
	 * @param {THREE.Vector2} point
	 * @param {THREE.Vector2} optionalTarget
	 * @returns {THREE.Vector2}
	 */
	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new THREE.Vector2();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);

	},
	/**
	 * @desc 判断box是否和当前2维矩形相交
	 * @param {THREE.Box2} box
	 * @returns {boolean}
	 */
	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ) {

			return false;

		}

		return true;

	},
	/**
	 * @desc 限制参数point在二维矩形边界内.如果point小于min,返回min,如果大于max返回max,否则返回point
	 * @param {THREE.Vector2} point
	 * @param {THREE.Vector2} optionalTarget
	 * @returns {THREE.Vector2}
	 */
	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.copy( point ).clamp( this.min, this.max );

	},
	/**
	 * @function
	 * @desc 边界内一点到最小边界,最大边界的长度
	 * @param {THREE.Vector2} point
	 * @return {THREE.Vector2}
	 */
	distanceToPoint: function () {

		var v1 = new THREE.Vector2();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),

	/**
	 * @desc 获取box和当前box的相交矩形
	 * @param {THREE.Box2} box
	 * @returns {THREE.Box2}
	 */
	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},

	/**
	 * @desc 获取box和当前box的相并矩形
	 * @param {THREE.Box2} box
	 * @returns {THREE.Box2}
	 */
	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},
	/**
	 * @desc 2维矩形的平移
	 * @param {float} offset
	 * @returns {THREE.Box2}
	 */
	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	/**
	 * @desc 判断box和当前2维矩形是否相等
	 * @param {THREE.Box2} box
	 * @returns {boolean}
	 */
	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},
	/**
	 * @desc 克隆当前2维矩形
	 * @returns {THREE.Box2}
	 */
	clone: function () {

		return new THREE.Box2().copy( this );

	}

};
