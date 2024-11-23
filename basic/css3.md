# 单行文字溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```



# 文字多行溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp:3;        // 显示的行数
```



# 实现水平垂直居中

- 利用绝对定位，先将元素的左上角通过 `top:50%` 和 `left:50%` 定位到页面的中心，然后再通过 `translate` 来调整元素的中心点到页面的中心。该方法需要**考虑浏览器兼容问题。**

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
```

- 利用绝对定位，设置四个方向的值都为 `0` ，并将 `margin` 设置为 `auto` ，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。该方法适用于盒子有宽高的情况：

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

****



- 利用绝对定位，先将元素的左上角通过 `top:50%` 和 `left:50%` 定位到页面的中心，然后再通过 `margin` 负值来调整元素的中心点到页面的中心。该方法适用于**盒子宽高已知**的情况

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;     /* 自身 height 的一半 */
    margin-left: -50px;    /* 自身 width 的一半 */
}
```

- 使用 `flex`布局，通过 `align-items:center ` 和 `justify-content:center` 设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。该方法要**考虑兼容的问题**，该方法在移动端用的较多：

```css
.parent {
    display: flex;
    justify-content:center;
    align-items:center;
}
```



# 网格（grid）布局

> [!TIP]
>
> 常用属性
>
> 父元素属性：
>
> - `grid-template-rows/columns`：规定列和行的尺寸。
> - `gap`：定义栅格布局的行与列间隙的尺寸。
>
> 子元素属性：
>
> - `grid-row`：指定元素占多少行；如：`grid-row: 1/3` 表示该元素占据 `[1, 3)` 行
> - `grid-column`：指定元素占多少列；如：`grid-column: 1/3` 表示该元素占据 `[1, 3)` 列
>
> 这里的`/`不是除号的意思，仅是占位的作用。如果只写一个数字的话，默认跨越1个网格

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .headTitle {
            font-size: 32px;
            text-align: center;
            color: blueviolet;
        }

        .layout {
            /* width: 80%; */
            width: 1400px;
            min-height: 500px;
            background-color: #fff;
            border-radius: 10px;
            margin: 0 auto;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            padding: 30px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            /* 响应式（使用响应式，宽度不能固定，可以写成百分比形式） */
            /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
            gap: 30px;
        }

        .layout .box {
            background-color: aqua;
            border-radius: 8px;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

        .layout .box1 {
            grid-row: 1/3;
            grid-column: 1/3;
        }
    </style>
</head>

<body>
    <div class="headTitle">grid布局</div>
    <div class="layout">
        <div class="box box1">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
        <div class="box">box</div>
    </div>
</body>

</html>
```



# 卡片翻转效果

![img](/css_images/卡片翻转.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/card.css">
</head>

<body>
    <!-- 小球区域 -->
    <div class="ball ball-left"></div>
    <div class="ball ball-right"></div>

    <!-- 卡片区域 -->
    <div class="outer">
        <div class="inner">
            <!-- 卡片正面 -->
            <div class="card front-face">
                <h1>正面</h1>
                <button>去反面</button>
            </div>
            <!-- 卡片反面 -->
            <div class="card back-face">
                <h1>反面</h1>
                <button>去正面</button>
            </div>
        </div>
    </div>
</body>

</html>
```

```less
html,
body {
    background-color: #000;
    margin: 0;
    padding: 0;
}

.ball {
    width: 250px;
    height: 250px;
    background-color: rebeccapurple;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
}

.ball-left {
    transform: translate(calc(-50% - 230px), calc(-50% - 130px));
    background: linear-gradient(-45deg, rgb(96, 242, 157), rgb(34, 204, 247));
    animation: ani-ball 2s linear infinite alternate;
}

.ball-right {
    transform: translate(calc(-50% + 230px), calc(-50% + 130px));
    background: linear-gradient(90deg, rgb(238, 29, 193), rgb(243, 167, 239));
    animation: ani-ball 2s linear infinite alternate-reverse;
}

@keyframes ani-ball {
    from {
        width: 250px;
        height: 250px;
    }

    to {
        width: 230px;
        height: 230px;
    }
}

.outer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    perspective: 1000px;

    &:hover .inner {
        transform: rotateY(180deg);
    }

    .inner {
        width: 500px;
        height: 300px;
        transition: .6s;
        transform-style: preserve-3d;


        .card {
            width: 100%;
            height: 100%;
            letter-spacing: 0.2em;
            overflow: hidden;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            // 这个样式一定要添加到内部的正反面盒子上
            backface-visibility: hidden;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
            // 毛玻璃效果
            backdrop-filter: blur(30px);
            color: #fff;
        }

        .front-face {
            z-index: 2;
        }

        .back-face {
            z-index: 1;
            transform: rotateY(180deg);
        }
    }
}

input,
button {
    padding: 10px;
    border-radius: 6px;
}
```



# 发光边角鼠标跟随效果

![img](/css_images/发光边角鼠标跟随效果.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/index.css">
    <script>
        onload = () => {
            const colors = ['#f00', '#f0f', '#ff0', '#0f0']
            const wrappers = document.querySelectorAll('.card-wrapper');
            wrappers.forEach((wrapper, i) => {
                wrapper.style.setProperty('--color', colors[i % 4]);

                wrapper.addEventListener('mousemove', (e) => {
                    const rect = wrapper.getBoundingClientRect()
                    const x = e.pageX - rect.left
                    const y = e.pageY - rect.top
                    wrapper.style.setProperty('--x', `${x}px`)
                    wrapper.style.setProperty('--y', `${y}px`)
                })
            })
        }
    </script>
</head>

<body>
    <div class="container">
        <div class="card-wrapper">
            <div class="card">
                <h3>使用人群</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti saepe quis voluptatibus
                    laborum, tempora in vitae magnam expedita nesciunt, culpa dicta quibusdam commodi eos fuga doloribus
                    soluta minima nam?</p>
            </div>
        </div>
        <div class="card-wrapper">
            <div class="card">
                <h3>课程亮点</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam rem accusamus quidem, voluptates
                    iste sequi temporibus, placeat labore et delectus suscipit velit non quo omnis dolore. Aliquam illo
                    autem cum.</p>
            </div>
        </div>
        <div class="card-wrapper">
            <div class="card">
                <h3>讲师介绍</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ea nemo eos possimus sit
                    accusantium recusandae, quos sequi temporibus mollitia molestias consequatur explicabo?
                    Exercitationem quia perferendis reiciendis laudantium? Odio, sed?</p>
            </div>
        </div>
    </div>
</body>

</html>
```



```less
html,
body {
    background-color: #000;
    color: #fff;
    font-size: 12px;
}

.container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-evenly;

    .card-wrapper {
        width: 25%;
        padding: 20px 40px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        border-radius: 15px;

        &::before {
            position: absolute;
            left: var(--x);
            top: var(--y);
            content: '';
            display: block;
            width: 400px;
            height: 400px;
            background: radial-gradient(var(--color), transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);

        }

        &::after {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(33, 33, 33, 0.5);
            border-radius: 15px;
        }

        .card {
            z-index: 9;
            position: relative;
            letter-spacing: 0.1em;
        }
    }
}
```



# 元素宽高等比例

> [!TIP]
>
> 方法一：
>
> 使用 `css` 属性 `aspect-ratio` 来实现
>
> 语法格式：
>
> `aspect-ratio: <width-ratio>/<height-ratio>`
>
> 示例：
>
> `aspect-ratio:1.618/1`
>
> 如果 `<height-ratio>` 为 `1`，则可以省略
>
> `aspect-ratio:1.618`
>
> 方法二：
>
> `polyfill` 写法（兼容性更好的写法）如果 `item` 里面要放置内容，直接向 `container` 里面加就可以了
>
> `html`内容：
>
> ```html
> <div class="item">
> 	<div class="inner">
>         <div class="container"></div>
>     </div>
> </div>
> ```
>
> `css` 内容：
>
> ```css
> .item {
>     background: red;
>     width: 50%;
>     margin: 0 auto;
> }
> 
> .inner {
>     width: 100%;
>     padding-top: 75%;
>     height: 0;
>     position: relative;
> }
> 
> .container {
>     position: absolute;
>     inset: 0;
>     background: black;
> }
> ```
>
> 





# 设置元素的列宽和列数

> [!TIP]
>
> `CSS` 属性 **`columns`** 用来设置元素的列宽和列数。
>
> [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) `column-rule` [简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)可以在多列布局中设定分割线的宽度、样式和颜色。
>
> [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **`column-gap`** 属性用来设置元素列之间的间隔（[gutter](https://developer.mozilla.org/zh-CN/docs/Glossary/Gutters)）大小。

![img](/css_images/三列文字_2.png)

需求：实现三列文字效果，如下图所示：

![img](/css_images/三列文字_1.png)



实现：

```html
<div class="three-column-text">
  .......
</div>
```

```css
  .three-column-text {
    columns: 3 auto;
    column-rule: solid 1px #ddd;
    column-gap: 20px;
    padding: 10px;
  }
```



# 让 img 图像适合容器 div

> [!TIP]
>
> 使用 `css` 的 `object-fit` 属性。将其设置为：`cover`



# 列表数字样式设置

要求：

将

![img](/css_images/列表样式_1.png)

变为

![img](/css_images/列表样式_2.png)

只需添加两行代码即可

```css
ol > li::marker {
  color: #f44336;
  content: counters(list-item, ".") " ";
}
```



> [!TIP]
>
> 1. **选择器 `ol > li::marker`**：
>
>    - `ol`：选择所有的有序列表元素。
>    - `>`：子选择器，表示选择 `ol` 的直接子元素。
>    - `li`：选择所有的列表项元素。
>    - `::marker`：伪元素，表示**列表项的标记**（通常是数字或字母）。
>
> 2. **属性 `color: #f44336`**：
>
>    - `color`：设置列表项标记的颜色。
>    - `#f44336`：这是一个十六进制颜色值，表示一种红色。
>
> 3. **属性 `content: counters(list-item, ".") " "`**：
>
>    - `content`：用于生成内容。在这里，它用于生成列表项的标记内容。
>
>    - ```css
>      counters(list-item, ".")
>      ```
>
>      ：这是一个计数器函数，用于生成嵌套列表项的编号。
>
>      - `list-item`：计数器的名称。默认情况下，`<ol>` 和 `<ul>` 元素会使用 `list-item` 计数器。
>      - `"."`：计数器之间的分隔符。例如，对于嵌套的列表项，编号可能会显示为 `1.1`、`1.2` 等。
>
>    - `" "`：在生成的编号后面添加一个空格，以确保编号和列表项文本之间有适当的间距。



# 0.5px 的边框

> [!TIP]
>
> 问题引入：
>
> 当我们在 `CSS` 中设置 `0.5px` 时，通常会被浏览器四舍五入。 但是，对于像 `Retina` 显示器这样越来越好的显示，`1px` 有时看起来会很厚。
>
> 请为以下 `div` 添加 `0.5px` 的黑色上边框。
>
> ```html
> <div class="hairline"></div>
> ```
>
> 



实现的效果如下：

![img](/css_images/0.5px边框.png)

代码：

```css
.hairline {
  width: 150px;
  border-top: 1px solid black;
  transform: scaleY(0.5);
  /* 重点要设置 transform-origin */
  transform-origin: 0 0;
}
```



# 环形图

> [!TIP]
>
> 需求：
>
> 让我们用 `CSS` 创建一个环形图（`doughnut chart`）。
>
> - 半径：`50px`
> - 厚度：`10px`
> - 颜色：`#f44336`
> - 百分比应能够通过 `CSS` 变量 `--percentage` 设置
>
> 例如，创建一个百分比为 `20%` 的环形图：
>
> ```html
> <div class="piechart" style="--percentage:20%"></div>
> ```
>
> `75%`:
>
> ```html
> <div class="piechart" style="--percentage:75%"></div>
> ```

![img](/css_images/饼图_1.png)

![img](/css_images/饼图_2.png)

![img](/css_images/饼图_3.png)

```css
.piechart {
  width: 100px;
  height: 100px;
  clip-path: circle(50px at center);
  background-image: conic-gradient(#f44336 var(--percentage), transparent 0);
  mask-image: radial-gradient(circle closest-side at center, transparent 80%, #fff 80%);
}

```

> [!TIP]
>
> ### 逐行解释
>
> 1. **选择器 `.piechart`**：
>
>    - 选择所有带有 `piechart` 类的元素。
>
> 2. **属性 `width: 100px` 和 `height: 100px`**：
>
>    - 设置元素的宽度和高度分别为 100 像素，使其成为一个正方形。
>
> 3. **属性 `clip-path: circle(50px at center)`**：
>
>    - 使用 `clip-path` 属性将正方形裁剪成一个圆形。
>    - `circle(50px at center)` 表示创建一个半径为 50 像素的圆，圆心位于元素的中心。
>
> 4. **属性 `background-image: conic-gradient(#f44336 var(--percentage), transparent 0)`**：
>
>    - 使用 `conic-gradient` 函数创建一个圆锥渐变背景。
>
>    - `#f44336` 是渐变的颜色，表示饼图的填充色。
>
>    - ```css
>      var(--percentage)
>      ```
>
>       
>
>      是一个 CSS 变量，表示渐变的结束角度。这个变量应该在其他地方定义，例如：
>                
>      css深色版本
>                
>      ```css
>      :root {
>        --percentage: 70%; /* 例如，表示 70% */
>      }
>      ```
>
>    - `transparent 0` 表示从 `var(--percentage)` 开始到 0 度（即整个圆的结束）的部分是透明的。
>
> 5. **属性 `mask-image: radial-gradient(circle closest-side at center, transparent 80%, #fff 80%)`**：
>
>    - 使用 `mask-image` 属性创建一个遮罩图像，用于进一步控制饼图的显示区域。
>
>    - ```css
>      radial-gradient(circle closest-side at center, transparent 80%, #fff 80%)
>      ```
>
>       
>
>      表示创建一个径向渐变遮罩。
>                
>      - `circle closest-side at center` 表示创建一个圆心在元素中心的径向渐变，圆的大小由最近的边决定。
>      - `transparent 80%` 表示从圆心到 80% 的部分是透明的。
>      - `#fff 80%` 表示从 80% 到边缘的部分是白色的。



# display: none 情况下图片是如何加载的

`html` 渲染页面的步骤：

![img](/css_images/渲染页面.png)

看懂上图就很好理解之类问题了，如果现在有一个页面需要加载大量的静态资源（图片等多媒体文件）。但是我们又并不需要使用所有资源。

我们使用语义化标签（例如`<img src="..//">`）去导入处理资源的同时就相当于把资源加载放到了 `Dom` 树中。即使添加了 `css` 规则（`display:none`）资源没有展示，但是也是会加载。数量很多就很导致页面响应速度迟钝。

解决办法：
善用 `css` 的加载机制(如 `background:url` 资源导入)，`display:none` 规则下的静态资源不会进行加载，完成`DOM` 树后，`CSS` 树对 `DOM` 树渲染合成`render` 树，避免了无用静态资源加载的问题。相应的 `display:none` 也会引起页面重排、重绘。



**1. 元素有 display: none**

> [!IMPORTANT]
>
> **如果元素有 {display: none;} 的样式的话，标签上的图片会被请求加载，但是不会被渲染**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>test</title>
</head>
<style>

.img-container {
	background-image: url(../imgs/icon1.png);
}

</style>
<body>
    <div class="img-container" style="display:none"></div>
    <img src="../imgs/icon2.png" style="display:none">
  </div>
</body>
</html>

```



**2. 如果父元素有{display: none;}**

> [!IMPORTANT]
>
> 如果父元素有 `{display: none;}` 的样式的话，子元素在样式表中的**背景图片既不会渲染也不会加载**，但是**标签上的图片会被加载不会被渲染**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>test</title>
</head>
<style>

.img-container {
	background-image: url(../imgs/icon1.png);
}

</style>
<body>
<div style="display:none">
    <div class="img-container"></div>
    <img src="../imgs/icon2.png">
</div>
</body>
</html>
```



**3.伪类背景图片只在触发伪类时候才会请求加载（因此建议请求雪碧图---即一堆小图汇总到一张大图上，这样不会有UI跳跃感）**

**4.已经请求过的相同图片不会重复请求**

**5.不存在的元素，即时样式表里有写，也不会请求加载**



# 回流（重排）与重绘

> [!TIP]
>
> 回流与重排是一个概念。

## 回流

当渲染树中部分或者全部元素的**尺寸**、**结构或者属性**发生变化时，浏览器会重新渲染部分或者全部文档的过程就称为**回流**。

下面这些操作会导致回流：

- 页面的首次渲染
- 浏览器的窗口大小发生变化
- 元素的内容发生变化
- 元素的尺寸或者位置发生变化
- 元素的字体大小发生变化
- 激活 `CSS` 伪类
- 查询某些属性或者调用某些方法
- 添加或者删除可见的 `DOM` 元素

在触发回流（重排）的时候，由于浏览器渲染页面是基于流式布局的，所以当触发回流时，会导致周围的 `DOM` 元素重新排列，它的影响范围有两种：

- 全局范围：从根节点开始，对整个渲染树进行重新布局
- 局部范围：对渲染树的某部分或者一个渲染对象进行重新布局



## 重绘

当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位置时，浏览器就会对元素进行重新绘制，这个过程就是**重绘**。

下面这些操作会导致重绘：

- `color、background` 相关属性：`background-color、background-image` 等
- `outline` 相关属性：`outline-color、outline-width 、text-decoration`
- `border-radius、visibility、box-shadow`

> [!WARNING]
>
> 注意： **当触发回流时，一定会触发重绘，但是重绘不一定会引发回流。**



# 如何避免回流（重排）与重绘

**减少回流与重绘的措施：**

- 操作 `DOM` 时，尽量在低层级的 `DOM` 节点进行操作
- 不要使用`table`布局， 一个小的改动可能会使整个`table`进行重新布局
- 使用 `CSS` 的表达式
- 不要频繁操作元素的样式，对于静态页面，可以修改类名，而不是样式。
- 使用 `absolute` 或者 `fixed`，使元素脱离文档流，这样他们发生变化就不会影响其他元素
- 避免频繁操作 `DOM`，可以创建一个文档片段`documentFragment`，在它上面应用所有 `DOM` 操作，最后再把它添加到文档中
- 将元素先设置`display: none`，操作结束后再把它显示出来。因为在 `display` 属性为 `none` 的元素上进行的 `DOM` 操作不会引发回流和重绘。
- 将 `DOM` 的多个读操作（或者写操作）放在一起，而不是读写操作穿插着写。这得益于**浏览器的渲染队列机制**。

浏览器针对页面的回流（重排）与重绘，进行了自身的优化——**渲染队列**

> [!TIP]
>
> **浏览器会将所有的回流（重排）、重绘的操作放在一个队列中，当队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会对队列进行批处理。这样就会让多次的回流、重绘变成一次回流重绘。**

上面，将多个读操作（或者写操作）放在一起，就会等所有的读操作进入队列之后执行，这样，原本应该是触发多次回流（重排），变成了只触发一次回流（重排）。



# css选择器 .a.b 和.a .b分别代表着什么

在 `CSS` 中，选择器用于选择文档中的特定元素，并为其应用样式。`.a.b` 和 `.a .b` 是两种不同的选择器，它们代表的意义和选择的元素也不同。下面详细解释这两种选择器的含义：

### 1. **`.a.b`**

- **含义**：选择同时具有类 `a` 和类 `b` 的元素。
- **选择的元素**：元素必须同时拥有 `class="a"` 和 `class="b"` 属性。

#### 示例

html深色版本

```html
<div class="a b">This element will be selected.</div>
<div class="a">This element will not be selected.</div>
<div class="b">This element will not be selected.</div>
```

css深色版本

```css
.a.b {
  color: red;
}
```

在这个示例中，只有第一个 `<div>` 元素会被选中并应用红色文本样式，因为它同时具有 `class="a"` 和 `class="b"`。

### 2. **`.a .b`**

- **含义**：选择类 `b` 的元素，但这些元素必须是类 `a` 元素的后代。
- **选择的元素**：元素必须是类 `a` 元素的子元素、孙元素等任意级别的后代。

#### 示例

```html
<div class="a">
  <div class="b">This element will be selected.</div>
  <span>This element will not be selected.</span>
</div>
<div class="b">This element will not be selected.</div>
```

```css
.a .b {
  color: blue;
}
```

在这个示例中，只有第一个 `<div>` 元素内的 `.b` 元素会被选中并应用蓝色文本样式，因为它是一个类 `a` 元素的后代。

## 总结

- **`.a.b`**：选择同时具有类 `a` 和类 `b` 的元素。
- **`.a .b`**：选择类 `b` 的元素，但这些元素必须是类 `a` 元素的后代。



