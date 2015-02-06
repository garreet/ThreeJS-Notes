/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc LOD对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @desc LOD技术即Levels of Detail的简称，意为多细节层次。<br />
 * LOD技术指根据物体模型的节点在显示环境中所处的位置和重要度<br />
 * 决定物体渲染的资源分配，降低非重要物体的面数和细节度，从而获得高效率的渲染运算。
 * @constructor
 */
THREE.LOD = function () {

	THREE.Object3D.call( this );
	/**
	 * @desc 对象数组
	 * @type {Array}
	 */
	this.objects = [];

};

/**
 * @desc LOD.Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.LOD.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @desc 将对象(参数object)根据参数distance插入到存放层次细节展示的对象集合中(LOD.Objects)
 * @param {THREE.Object3D} object 3D对象
 * @param {float} distance 层次距离
 */
THREE.LOD.prototype.addLevel = function ( object, distance ) {

	if ( distance === undefined ) distance = 0;

	distance = Math.abs( distance );

	for ( var l = 0; l < this.objects.length; l ++ ) {

		if ( distance < this.objects[ l ].distance ) {

			break;

		}

	}

	this.objects.splice( l, 0, { distance: distance, object: object } );
	this.add( object );

};
/**
 * @desc 根据距离返回对应层次的对象
 * @param {float} distance 层次距离
 * @returns {THREE.Object3D}
 */
THREE.LOD.prototype.getObjectForDistance = function ( distance ) {
	//排序由小到大遍历
	for ( var i = 1, l = this.objects.length; i < l; i ++ ) {

		if ( distance < this.objects[ i ].distance ) {

			break;

		}

	}

	return this.objects[ i - 1 ].object;

};
/**
 * @function
 * @desc LOD的拾取判断函数
 * @param {THREE.Raycaster} raycaster 拾取射线对象
 * @param {*} intersects 拾取结果对象数组
 */
THREE.LOD.prototype.raycast = ( function () {

	var matrixPosition = new THREE.Vector3();

	return function ( raycaster, intersects ) {

		matrixPosition.setFromMatrixPosition( this.matrixWorld );

		var distance = raycaster.ray.origin.distanceTo( matrixPosition );

		//将当前层次的对象,进行光线跟踪计算.
		this.getObjectForDistance( distance ).raycast( raycaster, intersects );

	};

}() );
/**
 * @function
 * @desc 根据相机的位置更新显示的层次
 * @param {THREE.Camera} camera 相机
 * @return {THREE.Lod} 新的LOD对象
 */
THREE.LOD.prototype.update = function () {

	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();

	return function ( camera ) {

		if ( this.objects.length > 1 ) {

			v1.setFromMatrixPosition( camera.matrixWorld );
			v2.setFromMatrixPosition( this.matrixWorld );

			// 重新计算相机的位置到当前层次的距离
			var distance = v1.distanceTo( v2 );

			this.objects[ 0 ].object.visible = true;

			for ( var i = 1, l = this.objects.length; i < l; i ++ ) {
				// 如果计算相机的位置到当前层次的距离大于当前对象的距离
				if ( distance >= this.objects[ i ].distance ) {
				 	// 计算相机的位置到当前层次的距离之前的对象不显示
					this.objects[ i - 1 ].object.visible = false;
					// 计算相机的位置到当前层次的距离之后的对象显示.
					this.objects[ i     ].object.visible = true;

				} else {

					break;

				}

			}

			for ( ; i < l; i ++ ) {

				this.objects[ i ].object.visible = false;

			}

		}

	};

}();
/**
 * @desc Three.LOD 拷贝函数
 * @param {THREE.LOD} object
 * @returns {THREE.LOD}
 */
THREE.LOD.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.LOD();

	THREE.Object3D.prototype.clone.call( this, object );

	for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
		var x = this.objects[ i ].object.clone();
		x.visible = i === 0;
		object.addLevel( x, this.objects[ i ].distance );
	}

	return object;

};
