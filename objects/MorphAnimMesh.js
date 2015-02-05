/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @classdesc 变形动画网格对象
 * @desc 这个对象是专门针对变形动画的,增加了许多角色变形动画的内容
 * @param {THREE.Geometry} geometry 几何对象
 * @param {THREE.Material} material 材质对象
 * @constructor
 */
THREE.MorphAnimMesh = function ( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	this.type = 'MorphAnimMesh';

	// API
	/**
	 * @desc 周期,单位毫秒,默认初始化为1000毫秒,每帧间隔时长
	 * @default
	 * @type {number}
	 */
	this.duration = 1000; // milliseconds
	/**
	 * @desc 镜像循环,看下面的算法,应该是播放完后,回放动画
	 * @default
	 * @type {boolean}
	 */
	this.mirroredLoop = false;
	/**
	 * @desc 动画时长
	 * @default
	 * @type {number}
	 */
	this.time = 0;

	// internals
	/**
	 * @desc 最后关键帧
	 * @default
	 * @type {number}
	 */
	this.lastKeyframe = 0;
	/**
	 * @desc 当前关键帧
	 * @default
	 * @type {number}
	 */
	this.currentKeyframe = 0;
	/**
	 * @desc 方向,应该指的是时间轴的方向
	 * @default
	 * @type {number}
	 */
	this.direction = 1;
	/**
	 * @desc 时间轴是否是返方向,默认为false
	 * @default
	 * @type {boolean}
	 */
	this.directionBackwards = false;
	// 创建关键帧动画时间轴,从morphTargets数组创建.
	this.setFrameRange( 0, this.geometry.morphTargets.length - 1 );

};
/**
 * @desc MorphAnimMesh从Mesh的原型继承所有属性方法
 * @type {THREE.Mesh}
 */
THREE.MorphAnimMesh.prototype = Object.create( THREE.Mesh.prototype );
/**
 * @desc 创建关键帧动画时间轴,从morphTargets数组创建
 * @param {number} start 开始帧
 * @param {number} end 结束帧
 */
THREE.MorphAnimMesh.prototype.setFrameRange = function ( start, end ) {
	/**
	 * @memberof THREE.MorphAnimMesh
	 * @desc 开始帧
	 * @type {number}
	 */
	this.startKeyframe = start;
	/**
	 * @memberof THREE.MorphAnimMesh
	 * @desc 结束帧
	 * @type {number}
	 */
	this.endKeyframe = end;
	/**
	 * @memberof THREE.MorphAnimMesh
	 * @desc 动画长度
	 * @type {number}
	 */
	this.length = this.endKeyframe - this.startKeyframe + 1;

};
/**
 * @desc 设置关键帧动画正放
 */
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {

	this.direction = 1;
	this.directionBackwards = false;

};
/**
 * @desc 设置关键帧动画倒放
 */
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {

	this.direction = - 1;
	this.directionBackwards = true;

};
/**
 * @desc 从morphTagets数组中解析关键帧动画
 */
THREE.MorphAnimMesh.prototype.parseAnimations = function () {

	var geometry = this.geometry;

	if ( ! geometry.animations ) geometry.animations = {};

	var firstAnimation, animations = geometry.animations;

	var pattern = /([a-z]+)_?(\d+)/;

	for ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {
		// 获得单个变形动画关键帧
		var morph = geometry.morphTargets[ i ];
		var parts = morph.name.match( pattern );

		if ( parts && parts.length > 1 ) {

			var label = parts[ 1 ];
			var num = parts[ 2 ];

			if ( ! animations[ label ] ) animations[ label ] = { start: Infinity, end: - Infinity };

			var animation = animations[ label ];

			if ( i < animation.start ) animation.start = i;
			if ( i > animation.end ) animation.end = i;

			if ( ! firstAnimation ) firstAnimation = label;

		}

	}
	// 设置第一个动画.
	geometry.firstAnimation = firstAnimation;

};
/**
 * @desc 从morphTagets数组中设置关键帧动画标签,可以将morphTargets数组中,分成几段动画,分别存放.
 * @param {string} label 动画名称
 * @param {number} start morphTargets开始索引
 * @param {number} end morphTargets结束索引
 */
THREE.MorphAnimMesh.prototype.setAnimationLabel = function ( label, start, end ) {

	if ( ! this.geometry.animations ) this.geometry.animations = {};

	this.geometry.animations[ label ] = { start: start, end: end };

};
/**
 * @desc 根据动画的标签名(参数lab)按照指定的速度(参数fps)播放动画
 * @param {string} label 动画名称
 * @param {number} fps 帧率
 */
THREE.MorphAnimMesh.prototype.playAnimation = function ( label, fps ) {

	var animation = this.geometry.animations[ label ];

	if ( animation ) {

		this.setFrameRange( animation.start, animation.end );
		this.duration = 1000 * ( ( animation.end - animation.start ) / fps );
		this.time = 0;

	} else {

		console.warn( 'animation[' + label + '] undefined' );

	}

};
/**
 * @desc 根据当前时钟频率生成补间动画
 * @param {number} delta 时钟频率
 */
THREE.MorphAnimMesh.prototype.updateAnimation = function ( delta ) {

	var frameTime = this.duration / this.length;

	this.time += this.direction * delta;

	if ( this.mirroredLoop ) {

		if ( this.time > this.duration || this.time < 0 ) {

			this.direction *= - 1;

			if ( this.time > this.duration ) {

				this.time = this.duration;
				this.directionBackwards = true;

			}

			if ( this.time < 0 ) {

				this.time = 0;
				this.directionBackwards = false;

			}

		}

	} else {

		this.time = this.time % this.duration;

		if ( this.time < 0 ) this.time += this.duration;

	}

	var keyframe = this.startKeyframe + THREE.Math.clamp( Math.floor( this.time / frameTime ), 0, this.length - 1 );

	if ( keyframe !== this.currentKeyframe ) {

		this.morphTargetInfluences[ this.lastKeyframe ] = 0;
		this.morphTargetInfluences[ this.currentKeyframe ] = 1;

		this.morphTargetInfluences[ keyframe ] = 0;

		this.lastKeyframe = this.currentKeyframe;
		this.currentKeyframe = keyframe;

	}

	var mix = ( this.time % frameTime ) / frameTime;

	if ( this.directionBackwards ) {

		mix = 1 - mix;

	}

	this.morphTargetInfluences[ this.currentKeyframe ] = mix;
	this.morphTargetInfluences[ this.lastKeyframe ] = 1 - mix;

};
/**
 * @desc 根据变形幅度t将morphTaInfluences[a]设置为1-t,morphTaInfluences[b]设置为t.
 * @param {number} a 节点a
 * @param {number} b 节点b
 * @param {float} t 变形幅度
 */
THREE.MorphAnimMesh.prototype.interpolateTargets = function ( a, b, t ) {

	var influences = this.morphTargetInfluences;

	for ( var i = 0, l = influences.length; i < l; i ++ ) {

		influences[ i ] = 0;

	}

	if ( a > -1 ) influences[ a ] = 1 - t;
	if ( b > -1 ) influences[ b ] = t;

};
/**
* @desc Three.MorphAnimMesh 克隆函数
* @param {THREE.MorphAnimMesh} object
* @returns {THREE.MorphAnimMesh}
*/
THREE.MorphAnimMesh.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.MorphAnimMesh( this.geometry, this.material );

	object.duration = this.duration;
	object.mirroredLoop = this.mirroredLoop;
	object.time = this.time;

	object.lastKeyframe = this.lastKeyframe;
	object.currentKeyframe = this.currentKeyframe;

	object.direction = this.direction;
	object.directionBackwards = this.directionBackwards;

	THREE.Mesh.prototype.clone.call( this, object );

	return object;

};
