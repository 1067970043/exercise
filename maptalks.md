# maptalks

### Map

库的中心类

~~~js
var map = new maptalks.Map("map",{
     center: [180,0],
     zoom: 4,
     baseLayer: new maptalks.TileLayer("base",{
        urlTemplate:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
         subdomains:['a','b','c']
     }),
     layers: [
         new maptalks.VectorLayer('v', [new maptalks.Marker([180, 0])])
     ]
});
~~~

基本构造选项

| 属性             | 类型                   | 默认值 | 描述                                                         |
| ---------------- | ---------------------- | ------ | ------------------------------------------------------------ |
| center           | Array;[number，number] |        | 地图中心位置                                                 |
| zoom             | number                 |        | 地图初始缩放大小                                             |
| spatialReference | Object                 | 空     | 地图的空间参考，默认使用投影 EPSG:3857，分辨率由谷歌地图/osm 使用 |
| baseLayer        | Layer                  | 空     | 最初设置为映射的基本层                                       |
| layers           | Array                  | 空     | 最初将添加到地图的图层                                       |

扩展构造选项

| 属性名          | 类型    | 默认值 | 描述                                                         |
| --------------- | ------- | ------ | ------------------------------------------------------------ |
| centerCross     | Boolean | false  | 地图中心显示红十字                                           |
| seamlessZoom    | Boolean | false  | 是否使用无缝缩放模式                                         |
| zoomInCenter    | Boolean | false  | 缩放时是否固定在中心                                         |
| dragPitch       | Boolean | true   | 如果为 true，则可以通过右键单击或 ctrl + 左键单击将地图拖动到间距。 |
| dragRotate      | Boolean | true   | 如果为 true，则可以通过右键单击或 ctrl + 左键单击来拖动地图以进行旋转。 |
| draggable       | Boolean | true   | 如果为false，地图禁止拖动                                    |
| zoomControl     | Boolean | false  | 显示地图缩放的数值与控制地图缩放的控制条                     |
| scaleControl    | Boolean | false  | 显示地图比例尺                                               |
| overviewControl | Boolean | false  | 显示小地图并显示视角所见区域，小地图的黑色部分代表目前视角的所见区域 |
| minZoom         | Number  |        | 最小缩放等级                                                 |
| maxZoom         | Number  |        | 最大缩放等级                                                 |
| scrollWheelZoom | Boolean | true   | 是否通过滑轮缩放地图                                         |
| doubleClickZoom | Boolean | true   | 是否通过双击缩放地图                                         |

### 方法

~~~js
Object.setPitch(Number)
~~~

设置视角与平面坐标系的角度



~~~js
Object.setBearing(Number)
~~~

设置地图绕中心点旋转的角度



~~~js
Object.panBy([Number, Number])
~~~

对地图进行移动



~~~js
Object.getExtent()
~~~

得到地图当前视图范围的地理范围



~~~js
getExtent()
~~~

获取地图当前视图范围的地理范围



~~~js
fitExtent(extent, zoomOffset)
~~~

将地图设置为适合给定范围的最大缩放级别。



~~~js
setMaxExtent(extent)
~~~

设置映射到最大范围



~~~js
setMaxZoom(Number);setMinZoom(Number)
~~~

设置最大最小缩放



~~~js
Object.getProjection()
~~~

得到地图的投影。  

投影是一种用于地图投影的算法，如著名的墨卡托投影  

投影必须有两种方法:  

1. 项目(坐标)-投射输入坐标  

2. 取消项目(坐标)-取消输入坐标的项目  

投影还包括通常从测量器延伸出来的测量方法:  

1. measureLength(coord1, coord2) -计算两个坐标之间的长度。  

2. measureArea(coords[]) -计算输入坐标的面积。  

3. Locate (coord, distx, disty) -从x轴上的xdist和y轴上的ydist计算坐标。

其中经纬度与坐标转化公式为：

~~~js
// javascript 转换
function mercatorTolonlat(mercator){
    var lonlat={
    	x:0,
    	y:0
    };
    var x = mercator.x/20037508.34*180;
    var y = mercator.y/20037508.34*180;
    y= 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);
    lonlat.x = x;
    lonlat.y = y;
    return lonlat;
}
~~~



~~~js
getSpatialReference()
~~~

获取地图的空间参考



~~~js
getTilePrjExtent()
~~~

得到地图当前视图范围的投影地理范围



~~~js
copy()
function copy() {
    rect.copy()
        .translate(0.01 * counter, -0.01 * counter)
        .addTo(copyLayer);
    counter++;
}
~~~

复制该几何标记



~~~js
on (eventsOn, handler, context)
//eventsOn 要注册的事件类型，如果多余一个，则以空格分隔 String类型
//handler 要调用的处理函数 function类型
//context 处理程序的上下文 Object类型
~~~

注册处理函数以在触发事件时调用



### 标记方法

标记方法中的options对象代表一些标记属性，

例：

~~~js
{
    symbol : {
        lineColor : '#fff',	//线条颜色
        lineWidth : 2	//线条宽度
        polygonFill : 'rgb(0, 129, 0)'//形状填充颜色
    }
}
~~~

**矩形**

```js
new maptalks.Rectangle
new Rectangle(coordinates, width, height, options)
//坐标，宽度， 高度， 标记属性
```

**圆圈**

~~~js
new maptalks.Circle
new Circle(center, radius, options)
//中心点位置， 半径长度， 标记属性
~~~

**弧形**

~~~js
new maptalks.Sector
new Sector(center, radius, startAngle, endAngle, options)
//中心点位置， 半径长度， 起点角度， 终点角度， 标记属性
~~~

**椭圆**

~~~js
new maptalks.Ellipse
new Ellipse(center , width, height, options)
//中心点位置， 宽度， 高度， 标记属性
~~~

**图形标记**

~~~js
new maptalks.Marker
new Marker()
~~~

| 姓名          | 类型    | 默认       | 描述                                                      |
| ------------- | ------- | ---------- | --------------------------------------------------------- |
| `id`          | Boolean | 空         | 几何体的id                                                |
| `visible`     | Boolean | true       | 几何体是否可见。                                          |
| `editable`    | Boolean | true       | 几何图形是否可以编辑。                                    |
| `interactive` | Boolean | true       | 几何图形是否可以交互。                                    |
| `cursor`      | String  | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。     |
| `measure`     | String  | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。       |
| `draggable`   | Boolean | false      | 几何体是否可以拖动。                                      |
| `dragShadow`  | Boolean | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。 |
| `dragOnAxis`  | Boolean | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y        |
| `zIndex`      | Number  |            | 几何的初始 zIndex                                         |

#### **直线**

~~~js
new maptalks.LineString
new LineString(coordinates, options)
//画线坐标，标记属性
~~~

| 姓名               | 类型            |    默认    | 描述                                                         |
| :----------------- | :-------------- | :--------: | :----------------------------------------------------------- |
| `arrowStyle`       | String \| Array |     空     | 箭头样式，可以是预定义值或数组[箭头宽度，箭头高度]（数组中的值为线宽的倍数），可能的预定义值：经典（[3, 4]） |
| `arrowPlacement`   | String          |  最后顶点  | 箭头的位置：顶点在先、顶点在后、顶点在后、点                 |
| `smoothness`       | Number          |     0      | 通过四边形贝塞尔插值进行线条平滑，默认为 0                   |
| `enableSimplify`   | Boolean         |    true    | 渲染前是否简化路径                                           |
| `simplifyTolerace` | Number          |     2      | 对简化路径的容忍度，越高简化越强烈                           |
| `enableClip`       | Boolean         |    true    | 是否用地图的当前范围裁剪路径                                 |
| `symbol`           | Object          |            | 路径的默认符号                                               |
| `id`               | Boolean         |     空     | 几何体的id                                                   |
| `visible`          | Boolean         |    true    | 几何体是否可见。                                             |
| `editable`         | Boolean         |    true    | 几何图形是否可以编辑                                         |
| `interactive`      | Boolean         |    true    | 几何图形是否可以交互。                                       |
| `cursor`           | String          |     空     | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。        |
| `measure`          | String          | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。          |
| `draggable`        | Boolean         |   false    | 几何体是否可以拖动。                                         |
| `dragShadow`       | Boolean         |    true    | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。    |
| `dragOnAxis`       | Boolean         |     空     | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y           |
| `zIndex`           | Number          |            | 几何的初始 zIndex                                            |



#### **多边形**

~~~js
new maptalks.Polygon
new Polygon(coordinates, options)
~~~

| 姓名                | 类型    | 默认       | 描述                                                      |
| :------------------ | :------ | :--------- | :-------------------------------------------------------- |
| `smoothness`        | Number  | 0          | 通过四边形贝塞尔插值进行线条平滑，默认为 0                |
| `enableSimplify`    | Boolean | true       | 渲染前是否简化路径                                        |
| `simplifyTolerance` | Number  | 2          | 对简化路径的容忍度，越高简化越强烈                        |
| `enableClip`        | Boolean | true       | 是否用地图的当前范围裁剪路径                              |
| `symbol`            | Object  |            | 路径的默认符号                                            |
| `id`                | Boolean | 空         | 几何体的id                                                |
| `visible`           | Boolean | true       | 几何体是否可见。                                          |
| `editable`          | Boolean | true       | 几何图形是否可以编辑。                                    |
| `interactive`       | Boolean | true       | 几何图形是否可以交互。                                    |
| `cursor`            | String  | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。     |
| `measure`           | String  | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。       |
| `draggable`         | Boolean | false      | 几何体是否可以拖动。                                      |
| `dragShadow`        | Boolean | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。 |
| `dragOnAxis`        | Boolean | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y        |
| `zIndex`            | Number  |            | 几何的初始 zIndex                                         |

#### **多个标记几何图形**

~~~js
new GeometryCollection(geometries, options)
~~~

| 姓名          | 类型    | 默认       | 描述                                                      |
| :------------ | :------ | :--------- | :-------------------------------------------------------- |
| `id`          | Boolean | 空         | 几何体的id                                                |
| `visible`     | Boolean | true       | 几何体是否可见。                                          |
| `editable`    | Boolean | true       | 几何图形是否可以编辑。                                    |
| `interactive` | Boolean | true       | 几何图形是否可以交互。                                    |
| `cursor`      | String  | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。     |
| `measure`     | String  | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。       |
| `draggable`   | Boolean | flase      | 几何体是否可以拖动。                                      |
| `dragShadow`  | Boolean | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。 |
| `dragOnAxis`  | Boolean | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y        |
| `zIndex`      | Number  |            | 几何的初始 zIndex                                         |

**各种集合**

MultiPoint 点集合

MultiLineString 线集合

MultiGeometry 几何体集合

集合的属性与单元素的属性相同

#### **圆弧**

~~~js
new maptalks.ArcCurve()
new ArcCurve(coordinates, options)
//坐标集合， 标记属性
~~~

| 姓名                | 类型            | 默认       | 描述                                                         |
| :------------------ | :-------------- | :--------- | :----------------------------------------------------------- |
| `arcDegree`         | Number          | 90         | 圆弧度数。                                                   |
| `arrowStyle`        | String \| Array | 空         | 箭头样式，可以是预定义值或数组[箭头宽度，箭头高度]（数组中的值为线宽的倍数），可能的预定义值：经典（[3, 4]） |
| `arrowPlacement`    | String          | 最后顶点   | 箭头的位置：顶点在先、顶点在后、顶点在后、点                 |
| `smoothness`        | Number          | 0          | 通过四边形贝塞尔插值进行线条平滑，默认为 0                   |
| `enableSimplify`    | Boolean         | true       | 渲染前是否简化路径                                           |
| `simplifyTolerance` | Number          | 2          | 对简化路径的容忍度，越高简化越强烈                           |
| `enableClip`        | Boolean         | true       | 是否用地图的当前范围裁剪路径                                 |
| `symbol`            | Object          |            | 路径的默认符号                                               |
| `id`                | Boolean         | 空         | 几何体的id                                                   |
| `visible`           | Boolean         | true       | 几何体是否可见。                                             |
| `editable`          | Boolean         | true       | 几何图形是否可以编辑。                                       |
| `interactive`       | Boolean         | true       | 几何图形是否可以交互。                                       |
| `cursor`            | String          | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。        |
| `measure`           | String          | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。          |
| `draggable`         | Boolean         | false      | 几何体是否可以拖动。                                         |
| `dragShadow`        | Boolean         | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。    |
| `dragOnAxis`        | Boolean         | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y           |
| `zIndex`            | Number          |            | 几何的初始 zIndex                                            |

#### **文本标记**

~~~js
new maptalks.Label
new Label(content, coordinates, options)
//内容， 坐标， 标记属性
~~~

| 姓名              | 类型    | 默认       | 描述                                                      |
| :---------------- | :------ | :--------- | :-------------------------------------------------------- |
| `boxStyle`        | Object  | 空         | 文本的默认框样式                                          |
| `textSymbol`      | Boolean | 空         | 标签的文字符号                                            |
| `hitTestForEvent` | String  | false      | 对事件使用命中测试，小心，它可能会因画布被污染而失败。    |
| `id`              | Boolean | 空         | 几何体的id                                                |
| `visible`         | Boolean | true       | 几何体是否可见。                                          |
| `editable`        | Boolean | true       | 几何图形是否可以编辑。                                    |
| `interactive`     | Boolean | true       | 几何图形是否可以交互。                                    |
| `cursor`          | String  | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。     |
| `measure`         | String  | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。       |
| `draggable`       | Boolean | false      | 几何体是否可以拖动。                                      |
| `dragShadow`      | Boolean | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。 |
| `dragOnAxis`      | Boolean | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y        |
| `zIndex`          | Number  |            | 几何的初始 zIndex                                         |

**文本的默认框样式**

| 姓名                  | 类型    | 默认    | 描述               |
| :-------------------- | :------ | :------ | :----------------- |
| `padding`             | Boolean | [12, 8] | 框中的文本填充     |
| `verticalAlignment`   | String  | middle  | 文本的垂直对齐     |
| `horizontalAlignment` | Boolean | true    | 文本的水平对齐     |
| `minWidth`            | Number  | 0       | 标签框的 minWidth  |
| `minHeight`           | Number  | 0       | 标签框的 minHeight |

#### **文本框**

~~~js
new maptalks.TextBox
new TextBox(content, coordinates, width, height, options)
//文本框内容， 中心坐标， 宽度， 高度， 标记属性 
~~~

| 姓名              | 类型    | 默认       | 描述                                                      |
| :---------------- | :------ | :--------- | :-------------------------------------------------------- |
| `textStyle`       | Object  |            | 文本的默认文本样式                                        |
| `boxSymbol`       | Boolean | 空         | 文本框的框符号                                            |
| `hitTestForEvent` | String  | false      | 对事件使用命中测试，小心，它可能会因画布被污染而失败。    |
| `id`              | Boolean | 空         | 几何体的id                                                |
| `visible`         | Boolean | true       | 几何体是否可见。                                          |
| `editable`        | Boolean | true       | 几何图形是否可以编辑。                                    |
| `interactive`     | Boolean | true       | 几何图形是否可以交互。                                    |
| `cursor`          | String  | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。     |
| `measure`         | String  | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。       |
| `draggable`       | Boolean | false      | 几何体是否可以拖动。                                      |
| `dragShadow`      | Boolean | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。 |
| `dragOnAxis`      | Boolean | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y        |
| `zIndex`          | Number  |            | 几何的初始 zIndex                                         |

**文本的默认文本样式**

| 姓名                  | 类型    | 默认    | 描述                       |
| :-------------------- | :------ | :------ | :------------------------- |
| `wrap`                | Boolean | true    | 是否自动换行文本框中的文本 |
| `padding`             | Boolean | [12, 8] | 框中的文本填充             |
| `verticalAlignment`   | String  | middle  | 文本的垂直对齐             |
| `horizontalAlignment` | Boolean | true    | 文本的水平对齐             |

#### 连接线

~~~js
new maptalks.ConnectorLine
new ConnectorLine(src, target, options)
//连接源头， 连接目标， 标记属性
~~~

| 姓名                | 类型            | 默认       | 描述                                                         |
| :------------------ | :-------------- | :--------- | :----------------------------------------------------------- |
| `arrowStyle`        | String \| Array | 空         | 箭头样式，可以是预定义值或数组[箭头宽度，箭头高度]（数组中的值为线宽的倍数），可能的预定义值：经典（[3, 4]） |
| `arrowPlacement`    | String          | 最后顶点   | 箭头的位置：顶点在先、顶点在后、顶点在后、点                 |
| `smoothness`        | Number          | 0          | 通过四边形贝塞尔插值进行线条平滑，默认为 0                   |
| `enableSimplify`    | Boolean         | true       | 渲染前是否简化路径                                           |
| `simplifyTolerance` | Number          | 2          | 对简化路径的容忍度，越高简化越强烈                           |
| `enableClip`        | Boolean         | true       | 是否用地图的当前范围裁剪路径                                 |
| `symbol`            | Object          |            | 路径的默认符号                                               |
| `id`                | Boolean         | 空         | 几何体的id                                                   |
| `visible`           | Boolean         | true       | 几何体是否可见。                                             |
| `editable`          | Boolean         | true       | 几何图形是否可以编辑。                                       |
| `interactive`       | Boolean         | true       | 几何图形是否可以交互。                                       |
| `cursor`            | String          | 空         | 鼠标悬停在几何体上时的光标样式，与 CSS 中的定义相同。        |
| `measure`           | String          | EPSG：4326 | 几何的测量代码，定义了 measureGeometry 如何测量它。          |
| `draggable`         | Boolean         | false      | 几何体是否可以拖动。                                         |
| `dragShadow`        | Boolean         | true       | 如果为 true，则在几何拖动期间，将在移动几何之前拖动阴影。    |
| `dragOnAxis`        | Boolean         | 空         | 如果设置，几何体只能沿指定的轴拖动，可能的值：x, y           |
| `zIndex`            | Number          |            | 几何的初始 zIndex                                            |

#### 高度

标记图形都有properties属性，在其中可以添加元素的高度

```
altitude : 600//高度
```

#### 图形标记

通过Marker中的symbol属性可以导入图形标记（包括图片，文字）

例：

~~~js
'symbol' : {
            'markerFile'   : '1.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
~~~

其中symbol中可以对图片属性进行设置

| 名称                      | 类型                                                         | 默认值 | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| markerOpacity             | Number                                                       | 1      | 标记的整体不透明度                                           |
| markerWidth               | Number（float）                                              | 10     | 标记的宽度                                                   |
| markerHeight              | Number（float）                                              | 10     | 标记的高度                                                   |
| markerDx                  | Number（float）                                              | 0      | 在X轴上移动标记，以像素为单位+/-。一个正值将使标记向右移动   |
| markerDy                  | Number（float）                                              | 0      | 在Y轴上移动标记，以像素为单位+/-。一个正值将把标记向下移动。 |
| markerHorizontalAlignment | String（left ；middle；right）                               | middle | 标记与其中心点的水平对齐方式。                               |
| markerVerticalAlignment   | String(top；middle；bottom)                                  | bottom | 标记与其中心点的垂直对齐方式                                 |
| markerPlacement           | String(point；vertex；line；vertex-first；vertex-last)       | point  | 尝试将标记放置在点上，或多边形的中心；markerPlacement:line，然后沿着一条线多次放置标记；vertex-first和vertex-last选项可用于在线或多边形的第一个或最后一个顶点放置标记 |
| markerRotation            | Number（float）                                              | none   | 标记点围绕标记点旋转的程度。 旋转从x轴右侧(0度)开始，逆时针方向旋转。 |
| markerFile                | String                                                       | none   | 图片名                                                       |
| markerType                | String（ellipse；cross；x；triangle；square；diamond；bar；pie；pin；rectangle） |        | 标记的形状，从前到后代表不同形状，分别为圆，十字，×，三角形，方形，菱形，矩形，扇形，大头针，另一种矩形 |
| markerFill                | String（color）                                              | blue   | 标记区域的颜色                                               |
| markerFillPatternFile     | String                                                       | none   | 用作标记内重复图案填充的图像。 HTML Image可以接受的任何格式。 |
| markerFillOpacity         | Number（float）                                              | 1      | 标记的填充不透明度                                           |
| markerLineColor           | String（color）                                              | black  | 记号笔周围笔画的颜色。                                       |
| markerLineWidth           | Number（float）                                              | 1      | 标记周围描边的宽度，以像素为单位。 它位于边界上，所以高值可以覆盖区域本身 |
| markerLineOpacity         | Number（float）                                              | 1      | 标记笔画的不透明度。                                         |
| markerLineDasharray       | Number                                                       | none   | 一对长度值[A,b]，其中(A)是破折号长度，(b)是间隙长度。 对于更复杂的模式，支持两个以上的值。 |
| markerLinePatternFile     | String                                                       | none   | 要沿标记线重复和扭曲的图像文件。 HTML Image可以接受的任何格式。 |
| markerPath                | String\|Object                                               | none   | 用于定义标记形状的SVG路径或路径，如果设置它将覆盖marktype。  |

#### 更换标记图层顺序

图层置顶，置底

~~~js
map.getLayer('layerName').bringToFront()
//获取所在图层，将几何图形放在顶部
map.getLayer('layerName').bringToBack()
//获取所在图层，将几何图形放在底部
~~~

调整图层顺序

~~~js
map.sortLayers(['layerNameArray'])
//layerNameArray为要排列的顺序数组
~~~

