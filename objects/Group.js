/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 对象组
 * @constructor
 */
THREE.Group = function () {

	THREE.Object3D.call( this );

	this.type = 'Group';

};
/**
 * @desc Group从Object3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Group.prototype = Object.create( THREE.Object3D.prototype );
