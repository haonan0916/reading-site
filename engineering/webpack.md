# Webpack 构建流程

`Webpack` 的运⾏流程是⼀个串⾏的过程，从启动到结束会依次执⾏以下流程：

1. 初始化参数：从配置⽂件和 `Shell` 语句中读取与合并参数，得出最终的参数；
2. 开始编译：⽤上⼀步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执⾏对象的 `run` ⽅法开始执⾏编译；
3. 确定⼊⼝：根据配置中的 `entry` 找出所有的⼊⼝⽂件；
4. 编译模块：从⼊⼝⽂件出发，调⽤所有配置的 `Loader` 对模块进⾏翻译，再找出该模块依赖的模块，再递归本步骤直到所有⼊⼝依赖的⽂件都经过了本步骤的处理；
5. 完成模块编译：在经过第`4`步使⽤ `Loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。

在以上过程中，`Webpack` 会在特定的时间点⼴播出特定的事件，插件在监听到感兴趣的事件后会执⾏特定的逻辑，并且插件可以调⽤ `Webpack` 提供的 `API` 改变 `Webpack` 的运⾏结果。

# Webpack 热更新（HMR）原理

> [!IMPORTANT]
> `HMR` 的核心思想是通过 `Webpack Dev Server` 启动一个 `WebSocket` 连接，监听代码变化，当文件发生改变时，`Webpack` 会把变动的模块推送到浏览器，然后只更新那些模块。

具体流程如下：

1. 监听文件变化：`Webpack Dev Server` 会监控文件系统上的变化。
2. 编译并打包模块：当文件发生变化时，`Webpack` 会重新打包，只编译被修改的模块。
3. 推送变更到客户端：`Webpack` 会通过 `WebSocket` 将更新推送到浏览器。
4. 替换模块：浏览器接收到更新后，会执行相应的 `HMR` 逻辑，动态替换对应模块。

## 如何在 Webpack 中配置 HMR

1. 在 `webpack.config.js` 中配置 `Dev Server` 和 `HMR`：

```js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 你的入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true, // 启用 HMR
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
```

2. 配置 `Webpack Dev Server` 启用 `HMR`
要启用 `HMR`，我们需要在 `Webpack Dev Server` 中设置 `hot: true`，如上面的配置所示。这样 `Webpack` 就会启用热模块替换，监听代码变化并进行更新。

在 `package.json` 中配置启动命令：

```json
"scripts": {
  "start": "webpack serve --mode development --hot"
}
```

# Loader 和 Plugin

## 不同点

不同的作用：

- `Loader` 直译为"加载器"。`Webpack` 将**⼀切⽂件视为模块**，但是 `webpack` 原⽣是**只能解析** `js` ⽂件，如果想将其他⽂件也打包的话，就会⽤到 `loader`。 所以`Loader` 的作⽤是让 `webpack` 拥有了加载和解析⾮ `JavaScript` ⽂件的能⼒。
- `Plugin` 直译为"插件"。`Plugin` 可以扩展 `webpack` 的功能，让 `webpack` 具有更多的灵活性。 在 `Webpack` 运⾏的⽣命周期中会⼴播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果。

不同的⽤法:

- `Loader` 在 `module.rules` 中配置，也就是说他作为模块的解析规则⽽存在。 类型为数组，每⼀项都是⼀个 `Object`，⾥⾯描述了对于什么类型的⽂件（ `test` ），使⽤什么加载( `loader` )和使⽤的参数（ `options` ）
- `Plugin` 在 `plugins` 中单独配置。 类型为数组，每⼀项是⼀个 `plugin` 的**实例**，参数都通过构造函数传⼊。

## 常见的 Loader

1. 转换脚本语言：
**babel-loader**：把 `ES6` 转换成 `ES5`
2. 转换样式：
**css-loader**：加载 `CSS`，支持模块化、压缩、文件导入等特性
**style-loader**：把 `CSS` 代码注⼊到 `JavaScript` 中，通过 `DOM` 操作去加载 `CSS`
**sass-loader**：把 `SCSS/SASS` 代码转换成 `CSS`
**less-loader**：把 `Less` 代码转换成 `CSS` 代码。
3. 检查代码：
**eslint-loader**：通过 `ESLint` 检查 `JavaScript` 代码
4. 加载文件：
**file-loader**：把文件输出到一个文件夹中，在代码中通过相对 `URL` 去引用输出的文件
**image-loader**：加载并且压缩图片文件
**json-loader**：加载 `JSON` 文件。

## 常见的 Plugin

- **define-plugin**：定义环境变量
- **html-webpack-plugin**：简化`html`⽂件创建
- **uglifyjs-webpack-plugin**：通过 `UglifyES` 压缩 `ES6` 代码
- **webpack-parallel-uglify-plugin**: 多核压缩，提⾼压缩速度
- **webpack-bundle-analyzer**: 可视化 `webpack` 输出⽂件的体积
- **mini-css-extract-plugin**: `CSS` 提取到单独的⽂件中，⽀持按需加载

## 编写 Loader 或 Plugin 的思路

编写 `Loader` 时要遵循单⼀原则，每个 `Loader` 只做⼀种"转义"⼯作。 每个 `Loader` 的拿到的是源⽂件内容（`source`），可以通过返回值的⽅式将处理后的内容输出，也可以调⽤ `this.callback()` ⽅法，将内容返回给 `webpack`。 还可以通过 `this.async()` ⽣成⼀个 `callback` 函数，再⽤这个`callback` 将处理后的内容输出出去。 此外 `webpack` 还为开发者准备了开发 `loader` 的⼯具函数集—— `loader-utils`。

相对于 `Loader` ⽽⾔，`Plugin` 的编写就灵活了许多。 `webpack` 在运⾏的⽣命周期中会⼴播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果。

# 如何⽤webpack来优化前端性能？

⽤ `webpack` 优化前端性能是指优化 `webpack` 的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- 压缩代码：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤ `webpack` 的 `UglifyJsPlugin` 和 `ParallelUglifyPlugin` 来压缩 `JS` ⽂件， 利⽤ `cssnano （css-loader?minimize）`来压缩 `css`
- 利⽤CDN加速: 在构建过程中，将引⽤的静态资源路径修改为 `CDN` 上对应的路径。可以利⽤ `webpack` 对于 `output` 参数和各`loader` 的 `publicPath` 参数来修改资源路径
- Tree Shaking: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动 `webpack` 时追加参数 `--optimize-minimize` 来实现
- Code Splitting: 将代码按路由维度或者组件分块(`chunk`),这样做到按需加载,同时可以充分利⽤浏览器缓存
- 提取公共第三⽅库: `SplitChunksPlugin` 插件来进⾏公共模块抽取,利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码

# 如何提⾼webpack的构建速度？

1. 多⼊⼝情况下，使⽤ `CommonsChunkPlugin` 来提取公共代码
2. 通过 `externals` 配置来提取常⽤库
3. 利⽤ `DllPlugin` 和 `DllReferencePlugin` 预编译资源模块 通过 `DllPlugin` 来对那些我们引⽤但是绝对不会修改的`npm`包来进⾏预编译，再通过 `DllReferencePlugin` 将预编译的模块加载进来。
4. 使⽤ `Happypack` 实现多线程加速编译
5. 使⽤ `webpack-uglify-parallel` 来提升 `uglifyPlugin` 的压缩速度。 原理上 `webpack-uglify-parallel` 采⽤了多核并⾏压缩来提升压缩速度
6. 使⽤ `Tree-shaking` 和 `Scope Hoisting` 来剔除多余代码

# 如何提⾼webpack的打包速度?

- happypack: 利⽤进程并⾏编译 `loader`,利⽤缓存来使得 `rebuild` 更快,遗憾的是作者表示已经不会继续开发此项⽬,类似的替代者是 `thread-loader`
- 外部扩展(externals): 将不怎么需要更新的第三⽅库脱离 `webpack` 打包，不被打⼊ `bundle` 中，从⽽减少打包时间，⽐如`jQuery` ⽤ `script` 标签引⼊
- dll: 采⽤ `webpack` 的 `DllPlugin` 和 `DllReferencePlugin` 引⼊ `dll`，让⼀些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
- 利⽤缓存: `webpack.cache 、babel-loader.cacheDirectory、 HappyPack.cache` 都可以利⽤缓存提⾼ `rebuild` 效率缩⼩⽂件搜索范围: ⽐如`babel-loader` 插件,如果你的⽂件仅存在于 `src` 中,那么可以 `include`: `path.resolve(__dirname,'src')` ,当然绝⼤多数情况下这种操作的提升有限，除⾮不⼩⼼ `build` 了`node_modules` ⽂件
