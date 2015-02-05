/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @desc 动画混合mesh
 * @param {THREE.Geometry} geometry 几何对象
 * @param {THREE.Material} material 材质对象
 * @constructor
 */
THREE.MorphBlendMesh = function( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );
	/**
	 * @desc 动画map
	 * @type {map}
	 */
	this.animationsMap = {};
	/**
	 * @desc 动画list
	 * @type {array}
	 */
	this.animationsList = [];

	// prepare default animation
	// (all frames played together in 1 second)

	var numFrames = this.geometry.morphTargets.length;

	var name = "__default";

	var startFrame = 0;
	var endFrame = numFrames - 1;

	var fps = numFrames / 1;

	this.createAnimation( name, startFrame, endFrame, fps );
	this.setAnimationWeight( name, 1 );

};
/**
 * @desc MorphBlendMesh 从 Mesh 的原型继承所有属性方法
 * @type {THREE.Mesh}
 */
THREE.MorphBlendMesh.prototype = Object.create( THREE.Mesh.prototype );
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh;
/**
 * @desc 创建动画
 * @param {string} name 动画名称
 * @param {number} start 动画开始帧
 * @param {number} end 动画结束帧
 * @param {number} fps 动画帧率
 */
THREE.MorphBlendMesh.prototype.createAnimation = function ( name, start, end, fps ) {

	var animation = {

		startFrame: start,
		endFrame: end,

		length: end - start + 1,

		fps: fps,
		duration: ( end - start ) / fps,

		lastFrame: 0,
		currentFrame: 0,

		active: false,

		time: 0,
		direction: 1,
		weight: 1,

		directionBackwards: false,
		mirroredLoop: false

	};

	this.animationsMap[ name ] = animation;
	this.animationsList.push( animation );

};
/**
 * @desc 自动创建动画
 * @param {number} fps 帧率
 */
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function ( fps ) {

	var pattern = /([a-z]+)_?(\d+)/;

	var firstAnimation, frameRanges = {};

	var geometry = this.geometry;

	for ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {

		var morph = geometry.morphTargets[ i ];
		var chunks = morph.name.match( pattern );

		if ( chunks && chunks.length > 1 ) {

			var name = chunks[ 1 ];
			var num = chunks[ 2 ];

			if ( ! frameRanges[ name ] ) frameRanges[ name ] = { start: Infinity, end: - Infinity };

			var range = frameRanges[ name ];

			if ( i < range.start ) range.start = i;
			if ( i > range.end ) range.end = i;

			if ( ! firstAnimation ) firstAnimation = name;

		}

	}

	for ( var name in frameRanges ) {

		var range = frameRanges[ name ];
		this.createAnimation( name, range.start, range.end, fps );

	}

	this.firstAnimation = firstAnimation;

};
/**
 * @desc 设置动画正向播放
 * @param {string} name 动画名称
 */
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.direction = 1;
		animation.directionBackwards = false;

	}

};
/**
 * @desc 设置动画逆向播放
 * @param {string} name 动画名称
 */
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.direction = - 1;
		animation.directionBackwards = true;

	}

};
/**
 *
 * @desc 设置动画帧率
 * @param {string} name 动画名称
 * @param {number} fps 动画帧率
 */
THREE.MorphBlendMesh.prototype.setAnimationFPS = function ( name, fps ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.fps = fps;
		animation.duration = ( animation.end - animation.start ) / animation.fps;

	}

};
/**
 *
 * @desc 设置动画间隔时间
 * @param {string} name 动画名称
 * @param {number} duration 动画间隔时间
 */
THREE.MorphBlendMesh.prototype.setAnimationDuration = function ( name, duration ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.duration = duration;
		animation.fps = ( animation.end - animation.start ) / animation.duration;

	}

};
/**
 *
 * @desc 设置动画权重
 * @param {string} name 动画名称
 * @param {number} weight 动画权重
 */
THREE.MorphBlendMesh.prototype.setAnimationWeight = function ( name, weight ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.weight = weight;

	}

};
/**
 *
 * @desc 设置动画时长
 * @param {string} name 动画名称
 * @param {number} time 动画时长
 */
THREE.MorphBlendMesh.prototype.setAnimationTime = function ( name, time ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.time = time;

	}

};
/**
 *
 * @desc 获取动画时长
 * @param {string} name 动画名称
 * @return {number} 动画时长
 */
THREE.MorphBlendMesh.prototype.getAnimationTime = function ( name ) {

	var time = 0;

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		time = animation.time;

	}

	return time;

};
/**
 *
 * @desc 获取动画间隔
 * @param {string} name 动画名称
 * @return {number} 动画间隔
 */
THREE.MorphBlendMesh.prototype.getAnimationDuration = function ( name ) {

	var duration = - 1;

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		duration = animation.duration;

	}

	return duration;

};
/**
 *
 * @desc 播放动画
 * @param {string} name 动画名称
 */
THREE.MorphBlendMesh.prototype.playAnimation = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.time = 0;
		animation.active = true;

	} else {

		console.warn( "animation[" + name + "] undefined" );

	}

};
/**
 *
 * @desc 停止播放动画
 * @param {string} name 动画名称
 */
THREE.MorphBlendMesh.prototype.stopAnimation = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.active = false;

	}

};
/**
 *
 * @desc 动画更新
 * @param {number} delta 动画间隔
 */
THREE.MorphBlendMesh.prototype.update = function ( delta ) {

	for ( var i = 0, il = this.animationsList.length; i < il; i ++ ) {

		var animation = this.animationsList[ i ];

		if ( ! animation.active ) continue;

		var frameTime = animation.duration / animation.length;

		animation.time += animation.direction * delta;

		if ( animation.mirroredLoop ) {

			if ( animation.time > animation.duration || animation.time < 0 ) {

				animation.direction *= - 1;

				if ( animation.time > animation.duration ) {

					animation.time = animation.duration;
					animation.directionBackwards = true;

				}

				if ( animation.time < 0 ) {

					animation.time = 0;
					animation.directionBackwards = false;

				}

			}

		} else {

			animation.time = animation.time % animation.duration;

			if ( animation.time < 0 ) animation.time += animation.duration;

		}

		var keyframe = animation.startFrame + THREE.Math.clamp( Math.floor( animation.time / frameTime ), 0, animation.length - 1 );
		var weight = animation.weight;

		if ( keyframe !== animation.currentFrame ) {

			this.morphTargetInfluences[ animation.lastFrame ] = 0;
			this.morphTargetInfluences[ animation.currentFrame ] = 1 * weight;

			this.morphTargetInfluences[ keyframe ] = 0;

			animation.lastFrame = animation.currentFrame;
			animation.currentFrame = keyframe;

		}

		var mix = ( animation.time % frameTime ) / frameTime;

		if ( animation.directionBackwards ) mix = 1 - mix;

		this.morphTargetInfluences[ animation.currentFrame ] = mix * weight;
		this.morphTargetInfluences[ animation.lastFrame ] = ( 1 - mix ) * weight;

	}

};