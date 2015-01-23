/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 另一种几何体对象基类<br />
 * @desc 将所有的数据包括顶点位置,法线,面,颜色,uv和其它的自定义属性存在缓冲区<br />
 * 这样可以减少GPU的负荷,BufferGeometry同样也比Geometry对象复杂,增加了使用的难度,这里的属性都是存放在数组中<br />
 * 比如顶点位置不是Vector3对象,颜色也不是color对象,而是数组.需要访问这些属性,需要从属性缓冲区中读原始数据<br />
 * 根据BufferGeometry类特性,我们在创建一些静态对象,实例化后不经常操作的对象时,选择这个类
 * @constructor
 * @example var geometry = new THREE.BufferGeometry();<br />
 * var vertexPositions = [ [-1.0, -1.0, 1.0],<br />
 * 		[ 1.0, -1.0, 1.0],<br />
 * 		[ 1.0, 1.0, 1.0],<br />
 * 		[ 1.0, 1.0, 1.0],<br />
 * 		[-1.0, 1.0, 1.0],<br />
 * 		[-1.0, -1.0, 1.0] ];<br />
 * 	var vertices = new Float32Array( vertexPositions.length * 3 );<br />
 * 	for ( var i = 0; i < vertexPositions.length; i++ ) {  <br />
 * 	               vertices[ i*3 + 0 ] = vertexPositions[i][0];  <br />
 * 	               vertices[ i*3 + 1 ] = vertexPositions[i][1];  <br />
 * 	               vertices[ i*3 + 2 ] = vertexPositions[i][2];  <br />
 * 	           }<br />
 * 	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );<br />
 * 	var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );<br />
 * 	var mesh = new THREE.Mesh( geometry, material );<br />
 */
THREE.BufferGeometry = function () {

	Object.defineProperty( this, 'id', { value: THREE.GeometryIdCount ++ } );
	/**
	 * @desc BufferGeometry对象的UUID
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
	 * @default 'BufferGeometry'
	 * @type {string}
	 */
	this.type = 'BufferGeometry';
	/**
	 * @desc 对象属性列表
	 * @default {}
	 * @type {THREE.BufferAttribute[]}
	 */
	this.attributes = {};
	/**
	 * @desc 对象key列表
	 * @default []
	 * @type {String[]}
	 */
	this.attributesKeys = [];
	/**
	 * @desc WebGL分区块绘制,存放区块的数组
	 * @type {Array}
	 */
	this.drawcalls = [];
	/**
	 * @desc WebGL分区块绘制,存放区块的数组
	 * @ignore
	 * @type {Array}
	 */
	this.offsets = this.drawcalls; // backwards compatibility
	/**
	 * @desc 立方体界限,根据当前几何体生成的立方体界
	 * @type {null}
	 */
	this.boundingBox = null;
	/**
	 * @desc 球体界限,根据当前几何体生成的球体界
	 * @type {null}
	 */
	this.boundingSphere = null;

};

THREE.BufferGeometry.prototype = {

	constructor: THREE.BufferGeometry,
	/**
	 * @desc 根据属性名称给BufferGeometry添加属性信息
	 * @param {String} name 属性名称
	 * @param {THREE.BufferAttribute} attribute 属性对象
	 */
	addAttribute: function ( name, attribute ) {

		if ( attribute instanceof THREE.BufferAttribute === false ) {

			console.warn( 'THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

			this.attributes[ name ] = { array: arguments[ 1 ], itemSize: arguments[ 2 ] };

			return;

		}

		this.attributes[ name ] = attribute;
		this.attributesKeys = Object.keys( this.attributes );

	},
	/**
	 * @desc 根据属性名(参数name)返回BufferGeometry对象的属性信息
	 * @param {String} name 属性名称
	 * @returns {THREE.BufferAttribute}
	 */
	getAttribute: function ( name ) {

		return this.attributes[ name ];

	},
	/**
	 * @desc 向drawcalls添加信息<br />
	 * 使用三角面构建的BufferGeometry对象.拆分成多个部分多次调用WebGL绘制<br />
	 * 每次调用WebGL绘制将使用当前几何体的顶点数组的子集来配置着色器<br />
	 * 这种做法非常有意义,比如你的几何体对象有65535个以上的顶点<br />
	 * WebGL将一次绘制调用的最大顶点限制为65535个<br />
	 * 如果将对象拆分成几部分,就不会出问题了.<br />
	 * 被拆分的每部分生成这样一种结构组成的数组:<br />
	 * { start: Integer, count: Integer, index: Integer }
	 * @param {number} start 重新指定在绘制调用第一个顶点索引
	 * @param {number} count 指定多少个顶点都包括在内
	 * @param {number} indexOffset 指定一个可选的偏移
	 */
	addDrawCall: function ( start, count, indexOffset ) {

		this.drawcalls.push( {

			start: start,
			count: count,
			index: indexOffset !== undefined ? indexOffset : 0

		} );

	},
	/**
	 * @desc 对BufferGeometry对象的vertices顶点应用矩阵变换.达到旋转,缩放,移动的目的
	 * @param {THREE.Matix4} matrix
	 */
	applyMatrix: function ( matrix ) {

		var position = this.attributes.position;

		if ( position !== undefined ) {

			matrix.applyToVector3Array( position.array );
			position.needsUpdate = true;

		}

		var normal = this.attributes.normal;

		if ( normal !== undefined ) {

			var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

			normalMatrix.applyToVector3Array( normal.array );
			normal.needsUpdate = true;

		}

	},

	/**
	 * @desc 求中心点
	 */
	center: function () {

		// TODO

	},

	/**
	 * @desc 将Geometry对象转换为BufferGeometry对象
	 * @param {THREE.Geometry} geometry
	 * @param {*} settings { 'vertexColors': THREE.NoColors || THREE.FaceColors || THREE.VertexColors}">可选参数,用来设置转换后的对象顶点从哪里继承颜色
	 * @returns {THREE.BufferGeometry}
	 */
	fromGeometry: function ( geometry, settings ) {

		settings = settings || { 'vertexColors': THREE.NoColors };

		var vertices = geometry.vertices;
		var faces = geometry.faces;
		var faceVertexUvs = geometry.faceVertexUvs;
		var vertexColors = settings.vertexColors;
		var hasFaceVertexUv = faceVertexUvs[ 0 ].length > 0;
		var hasFaceVertexNormals = faces[ 0 ].vertexNormals.length == 3;

		var positions = new Float32Array( faces.length * 3 * 3 );
		this.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

		var normals = new Float32Array( faces.length * 3 * 3 );
		this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

		// 如果没有设置settings参数
		if ( vertexColors !== THREE.NoColors ) {

			// 将Geometry对象的三角面的所有顶点颜色一一转换为BufferGeometry对象的属性格式
			var colors = new Float32Array( faces.length * 3 * 3 );
			this.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

		}

		if ( hasFaceVertexUv === true ) {

			var uvs = new Float32Array( faces.length * 3 * 2 );
			this.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

		}
		// 遍历Geometry对象的三角面数组
		for ( var i = 0, i2 = 0, i3 = 0; i < faces.length; i ++, i2 += 6, i3 += 9 ) {

			var face = faces[ i ];

			var a = vertices[ face.a ];
			var b = vertices[ face.b ];
			var c = vertices[ face.c ];

			//将位置信息转换
			positions[ i3     ] = a.x;
			positions[ i3 + 1 ] = a.y;
			positions[ i3 + 2 ] = a.z;

			positions[ i3 + 3 ] = b.x;
			positions[ i3 + 4 ] = b.y;
			positions[ i3 + 5 ] = b.z;

			positions[ i3 + 6 ] = c.x;
			positions[ i3 + 7 ] = c.y;
			positions[ i3 + 8 ] = c.z;

			if ( hasFaceVertexNormals === true ) {
				// 将顶点法线转换
				var na = face.vertexNormals[ 0 ];
				var nb = face.vertexNormals[ 1 ];
				var nc = face.vertexNormals[ 2 ];

				normals[ i3     ] = na.x;
				normals[ i3 + 1 ] = na.y;
				normals[ i3 + 2 ] = na.z;

				normals[ i3 + 3 ] = nb.x;
				normals[ i3 + 4 ] = nb.y;
				normals[ i3 + 5 ] = nb.z;

				normals[ i3 + 6 ] = nc.x;
				normals[ i3 + 7 ] = nc.y;
				normals[ i3 + 8 ] = nc.z;

			} else {

				// 将三角面法线转换
				var n = face.normal;

				normals[ i3     ] = n.x;
				normals[ i3 + 1 ] = n.y;
				normals[ i3 + 2 ] = n.z;

				normals[ i3 + 3 ] = n.x;
				normals[ i3 + 4 ] = n.y;
				normals[ i3 + 5 ] = n.z;

				normals[ i3 + 6 ] = n.x;
				normals[ i3 + 7 ] = n.y;
				normals[ i3 + 8 ] = n.z;

			}

			if ( vertexColors === THREE.FaceColors ) {

				// 将面颜色转换
				var fc = face.color;

				colors[ i3     ] = fc.r;
				colors[ i3 + 1 ] = fc.g;
				colors[ i3 + 2 ] = fc.b;

				colors[ i3 + 3 ] = fc.r;
				colors[ i3 + 4 ] = fc.g;
				colors[ i3 + 5 ] = fc.b;

				colors[ i3 + 6 ] = fc.r;
				colors[ i3 + 7 ] = fc.g;
				colors[ i3 + 8 ] = fc.b;

			} else if ( vertexColors === THREE.VertexColors ) {

				// 将顶点颜色转换
				var vca = face.vertexColors[ 0 ];
				var vcb = face.vertexColors[ 1 ];
				var vcc = face.vertexColors[ 2 ];

				colors[ i3     ] = vca.r;
				colors[ i3 + 1 ] = vca.g;
				colors[ i3 + 2 ] = vca.b;

				colors[ i3 + 3 ] = vcb.r;
				colors[ i3 + 4 ] = vcb.g;
				colors[ i3 + 5 ] = vcb.b;

				colors[ i3 + 6 ] = vcc.r;
				colors[ i3 + 7 ] = vcc.g;
				colors[ i3 + 8 ] = vcc.b;

			}

			if ( hasFaceVertexUv === true ) {

				// 将顶点uv转换
				var uva = faceVertexUvs[ 0 ][ i ][ 0 ];
				var uvb = faceVertexUvs[ 0 ][ i ][ 1 ];
				var uvc = faceVertexUvs[ 0 ][ i ][ 2 ];

				uvs[ i2     ] = uva.x;
				uvs[ i2 + 1 ] = uva.y;

				uvs[ i2 + 2 ] = uvb.x;
				uvs[ i2 + 3 ] = uvb.y;

				uvs[ i2 + 4 ] = uvc.x;
				uvs[ i2 + 5 ] = uvc.y;

			}

		}

		// 重新计算当前对象的球体界限
		this.computeBoundingSphere()

		return this;

	},
	/**
	 * @desc 重新计算当前几何体对象的立方体界限,并更新this.boundingBox属性
	 */
	computeBoundingBox: function () {

		var vector = new THREE.Vector3();

		return function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new THREE.Box3();

			}

			var positions = this.attributes.position.array;

			if ( positions ) {

				var bb = this.boundingBox;
				bb.makeEmpty();

				// 获得当前位置属性数组中的x,y,z坐标的最大最小值,得到立方体界限
				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					bb.expandByPoint( vector );

				}

			}

			if ( positions === undefined || positions.length === 0 ) {

				this.boundingBox.min.set( 0, 0, 0 );
				this.boundingBox.max.set( 0, 0, 0 );

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				// 如果position数组没有值,提示用户.
				console.error( 'THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.' );

			}

		}

	}(),

	/**
	 * @desc 重新计算当前几何体对象的球体界限,并更新this.boundingSphere[]属性
	 */
	computeBoundingSphere: function () {

		var box = new THREE.Box3();
		var vector = new THREE.Vector3();

		return function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new THREE.Sphere();

			}

			var positions = this.attributes.position.array;

			if ( positions ) {

				box.makeEmpty();

				var center = this.boundingSphere.center;

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					box.expandByPoint( vector );

				}

				box.center( center );

				// hoping to find a boundingSphere with a radius smaller than the
				// boundingSphere of the boundingBox:  sqrt(3) smaller in the best case

				var maxRadiusSq = 0;

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

				}

				//计算当前几何体对象的球体界限并更新this.boundingSphere[]属性.
				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.' );

				}

			}

		}

	}(),

	/**
	 * @ignore
	 */
	computeFaceNormals: function () {

		// backwards compatibility

	},

	/**
	 * @desc 重新计算BufferGeometry对象的三角面对象顶点的法线向量,face数组中每个元素的vertexNormal属性
	 */
	computeVertexNormals: function () {

		var attributes = this.attributes;

		if ( attributes.position ) {

			var positions = attributes.position.array;

			if ( attributes.normal === undefined ) {

				this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( positions.length ), 3 ) );

			} else {

				// reset existing normals to zero
				// 将现有的法线向量重置为0
				var normals = attributes.normal.array;

				for ( var i = 0, il = normals.length; i < il; i ++ ) {

					normals[ i ] = 0;

				}

			}

			var normals = attributes.normal.array;

			var vA, vB, vC,

			pA = new THREE.Vector3(),
			pB = new THREE.Vector3(),
			pC = new THREE.Vector3(),

			cb = new THREE.Vector3(),
			ab = new THREE.Vector3();

			// indexed elements
			// 元素索引
			if ( attributes.index ) {

				var indices = attributes.index.array;

				var offsets = ( this.offsets.length > 0 ? this.offsets : [ { start: 0, count: indices.length, index: 0 } ] );

				for ( var j = 0, jl = offsets.length; j < jl; ++ j ) {

					var start = offsets[ j ].start;
					var count = offsets[ j ].count;
					var index = offsets[ j ].index;

					for ( var i = start, il = start + count; i < il; i += 3 ) {

						vA = ( index + indices[ i     ] ) * 3;
						vB = ( index + indices[ i + 1 ] ) * 3;
						vC = ( index + indices[ i + 2 ] ) * 3;

						pA.fromArray( positions, vA );
						pB.fromArray( positions, vB );
						pC.fromArray( positions, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ vA     ] += cb.x;
						normals[ vA + 1 ] += cb.y;
						normals[ vA + 2 ] += cb.z;

						normals[ vB     ] += cb.x;
						normals[ vB + 1 ] += cb.y;
						normals[ vB + 2 ] += cb.z;

						normals[ vC     ] += cb.x;
						normals[ vC + 1 ] += cb.y;
						normals[ vC + 2 ] += cb.z;

					}

				}

			} else {

				// non-indexed elements (unconnected triangle soup)
				// 没有索引的元素,说明不是三角面对象.
				for ( var i = 0, il = positions.length; i < il; i += 9 ) {

					pA.fromArray( positions, i );
					pB.fromArray( positions, i + 3 );
					pC.fromArray( positions, i + 6 );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					normals[ i     ] = cb.x;
					normals[ i + 1 ] = cb.y;
					normals[ i + 2 ] = cb.z;

					normals[ i + 3 ] = cb.x;
					normals[ i + 4 ] = cb.y;
					normals[ i + 5 ] = cb.z;

					normals[ i + 6 ] = cb.x;
					normals[ i + 7 ] = cb.y;
					normals[ i + 8 ] = cb.z;

				}

			}

			// 获得当前定点的规范化法线向量
			this.normalizeNormals();

			// 设置this.normalsNeedUpdate属性为true
			attributes.normal.needsUpdate = true;

		}

	},

	/**
	 * @desc 重新计算BufferGeometry对象三角面对象顶点的切线空间<br />
	 * TBN切线是一个有方向的单位长度，沿着网格表面指向水平（U）纹理方向<br />
	 * 在Three.js中切线被描述为Vector4，包括x,y,z这些组件定义的矢量,及w用来翻转副法线
	 */
	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)

		if ( this.attributes.index === undefined ||
			 this.attributes.position === undefined ||
			 this.attributes.normal === undefined ||
			 this.attributes.uv === undefined ) {

			console.warn( 'Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()' );
			return;

		}

		// 将数组中的元素转换成顶点,法线向量,uv等对象
		var indices = this.attributes.index.array;
		var positions = this.attributes.position.array;
		var normals = this.attributes.normal.array;
		var uvs = this.attributes.uv.array;

		var nVertices = positions.length / 3;

		if ( this.attributes.tangent === undefined ) {

			this.addAttribute( 'tangent', new THREE.BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

		}

		var tangents = this.attributes.tangent.array;

		var tan1 = [], tan2 = [];

		for ( var k = 0; k < nVertices; k ++ ) {

			tan1[ k ] = new THREE.Vector3();
			tan2[ k ] = new THREE.Vector3();

		}

		var vA = new THREE.Vector3(),
			vB = new THREE.Vector3(),
			vC = new THREE.Vector3(),

			uvA = new THREE.Vector2(),
			uvB = new THREE.Vector2(),
			uvC = new THREE.Vector2(),

			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r;

		var sdir = new THREE.Vector3(), tdir = new THREE.Vector3();

		/**
		 * @desc 重新计算三角面对象的切线空间的TB,TBN
		 * @param {number} a 索引a
		 * @param {number} b 索引b
		 * @param {number} c 索引c
		 */
		function handleTriangle( a, b, c ) {

			vA.fromArray( positions, a * 3 );
			vB.fromArray( positions, b * 3 );
			vC.fromArray( positions, c * 3 );

			uvA.fromArray( uvs, a * 2 );
			uvB.fromArray( uvs, b * 2 );
			uvC.fromArray( uvs, c * 2 );

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;

			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;

			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.x - uvA.x;
			s2 = uvC.x - uvA.x;

			t1 = uvB.y - uvA.y;
			t2 = uvC.y - uvA.y;

			r = 1.0 / ( s1 * t2 - s2 * t1 );

			sdir.set(
				( t2 * x1 - t1 * x2 ) * r,
				( t2 * y1 - t1 * y2 ) * r,
				( t2 * z1 - t1 * z2 ) * r
			);

			tdir.set(
				( s1 * x2 - s2 * x1 ) * r,
				( s1 * y2 - s2 * y1 ) * r,
				( s1 * z2 - s2 * z1 ) * r
			);

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		var i, il;
		var j, jl;
		var iA, iB, iC;

		if ( this.drawcalls.length === 0 ) {

			this.addDrawCall( 0, indices.length, 0 );

		}

		var drawcalls = this.drawcalls;

		for ( j = 0, jl = drawcalls.length; j < jl; ++ j ) {

			var start = drawcalls[ j ].start;
			var count = drawcalls[ j ].count;
			var index = drawcalls[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleTriangle( iA, iB, iC );

			}

		}

		var tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
		var n = new THREE.Vector3(), n2 = new THREE.Vector3();
		var w, t, test;

		/**
		 * @desc 重新计算几何体对象顶点的切线空间的TB,TBN
		 * @param {number} v 顶点索引
		 */
		function handleVertex( v ) {

			n.fromArray( normals, v * 3 );
			n2.copy( n );

			t = tan1[ v ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.crossVectors( n2, t );
			test = tmp2.dot( tan2[ v ] );
			w = ( test < 0.0 ) ? - 1.0 : 1.0;

			tangents[ v * 4     ] = tmp.x;
			tangents[ v * 4 + 1 ] = tmp.y;
			tangents[ v * 4 + 2 ] = tmp.z;
			tangents[ v * 4 + 3 ] = w;

		}

		// 遍历顶点数组
		for ( j = 0, jl = drawcalls.length; j < jl; ++ j ) {

			var start = drawcalls[ j ].start;
			var count = drawcalls[ j ].count;
			var index = drawcalls[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleVertex( iA );
				handleVertex( iB );
				handleVertex( iC );

			}

		}

	},

	/*
		computeOffsets
		Compute the draw offset for large models by chunking the index buffer into chunks of 65k addressable vertices.
		This method will effectively rewrite the index buffer and remap all attributes to match the new indices.
		WARNING: This method will also expand the vertex count to prevent sprawled triangles across draw offsets.
		indexBufferSize - Defaults to 65535, but allows for larger or smaller chunks.
	*/
	/*
	 	计算偏移量
	 	当遇到比较大的几何体对象,根据对象的索引值将对象拆分成默认尺寸为65535的块,供WebGL绘制图形使用,
	 	这个方法非常对拆分模型非常的有用.
	 	注意: 这个方法还可以通过更改indexBufferSize的值,防止不完整的三角面,
	 	indexBufferSize 属性默认大小事65535,但可以更大或更小.
	 */
	/**
	 * @desc 将较大的几何体对象的顶点数限制在indexBufferSize所设置的大小,默认为65535
	 * @param {number} indexBufferSize 索引限制值
	 * @returns {*}
	 */
	computeOffsets: function ( indexBufferSize ) {

		var size = indexBufferSize;
		if ( indexBufferSize === undefined )
			size = 65535; //WebGL limits type of index buffer values to 16-bit.
							//将WebGL绘制界限限定在16位大小
		var s = Date.now();

		var indices = this.attributes.index.array;
		var vertices = this.attributes.position.array;

		var verticesCount = ( vertices.length / 3 );
		var facesCount = ( indices.length / 3 );

		/*
		console.log("Computing buffers in offsets of "+size+" -> indices:"+indices.length+" vertices:"+vertices.length);
		console.log("Faces to process: "+(indices.length/3));
		console.log("Reordering "+verticesCount+" vertices.");
		*/

		var sortedIndices = new Uint16Array( indices.length ); //16-bit buffers
		var indexPtr = 0;
		var vertexPtr = 0;

		var offsets = [ { start:0, count:0, index:0 } ];
		var offset = offsets[ 0 ];

		var duplicatedVertices = 0;
		var newVerticeMaps = 0;
		var faceVertices = new Int32Array( 6 );
		var vertexMap = new Int32Array( vertices.length );
		var revVertexMap = new Int32Array( vertices.length );
		for ( var j = 0; j < vertices.length; j ++ ) { vertexMap[ j ] = - 1; revVertexMap[ j ] = - 1; }

		/*
			Traverse every face and reorder vertices in the proper offsets of 65k.
			We can have more than 65k entries in the index buffer per offset, but only reference 65k values.
		 	遍历所有三角面的顶点,将顶点以65k作为界限划分.
		 	我们可以讲缓冲区块划分出比65535更多的顶点数,但是推荐65535
		*/
		for ( var findex = 0; findex < facesCount; findex ++ ) {
			newVerticeMaps = 0;

			for ( var vo = 0; vo < 3; vo ++ ) {
				var vid = indices[ findex * 3 + vo ];
				if ( vertexMap[ vid ] == - 1 ) {
					//Unmapped vertice
					// 没有映射的顶点
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = - 1;
					newVerticeMaps ++;
				} else if ( vertexMap[ vid ] < offset.index ) {
					//Reused vertices from previous block (duplicate)
					// 复用之前区块的顶点
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = - 1;
					duplicatedVertices ++;
				} else {
					//Reused vertice in the current block
					// 在当前的区块儿内复用顶点
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = vertexMap[ vid ];
				}
			}

			var faceMax = vertexPtr + newVerticeMaps;
			if ( faceMax > ( offset.index + size ) ) {
				var new_offset = { start:indexPtr, count:0, index:vertexPtr };
				offsets.push( new_offset );
				offset = new_offset;

				//Re-evaluate reused vertices in light of new offset.
				// 重新评估复用新区块的顶点
				for ( var v = 0; v < 6; v += 2 ) {
					var new_vid = faceVertices[ v + 1 ];
					if ( new_vid > - 1 && new_vid < offset.index )
						faceVertices[ v + 1 ] = - 1;
				}
			}

			//Reindex the face.
			// 重新索引三角面
			for ( var v = 0; v < 6; v += 2 ) {
				var vid = faceVertices[ v ];
				var new_vid = faceVertices[ v + 1 ];

				if ( new_vid === - 1 )
					new_vid = vertexPtr ++;

				vertexMap[ vid ] = new_vid;
				revVertexMap[ new_vid ] = vid;
				sortedIndices[ indexPtr ++ ] = new_vid - offset.index; //XXX overflows at 16bit
				offset.count ++;
			}
		}

		/* Move all attribute values to map to the new computed indices , also expand the vertice stack to match our new vertexPtr. */
		// 将新计算的索引映射到所有属性值,并且扩展顶点堆栈匹配新的vertexPtr
		this.reorderBuffers( sortedIndices, revVertexMap, vertexPtr );
		// 重新设置this.offsets属性
		this.offsets = offsets;

		/*
		var orderTime = Date.now();
		console.log("Reorder time: "+(orderTime-s)+"ms");
		console.log("Duplicated "+duplicatedVertices+" vertices.");
		console.log("Compute Buffers time: "+(Date.now()-s)+"ms");
		console.log("Draw offsets: "+offsets.length);
		*/

		return offsets;
	},

	/**
	 * @ignore
	 */
	merge: function () {

		console.log( 'BufferGeometry.merge(): TODO' );

	},

	/**
	 * @desc 单位化所有法线
	 */
	normalizeNormals: function () {

		var normals = this.attributes.normal.array;

		var x, y, z, n;

		for ( var i = 0, il = normals.length; i < il; i += 3 ) {

			x = normals[ i ];
			y = normals[ i + 1 ];
			z = normals[ i + 2 ];

			n = 1.0 / Math.sqrt( x * x + y * y + z * z );

			normals[ i     ] *= n;
			normals[ i + 1 ] *= n;
			normals[ i + 2 ] *= n;

		}

	},

	/*
		reoderBuffers:
		Reorder attributes based on a new indexBuffer and indexMap.
		indexBuffer - Uint16Array of the new ordered indices.
		indexMap - Int32Array where the position is the new vertex ID and the value the old vertex ID for each vertex.
		vertexCount - Amount of total vertices considered in this reordering (in case you want to grow the vertice stack).
	*/
	/**
	 * @desc 方法根参数indexBuffer和参数indexMap重新排列缓冲区中的BufferGeometry对象的属性数组
	 * @param {THREE.Uint16Array} indexBuffer 新顺序的索引
	 * @param {THREE.Int32Array} indexMap 每个顶点id和新位置和值的映射表
	 * @param {Number} vertexCount 顶点数目
	 */
	reorderBuffers: function ( indexBuffer, indexMap, vertexCount ) {

		/* Create a copy of all attributes for reordering. */
		// 创建一个所有属性的副本用来重新排序
		var sortedAttributes = {};
		for ( var attr in this.attributes ) {
			if ( attr == 'index' )
				continue;
			var sourceArray = this.attributes[ attr ].array;
			sortedAttributes[ attr ] = new sourceArray.constructor( this.attributes[ attr ].itemSize * vertexCount );
		}

		/* Move attribute positions based on the new index map */
		// 根据新的索引表移动属性位置.
		for ( var new_vid = 0; new_vid < vertexCount; new_vid ++ ) {
			var vid = indexMap[ new_vid ];
			for ( var attr in this.attributes ) {
				if ( attr == 'index' )
					continue;
				var attrArray = this.attributes[ attr ].array;
				var attrSize = this.attributes[ attr ].itemSize;
				var sortedAttr = sortedAttributes[ attr ];
				for ( var k = 0; k < attrSize; k ++ )
					sortedAttr[ new_vid * attrSize + k ] = attrArray[ vid * attrSize + k ];
			}
		}

		/* Carry the new sorted buffers locally */
		// 更新存储在本地缓冲区中的属性
		this.attributes[ 'index' ].array = indexBuffer;
		for ( var attr in this.attributes ) {
			if ( attr == 'index' )
				continue;
			this.attributes[ attr ].array = sortedAttributes[ attr ];
			this.attributes[ attr ].numItems = this.attributes[ attr ].itemSize * vertexCount;
		}
	},

	/**
	 * @desc 将BufferGeometry对象转换成json格式
	 * @returns {*}
	 */
	toJSON: function () {

		// 标识信息
		var output = {
			metadata: {
				version: 4.0,
				type: 'BufferGeometry',
				generator: 'BufferGeometryExporter'
			},
			uuid: this.uuid,
			type: this.type,
			data: {
				attributes: {}
			}
		};

		// 属性表
		var attributes = this.attributes;
		// 偏移表
		var offsets = this.offsets;
		// 球体包围盒
		var boundingSphere = this.boundingSphere;

		for ( var key in attributes ) {

			var attribute = attributes[ key ];

			var array = [], typeArray = attribute.array;

			for ( var i = 0, l = typeArray.length; i < l; i ++ ) {

				array[ i ] = typeArray[ i ];

			}

			output.data.attributes[ key ] = {
				itemSize: attribute.itemSize,
				type: attribute.array.constructor.name,
				array: array
			}

		}

		if ( offsets.length > 0 ) {

			output.data.offsets = JSON.parse( JSON.stringify( offsets ) );

		}

		if ( boundingSphere !== null ) {

			output.data.boundingSphere = {
				center: boundingSphere.center.toArray(),
				radius: boundingSphere.radius
			}

		}

		return output;

	},

	/**
	 * @desc 克隆BufferGeometry对象
	 * @returns {THREE.BufferGeometry}
	 */
	clone: function () {

		var geometry = new THREE.BufferGeometry();

		for ( var attr in this.attributes ) {

			var sourceAttr = this.attributes[ attr ];
			geometry.addAttribute( attr, sourceAttr.clone() );

		}

		for ( var i = 0, il = this.offsets.length; i < il; i ++ ) {

			var offset = this.offsets[ i ];

			geometry.offsets.push( {

				start: offset.start,
				index: offset.index,
				count: offset.count

			} );

		}

		return geometry;

	},
	/**
	 * @desc 从内存中删除对象,释放资源<br />
	 * 当删除几何体对象,不要忘记调用这个方法,否则会导致内存泄露
	 */
	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

/**
 * @desc EventDispatcher方法应用到当前Geometry对象.
 */
THREE.EventDispatcher.prototype.apply( THREE.BufferGeometry.prototype );
