/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */
/**
 * @classdesc 蒙皮网格对象
 * @desc 蒙皮网格用于渲染人物。人物动画使用的骨骼，而且每个骨骼影响网格的一部分.
 * @param {THREE.Geometry} geometry 几何对象
 * @param {THREE.Material} material 材质对象
 * @param {boolean} useVertexTexture 是否使用顶点纹理，对象构建后不能修改
 * @constructor
 */
THREE.SkinnedMesh = function ( geometry, material, useVertexTexture ) {

	THREE.Mesh.call( this, geometry, material );

	this.type = 'SkinnedMesh';
	/**
	 * @desc 绑定模式
	 * @default "attached"
	 * @type {string}
	 */
	this.bindMode = "attached";
	/**
	 * @desc 绑定矩阵
	 * @type {THREE.Matrix4}
	 */
	this.bindMatrix = new THREE.Matrix4();
	/**
	 * @desc 绑定矩阵的逆矩阵
	 * @type {THREE.Matrix4}
	 */
	this.bindMatrixInverse = new THREE.Matrix4();

	// init bones
	// 初始化骨骼
	// TODO: remove bone creation as there is no reason (other than
	// convenience) for THREE.SkinnedMesh to do this.
	// 存储骨骼的数组,这个属性在构造函数中设置.
	var bones = [];

	if ( this.geometry && this.geometry.bones !== undefined ) {

		var bone, gbone, p, q, s;

		for ( var b = 0, bl = this.geometry.bones.length; b < bl; ++b ) {

			gbone = this.geometry.bones[ b ];

			p = gbone.pos;
			q = gbone.rotq;
			s = gbone.scl;

			bone = new THREE.Bone( this );
			bones.push( bone );

			bone.name = gbone.name;
			// 位置属性
			bone.position.set( p[ 0 ], p[ 1 ], p[ 2 ] );
			// 四元数旋转属性
			bone.quaternion.set( q[ 0 ], q[ 1 ], q[ 2 ], q[ 3 ] );
			// 缩放属性
			if ( s !== undefined ) {

				bone.scale.set( s[ 0 ], s[ 1 ], s[ 2 ] );

			} else {

				bone.scale.set( 1, 1, 1 );

			}

		}

		for ( var b = 0, bl = this.geometry.bones.length; b < bl; ++b ) {

			gbone = this.geometry.bones[ b ];

			if ( gbone.parent !== - 1 ) {

				bones[ gbone.parent ].add( bones[ b ] );

			} else {

				this.add( bones[ b ] );

			}

		}

	}
	// 构造SkinnedMesh对象时调用normalizeSkinWeights方法
	// 确保skinWeights的各元素是归一化的.
	this.normalizeSkinWeights();
	// 对当前对象及其子对象的matrix属性应用全局位移,旋转,缩放变换
	this.updateMatrixWorld( true );
	// 调用bind方法,绑定骨骼对象.
	this.bind( new THREE.Skeleton( bones, undefined, useVertexTexture ) );

};

/**
 * @desc SkinnedMesh.Mesh的原型继承所有属性方法
 * @type {THREE.Mesh}
 */
THREE.SkinnedMesh.prototype = Object.create( THREE.Mesh.prototype );
/**
 * @desc 将蒙皮网格对象根据绑定矩阵绑定骨架
 * @param {THREE.Skeleton[]} skeleton
 * @param {THREE.Matrix4} bindMatrix
 */
THREE.SkinnedMesh.prototype.bind = function( skeleton, bindMatrix ) {

	this.skeleton = skeleton;

	// 如果没有指定绑定矩阵
	if ( bindMatrix === undefined ) {

		this.updateMatrixWorld( true );
		// 使用蒙皮网格对象的世界坐标矩阵
		bindMatrix = this.matrixWorld;

	}

	this.bindMatrix.copy( bindMatrix );
	this.bindMatrixInverse.getInverse( bindMatrix );

};
/**
 * @desc 重新计算蒙皮网格对象的骨架的计算本地矩阵,位置,旋转缩放属性
 */
THREE.SkinnedMesh.prototype.pose = function () {
	// 调用骨架对象的pose方法
	this.skeleton.pose();

};
/**
 * @desc 归一化蒙皮网格对象的蒙皮权重
 */
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function () {

	if ( this.geometry instanceof THREE.Geometry ) {
		// 遍历蒙皮指数数组.
		for ( var i = 0; i < this.geometry.skinIndices.length; i ++ ) {
			// 蒙皮权重数组
			var sw = this.geometry.skinWeights[ i ];
			// 求和sw的x,y,z分量
			var scale = 1.0 / sw.lengthManhattan();
			// scale不等于正无穷大
			if ( scale !== Infinity ) {
				// sw的每个分量乘以scale
				sw.multiplyScalar( scale );

			} else {
				// sw将被着色器归一化
				sw.set( 1 ); // this will be normalized by the shader anyway

			}

		}

	} else {

		// skinning weights assumed to be normalized for THREE.BufferGeometry
		// 蒙皮权重确保是归一化的 ,供THREE.BufferGeometry使用
	}

};
/**
 * @desc 方法对当前对象及其子对象的matrix属性应用全局位移,旋转,缩放变换
 * @param {boolean} force 是否强制将子对象做同样的全局变换
 */
THREE.SkinnedMesh.prototype.updateMatrixWorld = function( force ) {

	THREE.Mesh.prototype.updateMatrixWorld.call( this, true );

	if ( this.bindMode === "attached" ) {

		this.bindMatrixInverse.getInverse( this.matrixWorld );

	} else if ( this.bindMode === "detached" ) {

		this.bindMatrixInverse.getInverse( this.bindMatrix );

	} else {

		console.warn( 'THREE.SkinnedMesh unreckognized bindMode: ' + this.bindMode );

	}

};
/**
 * @desc Three.SkinnedMesh 克隆函数
 * @param {THREE.SkinnedMesh} object
 * @returns {THREE.SkinnedMesh}
 */
THREE.SkinnedMesh.prototype.clone = function( object ) {

	if ( object === undefined ) {

		object = new THREE.SkinnedMesh( this.geometry, this.material, this.useVertexTexture );

	}

	THREE.Mesh.prototype.clone.call( this, object );

	return object;

};

