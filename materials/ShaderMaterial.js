/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  defines: { "label" : "value" },
 *  uniforms: { "parameter1": { type: "f", value: 1.0 }, "parameter2": { type: "i" value2: 2 } },
 *
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  lights: <bool>,
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
 * @classdesc 自定义着色器创建材质类型
 * @desc 这样的材质对象让用户扩充材质类型,有了无限的可能
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.ShaderMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'ShaderMaterial'
	 * @type {string}
	 */
	this.type = 'ShaderMaterial';
	/**
	 * @desc 用户自定义defines变量
	 * @default
	 * @type {*}
	 */
	this.defines = {};
	/**
	 * @desc 用户自定义uniforms变量
	 * @default
	 * @type {*}
	 */
	this.uniforms = {};
	/**
	 * @desc 用户自定义attributes变量
	 * @default
	 * @type {*}
	 */
	this.attributes = null;
	/**
	 * @desc 自定义顶点着色器
	 * @type {string}
	 */
	this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
	/**
	 * @desc 自定义片段着色器
	 * @type {string}
	 */
	this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';
	/**
	 * @desc 着色方式<br />
	 * THREE.SmoothShading平滑着色：用多种颜色进行绘制<br />
	 * 每个顶点都是单独进行处理的，各顶点和各图元之间采用均匀插值。
	 * @default
	 * @type {number}
	 */
	this.shading = THREE.SmoothShading;
	/**
	 * @desc 线的宽度
	 * @default
	 * @type {float}
	 */
	this.linewidth = 1;
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
	 * @desc 雾效，默认关闭
	 * @default
	 * @type {boolean}
	 */
	this.fog = false; // set to use scene fog
	/**
	 * @desc 是否使用场景内的灯光，默认关闭
	 * @default
	 * @type {boolean}
	 */
	this.lights = false; // set to use scene lights
	/**
	 * @desc 材质顶点颜色
	 * @default THREE.NoColors
	 * @type {number}
	 */
	this.vertexColors = THREE.NoColors; // set to use "color" attribute stream
	/**
	 * @desc 材质是否使用蒙皮
	 * @default
	 * @type {boolean}
	 */
	this.skinning = false; // set to use skinning attribute streams

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

	// When rendered geometry doesn't include these attributes but the material does,
	// use these default values in WebGL. This avoids errors when buffer data is missing.
	// 当渲染几何体不包含这些属性,但是材质中包含,在WEBGL中使用这些默认的值,可以避免缓存数据丢失发生错误.
	/**
	 * @des　默认渲染属性
	 * @type {*}
	 */
	this.defaultAttributeValues = {
		'color': [ 1, 1, 1 ],
		'uv': [ 0, 0 ],
		'uv2': [ 0, 0 ]
	};
	/**
	 * @desc 用来接收索引为0的属性
	 * @type {String}
	 */
	this.index0AttributeName = undefined;

	this.setValues( parameters );

};
/**
 * @desc ShaderMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.ShaderMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc ShaderMaterial材质的克隆函数
 * @returns {THREE.ShaderMaterial}
 */
THREE.ShaderMaterial.prototype.clone = function () {

	var material = new THREE.ShaderMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.fragmentShader = this.fragmentShader;
	material.vertexShader = this.vertexShader;

	material.uniforms = THREE.UniformsUtils.clone( this.uniforms );

	material.attributes = this.attributes;
	material.defines = this.defines;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	material.fog = this.fog;

	material.lights = this.lights;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;

	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};
