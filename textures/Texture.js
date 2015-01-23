/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

/**
 * @classdesc 纹理对象基类
 * @desc 用来创建一个反射折射或者纹理贴图对象
 * @param {Image} image	图片等Image类型对象
 * @param {number} mapping	映射模式
 * @param {number} wrapS	S方向覆盖模式
 * @param {number} wrapT	T方向覆盖模式
 * @param {number} magFilter	纹理在放大时的过滤方式
 * @param {number} minFilter	纹理在缩小时的过滤方式
 * @param {number} format	像素数据的颜色格式
 * @param {number} type	数据类型,默认为不带符号8位整形值
 * @param {float} anisotropy	各向异性,取值范围0.0-1.0 ,,经常用来通过这个值,产生不同的表面效果,木材和金属都发光,但是发光的特点是有区别的.
 * @constructor
 */
THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	Object.defineProperty( this, 'id', { value: THREE.TextureIdCount ++ } );
	/**
	 * @desc 纹理的唯一ID
	 */
	this.uuid = THREE.Math.generateUUID();
	/**
	 * @default
	 * @type {string}
	 */
	this.name = '';
	/**
	 * @default THREE.Texture.DEFAULT_IMAGE
	 * @type {Image}
	 */
	this.image = image !== undefined ? image : THREE.Texture.DEFAULT_IMAGE;

	/**
	 * @desc 存放mipmaps的数组<br />
	 * Mipmap在三维世界中,显示一张图的大小与摄象机的位置有关,近的地方,图片实际象素就大一些,远的地方图片实际象<br />
	 * 素就会小一些,就要进行一些压缩,例如一张64*64的图,在近处,显示出来可能是50*50,在远处可能显示出来是20*20.<br />
	 * 如果只限于简单的支掉某些像素,将会使缩小后的图片损失很多细节,图片变得很粗糙,因此,图形学有很多复杂的方<br />
	 * 法来处理缩小图片的问题,使得缩小后的图片依然清晰,然而,这些计算都会耗费一定的时间.<br />
	 *<br />
	 * Mipmap纹理技术是目前解决纹理分辨率与视点距离关系的最有效途径,它会先将图片压缩成很多逐渐缩小的图片,<br />
	 * 例如一张64*64的图片,会产生64*64,32*32,16*16,8*8,4*4,2*2,1*1的7张图片,当屏幕上需要绘制像素点为20*20 时，<br />
	 * 程序只是利用 32*32 和 16*16 这两张图片来计算出即将显示为 20*20 大小的一个图片，这比单独利用 32*32 的<br />
	 * 那张原始片计算出来的图片效果要好得多，速度也更快.<br />
	 *<br />
	 * 参考:http://zh.wikipedia.org/wiki/Mipmap<br />
	 * 参考:http://staff.cs.psu.ac.th/iew/cs344-481/p1-williams.pdf<br />
	 * 参考:http://blog.csdn.net/linber214/article/details/3342051<br />
	 * @default
	 * @type {Array}
	 */
	this.mipmaps = [];
	/**
	 * @desc 映射模式,有<br />
	 * THREE.UVMapping平展映射<br />
	 * THREE.CubeReflectionMapping 立方体反射映射<br />
	 * THREE.CubeRefractionMapping立方体折射映射<br />
	 * THREE.SphericalReflectionMapping球面反射映射<br />
	 * THREE.SphericalRefractionMapping球面折射映射.
	 * @default THREE.Texture.DEFAULT_MAPPING
	 * @type {number}
	 */
	this.mapping = mapping !== undefined ? mapping : THREE.Texture.DEFAULT_MAPPING;
	/**
	 * @desc S方向纹理覆盖方式，有<br />
	 * THREE.RepeatWrapping = 1000;			//平铺<br />
	 * THREE.ClampToEdgeWrapping = 1001;	//夹取<br />
	 * THREE.MirroredRepeatWrapping = 1002;	//镜像<br />
	 * 纹理映射范围 (0.0 , 1.0)
	 * @default THREE.ClampToEdgeWrapping
	 * @type {number}
	 */
	this.wrapS = wrapS !== undefined ? wrapS : THREE.ClampToEdgeWrapping;
	/**
	 * @desc T方向纹理覆盖方式，有<br />
	 * THREE.RepeatWrapping = 1000;			//平铺<br />
	 * THREE.ClampToEdgeWrapping = 1001;	//夹取<br />
	 * THREE.MirroredRepeatWrapping = 1002;	//镜像<br />
	 * 纹理映射范围 (0.0 , 1.0)
	 * @default THREE.ClampToEdgeWrapping
	 * @type {number}
	 */
	this.wrapT = wrapT !== undefined ? wrapT : THREE.ClampToEdgeWrapping;
	/**
	 * @desc 纹理放大采样方式，有<br />
	 * THREE.NearestFilter = 1003;					//在纹理基层上执行最邻近过滤,<br />
	 * THREE.NearestMipMapNearestFilter = 1004;		//在mip层之间执行线性插补，并执行最临近的过滤,<br />
	 * THREE.NearestMipMapLinearFilter = 1005;		//选择最临近的mip层，并执行最临近的过滤,<br />
	 * THREE.LinearFilter = 1006;					//在纹理基层上执行线性过滤<br />
	 * THREE.LinearMipMapNearestFilter = 1007;		//选择最临近的mip层，并执行线性过滤,<br />
	 * THREE.LinearMipMapLinearFilter = 1008;		//在mip层之间执行线性插补，并执行线性过滤<br />
	 * @default THREE.LinearFilter
	 * @type {number}
	 */
	this.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;
	/**
	 * @desc 纹理缩小采样方式，只有缩小能用Mipmap ，有<br />
	 * THREE.NearestFilter = 1003;					//在纹理基层上执行最邻近过滤,<br />
	 * THREE.NearestMipMapNearestFilter = 1004;		//在mip层之间执行线性插补，并执行最临近的过滤,<br />
	 * THREE.NearestMipMapLinearFilter = 1005;		//选择最临近的mip层，并执行最临近的过滤,<br />
	 * THREE.LinearFilter = 1006;					//在纹理基层上执行线性过滤<br />
	 * THREE.LinearMipMapNearestFilter = 1007;		//选择最临近的mip层，并执行线性过滤,<br />
	 * THREE.LinearMipMapLinearFilter = 1008;		//在mip层之间执行线性插补，并执行线性过滤<br />
	 * @default THREE.LinearMipMapLinearFilter
	 * @type {number}
	 */
	this.minFilter = minFilter !== undefined ? minFilter : THREE.LinearMipMapLinearFilter;
	/**
	 * @desc  各向异性,取值范围0.0-1.0,经常用来通过这个值,产生不同的表面效果,木材和金属都发光,但是发光的特点是有区别的.
	 * @default 1
	 * @type {float}
	 */
	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;
	/**
	 * @desc 像素颜色格式，有<br />
	 * THREE.AlphaFormat = 1019;			//GL_ALPHA  Alpha 值<br />
	 * THREE.RGBFormat = 1020;				//Red, Green, Blue 三原色值<br />
	 * THREE.RGBAFormat = 1021;				//Red, Green, Blue 和 Alpha 值<br />
	 * THREE.LuminanceFormat = 1022;		//灰度值<br />
	 * THREE.LuminanceAlphaFormat = 1023;	//灰度值和 Alpha 值<br />
	 * @default THREE.RGBAFormat
	 * @type {number}
	 */
	this.format = format !== undefined ? format : THREE.RGBAFormat;
	/**
	 * @desc 定义纹理像素的数据类型，有<br />
	 * THREE.UnsignedByteType = 1009;			//不带符号8位整形值(一个字节)<br />
	 * THREE.ByteType = 1010;					//带符号8位整形值(一个字节)<br />
	 * THREE.ShortType = 1011;					//带符号16位整形值(2个字节)<br />
	 * THREE.UnsignedShortType = 1012;			//不带符号16未整形值(2个字节)<br />
	 * THREE.IntType = 1013;					//带符号32位整形值(4个字节)<br />
	 * THREE.UnsignedIntType = 1014;			//不带符号32位整形值(4个字节)<br />
	 * THREE.FloatType = 1015;					//单精度浮点型(4个字节)
	 * @default THREE.UnsignedByteType
	 * @type {number}
	 */
	this.type = type !== undefined ? type : THREE.UnsignedByteType;
	/**
	 * @desc 纹理偏移值
	 * @default ( 0 , 0)
	 * @type {THREE.Vector2}
	 */
	this.offset = new THREE.Vector2( 0, 0 );
	/**
	 * @desc 纹理重复值
	 * @default ( 1 , 1)
	 * @type {THREE.Vector2}
	 */
	this.repeat = new THREE.Vector2( 1, 1 );
	/**
	 * @desc 是否生成Mipmap
	 * @default
	 * @type {boolean}
	 */
	this.generateMipmaps = true;
	/**
	 * @desc 预乘Alpha值,如果设置为true,纹素的rgb值会先乘以alpha值,然后在存储
	 * @default
	 * @type {boolean}
	 */
	this.premultiplyAlpha = false;
	/**
	 * @desc 纹理是否需要垂直翻转
	 * @default
	 * @type {boolean}
	 */
	this.flipY = true;
	/**
	 * @desc 字节对齐
	 * @default
	 * @type {number}
	 */
	this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
	/**
	 * @desc 当设为true，则纹理已更新
	 * @default
	 * @pravite
	 * @type {number}
	 */
	this._needsUpdate = false;
	/**
	 * @dsc 更新回调函数
	 * @type {null}
	 */
	this.onUpdate = null;

};
/**
 * @memberof THREE.Texture
 * @desc 默认纹理
 * @type {number}
 */
THREE.Texture.DEFAULT_IMAGE = undefined;
/**
 * @memberof THREE.Texture
 * @desc 默认UVMapping方式
 * @type {number}
 */
THREE.Texture.DEFAULT_MAPPING = new THREE.UVMapping();

THREE.Texture.prototype = {

	constructor: THREE.Texture,
	/**
	 * @desc 获得是否更新
	 * @returns {number}
	 */
	get needsUpdate () {

		return this._needsUpdate;

	},

	/**
	 * @desc 设置是否更新，若为true则执行更新函数
	 * @param value
	 */
	set needsUpdate ( value ) {

		if ( value === true ) this.update();

		this._needsUpdate = value;

	},
	/**
	 * @desc 纹理克隆
	 * @param {THREE.Texture} texture
	 * @returns {THREE.Texture}
	 */
	clone: function ( texture ) {

		if ( texture === undefined ) texture = new THREE.Texture();

		texture.image = this.image;
		texture.mipmaps = this.mipmaps.slice( 0 );

		texture.mapping = this.mapping;

		texture.wrapS = this.wrapS;
		texture.wrapT = this.wrapT;

		texture.magFilter = this.magFilter;
		texture.minFilter = this.minFilter;

		texture.anisotropy = this.anisotropy;

		texture.format = this.format;
		texture.type = this.type;

		texture.offset.copy( this.offset );
		texture.repeat.copy( this.repeat );

		texture.generateMipmaps = this.generateMipmaps;
		texture.premultiplyAlpha = this.premultiplyAlpha;
		texture.flipY = this.flipY;
		texture.unpackAlignment = this.unpackAlignment;

		return texture;

	},
	/**
	 * @desc 纹理更新事件
	 */
	update: function () {

		this.dispatchEvent( { type: 'update' } );

	},
	/**
	 * @desc 纹理销毁事件
	 */
	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Texture.prototype );
/**
 * @memberof THREE
 * @desc 全局纹理数目
 * @type {number}
 */
THREE.TextureIdCount = 0;
