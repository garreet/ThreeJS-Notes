/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 渲染目标对象
 * @desc 通过options设置渲染目标对象，参数见对象的成员变量
 * @param {number} width 宽度
 * @param {number} height 高度
 * @param {*} options 参数列表
 * @constructor
 */
THREE.WebGLRenderTarget = function ( width, height, options ) {
	/**
	 * @desc 宽度
	 * @type {number}
	 */
	this.width = width;
	/**
	 * @desc 高度
	 * @type {number}
	 */
	this.height = height;

	options = options || {};
	/**
	 * @desc 纹理横轴覆盖模式
	 * @type {number}
	 */
	this.wrapS = options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping;
	/**
	 * @desc 纹理纵轴覆盖模式
	 * @type {number}
	 */
	this.wrapT = options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping;
	/**
	 * @desc 纹理扩大插值模式
	 * @type {number}
	 */
	this.magFilter = options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter;
	/**
	 * @desc 纹理缩小插值模式
	 * @type {number}
	 */
	this.minFilter = options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter;
	/**
	 * @desc 各向异性参数
	 * @type {number}
	 */
	this.anisotropy = options.anisotropy !== undefined ? options.anisotropy : 1;
	/**
	 * @desc 纹理起始偏移
	 * @type {number}
	 */
	this.offset = new THREE.Vector2( 0, 0 );
	/**
	 * @desc 纹理重复参数
	 * @type {number}
	 */
	this.repeat = new THREE.Vector2( 1, 1 );
	/**
	 * @desc 纹理颜色格式
	 * @type {number}
	 */
	this.format = options.format !== undefined ? options.format : THREE.RGBAFormat;
	/**
	 * @desc 纹理数据字节大小
	 * @type {number}
	 */
	this.type = options.type !== undefined ? options.type : THREE.UnsignedByteType;
	/**
	 * @desc 是否是深度缓冲
	 * @type {boolean}
	 */
	this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
	/**
	 * @desc 是否是模板缓冲
	 * @type {number}
	 */
	this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
	/**
	 * @desc 是否生成Mipmap
	 * @type {boolean}
	 */
	this.generateMipmaps = true;
	/**
	 * @desc 共享深度连接
	 * @type {*}
	 */
	this.shareDepthFrom = null;

};

THREE.WebGLRenderTarget.prototype = {

	constructor: THREE.WebGLRenderTarget,
	/**
	 * @desc 设置渲染目标的尺寸
	 * @param {number} width 宽度
	 * @param {number} height 高度
	 */
	setSize: function ( width, height ) {

		this.width = width;
		this.height = height;

	},
	/**
	 * @desc 渲染目标的克隆
	 * @returns {THREE.WebGLRenderTarget}
	 */
	clone: function () {

		var tmp = new THREE.WebGLRenderTarget( this.width, this.height );

		tmp.wrapS = this.wrapS;
		tmp.wrapT = this.wrapT;

		tmp.magFilter = this.magFilter;
		tmp.minFilter = this.minFilter;

		tmp.anisotropy = this.anisotropy;

		tmp.offset.copy( this.offset );
		tmp.repeat.copy( this.repeat );

		tmp.format = this.format;
		tmp.type = this.type;

		tmp.depthBuffer = this.depthBuffer;
		tmp.stencilBuffer = this.stencilBuffer;

		tmp.generateMipmaps = this.generateMipmaps;

		tmp.shareDepthFrom = this.shareDepthFrom;

		return tmp;

	},
	/**
	 * @desc WebGLRenderTarget的销毁事件
	 */
	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.WebGLRenderTarget.prototype );
