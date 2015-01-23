/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
/**
 * @classdesc  4维向量
 * @desc w称为比例因子，当w不为0时(一般设1)，表示一个坐标<br />,
 * 一个三维坐标的三个分量x，y，z用齐次坐标表示为变为x，y，z，w的4维空间,变换成三维坐标是方式是x/w,y/w,z/w，<br />
 * 当w为0时，在数学上代表无穷远点，即并非一个具体的坐标位置，而是一个具有大小和方向的向量<br />
 * 从而，通过w我们就可以用同一系统表示两种不同的量
 * @param {float} x
 * @param {float} y
 * @param {float} z
 * @param {float} w 齐次坐标
 * @class
 * @example var p4d = new Vector4(5,3,2,1)
 */
THREE.Vector4 = function ( x, y, z, w ) {
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
	/**
	 * @default 0
	 * @type {float}
	 */
	this.z = z || 0;
	/**
	 * @default 1
	 * @type {float}
	 */
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Vector4.prototype = {

	constructor: THREE.Vector4,
	/**
	 * @desc 设置4维向量
	 * @param {float} x
	 * @param {float} y
	 * @param {float} z
	 * @param {float} w
	 * @returns {THREE.Vector4}
	 */
	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},
	/**
	 * @desc 设置X坐标
	 * @param {float} x
	 * @returns {THREE.Vector4}
	 */
	setX: function ( x ) {

		this.x = x;

		return this;

	},
	/**
	 * @desc 设置Y坐标
	 * @param {float} y
	 * @returns {THREE.Vector4}
	 */
	setY: function ( y ) {

		this.y = y;

		return this;

	},
	/**
	 * @desc 设置Z坐标
	 * @param {float} z
	 * @returns {THREE.Vector4}
	 */
	setZ: function ( z ) {

		this.z = z;

		return this;

	},
	/**
	 * @desc 设置W坐标
	 * @param {float} w
	 * @returns {THREE.Vector4}
	 */
	setW: function ( w ) {

		this.w = w;

		return this;

	},
	/**
	 * @desc 根据索引设置坐标
	 * @param {number} index (0,3)
	 * @param {float} value
	 */
	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/**
	 * @desc 根据索引获取坐标
	 * @param {number} index (0,3)
	 * @returns {float}
	 */
	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/**
	 * @desc 拷贝4维向量
	 * @param {THREE.Vector4} v
	 * @returns {THREE.Vector4}
	 */
	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	},
	/**
	 * @desc 4维向量 v , w 相加<br />
	 * 几何意义: 合并 v , w 分量 , v的尾到w的头
	 * @param {THREE.Vector4} v
	 * @param {THREE.Vector4} w 当w未定义，则为当前向量加v
	 * @returns {THREE.Vector4}
	 */
	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},

	/**
	 * @desc @desc 4维向量x,y，z，w分量与s标量相加<br />
	 * 几何意义: 向量分别向 x , y ，z , w轴平移s
	 * @param {float} s 四个轴的偏移量
	 * @returns {THREE.Vector4}
	 */
	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	},

	/**
	 * @desc 4维向量 a + b 相加 <br />
	 * 几何意义: 合并a + b 分量 a的尾到b的头
	 * @param {THREE.Vector4} a
	 * @param {THREE.Vector4} b
	 * @returns {THREE.Vector4}
	 */
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	},

	/**
	 * @desc 4维向量v ,w相减
	 * 几何意义: v -w 分量 ; v的尾到w的尾
	 * @param {THREE.Vector4} v
	 * @param {THREE.Vector4} w 未定义则为当前向量减v
	 * @returns {THREE.Vector4}
	 */
	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	},

	/**
	 * @desc 4维向量减法
	 * @param {THREE.Vector4} a
	 * @param {THREE.Vector4} b
	 * @returns {THREE.Vector4}
	 */
	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	},

	/**
	 * @desc 4维向量与标量scalar的乘法<br />
	 * 几何意义：向量的缩放
	 * @param {float} scalar
	 * @returns {THREE.Vector4}
	 */
	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	},

	/**
	 * @desc 4维向量与矩阵乘法
	 * @param {THREE.Matrix4} m 4维矩阵
	 * @returns {THREE.Vector4}
	 */
	applyMatrix4: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;

	},

	/**
	 * @desc 4维向量与标量scalar的除法<br />
	 * 几何意义：向量的缩放<br />
	 * 当scalar = 0 结果为4维单位向量
	 * @param {float} scalar
	 * @returns {THREE.Vector4}
	 */
	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;
			this.w *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		}

		return this;

	},

	/**
	 * @desc 利用四元数设置轴角,达到坐标旋转变换的目的
	 * @param {THREE.Quaternion} q 四元数，必须是单位向量
	 * @returns {THREE.Vector4}
	 */
	setAxisAngleFromQuaternion: function ( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		var s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			 this.x = 1;
			 this.y = 0;
			 this.z = 0;

		} else {

			 this.x = q.x / s;
			 this.y = q.y / s;
			 this.z = q.z / s;

		}

		return this;

	},

	/**
	 * @desc 一个参数m(旋转矩阵),达到坐标旋转变换的目的
	 * @param {THREE.Matrix4} m 4*4矩阵,其3*3的区域必须是纯旋转矩阵
	 * @returns {THREE.Vector4}
	 */
	setAxisAngleFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var angle, x, y, z,		// variables for result
			epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon )
		   && ( Math.abs( m13 - m31 ) < epsilon )
		   && ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 )
			   && ( Math.abs( m13 + m31 ) < epsilon2 )
			   && ( Math.abs( m23 + m32 ) < epsilon2 )
			   && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) { // m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else { // m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )
						  + ( m13 - m31 ) * ( m13 - m31 )
						  + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	},

	/**
	 * @desc 4维向量的(x,y,z,w)坐标值直接与参数v的(x,y,z,w)比较,返回最小值
	 * @param {THREE.Vector4} v
	 * @returns {THREE.Vector4}
	 */
	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		if ( this.w > v.w ) {

			this.w = v.w;

		}

		return this;

	},
	/**
	 * @desc 4维向量的(x,y,z,w)坐标值直接与参数v的(x,y,z,w)比较,返回最大值
	 * @param {THREE.Vector4} v
	 * @returns {THREE.Vector4}
	 */
	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		if ( this.w < v.w ) {

			this.w = v.w;

		}

		return this;

	},

	/**
	 * @desc 4维向量的(x,y,z,w)坐标值直接与参数min,max的(x,y,z,w)比较,返回返回内的值
	 * @param {THREE.Vector4} min
	 * @param {THREE.Vector4} max
	 * @returns {THREE.Vector4}
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

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		if ( this.w < min.w ) {

			this.w = min.w;

		} else if ( this.w > max.w ) {

			this.w = max.w;

		}

		return this;

	},

	/**
	 * @function
	 * @desc 4维向量的(x,y,z,w)坐标值直接与参数minVal,maxVal比较,返回返回内的值
	 * @param {float} minVal
	 * @param {float} maxVal
	 * @return {THREE.Vector4}
	 */
	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector4();
				max = new THREE.Vector4();

			}

			min.set( minVal, minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	/**
	 * @returns {THREE.Vector4}
	 */
    floor: function () {

        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );
        this.z = Math.floor( this.z );
        this.w = Math.floor( this.w );

        return this;

    },

	/**
	 *
	 * @returns {THREE.Vector4}
	 */
    ceil: function () {

        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );
        this.z = Math.ceil( this.z );
        this.w = Math.ceil( this.w );

        return this;

    },

	/**
	 *
	 * @returns {THREE.Vector4}
	 */
    round: function () {

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        this.z = Math.round( this.z );
        this.w = Math.round( this.w );

        return this;

    },

	/**
	 *
	 * @returns {THREE.Vector4}
	 */
    roundToZero: function () {

        this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
        this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
        this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
        this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

        return this;

    },

	/**
	 * @desc 求负向量<br />
	 * 几何意义：和原向量大小相等，方向相反的向量
	 * @returns {THREE.Vector4}
	 */
	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;

	},

	/**
	 * @desc 4维向量的点积<br />
	 * 几何意义：向量大小与向量夹角cos的积  a.b =||a|| ||b|| cos0
	 * @param {THREE.Vector4} v
	 * @returns {float}
	 */
	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	},

	/**
	 * @desc 求向量长度（模）的平方<br />
	 * 几何意义：向量两分量构成的直角三角形斜边长的平方
	 * @returns {float}
	 */
	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	},
	/**
	 * @desc 求向量长度（模）<br />
	 * 几何意义：向量两分量构成的直角三角形斜边长
	 * @returns {float}
	 */
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	/**
	 * @desc 4维向量的曼哈顿长度<br />
	 * 几何意义： 4维向量在各坐标轴长度和
	 * @returns {float}
	 */
	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	},

	/**
	 * @desc 4维向量的单位化<br />
	 * 几何意义：转换为长度为1，方向相同的向量
	 * @returns {THREE.Vector4}
	 */
	normalize: function () {

		return this.divideScalar( this.length() );

	},

	/**
	 * @desc 按照参数l(长度)设置新的4维向量(x,y,z,w)值
	 * @param {float} l
	 * @returns {THREE.Vector4}
	 */
	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );

		}

		return this;

	},

	/**
	 * @desc 当前4维向量(x,y,z,w)设置为下限和参数v(x,y,z,w)设为上限 之间进行线性插值
	 * @param {THREE.Vector4} v
	 * @param {float} alpha
	 * @returns {THREE.Vector4}
	 */
	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	},

	/**
	 * @desc 4维向量的等号
	 * @param {THREE.Vector4} v
	 * @returns {boolean}
	 */
	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	},

	/**
	 * @desc 数组转换4维向量
	 * @param {float[]} array 	坐标数组
	 * @param {number} offset	偏移量
	 * @returns {THREE.Vector4}
	 */
	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];
		this.w = array[ offset + 3 ];

		return this;

	},
	/**
	 * @desc 4维向量转换数组
	 * @param {float[]} array 	坐标数组
	 * @param {number} offset	偏移量
	 * @returns {float[]}
	 */
	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;
		array[ offset + 3 ] = this.w;

		return array;

	},

	/**
	 * @克隆4维向量
	 * @returns {THREE.Vector4}
	 */
	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	}

};
