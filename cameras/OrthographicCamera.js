/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 正交投影相机
 * @desc 根据  left, right, top, bottom, near, far 生成正交投影相
 * @constructor
 * @param {float} left		垂直平面的左侧坐标位置
 * @param {float} right	垂直平面的右侧坐标位置
 * @param {float} top		垂直平面的顶部坐标位置
 * @param {float} bottom	垂直平面的底部坐标位置
 * @param {float} near		相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1
 * @param {float} far		相对于深度剪切面的远的距离，必须为正数,可选参数,如果未指定,初始化为2000
 * @extends {THREE.Camera}
 */
THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {

	THREE.Camera.call( this );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'OrthographicCamera';
	/**
	 * @desc 缩放级别
	 * @default
	 * @type {float}
	 */
	this.zoom = 1;
	/**
	 * @desc 垂直平面的左侧坐标位置
	 * @type {float}
	 */
	this.left = left;
	/**
	 * @desc 垂直平面的右侧坐标位置
	 * @type {float}
	 */
	this.right = right;
	/**
	 * @desc 垂直平面的顶部坐标位置
	 * @type {float}
	 */
	this.top = top;
	/**
	 * @desc 垂直平面的底部坐标位置
	 * @type {float}
	 */
	this.bottom = bottom;
	/**
	 * @desc 指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1
	 * @default 0.1
	 * @type {float}
	 */
	this.near = ( near !== undefined ) ? near : 0.1;
	/**
	 * @desc 指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1
	 * @default 2000
	 * @type {float}
	 */
	this.far = ( far !== undefined ) ? far : 2000;

	this.updateProjectionMatrix();

};
/**
 * @desc 正交相机对象从THREE.Camera的原型继承所有属性方法
 * @type {THREE.Camera}
 */
THREE.OrthographicCamera.prototype = Object.create( THREE.Camera.prototype );

/**
 * @desc 返回正交投影相机的可视边界的矩阵
 */
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {

	var dx = ( this.right - this.left ) / ( 2 * this.zoom );
	var dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
	var cx = ( this.right + this.left ) / 2;
	var cy = ( this.top + this.bottom ) / 2;

	this.projectionMatrix.makeOrthographic( cx - dx, cx + dx, cy + dy, cy - dy, this.near, this.far );

};

/**
 * @desc 克隆正交相机对象
 * @returns {THREE.OrthographicCamera}
 */
THREE.OrthographicCamera.prototype.clone = function () {

	var camera = new THREE.OrthographicCamera();

	THREE.Camera.prototype.clone.call( this, camera );

	camera.zoom = this.zoom;

	camera.left = this.left;
	camera.right = this.right;
	camera.top = this.top;
	camera.bottom = this.bottom;

	camera.near = this.near;
	camera.far = this.far;

	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;
};
