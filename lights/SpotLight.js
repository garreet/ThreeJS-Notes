/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 聚光灯光源对象
 * @desc 根据设置灯光的颜属性color, 强度属性intensity,距离属性 distance,灯光的照射角度 angle,衰减速度 exponent 创建聚光灯光源(射灯)<br />
 * SpotLight类型灯光实现了阴影,但是需要在场景中使用MeshLambertMaterial或者MeshPhongMaterial
 * @param {THREE.Color} color 灯光的颜色属性
 * @param {float} intensity 灯光的强度,默认是1
 * @param {float} distance 灯光的长度属性,从灯光的position位置,开始衰减,衰减到distance的长度,默认是0
 * @param {float} angle 聚光灯的灯光照射角度属性,单位是弧度,默认是60度角的弧度
 * @param {float} exponent 聚光灯的从照射点的衰减速度属性,默认是10
 * @extends {THREE.Light}
 * @example var light = new THREE.SpotLight(0xff0000,1,100,Math.PI /2,5);   //创建灯光对象<br />
 *         light.position.set(50,50,30);   //设置位置<br />
 *         light.castShadow = true;    //开启阴影<br />
 *         light.shadowMapWidth = 1024; //阴影贴图宽度设置为1024像素<br />
 *         light.shadowMapHeight = 1024; //阴影贴图高度设置为1024像素<br />
 *         light.shadowCameraNear = 500;   //阴影的平截头体区域near属性<br />
 *         light.shadowCameraFar = 4000;   //阴影的平截头体区域far属性<br />
 *         light.shadowCameraFov = 30; //阴影的平截头体区域fov属性<br />
 *         scene.add(lignt);   //加入场景
 * @constructor
 */
THREE.SpotLight = function ( color, intensity, distance, angle, exponent ) {

	THREE.Light.call( this, color );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'SpotLight';
	/**
	 * @desc 灯光的位置属性初始化为,0,1,0
	 */
	this.position.set( 0, 1, 0 );
	/**
	 * @desc 创建一个目标点对象,目标点对象是一个Object3D对象
	 * @type {THREE.Object3D}
	 */
	this.target = new THREE.Object3D();
	/**
	 * desc 灯光的强度<br />
	 * (光线的密度，默认为1。因为RGB的三个值均在0~255之间，<br />
	 * 不能反映出光照的强度变化，光照越强，物体表面就更明亮。)
	 * @default 1
	 * @type {float}
	 */
	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	/**
	 * desc 灯光的长度度<br />
	 * 如果不指定,初始化为1.<br />
	 * (衰减距离，默认值为0，光照无衰减；如果是非0值，光照会从position位置<br />
	 * （实际上是position所处的那个平面）开始衰减，衰减到distance距离之后，光照强度intensity为0)
	 * @default 0
	 * @type {float}
	 */
	this.distance = ( distance !== undefined ) ? distance : 0;
	/**
	 * desc 聚光灯的灯光照射角度属性<br />
	 * 单位是弧度,默认是60度角的弧度
	 * @default Math.PI / 3
	 * @type {float}
	 */
	this.angle = ( angle !== undefined ) ? angle : Math.PI / 3;
	/**
	 * desc 光灯的从照射点的衰减速度指数
	 * @default 10
	 * @type {float}
	 */
	this.exponent = ( exponent !== undefined ) ? exponent : 10;
	/**
	 * @desc 是否对于所有表面都会逐像元地计算其在光照方向上是否被遮挡，这会消耗大量的计算
	 * @default
	 * @type {boolean}
	 */
	this.castShadow = false;
	/**
	 * @desc 控制是否只产生阴影而不“照亮”物体
	 * @default
	 * @type {boolean}
	 */
	this.onlyShadow = false;

	//
	/**
	 * @desc 平截头体近端,定义一个范围(平截头体),不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraNear = 50;
	/**
	 * @desc 平截头体远端,定义一个范围(平截头体),不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraFar = 5000;
	/**
	 * @desc 平截头体视野,定义一个范围(平截头体),不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraFov = 50;
	/**
	 * @desc 会在场景中显示灯光的框架,方便调试
	 * @default
	 * @type {boolean}
	 */
	this.shadowCameraVisible = false;
	/**
	 * @desc 阴影贴图的偏移
	 * @default
	 * @type {float}
	 */
	this.shadowBias = 0;
	/**
	 * @desc 阴影对物体亮度的影响
	 * @default
	 * @type {float}
	 */
	this.shadowDarkness = 0.5;
	/**
	 * @desc 阴影贴图宽度
	 * @default
	 * @type {float}
	 */
	this.shadowMapWidth = 512;
	/**
	 * @desc 阴影贴图高度
	 * @default
	 * @type {float}
	 */
	this.shadowMapHeight = 512;

	//
	/**
	 * @desc 指定阴影贴图
	 * @default
	 * @type {null}
	 */
	this.shadowMap = null;
	/**
	 * @desc 指定阴影贴图大小
	 * @default
	 * @type {number}
	 */
	this.shadowMapSize = null;
	/**
	 * @desc 指定阴影相机
	 * @default
	 * @type {THREE.Camera}
	 */
	this.shadowCamera = null;
	/**
	 * @desc 指定阴影矩阵
	 * @default
	 * @type {THREE.Matrix4}
	 */
	this.shadowMatrix = null;

};
/**
 * @desc SpotLight对象从THREE.Light的原型继承所有属性方法
 * @type {THREE.Light}
 */
THREE.SpotLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @desc SpotLight克隆函数
 * @returns {THREE.SpotLight}
 */
THREE.SpotLight.prototype.clone = function () {

	var light = new THREE.SpotLight();

	THREE.Light.prototype.clone.call( this, light );

	light.target = this.target.clone();

	light.intensity = this.intensity;
	light.distance = this.distance;
	light.angle = this.angle;
	light.exponent = this.exponent;

	light.castShadow = this.castShadow;
	light.onlyShadow = this.onlyShadow;

	//

	light.shadowCameraNear = this.shadowCameraNear;
	light.shadowCameraFar = this.shadowCameraFar;
	light.shadowCameraFov = this.shadowCameraFov;

	light.shadowCameraVisible = this.shadowCameraVisible;

	light.shadowBias = this.shadowBias;
	light.shadowDarkness = this.shadowDarkness;

	light.shadowMapWidth = this.shadowMapWidth;
	light.shadowMapHeight = this.shadowMapHeight;

	return light;

};
