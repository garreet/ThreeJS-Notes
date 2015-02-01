/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
/**
 * @classdesc 二维向量
 * @param {float} x - x坐标
 * @param {float} y - y坐标
 * @returns {THREE.Vector2}
 * @constructor
 */
THREE.Vector2 = function ( x, y ) {
	/**
	 * @default 0
	 * @type {float}
	 */
	this.x = x || 0;
	/**
	 * @default 0
	 * @type {float}
	 */
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,
	/**
	 * @desc 设置二维向量
	 * @param {float} x - x坐标
	 * @param {float} y - y坐标
	 * @returns {THREE.Vector2}
	 */
	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;
	},
	/**
	 * @desc 设置X坐标
	 * @param {float} x - x坐标
	 * @returns {THREE.Vector2}
	 */
	setX: function ( x ) {

		this.x = x;

		return this;
	},
	/**
	 * @desc 设置Y坐标
	 * @param {float} y - y坐标
	 * @returns {THREE.Vector2}
	 */
	setY: function ( y ) {

		this.y = y;

		return this;
	},

	/**
	 * @desc 根据索引设置向量
	 * @param {number} index (0,1)
	 * @param {float} value 坐标数值
	 */
	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}
	},

	/**
	 * @desc 根据索引获取坐标值
	 * @param {number} index (0,1)
	 * @returns {float}
	 */
	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}
	},

	/**
	 * @desc 拷贝二维向量v
	 * @param {THREE.Vector2} v 源向量
	 * @returns {THREE.Vector2}
	 */
	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;
	},

	/**
	 * @desc 二维向量 v , w 相加<br />
	 * 几何意义: 合并 v , w 分量 , v的尾到w的头
	 * @param {THREE.Vector2} v
	 * @param {THREE.Vector2} w	可以不传入，则为自身加v
	 * @returns {THREE.Vector2}
	 */
	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );
		}

		this.x += v.x;
		this.y += v.y;

		return this;
	},

	/**
	 * @desc 二维向量 a + b 相加 <br />
	 * 几何意义: 合并a + b 分量 a的尾到b的头
	 * @param {THREE.Vector2} a
	 * @param {THREE.Vector2} b
	 * @returns {THREE.Vector2}
	 */
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},

	/**
	 * @desc 二维向量x,y分量与s标量相加<br />
	 * 几何意义: 向量分别向 x , y 轴平移s
	 * @param {float} s x,y偏移量
	 * @returns {THREE.Vector2}
	 */
	addScalar: function ( s ) {

		this.x += s;
		this.y += s;

		return this;

	},
	/**
	 * @desc 二维向量v ,w相减
	 * 几何意义: v -w 分量 ; v的尾到w的尾
	 * @param {THREE.Vector2} v
	 * @param {THREE.Vector2} w 可以不传入，不传入则为自身减v
	 * @returns {THREE.Vector2}
	 */
	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	/**
	 * @desc 二维向量 a , b 相减<br />
	 * 几何意义: a -b 分量 ; a的尾到b的尾
	 * @param {THREE.Vector2} a
	 * @param {THREE.Vector2} b
	 * @returns {THREE.Vector2}
	 */
	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},

	/**
	 * @desc 二维向量与v向量乘法
	 * @param {THREE.Vector2} v
	 * @returns {THREE.Vector2}
	 */
	multiply: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	},

	/**
	 * @desc 二维向量与标量s的乘法<br />
	 * 几何意义：向量的缩放
	 * @param {float} s 缩放比例
	 * @returns {THREE.Vector2}
	 */
	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	/**
	 * @desc 二维向量与向量v的除法
	 * @param {THREE.Vector2} v  被除向量
	 * @returns {THREE.Vector2}
	 */
	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	},

	/**
	 * @desc 二维向量与向量scalar的除法<br />
	 * 几何意义：向量的缩放
	 * 若scalar==0 ，结果为零向量
	 * @param {float} scalar 被除标量
	 * @returns {THREE.Vector2}
	 */
	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;

		}

		return this;

	},

	/**
	 * @desc 向量和参考向量v取最小值
	 * @param {THREE.Vector2} v 比较向量
	 * @returns {THREE.Vector2}
	 */
	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		return this;

	},
	/**
	 * @desc 向量和参考向量v取最大值
	 * @param {THREE.Vector2} v 比较向量
	 * @returns {THREE.Vector2}
	 */
	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		return this;

	},

	/**
	 * @desc 二维向量的(x,y)坐标值直接与参数min,参数max的(x,y)比较,如果当前二维向量的值小于参数min的(x,y)
	 * @param {THREE.Vector2} min 最小向量
	 * @param {THREE.Vector2} max 最大向量
	 * @returns {THREE.Vector2}
	 */
	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		return this;
	},

	/**
	 * @function
	 * @desc 二维向量的(x,y)坐标值直接与参数minVal,参数maxVal比较,如果当前二维向量的值小于参数minVal
	 * @param {float} minVal 最小值
	 * @param {float} maxVal 最大值
	 * @returns {THREE.Vector2}
	 */
	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector2();
				max = new THREE.Vector2();

			}

			min.set( minVal, minVal );
			max.set( maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	/**
	 * @desc 二维向量的(x,y)坐标值的最大整数,将小数部分去掉
	 * @returns {THREE.Vector2}
	 */
	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	},

	/**
	 * @desc 大于或等于二维向量的(x,y)坐标值的最小整数,将小数部分去掉加1
	 * @returns {THREE.Vector2}
	 */
	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	},

	/**
	 * @desc 大于或等于二维向量的(x,y)坐标值的最接近整数,四舍五入
	 * @returns {THREE.Vector2}
	 */
	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	},

	/**
	 * @desc 当前二维向量的(x,y)坐标值若为负数时,返回大于或等于二维向量的(x,y)坐标值的最小整数<br />
	 * 而当前二维向量的(x,y)坐标值若为正数时,返回小于或等于二维向量的(x,y)坐标值的最大整数
	 * @returns {THREE.Vector2}
	 */
	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	},

	/**
	 * @desc 求向量的负向量<br />
	 * 几何意义：和原向量大小相等，方向相反的向量
	 * @returns {THREE.Vector2}
	 */
	negate: function () {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	},

	/**
	 * @desc 向量和向量v的点积<br />
	 * 几何意义：向量大小与向量夹角cos的积  a.b =||a|| ||b|| cos0
	 * @param {THREE.Vector2} v
	 * @returns {float}
	 */
	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	/**
	 * @desc 求向量长度（模）的平方<br />
	 * 几何意义：向量两分量构成的直角三角形斜边长的平方
	 * @returns {float}
	 */
	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	/**
	 * @desc 求向量长度（模）<br />
	 * 几何意义：向量两分量构成的直角三角形斜边长
	 * @returns {float}
	 */
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	/**
	 * @desc 向量单位化<br />
	 * 几何意义：转换为长度为1，方向相同的向量
	 * @returns {THREE.Vector2}
	 */
	normalize: function () {

		return this.divideScalar( this.length() );

	},

	/**
	 * @desc 当前二维向量到参数向量v的距离
	 * @param {THREE.Vector2} v
	 * @returns {float}
	 */
	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	/**
	 * @desc 当前二维向量到参数向量v的距离平方
	 * @param {THREE.Vector2} v
	 * @returns {float}
	 */
	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},

	/**
	 * @desc 按照参数l(长度)设置新的二维向量(x,y)值
	 * @param {float} l 新长度
	 * @returns {THREE.Vector2}
	 */
	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	/**
	 * @desc 当前二维向量(x,y)设置为下限和参数v(x,y)设为上限 之间进行线性插值
	 * @param {THREE.Vector2} v 参数向量
	 * @param {float} alpha 权重(0,1)
	 * @returns {THREE.Vector2}
	 */
	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	},

	/**
	 * @desc 向量是否相等
	 * @param {THREE.Vector2} v
	 * @returns {boolean}
	 */
	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	},

	/**
	 * @desc 存储坐标的数组赋值给当前向量对象
	 * @param {float[]} array
	 * @param {number} offset 起始索引
	 * @returns {THREE.Vector2}
	 */
	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	},

	/**
	 * @desc 当前向量对象赋值给存储坐标的数组
	 * @param {float[]} array
	 * @param {number} offset 起始索引
	 * @returns {float[]}
	 */
	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	},

	/**
	 * @desc 克隆向量对象
	 * @returns {THREE.Vector2}
	 */
	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	}

};
