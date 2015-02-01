/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 材质对象
 * @desc Material是材质对象的抽象基类,当创建材质时都从这个类继承<br />
 * Material对象的功能函数采用定义构造的函数原型对象来实现<br />
 * 简单的说就是物体看起来是什么质地。材质可以看成是材料和质感的结合。<br />
 * 在渲染程式中，它是表面各可视属性的结合，这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。
 * @constructor
 */
THREE.Material = function () {

	Object.defineProperty( this, 'id', { value: THREE.MaterialIdCount ++ } );
	/**
	 * @desc 材质唯一ID
	 */
	this.uuid = THREE.Math.generateUUID();

	/**
	 * @desc 材质名称
	 * @default
	 * @type {string}
	 */
	this.name = '';
	/**
	 * @desc 材质类型
	 * @default
	 * @type {string}
	 */
	this.type = 'Material';
	/**
	 * @desc 材质的单双面<br />
	 * THREE.FrontSide 材质只附着正面<br />
	 * THREE.BackSide 材质只附着背面<br />
	 * THREE.DoubleSide 模型双面都附着材质
	 * @default THREE.FrontSide
	 * @type {number}
	 */
	this.side = THREE.FrontSide;
	/**
	 * @desc 材质透明度，(0.0 ,1.0)只有在 transparent = true 才使用<br />
	 * 透明是渲染像素时，待渲染值与已存在值共同作用计算出渲染后像素值，达到混合的效果
	 * @type {float}
	 */
	this.opacity = 1;
	/**
	 * @desc 是否支持材质透明
	 * @type {boolean}
	 */
	this.transparent = false;
	/**
	 * @desc 材质混合方式
	 * @default THREE.NormalBlending;
	 * @type {number}
	 */
	this.blending = THREE.NormalBlending;
	/**
	 * @desc 混合颜色的源颜色因子
	 * @default THREE.SrcAlphaFactor
	 * @type {number}
	 */
	this.blendSrc = THREE.SrcAlphaFactor;
	/**
	 * @desc 混合颜色的目标颜色因子
	 * @default THREE.OneMinusSrcAlphaFactor
	 * @type {number}
	 */
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	/**
	 * @desc 混合方程式
	 * @default THREE.AddEquation 相加
	 * @type {number}
	 */
	this.blendEquation = THREE.AddEquation;
	/**
	 * @desc 深度测试,默认为true,如果设置为false,在场景中远处的对象不被近处的对象遮挡
	 * @default
	 * @type {boolean}
	 */
	this.depthTest = true;
	/**
	 * @desc 允许或禁止向深度缓冲区写入数据,默认为true,指定是否允许向深度缓冲区写入数据
	 * @default
	 * @type {boolean}
	 */
	this.depthWrite = true;
	/**
	 * @desc 多边形位移,当两个面共面时,会出现十分难看的z - fighting 问题<br />
	 * 要解决此问题可以使用, Polygon Offset
	 * @default
	 * @type {boolean}
	 */
	this.polygonOffset = false;
	/**
	 * @desc 多边形位移因子
	 * @default
	 * @type {number}
	 */
	this.polygonOffsetFactor = 0;
	/**
	 * @desc 多边形位移单位
	 * @default
	 * @type {number}
	 */
	this.polygonOffsetUnits = 0;
	/**
	 * @desc alpha测试,取值范围0.0-1.0
	 * @default
	 * @type {float}
	 */
	this.alphaTest = 0;
	/**
	 * @desc 当三角面之间产生间距,发生图形走样时<br />
	 * 填充像素,确保图形保真,消除走样.通常取值范围在0.0=1.0之间
	 * @default
	 * @type {float}
	 */
	this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
	/**
	 * @desc 是否可见
	 * @default
	 * @type {boolean}
	 */
	this.visible = true;
	/**
	 * @desc //当设置为true时,标记材质已经更新.
	 * @default
	 * @type {boolean}
	 */
	this.needsUpdate = true;

};

THREE.Material.prototype = {

	constructor: THREE.Material,
	/**
	 * @desc 通过参数values设置材质对象的属性.values参数的格式为<br />
	 *  values = {
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
	 * @param {*} values 材质属性
	 * @return {THREE.Material}
	 */
	setValues: function ( values ) {

		if ( values === undefined ) return;

		//遍历values中的键值,并一一赋值给当前材质对象.
		for ( var key in values ) {

			var newValue = values[ key ];

			if ( newValue === undefined ) {

				console.warn( "THREE.Material: '" + key + "' parameter is undefined." );
				continue;

			}

			if ( key in this ) {

				var currentValue = this[ key ];

				if ( currentValue instanceof THREE.Color ) {

					currentValue.set( newValue );

				} else if ( currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3 ) {

					currentValue.copy( newValue );

				} else if ( key == 'overdraw' ) {

					// ensure overdraw is backwards-compatable with legacy boolean type
					this[ key ] = Number( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		}

	},
	/**
	 * @desc 将材质转换为JSON格式<br />
	 * 包含了多种材质格式的转换方法
	 */
	toJSON: function () {

		var output = {
			metadata: {
				version: 4.2,
				type: 'material',
				generator: 'MaterialExporter'
			},
			uuid: this.uuid,
			type: this.type
		};

		if ( this.name !== "" ) output.name = this.name;

		if ( this instanceof THREE.MeshBasicMaterial ) {

			output.color = this.color.getHex();
			if ( this.vertexColors !== THREE.NoColors ) output.vertexColors = this.vertexColors;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshLambertMaterial ) {

			output.color = this.color.getHex();
			output.ambient = this.ambient.getHex();
			output.emissive = this.emissive.getHex();
			if ( this.vertexColors !== THREE.NoColors ) output.vertexColors = this.vertexColors;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshPhongMaterial ) {

			output.color = this.color.getHex();
			output.ambient = this.ambient.getHex();
			output.emissive = this.emissive.getHex();
			output.specular = this.specular.getHex();
			output.shininess = this.shininess;
			if ( this.vertexColors !== THREE.NoColors ) output.vertexColors = this.vertexColors;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshNormalMaterial ) {

			if ( this.shading !== THREE.FlatShading ) output.shading = this.shading;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshDepthMaterial ) {

			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.ShaderMaterial ) {

			output.uniforms = this.uniforms;
			output.vertexShader = this.vertexShader;
			output.fragmentShader = this.fragmentShader;

		} else if ( this instanceof THREE.SpriteMaterial ) {

			output.color = this.color.getHex();

		}

		if ( this.opacity < 1 ) output.opacity = this.opacity;
		if ( this.transparent !== false ) output.transparent = this.transparent;
		if ( this.wireframe !== false ) output.wireframe = this.wireframe;

		return output;

	},
	/**
	 * @desc 克隆材质
	 * @param {THREE.Material} material
	 * @returns {THREE.Material}
	 */
	clone: function ( material ) {

		if ( material === undefined ) material = new THREE.Material();

		material.name = this.name;

		material.side = this.side;

		material.opacity = this.opacity;
		material.transparent = this.transparent;

		material.blending = this.blending;

		material.blendSrc = this.blendSrc;
		material.blendDst = this.blendDst;
		material.blendEquation = this.blendEquation;

		material.depthTest = this.depthTest;
		material.depthWrite = this.depthWrite;

		material.polygonOffset = this.polygonOffset;
		material.polygonOffsetFactor = this.polygonOffsetFactor;
		material.polygonOffsetUnits = this.polygonOffsetUnits;

		material.alphaTest = this.alphaTest;

		material.overdraw = this.overdraw;

		material.visible = this.visible;

		return material;

	},
	/**
	 * @desc 材质的销毁函数
	 */
	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

//EventDispatcher方法应用到当前Material对象.
THREE.EventDispatcher.prototype.apply( THREE.Material.prototype );
/**
 * @memberof THREE
 * @desc 全局材质对象数目
 * @type {number}
 */
THREE.MaterialIdCount = 0;
