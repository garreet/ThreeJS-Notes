/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc mesh(网格)的网格复合材质
 * @desc 多材质，支持材质的列表<br />
 * 离相机越近,材质越亮(白),离相机越远,材质越暗(黑)
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.MeshFaceMaterial = function ( materials ) {

	this.uuid = THREE.Math.generateUUID();
	/**
	 * @default 'MeshFaceMaterial'
	 * @type {string}
	 */
	this.type = 'MeshFaceMaterial';

	/**
	 * @desc 材质列表
	 */
	this.materials = materials instanceof Array ? materials : [];

};

THREE.MeshFaceMaterial.prototype = {

	constructor: THREE.MeshFaceMaterial,
	/**
	 * @desc 材质列表转换JSON格式
	 * @returns {*}
	 */
	toJSON: function () {

		var output = {
			metadata: {
				version: 4.2,
				type: 'material',
				generator: 'MaterialExporter'
			},
			uuid: this.uuid,
			type: this.type,
			materials: []
		};

		for ( var i = 0, l = this.materials.length; i < l; i ++ ) {

			output.materials.push( this.materials[ i ].toJSON() );

		}

		return output;

	},
	/**
	 * @desc MeshFaceMaterial材质的克隆函数
	 * @returns {THREE.MeshFaceMaterial}
	 */
	clone: function () {

		var material = new THREE.MeshFaceMaterial();

		for ( var i = 0; i < this.materials.length; i ++ ) {

			material.materials.push( this.materials[ i ].clone() );

		}

		return material;

	}

};
