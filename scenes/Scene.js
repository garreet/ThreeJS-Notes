/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @classdesc  Scene是场景对象,所有的对象,灯光,动画,骨骼等都需要放置在场景内.Scene对象的功能函数采用定义构造的函数原型对象来实现.
 * @desc  场景对象构造函数
 * @class
 * @extends {THREE.Object3D}
 */
THREE.Scene = function () {

	// 调用Object3D对象的call方法,将原本属于Object3D的方法交给当前对象Scene来使用.
	THREE.Object3D.call( this );

	/**
	 * @desc 场景的类型定义
	 * @default
	 * @type {string}
	 */
	this.type = 'Scene';
	/**
	 * @desc 场景的雾效属性
	 * @default
	 * @type {THREE.fog}
	 */
	this.fog = null;
	/**
	 * @desc 场景的材质属性,默认为null,如果设置了这个属性,场景中的所有对象渲染成这个材质.
	 * @default
	 * @type {THREE.Material}
	 */
	this.overrideMaterial = null;

	/**
	 * @desc 默认为true,表示渲染器每一帧都会检查场景和场景中的对象的矩阵的是否更新,如果为false,场景中的对象将不会被自动更新
	 * @default
	 * @type {boolean}
	 */
	this.autoUpdate = true; // checked by the renderer

};

/**
 * @desc Scene对象从THREE.Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.Scene.prototype = Object.create( THREE.Object3D.prototype );

/**
 * @desc Three.Scene 拷贝函数，将属性数组分别复制
 * @param {THREE.Scene} object - 源Scene
 * @returns {THREE.Scene}
 */
THREE.Scene.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Scene();

	THREE.Object3D.prototype.clone.call( this, object );

	if ( this.fog !== null ) object.fog = this.fog.clone();
	if ( this.overrideMaterial !== null ) object.overrideMaterial = this.overrideMaterial.clone();

	object.autoUpdate = this.autoUpdate;
	object.matrixAutoUpdate = this.matrixAutoUpdate;

	return object;

};
