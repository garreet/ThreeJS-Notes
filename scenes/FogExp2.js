/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 指数雾效对象<br/>
 * FogExp2.用来在场景内创建指数雾效,指数雾效是雾效浓度递增根据指数(参数density)设定,Fog对象的功能函数采用
 * @param {THREE.Color} color 雾效的颜色属性,如果雾效颜色设置成黑色,远处的对象将被渲染成黑色
 * @param {float} density	雾效强度递增指数属性,可选参数,默认是0.00025
 * @constructor
 */
THREE.FogExp2 = function ( color, density ) {
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
	 * @desc 雾效强度递增指数
	 * @default 0.00025
	 * @type {float}
	 */
	this.density = ( density !== undefined ) ? density : 0.00025;

};

/**
 * @desc 指数雾的克隆
 * @returns {THREE.FogExp2}
 */
THREE.FogExp2.prototype.clone = function () {

	return new THREE.FogExp2( this.color.getHex(), this.density );

};
