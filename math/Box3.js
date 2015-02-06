/**
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */
/**
 * @classdesc 3维立方体类，box<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @param {THREE.Vector3} min  	未定义则为无穷大
 * @param {THREE.Vector3} max	未定义则为无穷小
 * @constructor
 */
THREE.Box3 = function ( min, max ) {
	/**
	 * @desc 最小值
	 * @default ( Infinity, Infinity, Infinity )
	 * @type {THREE.Vector3}
	 */
	this.min = ( min !== undefined ) ? min : new THREE.Vector3( Infinity, Infinity, Infinity );
	/**
	 * @desc 最大值
	 * @default ( -Infinity, -Infinity, -Infinity )
	 * @type {THREE.Vector3}
	 */
	this.max = ( max !== undefined ) ? max : new THREE.Vector3( - Infinity, - Infinity, - Infinity );

};

THREE.Box3.prototype = {

	constructor: THREE.Box3,
	/**
	 * @desc 设置3维Box
	 * @param {THREE.Vector3} min
	 * @param {THREE.Vector3} max
	 * @returns {THREE.Box3}
	 */
	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},
	/**
	 * @desc 3维坐标数组的外包围盒
	 * @param {THREE.Vector3[]} points
	 * @returns {THREE.Box3}
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
	 * @desc 由中心点和边长设置3维box
	 * @param {THREE.Vector3} center
	 * @param {float} size
	 * @returns {THREE.Box3}
	 */
	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector3();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),
	/**
	 * @function
	 * @desc 计算对象的3维box
	 * @param {THREE.Object3D} object
	 * @returns {THREE.Box3}
	 */
	setFromObject: function () {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and childrens', world transforms

		var v1 = new THREE.Vector3();

		return function ( object ) {

			var scope = this;

			object.updateMatrixWorld( true );

			this.makeEmpty();

			object.traverse( function ( node ) {

				var geometry = node.geometry;

				if ( geometry !== undefined ) {

					if ( geometry instanceof THREE.Geometry ) {

						var vertices = geometry.vertices;

						for ( var i = 0, il = vertices.length; i < il; i ++ ) {

							v1.copy( vertices[ i ] );

							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					} else if ( geometry instanceof THREE.BufferGeometry && geometry.attributes[ 'position' ] !== undefined ) {

						var positions = geometry.attributes[ 'position' ].array;

						for ( var i = 0, il = positions.length; i < il; i += 3 ) {

							v1.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );

							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					}

				}

			} );

			return this;

		};

	}(),
	/**
	 * @desc 拷贝3维box
	 * @param {THREE.Box3} box
	 * @returns {THREE.Box3}
	 */
	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},
	/**
	 * @desc 设置无效3维box
	 * @returns {THREE.Box3}
	 */
	makeEmpty: function () {

		this.min.x = this.min.y = this.min.z = Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;

		return this;

	},
	/**
	 * @desc 是否是无效3维box
	 * @returns {boolean}
	 */
	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

	},
	/**
	 * @desc 获得3维box中心点
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},
	/**
	 * @desc 获得3维box边界尺寸向量
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.max, this.min );

	},
	/**
	 * @desc 通过vector3对象(point参数)扩展3维box边界的最小值,最大值
	 * @param {THREE.Vector3} point
	 * @returns {THREE.Box3}
	 */
	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	},
	/**
	 * @desc 通过Vector3对象(vector参数)扩展3维box边界的最小值,最大值
	 * @param {THREE.Vector3} vector
	 * @returns {THREE.Box3}
	 */
	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	},
	/**
	 * @desc 通过scalar值(scalar参数)扩展3维box边界的最小值,最大值
	 * @param {float} scalar
	 * @returns {THREE.Box3}
	 */
	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	},
	/**
	 * @desc 判断点是否在3维box内
	 * @param {THREE.Vector3} point
	 * @returns {boolean}
	 */
	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ||
		     point.z < this.min.z || point.z > this.max.z ) {

			return false;

		}

		return true;

	},
	/**
	 * @desc 判断box是否在当前3维box内
	 * @param {THREE.Box3} box
	 * @returns {boolean}
	 */
	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
			 ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) &&
			 ( this.min.z <= box.min.z ) && ( box.max.z <= this.max.z ) ) {

			return true;

		}

		return false;

	},
	/**
	 * @desc 获得参数point(一个Vector3的二维点坐标)在当前3维box边界的高宽比
	 * @param {THREE.Vector3} point
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new THREE.Vector3();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);

	},
	/**
	 * @desc 判断box是否和当前3维box相交
	 * @param {THREE.Box3} box
	 * @returns {boolean}
	 */
	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ||
		     box.max.z < this.min.z || box.min.z > this.max.z ) {

			return false;

		}

		return true;

	},
	/**
	 * @desc 限制参数point在3维box边界内.如果point小于min,返回min,如果大于max返回max,否则返回point
	 * @param {THREE.Vector3} point
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( point ).clamp( this.min, this.max );

	},
	/**
	 * @function
	 * @desc 3维box边界内一点到最小边界,最大边界的长度
	 * @param {THREE.Vector3} point
	 * @return {THREE.Vector3}
	 */
	distanceToPoint: function () {

		var v1 = new THREE.Vector3();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),
	/**
	 * @function
	 * @desc 当前3维Box边界的球形边界
	 * @param {THREE.Sphere} optionalTarget
	 * @return {THREE.Sphere}
	 */
	getBoundingSphere: function () {

		var v1 = new THREE.Vector3();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Sphere();

			result.center = this.center();
			result.radius = this.size( v1 ).length() * 0.5;

			return result;

		};

	}(),
	/**
	 * @desc 获取box和当前box的相交box
	 * @param {THREE.Box3} box
	 * @returns {THREE.Box3}
	 */
	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},
	/**
	 * @desc 获取box和当前box的相并box
	 * @param {THREE.Box3} box
	 * @returns {THREE.Box3}
	 */
	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},
	/**
	 * @function
	 * @desc 通过传递matrix(旋转,缩放,移动等变换矩阵)对当前立方体对象的8个角点,应用变换
	 * @param {THREE.Matrix4} m
	 * @return {THREE.Box3}
	 */
	applyMatrix4: function () {

		var points = [
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3()
		];

		return function ( matrix ) {

			// NOTE: I am using a binary pattern to specify all 2^3 combinations below
			points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
			points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
			points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
			points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
			points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
			points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
			points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
			points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix );  // 111

			this.makeEmpty();
			this.setFromPoints( points );

			return this;

		};

	}(),
	/**
	 * @desc 3维box的平移
	 * @param {float} offset
	 * @returns {THREE.Box3}
	 */
	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},
	/**
	 * @desc 判断box和当前3维box是否相等
	 * @param {THREE.Box3} box
	 * @returns {boolean}
	 */
	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},
	/**
	 * @desc 克隆当前3维box
	 * @returns {THREE.Box3}
	 */
	clone: function () {

		return new THREE.Box3().copy( this );

	}

};
