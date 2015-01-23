/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */
/**
 * @classdesc 虚线线型材质
 * @desc 据参数parameters创建线段的线线型材质，参数为JSON格式的属性参数
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.LineDashedMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'LineDashedMaterial'
	 * @type {string}
	 */
	this.type = 'LineDashedMaterial';
	/**
	 * @desc 线材质颜色
	 * @default 0xffffff 白色
	 * @type {THREE.Color}
	 */
	this.color = new THREE.Color( 0xffffff );
	/**
	 * @desc 线的宽度
	 * @default
	 * @type {float}
	 */
	this.linewidth = 1;
	/**
	 * @desc 虚线的线型比例属性
	 * @default
	 * @type {float}
	 */
	this.scale = 1;
	/**
	 * @desc 虚线(点化线),线段的长度
	 * @default
	 * @type {float}
	 */
	this.dashSize = 3;
	/**
	 * @desc 虚线(点化线)的线段间距长度
	 * @default
	 * @type {float}
	 */
	this.gapSize = 1;
	/**
	 * @desc 线顶点颜色
	 * @default THREE.NoColors
	 * @type {number}
	 */
	this.vertexColors = false;
	/**
	 * @desc 雾效
	 * @default
	 * @type {boolean}
	 */
	this.fog = true;

	this.setValues( parameters );

};
/**
 * @desc LineDashedMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.LineDashedMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc 虚线材质的克隆函数
 * @returns {THREE.LineDashedMaterial}
 */
THREE.LineDashedMaterial.prototype.clone = function () {

	var material = new THREE.LineDashedMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;

	material.scale = this.scale;
	material.dashSize = this.dashSize;
	material.gapSize = this.gapSize;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};
