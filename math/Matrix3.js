/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

/**
 * @classdesc  3×3矩阵
 * @desc 行优先存储<br />
 * 0	1	2<br />
 * 3	4	5<br />
 * 7	7	8
 * @class
 */
THREE.Matrix3 = function () {

	/**
	 * @desc 矩阵内数组
	 * @type {Float32Array}
	 */
	this.elements = new Float32Array( [

		1, 0, 0,
		0, 1, 0,
		0, 0, 1

	] );

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

	}

};

THREE.Matrix3.prototype = {

	constructor: THREE.Matrix3,

	/**
	 * @desc 设置3×3矩阵
	 * @param {float} n11
	 * @param {float} n12
	 * @param {float} n13
	 * @param {float} n21
	 * @param {float} n22
	 * @param {float} n23
	 * @param {float} n31
	 * @param {float} n32
	 * @param {float} n33
	 * @returns {THREE.Matrix3}
	 */
	set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 3 ] = n12; te[ 6 ] = n13;
		te[ 1 ] = n21; te[ 4 ] = n22; te[ 7 ] = n23;
		te[ 2 ] = n31; te[ 5 ] = n32; te[ 8 ] = n33;

		return this;

	},

	/**
	 * @desc 设置3×3单位矩阵
	 * @returns {THREE.Matrix3}
	 */
	identity: function () {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	},

	/**
	 * @desc 拷贝3×3矩阵
	 * @param {THREE.Matrix3} m
	 * @returns {THREE.Matrix3}
	 */
	copy: function ( m ) {

		var me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ],
			me[ 1 ], me[ 4 ], me[ 7 ],
			me[ 2 ], me[ 5 ], me[ 8 ]

		);

		return this;

	},

	/**
	 * @desc 3×3矩阵和3维向量乘法
	 * @deprecated 改为 THREE.Vector3.applyMatrix3( matrix )
	 * @param {THREE.Vector3} vector
	 * @returns {THREE.Vector3}
	 */
	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.' );
		return vector.applyMatrix3( this );

	},
	/**
	 * @desc 3×3矩阵和数组乘法
	 * @deprecated 改为 THREE.Matrix3.applyToVector3Array( array )
	 * @param {float[]} a
	 * @returns {float[]}
	 */
	multiplyVector3Array: function ( a ) {

		console.warn( 'THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
		return this.applyToVector3Array( a );

	},
	/**
	 * @function
	 * @desc 3×3矩阵和数组乘法<br />
	 * 等于数据的每3个元素和矩阵相乘，结果存回数组
	 * @param {float[]} array
	 * @param {number} offset	起始位置，忽略则为0
	 * @param {float} length	需要计算的长度，忽略则为数组长度
	 * @returns {float[]}
	 */
	applyToVector3Array: function () {

		var v1 = new THREE.Vector3();

		return function ( array, offset, length ) {

			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = array.length;

			for ( var i = 0, j = offset, il; i < length; i += 3, j += 3 ) {

				v1.x = array[ j ];
				v1.y = array[ j + 1 ];
				v1.z = array[ j + 2 ];

				v1.applyMatrix3( this );

				array[ j ]     = v1.x;
				array[ j + 1 ] = v1.y;
				array[ j + 2 ] = v1.z;

			}

			return array;

		};

	}(),

	/**
	 * @desc 3×3矩阵和标量乘法
	 * @param {float} s
	 * @returns {THREE.Matrix3}
	 */
	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	},

	/**
	 * @desc 计算3×3矩阵的行列式<br />
	 * 几何意义：以基向量为边的平行六面体的有符号体积（可能为负）
	 * @returns {float}
	 */
	determinant: function () {

		var te = this.elements;

		var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	},

	/**
	 * @desc 计算3×3的逆矩阵<br />
	 * M*M-1 = 1v<br />
	 * v*M = v1 v1*M-1 =
	 * @param {THREE.Matrix3} matrix
	 * @param {number} throwOnInvertible 异常标志
	 * @returns {THREE.Matrix3}
	 */
	getInverse: function ( matrix, throwOnInvertible ) {

		// input: THREE.Matrix4
		// ( based on http://code.google.com/p/webgl-mjs/ )

		var me = matrix.elements;
		var te = this.elements;

		te[ 0 ] =   me[ 10 ] * me[ 5 ] - me[ 6 ] * me[ 9 ];
		te[ 1 ] = - me[ 10 ] * me[ 1 ] + me[ 2 ] * me[ 9 ];
		te[ 2 ] =   me[ 6 ] * me[ 1 ] - me[ 2 ] * me[ 5 ];
		te[ 3 ] = - me[ 10 ] * me[ 4 ] + me[ 6 ] * me[ 8 ];
		te[ 4 ] =   me[ 10 ] * me[ 0 ] - me[ 2 ] * me[ 8 ];
		te[ 5 ] = - me[ 6 ] * me[ 0 ] + me[ 2 ] * me[ 4 ];
		te[ 6 ] =   me[ 9 ] * me[ 4 ] - me[ 5 ] * me[ 8 ];
		te[ 7 ] = - me[ 9 ] * me[ 0 ] + me[ 1 ] * me[ 8 ];
		te[ 8 ] =   me[ 5 ] * me[ 0 ] - me[ 1 ] * me[ 4 ];

		var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

		// no inverse

		if ( det === 0 ) {

			var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnInvertible || false ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			this.identity();

			return this;

		}

		this.multiplyScalar( 1.0 / det );

		return this;

	},

	/**
	 * @desc 计算3×3矩阵的转置矩阵<br />
	 * 几何意义： 矩阵的行列互换
	 * @returns {THREE.Matrix3}
	 */
	transpose: function () {

		var tmp, m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	},

	/**
	 * @desc 3×3矩阵到数组
	 * @param {float[]} array
	 * @param {number} offset 偏移量
	 * @returns {float[]}
	 */
	flattenToArrayOffset: function ( array, offset ) {

		var te = this.elements;

		array[ offset     ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ]  = te[ 8 ];

		return array;

	},

	/**
	 * @desc 获得正规矩阵<br />
	 * 几何意义： 伴随矩阵,4维矩阵左上角的3×3矩阵
	 * @param {THREE.Matrix4} m
	 * @returns {THREE.Matrix3}
	 */
	getNormalMatrix: function ( m ) {

		// input: THREE.Matrix4

		this.getInverse( m ).transpose();

		return this;

	},

	/**
	 * @desc 转置矩阵到数组
	 * @param r
	 * @returns {THREE.Matrix3}
	 */
	transposeIntoArray: function ( r ) {

		var m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	},

	/**
	 * @desc 数组到3×3矩阵
	 * @param {float[]} array
	 * @returns {THREE.Matrix3}
	 */
	fromArray: function ( array ) {

		this.elements.set( array );

		return this;

	},

	/**
	 * @desc 3×3矩阵到数组
	 * @returns {float[]}
	 */
	toArray: function () {

		var te = this.elements;

		return [
			te[ 0 ], te[ 1 ], te[ 2 ],
			te[ 3 ], te[ 4 ], te[ 5 ],
			te[ 6 ], te[ 7 ], te[ 8 ]
		];

	},

	/**
	 * @desc 克隆3×3矩阵
	 * @returns {THREE.Matrix3}
	 */
	clone: function () {

		return new THREE.Matrix3().fromArray( this.elements );

	}

};
