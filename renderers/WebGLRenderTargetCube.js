/**
 * @author alteredq / http://alteredqualia.com
 */
/**
 * @classdesc 立方体渲染目标对象
 * @param {number} width 宽度
 * @param {number} height 高度
 * @param {*} options 参数列表
 * @constructor
 */
THREE.WebGLRenderTargetCube = function ( width, height, options ) {

	THREE.WebGLRenderTarget.call( this, width, height, options );

	this.activeCubeFace = 0; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5

};
/**
 * @desc WebGLRenderTargetCube对象从WebGLRenderTarget的原型继承所有属性方法
 * @type {THREE.WebGLRenderTarget}
 */
THREE.WebGLRenderTargetCube.prototype = Object.create( THREE.WebGLRenderTarget.prototype );
