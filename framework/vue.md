# 1. Vue3 简介

- 2020 年 9 月 18 日，`Vue.js`发布版 `3.0`版本，代号：`One Piece`（n
- 经历了：[4800+次提交](https://github.com/vuejs/core/commits/main)、[40+个 RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次 PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[300+贡献者](https://github.com/vuejs/core/graphs/contributors)
- 官方发版地址：[Release v3.0.0 One Piece · vuejs/core](https://github.com/vuejs/core/releases/tag/v3.0.0)
- 截止 2023 年 10 月，最新的公开版本为：`3.3.4`

  <img src="/public/vue_images/1695089947298-161c1b47-eb86-42fb-b1f8-d6a4fcab8ee2.png" alt="image.png" style="zoom:30%;" />

## 1.1. 【性能的提升】

- 打包大小减少 `41%`。
- 初次渲染快 `55%`, 更新渲染快 `133%`。
- 内存减少 `54%`。

## 1.2.【 源码的升级】

- 使用 `Proxy`代替 `defineProperty`实现响应式。
- 重写虚拟 `DOM`的实现和 `Tree-Shaking`。

## 1.3. 【拥抱 TypeScript】

- `Vue3`可以更好的支持 `TypeScript`。

## 1.4. 【新的特性】

1. `Composition API`（组合 `API`）：

   - `setup`
   - `ref`与 `reactive`
   - `computed`与 `watch`

     ......

2. 新的内置组件：

   - `Fragment`
   - `Teleport`
   - `Suspense`

     ......

3. 其他改变：

   - 新的生命周期钩子
   - `data` 选项应始终被声明为一个函数
   - 移除 `keyCode`支持作为 `v-on` 的修饰符

     ......

# 2. 创建 Vue3 工程

## 2.1. 【基于 vue-cli 创建】

点击查看[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

> 备注：目前 `vue-cli`已处于维护模式，官方推荐基于 `Vite` 创建项目。

```powershell
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version

## 安装或者升级你的@vue/cli
npm install -g @vue/cli

## 执行创建命令
vue create vue_test

##  随后选择3.x
##  Choose a version of Vue.js that you want to start the project with (Use arrow keys)
##  > 3.x
##    2.x

## 启动
cd vue_test
npm run serve
```

---

## 2.2. 【基于 vite 创建】(推荐)

`vite` 是新一代前端构建工具，官网地址：[https://vitejs.cn](https://vitejs.cn/)，`vite`的优势如下：

- 轻量快速的热重载（`HMR`），能实现极速的服务启动。
- 对 `TypeScript`、`JSX`、`CSS` 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。
- `webpack`构建 与 `vite`构建对比图如下：
  `<img src="/public/vue_images/1683167182037-71c78210-8217-4e7d-9a83-e463035efbbe.png" alt="webpack构建" title="webpack构建" style="zoom:20%;box-shadow:0 0 10px black" />` `<img src="/public/vue_images/1683167204081-582dc237-72bc-499e-9589-2cdfd452e62f.png" alt="vite构建" title="vite构建" style="zoom: 20%;box-shadow:0 0 10px black" />`

- 具体操作如下（点击查看[官方文档](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)）

```powershell
## 1.创建命令
npm create vue@latest

## 2.具体配置
## 配置项目名称
√ Project name: vue3_test
## 是否添加TypeScript支持
√ Add TypeScript?  Yes
## 是否添加JSX支持
√ Add JSX Support?  No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development?  No
## 是否添加pinia环境
√ Add Pinia for state management?  No
## 是否添加单元测试
√ Add Vitest for Unit Testing?  No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? » No
## 是否添加ESLint语法检查
√ Add ESLint for code quality?  Yes
## 是否添加Prettiert代码格式化
√ Add Prettier for code formatting?  No
```

自己动手编写一个 App 组件

```vue
<template>
  <div class="app">
    <h1>你好啊！</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "App", //组件名
};
</script>

<style>
.app {
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
```

安装官方推荐的 `vscode`插件：

<img src="/public/vue_images/volar.png" alt="Snipaste_2023-10-08_20-46-34" style="zoom:50%;" />

<img src="/public/vue_images/image-20231218085906380.png" alt="image-20231218085906380" style="zoom:42%;" />

总结：

- `Vite` 项目中，`index.html` 是项目的入口文件，在项目最外层。
- 加载 `index.html`后，`Vite` 解析 `<script type="module" src="xxx">` 指向的 `JavaScript`。
- `Vue3`**中是通过**`createApp` 函数创建一个应用实例。

## 2.3. 【一个简单的效果】

`Vue3`向下兼容 `Vue2`语法，且 `Vue3`中的模板中可以没有根标签

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
    return {
      name: "张三",
      age: 18,
      tel: "13888888888",
    };
  },
  methods: {
    changeName() {
      this.name = "zhang-san";
    },
    changeAge() {
      this.age += 1;
    },
    showTel() {
      alert(this.tel);
    },
  },
};
</script>
```

# 3. Vue3 核心语法

## 3.1. 【OptionsAPI 与 CompositionAPI】

- `Vue2`的 `API`设计是 `Options`（配置）风格的。
- `Vue3`的 `API`设计是 `Composition`（组合）风格的。

### Options API 的弊端

`Options`类型的 `API`，数据、方法、计算属性等，是分散在：`data`、`methods`、`computed`中的，若想新增或者修改一个需求，就需要分别修改：`data`、`methods`、`computed`，不便于维护和复用。

<img src="/public/vue_images/1696662197101-55d2b251-f6e5-47f4-b3f1-d8531bbf9279.gif" alt="1.gif" style="zoom:70%;border-radius:20px" /><img src="/public/vue_images/1696662200734-1bad8249-d7a2-423e-a3c3-ab4c110628be.gif" alt="2.gif" style="zoom:70%;border-radius:20px" />

### Composition API 的优势

可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。

<img src="/public/vue_images/1696662249851-db6403a1-acb5-481a-88e0-e1e34d2ef53a.gif" alt="3.gif" style="height:300px;border-radius:10px"  /><img src="/public/vue_images/1696662256560-7239b9f9-a770-43c1-9386-6cc12ef1e9c0.gif" alt="4.gif" style="height:300px;border-radius:10px"  />

> 说明：以上四张动图原创作者：大帅老猿

## 3.2. 【拉开序幕的 setup】

### setup 概述

`setup`是 `Vue3`中一个新的配置项，值是一个函数，它是 `Composition API` **“表演的舞台**_**”**_，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在 `setup`中。

特点如下：

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问 `this`是 `undefined`。
- `setup`函数会在 `beforeCreate`之前调用，它是“领先”所有钩子执行的。

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  setup() {
    // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
    let name = "张三";
    let age = 18;
    let tel = "13888888888";

    // 方法，原来写在methods中
    function changeName() {
      name = "zhang-san"; //注意：此时这么修改name页面是不变化的
      console.log(name);
    }
    function changeAge() {
      age += 1; //注意：此时这么修改age页面是不变化的
      console.log(age);
    }
    function showTel() {
      alert(tel);
    }

    // 返回一个对象，对象中的内容，模板中可以直接使用
    return { name, age, tel, changeName, changeAge, showTel };
  },
};
</script>
```

### setup 的返回值

- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用**（重点关注）。**
- 若返回一个**函数**：则可以自定义渲染内容，代码如下：

```jsx
setup(){
  return ()=> '你好啊！'
}
```

### setup 与 Options API 的关系

- `Vue2` 的配置（`data`、`methos`......）中**可以访问到** `setup`中的属性、方法。
- 但在 `setup`中**不能访问到** `Vue2`的配置（`data`、`methos`......）。
- 如果与 `Vue2`冲突，则 `setup`优先。

### setup 语法糖

`setup`函数有一个语法糖，这个语法糖，可以让我们把 `setup`独立出去，代码如下：

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changName">修改名字</button>
    <button @click="changAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
};
</script>

<!-- 下面的写法是setup语法糖 -->
<script setup lang="ts">
console.log(this); //undefined

// 数据（注意：此时的name、age、tel都不是响应式数据）
let name = "张三";
let age = 18;
let tel = "13888888888";

// 方法
function changName() {
  name = "李四"; //注意：此时这么修改name页面是不变化的
}
function changAge() {
  console.log(age);
  age += 1; //注意：此时这么修改age页面是不变化的
}
function showTel() {
  alert(tel);
}
</script>
```

扩展：上述代码，还需要编写一个不写 `setup`的 `script`标签，去指定组件名字，比较麻烦，我们可以借助 `vite`中的插件简化

1. 第一步：`npm i vite-plugin-vue-setup-extend -D`
2. 第二步：`vite.config.ts`

```jsx
import { defineConfig } from "vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

export default defineConfig({
  plugins: [VueSetupExtend()],
});
```

3. 第三步：`<script setup lang="ts" name="Person">`

## 3.3. 【ref 创建：基本类型的响应式数据】

- **作用：**定义响应式变量。
- **语法：**`let xxx = ref(初始值)`。
- **返回值：**一个 `RefImpl`的实例对象，简称 `ref对象`或 `ref`，`ref`对象的 `value`**属性是响应式的**。
- **注意点：**
  - `JS`中操作数据需要：`xxx.value`，但模板中不需要 `.value`，直接使用即可。
  - 对于 `let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref } from "vue";
// name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
let name = ref("张三");
let age = ref(18);
// tel就是一个普通的字符串，不是响应式的
let tel = "13888888888";

function changeName() {
  // JS中操作ref对象时候需要.value
  name.value = "李四";
  console.log(name.value);

  // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
  // name = ref('zhang-san')
}
function changeAge() {
  // JS中操作ref对象时候需要.value
  age.value += 1;
  console.log(age.value);
}
function showTel() {
  alert(tel);
}
</script>
```

### 为什么 Vue 3 的 `ref` 需要通过 `.value` 访问属性值？

Vue 3 的 `ref` 需要通过 `.value` 访问属性值，**本质原因是 JavaScript 的原始值类型（Primitive Types）无法直接实现响应式追踪**。

## 3.4. 【reactive 创建：对象类型的响应式数据】

- **作用：**定义一个**响应式对象**（基本类型不要用它，要用 `ref`，否则报错）
- **语法：**`let 响应式对象= reactive(源对象)`。
- **返回值：**一个 `Proxy`的实例对象，简称：响应式对象。
- **注意点：**`reactive`定义的响应式数据是“深层次”的。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{ obj.a.b.c.d }}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive } from "vue";

// 数据
let car = reactive({ brand: "奔驰", price: 100 });
let games = reactive([
  { id: "ahsgdyfa01", name: "英雄联盟" },
  { id: "ahsgdyfa02", name: "王者荣耀" },
  { id: "ahsgdyfa03", name: "原神" },
]);
let obj = reactive({
  a: {
    b: {
      c: {
        d: 666,
      },
    },
  },
});

function changeCarPrice() {
  car.price += 10;
}
function changeFirstGame() {
  games[0].name = "流星蝴蝶剑";
}
function test() {
  obj.a.b.c.d = 999;
}
</script>
```

## 3.5. 【ref 创建：对象类型的响应式数据】

- 其实 `ref`接收的数据可以是：**基本类型**、**对象类型**。
- 若 `ref`接收的是对象类型，内部其实也是调用了 `reactive`函数。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{ obj.a.b.c.d }}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from "vue";

// 数据
let car = ref({ brand: "奔驰", price: 100 });
let games = ref([
  { id: "ahsgdyfa01", name: "英雄联盟" },
  { id: "ahsgdyfa02", name: "王者荣耀" },
  { id: "ahsgdyfa03", name: "原神" },
]);
let obj = ref({
  a: {
    b: {
      c: {
        d: 666,
      },
    },
  },
});

console.log(car);

function changeCarPrice() {
  car.value.price += 10;
}
function changeFirstGame() {
  games.value[0].name = "流星蝴蝶剑";
}
function test() {
  obj.value.a.b.c.d = 999;
}
</script>
```

## 3.6. 【ref 对比 reactive】

宏观角度看：

> 1. `ref`用来定义：**基本类型数据**、**对象类型数据**；
> 2. `reactive`用来定义：**对象类型数据**。

- 区别：

> 1. `ref`创建的变量必须使用 `.value`（可以使用 `volar`插件自动添加 `.value`）。
>
>    <img src="/public/vue_images/自动补充value.png" alt="自动补充value" style="zoom:50%;border-radius:20px" />
>
> 2. `reactive`重新分配一个新对象，会**失去**响应式（可以使用 `Object.assign`去整体替换）。

- 使用原则：

> 1. 若需要一个基本类型的响应式数据，必须使用 `ref`。
> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> 3. 若需要一个响应式对象，且层级较深，推荐使用 `reactive`。

## 3.7. 【toRefs 与 toRef】

- 作用：将一个响应式对象中的每一个属性，转换为 `ref`对象。
- 备注：`toRefs`与 `toRef`功能一致，但 `toRefs`可以批量转换。
- 语法如下：

```vue
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>性别：{{ person.gender }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeGender">修改性别</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref, reactive, toRefs, toRef } from "vue";

// 数据
let person = reactive({ name: "张三", age: 18, gender: "男" });

// 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
let { name, gender } = toRefs(person);

// 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力
let age = toRef(person, "age");

// 方法
function changeName() {
  name.value += "~";
}
function changeAge() {
  age.value += 1;
}
function changeGender() {
  gender.value = "女";
}
</script>
```

## 3.8. 【computed】

作用：根据已有数据计算出新数据（和 `Vue2`中的 `computed`作用一致）。

<img src="/public/vue_images/computed.gif" style="zoom:20%;" />

```vue
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName" /> <br />
    名：<input type="text" v-model="lastName" /> <br />
    全名：<span>{{ fullName }}</span> <br />
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>

<script setup lang="ts" name="App">
import { ref, computed } from "vue";

let firstName = ref("zhang");
let lastName = ref("san");

// 计算属性——只读取，不修改
/* let fullName = computed(()=>{
    return firstName.value + '-' + lastName.value
  }) */

// 计算属性——既读取又修改
let fullName = computed({
  // 读取
  get() {
    return firstName.value + "-" + lastName.value;
  },
  // 修改
  set(val) {
    console.log("有人修改了fullName", val);
    firstName.value = val.split("-")[0];
    lastName.value = val.split("-")[1];
  },
});

function changeFullName() {
  fullName.value = "li-si";
}
</script>
```

## 3.9.【watch】

- 作用：监视数据的变化（和 `Vue2`中的 `watch`作用一致）
- 特点：`Vue3`中的 `watch`只能监视以下**四种数据**：

> 1. `ref`定义的数据。
> 2. `reactive`定义的数据。
> 3. 函数返回一个值（`getter`函数）。
> 4. 一个包含上述内容的数组。

我们在 `Vue3`中使用 `watch`的时候，通常会遇到以下几种情况：

### \* 情况一

监视 `ref`定义的【基本类型】数据：直接写数据名即可，监视的是其 `value`值的改变。

```vue
<template>
  <div class="person">
    <h1>情况一：监视【ref】定义的【基本类型】数据</h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref, watch } from "vue";
// 数据
let sum = ref(0);
// 方法
function changeSum() {
  sum.value += 1;
}
// 监视，情况一：监视【ref】定义的【基本类型】数据
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log("sum变化了", newValue, oldValue);
  if (newValue >= 10) {
    stopWatch();
  }
});
</script>
```

### \* 情况二

监视 `ref`定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。

> 注意：
>
> - 若修改的是 `ref`定义的对象中的属性，`newValue` 和 `oldValue` 都是新值，因为它们是同一个对象。
> - 若修改整个 `ref`定义的对象，`newValue` 是新值， `oldValue` 是旧值，因为不是同一个对象了。

```vue
<template>
  <div class="person">
    <h1>情况二：监视【ref】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref, watch } from "vue";
// 数据
let person = ref({
  name: "张三",
  age: 18,
});
// 方法
function changeName() {
  person.value.name += "~";
}
function changeAge() {
  person.value.age += 1;
}
function changePerson() {
  person.value = { name: "李四", age: 90 };
}
/* 
    监视，情况一：监视【ref】定义的【对象类型】数据，监视的是对象的地址值，若想监视对象内部属性的变化，需要手动开启深度监视
    watch的第一个参数是：被监视的数据
    watch的第二个参数是：监视的回调
    watch的第三个参数是：配置对象（deep、immediate等等.....） 
  */
watch(
  person,
  (newValue, oldValue) => {
    console.log("person变化了", newValue, oldValue);
  },
  { deep: true }
);
</script>
```

### \* 情况三

监视 `reactive`定义的【对象类型】数据，且默认开启了深度监视。

```vue
<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr />
    <h2>测试：{{ obj.a.b.c }}</h2>
    <button @click="test">修改obj.a.b.c</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive, watch } from "vue";
// 数据
let person = reactive({
  name: "张三",
  age: 18,
});
let obj = reactive({
  a: {
    b: {
      c: 666,
    },
  },
});
// 方法
function changeName() {
  person.name += "~";
}
function changeAge() {
  person.age += 1;
}
function changePerson() {
  Object.assign(person, { name: "李四", age: 80 });
}
function test() {
  obj.a.b.c = 888;
}

// 监视，情况三：监视【reactive】定义的【对象类型】数据，且默认是开启深度监视的
watch(person, (newValue, oldValue) => {
  console.log("person变化了", newValue, oldValue);
});
watch(obj, (newValue, oldValue) => {
  console.log("Obj变化了", newValue, oldValue);
});
</script>
```

### \* 情况四

监视 `ref`或 `reactive`定义的【对象类型】数据中的**某个属性**，注意点如下：

1. 若该属性值**不是**【对象类型】，需要写成函数形式。
2. 若该属性值是**依然**是【对象类型】，可直接编，也可写成函数，建议写成函数。

结论：监视的要是对象里的属性，那么最好写函数式，注意点：若是对象监视的是地址值，需要关注对象内部，需要手动开启深度监视。

```vue
<template>
  <div class="person">
    <h1>情况四：监视【ref】或【reactive】定义的【对象类型】数据中的某个属性</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive, watch } from "vue";

// 数据
let person = reactive({
  name: "张三",
  age: 18,
  car: {
    c1: "奔驰",
    c2: "宝马",
  },
});
// 方法
function changeName() {
  person.name += "~";
}
function changeAge() {
  person.age += 1;
}
function changeC1() {
  person.car.c1 = "奥迪";
}
function changeC2() {
  person.car.c2 = "大众";
}
function changeCar() {
  person.car = { c1: "雅迪", c2: "爱玛" };
}

// 监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
/* watch(()=> person.name,(newValue,oldValue)=>{
    console.log('person.name变化了',newValue,oldValue)
  }) */

// 监视，情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写函数，更推荐写函数
watch(
  () => person.car,
  (newValue, oldValue) => {
    console.log("person.car变化了", newValue, oldValue);
  },
  { deep: true }
);
</script>
```

### \* 情况五

监视上述的多个数据

```vue
<template>
  <div class="person">
    <h1>情况五：监视上述的多个数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive, watch } from "vue";

// 数据
let person = reactive({
  name: "张三",
  age: 18,
  car: {
    c1: "奔驰",
    c2: "宝马",
  },
});
// 方法
function changeName() {
  person.name += "~";
}
function changeAge() {
  person.age += 1;
}
function changeC1() {
  person.car.c1 = "奥迪";
}
function changeC2() {
  person.car.c2 = "大众";
}
function changeCar() {
  person.car = { c1: "雅迪", c2: "爱玛" };
}

// 监视，情况五：监视上述的多个数据
watch(
  [() => person.name, person.car],
  (newValue, oldValue) => {
    console.log("person.car变化了", newValue, oldValue);
  },
  { deep: true }
);
</script>
```

## 3.10. 【watchEffect】

- 官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。
- `watch`对比 `watchEffect`

  > 1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
  > 2. `watch`：要明确指出监视的数据
  > 3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。

- 示例代码：

  ```vue
  <template>
    <div class="person">
      <h1>需求：水温达到50℃，或水位达到20cm，则联系服务器</h1>
      <h2 id="demo">水温：{{ temp }}</h2>
      <h2>水位：{{ height }}</h2>
      <button @click="changePrice">水温+1</button>
      <button @click="changeSum">水位+10</button>
    </div>
  </template>

  <script lang="ts" setup name="Person">
  import { ref, watch, watchEffect } from "vue";
  // 数据
  let temp = ref(0);
  let height = ref(0);

  // 方法
  function changePrice() {
    temp.value += 10;
  }
  function changeSum() {
    height.value += 1;
  }

  // 用watch实现，需要明确的指出要监视：temp、height
  watch([temp, height], (value) => {
    // 从value中获取最新的temp值、height值
    const [newTemp, newHeight] = value;
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if (newTemp >= 50 || newHeight >= 20) {
      console.log("联系服务器");
    }
  });

  // 用watchEffect实现，不用
  const stopWtach = watchEffect(() => {
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if (temp.value >= 50 || height.value >= 20) {
      console.log(document.getElementById("demo")?.innerText);
      console.log("联系服务器");
    }
    // 水温达到100，或水位达到50，取消监视
    if (temp.value === 100 || height.value === 50) {
      console.log("清理了");
      stopWtach();
    }
  });
  </script>
  ```

## 3.11. 【标签的 ref 属性】

作用：用于注册模板引用。

> - 用在普通 `DOM`标签上，获取的是 `DOM`节点。
> - 用在组件标签上，获取的是组件实例对象。

用在普通 `DOM`标签上：

```vue
<template>
  <div class="person">
    <h1 ref="title1">尚硅谷</h1>
    <h2 ref="title2">前端</h2>
    <h3 ref="title3">Vue</h3>
    <input type="text" ref="inpt" /> <br /><br />
    <button @click="showLog">点我打印内容</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from "vue";

let title1 = ref();
let title2 = ref();
let title3 = ref();

function showLog() {
  // 通过id获取元素
  const t1 = document.getElementById("title1");
  // 打印内容
  console.log((t1 as HTMLElement).innerText);
  console.log((<HTMLElement>t1).innerText);
  console.log(t1?.innerText);

  /************************************/

  // 通过ref获取元素
  console.log(title1.value);
  console.log(title2.value);
  console.log(title3.value);
}
</script>
```

用在组件标签上：

```vue
<!-- 父组件App.vue -->
<template>
  <Person ref="ren" />
  <button @click="test">测试</button>
</template>

<script lang="ts" setup name="App">
import Person from "./components/Person.vue";
import { ref } from "vue";

let ren = ref();

function test() {
  console.log(ren.value.name);
  console.log(ren.value.age);
}
</script>

<!-- 子组件Person.vue中要使用defineExpose暴露内容 -->
<script lang="ts" setup name="Person">
import { ref, defineExpose } from "vue";
// 数据
let name = ref("张三");
let age = ref(18);
/****************************/
/****************************/
// 使用defineExpose将组件中的数据交给外部
defineExpose({ name, age });
</script>
```

## 3.12. 【props】

> ```js
> // 定义一个接口，限制每个Person对象的格式
> export interface PersonInter {
>   id: string;
>   name: string;
>   age: number;
> }
>
> // 定义一个自定义类型Persons
> export type Persons = Array<PersonInter>;
> ```
>
> `App.vue`中代码：
>
> ```vue
> <template>
>   <Person :list="persons" />
> </template>
>
> <script lang="ts" setup name="App">
> import Person from "./components/Person.vue";
> import { reactive } from "vue";
> import { type Persons } from "./types";
>
> let persons = reactive<Persons>([
>   { id: "e98219e12", name: "张三", age: 18 },
>   { id: "e98219e13", name: "李四", age: 19 },
>   { id: "e98219e14", name: "王五", age: 20 },
> ]);
> </script>
> ```
>
> `Person.vue`中代码：
>
> ```Vue
> <template>
> <div class="person">
>  <ul>
>      <li v-for="item in list" :key="item.id">
>         {{item.name}}--{{item.age}}
>       </li>
>     </ul>
>    </div>
>    </template>
>
> <script lang="ts" setup name="Person">
> import {defineProps} from 'vue'
> import {type PersonInter} from '@/types'
>
>   // 第一种写法：仅接收
> // const props = defineProps(['list'])
>
>   // 第二种写法：接收+限制类型
> // defineProps<{list:Persons}>()
>
>   // 第三种写法：接收+限制类型+指定默认值+限制必要性
> let props = withDefaults(defineProps<{list?:Persons}>(),{
>      list:()=>[{id:'asdasg01',name:'小猪佩奇',age:18}]
>   })
>    console.log(props)
>   </script>
> ```

## 3.13. 【生命周期】

- 概念：`Vue`组件实例在创建时要经历一系列的初始化步骤，在此过程中 `Vue`会在合适的时机，调用特定的函数，从而让开发者有机会在特定阶段运行自己的代码，这些特定的函数统称为：生命周期钩子
- 规律：

  > 生命周期整体分为四个阶段，分别是：**创建、挂载、更新、销毁**，每个阶段都有两个钩子，一前一后。

- `Vue2`的生命周期

  > 创建阶段：`beforeCreate`、`created`
  >
  > 挂载阶段：`beforeMount`、`mounted`
  >
  > 更新阶段：`beforeUpdate`、`updated`
  >
  > 销毁阶段：`beforeDestroy`、`destroyed`

- `Vue3`的生命周期

  > 创建阶段：`setup`
  >
  > 挂载阶段：`onBeforeMount`、`onMounted`
  >
  > 更新阶段：`onBeforeUpdate`、`onUpdated`
  >
  > 卸载阶段：`onBeforeUnmount`、`onUnmounted`

- 常用的钩子：`onMounted`(挂载完毕)、`onUpdated`(更新完毕)、`onBeforeUnmount`(卸载之前)
- 示例代码：

  ```vue
  <template>
    <div class="person">
      <h2>当前求和为：{{ sum }}</h2>
      <button @click="changeSum">点我sum+1</button>
    </div>
  </template>

  <!-- vue3写法 -->
  <script lang="ts" setup name="Person">
  import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from "vue";

  // 数据
  let sum = ref(0);
  // 方法
  function changeSum() {
    sum.value += 1;
  }
  console.log("setup");
  // 生命周期钩子
  onBeforeMount(() => {
    console.log("挂载之前");
  });
  onMounted(() => {
    console.log("挂载完毕");
  });
  onBeforeUpdate(() => {
    console.log("更新之前");
  });
  onUpdated(() => {
    console.log("更新完毕");
  });
  onBeforeUnmount(() => {
    console.log("卸载之前");
  });
  onUnmounted(() => {
    console.log("卸载完毕");
  });
  </script>
  ```

## 3.14. 【自定义 hook】

- 什么是 `hook`？—— 本质是一个函数，把 `setup`函数中使用的 `Composition API`进行了封装，类似于 `vue2.x`中的 `mixin`。
- 自定义 `hook`的优势：复用代码, 让 `setup`中的逻辑更清楚易懂。

示例代码：

- `useSum.ts`中内容如下：

  ```js
  import { ref, onMounted } from "vue";

  export default function () {
    let sum = ref(0);

    const increment = () => {
      sum.value += 1;
    };
    const decrement = () => {
      sum.value -= 1;
    };
    onMounted(() => {
      increment();
    });

    //向外部暴露数据
    return { sum, increment, decrement };
  }
  ```

- `useDog.ts`中内容如下：

  ```js
  import {reactive,onMounted} from 'vue'
  import axios,{AxiosError} from 'axios'

  export default function(){
    let dogList = reactive<string[]>([])

    // 方法
    async function getDog(){
      try {
        // 发请求
        let {data} = await axios.get('https://dog.ceo/api/breed/pembroke//public/vue_images/random')
        // 维护数据
        dogList.push(data.message)
      } catch (error) {
        // 处理错误
        const err = <AxiosError>error
        console.log(err.message)
      }
    }

    // 挂载钩子
    onMounted(()=>{
      getDog()
    })

    //向外部暴露数据
    return {dogList,getDog}
  }
  ```

- 组件中具体使用：

  ```vue
  <template>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="increment">点我+1</button>
    <button @click="decrement">点我-1</button>
    <hr />
    <img
      v-for="(u, index) in dogList.urlList"
      :key="index"
      :src="(u as string)"
    />
    <span v-show="dogList.isLoading">加载中......</span><br />
    <button @click="getDog">再来一只狗</button>
  </template>

  <script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "App",
  });
  </script>

  <script setup lang="ts">
  import useSum from "./hooks/useSum";
  import useDog from "./hooks/useDog";

  let { sum, increment, decrement } = useSum();
  let { dogList, getDog } = useDog();
  </script>
  ```

---

# 4. 路由

## 4.1. 【对路由的理解】

<img src="/public/vue_images/image-20231018144351536.png" alt="image-20231018144351536" style="zoom:20%;border-radius:40px" />

## 4.2. 【基本切换效果】

- `Vue3`中要使用 `vue-router`的最新版本，目前是 `4`版本。
- 路由配置文件代码如下：

  ```js
  import { createRouter, createWebHistory } from "vue-router";
  import Home from "@/pages/Home.vue";
  import News from "@/pages/News.vue";
  import About from "@/pages/About.vue";

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/about",
        component: About,
      },
    ],
  });
  export default router;
  ```

- `main.ts`代码如下：

  ```js
  import router from "./router/index";
  app.use(router);

  app.mount("#app");
  ```

- `App.vue`代码如下

  ```vue
  <template>
    <div class="app">
      <h2 class="title">Vue路由测试</h2>
      <!-- 导航区 -->
      <div class="navigate">
        <RouterLink to="/home" active-class="active">首页</RouterLink>
        <RouterLink to="/news" active-class="active">新闻</RouterLink>
        <RouterLink to="/about" active-class="active">关于</RouterLink>
      </div>
      <!-- 展示区 -->
      <div class="main-content">
        <RouterView></RouterView>
      </div>
    </div>
  </template>

  <script lang="ts" setup name="App">
  import { RouterLink, RouterView } from "vue-router";
  </script>
  ```

## 4.3. 【两个注意点】

> 1. 路由组件通常存放在 `pages` 或 `views`文件夹，一般组件通常存放在 `components`文件夹。
> 2. 通过点击导航，视觉效果上“消失” 了的路由组件，默认是被**卸载**掉的，需要的时候再去**挂载**。

## 4.4.【路由器工作模式】

1. `history`模式

   > 优点：`URL`更加美观，不带有 `#`，更接近传统的网站 `URL`。
   >
   > 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有 `404`错误。
   >
   > ```js
   > const router = createRouter({
   >   history: createWebHistory(), //history模式
   >   /******/
   > });
   > ```

2.
3.
4. `hash`模式

   > 优点：
   >
   > 兼容性更好，因为不需要服务器端处理路径。
   > 缺点：
   >
   > `URL`带有 `#`不太美观，且在 `SEO`优化方面相对较差。
   >
   > ```js
   > const router = createRouter({
   >   history: createWebHashHistory(), //hash模式
   >   /******/
   > });
   > ```

   `hash` 模式的主要原理就是 `onhashchange()` 事件：

   ```js
   window.onhashchange = function (event) {
     console.log(event.oldURL, event.newURL);
     let hash = location.hash.slice(1);
   };
   ```

   使用 `onhashchange()` 事件的好处就是，在页面的 `hash` 值发生变化时，无需向后端发起请求，`window` 就可以监听事件的改变，并按规则加载相应的代码。除此之外，`hash` 值变化对应的 `URL` 都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的 `hash` 值和对应的 `URL` 关联起来了。

   **两种模式对比**

   调用 `history.pushState()` 相比于直接修改 `hash`，存在以下优势:

   - `pushState()` 设置的新 `URL` 可以是与当前 `URL` 同源的任意 `URL`；而 `hash` 只可修改 `#` 后面的部分，因此只能设置与当前 `URL` 同文档的 `URL`；
   - `pushState()` 设置的新 `URL` 可以与当前 `URL` 一模一样，这样也会把记录添加到栈中；而 `hash` 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
   - `pushState()` 通过 `stateObject` 参数可以添加任意类型的数据到记录中；而 `hash` 只可添加短字符串；
   - `pushState()` 可额外设置 `title` 属性供后续使用。
   - `hash` 模式下，仅 `hash` 符号之前的 `url` 会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回 `404` 错误；`history` 模式下，前端的 `url` 必须和实际向后端发起请求的 `url` 一致，如果没有对应的路由处理，将返回 `404`错误。

   ## 4.5. 【to 的两种写法】

   ```vue
   <!-- 第一种：to的字符串写法 -->
   <router-link active-class="active" to="/home">主页</router-link>

   <!-- 第二种：to的对象写法 -->
   <router-link active-class="active" :to="{ path: '/home' }">Home</router-link>
   ```

   ## 4.6. 【命名路由】

   作用：可以简化路由跳转及传参（后面就讲）。

   给路由规则命名：

   ```js
   routes: [
     {
       name: "zhuye",
       path: "/home",
       component: Home,
     },
     {
       name: "xinwen",
       path: "/news",
       component: News,
     },
     {
       name: "guanyu",
       path: "/about",
       component: About,
     },
   ];
   ```

   跳转路由：

   ```vue
   <!--简化前：需要写完整的路径（to的字符串写法） -->
   <router-link to="/news/detail">跳转</router-link>

   <!--简化后：直接通过名字跳转（to的对象写法配合name属性） -->
   <router-link :to="{ name: 'guanyu' }">跳转</router-link>
   ```

   ## 4.7. 【嵌套路由】

   1. 编写 `News`的子路由：`Detail.vue`
   2. 配置路由规则，使用 `children`配置项：

      ```ts
      const router = createRouter({
        history: createWebHistory(),
        routes: [
          {
            name: "zhuye",
            path: "/home",
            component: Home,
          },
          {
            name: "xinwen",
            path: "/news",
            component: News,
            children: [
              {
                name: "xiang",
                path: "detail",
                component: Detail,
              },
            ],
          },
          {
            name: "guanyu",
            path: "/about",
            component: About,
          },
        ],
      });
      export default router;
      ```

   3. 跳转路由（记得要加完整路径）：

      ```vue
      <router-link to="/news/detail">xxxx</router-link>
      <!-- 或 -->
      <router-link :to="{ path: '/news/detail' }">xxxx</router-link>
      ```

   4. 记得去 `Home`组件中预留一个 `<router-view>`

      ```vue
      <template>
        <div class="news">
          <nav class="news-list">
            <RouterLink
              v-for="news in newsList"
              :key="news.id"
              :to="{ path: '/news/detail' }"
            >
              {{ news.name }}
            </RouterLink>
          </nav>
          <div class="news-detail">
            <RouterView />
          </div>
        </div>
      </template>
      ```

   ## 4.8. 【路由传参】

   ### query 参数

   1. 传递参数

      ```vue
      <!-- 跳转并携带query参数（to的字符串写法） -->
      <router-link to="/news/detail?a=1&b=2&content=欢迎你">
       跳转
      </router-link>

      <!-- 跳转并携带query参数（to的对象写法） -->
      <RouterLink
        :to="{
          //name:'xiang', //用name也可以跳转
          path: '/news/detail',
          query: {
            id: news.id,
            title: news.title,
            content: news.content,
          },
        }"
      >
        {{news.title}}
      </RouterLink>
      ```

   2. 接收参数：

      ```js
      import { useRoute } from "vue-router";
      const route = useRoute();
      // 打印query参数
      console.log(route.query);
      ```

   ### params 参数

   1. 传递参数

      ```vue
      <!-- 跳转并携带params参数（to的字符串写法） -->
      <RouterLink
        :to="`/news/detail/001/新闻001/内容001`"
      >{{news.title}}</RouterLink>

      <!-- 跳转并携带params参数（to的对象写法） -->
      <RouterLink
        :to="{
          name: 'xiang', //用name跳转
          params: {
            id: news.id,
            title: news.title,
            content: news.title,
          },
        }"
      >
        {{news.title}}
      </RouterLink>
      ```

   2. 接收参数：

      ```js
      import { useRoute } from "vue-router";
      const route = useRoute();
      // 打印params参数
      console.log(route.params);
      ```

   > 备注 1：传递 `params`参数时，若使用 `to`的对象写法，必须使用 `name`配置项，不能用 `path`。
   >
   > 备注 2：传递 `params`参数时，需要提前在规则中占位。
   >
   > 备注 3：传递**`params`**参数时，不能传递对象或数组类型。

   ## 4.9. 【路由的 props 配置】

   作用：让路由组件更方便的收到参数（可以将路由参数作为 `props`传给组件）

   ```js
   {
    name:'xiang',
    path:'detail/:id/:title/:content',
    component:Detail,

     // props的对象写法，作用：把对象中的每一组key-value作为props传给Detail组件
     // props:{a:1,b:2,c:3},

     // props的布尔值写法，作用：把收到了每一组params参数，作为props传给Detail组件
     // props:true

     // props的函数写法，作用：把返回的对象中每一组key-value作为props传给Detail组件
     props(route){
       return route.query
     }
   }
   ```

   ## 4.10. 【 replace 属性】

   1. 作用：控制路由跳转时操作浏览器历史记录的模式。
   2. 浏览器的历史记录有两种写入方式：分别为 `push`和 `replace`：

      - `push`是追加历史记录（默认值）。
      - `replace`是替换当前记录。

   3. 开启 `replace`模式：

      ```vue
      <RouterLink replace .......>News</RouterLink>
      ```

   ## 4.11. 【编程式导航】

   路由组件的两个重要的属性：`$route`和 `$router`变成了两个 `hooks`

   - `$route` 是“**路由信息对象**”，包括 `path，params，hash，query，fullPath，matched，name` 等路由信息参数
   - `$router` 是“**路由实例**”对象包括了**路由的跳转方法**，**钩子函数**等。

   ```js
   import { useRoute, useRouter } from "vue-router";

   const route = useRoute();
   const router = useRouter();

   console.log(route.query);
   console.log(route.parmas);
   console.log(router.push);
   console.log(router.replace);
   ```

   ## 4.12. 【重定向】

   1. 作用：将特定的路径，重新定向到已有路由。
   2. 具体编码：

      ```js
      {
          path:'/',
          redirect:'/about'
      }
      ```

   ## 4.13. 【路由钩子】

   ### Vue-Router 导航守卫

   > [!TIP]
   >
   > 有的时候，需要通过路由来进行一些操作，比如最常见的登录权限验证，当用户满足条件时，才让其进入导航，否则就取消跳转，并跳到登录页面让其登录。
   >
   > 为此有很多种方法可以植入路由的导航过程：全局的，单个路由独享的，或者组件级的。

   1. 全局路由钩子

   全局有三个路由钩子;

   - `router.beforeEach` 全局前置守卫 进入路由之前
   - `router.beforeResolve` 全局解析守卫（`2.5.0+`）在 `beforeRouteEnter` 调用之后调用
   - `router.afterEach` 全局后置钩子 进入路由之后

   具体使用 ∶

   - `beforeEach`（判断是否登录了，没登录就跳转到登录页）

   ```js
   router.beforeEach((to, from, next) => {
     let ifInfo = Vue.prototype.$common.getSession("userData");
     if (!ifInfo) {
       // sessionStorage 里没有储存 user 信息
       if (to.path === "/") {
         // 如果是登录页面路径，就直接 next()
         next();
       } else {
         // 不然就跳转到登录
         Message.warning("请重新登录！");
         window.location.href = Vue.prototype.$loginUrl;
       }
     } else {
       return next();
     }
   });
   ```

   - `afterEach`（跳转之后滚动条回到顶部）

   ```js
   router.afterEach((to, from) => {
     // 跳转之后滚动条回到顶部
     window.scrollTo(0, 0);
   });
   ```

   2. 单个路由独享钩子

   `beforeEnter`

   如果不想全局配置守卫的话，可以为某些路由单独配置守卫，有三个参数 ∶ `to、from、next`

   ```js
   export default [
     {
       path: "/",
       name: "login",
       component: Login,
       beforeEnter: (to, from, next) => {
         console.log("即将进入登录页面");
         next();
       },
     },
   ];
   ```

   3. 组件内钩子

   `beforeRouteUpdate、beforeRouteEnter、beforeRouteLeave`

   这三个钩子都有三个参数 ∶`to、from、next`

   - `beforeRouteEnter`∶ 进入组件前触发
   - `beforeRouteUpdate`∶ 当前地址改变并且该组件被复用时触发，举例来说，带有动态参数的路径 `foo/∶id`，在 `/foo/1` 和 `/foo/2` 之间跳转的时候，由于会渲染同样的 `foo` 组件，这个钩子在这种情况下就会被调用
   - `beforeRouteLeave`∶ 离开组件被调用

   注意点，`beforeRouteEnter` 组件内还访问不到 `this`，因为该守卫执行前组件实例还没有被创建，需要传一个回调给 `next` 来访问，例如：

   ```js
   beforeRouteEnter(to, from, next) {
       next(target => {
           if (from.path == '/classProcess') {
               target.isFromProcess = true
           }
       })
   }
   ```

   ### Vue 路由钩子在生命周期函数的体现

   1. 完整的路由导航解析流程（不包括其他生命周期）

   - 触发进入其他路由。
   - 调用要离开路由的组件守卫 `beforeRouteLeave`
   - 调用全局前置守卫 ∶ `beforeEach`
   - 在重用的组件里调用 `beforeRouteUpdate`
   - 调用路由独享守卫 `beforeEnter`。
   - 解析异步路由组件。
   - 在将要进入的路由组件中调用 `beforeRouteEnter`
   - 调用全局解析守卫 `beforeResolve`
   - 导航被确认。
   - 调用全局后置钩子的 `afterEach` 钩子。
   - 触发 `DOM` 更新（`mounted`）。
   - 执行 `beforeRouteEnter` 守卫中传给 `next` 的回调函数

   2. 触发钩子的完整顺序

   路由导航、`keep-alive`、和组件生命周期钩子结合起来的，触发顺序，假设是从 `a` 组件离开，第一次进入 `b` 组件 ∶

   - `beforeRouteLeave`：路由组件的组件离开路由前钩子，可取消路由离开。
   - `beforeEach`：路由全局前置守卫，可用于登录验证、全局路由 `loading` 等。
   - `beforeEnter`：路由独享守卫
   - `beforeRouteEnter`：路由组件的组件进入路由前钩子。
   - `beforeResolve`：路由全局解析守卫
   - `afterEach`：路由全局后置钩子
   - `beforeCreate`：组件生命周期，不能访问 `this`。
   - `created`：组件生命周期，可以访问 `this`，不能访问 `dom`。
   - `beforeMount`：组件生命周期
   - `deactivated`：离开缓存组件 `a`，或者触发 `a` 的 `beforeDestroy` 和 `destroyed` 组件销毁钩子。
   - `mounted`：访问/操作 `dom`。
   - `activated`：进入缓存组件，进入 `a` 的嵌套子组件（如果有的话）。
   - 执行 `beforeRouteEnter` 回调函数 `next`。

   3. 导航行为被触发到导航完成的整个过程

   - 导航行为被触发，此时导航未被确认。
   - 在失活的组件里调用离开守卫 `beforeRouteLeave`。
   - 调用全局的 `beforeEach` 守卫。
   - 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
   - 在路由配置里调用 `beforeEnteY`。
   - 解析异步路由组件（如果有）。
   - 在被激活的组件里调用 `beforeRouteEnter`。
   - 调用全局的 `beforeResolve` 守卫（2.5+），标示解析阶段完成。
   - 导航被确认。
   - 调用全局的 `afterEach` 钩子。
   - 非重用组件，开始组件实例的生命周期：`beforeCreate&created、beforeMount&mounted`
   - 触发 DOM 更新。
   - 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。
   - 导航完成

   ## Vue-router 跳转和 location.href 有什么区别

   - 使用 `location.href= /url`来跳转，简单方便，但是刷新了页面；
   - 使用 `history.pushState( /url )` ，无刷新页面，静态跳转；
   - 引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 `history.pushState()` 没什么差别的，因为 vue-router 就是用了 `history.pushState()` ，尤其是在 history 模式下。

   # 5. pinia

   ## 5.1【准备一个效果】

   <img src="/public/vue_images/pinia_example.gif" alt="pinia_example" style="zoom:30%;border:3px solid" />

   ## 5.2【搭建 pinia 环境】

   第一步：`npm install pinia`

   第二步：操作 `src/main.ts`

   ```ts
   import { createApp } from "vue";
   import App from "./App.vue";

   /* 引入createPinia，用于创建pinia */
   import { createPinia } from "pinia";

   /* 创建pinia */
   const pinia = createPinia();
   const app = createApp(App);

   /* 使用插件 */ {
   }
   app.use(pinia);
   app.mount("#app");
   ```

   此时开发者工具中已经有了 `pinia`选项

   <img src="https://cdn.nlark.com/yuque/0/2023/png/35780599/1684309952481-c67f67f9-d1a3-4d69-8bd6-2b381e003f31.png" style="zoom:80%;border:1px solid black;border-radius:10px" />

   ## 5.3【存储+读取数据】

   1. `Store`是一个保存：**状态**、**业务逻辑** 的实体，每个组件都可以**读取**、**写入**它。
   2. 它有三个概念：`state`、`getter`、`action`，相当于组件中的： `data`、 `computed` 和 `methods`。
   3. 具体编码：`src/store/count.ts`

      ```ts
      // 引入defineStore用于创建store
      import { defineStore } from "pinia";

      // 定义并暴露一个store
      export const useCountStore = defineStore("count", {
        // 动作
        actions: {},
        // 状态
        state() {
          return {
            sum: 6,
          };
        },
        // 计算
        getters: {},
      });
      ```

   4. 具体编码：`src/store/talk.ts`

      ```js
      // 引入defineStore用于创建store
      import { defineStore } from "pinia";

      // 定义并暴露一个store
      export const useTalkStore = defineStore("talk", {
        // 动作
        actions: {},
        // 状态
        state() {
          return {
            talkList: [
              { id: "yuysada01", content: "你今天有点怪，哪里怪？怪好看的！" },
              { id: "yuysada02", content: "草莓、蓝莓、蔓越莓，你想我了没？" },
              { id: "yuysada03", content: "心里给你留了一块地，我的死心塌地" },
            ],
          };
        },
        // 计算
        getters: {},
      });
      ```

   5. 组件中使用 `state`中的数据

      ```vue
      <template>
        <h2>当前求和为：{{ sumStore.sum }}</h2>
      </template>

      <script setup lang="ts" name="Count">
      // 引入对应的useXxxxxStore
      import { useSumStore } from "@/store/sum";

      // 调用useXxxxxStore得到对应的store
      const sumStore = useSumStore();
      </script>
      ```

      ```vue
      <template>
        <ul>
          <li v-for="talk in talkStore.talkList" :key="talk.id">
            {{ talk.content }}
          </li>
        </ul>
      </template>

      <script setup lang="ts" name="Count">
      import axios from "axios";
      import { useTalkStore } from "@/store/talk";

      const talkStore = useTalkStore();
      </script>
      ```

   ## 5.4.【修改数据】(三种方式)

   1. 第一种修改方式，直接修改

      ```ts
      countStore.sum = 666;
      ```

   2. 第二种修改方式：批量修改

      ```ts
      countStore.$patch({
        sum: 999,
        school: "atguigu",
      });
      ```

   3. 第三种修改方式：借助 `action`修改（`action`中可以编写一些业务逻辑）

      ```js
      import { defineStore } from "pinia";

      export const useCountStore = defineStore("count", {
        /*************/
        actions: {
          //加
          increment(value: number) {
            if (this.sum < 10) {
              //操作countStore中的sum
              this.sum += value;
            }
          },
          //减
          decrement(value: number) {
            if (this.sum > 1) {
              this.sum -= value;
            }
          },
        },
        /*************/
      });
      ```

   4. 组件中调用 `action`即可

      ```js
      // 使用countStore
      const countStore = useCountStore();

      // 调用对应action
      countStore.incrementOdd(n.value);
      ```

   ## 5.5.【storeToRefs】

   - 借助 `storeToRefs`将 `store`中的数据转为 `ref`对象，方便在模板中使用。
   - 注意：`pinia`提供的 `storeToRefs`只会将数据做转换，而 `Vue`的 `toRefs`会转换 `store`中数据。

   ```vue
   <template>
     <div class="count">
       <h2>当前求和为：{{ sum }}</h2>
     </div>
   </template>

   <script setup lang="ts" name="Count">
   import { useCountStore } from "@/store/count";
   /* 引入storeToRefs */
   import { storeToRefs } from "pinia";

   /* 得到countStore */
   const countStore = useCountStore();
   /* 使用storeToRefs转换countStore，随后解构 */
   const { sum } = storeToRefs(countStore);
   </script>
   ```

   ## 5.6.【getters】

   1. 概念：当 `state`中的数据，需要经过处理后再使用时，可以使用 `getters`配置。
   2. 追加 `getters`配置。

      ```js
      // 引入defineStore用于创建store
      import { defineStore } from "pinia";

      // 定义并暴露一个store
      export const useCountStore = defineStore("count", {
        // 动作
        actions: {
          /************/
        },
        // 状态
        state() {
          return {
            sum: 1,
            school: "atguigu",
          };
        },
        // 计算
        getters: {
          bigSum: (state): number => state.sum * 10,
          upperSchool(): string {
            return this.school.toUpperCase();
          },
        },
      });
      ```

   3. 组件中读取数据：

      ```js
      const { increment, decrement } = countStore;
      let { sum, school, bigSum, upperSchool } = storeToRefs(countStore);
      ```

   ## 5.7.【$subscribe】

   通过 store 的 `$subscribe()` 方法侦听 `state` 及其变化

   ```ts
   talkStore.$subscribe((mutate, state) => {
     console.log("LoveTalk", mutate, state);
     localStorage.setItem("talk", JSON.stringify(talkList.value));
   });
   ```

   ## 5.8. 【store 组合式写法】

   ```ts
   import { defineStore } from "pinia";
   import axios from "axios";
   import { nanoid } from "nanoid";
   import { reactive } from "vue";

   export const useTalkStore = defineStore("talk", () => {
     // talkList就是state
     const talkList = reactive(
       JSON.parse(localStorage.getItem("talkList") as string) || []
     );

     // getATalk函数相当于action
     async function getATalk() {
       // 发请求，下面这行的写法是：连续解构赋值+重命名
       let {
         data: { content: title },
       } = await axios.get("https://api.uomg.com/api/rand.qinghua?format=json");
       // 把请求回来的字符串，包装成一个对象
       let obj = { id: nanoid(), title };
       // 放到数组中
       talkList.unshift(obj);
     }
     return { talkList, getATalk };
   });
   ```

   # 6. 组件通信

   **`Vue3`组件通信和 `Vue2`的区别：**

   - 移出事件总线，使用 `mitt`代替。

   - `vuex`换成了 `pinia`。
   - 把 `.sync`优化到了 `v-model`里面了。
   - 把 `$listeners`所有的东西，合并到 `$attrs`中了。
   - `$children`被砍掉了。

   **常见搭配形式：**

   <img src="/public/vue_images/image-20231119185900990.png" alt="image-20231119185900990" style="zoom:60%;" />

   ## 6.1. 【props】

   概述：`props`是使用频率最高的一种通信方式，常用与 ：**父 ↔ 子**。

   - 若 **父传子**：属性值是**非函数**。
   - 若 **子传父**：属性值是**函数**。

   父组件：

   ```vue
   <template>
     <div class="father">
       <h3>父组件，</h3>
       <h4>我的车：{{ car }}</h4>
       <h4>儿子给的玩具：{{ toy }}</h4>
       <Child :car="car" :getToy="getToy" />
     </div>
   </template>

   <script setup lang="ts" name="Father">
   import Child from "./Child.vue";
   import { ref } from "vue";
   // 数据
   const car = ref("奔驰");
   const toy = ref();
   // 方法
   function getToy(value: string) {
     toy.value = value;
   }
   </script>
   ```

   子组件

   ```vue
   <template>
     <div class="child">
       <h3>子组件</h3>
       <h4>我的玩具：{{ toy }}</h4>
       <h4>父给我的车：{{ car }}</h4>
       <button @click="getToy(toy)">玩具给父亲</button>
     </div>
   </template>

   <script setup lang="ts" name="Child">
   import { ref } from "vue";
   const toy = ref("奥特曼");

   defineProps(["car", "getToy"]);
   </script>
   ```

   ## 6.2. 【自定义事件】

   1. 概述：自定义事件常用于：**子 => 父。**
   2. 注意区分好：原生事件、自定义事件。

   - 原生事件：
     - 事件名是特定的（`click`、`mosueenter`等等）
     - 事件对象 `$event`: 是包含事件相关信息的对象（`pageX`、`pageY`、`target`、`keyCode`）
   - 自定义事件：
     - 事件名是任意名称
     - `<strong style="color:red">`事件对象 `$event`: 是调用 `emit`时所提供的数据，可以是任意类型！！！`</strong >`

   3. 示例：

      ```html
      <!--在父组件中，给子组件绑定自定义事件：-->
      <Child @send-toy="toy = $event" />

      <!--注意区分原生事件与自定义事件中的$event-->
      <button @click="toy = $event">测试</button>
      ```

      ```js
      //子组件中，触发事件：
      this.$emit("send-toy", 具体数据);
      ```

   ## 6.3. 【mitt】

   概述：与消息订阅与发布（`pubsub`）功能类似，可以实现任意组件间通信。

   安装 `mitt`

   ```shell
   npm i mitt
   ```

   新建文件：`src\utils\emitter.ts`

   ```javascript
   // 引入mitt
   import mitt from "mitt";

   // 创建emitter
   const emitter = mitt();

   /*
     // 绑定事件
     emitter.on('abc',(value)=>{
       console.log('abc事件被触发',value)
     })
     emitter.on('xyz',(value)=>{
       console.log('xyz事件被触发',value)
     })
   
     setInterval(() => {
       // 触发事件
       emitter.emit('abc',666)
       emitter.emit('xyz',777)
     }, 1000);
   
     setTimeout(() => {
       // 清理事件
       emitter.all.clear()
     }, 3000); 
   */

   // 创建并暴露mitt
   export default emitter;
   ```

   接收数据的组件中：绑定事件、同时在销毁前解绑事件：

   ```typescript
   import emitter from "@/utils/emitter";
   import { onUnmounted } from "vue";

   // 绑定事件
   emitter.on("send-toy", (value) => {
     console.log("send-toy事件被触发", value);
   });

   onUnmounted(() => {
     // 解绑事件
     emitter.off("send-toy");
   });
   ```

   【第三步】：提供数据的组件，在合适的时候触发事件

   ```javascript
   import emitter from "@/utils/emitter";

   function sendToy() {
     // 触发事件
     emitter.emit("send-toy", toy.value);
   }
   ```

   **注意这个重要的内置关系，总线依赖着这个内置关系**

   ## 6.4.【v-model】

   1. 概述：实现 **父 ↔ 子** 之间相互通信。
   2. 前序知识 —— `v-model`的本质

      ```vue
      <!-- 使用v-model指令 -->
      <input type="text" v-model="userName">

      <!-- v-model的本质是下面这行代码 -->
      <input
        type="text"
        :value="userName"
        @input="userName =(<HTMLInputElement>$event.target).value"
      >
      ```

   3. 组件标签上的 `v-model`的本质：`:moldeValue` ＋ `update:modelValue`事件。

      ```vue
      <!-- 组件标签上使用v-model指令 -->
      <AtguiguInput v-model="userName" />

      <!-- 组件标签上v-model的本质 -->
      <AtguiguInput
        :modelValue="userName"
        @update:model-value="userName = $event"
      />
      ```

      `AtguiguInput`组件中：

      ```vue
      <template>
        <div class="box">
          <!--将接收的value值赋给input元素的value属性，目的是：为了呈现数据 -->
          <!--给input元素绑定原生input事件，触发input事件时，进而触发update:model-value事件-->
          <input
            type="text"
            :value="modelValue"
            @input="emit('update:model-value', $event.target.value)"
          />
        </div>
      </template>

      <script setup lang="ts" name="AtguiguInput">
      // 接收props
      defineProps(["modelValue"]);
      // 声明事件
      const emit = defineEmits(["update:model-value"]);
      </script>
      ```

   4. 也可以更换 `value`，例如改成 `abc`

      ```vue
      <!-- 也可以更换value，例如改成abc-->
      <AtguiguInput v-model:abc="userName" />

      <!-- 上面代码的本质如下 -->
      <AtguiguInput :abc="userName" @update:abc="userName = $event" />
      ```

      `AtguiguInput`组件中：

      ```vue
      <template>
        <div class="box">
          <input
            type="text"
            :value="abc"
            @input="emit('update:abc', $event.target.value)"
          />
        </div>
      </template>

      <script setup lang="ts" name="AtguiguInput">
      // 接收props
      defineProps(["abc"]);
      // 声明事件
      const emit = defineEmits(["update:abc"]);
      </script>
      ```

   5. 如果 `value`可以更换，那么就可以在组件标签上多次使用 `v-model`

      ```vue
      <AtguiguInput v-model:abc="userName" v-model:xyz="password" />
      ```

   ## 6.5.【$attrs 】

   1. 概述：`$attrs`用于实现**当前组件的父组件**，向**当前组件的子组件**通信（**祖 → 孙**）。
   2. 具体说明：`$attrs`是一个对象，包含所有父组件传入的标签属性。

      > 注意：`$attrs`会自动排除 `props`中声明的属性(可以认为声明过的 `props` 被子组件自己“消费”了)

   父组件：

   ```vue
   <template>
     <div class="father">
       <h3>父组件</h3>
       <Child
         :a="a"
         :b="b"
         :c="c"
         :d="d"
         v-bind="{ x: 100, y: 200 }"
         :updateA="updateA"
       />
     </div>
   </template>

   <script setup lang="ts" name="Father">
   import Child from "./Child.vue";
   import { ref } from "vue";
   let a = ref(1);
   let b = ref(2);
   let c = ref(3);
   let d = ref(4);

   function updateA(value) {
     a.value = value;
   }
   </script>
   ```

   子组件：

   ```vue
   <template>
     <div class="child">
       <h3>子组件</h3>
       <GrandChild v-bind="$attrs" />
     </div>
   </template>

   <script setup lang="ts" name="Child">
   import GrandChild from "./GrandChild.vue";
   </script>
   ```

   孙组件：

   ```vue
   <template>
     <div class="grand-child">
       <h3>孙组件</h3>
       <h4>a：{{ a }}</h4>
       <h4>b：{{ b }}</h4>
       <h4>c：{{ c }}</h4>
       <h4>d：{{ d }}</h4>
       <h4>x：{{ x }}</h4>
       <h4>y：{{ y }}</h4>
       <button @click="updateA(666)">点我更新A</button>
     </div>
   </template>

   <script setup lang="ts" name="GrandChild">
   defineProps(["a", "b", "c", "d", "x", "y", "updateA"]);
   </script>
   ```

   ## 6.6. 【$refs、$parent】

   1. 概述：

      - `$refs`用于 ：**父 → 子。**
      - `$parent`用于：**子 → 父。**

   2. 原理如下：

      | 属性      | 说明                                                      |
      | --------- | --------------------------------------------------------- |
      | `$refs`   | 值为对象，包含所有被`ref`属性标识的 `DOM`元素或组件实例。 |
      | `$parent` | 值为对象，当前组件的父组件实例对象。                      |

   ## 6.7. 【provide、inject】

   1. 概述：实现**祖孙组件**直接通信
   2. 具体使用：

      - 在祖先组件中通过 `provide`配置向后代组件提供数据
      - 在后代组件中通过 `inject`配置来声明接收数据

   3. 具体编码：

      【第一步】父组件中，使用 `provide`提供数据

      ```vue
      <template>
        <div class="father">
          <h3>父组件</h3>
          <h4>资产：{{ money }}</h4>
          <h4>汽车：{{ car }}</h4>
          <button @click="money += 1">资产+1</button>
          <button @click="car.price += 1">汽车价格+1</button>
          <Child />
        </div>
      </template>

      <script setup lang="ts" name="Father">
      import Child from "./Child.vue";
      import { ref, reactive, provide } from "vue";
      // 数据
      let money = ref(100);
      let car = reactive({
        brand: "奔驰",
        price: 100,
      });
      // 用于更新money的方法
      function updateMoney(value: number) {
        money.value += value;
      }
      // 提供数据
      provide("moneyContext", { money, updateMoney });
      provide("car", car);
      </script>
      ```

      > 注意：子组件中不用编写任何东西，是不受到任何打扰的

      【第二步】孙组件中使用 `inject`配置项接受数据。

      ```vue
      <template>
        <div class="grand-child">
          <h3>我是孙组件</h3>
          <h4>资产：{{ money }}</h4>
          <h4>汽车：{{ car }}</h4>
          <button @click="updateMoney(6)">点我</button>
        </div>
      </template>

      <script setup lang="ts" name="GrandChild">
      import { inject } from "vue";
      // 注入数据
      let { money, updateMoney } = inject("moneyContext", {
        money: 0,
        updateMoney: (x: number) => {},
      });
      let car = inject("car");
      </script>
      ```

   ## 6.8. 【pinia】

   参考之前 `pinia`部分的讲解

   ## 6.9. 【slot】

   ### 1. 默认插槽

   ![img](http://49.232.112.44//public/vue_images/default_slot.png)

   ```vue
   父组件中：
   <Category title="今日热门游戏">
             <ul>
               <li v-for="g in games" :key="g.id">{{ g.name }}</li>
             </ul>
           </Category>
   子组件中：
   <template>
     <div class="item">
       <h3>{{ title }}</h3>
       <!-- 默认插槽 -->
       <slot></slot>
     </div>
   </template>
   ```

   ### 2. 具名插槽

   ```vue
   父组件中：
   <Category title="今日热门游戏">
             <template v-slot:s1>
               <ul>
                 <li v-for="g in games" :key="g.id">{{ g.name }}</li>
               </ul>
             </template>
             <template #s2>
               <a href="">更多</a>
             </template>
           </Category>
   子组件中：
   <template>
     <div class="item">
       <h3>{{ title }}</h3>
       <slot name="s1"></slot>
       <slot name="s2"></slot>
     </div>
   </template>
   ```

   ### 3. 作用域插槽

   1. 理解：`<span style="color:red">`数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（新闻数据在 `News`组件中，但使用数据所遍历出来的结构由 `App`组件决定）
   2. 具体编码：

      ```vue
      父组件中：
      <Game v-slot="params">
            <!-- <Game v-slot:default="params"> -->
            <!-- <Game #default="params"> -->
              <ul>
                <li v-for="g in params.games" :key="g.id">{{ g.name }}</li>
              </ul>
            </Game>

      子组件中：
      <template>
        <div class="category">
          <h2>今日游戏榜单</h2>
          <slot :games="games" a="哈哈"></slot>
        </div>
      </template>

      <script setup lang="ts" name="Category">
      import { reactive } from "vue";
      let games = reactive([
        { id: "asgdytsa01", name: "英雄联盟" },
        { id: "asgdytsa02", name: "王者荣耀" },
        { id: "asgdytsa03", name: "红色警戒" },
        { id: "asgdytsa04", name: "斗罗大陆" },
      ]);
      </script>
      ```

   # 7. 其它 API

   ## 7.1.【shallowRef 与 shallowReactive 】

   ### `shallowRef`

   1. 作用：创建一个响应式数据，但只对顶层属性进行响应式处理。
   2. 用法：

      ```js
      let myVar = shallowRef(initialValue);
      ```

   3. 特点：只跟踪引用值的变化，不关心值内部的属性变化。

   ### `shallowReactive`

   1. 作用：创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，对象内部的嵌套属性则不会变成响应式的
   2. 用法：

      ```js
      const myObj = shallowReactive({ ... });
      ```

   3. 特点：对象的顶层属性是响应式的，但嵌套对象的属性不是。

   ### 总结

   > 通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 `API` 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能。

   ## 7.2.【readonly 与 shallowReadonly】

   ### **`readonly`**

   1. 作用：用于创建一个对象的深只读副本。
   2. 用法：

      ```js
      const original = reactive({ ... });
      const readOnlyCopy = readonly(original);
      ```

   3. 特点：

      - 对象的所有嵌套属性都将变为只读。
      - 任何尝试修改这个对象的操作都会被阻止（在开发模式下，还会在控制台中发出警告）。

   4. 应用场景：

      - 创建不可变的状态快照。
      - 保护全局状态或配置不被修改。

   ### **`shallowReadonly`**

   1. 作用：与 `readonly` 类似，但只作用于对象的顶层属性。
   2. 用法：

      ```js
      const original = reactive({ ... });
      const shallowReadOnlyCopy = shallowReadonly(original);
      ```

   3. 特点：

      - 只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的。
      - 适用于只需保护对象顶层属性的场景。

   ## 7.3.【toRaw 与 markRaw】

   ### `toRaw`

   1. 作用：用于获取一个响应式对象的原始对象， `toRaw` 返回的对象不再是响应式的，不会触发视图更新。

      > 官网描述：这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

      > 何时使用？ —— 在需要将响应式对象传递给非 `Vue` 的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象

   2. 具体编码：

      ```js
      import { reactive, toRaw, markRaw, isReactive } from "vue";

      /* toRaw */
      // 响应式对象
      let person = reactive({ name: "tony", age: 18 });
      // 原始对象
      let rawPerson = toRaw(person);

      /* markRaw */
      let citysd = markRaw([
        { id: "asdda01", name: "北京" },
        { id: "asdda02", name: "上海" },
        { id: "asdda03", name: "天津" },
        { id: "asdda04", name: "重庆" },
      ]);
      // 根据原始对象citys去创建响应式对象citys2 —— 创建失败，因为citys被markRaw标记了
      let citys2 = reactive(citys);
      console.log(isReactive(person));
      console.log(isReactive(rawPerson));
      console.log(isReactive(citys));
      console.log(isReactive(citys2));
      ```

   ### `markRaw`

   1. 作用：标记一个对象，使其**永远不会**变成响应式的。

      > 例如使用 `mockjs`时，为了防止误把 `mockjs`变为响应式对象，可以使用 `markRaw` 去标记 `mockjs`

   2. 编码：

      ```js
      /* markRaw */
      let citys = markRaw([
        { id: "asdda01", name: "北京" },
        { id: "asdda02", name: "上海" },
        { id: "asdda03", name: "天津" },
        { id: "asdda04", name: "重庆" },
      ]);
      // 根据原始对象citys去创建响应式对象citys2 —— 创建失败，因为citys被markRaw标记了
      let citys2 = reactive(citys);
      ```

   ## 7.4.【customRef】

   作用：创建一个自定义的 `ref`，并对其依赖项跟踪和更新触发进行逻辑控制。

   实现防抖效果（`useSumRef.ts`）：

   ```typescript
   import { customRef } from "vue";

   export default function (initValue: string, delay: number) {
     let msg = customRef((track, trigger) => {
       let timer: number;
       return {
         get() {
           track(); // 告诉Vue数据msg很重要，要对msg持续关注，一旦变化就更新
           return initValue;
         },
         set(value) {
           clearTimeout(timer);
           timer = setTimeout(() => {
             initValue = value;
             trigger(); //通知Vue数据msg变化了
           }, delay);
         },
       };
     });
     return { msg };
   }
   ```

   组件中使用：

   # 8. Vue3 新组件

   ## 8.1. 【Teleport】

   - 什么是 Teleport？—— Teleport 是一种能够将我们的**组件 html 结构**移动到指定位置的技术。

   ```html
   <teleport to="body">
     <div class="modal" v-show="isShow">
       <h2>我是一个弹窗</h2>
       <p>我是弹窗中的一些内容</p>
       <button @click="isShow = false">关闭弹窗</button>
     </div>
   </teleport>
   ```

   ## 8.2. 【Suspense】

   - 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
   - 使用步骤：
     - 异步引入组件
     - 使用 `Suspense`包裹组件，并配置好 `default` 与 `fallback`

   ```tsx
   import { defineAsyncComponent, Suspense } from "vue";
   const Child = defineAsyncComponent(() => import("./Child.vue"));
   ```

   ```vue
   <template>
     <div class="app">
       <h3>我是App组件</h3>
       <Suspense>
         <template v-slot:default>
           <Child />
         </template>
         <template v-slot:fallback>
           <h3>加载中.......</h3>
         </template>
       </Suspense>
     </div>
   </template>
   ```

   ## 8.3.【全局 API 转移到应用对象】

   - `app.component`
   - `app.config`
   - `app.directive`
   - `app.mount`
   - `app.unmount`
   - `app.use`

   ## 8.4.【其他】

   - 过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。
   - `keyCode` 作为 `v-on` 修饰符的支持。
   - `v-model` 指令在组件上的使用已经被重新设计，替换掉了 `v-bind.sync。`
   - `v-if` 和 `v-for` 在同一个元素身上使用时的优先级发生了变化。
   - 移除了 `$on`、`$off` 和 `$once` 实例方法。
   - 移除了过滤器 `filter`。
   - 移除了 `$children` 实例 `propert`。

     ......

# 9. 虚拟 DOM

## 9.1. 虚拟 DOM 真的比真实 DOM 性能好吗

   > [!IMPORTANT]
   >
   > 虚拟 `DOM` 相对原生 `DOM` 不一定效率更高，如果只修改一个按钮的文案，那么虚拟 `DOM` 的操作无论如何都不可能比真实的 `DOM` 操作更快。在首次渲染大量 `DOM` 时，由于多了一层虚拟 `DOM` 的计算，虚拟 `DOM` 也会比 `innerHTML` 插入慢。
   >
   > 虚拟 `DOM` 能保证性能下限，在真实 `DOM` 操作的时候进行针对性的优化时，还是更快的。所以要根据具体的场景进行探讨。
   >
   > 在整个 `DOM` 操作的演化过程中，主要矛盾并不在于性能，而在于开发者写得爽不爽，在于研发体验/研发效率。虚拟 `DOM` 不是别的，正是前端开发们为了追求更好的研发体验和研发效率而创造出来的高阶产物。虚拟 `DOM` 并不一定会带来更好的性能，虚拟 `DOM` 的优越之处在于，它能够在提供更爽、更高效的研发模式的同时，仍然保持一个还不错的性能。

# 10. 虚拟列表

   > [!TIP]
   >
   > 如果后端一次性的给我们返回了上千条/上万条数据，此时，我们想要在页面上进行展示，就要进行一定的优化。
   >
   > 首先，我们可以把这些响应式数据使用 `Object.freeze()` 方法来冻结对象让其脱离响应式，因为这些数据往往都是只进行展示信息的目的，无需为其开启响应式。
   >
   > 最主要的实现方式还是使用虚拟列表来实现。

   `vue` 实现代码：

   ```vue
   <script setup lang="ts">
   import { ref, computed } from "vue";

   type Item = {
     id: number;
     content: string;
   };

   const { items, size, showNumber } = defineProps<{
     items: Item[]; // 要进行渲染的列表数据
     size: number; // 每一条数据的高度
     showNumber: number; // 每次渲染的数据条数（DOM 个数）
   }>();

   // 要展示数据的起始下标
   const start = ref<number>(0);
   // 要展示数据的结束下标
   const end = ref<number>(showNumber);

   // 最终筛选出要展示的数据
   const showData = computed(() => {
     return items.slice(start.value, end.value);
   });

   // 容器的高度
   const containerHeight = computed(() => {
     return size * showNumber + "px";
   });

   // 撑开容器内容高度的元素的高度
   const barHeight = computed(() => {
     return size * items.length + "px";
   });

   // 列表项上滚动改变 top 的值
   const listTop = computed(() => {
     return start.value * size + "px";
   });

   // 容器 ref
   const containerRef = ref<HTMLDivElement | null>(null);

   // 滚动
   const handleScroll = () => {
     // 获取容器顶部滚动尺寸
     const scrollTop = containerRef.value!.scrollTop;
     // 计算卷去的数据条数，用计算的结果作为获取数据的起始和结束下标
     // 起始的下标就是卷去的数据条数，向下取整
     start.value = Math.floor(scrollTop / size);
     // 结束的下标就是起始的下标加上要展示的数据条数
     end.value = start.value + showNumber;
   };
   </script>
   <template>
     <div
       class="container"
       ref="containerRef"
       :style="{ height: containerHeight }"
       @scroll="handleScroll"
     >
       <!-- 数据列表 -->
       <div class="list" :style="{ top: listTop }">
         <!-- 列表项 -->
         <div
           v-for="item in showData"
           :key="item.id"
           :style="{ height: size + 'px' }"
         >
           {{ item.content }}
         </div>
         <!-- 用于撑开高度的元素 -->
         <div class="bar" :style="{ height: barHeight }"></div>
       </div>
     </div>
   </template>
   <style scoped lang="scss">
   .container {
     overflow-y: scroll;
     background-color: rgb(150, 150, 150, 0.5);
     font-size: 20px;
     font-weight: 700;
     line-height: 60px;
     width: 500px;
     margin: 0 auto;
     position: relative;
     text-align: center;
   }

   .list {
     position: absolute;
     top: 0;
     width: 100%;
   }
   </style>
   ```

# 11. 自定义指令

   自定义指令的生命周期与 `Vue` 的生命周期基本一致。

   `created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted`

   ```vue
   <script setup lang="ts">
      import {Directive, DirectiveBinding} from 'vue';
   const vMove = {
          created() {
              console.log('======> created');
          }
          beforeMount() {
              console.log('======> beforeMount');
          }
       mounted(el: HTMLElement, binding: DirectiveBinding) {
              console.log('======> mounted');
          }
       beforeUpdate() {
              console.log('======> beforeUpdate');
          }
       updated() {
              console.log('======> updated');
          }
       beforeUnmount() {
              console.log('======> beforeUnmount');
          }
       unmounted() {
              console.log('======> unmounted');
          }
      }
   </script>
   ```

## 函数简写

   如果我们只想在 `mounted` 和 `updated` 时触发相同行为，而不关心其他钩子函数。我们可以通过这个函数模式实现。

# Scoped 是怎么实现样式隔离的

   > [!TIP]
   >
   > `Vue` 在编译带有 `scoped` 属性的 `<style>` 标签时，会按照以下步骤处理样式隔离
   >
   > 1. 生成唯一的作用域 `ID`：`Vue` 为每个带有 `scoped` 属性的组件生成一个唯一的作用域 `ID` （如：`data-v-f3f3eg7`）。这个 `ID` 是随机的，确保每个组件的作用域 `ID` 是独一无二的。
   > 2. 添加作用域 `ID` 到模板元素：`Vue` 会在编译组件模板的过程中，将这个作用域 `ID` 作为自定义属性添加到组件模板的所有元素上。例如：添加作用域 `ID` 是 `data-v-f3f3eg7` ，那么在该组件模板上的所有元素都会添加一个属性 `data-v-f3f3eg7`。
   > 3. 修改 `css` 选择器：对于组件内部的每个 `CSS` 规则， `Vue` 会自动转换其选择器，使其仅匹配带有对应作用域 `ID` 的元素。这是通过在 `CSS` 选择其的末尾添加相应的作用域 `ID` 属性选择器来实现的。例如：如果 `CSS` 的规则是 `.btn {color: red;}`，并且作用域 `ID` 是 `data-v-f3f3eg7` 那么该规则会被转换成 `.btn[data-v-f3f3eg7] {color: red;}`。

# 组件库二次封装思路

   > [!TIP]
   >
   > 组件库二次封装的思路：
   >
   > 比如，我们要对 `Element-Plus` 的 `<el-input></el-input>` 组件进行封装。
   >
   > 首先，我们要明确一点，不应该在组件中一个一个的定义 `props`，我们需要使用 `$attrs` 来规避这个问题。
   >
   > > `$attrs`：组件实例的该属性包含了父作用域中不作为 `prop` 被识别 (且获取) 的 `attribute` 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部的 UI 库组件中。

## 属性、事件

封装 `MyInput` 组件，添加一个名为 `box-shadow` 的属性，该属性可以用于设置组件的阴影效果。

```vue
<!-- MyInput.vue -->
<template>
  <el-input :class="{box_shadow: boxShadow}"> </el-input>
</template>

<script setup>
defineProps({
  boxShadow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.box_shadow {
  box-shadow: 4px 4px 10px #40a0ff7b;
}
</style>
```

### 使用v-bind="$attrs"
>
> [!TIP]
>在 `el-input` 组件中，存在许多可选的属性和事件。在封装组件时，逐个定义这些属性和事件是不现实的。为了更便捷地处理这种情况，我们可以使用 `v-bind="$attrs"`。该指令允许将父组件传递给子组件的非 `props` 属性绑定到子组件内部的元素上，从而实现更灵活的数据传递和绑定。

```vue
<template>
 <MyInput
     placeholder="请输入关键内容"
     v-model="value"
     @input="inputValue"
   >
 </MyInput>
</template>

<script setup>
import { ref } from "vue";
import MyInput from "./components/MyInput.vue";

const value = ref("123");

const inputValue = (v) => {
  console.log(v);
};
</script>
```

```vue
<!-- MyInput.vue -->
<template>
  <el-input v-bind="$attrs" :class="{box_shadow: boxShadow}"> </el-input>
</template>

<script setup>
defineProps({
  boxShadow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.box_shadow {
  box-shadow: 4px 4px 10px #40a0ff7b;
}
</style>
```

在这个例子中，父组件中的 `placeholder、v-model` 属性和 `input` 事件并没有在 `MyInput` 的 `props` 中进行显式声明。然而，通过使用 `v-bind="$attrs"`，我们能够将这些属性和事件传递给 `el-input` 元素。
上面代码等同与：

```vue
<!-- MyInput.vue -->
<template>
  <el-input 
      v-model="value"
      :placehoder="placehoder"
      :class="{box_shadow: boxShadow}"
      @input="$emit('input', $event)"
      > 
  </el-input>
</template>

<script setup>
defineProps({
  boxShadow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.box_shadow {
  box-shadow: 4px 4px 10px #40a0ff7b;
}
</style>
```

## 插槽

> [!TIP]
> 在 `el-input` 组件中，同样存在许多可选的插槽。逐个去定义这些插槽是不现实的，因此我们可以使用 `useSlots` 方法来获取父组件传入的插槽内容，并通过遍历这些插槽来支持它们的使用。

```vue
<template>
  <!-- MyInput.vue -->
  <el-input v-bind="$attrs" :class="{ box_shadow: boxShadow }">
    <template v-for="(value, name) in slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </el-input>
</template>

<script setup>
import { onMounted, ref, useSlots, defineExpose } from "vue";

defineProps({
  boxShadow: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
</script>

<style scoped>
.box_shadow {
  box-shadow: 4px 4px 10px #40a0ff7b;
}
</style>
```

### 使用

```vue
<template>
  <MyInput
    placeholder="请输入关键内容"
    v-model="value"
    @input="inputValue"
  >
    <template #prepend>Http://</template>
  </MyInput>
</template>

<script setup>
import { ref } from "vue";
import MyInput from "./components/MyInput.vue";

const value = ref("123");

const inputValue = (v) => {
  console.log(v);
};
</script>
```

## 方法
>
> [!TIP]
> 在 `el-input` 组件中，暴露了许多方法。逐个去定义这些方法是不现实的。因此，我们可以通过 `ref` 来获取 `el-input` 组件的实例，然后定义一个 `expose` 变量，通过遍历 `ref` 获取的方法，将它们存放到 `expose` 变量中。接着，我们可以使用 `defineExpose` 将 `expose` 暴露出来，这样父组件就能通过 `ref` 使用这些方法了。

```vue
<template>
  <!-- MyInput.vue -->
  <el-input v-bind="$attrs" ref="elInputRef" :class="{ box_shadow: boxShadow }">
    <!-- // -->
  </el-input>
</template>

<script setup>
import { onMounted, ref, useSlots, defineExpose } from "vue";

// ...

const expose = {};

onMounted(() => {
  const entries = Object.entries(elInputRef.value);
  for (const [method, fn] of entries) {
    expose[method] = fn;
  }
});
defineExpose(expose);
</script>

<style scoped>
/* ... */
</style>
```

### 使用

```vue
<template>
  <MyInput
    placeholder="请输入关键内容"
    v-model="value"
    @input="inputValue"
    ref="myInputRef"
  >
    <template #prepend>Http://</template>
  </MyInput>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MyInput from "./components/MyInput.vue";

const value = ref("123");

const myInputRef = ref();

const inputValue = (v) => {
  console.log(v);
};

onMounted(() => {
  myInputRef.value.focus();
});
</script>

<style>
/* ... */
</style>
```

## 类型提示丢失问题

参考解决方案：

```js
import { drawerProps } from 'naive-ui';

type Props = typeof drawerProps & { title: StringConstructor };

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    require: false,
    default: '1000px',
  },
} as unknown as Props);

const width = ref(props.width);
```

# diff 算法

   > [!TIP]
   >
   > `diff` 算法有两个比较显著的特点：比较只会在同层级进行, 不会跨层级比较。

## Vue2 的 diff 算法核心

### 基本原理

- 首先进行新老节点头尾对比，头与头、尾与尾对比，寻找未移动的节点。
- 新老节点头尾对比完后，进行交叉对比，头与尾、尾与头对比，这一步即寻找移动后可复用的节点。
- 然后在剩余新老结点中对比寻找可复用节点，创建一个老节点 `keyToIndex` 的哈希表 `map` 记录 `key`，然后继续遍历新节点索引通过 `key` 查找可以复用的旧的节点。
- 节点遍历完成后，通过新老索引，进行移除多余老节点或者增加新节点的操作。

## Vue3 的 diff 算法核心

### 基本原理

- 首先进行新老节点头尾对比，头与头、尾与尾对比，寻找未移动的节点。
- 然后创建一个新节点在旧节点中的位置的映射表，这个映射表的元素如果不为空，代表可复用。
- 然后根据这个映射表计算出最长递增子序列，这个序列中的结点代表可以原地复用。之后移动剩下的新结点到正确的位置即递增序列的间隙中。

## diff 差别总结

- `vue2、vue3` 的 `diff` 算法实现差异主要体现在：处理完首尾节点后，对剩余节点的处理方式。
- `vue2` 是通过对旧节点列表建立一个 `{ key, oldVnode }` 的映射表，然后遍历新节点列表的剩余节点，根据`newVnode.key` 在旧映射表中寻找可复用的节点，然后打补丁并且移动到正确的位置。
- `vue3` 则是建立一个存储新节点数组中的剩余节点在旧节点数组上的索引的映射关系数组，建立完成这个数组后也即找到了可复用的节点，然后通过这个数组计算得到最长递增子序列，这个序列中的节点保持不动，然后将新节点数组中的剩余节点移动到正确的位置。

# Transition 与 TransitionGroup

## TransitionGroup

以下是关于 Vue.js 中 `TransitionGroup` 组件的详细解析：

---

### **一、核心作用**

`TransitionGroup` 是 Vue 的内置组件，专门用于 **管理列表元素（多个同级元素）的过渡效果**，主要处理以下场景：

- **列表项的新增/删除动画**
- **元素位置变化的平滑过渡**
- **动态排序时的视觉反馈**
- **复杂列表的复合过渡效果**

---

### **二、与 Transition 组件的区别**

| 特性               | Transition                  | TransitionGroup             |
|--------------------|-----------------------------|-----------------------------|
| **作用对象**       | 单个元素/组件               | 多个元素组成的列表          |
| **DOM 结构**       | 不渲染额外元素              | 默认渲染为 `<span>` 包裹容器 |
| **位置变化处理**   | 不支持                      | 自动检测元素移动并应用动画  |
| **Key 要求**       | 不需要                      | 必须为每个元素提供唯一 key  |

---

### **三、基础用法**

#### 1. 基本结构

```html
<TransitionGroup name="list" tag="ul">
  <li 
    v-for="item in items" 
    :key="item.id"
  >
    {{ item.text }}
  </li>
</TransitionGroup>
```

#### 2. 必要 CSS 类

```css
/* 进入/离开过渡 */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

/* 移动过渡 */
.list-move {
  transition: transform 0.5s ease;
}
```

---

### **四、核心特性**

#### 1. **自动位置检测**

- 使用 **FLIP 动画技术**（First Last Invert Play）实现高效的位置变化动画
- 当列表元素顺序变化时，自动计算位置差异并应用平滑过渡

#### 2. **生命周期钩子**

支持与 `Transition` 相同的 JavaScript 钩子：

```html
<TransitionGroup
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
```

#### 3. **配置属性**

| 属性         | 类型      | 说明                          |
|--------------|-----------|-------------------------------|
| `tag`        | String    | 容器元素的标签（默认：`span`）|
| `name`       | String    | 过渡类名前缀（默认：`v`）     |
| `css`        | Boolean   | 是否使用 CSS 过渡（默认：true）|
| `appear`     | Boolean   | 是否启用初始渲染过渡          |
| `move-class` | String    | 自定义移动过渡类名            |

---

### **五、实现原理**

#### 1. **虚拟 DOM 对比**

- 通过对比新旧 `vnode` 列表，识别元素的添加、删除和移动
- 使用 `key` 属性跟踪元素身份

#### 2. **FLIP 动画流程**

```mermaid
sequenceDiagram
    participant 旧位置
    participant 新位置
    participant 计算差异
    participant 应用变换
    
    旧位置->>新位置: 记录元素初始位置
    新位置->>计算差异: 计算位置差异
    计算差异->>应用变换: 应用反向变换
    应用变换->>新位置: 执行动画过渡到实际位置
```

#### 3. **CSS 控制阶段**

- **进入阶段**：`v-enter-from` → `v-enter-to`
- **离开阶段**：`v-leave-from` → `v-leave-to`
- **移动阶段**：`v-move`

---

### **六、高级用法**

#### 1. 交错动画

```javascript
// 使用 data-index 实现延迟
function onBeforeEnter(el) {
  el.style.animationDelay = `${el.dataset.index * 0.1}s`;
}
```

#### 2. 与第三方动画库集成

```html
<TransitionGroup
  tag="div"
  @enter="onEnter"
  :css="false"
>
  <!-- 元素内容 -->
</TransitionGroup>

<script>
function onEnter(el, done) {
  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 500,
    complete: done
  });
}
</script>
```

#### 3. 动态过渡类型

```html
<TransitionGroup :name="isMobile ? 'slide' : 'fade'">
  <!-- 元素内容 -->
</TransitionGroup>
```

---

### **七、性能优化**

#### 1. **强制硬件加速**

```css
.v-move {
  will-change: transform;
}
```

#### 2. **禁用非必要动画**

```html
<TransitionGroup :css="shouldAnimate">
```

#### 3. **虚拟列表优化**

配合 `vue-virtual-scroller` 等库使用：

```html
<RecycleScroller>
  <TransitionGroup>
    <!-- 虚拟化列表项 -->
  </TransitionGroup>
</RecycleScroller>
```

---

### **八、常见问题**

#### 1. **元素跳动问题**

- **原因**：未正确设置 `position: absolute` 在离开过渡时
- **解决**：

  ```css
  .list-leave-active {
    position: absolute;
  }
  ```

#### 2. **过渡不生效**

- **检查项**：
  1. 是否正确应用了 CSS 过渡属性
  2. 是否提供了唯一的 `key`
  3. 是否正确定义了过渡类名

#### 3. **移动动画卡顿**

- **优化方案**：

  ```css
  .list-move {
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  ```

---

### **九、完整示例**

```html
<template>
  <div>
    <button @click="addItem">添加</button>
    <button @click="shuffle">随机排序</button>
    
    <TransitionGroup 
      name="list" 
      tag="ul"
      class="list-container"
    >
      <li
        v-for="(item, index) in items"
        :key="item.id"
        :data-index="index"
        class="list-item"
      >
        {{ item.text }}
        <button @click="removeItem(item.id)">×</button>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([/* 初始数据 */]);

function addItem() {
  items.value.push({ id: Date.now(), text: '新项目' });
}

function removeItem(id) {
  items.value = items.value.filter(item => item.id !== id);
}

function shuffle() {
  items.value = [...items.value].sort(() => Math.random() - 0.5);
}
</script>

<style>
.list-container {
  position: relative;
}

.list-item {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.list-move {
  transition: transform 0.8s ease;
}
</style>
```

## Transition

以下是关于 Vue.js 中 `Transition` 组件的详细解析：

---

### **一、核心作用**

`Transition` 是 Vue 的内置组件，用于 **为单个元素或组件添加进入/离开的过渡动画**，主要功能包括：

- **自动应用 CSS 过渡类名**
- **集成 CSS 动画库（如 Animate.css）**
- **通过 JavaScript 钩子实现复杂动画**
- **优化过渡性能（如硬件加速）**

---

### **二、基础用法**

#### 1. 基本结构

```html
<Transition name="fade">
  <div v-if="show">需要过渡的内容</div>
</Transition>
```

#### 2. 必要 CSS 类

```css
/* 进入过渡 */
.fade-enter-from { opacity: 0; }
.fade-enter-active { transition: opacity 0.5s; }
.fade-enter-to { opacity: 1; }

/* 离开过渡 */
.fade-leave-from { opacity: 1; }
.fade-leave-active { transition: opacity 0.5s; }
.fade-leave-to { opacity: 0; }
```

---

### **三、核心特性**

#### 1. **过渡阶段类名**

| 类名               | 作用时机                     |
|--------------------|-----------------------------|
| `v-enter-from`     | 进入过渡的开始状态           |
| `v-enter-active`   | 进入过渡的激活状态（持续）   |
| `v-enter-to`       | 进入过渡的结束状态           |
| `v-leave-from`     | 离开过渡的开始状态           |
| `v-leave-active`   | 离开过渡的激活状态（持续）   |
| `v-leave-to`       | 离开过渡的结束状态           |

> 通过 `name` 属性自定义类名前缀（如 `name="fade"` → `fade-enter-from`）

#### 2. **过渡模式**

| 模式            | 说明                          |
|-----------------|-------------------------------|
| `out-in`        | 先执行离开过渡，再执行进入过渡 |
| `in-out`        | 先执行进入过渡，再执行离开过渡 |

```html
<Transition name="slide" mode="out-in">
  <Component :is="currentView" />
</Transition>
```

#### 3. **JavaScript 钩子**

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- 内容 -->
</Transition>
```

---

### **四、实现原理**

1. **虚拟 DOM 追踪**  
   Vue 通过虚拟 DOM 检测元素是否被插入/移除

2. **过渡阶段管理**  

   ```mermaid
   graph LR
   A[DOM 插入] --> B[应用 enter-from 类]
   B --> C[下一帧应用 enter-active + enter-to]
   C --> D[过渡完成移除类名]
   
   E[DOM 移除] --> F[应用 leave-from 类]
   F --> G[下一帧应用 leave-active + leave-to]
   G --> H[实际移除元素]
   ```

3. **性能优化**  
   - 自动检测 CSS 过渡/动画类型
   - 优先使用 `requestAnimationFrame`
   - 自动处理过渡结束事件监听

---

### **五、使用场景**

#### 1. 元素显隐过渡

```html
<Transition name="slide">
  <div v-show="isVisible">滑动内容</div>
</Transition>
```

#### 2. 组件切换过渡

```html
<Transition name="fade" mode="out-in">
  <router-view />
</Transition>
```

#### 3. 结合第三方动画库

```html
<Transition
  enter-active-class="animate__animated animate__bounceIn"
  leave-active-class="animate__animated animate__bounceOut"
>
  <div v-if="show">Animate.css 动画</div>
</Transition>
```

---

### **六、高级用法**

#### 1. 动态过渡类型

```html
<Transition :name="transitionType">
  <div v-if="show">动态过渡效果</div>
</Transition>

<script>
export default {
  data() {
    return {
      transitionType: 'fade'
    }
  }
}
</script>
```

#### 2. 列表项独立过渡

```html
<div v-for="item in items" :key="item.id">
  <Transition>
    <div>{{ item.text }}</div>
  </Transition>
</div>
```

#### 3. 与 GSAP 集成

```javascript
function onEnter(el, done) {
  gsap.from(el, {
    duration: 0.8,
    opacity: 0,
    y: 100,
    onComplete: done
  });
}
```

---

### **七、性能优化**

#### 1. 强制硬件加速

```css
.v-enter-active,
.v-leave-active {
  will-change: transform;
  transform: translateZ(0);
}
```

#### 2. 减少复合动画

避免同时动画多个属性：

```css
/* 推荐 */
.fade-enter-active {
  transition: opacity 0.3s;
}

/* 不推荐 */
.fade-enter-active {
  transition: all 0.3s;
}
```

#### 3. 合理使用 `appear`

初始渲染过渡：

```html
<Transition appear>
  <!-- 内容 -->
</Transition>
```

---

### **八、常见问题**

#### 1. 过渡不生效

- **检查项**：
  1. 是否使用了 `v-if`/`v-show`
  2. CSS 类名是否正确
  3. 过渡属性是否被覆盖

#### 2. 过渡闪烁

- **解决方案**：

  ```css
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s !important;
  }
  ```

#### 3. 与 `v-for` 冲突

- **正确做法**：

  ```html
  <TransitionGroup>
    <div v-for="item in items" :key="item.id">
      <!-- 内容 -->
    </div>
  </TransitionGroup>
  ```

---

### **九、完整示例**

```html
<template>
  <div>
    <button @click="show = !show">切换</button>
    
    <Transition
      name="custom"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div 
        v-if="show" 
        class="box"
      >
        动态内容
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import gsap from 'gsap';

const show = ref(true);

function onEnter(el, done) {
  gsap.from(el, {
    duration: 0.8,
    x: 100,
    opacity: 0,
    ease: 'power4.out',
    onComplete: done
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    duration: 0.8,
    x: -100,
    opacity: 0,
    ease: 'power4.in',
    onComplete: done
  });
}
</script>

<style>
.box {
  width: 200px;
  height: 200px;
  background: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

---

### **十、与 TransitionGroup 对比**

| 特性               | Transition                  | TransitionGroup             |
|--------------------|-----------------------------|-----------------------------|
| **作用对象**       | 单个元素/组件               | 多个元素组成的列表          |
| **DOM 操作**       | 不修改 DOM 结构             | 自动处理元素位置变化        |
| **动画类型**       | 进入/离开                   | 进入/离开 + 位置移动        |
| **性能消耗**       | 较低                        | 较高                        |

# vue 项目中如何使用 cdn axios

   在 `Vue` 项目中使用 `CDN` 引入 `Axios`，可以通过以下步骤完成：使用 `CDN` 引入 `Axios` 的好处包括减少打包体积、提升加载速度、简化项目依赖管理。其中，减少打包体积是最显著的优势之一。通过 `CDN` 引入，`Axios` 库不需要被打包进项目的最终构建文件，极大地减少了文件体积，提高了网页的加载速度。

## 一、什么是 CDN 和 Axios？

### 1、CDN 的定义和作用

   `CDN`（内容分发网络）是一种通过分布在多个不同地理位置的服务器网络来分发内容的技术。它的主要作用是通过将内容缓存到离用户最近的服务器上，从而加速内容的传输速度，减少网络延迟，提高用户体验。

### 2、Axios 的定义和功能

   `Axios` 是一个基于 `Promise` 的 `HTTP` 库，可以用在浏览器和 `Node.js` 中。它提供了一系列功能，如发送异步`HTTP` 请求、拦截请求和响应、转换请求和响应数据、取消请求、自动转换 `JSON` 数据等。`Axios` 的易用性和强大的功能使其成为许多前端开发者的首选 `HTTP` 库。

## 二、为什么选择 CDN 引入 Axios？

### 1、减少打包体积

   通过 `CDN` 引入 `Axios`，项目的构建文件中不需要包含 `Axios` 库，这可以显著减少打包体积，提高网页的加载速度。对于大型项目，减少打包体积尤为重要，因为这可以显著提升用户体验。

### 2、提升加载速度

   `CDN` 服务器通常分布在全球各地，可以通过就近原则将内容传输给用户，从而加速内容加载速度。`CDN` 还可以利用浏览器的缓存机制，当用户访问不同使用相同 `CDN` 资源的网站时，可以直接从缓存中读取资源，进一步提升加载速度。

### 3、简化项目依赖管理

   使用 `CDN` 引入可以减少项目中的依赖包，使项目结构更加简洁。特别是在多团队协作开发中，使用 `CDN` 可以减少依赖冲突和版本不一致的问题。

## 三、如何在 Vue 项目中使用 CDN 引入 Axios？

### 1、在 HTML 文件中引入 Axios

   首先，在 `Vue` 项目的`public/index.html`文件中，通过 `script` 标签引入 `Axios` 的 `CDN` 链接：

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Vue Project</title>
     </head>
     <body>
       <div id="app"></div>
       <!-- 引入Axios的CDN链接 -->
       <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
       <!-- 引入Vue的构建文件 -->
       <script src="/dist/build.js"></script>
     </body>
   </html>
   ```

### 2、在 Vue 组件中使用 Axios

   在 `Vue` 组件中，你可以直接使用全局 `Axios` 对象进行 `HTTP` 请求：

   ```vue
   <template>
     <div>
       <h1>Vue Project with CDN Axios</h1>
       <button @click="fetchData">Fetch Data</button>
       <div v-if="data">
         <pre>{{ data }}</pre>
       </div>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         data: null,
       };
     },
     methods: {
       fetchData() {
         axios
           .get("https://api.example.com/data")
           .then((response) => {
             this.data = response.data;
           })
           .catch((error) => {
             console.error(error);
           });
       },
     },
   };
   </script>
   ```

### 3、配置环境变量

   为了在开发和生产环境中灵活切换 `Axios` 的引入方式，可以使用环境变量。在项目根目录下创建`.env.development`和`.env.production`文件：

   `.env.development`：

   ```js
   VUE_APP_AXIOS_CDN=https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
   ```

   `.env.production`：

   ```js
   VUE_APP_AXIOS_CDN=https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
   ```

   在`public/index.html`中使用环境变量：

   ```html
   <script src="<%= process.env.VUE_APP_AXIOS_CDN %>"></script>
   ```

### 4、使用 Webpack 插件动态引入 CDN

   通过`html-webpack-plugin`插件，可以在构建过程中动态引入 `CDN` 资源。首先，安装插件：

   ```js
   npm install html-webpack-plugin --save-dev
   ```

   然后，在`vue.config.js`中进行配置：

   ```js
   const HtmlWebpackPlugin = require("html-webpack-plugin");

   module.exports = {
     configureWebpack: {
       plugins: [
         new HtmlWebpackPlugin({
           template: "public/index.html",
           cdn: process.env.VUE_APP_AXIOS_CDN,
         }),
       ],
     },
   };
   ```

   在`public/index.html`中使用插件提供的变量：

   ```html
   <script src="<%= htmlWebpackPlugin.options.cdn %>"></script>
   ```

## 四、常见问题及解决方案

### 1、Axios 未定义

   如果在使用 `CDN` 引入 `Axios` 后，控制台报错“ `Axios` 未定义”，可能是因为 `Axios` 的 `CDN` 资源加载失败或加载顺序不正确。确保 `CDN` 链接正确，并在 `Vue` 实例初始化之前加载 `Axios`。

### 2、环境变量未生效

   如果环境变量未生效，检查`.env`文件的命名是否正确，确保以`VUE_APP_`开头，并在`vue.config.js`中正确引用环境变量。

### 3、版本不兼容

   使用 `CDN` 时，注意 `Axios` 版本与项目中其他依赖库的兼容性。尽量选择稳定版本的 `Axios`，避免使用 `beta` 或`alpha` 版本。

## 五、总结

   通过 `CDN` 引入`Axios`，可以显著减少打包体积、提升加载速度、简化项目依赖管理。具体步骤包括在 `HTML` 文件中引入 `Axios` 、在 `Vue` 组件中使用 `Axios`、**配置环境变量**、使用 `Webpack` 插件动态引入 `CDN` 等。遇到常见问题时，可以通过检查 `CDN` 链接、环境变量配置、版本兼容性等方式进行排查和解决。**通过合理使用 CDN 和 Axios，可以提升 Vue 项目的性能和开发效率。**

# data 为什么是一个函数而不是一个对象

   > [!IMPORTANT]
   >
   > `Vue` 组件可能存在多个实例，如果使用对象形式定义 `data`，则会导致它们共用一个 `data` 对象，那么状态变更将会影响所有组件实例，这是不合理的；采用函数形式定义，在 `initData` 时会将其作为工厂函数返回全新 `data` 对象，有效规避多实例之间状态污染问题。而在 `Vue` 根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。

# keep-alive

   如果需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。

   > [!TIP]
   >
   > `keep-alive` 有三个属性：
   >
   > - `include` 字符串或正则表达式，只有名称匹配的组件会被匹配；
   > - `exclude` 字符串或正则表达式，任何名称匹配的组件都不会被缓存；
   > - `max` 数字，最多可以缓存多少组件实例。

   > [!CAUTION]
   >
   > `keep-alive` 包裹动态组件时，会缓存不活动的组件实例。

   **主要流程**

   1. 判断组件 `name` ，不在 `include` 或者在 `exclude` 中，直接返回 `vnode`，说明该组件不被缓存。
   2. 获取组件实例 `key` ，如果有获取实例的 `key`，否则重新生成。
   3. `key` 生成规则，`cid +"::"+ tag` ，仅靠 `cid` 是不够的，因为相同的构造函数可以注册为不同的本地组件。
   4. 如果缓存对象内存在，则直接从缓存对象中获取组件实例给 `vnode` ，不存在则添加到缓存对象中。
   5. 最大缓存数量，当缓存组件数量超过 `max` 值时，清除 `keys` 数组内**第一个组件**。

   **render 函数**

   1. 会在 `keep-alive` 组件内部去写自己的内容，所以可以去获取默认 `slot` 的内容，然后根据这个去获取组件。
   2. `keep-alive` 只对第一个组件有效，所以获取第一个子组件。
   3. 和 `keep-alive` 搭配使用的一般有：动态组件 和 `router-view`。

   > [!TIP]
   >
   > `keep-alive` 具体是通过 `cache` 数组缓存所有组件的 `vnode` 实例。当 `cache` 内原有组件被使用时会将该组件 `key` 从 `keys` 数组中删除，然后 `push` 到 `keys` 数组最后，以便**清除最不常用组件**。

   **实现步骤**

   1. 获取 `keep-alive` 下第一个子组件的实例对象，通过他去获取这个组件的组件名
   2. 通过当前组件名去匹配原来 `include` 和 `exclude`，判断当前组件是否需要缓存，不需要缓存，直接返回当前组件的实例 `vNode`
   3. 需要缓存，判断他当前是否在缓存数组里面：

- 存在，则将他原来位置上的 `key` 给移除，同时将这个组件的 `key` 放到数组最后面（`LRU`）
- 不存在，将组件 `key` 放入数组，然后判断当前 `key` 数组是否超过 `max` 所设置的范围，超过，那么削减未使用时间最长的一个组件的 `key`

   4. 最后将这个组件的 `keepAlive` 设置为 `true`

   **keep-alive 本身的创建过程和 patch 过程**

   缓存渲染的时候，会根据 `vnode.componentInstance`（首次渲染 `vnode.componentInstance` 为 `undefined`） 和 `keepAlive` 属性判断不会执行组件的 `created、mounted` 等钩子函数，而是对缓存的组件执行 `patch` 过程 ∶ 直接把缓存的 `DOM` 对象直接插入到目标元素中，完成了数据更新的情况下的渲染过程。

   **首次渲染**

- 组件的首次渲染 ∶ 判断组件的 `abstract` 属性，才往父组件里面挂载 `DOM`
- 判断当前 `keepAlive` 和 `componentInstance` 是否存在来判断是否要执行组件 `prepatch` 还是执行创建 `componentlnstance`

   `prepatch` 操作就不会在执行组件的 `mounted` 和 `created` 生命周期函数，而是直接将 `DOM` 插入

   > [!TIP]
   >
   > 如果为一个组件包裹了 `keep-alive`，那么它会多出两个生命周期：`deactivated、activated`。同时，`beforeDestroy` 和 `destroyed` 就不会再被触发了，因为组件不会被真正销毁。
   >
   > 当组件被换掉时，会被缓存到内存中、触发 `deactivated` 生命周期；当组件被切回来时，再去缓存里找这个组件、触发 `activated` 钩子函数。

# $nextTick 原理及作用

   `nextTick` 的核心是利用了如 `Promise 、MutationObserver、setImmediate、setTimeout` 的原生 `JavaScript` 方法来模拟对应的微/宏任务的实现，本质是为了利用 `JavaScript` 的这些异步回调任务队列来实现 `Vue` 框架中自己的异步回调队列。

   `nextTick` 不仅是 `Vue` 内部的异步队列的调用方法，同时也允许开发者在实际项目中使用这个方法来满足实际应用中对 `DOM` 更新数据时机的后续逻辑处理。

   在以下情况下，会用到 `nextTick`：

- 在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的 `DOM` 结构的时候，这个操作就需要方法在`nextTick()`的回调函数中。
- 在 `vue` 生命周期中，如果在 `created()` 钩子进行 `DOM` 操作，也一定要放在`nextTick()`的回调函数中。

   > [!IMPORTANT]
   >
   > 因为在 `created()` 钩子函数中，页面的 `DOM` 还未渲染，这时候也没办法操作 `DOM` ，所以，此时如果想要操作 `DOM`，必须将操作的代码放在`nextTick()`的回调函数中。

# Vue2 重新数组方法

   > [!TIP]
   >
   > 重写了数组的原生方法，先获取到数组的 `observer` 监视器对象，如果有新的值，就调用 `observeArray` 对新的值继续观察变化，手动调用 `notify` 通知依赖更新，通知 `watcher`订阅者，执行 `update` 函数。

# Vue template 到 render 的过程

   `vue` 的模版编译过程主要如下：**template -> ast -> render 函数**

   `vue` 在模版编译版本的代码中会执行 `compileToFunctions` 将 `template` 转化为 `render` 函数：

   ```js
   // 将模板编译为render函数
   const { render, staticRenderFns } = compileToFunctions(template,options//省略}, this)
   ```

   `CompileToFunctions` 中的主要逻辑如下 ∶

## 1. 调用 parse 方法将 template 转化为 ast（抽象语法树）

   ```js
   const ast = parse(template.trim(), options);
   ```

- **parse 的目标**：把 `tamplate` 转换为 `AST` 树，它是一种用 `JavaScript` 对象的形式来描述整个模板。
- **解析过程**：利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的 回调函数，来达到构造 `AST` 树的目的。

   > [!TIP]
   >
   > `AST` 元素节点总共三种类型：`type` 为 `1` 表示普通元素、`2` 为表达式、`3` 为纯文本。

## 2. **对静态节点做优化**

   ```js
   optimize(ast, options);
   ```

   这个过程主要分析出哪些是静态节点，给其打一个标记，为后续更新渲染可以直接跳过静态节点做优化。

   深度遍历 `AST`，查看每个子树的节点元素是否为静态节点或者静态节点根。如果为静态节点，他们生成的 `DOM` 永远不会改变，这对运行时模板更新起到了极大的优化作用。

## 3. 生成代码

   ```js
   const code = generate(ast, options);
   ```

   `generate` 将 `ast` 抽象语法树编译成 `render` 字符串并将静态部分放到 `staticRenderFns` 中，最后通过 `new Function(render)` 生成 `render` 函数。

# Vue 是如何收集依赖的

   `Vue` 的依赖收集机制主要基于 `Observer`、`Watcher` 和 `Dep` 三个类。

   1. `Observer` 模式用于将数据对象的所有属性转换为响应式属性。每个响应式属性都会被包装成一个 `Dep` 对象，用于追踪依赖。
   2. `Watcher` 类用于监听数据的变化，并在数据变化时执行相应的更新操作。每个组件实例和计算属性都会创建一个或多个 `Watcher` 实例。
   3. `Dep` 类用于管理依赖关系。每个响应式属性都有一个 `Dep` 实例，用于存储相关的 `Watcher` 实例。
   4. 依赖收集过程

      > [!TIP]
      >
      > 1. **初始化**：当 Vue 实例创建时，会调用 `observe` 函数将数据对象转换为响应式对象。
      > 2. **数据访问**：当组件首次渲染时，会访问数据属性。在访问属性时，`Object.defineProperty` 的 `get` 方法会被调用。
      > 3. **收集依赖**：在 `get` 方法中，`Dep.target` 会被设置为当前的 `Watcher` 实例，然后调用 `dep.depend()` 将 `Watcher` 添加到 `Dep` 的订阅列表中。
      > 4. **数据变更**：当数据属性发生变化时，`Object.defineProperty` 的 `set` 方法会被调用。
      > 5. **通知更新**：在 `set` 方法中，调用 `dep.notify()` 通知所有订阅的 `Watcher` 实例，这些 `Watcher` 实例会调用 `update` 方法更新视图。

# delete 和 Vue.delete 的区别

   > [!IMPORTANT]
   >
   > `delete` 和 `Vue.delete` 都是对数组或对象的删除。这两种方法对于**对象**来说没有区别，直接删除对象的属性；但是对于数组来说有区别。`delete` 只是被删除的元素变成了 `empty/undefined` 其他的元素的键值还是不变，数组长度也不变。 `Vue.delete` 是直接删除该元素，长度发生变化。

# vm.$set 的实现原理

   > [!IMPORTANT]
   >
   > - 如果目标是**数组**，直接使用数组的 `splice` 方法触发响应式；
   > - 如果目标是**对象**，会先判断属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 `defineReactive` 方法进行响应式处理（ `defineReactive` 方法就是 `Vue` 在初始化对象时，给对象属性采用 `Object.defineProperty` 动态添加 `getter` 和 `setter` 的功能所调用的方法。）

# Vue-router 跳转和 location.href 有什么区别

   > [!IMPORTANT]
   >
   > `vue-router` 使用 `pushState` 更新路由，不会刷新页面；`location.href` 会触发浏览器，页面刷新；
   > `vue-router` 是路由跳转或同一个页面跳转；`location.href` 是不同页面间跳转；
   > `vue-router` 是异步加载 `this.$nextTick(()=>{获取url});` `location.href` 是同步加载。

# Vuex

## Vuex 核心流程

   > [!TIP]
   >
   > - `vue`组件会触发（`dispatch`）一些事件或动作，也就是图中的 `Actions`;
   > - 在组件中发出的动作，肯定是想获取或者改变数据的，但是在 `vuex` 中，数据是集中管理的，不能直接去更改数据，所以会把这个动作提交（`Commit`）到 `Mutations` 中;
   > - 然后 `Mutations` 就去改变（`Mutate`）`State` 中的数据;
   > - 当 `State` 中的数据被改变之后，就会重新渲染（`Render`）到 `Vue Components` 中去，组件展示更新后的数据，完成一个流程。

## Vuex 有哪几种属性

   > [!IMPORTANT]
   >
   > 有五种，分别是 `State、 Getter、Mutation 、Action、 Module`
   >
   > - `state` => 基本数据(数据源存放地)
   > - `getters` => 从基本数据派生出来的数据
   > - `mutations` => 提交更改数据的方法，同步
   > - `actions` => 像一个装饰器，包裹 `mutations`，使之可以异步。
   > - `modules` => 模块化 `Vuex`

## 为什么 Vuex 的 mutation 中不能做异步操作

   > [!TIP]
   >
   > - `Vuex` 中所有的状态更新的唯一途径都是 `mutation`，异步操作通过 `Action` 来提交 `mutation` 实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。
   > - 每个 `mutation` 执行完成后都会对应到一个新的状态变更，这样 `devtools` 就可以打个快照存下来，然后就可以实现 `time-travel` 了。如果 `mutation` 支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

## Vuex 的严格模式是什么,有什么作用，如何开启？

   在严格模式下，无论何时发生了状态变更且不是由 `mutation` 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

   在 `Vuex.Store` 构造器选项中开启,如下

   ```js
   const store = new Vuex.Store({
     strict: true,
   });
   ```

## Vuex 和 localStorage 的区别

   **1）最重要的区别**

- vuex 存储在**内存**中
- **localstorage 则以文件的方式存储在本地，只能存储字符串类型的数据，存储对象需要 JSON 的 stringify 和 parse 方法进行处理。 读取内存比读取硬盘速度要快**

   **（2）应用场景**

- **Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex 用于组件之间的传值。**
- **localstorage 是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用 。**
- **Vuex 能做到数据的响应式，localstorage 不能**

   **（3）永久性**

- **刷新页面时 vuex 存储的值会丢失，localstorage 不会。**

   > [!TIP]
   >
   > 注意：**对于不变的数据确实可以**用 `localstorage` 可以代替 `vuex`，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，`localstorage` 无法做到。

## Vuex 和 Redux 区别与联系

   共同思想：

   1. **单一数据源**：均采用集中式存储（`Store`）管理全局状态
   2. **可预测性**：通过强制状态变更的规范化操作实现可追踪调试

   区别：

   1. 框架依赖

      - **Vuex**：这是专门为 `Vue.js` 框架设计的状态管理库。如果你正在使用 Vue.js，Vuex 将更容易集成和使用。
      - **Redux**：它是一个**纯 JavaScript 库**，不是针对任何特定的框架或库。因此，它可以与任何框架（如 React、Angular 等）一起使用，或者独立使用。

   2. 状态管理

      - Vuex：使用**状态（state）、getters、mutations 和 actions**来管理状态。`mutations` 用于更改状态，而 `actions` 可以包含异步操作。
      - Redux：使用**状态（state）、reducer 和 action**来管理状态。`Reducer` 是一个纯函数，根据接收的 `action` 来更改`state`。

   3. 数据流

      - Vuex：虽然 `Vuex` 也使用单向数据流，但它与 Vue.js 的响应式系统紧密集成，当状态更改时，视图会自动更新。
      - Redux：`Redux` 也使用单向数据流，但需要通过额外的库（如 `React-Redux`）与 `React` 等框架集成，以实现视图的自动更新。

   4. 数据不变性

      - Vuex：`Vuex` 中的数据是可变的，直接修改状态是允许的。
      - Redux：`Redux` 强调数据的不变性。当状态需要更改时，会创建一个新的状态对象，而不是直接修改原始状态。这有助于跟踪状态的更改，并可以在开发工具中进行时间旅行（time-travel）调试。

   5. 中间件和扩展

      - Vuex：`Vuex` 本身没有提供中间件或扩展机制，但可以通过插件来扩展其功能。
      - Redux：`Redux` 有一个强大的中间件系统，允许开发者通过中间件来扩展 `Redux` 的功能，如异步操作、日志记录、错误处理等。

   6. 异步操作

      - Vuex：在 `actions` 中可以处理异步操作，但通常需要结合其他库（如 `axios`）来实现。
      - Redux：`Redux` 的异步操作通常通过中间件（如 `redux-thunk` 或 `redux-saga`）来处理。

# Vue 中的 key 有什么作用？

> [!IMPORTANT]
>
> 在 `Vue` 中，`key` 属性具有多种作用，它主要用于给 `v-for` 指令渲染的元素或组件添加唯一标识。

主要作用：

1. 提供元素或组件的稳定标识：在每次迭代中，`key` 值必须是唯一且稳定的，它用于识别每个节点的身份。当使用 `v-for` 迭代列表数据时，`Vue` 使用 `key` 来跟踪每个节点的变化。以便高效地更新 `DOM`。
2. 优化虚拟 `DOM` 的 `diff` 算法：`Vue` 通过比较新旧虚拟 `DOM` 树的节点， 找到差异并进行最小化的 `DOM` 操作。使用 `key` 可以帮助 `Vue` 更准确地判断节点的变化情况，从而减少不必要的 `DOM` 操作。这有助于提高应用的性能。
3. 维持组件状态：当使用 `key` 重新排列具有状态的子组件时，`Vue` 会尝试尽可能地复用这些子组件，而不是销毁和重新创建它们。这可以确保组件的状态得以保留，而不会因为重新排列而丢失。

此外，`key` 还可以在特定的场景下强制重新渲染某个组件或元素。例如，当某个组件的数据依赖于外部环境的变化时，可以通过 `key` 来使该组件在每次更新时都重新渲染，从而确保其数据的正确性。
总的来说，`key` 属性在 `Vue` 中扮演了重要的角色，它有助于优化页面性能，确保数据渲染的正确性，并提供了组件状态管理的灵活性。在使用时，需要确保 `key` 值的唯一性，并避免直接修改数据源。
