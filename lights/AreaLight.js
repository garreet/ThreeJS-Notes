/**
 * @author MPanknin / http://www.redplant.de/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 面光，区域光对象
 * @desc 区域光和其他光源不同,是一种二维面积光源,他的亮度不仅和强度有关,而且还和他的面积大小有关.<br />
 * 通过变换灯光的width,height,normal属性,区域光可以模拟窗户射入光线
 * @param {THREE.Color} color 环境光的颜色
 * @param {float} intensity 灯光的强度,默认是1
 * @extends {THREE.Light}
 * @example  var light = new THREE.AreaLight(0xff0000,1);    //创建平面灯光对象<br />
 * 			light.position.set(50,50,30);   //设置位置<br />
 * 			light.rotation.set(-0.3,0.3,0.002); //设置角度<br />
 * 			light.width = 10;   //设置宽度<br />
 * 			light.height = 1;   //设置高度<br />
 * 			scene.add(lignt);   //加入场景
 * @constructor
 */
THREE.AreaLight = function ( color, intensity ) {

	THREE.Light.call( this, color );
	/**
	 * @default
	 * @type {string}
	 */
	this.type = 'AreaLight';

	/**
	 * @desc 面法线<br />
	 * 可以设置或者获得面光的单位向量,确认灯光照射面正确.这是在局部空间计算.
	 * @default ( 0, - 1, 0 )
	 * @type {THREE.Vector3}
	 */
	this.normal = new THREE.Vector3( 0, - 1, 0 );
	/**
	 * @desc 灯光的方向
	 * @default ( 1, 0, 0 )
	 * @type {THREE.Vector3}
	 */
	this.right = new THREE.Vector3( 1, 0, 0 );
	/**
	 * @desc 灯光的强度
	 * @default ( 1, 0, 0 )
	 * @type {THREE.Vector3}
	 */
	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	/**
	 * @desc 区域光的宽度,初始化为1.0
	 * @default
	 * @type {float}
	 */
	this.width = 1.0;
	/**
	 * @desc 区域光的宽度,初始化为1.0
	 * @default
	 * @type {float}
	 */
	this.height = 1.0;
	//WebGL是通过光强乘以衰减系数来计算衰减光照的,
	//attenuation (衰减系数) = 1`/ (this.constantAttenuation + this.distance * this.linearAttenuation + this.quadraticAttenuation * this.distance * this.distance )
	/**
	 * @desc 常量衰减系数,系数值越大，衰变越快
	 * @default
	 * @type {float}
	 */
	this.constantAttenuation = 1.5;
	/**
	 * @desc 线性衰减系数,系数值越大，衰变越快
	 * @default
	 * @type {float}
	 */
	this.linearAttenuation = 0.5;
	/**
	 * @desc 衰减平方系数,系数值越大，衰变越快
	 * @default
	 * @type {float}
	 */
	this.quadraticAttenuation = 0.1;

};
/**
 * @desc AreaLight对象从THREE.Light的原型继承所有属性方法
 * @type {THREE.Light}
 */
THREE.AreaLight.prototype = Object.create( THREE.Light.prototype );

