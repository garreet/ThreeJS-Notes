/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 环境光对象
 * @param {THREE.Color} color 环境光的颜色
 * @extends {THREE.Light}
 * @constructor
 */
THREE.AmbientLight = function ( color ) {

	THREE.Light.call( this, color );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'AmbientLight';

};
/**
 * @desc AmbientLight对象从THREE.Light的原型继承所有属性方法
 * @type {THREE.Light}
 */
THREE.AmbientLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @desc AmbientLight克隆函数
 * @returns {THREE.AmbientLight}
 */
THREE.AmbientLight.prototype.clone = function () {

	var light = new THREE.AmbientLight();

	THREE.Light.prototype.clone.call( this, light );

	return light;

};
