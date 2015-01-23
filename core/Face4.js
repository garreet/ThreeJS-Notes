/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * @classdesc 四角面对象类（四维空间内）
 * @ignore
 */
THREE.Face4 = function ( a, b, c, d, normal, color, materialIndex ) {

	console.warn( 'THREE.Face4 has been removed. A THREE.Face3 will be created instead.' )
	return new THREE.Face3( a, b, c, normal, color, materialIndex );

};
