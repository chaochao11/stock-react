import React from 'react';
import { routerRedux } from 'dva/router';
import Helmet from 'react-helmet';
import { connect, session, storage, compose, config } from '../../core';
import { WingBlank, WhiteSpace, List, InputItem, Picker, Button, Toast, Modal, Popup } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './login.less';
import CustomChildren from './select.jsx';
import Copyright from '../../components/layout/copyright.js';


class Login extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      asItem: [], // 账套[]=>{value:,label:}
      userName: '',
      userPsw: '',
      initAs: { value: '', label: '' }
    };
  }

  componentDidMount() {
    window.setDocumentTitle( '登录-验收' );
    // 此页面有时会出现loading或者popup所以hide一下
    Toast.hide();
    Popup.hide();
    this.getAccountsets();
    this.getAccountInfo();
  }

  // 获取存贮账套信息
  getAccountInfo() {
    let value = storage.get( config.keys.ACCOUNT ) * 1;
    let label = storage.get( config.keys.ACCOUNT_NAME );
    let userName = storage.get( config.keys.LAST_USER );
    let userPsw = storage.get( config.keys.USER_PSW );
    if ( value && label ) {
      this.setState({
        initAs: { value:value, label:label }
      });
    }
    if ( userName && userPsw ) {
      this.setState({
        userName: userName,
        userPsw: userPsw
      });
    }
  }

  // 获取账套
  getAccountsets() {
    this.props.asyncAjax( 'login_user_getas', {
      session: false
    }).done( res => {
      let items = res.data.items;
      let asItem = [];
      items.map(( item ) => {
        return asItem.push({ value: item.asid, label: item.asname });
      });
      this.setState({
        asItem: asItem
      });
    }).fail( res => {
      Toast.info( res.info );
    }).catch(() => {
      Toast.offline( '网络异常!' );
    });
  }

  // 登录
  handleLogin( e ) {
    e.preventDefault();
    this.props.form.validateFields(( errors, values ) => {
      if ( !errors ) {
        this.props.asyncAjax( 'login_user_login', {
          session: false,
          data: {
            usercode: values.usercode,
            password: values.password,
            asid: values.asid[0] ? values.asid[0] : values.asid
          }
        }).before(() => {
          Toast.loading( '正在登录!', 0 );
        }).done( res => {
          Toast.hide();
          // 存储 sessionid 和 最后登录的用户 账套id code name ROLE_POWER权限 1没权限 2有权限
          session.set( config.keys.SESSION, res.data.sessionid );
          session.set( config.keys.USER_INFO, res.data ); // 用户所有信息
          session.set( config.keys.ROLE_POWER, res.data.rolepower );
          storage.set( config.keys.LAST_USER, res.data.usercode );
          storage.set( config.keys.USER_PSW, values.password );
          storage.set( config.keys.ACCOUNT, res.data.asid );
          storage.set( config.keys.ACCOUNT_CODE, res.data.ascode );
          storage.set( config.keys.ACCOUNT_NAME, res.data.asname );

          if ( this.props.location.state ) {
            this.props.dispatch(
              routerRedux.replace( this.props.location.state.nextPathname )
            );
          } else {
            this.props.dispatch(
              routerRedux.replace( '/scan-page' )
            );
          }

        }).fail( res => {
          // console.log(222)
          Toast.info( res.info );
        }).catch(() => {
          Toast.offline( '网络异常!' );
        });
      }
    });
  }

  // 忘记密码
  forgetPsw() {
    this.props.dispatch(
      routerRedux.push( '/forget-pwd' )
    );
  }


  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={styles.loginWrapper}>
        <Helmet title="登录-验收" />
        <WingBlank className={styles.logoWrapper}>
          <i className={styles.logo} />
        </WingBlank>

        <WhiteSpace size="xl" />

        <WingBlank>
          <List>
            <InputItem
              {...getFieldProps( 'usercode', {
                initialValue: this.state.userName,
                rules: [
                          { required: true, message: '请输入帐号!' }
                ]
              })}
              clear
              error={!!getFieldError( 'usercode' )}
              placeholder="请输入账号">
              <span style={{ color: '#666' }}>账号</span>
            </InputItem>

            <InputItem
              {...getFieldProps( 'password', {
                initialValue: this.state.userPsw,
                rules: [
                          { required: true, message: '请输入密码!' }
                ]
              })}
              clear
              error={!!getFieldError( 'password' )}
              type="password"
              placeholder="请输入密码">
              <span style={{ color: '#666' }}>密码</span>
            </InputItem>

            <Picker
              extra={this.state.initAs.label ? this.state.initAs.label : '江大餐饮2016-07'}
              data={this.state.asItem}
              cols={1}
              {...getFieldProps( 'asid', {
                initialValue: this.state.initAs.value ? this.state.initAs.value : '',
                rules: [
                          { required: true, message: '请选择账套!' }
                ]
              })}>
              <CustomChildren>账套</CustomChildren>
            </Picker>
          </List>

          <div style={{ color: 'red', padding: '10px 0 10px 20px', fontSize: '0.25rem' }}>
            <span style={{ paddingRight: '20px' }}>
              {getFieldError( 'usercode' ) ? getFieldError( 'usercode' ).join( ',' ) : ''}
            </span>
            <span style={{ paddingRight: '20px' }}>
              {getFieldError( 'password' ) ? getFieldError( 'password' ).join( ',' ) : ''}
            </span>
            {getFieldError( 'asid' ) ? getFieldError( 'asid' ).join( ',' ) : ''}
          </div>
        </WingBlank>

        <WingBlank>
          <Button className={styles.loginBth} onClick={( e ) => { this.handleLogin( e ); }}>登录</Button>
          <span className={styles.forget} onClick={::this.forgetPsw}>忘记密码？</span>
        </WingBlank>

        <WingBlank>
          <Copyright />
        </WingBlank>

      </div>
    );
  }
}

export default compose(
  createForm(),
  connect()
)( Login );
