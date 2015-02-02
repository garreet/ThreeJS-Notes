/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 半球光对象
 * @desc HemisphereLight类是在场景中创建半球光,就是天光效果<br />
 * 经常用在室外,将各个位置的物体都照亮,室内的光线大多是方向性的<br />
 * 半球光不支持阴影
 * @param {THREE.Color} skyColor 半球光的颜色(天光的颜色)
 * @param {THREE.Color} groundColor 半球光的地面颜色
 * @param {float} intensity 灯光的强度,默认是1
 * @extends {THREE.Light}
 * @constructor
 */
THREE.HemisphereLight = function ( skyColor, groundColor, intensity ) {

	THREE.Light.call( this, skyColor );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'HemisphereLight';

	/**
	 * @desc 灯光初始化位置为(0，100，0)
	 */
	this.position.set( 0, 100, 0 );

	/**
	 * @desc 半球光的地面颜色
	 * @type {THREE.Color}
	 */
	this.groundColor = new THREE.Color( groundColor );
	/**
	 * @desc 灯光的强度
	 * @default 1
	 * @type {number}
	 */
	this.intensity = ( intensity !== undefined ) ? intensity : 1;

};
/**
 * @desc HemisphereLight对象从THREE.Light的原型继承所有属性方法
 * @type {THREE.Light}
 */
THREE.HemisphereLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @desc HemisphereLight克隆函数
 * @returns {THREE.HemisphereLight}
 */
THREE.HemisphereLight.prototype.clone = function () {

	var light = new THREE.HemisphereLight();

	THREE.Light.prototype.clone.call( this, light );

	light.groundColor.copy( this.groundColor );
	light.intensity = this.intensity;

	return light;

};
