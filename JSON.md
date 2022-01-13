## JSON

JSON：**J**ava**S**cript **O**bject **N**otation(JavaScript 对象表示法)

JSON 是存储和交换文本信息的语法，类似 XML。

JSON数据书写格式：

~~~js
key ： value
~~~

例：

~~~js
{ "name":"菜鸟教程" , "url":"www.runoob.com" }
~~~

JSON中也可以存储数组

~~~js
{
    Arrayname : [
        { key1 : value1-1 , key2:value1-2 }, 
        { key1 : value2-1 , key2:value2-2 }, 
        { key1 : value3-1 , key2:value3-2 }, 
        ...
        { keyN : valueN-1 , keyN:valueN-2 }, 
    ]
}
~~~

例：

~~~js
{
    "sites": [
        { "name":"菜鸟教程" , "url":"www.runoob.com" }, 
        { "name":"google" , "url":"www.google.com" }, 
        { "name":"微博" , "url":"www.weibo.com" }
    ]
}
~~~

- JSON.parse(): 将一个 JSON 字符串转换为 JavaScript 对象。
- JSON.stringify(): 于将 JavaScript 值转换为 JSON 字符串。



例：

~~~js
var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }');

var obj = { "name":"runoob", "alexa":10000, "site":"www.runoob.com"};
var myJSON = JSON.stringify(obj);
~~~

## GEOJSON

geojson将所有的地理要素分为

Point（点要素）；

MultiPoint（点集合）；

LineString（线要素）；

MultiLineString（线集合）；

Polygon（面）；

MultiPolygon（面集合）；

GeometryCollection（地理要素集合）

例：

```
{ "type": "FeatureCollection",
  "features": [
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
      "properties": {"prop0": "value0"}
      },
    { "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
          ]
        },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
        }
      },
    { "type": "Feature",
       "geometry": {
         "type": "Polygon",
         "coordinates": [
           [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
             [100.0, 1.0], [100.0, 0.0] ]
           ]
       },
       "properties": {
         "prop0": "value0",
         "prop1": {"this": "that"}
         }
       }
     ]
   }
```

- GeoJSON对象可能有任何数目成员（名/值对）。
- GeoJSON对象必须由一个名字为"type"的成员。这个成员的值是由GeoJSON对象的类型所确定的字符串。



- Point:

"coordinates"成员必须是一个单独的位置。

- MultiPoint：

"coordinates"成员必须是位置数组。

- LineString：

"coordinates"成员必须是两个或多个位置的数组。

- MultiLineString:

"coordinates"成员必须是一个线坐标数组的数组(三维数组)。

```
[
            [
                [105.6005859375,30.65681556429287],
                [107.95166015624999,31.98944183792288],
                [109.3798828125,30.031055426540206],
                [107.7978515625,29.935895213372444]
            ],
            [
                [109.3798828125,30.031055426540206],
                [107.1978515625,31.235895213372444]
            ]
        ]
]
```

- Polygon:

"coordinates"成员必须是一个线坐标数组的数组(三维数组)。

- MultiPolygon:

"coordinates"成员是一个四维数组，通过坐标与数组镶套的位置分为三类：

两个不会相交的多边形，

两个镶套的多边形，

有孔洞的多边形

- GeometryCollection：

是多种基本地理要素的集合，就是里面可以包含点、线、面要素，不需要放在FeatureCollection里

## ESRIJSON

JSON 必须至少包含 geometryType、spatialReference、字段和要素（具有几何和特性）属性。

例：

~~~js
{
    "displayFieldName":"LOWPARCELID",
    "fieldAliases":{"LOWPARCELID":"Lowest Parcel Identification Number"},
    "geometryType":"esriGeometryPolygon",
    "spatialReference":{"wkid":4326},
    "fields":[
        {"name":"LOWPARCELID",
        "type":"esriFieldTypeString",
        "alias":"Lowest Parcel Identification Number",
        "length":30}
    ],
    "features":[
        {"attributes":
            {"LOWPARCELID":"1902226080"},
            "geometry":{
                "rings":[
                    [
                        [-83.231458627236648,42.617199350582993],
                        [-83.231635236861806,42.617378536183793],
                        [-83.231669512792919,42.617422957559519],
                        [-83.231193468607543,42.617678900083554],
                        [-83.230976370344521,42.617458631003402],
                        [-83.231458627236648,42.617199350582993]
                    ]
                ]
            }
        }
    ]
}

~~~

