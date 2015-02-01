/**
 * @author bhouston / http://exocortex.com
 */
/**
 * @classdesc  3维线段
 * @param {THREE.Vector3} start
 * @param {THREE.Vector3} end
 * @class
 * @example var start = new Vector3(0,0,0),end = new Vector3(1,1,1); var line = new Line3(start,end);
 */
THREE.Line3 = function ( start, end ) {
	/**
	 * @desc 线段起点
	 * @type {THREE.Vector3}
	 */
	this.start = ( start !== undefined ) ? start : new THREE.Vector3();
	/**
	 * @desc 线段终点
	 * @type {THREE.Vector3}
	 */
	this.end = ( end !== undefined ) ? end : new THREE.Vector3();

};

THREE.Line3.prototype = {

	constructor: THREE.Line3,

	/**
	 * @desc 根据start,end坐标值设置3维线段
	 * @param {THREE.Vector3} start
	 * @param {THREE.Vector3} end
	 * @returns {THREE.Line3}
	 */
	set: function ( start, end ) {

		this.start.copy( start );
		this.end.copy( end );

		return this;

	},
	/**
	 * @desc 拷贝3维线段
	 * @param {THREE.Line3} line
	 * @returns {THREE.Line3}
	 */
	copy: function ( line ) {

		this.start.copy( line.start );
		this.end.copy( line.end );

		return this;

	},

	/**
	 * @desc 返回3维线段中点
	 * @param {THREE.Line3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.start, this.end ).multiplyScalar( 0.5 );

	},

	/**
	 * @desc 获得线段的向量
	 * @param {THREE.Line3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	delta: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.end, this.start );

	},
	/**
	 * @desc 获得当前三维线段起始点到端点的点积
	 * @returns {float}
	 */
	distanceSq: function () {

		return this.start.distanceToSquared( this.end );

	},
	/**
	 * @desc 获得当前三维线段起始点到端点的距离
	 * @returns {float}
	 */
	distance: function () {

		return this.start.distanceTo( this.end );

	},
	/**
	 * @desc 当前三维线段方向的任意向量<br />
	 * @param {float} t [0,1] 当t=0,返回起点向量,当t=1返回结束点向量
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	at: function ( t, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );

	},
	/**
	 * @function
	 * @desc 返回一个基于点投影到线段上点的参数(就是参数point投影到线段的位置)
	 * @param {THREE.Vector3} point
	 * @param {boolean} clampToLine  为true，那么返回值将是0和1之间
	 * @return {float}
	 */
	closestPointToPointParameter: function () {

		var startP = new THREE.Vector3();
		var startEnd = new THREE.Vector3();

		return function ( point, clampToLine ) {

			startP.subVectors( point, this.start );
			startEnd.subVectors( this.end, this.start );

			var startEnd2 = startEnd.dot( startEnd );
			var startEnd_startP = startEnd.dot( startP );

			var t = startEnd_startP / startEnd2;

			if ( clampToLine ) {

				t = THREE.Math.clamp( t, 0, 1 );

			}

			return t;

		};

	}(),

	/**
	 * @desc 返回一个基于点投影到线段上的向量
	 * @param {THREE.Vector3} point
	 * @param {boolean} clampToLine 为true，那么返回的向量在线段起始点和结束点之间。
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {*|THREE.Vector3}
	 */
	closestPointToPoint: function ( point, clampToLine, optionalTarget ) {

		var t = this.closestPointToPointParameter( point, clampToLine );

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );

	},
	/**
	 * @desc 线段的起始点,结束点应用矩阵变换.达到旋转,缩放,移动的目的
	 * @param {THREE.Matrix3} matrix
	 * @returns {THREE.Line3}
	 */
	applyMatrix4: function ( matrix ) {

		this.start.applyMatrix4( matrix );
		this.end.applyMatrix4( matrix );

		return this;

	},
	/**
	 * @desc 3维线段等号
	 * @param {THREE.Line3} line
	 * @returns {boolean}
	 */
	equals: function ( line ) {

		return line.start.equals( this.start ) && line.end.equals( this.end );

	},

	/**
	 * @desc 克隆3维线段
	 * @returns {THREE.Line3}
	 */
	clone: function () {

		return new THREE.Line3().copy( this );

	}

};
