/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  opacity: <float>,
 *
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
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */
/**
 * @classdesc mesh(网格)的Lambert(兰伯特)材质
 * @desc 表面有光泽的材质类型,计算每个像素)
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.MeshLambertMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'MeshLambertMaterial'
	 * @type {string}
	 */
	this.type = 'MeshLambertMaterial';
	/**
	 * @desc 材质颜色
	 * @default 0xffffff 白色
	 * @type {THREE.Color}
	 */
	this.color = new THREE.Color( 0xffffff ); // diffuse
	/**
	 * @desc 环境色
	 * @default 0xffffff 白色
	 * @type {THREE.Color}
	 */
	this.ambient = new THREE.Color( 0xffffff );
	/**
	 * @desc 自发光(荧光)颜色
	 * @default 0x000000 黑色
	 * @type {THREE.Color}
	 */
	this.emissive = new THREE.Color( 0x000000 );
	/**
	 * @desc 是否遮罩
	 * @default
	 * @type {boolean}
	 */
	this.wrapAround = false;
	/**
	 * @desc 遮罩颜色
	 * @default ( 1, 1, 1 )
	 * @type {THREE.Vector3}
	 */
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );
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
	/**
	 * @desc 材质是否反转(变换)法线
	 * @default
	 * @type {boolean}
	 */
	this.morphNormals = false;

	this.setValues( parameters );

};
/**
 * @desc MeshLambertMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.MeshLambertMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc MeshLambertMaterial材质的克隆函数
 * @returns {THREE.MeshLambertMaterial}
 */
THREE.MeshLambertMaterial.prototype.clone = function () {

	var material = new THREE.MeshLambertMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.ambient.copy( this.ambient );
	material.emissive.copy( this.emissive );

	material.wrapAround = this.wrapAround;
	material.wrapRGB.copy( this.wrapRGB );

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
	material.morphNormals = this.morphNormals;

	return material;

};
