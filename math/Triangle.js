/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 三角形类
 * @desc 由a,b,c三个向量组成的三角形
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @constructor
 */
THREE.Triangle = function ( a, b, c ) {
	/**
	 *
	 * @type {THREE.Vector3}
	 */
	this.a = ( a !== undefined ) ? a : new THREE.Vector3();
	/**
	 *
	 * @type {THREE.Vector3}
	 */
	this.b = ( b !== undefined ) ? b : new THREE.Vector3();
	/**
	 *
	 * @type {THREE.Vector3}
	 */
	this.c = ( c !== undefined ) ? c : new THREE.Vector3();

};
/**
 * @function
 * @desc 计算三角形的法线向量
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @param {THREE.Vector3} optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Triangle.normal = function () {

	var v0 = new THREE.Vector3();

	return function ( a, b, c, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		result.subVectors( c, b );
		v0.subVectors( a, b );
		result.cross( v0 );

		var resultLengthSq = result.lengthSq();
		if ( resultLengthSq > 0 ) {

			return result.multiplyScalar( 1 / Math.sqrt( resultLengthSq ) );

		}

		return result.set( 0, 0, 0 );

	};

}();

// static/instance method to calculate barycoordinates
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
/**
 * @function
 * @desc 算返回参数a,b,c所组成的三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值<br />
 * 这个权值就是重心坐标
 * @param {THREE.Vector3} point 三角平面上任意点
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @param {THREE.Vector3} optionalTarget
 */
THREE.Triangle.barycoordFromPoint = function () {

	var v0 = new THREE.Vector3();
	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();

	return function ( point, a, b, c, optionalTarget ) {

		v0.subVectors( c, a );
		v1.subVectors( b, a );
		v2.subVectors( point, a );

		var dot00 = v0.dot( v0 );
		var dot01 = v0.dot( v1 );
		var dot02 = v0.dot( v2 );
		var dot11 = v1.dot( v1 );
		var dot12 = v1.dot( v2 );

		var denom = ( dot00 * dot11 - dot01 * dot01 );

		var result = optionalTarget || new THREE.Vector3();

		// colinear or singular triangle
		if ( denom == 0 ) {
			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return result.set( - 2, - 1, - 1 );
		}

		var invDenom = 1 / denom;
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycoordinates must always sum to 1
		return result.set( 1 - u - v, v, u );

	};

}();

/**
 * @function
 * @desc 判断任意点(参数point)是否在a,b,c所组成的三角形内
 * @param {THREE.Vector3} point 三角平面上任意点
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @return {boolean}
 */
THREE.Triangle.containsPoint = function () {

	var v1 = new THREE.Vector3();

	return function ( point, a, b, c ) {

		var result = THREE.Triangle.barycoordFromPoint( point, a, b, c, v1 );

		return ( result.x >= 0 ) && ( result.y >= 0 ) && ( ( result.x + result.y ) <= 1 );

	};

}();

THREE.Triangle.prototype = {

	constructor: THREE.Triangle,
	/**
	 * @desc 设置三角平面
	 * @param {THREE.Vector3} a
	 * @param {THREE.Vector3} b
	 * @param {THREE.Vector3} c
	 * @returns {THREE.Triangle}
	 */
	set: function ( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	},

	/**
	 * @desc 通过数组和索引设置三角平面
	 * @param {THREE.Vector3[]} points
	 * @param {float} i0
	 * @param {float} i1
	 * @param {float} i2
	 * @returns {THREE.Triangle}
	 */
	setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	},

	/**
	 * @desc 拷贝三角平面
	 * @param {THREE.Triangle} triangle
	 * @returns {THREE.Triangle}
	 */
	copy: function ( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	},

	/**
	 * @function
	 * @desc 计算三角形面他积
	 * @return {float}
	 */
	area: function () {

		var v0 = new THREE.Vector3();
		var v1 = new THREE.Vector3();

		return function () {

			v0.subVectors( this.c, this.b );
			v1.subVectors( this.a, this.b );

			return v0.cross( v1 ).length() * 0.5;

		};

	}(),

	/**
	 * @desc 计算三角形中心
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	midpoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	},

	/**
	 * @desc 计算三角形的法向量
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	normal: function ( optionalTarget ) {

		return THREE.Triangle.normal( this.a, this.b, this.c, optionalTarget );

	},
	/**
	 * @desc 创建三角形共面的平面Plane对象
	 * @param {THREE.Plane} optionalTarget
	 * @returns {THREE.Plane}
	 */
	plane: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Plane();

		return result.setFromCoplanarPoints( this.a, this.b, this.c );

	},

	/**
	 * @desc 计算返回当前三角形所在的平面上任意点(参数point)所表示当前三角形顶点的加权平均值<br />
	 * 这个权值就是重心坐标
	 * @param {THREE.Vector3} point
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	barycoordFromPoint: function ( point, optionalTarget ) {

		return THREE.Triangle.barycoordFromPoint( point, this.a, this.b, this.c, optionalTarget );

	},

	/**
	 * @desc 计算点是否在三角形内
	 * @param {THREE.Vector3} point
	 * @returns {boolean}
	 */
	containsPoint: function ( point ) {

		return THREE.Triangle.containsPoint( point, this.a, this.b, this.c );

	},

	/**
	 * @desc 计算三角形是否相等
	 * @param {THREE.Triangle} triangle
	 * @returns {boolean}
	 */
	equals: function ( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	},

	/**
	 * @desc 克隆三角形
	 * @returns {THREE.Triangle}
	 */
	clone: function () {

		return new THREE.Triangle().copy( this );

	}

};
