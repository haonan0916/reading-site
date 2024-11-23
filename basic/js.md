# this 的指向问题

| 调用方式          | 示例                 | 函数中的 `this` 指向 |
| ----------------- | -------------------- | ---------------------- |
| 通过 `new` 调用 | `new method()`     | 新对象                 |
| 直接调用          | `method()`         | 全局对象               |
| 通过对象调用      | `obj.method()`     | 前面的对象             |
| call、apply、bind | `method.call(ctx)` | 第一个参数             |

> [!TIP]
>
> `this` 指向的优先级（由高到低）：
>
> 1. 构造器调用模式  `new` ；
> 2. `call、apply、bind` 调用模式；
> 3. 对象（方法）调用模式；
> 4. 直接（函数）调用模式。



> [!IMPORTANT]
>
> 箭头函数它的 `this` 由定义它的结构代码时父级执行上下文决定的
>
> - 如果是在全局环境,或者是在一个对象里,它的父级执行上下文就是全局环境,它的 `this` 就指向了`window`
> - 如果它的外部是一个函数,那么它的 `this` 就指向了函数的执行上下文。而函数的执行上下文就是活的.取决于调用时的情况.也就上面列举的四种情况.



> [!IMPORTANT]
>
> 立即执行匿名函数表达式是由 `window`  调用的，`this` 指向 `window` 。



## this 的代码输出题

```js
var obj = { 
  name: 'cuggz', 
  fun: function(){ 
     console.log(this.name); 
  } 
} 
obj.fun()     // cuggz
new obj.fun() // undefined
```

> [!TIP]
>
> `obj.fun()` 是取出了 `obj.fun` 作为构造函数，此时的 `this` 指向的是构造函数， 因为没有 `name` 参数，输出：`undefined` 



```js
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log(this.foo);  
        console.log(self.foo);  
        (function() {
            console.log(this.foo);  
            console.log(self.foo);  
        }());
    }
};
myObject.func();
```

> [!TIP]
>
> 输出结果：`bar bar undefined bar`
>
> 
>
> **解析：**
>
> 1. 首先 `func` 是由 `myObject` 调用的，`this` 指向 `myObject`。又因为 `var self = this;` 所以 `self` 指向 `myObject`。
> 2. 这个立即执行匿名函数表达式是由 `window` 调用的，`this` 指向 `window` 。立即执行匿名函数的作用域处于 `myObject.func` 的作用域中，在这个作用域找不到 `self` 变量，沿着作用域链向上查找 `self` 变量，找到了指向 `myObject` 对象的 `self`。



```js
var length = 10;
function fn() {
    console.log(this.length);
}
 
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};
 
obj.method(fn, 1);
```

> [!TIP]
>
> 输出结果：` 10 2 `
>
> 
>
> **解析：**
>
> 1. 第一次执行 `fn()`，`this` 指向 `window` 对象，输出 `10`。
> 2. 第二次执行 `arguments[0]( )`，相当于 `arguments` 调用方法，`this` 指向 `arguments`，而这里传了两个参数，故输出 `arguments` 长度为 `2`。



```js
var a = 1;
function printA(){
  console.log(this.a);
}
var obj={
  a:2,
  foo:printA,
  bar:function(){
    printA();
  }
}

obj.foo(); // 2
obj.bar(); // 1
var foo = obj.foo;
foo(); // 1
```

> [!TIP]
>
> 输出结果：` 2 1 1` 
>
> 
>
> **解析：**
>
> 1. `obj.foo()`，`foo` 的 `this` 指向 `obj` 对象，所以 `a` 会输出 `2`；
> 2. `obj.bar()`，`printA` 在 `bar` 方法中执行，所以此时 `printA` 的 `this` 指向的是 `window`，所以会输出 `1`；
> 3. `foo()`，`foo` 是在全局对象中执行的，所以其 `this` 指向的是 `window`，所以会输出 `1`；



```js
 var a = 10; 
 var obt = { 
   a: 20, 
   fn: function(){ 
     var a = 30; 
     console.log(this.a)
   } 
 }
 obt.fn();  // 20
 obt.fn.call(); // 10
 (obt.fn)(); // 20
```



> [!TIP]
>
> 输出结果：` 20  10  20 `
>
> 
>
> **解析：**
>
> 1.  `obt.fn()`，`fn` 是由 `obt` 调用的，所以其 `this` 指向 `obt` 对象，会打印出 `20`；
> 2.  `obt.fn.call()`，这里 `call` 的参数啥都没写，就表示 `null`，我们知道如果 `call` 的参数为 `undefined` 或 `null` ，那么 `this` 就会指向全局对象 `this`，所以会打印出 `10`；
> 3.  `(obt.fn)()`， 这里给表达式加了括号，**而括号的作用是改变表达式的运算顺序**，而在这里加与不加括号并无影响；相当于  `obt.fn()`，所以会打印出 `20`；





# Promise 相关问题

## 1. Promise.all 和 Promise.race 的区别和使用场景

### （1） Promise.all

`Promise.all` 可以将多个 `Promise` 实例包装成一个新的 `Promise` 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是**一个结果数组**，而失败的时候则返回**最先被 `reject` 失败状态的值**。

`Promise.all` 中传入的是数组，返回的也是是数组，并且会将进行映射，传入的 `promise` 对象返回的值是按照顺序在数组中排列的，但是注意的是他们**执行的顺序并不是按照顺序的，除非可迭代对象为空。**

> [!TIP]
> 需要注意，`Promise.all` 获得的成功结果的数组里面的数据顺序和 `Promise.all` 接收到的数组顺序是一致的，这样**当遇到发送多个请求并根据请求顺序获取和使用数据的场景**，就可以使用 `Promise.all` 来解决。

### （2） Promise.race

顾名思义，`Promse.race` 就是赛跑的意思，意思就是说，`Promise.race([p1, p2, p3])` 里面哪个结果获得的快，就返回那个结果，**不管结果本身是成功状态还是失败状态。当要做一件事，超过多长时间就不做了，** 可以用这个方法来解决：

```js
Promise.race([promise1,timeOutPromise(5000)]).then(res=>{})
```

## 2. 对 Promise 的理解

`Promise` 是异步编程的一种解决方案，它是一个**对象**，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了**回调地狱**，它比传统的解决方案回调函数和事件更合理、更强大。

所谓 `Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个**异步操作**）的**结果**。从语法上说，`Promise` 是一个对象，从它可以获取异步操作的消息。`Promise` 提供统一的 `API`，各种异步操作都可以用同样的方法进行处理。

（1）`Promise`的实例有**三个状态**:

- Pending（进行中）
- Fulfilled（已完成）
- Rejected（已拒绝）

当把一件事情交给 `promise` 时，它的状态就是 `Pending` ，**任务完成**了状态就变成了 `Resolved` 、没有完成**失败**了就变成了 `Rejected`。

（2）`Promise` 的实例有**两个过程**：

- pending -> fulfilled : Resolved（已完成）
- pending -> rejected：Rejected（已拒绝）

> [!TIP]
>
> 注意：一旦从进行状态变成为其他状态就**永远**不能更改状态了。

**Promise的特点：**

- 对象的状态不受外界影响。`promise` 对象代表一个异步操作，有三种状态，`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是 `promise` 这个名字的由来——“**承诺**”；
- 一旦状态改变就不会再变，任何时候都可以得到这个结果。`promise` 对象的状态改变，只有两种可能：从 `pending`变为 `fulfilled`，从 `pending`变为 `rejected`。这时就称为 `resolved`（已定型）。如果改变已经发生了，你再对 `promise` 对象添加回调函数，也**会立即得到这个结果**。这与事件（`event`）完全不同，**事件的特点是：如果你错过了它，再去监听是得不到结果的。**

**Promise的缺点：**

- 无法取消 `Promise`，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。
- 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

**总结：**

`Promise` 对象是异步编程的一种解决方案，最早由社区提出。`Promise` 是一个**构造函数**，接收一个函数作为参数，返回一个 `Promise` 实例。一个 `Promise `实例有三种状态，分别是 `pending、fulfilled` 和 `rejected`，分别代表了进行中、已成功和已失败。实例的状态只能由 `pending` 转变 `resolved` 或者 `rejected` 状态，并且状态一经改变，就凝固了，无法再被改变了。

**状态的改变是通过 `resolve()` 和 `reject()` 函数来实现的**，可以在异步操作结束后调用这两个函数改变 `Promise` 实例的状态，它的原型上定义了一个 `then` 方法，使用这个 `then` 方法可以为两个状态的改变注册回调函数。**这个回调函数属于微任务，会在本轮事件循环的末尾执行。**

> [!TIP]
>
> **注意**：在构造 `Promise` 的时候，构造函数内部的代码是立即执行的

## 3. Promise 的基本用法

### （1） 创建Promise对象

`Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve`和 `reject`。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

**一般情况下都会使用** `new Promise()`**来创建 `promise` 对象，但是也可以使用 `promise.resolve`**和 `promise.reject`**这两个方法：**

- **Promise.resolve**

`Promise.resolve(value)`的返回值也是一个 `promise` 对象，可以对返回值进行 `.then` 调用，代码如下：

```js
Promise.resolve(11).then(function(value){
  console.log(value); // 打印出11
});
```

`resolve(11)`代码中，会让 `promise` 对象进入确定(`resolve`状态)，并将参数 `11`传递给后面的 `then`所指定的 `onFulfilled` 函数；

创建 `promise` 对象可以使用 `new Promise`的形式创建对象，也可以使用 `Promise.resolve(value)`的形式创建 `promise` 对象；

- **Promise.reject**

`Promise.reject` 也是 `new Promise`的快捷形式，也创建一个 `promise` 对象。代码如下：

```js
Promise.reject(new Error(“我错了，请原谅俺！！”));
```

就是下面的代码 `new Promise ` 的简单形式：

```js
new Promise(function(resolve, reject) => {
	reject(new Error("我错了，请原谅俺！！"));
});
```

下面是使用 `resolve` 方法和 `reject` 方法：

```js
function testPromise(ready) {
    return new Promise((resolve, reject) => {
       if (ready) {
           resolve("hello world");
       } else {
           reject("No thanks");
       }
    });
};
// 方法调用
testPromise(true).then(
	msg => console.log(msg),
    err => console.log(err)
);
```

上面的代码的含义是给 `testPromise`方法传递一个参数，返回一个promise对象，如果为 `true`的话，那么调用 `promise` 对象中的 `resolve()`方法，并且把其中的参数传递给后面的 `then`第一个函数内，因此打印出 “`hello world`”, 如果为 `false`的话，会调用promise对象中的 `reject()`方法，则会进入 `then`的第二个函数内，会打印 `No thanks`。

### （2）Promise 方法

`Promise` 有五个常用的方法：`then()、catch()、all()、race()、finally()`。

#### 1. then()

当 `Promise` 执行的内容符合成功条件时，调用 `resolve`函数，失败就调用 `reject`函数。`Promise` 创建完了，那该如何调用呢？

```js
promise.then(
	value => {
        // success
    },
    err => {
        // failure
    }
);
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是 `Promise` 对象的状态变为 `resolved`时调用，第二个回调函数是 `Promise` 对象的状态变为 `rejected`时调用。其中第二个参数可以省略。

> [!CAUTION]
>
> - 当 `then` 处理程序的参数不是函数时，它会被忽略，直接传递前一个 `Promise` 的结果。
> - 如果没有处理程序，则返回的 `Promise` 使用原始 `Promise` 的最终状态，然后调用该 `Promise`。（对此 `Promise` 使用**最近的最后一个值**）

`then`**方法返回的是一个新的 `Promise` 实例（不是原来那个 `Promise` 实例）。**因此可以采用链式写法，即 `then`方法后面再调用另一个 `then` 方法。

当要写**有顺序的异步事件**时，需要串行时，可以这样写：

```js
let promise = new Promise((resolve, reject) => {
    ajax('first').success(res => resolve(res));
});

promise.then(res => {
    return new Promise((resolve, reject) => {
        ajax('second').success(res => resolve(res));
    })
}).then(res => {
   return new Promise((resolve, reject) => {
       ajax('third').success(res => resolve(res));
   })
}).then(res => {
    // ...
});
```

> [!TIP]
>
> 那当要写的事件没有顺序或者关系时，还如何写呢？可以使用 `all` 方法来解决。

#### 2. catch()

`Promise` 对象除了有 `then` 方法，还有一个 `catch` 方法，该方法相当于 `then`方法的第二个参数，指向 `reject`的回调函数。不过 `catch`方法还有一个作用，就是在执行 `resolve`回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入 `catch`方法中。

```js
p.then(data => {
    	console.log('resolved', data);
	}, err => {
    	console.log('rejected', err);
	}
);
p.then(data => {
    console.log('resolved', data);
}).catch(err => {
    console.log('rejected', err);
});
```

> [!TIP]
>
> 无论是 `then` 还是 `catch` 中，只要 `throw` 抛出了错误，就会被 `catch` 捕获，如果没有 `throw` 出错误，就被继续执行后面的 `then`。

#### 3. all()

`all`方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个 `promise`对象。当数组中所有的 `promise`的状态都达到 `fulfilled`的时候，`all`方法的状态就会变成 `fulfilled`，如果有一个状态变成了 `rejected`，那么 `all`方法的状态就会变成 `rejected`。

```js
javascript
let promise1 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(1);
	},2000)
});
let promise2 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(2);
	},1000)
});
let promise3 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(3);
	},3000)
});
Promise.all([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果为：[1,2,3]
})
```

调用 `all`方法时的结果成功的时候是回调函数的参数也是一个数组，这个数组按顺序保存着每一个 `promise` 对象 `resolve`执行时的值。

#### 4. race()

`race`方法和 `all`一样，接受的参数是一个每项都是 `promise`的数组，但是与 `all`不同的是，当最先执行完的事件执行完之后，就直接返回该 `promise`对象的值。如果第一个 `promise`对象状态变成 `filfilled`，那自身的状态变成了 `filfilled`；反之第一个 `promise`变成 `rejected`，那自身状态就会变成 `rejected`。

```js
let promise1 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       reject(1);
	},2000)
});
let promise2 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(2);
	},1000)
});
let promise3 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(3);
	},3000)
});
Promise.race([promise1,promise2,promise3]).then(res=>{
	console.log(res);
	//结果：2
},rej=>{
    console.log(rej)};
)
```

#### 5. finally()

`finally`方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 `ES2018` 引入标准的。

```js
promise
.then(res => {...})
.catch(err => {...})
.finally(() => {...});
```

上面代码中，不管 `promise`最后的状态，在执行完 `then`或 `catch`指定的回调函数以后，都会执行 `finally`方法指定的回调函数。

下面是一个例子，服务器使用 `Promise` 处理请求，然后使用 `finally`方法关掉服务器。

```js
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 `Promise` 状态到底是 `fulfilled`还是 `rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 `Promise` 的执行结果。`finally`本质上是 `then`方法的特例：

```js
promise
.finally(() => {
    // 语句
});
// 等同于
promise
.then(
	res => {
        // 语句
        return res;
    },
    err => {
        // 语句
        throw err;
    }
);
```

上面代码中，如果不使用 `finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了 `finally`方法，则只需要写一次。

> [!TIP]
>
> `.finally`的返回值如果在没有抛出错误的情况下默认会是上一个 `Promise` 的返回值

## 4. 对 async/await 的理解

`async/await` 其实是 `Generator` 的语法糖，它能实现的效果都能用 `then` 链来实现，它是为优化 `then` 链而开发出来的。从字面上来看，`async` 是“异步”的简写，`await` 则为等待，所以很好理解 `async` 用于申明一个 `function` 是异步的，而 `await` 用于等待一个异步方法执行完成。当然语法上强制规定 `await` **只能出现在 `asnyc` 函数中**，先来看看 `async` 函数返回了什么：

```js
async function testAsy(){
   return 'hello world';
}
let result = testAsy(); 
console.log(result)
```

![01.png](/js_images/01.png)

所以，`async` 函数返回的是一个 `Promise` 对象。`async` 函数（包含函数语句、函数表达式、`Lambda` 表达式）会返回一个 `Promise` 对象，如果在函数中 `return` 一个直接量，`async` 会把这个直接量通过 `Promise.resolve()` 封装成 `Promise` 对象。

`async` 函数返回的是一个 `Promise` 对象，所以在最外层不能用 `await` 获取其返回值的情况下，当然应该用原来的方式：`then()` 链来处理这个 `Promise` 对象，就像这样：

```js
async function testAsy() {
    return "hello world";
}
let result = testAsy();
console.log(result);
result.then(v => {
    console.log(v); // hello world
});
```

那如果 `async` 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。

联想一下 `Promise` 的特点——无等待，所以在没有 `await` 的情况下执行 `async` 函数，它会立即执行，返回一个 `Promise` 对象，并且，绝不会阻塞后面的语句。这和普通返回 `Promise` 对象的函数并无二致。

> [!TIP]
>
> **注意：**`Promise.resolve(x)` 可以看作是 `new Promise(resolve => resolve(x))` 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 `Promise` 实例。

> [!CAUTION]
>
> 如果 `async` 函数中抛出了错误，就会终止错误结果，不会继续向下执行。
>
> ```js
> async function async1 () {
>   await async2();
>   console.log('async1');
>   return 'async1 success'
> }
> async function async2 () {
>   return new Promise((resolve, reject) => {
>     console.log('async2')
>     reject('error')
>   })
> }
> async1().then(res => console.log(res))
> ```
>
> 输出：
>
> `async2`
> `Uncaught (in promise) error`

## 5. await 到底在等啥？

`await` 在等待什么呢？一般来说，都认为 `await` 是在等待一个 `async` 函数完成。不过按语法说明，`await` 等待的是一个表达式，这个表达式的计算结果是 `Promise` 对象或者其它值（换句话说，就是没有特殊限定）。

因为 `async` 函数返回一个 `Promise` 对象，**所以 `await` 可以用于等待一个 `async` 函数的返回值**——这也可以说是 `await` 在等 `async` 函数，但要清楚，**它等的实际是一个返回值**。注意到 `await` 不仅仅用于等 `Promise` 对象，它可以等任意表达式的结果，所以，`await` 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行：

```js
function getSomething() {
    return "something";
}
async function testAsync() {
    return Promise.resolve("hello async");
}
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}
test();
```

`await` 表达式的运算结果取决于它等的是什么。

- 如果它等到的不是一个 `Promise` 对象，那 `await` 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 `Promise` 对象，`await` 就忙起来了，**它会阻塞后面的代码**，等着 `Promise` 对象 `resolve`，然后得到 `resolve` 的值，作为 `await` 表达式的运算结果。
- 如果 `await` 等的 `Promise`没有返回值，则 `await` 后面的代码不会执行；

来看一个例子：

```js
function testAsy(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 3000);
    });
}
async function testAwt() {
    let result = await testAsy("hello world");
    console.log(result); 	// 3秒钟之后出现hello world
    console.log("cuger");	// 3秒钟之后出现cuger
}
testAwt();
console.log("cuger");	// 立即输出 cuger
```

这就是 `await` 必须用在 `async` 函数中的原因。`async` 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 `Promise` 对象中异步执行。`await` 暂停当前 `async` 的执行，所以 `'cuger `最先输出，`hello world`和 `‘cuger’` 是3秒钟后同时出现的。

## 6. async/await 的优势

单一的 `Promise` 链并不能发现 `async/await` 的优势，但是，如果需要处理由多个 `Promise` 组成的 `then` 链的时候，优势就能体现出来了（很有意思，`Promise` 通过 `then` 链来解决多层回调的问题，现在又用 `async/await` 来进一步优化它）。

假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。仍然用 `setTimeout` 来模拟异步操作：

```js
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function tekeLongTime(n) {
    return new Promise(resolve => {
       setTimeout(() => resolve(n + 200), n); 
    });
}
function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}
function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

现在用 `Promise` 方式来实现这三个步骤的处理：

```js
function doIt() {
    console.time("doIt");
    const time1 = 300;
    setp1(time1)
    	.then(time2 => step2(time2))
    	.then(time3 => step3(time3))
    	.then(res => {
        	console.log(`result is ${result}`);
        	console.timeEnd("doIt");
    	});
}
doIt();
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms
```

输出结果 `result` 是 `step3()` 的参数 `700 + 200` = `900`。`doIt()` 顺序执行了三个步骤，一共用了 `300 + 500 + 700 = 1500` 毫秒，和 `console.time()/console.timeEnd()` 计算的结果一致。

如果用 `async/await` 来实现呢，会是这样：

```js
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
```

结果和之前的 `Promise` 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样。

## 7. async/await对比Promise的优势

> [!CAUTION]
>
> - 代码读起来更加同步，`Promise` 虽然摆脱了回调地狱，但是 `then` 的链式调⽤也会带来额外的阅读负担
> - `Promise` 传递中间值⾮常麻烦，⽽ `async/await` ⼏乎是同步的**写法**，⾮常优雅
> - 错误处理友好，`async/await` 可以⽤成熟的 `try/catch`，`Promise` 的错误捕获⾮常冗余
> - 调试友好，`Promise` 的调试很差，由于没有代码块，你**不能在⼀个返回表达式的箭头函数中设置断点**，如果你在⼀个 `.then` 代码块中使⽤调试器的步进(`step-over`)功能，调试器并不会进⼊后续的 `.then` 代码块，因为调试器只能跟踪同步代码的每⼀步。

# 防抖与节流

## 1. 防抖

> [!TIP]
>
> **函数防抖**是指事件在被触发 `n` 秒后再执行回调，如果在这 `n` 秒内事件又被触发，则**重新计时**。
>
> 使用场景：
>
> 可以使用在一些**点击请求**的事件上，**避免因为用户的多次点击向后端发送多次请求**。

函数防抖的实现：

```js
function debounce(fn, wait) {
    let timer = null;
  
    return function() {
        let context = this, args = arguments;
      
        // 如果存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
      
        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}
```

## 2. 节流

> [!TIP]
>
> **函数节流**是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，**如果在同一个单位时间内某事件被触发多次**，**只有一次能生效**。节流可以使用在 `scroll` 函数的事件监听上，通过事件节流来降低事件调用的频率。

函数节流的实现：

```js
// 函数节流的实现;
function throttle(fn, delay) {
  let curTime = 0;

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      fn.apply(context, args);
      curTime = nowTime;
    }
  };
}
```

# call/apply/bind

> [!TIP]
>
> **三者异同**：
>
> 相同点：三种方法都可以显示的**指定**调用函数的 `this` 指向。
>
> 不同：
>
> `apply` 方法接收两个参数：一个是 `this` 绑定的对象，一个是参数数组；
>
> `call` 方法接收的参数：第一个是 `this` 绑定的对象，后面的其余参数是传入函数执行的参数也就是说，在使用 `call()` 方法时，传递给函数的参数必须逐个列举出来；
>
> **`bind()`** 方法创建一个新函数，当调用该新函数时，它会调用原始函数并将其 `this` 关键字设置为给定的值，同时，还可以传入一系列指定的参数，这些参数会插入到调用新函数时传入的参数的前面。`bind` 方法通过传入一个对象，返回一个 `this` 绑定了传入对象的新函数。这个函数的 `this` 指向除了使用 `new` 时会被改变，其他情况下都不会改变。
>
> `bind` 创建的新函数与原函数有相同的原型（`prototype`）。



> [!CAUTION]
>
> 如果第一个参数传入的对象调用者是 `null` 或者 `undefined`，`call` 方法将把全局对象（浏览器上是  `window` 对象）作为 `this` 的值。所以，不管传入 `null`  还是 `undefined`，其 `this` 都是全局对象 `window` 。所以，在浏览器上答案是输出 `window` 对象。
>
> 要注意的是，在严格模式中，`null` 就是 `null`，`undefined` 就是 `undefined`。
>
> ```js
> 'use strict';
> 
> function a() {
>     console.log(this);
> }
> a.call(null); // null
> a.call(undefined); // undefined
> ```





# 异步编程

## 1. 异步编程的实现方式？

`JavaScript` 中的异步机制可以分为以下几种：

- **回调函数** 的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
- **Promise** 的方式，使用 `Promise` 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 `then` 的链式调用，可能会造成代码的语义不够明确。
- **generator** 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 `generator` 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 `generator` 的机制，比如说 `co` 模块等方式来实现 `generator` 的自动执行。
- **async 函数** 的方式，`async` 函数是 `generator` 和 `promise` 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 `await` 语句的时候，如果语句返回一个 `promise` 对象，那么函数将会等待 `promise` 对象的状态变为 `resolve` 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

> [!IMPORTANT]
>
> 异步只是把任务发布出去等着，**后面还是会拉到主线程执行**，异步不可能在异步队列自己执行。



# webworker 实现多线程

![img](/js_images/webworker.png)

> [!CAUTION]
>
> 使用注意事项：
>
> `new Worker()` 里面的 `js` 文件必须是线上的一个文件地址，不能是本地的 `js` 文件。
>
> 如果是 `vite / webpack` 项目，我们可以先把该 `js` 文件放到 `public ` 文件夹下来进行使用。
>
> - `webworker` 不能使用本地文件，必须是网络上的同源文件。
> - `webwoker` 不能使用 `window` 上的 `dom` 操作，也不能获取 `dom` 对象，`dom` 相关的东西只有主线程有。只能做一些计算相关的操作。
> - 有的东西是无法通过主线程传递多个子线程的，比如方法，`dom` 结点，一些对象里的特殊设置（`freeze`、`getter`、`setter` 这些，所以 `vue` 的响应式对象是不能传递的）
> - 模块的引入问题



`a.js`

```js
export function a1() {
    
}
```



`list.js`

```js
// 如果在这个文件中想引入 a.js 文件（使用 ES5）
// importScripts('http://localhost:5173/a.js'); // 必须网络地址，这个网络地址可以跨域

// 如果在这个文件中想引入 a.js 文件（使用 ES6）
import {a1} from 'http://localhost:5173/a.js';


let a = 1 + 1;
self.postMessage(a);

self.addEventerListener((event) => {
    console.log("收到");
});
```





`Example.vue`

```vue
<script setup>
    // 第二个参数 type: 'module' 表示支持 ES6 模块引入
	let worker1 = new Worker('http://localhost:5173/list.js', {
        type: "module"
    });
	worker1.addEventListener('message', (e) => {
        console.log(e);
    });
</script>

<template>
	<div>
        <button @click="() => {worker1.postMessage('你好')}">
        	发消息给 worker1    
    	</button>
    </div>
</template>
```



## 使用场景

- 使用 `webworker` 处理可视化的效果（如：图片加滤镜等效果，因为这些都需要消耗非常大的计算量）
- 使用 `webworker` 处理导出大批量数据的表格功能（如：导出 `10w` 个表格） 

`excelwork.js`

```js
importScript('./xlsx.js')
let arr = [];
for (let i = 0; i < 100000; i++) {
    arr.push({
        id: i,
        name: '张三' + i + '号',
        location: 'xxx大道' + i + '号',
        age: i,
        a: i * 2,
        b: i / 2,
        c: i + 2,
        d: 233,
        e: 123,
        f: 2332
    })
}

self.addEventListener('message', (e) => {
    const sheet = XLSX.utils.json_to_sheet(arr);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    self.postMessage(workbook);
})
```



```vue
<script setup>
import {writeFile} from 'xlsx'
let worker = new Worker('http://localhost:5173/excelwork.js');
work1.onmessage = function(e) {
    let workbook = e.data;
    writeFile(workbook, "test.xlsx");
}
    
function exportExcel() {
    work1.postMessage("");
}
</script>

<template>
	<div class="about">
        <input />
        <button @click="exportExcel">
        	导出    
    	</button>
    </div>
</template>
```



如果上面的两个场景不做优化，则会导致页面直接卡死，我们在卡死的这段时间内是无法操作页面的。





# 面向对象

## 1. 对象创建的方式有哪些？

一般使用**字面量**的形式直接创建对象，但是这种创建方式对于创建大量相似对象的时候，会产生大量的重复代码。但 `js` 和一般的面向对象的语言不同，在 `ES6` 之前它没有类的概念。但是可以使用函数来进行模拟，从而产生出可复用的对象创建方式，常见的有以下几种：

（1）第一种是**工厂模式**，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。

（2）第二种是**构造函数模式**。`js` 中每一个函数都可以作为构造函数，只要一个函数是通过 `new` 来调用的，那么就可以把它称为**构造函数**。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 `prototype` 属性，然后将执行上下文中的 `this` 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 `this` 的值指向了新建的对象，因此可以使用 `this` 给对象赋值。构造函数模式相对于工厂模式的优点是，**所创建的对象和构造函数建立起了联系，因此可以通过原型来识别对象的类型。**但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。

（3）第三种模式是**原型模式**，因为每一个函数都有一个 `prototype` 属性，这个属性是一个对象，**它包含了通过构造函数创建的所有实例都能共享的属性和方法**。因此可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 `Array` 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

（4）第四种模式是**组合使用构造函数模式和原型模式**，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

（5）第五种模式是**动态原型模式**，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

（6）第六种模式是**寄生构造函数模式**，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。

## 2.  对象继承的方式有哪些？

（1）第一种是**以原型链的方式来实现继承**，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

（2）第二种方式是**使用借用构造函数的方式**，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

（3）第三种方式是**组合继承**，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。

（4）第四种方式是**原型式继承**，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。

（5）第五种方式是**寄生式继承**，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是自定义类型时。缺点是没有办法实现函数的复用。

（6）第六种方式是**寄生式组合继承**，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

# 垃圾回收与内存泄漏

## 1. 浏览器的垃圾回收机制

### （1）垃圾回收的概念

**垃圾回收**：`JavaScript` 代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。

**回收机制**：

- `Javascript` 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放，**原理就是找到不再使用的变量**，**然后释放掉其占用的内存**。
- `JavaScript` 中存在两种变量：**局部变量和全局变量**。全局变量的生命周期会持续到页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。
- 不过，当局部变量被外部函数使用时，其中一种情况就是**闭包**，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。

### （2）垃圾回收的方式

浏览器通常使用的**垃圾回收方法**有两种：**标记清除**，**引用计数**。

**1）标记清除**

- 标记清除是浏览器常见的垃圾回收方式，当变量进入执行环境时，就标记这个变量“进入环境”，被标记为“进入环境”的变量是不能被回收的，因为他们正在被使用。当变量离开环境时，就会被标记为“离开环境”，被标记为“离开环境”的变量会被内存释放。
- 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会**去掉环境中的变量以及被环境中的变量引用的标记**。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。

**2）引用计数**

- 另外一种垃圾回收机制就是引用计数，**这个用的相对较少**。引用计数就是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是 `1`。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减 `1`。当这个引用次数变为 `0`  时，说明这个变量已经没有价值，因此，在垃圾回收期下次再运行时，这个变量所占有的内存空间就会被释放出来。
- 这种方法会引起**循环引用**的问题：例如：` obj1`和 `obj2`通过属性进行相互引用，两个对象的引用次数都是 `2`。当使用循环计数时，由于函数执行完后，两个对象都离开作用域，函数执行结束，`obj1`和 `obj2`还将会继续存在，因此它们的引用次数永远不会是 `0`，就会引起循环引用。

```js
function fun() {
    let obj1 = {};
    let obj2 = {};
    obj1.a = obj2; // obj1 引用 obj2
    obj2.a = obj1; // obj2 引用 obj1
}
```

这种情况下，就要手动释放变量占用的内存：

```js
obj1.a = null;
obj2.a = null;
```

### （3）减少垃圾回收

虽然浏览器可以进行垃圾自动回收，但是当代码比较复杂时，垃圾回收所带来的代价比较大，所以应该尽量减少垃圾回收。

- **对数组进行优化：**在清空一个数组时，最简单的方法就是给其赋值为[ ]，但是与此同时会创建一个新的空对象，可以将数组的长度设置为0，以此来达到清空数组的目的。
- **对** `object`**进行优化**：对象尽量复用，对于不再使用的对象，就将其设置为 `null`，尽快被回收。
- **对函数进行优化：**在循环中的函数表达式，如果可以复用，尽量放在函数的外面。

## 2. 哪些情况会导致内存泄漏

以下四种情况会造成内存的泄漏：

- **意外的全局变量：**由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。
- **被遗忘的计时器或回调函数：**设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
- **脱离 DOM 的引用：**获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收。
- **闭包：**不合理的使用闭包，从而导致某些变量一直被留在内存当中。

# 事件循环

## 浏览器的进程模型

### 何为进程？

程序运行需要有它自己专属的内存空间，可以把这块内存空间简单的理解为进程

<img src="http://mdrs.yuanjin.tech/img/202208092057573.png" alt="image-20220809205743532" style="zoom:50%;" />

每个应用至少有一个进程，进程之间相互独立，即使要通信，也需要双方同意。

### 何为线程？

有了进程后，就可以运行程序的代码了。

运行代码的「人」称之为「线程」。

一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，该线程称之为主线程。

如果程序需要同时执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程中可以包含多个线程。

![image-20220809210859457](http://mdrs.yuanjin.tech/img/202208092108499.png)

### 浏览器有哪些进程和线程？

**浏览器是一个多进程多线程的应用程序**

浏览器内部工作极其复杂。

为了避免相互影响，为了减少连环崩溃的几率，当启动浏览器后，它会自动启动多个进程。

![image-20220809213152371](http://mdrs.yuanjin.tech/img/202208092131410.png)

> 可以在浏览器的任务管理器中查看当前的所有进程

其中，最主要的进程有：

1. 浏览器进程

   主要负责界面显示、用户交互、子进程管理等。浏览器进程内部会启动多个线程处理不同的任务。
2. 网络进程

   负责加载网络资源。网络进程内部会启动多个线程来处理不同的网络任务。
3. **渲染进程**（本节课重点讲解的进程）

   渲染进程启动后，会开启一个**渲染主线程**，主线程负责执行 HTML、CSS、JS 代码。

   默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间不相互影响。

   > 将来该默认模式可能会有所改变，有兴趣的同学可参见[chrome官方说明文档](https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md#Modes-and-Availability)
   >

## 渲染主线程是如何工作的？

渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：

- 解析 `HTML`
- 解析 `CSS`
- 计算样式
- 布局
- 处理图层
- 每秒把页面画 `60` 次
- 执行全局 `JS` 代码
- 执行事件处理函数
- 执行计时器的回调函数
- ......

> 思考题：为什么渲染进程不适用多个线程来处理这些事情？

要处理这么多的任务，主线程遇到了一个前所未有的难题：如何调度任务？

比如：

- 我正在执行一个 `JS` 函数，执行到一半的时候用户点击了按钮，我该立即去执行点击事件的处理函数吗？
- 我正在执行一个 `JS` 函数，执行到一半的时候某个计时器到达了时间，我该立即去执行它的回调吗？
- 浏览器进程通知我“用户点击了按钮”，与此同时，某个计时器也到达了时间，我应该处理哪一个呢？
- ......

渲染主线程想出了一个绝妙的主意来处理这个问题：排队

![image-20220809223027806](http://mdrs.yuanjin.tech/img/202208092230847.png)

1. 在最开始的时候，**渲染主线程会进入一个无限循环**
2. 每一次循环会检查消息队列中是否有任务存在。如果有，就取出第一个任务执行，执行完一个后进入下一次循环；如果没有，则进入休眠状态。
3. 其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务

这样一来，就可以让每个任务有条不紊的、持续的进行下去了。

**整个过程，被称之为事件循环（消息循环）**

## 若干解释

### 何为异步？

代码在执行过程中，会遇到一些无法立即处理的任务，比如：

- 计时完成后需要执行的任务 —— `setTimeout`、`setInterval`
- 网络通信完成后需要执行的任务 -- `XHR`、`Fetch`
- 用户操作后需要执行的任务 -- `addEventListener`

如果让渲染主线程等待这些任务的时机达到，就会导致主线程长期处于「阻塞」的状态，从而导致浏览器「卡死」

![image-20220810104344296](http://mdrs.yuanjin.tech/img/202208101043348.png)

**渲染主线程承担着极其重要的工作，无论如何都不能阻塞！**

因此，浏览器选择**异步**来解决这个问题

![image-20220810104858857](http://mdrs.yuanjin.tech/img/202208101048899.png)

使用异步的方式，**渲染主线程永不阻塞**

> [!CAUTION]
>
> 面试题：如何理解 `JS` 的异步？
>
> 参考答案：
>
> `JS` 是一门**单线程**的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。
>
> 而渲染主线程承担着诸多的工作，渲染页面、执行 `JS` 都在其中运行。
>
> 如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。
>
> 所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。
>
> 在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

### JS为何会阻碍渲染？

先看代码

```html
<h1>Mr.Yuan is awesome!</h1>
<button>change</button>
<script>
  var h1 = document.querySelector('h1');
  var btn = document.querySelector('button');

  // 死循环指定的时间
  function delay(duration) {
    var start = Date.now();
    while (Date.now() - start < duration) {}
  }

  btn.onclick = function () {
    h1.textContent = '袁老师很帅！';
    delay(3000);
  };
</script>
```

点击按钮后，会发生什么呢？

> [!TIP]
>
> 具体来说，执行这段代码后会发生以下情况：
>
> 1. 页面加载完成后，显示 `“Mr.Yuan is awesome!”`。
> 2. 用户点击按钮后，文本会**立即**更改为 `“袁老师很帅！”`。
> 3. 然后，`delay`函数开始执行，页面会“冻结” `3` 秒钟，期间用户无法进行任何操作，因为浏览器的渲染线程被无限循环阻塞了。
> 4. `3` 秒过后，页面恢复正常，用户可以继续与页面交互。

### 任务有优先级吗？

任务没有优先级，在消息队列中先进先出

但**消息队列是有优先级的**

根据 `W3C` 的最新解释:

- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。
  在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。
- 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行
  https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint

> 随着浏览器的复杂度急剧提升，`W3C` 不再使用**宏队列**的说法

在目前 `chrome` 的实现中，至少包含了下面的队列：

- **延时队列**：用于存放**计时器**到达后的回调任务，优先级「中」
- **交互队列**：用于存放**用户操作**后产生的事件处理任务，优先级「高」
- **微队列**：用户存放需要最快执行的任务，优先级「最高」

> [!TIP]
>
> 添加任务到微队列的主要方式主要是使用 `Promise、MutationObserver、process.nextTick`
>
> 例如：
>
> ```js
> // 立即把一个函数添加到微队列
> Promise.resolve().then(函数)
> ```

> 浏览器还有很多其他的队列，由于和我们开发关系不大，不作考虑

> [!CAUTION]
>
> 面试题：阐述一下 `JS` 的事件循环
>
> 参考答案：
>
> 事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。
>
> 在 `Chrome` 的源码中，它开启一个不会结束的 `for` 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。
>
> 过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。
>
> 根据 `W3C` 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，**微队列的任务一定具有最高的优先级**，必须优先调度执行。

> [!CAUTION]
>
> 面试题：`JS` 中的计时器能做到精确计时吗？为什么？
>
> 参考答案：
>
> 不行，因为：
>
> 1. 计算机硬件没有原子钟，无法做到精确计时
> 2. 操作系统的计时函数本身就有少量偏差，由于 `JS` 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
> 3. 按照 `W3C` 的标准，浏览器实现计时器时，如果嵌套层级超过 `5` 层，则会带有 `4` 毫秒的最少时间，这样在计时时间少于 `4` 毫秒时又带来了偏差
> 4. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

# 函数柯里化

> [!IMPORTANT]
>
> 函数柯里化指的是**一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术**。

```js
function curry(fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length;

  args = args || [];

  return function() {
    let subArgs = args.slice(0);

    // 拼接得到现有的所有参数
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }

    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 如果满足，执行函数
      return fn.apply(this, subArgs);
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, subArgs);
    }
  };
}

// es6 实现
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
```



# 函数的 arguments 参数

> [!TIP]
>
> `arguments` 是一个特殊的**类数组对象**，它包含了一个函数调用时传递的所有参数。虽然 `arguments` 不是一个真正的数组，但它具有类似数组的特性，可以通过索引来访问其中的元素。`arguments` 对象在函数体内自动可用，无需显式声明。
>
> **主要特性**
>
> 1. **类数组结构**：
>    - `arguments` 对象的每个元素可以通过索引访问，例如 `arguments[0]` 表示第一个参数，`arguments[1]` 表示第二个参数，依此类推。
>    - `arguments` 对象还有一个 `length` 属性，表示传递给函数的参数数量。
> 2. **动态参数列表**：
>    - `arguments` 对象使得函数可以接受任意数量的参数，而不需要在定义时指定具体的参数列表。
>    - 这在编写需要处理可变数量参数的函数时非常有用。



# 类数组对象

一个拥有 `length` 属性和**若干索引属性**的对象就可以被称为类数组对象，类数组对象和数组类似，但是**不能调用数组的方法**。常见的类数组对象有 `arguments` 和 `DOM` 方法的返回结果，**函数参数**也可以被看作是类数组对象，因为它含有 `length` 属性值，代表可接收的参数个数。

常见的类数组转换为数组的方法有这样几种：

- 通过 `call` 调用数组的 `slice` 方法来实现转换

```js
Array.prototype.slice.call(arrayLike);
```

- 通过 `call` 调用数组的 `splice` 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0);
```

- 通过 `apply` 调用数组的 `concat` 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike);
```

- 通过 `Array.from` 方法来实现转换

```js
Array.from(arrayLike);
```



# 浅拷贝

> [!TIP]
>
> 浅拷贝是指一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，拷贝的就是**基本数据类型的值**，如果是引用数据类型，拷贝的就是**内存地址**。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。

## （1）Object.assign()

`Object.assign()`是 `ES6` 中**对象**的拷贝方法，接受的第一个参数是目标对象，其余参数是源对象，用法：`Object.assign(target, source_1, ···)`，该方法可以实现浅拷贝，也可以实现一维对象的深拷贝。

**注意：**

- 如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。
- 如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。
- 因为`null` 和 `undefined` 不能转化为对象，所以第一个参数不能为`null`或 `undefined`，会报错。

```js
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
console.log(target);  // {a: 1, b: 2, c: 3}
```



## （2）扩展运算符

使用扩展运算符可以在构造字面量对象的时候，进行属性的拷贝。语法：`let cloneObj = { ...obj };`

```js
let obj1 = {a:1,b:{c:1}}
let obj2 = {...obj1};
obj1.a = 2;
console.log(obj1); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}
obj1.b.c = 2;
console.log(obj1); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}
```



## （3）数组方法实现数组浅拷贝

### 1）Array.prototype.slice

- `slice()`方法是JavaScript数组的一个方法，这个方法可以从已有数组中返回选定的元素：用法：`array.slice(start, end)`，该方法不会改变原始数组。
- 该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝。

```js
let arr = [1,2,3,4];
console.log(arr.slice()); // [1,2,3,4]
console.log(arr.slice() === arr); //false
```



### 2）Array.prototype.concat

- `concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
- 该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝。

```js
let arr = [1,2,3,4];
console.log(arr.concat()); // [1,2,3,4]
console.log(arr.concat() === arr); //false
```



## （4）手写实现浅拷贝

```js
// 浅拷贝的实现;

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}
```



# 深拷贝

> [!TIP]
>
> - **浅拷贝：**浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用  `Object.assign` 和展开运算符来实现。
> - **深拷贝：**深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，**它新建一个引用类型并将对应的值复制给它**，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 `JSON` 的两个函数来实现，但是由于 `JSON` 的对象格式比 `js` 的对象格式更加严格，所以如果属性值里边出现函数或者 `Symbol` 类型的值时，会转换失败

## （1）JSON.stringify()

- `JSON.parse(JSON.stringify(obj))`是目前比较常用的深拷贝方法之一，它的原理就是利用`JSON.stringify` 将`js`对象序列化（JSON字符串），再使用`JSON.parse`来反序列化(还原)`js`对象。
- 这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有**函数**，`undefined，symbol`，当使用过`JSON.stringify()`进行处理之后，**都会消失**。

```js
let obj1 = {  a: 0,
              b: {
                 c: 0
                 }
            };
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 1;
console.log(obj1); // {a: 1, b: {c: 1}}
console.log(obj2); // {a: 0, b: {c: 0}}
```



## （2）函数库lodash的_.cloneDeep方法

该函数库也有提供 `_.cloneDeep` 用来做 `Deep Copy`

```js
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```



## （3）手写实现深拷贝函数

```js
function deepCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== 'object') return;

    // 根据 object 的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(object) ? [] : {};

    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = typeof object[key] === 'object' ? deepCopy(object[key]) : object[key];        }
    }

    return newObject;
}
```



# 前端终止请求的三种方式

## 1. abort()

`XMLHttpRequest.abort() ` 方法用于终止 `XMLHttpRequest` 对象的请求，该方法没有参数，也没有返回值。当调用该方法时，如果对应 `XMLHttpRequest` 对象的请求已经被发送并且正在处理中，则会中止该请求；如果请求已经完成（即已经接收到完整的响应），则不会执行任何操作。而且调用该方法后，还会触发 `XMLHttpRequest `对象的 `abort` 事件，我们可以在该事件的处理函数中执行后续相关逻辑代码，例如清除请求相关数据等等。

 当一个请求被终止后，该请求的 `readyState` 将会变为 `0`，并且 `status` 属性也会变为 `0`。


```js
// 创建XMLHttpRequest对象
const xhr = new XMLHttpRequest();
// 请求地址
const url = "https://developer.mozilla.org/";
// 初始化请求
xhr.open('GET', url, true);
// 发送请求
xhr.send();
// 监听取消请求
xhr.addEventListener('abort', function () {
	console.log('请求被abort()取消了');
});
// 定时器模拟取消请求
setTimeout(() => {
	// 取消请求
	xhr.abort();
	// 取消请求之后的状态status
	console.log('abort()之后的xhr.status---', xhr.status);
	// 取消请求之后的状态readyState
	console.log('abort()之后的xhr.readyState---', xhr.readyState);
}, 100);

```



## 2. AbortController（新版本）

 在 `axiso` 的 `0.22.0` 版本开始，需要使用浏览器原生的 `AbortController` 来终止请求，是目前推荐用的方法。当使用该方法终止请求时，如果对应请求已经被发送并且正在处理中，则会中止该请求；如果请求已经完成（即已经接收到完整的响应），则不会执行任何操作。

 我们想监听到终止请求的操作，并进行后续处理，有两种方法：

1. 使用 `AbortController` 提供的 `onabort` 事件，通过监听该事件，并绑定事件处理函数，在函数中进行后续处理。

2. 使用 `try..catch`，终止请求之后，会触发 `catch`，在 `catch` 中进行后续处理。如果同时使用 `onabort` 事件和 `try..catch` ，则会先触发 `onabort` 事件，再触发 `try..catch`。



```js
// 以vue项目中使用axios为例

// 创建请求控制器 
this.controller = new AbortController();
console.log("初始声明的请求控制器------", this.controller);

// 第一种方法：绑定事件处理程序
this.controller.signal.addEventListener("abort", () => {
   console.log("请求已终止，触发了onabort事件");
   // 进行后续处理
});

// 第二种方法：try...catch
try {
    // 发送文件上传请求
    const res = await this.$axios.post(api.Upload, uploadData, {
     timeout: 0, // 设置超时时间为 0/null 表示永不超时
     signal: this.controller.signal, // 绑定取消请求的信号量
	});
} catch (error) {
    console.log("终止请求时catch的error---", error);
    // 判断是否为取消上传
    if (error.message == "canceled"){
        // 进行后续处理
    };
}

// 终止请求
this.controller.abort();
console.log("终止请求后的请求控制器------", this.controller);

```

> [!TIP]
>
>  注意：每个 `AbortController` 可以同时取消多个请求，但是只能取消请求一次，一个 `AbortController` 在终止过请求之后，其控制是否终止请求的 `signal.aborted`属性会从 `false`，变为 `true`，目前本人没找到恢复为 `false` 的方法，暂且认为是不可恢复的吧。如果后续请求还是绑定该请求控制器，则后续请求都会被提前终止，不会被发出。
>
>  如果我们想要在终止请求之后，不影响后续请求的正常发出，且后续请求也是可以被终止的，那么需要在每次发出请求之前，都通过构造函数创建一个新的的 `AbortController`，每次请求绑定的都是新的`AbortController`，这样才能做到多次请求之间不干扰。



## 3. CancelToken（旧版本）

 在 `axiso` 的 `0.22.0` 之前的版本，需要使用取消令牌 `cancel token` 来终止请求，不过该 `API` 从 `0.22.0` 开始被弃用，目前已不建议再使用。当使用该方法终止请求时，如果对应请求已经被发送并且正在处理中，则会中止该请求；如果请求已经完成（即已经接收到完整的响应），则不会执行任何操作。
该方法只能通过`try..catch`来监听取消请求操作，终止请求之后，会触发`catch`，在`catch`中进行后续处理。而且该方法在取消请求时，可以通过参数自定义`catch`的`error`中的`message`内容。

```js
// 以vue项目中使用axios为例

// 这个地方需要导入原生的axios 最好不要使用二次封装后的axios
import axios from "axios";

// 创建请求令牌
this.source = axios.CancelToken.source();
console.log("初始声明的请求令牌---", this.source);

// 第二种方法：try...catch
try {
    // 发送文件上传请求
    const res = await this.$axios.post(api.Upload, uploadData, {
     timeout: 0, // 设置超时时间为 0/null 表示永不超时
     cancelToken: this.source.token, // 绑定取消请求的令牌
	});
} catch (error) {
    console.log("终止请求时catch的error---", error);
    // 判断是否为取消上传
    if (error.message == "自定义取消请求的message"){
        // 进行后续处理
    };
}

// 终止请求
this.source.cancel("自定义取消请求的message");
console.log("取消请求后的请求令牌---", this.source);

```

> [!TIP]
>
> 注意：该方法与 `AbortController` 相同，都可以同时取消多个请求，但是只能取消请求一次，一个`CancelToken` 在终止过请求之后，如果后续请求还是绑定该请求令牌，则后续请求都会被提前终止，不会被发出。
>
>  同理，如果我们想要在终止请求之后，不影响后续请求的正常发出，且后续请求也是可以被终止的，那么需要在每次发出请求之前，都创建一个新的的 `CancelToken`，每次请求绑定的都是新的 `CancelToken`，这样才能做到多次请求之间不干扰。
> 
>



# JS 继承的实现方式

1. 原型链继承：通过将子类的原型指向父类的实例。
2. 构造函数继承：在子类的构造函数中调用父类的构造函数。
3. 组合继承：结合原型链继承和构造函数继承，避免单独使用原型链继承时子类实例共享父类引用属性的问题。
4. `ES6 Class` 继承：使用 `class` 和 `extends` 关键字，这是最现代和直观的继承方式。



# 如何使用for...of遍历对象

1. **类数组对象**

如果需要遍历的对象是类数组对象，用 `Array.from` 转成数组对象即可。

```js
var obj = {
    0: 'one',
    1: 'two',
    length: 2
};

obj = Array.from(obj);
for (let key of obj) {
    console.log(key);
}
```



2. **非类数组对象**

如果不是类数组对象，就给对象添加一个 `[Symbol.iterator]` 属性，并指向一个迭代器即可。

```js
var obj = {
    a: 1, 
    b: 2, 
    c: 3
};
obj[Symbol.iterator] = function*() {
    var keys = Object.keys(obj);
    for (var k of keys) {
        yield [k, obj[k]]
    }
}

for (var [k, v] of obj) {
    console.log(k, v);
}
```



# JSON 深拷贝的缺点

## 1. 无法处理函数和循环引用

### 1.1 无法处理函数

- **问题**：`JSON.stringify` 和 `JSON.parse` 会**忽略对象中的函数**。

```js
const obj = {
    name: 'Alice',
    sayHello: function() {
        console.log('Hello');
    }
};

const deepCopy = JSON.parse(JSON.stringify(obj));
console.log(deepCopy.sayHello); // undefined
```



### 1.2 无法处理循环引用

-  **问题**：如果对象中有循环引用，`JSON.stringify` 会抛出错误。

```js
const obj = {};
obj.self = obj;

try {
    const copy = JSON.parse(JSON.stringify(obj));
} catch(err) {
    console.log(err);
}
```



## 2. 无法处理特殊对象类型

### 2.1 无法处理 Date 对象

- **问题**：`Date` 对象会被转换为字符串。

```js
const obj = {
    date: new Date();
}

const copy = JSON.parse(JSON.stringify(obj));
console.log(copy.date instanceof Date); // false
```



### 2.2 无法处理 RegExp 对象

- **问题**：`RegExp` 对象会被转换为字符串。

```js
const obj = {
    regex: /abc/g
};

const copy = JSON.parse(JSON.stringify(obj));
console.log(copy.regex instanceof RegExp); // false
```



### 2.3 无法处理 Map 和 Set 对象

- **问题**：`Map` 和 `Set` 对象会被转换为普通对象或数组。

```js
const obj = {
    map: new Map([['key', 'value']]),
    set: new Set([1, 2, 3])
};

const copy = JSON.parse(JSON.stringify(obj));
console.log(copy.map instanceof Map); // false
console.log(copy.set instanceof Set); // false
```



## 3. 性能问题

### 3.1 序列化和反序列化的开销

- **问题**：`JSON.stringify` 和 `JSON.parse` 需要进行字符串的序列化和反序列化，这在处理大型对象时可能会导致性能问题。

```js
const largeObj = { /* 很大的对象 */ };
const startTime = performance.now();
const copy = JSON.parse(JSON.stringify(largeObj));
const endTime = performance.now();
console.log(`Time taken: ${endTime - startTime} ms`);
```



## 4. 丢失原型链

### 4.1 无法保留原型链

- **问题**：`JSON.stringify` 和 `JSON.parse` 会创建新的对象，这些对象不会继承原始对象的原型链。

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const person = new Person('Alice');
const copy = JSON.parse(JSON.stringify(person));
copy.greet(); // TypeError: copy.greet is not a function
```



## 5. 无法处理 Symbol 类型

- **问题**：`Symbol` 类型的键会被忽略。

```js
const obj = {
    [Symbol('key')]: 'value'
};

const copy = JSON.parse(JSON.stringify(obj));
console.log(copy); // {}
```



## 6. 无法处理不可枚举属性

### 6.1 无法处理不可枚举属性

- **问题**：不可枚举属性不会被复制。

```js
const obj = {};
Object.defineProperty(obj, 'hidden', {
    value: 'value',
    enumerable: false
});

const copy = JSON.parse(JSON.stringify(obj));
console.log(copy.hidden); // undefined
```



# 浏览器的深储存和浅储存

在浏览器中，"深储存"和"浅储存"通常指的是将数据保存到浏览器的存储机制中，这些机制包括 `localStorage`、`sessionStorage` 和 `IndexedDB`。这些存储机制可以用来保存不同类型的数据，以便在用户会话之间或跨页面访问时使用。

### 1. 浅储存

**浅储存**通常指的是将简单的、扁平化的数据（如字符串、数字、布尔值等）直接存储到浏览器的存储机制中。这些数据通常是不可变的，或者不需要复杂的结构。

#### 1.1 `localStorage`

`localStorage` 是一个持久化的存储机制，数据在浏览器关闭后仍然保留。

```js
// 存储数据
localStorage.setItem('username', 'Alice');

// 获取数据
const username = localStorage.getItem('username');
console.log(username); // Alice

// 删除数据
localStorage.removeItem('username');

// 清空所有数据
localStorage.clear();
```

#### 1.2 `sessionStorage`

`sessionStorage` 是一个会话级别的存储机制，数据在浏览器标签页关闭后会被清除。

```js
// 存储数据
sessionStorage.setItem('username', 'Alice');

// 获取数据
const username = sessionStorage.getItem('username');
console.log(username); // Alice

// 删除数据
sessionStorage.removeItem('username');

// 清空所有数据
sessionStorage.clear();
```

### 2. 深储存

**深储存**通常指的是将复杂的数据结构（如对象、数组等）存储到浏览器的存储机制中。这些数据需要进行序列化和反序列化，以便在存储和读取时保持其结构和内容。

#### 2.1 `localStorage` 和 `sessionStorage` 的深储存

由于 `localStorage` 和 `sessionStorage` 只能存储字符串，因此需要使用 `JSON.stringify` 和 `JSON.parse` 进行序列化和反序列化。

```js
// 存储复杂数据
const user = { name: 'Alice', age: 25 };
localStorage.setItem('user', JSON.stringify(user));

// 获取复杂数据
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser); // { name: 'Alice', age: 25 }

// 删除数据
localStorage.removeItem('user');

// 清空所有数据
localStorage.clear();
```

#### 2.2 `IndexedDB`

`IndexedDB` 是一个更强大的客户端存储机制，支持存储结构化数据和索引。它可以用于存储大量的数据，并且提供了事务处理机制。

##### 创建数据库和对象存储

```js
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('age', 'age', { unique: false });
};

request.onsuccess = function(event) {
  const db = event.target.result;
  // 使用数据库
};

request.onerror = function(event) {
  console.error('Error opening database:', event.target.error);
};
```

##### 存储数据

```js
function addUser(db, user) {
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');
  const request = store.add(user);

  request.onsuccess = function(event) {
    console.log('User added successfully');
  };

  request.onerror = function(event) {
    console.error('Error adding user:', event.target.error);
  };
}

const user = { id: 1, name: 'Alice', age: 25 };
addUser(db, user);
```

##### 获取数据

```js
function getUser(db, id) {
  const transaction = db.transaction(['users'], 'readonly');
  const store = transaction.objectStore('users');
  const request = store.get(id);

  request.onsuccess = function(event) {
    const user = event.target.result;
    console.log(user);
  };

  request.onerror = function(event) {
    console.error('Error getting user:', event.target.error);
  };
}

getUser(db, 1);
```

### 总结

- **浅储存**：适用于存储简单的、扁平化的数据，如字符串、数字、布尔值等。使用 `localStorage` 和 `sessionStorage`。
- **深储存**：适用于存储复杂的、结构化的数据，如对象、数组等。使用 `JSON.stringify` 和 `JSON.parse` 进行序列化和反序列化，或者使用 `IndexedDB` 进行更复杂的存储和查询。



# 浏览器是如何缓存 url 的

浏览器缓存 `URL` 的机制是为了提高网页加载速度和减少网络流量。浏览器通过多种方式缓存资源，包括 `HTTP` 缓存、浏览器缓存、和服务工作者（`Service Workers`）。以下是对这些缓存机制的详细解释：

### 1. HTTP 缓存

`HTTP` 缓存是最常用的缓存机制，它通过 `HTTP` 头部信息来控制缓存行为。主要涉及以下几个头部字段：

#### 1.1 `Cache-Control`

`Cache-Control` 头部用于控制资源的缓存策略。常见的指令包括：

- `max-age=<seconds>`：指定资源在缓存中的最大有效时间（以秒为单位）。
- `no-cache`：强制在每次请求时都向服务器验证资源的有效性。
- `no-store`：禁止缓存资源。
- `must-revalidate`：要求在缓存过期后必须重新验证资源的有效性。

示例：

```http
Cache-Control: max-age=3600, must-revalidate
```

#### 1.2 `Expires`

`Expires` 头部指定资源的过期时间，是一个绝对时间戳。如果同时设置了 `Cache-Control` 和 `Expires`，优先使用 `Cache-Control`。

示例：

```http
Expires: Wed, 21 Oct 2021 07:28:00 GMT
```

#### 1.3 `ETag` 和 `If-None-Match`

`ETag` 是一个唯一标识符，用于验证资源是否已更改。`If-None-Match` 头部在请求中包含 `ETag`，服务器根据 `ETag` 判断资源是否已更改。

示例：

```http
ETag: "1234567890abcdef"
If-None-Match: "1234567890abcdef"
```

#### 1.4 `Last-Modified` 和 `If-Modified-Since`

`Last-Modified` 头部指定资源的最后修改时间。`If-Modified-Since` 头部在请求中包含这个时间，服务器根据这个时间判断资源是否已更改。

示例：

```http
Last-Modified: Wed, 21 Oct 2021 07:28:00 GMT
If-Modified-Since: Wed, 21 Oct 2021 07:28:00 GMT
```

### 2. 浏览器缓存

浏览器缓存是浏览器内部的缓存机制，用于**存储静态资源**，如图片、`CSS` 文件和 `JavaScript` 文件。浏览器缓存通常分为两种类型：

#### 2.1 内存缓存

内存缓存（也称为内存缓存或临时缓存）存储在浏览器的内存中，用于存储当前会话期间频繁访问的资源。这些资源在浏览器关闭后会被清除。

#### 2.2 磁盘缓存

磁盘缓存存储在用户的硬盘上，用于存储长时间内可能需要的资源。这些资源在浏览器关闭后仍然保留，直到缓存过期或被清理。

### 3. 服务工作者（Service Workers）

服务工作者是一种客户端脚本，可以拦截和处理网络请求，实现离线访问和自定义缓存策略。

#### 3.1 注册服务工作者

在主页面中注册服务工作者：

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
```

#### 3.2 缓存策略

在服务工作者脚本中定义缓存策略：

```js
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsTo_cache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

### 总结

浏览器通过多种机制缓存 `URL` 和相关资源，包括 `HTTP` 缓存、浏览器缓存和服务工作者。这些机制共同作用，提高了网页的加载速度和用户体验。选择合适的缓存策略可以显著提升应用的性能和可靠性。



# js如何用var实现const

> [!TIP]
>
> **使用`var`实现`const`的实现思路**：通过创建一个不可修改的对象或函数，确保其值在整个代码执行过程中保持不变。**使用Object.freeze()防止对象被修改、使用闭包创建不可变的变量**。以下是具体的实现方法。
>
> 要使用`var`来实现类似于`const`的行为，我们需要确保变量的值在被初始化后不会被修改或重新赋值。尽管`var`本身没有这种约束，但我们可以通过一些编程技巧来模拟这种行为。以下是详细的实现方法。

## 1. 使用 Object.freeze() 防止对象被修改

`Object.freeze()`方法可以冻结一个对象，使其不能被修改。通过冻结一个对象，我们可以确保对象的属性不会被重新赋值。

```js
var MY_CONST_OBJECT = Object.freeze({
    key1: 'value1',
    key2: 'value2'
});

// 尝试修改对象的属性（将失败）

MY_CONST_OBJECT.key1 = "newValue"; // 不会生效
console.log(MY_CONST_OBJECT.key1); // 输出 "value1"
```

通过这种方式，我们可以创建一个不可修改的对象，从而模拟`const`的行为。



## 2. 使用闭包创建不可变的变量

闭包是一种在函数内部创建局部作用域并返回内部函数的方法。通过这种方式，我们可以创建一个不可变的变量。

```js
function createConstant(value) {
    return function() {
        return value;
    }
}

var MY_CONSTANT = createConstant(42);

console.log(MY_CONSTANT()); // 输出 42

// 尝试修改常量（将失败）
MY_CONSTANT = createConstant(100); // 不会生效
console.log(MY_CONSTANT()); // 仍然输出 42
```



在这个例子中，`createConstant`函数返回一个闭包，该闭包持有原始值并确保其不可变。



## 3. 使用立即执行函数表达式（IIFE）

立即调用函数表达式（`IIFE`）可以用来创建一个局部作用域，从而保护变量不被外部修改。

```js
var MY_CONSTANT;

(function() {
    const value = 42;
    MY_CONSTANT = function() {
        return value;
    };
})();

console.log(MY_CONSTANT()); // 输出 42

// 尝试修改常量（将失败）
MY_CONSTANT = function() {
    return 100;
}; // 不会生效
console.log(MY_CONSTANT()); // 仍然输出 42
```



## 4. 使用代理（Proxy）对象

代理（`Proxy`）对象可以拦截和定义基本操作（如属性读取、赋值等），从而可以用来保护对象的属性不被修改。

```js
var MY_CONSTANT_OBJECT = new Proxy({
    key1: 'value1',
    key2: 'value2'
}, {
    set: function(target, key, value) {
        console.warn("Attempt to modify constant object");
        return true; // 需要返回true以避免抛出错误
    }
});

// 尝试修改对象的属性（将失败并产生警告）
MY_CONSTANT_OBJECT.key1 = "newValue"; // 警告: Attempt to modify constant object

console.log(MY_CONSTANT_OBJECT.key1); // 输出 "value1"
```



## 5. 总结

通过使用`Object.freeze()`、闭包、立即调用函数表达式（`IIFE`）和代理（`Proxy`）对象，我们可以在JavaScript中模拟`const`的行为，即使使用的是`var`关键字。这些方法分别适用于不同的场景，可以根据具体需求选择合适的方法。**关键在于确保变量一旦被初始化后，其值不会被修改或重新赋值**。这样就能在不使用`const`关键字的情况下，达到相同的效果。



# 事件传播的冒泡与捕获，哪个先执行

在 `Web` 开发中，事件传播的冒泡与捕获是两个重要的概念，它们描述了事件在 `DOM` 树中传递的两种不同方式。根据 `W3C` 标准，事件传播的顺序是**先捕获后冒泡**。具体来说，事件传播分为三个阶段：

1. **捕获阶段（Capturing Phase）**：
   - 事件从最顶层的节点（通常是 `window` 或 `document`）开始，逐级向下传递，直到到达目标元素。在这个阶段，如果在某个节点上绑定了捕获阶段的事件处理器，那么该处理器会被执行。
2. **目标阶段（Target Phase）**：
   - 事件到达目标元素。在这个阶段，目标元素上的事件处理器会被执行。
3. **冒泡阶段（Bubbling Phase）**：
   - 事件从目标元素开始，逐级向上传递，直到到达最顶层的节点。在这个阶段，如果在某个节点上绑定了冒泡阶段的事件处理器，那么该处理器会被执行。

### 事件传播的顺序

根据W3C标准，事件传播的顺序如下：

1. **捕获阶段**：从最顶层的节点开始，逐级向下传递，直到到达目标元素。
2. **目标阶段**：在目标元素上执行事件处理器。
3. **冒泡阶段**：从目标元素开始，逐级向上传递，直到到达最顶层的节点。

### 示例

假设有一个DOM结构如下：

html深色版本

```js
<div id="outer">
  <div id="inner">
    <button id="button">Click me</button>
  </div>
</div>
```

我们在各个元素上分别绑定捕获和冒泡阶段的事件处理器：

javascript深色版本

```js
document.getElementById('outer').addEventListener('click', function(event) {
  console.log('Outer captured');
}, true); // true 表示捕获阶段

document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner captured');
}, true); // true 表示捕获阶段

document.getElementById('button').addEventListener('click', function(event) {
  console.log('Button target');
}); // 默认是冒泡阶段

document.getElementById('button').addEventListener('click', function(event) {
  console.log('Button bubbled');
}, false); // false 表示冒泡阶段

document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner bubbled');
}, false); // false 表示冒泡阶段

document.getElementById('outer').addEventListener('click', function(event) {
  console.log('Outer bubbled');
}, false); // false 表示冒泡阶段
```

当点击按钮时，事件传播的顺序如下：

1. **捕获阶段**：
   - `document` -> `outer` -> `inner` -> `button`
   - 输出：`Outer captured` -> `Inner captured`
2. **目标阶段**：
   - `button`
   - 输出：`Button target`
3. **冒泡阶段**：
   - `button` -> `inner` -> `outer` -> `document`
   - 输出：`Button bubbled` -> `Inner bubbled` -> `Outer bubbled`

### 总结

- **捕获阶段**：事件从最顶层的节点开始，逐级向下传递，直到到达目标元素。
- **目标阶段**：事件在目标元素上执行。
- **冒泡阶段**：事件从目标元素开始，逐级向上传递，直到到达最顶层的节点。
