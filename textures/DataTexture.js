/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 由二进制数据生成的纹理对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @extends {THREE.Texture}
 * @param {*} data 图像数据
 * @param {number} width 图像宽度
 * @param {number} height 图像高度
 * @param {number} format 像素数据的颜色格式
 * @param {number} type 数据类型
 * @param {number} mapping 映射模式
 * @param {number} wrapS S方向覆盖模式
 * @param {number} wrapT T方向覆盖模式
 * @param {number} magFilter 纹理在放大时的过滤方式
 * @param {number} minFilter 纹理在缩小时的过滤方式
 * @param {number} anisotropy 各向异性
 * @constructor
 */
THREE.DataTexture = function ( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy ) {

	THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.image = { data: data, width: width, height: height };

};
/**
 * @desc 数据纹理从THREE.Texture的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.DataTexture.prototype = Object.create( THREE.Texture.prototype );

/**
 * @desc 克隆函数
 * @returns {THREE.DataTexture}
 */
THREE.DataTexture.prototype.clone = function () {

	var texture = new THREE.DataTexture();

	THREE.Texture.prototype.clone.call( this, texture );

	return texture;

};
