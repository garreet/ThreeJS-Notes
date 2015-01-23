/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://exocortex.com
 */
/**
 * @classdesc 几何体对象基类<br />
 * @desc Geometry是场景中由顶点和三角面构成的几何体对象的基类,保存描述几何体所有必要的数据
 * @constructor
 */
THREE.Geometry = function () {

	Object.defineProperty( this, 'id', { value: THREE.GeometryIdCount ++ } );
	/**
	 * @desc Geometry对象的UUID
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
	 * @default 'Geometry'
	 * @type {string}
	 */
	this.type = 'Geometry';
	/**
	 * @desc 几何体顶点列表<br />
	 * 若要更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true
	 * @type {THREE.Vector3[]}
	 */
	this.vertices = [];
	/**
	 * @desc 几何体顶点颜色列表，和索引一对一<br />
	 * 网格顶点的颜色存放在面里面.如果要更新this.colors属性需要将Geometry.colorsNeedUpdate设置为true
	 * @type {THREE.Color[]}
	 */
	this.colors = [];  // one-to-one vertex colors, used in Points and Line
	/**
	 * @desc 几何体三角面数组<br />
	 * 将Geometry对象的三角面存放在this.faces属性中,该属性是一个数组,初始化为空数组.这个数组描述在模型中每个顶点式怎样彼此连接的<br/>
	 * 如果要更新this.faces属性,需要将Geometry.elementsNeedUpdate 设置为true
	 * @type {THREE.Face3[]}
	 */
	this.faces = [];
	/**
	 * @desc 几何体UV数组<br />
	 * 按照三角面的索引顺序,将三角面的顶点按照顶点在三角面中的索引顺序存放在数组中,这里是一个二维数组<br />
	 * 如果要更新this.faceVertexUvs的值,需要将Geometry.uvsNeedUpdate属性设置为true
	 * @type {THREE.Vector2[]}
	 */
	this.faceVertexUvs = [ [] ];
	/**
	 * @desc 变形顶点数组,每个变形顶点都是一个javascript对象<br />
	 * { name: "targetName", vertices: [ new THREE.Vector3(), ... ] }
	 * @type {Array}
	 */
	this.morphTargets = [];
	/**
	 * @desc 变形顶点的颜色数组也有和变形顶点数组类似的结构,每种颜色是一个javascript对象<br />
	 * morphColor = { name: "colorName", colors: [ new THREE.Color(), ... ] }
	 * @type {Array}
	 */
	this.morphColors = [];
	/**
	 * @desc 变形法线向量数组也有和变形顶点数组类似的结构,每个法向量是javascript对象<br />
	 * morphNormal = { name: "NormalName", normals: [ new THREE.Vector3(), ... ] }
	 * @type {Array}
	 */
	this.morphNormals = [];
	/**
	 * @desc 蒙皮权重数组,和顶点数组的数量和顺序保持一致
	 * @type {Array}
	 */
	this.skinWeights = [];
	/**
	 * @desc 蒙皮指数数组,和顶点数组的数量和顺序保持一致
	 * @type {Array}
	 */
	this.skinIndices = [];
	/**
	 * @desc 这个数组包含将顶点按照索引顺序依次连线产生的几何线段的长度<br />
	 * 这里需要LinePieces/LineDashedMaterial 正确被渲染<br />
	 * 线的长度也可以通过computeLineDistances方法生成<br />
	 * 如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true
	 * @type {Array}
	 */
	this.lineDistances = [];
	/**
	 * @desc 立方体界限,根据当前几何体生成的立方体界限
	 * @default null
	 * @type {THREE.Box3}
	 */
	this.boundingBox = null;
	/**
	 * @desc 球体界限,根据当前几何体生成的球体界限
	 * @default null
	 * @type {THREE.Sphere}
	 */
	this.boundingSphere = null;
	/**
	 * @desc 用geometry.computetangents方法,如果当前几何体有几何切线,设置为true.
	 * @default false
	 * @type {boolean}
	 */
	this.hasTangents = false;
	/**
	 * @desc 如果设置为false,属性数组的中间值将被删除<br />
	 * 如果设置为true,属性缓存将实时改变,除非内部属性数组被送到GPU,对应的缓存被删除
	 * @default true
	 * @type {boolean}
	 */
	this.dynamic = true; // the intermediate typed arrays will be deleted when set to false

	// update flags
	/**
	 * @desc 如果已经更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true.
	 * @default false
	 * @type {boolean}
	 */
	this.verticesNeedUpdate = false;
	/**
	 * @desc 如果已经更新this.faces属性,需要将 Geometry.elementsNeedUpdate设置为true.
	 * @default false
	 * @type {boolean}
	 */
	this.elementsNeedUpdate = false;
	/**
	 * @desc 如果已经更新this.faceVertexUvs属性,需要将 Geometry.uvsNeedUpdate设置为true.
	 * @default false
	 * @type {boolean}
	 */
	this.uvsNeedUpdate = false;
	/**
	 * @desc 如果三角面对象的法线向量数组已经更新,需要将Geometry.normalsNeedUpdate属性设置为true
	 * @default false
	 * @type {boolean}
	 */
	this.normalsNeedUpdate = false;
	/**
	 * @desc 如果三角面的顶点正切数组已经更新,需要将Geometry.tangentsNeedUpdate属性设置为true
	 * @default false
	 * @type {boolean}
	 */
	this.tangentsNeedUpdate = false;
	/**
	 * @desc 如果已经要更新this.colors属性,需要将Geometry.colorsNeedUpdate设置为true
	 * @default false
	 * @type {boolean}
	 */
	this.colorsNeedUpdate = false;
	/**
	 * @desc 如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true
	 * @default false
	 * @type {boolean}
	 */
	this.lineDistancesNeedUpdate = false;
	/**
	 * @desc 如果想组中添加删除对象,设置为true
	 * @default false
	 * @type {boolean}
	 */
	this.groupsNeedUpdate = false;

};

THREE.Geometry.prototype = {

	constructor: THREE.Geometry,
	/**
	 * @desc 对对象的vertices属性应用矩阵变换.达到旋转,缩放,移动的目的<br />
	 * 更新geometry中的所有顶点坐标和表面的法线向量，所做的实际上是用变换矩阵matrix对geometry形体进行空间变换<br />
	 * @param {THREE.Matrix4} matrix
	 */
	applyMatrix: function ( matrix ) {
		// normalMatrix是参数matrix左上角3×3矩阵的逆转置矩阵，该矩阵用来旋转矢量（法线，而不是顶点坐标）
		var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

		// 遍历vertices数组，对每个顶点做矩阵变换
		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

			var vertex = this.vertices[ i ];
			vertex.applyMatrix4( matrix );

		}

		// 变量face数组，对每个face的vertexNormal中的每个顶点应用变换
		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

			var face = this.faces[ i ];
			face.normal.applyMatrix3( normalMatrix ).normalize();

			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

				face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

			}

		}
		// 更新计算当前Geometry对象的立方体界限
		if ( this.boundingBox instanceof THREE.Box3 ) {

			this.computeBoundingBox();

		}

		// 更新计算当前Geometry对象的球体界限
		if ( this.boundingSphere instanceof THREE.Sphere ) {

			this.computeBoundingSphere();

		}

	},

	/**
	 * @desc 从Buffer构造Geometry对象
	 * @param {*} geometry
	 * @returns {THREE.Geometry}
	 */
	fromBufferGeometry: function ( geometry ) {

		var scope = this;

		// Geometry属性
		var attributes = geometry.attributes;

		// 顶点数组
		var vertices = attributes.position.array;
		// 索引数组
		var indices = attributes.index !== undefined ? attributes.index.array : undefined;
		// 法线数组
		var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
		// 顶点颜色数组
		var colors = attributes.color !== undefined ? attributes.color.array : undefined;
		// uv数组
		var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;

		var tempNormals = [];
		var tempUVs = [];

		for ( var i = 0, j = 0; i < vertices.length; i += 3, j += 2 ) {

			// 添加顶点
			scope.vertices.push( new THREE.Vector3( vertices[ i ], vertices[ i + 1 ], vertices[ i + 2 ] ) );

			if ( normals !== undefined ) {

				tempNormals.push( new THREE.Vector3( normals[ i ], normals[ i + 1 ], normals[ i + 2 ] ) );

			}

			// 添加颜色
			if ( colors !== undefined ) {

				scope.colors.push( new THREE.Color( colors[ i ], colors[ i + 1 ], colors[ i + 2 ] ) );

			}

			if ( uvs !== undefined ) {

				tempUVs.push( new THREE.Vector2( uvs[ j ], uvs[ j + 1 ] ) );

			}

		}

		var addFace = function ( a, b, c ) {

			var vertexNormals = normals !== undefined ? [ tempNormals[ a ].clone(), tempNormals[ b ].clone(), tempNormals[ c ].clone() ] : [];
			var vertexColors = colors !== undefined ? [ scope.colors[ a ].clone(), scope.colors[ b ].clone(), scope.colors[ c ].clone() ] : [];

			scope.faces.push( new THREE.Face3( a, b, c, vertexNormals, vertexColors ) );
			scope.faceVertexUvs[ 0 ].push( [ tempUVs[ a ], tempUVs[ b ], tempUVs[ c ] ] );

		};

		// 添加三角面
		if ( indices !== undefined ) {

			for ( var i = 0; i < indices.length; i += 3 ) {

				addFace( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

			}

		} else {

			for ( var i = 0; i < vertices.length / 3; i += 3 ) {

				addFace( i, i + 1, i + 2 );

			}

		}
		 // 计算面法线
		this.computeFaceNormals();

		// 计算立方体包围盒
		if ( geometry.boundingBox !== null ) {

			this.boundingBox = geometry.boundingBox.clone();

		}

		// 计算球体包围盒
		if ( geometry.boundingSphere !== null ) {

			this.boundingSphere = geometry.boundingSphere.clone();

		}

		return this;

	},

	/**
	 * @desc 计算出当前Geometry对象的立方体界限的中心
	 * @returns {THREE.Vector3}
	 */
	center: function () {

		this.computeBoundingBox();

		var offset = new THREE.Vector3();

		offset.addVectors( this.boundingBox.min, this.boundingBox.max );
		offset.multiplyScalar( - 0.5 );

		this.applyMatrix( new THREE.Matrix4().makeTranslation( offset.x, offset.y, offset.z ) );
		this.computeBoundingBox();

		return offset;

	},

	/**
	 * @desc 重新计算三角面对象的法线向量<br />
	 * 计算法线向量，影响的是face数组中每个元素的normal属性，一个face只有1个
	 */
	computeFaceNormals: function () {

		var cb = new THREE.Vector3(), ab = new THREE.Vector3();

		for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

			var face = this.faces[ f ];

			var vA = this.vertices[ face.a ];
			var vB = this.vertices[ face.b ];
			var vC = this.vertices[ face.c ];

			cb.subVectors( vC, vB );
			ab.subVectors( vA, vB );
			cb.cross( ab );

			cb.normalize();

			face.normal.copy( cb );

		}

	},
	/**
	 * @desc 重新计算三角面对象顶点的法线向量<br />
	 * face数组中每个元素的vertexNormal属性，一个face3型对象有3个<br />
	 * 但是需要注意的是，被多个表面共享的顶点，其法线向量只有一个，同时受到多个表面的影响。比如中心在原点，三组表面都垂直于轴的立方体<br />
	 * 其第一象限中的顶点，法线向量是(1,1,1)的归一化。虽然看上去不可思议，平面的顶点的法线居然不是垂直于平面的，但这种指定法线的方法<br />
	 * 在利用平面模拟曲面的时候有很好的效果<br />
	 * 顶点法线（Vertex Normal）是过顶点的一个矢量，用于在高洛德着色（Gouraud Shading）中的计算光照和纹理效果。在生成曲面时<br />
	 * 通常令顶点法线和相邻平面的法线保持等角，如图1，这样进行渲染时，会在平面接缝处产生一种平滑过渡的效果。如果是多边形<br />
	 * 则令顶点法线等于该点所属平面（三角形）的法线，以便在接缝处产生突出的边缘
	 * @param {boolean} areaWeighted true表示face数组中的发线没有被计算,false或者忽略表示已经计算过了
	 */
	computeVertexNormals: function ( areaWeighted ) {

		var v, vl, f, fl, face, vertices;

		vertices = new Array( this.vertices.length );

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ] = new THREE.Vector3();

		}

		if ( areaWeighted ) {

			// vertex normals weighted by triangle areas
			// http://www.iquilezles.org/www/articles/normals/normals.htm

			var vA, vB, vC, vD;
			var cb = new THREE.Vector3(), ab = new THREE.Vector3(),
				db = new THREE.Vector3(), dc = new THREE.Vector3(), bc = new THREE.Vector3();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vA = this.vertices[ face.a ];
				vB = this.vertices[ face.b ];
				vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				vertices[ face.a ].add( cb );
				vertices[ face.b ].add( cb );
				vertices[ face.c ].add( cb );

			}

		} else {

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vertices[ face.a ].add( face.normal );
				vertices[ face.b ].add( face.normal );
				vertices[ face.c ].add( face.normal );

			}

		}

		// 单位化
		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ].normalize();

		}

		// 重新设置定点的法向量
		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.vertexNormals[ 0 ] = vertices[ face.a ].clone();
			face.vertexNormals[ 1 ] = vertices[ face.b ].clone();
			face.vertexNormals[ 2 ] = vertices[ face.c ].clone();

		}

	},
	/**
	 * @desc 重新计算三角面对象变形顶点的法线向量,morph应该是用作显示固定连续动画的变形效果<br />
	 * 其余说明等同于 computeVertexNormals
	 */
	computeMorphNormals: function () {		//garreet

		var i, il, f, fl, face;

		// save original normals
		// 保存初始法线向量值
		// - create temp variables on first access
		// 首次访问,创建临时变量
		//   otherwise just copy (for faster repeated calls)
		// 否则只是复制,更快的重复调用.

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( ! face.__originalFaceNormal ) {

				face.__originalFaceNormal = face.normal.clone();

			} else {

				face.__originalFaceNormal.copy( face.normal );

			}

			if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

			for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

				if ( ! face.__originalVertexNormals[ i ] ) {

					face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

				} else {

					face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

				}

			}

		}

		// use temp geometry to compute face and vertex normals for each morph
		// 使用临时几何体对象计算每个面和顶点法线向量

		var tmpGeo = new THREE.Geometry();
		tmpGeo.faces = this.faces;

		for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

			// create on first access
			// 首次读取,先创建.

			if ( ! this.morphNormals[ i ] ) {

				this.morphNormals[ i ] = {};
				this.morphNormals[ i ].faceNormals = [];
				this.morphNormals[ i ].vertexNormals = [];

				var dstNormalsFace = this.morphNormals[ i ].faceNormals;
				var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					faceNormal = new THREE.Vector3();
					vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };

					dstNormalsFace.push( faceNormal );
					dstNormalsVertex.push( vertexNormals );

				}

			}

			var morphNormals = this.morphNormals[ i ];

			// set vertices to morph target
			// 设置顶点到变形顶点

			tmpGeo.vertices = this.morphTargets[ i ].vertices;

			// compute morph normals
			// 计算变形顶点法线向量

			tmpGeo.computeFaceNormals();
			tmpGeo.computeVertexNormals();

			// store morph normals
			// 保存变形顶点法线向量

			var faceNormal, vertexNormals;

			// 遍历三角面的vertexNormal数组
			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				faceNormal = morphNormals.faceNormals[ f ];
				vertexNormals = morphNormals.vertexNormals[ f ];

				faceNormal.copy( face.normal );

				vertexNormals.a.copy( face.vertexNormals[ 0 ] );
				vertexNormals.b.copy( face.vertexNormals[ 1 ] );
				vertexNormals.c.copy( face.vertexNormals[ 2 ] );

			}

		}

		// restore original normals
		// 恢复原来的平面法线向量.

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.normal = face.__originalFaceNormal;
			face.vertexNormals = face.__originalVertexNormals;

		}

	},

	/**
	 * @desc 重新计算三角面对象顶点的切线空间,,0层将被使用<br />
	 * TBN切线是一个有方向的单位长度，沿着网格表面指向水平（U）纹理方向<br />
	 * 在Three.js中切线被描述为Vector4，包括x,y,z这些组件定义的矢量,如果需要，及w用来翻转副法线<br />
	 * 几何体Geometry对象必须有vertex UV属性,0层将被使用
	 */
	computeTangents: function () {			//garreet

		// based on http://www.terathon.com/code/tangent.html
		// tangents go to vertices

		var f, fl, v, vl, i, il, vertexIndex,
			face, uv, vA, vB, vC, uvA, uvB, uvC,
			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r, t, test,
			tan1 = [], tan2 = [],
			sdir = new THREE.Vector3(), tdir = new THREE.Vector3(),
			tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),
			n = new THREE.Vector3(), w;

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			tan1[ v ] = new THREE.Vector3();
			tan2[ v ] = new THREE.Vector3();

		}

		/**
		 * @desc 重新计算三角面对象的切线空间的TB,TBN<br />
		 * TBN切线是一个有方向的单位长度，沿着网格表面指向水平（U）纹理方向<br />
		 * 在Three.js中切线被描述为Vector4，包括x,y,z这些组件定义的矢量,及w用来翻转副法线
		 * @param {THREE.Geometry} context
		 * @param {number} a
		 * @param {number} b
		 * @param {number} c
		 * @param {number} ua
		 * @param {number} ub
		 * @param {number} uc
		 */
		function handleTriangle( context, a, b, c, ua, ub, uc ) {

			vA = context.vertices[ a ];
			vB = context.vertices[ b ];
			vC = context.vertices[ c ];

			uvA = uv[ ua ];
			uvB = uv[ ub ];
			uvC = uv[ uc ];

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
			sdir.set( ( t2 * x1 - t1 * x2 ) * r,
					  ( t2 * y1 - t1 * y2 ) * r,
					  ( t2 * z1 - t1 * z2 ) * r );
			tdir.set( ( s1 * x2 - s2 * x1 ) * r,
					  ( s1 * y2 - s2 * y1 ) * r,
					  ( s1 * z2 - s2 * z1 ) * r );

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		//遍历所有的三角面
		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			// 使用UV属性的0层.
			uv = this.faceVertexUvs[ 0 ][ f ]; // use UV layer 0 for tangents

			// 一一计算切线坐标空间
			handleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );

		}

		var faceIndex = [ 'a', 'b', 'c', 'd' ];

		//遍历所有三角面
		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			for ( i = 0; i < Math.min( face.vertexNormals.length, 3 ); i ++ ) {

				n.copy( face.vertexNormals[ i ] );

				vertexIndex = face[ faceIndex[ i ] ];

				t = tan1[ vertexIndex ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness
				// 计算

				tmp2.crossVectors( face.vertexNormals[ i ], t );
				test = tmp2.dot( tan2[ vertexIndex ] );
				w = ( test < 0.0 ) ? - 1.0 : 1.0;

				// 切线是一个有方向的单位长度，沿着网格表面指向水平（U）纹理方向
				// 在Three.js中切线被描述为Vector4，包括x,y,z这些组件定义的矢量，如果需要，及w用来翻转副法线。
				face.vertexTangents[ i ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );

			}

		}

		this.hasTangents = true;

	},

	/**
	 * @desc 重新计算顶点数组将顶点按照索引顺序依次连线产生的几何线段的长度<br />
	 * 如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true
	 */
	computeLineDistances: function () {

		var d = 0;
		var vertices = this.vertices;

		// 遍历所有的顶点
		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			if ( i > 0 ) {

				d += vertices[ i ].distanceTo( vertices[ i - 1 ] );

			}

			// 一一将相邻两点的长度保存在this.lineDistances属性中
			this.lineDistances[ i ] = d;

		}

	},

	/**
	 * @desc 重新计算当前几何体对象的立方体界限,并更新this.boundingBox[]属性
	 */
	computeBoundingBox: function () {

		if ( this.boundingBox === null ) {

			this.boundingBox = new THREE.Box3();

		}

		this.boundingBox.setFromPoints( this.vertices );

	},

	/**
	 * @desc 重新计算当前几何体对象的球体界限,并更新this.boundingSphere[]属性
	 */
	computeBoundingSphere: function () {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new THREE.Sphere();

		}

		this.boundingSphere.setFromPoints( this.vertices );

	},
	/**
	 * @desc 将两个几何体对象或者Object3D里面的几何体对象合并,(使用对象的变换)将几何体的顶点,面,UV分别合并.
	 * @param {THREE.Geometry} geometry 要被合并的几何体
	 * @param {THREE.Matrix4} matrix 可选参数,变换矩阵,当指定了该参数,合并后的对象会应用变换
	 * @param {number} materialIndexOffset 材质索引偏移量
	 */
	merge: function ( geometry, matrix, materialIndexOffset ) {

		if ( geometry instanceof THREE.Geometry === false ) {

			//提示用户对象类型错误
			console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
			return;

		}

		var normalMatrix,
		vertexOffset = this.vertices.length,
		vertices1 = this.vertices,
		vertices2 = geometry.vertices,
		faces1 = this.faces,
		faces2 = geometry.faces,
		uvs1 = this.faceVertexUvs[ 0 ],
		uvs2 = geometry.faceVertexUvs[ 0 ];

		if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

		if ( matrix !== undefined ) {

			normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

		}

		// vertices
		// 合并顶点数组
		for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

			var vertex = vertices2[ i ];

			var vertexCopy = vertex.clone();

			if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );

			vertices1.push( vertexCopy );

		}

		// faces
		// 合并三角面数组
		for ( i = 0, il = faces2.length; i < il; i ++ ) {

			var face = faces2[ i ], faceCopy, normal, color,
			faceVertexNormals = face.vertexNormals,
			faceVertexColors = face.vertexColors;

			faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
			faceCopy.normal.copy( face.normal );

			if ( normalMatrix !== undefined ) {

				faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

			}

			// 遍历三角面顶点法线向量数组
			for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

				normal = faceVertexNormals[ j ].clone();

				if ( normalMatrix !== undefined ) {

					// 一一合并
					normal.applyMatrix3( normalMatrix ).normalize();

				}

				faceCopy.vertexNormals.push( normal );

			}

			faceCopy.color.copy( face.color );

			// 遍历三角面顶点颜色数组
			for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

				color = faceVertexColors[ j ];
				// 一一合并
				faceCopy.vertexColors.push( color.clone() );

			}

			// 改变materialIndex属性.
			faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

			faces1.push( faceCopy );

		}

		// uvs
		// 合并UV数组
		// 遍历uv数组
		for ( i = 0, il = uvs2.length; i < il; i ++ ) {

			var uv = uvs2[ i ], uvCopy = [];

			if ( uv === undefined ) {

				continue;

			}

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}
			// 一一合并.
			uvs1.push( uvCopy );

		}

	},

	/*
	 * Checks for duplicate vertices with hashmap.
	 * 用HashMap检查重复的顶点
	 * Duplicated vertices are removed
	 * 删除重复的顶点
	 * and faces' vertices are updated.
	 * 并且更新面的顶点
	 */

	/**
	 * @desc 清理几何体中重复的顶点
	 * @returns {number} 相差的点数目
	 */
	mergeVertices: function () {

		// 定义HashMap查找顶点的位置坐标,确保顶点的位置坐标是唯一的.
		var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
		var unique = [], changes = [];

		var v, key;
		// 数字的小数点长度,比如值为4,相应的小数为0.0001
		var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		var precision = Math.pow( 10, precisionPoints );
		var i,il, face;
		var indices, k, j, jl, u;

		// 遍历顶点数组
		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

			v = this.vertices[ i ];
			// 设置HashMap的key属性值
			key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

			if ( verticesMap[ key ] === undefined ) {

				verticesMap[ key ] = i;
				unique.push( this.vertices[ i ] );
				// 生成HashMap容器
				changes[ i ] = unique.length - 1;

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		};


		// if faces are completely degenerate after merging vertices, we
		// have to remove them from the geometry.
		// 如果三角面的顶点有重复,我们将要把这些多余的顶点从几何体对象里删除
		var faceIndicesToRemove = [];

		//遍历三角面数组属性
		for ( i = 0, il = this.faces.length; i < il; i ++ ) {

			face = this.faces[ i ];

			face.a = changes[ face.a ];
			face.b = changes[ face.b ];
			face.c = changes[ face.c ];

			indices = [ face.a, face.b, face.c ];

			var dupIndex = - 1;

			// if any duplicate vertices are found in a Face3
			// 如果在Face3中发现任何重复的顶点,
			// we have to remove the face as nothing can be saved
			// 我们将删除顶点
			for ( var n = 0; n < 3; n ++ ) {
				if ( indices[ n ] == indices[ ( n + 1 ) % 3 ] ) {

					dupIndex = n;
					// 将要删除的面放到数组faceIndicesToRemove中
					faceIndicesToRemove.push( i );
					break;

				}
			}

		}

		// 遍历要删除的面的数组
		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {
			var idx = faceIndicesToRemove[ i ];

			// 删除对应的面
			this.faces.splice( idx, 1 );

			// 遍历几何体对象的faceVertexUvs属性
			for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

				// 删除对应的uv
				this.faceVertexUvs[ j ].splice( idx, 1 );

			}

		}

		// Use unique set of vertices
		// 使用不包含重复顶点的vertecs数组.
		var diff = this.vertices.length - unique.length;
		this.vertices = unique;
		return diff;

	},

	/**
	 * @desc 将Geometry对象生成Json格式
	 * @returns {{metadata: {version: number, type: string, generator: string}, uuid: *, type: *}}
	 */
	toJSON: function () {

		// 基本信息
		var output = {
			metadata: {
				version: 4.0,
				type: 'BufferGeometry',
				generator: 'BufferGeometryExporter'
			},
			uuid: this.uuid,
			type: this.type
		};

		if ( this.name !== "" ) output.name = this.name;

		if ( this.parameters !== undefined ) {

			var parameters = this.parameters;

			for ( var key in parameters ) {

				if ( parameters[ key ] !== undefined ) output[ key ] = parameters[ key ];

			}

			return output;

		}

		// 输出顶点
		var vertices = [];

		for ( var i = 0; i < this.vertices.length; i ++ ) {

			var vertex = this.vertices[ i ];
			vertices.push( vertex.x, vertex.y, vertex.z );

		}

		var faces = [];
		var normals = [];
		var normalsHash = {};
		var colors = [];
		var colorsHash = {};
		var uvs = [];
		var uvsHash = {};

		// 遍历三角面
		for ( var i = 0; i < this.faces.length; i ++ ) {

			// 输出三角面
			var face = this.faces[ i ];

			var hasMaterial = false; // face.materialIndex !== undefined;
			var hasFaceUv = false; // deprecated
			var hasFaceVertexUv = this.faceVertexUvs[ 0 ][ i ] !== undefined;
			var hasFaceNormal = face.normal.length() > 0;
			var hasFaceVertexNormal = face.vertexNormals.length > 0;
			var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
			var hasFaceVertexColor = face.vertexColors.length > 0;

			var faceType = 0;

			faceType = setBit( faceType, 0, 0 );
			faceType = setBit( faceType, 1, hasMaterial );
			faceType = setBit( faceType, 2, hasFaceUv );
			faceType = setBit( faceType, 3, hasFaceVertexUv );
			faceType = setBit( faceType, 4, hasFaceNormal );
			faceType = setBit( faceType, 5, hasFaceVertexNormal );
			faceType = setBit( faceType, 6, hasFaceColor );
			faceType = setBit( faceType, 7, hasFaceVertexColor );

			faces.push( faceType );
			faces.push( face.a, face.b, face.c );


			/*
			if ( hasMaterial ) {

				faces.push( face.materialIndex );

			}
			*/

			// 输出UV
			if ( hasFaceVertexUv ) {

				var faceVertexUvs = this.faceVertexUvs[ 0 ][ i ];

				faces.push(
					getUvIndex( faceVertexUvs[ 0 ] ),
					getUvIndex( faceVertexUvs[ 1 ] ),
					getUvIndex( faceVertexUvs[ 2 ] )
				);

			}

			// 输出面法线
			if ( hasFaceNormal ) {

				faces.push( getNormalIndex( face.normal ) );

			}

			// 输出顶点法线
			if ( hasFaceVertexNormal ) {

				var vertexNormals = face.vertexNormals;

				faces.push(
					getNormalIndex( vertexNormals[ 0 ] ),
					getNormalIndex( vertexNormals[ 1 ] ),
					getNormalIndex( vertexNormals[ 2 ] )
				);

			}

			// 输出面颜色
			if ( hasFaceColor ) {

				faces.push( getColorIndex( face.color ) );

			}

			// 输出顶点颜色
			if ( hasFaceVertexColor ) {

				var vertexColors = face.vertexColors;

				faces.push(
					getColorIndex( vertexColors[ 0 ] ),
					getColorIndex( vertexColors[ 1 ] ),
					getColorIndex( vertexColors[ 2 ] )
				);

			}

		}

		/**
		 * @desc bool型变量向8位数字内添加，即做二进制压缩
		 * @param {number} value 数值
		 * @param {number} position 位置
		 * @param {boolean} enabled ture 或 false
		 * @returns {number}
		 */
		function setBit( value, position, enabled ) {

			return enabled ? value | ( 1 << position ) : value & ( ~ ( 1 << position) );

		}

		/**
		 * @desc 获得normal的索引
		 * @param {THREE.Vector3} normal
		 * @returns {number}
		 */
		function getNormalIndex( normal ) {

			var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

			if ( normalsHash[ hash ] !== undefined ) {

				return normalsHash[ hash ];

			}

			normalsHash[ hash ] = normals.length / 3;
			normals.push( normal.x, normal.y, normal.z );

			return normalsHash[ hash ];

		}
		/**
		 * @desc 获得颜色的索引
		 * @param {THREE.Color} color
		 * @returns {number}
		 */
		function getColorIndex( color ) {

			var hash = color.r.toString() + color.g.toString() + color.b.toString();

			if ( colorsHash[ hash ] !== undefined ) {

				return colorsHash[ hash ];

			}

			colorsHash[ hash ] = colors.length;
			colors.push( color.getHex() );

			return colorsHash[ hash ];

		}
		/**
		 * @desc 获得UV的索引
		 * @param {THREE.Vector2} uv
		 * @returns {number}
		 */
		function getUvIndex( uv ) {

			var hash = uv.x.toString() + uv.y.toString();

			if ( uvsHash[ hash ] !== undefined ) {

				return uvsHash[ hash ];

			}

			uvsHash[ hash ] = uvs.length / 2;
			uvs.push( uv.x, uv.y );

			return uvsHash[ hash ];

		}

		// 输出数据
		output.data = {};

		output.data.vertices = vertices;
		output.data.normals = normals;
		if ( colors.length > 0 ) output.data.colors = colors;
		if ( uvs.length > 0 ) output.data.uvs = [ uvs ]; // temporal backward compatibility
		output.data.faces = faces;

		//

		return output;

	},

	/**
	 * @desc 克隆几何对象体，将顶点数组,三角面数组,三角面顶点uv分别复制
	 * @returns {THREE.Geometry}
	 */
	clone: function () {

		var geometry = new THREE.Geometry();

		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			geometry.vertices.push( vertices[ i ].clone() );

		}

		var faces = this.faces;

		for ( var i = 0, il = faces.length; i < il; i ++ ) {

			geometry.faces.push( faces[ i ].clone() );

		}

		var uvs = this.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvs.length; i < il; i ++ ) {

			var uv = uvs[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}

			geometry.faceVertexUvs[ 0 ].push( uvCopy );

		}

		return geometry;

	},

	/**
	 * @desc dispose方法从内存中删除对象,释放资源<br />
	 * 当删除几何体对象,不要忘记调用这个方法,否则会导致内存泄露
	 */
	dispose: function () {

		// 调度事件.
		this.dispatchEvent( { type: 'dispose' } );

	}

};

/**
 * @desc EventDispatcher方法应用到当前Geometry对象.
 */
THREE.EventDispatcher.prototype.apply( THREE.Geometry.prototype );
/**
 * @memberof THREE
 * @desc 全局几何体对象数目
 * @type {number}
 */
THREE.GeometryIdCount = 0;
