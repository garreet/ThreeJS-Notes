/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 点光源对象
 * @desc 点光源目前不支持阴影
 * @param {THREE.Color} color 点光源颜色
 * @param {float} intensity 光的强度,默认是1
 * @param {float} distance 光的长度，从光的position位置,开始衰减,衰减到distance的长度,默认是0
 * @extends {THREE.Light}
 * @example  var light = new THREE.PointLight(0xff0000,1,100); <br/>
 * light.position.set(50,50,30);   //设置位置<br/>
 * scene.add(lignt);   //加入场景<br/>
 * @constructor
 */
THREE.PointLight = function ( color, intensity, distance ) {

	THREE.Light.call( this, color );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'PointLight';
	/**
	 * @desc 光的强度
	 * @default 1
	 * @type {float}
	 */
	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	/**
	 * @desc 光的长度
	 * @default 0
	 * @type {float}
	 */
	this.distance = ( distance !== undefined ) ? distance : 0;

};
/**
 * @desc PointLight对象从THREE.Light的原型继承所有属性方法
 * @type {THREE.Light}
 */
THREE.PointLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @desc PointLight克隆函数
 * @returns {THREE.PointLight}
 */
THREE.PointLight.prototype.clone = function () {

	var light = new THREE.PointLight();

	THREE.Light.prototype.clone.call( this, light );

	light.intensity = this.intensity;
	light.distance = this.distance;

	return light;

};
