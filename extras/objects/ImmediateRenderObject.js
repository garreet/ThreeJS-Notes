/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 即时渲染对象
 * @constructor
 */
THREE.ImmediateRenderObject = function () {

	THREE.Object3D.call( this );

	this.render = function ( renderCallback ) {};

};
/**
 * @desc ImmediateRenderObject从Object3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.ImmediateRenderObject.prototype = Object.create( THREE.Object3D.prototype );
