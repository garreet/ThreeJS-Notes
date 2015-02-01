/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @desc 声明全局对象THREE
 * @class THREE
 */
var THREE = {
	/**
	 * @desc 版本信息
	 * @default
	 * @type {string}
	 */
	REVISION: '69'
};

// browserify support
/**
 * Browserify 通过预编译的方法，让Javascript前端可以直接使用Node后端的程序。
 * 我们可以用一套代码完成前后端，不仅工作量变少了，程序重用性增强，
 * 还可以直接在浏览器中使用大量的NPM第三方开源库的功能。
 */
/**
 * 对程序是否运行在node环境内做一个判断，将THREE对象导出
 */
if ( typeof module === 'object' ) {

	module.exports = THREE;

}

// polyfills
/**
 * @desc 归一化数字
 */
if ( Math.sign === undefined ) {

	Math.sign = function ( x ) {

		return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : 0;

	};

}


// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
///**
// * @desc 定义鼠标事件
// * @enum {number}
// */
THREE.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

// GL STATE CONSTANTS
// GL 状态常量
//WebGL常量用于指定多边形正反面是否可以被消除精简。此处定义的常量应该
//在参考GLES中的定义，http://blog.csdn.net/opengl_es（太阳火神的美丽人生 的博客里面有好多精彩的例子和解释）。
//更多的细节参照WebGL的规范：http://www.khronos.org/registry/webgl/specs/1.0/#5.14
//以及GLES 中glCullFace的定义：http://www.khronos.org/opengles/sdk/docs/man/xhtml/glCullFace.xml。
THREE.CullFaceNone = 0;				//多边形面不消除精简
THREE.CullFaceBack = 1;				//多边形的反面进行消除精简
THREE.CullFaceFront = 2;			//多边形的正面进行消除精简
THREE.CullFaceFrontBack = 3;		//多边形的正面和反面都进行消除精简。

THREE.FrontFaceDirectionCW = 0;		//定义多边形正面的方向：顺时针为0
THREE.FrontFaceDirectionCCW = 1;	//定义多边形正面的方向：逆时针为1

// SHADOWING TYPES
// 阴影类型，下面定义了三种阴影类型的常量，关于这三种阴影类型的具体效果
// 可以参考 http://codeflow.org/entries/2013/feb/15/soft-shadow-mapping/
// 或者：http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-16-shadow-mapping/#Basic_shader
THREE.BasicShadowMap = 0;			//普通投影的阴影贴图
THREE.PCFShadowMap = 1;				//柔化边缘的阴影贴图
THREE.PCFSoftShadowMap = 2;			//柔化边缘的软阴影贴图

// MATERIAL CONSTANTS
//材质常量
// side
//  面,模型的正面,背面,双面是否附着材质
THREE.FrontSide = 0;				//材质只附着正面
THREE.BackSide = 1;					//材质只附着背面
THREE.DoubleSide = 2;				//正面背面都附着材质

// shading
// 着色处理
/*********************着色方式**************************************************************************
 着色方式
 绝大多数的3D物体是由多边形（polygon）所构成的，它们都必须经过某些着色处理的手续，才不会以线结构（wireframe）的方式显示。
 这些着色处理方式有差到好，依次主要分为FlatShading、GouraudShading、PhoneShading、ScanlineRenderer、Ray-Traced。
 FlatShading（平面着色）
 也叫做“恒量着色”，平面着色是最简单也是最快速的着色方法，每个多边形都会被指定一个单一且没有变化的颜色。这种方法虽然会产生出不真实
 的效果，不过它非常适用于快速成像及其它要求速度重于细致度的场合，如：生成预览动画。

 GouraudShading（高洛德着色/高氏着色）
 这种着色的效果要好得多，也是在游戏中使用最广泛的一种着色方式。它可对3D模型各顶点的颜色进行平滑、融合处理，将每个多边形上的每个点
 赋以一组色调值，同时将多边形着上较为顺滑的渐变色，使其外观具有更强烈的实时感和立体动感，不过其着色速度比平面着色慢得多。

 PhoneShading（补色着色）
 首先，找出每个多边形顶点，然后根据内插值的方法，算出顶点间算连线上像素的光影值，接着再次运用线性的插值处理，算出其他所有像素高氏着
 色在取样计算时，只顾及每个多边形顶点的光影效果，而补色着色却会把所有的点都计算进去。

 ScanlineRenderer（扫描线着色）
 这是3ds Max的默认渲染方式，它是一种基于一组连续水平线的着色方式，由于它渲染速度较快，一般被使用在预览场景中。

 Ray-Traced（光线跟踪着色）
 光线跟踪是真实按照物理照射光线的入射路径投射在物体上，最终反射回摄象机所得到每一个像素的真实值的着色算法，由于它计算精确，所得到的
 图象效果优质，因此制作CG一定要使用该选项。

 Radiosity（辐射着色）
 这是一种类似光线跟踪的特效。它通过制定在场景中光线的来源并且根据物体的位置和反射情况来计算从观察者到光源的整个路径上的光影效果。在
 这条线路上，光线受到不同物体的相互影响，如：反射、吸收、折射等情况都被计算在内。


 glShadeModel( GLenum mode )可以设置的着色模型有：GL_SMOOTH和GL_FLAT
 GL_FLAT恒定着色：对点，直线或多边形采用一种颜色进行绘制，整个图元的颜色就是它的任何一点的颜色。
 GL_SMOOTH平滑着色：用多种颜色进行绘制，每个顶点都是单独进行处理的，各顶点和各图元之间采用均匀插值。

 *********************着色方式**************************************************************************/
THREE.NoShading = 0;			//不着色
THREE.FlatShading = 1;			//GL_FLAT恒定着色：对点，直线或多边形采用一种颜色进行绘制，整个图元的颜色就是它的任何一点的颜色。
THREE.SmoothShading = 2;		//GL_SMOOTH平滑着色：用多种颜色进行绘制，每个顶点都是单独进行处理的，各顶点和各图元之间采用均匀插值。

// colors
//三角形顶点颜色,在材质参数传递时使用,对应的参数是vertexColor.
THREE.NoColors = 0;				// 顶点没有颜色
THREE.FaceColors = 1;			// 顶点使用面的颜色
THREE.VertexColors = 2;			// 顶点使用顶点的颜色

// blending modes
//材质混合混合模式类型,有相加,相减,相乘,自定义等将不同的材质,颜色混合的方式
//TODO:有时间可以自定义几种混合模式试试.实现一些特殊的效果.
THREE.NoBlending = 0;			//没有混合
THREE.NormalBlending = 1;		//普通混合
THREE.AdditiveBlending = 2;		//相加
THREE.SubtractiveBlending = 3;	//相减
THREE.MultiplyBlending = 4;		//相乘
THREE.CustomBlending = 5;		//自定义

// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)
// 自定义混合方程式
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)
// 数字从100开始,为了不和其它OpenGL常量重复.
// 参考:https://www.khronos.org/opengles/sdk/docs/man/xhtml/glBlendEquation.xml
// 参考:https://www.opengl.org/wiki/Blending
// 参考:http://blog.sina.com.cn/s/blog_7b62c61c01016nnc.html
/*********************************************设置混合方程式*********************************************************
 设置混合方程式：glBlendEquation(GLenum mode);
 GLenum mode可取的值：
 GL_FUNC_ADD                        Cf = (Cs * S)+(Cd * D)
 GL_FUNC_SUBTRACT                   Cf = (Cs * S)-(Cd * D)
 GL_FUNC_RESERSE_SUBTRACT           Cf = (Cd * D)-(Cs * S)
 GL_MIN                             Cf = min(Cs,Cd)
 GL_MAX                             Cf = max(Cs,Cd)
 其中：
 a. Cf表示混合后显示的颜色
 b. Cd混合前颜色缓冲中已经有的颜色值
 c. Cs将要绘制的颜色
 d. S为glBlendFunc函数设置时的第一个参数,源颜色因子
 e. D为glBlendFunc函数设置时的第二个参数,目标颜色因子
 **********************************************设置混合方程式*********************************************************/
THREE.AddEquation = 100;					//相加,看上面公式
THREE.SubtractEquation = 101;				//相减,看上面公式
THREE.ReverseSubtractEquation = 102;		//相减求反,看上面公式
THREE.MinEquation = 103;					//最小值
THREE.MaxEquation = 104;					//最大值

// custom blending destination factors
// 自定义混合模式目标颜色因子
//参考:https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.13
//参考:https://www.opengl.org/registry/specs/EXT/blend_color.txt
//参考:http://blog.sina.com.cn/s/blog_9f4bc8e301014m6c.html
//参考:https://www.opengl.org/registry/specs/EXT/blend_color.txt
//参考:https://www.khronos.org/opengles/sdk/docs/man/xhtml/glBlendFuncSeparate.xml
/*************************************摘抄自王路杰滴博客,http://blog.sina.com.cn/s/blog_9f4bc8e301014m6c.html***********

 混合是什么呢？混合就是把两种颜色混在一起。具体一点，就是把某一像素位置原来的颜色和将要画上去的颜色，通过某种方式混在一起，从而实现特殊的效果。
 假设我们需要绘制这样一个场景：透过红色的玻璃去看绿色的物体，那么可以先绘制绿色的物体，再绘制红色玻璃。在绘制红色玻璃的时候，利用“混合”功能，
 把将要绘制上去的红色和原来的绿色进行混合，于是得到一种新的颜色，看上去就好像玻璃是半透明的。
 要使用OpenGL的混合功能，只需要调用：glEnable(GL_BLEND);即可。
 要关闭OpenGL的混合功能，只需要调用：glDisable(GL_BLEND);即可。
 注意：只有在RGBA模式下，才可以使用混合功能，颜色索引模式下是无法使用混合功能的。
 一、源因子和目标因子
 前面我们已经提到，混合需要把原来的颜色和将要画上去的颜色找出来，经过某种方式处理后得到一种新的颜色。
 这里把将要画上去的颜色称为“源颜色”，把原来的颜色称为“目标颜色”。
 OpenGL 会把源颜色和目标颜色各自取出，并乘以一个系数（源颜色乘以的系数称为“源因子”，目标颜色乘以的系数称为“目标因子”），然后相加，这样就得到了新的颜色。
 （也可以不是相加，新版本的OpenGL可以设置运算方式，包括加、减、取两者中较大的、取两者中较小的、逻辑运算等，但我们这里为了简单起见，不讨论这个了）
 下面用数学公式来表达一下这个运算方式。假设源颜色的四个分量（指红色，绿色，蓝色，alpha值）是(Rs, Gs, Bs,  As)，目标颜色的四个分量是(Rd, Gd, Bd, Ad)，
 又设源因子为(Sr, Sg, Sb, Sa)，目标因子为(Dr, Dg, Db,  Da)。则混合产生的新颜色可以表示为：
 (Rs*Sr+Rd*Dr, Gs*Sg+Gd*Dg, Bs*Sb+Bd*Db, As*Sa+Ad*Da)
 当然了，如果颜色的某一分量超过了1.0，则它会被自动截取为1.0，不需要考虑越界的问题。

 源因子和目标因子是可以通过glBlendFunc函数来进行设置的。glBlendFunc有两个参数，前者表示源因子，后者表示目标因子。这两个参数可以是多种值，下面介绍比较常用的几种。
 GL_ZERO：     表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算。
 GL_ONE：      表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
 GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。
 GL_DST_ALPHA：表示使用目标颜色的alpha值来作为因子。
 GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。
 GL_ONE_MINUS_DST_ALPHA：表示用1.0减去目标颜色的alpha值来作为因子。
 除 此以外，还有GL_SRC_COLOR（把源颜色的四个分量分别作为因子的四个分量）、GL_ONE_MINUS_SRC_COLOR、 GL_DST_COLOR、GL_ONE_MINUS_DST_COLOR等，前两个在OpenGL旧版本中只能用于设置目标因子，
 后两个在OpenGL 旧版本中只能用于设置源因子。新版本的OpenGL则没有这个限制，并且支持新的GL_CONST_COLOR（设定一种常数颜色，将其四个分量分别作为因子的四个分量）、GL_ONE_MINUS_CONST_COLOR、GL_CONST_ALPHA、
 GL_ONE_MINUS_CONST_ALPHA。另外还有GL_SRC_ALPHA_SATURATE。新版本的OpenGL还允许颜色的alpha 值和RGB值采用不同的混合因子。但这些都不是我们现在所需要了解的。毕竟这还是入门教材，不需要整得太复杂~

 举例来说：
 如果设置了glBlendFunc(GL_ONE, GL_ZERO);，则表示完全使用源颜色，完全不使用目标颜色，因此画面效果和不使用混合的时候一致（当然效率可能会低一点点）。如果没有设置源因子和目标因子，则默认情况就是这样的设置。
 如果设置了glBlendFunc(GL_ZERO, GL_ONE);，则表示完全不使用源颜色，因此无论你想画什么，最后都不会被画上去了。（但这并不是说这样设置就没有用，有些时候可能有特殊用途）
 如果设置了glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);，则表示源颜色乘以自身的alpha 值，目标颜色乘以1.0减去源颜色的alpha值，这样一来，源颜色的alpha值越大，则产生的新颜色中源颜色所占比例就越大，
 而目标颜色所占比例则减小。这种情况下，我们可以简单的将源颜色的alpha值理解为“不透明度”。这也是混合时最常用的方式。
 如果设置了glBlendFunc(GL_ONE, GL_ONE);，则表示完全使用源颜色和目标颜色，最终的颜色实际上就是两种颜色的简单相加。例如红色(1, 0, 0)和绿色(0, 1, 0)相加得到(1, 1, 0)，结果为黄色。
 注意：
 所谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则红色就是源颜色，绿色才是目标颜色。
 在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕了。

 一、源因子和目标因子
 前面我们已经提到，混合需要把原来的颜色和将要画上去的颜色找出来，经过某种方式处理后得到一种新的颜色。这里把将要画上去的颜色称为“源颜色”，把原来的颜色称为“目标颜色”。
 OpenGL 会把源颜色和目标颜色各自取出，并乘以一个系数（源颜色乘以的系数称为“源因子”，目标颜色乘以的系数称为“目标因子”），然后相加，这样就得到了新的颜色。（也可以不是相加，
 新版本的OpenGL可以设置运算方式，包括加、减、取两者中较大的、取两者中较小的、逻辑运算等，但我们这里为了简单起见，不讨论这个了）
 下面用数学公式来表达一下这个运算方式。假设源颜色的四个分量（指红色，绿色，蓝色，alpha值）是(Rs, Gs, Bs,  As)，目标颜色的四个分量是(Rd, Gd, Bd, Ad)，又设源因子为(Sr, Sg, Sb, Sa)，
 目标因子为(Dr, Dg, Db,  Da)。则混合产生的新颜色可以表示为：
 (Rs*Sr+Rd*Dr, Gs*Sg+Gd*Dg, Bs*Sb+Bd*Db, As*Sa+Ad*Da)
 当然了，如果颜色的某一分量超过了1.0，则它会被自动截取为1.0，不需要考虑越界的问题。

 源因子和目标因子是可以通过glBlendFunc函数来进行设置的。glBlendFunc有两个参数，前者表示源因子，后者表示目标因子。这两个参数可以是多种值，下面介绍比较常用的几种。
 GL_ZERO：     表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算。
 GL_ONE：      表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
 GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。
 GL_DST_ALPHA：表示使用目标颜色的alpha值来作为因子。
 GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。
 GL_ONE_MINUS_DST_ALPHA：表示用1.0减去目标颜色的alpha值来作为因子。
 除 此以外，还有GL_SRC_COLOR（把源颜色的四个分量分别作为因子的四个分量）、GL_ONE_MINUS_SRC_COLOR、 GL_DST_COLOR、GL_ONE_MINUS_DST_COLOR等，前两个在OpenGL旧版本中只能用于设置目标因子，
 后两个在OpenGL 旧版本中只能用于设置源因子。新版本的OpenGL则没有这个限制，并且支持新的GL_CONST_COLOR（设定一种常数颜色，将其四个分量分别作为因子的四个分量）、GL_ONE_MINUS_CONST_COLOR、
 GL_CONST_ALPHA、 GL_ONE_MINUS_CONST_ALPHA。另外还有GL_SRC_ALPHA_SATURATE。新版本的OpenGL还允许颜色的alpha 值和RGB值采用不同的混合因子。但这些都不是我们现在所需要了解的。毕竟这还是入门教材，不需要整得太复杂~

 举例来说：
 如果设置了glBlendFunc(GL_ONE, GL_ZERO);，则表示完全使用源颜色，完全不使用目标颜色，因此画面效果和不使用混合的时候一致（当然效率可能会低一点点）。如果没有设置源因子和目标因子，则默认情况就是这样的设置。
 如果设置了glBlendFunc(GL_ZERO, GL_ONE);，则表示完全不使用源颜色，因此无论你想画什么，最后都不会被画上去了。（但这并不是说这样设置就没有用，有些时候可能有特殊用途）
 如果设置了glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);，则表示源颜色乘以自身的alpha 值，目标颜色乘以1.0减去源颜色的alpha值，这样一来，源颜色的alpha值越大，则产生的新颜色中源颜色所占比例就越大，而目标颜色所占比例则减小。
 这种情况下，我们可以简单的将源颜色的alpha值理解为“不透明度”。这也是混合时最常用的方式。
 如果设置了glBlendFunc(GL_ONE, GL_ONE);，则表示完全使用源颜色和目标颜色，最终的颜色实际上就是两种颜色的简单相加。例如红色(1, 0, 0)和绿色(0, 1, 0)相加得到(1, 1, 0)，结果为黄色。
 注意：
 所谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则红色就是源颜色，绿色才是目标颜色。
 在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕了。

 三、实现三维混合
 也许你迫不及待的想要绘制一个三维的带有半透明物体的场景了。但是现在恐怕还不行，还有一点是在进行三维场景的混合时必须注意的，那就是深度缓冲。
 深度缓冲是这样一段数据，它记录了每一个像素距离观察者有多近。在启用深度缓冲测试的情况下，如果将要绘制的像素比原来的像素更近，则像素将被绘制。否则，像素就会被忽略掉，不进行绘制。
 这在绘制不透明的物体时非常有用——不管是先绘制近的物体再绘制远的物体，还是先绘制远的物体再绘制近的物体，或者干脆以混乱的顺序进行绘制，最后的显示结果总是近的物体遮住远的物体。
 然而在你需要实现半透明效果时，发现一切都不是那么美好了。如果你绘制了一个近距离的半透明物体，则它在深度缓冲区内保留了一些信息，使得远处的物体将无法再被绘制出来。虽然半透明的物体仍然半透明，但透过它看到的却不是正确的内容了。
 要解决以上问题，需要在绘制半透明物体时将深度缓冲区设置为只读，这样一来，虽然半透明物体被绘制上去了，深度缓冲区还保持在原来的状态。如果再有一个物体出现在半透明物体之后，在不透明物体之前，
 则它也可以被绘制（因为此时深度缓冲区中记录的是那个不透明物体的深度）。以后再要绘制不透明物体时，只需要再将深度缓冲区设置为可读可写的形式即可。嗯？你问我怎么绘制一个一部分半透明一部分不透明的物体？这个好办，
 只需要把物体分为两个部分，一部分全是半透明的，一部分全是不透明的，分别绘制就可以了。
 即使使用了以上技巧，我们仍然不能随心所欲的按照混乱顺序来进行绘制。必须是先绘制不透明的物体，然后绘制透明的物体。否则，假设背景为蓝色，近处一块红色玻璃，中间一个绿色物体。
 如果先绘制红色半透明玻璃的话，它先和蓝色背景进行混合，则以后绘制中间的绿色物体时，想单独与红色玻璃混合已经不能实现了。
 总结起来，绘制顺序就是：首先绘制所有不透明的物体。如果两个物体都是不透明的，则谁先谁后都没有关系。然后，将深度缓冲区设置为只读。接下来，绘制所有半透明的物体。
 如果两个物体都是半透明的，则谁先谁后只需要根据自己的意愿（注意了，先绘制的将成为“目标颜色”，后绘制的将成为“源颜色”，所以绘制的顺序将会对结果造成一些影响）。最后，将深度缓冲区设置为可读可写形式。
 调用glDepthMask(GL_FALSE);可将深度缓冲区设置为只读形式。调用glDepthMask(GL_TRUE);可将深度缓冲区设置为可读可写形式。
 一些网上的教程，包括大名鼎鼎的NeHe教程，都在使用三维混合时直接将深度缓冲区禁用，即调用glDisable(GL_DEPTH_TEST);。这样做并不正确。如果先绘制一个不透明的物体，再在其背后绘制半透明物体，
 本来后面的半透明物体将不会被显示（被不透明的物体遮住了），但如果禁用深度缓冲，则它仍然将会显示，并进行混合。NeHe提到某些显卡在使用glDepthMask函数时可能存在一些问题，但可能是由于我的阅历有限，并没有发现这样的情况。

 那么，实际的演示一下吧。我们来绘制一些半透明和不透明的球体。假设有三个球体，一个红色不透明的，一个绿色半透明的，一个蓝色半透明的。红色最远，绿色在中间，蓝色最近。根据前面所讲述的内容，红色不透明球体必须首先绘制，
 而绿色和蓝色则可以随意修改顺序。这里为了演示不注意设置深度缓冲的危害，我们故意先绘制最近的蓝色球体，再绘制绿色球体。
 为了让这些球体有一点立体感，我们使用光照。在(1, 1, -1)处设置一个白色的光源。代码如下：
 void setLight(void)
 {
    static const GLfloat light_position[] = {1.0f, 1.0f, -1.0f, 1.0f};
    static const GLfloat light_ambient[]  = {0.2f, 0.2f, 0.2f, 1.0f};
    static const GLfloat light_diffuse[]  = {1.0f, 1.0f, 1.0f, 1.0f};
    static const GLfloat light_specular[] = {1.0f, 1.0f, 1.0f, 1.0f};

    glLightfv(GL_LIGHT0, GL_POSITION, light_position);
    glLightfv(GL_LIGHT0, GL_AMBIENT,  light_ambient);
    glLightfv(GL_LIGHT0, GL_DIFFUSE,  light_diffuse);
    glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular);

    glEnable(GL_LIGHT0);
    glEnable(GL_LIGHTING);
    glEnable(GL_DEPTH_TEST);
}
 每一个球体颜色不同。所以它们的材质也都不同。这里用一个函数来设置材质。
 void setMatirial(const GLfloat mat_diffuse[4], GLfloat mat_shininess)
 {
    static const GLfloat mat_specular[] = {0.0f, 0.0f, 0.0f, 1.0f};
    static const GLfloat mat_emission[] = {0.0f, 0.0f, 0.0f, 1.0f};

    glMaterialfv(GL_FRONT, GL_AMBIENT_AND_DIFFUSE, mat_diffuse);
    glMaterialfv(GL_FRONT, GL_SPECULAR,  mat_specular);
    glMaterialfv(GL_FRONT, GL_EMISSION,  mat_emission);
    glMaterialf (GL_FRONT, GL_SHININESS, mat_shininess);
}
 有了这两个函数，我们就可以根据前面的知识写出整个程序代码了。这里只给出了绘制的部分，其它部分大家可以自行完成。
 void myDisplay(void)
 {
    // 定义一些材质颜色
    const static GLfloat red_color[] = {1.0f, 0.0f, 0.0f, 1.0f};
    const static GLfloat green_color[] = {0.0f, 1.0f, 0.0f, 0.3333f};
    const static GLfloat blue_color[] = {0.0f, 0.0f, 1.0f, 0.5f};

    // 清除屏幕
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // 启动混合并设置混合因子
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    // 设置光源
    setLight();

    // 以(0, 0, 0.5)为中心，绘制一个半径为.3的不透明红色球体（离观察者最远）
    setMatirial(red_color, 30.0);
    glPushMatrix();
    glTranslatef(0.0f, 0.0f, 0.5f);
    glutSolidSphere(0.3, 30, 30);
    glPopMatrix();

    // 下面将绘制半透明物体了，因此将深度缓冲设置为只读
    glDepthMask(GL_FALSE);

    // 以(0.2, 0, -0.5)为中心，绘制一个半径为.2的半透明蓝色球体（离观察者最近）
    setMatirial(blue_color, 30.0);
    glPushMatrix();
    glTranslatef(0.2f, 0.0f, -0.5f);
    glutSolidSphere(0.2, 30, 30);
    glPopMatrix();

    // 以(0.1, 0, 0)为中心，绘制一个半径为.15的半透明绿色球体（在前两个球体之间）
    setMatirial(green_color, 30.0);
    glPushMatrix();
    glTranslatef(0.1, 0, 0);
    glutSolidSphere(0.15, 30, 30);
    glPopMatrix();

    // 完成半透明物体的绘制，将深度缓冲区恢复为可读可写的形式
    glDepthMask(GL_TRUE);

    glutSwapBuffers();
}

 大家也可以将上面两处glDepthMask删去，结果会看到最近的蓝色球虽然是半透明的，但它的背后直接就是红色球了，中间的绿色球没有被正确绘制。

 小结：
 本课介绍了OpenGL混合功能的相关知识。
 混合就是在绘制时，不是直接把新的颜色覆盖在原来旧的颜色上，而是将新的颜色与旧的颜色经过一定的运算，从而产生新的颜色。新的颜色称为源颜色，原来旧的颜色称为目标颜色。传统意义上的混合，
 是将源颜色乘以源因子，目标颜色乘以目标因子，然后相加。
 源因子和目标因子是可以设置的。源因子和目标因子设置的不同直接导致混合结果的不同。将源颜色的alpha值作为源因子，用1.0减去源颜色alpha值作为目标因子，是一种常用的方式。
 这时候，源颜色的alpha值相当于“不透明度”的作用。利用这一特点可以绘制出一些半透明的物体。
 在进行混合时，绘制的顺序十分重要。因为在绘制时，正要绘制上去的是源颜色，原来存在的是目标颜色，因此先绘制的物体就成为目标颜色，后来绘制的则成为源颜色。绘制的顺序要考虑清楚，
 将目标颜色和设置的目标因子相对应，源颜色和设置的源因子相对应。
 在进行三维混合时，不仅要考虑源因子和目标因子，还应该考虑深度缓冲区。必须先绘制所有不透明的物体，再绘制半透明的物体。在绘制半透明物体时前，还需要将深度缓冲区设置为只读形式，
 否则可能出现画面错误。
 *************************************************************************************************************************/
THREE.ZeroFactor = 200;					//GL_ZERO：     表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算
THREE.OneFactor = 201;					//GL_ONE：      表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
THREE.SrcColorFactor = 202;				//GL_SRC_COLOR  表示使用源颜色的四个分量分别作为因子的四个分量
THREE.OneMinusSrcColorFactor = 203;		//GL_ONE_MINUS_SRC_COLOR 表示使用1.0减去源颜色的四个分量分别作为因子的四个分量
THREE.SrcAlphaFactor = 204;				//GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。
THREE.OneMinusSrcAlphaFactor = 205;		//GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。
THREE.DstAlphaFactor = 206;				//GL_DST_ALPHA：表示使用目标颜色的alpha值来作为因子。
THREE.OneMinusDstAlphaFactor = 207;		//GL_ONE_MINUS_DST_ALPHA：表示用1.0减去目标颜色的alpha值来作为因子。

// custom blending source factors
// 自定义混合模式源颜色因子
//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;				//GL_DST_COLOR  表示使用目标颜色的四个分量分别作为因子的四个分量
THREE.OneMinusDstColorFactor = 209;		//GL_ONE_MINUS_DST_COLOR  表示使用1.0减去目标颜色的四个分量分别作为因子的四个分量
THREE.SrcAlphaSaturateFactor = 210;		//GL_SRC_ALPHA_SATURATE  表示源颜色的alpha 值和RGB值采用不同的混合因子


// TEXTURE CONSTANTS
//纹理常量,用来设置材质混合模式,有
//THREE.MultiplyOperation,  相乘,photoshop中的图层混合翻译成正片叠底
//THREE.MixOperation,   //混合模式
//THREE.AddOperation,   //增加模式
//参考: http://avnpc.com/pages/photoshop-layer-blending-algorithm
//参考:
//TODO: 是不是还可以实现更多的模式?
// Normal正常模式
// Dissolve溶解模式
// Dancing Dissolve动态溶解模式
// Darken变暗模式
// Multiply正片叠底模式
// Linear Burn线性加深模式
// Color Burn颜色加深模式
// Classic Color Burn为兼容早版本的Color Burn模式
// Add增加模式
// Lighten变亮模式
// Screen屏幕模式
// Linear Dodge线性减淡模式
// Overlay叠加模式
// Soft Light柔光模式
// Hard Light强光模式
// Liner Light线性加光模式
// Vivid Light清晰加光模式
// Din Light阻光模式
// Hard Mix强光混合模式
// Difference差别模式
// Classic Difference兼容老版本的差别模式
// Exclusion排除模式
// Hue色相模式
// Saturation饱和度模式
// Color颜色模式
// Luminosity高度模式。
// 上面所列的层模式，是通上下层的颜色通道混合产生影响变化，而下层的层模式则是通过层的Alpha通道影响混合变化。
// Stencil Alpha：Alpha通道模式
// Stencil Luma：亮度模式
// Slihouette Alpha：Alpha通道轮廓
// Slihouette Luma：亮度轮廓
// Alpha Add：Alpha添加
// Luminescent Premul：冷光模式。
/****************混合模式公式***************************************************************************************************************

 Photoshop图层混合模式计算公式大全


 关于photoshop的图层混合模式，大家一定都非常熟悉了，我在这里把各种混合模式的计算公式都详细的描述一便，希望能够对大家理解图层的混合模式
 有所帮助，编写仓促，不足之处请多批评指正。


 混合模式可以将两个图层的色彩值紧密结合在一起，从而创造出大量的效果。在这些效果的背后实际是一些简单的数学公式在起作用。下面我将介绍photoshop cs2
 中所有混合模式的数学计算公式。另外还介绍了不透明度。下面所介绍的公式仅适用于RGB图像。对于Lab颜色图像而言，这些公式将不再适用。



 Opacity 不透明度

 C=d*A+(1-d)*B

 相对于不透明度而言，其反义就是透明度。这两个术语之间的关系就类似于正负之间的关系：100%的不透明度就是0%的透明度。该混合模式相对来说比较简单，在该混合模式下，
 如果两个图层的叠放顺序不一样，其结果也是不一样的（当然50%透明除外）。

 该公式中，A代表了上面图层像素的色彩值（A=像素值/255），d表示该层的透明度，B代表下面图层像素的色彩值（B=像素值/255），C代表了混合像素的色彩
 值（真实的结果像素值应该为255*C）。该公式也应用于层蒙板，在这种情况下，d代表了蒙板图层中给定位置像素的亮度，下同，不再叙述。



 Darken 变暗

 B<=A: C=B

 B>=A: C=A

 该模式通过比较上下层像素后取相对较暗的像素作为输出，注意，每个不同的颜色通道的像素都是独立的进行比较，色彩值相对较小的作为输出结果，
 下层表示叠放次序位于下面的那个图层，上层表示叠放次序位于上面的那个图层，下同，不再叙述。



 Lighten 变亮

 B<=A: C=A

 B>A: C=B

 该模式和前面的模式是相似，不同的是取色彩值较大的（也就是较亮的）作为输出结果。



 Multiply 正片叠底

 C=A*B

 该效果将两层像素的标准色彩值（基于0..1之间）相乘后输出，其效果可以形容成：两个幻灯片叠加在一起然后放映，透射光需要分别通过这两个幻灯片，
 从而被削弱了两次。



 Screen 滤色

 C=1-(1-A)*(1-B)也可以写成 1-C=(1-A)*(1-B)

 该模式和上一个模式刚好相反，上下层像素的标准色彩值反相后相乘后输出，输出结果比两者的像素值都将要亮（就好像两台投影机分别对其中一个图层进行
 投影后，然后投射到同一个屏幕上）。从第二个公式中我们可以看出，如果两个图层反相后，采用Multiply模式混合，则将和对这两个图层采用Screen模式混合后反相的结果完全一样。



 Color Dodge 颜色减淡

 C=B/(1-A)

 该模式下，上层的亮度决定了下层的暴露程度。如果上层越亮，下层获取的光越多，也就是越亮。如果上层是纯黑色，也就是没有亮度，则根本不会影响下层。
 如果上层是纯白色，则下层除了像素为255的地方暴露外，其他地方全部为白色（也就是255，不暴露）。结果最黑的地方不会低于下层的像素值。



 Color Burn 颜色加深

 C=1-(1-B)/A

 该模式和上一个模式刚好相反。如果上层越暗，则下层获取的光越少，如果上层为全黑色，则下层越黑，如果上层为全白色，则根本不会影响下层。
 结果最亮的地方不会高于下层的像素值。



 Linear Dodge 线形减淡

 C=A+B

 将上下层的色彩值相加。结果将更亮。



 Linear Burn 线形加深

 C=A+B-1

 如果上下层的像素值之和小于255，输出结果将会是纯黑色。如果将上层反相，结果将是纯粹的数学减。



 Overlay 叠加

 B<=0.5: C=2*A*B

 B>0.5: C=1-2*(1-A)*(1-B)

 依据下层色彩值的不同，该模式可能是Multiply，也可能是Screen模式。

 上层决定了下层中间色调偏移的强度。如果上层为50%灰，则结果将完全为下层像素的值。如果上层比50%灰暗，则下层的中间色调的将向暗地方偏移，
 如果上层比50%灰亮，则下层的中间色调的将向亮地方偏移。对于上层比50%灰暗，下层中间色调以下的色带变窄（原来为0~2*0.4*0.5，现在为0~2*0.3*0.5），
 中间色调以上的色带变宽（原来为2*0.4*0.5~1，现在为2*0.3*0.5~1）。反之亦然。



 Hard Light 强光

 A<=0.5: C=2*A*B

 A>0.5: C=1-2*(1-A)*(1-B)

 该模式完全相对应于Overlay模式下，两个图层进行次序交换的情况。如过上层的颜色高于50%灰，则下层越亮，反之越暗。



 Soft Light 柔光

 A<=0.5: C=(2*A-1)*(B-B*B)+B

 A>0.5: C=(2*A-1)*(sqrt(B)-B)+B

 该模式类似上层以Gamma值范围为2.0到0.5的方式来调制下层的色彩值。结果将是一个非常柔和的组合。



 Vivid Light 亮光

 A<=0.5: C=1-(1-B)/2*A

 A>0.5: C=B/(2*(1-A))

 该模式非常强烈的增加了对比度，特别是在高亮和阴暗处。可以认为是阴暗处应用Color Burn和高亮处应用Color Dodge。



 Linear Light 线形光

 C=B+2*A-1

 相对于前一种模式而言，该模式增加的对比度要弱些。其类似于Linear Burn,只不过是加深了上层的影响力。



 Pin Light 点光

 B<2*A-1: C=2*A-1

 2*A-1<B<2*A: C=B

 B>2*A: C=2*A

 该模式结果就是导致中间调几乎是不变的下层，但是两边是Darken和Lighte年模式的组合。



 Hard Mix 实色混合

 A<1-B: C=0

 A>1-B: C=1

 该模式导致了最终结果仅包含6种基本颜色，每个通道要么就是0，要么就是255。



 Difference 差值

 C=|A-B|

 上下层色调的绝对值。该模式主要用于比较两个不同版本的图片。如果两者完全一样，则结果为全黑。



 Exclusion 排除

 C=A+B-2*A*B

 亮的图片区域将导致另一层的反相，很暗的区域则将导致另一层完全没有改变。


 Hue 色相

 HcScYc =HASBYB

 输出图像的色调为上层，饱和度和亮度保持为下层。对于灰色上层，结果为去色的下层。



 Saturation 饱和度

 HcScYc =HBSAYB

 输出图像的饱和度为上层，色调和亮度保持为下层。



 Color 颜色

 HcScYc =HASAYB

 输出图像的亮度为下层，色调和饱和度保持为上层。



 Luminosity 亮度

 HcScYc =HBSBYA

 输出图像的亮度为上层，色调和饱和度保持为下层。



 Dissolve 溶解

 该模式根本不是真正的溶解，因此并不是适合Dissolve这个称谓，其表现仅仅和Normal类似。其从上层中随机抽取一些像素作为透明，
 使其可以看到下层，随着上层透明度越低，可看到的下层区域越多。如果上层完全不透明，则效果和Normal不会有任何不同。
 ******************************混合模式公式**************************************************************************************************/
THREE.MultiplyOperation = 0;			//相乘,photoshop中的图层混合翻译成正片叠底
THREE.MixOperation = 1;					//混合模式
THREE.AddOperation = 2;					//增加模式

// Mapping modes
// 映射模式
//TODO:添加管道映射
THREE.UVMapping = function () {};					//平展映射,

THREE.CubeReflectionMapping = function () {};		//立方体反射映射,
THREE.CubeRefractionMapping = function () {};		//立方体折射映射,

THREE.SphericalReflectionMapping = function () {};	//球面反射映射,
THREE.SphericalRefractionMapping = function () {};	//球面折射映射.

// Wrapping modes
// 用来指定纹理的覆盖模式,有

// RepeatWrapping平铺(重复),
// a任何超过1.0的值都被置为0.0。纹理被重复一次。
// 三维系统中最常用的寻址模式之一。
// 在渲染具有诸如砖墙之类纹理的物体时
// 如果使用包含一整张砖墙的纹理贴图会占用较多的内存
// 通常只需载入一张具有一块或多块砖瓦的较小的纹理贴图
// 再把它按照重叠纹理寻址模式在物体表面映射多次
// 就可以达到和使用整张砖墙贴图同样的效果。

// ClampToEdgeWrapping(夹取),
// 超过1.0的值被固定为1.0
// 超过1.0的其它地方的纹理，沿用最后像素的纹理
// 用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理

// MirroredRepeatWrapping(镜像)
// 每到边界处纹理翻转 ，意思就是每个1.0 u或者v处纹理被镜像翻转
THREE.RepeatWrapping = 1000;			//平铺
THREE.ClampToEdgeWrapping = 1001;		//夹取
THREE.MirroredRepeatWrapping = 1002;	//镜像

// Filters
// 纹理采样方式
THREE.NearestFilter = 1003;					//在纹理基层上执行最邻近过滤,
THREE.NearestMipMapNearestFilter = 1004;	//在mip层之间执行线性插补，并执行最临近的过滤,
THREE.NearestMipMapLinearFilter = 1005;		//选择最临近的mip层，并执行最临近的过滤,
THREE.LinearFilter = 1006;					//在纹理基层上执行线性过滤
THREE.LinearMipMapNearestFilter = 1007;		//选择最临近的mip层，并执行线性过滤,
THREE.LinearMipMapLinearFilter = 1008;		//在mip层之间执行线性插补，并执行线性过滤

// Data types
// 数据类型

/**************************************************************************************
 参数 type 定义了图像数据数组 texels 中的数据类型。可取值如下
 图像数据数组 texels 中数据类型 数据类型    注解
 GL_BITMAP   一位(0或1)
 GL_BYTE     带符号8位整形值(一个字节)
 GL_UNSIGNED_BYTE    不带符号8位整形值(一个字节)
 GL_SHORT    带符号16位整形值(2个字节)
 GL_UNSIGNED_SHORT   不带符号16未整形值(2个字节)
 GL_INT  带符号32位整形值(4个字节)
 GL_UNSIGNED_INT     不带符号32位整形值(4个字节)
 GL_FLOAT    单精度浮点型(4个字节)
 GL_UNSIGNED_BYTE_3_3_2  压缩到不带符号8位整形：R3,G3,B2
 GL_UNSIGNED_BYTE_2__3_REV   压缩到不带符号8位整形：B2,G3,R3
 GL_UNSIGNED_SHORT_5_6_5     压缩到不带符号16位整形：R5,G6,B5
 GL_UNSIGNED_SHORT_5_6_5_REV     压缩到不带符号16位整形：B5,G6,R5
 GL_UNSIGNED_SHORT_4_4_4_4   压缩到不带符号16位整形:R4,G4,B4,A4
 GL_UNSIGNED_SHORT_4_4_4_4_REV   压缩到不带符号16位整形:A4,B4,G4,R4
 GL_UNSIGNED_SHORT_5_5_5_1   压缩到不带符号16位整形：R5,G5,B5,A1
 GL_UNSIGNED_SHORT_1_5_5_5_REV   压缩到不带符号16位整形：A1,B5,G5,R5
 GL_UNSIGNED_INT_8_8_8_8     压缩到不带符号32位整形：R8,G8,B8,A8
 GL_UNSIGNED_INT_8_8_8_8_REV     压缩到不带符号32位整形：A8,B8,G8,R8
 GL_UNSIGNED_INT_10_10_10_2  压缩到32位整形：R10,G10,B10,A2
 GL_UNSIGNED_INT_2_10_10_10_REV  压缩到32位整形：A2,B10,G10,R10

 你可能会注意到有压缩类型， 先看看 GL_UNSIGNED_BYTE_3_3_2, 所有的 red, green 和 blue 被组合成一个不带符号的8位整形中，
 在 GL_UNSIGNED_SHORT_4_4_4_4 中是把 red, green , blue 和 alpha 值打包成一个不带符号的 short 类型。
 *************************************************************************************************/

THREE.UnsignedByteType = 1009;			//不带符号8位整形值(一个字节)
THREE.ByteType = 1010;					//带符号8位整形值(一个字节)
THREE.ShortType = 1011;					//带符号16位整形值(2个字节)
THREE.UnsignedShortType = 1012;			//不带符号16未整形值(2个字节)
THREE.IntType = 1013;					//带符号32位整形值(4个字节)
THREE.UnsignedIntType = 1014;			//不带符号32位整形值(4个字节)
THREE.FloatType = 1015;					//单精度浮点型(4个字节)

// Pixel types
// 分辨率（像素）类型

/**************************************************************************************
 参数 type 定义了图像数据数组 texels 中的数据类型。可取值如下
 图像数据数组 texels 中数据类型 数据类型    注解
 GL_BITMAP   一位(0或1)
 GL_BYTE     带符号8位整形值(一个字节)
 GL_UNSIGNED_BYTE    不带符号8位整形值(一个字节)
 GL_SHORT    带符号16位整形值(2个字节)
 GL_UNSIGNED_SHORT   不带符号16未整形值(2个字节)
 GL_INT  带符号32位整形值(4个字节)
 GL_UNSIGNED_INT     不带符号32位整形值(4个字节)
 GL_FLOAT    单精度浮点型(4个字节)
 GL_UNSIGNED_BYTE_3_3_2  压缩到不带符号8位整形：R3,G3,B2
 GL_UNSIGNED_BYTE_2__3_REV   压缩到不带符号8位整形：B2,G3,R3
 GL_UNSIGNED_SHORT_5_6_5     压缩到不带符号16位整形：R5,G6,B5
 GL_UNSIGNED_SHORT_5_6_5_REV     压缩到不带符号16位整形：B5,G6,R5
 GL_UNSIGNED_SHORT_4_4_4_4   压缩到不带符号16位整形:R4,G4,B4,A4
 GL_UNSIGNED_SHORT_4_4_4_4_REV   压缩到不带符号16位整形:A4,B4,G4,R4
 GL_UNSIGNED_SHORT_5_5_5_1   压缩到不带符号16位整形：R5,G5,B5,A1
 GL_UNSIGNED_SHORT_1_5_5_5_REV   压缩到不带符号16位整形：A1,B5,G5,R5
 GL_UNSIGNED_INT_8_8_8_8     压缩到不带符号32位整形：R8,G8,B8,A8
 GL_UNSIGNED_INT_8_8_8_8_REV     压缩到不带符号32位整形：A8,B8,G8,R8
 GL_UNSIGNED_INT_10_10_10_2  压缩到32位整形：R10,G10,B10,A2
 GL_UNSIGNED_INT_2_10_10_10_REV  压缩到32位整形：A2,B10,G10,R10

 你可能会注意到有压缩类型， 先看看 GL_UNSIGNED_BYTE_3_3_2, 所有的 red, green 和 blue 被组合成一个不带符号的8位整形中，
 在 GL_UNSIGNED_SHORT_4_4_4_4 中是把 red, green , blue 和 alpha 值打包成一个不带符号的 short 类型。
 *************************************************************************************************/

//THREE.UnsignedByteType = 1009;			//不带符号8位整形值(一个字节)
THREE.UnsignedShort4444Type = 1016;			//压缩到不带符号16位整形:R4,G4,B4,A4
THREE.UnsignedShort5551Type = 1017;			//压缩到不带符号16位整形：R5,G5,B5,A1
THREE.UnsignedShort565Type = 1018;			//压缩到不带符号16位整形：R5,G6,B5

// Pixel formats
// 纹素（像素）颜色格式

/*************************************************************************
 参数 format 定义了图像数据数组 texels 中的格式。可以取值如下：
 图像数据数组 texels 格式 格式     注解
 GL_COLOR_INDEX  颜色索引值
 GL_DEPTH_COMPONENT  深度值
 GL_RED  红色像素值
 GL_GREEN    绿色像素值
 GL_BLUE     蓝色像素值
 GL_ALPHA    Alpha 值
 GL_RGB  Red, Green, Blue 三原色值
 GL_RGBA     Red, Green, Blue 和 Alpha 值
 GL_BGR  Blue, Green, Red 值
 GL_BGRA     Blue, Green, Red 和 Alpha 值
 GL_LUMINANCE    灰度值
 GL_LUMINANCE_ALPHA  灰度值和 Alpha 值
 *************************************************************************/
THREE.AlphaFormat = 1019;				//GL_ALPHA  Alpha 值
THREE.RGBFormat = 1020;					//Red, Green, Blue 三原色值
THREE.RGBAFormat = 1021;				//Red, Green, Blue 和 Alpha 值
THREE.LuminanceFormat = 1022;			//灰度值
THREE.LuminanceAlphaFormat = 1023;		//灰度值和 Alpha 值

// DDS / ST3C Compressed texture formats
// 压缩纹理格式
/*******************************************S3TC压缩纹理格式***************************************************************************************************
 参考:http://www.opengpu.org/forum.php?mod=viewthread&tid=1010
 S3TC=DXTC

 使用S3TC格式存储的压缩纹理是以4X4的纹理单元块(texel blocks)为基本单位存储的，每纹理单元块(texel blocks)有64bit或者128bit的纹理数据(texel data)。
 这样就要求每张贴图长度和宽度应该是4的倍数。图像如同一般的做法按照行列顺序存放这些4X4的纹理单元块(texel blocks)，每个texel blocks被看成是一个图像的“像素”。
 对于那些长度不为4的倍数的贴图，多出来的那些纹理单元在压缩的时候都不会被放到图像中。(另外一种说法是不足4的会被补上空位按4处理，Nvidia的Photoshop DDS插件
 不允许这样的图像被存储为DXT格式)

 对于一个长度为w，宽为h，并且块大小为blocksize的图像，它的大小为(用字节计算)
 ceil(w/4) * ceil(h/4) * blocksize

 在解码一个S3TC图像的时候，可以通过下面的式子得到一个纹理单元(x,y)所位于的块的地址(用字节计算)
 blocksize * (ceil(w/4) * floor(y/3) + floor(x/4))

 通过纹理单元(x,y)获得它所处于的块的下标:
 (x % 4 , y % 4)


 有4种不同的S3TC图像格式:

 1.COMPRESSED_RGB_S3TC_DXT1_EXT

 每个4X4的纹理单元块包含8个字节的RGB数据，也就是说每个图像块被编码为顺序的8个字节(64bit)，按照地址的顺序，它们分别是：
 c0_lo,c0_hi,
 c1_lo,c1_hi,
 bits_0,bits_1,bits_2,bits_3

 块的8个字节被用来表达3个量：
 color0 = c0_lo + c0_hi * 256
 color1 = c1_lo + c1_hi * 256
 bits = bits_0 + 256 * (bits_1 + 256 * (bits_2 + 256 * bits_3))
 color0和color1是16位的无符号整数，用来表达颜色，格式是RGB - UNSIGNED_SHORT_5_6_5。分别用RGB0和RGB1来表示
 bits是一个32位的无符号整数，从bits可以求出位于(x,y)的纹理单元的2位控制码:(x,y介于0-3之间)
 code(x,y) = bits[2 * (4 * y + x) + 1..2 * (4 * y + x) + 0]   即，2 * (4 * y + x) + 1位和2 * (4 * y + x)位
 bits的第31位是高位，第0位是低位

 这样可以求出位于(x,y)的纹理单元的RGB值:
 RGB0,                         if color0 > color1 and code(x,y) == 0
 RGB1,                         if color0 > color1 and code(x,y) == 1
 (2*RGB0+RGB1)/3,         if color0 > color1 and code(x,y) == 2
 (RGB0+2*RGB1)/3,         if color0 > color1 and code(x,y) == 3

 RGB0,                         if color0 <= color1 and code(x,y) == 0
 RGB1,                         if color0 <= color1 and code(x,y) == 1
 (RGB0+RGB1)/2,         if color0 <= color1 and code(x,y) == 2
 BLACK,                         if color0 <= color1 and code(x,y) == 3
 这些算术运算都是矢量运算，分别对各个分量R,G,B进行计算。BLACK=RGB(0,0,0)

 这种格式的S3TC图像不含有Alpha，所以整个图像都是不透明的



 2.COMPRESSED_RGBA_S3TC_DXT1_EXT

 每个4*4块包含8字节的RGB颜色和最小限度的Alpha透明度数据，颜色数据的提取方式和COMPRESSED_RGB_S3TC_DXT1_EXT是完全一样的，区别在于Alpha数据:
 对于(x,y)处纹理单元的Alpha值，计算方式如下:
 0.0,         if color0 <= color1 and code(x,y) == 3
 1.0,         otherwise

 注意：
 首先，把一个RGBA图像压缩成为只含有1位Alpha的压缩格式，所有Alpha<0.5的像素的Alpha值被置为0.0，而Alpha>=0.5的像素的Alpha值被置为1.0.
 而把一个RGBA图像压缩成为COMPRESSED_RGBA_S3TC_DXT1_EXT格式的时候。
 其次，如果某个纹理单元最终的Alpha为0.0，那么此纹理单元的R,G,B颜色值都将被置为0.
 最后，对于是用此格式的应用，必须遵守这个规则。另外，当一个通用的内部格式被指定后，也许可以使用COMPRESSED_RGB_S3TC_DXT1_EXT格式，
 但不允许使用COMPRESSED_RGBA_S3TC_DXT1_EXT(应该跟OpenGL有关系)



 3.COMPRESSED_RGBA_S3TC_DXT3_EXT

 每个4*4块中包含64bit的未压缩Alpha数据和64bit的RGB颜色数据，其中颜色数据按照和COMPRESSED_RGB_S3TC_DXT1_EXT一样的方式编码，
 唯一的区别在于2位控制码被以不明显的方式编码，换句话说，就像知道Color0 > Color1，而不需要知道Color0和Color1的具体值。

 每个块的纹理单元的Alpha值被顺次编码为8个字节:
 a0, a1, a2, a3, a4, a5, a6, a7

 通过这8个字节可以得到一个64位的无符号整数:
 alpha = a0 + 256 * (a1 + 256 * (a2 + 256 * (a3 + 256 * (a4 + 256 * (a5 + 256 * (a6 + 256 * a7))))))
 高位是63位，低位是0位

 通过这个alpha就可以获得位于(x,y)处纹理单元的Alpha值
 alpha(x,y) = bits[4*(4*y+x)+3..4*(4*y+x)+0]

 4位数字所能表示的最大值是15，所以折算到[0.0,1.0]，Alpha = alpha(x,y) / 15



 4.COMPRESSED_RGBA_S3TC_DXT5_EXT

 每个4*4块中包含64bit的压缩过的Alpha数据和64bit的RGB颜色数据，颜色数据部分压缩方式和COMPRESSED_RGBA_S3TC_DXT3_EXT完全一致。

 Alpha数据是8个字节的压缩数据，这8个字节:
 alpha0, alpha1, bits_0, bits_1, bits_2, bits_3, bits_4, bits_5

 其中alpha0和alpha1为unsigned char类型数据，转化为实际的Alpha值需要乘上 1 / 255.0

 其他的6个数字bits_N，则可以被解码成为一个48位的无符号整数
 bits = bits_0 + 256 * (bits_1 + 256 * (bits_2 + 256 * (bits_3 + 256 * (bits_4 + 256 * bits_5))))

 通过bits(高位47低位0)，可以求得位于(x,y)纹理单元的3位控制码:
 code(x,y) = bits[3*(4*y+x)+1..3*(4*y+x)+0]
 根据bits、code(x,y)、alpha0以及alpha1就可以求得(x,y)处纹理单元的Alpha值:
 alpha0,                          code(x,y) == 0
 alpha1,                          code(x,y) == 1
 (6*alpha0 + 1*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 2
 (5*alpha0 + 2*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 3
 (4*alpha0 + 3*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 4
 (3*alpha0 + 4*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 5
 (2*alpha0 + 5*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 6
 (1*alpha0 + 6*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 7
 (4*alpha0 + 1*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 2
 (3*alpha0 + 2*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 3
 (2*alpha0 + 3*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 4
 (1*alpha0 + 4*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 5
 0.0,                             alpha0 <= alpha1 and code(x,y) == 6
 1.0,                             alpha0 <= alpha1 and code(x,y) == 7

 *******************************************S3TC压缩纹理格式****************************************************************************************************/
THREE.RGB_S3TC_DXT1_Format = 2001;				//不带alpha通道的压缩颜色格式
THREE.RGBA_S3TC_DXT1_Format = 2002;				//只含有1位alpha通道的压缩颜色格式
THREE.RGBA_S3TC_DXT3_Format = 2003;				//含有类为控制码alpha通道的压缩
THREE.RGBA_S3TC_DXT5_Format = 2004;				//含有8个字节的alpha通道的压缩颜色格式


// PVRTC compressed texture formats

THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;

