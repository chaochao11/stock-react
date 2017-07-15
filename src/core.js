

import core from 'hope-core';

const systemApi = {

  login_user_login: '{doAdmin}public/user/signon.do', // 登录
  login_user_getas: '{doAdmin}public/user/getaccountsets.do', // 获取账套
  login_sendpwd_phone: '{doAdmin}public/user/sendpwdtel.do', // 手机找密码
  login_sendpwd_mail: '{doAdmin}public/user/sendpwdemail.do', // 邮箱找回密码

  check_order_details: '{doCatering}stock/checkorderbill/getlist.do', // 待验收订单明细
  check_order_list: '{doCatering}stock/checkorderbill/getbilllist.do', // 待验收订单列表
  check_by_num: '{doCatering}stock/checkorderbill/check.do', // 订单按件验收
  firm_order: '{doCatering}stock/checkorderbill/confirm.do', // 确认订单验收
  pur_order_getbyparam: '{doCatering}stock/purorderbill/getbyparam.do', // 搜索订单
  pur_order_getbysupplier: '{doCatering}stock/supplier/getlist.do', // 搜索供应商
  check_store_details: '{doCatering}stock/checkorderbill/getlist.do', // 部门详情
};


export default core({

  name: 'weixin-check',

  // 长连接的指定连接别名
  polling: {
    // projectName: 'cui_system'
  },

  // 命令替换词
  ajaxToken: {
    doAdmin: '/catering/do/',
    doCatering: '/catering/do/',
    doWeixin: ''
  },

  system: {

    // 系统标题
    // title: '',

    // 页面标签标题
    // htmlTitle: '',

    // subTitle: '',

    version: 'Ver 1.0'

    // accountTypeId: 4
  },


  keys: {
    ROLE_POWER: '{name}-role-power', // 是否有审核权限
    USER_INFO: '{name}-userinfo', // 用户信息
    USER_PSW: '{name}user-psw'
  },

  // 顶部菜单配置
  // topMenu,

  // 命令
  systemApi,

  // 权限列表
  // access,

  // 用户权限
  // accessMap,

  // 错误码
  ERRORCODE: {
    CHECK_SESSION_FAIL: '1006'
  }

});

