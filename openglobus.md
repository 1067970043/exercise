# openglobus

### Globe

使用og中的Globe方法可以创建WebGL的上下文，其中的设定属性有

| 变量名                 | 类型    | 描述                                    |
| :--------------------- | :------ | :-------------------------------------- |
| `target`               | String  | 画布的 HTML 元素 ID。                   |
| `skybox`               |         | 渲染天空盒。                            |
| `name`                 | String  | 行星名称。默认是唯一标识符。            |
| `terrain`              |         | 地形提供者。                            |
| `controls`             |         | 渲染器控件数组。                        |
| `layers`               | Array   | 行星层。                                |
| `viewExtent`           | Array   | 可视起始范围。                          |
| `autoActivate`         | Boolean | 地球仪渲染自动激活标志。True 是默认值。 |
| `attributionContainer` | DOM元素 | 归属列表的容器。                        |

~~~JS
var globus = new og.Globe({
    'atmosphere': false,
    'target': 'globus',
    'name': 'Earth',
    'terrain': new og.terrain.GlobusTerrain(),
    'layers': [
         new og.layer.XYZ("OpenStreetMap", { isBaseLayer: true, url: "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png", visibility: true, attribution: 'Data @ OpenStreetMap contributors, ODbL' })
     ],
    'autoActivate': true
});
~~~

### layers

**XYZ**

Globe中的瓦片数据，在其中可以设定瓦片属性:

| 变量名                     | 类型    | 默认          | 描述                                                         |
| :------------------------- | :------ | :------------ | :----------------------------------------------------------- |
| `name`                     | String  |               | 图层名称。                                                   |
| `options.opacity`          | Number  | 1.0           | 可选的图层不透明度。                                         |
| `options.transparentColor` | Array   | [-1,-1,-1]    | 可选的定义透明颜色的 RGB 颜色。                              |
| `options.subdomains`       | Array   | ['a','b','c'] | 可选的磁贴服务的子域。                                       |
| `options.minZoom`          | Number  | 0             | 可选的最小可见性缩放级别。                                   |
| `options.maxZoom`          | Number  | 0             | 可选的最大可见性缩放级别。                                   |
| `options.minNativeZoom`    | Number  | 0             | 可选的最小可用缩放级别。                                     |
| `options.maxNativeZoom`    | Number  | 19            | 可选的最大可用缩放级别。                                     |
| `options.attribution`      | String  |               | 可选的显示在屏幕归属区域的图层归属。                         |
| `options.isBaseLayer`      | Boolean | false         | 可选的基层标志。                                             |
| `options.visibility`       | Boolean | true          | 可选的图层可见性。                                           |
| `options.crossOrigin`      | String  | true          | 可选的如果为 true，则所有图块的 crossOrigin 属性都将设置为 ''。 |
| `options.url`              | String  |               | 瓦片源。                                                     |

~~~js
new og.layer.XYZ("OpenStreetMap", {
    isBaseLayer: true,
    url: "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    visibility: true
});
~~~

**WMS**

用于将 WMS 服务显示为地球上的切片图层。