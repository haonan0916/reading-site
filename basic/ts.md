# TS 简介

![img](https://cdn.nlark.com/yuque/0/2024/png/35780599/1722439654631-2fde25e1-a0e1-4cb6-bb78-f4d552d784ee.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_dGlhbnl1%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

1. `TypeScript`由**微软**开发，是基于`JavaScript`的一个**扩展语言**。
2. `TypeScript`包含了`JavaScript`的所有内容，即：`TypeScript`是`JavaScript`的**超集**。
3. `TypeScript`增加了：静态类型检查、接口、 泛型等很多**现代开发特性**，更适合**大型项目**的开发。
4. `TypeScript`需要**编译**为`JavaScript`，然后交给浏览器或其他`JavaScript`运行环境执行。

# 为何需要 TS

## JS 的困扰

### 1. 不清楚的数据类型

```js
let welcome = "hello";
welcome(); // 此行报错：TypeError: welcome is not a function
```

### 2. 有漏洞的逻辑

```js
const str = Date.now() % 2 ? "奇数" : "偶数";

if (str !== "奇数") {
  alert("hello");
} else if (str === "偶数") {
  alert("world");
}
```

### 3. 访问不存在的属性

```js
const obj = { width: 10, height: 15 };
const area = obj.width * obj.height;
```

### 4. 低级的拼写错误

```js
const message = "hello, world";
message.toUperCase(); // 应该是 message.toUpperCase()
```

## 静态类型检查

- 在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时出现异常的几率，此种检查叫『**静态类型检查**』，`TypeScript` 核心就是『静态类型检查』，简言之就是**把运行时的错误前置**。
- 同样的功能，`TypeScript` 的代码量要**大于** `JavaScript`，但由于` TypeScript` 的代码结构更加清晰，在后期代码的维护中 `TypeScript` 却**胜于** `JavaScript`。

# 编译 TS

> [!TIP]
>
> 浏览器不能直接运行 `TypeScript` 代码，需要编译为 `JavaScript` 再交由浏览器解析器执行。

## 1. 命令行编译

> 要把`.ts`文件编译为`.js`文件，需要配置`TypeScript`的编译环境，步骤如下：

- **第一步**：创建一个`demo.ts`文件，例如：

```js
const person = {
  name: "李四",
  age: 18,
};
console.log(`我叫${person.name}，我今年${person.age}岁了`);
```

- **第二步**：全局安装`TypeScript`

```bash
npm i typescript -g
```

- **第三步**：使用命令编译`.ts`文件

```bash
tsc demo.ts
```

## 2. 自动化编译

- **第一步**：创建`TypeScript`编译控制文件

```bash
tsc --init
```

> [!TIP]
>
> 1. 工程中会生成一个`tsconfig.json`配置文件，其中包含着很多编译时的配置。
> 2. 观察发现，默认编译的`JS`版本是`ES7`，我们可以手动调整为其他版本。

- **第二步**：监视目录中的`.ts`文件变化

```bash
tsc --watch 或 tsc -w
```

- **第三步**：小优化，当编译出错时不生成`.js`文件

```bash
tsc --noEmitOnError --watch
```

> [!NOTE]
>
> 备注：当然也可以修改`tsconfig.json`中的`noEmitOnError`配置

# 类型声明

使用`:`来对**变量**或**函数形参**，进行类型声明：

```js
let a: string; // 变量a只能存储字符串
let b: number; // 变量b只能存储数值
let c: boolean; // 变量c只能存储布尔值

a = "hello";
a = 100; // 警告：不能将类型“number”分配给类型“string”

a = 666;
b = "你好"; // 警告：不能将类型“string”分配给类型“number”

c = true;
c = 666; // 警告：不能将类型“number”分配给类型“boolean”

// 参数x必须是数字，参数y也必须是数字，函数返回值也必须是数字
function demo(x: number, y: number): number {
  return x + y;
}

demo(100, 200);
demo(100, "200"); //警告：类型“string”的参数不能赋给类型“number”的参数
demo(100, 200, 300); //警告：应有 2 个参数，但获得 3 个
demo(100); //警告：应有 2 个参数，但获得 1 个
```

在`:`后也可以写**字面量类型**，不过实际开发中用的不多。

```js
let a: "你好"; //a的值只能为字符串“你好”
let b: 100; //b的值只能为数字100

a = "欢迎"; //警告：不能将类型“"欢迎"”分配给类型“"你好"”
b = 200; //警告：不能将类型“200”分配给类型“100”
```

# 类型判断

`TS`会根据我们的代码，进行类型推导，例如下面代码中的变量`d`，只能存储数字

```js
let d = -99; //TypeScript会推断出变量d的类型是数字
d = false; //警告：不能将类型“boolean”分配给类型“number”
```

> [!TIP]
>
> 但要注意，类型推断不是万能的，面对复杂类型时推断容易出问题，所以尽量还是明确的编写类型声明！

# 类型总览

## js 中的数据类型

1. `string`
2. `number`
3. `boolean`
4. `null`
5. `undefined`
6. `bigint`
7. `symbol`
8. `object`

> [!TIP]
>
> **备注：其中**`object`**包含：**`Array`**、**`Function`**、**`Date`**、**`Error`**等......**

## ts 中的数据类型

1. 上述所有 `js` 类型
2. 六个新类型：
   1. `any`
   2. `unknown`
   3. `never`
   4. `void`
   5. `tuple`
   6. `enum`
3. 两个用于自定义类型的方式：
   1. `type`
   2. `interface`

> [!CAUTION]
>
> 在`JavaScript`中的这些内置构造函数：`Number`、`String`、`Boolean`，用于创建对应的包装对象， 在日常开发时**很少使用**，在`TypeScript`中也是同理，所以在`TypeScript`中进行类型声明时，通常都是用小写的`number`、`string`、`boolean`

例如下面代码：

```js
let str1: string;
str1 = "hello";
str1 = new String("hello"); //报错

let str2: String;
str2 = "hello";
str2 = new String("hello");

console.log(typeof str1);
console.log(typeof str2);
```

> [!TIP]
>
> 1. **原始类型 VS 包装对象**
>
> - **原始类型**：如`number`、`string`、`boolean`，在 JavaScript 中是简单数据类型，它们在内存中占用空间少，处理速度快。
> - **包装对象**：如`Number`对象、`String`对象、`Boolean`对象，是复杂类型，在内存中占用更多空间，在日常开发时很少由开发人员自己创建包装对象。
>
> 2. **自动装箱：**`JavaScript` 在必要时会自动将原始类型包装成对象，以便调用方法或访问属性

```js
// 原始类型字符串
let str = "hello";

// 当访问 str.length 时，js 引擎做了以下工作：
let size = (function () {
  // 1. 自动装箱：创建一个临时的String对象包装原始字符串
  let tempStringObject = new String(str);

  // 2. 访问String对象的length属性
  let lengthValue = tempStringObject.length;

  // 3. 销毁临时对象，返回长度值
  // （JavaScript引擎自动处理对象销毁，开发者无感知）
  return lengthValue;
})();

console.log(size); // 输出: 5
```

# 常用类型与语法

## 1. any

> [!TIP]
>
> `any`的含义是：任意类型，一旦将变量类型限制为`any`，那就意味着**放弃了**对该变量的类型检查。

```js
// 明确的表示a的类型是 any —— 【显式的any】
let a: any;
// 以下对a的赋值，均无警告
a = 100;
a = "你好";
a = false;

// 没有明确的表示b的类型是any，但TS主动推断出来b是any —— 隐式的any
let b;
//以下对b的赋值，均无警告
b = 100;
b = "你好";
b = false;
```

> [!WARNING]
>
> 注意点：`any`类型的变量，可以赋值给任意类型的变量

```js
/* 注意点：any类型的变量，可以赋值给任意类型的变量 */
let c: any;
c = 9;

let x: string;
x = c; // 无警告
```

## 2. unknown

> [!TIP]
>
> `unknown`的含义是：**未知类型**，适用于：起初不确定数据的具体类型，要后期才能确定

1. `unknown`可以理解为一个类型安全的`any`。

```js
// 设置a的类型为unknown
let a: unknown;

//以下对a的赋值，均符合规范
a = 100;
a = false;
a = "你好";

// 设置x的数据类型为string
let x: string;
x = a; //警告：不能将类型“unknown”分配给类型“string”
```

2. `unknown`会强制开发者在使用之前进行类型检查，从而提供更强的类型安全性。

```js
// 设置a的类型为unknown
let a: unknown
a = 'hello'

//第一种方式：加类型判断
if(typeof a === 'string'){
  x = a
  console.log(x)
}

//第二种方式：加断言
x = a as string

//第三种方式：加断言
x = <string>a
```

3. 读取`any`类型数据的任何属性都不会报错，而`unknown`正好与之相反。

```js
let str1: string
str1 = 'hello'
str1.toUpperCase() //无警告

let str2: any
str2 = 'hello'
str2.toUpperCase() //无警告

let str3: unknown
str3 = 'hello';
str3.toUpperCase() //警告：“str3”的类型为“未知”

// 使用断言强制指定str3的类型为string
(str3 as string).toUpperCase() //无警告
```

## 3. never

> [!TIP]
>
> `never`的含义是：任何值都不是，即：不能有值，例如`undefined`、`null`、`''`、`0`都不行！

1. 几乎不用`never`去直接限制变量，因为没有意义，例如：

```js
/* 指定a的类型为never，那就意味着a以后不能存任何的数据了 */
let a: never;

// 以下对a的所有赋值都会有警告
a = 1;
a = true;
a = undefined;
a = null;
```

2. `never`一般是`TypeScript`主动推断出来的，例如：

```js
// 指定a的类型为string
let a: string;
// 给a设置一个值
a = "hello";

if (typeof a === "string") {
  console.log(a.toUpperCase());
} else {
  console.log(a); // TypeScript会推断出此处的a是never，因为没有任何一个值符合此处的逻辑
}
```

3. `never`也可用于限制函数的返回值

```js
// 限制throwError函数不需要有任何返回值，任何值都不行，像undeifned、null都不行
function throwError(str: string): never {
  throw new Error("程序异常退出:" + str);
}
```

## 4. void

> [!TIP]
>
> `void`的含义是空，即：函数不返回任何值，调用者也不应依赖其返回值进行**任何操作**！

1. `void`通常用于函数返回值声明

```js
function logMessage(msg: string): void {
  console.log(msg);
}
logMessage("你好");
```

> [!CAUTION]
>
> **注意：**编码者没有编写`return`指定函数返回值，所以`logMessage`函数是没有**显式返回值**的，但会有一个**隐式返回值** ，是`undefined`，虽然函数返回类型为`void`，但也是可以接受`undefined`的，简单记：`undefined`**是**`void`**可以接受的一种“空”。**

2. 以下写法均符合规范

```js
// 无警告
function logMessage(msg: string): void {
  console.log(msg);
}

// 无警告
function logMessage(msg: string): void {
  console.log(msg);
  return;
}

// 无警告
function logMessage(msg: string): void {
  console.log(msg);
  return undefined;
}
```

3. 那限制函数返回值时，是不是`undefined`和`void`就没区别呢？—— 有区别。因为还有这句话 ：【**返回值类型为**`void`**的函数，调用者不应依赖其返回值进行任何操作！】**对比下面两段代码：

```js
function logMessage(msg: string): void {
  console.log(msg);
}

let result = logMessage("你好");

if (result) {
  // 此行报错：无法测试 "void" 类型的表达式的真实性
  console.log("logMessage有返回值");
}
```

```js
function logMessage(msg: string): undefined {
  console.log(msg);
}

let result = logMessage("你好");

if (result) {
  // 此行无警告
  console.log("logMessage有返回值");
}
```

> [!TIP]
>
> **理解 void 与 undefined**
>
> - `void`是一个广泛的概念，用来表达“空”，而 `undefined` 则是这种“空”的具体实现。
> - 因此可以说 `undefined`是`void`能接受的一种“空”的状态。
> - 也可以理解为：`void`包含`undefined`，但`void`所表达的语义超越了`undefined`，`void`是一种意图上的约定，而不仅仅是特定值的限制。

**总结**：

> [!IMPORTANT]
>
> 如果一个函数返回类型为`void`，那么：
>
> 1. **从语法上讲**：函数是可以返回`undefined`的，至于显式返回，还是隐式返回，这无所谓！
> 2. **从语义上讲**：函数调用者不应关心函数返回的值，也不应依赖返回值进行任何操作！即使我们知道它返回了`undefined`。

## 5. object

> [!TIP]
>
> 关于`object`与`Object`，直接说结论：实际开发中用的相对较少，因为范围太大了。

### object

`object`（小写）的含义是：所有**非原始类型**，可存储：对象、函数、数组等，由于限制的范围**比较宽泛**，在实际开发中使用的**相对较少**。

```js
let a: object; //a的值可以是任何【非原始类型】，包括：对象、函数、数组等

// 以下代码，是将【非原始类型】赋给a，所以均符合要求
a = {};
a = { name: "张三" };
a = [1, 3, 5, 7, 9];
a = function () {};
a = new String("123");
class Person {}
a = new Person();

// 以下代码，是将【原始类型】赋给a，有警告
a = 1; // 警告：不能将类型“number”分配给类型“object”
a = true; // 警告：不能将类型“boolean”分配给类型“object”
a = "你好"; // 警告：不能将类型“string”分配给类型“object”
a = null; // 警告：不能将类型“null”分配给类型“object”
a = undefined; // 警告：不能将类型“undefined”分配给类型“object”
```

### Object

- **官方描述**：所有可以调用`Object`方法的类型。
- **简单记忆**：除了`undefined`和`null`的任何值。
- 由于限制的范围实在**太大了**！所以实际开发中使用**频率极低**。

```js
let b: Object; //b的值必须是Object的实例对象（除去undefined和null的任何值）

// 以下代码，均无警告，因为给a赋的值，都是Object的实例对象
b = {};
b = { name: "张三" };
b = [1, 3, 5, 7, 9];
b = function () {};
b = new String("123");
class Person {}
b = new Person();
b = 1; // 1不是Object的实例对象，但其包装对象是Object的实例
b = true; // truue不是Object的实例对象，但其包装对象是Object的实例
b = "你好"; // “你好”不是Object的实例对象，但其包装对象是Object的实例

// 以下代码均有警告
b = null; // 警告：不能将类型“null”分配给类型“Object”
b = undefined; // 警告：不能将类型“undefined”分配给类型“Object”
```

### 声明对象类型

1. 实际开发中，限制一般对象，通常使用以下形式

```js
// 限制person1对象必须有name属性，age为可选属性
let person1: { name: string, age?: number }

// 含义同上，也能用分号做分隔
let person2: { name: string; age?: number }

// 含义同上，也能用换行做分隔
let person3: {
  name: string
  age?: number
}

// 如下赋值均可以
person1 = {name:'李四',age:18}
person2 = {name:'张三'}
person3 = {name:'王五'}

// 如下赋值不合法，因为person3的类型限制中，没有对gender属性的说明
person3 = {name:'王五',gender:'男'}
```

2. **索引签名**： 允许定义对象可以具有**任意数量的属性**，这些属性的**键**和**类型**是**可变的**，常用于：描述类型不确定的属性，（具有动态属性的对象）。

```js
// 限制person对象必须有name属性，可选age属性但值必须是数字，同时可以有任意数量、任意类型的其他属性
let person: {
    name: string
    age?: number
    [key: string]: any // 索引签名，完全可以不用key这个单词，换成其他的也可以
}

person = {
    name: '张三',
    age: 18,
    gender: '男'
}
```

### 声明函数类型

```js
let count: (a: number, b: number) => number;

count = function (x, y) {
  return x + y;
};
```

> [!TIP]
>
> 备注：
>
> - `TypeScript` 中的`=>`在函数类型声明时表示**函数类型**，描述其**参数类型**和**返回类型**。
> - `JavaScript` 中的`=>`是一种定义函数的语法，是具体的函数实现。
> - 函数类型声明还可以使用：接口、自定义类型等方式，下文中会详细讲解。

### 声明数组类型

```js
let arr1: string[];
let arr2: Array<string>;

arr1 = ["a", "b", "c"];
arr2 = ["hello", "world"];
```

> [!TIP]
>
> 备注：上述代码中的`Array<string>`属于泛型，下文会详细讲解。

## 6. tuple

> [!TIP]
>
> 元组`(Tuple)`是一种特殊的**数组类型**，可以存储**固定数量**的元素，并且每个元素的类型是**已知的**且**可以不同**。元组用于精确描述一组值的类型，`?`表示可选元素。

```js
// 第一个元素必须是 string 类型，第二个元素必须是 number 类型。
let arr1: [string,number]
// 第一个元素必须是 number 类型，第二个元素是可选的，如果存在，必须是 boolean 类型。
let arr2: [number,boolean?]
// 第一个元素必须是 number 类型，后面的元素可以是任意数量的 string 类型
let arr3: [number,...string[]]

// 可以赋值
arr1 = ['hello',123]
arr2 = [100,false]
arr2 = [200]
arr3 = [100,'hello','world']
arr3 = [100]

// 不可以赋值，arr1声明时是两个元素，赋值的是三个
arr1 = ['hello',123,false]
```

## 7. enum

> [!TIP]
>
> 枚举（`enum`）可以定义**一组命名常量**，它能增强代码的**可读性**，也让代码**更好维护**。

如下代码的功能是：根据调用`walk`时传入的不同参数，执行不同的逻辑，存在的问题是调用`walk`时传参时没有任何提示，编码者很容易写错字符串内容；并且用于判断逻辑的`up`、`down`、`left`、`right`是**连续且相关的一组值**，那此时就特别适合使用 **枚举（**`enum`**）**。

```js
function walk(str: string) {
  if (str === "up") {
    console.log("向【上】走");
  } else if (str === "down") {
    console.log("向【下】走");
  } else if (str === "left") {
    console.log("向【左】走");
  } else if (str === "right") {
    console.log("向【右】走");
  } else {
    console.log("未知方向");
  }
}

walk("up");
walk("down");
walk("left");
walk("right");
```

### 1. **数字枚举**

数字枚举一种最常见的枚举类型，其成员的值会**自动递增**，且数字枚举还具备**反向映射**的特点，在下面代码的打印中，不难发现：可以通过**值**来获取对应的枚举**成员名称** 。

```js
// 定义一个描述【上下左右】方向的枚举Direction
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction) // 打印Direction会看到如下内容
/*
  {
    0:'Up',
    1:'Down',
    2:'Left',
    3:'Right',
    Up:0,
    Down:1,
    Left:2,
    Right:3
  }
*/

// 反向映射
console.log(Direction.Up)
console.log(Direction[0])

// 此行代码报错，枚举中的属性是只读的
Direction.Up = 'shang'
```

也可以指定枚举成员的初始值，其后的成员值会自动递增。

```js
enum Direction {
  Up = 6,
  Down,
  Left,
  Right
}

console.log(Direction.Up); // 输出: 6
console.log(Direction.Down); // 输出: 7
```

使用数字枚举完成刚才`walk`函数中的逻辑，此时我们发现： 代码更加直观易读，而且类型安全，同时也更易于维护。

```js
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function walk(n: Direction) {
  if (n === Direction.Up) {
    console.log("向【上】走");
  } else if (n === Direction.Down) {
    console.log("向【下】走");
  } else if (n === Direction.Left) {
    console.log("向【左】走");
  } else if (n === Direction.Right) {
    console.log("向【右】走");
  } else {
    console.log("未知方向");
  }
}

walk(Direction.Up)
walk(Direction.Down)
```

### 2. 字符串枚举

枚举成员的值是字符串

```js
enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

let dir: Direction = Direction.Up;
console.log(dir); // 输出: "up"
```

### 3. 常量枚举

> [!TIP]
>
> **官方描述**：常量枚举是一种特殊枚举类型，它使用`const`关键字定义，在编译时会被**内联**，**避免**生成一些**额外**的代码。

> [!NOTE]
>
> **何为**编译时内联？
>
> 所谓“内联”其实就是 `TypeScript` 在编译时，会将枚举**成员引用**替换为它们的**实际值**，而不是生成额外的枚举对象。这可以减少生成的 `JavaScript` 代码量，并提高运行时性能。

使用普通枚举的 `TypeScript` 代码如下：

```js
enum Directions {
  Up,
  Down,
  Left,
  Right
}

let x = Directions.Up;
```

编译后生成的 `JavaScript` 代码量较大 ：

```js
"use strict";
var Directions;
(function (Directions) {
  Directions[(Directions["Up"] = 0)] = "Up";
  Directions[(Directions["Down"] = 1)] = "Down";
  Directions[(Directions["Left"] = 2)] = "Left";
  Directions[(Directions["Right"] = 3)] = "Right";
})(Directions || (Directions = {}));

let x = Directions.Up;
```

使用常量枚举的 `TypeScript` 代码如下：

```js
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let x = Directions.Up;
```

编译后生成的 `JavaScript` 代码量较小：

```js
"use strict";
let x = 0; /* Directions.Up */
```

## 8. type

`type`可以为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。

### 1. 基本用法

> [!TIP]
>
> 类型别名使用`type`关键字定义，`type`后跟类型名称，例如下面代码中`num`是类型别名。

### 2. 联合类型

> [!TIP]
>
> 联合类型是一种高级类型，它表示一个值可以是几种不同类型之一。

```js
type Status = number | string;
type Gender = "男" | "女";

function printStatus(status: Status) {
  console.log(status);
}

function logGender(str: Gender) {
  console.log(str);
}

printStatus(404);
printStatus("200");
printStatus("501");

logGender("男");
logGender("女");
```

### 3. 交叉类型

> [!TIP]
>
> 交叉类型（`Intersection Types`）允许将多个类型合并为一个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常用于对象类型。

```js
//面积
type Area = {
  height: number, //高
  width: number, //宽
};

//地址
type Address = {
  num: number, //楼号
  cell: number, //单元号
  room: string, //房间号
};

// 定义类型House，且House是Area和Address组成的交叉类型
type House = Area & Address;

const house: House = {
  height: 180,
  width: 75,
  num: 6,
  cell: 3,
  room: "702",
};
```

## 9. 一个特殊情况

先来观察如下两段代码：

### 代码段 1（正常）

在函数定义时，限制函数返回值为`void`，那么函数的返回值就必须是空。

```js
function demo(): void {
  // 返回undefined合法
  return undefined;

  // 以下返回均不合法
  return 100;
  return false;
  return null;
  return [];
}
demo();
```

### 代码段 2（特殊）

使用**类型声明**限制函数返回值为`void`时，`TypeScript`**并不会严格要求函数返回空。**

```js
type LogFunc = () => void;

const f1: LogFunc = () => {
  return 100; // 允许返回非空值
};

const f2: LogFunc = () => 200; // 允许返回非空值

const f3: LogFunc = function () {
  return 300; // 允许返回非空值
};
```

### 为什么会这样

是为了确保如下代码成立，我们知道 `Array.prototype.push` 的返回值是一个数字，而`Array.prototype.forEach`方法期望其回调的返回类型是`void`。

```js
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

## 11. 属性修饰符

| 修饰符      | 含义     | 具体规则                                     |
| ----------- | -------- | -------------------------------------------- |
| `public`    | 公开的   | 可以被：**类内部**、**子类**、**类外部**访问 |
| `protected` | 受保护的 | 可以被：**类内部**、**子类**访问             |
| `private`   | 私有的   | 可以被：**类内部**访问                       |
| `readonly`  | 只读属性 | 属性无法修改                                 |
|             |          |                                              |

### 属性的简写形式

**完整写法**

```js
class Person {
    public name: string;
	public age: number;

	constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

**简写形式**

```js
class Person {
    constructor(
    	public name: string,
        public age: number
    ){}
}
```

## 12. 抽象类

> [!TIP]
>
> - **概述**：抽象类是一种**无法被实例化**的类，专门用来定义类的**结构和行为**，类中可以写**抽象方法**，也可以写**具体实现**。抽象类主要用来为其派生类提供一个**基础结构**，要求其派生类**必须实现**其中的抽象方法。
> - **简记**：抽象类**不能实例化**，其意义是**可以被继承**，抽象类里可以有**普通方法**、也可以有**抽象方法**。

通过以下场景，理解抽象类：

> [!NOTE]
>
> 我们定义一个抽象类`Package`，表示所有包裹的基本结构，任何包裹都有重量属性`weight`，包裹都需要计算运费。但不同类型的包裹（如：标准速度、特快专递）都有不同的运费计算方式，因此用于计算运费的`calculate`方法是一个抽象方法，必须由具体的子类来实现。

**Package 类**

```js
abstract class Package {
  constructor(public weight: number) { }
  // 抽象方法：用来计算运费，不同类型包裹有不同的计算方式
  abstract calculate(): number
  // 通用方法：打印包裹详情
  printPackage() {
    console.log(`包裹重量为: ${this.weight}kg，运费为: ${this.calculate()}元`);
  }
}
```

`StandardPackage`类继承了`Package`，实现了`calculate`方法：

```js
// 标准包裹
class StandardPackage extends Package {
  constructor(
    weight: number,
    public unitPrice: number // 每公斤的固定费率
  ) { super(weight) }

  // 实现抽象方法：计算运费
  calculate(): number {
    return this.weight * this.unitPrice;
  }
}

// 创建标准包裹实例
const s1 = new StandardPackage(10,5)
s1.printPackage()
```

`ExpressPackage`类继承了`Package`，实现了`calculate`方法：

```js
class ExpressPackage extends Package {
  constructor(
    weight: number,
    private unitPrice: number, // 每公斤的固定费率（快速包裹更高）
    private additional: number // 超出10kg以后的附加费
  ) { super(weight) }

  // 实现抽象方法：计算运费
  calculate(): number {
    if(this.weight > 10){
      // 超出10kg的部分，每公斤多收additional对应的价格
      return 10 * this.unitPrice + (this.weight - 10) * this.additional
    }else {
      return this.weight * this.unitPrice;
    }
  }
}

// 创建特快包裹实例
const e1 = new ExpressPackage(13,8,2)
e1.printPackage()
```

> [!IMPORTANT]
>
> **总结**：何时使用抽象类？
>
> 1. **定义**通用接口**：**为一组相关的类定义通用的行为（方法或属性）时。
> 2. **提供**基础实现：在抽象类中提供某些方法或为其提供基础实现，这样派生类就可以继承这些实现。
> 3. **确保**关键实现：强制派生类实现一些关键行为。
> 4. **共享**代码和逻辑：当多个类需要共享部分代码时，抽象类可以避免代码重复。

## 13. interface

> [!TIP]
>
> `interface`是一种**定义结构**的方式，主要作用是为：类、对象、函数等规定**一种契约**，这样可以确保代码的一致性和类型安全，但要注意`interface`**只能**定义**格式**，**不能**包含**任何实现** ！

### 定义类结构

```js
// PersonInterface接口，用与限制Person类的格式
interface PersonInterface {
  name: string
  age: number
  speak(n: number): void
}

// 定义一个类 Person，实现 PersonInterface 接口
class Person implements PersonInterface {
  constructor(
    public name: string,
    public age: number
  ) { }
  // 实现接口中的 speak 方法
  speak(n: number): void {
    for (let i = 0; i < n; i++) {
      // 打印出包含名字和年龄的问候语句
      console.log(`你好，我叫${this.name}，我的年龄是${this.age}`);
    }
  }
}

// 创建一个 Person 类的实例 p1，传入名字 'tom' 和年龄 18
const p1 = new Person('tom', 18);
p1.speak(3)
```

### 定义对象结构

```js
interface UserInterface {
  name: string
  readonly gender: string // 只读属性
  age?: number // 可选属性
  run: (n: number) => void
}

const user: UserInterface = {
  name: "张三",
  gender: '男',
  age: 18,
  run(n) {
    console.log(`奔跑了${n}米`)
  }
};

```

### 定义函数结构

```js
interface CountInterface {
  (a: number, b: number): number;
}

const count: CountInterface = (x, y) => {
  return x + y;
};
```

### 接口之间的继承

一个`interface`继承另一个`interface`，从而实现代码的复用

```js
interface PersonInterface {
  name: string // 姓名
  age: number  // 年龄
}

interface StudentInterface extends PersonInterface {
  grade: string // 年级
}

const stu: StudentInterface = {
  name: "张三",
  age: 25,
  grade: '高三',
}
```

### 接口自动合并（可重复定义）

```js
// PersonInterface接口
interface PersonInterface {
  // 属性声明
  name: string
  age: number
}

// 给PersonInterface接口添加新属性
interface PersonInterface {
  // 方法声明
  speak(): void
}

// Person类实现PersonInterface
class Person implements PersonInterface {
  name: string
  age: number
  // 构造器
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  // 方法
  speak() {
    console.log('你好！我是老师:', this.name)
  }
}
```

> [!IMPORTANT]
>
> **总结：何时使用接口？**
>
> 1. **定义对象的格式：** 描述数据模型、`API` 响应格式、配置对象........等等，是开发中用的最多的场景。
> 2. **类的契约：**规定一个类需要实现哪些属性和方法。
> 3. **扩展已有接口：**一般用于扩展第三方库的类型， 这种特性在大型项目中可能会用到。

## 14. 一些相似概念的区别

### interface 与 type 的区别

> [!TIP]
>
> - **相同点：**`interface`和`type` 都可以用于定义**对象结构**，在定义对象结构时两者可以互换。
> - **不同点：**
>
> 1️⃣`interface`：更专注于定义**对象**和**类**的结构，支持**继承**、**合并**。
>
> 2️⃣`type`：可以定义**类型别名、联合类型**、**交叉类型**，但不支持继承和自动合并。

`interface` 和 `type` 都可以定义对象结构

```js
// 使用 interface 定义 Person 对象
interface PersonInterface {
  name: string;
  age: number;
  speak(): void;
}

// 使用 type 定义 Person 对象
type PersonType = {
  name: string,
  age: number,
  speak(): void,
};

// 使用PersonInterface
/* let person: PersonInterface = {
  name:'张三',
  age:18,
  speak(){
    console.log(`我叫：${this.name}，年龄：${this.age}`)
  }
} */

// 使用PersonType
let person: PersonType = {
  name: "张三",
  age: 18,
  speak() {
    console.log(`我叫：${this.name}，年龄：${this.age}`);
  },
};
```

`interface` 可以继承、合并

```js
interface PersonInterface {
  name: string // 姓名
  age: number  // 年龄
}

interface PersonInterface {
  speak: () => void
}

interface StudentInterface extends PersonInterface {
  grade: string // 年级
}

const student: StudentInterface = {
  name: '李四',
  age: 18,
  grade: '高二',
  speak() {
    console.log(this.name,this.age,this.grade)
  }
}
```

`type` 的交叉类型

```js
// 使用 type 定义 Person 类型，并通过交叉类型实现属性的合并
type PersonType = {
  name: string, // 姓名
  age: number, // 年龄
} & {
  speak: () => void,
};

// 使用 type 定义 Student 类型，并通过交叉类型继承 PersonType
type StudentType = PersonType & {
  grade: string, // 年级
};

const student: StudentType = {
  name: "李四",
  age: 18,
  grade: "高二",
  speak() {
    console.log(this.name, this.age, this.grade);
  },
};
```

### interface 与抽象类的区别

> [!TIP]
>
> - **相同点：**都能定义一个**类的格式**（定义类应遵循的契约）
> - **不相同：**
>
> 1️⃣ 接口：**只能**描述**结构**，**不能**有任何**实现代码**，一个类可以实现**多个**接口。
>
> 2️⃣ 抽象类：既可以包含**抽象方法**，也可以包含**具体方法**， 一个类只能继承**一个**抽象类。

# 泛型

> [!TIP]
>
> 泛型允许我们在定义函数、类或接口时，使用类型参数来表示**未指定的类型**，这些参数在具体**使用时**，才被指定**具体的类型**，泛型能让同一段代码适用于多种类型，同时仍然保持类型的安全性。

举例：如下代码中`<T>`就是泛型，（不一定非叫 `T`），设置泛型后即可在函数中使用 `T` 来表示该类型：

```js
function logData<T>(data: T): T {
  console.log(data);
  return data;
}

logData < number > 100;
logData < string > "hello";
```

**泛型可以有多个**

```js
function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data1, data2);
  return Date.now() % 2 ? data1 : data2;
}

logData < number, string > (100, "hello");
logData < string, boolean > ("ok", false);
```

**泛型接口**

```js
interface PersonInterface<T> {
  name: string;
  age: number;
  extraInfo: T;
}

let p1: PersonInterface<string>;
let p2: PersonInterface<number>;

p1 = { name: "张三", age: 18, extraInfo: "一个好人" };
p2 = { name: "李四", age: 18, extraInfo: 250 };
```

**泛型约束**

```js
interface LengthInterface {
  length: number
}

// 约束规则是：传入的类型T必须具有 length 属性
function logPerson<T extends LengthInterface>(data: T): void {
  console.log(data.length)
}

logPerson<string>('hello')
// 报错：因为number不具备length属性
// logPerson<number>(100)
```

**泛型类**

```js
class Person<T> {
  constructor(
    public name: string,
    public age: number,
    public extraInfo: T
  ) { }
  speak() {
    console.log(`我叫${this.name}今年${this.age}岁了`)
    console.log(this.extraInfo)
  }
}

// 测试代码1
const p1 = new Person<number>("tom", 30, 250);

// 测试代码2
type JobInfo = {
  title: string;
  company: string;
}
const p2 = new Person<JobInfo>("tom", 30, { title: '研发总监', company: '发发发科技公司' });
```

# 类型声明文件

> [!TIP]
>
> 类型声明文件是 `TypeScript` 中的一种特殊文件，通常以`.d.ts` 作为扩展名。它的主要作用是为现有的 **JavaScript 代码**提供**类型信息**，使得 `TypeScript` 能够在使用这些 `JavaScript` 库或模块时进行**类型检查和提示**。

`demo.js`

```js
export function add(a, b) {
  return a + b;
}

export function mul(a, b) {
  return a * b;
}
```

`demo.d.ts`

```js
declare function add(a: number, b: number): number;
declare function mul(a: number, b: number): number;

export { add, mul };
```

`index.ts`

```js
// example.ts
import { add, mul } from "./demo.js";

const x = add(2, 3); // x 类型为 number
const y = mul(4, 5); // y 类型为 number

console.log(x, y);
```

# 装饰器

## 1. 简介

1. 装饰器本质是一种特殊的**函数**，它可以对：类、属性、方法、参数进行扩展，同时能让代码更简洁。
2. 装饰器自`2015`年在`ECMAScript-6`中被提出到现在，已将近 `10` 年。
3. 截止目前，装饰器依然是实验性特性 ，需要开发者手动调整配置，来开启装饰器支持。
4. 装饰器有 `5` 种：

   1. 类装饰器
   2. 属性装饰器
   3. 方法装饰器
   4. 访问器装饰器
   5. 参数装饰器

> [!TIP]
>
> 备注：虽然`TypeScript5.0`中可以直接使用`类装饰器`，但为了确保其他装饰器可用，现阶段使用时，仍建议使用`experimentalDecorators`配置来开启装饰器支持，而且不排除在来的版本中，官方会**进一步调整**装饰器的相关语法！
>
> 参考：[**《TypeScript 5.0 发版公告》**](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-rc/)

## 2. 类装饰器

### 1. 基本语法

> [!TIP]
>
> 类装饰器是一个应用在**类声明**上的**函数**，可以为类添加额外的功能，或添加额外的逻辑。

```js
/* 
  Demo函数会在Person类定义时执行
  参数说明：
    ○ target参数是被装饰的类，即：Person
*/
function Demo(target: Function) {
  console.log(target);
}

// 使用装饰器
@Demo
class Person {}
```

### 2. 应用举例

> [!NOTE]
>
> 需求：定义一个装饰器，实现`Person`实例调用`toString`时返回`JSON.stringify`的执行结果。

```js
// 使用装饰器重写toString方法 + 封闭其原型对象
function CustomString(target: Function) {
  // 向被装饰类的原型上添加自定义的 toString 方法
  target.prototype.toString = function () {
    return JSON.stringify(this)
  }
  // 封闭其原型对象，禁止随意操作其原型对象
  Object.seal(target.prototype)
}

// 使用 CustomString 装饰器
@CustomString
class Person {
  constructor(public name: string, public age: number) { }
  speak() {
    console.log('你好呀！')
  }
}

/* 测试代码如下 */
let p1 = new Person('张三', 18)
// 输出：{"name":"张三","age":18}
console.log(p1.toString())
// 禁止随意操作其原型对象
interface Person {
  a: any
}
// Person.prototype.a = 100 // 此行会报错：Cannot add property a, object is not extensible
// console.log(p1.a)
```

### 3. 关于返回值

> [!TIP]
>
> **类装饰器**有返回值**：若类装饰器返回一个新的类，那这个新类将**替换掉被装饰的类。
>
> **类装饰器**无返回值**：若类装饰器无返回值或返回`undefined`，那被装饰的类**不会被替换。

```js
function demo(target: Function) {
  // 装饰器有返回值时，该返回值会替换掉被装饰的类
  return class {
    test() {
      console.log(200);
      console.log(300);
      console.log(400);
    }
  };
}

@demo
class Person {
  test() {
    console.log(100);
  }
}

console.log(Person);
```

### 4. 关于构造函数

> [!NOTE]
>
> 在 `TypeScript` 中，`Function` 类型所表示的范围十分广泛，包括：普通函数、箭头函数、方法等等。但并非`Function` 类型的函数都可以被 `new` 关键字实例化，例如箭头函数是不能被实例化的，那么 `TypeScript` 中概如何声明一个构造类型呢？有以下两种方式：

**仅声明构造类型**

```js
/*
  ○ new     表示：该类型是可以用new操作符调用。
  ○ ...args 表示：构造器可以接受【任意数量】的参数。
  ○ any[]   表示：构造器可以接受【任意类型】的参数。
  ○ {}      表示：返回类型是对象(非null、非undefined的对象)。
*/

// 定义Constructor类型，其含义是构造类型
type Constructor = new (...args: any[]) => {};

function test(fn:Constructor){}
class Person {}
test(Person)
```

**声明构造类型 + 指定静态属性**

```js
// 定义一个构造类型，且包含一个静态属性 wife
type Constructor = {
  new(...args: any[]): {}, // 构造签名
  wife: string, // wife属性
};

function test(fn: Constructor) {}
class Person {
  static wife = "asd";
}
test(Person);
```

### 5. 替换被装饰的类

对于高级一些的装饰器，不仅仅是覆盖一个原型上的方法，还要有更多功能，例如添加新的方法和状态。

> [!NOTE]
>
> 需求：设计一个`LogTime`装饰器，可以给实例添加一个属性，用于记录实例对象的创建时间，再添加一个方法用于读取创建时间。

```js
// User接口
interface User {
  getTime(): Date
  log(): void
}

// 自定义类型Class
type Constructor = new (...args: any[]) => {}

// 创建一个装饰器，为类添加日志功能和创建时间
function LogTime<T extends Constructor>(target: T) {
  return class extends target {
    createdTime: Date;
    constructor(...args: any[]) {
      super(...args);
      this.createdTime = new Date(); // 记录对象创建时间
    }
    getTime() {
      return `该对象创建时间为：${this.createdTime}`;
    }
  };
}

@LogTime
class User {
  constructor(
    public name: string,
    public age: number
  ) { }
  speak() {
    console.log(`${this.name}说：你好啊！`)
  }
}

const user1 = new User('张三', 13);
user1.speak()
console.log(user1.getTime())
```

## 3. 装饰器工厂

装饰器工厂是一个返回装饰器函数的函数，可以为装饰器添加参数，可以更灵活地控制装饰器的行为。

> [!NOTE]
>
> 需求**：**定义一个`LogInfo`类装饰器工厂，实现`Person`实例可以调用到`introduce`方法，且`introduce`中输出内容的次数，由`LogInfo`接收的参数决定。

```js
interface Person {
  introduce: () => void
}

// 定义一个装饰器工厂 LogInfo，它接受一个参数 n，返回一个类装饰器
function LogInfo(n:number) {
  // 装饰器函数，target 是被装饰的类
  return function(target: Function){
    target.prototype.introduce = function () {
      for (let i = 0; i < n; i++) {
        console.log(`我的名字：${this.name}，我的年龄：${this.age}`)
      }
    }
  }
}

@LogInfo(5)
class Person {
  constructor(
    public name: string,
    public age: number
  ) { }
  speak() {
    console.log('你好呀！')
  }
}

let p1 = new Person('张三', 18)
// console.log(p1) // 打印的p1是：_classThis，转换的JS版本比较旧时，会出现，不必纠结
p1.speak()
p1.introduce()
```

## 4. 装饰器组合

装饰器可以组合使用，执行顺序为：先【由上到下】的执行所有的装饰器工厂，依次获取到装饰器，然后再【由下到上】执行所有的装饰器。

**装饰器组合 —— 执行顺序**

```js
//装饰器
function test1(target: Function) {
  console.log("test1");
}
//装饰器工厂
function test2() {
  console.log("test2工厂");
  return function (target: Function) {
    console.log("test2");
  };
}
//装饰器工厂
function test3() {
  console.log("test3工厂");
  return function (target: Function) {
    console.log("test3");
  };
}
//装饰器
function test4(target: Function) {
  console.log("test4");
}

@test1
@test2()
@test3()
@test4
class Person {}

/*
  控制台打印：
    test2工厂
    test3工厂
    test4
    test3
    test2
    test1
*/
```

**装饰器组合 —— 应用**

```js
// 自定义类型Class
type Constructor = new (...args: any[]) => {}

interface Person {
  introduce():void
  getTime():void
}

// 使用装饰器重写toString方法 + 封闭其原型对象
function customToString(target: Function) {
  // 向被装饰类的原型上添加自定义的 toString 方法
  target.prototype.toString = function () {
    return JSON.stringify(this)
  }
  // 封闭其原型对象，禁止随意操作其原型对象
  Object.seal(target.prototype)
}

// 创建一个装饰器，为类添加日志功能和创建时间
function LogTime<T extends Constructor>(target: T) {
  return class extends target {
    createdTime: Date;
    constructor(...args: any[]) {
      super(...args);
      this.createdTime = new Date(); // 记录对象创建时间
    }
    getTime() {
      return `该对象创建时间为：${this.createdTime}`;
    }
  };
}

// 定义一个装饰器工厂 LogInfo，它接受一个参数 n，返回一个类装饰器
function LogInfo(n:number) {
  // 装饰器函数，target 是被装饰的类
  return function(target: Function){
    target.prototype.introduce = function () {
      for (let i = 0; i < n; i++) {
        console.log(`我的名字：${this.name}，我的年龄：${this.age}`)
      }
    }
  }
}

@customToString
@LogInfo(3)
@LogTime
class Person {
  constructor(
    public name: string,
    public age: number
  ) { }
  speak() {
    console.log('你好呀！')
  }
}

const p1 = new Person('张三',18)
console.log(p1.toString())
p1.introduce()
console.log(p1.getTime())
```

## 5. 属性选择器

### 基本语法

```js
/* 
  参数说明：
    ○ target: 对于静态属性来说值是类，对于实例属性来说值是类的原型对象。
    ○ propertyKey: 属性名。
*/
function Demo(target: object, propertyKey: string) {
  console.log(target, propertyKey);
}

class Person {
  @Demo name: string;
  @Demo age: number;
  @Demo static school: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p1 = new Person("张三", 18);
```

### 关于属性遮蔽

> [!TIP]
>
> 如下代码中：当构造器中的 `this.age = age` 试图在实例上赋值时，实际上是调用了原型上 `age` 属性的 `set` 方法。

```js
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

let value = 99;
// 使用defineProperty给Person原型添加age属性，并配置对应的get与set
Object.defineProperty(Person.prototype, "age", {
  get() {
    return value;
  },
  set(val) {
    value = val;
  },
});

const p1 = new Person("张三", 18);
console.log(p1.age); //18
console.log(Person.prototype.age); //18
```

### 应用举例

> [!NOTE]
>
> 需求：定义一个`State`属性装饰器，来监视属性的修改。

```js
// 声明一个装饰器函数 State，用于捕获数据的修改
function State(target: object, propertyKey: string) {
  // 存储属性的内部值
  let key = `__${propertyKey}`;

  // 使用 Object.defineProperty 替换类的原始属性
  // 重新定义属性，使其使用自定义的 getter 和 setter
  Object.defineProperty(target, propertyKey, {
    get() {
      return this[key];
    },
    set(newVal: string) {
      console.log(`${propertyKey}的最新值为：${newVal}`);
      this[key] = newVal;
    },
    enumerable: true,
    configurable: true,
  });
}

class Person {
  name: string;
  //使用State装饰器
  @State age: number;
  school = "atguigu";
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p1 = new Person("张三", 18);
const p2 = new Person("李四", 30);

p1.age = 80;
p2.age = 90;

console.log("------------------");
console.log(p1.age); //80
console.log(p2.age); //90
```

## 6. 方法装饰器

### 基本语法

```js
/*
  参数说明：
    ○ target: 对于静态方法来说值是类，对于实例方法来说值是原型对象。
    ○ propertyKey:方法的名称。
    ○ descriptor: 方法的描述对象，其中value属性是被装饰的方法。
*/
function Demo(target: object, propertyKey: string, descriptor: PropertyDescriptor){
  console.log(target)
  console.log(propertyKey)
  console.log(descriptor)
}

class Person {
  constructor(
    public name:string,
    public age:number,
  ){}
  // Demo装饰实例方法
  @Demo speak(){
    console.log(`你好，我的名字：${this.name}，我的年龄：${this.age}`)
  }
  // Demo装饰静态方法
  @Demo static isAdult(age:number) {
    return age >= 18;
  }
}

const p1 = new Person('张三',18)
p1.speak()
```

### 应用举例

> [!NOTE]
>
> 需求：
>
> 1. 定义一个`Logger`方法装饰器，用于在方法执行前和执行后，均追加一些额外逻辑。
> 2. 定义一个`Validate`方法装饰器，用于验证数据。

```js
function Logger(target: object, propertyKey: string, descriptor: PropertyDescriptor){
  // 保存原始方法
  const original = descriptor.value;
  // 替换原始方法
  descriptor.value = function (...args:any[]) {
    console.log(`${propertyKey}开始执行......`)
    const result = original.call(this, ...args)
    console.log(`${propertyKey}执行完毕......`)
    return result;
  }
}

function Validate(maxValue:number){
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor){
    // 保存原始方法
    const original = descriptor.value;
    // 替换原始方法
    descriptor.value = function (...args: any[]) {
      // 自定义的验证逻辑
      if (args[0] > maxValue) {
        throw new Error('年龄非法！')
      }
      // 如果所有参数都符合要求，则调用原始方法
      return original.apply(this, args);
    };
  }
}

class Person {
  constructor(
    public name:string,
    public age:number,
  ){}
  @Logger speak(){
    console.log(`你好，我的名字：${this.name}，我的年龄：${this.age}`)
  }
  @Validate(120)
  static isAdult(age:number) {
    return age >= 18;
  }
}

const p1 = new Person('张三',18)
p1.speak()
console.log(Person.isAdult(100))
```

## 7. 访问器装饰器

### 基本语法

```js
/* 
  参数说明：
    ○ target: 
        1. 对于实例访问器来说值是【所属类的原型对象】。
        2. 对于静态访问器来说值是【所属类】。
    ○ propertyKey:访问器的名称。
    ○ descriptor: 描述对象。
*/
function Demo(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class Person {
  @Demo
  get address() {
    return "北京宏福科技园";
  }
  @Demo
  static get country() {
    return "中国";
  }
}
```

### 应用举例

> [!NOTE]
>
> 需求：对`Weather`类的`temp`属性的`set`访问器进行限制，设置的最低温度`-50`，最高温度`50`

```js
function RangeValidate(min: number, max: number) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // 保存原始的 setter 方法，以便在后续调用中使用
    const originalSetter = descriptor.set;

    // 重写 setter 方法，加入范围验证逻辑
    descriptor.set = function (value: number) {
      // 检查设置的值是否在指定的最小值和最大值之间
      if (value < min || value > max) {
        // 如果值不在范围内，抛出错误
        throw new Error(`${propertyKey}的值应该在 ${min} 到 ${max}之间！`);
      }

      // 如果值在范围内，且原始 setter 方法存在，则调用原始 setter 方法
      if (originalSetter) {
        originalSetter.call(this, value);
      }
    };
  };
}

class Weather {
  private _temp: number;
  constructor(_temp: number) {
    this._temp = _temp;
  }
  // 设置温度范围在 -50 到 50 之间
  @RangeValidate(-50,50)
  set temp(value) {
    this._temp = value;
  }
  get temp() {
    return this._temp;
  }
}

const w1 = new Weather(25);
console.log(w1)
w1.temp = 67
console.log(w1)
```

## 8. 参数装饰器

### 基本语法

```js
/*
  参数说明：
    ○ target:
      1.如果修饰的是【实例方法】的参数，target 是类的【原型对象】。
      2.如果修饰的是【静态方法】的参数，target 是【类】。
    ○ propertyKey：参数所在的方法的名称。
    ○ parameterIndex: 参数在函数参数列表中的索引，从 0 开始。
*/
function Demo(target: object, propertyKey: string, parameterIndex: number) {
  console.log(target)
  console.log(propertyKey)
  console.log(parameterIndex)
}

// 类定义
class Person {
  constructor(public name: string) { }
  speak(@Demo message1: any, mesage2: any) {
    console.log(`${this.name}想对说：${message1}，${mesage2}`);
  }
}
```

**应用举例**

> [!NOTE]
>
> 需求：定义方法装饰器`Validate`，同时搭配参数装饰器`NotNumber`，来对`speak`方法的参数类型进行限制。

```js
function NotNumber(target: any, propertyKey: string, parameterIndex: number) {
  // 初始化或获取当前方法的参数索引列表
  let notNumberArr: number[] = target[`__notNumber_${propertyKey}`] || [];
  // 将当前参数索引添加到列表中
  notNumberArr.push(parameterIndex);
  // 将列表存储回目标对象
  target[`__notNumber_${propertyKey}`] = notNumberArr;
}

// 方法装饰器定义
function Validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    // 获取被标记为不能为空的参数索引列表
    const notNumberArr: number[] = target[`__notNumber_${propertyKey}`] || [];
    // 检查参数是否为 null 或 undefined
    for (const index of notNumberArr) {
      if (typeof args[index] === "number") {
        throw new Error(
          `方法 ${propertyKey} 中索引为 ${index} 的参数不能是数字！`
        );
      }
    }
    // 调用原始方法
    return method.apply(this, args);
  };

  return descriptor;
}

// 类定义
class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @Validate
  speak(@NotNumber message1: any, mesage2: any) {
    console.log(`${this.name}想对说：${message1}，${mesage2}`);
  }
}

// 使用
const s1 = new Student("张三");
s1.speak(100, 200);
```

# TS 类型工具

`TypeScript` 类型工具是一系列预定义的类型，它们可以帮助开发者更方便地进行类型转换和操作。这些工具类型在全局作用域内可用，无需额外导入。

## 1. `Partical<T>`

`Partial<T>` 类型工具可以将一个类型的所有属性变为可选的。这对于创建部分更新对象非常有用。例如，假设有一个 `Person` 接口：

```tsx
interface Person {
  name: string;
  age: number;
}
```

使用 `Partial` 可以将 `Person` 的所有属性变为可选：

```tsx
type PartialPerson = Partial<Person>;

// 相当于
// interface PartialPerson {
//     name?: string;
//     age?: number;
// }
```

## 2. `Required<T>`

`Required<T>` 类型工具与 `Partial<T>` 相反，它可以将一个类型的所有属性变为必填的。例如：

```tsx
type RequiredPerson = Required<PartialPerson>;
// 相当于
// interface RequiredPerson {
//     name: string;
//     age: number;
// }
```

## 3. `Readonly<T>`

`Readonly<T>` 类型工具可以将一个类型的所有属性设为只读，这意味着这些属性不能被重新赋值。例如：

```tsx
type ReadonlyPerson = Readonly<Person>;

// 相当于
// interface ReadonlyPerson {
//		readonly name: string;
// 		readonly age: number;
// }
```

## 4. `Pick<T, K>`

`Pick<T, K>` 类型工具可以从给定的类型中选取出指定的键值，然后组成一个新的类型。例如：

```tsx
type NewPerson = Pick<Person, "name" | "age">;
// 相当于
// interface NewPerson {
//		name: string;
// 		age: number;
// }
```

## 5. `Omit<T, K>`

`Omit<T, K>` 类型工具的功能是返回去除指定的键值之后的新类型。例如：

```tsx
type NewPerson = Omit<Person, "age">;
// 相当于
// interface NewPerson {
// 		name: string;
// }
```

## 6. `Exclude<T, U>`

`Exclude<T, U>` 类型工具可以从联合类型中去除指定的类型。例如：

```tsx
type T = Exclude<"a" | "b" | "c", "a">;
// 相当于
// type T = 'b' | 'c';
```

## 7. `Extract<T, U>`

`Extract<T, U>` 类型工具与 `Exclude<T, U>` 相反，它从联合类型中提取指定的类型。例如：

```tsx
type T = Extract<"a" | "b" | "c", "a">;
// 相当于
// type T = 'a';
```

## 8. `Record<K, T>`

`Record<K, T>` 类型工具可以创建一个新类型，该类型具有由 `K` 中的每个键映射到 `T` 的属性。例如：

```tsx
type RecordType = Record<"a" | "b", string>;
// 相当于
// interface RecordType {
// 		a: string;
// 		b: string;
// }
```

## 9. `Awaited<T>`

`Awaited<T>` 类型工具用于递归地解开 `Promise`。例如：

```tsx
type A = Awaited<Promise<string>>;
// 相当于
// type A = string;

type B = Awaited<Promise<Promise<number>>>;
// 相当于
// type B = number;
```

## 10. `ReturnType<T>`

`ReturnType<T>` 类型工具可以提取函数类型的返回类型。例如：

```tsx
function bar(): { a: string } {
  return { a: "hello" };
}
type ReturnTypeBar = ReturnType<typeof bar>;
// 相当于
// type ReturnTypeBar = { a: string };
```

## 11. `XOR<T, U>`

在 `TypeScript` 中实现 **XOR（异或）类型** 需要确保两个类型中**有且仅有一个属性存在**。例如：

```tsx
type UserCredentials = XOR<
  { email: string; password: string },
  { username: string; token: string }
>;

// ✅ 合法
const valid1: UserCredentials = { email: "a@b.com", password: "123" };
const valid2: UserCredentials = { username: "john", token: "abc" };

// ❌ 错误
const invalid: UserCredentials = {
  email: "a@b.com",
  username: "john", // 同时存在互斥属性
};
```
