/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc  数学类
 * @desc 数学相关函数
 * @class
 */
THREE.Math = {

	/**
	 * @function
	 * @desc 生成36位的UUID
	 * @return {char[]}
	 */
	generateUUID: function () {

		// http://www.broofa.com/Tools/Math.uuid.htm

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
		var uuid = new Array( 36 );
		var rnd = 0, r;

		return function () {

			for ( var i = 0; i < 36; i ++ ) {

				if ( i == 8 || i == 13 || i == 18 || i == 23 ) {

					uuid[ i ] = '-';

				} else if ( i == 14 ) {

					uuid[ i ] = '4';

				} else {

					if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
					r = rnd & 0xf;
					rnd = rnd >> 4;
					uuid[ i ] = chars[ ( i == 19 ) ? ( r & 0x3 ) | 0x8 : r ];

				}
			}

			return uuid.join( '' );

		};

	}(),

	// Clamp value to range <a, b>

	/**
	 * @desc 限制x的值在a和b之间<br />
	 * 如果x小于a，返回a。 如果x大于b，返回b，否则返回x
	 * @param {float} x
	 * @param {float} a
	 * @param {float} b
	 * @returns {float}
	 */
	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	},

	// Clamp value to range <a, inf)
	/**
	 * @desc 限制x的值在大于a<br />
	 * 如果x小于a，返回a。 否则返回x
	 * @param {float} x
	 * @param {float} a
	 * @returns {float}
	 */
	clampBottom: function ( x, a ) {

		return x < a ? a : x;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>
	/**
	 * @desc 参数x在range<a1,a2>到range<b1,b2>的线性映射
	 * @param {float} x
	 * @param {float} a1
	 * @param {float} a2
	 * @param {float} b1
	 * @param {float} b2
	 * @returns {*}
	 */
	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	/**
	 * @desc 最小和最大值之间的插值，并在限制处渐入渐出。三次平滑插值
	 * @param {float} x
	 * @param {float} min
	 * @param {float} max
	 * @returns {float}
	 */
	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	},
	/**
	 * @desc 在最小和最大值之间的插值，并在限制处渐入渐出。五次平滑插值
	 * @param {float} x
	 * @param {float} min
	 * @param {float} max
	 * @returns {float}
	 */
	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	},

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	/**
	 * @desc 生成0,到1的随机浮点数,有16位大小选择范围
	 * @returns {float}
	 */
	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	},

	// Random integer from <low, high> interval
	/**
	 * @desc 通过参数low,high定义的取值范围生成随机整数
	 * @param {number}  vfhgplow
	 * @param {number}  vfhgphigh
	 * @returns {number}
	 */
	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	},

	// Random float from <low, high> interval
	/**
	 * @desc 通过参数low,high定义的取值范围生成随机浮点数
	 * @param {float}  vfhgplow
	 * @param {float}  vfhgphigh
	 * @returns {float}
	 */
	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	/**
	 * @desc 生成[-range/2,range/2]区间随机浮点数
	 * @param {float} range
	 * @returns {float}
	 */
	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	/**
	 * @function
	 * @desc 角度转换弧度
	 * @param {float} degrees
	 * @return {float}
	 */
	degToRad: function () {

		var degreeToRadiansFactor = Math.PI / 180;

		return function ( degrees ) {

			return degrees * degreeToRadiansFactor;

		};

	}(),
	/**
	 * @function
	 * @desc 弧度转换角度
	 * @param {float} radians
	 * @return {float}
	 */
	radToDeg: function () {

		var radianToDegreesFactor = 180 / Math.PI;

		return function ( radians ) {

			return radians * radianToDegreesFactor;

		};

	}(),

	/**
	 * @desc 是否2的幂,如果该值是2的幂，返回true
	 * @param {number} value
	 * @returns {boolean}
	 */
	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	}

};
