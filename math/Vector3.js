/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

/**
 * @classdesc 3维向量<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @param {float} x - x坐标
 * @param {float} y - y坐标
 * @param {float} z - z坐标
 * @returns {THREE.Vector3}
 * @constructor
 */
THREE.Vector3 = function ( x, y, z ) {
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

};

THREE.Vector3.prototype = {

	constructor: THREE.Vector3,
	/**
	 * @desc 设置3维点向量
	 * @param {float} x - x坐标
	 * @param {float} y - y坐标
	 * @param {float} y - y坐标
	 * @returns {THREE.Vector3}
	 */
	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},
	/**
	 * @desc 设置X坐标
	 * @param {float} x - x坐标
	 * @returns {THREE.Vector3}
	 */
	setX: function ( x ) {

		this.x = x;

		return this;

	},
	/**
	 * @desc 设置Y坐标
	 * @param {float} y - y坐标
	 * @returns {THREE.Vector3}
	 */
	setY: function ( y ) {

		this.y = y;

		return this;

	},
	/**
	 * @desc 设置Z坐标
	 * @param {float} z - z坐标
	 * @returns {THREE.Vector3}
	 */
	setZ: function ( z ) {

		this.z = z;

		return this;

	},
	/**
	 * @desc 根据索引设置3维向量
	 * @param {number} index (0,2)
	 * @param {float} value 坐标数值
	 */
	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},
	/**
	 * @desc 根据索引获取坐标值
	 * @param {number} index (0,2)
	 * @returns {float}
	 */
	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},
	/**
	 * @desc 拷贝3维向量
	 * @param {THREE.Vector3} v 源向量
	 * @returns {THREE.Vector3}
	 */
	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},
	/**
	 * @desc 3维向量 v , w 相加<br />
	 * 几何意义: 合并 v , w 分量 , v的尾到w的头
	 * @param {THREE.Vector3} v
	 * @param {THREE.Vector3} w	可以不传入，则为自身加v
	 * @returns {THREE.Vector3}
	 */
	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	/**
	 * @desc 3维向量x,y，z分量与s标量相加<br />
	 * 几何意义: 向量分别向 x , y ，z轴平移s
	 * @param {float} s x,y,z偏移量
	 * @returns {THREE.Vector3}
	 */
	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},
	/**
	 * @desc 3维向量 a + b 相加 <br />
	 * 几何意义: 合并a + b 分量 a的尾到b的头
	 * @param {THREE.Vector3} a
	 * @param {THREE.Vector3} b
	 * @returns {THREE.Vector3}
	 */
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},
	/**
	 * @desc 3维向量v ,w相减
	 * 几何意义: v -w 分量 ; v的尾到w的尾
	 * @param {THREE.Vector3} v
	 * @param {THREE.Vector3} w 可以不传入，不传入则为自身减v
	 * @returns {THREE.Vector3}
	 */
	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},
	/**
	 * @desc 3维向量 a , b 相减<br />
	 * 几何意义: a -b 分量 ; a的尾到b的尾
	 * @param {THREE.Vector3} a
	 * @param {THREE.Vector3} b
	 * @returns {THREE.Vector3}
	 */
	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},
	/**
	 * @desc 3维向量与v向量乘法
	 * @param {THREE.Vector3} v
	 * @param {THREE.Vector3} w 未传入时，为当前向量乘v
	 * @returns {THREE.Vector3}
	 */
	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},
	/**
	 * @desc 3维向量与标量s的乘法<br />
	 * 几何意义：向量的缩放
	 * @param {float} scalar 缩放比例
	 * @returns {THREE.Vector3}
	 */
	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	},
	/**
	 * @desc 3维向量a, b乘法
	 * @param {THREE.Vector3} a
	 * @param {THREE.Vector3} b
	 * @returns {THREE.Vector3}
	 */
	multiplyVectors: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	/**
	 * @function
	 * @desc 当前向量通过参数euler(THREE.Euler对象,欧拉对象)转换成四元数
	 * @param {THREE.Euler} euler 欧拉角
	 * @returns {THREE.Vector3}
	 */
	applyEuler: function () {

		var quaternion;

		return function ( euler ) {

			if ( euler instanceof THREE.Euler === false ) {

				console.error( 'THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.' );

			}

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromEuler( euler ) );

			return this;

		};

	}(),

	/**
	 * @function
	 * @desc 当前向量根据指定的轴(一个标准单位的向量),和角度旋转<br />
	 * 或者说根据指定的轴和角度应用旋转
	 * @param {THREE.Vector3} axis 旋转轴
	 * @param {float} angle 旋转角度
	 * @returns {THREE.Vector3}
	 */
	applyAxisAngle: function () {

		var quaternion;

		return function ( axis, angle ) {

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			return this;

		};

	}(),

	/**
	 * @desc 当前向量乘以一个3x3的矩阵<br />
	 * 几何意义： 对当前向量做线性变换 ， 不含平移
	 * @param {THREE.Matrix3} m 3*3矩阵
	 * @returns {THREE.Vector3}
	 */
	applyMatrix3: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	},

	/**
	 * @desc 当前向量乘以一个4x4的矩阵,
	 * 几何意义： 对当前向量做仿射变换 ， 包含平移
	 * @param {THREE.Matrix4} m 4*4矩阵
	 * @returns {THREE.Vector3}
	 */
	applyMatrix4: function ( m ) {

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;

	},

	/**
	 * @desc 该向量和参数m(一个Matrix4投影矩阵),然后除以视角
	 * @param {THREE.Matrix4} m 4*4投影矩阵
	 * @returns {THREE.Vector3} 新坐标值的3维向量
	 */
	applyProjection: function ( m ) {

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	},

	/**
	 * @desc 用一个四元数q变换当前3维向量.
	 * @param {THREE.Quaternion} q 四元数
	 * @returns {THREE.Vector3}
	 */
	applyQuaternion: function ( q ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	},

	/**
	 * @function
	 * @desc 对向量做相机投影<br />
	 * 几何意义： 向量v × 投影矩阵 × 相机的世界矩阵的逆
	 * @param {THREE.Camera} camera 相机对象
	 * @return {THREE.Vector3}
	 */
	project: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.projectionMatrix, matrix.getInverse( camera.matrixWorld ) );
			return this.applyProjection( matrix );

		};

	}(),

	/**
	 * @function
	 * @desc 对向量做相机反投影<br />
	 * 几何意义：投影向量反投影回世界向量  向量v × 世界矩阵 × 相机的投影矩阵的逆
	 * @param {THREE.Camera} camera 相机对象
	 * @return {THREE.Vector3}
	 */
	unproject: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.matrixWorld, matrix.getInverse( camera.projectionMatrix ) );
			return this.applyProjection( matrix );

		};

	}(),

	/**
	 * @desc 通过参数m(一个Matrix4投射矩阵的3x3子集)转换这个向量的方向<br />
	 * @param {THREE.Matrix4} m 4×4投影矩阵，仿射矩阵
	 * @returns {THREE.Vector3} 单位化矩阵
	 */
	transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();

		return this;

	},

	/**
	 * @desc 3维向量的(x,y,z)坐标值与参数v的(x,y,z)相除.并返回新的坐标值的3维向量
	 * @param {THREE.Vector3} v
	 * @returns {THREE.Vector3}
	 */
	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	/**
	 * @desc 3维向量的(x,y,z)坐标值直接与参数scalar相除.并返回新的坐标值的3维向量<br />
	 * 几何意义： 3维向量的缩放<br />
	 * 参数scalar如果为0,当前对象(x,y,z)值直接设置为0
	 * @param {float} scalar
	 * @returns {THREE.Vector3}
	 */
	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	},

	/**
	 * @desc 3维向量的(x,y,z)坐标值直接与参数v的(x,y,z)比较,返回最小值
	 * @param {THREE.Vector3} v
	 * @returns {THREE.Vector3}
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

		return this;

	},

	/**
	 * @desc 3维向量的(x,y,z)坐标值直接与参数v的(x,y,z)比较,返回最大值
	 * @param {THREE.Vector3} v
	 * @returns {THREE.Vector3}
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

		return this;

	},

	/**
	 * @desc 3维向量的(x,y,z)坐标值直接与参数min,max的(x,y,z)比较,返回返回内的值
	 * @param {THREE.Vector3} min
	 * @param {THREE.Vector3} max
	 * @returns {THREE.Vector3}
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

		return this;

	},

	/**
	 * @function
	 * @desc 3维向量的(x,y,z)坐标值直接与参数minVal,maxVal比较,返回返回内的值
	 * @param {float} min
	 * @param {float} max
	 * @returns {THREE.Vector3}
	 */
	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector3();
				max = new THREE.Vector3();

			}

			min.set( minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	/**
	 *
	 * @returns {THREE.Vector3}
	 */
	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	},

	/**
	 *
	 * @returns {THREE.Vector3}
	 */
	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	},

	/**
	 *
	 * @returns {THREE.Vector3}
	 */
	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	},

	/**
	 *
	 * @returns {THREE.Vector3}
	 */
	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	},

	/**
	 * @desc 求负向量<br />
	 * 几何意义：和原向量大小相等，方向相反的向量
	 * @returns {THREE.Vector3}
	 */
	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	},

	/**
	 * @desc 3维向量的点积<br />
	 * 几何意义：向量大小与向量夹角cos的积  a.b =||a|| ||b|| cos0
	 * @param {THREE.Vector3} v
	 * @returns {float}
	 */
	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	/**
	 * @desc 求向量长度（模）的平方<br />
	 * 几何意义：向量两分量构成的直角三角形斜边长的平方
	 * @returns {float}
	 */
	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},
	/**
	 * @desc 求向量长度（模）<br />
	 * 几何意义：向量两分量构成的直角三角形斜边长
	 * @returns {float}
	 */
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	/**
	 * @desc 3维向量的曼哈顿长度<br />
	 * 几何意义： 3维向量在各坐标轴长度和
	 * @returns {float}
	 */
	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	/**
	 * @desc 3维向量的单位化<br />
	 * 几何意义：转换为长度为1，方向相同的向量
	 * @returns {THREE.Vector3}
	 */
	normalize: function () {

		return this.divideScalar( this.length() );

	},

	/**
	 * @desc 按照参数l(长度)设置新的3维向量(x,y,z)值
	 * @param {float} l
	 * @returns {THREE.Vector3}
	 */
	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	/**
	 * @desc 当前3维向量(x,y,z)设置为下限和参数v(x,y,z)设为上限 之间进行线性插值
	 * @param {THREE.Vector3} v
	 * @param {float} alpha
	 * @returns {THREE.Vector3}
	 */
	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	/**
	 * @desc 3维向量的叉乘<br />
	 * 几何意义： 方向垂直与原连个向量，长度等于两个向量大小和sin0的值<br/>
	 * 二维上是两个向量构成的平行四边形面积<br/>
	 * 三维上是两个向量构成的平行六面体的体积
	 * @param {THREE.Vector3} v
	 * @param {THREE.Vector3} w 未定义时，则是当前向量与v的叉乘
	 * @returns {THREE.Vector3}
	 */
	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},

	/**
	 * @desc 3维向量的叉乘<br />
	 * 几何意义： 方向垂直与原连个向量，长度等于两个向量大小和sin0的值<br/>
	 * 二维上是两个向量构成的平行四边形面积<br/>
	 * 三维上是两个向量构成的平行六面体的体积
	 * @param {THREE.Vector3} a
	 * @param {THREE.Vector3} b
	 * @returns {THREE.Vector3}
	 */
	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	},

	/**
	 * @function
	 * @desc 将当前3维向量(x,y,z)投影一个向量到另一个向量,参数vector(x,y,z)<br />
	 * 几何意义： 向量投影的向量， v' = n*dot(v,n) / (mod(n))* (mod(n)) ,n 为单位向量的话，(mod(n))* (mod(n))=1
	 * @param {THREE.Vector3} vector
	 * @returns {THREE.Vector3}
	 */
	projectOnVector: function () {

		var v1, dot;

		return function ( vector ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( vector ).normalize();			//NOTE:进行Dot计算的前提是两个向量首先要变成单位向量,这里通过调用.normalize()得到单位向量.

			dot = this.dot( v1 );					//dot常用来进行方向性判断，如两向量点积大于0，则它们的方向朝向相近；如果小于0，则方向相反。

			return this.copy( v1 ).multiplyScalar( dot );		//投影一个向量到另一个向量

		};

	}(),

	/**
	 * @function
	 * @desc 将当前3维向量(x,y,z)投影一个向量到一个平面(用一个向量表示,参数planeNormal(x,y,z)),然后当前向量减去<br />
	 * 几何意义：从这个向量到这个向量到平面法线的投影
	 * @param {THREE.Vector3} planeNormal 平面法线向量
	 * @returns {THREE.Vector3}
	 */
	projectOnPlane: function () {

		var v1;

		return function ( planeNormal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( this ).projectOnVector( planeNormal );

			return this.sub( v1 );

		}

	}(),

	/**
	 * @function
	 * @desc 沿着法线(参数normal)反射向量<br />
	 * reflect方法其实就是对一个向量进行镜像
	 * @param {THREE.Vector3} normal
	 * @returns {THREE.Vector3}
	 */
	reflect: function () {							//garreet

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1;

		return function ( normal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

		}

	}(),

	/**
	 * @desc 当前向量与另一个向量的夹角
	 * @param {THREE.Vector3} v
	 * @returns {float}
	 */
	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, - 1, 1 ) );

	},

	/**
	 * @desc 当前3维向量到参数向量v的距离
	 * @param {THREE.Vector3} v
	 * @returns {float}
	 */
	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	/**
	 * @desc 当前3维向量到参数向量v的距离平方
	 * @param {THREE.Vector3} v
	 * @returns {float}
	 */
	distanceToSquared: function ( v ) {

		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	},

	/**
	 * @ignore
	 */
	setEulerFromRotationMatrix: function ( m, order ) {

		console.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );

	},

	/**
	 * @ignore
	 */
	setEulerFromQuaternion: function ( q, order ) {

		console.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );

	},

	/**
	 * @deprecated 改为setFromMatrixPosition()
	 * @desc 返回从矩阵中的元素获得位移
	 * @param {THREE.Matrix4} m
	 * @returns {THREE.Vector3}
	 */
	getPositionFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );

		return this.setFromMatrixPosition( m );

	},
	/**
	 * @deprecated setFromMatrixScale()
	 * @desc 返回从矩阵中的元素获得缩放
	 */
	getScaleFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );

		return this.setFromMatrixScale( m );
	},

	/**
	 * @deprecated setFromMatrixColumn()
	 * @desc 返回从矩阵中的元素获得指定列的向量
	 */
	getColumnFromMatrix: function ( index, matrix ) {

		console.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );

		return this.setFromMatrixColumn( index, matrix );

	},

	/**
	 * @desc 从矩阵中的元素获得位移
	 * @param {THREE.Matrix4 } m
	 * @returns {THREE.Vector3}
	 */
	setFromMatrixPosition: function ( m ) {

		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;

	},
	/**
	 * @desc 从矩阵中的元素获得缩放
	 * 几何变换：矩阵的基向量的长度
	 * @param {THREE.Matrix4} m
	 * @returns {THREE.Vector3}
	 */
	setFromMatrixScale: function ( m ) {

		var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
		var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
		var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	},

	/**
	 * @desc 返回从矩阵中的元素获得指定列的向量
	 * @param {number} index
	 * @param {THREE.Matrix4} matrix
	 * @returns {THREE.Vector3}
	 */
	setFromMatrixColumn: function ( index, matrix ) {

		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;

	},

	/**
	 * @desc 3维向量等号
	 * @param {THREE.Vector3} v
	 * @returns {boolean}
	 */
	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	/**
	 * @desc 从数组生成3维向量
	 * @param {float[]} array
	 * @param {number} offset
	 * @returns {THREE.Vector3}
	 */
	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	},

	/**
	 * @desc 从3维向量生成数组
	 * @param {float[]} array
	 * @param {number} offset
	 * @returns {float[]}
	 */
	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	},

	/**
	 * @desc 克隆3维向量
	 * @returns {THREE.Vector3}
	 */
	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	}

};
