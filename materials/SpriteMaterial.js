/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *	uvOffset: new THREE.Vector2(),
 *	uvScale: new THREE.Vector2(),
 *
 *  fog: <bool>
 * }
 */
/**
 * @desc Sprite(点精灵)的材质
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.SpriteMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'SpriteMaterial'
	 * @type {string}
	 */
	this.type = 'SpriteMaterial';
	/**
	 * @desc 材质颜色
	 * @default 0xffffff 白色
	 * @type {THREE.Color}
	 */
	this.color = new THREE.Color( 0xffffff );
	/**
	 * @desc 纹理贴图
	 * @default
	 * @type {THREE.Texture}
	 */
	this.map = null;
	/**
	 * @desc 旋转角度，粒子系统的贴图的旋转角度
	 * @type {float}
	 */
	this.rotation = 0;
	/**
	 * @desc 雾效，默认关闭
	 * @default
	 * @type {boolean}
	 */
	this.fog = false;

	// set parameters

	this.setValues( parameters );

};

THREE.SpriteMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.SpriteMaterial.prototype.clone = function () {

	var material = new THREE.SpriteMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.map = this.map;

	material.rotation = this.rotation;

	material.fog = this.fog;

	return material;

};
