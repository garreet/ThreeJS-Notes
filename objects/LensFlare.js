/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 透镜对象
 * @param {THREE.Texture} texture 纹理
 * @param {number} size 尺寸
 * @param {float} distance 距离
 * @param {number} blending blend方式
 * @param {THREE.Color} color 颜色
 * @constructor
 */
THREE.LensFlare = function ( texture, size, distance, blending, color ) {

	THREE.Object3D.call( this );
	/**
	 * @desc 透镜对象数组
	 * @type {Array}
	 */
	this.lensFlares = [];
	/**
	 * @desc 屏幕位置
	 * @type {THREE.Vector3}
	 */
	this.positionScreen = new THREE.Vector3();
	/**
	 * @desc 更新回调函数
	 * @type {*}
	 */
	this.customUpdateCallback = undefined;

	if( texture !== undefined ) {
		// 初始化
		this.add( texture, size, distance, blending, color );

	}

};
/**
 * @desc LensFlare从Objec3D的原型继承所有属性方法
 * @type {THREE.Object3D}
 */
THREE.LensFlare.prototype = Object.create( THREE.Object3D.prototype );


/*
 * Add: adds another flare
 */
/**
 * @desc 添加透镜
 * @param {THREE.Texture} texture 纹理
 * @param {number} size 尺寸
 * @param {float} distance 距离
 * @param {number} blending blend方式
 * @param {THREE.Color} color 颜色
 * @param {float} opacity 透明值
 */
THREE.LensFlare.prototype.add = function ( texture, size, distance, blending, color, opacity ) {

	if ( size === undefined ) size = - 1;
	if ( distance === undefined ) distance = 0;
	if ( opacity === undefined ) opacity = 1;
	if ( color === undefined ) color = new THREE.Color( 0xffffff );
	if ( blending === undefined ) blending = THREE.NormalBlending;

	distance = Math.min( distance, Math.max( 0, distance ) );

	this.lensFlares.push( {
		texture: texture, 			// THREE.Texture
		size: size, 				// size in pixels (-1 = use texture.width)
		distance: distance, 		// distance (0-1) from light source (0=at light source)
		x: 0, y: 0, z: 0,			// screen position (-1 => 1) z = 0 is ontop z = 1 is back
		scale: 1, 					// scale
		rotation: 1, 				// rotation
		opacity: opacity,			// opacity
		color: color,				// color
		blending: blending			// blending
	} );

};

/*
 * Update lens flares update positions on all flares based on the screen position
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
 */
/**
 * @desc 更新透镜对象的位置，旋转等参数
 */
THREE.LensFlare.prototype.updateLensFlares = function () {

	var f, fl = this.lensFlares.length;
	var flare;
	var vecX = - this.positionScreen.x * 2;
	var vecY = - this.positionScreen.y * 2;

	for( f = 0; f < fl; f ++ ) {

		flare = this.lensFlares[ f ];

		flare.x = this.positionScreen.x + vecX * flare.distance;
		flare.y = this.positionScreen.y + vecY * flare.distance;

		flare.wantedRotation = flare.x * Math.PI * 0.25;
		flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;

	}

};

