/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 线性雾效对象<br/>
 * Fog对象的构造函数.用来在场景内创建线性雾效,线性雾效就是从雾效的起始点参数near,到结束点参数far,雾效强度线性递增
 * @param {THREE.Color} color 雾的颜色
 * @param {float} near	雾效的起始点,雾效的near属性大于当前相机的near属性,当前相机才不会受相机影响,可选参数,默认是1
 * @param {float} far 雾效的结束点,雾效的far属性小于当前相机的far属性,当前相机才不会受相机影响,可选参数,默认是1000
 * @constructor
 */
THREE.Fog = function ( color, near, far ) {
	/**
	 * @desc 雾的名字
	 * @default ''
	 * @type {string}
	 */
	this.name = '';
	/**
	 * @desc 雾效颜色
	 * @type {THREE.Color}
	 */
	this.color = new THREE.Color( color );
	/**
	 * @desc 雾的最近距离
	 * @default 1
	 * @type {float}
	 */
	this.near = ( near !== undefined ) ? near : 1;
	/**
	 * @desc 雾的最远距离
	 * @default 1000
	 * @type {float}
	 */
	this.far = ( far !== undefined ) ? far : 1000;

};
/**
 * @desc 雾对象的克隆
 * @returns {THREE.Fog}
 */
THREE.Fog.prototype.clone = function () {

	return new THREE.Fog( this.color.getHex(), this.near, this.far );

};
