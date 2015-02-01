/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 自定义着色器材质类型
 * @desc 自定义着色器材质类型让用户扩充材质类型,有了无限的可能<br />
 * 这个类和ShaderMaterial工作方式一样 <br />
 * 除了自定义的uniforms和attribute属性不会自动追加到GLSL着色器代码中
 * 表面有光泽的材质类型,计算每个像素
 * @param {String} parameters 材质参数
 * @extends {THREE.ShaderMaterial}
 * @constructor
 */
THREE.RawShaderMaterial = function ( parameters ) {

	THREE.ShaderMaterial.call( this, parameters );
	/**
	 * @default 'RawShaderMaterial'
	 * @type {string}
	 */
	this.type = 'RawShaderMaterial';

};
/**
 * @desc RawShaderMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.ShaderMaterial}
 */
THREE.RawShaderMaterial.prototype = Object.create( THREE.ShaderMaterial.prototype );
/**
 * @desc RawShaderMaterial材质的克隆函数
 * @returns {THREE.RawShaderMaterial}
 */
THREE.RawShaderMaterial.prototype.clone = function () {

	var material = new THREE.RawShaderMaterial();

	THREE.ShaderMaterial.prototype.clone.call( this, material );

	return material;

};
