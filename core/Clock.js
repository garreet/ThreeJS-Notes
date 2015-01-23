/**
 * @author alteredq / http://alteredqualia.com/
 */

/**
 * @classdesc 时钟类
 * @desc 用来记录时间等功能
 * @param {boolean} autoStart 是否自动启动，默认为启动
 * @constructor
 */
THREE.Clock = function ( autoStart ) {

	/**
	 * @desc 是否自动启动
	 * @default true
	 * @type {boolean}
	 */
	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;
	/**
	 * @desc 启动时间
	 * @default 0
	 * @type {number}
	 */
	this.startTime = 0;
	/**
	 * @desc 上一次时间
	 * @default 0
	 * @type {number}
	 */
	this.oldTime = 0;
	/**
	 * @desc 运行时间
	 * @default 0
	 * @type {number}
	 */
	this.elapsedTime = 0;
	/**
	 * @desc 是否正在运行
	 * @default false
	 * @type {boolean}
	 */
	this.running = false;

};

THREE.Clock.prototype = {

	constructor: THREE.Clock,
	/**
	 * @desc 开始记录时间,获得开始的时间截
	 */
	start: function () {

		this.startTime = self.performance !== undefined && self.performance.now !== undefined
					 ? self.performance.now()
					 : Date.now();

		this.oldTime = this.startTime;
		this.running = true;
	},
	/**
	 * @desc 停止记录时间,获得结束的时间截
	 */
	stop: function () {

		this.getElapsedTime();
		this.running = false;

	},
	/**
	 * @desc 返回从oldTimed到stop之间的时间长度,以秒为单位
	 * @returns {number} 秒为单位
	 */
	getElapsedTime: function () {

		this.getDelta();
		return this.elapsedTime;

	},
	/**
	 * @desc 获oldTimed到现在的时间差值,以秒为单位
	 * @returns {number} 秒为单位
	 */
	getDelta: function () {

		var diff = 0;

		if ( this.autoStart && ! this.running ) {

			this.start();

		}

		if ( this.running ) {

			var newTime = self.performance !== undefined && self.performance.now !== undefined
					 ? self.performance.now()
					 : Date.now();

			diff = 0.001 * ( newTime - this.oldTime );
			this.oldTime = newTime;

			this.elapsedTime += diff;

		}

		return diff;

	}

};
