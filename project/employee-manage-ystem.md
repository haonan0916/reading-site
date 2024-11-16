```
接口地址：http://doc.xuexiluxian.cn/
账号：testapi
密码：123456
```



```
后台管理系统用户名 +  密码
admin
abc123456
```



# 一、创建项目

	1.2 官网网址：https://evite.netlify.app/ 
	
	1.3 安装步骤
	
		npx degit alex8088/electron-vite-boilerplate electron-app
		cd electron-app
	
		npm install
		npm run dev

vue版本：vue3

构建工具：vite

框架类型：Electron

JS语法：TypeScript



# 二、安装路由 和 路由二次封装

2.1 安装路由：npm install vue-router -S

	1. 新建：router/index.ts
	
	2. router/index.ts写入内容
	
		import { createRouter, createWebHashHistory } from "vue-router";
		export default createRouter({
			history: createWebHashHistory(),//hash模式
		    routes:[{ path: "/", component: Login }]//路由配置规则数组
		})
	
	3. main.ts中use一下router
	
		use(router)
		
	4. 创建对应路由的.vue文件

2.2 路由二次封装

疑问：为什么路由二次封装？

解答：router文件中在写项目中包含：路由表、导航守卫等等内容，假设路由表特别多 或 导航守卫内容特别多，代码则很难维护和阅读，所以二次封装路由是为了方便后期维护和管理。

操作流程：

```
1. index.ts
  import { createRouter, createWebHashHistory } from "vue-router";
  import { AppRoutes } from '@router/routes'
  import {  beforeEach  , afterEach  } from '@router/guards'

  const AppRouter = createRouter({
      history: createWebHashHistory(),
      routes:AppRoutes
  })

  AppRouter.beforeEach(beforeEach)
  AppRouter.afterEach(afterEach)

  export default AppRouter;

2. 新建routes.ts ： 放入路由表
	export const AppRoutes = [
      { 
          path: "/",
          name:'layout',
          component: ()=>import('@layout/index.vue') 
      },
      { 
          path: "/login", 
          name:'登录',
          component: ()=>import('@views/login/Login.vue')
      },
  ];

3. 新建guards.ts ：放入导航守卫
	//全局前置导航守卫
	export const beforeEach = async ( to )=>{
		//...
	}
	//全局后置导航守卫
  export const afterEach = ()=>{
		//...
  }

```



# 三、安装store（pinia） 和  持久化存储

3.1 下载安装

```
npm install pinia -S
```

3.2 main.ts引入

```
import { createPinia } from 'pinia'
app.use(createPinia())
```

3.3 新建目录：store/index.ts

```
import { defineStore } from 'pinia'
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
    }
  },
  getters:{},
  actions:{}
})
```

3.4 Vuex和Pinia的区别

Vuex和pinia的区别有很多，例如：pinia没有mutations和modules，那么vuex的modules是为了区分和管理小store模块的内容，但是pinia没有modules所以无法直接管理，但是为了项目可能store比较多，为了更好的管理store可以模拟实现来完成。

3.5 增加全局store

```
修改：index.ts
内容为：store/index.ts主要引入其他store  //模拟实现vuex的modules
```

3.6 持久化存储

```
下载安装：npm install pinia-plugin-persist
```

```
//main.ts

//状态管理
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)

app.use( store );
```

```
//useUserStore.ts

import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
    state: () => {
        return {
        }
    },
    getters:{},
    actions:{},
    persist: {
      enabled: true, //开启数据缓存
      strategies: [
        {
          storage: localStorage,//默认走session
          paths: ['rolePerm', 'permissions']
        }
      ]
    }
})
```



# 四、路径别名

配置文件：electron.vite.config.ts

```
export default defineConfig({
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        //增加路径别名
      }
    },
    plugins: [vue()]
  }
})
```



# 五、配置代理 和 请求二次封装

5.1 配置代理 ：electron.vite.config.ts

```
export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      }
    },
    server:{
      "proxy":{
        "/api":{
          target:'http://uat.crm.xuexiluxian.cn',
          changeOrigin:true,
          rewrite: path =>  path.replace(/^\/api/,'')
        }
      }
    }
  }
})
```

5.2 请求二次封装：utils/request.ts

先下载axios：npm install axios

```
import axios from 'axios';

const request = axios.create({
    baseURL: '/api'
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request;
```

##### 后面课程中，会单独分装get和post。

5.3 api文件管理

新建：api/login.ts

```
import request from "@utils/request";

//用户登录
export const loginByJson = ( data )=>{
    return request({
    	url:'/u/loginByJson',
    	method:'请求方式'
			//...
    })
}
```



# 六、安装使用Element Plus

6.1 安装

```
npm install element-plus --save
```

6.2 按需导入

```
npm install -D unplugin-vue-components unplugin-auto-import
```

6.3 electron.vite.config.ts

```
//element
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      }
    },
    server:{
      "proxy":{
        "/api":{
          target:'http://uat.crm.xuexiluxian.cn',
          changeOrigin:true,
          rewrite: path =>  path.replace(/^\/api/,'')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ]
  }
})
```



# 七、登录页布局

7.1 左侧布局

```
<template>
    <div class="login_bg">
        <!--左边-->
        <div class="login_adv">
            <div class="login_adv__title">
                <h2>小鹿线</h2>
                <h4>客户关系管理系统</h4>
                <p>让业务在线更高效，加速企业数字化升级。</p>
            </div>
            <div class="login_adv__mask"></div>
            <div class="login_adv__imgage">
                <img src="../assets/images/data.png" width="100%">
            </div>
            <div class="login_adv__bottom">
                © 小鹿线客户管理系统 1.0.11
            </div>
        </div>
    </div>
</template>

<style scoped>
.login_bg {
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
}
.login_adv {
    background-image: url('../assets/images/auth_banner.jpg');
    width: 40%;
    position: relative;
}
.login_adv__title {
  color: #fff;
  padding: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
}
.login_adv__title h2 {
  font-size: 40px;
}

.login_adv__title h4 {
  font-size: 18px;
  margin-top: 10px;
  font-weight: normal;
}

.login_adv__title p {
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
}

.login_adv__title div {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.login_adv__imgage{
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 80px;
  padding: 40px;
  z-index: 3;
}

.login_adv__imgage img{
  width: 100%;
}

.login_adv__bottom {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  color: #fff;
  padding: 0 40px 40px 40px;
  background-image: linear-gradient(transparent, #000);
  z-index: 3;
}

.login_adv__mask {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
```

7.2 右侧布局

```
<template>
    <div class="login">
        <!--左侧-->
        <div class="login_adv">
            <div class="login_adv_title">
                <h2>小鹿线</h2>
                <h4>客户关系管理系统</h4>
                <p>让业务在线更高效，加速企业数字化升级。</p>
            </div>
            <div class="login_adv_mask"></div>

            <div class="login_adv_imgage">
                <img src="../assets/images/data.png" width="100%">
            </div>
            <div class="login_adv_bottom">
                © 小鹿线客户管理系统 1.0.11
            </div>
        </div>
        <!--右侧-->
        <div class="login-main">
            <div class="login-form">

                <div class="login-header">
                    <div class="login-img">
                        <img src="../assets/images/logo.png" alt="">
                        <label>小鹿线客户管理系统</label>
                    </div>
                </div>
                <el-tabs>
                    <el-tab-pane label="账号登录" lazy>User</el-tab-pane>
                    <el-tab-pane label="手机号登录" lazy>Config</el-tab-pane>
                </el-tabs>
                <template v-if='true'>
                    <el-divider>其他登录方式</el-divider>
                    <div class="login-oauth">
                        <!--微信按钮-->
                        <el-button type="success" circle  size="large">
                            <el-icon size="large">
                               <ChatDotRound />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login{
    width:100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
}
.login_adv{
    background: url('../assets/images/auth_banner.jpg') no-repeat;
    width:40%;
    position: relative;
}
.login_adv_title{
    position: absolute;
    top:0;
    left:0;
    right:0;
    z-index: 2;
    padding:40px;
    color:#fff;
}
.login_adv_title h2{
    font-size: 40px;
}
.login_adv_title h4{
    font-size: 18px;
    margin-top: 10px;
}
.login_adv_title p{
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.8;
    color: rgb(255,255,255,.6);
}
.login_adv_imgage{
    position: absolute;
    left:0px;
    right:0px;
    bottom:80px;
    padding:40px;
    z-index: 3;
}
.login_adv_imgage img{
    width: 100%;
    height: 100%;
}
.login_adv_bottom{
    position: absolute;
    left:0px;
    right:0px;
    bottom:0px;
    color:#fff;
    padding:0 40px 40px 40px;
}
.login_adv_mask{
    position: absolute;
    left:0px;
    top:0px;
    right:0px;
    bottom:0px;
    background:rgba(0, 0, 0,.5);
    z-index: 1;
}

.login-main{
    flex:1;
    display: flex;
    overflow: auto;
}
.login-form{
    width:400px;
    margin: auto;
    padding:80px 0 0 0;
}
.login-header{
    margin-bottom: 40px;
}
.login-header .login-img{
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-header .login-img img{
    width:40px;
    height: 40px;
    vertical-align: bottom;
    margin-right:10px;
}
.login-header .login-img label{
    font-size:26px;
    font-weight: bold;
}
.login-oauth{
    display: flex;
    justify-content: space-around;
}
</style>
```

7.3 下载引入icon

安装

```
npm install @element-plus/icons-vue
```

main.ts引入

```
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
```



# 八、账号登录

8.1 布局 + 逻辑

```
<template>
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="0" size="large">
     
        <el-form-item prop="username">
        <el-input v-model="form.username" prefix-icon="user" clearable placeholder="请输入">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="form.password" prefix-icon="lock" clearable show-password placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="boxCode">
          <el-input v-model="form.captcha" prefix-icon="CircleCheck" clearable placeholder="请输入验证码" ></el-input>
          <el-image :src="captchaUrl" @click="getImage" class="code"></el-image>
        </div>
       
      </el-form-item>
  
      <div class="rememberMe">
        <div>
          <el-checkbox label="记住密码" />
        </div>
        <div>
          <router-link to="/reset_password">忘记密码？</router-link>
        </div>
      </div>
  
      <el-form-item>
        <el-button type="primary" style="width: 100%;" round @click="login(ruleFormRef)">登录</el-button>
      </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import {  reactive , ref , onBeforeMount } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { captchaImage , loginByJson } from '@api/login'
import { Encrypt } from '@utils/aes'
import { RuleForm } from '../types/login'

let captchaUrl = ref<string>('');

const ruleFormRef = ref<FormInstance>()

const form = reactive<RuleForm>({
    username: "",
    password: "",
    captcha: "",
    key: ''    
})

const rules =reactive<FormRules<RuleForm>>({
    username: [
        {required: true, message: '正确用户名', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '正确密码', trigger: 'blur'}
    ]
})

let getImage = async ()=>{
    const key = new Date().getTime().toString();
    form.key = key;
    const res = await captchaImage({ key })
    let blob = new Blob([res],{type:'application/vnd.ms-excel'});
    let imgUrl = URL.createObjectURL( blob );
    captchaUrl.value = imgUrl;
}

onBeforeMount(()=>{
    getImage();
})

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid:boolean) => {
    if (valid) {
        let res = await loginByJson({
            username:Encrypt(form.username),
            password:Encrypt(form.password),
            key:form.key,
            captcha:form.captcha
        });
        if( res.code != "200" ){
            return ElMessage.error(res.msg)
        }
    } else {
        return ElMessage.warning('请填写正确内容')
    }
    return;
  })
}
</script>

<style scoped>
  .boxCode{
    display: flex;
    align-items: center;
    width: 100%;
  }
  .code{
    margin-left: 10px;
    height: 40px;
    width: 100px;
    cursor: pointer;
  }
  .rememberMe{
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
 </style>
```

8.2 解决的问题

```
1. 验证码报错的问题，需要注释掉index.html中的meta
2. element-plus的message样式不生效需要在main.ts加入：import 'element-plus/theme-chalk/index.css'
3. 加密使用：aes
4. 新建types文件，其内容全部为interface内容
```



# 九、手机号 验证码登录

9.1 布局

```
<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="0"
        size="large"
    >

        <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" prefix-icon="iphone" clearable placeholder="请输入手机号">
                <template #prepend>+86</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
            <div class="login-msg-yzm">
                <el-input v-model="ruleForm.captcha" prefix-icon="unlock" clearable placeholder="请输入验证码"></el-input>
                <el-button :disabled="disabled">获取验证码<span v-if="disabled">({{ time }})</span></el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="width: 100%;" round :loading='isLogin'>登录</el-button>
        </el-form-item>

        <el-form-item>
           <router-link to="">忘记密码?</router-link>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { PhoneRuleForm } from '@interface/login'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<PhoneRuleForm>({
    mobile: '',
    captcha: ''
})
const rules = reactive<FormRules<PhoneRuleForm>>({
    mobile: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})
const time = ref<number>(60);
const disabled = ref<boolean>(false);
const isLogin = ref<boolean>(false);
</script>

<style scoped>
.login-msg-yzm{
    display: flex;
    width: 100%;
}
.login-msg-yzm .el-button{
    margin-left:10px;
}
</style>
```

9.2 布局 + 逻辑

```
<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="0"
        size="large"
    >
        <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" prefix-icon="iphone" clearable placeholder="请输入手机号">
                <template #prepend>+86</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
            <div class="login-msg-yzm">
                <el-input v-model="ruleForm.captcha" prefix-icon="unlock" clearable placeholder="请输入验证码"></el-input>
                <el-button @click="getCode" :disabled="disabled">获取验证码<span v-if="disabled">({{ time }})</span></el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button @click='login(ruleFormRef)' type="primary" style="width: 100%;" round :loading='isLogin'>登录</el-button>
        </el-form-item>

        <el-form-item>
           <router-link to="">忘记密码?</router-link>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { PhoneRuleForm } from '@interface/login'
import { loginCaptcha , loginByMobile } from '@api/login'
import { Encrypt } from '@utils/aes'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<PhoneRuleForm>({
    mobile: '',
    captcha: ''
})
const validatorTel = (rule: any, value: string, callback: any) => {
    if( value === ''){
        callback( new Error('请填写手机号') );
    }else if( !/^1[3456789]\d{9}$/.test( value ) ){
        callback( new Error('请填写正确手机号') );
    }else{
        callback();
    }
}
const rules = reactive<FormRules<PhoneRuleForm>>({
    mobile: [
        { validator:validatorTel, trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})
const time = ref<number>(60);
const disabled = ref<boolean>(false);
const isLogin = ref<boolean>(false);

//获取验证码
const getCode = async ()=>{
    let validate = await ruleFormRef.value?.validateField('mobile', () => null);
    if( !validate ){
        return ElMessage.error('请填写正确的手机号');
    }
    
    let res = await loginCaptcha({
        mobile:Encrypt( ruleForm.mobile )
    })

    if(  res.code != '200') return ElMessage.error(res.msg);
   
    ElMessage.success('发送成功');
    
    disabled.value = true;
    time.value = 60;
    let timer = setInterval(()=>{
        time.value -= 1;
        if( time.value < 1 ){
            clearInterval( timer );
            disabled.value = false;
            time.value = 0;
        }
    },1000)

    return ;
}
//登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
        let res = await loginByMobile({
            mobile:Encrypt( ruleForm.mobile ),
            captcha:Encrypt( ruleForm.captcha )
        })
        
        if( res.code !='200') return ElMessage.error(res.msg);
        
    } else {
        return ElMessage.warning('请填写正确内容');
    }

    return ;
  })
}
</script>

<style scoped>
.login-msg-yzm{
    display: flex;
    width: 100%;
}
.login-msg-yzm .el-button{
    margin-left:10px;
}
</style>
```



# 十、Electron窗口调整

##### 10.1 【默认】有标题栏，有标题

![image-20231213004858777](/Users/zhangpang/Library/Application Support/typora-user-images/image-20231213004858777.png)



##### 10.2 有标题栏，无标题

![image-20231213005038488](/Users/zhangpang/Library/Application Support/typora-user-images/image-20231213005038488.png)

***有系统自带按钮

主进程设置：

```
const mainWindow = new BrowserWindow({
    ...
    titleBarStyle: 'hidden',//隐藏标题
    titleBarOverlay: {
      color: '#ffffff',
      symbolColor: '#74b1be'
    },
    ...
})
```

问题：窗口就无法拖拽了，解决方案为：渲染进程添加样式

```
<style>
div {
    -webkit-app-region: drag;
}
</style>
```

##### 10.3 无标题栏，无标题

![image-20231213005131738](/Users/zhangpang/Library/Application Support/typora-user-images/image-20231213005131738.png)

主进程：

```
const mainWindow = new BrowserWindow({
 		...
    frame: false,//无边框窗口
    ...
})
```

问题：窗口无法拖拽，解决方案：渲染进程通信主进程，采用拖拽的形式完成

```
<div class="button" @mousedown="mousedown"></div>

<script>
import { ref } from 'vue';

let isKeyDown = ref<boolean>(false);
let dinatesX = ref<number>(0);
let dinatesY = ref<number>(0);

const mousedown = ( event )=>{
    isKeyDown.value = true;
    dinatesX.value = event.x;
    dinatesY.value = event.y;

    document.onmousemove = (ev) => {
        if(isKeyDown.value ){
            const x = ev.screenX - dinatesX.value;
            const y = ev.screenY - dinatesY.value;
            //给主进程传入坐标
            let data = {
                appX:x,
                appY:y
            }
            electron.ipcRenderer.invoke('custom-adsorption',data);
        }
    };
    document.onmouseup = () => {
        isKeyDown.value = false
    };
}
</script>
```

主进程：

```
ipcMain.handle('custom-adsorption',(event,res) => {
    let x = res.appX;
    let y = res.appY;
    mainWindow.setPosition( x , y )
})
```



# 十一、窗口按钮-关闭软件

![image-20231214005107900](/Users/zhangpang/Library/Application Support/typora-user-images/image-20231214005107900.png)

##### 11.1 布局

```
<div class="login-config">
  <div class="login-config-btn">
  	<el-button icon="close" circle type="default"></el-button>
  </div>
</div>
```

```
.login-config{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 9999;
}
.login-config-btn{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    margin: 10px 10px 0 0;
    float: right;
}
```

##### 11.2 关闭窗口

```
close 	方法用于关闭窗口，可以通过监听 close 事件来执行一些自定义操作，并有机会取消关闭操作。
destroy 方法用于彻底销毁一个窗口，不会触发 close 事件，并立即释放与窗口相关的所有资源。
```

##### 11.3 关闭软件

```
app.quit() 方法用于退出整个 Electron 应用程序，可以通过监听 before-quit 事件来执行一些预处理操作。
app.exit() 方法用于立即终止整个 Electron 应用程序的进程，不会触发任何事件。
```



# 十二、窗口按钮-换肤

##### 12.1 布局

```
<el-button circle @click='configDark'>
  <el-icon v-if='dark'><Sunny /></el-icon>
  <el-icon v-else><Moon /></el-icon> 
</el-button>
```

##### 12.2 添加scss文件

```
//App.vue

<style lang='scss'>
@import './assets/css/style.scss';
</style>
```

```
//style.scss

@import 'node_modules/element-plus/theme-chalk/src/dark/css-vars.scss';
*{margin: 0;padding:0;}
a{
  text-decoration: none;
  color:#333;
}
html.dark {
	//变量
	--el-text-color-primary: #d0d0d0;
	--el-color-primary-dark-2: var(--el-color-primary-light-2) !important;
	--el-color-primary-light-9: var(--el-color-primary-dark-8) !important;
	--el-color-primary-light-8: var(--el-color-primary-dark-7) !important;
	--el-color-primary-light-7: var(--el-color-primary-dark-6) !important;
	--el-color-primary-light-5: var(--el-color-primary-dark-4) !important;
	--el-color-primary-light-3: var(--el-color-primary-dark-3) !important;

	//登录背景
	.login {background: var(--el-bg-color);}
  a{
		color:#fff;
	}
	
}
```

##### 12.3 逻辑

```
const dark = ref<string | null>(localStorage.getItem('dark'));
const configDark = ()=>{
    const element = document.querySelector('html') as HTMLElement | null;
    if (element) {
        if( element.className == 'dark'  ){
            element.className = '';
        }else{
            element.className = 'dark';
        }
        dark.value = element.className;
        localStorage.setItem('dark', element.className);
    }
}
```

##### 12.4 App.vue初始化皮肤样式

```
<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {  ref , onBeforeMount } from 'vue';

onBeforeMount(()=>{
  const dark = ref<string | null>( localStorage.getItem('dark') );
  const element = document.querySelector('html') as HTMLElement | null;
  if( element ){
    if( dark.value == 'dark' ){
        element.className = 'dark';
    }else{
        element.className = '';
    }
  }
})
</script>

<style lang="scss">
@import './assets/css/style.scss';
</style>
```

##### 12.5 顺便把Electron类型给了

```
//preload/index.d.ts

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    ipcRenderer: Electron.IpcRenderer
  }
}
```



# 13、窗口按钮-国际化

##### 13.1 布局

```
<el-dropdown trigger="click" @command="configLang">
    <el-button circle>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z" fill="currentColor"></path><path d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z" fill="currentColor"></path></svg>
    </el-button>
    <template #dropdown >
        <el-dropdown-menu>
          <el-dropdown-item
          v-for="item in config.LANG"
          :key="item.value"
          :command="item"
          >{{  item.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
</el-dropdown>
```

##### 13.2 逻辑

```
import { ref , getCurrentInstance , ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const config = reactive({
    LANG:[
        {name:"中文",value:'zh-cn'},
        {name:'英文',value:'en'}
    ]
})
const configLang = ( item:any )=>{
    let val:string = item.value;
    let i18n = proxy?.$i18n;
    i18n!.locale = val;
	localStorage.setItem('lang',val);
}
```

##### 13.3 main.ts导入i18n

```
//国际化
import i18n from './locales'
app.use(i18n)
```

##### 13.4 locales/index.ts

```
import { createI18n } from 'vue-i18n'

import zh from './lang/zh-cn'
import en from './lang/en'

//element语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import English from 'element-plus/dist/locale/en.mjs';
const messages = {
    'zh-cn':{
        el:zhCn,
        ...zh
    },
    'en':{
        el:English,
        ...en
    }
}
const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'zh-cn',  // 初始化配置语言
    messages    
})

export default i18n
```

##### 13.5 lang/en.ts

```
export default {
	login: {
		slogan: 'The most concise basic permission framework system.' ,
		describe: 'Electron + Vue3 + element plus based front-end solutions in the background.',
		signInTitle: 'Sign in',
		accountLogin: 'Account sign in',
		mobileLogin: 'Mobile sign in',
		rememberMe: 'Remember me',
		forgetPassword: 'Forget password',
		signIn: 'Sign in',
		signInOther: 'Sign in with',
		userPlaceholder: 'user / phone / email',
		userError: 'Please input a user name',
		PWPlaceholder: 'Please input a password',
		PWError: 'Please input a password',
		admin: 'Administrator',
		user: 'User',
		mobilePlaceholder: 'Mobile',
		mobileError: 'Please input mobile',
		smsPlaceholder: 'SMS Code',
		smsError: 'Please input sms code',
		smsGet: 'Get SMS Code',
		smsSent: 'SMS sent to mobile number',
		noAccount: 'No account?',
		createAccount: 'Create a new account',
		wechatLoginTitle: 'QR code sign in',
		wechatLoginMsg: 'Please use wechat to scan and log in | Auto scan after 3 seconds of simulation',
		wechatLoginResult: 'Scanned | Please click authorize login in the device'
	},
	user: {
		dynamic: 'Dynamic',
		info: 'User Info',
		settings: 'Settings',
		nightmode: 'night mode',
		nightmode_msg: 'Suitable for low light environment,The current night mode is beta',
		language: 'language',
		language_msg: 'Translation in progress,Temporarily translated the text of this view',
	}
}
```

##### 13.6 lang/zh-cn.ts

```
export default {
	login: {
		slogan: '最精简的基础权限框架系统',
		describe: '基于Electron + Vue3 + Element-Plus 的中后台前端解决方案。',
		signInTitle: '用户登录',
		accountLogin: '账号登录',
		mobileLogin: '手机号登录',
		rememberMe: '24小时免登录',
		forgetPassword: '忘记密码',
		signIn: '登录',
		signInOther: '其他登录方式',
		userPlaceholder: '用户名 / 手机 / 邮箱',
		userError: '请输入用户名',
		PWPlaceholder: '请输入密码',
		PWError: '请输入密码',
		admin: '管理员',
		user: '用户',
		mobilePlaceholder: '手机号码',
		mobileError: '111请输入手机号码',
		smsPlaceholder: '短信验证码',
		smsError: '请输入短信验证码',
		smsGet: '获取验证码',
		smsSent: '已发送短信至手机号码',
		noAccount: '还没有账号?',
		createAccount: '创建新账号',
		wechatLoginTitle: '二维码登录',
		wechatLoginMsg: '请使用微信扫一扫登录 | 模拟3秒后自动扫描',
		wechatLoginResult: '已扫描 | 请在设备中点击授权登录'
	},
	user: {
		dynamic: '近期动态',
		info: '个人信息',
		settings: '设置',
		nightmode: '黑夜模式',
		nightmode_msg: '适合光线较弱的环境，当前黑暗模式为beta版本',
		language: '语言',
		language_msg: '翻译进行中，暂翻译了本视图的文本',
	}
}
```

##### 13.7 使用

```
template：非绑定
			<h4>{{  $t('login.slogan')  }}</h4>
			
template：绑定
			<el-tab-pane :label="$t('login.accountLogin')">
			
js：
	const { proxy } = getCurrentInstance() as ComponentInternalInstance;
	proxy?.$t('login.mobileError')
```



# 14、axios封装get和post

##### 14.1 request.ts

```
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const request: AxiosInstance = axios.create({
    baseURL: '/api'
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

const http = {
    get<T>(url: string, params?: any, config?: {}): Promise<T> {
      return new Promise((resolve, reject) => {
        request
          .get<T>(url, { params,...config } )
          .then((res: AxiosResponse<T>) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    post<T>(url: string, data?: any, config?: {}): Promise<T> {
      return new Promise((resolve, reject) => {
        request
          .post<T>(url, data, config)
          .then((res: AxiosResponse<T>) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
};
  
export default http;
```

##### 14.2 api文件

```
import http from "@utils/request";
import { UserRuleForm , PhoneCodeForm , PhoneRuleForm } from '@interface/login'

interface ILoginRequest{
	code:string
	msg:string
	data?:string | null
}

//图形验证码
export const captchaImage = ( data:{
	key:string
} ):Promise<ArrayBuffer>=>{
	return http.get<ArrayBuffer>('/captcha/image',data,{responseType:'arraybuffer'});
}

//用户登录
export const loginByJson = ( data:UserRuleForm ):Promise<ILoginRequest>=>{
    return http.post<ILoginRequest>('/u/loginByJson',data)
}

//登录动态验证码
export const loginCaptcha = ( data:PhoneCodeForm ):Promise<ILoginRequest>=>{
    
	return http.get<ILoginRequest>('/captcha/sendRegisterOrLoginCaptcha',data)

}

//手机验证码登录
export const loginByMobile = ( data:PhoneRuleForm ):Promise<ILoginRequest>=>{
    return http.post<ILoginRequest>('/u/loginByMobile',data)
}
```



# 15、登录后

##### 15.1 登录后-流程：

```
1. 如果用户输入的正确，点击【登录】：后端会给前端返回【token】，前端需要把token存储起来（本地存储）
2. 请求用户信息接口
	前端在headers头中，把token传递过去
	后端给前端返回当前登录用户的【用户信息】，其中关于登录的有：角色信息-角色权限编码
3. 请求获取路由接口，把角色信息-角色权限编码传递给后端，从而获得此用户的路由菜单权限树
```

##### 15.2 获取用户信息

```
1. 接口
	
	***传递token，要在：config.headers['Authorization'] 中赋值token

2. interface
	export interface User {
    id: string;
    username: string;
    realName: string;
    userType: number;
    email: string;
    phone: string;
    gender: number;
    avatar: string;
    enabled: number;
    delFlag: number;
    remark: string | null;
}

export interface Permission {
    [index: number]: string;
}

export interface Unit {
    id: string;
    name: string;
    code: string;
    codeseq: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    hasChildren: number;
    system: number;
    enabled: number;
    leaderId: string | null;
    createBy: string;
    createTime: number | null;
    updateBy: string | null;
    updateTime: number | null;
    address: string;
}

export interface Role {
    id: string;
    roleName: string;
    rolePerm: string;
}

export interface IUserData {
    code: string;
    msg: string;
    data: {
        userInfo: User;
        permissions: Permission;
        units: Unit;
        roles: Role[];
    };
}
3. 调用方法=》进行数据存储
import { defineStore } from 'pinia'
import { getInfo } from '@api/user'
import { Role } from '@interface/user'
import { useMenuStore } from '@store/useMenuStore'
export const useUserStore = defineStore('userId', {
  state: ():{
    roles:Role[],
    rolePerm:string
  } => {
    return {
      roles:[],
      rolePerm:''
    }
  },
  getters:{},
  actions:{
    async  getUserInfo(){
      let res = await getInfo();
      let { permissions ,roles , units , userInfo } = res.data;
      this.roles = roles;
      this.rolePerm = roles[0].rolePerm;
     
      useMenuStore().getMenu();
    }
  },
  persist: {
    enabled: true, //开启数据缓存
    strategies: [
      {
        storage: localStorage,//默认走session
        paths: ['rolePerm']
      }
    ]
  }
})
```

##### 15.3 获取路由

```
1. 接口
2. interface
export interface Meta {
    title: string;
    icon: string;
    noCache: boolean;
    link: string | null;
  }
  
export interface Child {
    id: string;
    name: string;
    path: string;
    hidden: boolean;
    component: string;
    meta: Meta;
  }
  
export interface Parent {
    id: string;
    name: string;
    hidden: boolean;
    redirect: string;
    component: string;
    alwaysShow: boolean;
    query: string;
    path: string;
    meta: Meta;
    children: Child[];
  }
  
export interface IResponseData {
    code: string;
    msg: string;
    data: Parent[];
}
3. 调用方法=》进行数据存储

import { defineStore } from 'pinia'
import { getUserMenu } from '@api/user'
import { useUserStore } from '@store/useUserStore'
import { Parent } from '@interface/user'
export const useMenuStore = defineStore('menuId', {
  state: ():{
    menu:Parent[]
  }=> {
    return {
      menu:[]
    }
  },
  getters:{},
  actions:{
    async getMenu(){
        let res = await getUserMenu(useUserStore().rolePerm);
        this.menu = res.data;
        console.log('菜单',useUserStore().rolePerm,res  );
    }
  },
  persist: {
    enabled: true, //开启数据缓存
    strategies: [
      {
        storage: localStorage,//默认走session
        paths: ['menu']
      }
    ]
  }
})
```



# 16、后台管理系统-骨架

##### 16.1 窗口设置

```
//从login跳转到Home，只是路由的切换，窗口并没有换，所以窗口的配置会一直生效，那么就要修改窗口的：

//窗口大小
mainWindow.setSize(1200, 720);
//窗口最小值
mainWindow.setMinimumSize(1000, 500);
//窗口居中
mainWindow.center();
//窗口大小可以修改
mainWindow.setResizable(true);
```

##### 16.2 后台架构布局

提示，用来调试：mainWindow.webContents.openDevTools();

```
<template>
    <section class="aminui-wrapper">
        <!--1级菜单-->
        <div class="aminui-side-split">
            <div class="aminui-side-split-top">
                <router-link to="/">
                    <img class="logo" src="../assets/images/logo-r.png">
                </router-link>
            </div>
            <div class="adminui-side-split-scroll">
                <el-scrollbar>
                    <ul>
                        <li class="active">
                            <el-icon><ChatRound /></el-icon>
                            <p>首页</p>
                        </li>
                        <li>
                            <el-icon><ChatRound /></el-icon>
                            <p>新媒体</p>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <!--2级菜单-->
        <div class="aminui-side">
            <div class="adminui-side-top">
                <h2>首页</h2>
            </div>
            <div class="adminui-side-scroll">
                <el-scrollbar>
                    <el-menu>
                        <el-menu-item index="1">
                            <el-icon><ChatRound /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <el-icon><ChatRound /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <el-icon><ChatRound /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <el-icon><ChatRound /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <el-icon><ChatRound /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <el-icon><ChatRound /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
            </div>
            <div class="adminui-side-bottom">
                <el-icon><el-icon-expand/></el-icon>
            </div>
        </div>
        <!--右侧组件-->
        <div class="aminui-body">
            右侧内容
        </div>
    </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
onBeforeMount(()=>{
    window.electron.ipcRenderer.invoke('resize-window');
})
</script>

<style scoped lang="scss">
.aminui-wrapper{
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .aminui-side-split{
        display: flex;
        flex-direction: column;
        width:65px;
        height: 100vh;
        overflow: hidden;
        background: #222b45;
        .aminui-side-split-top {height: 49px;-webkit-app-region: drag;}
        .aminui-side-split-top a {display: inline-block;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;}
        .aminui-side-split-top .logo {height:30px;vertical-align: bottom;}
        .adminui-side-split-scroll {overflow: auto;overflow-x:hidden;height: 100%;flex: 1;}
        li {cursor: pointer;width: 65px;height: 65px;color: #fff;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: center;}
        li i {font-size: 18px;}
        li p {margin-top:5px;font-size:12px;}
        li:hover {background: rgba(255, 255, 255, 0.1);}
        li.active {background: #409EFF;}
    }
    .aminui-side{
        display: flex;
        flex-flow: column;
        width:210px;
        background: #fff;
        box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
        border-right: 1px solid #e6e6e6;
        .adminui-side-top {    -webkit-app-region: drag;border-bottom: 1px solid #ebeef5;height:49px;line-height: 50px;}
        .adminui-side-top h2 {padding:0 20px;font-size: 17px;color: #3c4a54;}
        .adminui-side-scroll {overflow: auto;overflow-x:hidden;flex: 1;}
        .adminui-side-bottom {border-top: 1px solid #ebeef5;height:51px;cursor: pointer;display: flex;align-items: center;justify-content: center;}
        .adminui-side-bottom i {font-size: 16px;}
        .adminui-side-bottom:hover {color: var(--el-color-primary);}
    }
    .aminui-body{
        flex:1;
    }
}
.el-menu{
    border-right:0px;
}
</style>
```



# 17、hooks

##### 17.1 hooks是什么

```
vue3 中的 hooks 就是函数的一种写法，就是将文件的一些单独功能的 js 代码进行抽离出来进行封装使用。

它的主要作用是 Vue3 借鉴了 React 的一种机制，用于在函数组件中共享状态逻辑和副作用，从而实现代码的可复用性。

注意：其实 hooks 和 vue2 中的 mixin 有点类似，但是相对 mixins 而言， hooks 更清楚复用功能代码的来源, 更清晰易懂。
```

##### 17.2 hooks优点

```
hooks 作为独立逻辑的组件封装，其内部的属性、函数等和外部组件具有响应式依附的作用。
自定义 hook 的作用类似于 vue2 中的 mixin 技术，使用方便，易于上手。
使用 Vue3 的组合 API 封装的可复用，高内聚低耦合。
```

##### 17.3 自定义 hook 需要满足的规范

```
具备可复用功能，才需要抽离为 hooks 独立文件
函数名/文件名以 use 开头，形如: useXX
引用时将响应式变量或者方法显式解构暴露出来；
```

##### 17.4 具体使用

```
//hooks文件

import { useUserStore  } from '@store/useUserStore'
import { useMenuStore } from '@store/useMenuStore'

import router from '@router'

const useLogin = async ( token )=>{
   //1. 存储token
   localStorage.setItem('TOKEN', token );
   //2. 获取用户信息 ==> 数据的存储和重构是在别的地方
   await useUserStore().getUserInfo();
   //3. 获取路由 ==> 数据的存储和重构是在别的地方  
   await useMenuStore().getMenu();
   //4. 进入后台管理系统首页
   router.push('/');
}

export default useLogin;
```

```
//vue文件

//引入hooks
import useLogin from '@hooks/useLogin'

//调用hooks
useLogin( res.data );
```



# 18、渲染一级菜单

##### 18.1 动态组件

```
<el-icon>
	<component :is="item.meta.icon.replace('el-icon-','')"></component>
</el-icon>
```

##### 18.2 把数据传递给子组件

```
nextMenu.value = pmenu.value.children;
```



# 19、渲染二级菜单

```
<template>
	<div v-if='nextMenu.length <= 0'>
		没有子级菜单
	</div>
	<template 
		v-for='navItem in nextMenu'
		:key='navItem'
	>
		<!--二级菜单渲染-->
		<el-menu-item :index='navItem.path'>
			<el-icon>
				<component :is='navItem.meta?.icon.replace("el-icon-","") || "user" ' />
			</el-icon>
			<template #title>
				<span>{{navItem.name}}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Parent } from '@interface/user'
defineProps({
	nextMenu:{
		type: Object as PropType<Parent[]>,
    	required: true
	}
})
</script>
```



# 20、调整布局页面

##### 20.1 layout为布局页面：把Home.vue修改成layout

##### 20.2 显示右侧数据内容的路由结构 - 为后续添加动态路由做铺垫

```
{
  	path: '/',
  	component: () => import('@views/Home.vue'),
  	redirect: '/dashboard',
  	children: [{
  		path: '/dashboard',
  		component: () => import('@views/home/index.vue')
  	}]
}
```



# 21、动态添加路由

##### 21.1 动态添加路由

```
router.addRoute('name', {
	path:'/',
	component:()=>import('')
})
```

##### 21.2 需要把后端给前端返回的路由数据的component对应的value字符串修改成：component:()=>import('')

```
export const beforeEach = ( to )=>{
 		initRouter()
    
    //当前路由没有匹配到任何路由记录
    if(to.matched.length == 0){
        router.push(to.fullPath)
    }
}
```

```
import { useMenuStore } from '@store/useMenuStore'
import router from '@router'
import { Parent } from '@interface/user'
export const beforeEach = ( to:any )=>{

    if( to.path == '/login' ){
        return ;
    }

    if( !localStorage.getItem('TOKEN') ){
        return '/login'
    }

    //动态添加路由
    initRouter();

    //当前路由没有匹配到任何路由记录
    if( to.matched.length == 0){
        router.push( to.fullPath );
    }
    return true;
}

interface Child{
    parentView: string;
    path: string;
    name: string;
    meta: any;
    redirect: string;
    children?: Child[] | null;
    component: any;
    id?: string | undefined;
    hidden?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    query?: string | undefined;
}

interface Child extends Omit<Parent, 'children'> {
    children?: Child[] | null;
}

//1. 动态添加路由 => 整个过程
const initRouter = ()=>{
    let menu:Parent[] = useMenuStore().menu;
    let menuRouter: Child[] = filterRouter(menu);
    menuRouter = flatRoutes(menuRouter);
    menuRouter.forEach((item:any) => {
        router.addRoute(item.parentView == 'layout' ? 'layout' : '', item);
    });
}

//2. 把component 重构成 箭头函数的形式
const filterRouter = (menu: Parent[]): Child[] => {
    let arrRouter: Child[] = [];
    menu.forEach((item: any) => {
        var route: Child = {
            parentView: item.parentView,
            path: item.path,
            name: item.name,
            meta: item.meta,
            redirect: item.redirect,
            children: item.children ? filterRouter(item.children) : null,
            component: loadComponent(item.component)
        };
        arrRouter.push(route);
    });
    return arrRouter;
};

//3. 对于component的调整
const modules: Record<string, () => Promise<any>> = import.meta.glob('@renderer/views/**/*.vue');
const modulesMap: Record<string, () => Promise<any>> = {};

Object.keys(modules).forEach((key) => {
    const componentName = key.replace('/src/views', '').replace('.vue', '').replace('/index', '').replace('/', '');
    if (key.includes('index')) {
        modulesMap[`${componentName}/index`] = modules[key];
    }
    modulesMap[componentName] = modules[key];
});

//4. 根据modulesMap[key]返回对应的value值
const loadComponent = (component: string | null): (() => Promise<any>) | undefined => {
    if (component) {
        return modulesMap[component];
    }
    return;
};


//5. 路由扁平化 
const flatRoutes = (routes: Child[], breadcrumb: Child[] = []): Child[] => {
    let res: Child[] = [];
    routes.forEach((route: Child) => {
        const tmp = { ...route };
        if (tmp.children) {
            let childrenBreadcrumb: Child[] = [...breadcrumb];
            childrenBreadcrumb.push(route);
            let tmpRoute = { ...route };
            delete tmpRoute.children;
            res.push(tmpRoute);
            let childrenRoutes = flatRoutes(tmp.children, childrenBreadcrumb);
            childrenRoutes.map((item) => {
                res.push(item);
            });
        } else {
            let tmpBreadcrumb = [...breadcrumb];
            tmpBreadcrumb.push(tmp);
            res.push(tmp);
        }
    });
    return res;
};

//后置
export const afterEach = ()=>{
    console.log('后置');
}
```



# 22、切换路由

##### 22.1 el-menu跳转

```
<el-menu router :default-active="route.path">
```

##### 22.2 解决深度拷贝对象，出现循环引用的问题

```
//深度复制对象，并处理循环引用
import clone from 'rfdc'
const cloneRoutes  = clone()(routes);
```



# 23、TopBar面包屑

##### 23.1 TopBar.vue

```
<template>
    <div class="topbar">
        <div class="left-panel">
            <el-breadcrumb separator-icon="ArrowRight">
               <transition-group name="breadcrumb">
                    <template v-for="item in breadList" :key="item.path">
                        <el-breadcrumb-item v-if="item.path!='/'" :key="item.path">
                            <el-icon>
                                <component :is="item.meta?.icon.replace('el-icon-','')" />
                            </el-icon>
                            {{  item.meta?.title }}
                        </el-breadcrumb-item>
                    </template>
               </transition-group>
            </el-breadcrumb>
        </div>
        <div class="center-panel"></div>
        <div class="right-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount , ref , watch } from 'vue';
import { Parent } from '@interface/user'
import { useRoute } from 'vue-router';
const route = useRoute();

const breadList = ref<Parent[]>([]);
const getBreadcrumb = ()=>{
    let matched:Parent[] = route.meta.breadcrumb as Parent[];
    breadList.value = matched;
    console.log( breadList.value );
}

onBeforeMount(()=>{
    getBreadcrumb();
})

watch(route,()=>{
    getBreadcrumb();
})


</script>

<style scoped lang="scss">
.topbar{
    display: flex;
    justify-content: space-between;
    height: 49px;
    border-bottom: 1px solid #ebeef5;
    background: #fff;
    .left-panel{
        display: flex;
        align-items: center;
    }
    .center-panel{
        flex:1;
        -webkit-app-region:drag;
    }
    .right-panel{
        display: flex;
        align-items: center;
    }
}
.el-breadcrumb{
    margin-left: 15px;
    .el-breadcrumb__inner .el-icon{
        font-size:14px;
        margin-right: 5px;
        float:left;
    }
}

</style>
```

##### 23.2 UserBar.vue

```
<template>
    <div class="user-bar">
        <!--退出登录-->
        <el-dropdown class="panel-item">
            <div class="user-avatar">
                <el-avatar :size="30" src="" />
                <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        
        <!--消息-->
        <div class="panel-item">
            <el-icon><ChatDotRound /></el-icon>
        </div>

        <!--下载-->
        <div class="panel-item">
            <el-icon><Download /></el-icon>
        </div>

        <!--缩小-->
        <div class="panel-item">
            <el-icon><Minus /></el-icon>
        </div>

        <!--放大-->
        <div class="panel-item">
            <el-icon><FullScreen /></el-icon>
        </div>

        <!--关闭-->
        <div class="panel-item">
            <el-icon><Close /></el-icon>
        </div>

    </div>
</template>

<style scoped lang="scss">
.user-bar{
    display: flex;
    align-items: center;
    height: 100%;
    .panel-item{
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 100%;
        cursor: pointer;
        .user-avatar{
            display: flex;
            align-items: center;
        }
        &:hover{
            background-color: rgba(0,0,0,0.1);
        }
    }
}
</style>
```



# 24、标签页

##### 24.1 布局

```
<template>
    <div class="adminui-tags">
      <ul ref="tags">
        <!-- 遍历标签列表 -->
        <li 
            v-for="tag in viewTags" 
            :key="tag.path"
            :class="isActive(tag)?'active':''"
        >
          <!-- 路由链接 -->
          <router-link :to="tag.path">
            <!-- 如果标签不是固定标签，则显示关闭图标 -->
            <span>{{ tag.name }}</span>
            <el-icon v-if="tag.affix==false" @click.prevent.stop='closeSelectedTag(tag)'>
              <el-icon-close/>
            </el-icon>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<style scoped>
.adminui-tags {height:35px;background: #fff;border-bottom: 1px solid #e6e6e6;}
.adminui-tags ul {display: flex;overflow: hidden;}
.adminui-tags li {font-size:12px;cursor: pointer;display: inline-block;float: left;height:34px;line-height: 34px;position: relative;flex-shrink: 0;}
.adminui-tags li::after {content: " ";width:1px;height:100%;position: absolute;right:0px;background-image: linear-gradient(#fff, #e6e6e6);}
.adminui-tags li a {display: inline-block;padding:0 10px;width:100%;height:100%;color: #999;text-decoration:none;display: flex;align-items: center;}
.adminui-tags li i {margin-left:10px;border-radius: 3px;width:18px;height:18px;display: flex;align-items: center;justify-content: center;}
.adminui-tags li i:hover {background: rgba(0,0,0,.2);color: #fff;}
.adminui-tags li:hover {background: #ecf5ff;}
.adminui-tags li.active {background: #409EFF;}
.adminui-tags li.active a {color: #fff;}
</style>
```



# 25、用户信息-渲染头像

```
interface IUserInfo {
  id: string;
  username: string;
  realName: string;
  userType: number;
  email: string;
  phone: string;
  gender: number;
  avatar: string;
  enabled: number;
  delFlag: number;
  remark: string | null;
}
```



# 26、退出登录

##### 26.1 部分逻辑

```
//退出登录
import { ElMessage , ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();
const outLogin = ()=>{
    ElMessageBox.confirm("确认",'是否退出登录',{
        type:'warning',
        confirmButtonText:'退出'
    }).then(()=>{
        ElMessage({
            type:'success',
            message:'退出登录'
        })

        window.electron.ipcRenderer.invoke('out-login');

        localStorage.setItem('TOKEN','');

        router.replace({
            path:'/login'
        });
    }).catch(()=>{
        ElMessage({
            type:'info',
            message:'取消退出'
        })
    })
}
```

##### 26.2 主进程操作

```
//退出登录
ipcMain.handle('out-login',() => {
    //窗口大小
    mainWindow.setSize(900, 670);
    //窗口居中
    mainWindow.center();
    //窗口大小可以修改
    mainWindow.setResizable(false);
})
```



# 27、记住密码

```
<el-checkbox label="记住密码" v-model="checkPassword" @change="onMemoPassword"></el-checkbox>

//初始化
onBeforeMount(()=>{

    let userPwd: string | null = localStorage.getItem('user-pwd');
    if (userPwd) {
      let { username, password }: { username: string, password: string } = JSON.parse(userPwd);
      ruleForm.username = Decrypt(username);
      ruleForm.password = Decrypt(password);
    }
    
})


//hooks
import useMemoPassword from '@hooks/useMemoPassword'


let { memoVal, onMemoPassword } = useMemoPassword();
let checkPassword: Ref<boolean> = ref(memoVal);

const setMemoPassword = () => {
  if (checkPassword.value) {
    const userPwd: {
				username: string,
  			password: string
    } = {
      username: Encrypt(ruleForm.username) as string,
      password: Encrypt(ruleForm.password) as string
    }
    localStorage.setItem('user-pwd', JSON.stringify(userPwd));
  } else {
    localStorage.removeItem('user-pwd');
  }
}
```

```
//hooks
import { ref, Ref } from 'vue'

interface MemoPassword {
  memoVal: Ref<boolean>,
  onMemoPassword: (value: boolean) => void
}

function useMemoPassword(): MemoPassword {
  let memoVal: Ref<boolean> = ref(localStorage.getItem('memoPassword') === 'true');
  
  const onMemoPassword = (value: boolean) => {
    localStorage.setItem('memoPassword', String(memoVal.value = value));
  }

  return {
    memoVal,
    onMemoPassword
  }
}

export default useMemoPassword;
```



# 28、全屏、最小化、关闭

##### 全屏：JS方式

```
const isFull: boolean = !!(document.webkitIsFullScreen || document.mozFullScreen || 
        document.msFullscreenElement || document.fullscreenElement);

if (isFull) { // 缩小   
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
} else { // 放大
    const element: HTMLElement = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}
```

##### 最大化：electron方式

```
if( mainWindow.isFullScreen() ){
      mainWindow.setFullScreen(false);
}else{
      mainWindow.setFullScreen(true);
}
```

##### 最小化

```
win.minimize()
```

##### 关闭窗口

```
close 	方法用于关闭窗口，可以通过监听 close 事件来执行一些自定义操作，并有机会取消关闭操作。
destroy 方法用于彻底销毁一个窗口，不会触发 close 事件，并立即释放与窗口相关的所有资源。
```

##### 关闭软件

```
app.quit() 方法用于退出整个 Electron 应用程序，可以通过监听 before-quit 事件来执行一些预处理操作。
app.exit() 方法用于立即终止整个 Electron 应用程序的进程，不会触发任何事件。
```



# 29、工作流

##### 29.1 什么是工作流

```
工作流（Workflow），指“业务过程的部分或整体”。
```

##### 29.2 接下来要做的模块

```
系统：角色管理、用户管理
工作流：教学（科目管理、班级管理）、新媒体、招生、办理（缴费和入学）、就业
```

# 一、角色管理

##### 1.1 布局

```
<template>
    <div style="height: 100%;">
        <el-container>
            <el-main>
                <el-tabs type="border-card">
                    <el-tab-pane label="角色列表">
                        <!--form-->
                        <el-card class="card-container">
                            <el-form>
                                <el-row :gutter="15">
                                    <el-col :span="8">
                                        <el-form-item label="角色名称" >
                                            <el-input placeholder="请输入角色编码"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="角色编码">
                                            <el-input placeholder="请输入角色编码"></el-input>
                                        </el-form-item></el-col>
                                    <el-col :span="9">
                                        <el-form-item label="状态">
                                            <el-select placeholder="请选择启动状态">
                                                <el-option>启用</el-option>
                                                <el-option>禁用</el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item>
                                            <el-button icon="search" type="primary">搜索</el-button>
                                            <el-button icon="refreshLeft">重置</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-card>
                        <!--table-->
                        <el-card>
                            <div class="toolbar">
                                <el-button icon="plus" type="primary">新增</el-button>
                            </div>
                            <el-table :data="tableData" border>
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop='roleName' align="center" label="角色名称"></el-table-column>
                                <el-table-column prop='rolePerm' align="center" label="权限字符"></el-table-column>
                                <el-table-column label="是否启用" align="center">
                                    <el-tag>是</el-tag>
                                </el-table-column>
                                <el-table-column prop='createTime' align="center" label="创建时间"></el-table-column>
                                <el-table-column label="操作" align="center" width="220" fixed="right">
                                    <template #default="{ row }">
                                        <div class="sys-table-main-actions">
                                            <el-link icon="edit" type="primary" :underline="false">编辑</el-link>
                                            <el-link icon="delete" type="danger" :underline="false" style="margin: 0 8px">删除</el-link>
                                            <router-link class="el-link el-link--error" type="success" to="/">分配用户</router-link>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="回收站">回收站</el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
const tableData = [
    {
        roleName:'名称',
        rolePerm:'字符',
        createTime:'创建时间'
    },
    {
        roleName:'名称',
        rolePerm:'字符',
        createTime:'创建时间'
    },
    {
        roleName:'名称',
        rolePerm:'字符',
        createTime:'创建时间'
    }
]
</script>

<style scoped>
.card-container,.toolbar{
    margin-bottom:15px;
}
</style>
```

##### 1.2 api文件

```
import http from "@utils/request";

interface Irole{
    current:string;
    size:string;
    roleName?:string;
    rolePerm?:string;
    enabled?:string;
}

export interface Role {
    id: string;
    roleName: string;
    rolePerm: string;
    unitId: string;
    dataPrivileges: number;
    enabled: number;
    createBy: string | null;
    createTime: number | null;
    updateBy: string | null;
    updateTime: number | null;
    descript: string | null;
}

export interface IroleApiResponse {
    code: string;
    msg: string;
    data: {
        records: Role[];
        total: number;
        size: number;
        current: number;
        orders: any[];
        optimizeCountSql: boolean;
        searchCount: boolean;
        countId: string | null;
        maxLimit: number | null;
        pages: number;
    };
}


//角色列表
export const rolePage = ( data:Irole ):Promise<ApiResponse>=>{
	return http.get<ApiResponse>('/system/role/page', data )
}

```

##### 1.3 时间戳转换标准时间

```
interface Tool{
    dateFormat(date:string | number | Date , fmt?:string):string
}
const tool = {
    dateFormat:function( date , fmt='yyyy-MM-dd hh:mm:ss' ){
        date = new Date( date );
        let o = {
            'M+': date.getMonth() + 1,//月份
            'd+': date.getDate(),     //日
            'h+': date.getHours(),    //小时
            'm+': date.getMinutes(),  //分
            's+': date.getSeconds(),  //秒
            'q+': Math.floor((date.getMonth()+3)/3),//季度
            'S' : date.getMilliseconds() //毫秒
        }
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace( RegExp.$1, (date.getFullYear()+'').substr( 4 - RegExp.$1.length)  );
        }
        for( let k in o ){
            if( new RegExp("("+k+")").test(fmt)  ){
                fmt = fmt.replace( RegExp.$1 , (RegExp.$1.length == 1) ? (o[k]) : (("00"+o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }   
}

export default tool; 
```



# 二、字典

##### 2.1 什么是后台管理系统的字典

```
字典管理主要用来维护和管理公用数据字典。
```



# 三、全局组件

##### 3.1 什么是全局组件

```
Vue全局组件是可以在任何地方使用的组件，而不仅仅局限于某个组件的作用域内。全局组件可以在Vue应用的任何组件中使用，无需额外导入或注册。

通常，在创建全局组件时，我们会在Vue应用的根组件或入口文件中进行注册。在注册之后，该组件就可以在应用的任何地方使用了。
```

##### 3.2 注册全局组件

```
//main.ts

//全局组件-分页
import pagination from '@components/pagination/index.vue'
app.component('pagination', pagination);
```

##### 3.3 分页组件

```
<template>
    <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 50, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    currentPage:{
        type:Number,
        default:1
    },
    pageSize:{
        type:Number,
        default:10
    },
    total:{
        type:Number,
        default:10
    }
})
const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);
const emits = defineEmits(['update:currentPage','update:pageSize'])

const handleSizeChange = ( page:number )=>{
    pageSize.value = page;
    emits('update:pageSize',page);
}
const handleCurrentChange = ( page:number )=>{
    currentPage.value = page;
    emits('update:currentPage',page);
}
</script>

<style scoped>
.pagination{
    display: flex;
    justify-content: flex-end;
    margin-top:15px;
}
</style>
```



# 四、新增角色

##### 4.1 菜单权限树

```
export interface IRoleMenuItem {
    id: string;
    name: string;
    parentId: string;
    sort: number;
    path: string;
    query: any;
    component: string;
    cache: number;
    type: number;
    visible: number;
    redirect: string;
    enabled: number;
    perms: string;
    icon: string;
    remark: string | null;
    createBy: string | null;
    createTime: string | null;
    updateBy: string | null;
    updateTime: string | null;
    children?: IRoleMenuItem[];
} 
interface IRoleMenu {
    code: string;
    msg: string;
    data: IRoleMenuItem[];
}
```

##### 4.2 新增角色

```
interface IRoleAdd {
    roleName: string;
    rolePerm: string;
    enabled: string;
    descript: string;
    permissionIds: string[];
}

interface IRoleAddData {
    code: number;
    msg: string;
    data: null;
}
```



# 五、用户管理

##### 5.1 布局

```
<template>
    <div style="height: 100%;">
        <el-container>
            <el-main>
                <el-tabs type="border-card">
                    <el-tab-pane label="用户列表">
                        <el-card>
                            <el-form ref="formRef" :model="searchForm" label-width="100px">
                                <el-row :gutter="15">
                                    <el-col :span="8">
                                    <el-form-item label="用户名称" prop="username">
                                        <el-input placeholder="请输入登录账号" clearable v-model="searchForm.username"/>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="真实姓名" prop="realName">
                                        <el-input placeholder="请输入真实姓名" clearable v-model="searchForm.realName"/>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input placeholder="请输入用户邮箱" clearable v-model="searchForm.email"/>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="手机号码" prop="phone">
                                        <el-input placeholder="请输入手机号码" clearable v-model="searchForm.phone"/>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="性别" prop="gender">
                                        <el-select v-model="searchForm.gender" placeholder="请选择用户性别" clearable>
                                        <el-option v-for="item in dicts.system_global_gender" :key="item.v" :label="item.k" :value="item.v"/>
                                        </el-select>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="账号状态" prop="enabled">
                                        <el-select v-model="searchForm.enabled" placeholder="请选择账号状态" clearable>
                                        <el-option v-for="item in dicts.system_global_status" :key="item.v" :label="item.k" :value="item.v"/>
                                        </el-select>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-button type="primary" icon="search">搜索</el-button>
                                    <el-button icon="refresh">重置</el-button>
                                    </el-col>
                                </el-row>
                                </el-form>
                        </el-card>
                        <el-card style="margin-top:15px;">
                            <div class="toolbar" style="margin-bottom: 15px;">
                                <el-button type="primary" icon="plus">新增</el-button>
                            </div>
                            <el-table :data="userList" border>
                                <el-table-column align="center" type="selection"/>
                                <el-table-column label="用户姓名" prop="username" align="center"/>
                                <el-table-column label="真实姓名" prop="realName" align="center"/>
                                <el-table-column label="用户类型" prop="userType" width="100px">
                                    <template #default="{ row }">
                                        <div v-if="row.userType == 0 ">普通账号</div>
                                        <div v-if="row.userType == 1 ">超级管理员</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="手机号码" prop="phone" width="150" align="center"/>
                                <el-table-column label="用户性别" prop="gender" align="center">
                                    <template #default="{row}">
                                        <template v-for="item in dicts.system_global_gender">
                                            <div v-if="row.gender == item.v">{{ item.k }}</div>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column label="账号状态" prop="enabled" align="center">
                                    <template #default="{row}">
                                        <template v-for="item in dicts.system_global_status">
                                            <el-tag v-if="row.enabled == item.v">{{ item.k }}</el-tag>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="280" fixed="right">
                                    <template #default="{ row }">
                                        <div class="sys-table-main-actions">
                                            <el-link icon="edit" :underline="false" type="primary">编辑</el-link>
                                            <el-link icon="delete" :underline="false" type="danger" style="margin:0 15px;">删除</el-link>
                                            <el-link icon="Refresh" :underline="false" type="success">重置密码</el-link>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <pagination
                                :total="totals"
                                @update:current-page="handleCurrentPageUpdate"
                                @update:page-size="handlePageSizeUpdate"
                            ></pagination>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="回收站">回收站</el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>


const searchForm =  reactive({
        current: '1',
        size: '10',
        total: '0',
        username: '',
        realName: '',
        email: '',
        phone: '',
        gender: '',
        enabled: '',
        unitId: ''
})
```

##### 5.2 TS接口类型

```
interface IUsersList{
    current:string;
    size:string;
    username?:string;
    realName?:string;
    email?:string;
    phone?:string;
    gender?:string;
    enabled?:string;
    unitId?:string;
}


export interface Record {
    id: string;
    username: string; // 用户名
    realName: string; // 真实姓名
    userType: number; // 用户类型（0：普通账号；1：超级管理员）
    email: string; // 用户邮箱
    phone: string; // 手机号码
    gender: number; // 用户性别（1：男；2：女；0：未知）
    avatar: string; // 头像路径
    enabled: number; // 帐号状态（0：禁用；1：正常）
    delFlag: number; // 是否删除（0：有效；1：删除）
    loginIp: string; // 最后登陆IP
    loginDate: number; // 最后登陆时间
    createBy: null | string;
    createTime: number;
    updateBy: string;
    updateTime: number;
    remark: null | string; // 备注
}
  
interface IUserListData {
    records: Record[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: null;
    maxLimit: null;
    pages: number;
}
  
interface IUserListRes {
    code: string;
    msg: string;
    data: IUserListData;
}
```

##### 5.2 新增用户

```
<template>
    <el-dialog
        v-model="dialogVisible"
        width="800px"
        @close="close"
    >
        <template #default>
            <el-form
                :model="userForm"
                label-width="90px"
                class="user-editor-form"
            >
                <el-form-item label="用户名" prop="username" class="inline">
                    <el-input v-model="userForm.username" show-word-limit placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item label="密码" prop="password" class="inline" v-if="!userForm.id">
                    <el-input type="password" v-model="userForm.password" show-word-limit placeholder="请输入用户密码" />
                </el-form-item>
                
                <el-form-item label="真实姓名" prop="realName" class="inline">
                    <el-input v-model="userForm.realName" placeholder="请输入真实姓名" />
                </el-form-item>

                <el-form-item label="邮箱" prop="email" class="inline" >
                    <el-input v-model="userForm.email" placeholder="请输入邮箱" />
                </el-form-item>

                <el-form-item label="性别" prop="gender" class="inline" >
                    <el-select v-model="userForm.gender" placeholder="请选择性别">
                        <el-option
                        v-for="item in dicts.system_global_gender"
                        :key="item.v"
                        :label="item.k"
                        :value="userForm.gender==item.v?userForm.gender:item.v "
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone" class="inline">
                    <el-input v-model="userForm.phone" placeholder="请输入手机号码" />
                </el-form-item>
                
                <el-form-item label="启用状态" prop="enabled" class="inline">
                    <el-radio-group v-model="userForm.enabled">
                        <el-radio
                        v-for="item in dicts.system_global_status"
                        :key="item.v"
                        :label="userForm.enabled == item.v ? userForm.enabled : item.v "
                        :value="item.v"
                        >
                        {{ item.k }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="所属机构" prop="unitId" class="inline" >
                    <!-- <el-tree-select
                        class="treeList"
                        v-model="userForm.unitId"
                        placeholder="请选择所属机构"
                        :render-after-expand="false"
                        :data="unitTree"
                        :props="{ label: 'name' }"
                        :check-strictly="true"
                        :auto-expand-parent="true"
                        :default-expand-all="true"
                        node-key="id"
                    /> -->
                </el-form-item>

                <el-form-item label="所属岗位" prop="postIds" class="inline">
                    <!-- <el-tree-select
                        class="treeList"
                        v-model="userForm.postIds"
                        placeholder="请选择所属岗位"
                        :render-after-expand="false"
                        :data="postTree"
                        :props="{ label: 'postName' }"
                        :auto-expand-parent="true"
                        :default-expand-all="true"
                        node-key="id"
                        show-checkbox
                        multiple
                    /> -->
                </el-form-item>

                <el-form-item label="分配角色" prop="roleIds" class="inline">
                    <!-- <el-tree-select
                        class="treeList"
                        v-model="userForm.roleIds"
                        placeholder="请选择分配角色"
                        :render-after-expand="false"
                        :data="roleTree"
                        :props="{ label: 'roleName' }"
                        :auto-expand-parent="true"
                        :default-expand-all="true"
                        node-key="id"
                        show-checkbox
                        multiple
                    /> -->
                </el-form-item>

                <el-form-item label="备注">
                    <el-input 
                        type="textarea" 
                        placeholder="请输入备注内容"
                        v-model='userForm.remark'
                        :maxlength="200"
                        show-word-limit
                    ></el-input>
                </el-form-item>

            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref , reactive , onBeforeMount ,  getCurrentInstance , ComponentInternalInstance } from 'vue'
import { ElTree } from 'element-plus'
const props = defineProps({
    dialogVisible:{
        type:Boolean,
        default:false
    }
})
const dialogVisible = ref(  props.dialogVisible );
//表单数据
const userForm = reactive({
    username: '',
    password: '',
    realName: '',
    email: '',
    gender:'',
    phone:'',
    enabled:'',
    unitId:'',
    postIds:[],
    roleIds:[],
    remark:''
})


onBeforeMount(async ()=>{
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    if( proxy ){
        (proxy as any).getDicts(['system_global_gender','system_global_status']);
    }
})

//关闭dialog
const emit = defineEmits();
const close = ()=>{
    emit('update:dialogVisible',false);
}

//确认
const onSubmit = async ()=>{
    close();
    emit('userChange');
}
</script>

<style lang="scss" scoped>
.user-editor-form {
  :deep(.inline) {
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
  }

  .treeList {
    padding: 2px;
    width: 100%;
  }
}
.inline{
    display: inline-flex;
    vertical-align: middle;
    width: 50%;
}
</style>
```

##### 5.3 按钮级别权限控制

修改menu/page返回类型

```
export interface IRoleMenuItem {
    id: string;
    name: string;
    parentId: string;
    sort: number;
    path: string;
    query: null;
    component: string;
    cache: number;
    type: number;
    visible: number;
    redirect: string;
    enabled: number;
    perms: string;
    icon: string;
    remark: null;
    createBy: null;
    createTime: null;
    updateBy: null;
    updateTime: null;
} 
interface IRoleMenu {
    code: string;
    msg: string;
    data: {
      records: IRoleMenuItem[];
      total: number;
      size: number;
      current: number;
      orders: any[];
      optimizeCountSql: boolean;
      searchCount: boolean;
      countId: null;
      maxLimit: null;
      pages: number;
    };
}
```

##### 5.4 总结按钮级别权限控制的内容

```
就是通过自定义指令来去做的：

流程：在登录的时候获取到了当前用户的权限信息。然后给节点添加自定义指令对应的value值，如果这个用户拥有这个权限那么按钮则存在，如果没有这个权限，那么就removeChild（删除）这个按钮，那么对应的用户也就不能点，就没有这个权限了。
```



# 六、项目的权限控制

##### 6.1 左侧菜单的权限

```
1. 用户进行登录，登录成功，后端会给前端返回用户的“TOKEN”
2. 接着请求【个人信息】接口，把token传递过去（header），获取到了用户的信息内容，其中控制左侧菜单权限的字段是：【角色权限编码】
3. 接着请求【获取路由】接口，把【角色权限编码】内容专递给后端，从而获得当前登录的用户的权限树（路由树：菜单数据）。
4. 前端把数据（可能需要进行重构），渲染到页面上即可。
```

##### 6.2 按钮级权限控制

```
1. 在登录的时候，会请求【个人信息】接口，其中返回的数据中，有一个【权限信息】数据。
2. 接着，我们写一个自定义指令文件，去判断：如果【权限信息】是（"*:*:*"）则代表是最高权限，无需判断任何内容了。
3. 如果【权限信息】不是（"*:*:*"），那么就要判断，【权限信息】所有数据在自定义指令绑定的value值中，是否存在，如果不存在，那么就把对应的dom节点删除掉：父节点.removeChild(子节点)。
```

# 一、拖拽窗口使用：webkit-app-region

```
在 Electron 中，当你为窗口设置无边框（frame: false）并使用 -webkit-app-region: drag; 样式来实现自定义标题栏的拖拽功能时，可能会发现双击自定义标题栏区域会触发窗口最大化的行为。这是因为 -webkit-app-region 属性使得该元素与系统级别的窗口管理器交互，它不仅使元素可以用于拖动窗口，而且可能还会响应系统对标题栏区域默认的双击事件。

在某些操作系统和版本的 Electron 中，即使窗口设置了无边框，但因为应用到了 -webkit-app-region 的样式，系统仍然识别到这个区域是类似于原生标题栏的可操作区域，并执行了相应的双击最大化操作。
```

# 二、在mac os上

```
就算设置没问题，也会出现：双击窗口，移动窗口的问题
```

```
const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame:false, //无边框窗口
    maximizable: false, // 禁止最大化
    resizable: false, // 设置为 false 禁用调整窗口大小
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
})
```

# 三、windows解决双击放大问题

```
//进入后台管理系统首页
  ipcMain.handle('resize-window',() => {
    //窗口大小
    mainWindow.setSize(1200, 720);

    //窗口居中
    mainWindow.center();
    //窗口大小可以修改
    mainWindow.setResizable(true);

	  // 设置窗口是否可以由用户手动最大化。
    mainWindow.setMenu(null);

    // 设置用户是否可以调节窗口尺寸
    mainWindow.setMaximizable(false);
    
    //窗口最小值
    mainWindow.setMinimumSize(1000, 500);

 })
```



# 四、最终解决办法

##### 4.1 拖拽窗口hooks

```
import { ref, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export default function useWindowDrag(): {
  isKeyDown: Ref<boolean>;
  handleMouseDown: (event: MouseEvent) => void;
} {
  const isKeyDown = ref(false);
  const initialX = ref(0);
  const initialY = ref(0);

  const handleMouseDown = (event: MouseEvent): void => {
    isKeyDown.value = true;
    initialX.value = event.x;
    initialY.value = event.y;

    const onMouseMove = (ev: MouseEvent): void => {
      if (isKeyDown.value) {
        const x = ev.screenX - initialX.value;
        const y = ev.screenY - initialY.value;
        const data = {
          appX: x,
          appY: y,
        };
        window.electron.ipcRenderer.invoke('custom-adsorption', data);
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    const onMouseUp = (): void => {
      isKeyDown.value = false;
      document.removeEventListener('mousemove', onMouseMove as EventListener);
    };

    document.addEventListener('mouseup', onMouseUp);

    // 清理事件监听器
    onUnmounted(() => {
      document.removeEventListener('mousemove', onMouseMove as EventListener);
      document.removeEventListener('mouseup', onMouseUp as EventListener);
    });
  };

  return {
    isKeyDown,
    handleMouseDown,
  };
}
```

