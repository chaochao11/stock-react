

import React from 'react';
import { routerRedux } from 'dva/router';
import { Modal, Toast } from 'antd-mobile';

const alert = Modal.alert;
export function errSession( dispatch, info, nextPathname ) {
  Toast.hide();
  alert( '提示', <div>{info}<br />请重新登录!</div>, [
    { text: '确定',
      onPress() {
        dispatch( routerRedux.push({
          pathname: '/login',
          state: {
            nextPathname
          }
        }));
      } }
  ]);
}
