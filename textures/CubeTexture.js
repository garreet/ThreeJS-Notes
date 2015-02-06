/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 立方体纹理对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @extends {THREE.Texture}
 * @param {Image} images 图像对象
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
THREE.CubeTexture = function ( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	THREE.Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.images = images;

};
/**
 * @desc 数据纹理从THREE.Texture的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.CubeTexture.prototype = Object.create( THREE.Texture.prototype );
/**
 * @desc 克隆函数
 * @returns {THREE.DataTexture}
 */
THREE.CubeTexture.clone = function ( texture ) {

	if ( texture === undefined ) texture = new THREE.CubeTexture();

	THREE.Texture.prototype.clone.call( this, texture );

	texture.images = this.images;

	return texture;

};
