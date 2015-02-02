/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 平行光源对象
 * @desc 平行光支持阴影
 * @param {THREE.Color} color 平行光的颜色属性
 * @param {float} intensity 平行光的强度,默认是1
 * @extends {THREE.Light}
 * @constructor
 */
THREE.DirectionalLight = function ( color, intensity ) {

	THREE.Light.call( this, color );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'DirectionalLight';
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
	 * @desc 相机左侧距离，不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraLeft = - 500;
	/**
	 * @desc 相机右侧距离，不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraRight = 500;
	/**
	 * @desc 相机上侧距离，不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraTop = 500;
	/**
	 * @desc 相机下侧距离，不计算在范围之外的物体的阴影
	 * @default
	 * @type {float}
	 */
	this.shadowCameraBottom = - 500;
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
	 * @desc 是否支持阴影级联
	 * @default
	 * @type {boolean}
	 */
	this.shadowCascade = false;
	/**
	 * @desc 阴影级联偏移距离
	 * @default ( 0, 0, - 1000 )
	 * @type {THREE.Vector3}
	 */
	this.shadowCascadeOffset = new THREE.Vector3( 0, 0, - 1000 );
	/**
	 * @desc 当使用2个阴影级联时，整个阴影距离内，默认被分为两块，靠近观察者较小的块和远处较大的块
	 * @default
	 * @type {number}
	 */
	this.shadowCascadeCount = 2;
	/**
	 * @desc 阴影级联偏移数组
	 * @default
	 * @type {number[]}
	 */
	this.shadowCascadeBias = [ 0, 0, 0 ];
	/**
	 * @desc 阴影级联宽度数组
	 * @default
	 * @type {number[]}
	 */
	this.shadowCascadeWidth = [ 512, 512, 512 ];
	/**
	 * @desc 阴影级联高度数组
	 * @default
	 * @type {number[]}
	 */
	this.shadowCascadeHeight = [ 512, 512, 512 ];
	/**
	 * @desc 阴影级联近处
	 * @default
	 * @type {number[]}
	 */
	this.shadowCascadeNearZ = [ - 1.000, 0.990, 0.998 ];
	/**
	 * @desc 阴影级联远处
	 * @default
	 * @type {number[]}
	 */
	this.shadowCascadeFarZ  = [  0.990, 0.998, 1.000 ];
	/**
	 * @desc 阴影级联数组
	 * @type {Array}
	 */
	this.shadowCascadeArray = [];

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
 * @desc DirectionalLight对象从THREE.Light的原型继承所有属性方法
 * @type {THREE.Light}
 */
THREE.DirectionalLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @desc DirectionalLight克隆函数
 * @returns {THREE.DirectionalLight}
 */
THREE.DirectionalLight.prototype.clone = function () {

	var light = new THREE.DirectionalLight();

	THREE.Light.prototype.clone.call( this, light );

	light.target = this.target.clone();

	light.intensity = this.intensity;

	light.castShadow = this.castShadow;
	light.onlyShadow = this.onlyShadow;

	//

	light.shadowCameraNear = this.shadowCameraNear;
	light.shadowCameraFar = this.shadowCameraFar;

	light.shadowCameraLeft = this.shadowCameraLeft;
	light.shadowCameraRight = this.shadowCameraRight;
	light.shadowCameraTop = this.shadowCameraTop;
	light.shadowCameraBottom = this.shadowCameraBottom;

	light.shadowCameraVisible = this.shadowCameraVisible;

	light.shadowBias = this.shadowBias;
	light.shadowDarkness = this.shadowDarkness;

	light.shadowMapWidth = this.shadowMapWidth;
	light.shadowMapHeight = this.shadowMapHeight;

	//

	light.shadowCascade = this.shadowCascade;

	light.shadowCascadeOffset.copy( this.shadowCascadeOffset );
	light.shadowCascadeCount = this.shadowCascadeCount;

	light.shadowCascadeBias = this.shadowCascadeBias.slice( 0 );
	light.shadowCascadeWidth = this.shadowCascadeWidth.slice( 0 );
	light.shadowCascadeHeight = this.shadowCascadeHeight.slice( 0 );

	light.shadowCascadeNearZ = this.shadowCascadeNearZ.slice( 0 );
	light.shadowCascadeFarZ  = this.shadowCascadeFarZ.slice( 0 );

	return light;

};
