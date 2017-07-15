
import 'dva';
import 'react';
import 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import  './assets/icon/iconfont';

// 全局设置 locale
moment.locale( 'zh-cn' );
//
window.setDocumentTitle = function(title) {
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
      i.onload = function() {
        setTimeout(function(){
            i.remove();
        }, 9)
      }
     document.body.appendChild(i);
  }
}

window.NewGuid = function () {
  let S4 = () => ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
  return ( S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() );
}
