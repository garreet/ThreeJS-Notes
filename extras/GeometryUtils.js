/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 几何对象工具集<br />
 * 注释内容部分参照 http://blog.csdn.net/omni360
 * @ignore
 * @constructor
 */
THREE.GeometryUtils = {
	/**
	 * @desc 合并几何对象
	 * @param {THREE.Geometry} geometry1 几何对象1
	 * @param {THREE.Geometry} geometry2 几何对象2
	 * @param {float} materialIndexOffset 材质索引偏移量
	 */
	merge: function ( geometry1, geometry2, materialIndexOffset ) {

		console.warn( 'THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.' );

		var matrix;

		if ( geometry2 instanceof THREE.Mesh ) {

			geometry2.matrixAutoUpdate && geometry2.updateMatrix();

			matrix = geometry2.matrix;
			geometry2 = geometry2.geometry;

		}

		geometry1.merge( geometry2, matrix, materialIndexOffset );

	},
	/**
	 * @desc 计算几何对象的中心
	 * @param {THREE.Geometry} geometry
	 * @returns {*}
	 */
	center: function ( geometry ) {

		console.warn( 'THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.' );
		return geometry.center();

	}

};
