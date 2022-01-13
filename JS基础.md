## JS基础

### 对象

在 JavaScript 中，几乎“所有事物”都是对象。

- 布尔是对象（如果用 *new* 关键词定义）
- 数字是对象（如果用 *new* 关键词定义）
- 字符串是对象（如果用 *new* 关键词定义）
- 日期永远都是对象
- 算术永远都是对象
- 正则表达式永远都是对象
- 数组永远都是对象
- 函数永远都是对象
- 对象永远都是对象

所有 JavaScript 值，除了*原始值*，都是对象。

*原始值*指的是没有属性或方法的值。

*原始数据类型*指的是拥有原始值的数据。

JavaScript 定义了 5 种原始数据类型：

- string
- number
- boolean
- null
- undefined

对象是易变的：它们通过引用来寻址，而非值。

### 对象方法

this的值，在函数中使用，是拥有该函数的对象。

this并非变量，它是关键字，无法改变this的值

```js
var person = {
  firstName: "Bill",
  lang : function() {
    return this.firstName;
  }
};
console.log(person.lang())
```

通过get获取属性值

```js
var person = {
  firstName: "Bill",
  get lang() {
    return this.firstName;
  }
};
console.log(person.lang)
```

通过set设置对象

```js
var person = {
  firstName: "Bill",
  set lang(lang) {
    this.language = lang;
  }
};
person.lang = "en";
console.log(person.language);
```

对象构造器

```js
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
var myFather = new Person("Bill", "Gates", 62, "blue");
var myMother = new Person("Steve", "Jobs", 56, "green");
```

如果需要添加新属性，就必须把它添加到构造器函数中或使用prototype

~~~js
Person.prototype.nationality = "English";
~~~

### 原型属性

所有的JS对象都是从原型中继承属性与方法

------

## 函数

### arguments 对象

JS函数有一个名为 arguments 对象的内置对象。

~~~js
x = findMax(1, 123, 500, 115, 44, 88);
function findMax() {
    var i;
    var max = -Infinity;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}
~~~

### this关键字

面向对象语言中this表示当前对象的一个引用

在JavaScript中this会随着执行环境的变化而变化

- 在方法中，this表示该方法所属的对象

- 如果单独使用，this表示全局对象

- 在函数中，在严格模式下，this时未定义的

- 在事件中，this表示接收事件的元素

- call(),apply(),bind()一类的方法会将this关键字引到任何对象

### call()、apply()、bind()的用法

以上三种方法后会接参数，第一个参数都为this指向的对象，差别在于第二个及之后的参数，三种方法的格式如下：

~~~js
call：obj.functionname.call(obj, 'string',...,'string')
apply：obj.functionname.apply(obj,['string',.,'string'])
bind：obj.functionname.bind(obj, 'string',...,'string')()
~~~

bind的使用方法与call类似，但bind的返回值是一个新的函数，必须调用这个函数才会被执行。

### 闭包

闭包指的是能够访问另一个函数作用域的变量的函数。

~~~js
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
 
add();
add();
add();//3
~~~

### JS变量存储

JS中的内存分为两种：栈内存、堆内存

栈内存：存放变量
堆内存：存代码块（object和function）

基本数据类型：string number boolean undefined null
如果变量后面的值是基本数据，就直接存在栈内存。栈里面要求变量不能重名，如果重名就会覆盖前者

引用数据类型：object array function
如果变量后面是引用数据类型，将后面的代码块存在堆内存中，然后将堆内存中的内存地址赋值给前面的变量

### 实现input的双向绑定

1、使用Object.defineProperty()方法

语法：Object.defineProperty(obj, prop, descriptor)

obj：目标对象
prop：需定义或修改的属性的名字
descriptor：目标属性所拥有的特性

三个参数都为必需

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text" id="input"/>
    <span id="showText"></span>
    <script>
        var obj = {};
        Object.defineProperty(obj, "text", {
            get:function(){
                return obj;
            },
            set:function(val){
                document.getElementById("input").value = val;
                document.getElementById("showText").innerHTML = val;
            }
        })
        document.addEventListener("keyup", function(e){
            obj.text = e.target.value;
        })
    </script>
</body>
</html>
~~~

2、使用原生实时监听input输入框的值

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    你输入的姓名：<span id=name></span>
    <br />
    请输入姓名：<input type="text" id="inputName">
    <script>
        let spanName = document.getElementById('name') 
        let inputName = document.getElementById('inputName')
        inputName.oninput = function () { //原生input输入事件
            spanName.innerHTML = this.value; //输入框赋值
        };
    </script>
</body>
</html>

~~~

### 前端实现动画共6种方式：

- javascript直接实现；
- SVG（可伸缩矢量图形）；
- CSS3 transition；
- CSS3 animation；
- Canvas动画；
- requestAnimationFrame

**JavaScript动画：**

其主要思想是通过setInterval或setTimeout方法的回调函数来持续调用改变某个元素的CSS样式以达到元素样式变化的效果。

javascript 实现动画通常会导致页面频繁性重排重绘，消耗性能，一般应该在桌面端浏览器。在移动端上使用会有明显的卡顿

**SVG动画：**

SVG动画由SVG元素内部的元素属性控制，一般通过一下几个元素控制：

- ：用于控制动画延时
- ：对属性的连续改变进行控制
- ：颜色变化，但用就能控制
- ：控制如缩放、旋转等几何变化
- ：控制SVG内元素的移动路径

SVG的一大优势是含有较为丰富的动画功能，原生绘制各种图形、滤镜和动画，并且能被js调用。html是对dom的渲染，那么svg就是对图形的渲染。 
但是，另一方面元素较多且复杂的动画使用svg渲染会比较慢，而且SVG格式的动画绘制方式必须让内容嵌入到HTML中使用。CSS3的出现让svg的应用变得相对少了。

**CSS3transition**

transition是过度动画。但是transition并不能实现独立的动画，只能在某个标签元素样式或状态改变时进行平滑的动画效果过渡，而不是马上改变。

**CSS3 animation**

animation 算是真正意义上的CSS3动画。通过对关键帧和循环次数的控制，页面标签元素会根据设定好的样式改变进行平滑过渡。而且关键帧状态的控制是通过百分比来控制的。

**Canvas动画**

canvas作为H5新增元素，是借助Web API来实现动画的。

Canvas主要优势是可以应对页面中多个动画元素渲染较慢的情况，完全通过javascript来渲染控制动画的执行。可用于实现较复杂动画。

**requestAnimationFrame**

requestAnimationFrame是另一种Web  API，原理与setTimeout和setInterval类似，都是通过javascript持续循环的方法调用来触发动画动作。但是requestAnimationFrame是浏览器针对动画专门优化形成的APi，在性能上比另两者要好。

复杂的动画是通过一个个简单的动画组合实现的。基于兼容性问题，通常在项目中，一般在

- 桌面端浏览器推荐使用javascript直接实现动画或SVG方式；
- 移动端可以考虑使用CSS3 transition、CSS3 animation、Canvas或requestAnimationFrame方式。

### base64编码

是网络上最常见的用于传输8Bit字节码的编码方式之一，是一种基于64个可打印字符来表示二进制数据的方法

大多数编码都是由字符串转化成二进制的过程，而Base64的编码则是从二进制转换为字符串

，与常规恰恰相反

Base64编码主要用在传输、存储、表示二进制领域，不能算得上加密，只是无法直接看到明文。也可以通过打乱Base64编码来进行加密



### CSSFilter滤镜

filter定义了元素的可视效果

滤镜通常使用百分比表示

| Filter            | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| none              | 默认值，没有效果                                             |
| blur(*px*)        | 给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；没有设定值，则默认为0；这个参数可以设置css长度值，但不接受百分比值 |
| brightness（%）   | 值是0%，图像会全黑。值是100%，则图像无变化。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1。 |
| contrast（%）     | 调整图像的对比度。0%全黑，100%图像不变。值超过100%会运用更低的对比。没有设置值，默认为1。 |
| grayscale(%)      | 将图像转换为灰度图像。值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。若未设置，值默认是0 |
| hue-rotate(*deg*) | 给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈。 |
| invert（%）       | 反转输入图像。值定义转换的比例。100%的价值是完全反转。值为0%则图像无变化。值在0%和100%之间，则是效果的线性乘子。 若值未设置，值默认是0。 |
| opacity（%）      | 转化图像的透明程度。值为0%则是完全透明，值为100%则图像无变化。若值未设置，值默认是1。该函数与已有的opacity属性很相似，不同之处在于通过filter，一些浏览器为了提升性能会提供硬件加速。 |
| saturate(*%*)     | 转换图像饱和度。值为0%则是完全不饱和，值为100%则图像无变化。超过100%的值是允许的，有更高的饱和度。 若值未设置，值默认是1。 |
| sepia(%)          | 将图像转换为深褐色。值定义转换的比例。值为100%则完全是深褐色的，值为0%图像无变化。若未设置，值默认是0； |

### addEventListener()方法

addEventListener() 方法用于向指定元素添加事件句柄

~~~js
element.addEventListener(event, function, useCapture)
~~~

| 参数         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| *event*      | 必须。字符串，指定事件名。                                   |
| *function*   | 必须。指定要事件触发时执行的函数。  当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。 |
| *useCapture* | 可选。布尔值，指定事件是否在捕获或冒泡阶段执行。  可能值:true - 事件句柄在捕获阶段执行false- false- 默认。事件句柄在冒泡阶段执行 |

### Cookie

Cookie是一些存储与电脑上的文本文件，

当Web服务器向浏览器发送web页面时，在连接关闭后，服务器不会记录用户的信息

Cookie的作用是用于解决“如何记录客户端的用户信息‘

存储格式document.cookie= name+"="+value+";path=/"

~~~js
function Setcookie (name, value)
{ 
    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
//即document.cookie= name+"="+value+";path=/";时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
}
~~~

函数首先会检查 document.cookie 对象中是否存有 cookie。假如 document.cookie 对象存有某些 cookie，那么会继续检查我们指定的 cookie 是否已储存。如果找到了我们要的 cookie，就返回值，否则返回空字符串。

~~~js
function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
          c_start=document.cookie.indexOf(c_name + "=")//检查指定的 cookie 是否已储存
          if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
      }
    return ""
}
~~~

创建函数通过cookie值进行活动

~~~js
function checkCookie()
{
    username=getCookie('username')
        if (username!=null && username!="")
          	{alert('Welcome again '+username+'!')}
        else 
        {
            username=prompt('Please enter your name:',"")
            if (username!=null && username!="")
            	{setCookie('username',username,365)}
      	}
}
~~~



### 引入js

引入js文件时使用以下格式

```js
<script type="text/javascript" defer="defer" async="true/false" src="js文档地址"></script>
```

其中有两个属性`defer`和`async`

**defer="defer"**:

该属性用来通知浏览器，这段脚本代码将不会产生任何文档内容。

例如JavaScript代码中的document.write()方法将不会起作用，浏览器遇到这样的代码将会忽略，并继续执行后面的代码。

属性只能是defer，与属性名相同。在HTML语法格式下，也允许不定义属性值，仅仅使用属性名。

**async="true/false"**:

该属性为html5中新增的属性，它的作用是能够异步地下载和执行脚本，不因为加载脚本而阻塞页面的加载。一旦下载完毕就会立刻执行

两种属性会有三种组合：

- 如果async为true，那么脚本在下载完成后异步执行。
- 如果async为false，defer为true，那么脚本会在页面解析完毕之后执行。
- 如果async和defer都为false，那么脚本会在页面解析中，停止页面解析，立刻下载并且执行。



### a标签

超链接标签，用于从一个页面链接到另一个页面。a标签有默认外观，有以下属性值

| 属性     | 值                                                           | 描述                                                         |
| :------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| download | *filename*                                                   | 指定下载链接                                                 |
| href     | *URL*                                                        | 规定链接的目标 URL。                                         |
| hreflang | *language_code*                                              | 规定目标 URL 的基准语言。仅在 href 属性存在时使用。          |
| media    | *media_query*                                                | 规定目标 URL 的媒介类型。默认值：all。仅在 href 属性存在时使用。 |
| rel      | [rel的各种值与说明](https://www.runoob.com/tags/att-a-rel.html) | 规定当前文档与目标 URL 之间的关系。仅在 href 属性存在时使用。 |
| target   | _blank _parent _self _top *framename*                        | 规定在何处打开目标 URL。仅在 href 属性存在时使用。_blank：新窗口打开。_parent：在父窗口中打开链接。_self：默认，当前页面跳转。_top：在当前窗体打开链接，并替换当前的整个窗体(框架页)。 |
| type     | *MIME_type*                                                  | 规定目标 URL 的 MIME 类型。仅在 href 属性存在时使用。 注：MIME = Multipurpose Internet Mail Extensions。（媒体类型） |



### window.getComputedStyle()方法

`Window.getComputedStyle()`方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 

私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

语法:

~~~JS
let style = window.getComputedStyle(element, [pseudoElt]);
~~~



### localStorage属性

只读的localStorage属性允许你访问一个Document源（origin）的对象Storage；存储的数据将保存在浏览器的对话中。

localStorage类似sessionStorage，但其区别在于：存储在localStorafe的数据可以长期保留，当页面关闭时，存储在sessionStorage的数据会被清除。

无论是数据存储在localStorage还是sessionStorage，他们都特定于页面的协议。

语法：

~~~js
myStorage = localStorage;
~~~

localStorage.getItem(key):获取指定key本地存储的值

localStorage.setItem(key,value)：将value存储到key字段

localStorage.removeItem(key):删除指定key本地存储的值



### appendChild()方法

appendChild()方法会指定元素，参数为需要添加的节点，会在指定元素的最后追加新元素作为父的最后一个子节点。

语法：

~~~js
node.appendChild(node);
~~~

### removeChild()方法

removeChild() 方法指定元素的某个指定的子节点,然后删除该子节点。

以 Node 对象返回被删除的节点，如果节点不存在则返回 null。

语法:

~~~JS
node.removeChild(node)
~~~

### replaceChild()方法

removeChild() 方法指定元素的某个指定的子节点，将参数中的节点替换该子节点。

语法：

~~~js
node.replaceChild(node,node);//前面的参数为替换的子节点，后面的参数为被替换掉的字节点
~~~

### Class类继承

js引入class作为对象模板，通过class关键字，可以定义类。

类的所有方法都定义在类的prototype属性上面

定义类的方法时，不需要使用function关键字

方法之间不需要使用逗号进行分隔，加了会报错

~~~js
//类的所有方法都定义在类的prototype属性上面。
class piont{
    constructor(){
    }
    play(){
    }
}
//上述代码等价于
point.prototype={
    constructor() {},
    play(){};
}
//在类的实例上面调用方法，其实就是调用原型上的方法。
class Ba{
}
let b=new Ba();
b.constructor===Ba.prototype.constructor//true

~~~

constructor是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有该方法，如果没有显示定义，会有一个空的constructor方法默认添加。

constructor方法默认返回实例对象（this）。

类必须使用new调用，否知会报错。

类的内部可以使用get和set关键字，对摸个属性设置存值函数与取值函数，拦截该属性的存取行为。

所有在类中定义的方法，都会被实例所继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

父类的静态方法，可以被子类继承，静态方法也可以从super对象上调用。

~~~js
class Person{
    constructor(name){
        this.name=name;
        this.sex="男";
    }
}
class Student extends Person{
    constructor(name,age){
        super(name);
        this.age=age;
    }
}
let s=new Student("张三",11);
console.log(s.name);
console.log(s.age);
console.log(s.sex);
~~~

在变量前加#，代表class的私有属性，私有属性是只能在类的内部访问的方法与属性，外部不能访问

在ES6中为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于构造函数。

~~~js
class Rectangle {
    constructor(length, width){
	console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
    }
}
~~~

### preventDefault()方法

如果事件是可以取消的，则preventDefault()方法会取消改时间，这意味着属于该事件的默认操作将不会发生。

### JS中各个位置属性

网页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;

window.innerHeight;
网页可见区域宽： document.body.offsetWidth  (包括边线的宽);
网页可见区域高： document.body.offsetHeight (包括边线的宽);
网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop;
网页被卷去的左： document.body.scrollLeft;
网页正文部分上： window.screenTop;
网页正文部分左： window.screenLeft;
屏幕分辨率的高： window.screen.height;
屏幕分辨率的宽： window.screen.width;

屏幕可用工作区高度： window.screen.availHeight;

![img](https://img-blog.csdn.net/20180104085724397)

### wheelDelta和detail

wheelDelta和detail是判断鼠标滚动方向的指标，区别是：

wheelDelta的值为正（120.240...）则是鼠标向上；为负（-120，-240）则是向下。

detail则是相反的，数值不一样。

### $()

$()可以是$(expresion),即css选择器，Xpath或html元素

~~~js
$("#id")=document.getElementById("id")
~~~

### `<audio>`标签

`<audio>`标签定义了音频流文件

标签中可以使用的属性

| 属性     | 值       | 描述                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| autoplay | autoplay | 如果出现该属性，则音频在就绪后马上播放。                     |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| loop     | loop     | 如果出现该属性，则每当音频结束时重新开始播放。               |
| muted    | muted    | 规定视频输出应该被静音。                                     |
| preload  | preload  | 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| src      | *url*    | 要播放的音频的 URL。                                         |

可以通过获取元素来访问audio对象

[Audio对象属性与方法](https://www.w3school.com.cn/jsref/dom_obj_audio.asp)

### ...的用法

展开语法，在函数调用或数组构造时，将数组表达式或String在语法层面展开

~~~js
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// 6
~~~

语法：

~~~js
myFunction(...iterableObj)
~~~

### js运算符

| 运算符 | 描述 | 例子       | 类似于       | 结果 | 十进制 |
| :----- | :--- | :--------- | :----------- | :--- | :----- |
| &      | AND  | x = 5 & 1  | 0101 & 0001  | 0001 | 1      |
| \|     | OR   | x = 5 \| 1 | 0101 \| 0001 | 0101 | 5      |
| ~      | 取反 | x = ~ 5    | ~0101        | 1010 | -6     |
| ^      | 异或 | x = 5 ^ 1  | 0101 ^ 0001  | 0100 | 4      |
| <<     | 左移 | x = 5 << 1 | 0101 << 1    | 1010 | 10     |
| >>     | 右移 | x = 5 >> 1 | 0101 >> 1    | 0010 | 2      |

### Error对象

Error对象会在错误发生时提供错误的提示信息。

| 属性    | 描述                           |
| :------ | :----------------------------- |
| name    | 设置或返回一个错误名           |
| message | 设置或返回一个错误信息(字符串) |

~~~js
try {
    adddlert("Welcome");
}
catch(err) {
    document.getElementById("demo").innerHTML = 
    err.name + "<br>" + err.message;
}
~~~

### Window对象

**frames**

frames 属性返回窗口中所有命名的框架。

每个Windows对象在窗口中含有一个框架或`<iframe>`,属性 frames.length 存放数组 frames[] 中含有的元素个数。

**History对象**

包含用户访问过的URL，有三种方法

| 方法      | 说明                              |
| :-------- | :-------------------------------- |
| back()    | 加载 history 列表中的前一个 URL   |
| forward() | 加载 history 列表中的下一个 URL   |
| go()      | 加载 history 列表中的某个具体页面 |

go()方法的参数可以是数字，使用的是要访问的URL在History的URL列表中的相对位置，或使用一个字符串，字符串必须是局部或完整的URL，该函数会去匹配字符串的第一个URL。

**location对象**

Location 对象包含有关当前 URL 的信息。

**Location 对象属性**

| 属性     | 描述                          |
| :------- | :---------------------------- |
| hash     | 返回一个URL的锚部分           |
| host     | 返回一个URL的主机名和端口     |
| hostname | 返回URL的主机名               |
| href     | 返回完整的URL                 |
| pathname | 返回的URL路径名               |
| port     | 返回一个URL服务器使用的端口号 |
| protocol | 返回一个URL协议               |
| search   | 返回一个URL的查询部分         |

对象有三个方法，

| 方法      | 说明                   |
| :-------- | :--------------------- |
| assign()  | 载入一个新的文档       |
| reload()  | 重新载入当前文档       |
| replace() | 用新的文档替换当前文档 |

window.location.assign(url) ： 加载 URL 指定的新的 HTML 文档。就相当于一个链接，跳转到指定的url，当前页面会转为新页面内容，可以点击后退返回上一个页面。

window.location.replace(url) ： 通过加载 URL 指定的文档来替换当前文档，这个方法是替换当前窗口页面，前后两个页面共用一个窗口，所以是没有后退返回上一页的

**compareDocumentPosition()方法**

**compareDocumentPosition()** 方法按照文档顺序，比较当前节点与指定节点的文档位置

1：没有关系，这两个节点不属于同一个文档。

2： 第一节点（P1）位于第二个节点后（P2）。

4：第一节点（P1）定位在第二节点（P2）前。

8： 第一节点（P1）位于第二节点内（P2）。

16： 第二节点（P2）位于第一节点内（P1）。

32:没有关系的，或是两个节点在同一元素的两个属性。

**注意：** 回值可以是值的组合。例如，返回 20 意味着在 p2 在 p1 内部（16），并且 p1 在 p2 之前（4）。

### Laber标签

`<label>`标签为input元素定义标注

label元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性，如果你在label元素中点击文本，就会触发此控件。就是说，当用户选择改标签时，浏览器会自动将交代能赚到和标签相关的表单控件上。

`<label>`标签的for属性应当与相关元素的id属性相同

### :nth-of-type()选择器

选取属于其父元素的特定类型的第 *n* 个子元素的所有元素。

### Promise

Promise的作用？

1、主要用于异步计算
 2、可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
 3、可以在对象之间传递和操作promise，帮助我们处理队列

resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
 reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

promise有三个状态：
 1、pending[待定]初始状态
 2、fulfilled[实现]操作成功
 3、rejected[被否决]操作失败
 当promise状态发生改变，就会触发then()里的响应函数处理后续步骤；
 promise状态一经改变，不会再变。

Promise对象的状态改变，只有两种可能：
 从pending变为fulfilled
 从pending变为rejected。
 这两种情况只要发生，状态就凝固了，不会再变了

.then()

1、接收两个函数作为参数，分别代表fulfilled（成功）和rejected（失败）
 2、.then()返回一个新的Promise实例，所以它可以链式调用
 3、当前面的Promise状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行
 4、状态响应函数可以返回新的promise，或其他值，不返回值也可以我们可以认为它返回了一个null；
 5、如果返回新的promise，那么下一级.then()会在新的promise状态改变之后执行
 6、如果返回其他任何值，则会立即执行下一级.then()

### fetch

fetch接收一个url作为参数，发起GET请求，返回Promise，这个 promise 会在请求响应后被 resolve，并传回 `Response` 对象

因为Window和WorkerGlobalScope都实现了WorkerOrGlobalScope。所以只要想获取资源都可以使用fetch()方法。

### setInterval()方法

setInterval() 方法可按照指定的周期来调用函数或计算表达式。

这个方法会不停地调用函数，直到clearInterval()被调用或窗口被关闭。由setInterval()返回的ID值可用作clearInterval()的参数。

语法：

~~~js
setInterval(code, milliseconds);
setInterval(function, milliseconds, param1, param2, ...)
//param为传给执行函数的其他参数
~~~

### setTimeout() 方法

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

~~~js
setTimeout(code, milliseconds, param1, param2, ...)
setTimeout(function, milliseconds, param1, param2, ...)
//param为传给执行函数的其他参数
~~~

### JS常用方法

**除数取整：**

1.只保留整数部分：parseInt(5/2)

2.向上取整,有小数就整数部分加1：Math.ceil(5/2)

3,四舍五入：Math.round(9/2)

4,向下取整：Math.floor(5/2)

**大小写**：

1.使字符串全部变为小写：toLowerCase() \ toLocaleLowerCase()

2.使全部字符变为大写：toUpperCase() \ toLocaleUpperCase()

**字符串相关**：

1.返回指定索引的字符：charAt()

2.字符串拼接：concat()

3.取从第几位到指定长度的字符串：substr()

```js
var stringValue = "hello world";
console.log(stringValue.substr(3)); //"lo world"
console.log(stringValue.substr(3,7)); //"lo worl"
```

4.取介于两个指定下标之间的字符串：substring()

```js
var stringValue = "hello world";
console.log(stringValue.substring(3)); //"lo world"
console.log(stringValue.substring(3,7)); //"lo w"
```

5.返回一个新的数组,介于两个指定下标之间的字符串：slice()

```js
var stringValue = "hello world";
console.log(stringValue.slice(3)); //"lo world"
console.log(stringValue.slice(3,7)); //"lo w"
```

6.返回子字符串的位置(没有找到返回-1)：首次的位置：IndexOf、最后的位置：lastIndexOf

```js
var stringValue = "hello world";
console.log(stringValue.indexOf("o"));  //4
console.log(stringValue.lastIndexOf("o")); //7
```

7. 删除头尾的空格：trim()

8.检索指定的值：match()

```js
var str1 = "lixiaoqi";
console.log(str1.match('iao')); //检索字符串，返回的是字符
console.log(str1.match('lll')); //没有指定的字符，返回的是null
```

9.返回指定的第一个匹配项的索引(未检测到返回-1)：search()

10.替换现有字符串：.replace()

11.把字符串分割成字符串数组：split(分隔符)

**数组相关**

. 返回从原数组中指定开始下标到结束下标之间的项组成的新数组（原数组不变）：slice()

```js
var arr = [1,2,3,4,5,6,7,8];
console.log(arr.slice(4)); //从4开始到结束 [5, 6, 7, 8]
console.log(arr.slice(2,6));//数组下表从0开始，从2开始，到6的前一个位置结束 [3, 4, 5, 6]
```

2.splice()

删除（2个参数，起始位置，删除的项数）
插入（3个参数，起始位置，删除的项数，插入的项）
替换（任意参数，起始位置，删除的项数，插入任意数量的项数）

```js
var arr = [1,2,3,4,5];
console.log(arr.slice(2,3)); // 实际得到的新数组的项数是end-strat [3]
console.log(arr.slice(1,5)); // [2, 3, 4, 5]
```

3.将参数添加到数组的最后，返回新数组的长度：push()

```js
var arr = [1,2,3,4,5];
console.log(arr.push(6,7,8)); // 返回的是新数组的长度 8
```

4.删除数组的最后一个元素，返回被删除的值(减少数组的长度)：pop()

```js
var arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.pop()); // e
console.log(arr.length); // 4
```

5.向数组的开头添加一个或多个的元素，并返回新的长度：unshift()

```js
var arr = [1,2,3,4,5];
console.log(arr.unshift(2,4,5,{name:'liqi'})); //返回的是新数组的长度 9
```

6.删除数组的第一个参数，数组的长度减1：shift()

```js
var arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.shift()); // 返回的是删除的数组的值 a
```

7.按指定的参数对数组进行排序，返回的值是经过排序后的数组： sort()

```js
var arr = [1,'q',3,6,2,'a',9];
console.log(arr.sort()); // 返回的是排序后的数组  [1, 2, 3, 6, 9, "a", "q"]
```

8.将数组中的元素进行反转，倒序显示：reverse()

```js
var arr = [1,2,3,4,5]
console.log(arr.reverse()); // [5, 4, 3, 2, 1]
```

9.把两个字符串连接起来，返回的值是一个副本：concat(a, b)

```js
var arr1 = [1,'q',3,6,2,'a',9];
console.log(arr1.concat('-', arr1)); //新创建一个数组，原数组不变 [1, "q", 3, 6, 2, "a", 9, "-", 1, "q", 3, 6, 2, "a", 9]
console.log(arr1); //原数组不变 [1,'q',3,6,2,'a',9]
```

10.用分隔符将数组的元素组成一个字符串：join()

```js
var arr1 = [1,'q',3,6,2,'a',9];
console.log(arr1.join(',')); //以逗号分隔 1,q,3,6,2,a,9
console.log(arr1.join(' ')); //以空格分隔 1 q 3 6 2 a 9
```

11.从数组的开头向后查找，（接受两个参数，要查找的项和查找起点的位置索引）：indexOf()

```js
var arr = [1,2,3,4,5,6,78];
console.log(arr.indexOf(78, 2)); // 查找78所在的位置，返回的项的索引 6
console.log(arr.indexOf(3, 1)); // 2
console.log(arr.indexOf(2)); // 1
```

12.从数组末尾开始获取：lastIndexof()

13.遍历数组：for

```js
var arr = [1, 4, 9, 16];
for (var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
```

14.对数组的每个元素执行一次提供的函数：foeEach()

```js
var arr = ['a', 'b', 'c'];
arr.forEach(function(item) {
  console.log(item);  // a  // b  // c 
});
```

15.对数组的每一项运行给定的函数，返回没戏函数调用的结果组成的数组：map()

```js
var arr = [1, 4, 9, 16];
console.log(arr.map(x => x * 2)); //对数组的每项*2 [2, 8, 18, 32]
```

16.通过检查指定数组中符合条件的所有元素（不会改变原始数组）：filter()

```js
var arr = [1,12,7,8,5]
function fn(i) {
   return i > 5;
}
console.log(arr.filter(fn)); // [12, 7, 8]
```

17.把数组转换成字符串，每一项用,分割：toString()

```js
var arr = [1,2,3,4,5]
console.log(arr.toString()); // 1,2,3,4,5
```

18.every和some

every 是所有函数的每个回调都返回 true 的时候才会返回 true，当遇到 false 的时候终止执行，返回 false。

some 函数是存在有一个函数返回 true 的时候终止执行并返回 true，否则返回 false。

```js
// every
var arr = [1,6,8,-2,-5,7,-4]
var isPositive = arr.every(function(value){
    return value > 0;
})
console.log(isPositive) // false

//some
var arr = [1,6,8,-2,-5,7,-4]
var isPositive = arr.some(function(value){
    return value > 0;
})
console.log(isPositive) // true
```

19.reduce(function(v1,v2),value) 和 reduceRight(functio(v1,v2),value)

遍历数组，调用回调函数，将数组元素组合成一个值，reduce 从索引最小值开始，reduceRight 反向，方法有两个参数（回调函数，把两个值合成一个，返回结果；value,一个初始值，可选） 

```js
var arr = [1,2,3,4,5,6]
console.log(arr.reduce(function(v1,v2){
    return v1 + v2;
})) // 21
//开始是1+2 = 3，之后3+3 =6，之后6+4 =10，之后
//10+5 =15，最后15+6 =21

console.log(arr.reduce(function(v1,v2){
    return v1 - v2;
},100)) // 79
//开始的时候100-1=99，之后99-2=97，之后97-3=94，之后
//94-4=90，之后90-5=85，最后85-6=79
```

20.判断一个对象是否为数组：isArray()

```js
var arr = [3,4,5]
console.log(Array.isArray(arr)); // true
```

### Math

Math本身就是一个对象, 不需要在通过构造函数去创建, 该对象中集合了很多关于数学运算的方法

Math.abs() 获取一个对象的绝对值

Math.round() 四舍五入

Math.PI π

Math.max() 求几个数的最大数

Math.min() 求几个数的最小数

Math.ceil() 向上取整

Math.floor() 向下取整

Math.random() 随机数 (随机生成0 ~1之间的数)

### Generators(生成器)

生成器是一种特殊的行为，实际上是一种设计模式，咱们通过调用 next() 方法来遍历一组有序的值。想象一下，例如使用遍历器对数组[1,2,3,4,5]进行遍历。第一次调用 next() 方法返回1，第二次调用 next() 方法返回2，以此类推。当数组中的所有值都返回后，调用 next() 方法将返回 null 或 false 或其它可能的值用来表示数组中的所有元素都已遍历完毕。

~~~JS
function* greeter() {
  yield 'Hi';
  yield 'How are you?';
  yield 'Bye';
}
const greet = greeter();
console.log(greet.next().value);// 'Hi'
console.log(greet.next().value);// 'How are you?'
console.log(greet.next().value);// 'Bye'
console.log(greet.next().value);// undefined
~~~

使用生成器生成无限个值

~~~js
function* idCreator() {
	let i = 0;
    while (true)
        yield i++;
}
const ids = idCreator();
console.log(ids.next().value);// 0
console.log(ids.next().value);// 1
console.log(ids.next().value);//2
~~~

### 对象比较

在js中，如果直接进行对象的比较会出错。

~~~js
const joe1 = { name: '小邓' };
const joe2 = { name: '小邓' };
console.log(joe1 === joe2); // false
~~~

变量指向内存中对象的引用，而不是对象本身。实际比较他们的方法是将对象转换为JSON字符串。

转换为JSON字符有一个缺点，对象属性顺序不能保证，更安全的方法是引入专门进行深度对象比较的库（如：lodash 中 isEqual）

### attribute、property

- property是DOM中的属性，是JavaScript中的对象;

- attribute是HTML标签上的特性，它的值只能够是字符串;

通过dom方法可以获取property内容

~~~js
<div id="div1" class="divClass" title="divTitle" title1="divTitle1"></div>
var in1=document.getElementById("div1");
console.log(in1);
~~~

其中部分的property内容如下：

![img](https://images2018.cnblogs.com/blog/1264915/201804/1264915-20180409144407228-1277683674.png)

property中不仅包含了“attributes”的属性，类型是NamedNodeMap，同时还有“id”和“className”、”title“等基本的属性，但没有“titles”这个自定义的属性。

所以property对象是每一个DOM对象都会有默认的基本属性，而在创建的时候，它只会创建这些基本属性，自定义标签不会放进DOM中。

其中的attributes内容如下：

![img](https://images2018.cnblogs.com/blog/1264915/201804/1264915-20180409150827148-16914777.png)

“title1”被放在了attributes这个对象里，这个对象按顺序记录了我们在TAG中定义的属性和属性的数量。

### 解构赋值

~~~js
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3
let [ , , third] = ["foo", "bar", "baz"];
third // "baz"
let [x, , y] = [1, 2, 3];
x // 1
y // 3
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
~~~

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

解构赋值允许使用默认值煤制油一个数组成员严格等于undefined，默认值才会生效

解构赋值同样可以用于对象

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

### 模板字符串

模板字符串是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

模板字符串中所有的空格和换行都会被保留

模板字符串中嵌入变量，需要将变量名写在${}中，大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

### 标签模板

标签模板用于处理模板字符串，它作为函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

~~~js
function tag(stringArr, value1, value2){
}
// 等同于
function tag(stringArr, ...values){
}
~~~

