/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */
/**
 * @classdesc mesh(网格)的网格深度材质
 * @desc 基于相机远近裁切面自动变换亮度(明暗度)的mesh(网格)的材质<br />
 * 离相机越近,材质越亮(白),离相机越远,材质越暗(黑)
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.MeshDepthMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'MeshDepthMaterial'
	 * @type {string}
	 */
	this.type = 'MeshDepthMaterial';
	/**
	 * @desc 定义材质是否设定目标变形动画
	 * @default
	 * @type {boolean}
	 */
	this.morphTargets = false;
	/**
	 * @desc 是否使用线框模式
	 * @default
	 * @type {boolean}
	 */
	this.wireframe = false;
	/**
	 * @default 线框宽度
	 * @default
	 * @type {number}
	 */
	this.wireframeLinewidth = 1;

	this.setValues( parameters );

};
/**
 * @desc MeshDepthMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.MeshDepthMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc MeshDepthMaterial材质的克隆函数
 * @returns {THREE.MeshDepthMaterial}
 */
THREE.MeshDepthMaterial.prototype.clone = function () {

	var material = new THREE.MeshDepthMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	return material;

};
