/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @classdesc 属性对象类
 * @desc 存储于bufferGeometry相关联的属性数据
 * @param {array} array 属性数组
 * @param {number} itemSize 数组元素尺寸
 * @constructor
 */
THREE.BufferAttribute = function ( array, itemSize ) {
	/**
	 * @desc 属性数组
	 * @type {array}
	 */
	this.array = array;
	/**
	 * @desc 数组元素尺寸
	 * @type {number}
	 */
	this.itemSize = itemSize;
	/**
	 * @desc 是否需要更新标识
	 * @type {boolean}
	 */
	this.needsUpdate = false;

};

THREE.BufferAttribute.prototype = {

	constructor: THREE.BufferAttribute,
	/**
	 * @desc 获得数组长度
	 * @returns {number}
	 */
	get length () {

		return this.array.length;

	},
	/**
	 * @desc 拷贝数组
	 * @param {number} index1 目标数组起始索引
	 * @param {THREE.BufferAttribute} attribute 源数组
	 * @param {number} index2 源数组起始索引
	 */
	copyAt: function ( index1, attribute, index2 ) {

		index1 *= this.itemSize;
		index2 *= attribute.itemSize;

		for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

	},
	/**
	 * @desc 重新设置BufferAttribute的属性数组
	 * @param {THREE.BufferAttribute.array} value 属性数组
	 * @returns {THREE.BufferAttribute}
	 */
	set: function ( value ) {

		this.array.set( value );

		return this;

	},
	/**
	 * @desc 重新设置含有3个属性相的BufferAttribute属性数组的第一个分量<br />
	 * setX方法中,属性数组的长度是属性相的长度乘以属性的个数<br />
	 * 比如要存放100个点的坐标,坐标有3个属性相,那么属性数组的长度是300,如果想改变第30个点的x坐标就将index设为30
	 * @param {number} index 属性数组的索引
	 * @param {number} x 属性数组的第一个分量的值
	 * @returns {THREE.BufferAttribute}
	 */
	setX: function ( index, x ) {

		this.array[ index * this.itemSize ] = x;

		return this;

	},
	/**
	 * @desc 重新设置含有3个属性相的BufferAttribute属性数组的第二个分量<br />
	 * @param {number} index 属性数组的索引
	 * @param {number} y 属性数组的第二个分量的值
	 * @returns {THREE.BufferAttribute}
	 */
	setY: function ( index, y ) {

		this.array[ index * this.itemSize + 1 ] = y;

		return this;

	},
	/**
	 * @desc 重新设置含有3个属性相的BufferAttribute属性数组的第三个分量<br />
	 * @param {number} index 属性数组的索引
	 * @param {number} z 属性数组的第三个分量的值
	 * @returns {THREE.BufferAttribute}
	 */
	setZ: function ( index, z ) {

		this.array[ index * this.itemSize + 2 ] = z;

		return this;

	},
	/**
	 * @desc 重新设置含有3个属性相的BufferAttribute属性数组的第1,2个分量<br />
	 * @param {number} index 属性数组的索引
	 * @param {number} x 属性数组的第1个分量的值
	 * @param {number} y 属性数组的第2个分量的值
	 * @returns {THREE.BufferAttribute}
	 */
	setXY: function ( index, x, y ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;

		return this;

	},
	/**
	 * @desc 重新设置含有3个属性相的BufferAttribute属性数组的第1,2,3个分量<br />
	 * @param {number} index 属性数组的索引
	 * @param {number} x 属性数组的第1个分量的值
	 * @param {number} y 属性数组的第2个分量的值
	 * @param {number} z 属性数组的第3个分量的值
	 * @returns {THREE.BufferAttribute}
	 */
	setXYZ: function ( index, x, y, z ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;

		return this;

	},
	/**
	 * @desc 重新设置含有4个属性相的BufferAttribute属性数组的第1,2,3,4个分量<br />
	 * @param {number} index 属性数组的索引
	 * @param {number} x 属性数组的第1个分量的值
	 * @param {number} y 属性数组的第2个分量的值
	 * @param {number} z 属性数组的第3个分量的值
	 * @param {number} w 属性数组的第4个分量的值
	 * @returns {THREE.BufferAttribute}
	 */
	setXYZW: function ( index, x, y, z, w ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
		this.array[ index + 3 ] = w;

		return this;

	},
	/**
	 * @desc 克隆属性对象
	 * @returns {THREE.BufferAttribute}
	 */
	clone: function () {

		return new THREE.BufferAttribute( new this.array.constructor( this.array ), this.itemSize );

	}

};

//
/**********************************************************************************
 ****下面这些方法是定义不同数据类型的属性,已经在新版本中删除,这里保留是为了向后兼容.
 ***********************************************************************************/
THREE.Int8Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint8Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint8ClampedAttribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );


};

THREE.Int16Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint16Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Int32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Float32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Float64Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};
