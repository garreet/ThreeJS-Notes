/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @classdesc 颜色值，RGB
 * @param {rgb|int} color - 一个rgb颜色值 rgb(256,256,256) 或者一个0x开头的6位16进制颜色值(0xaabbff);
 * @returns {THREE.Color}
 * @constructor
 */
THREE.Color = function ( color ) {

	if ( arguments.length === 3 ) {

		return this.setRGB( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] );

	}

	return this.set( color )

};

/**
 * @desc THREE.Color 的函数列表
 * @returns {THREE.Color}
 */
THREE.Color.prototype = {

	constructor: THREE.Color,

	r: 1, g: 1, b: 1,		//初始化属性（颜色值）r,g,b为1

	/**
	 * @desc 颜色对象内置的set方法，将16进制颜色值，rgb颜色值，颜色对象复制给当前实例
	 * @param {THREE.Color|number|string} value 颜色参数
	 * @returns {THREE.Color}
	 */
	set: function ( value ) {

		if ( value instanceof THREE.Color ) {			//如果参数value是THREE.Color的实例化对象

			this.copy( value );

		} else if ( typeof value === 'number' ) {		//如果参数value的类型为number

			this.setHex( value );

		} else if ( typeof value === 'string' ) {		//如果参数value的类型为string

			this.setStyle( value );

		}

		return this;

	},

	/**
	 * @desc 设置16进制颜色值给当前实例
	 * @param {number} hex 16进制颜色值
	 * @returns {THREE.Color}
	 */
	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	},

	/**
	 * @desc 设置r,g,b颜色值给当前实例
	 * @param {number} r 红	(0-255)
	 * @param {number} g 绿	(0-255)
	 * @param {number} b 蓝	(0-255)
	 * @returns {THREE.Color}
	 */
	setRGB: function ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	},

	/**
	 * @desc 设置h,s,l颜色值给当前实例
	 * @param {number} h 色相	(0.0 , 1.0)
	 * @param {number} s 饱和度	(0.0 , 1.0)
	 * @param {number} l 亮度	(0.0 , 1.0)
	 * @returns {THREE.Color}
	 */
	setHSL: function ( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0

		if ( s === 0 ) {							//如果s=0,表示灰色,

			this.r = this.g = this.b = l;			//定义rgb都为l.

		} else {
			//定义一个方法hue2rgb,将hsl颜色转换成rgb颜色值,根据第三个参数计算rgb的值。
			//更多关于hsl颜色模型和hsl转换成rgb方面的内容
			//参考下面的实例或者查看维基百科。
			var hue2rgb = function ( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			};

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	},

	/**
	 * @desc 通过参数style传递不同的rgb颜色值表示类型给当前实例,列出了以下5种样式<br />
	 * rgb(255,0,0)    数值型<br />
	 * rgb(100%,0%,0%) 百分比型<br />
	 * #ff0000         6位16进制型<br />
	 * #f00            3位16进制型<br />
	 * red             颜色名
	 * @param {string }style
	 * @returns {THREE.Color}
	 */
	setStyle: function ( style ) {

		// rgb(255,0,0)

		if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {

			var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );

			this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
			this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
			this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

			return this;

		}

		// rgb(100%,0%,0%)

		if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {

			var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );

			this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
			this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
			this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

			return this;

		}

		// #ff0000

		if ( /^\#([0-9a-f]{6})$/i.test( style ) ) {

			var color = /^\#([0-9a-f]{6})$/i.exec( style );

			this.setHex( parseInt( color[ 1 ], 16 ) );

			return this;

		}

		// #f00

		if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {

			var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );

			this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );

			return this;

		}

		// red

		if ( /^(\w+)$/i.test( style ) ) {

			this.setHex( THREE.ColorKeywords[ style ] );

			return this;

		}


	},

	/**
	 * @desc 赋值颜色属性给当前实例
	 * @param {THREE.Color} color 颜色属性
	 * @returns {THREE.Color}
	 */
	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	},

	/*
	下面函数用于对色彩的Gamma 曲线调整，对色彩进行补偿之类的吧，
	使图形图像色彩更加的绚丽，不至于失真。
	更多专业知识求大神补充。
	*/

	/**
	 * @desc 将color的rgb值分别平方，赋给调用者对象
	 * @param {THREE.Color} color
	 * @returns {THREE.Color}
	 */
	copyGammaToLinear: function ( color ) {

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;

	},

	/**
	 * @desc 将color的rgb值分别开方，赋给调用者对象
	 * @param {THREE.Color} color
	 * @returns {THREE.Color}
	 */
	copyLinearToGamma: function ( color ) {

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;

	},

	/**
	 * @desc 将当前color的rgb值分别平方
	 * @returns {THREE.Color}
	 */
	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	/**
	 * @desc 将当前color的rgb值分别开方
	 * @returns {THREE.Color}
	 */
	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	/**
	 * @desc 获得当前color颜色值并返回16进制int型颜色值
	 * @returns {number}
	 */
	getHex: function () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	},

	/**
	 * @desc 获得当前color颜色值并返回16进制string颜色值
	 * @returns {string}
	 */
	getHexString: function () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	},

	/**
	 * @desc 根据Object{ h: 0, s: 0, l: 0 }获取hsl值
	 * @param optionalTarget
	 * @returns {*|{h: number, s: number, l: number}}
	 */
	getHSL: function ( optionalTarget ) {

		// h,s,l ranges are in 0.0 - 1.0

		var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

		var r = this.r, g = this.g, b = this.b;

		var max = Math.max( r, g, b );
		var min = Math.min( r, g, b );

		var hue, saturation;
		var lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			var delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		hsl.h = hue;
		hsl.s = saturation;
		hsl.l = lightness;

		return hsl;

	},

	/**
	 * @desc 获取rgb(255,0,0) 数值型的颜色值
	 * @returns {string}
	 */
	getStyle: function () {

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	},

	/*
	下面函数用于对颜色的计算.
	*/

	/**
	 * @desc 当前颜色按照传递的参数(h,s,l)对颜色值进行偏移
	 * @param {number} h 色相	(0.0 , 1.0)
	 * @param {number} s 饱和度	(0.0 , 1.0)
	 * @param {number} l 亮度	(0.0 , 1.0)
	 * @returns {THREE.Color}
	 */
	offsetHSL: function ( h, s, l ) {

		var hsl = this.getHSL();

		hsl.h += h; hsl.s += s; hsl.l += l;

		this.setHSL( hsl.h, hsl.s, hsl.l );

		return this;

	},

	/**
	 * @desc 当前颜色按照传递的参数color对颜色值进行偏移
	 * @param {THREE.Color} color 偏移的颜色值
	 * @returns {THREE.Color}
	 */
	add: function ( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	},

	/**
	 * @desc 颜色相加
	 * @param {THREE.Color} color1 颜色值1
	 * @param {THREE.Color} color2 颜色值2
	 * @returns {THREE.Color}
	 */
	addColors: function ( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	},
	/**
	 * @desc 当前颜色按照传递的参数s对颜色值进行相加
	 * @param {number} s 偏移的颜色值
	 * @returns {THREE.Color}
	 */
	addScalar: function ( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	},

	/**
	 * @desc 当前颜色按照传递的参数color对颜色值进行相乘
	 * @param {THREE.Color} color 偏移的颜色值
	 * @returns {THREE.Color}
	 */
	multiply: function ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	},
	/**
	 * @desc 当前颜色按照传递的参数s对颜色值进行相乘
	 * @param {number} s 偏移的颜色值
	 * @returns {THREE.Color}
	 */
	multiplyScalar: function ( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	},

	/**
	 * 当前颜色this.r[g][b]设置为下限和上限参数color.r[g][b] 之间进行插值
	 * @param {THREE.Color} color	颜色
	 * @param {number} alpha		百分比权重
	 * @returns {THREE.Color}
	 */
	lerp: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	},

	/**
	 * @desc 颜色值比较
	 * @param {THREE.Color} c
	 * @returns {boolean}
	 */
	equals: function ( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	},

	/**
	 * @desc 存储颜色值的数组赋值给当前颜色对象
	 * @param {number[]} array
	 * @returns {THREE.Color}
	 */
	fromArray: function ( array ) {

		this.r = array[ 0 ];
		this.g = array[ 1 ];
		this.b = array[ 2 ];

		return this;

	},

	/**
	 * @desc 当前颜色对象赋值给数组
	 * @returns {number[]}
	 */
	toArray: function () {

		return [ this.r, this.g, this.b ];

	},

	/**
	 * @desc 克隆颜色值
	 * @returns {THREE.Color}
	 */
	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );

	}

};

/**
 * @@memberof THREE
 * @desc 全局颜色列表
 * @type {*}
 */
THREE.ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };
