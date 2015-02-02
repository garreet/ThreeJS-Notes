/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 灯光对象的抽象基类
 * @desc 在WebGL的三维空间中,存在点光源PointLight和聚光灯SpotLight两种类型,还有作为点光源的一种特例<br />
 * 平行光DirectionLight,和环境光AmbientLight.在3D场景中,基本上是这几种光源的组合,创建各种各样的效果
 * @param {THREE.Color} color	灯光颜色值
 * @extends {THREE.Object3D}
 * @constructor
 */
THREE.Light = function ( color ) {

	THREE.Object3D.call( this );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'Light';

	/**
	 * @desc //设置灯光的颜色属性
	 * @type {THREE.Color}
	 */
	this.color = new THREE.Color( color );

};
/**
 * @desc Light对象从THREE.Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Light.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @desc Light克隆函数
 * @param {THREE.Light} light
 * @returns {THREE.Light}
 */
THREE.Light.prototype.clone = function ( light ) {

	if ( light === undefined ) light = new THREE.Light();

	THREE.Object3D.prototype.clone.call( this, light );

	light.color.copy( this.color );

	return light;

};
