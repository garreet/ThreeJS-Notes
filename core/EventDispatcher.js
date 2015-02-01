/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */
/**
 * @classdesc 事件调度类
 * @desc 用来管理侦听函数,被嵌入Object3D对象之上.当Object3D发生事件时,这个方法就会自动被触发.<br />
 * 可以通过调用调度该事件的对象的 addEventListener() 方法来注册函数以处理运行时事件
 * @constructor
 */
THREE.EventDispatcher = function () {}

THREE.EventDispatcher.prototype = {

	constructor: THREE.EventDispatcher,
	/**
	 * @desc 将当前基类绑定到参数Object对象之上,将基类的方法添加到object对象内
	 * @param {THREE.Object3D} object
	 */
	apply: function ( object ) {

		object.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
		object.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
		object.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
		object.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent;

	},
	/**
	 * @desc 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知
	 * @param {String} type 事件类型
	 * @param {requestCallback} listener	监听回调函数
	 */
	addEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) this._listeners = {};

		var listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	},
	/**
	 * @desc 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器
	 * @param {String} type 事件类型
	 * @param {requestCallback} listener
	 * @returns {boolean}	监听回调函数
	 */
	hasEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return false;

		var listeners = this._listeners;

		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {

			return true;

		}

		return false;

	},

	/**
	 * @desc 从 EventDispatcher 对象中删除为特定事件类型注册了任何侦听器
	 * @param {String} type 事件类型
	 * @param {requestCallback} listener
	 */
	removeEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	},
	/**
	 * @desc 将事件调度到事件流中<br />
	 * 事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象<br />
	 * 如果正在重新调度事件，则会自动创建此事件的一个克隆<br />
	 * 在调度了事件后，其 target 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度
	 * @param event 事件
	 */
	dispatchEvent: function ( event ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;

			var array = [];
			var length = listenerArray.length;

			for ( var i = 0; i < length; i ++ ) {

				array[ i ] = listenerArray[ i ];

			}

			for ( var i = 0; i < length; i ++ ) {

				array[ i ].call( this, event );

			}

		}

	}

};
