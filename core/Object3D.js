/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */
/**
 * @classdesc 3D对象基类
 * @desc Object3D是场景中图形对象的基类.Object3D对象主要是对象的矩阵变换，父子关系维护等功能
 * @constructor
 */
THREE.Object3D = function () {
	/**
	 * @desc Object3D的引用计数
	 */
	Object.defineProperty( this, 'id', { value: THREE.Object3DIdCount ++ } );

	/**
	 * @desc Object3D对象的UUID
	 */
	this.uuid = THREE.Math.generateUUID();
	/**
	 * @desc 对象名称
	 * @default ''
	 * @type {string}
	 */
	this.name = '';
	/**
	 * @desc 对象类型
	 * @default 'Object3D'
	 * @type {string}
	 */
	this.type = 'Object3D';
	/**
	 * @desc object的父对象
	 * @type {THREE.Object3D}
	 */
	this.parent = undefined;
	/**
	 * @desc object的子对象几何
	 * @type {THREE.Object3D[]}
	 */
	this.children = [];

	/**
	 * @desc object的上方向
	 * @type {THREE.Vector3}
	 */
	this.up = THREE.Object3D.DefaultUp.clone();
	/**
	 *
	 * @type {THREE.Object3D}
	 */
	var scope = this;
	/**
	 *
	 * @type {THREE.Vector3}
	 */
	var position = new THREE.Vector3();
	/**
	 *
	 * @type {THREE.Euler}
	 */
	var rotation = new THREE.Euler();
	/**
	 *
	 * @type {THREE.Quaternion}
	 */
	var quaternion = new THREE.Quaternion();
	/**
	 *
	 * @type {THREE.Vector3}
	 */
	var scale = new THREE.Vector3( 1, 1, 1 );
	/**
	 * @desc 给对象的rotation属性绑定setFromEuler()方法<br />
	 * 当rotation属性值更改,调用setFromEuler()方法
	 */
	var onRotationChange = function () {
		quaternion.setFromEuler( rotation, false );
	};
	/**
	 * @desc 给对象的rotation属性绑定setFromQuaternion()方法<br />
	 * 当rotation属性值更改,调用setFromEuler()方法
	 */
	var onQuaternionChange = function () {
		rotation.setFromQuaternion( quaternion, undefined, false );
	};

	rotation.onChange( onRotationChange );
	quaternion.onChange( onQuaternionChange );
	Object.defineProperties( this, {
		position: {
			enumerable: true,
			value: position
		},
		rotation: {
			enumerable: true,
			value: rotation
		},
		quaternion: {
			enumerable: true,
			value: quaternion
		},
		scale: {
			enumerable: true,
			value: scale
		}
	} );
	/**
	 * @desc renderDepth属性,如果设置了值将会覆盖渲染深度.
	 * @default null
	 * @type {number}
	 */
	this.renderDepth = null;
	/**
	 * @desc 每帧是否重新计算旋转rotation
	 * @default true
	 * @type {boolean}
	 */
	this.rotationAutoUpdate = true;
	/**
	 * @desc 对象的变换矩阵
	 * @type {THREE.Matrix4}
	 */
	this.matrix = new THREE.Matrix4();
	/**
	 * @desc 对象的世界矩阵<br />
	 * 如果当前对象是子对象,matrixWorld属性为上一级对象的变换矩阵,否则是自己的变换矩阵
	 * @type {THREE.Matrix4}
	 */
	this.matrixWorld = new THREE.Matrix4();
	/**
	 * @desc 每帧是否重新计算对象矩阵
	 * @default true
	 * @type {boolean}
	 */
	this.matrixAutoUpdate = true;
	/**
	 * @desc 每帧是否重新计算世界矩阵
	 * @default false
	 * @type {boolean}
	 */
	this.matrixWorldNeedsUpdate = false;
	/**
	 * @desc 是否可见
	 * @default true
	 * @type {boolean}
	 */
	this.visible = true;
	/**
	 * @desc 是否生成阴影
	 * @default false
	 * @type {boolean}
	 */
	this.castShadow = false;
	/**
	 * @desc 是否支持阴影覆盖
	 * @default false
	 * @type {boolean}
	 */
	this.receiveShadow = false;
	/**
	 * @desc 是否需要平头界面体裁剪
	 * @default true
	 * @type {boolean}
	 */
	this.frustumCulled = true;

	/**
	 * @desc 用户自定义数据
	 * @type {{}}
	 */
	this.userData = {};

};
/**
 * @memberof THREE.Object3D
 * @default ( 0, 1, 0 )
 * @type {THREE.Vector3}
 */
THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 1, 0 );

THREE.Object3D.prototype = {

	constructor: THREE.Object3D,
	/**
	 * @desc 获得欧拉角的轴顺序
	 * @returns {string}
	 */
	get eulerOrder () {

		console.warn( 'THREE.Object3D: .eulerOrder has been moved to .rotation.order.' );

		return this.rotation.order;

	},
	/**
	 * @desc 设置欧拉角的轴顺序
	 * @param {string} value
	 */
	set eulerOrder ( value ) {

		console.warn( 'THREE.Object3D: .eulerOrder has been moved to .rotation.order.' );

		this.rotation.order = value;

	},
	/**
	 * @ignore
	 */
	get useQuaternion () {

		console.warn( 'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.' );

	},
	/**
	 * @ignore
	 */
	set useQuaternion ( value ) {

		console.warn( 'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.' );

	},
	/**
	 * @desc 对对象的matrix属性应用矩阵变换.达到旋转,缩放,移动的目的
	 * @param {THREE.Matrix4} matrix
	 */
	applyMatrix: function ( matrix ) {

		this.matrix.multiplyMatrices( matrix, this.matrix );

		this.matrix.decompose( this.position, this.quaternion, this.scale );

	},
	/**
	 * @desc 通过四元数的方式旋转任意坐标轴(参数axis)旋转角度(参数angle),最后将结果返回到this.quternion属性中
	 * @param {THREE.Vector3} axis 必须是单位向量
	 * @param {float} angle
	 */
	setRotationFromAxisAngle: function ( axis, angle ) {

		// assumes axis is normalized

		this.quaternion.setFromAxisAngle( axis, angle );

	},
	/**
	 * @desc 通过一次欧拉旋转(参数euler)设置四元数旋转,最后将结果返回到this.quternion属性中
	 * @param {THREE.Euler} euler
	 */
	setRotationFromEuler: function ( euler ) {

		this.quaternion.setFromEuler( euler, true );

	},
	/**
	 * @desc 利用一个参数m(旋转矩阵),达到旋转变换的目的吧,最后将结果返回到this.quternion属性中
	 * @param {THREE.Matrix4} m
	 */
	setRotationFromMatrix: function ( m ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );

	},
	/**
	 * @desc 通过规范化的旋转四元数直接应用旋转
	 * @param {THREE.Quaternion} q
	 */
	setRotationFromQuaternion: function ( q ) {

		// assumes q is normalized

		this.quaternion.copy( q );

	},
	/**
	 * @function
	 * @desc 通过坐标轴旋转
	 * @param {THREE.Vector3} axis
	 * @param {float} angle 弧度
	 * @return {THREE.Object3D}
	 */
	rotateOnAxis: function () {

		// rotate object on axis in object space
		// axis is assumed to be normalized

		var q1 = new THREE.Quaternion();

		return function ( axis, angle ) {

			q1.setFromAxisAngle( axis, angle );

			this.quaternion.multiply( q1 );

			return this;

		}

	}(),
	/**
	 * @function
	 * @desc 绕X轴旋转angle度
	 * @param {float} angle 弧度
	 * @return {THREE.Object3D}
	 */
	rotateX: function () {

		var v1 = new THREE.Vector3( 1, 0, 0 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};

	}(),
	/**
	 * @function
	 * @desc 绕Y轴旋转angle度
	 * @param {float} angle 弧度
	 * @return {THREE.Object3D}
	 */
	rotateY: function () {

		var v1 = new THREE.Vector3( 0, 1, 0 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};

	}(),
	/**
	 * @function
	 * @desc 绕Z轴旋转angle度
	 * @param {float} angle 弧度
	 * @return {THREE.Object3D}
	 */
	rotateZ: function () {

		var v1 = new THREE.Vector3( 0, 0, 1 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};

	}(),
	/**
	 * @function
	 * @desc 对象延任意坐标轴(参数axis)移动指定距离(参数distance)
	 * @param {THREE.Vector3} axis 平移轴
	 * @param {float} distance 平移距离
	 * @return {THREE.Object3D}
	 */
	translateOnAxis: function () {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		var v1 = new THREE.Vector3();

		return function ( axis, distance ) {

			v1.copy( axis ).applyQuaternion( this.quaternion );

			this.position.add( v1.multiplyScalar( distance ) );

			return this;

		}

	}(),
	/**
	 * @deprecated 改为 translateOnAxis
	 * @desc 对象延任意坐标轴(参数axis)移动指定距离(参数distance)
	 * @param {float} distance 平移距离
	 * @param {THREE.Vector3} axis 平移轴
	 * @returns {THREE.Object3D}
	 */
	translate: function ( distance, axis ) {

		console.warn( 'THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.' );
		return this.translateOnAxis( axis, distance );

	},
	/**
	 * @desc 对象延X轴移动指定距离(参数distance)
	 * @param {float} distance 平移距离
	 * @returns {THREE.Object3D}
	 */
	translateX: function () {

		var v1 = new THREE.Vector3( 1, 0, 0 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};

	}(),
	/**
	 * @desc 对象延Y轴移动指定距离(参数distance)
	 * @param {float} distance 平移距离
	 * @returns {THREE.Object3D}
	 */
	translateY: function () {

		var v1 = new THREE.Vector3( 0, 1, 0 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};

	}(),
	/**
	 * @desc 对象延Z轴移动指定距离(参数distance)
	 * @param {float} distance 平移距离
	 * @returns {THREE.Object3D}
	 */
	translateZ: function () {

		var v1 = new THREE.Vector3( 0, 0, 1 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};

	}(),

	/**
	 * @desc 将参数vector,从对象坐标空间变换成世界坐标空间
	 * @param {THREE.Vector3} vector
	 * @returns {THREE.Vector3}
	 */
	localToWorld: function ( vector ) {

		return vector.applyMatrix4( this.matrixWorld );

	},
	/**
	 * @desc 将参数vector,从世界坐标空间变换成对象坐标空间
	 * @param {THREE.Vector3} vector
	 * @returns {THREE.Vector3}
	 */
	worldToLocal: function () {

		var m1 = new THREE.Matrix4();

		return function ( vector ) {

			return vector.applyMatrix4( m1.getInverse( this.matrixWorld ) );

		};

	}(),
	/**
	 * @function
	 * @desc 用来旋转对象,并将对象面对空间中的点vector
	 * @param {THREE.Vector3} vector
	 */
	lookAt: function () {

		// This routine does not support objects with rotated and/or translated parent(s)

		var m1 = new THREE.Matrix4();

		return function ( vector ) {

			m1.lookAt( vector, this.position, this.up );

			this.quaternion.setFromRotationMatrix( m1 );

		};

	}(),
	/**
	 * @desc 对象(参数object),设置为当前对象的子对象
	 * @param {THREE.Object3D} object
	 * @returns {THREE.Object3D}
	 */
	add: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		if ( object === this ) {

			console.error( "THREE.Object3D.add:", object, "can't be added as a child of itself." );
			return this;

		}

		if ( object instanceof THREE.Object3D ) {

			if ( object.parent !== undefined ) {

				object.parent.remove( object );

			}

			object.parent = this;
			object.dispatchEvent( { type: 'added' } );

			this.children.push( object );

		} else {

			console.error( "THREE.Object3D.add:", object, "is not an instance of THREE.Object3D." );

		}

		return this;

	},
	/**
	 * @desc 对象(参数object),从当前对象的子对象列表中删除
	 * @param {THREE.Object3D} object
	 */
	remove: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i++ ) {

				this.remove( arguments[ i ] );

			}

		}

		var index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = undefined;

			object.dispatchEvent( { type: 'removed' } );

			this.children.splice( index, 1 );

		}

	},
	/**
	 * @deprecated 改为getObjectByName()
	 * @desc 通过name获得子对象
	 * @param {String} name
	 * @param {boolean} recursive 默认为false,表示不才查找子对象的子对象
	 * @returns {THREE.Object3D}
	 */
	getChildByName: function ( name, recursive ) {

		console.warn( 'THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().' );
		return this.getObjectByName( name, recursive );

	},
	/**
	 * @desc 通过id获得子对象
	 * @param {String} name
	 * @param {boolean} recursive 默认为false,表示不才查找子对象的子对象
	 * @returns {THREE.Object3D}
	 */
	getObjectById: function ( id, recursive ) {

		if ( this.id === id ) return this;

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];
			var object = child.getObjectById( id, recursive );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	},
	/**
	 * @desc 通过name获得子对象
	 * @param {String} name
	 * @param {boolean} recursive 默认为false,表示不才查找子对象的子对象
	 * @returns {THREE.Object3D}
	 */
	getObjectByName: function ( name, recursive ) {

		if ( this.name === name ) return this;

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];
			var object = child.getObjectByName( name, recursive );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	},
	/**
	 * @desc 获得世界坐标系下的平移坐标
	 * @param {THREE.Vector3} optionalTarget
	 * @returns {THREE.Vector3}
	 */
	getWorldPosition: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		this.updateMatrixWorld( true );

		return result.setFromMatrixPosition( this.matrixWorld );

	},
	/**
	 * @function
	 * @desc 获得世界坐标系下的四元数
	 * @param {THREE.Quaternion} optionalTarget
	 * @return {THREE.Quaternion}
	 */
	getWorldQuaternion: function () {

		var position = new THREE.Vector3();
		var scale = new THREE.Vector3();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Quaternion();

			this.updateMatrixWorld( true );

			this.matrixWorld.decompose( position, result, scale );

			return result;

		}

	}(),
	/**
	 * @function
	 * @desc 获得世界坐标系下的欧拉角
	 * @param {THREE.Euler} optionalTarget
	 * @return {THREE.Euler}
	 */
	getWorldRotation: function () {

		var quaternion = new THREE.Quaternion();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Euler();

			this.getWorldQuaternion( quaternion );

			return result.setFromQuaternion( quaternion, this.rotation.order, false );

		}

	}(),
	/**
	 * @function
	 * @desc 获得世界坐标系下的缩放向量
	 * @param {THREE.Vector3} optionalTarget
	 * @return {THREE.Vector3}
	 */
	getWorldScale: function () {

		var position = new THREE.Vector3();
		var quaternion = new THREE.Quaternion();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			this.updateMatrixWorld( true );

			this.matrixWorld.decompose( position, quaternion, result );

			return result;

		}

	}(),
	/**
	 * @function
	 * @desc 获得世界坐标系下的旋转角
	 * @param {THREE.Vector3} optionalTarget
	 * @return {THREE.Vector3}
	 */
	getWorldDirection: function () {

		var quaternion = new THREE.Quaternion();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			this.getWorldQuaternion( quaternion );

			return result.set( 0, 0, 1 ).applyQuaternion( quaternion );

		}

	}(),
	/**
	 * @desc 光线跟踪 ，未写代码
	 */
	raycast: function () {},

	/**
	 * @desc 遍历当前对象以及子对象并且应用callback方法
	 * @param {requestCallback} callback
	 */
	traverse: function ( callback ) {

		callback( this );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].traverse( callback );

		}

	},
	/**
	 * @desc 遍历当前对象以及子对象，当对象可见时并且应用callback方法
	 * @param {requestCallback} callback
	 */
	traverseVisible: function ( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].traverseVisible( callback );

		}

	},
	/**
	 * @desc 根据位置，四元数，缩放比例更新矩阵，并设置世界矩阵需要更新
	 */
	updateMatrix: function () {

		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;

	},
	/**
	 * @desc 根据位置，四元数，缩放比例更新世界矩阵
	 * @param {boolean} force 是否强制更新
	 */
	updateMatrixWorld: function ( force ) {

		if ( this.matrixAutoUpdate === true ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate === true || force === true ) {

			if ( this.parent === undefined ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].updateMatrixWorld( force );

		}

	},
	/**
	 * @desc Object3D存为JSON格式
	 * @returns {{metadata: {version: number, type: string, generator: string}}}
	 */
	toJSON: function () {

		var output = {
			metadata: {
				version: 4.3,
				type: 'Object',
				generator: 'ObjectExporter'
			}
		};

		//

		var geometries = {};

		/**
		 * @memberof THREE.Object3D.parseGeometry
		 * @desc 把geometry对象转换为Json格式 ， 并添加到geometries数组中
		 * @param {THREE.Geometry} geometry
		 * @returns {THREE.Geometry.uuid}
		 */
		var parseGeometry = function ( geometry ) {

			if ( output.geometries === undefined ) {

				output.geometries = [];

			}

			if ( geometries[ geometry.uuid ] === undefined ) {

				var json = geometry.toJSON();

				delete json.metadata;

				geometries[ geometry.uuid ] = json;

				output.geometries.push( json );

			}

			return geometry.uuid;

		};

		//

		var materials = {};
		/**
		 * @memberof THREE.Object3D.parseGeometry
		 * @desc 把material对象转换为Json格式 ,并添加到materials数组中
		 * @param {THREE.Material} material
		 * @returns {THREE.Material.uuid}
		 */
		var parseMaterial = function ( material ) {

			if ( output.materials === undefined ) {

				output.materials = [];

			}

			if ( materials[ material.uuid ] === undefined ) {

				var json = material.toJSON();

				delete json.metadata;

				materials[ material.uuid ] = json;

				output.materials.push( json );

			}

			return material.uuid;

		};

		//
		/**
		 *
		 * @memberof THREE.Object3D.parseGeometry
		 * @desc 把object对象转换为Json格式<br />
		 * 把Object中的信息转为Json ，若Object内有Geometry和Material对象，则都转为Json<br />
		 * 把Object的子对象也转为Json
		 * @param {THREE.Object3D} object
		 * @returns {THREE.Object3D.uuid}
		 */
		var parseObject = function ( object ) {

			var data = {};

			data.uuid = object.uuid;
			data.type = object.type;

			if ( object.name !== '' ) data.name = object.name;
			if ( JSON.stringify( object.userData ) !== '{}' ) data.userData = object.userData;
			if ( object.visible !== true ) data.visible = object.visible;

			if ( object instanceof THREE.PerspectiveCamera ) {

				data.fov = object.fov;
				data.aspect = object.aspect;
				data.near = object.near;
				data.far = object.far;

			} else if ( object instanceof THREE.OrthographicCamera ) {

				data.left = object.left;
				data.right = object.right;
				data.top = object.top;
				data.bottom = object.bottom;
				data.near = object.near;
				data.far = object.far;

			} else if ( object instanceof THREE.AmbientLight ) {

				data.color = object.color.getHex();

			} else if ( object instanceof THREE.DirectionalLight ) {

				data.color = object.color.getHex();
				data.intensity = object.intensity;

			} else if ( object instanceof THREE.PointLight ) {

				data.color = object.color.getHex();
				data.intensity = object.intensity;
				data.distance = object.distance;

			} else if ( object instanceof THREE.SpotLight ) {

				data.color = object.color.getHex();
				data.intensity = object.intensity;
				data.distance = object.distance;
				data.angle = object.angle;
				data.exponent = object.exponent;

			} else if ( object instanceof THREE.HemisphereLight ) {

				data.color = object.color.getHex();
				data.groundColor = object.groundColor.getHex();

			} else if ( object instanceof THREE.Mesh ) {

				data.geometry = parseGeometry( object.geometry );
				data.material = parseMaterial( object.material );

			} else if ( object instanceof THREE.Line ) {

				data.geometry = parseGeometry( object.geometry );
				data.material = parseMaterial( object.material );

			} else if ( object instanceof THREE.Sprite ) {

				data.material = parseMaterial( object.material );

			}

			data.matrix = object.matrix.toArray();

			if ( object.children.length > 0 ) {

				data.children = [];

				for ( var i = 0; i < object.children.length; i ++ ) {

					data.children.push( parseObject( object.children[ i ] ) );

				}

			}

			return data;

		}

		output.object = parseObject( this );

		return output;

	},
	/**
	 * @desc 克隆Object3D<br />
	 * 如果参数recursive为true,克隆其子对象,否则只克隆当前对象
	 * @param {THREE.Object3D} object
	 * @param {boolean} recursive 为true,克隆其子对象,否则只克隆当前对象 ，默认为true
	 * @returns {THREE.Object3D}
	 */
	clone: function ( object, recursive ) {

		if ( object === undefined ) object = new THREE.Object3D();
		if ( recursive === undefined ) recursive = true;

		object.name = this.name;

		object.up.copy( this.up );

		object.position.copy( this.position );
		object.quaternion.copy( this.quaternion );
		object.scale.copy( this.scale );

		object.renderDepth = this.renderDepth;

		object.rotationAutoUpdate = this.rotationAutoUpdate;

		object.matrix.copy( this.matrix );
		object.matrixWorld.copy( this.matrixWorld );

		object.matrixAutoUpdate = this.matrixAutoUpdate;
		object.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;

		object.visible = this.visible;

		object.castShadow = this.castShadow;
		object.receiveShadow = this.receiveShadow;

		object.frustumCulled = this.frustumCulled;

		object.userData = JSON.parse( JSON.stringify( this.userData ) );

		if ( recursive === true ) {

			for ( var i = 0; i < this.children.length; i ++ ) {

				var child = this.children[ i ];
				object.add( child.clone() );

			}

		}

		return object;

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Object3D.prototype );
/**
 * @memberof THREE
 * @desc 全局3D对象数目
 * @type {number}
 */
THREE.Object3DIdCount = 0;
