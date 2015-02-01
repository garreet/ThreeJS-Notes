/**
 * @author mrdoob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
/**
 * @classdesc 透视投影相机
 * @desc 根据 fov, aspect, near, far 生成透视投影相机
 * @constructor
 * @param {float} fov		相机的可视角度,可选参数,如果未指定,初始化为50
 * @param {float} aspect	相机可视范围的长宽比,可选参数,如果未指定,初始化为1
 * @param {float} near		相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1
 * @param {float} far		相对于深度剪切面的远的距离，必须为正数,可选参数,如果未指定,初始化为2000
 * @extends {THREE.Camera}
 */
THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {

	THREE.Camera.call( this );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'PerspectiveCamera';

	/**
	 * @desc 缩放比例
	 * @default
	 * @type {float}
	 */
	this.zoom = 1;
	/**
	 * @desc 相机的可视角度,可选参数
	 * @default 50
	 * @type {float}
	 */
	this.fov = fov !== undefined ? fov : 50;
	/**
	 * @desc 相机可视范围的长宽比
	 * @default 1
	 * @type {float}
	 */
	this.aspect = aspect !== undefined ? aspect : 1;
	/**
	 * @desc 相对于深度剪切面的近的距离
	 * @default 0.1
	 * @type {float}
	 */
	this.near = near !== undefined ? near : 0.1;
	/**
	 * @desc 相对于深度剪切面的远的距离
	 * @default 2000
	 * @type {float}
	 */
	this.far = far !== undefined ? far : 2000;

	this.updateProjectionMatrix();

};
/**
 * @desc 透视相机对象从THREE.Camera的原型继承所有属性方法
 * @type {THREE.Camera}
 */
THREE.PerspectiveCamera.prototype = Object.create( THREE.Camera.prototype );


/**
 * Uses Focal Length (in mm) to estimate and set FOV
 * 35mm (fullframe) camera is used if frame size is not specified;
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
 * 使用焦距(单位毫米)设置相机时,如果画幅大小没有指定,默认使用FOV(视野)35mm(全画幅)相机
 */
/**
 * @desc 焦距 focalLength, 画幅大小 frameHeight 更新透视投影相机的视野
 * @param {float} focalLength	焦距
 * @param {float} frameHeight	画幅大小
 */
THREE.PerspectiveCamera.prototype.setLens = function ( focalLength, frameHeight ) {

	if ( frameHeight === undefined ) frameHeight = 24;

	this.fov = 2 * THREE.Math.radToDeg( Math.atan( frameHeight / ( focalLength * 2 ) ) );
	this.updateProjectionMatrix();

};


/**
 * Sets an offset in a larger frustum. This is useful for multi-window or
 * multi-monitor/multi-machine setups.
 * 为一个大的平截头体设置视口偏移,这个方法在多显示器,多台机器,显示器矩阵上应用非常有效
 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
 * the monitors are in grid like this
 * 比如,你有3x2 个显示器,每个显示器的分辨率是1920x1080,组成的显示器矩阵向下面的网格
 *   +---+---+---+
 *   | A | B | C |
 *   +---+---+---+
 *   | D | E | F |
 *   +---+---+---+
 *
 * then for each monitor you would call it like this
 * 然后,你可以向下面这样为每台显示器调用setOffset()方法,让每个显示器显示画布的一部分
 *   var w = 1920;
 *   var h = 1080;
 *   var fullWidth = w * 3;
 *   var fullHeight = h * 2;
 *
 *   --A--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
 *   --B--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
 *   --C--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
 *   --D--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
 *   --E--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
 *   --F--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
 *
 *   Note there is no reason monitors have to be the same size or in a grid.
 *   注意,有可能,这些显示器不是同样的尺寸.所以你可以根据需要设置你想要的各种方式
 */
/**
 * 一个大的平截头体设置视口偏移,这个方法在多显示器,多台机器,显示器矩阵上应用非常有效
 * @param {number} fullWidth	一个超大的摄像机场景的总宽度
 * @param {number} fullHeight	一个超大的摄像机场景的总高度
 * @param {number} x	当前摄像机左上角点的x坐标在网格内的起始点
 * @param {number} y	当前摄像机左上角点的y坐标在网格内的起始点
 * @param {number} width	当前摄像机的宽度
 * @param {number} height	当前摄像机的高度
 */
THREE.PerspectiveCamera.prototype.setViewOffset = function ( fullWidth, fullHeight, x, y, width, height ) {
	/**
	 * @memberof THREE.PerspectiveCamera
	 * @type {number}
	 */
	this.fullWidth = fullWidth;
	/**
	 * @memberof THREE.PerspectiveCamera
	 * @type {number}
	 */
	this.fullHeight = fullHeight;
	/**
	 * @memberof THREE.PerspectiveCamera
	 * @type {number}
	 */
	this.x = x;
	/**
	 * @memberof THREE.PerspectiveCamera
	 * @type {number}
	 */
	this.y = y;
	/**
	 * @memberof THREE.PerspectiveCamera
	 * @type {number}
	 */
	this.width = width;
	/**
	 * @memberof THREE.PerspectiveCamera
	 * @type {number}
	 */
	this.height = height;

	this.updateProjectionMatrix();

};

/**
 * @desc 返回透视投影相机的可视边界的矩阵.当相机的参数被更改后,必须调用此参数
 */
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {

	var fov = THREE.Math.radToDeg( 2 * Math.atan( Math.tan( THREE.Math.degToRad( this.fov ) * 0.5 ) / this.zoom ) );

	if ( this.fullWidth ) {

		var aspect = this.fullWidth / this.fullHeight;
		var top = Math.tan( THREE.Math.degToRad( fov * 0.5 ) ) * this.near;
		var bottom = - top;
		var left = aspect * bottom;
		var right = aspect * top;
		var width = Math.abs( right - left );
		var height = Math.abs( top - bottom );

		this.projectionMatrix.makeFrustum(
			left + this.x * width / this.fullWidth,
			left + ( this.x + this.width ) * width / this.fullWidth,
			top - ( this.y + this.height ) * height / this.fullHeight,
			top - this.y * height / this.fullHeight,
			this.near,
			this.far
		);

	} else {

		this.projectionMatrix.makePerspective( fov, this.aspect, this.near, this.far );

	}

};
/**
 * @desc 克隆透视投影矩阵
 * @returns {THREE.PerspectiveCamera}
 */
THREE.PerspectiveCamera.prototype.clone = function () {

	var camera = new THREE.PerspectiveCamera();

	THREE.Camera.prototype.clone.call( this, camera );

	camera.zoom = this.zoom;

	camera.fov = this.fov;
	camera.aspect = this.aspect;
	camera.near = this.near;
	camera.far = this.far;

	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;

};
