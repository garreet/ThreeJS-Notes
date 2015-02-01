/**
 * @author mrdoob / http://mrdoob.com/
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
 *  linecap: "round",
 *  linejoin: "round",
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */
/**
 * @classdesc 线线型材质
 * @desc 据参数parameters创建线段的线线型材质，参数为JSON格式的属性参数
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.LineBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'LineBasicMaterial'
	 * @type {string}
	 */
	this.type = 'LineBasicMaterial';
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
	 * @desc 线头类型 "round" 圆角	"butt" 平角	"square" 方角
	 * @default "round" 圆角
	 * @type {string}
	 */
	this.linecap = 'round';
	/**
	 * @desc 线连接类型 "bevel" 斜角	"round" 圆角	"miter" 尖角
	 * @default "round" 圆角
	 * @type {string}
	 */
	this.linejoin = 'round';
	/**
	 * @desc 线顶点颜色
	 * @default THREE.NoColors
	 * @type {number}
	 */
	this.vertexColors = THREE.NoColors;
	/**
	 * @desc 雾效
	 * @default
	 * @type {boolean}
	 */
	this.fog = true;

	this.setValues( parameters );

};
/**
 * @desc LineBasicMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.LineBasicMaterial.prototype = Object.create( THREE.Material.prototype );

/**
 * @desc 线材质的克隆函数
 * @returns {THREE.LineBasicMaterial}
 */
THREE.LineBasicMaterial.prototype.clone = function () {

	var material = new THREE.LineBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;
	material.linecap = this.linecap;
	material.linejoin = this.linejoin;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};
