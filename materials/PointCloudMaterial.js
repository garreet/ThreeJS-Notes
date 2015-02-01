/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  vertexColors: <bool>,
 *
 *  fog: <bool>
 * }
 */
/**
 * @classdesc 点云（粒子系统）材质基类
 * @param {String} parameters 材质参数
 * @extends {THREE.Material}
 * @constructor
 */
THREE.PointCloudMaterial = function ( parameters ) {

	THREE.Material.call( this );
	/**
	 * @default 'PointCloudMaterial'
	 * @type {string}
	 */
	this.type = 'PointCloudMaterial';
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
	 * @desc 点云点大小
	 * @default
	 * @type {number}
	 */
	this.size = 1;
	/**
	 * @desc 粒子是否衰减
	 * @default
	 * @type {boolean}
	 */
	this.sizeAttenuation = true;
	/**
	 * @desc 材质顶点颜色
	 * @default THREE.NoColors
	 * @type {number}
	 */
	this.vertexColors = THREE.NoColors;
	/**
	 * @desc 雾效，默认开启
	 * @default
	 * @type {boolean}
	 */
	this.fog = true;

	this.setValues( parameters );

};
/**
 * @desc PointCloudMaterial对象从THREE.Material的原型继承所有属性方法
 * @type {THREE.Material}
 */
THREE.PointCloudMaterial.prototype = Object.create( THREE.Material.prototype );
/**
 * @desc PointCloudMaterial材质的克隆函数
 * @returns {THREE.PointCloudMaterial}
 */
THREE.PointCloudMaterial.prototype.clone = function () {

	var material = new THREE.PointCloudMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.map = this.map;

	material.size = this.size;
	material.sizeAttenuation = this.sizeAttenuation;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};

// backwards compatibility
/**
 * @ignore
 */
THREE.ParticleBasicMaterial = function ( parameters ) {

	console.warn( 'THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial.' );
	return new THREE.PointCloudMaterial( parameters );

};
/**
 * @ignore
 */
THREE.ParticleSystemMaterial = function ( parameters ) {

	console.warn( 'THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial.' );
	return new THREE.PointCloudMaterial( parameters );

};
