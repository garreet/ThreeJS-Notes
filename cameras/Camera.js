/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/
/**
 * @classdesc 相机基类
 * @constructor
 * @extends {THREE.Object3D}
 */
THREE.Camera = function () {

	THREE.Object3D.call( this );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'Camera';
	/**
	 * @desc 这是matrixWorld的逆矩阵,matrixWorld包含相机在世界坐标系的变换矩阵
	 * @type {THREE.Matrix4}
	 */
	this.matrixWorldInverse = new THREE.Matrix4();
	/**
	 * @desc 相机设置属性projectionMatrix,包含相机的投影矩阵
	 * @type {THREE.Matrix4}
	 */
	this.projectionMatrix = new THREE.Matrix4();

};
/**
 * @desc 相机对象从THREE.Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Camera.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @function
 * @desc 获取世界坐标系内的四元数参数
 * @param {THREE.Quaternion} optionalTarget
 * @return {THREE.Quaternion}
 */
THREE.Camera.prototype.getWorldDirection = function () {

	var quaternion = new THREE.Quaternion();

	return function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		this.getWorldQuaternion( quaternion );

		return result.set( 0, 0, - 1 ).applyQuaternion( quaternion );

	}

}();
/**
 * @function
 * @desc 用来旋转相机对象,并将对象面对空间中的点(参数vector)
 * @param {THREE.Vector3} vector
 */
THREE.Camera.prototype.lookAt = function () {

	// This routine does not support cameras with rotated and/or translated parent(s)

	var m1 = new THREE.Matrix4();

	return function ( vector ) {

		m1.lookAt( this.position, vector, this.up );

		this.quaternion.setFromRotationMatrix( m1 );

	};

}();
/**
 * @desc 克隆相机
 * @param {THREE.Camera} camera
 * @returns {THREE.Camera}
 */
THREE.Camera.prototype.clone = function ( camera ) {

	if ( camera === undefined ) camera = new THREE.Camera();

	THREE.Object3D.prototype.clone.call( this, camera );

	camera.matrixWorldInverse.copy( this.matrixWorldInverse );
	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;
};
