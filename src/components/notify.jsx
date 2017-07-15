
import React from 'react';
import { routerRedux } from 'dva/router';
import { Modal, Toast } from 'antd-mobile';
import {
  config,
  globalNotify,
  locationSelector,
  NETWORK_ERROR_FRIENDLY_MSG
} from '../core';


const alert = Modal.alert;
const requestErrorHandle = opts => ({ dispatch, getState }) => {

  const location = locationSelector( getState());
  const { handleError, isMessage, time, err: { status, code, info }} = opts;

  const str = isMessage ? '' : `${info}：${NETWORK_ERROR_FRIENDLY_MSG}`;

  // 手动断开不提示错误
  if ( status === 'abort' ) return;

  // 会话超时
  if ( code === config.ERRORCODE.CHECK_SESSION_FAIL ) {
    alert( '提示', <div>{info}<br />请重新登录!</div>, [
      { text: '确定',
        onPress() {
          dispatch( routerRedux.push({
            pathname: '/login',
            state: {
              nextPathname: location.pathname
            }
          }));
        } }
    ]);
  } else if ( info ) {
    Toast.info( info, 3 );
  }

};


export const requestError = ( opts ) => {
  return globalNotify( requestErrorHandle( opts ));
};
