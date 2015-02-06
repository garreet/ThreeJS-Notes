/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */
/**
 * @classdesc 骨骼对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @param {THREE.SkinnedMesh} belongsToSkin 蒙皮对象
 * @constructor
 */
THREE.Bone = function ( belongsToSkin ) {

	THREE.Object3D.call( this );
	/**
	 * @desc 骨骼对象的皮肤
	 * @type {THREE.SkinnedMesh}
	 */
	this.skin = belongsToSkin;

};
/**
 * @desc Bone从Object3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Bone.prototype = Object.create( THREE.Object3D.prototype );

