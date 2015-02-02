/**
 * @classdesc webglshader 对象
 * @param {*} gl gl上下文对象
 * @param {number} type 类型
 * @param {string} string shader字符串
 * @constructor
 */
THREE.WebGLShader = ( function () {
	/**
	 * @desc 格式化行对象
	 * @param {string} string shader指令
	 * @returns {string}
	 */
	var addLineNumbers = function ( string ) {

		var lines = string.split( '\n' );

		for ( var i = 0; i < lines.length; i ++ ) {

			lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

		}

		return lines.join( '\n' );

	};

	return function ( gl, type, string ) {

		var shader = gl.createShader( type ); 

		gl.shaderSource( shader, string );
		gl.compileShader( shader );

		if ( gl.getShaderParameter( shader, gl.COMPILE_STATUS ) === false ) {

			console.error( 'THREE.WebGLShader: Shader couldn\'t compile.' );

		}

		if ( gl.getShaderInfoLog( shader ) !== '' ) {

			console.warn( 'THREE.WebGLShader: gl.getShaderInfoLog()', gl.getShaderInfoLog( shader ) );
			console.warn( addLineNumbers( string ) );

		}

		// --enable-privileged-webgl-extension
		// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

		return shader;

	};

} )();
