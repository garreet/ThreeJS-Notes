/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 视频纹理对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @extends {THREE.Texture}
 * @param {*} video 视频对象
 * @param {number} mapping 映射模式
 * @param {number} wrapS S方向覆盖模式
 * @param {number} wrapT T方向覆盖模式
 * @param {number} magFilter 纹理在放大时的过滤方式
 * @param {number} minFilter 纹理在缩小时的过滤方式
 * @param {number} format 像素数据的颜色格式
 * @param {number} type 数据类型
 * @param {number} anisotropy 各向异性
 * @constructor
 */
THREE.VideoTexture = function ( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	THREE.Texture.call( this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );
	/**
	 * @default
	 * @type {boolean}
	 */
	this.generateMipmaps = false;

	// 视频运行
	var scope = this;

	var update = function () {

		requestAnimationFrame( update );

		if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

			scope.needsUpdate = true;

		}

	};

	update();

};
/**
 * @desc 数据纹理从THREE.Texture的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.VideoTexture.prototype = Object.create( THREE.Texture.prototype );
