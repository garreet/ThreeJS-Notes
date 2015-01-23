/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *  fog: <bool>
 * }
 */
/**
 * @classdesc mesh(网格)的基本材质材质
 * @desc 据参数parameters创建线段的线线型材质，参数为JSON格式的属性参数
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.MeshBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'MeshBasicMaterial'
	 * @type {string}
	 */
	this.type = 'MeshBasicMaterial';
	/**
	 * @desc 材质颜色
	 * @default 0xffffff 白色
	 * @type {THREE.Color}
	 */
	this.color = new THREE.Color( 0xffffff ); // emissive
	/**
	 * @desc 纹理贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.map = null;
	/**
	 * @desc 光照贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.lightMap = null;
	/**
	 * @desc 高光贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.specularMap = null;
	/**
	 * @desc 透明贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.alphaMap = null;
	/**
	 * @desc 环境贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.envMap = null;
	/**
	 * @desc 材质混合模式
	 * @default THREE.MultiplyOperation
	 * @type {number}
	 */
	this.combine = THREE.MultiplyOperation;
	/**
	 * @desc 反射率
	 * @default
	 * @type {float}
	 */
	this.reflectivity = 1;
	/**
	 * @desc 折射率
	 * @default
	 * @type {float}
	 */
	this.refractionRatio = 0.98;
	/**
	 * @desc 雾效，默认开启
	 * @default
	 * @type {boolean}
	 */
	this.fog = true;
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
	 * @desc 线框端点类型，参照LineBasicMaterial的定义
	 * @default 'round'
	 * @type {string}
	 */
	this.wireframeLinecap = 'round';
	/**
	 * @desc 线框连接类型，参照LineBasicMaterial的定义
	 * @default 'round'
	 * @type {string}
	 */
	this.wireframeLinejoin = 'round';
	/**
	 * @desc 材质顶点颜色
	 * @default THREE.NoColors
	 * @type {number}
	 */
	this.vertexColors = THREE.NoColors;
	/**
	 * @desc 材质是否使用蒙皮
	 * @default
	 * @type {boolean}
	 */
	this.skinning = false;
	/**
	 * @desc 材质是否设定目标变形动画
	 * @default
	 * @type {boolean}
	 */
	this.morphTargets = false;

	this.setValues( parameters );

};
/**
 * @desc MeshBasicMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.MeshBasicMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc 面材质的克隆函数
 * @returns {THREE.MeshBasicMaterial}
 */
THREE.MeshBasicMaterial.prototype.clone = function () {

	var material = new THREE.MeshBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.specularMap = this.specularMap;

	material.alphaMap = this.alphaMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;

	return material;

};
