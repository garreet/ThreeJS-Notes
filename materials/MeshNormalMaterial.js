/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  opacity: <float>,
 *
 *  shading: THREE.FlatShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */
/**
 * @classdesc mesh(网格)的标准材质类型
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.MeshNormalMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );
	/**
	 * @default 'FlatShading'
	 * @type {string}
	 */
	this.type = 'MeshNormalMaterial';

	/**
	 * @desc 着色方式<br />
	 * THREE.SmoothShading平滑着色：用多种颜色进行绘制<br />
	 * 每个顶点都是单独进行处理的，各顶点和各图元之间采用均匀插值。
	 * @default
	 * @type {number}
	 */
	this.shading = THREE.SmoothShading;

	/**
	 * @desc 是否以线框方式渲染几何体
	 * @default
	 * @type {boolean}
	 */
	this.wireframe = false;
	/**
	 * @desc 线框宽度
	 * @default
	 * @type {float}
	 */
	this.wireframeLinewidth = 1;

	/**
	 * @desc 材质是否设定目标变形动画
	 * @default
	 * @type {boolean}
	 */
	this.morphTargets = false;

	this.setValues( parameters );

};
/**
 * @desc MeshNormalMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.MeshNormalMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc MeshNormalMaterial材质的克隆函数
 * @returns {THREE.MeshNormalMaterial}
 */
THREE.MeshNormalMaterial.prototype.clone = function () {

	var material = new THREE.MeshNormalMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	return material;

};
