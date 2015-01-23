/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
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
 * @classdesc 高光材质类型
 * @desc mesh(网格)的phong(冯氏)高光材质类型<br />
 * 表面有光泽的材质类型,计算每个像素
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.MeshPhongMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'MeshPhongMaterial'
	 * @type {string}
	 */
	this.type = 'MeshPhongMaterial';

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
	 * @desc 高光色<br />
	 * 默认初始化为0x111111,灰色, 材质发光区域的颜色,<br />
	 * 比如设置为漫射颜色,亮度加大,材质更像金属,<br />
	 * 设成灰色,使材质更像塑料.默认是灰色的.
	 * @default 0x111111 灰色
	 * @type {THREE.Color}
	 */
	this.specular = new THREE.Color( 0x111111 );
	/**
	 * @desc 高光的强度,数值越大,高光呈现出一个亮点.
	 * @default
	 * @type {number}
	 */
	this.shininess = 30;
	/**
	 * @desc 是否是金属
	 * @default
	 * @type {boolean}
	 */
	this.metal = false;

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

	//所谓纯色的凹凸贴图就是如同浮雕效果一样的图像。其颜色与线框色相同。
	// 如果按默认色的话则为黑（白）色（即：黑色屏幕时为白色，白色背景时为黑色。）
	// 如下面的浮雕效果，就是白色线框绘出的立方体而凹凸贴图的。
	/**
	 * @desc 凹凸贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.bumpMap = null;
	/**
	 * @desc 凹凸贴图的纹理大小.
	 * @default
	 * @type {float}
	 */
	this.bumpScale = 1;
	// 法线贴图就是在原物体的凹凸表面的每个点上均作法线，
	// 通过RGB颜色通道来标记法线的方向，
	// 你可以把它理解成与原凹凸表面平行的另一个不同的表面，
	// 但实际上它又只是一个光滑的平面。
	// 对于视觉效果而言，它的效率比原有的凹凸表面更高，
	// 若在特定位置上应用光源，
	// 可以让细节程度较低的表面生成高细节程度的精确光照方向和反射效果。
	/**
	 * @desc 法线贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.normalMap = null;
	/**
	 * @desc 法线缩放，指定一个数值,将法线贴图与网格大小进行匹配.
	 * @default ( 1, 1 )
	 * @type {THREE.Vector2}
	 */
	this.normalScale = new THREE.Vector2( 1, 1 );

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
 * @desc MeshPhongMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.MeshPhongMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc MeshPhongMaterial材质的克隆函数
 * @returns {THREE.MeshPhongMaterial}
 */
THREE.MeshPhongMaterial.prototype.clone = function () {

	var material = new THREE.MeshPhongMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.ambient.copy( this.ambient );
	material.emissive.copy( this.emissive );
	material.specular.copy( this.specular );
	material.shininess = this.shininess;

	material.metal = this.metal;

	material.wrapAround = this.wrapAround;
	material.wrapRGB.copy( this.wrapRGB );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.bumpMap = this.bumpMap;
	material.bumpScale = this.bumpScale;

	material.normalMap = this.normalMap;
	material.normalScale.copy( this.normalScale );

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
