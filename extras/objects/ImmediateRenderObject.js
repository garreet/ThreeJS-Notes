/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 即时渲染对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
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
