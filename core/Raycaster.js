/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://exocortex.com/
 * @author stephomi / http://stephaneginier.com/
 */

( function ( THREE ) {
	/**
	 * @classdesc 射线拾取对象
	 * @param {THREE.Vector3} origin 射线起点
	 * @param {THREE.Vector3} direction 射线方向
	 * @param {float} near 最近距离
	 * @param {float} far 最远距离
	 * @constructor
	 */
	THREE.Raycaster = function ( origin, direction, near, far ) {
		/**
		 * @desc 射线
		 * @type {THREE.Ray}
		 */
		this.ray = new THREE.Ray( origin, direction );
		// direction is assumed to be normalized (for accurate distance calculations)
		/**
		 * @desc 最近距离
		 * @default 0
		 * @type {float}
		 */
		this.near = near || 0;
		/**
		 * @desc 最远距离
		 * @default Infinity
		 * @type {float}
		 */
		this.far = far || Infinity;
		/**
		 * @desc 拾取结果
		 * @type {*}
		 */
		this.params = {
			Sprite: {},
			Mesh: {},
			PointCloud: { threshold: 1 },
			LOD: {},
			Line: {}
		};

	};
	/**
	 * @desc 距离降序排序方法
	 * @param {THREE.Object3D} a
	 * @param {THREE.Object3D} b
	 * @returns {float}
	 */
	var descSort = function ( a, b ) {

		return a.distance - b.distance;

	};
	/**
	 * @desc 插入对象
	 * @param {THREE.Object3D} object
	 * @param {THREE.Raycaster} raycaster
	 * @param {*} intersects 拾取结果对象数组，结果添加至数组
	 * @param {boolean} recursive 是否递归判断子对象
	 */
	var intersectObject = function ( object, raycaster, intersects, recursive ) {

		object.raycast( raycaster, intersects );

		if ( recursive === true ) {

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				intersectObject( children[ i ], raycaster, intersects, true );

			}

		}

	};

	//

	THREE.Raycaster.prototype = {

		constructor: THREE.Raycaster,
		/**
		 * @desc 拾取精度
		 * @default
		 * @type {float}
		 */
		precision: 0.0001,
		/**
		 * @desc 线的精度
		 * @default
		 * @type {float}
		 */
		linePrecision: 1,
		/**
		 * @desc 设置拾取对象
		 * @param {THREE.Ray} origin 射线起点
		 * @param {THREE.Vector3} direction 射线方向
		 */
		set: function ( origin, direction ) {

			this.ray.set( origin, direction );
			// direction is assumed to be normalized (for accurate distance calculations)

		},
		/**
		 * @desc 拾取相交判断
		 * @param {THREE.Object3D} object 需要判断对象
		 * @param {boolean} recursive 是否递归
		 * @returns {*} 被拾取对象数组
		 */
		intersectObject: function ( object, recursive ) {

			var intersects = [];

			intersectObject( object, this, intersects, recursive );

			intersects.sort( descSort );

			return intersects;

		},
		/**
		 * @desc 拾取相交判断
		 * @param {THREE.Object3D} objects 需要判断对象数组
		 * @param {boolean} recursive 是否递归
		 * @returns {*} 被拾取对象数组
		 */
		intersectObjects: function ( objects, recursive ) {

			var intersects = [];

			if ( objects instanceof Array === false ) {

				console.log( 'THREE.Raycaster.intersectObjects: objects is not an Array.' );
				return intersects;

			}

			for ( var i = 0, l = objects.length; i < l; i ++ ) {

				intersectObject( objects[ i ], this, intersects, recursive );

			}

			intersects.sort( descSort );

			return intersects;

		}

	};

}( THREE ) );
