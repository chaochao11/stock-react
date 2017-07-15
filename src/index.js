// import dva from 'dva';
import { factory } from './core';
// import { browserHistory  } from 'dva/router'
import router from './router';

// 自定义字体样式
import './index.css';

// app 是 dva 的简单封装 api 跟 dva 相同
// 没有扩展的话可以直接用 dva 替换
// 初始化
const app = factory();

// model
app.model( require( './models/editbill.js' )); // 按订单号
app.model( require( './models/editsup.js' )); // 按供应商
// app.model( require( './models/order.js' ));

// 加载路由
app.router( router );

// 加载页面
app.start( '#root' );


// 全局传递
window.app = app;
