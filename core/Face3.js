/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 三角面对象类（三维空间内）
 * @param {THREE.Vector3} a	三角面角点a的索引
 * @param {THREE.Vector3} b	三角面角点b的索引
 * @param {THREE.Vector3} c	三角面角点c的索引
 * @param {THREE.Vector3[]} normal	三角面法线向量,或顶点法线向量数组
 * @param {THREE.Color[]} color	三角面颜色值,或顶点颜色值数组
 * @param {number[]} materialIndex 材质索引数组
 * @example 用法: 创建一个颜色为0xffaa00,0x00aaff,0x00ffaa的a,b,c三点组成的,法线指向normal,材质索引为0的三角面对象<br />
 * var a=0,b=1,c=2;<br />
 * var normal1 = new THREE.Vector3( 0, 1, 0 ), normal2 = new THREE.Vector3( 0, 1, 0 ), normal3 = new THREE.Vector3( 0, 1, 0 );<br />
 * normal = new Array(normal1,normal2,normal3);<br />
 * var color1 = new THREE.Color( 0xffaa00 ), color2 = new THREE.Color( 0x00aaff ), color3 = new THREE.Color( 0x00ffaa );<br />
 * var color = new Array(color1,color2,color3);<br />
 * var face = new THREE.Face3( a, b, c, normal, color, 0 );<br />
 * 创建一个颜色为0xffaa00,0x00aaff,0x00ffaa的a,b,c三点组成的,法线指向normal,材质索引为0的三角面对象
 * @constructor
 */
THREE.Face3 = function ( a, b, c, normal, color, materialIndex ) {

	/**
	 * @desc 顶点a
	 * @type {THREE.Vector3}
	 */
	this.a = a;
	/**
	 * @desc 顶点b
	 * @type {THREE.Vector3}
	 */
	this.b = b;
	/**
	 * @desc 顶点c
	 * @type {THREE.Vector3}
	 */
	this.c = c;

	/**
	 * @desc 面法线
	 * @type {THREE.Vector3}
	 */
	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	/**
	 * @desc 顶点法线
	 * @type {THREE.Vector3[]}
	 */
	this.vertexNormals = normal instanceof Array ? normal : [];

	/**
	 * @desc 面颜色
	 * @type {THREE.Color}
	 */
	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	/**
	 * @desc 顶点颜色
	 * @type {THREE.Color[]}
	 */
	this.vertexColors = color instanceof Array ? color : [];

	/**
	 * @desc 顶点正切数组
	 * @type {Array}
	 */
	this.vertexTangents = [];

	/**
	 * @desc 三角面的材质索引
	 * @type {number}
	 */
	this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

};

THREE.Face3.prototype = {

	constructor: THREE.Face3,
	/**
	 * @desc 克隆三角面对象
	 * @returns {THREE.Face3}
	 */
	clone: function () {

		var face = new THREE.Face3( this.a, this.b, this.c );

		face.normal.copy( this.normal );
		face.color.copy( this.color );

		face.materialIndex = this.materialIndex;

		for ( var i = 0, il = this.vertexNormals.length; i < il; i ++ ) {

			face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();

		}

		for ( var i = 0, il = this.vertexColors.length; i < il; i ++ ) {

			face.vertexColors[ i ] = this.vertexColors[ i ].clone();

		}

		for ( var i = 0, il = this.vertexTangents.length; i < il; i ++ ) {

			face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		}

		return face;

	}

};
