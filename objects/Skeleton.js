/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author michael guerrero / http://realitymeltdown.com
 * @author ikerr / http://verold.com
 */
/**
 * @classdesc 骨架对象<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @desc 是骨骼对象的几何,是蒙皮对象的一部分<br />
 * 用来制作支持骨骼动画,当前有两种模型动画的方式：<br />
 * 顶点动画和骨骼动画。顶点动画中，每帧动画其实就是模型特定姿态的一个“快照”。<br />
 * 通过在帧之间插值的方法，
 * @param {THREE.Bone[]} bones 骨骼对象数组
 * @param {THREE.Matrix4[]} boneInverses 骨骼对象逆矩阵
 * @param {boolean} useVertexTexture 是否适应顶点纹理，该属性之后不可以设置
 * @constructor
 */
THREE.Skeleton = function ( bones, boneInverses, useVertexTexture ) {
	/**
	 * @desc 是否使用顶点纹理
	 * @default true
	 * @type {boolean}
	 */
	this.useVertexTexture = useVertexTexture !== undefined ? useVertexTexture : true;
	/**
	 * @desc 单位矩阵
	 * @type {THREE.Matrix4}
	 */
	this.identityMatrix = new THREE.Matrix4();

	// copy the bone array
	// 拷贝骨骼数组
	bones = bones || [];
	/**
	 * @desc 骨骼数组
	 * @type {Array.<THREE.Bone>}
	 */
	this.bones = bones.slice( 0 );

	// create a bone texture or an array of floats
	// 创建骨架纹理或者骨架纹理数组
	if ( this.useVertexTexture ) {

		// layout (1 matrix = 4 pixels)
		//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
		//  with  8x8  pixel texture max   16 bones  (8 * 8  / 4)
		//       16x16 pixel texture max   64 bones (16 * 16 / 4)
		//       32x32 pixel texture max  256 bones (32 * 32 / 4)
		//       64x64 pixel texture max 1024 bones (64 * 64 / 4)

		var size;

		if ( this.bones.length > 256 )
			size = 64;
		else if ( this.bones.length > 64 )
			size = 32;
		else if ( this.bones.length > 16 )
			size = 16;
		else
			size = 8;
		/**
		 * @desc 骨骼纹理宽度
		 * @memberof THREE.Skeleton
		 */
		this.boneTextureWidth = size;
		/**
		 * @desc 骨骼纹理高度
		 * @memberof THREE.Skeleton
		 */
		this.boneTextureHeight = size;
		/**
		 * @desc 骨骼矩阵
		 * @memberof THREE.Skeleton
		 * @type {Float32Array}
		 */
		this.boneMatrices = new Float32Array( this.boneTextureWidth * this.boneTextureHeight * 4 ); // 4 floats per RGBA pixel
		/**
		 * @desc 骨骼纹理
		 * @memberof THREE.Skeleton
		 * @type {THREE.DataTexture}
		 */
		this.boneTexture = new THREE.DataTexture( this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType );
		/**
		 * @desc 骨骼纹理缩小插值方式
		 * @memberof THREE.Skeleton
		 * @type {number}
		 */
		this.boneTexture.minFilter = THREE.NearestFilter;
		/**
		 * @desc 骨骼纹理放大插值方式
		 * @memberof THREE.Skeleton
		 * @type {number}
		 */
		this.boneTexture.magFilter = THREE.NearestFilter;
		/**
		 * @desc 骨骼纹理是否生成Mipmap
		 * @memberof THREE.Skeleton
		 * @type {boolean}
		 */
		this.boneTexture.generateMipmaps = false;
		/**
		 * @desc 骨骼纹理是否Y反转
		 * @memberof THREE.Skeleton
		 * @type {boolean}
		 */
		this.boneTexture.flipY = false;

	} else {
		// 不使用顶点纹理
		this.boneMatrices = new Float32Array( 16 * this.bones.length );

	}

	// use the supplied bone inverses or calculate the inverses
	// 使用提供的骨架位置逆矩阵或计算骨架位置逆矩阵
	if ( boneInverses === undefined ) {
		// 如果没有提供骨架位置逆矩阵
		// 计算骨架位置逆矩阵
		this.calculateInverses();

	} else {
		// 如果提供了逆矩阵,并和骨骼数量相等
		if ( this.bones.length === boneInverses.length ) {
			// 复制骨架的逆矩阵
			this.boneInverses = boneInverses.slice( 0 );

		} else {
			// 如果提供的骨骼逆矩阵和骨骼数量不一致
			// 提示用户骨骼的逆矩阵和骨骼数量不一致
			console.warn( 'THREE.Skeleton bonInverses is the wrong length.' );
			// 清空骨骼逆矩阵
			this.boneInverses = [];
			// 并将骨骼逆矩阵和骨骼数量保持不一致
			for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

				this.boneInverses.push( new THREE.Matrix4() );

			}

		}

	}

};
/**
 * @desc 方法重新计算骨骼的逆矩阵
 */
THREE.Skeleton.prototype.calculateInverses = function () {

	this.boneInverses = [];

	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		var inverse = new THREE.Matrix4();

		if ( this.bones[ b ] ) {
			// 获得当前骨骼的位置属性的逆矩阵
			inverse.getInverse( this.bones[ b ].matrixWorld );

		}
		// 返回包含骨骼逆矩阵的Skeleton骨架对象
		this.boneInverses.push( inverse );

	}

};
/**
 * @desc 重新计算骨骼的计算本地矩阵,位置,旋转缩放属性
 */
THREE.Skeleton.prototype.pose = function () {

	var bone;

	// recover the bind-time world matrices
	// 恢复在绑定时的世界坐标矩阵
	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		bone = this.bones[ b ];

		if ( bone ) {
			// 恢复在绑定时的世界坐标矩阵
			bone.matrixWorld.getInverse( this.boneInverses[ b ] );

		}

	}

	// compute the local matrices, positions, rotations and scales
	// 计算本地矩阵,位置,旋转缩放属性
	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		bone = this.bones[ b ];

		if ( bone ) {
			// 如果骨骼有父级对象
			if ( bone.parent ) {
				// 求逆父级对象的世界坐标矩阵
				bone.matrix.getInverse( bone.parent.matrixWorld );
				// 将当前骨骼的矩阵与父级对象的世界坐标矩阵相乘
				bone.matrix.multiply( bone.matrixWorld );

			} else {
				// 复制自身的世界坐标矩阵
				bone.matrix.copy( bone.matrixWorld );

			}
			// 调用decompose()方法,重新设置骨骼对象的位置,旋转缩放属性.
			bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

		}

	}

};
/**
 * @function
 * @desc 法更新当前骨架的缓冲区数据,并更新纹理标识设置为true
 */
THREE.Skeleton.prototype.update = ( function () {

	var offsetMatrix = new THREE.Matrix4();
	
	return function () {

		// flatten bone matrices to array
		// 展开骨骼矩阵到数组
		for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

			// compute the offset between the current and the original transform
			// 计算当前位置到原始位置的偏移距离
			var matrix = this.bones[ b ] ? this.bones[ b ].matrixWorld : this.identityMatrix;

			offsetMatrix.multiplyMatrices( matrix, this.boneInverses[ b ] );
			// 调用flattenToArrayOffset方法,通过参数offset(b * 16)指定偏移量,将矩阵展开到数组(参数array)中,返回新的数组.
			offsetMatrix.flattenToArrayOffset( this.boneMatrices, b * 16 );

		}
		// 如果使用顶点纹理
		if ( this.useVertexTexture ) {
			// 将更新标识设置为true.
			this.boneTexture.needsUpdate = true;

		}
		
	};

} )();

