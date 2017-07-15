import React from 'react';
import { routerRedux } from 'dva/router';
import Helmet from 'react-helmet';
import { connect, session, storage, compose, config } from '../../core';
import { createForm } from 'rc-form';
import { WingBlank, WhiteSpace, List, InputItem, Picker, Button, Toast, Radio } from 'antd-mobile';
import styles from './index.less';
import CustomChildren from '../login/select.jsx';

const RadioItem = Radio.RadioItem;

class Forget extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      asItem: [], // 账套[]=>{value:,label:}
      userName: '',
      initAs: { value: '', label: '' },
      forgetType: 1 // 找回方式 0 短信 1邮箱
    };
  }

  componentDidMount() {
    window.setDocumentTitle( '忘记密码' );
    this.getAccountsets();
    this.getAccountInfo();
  }

	// 获取存贮账套信息
  getAccountInfo() {
    const value = storage.get( config.keys.ACCOUNT ) * 1;
    const label = storage.get( config.keys.ACCOUNT_NAME );
    const userName = storage.get( config.keys.LAST_USER );
    if ( value && label ) {
      this.setState({
        initAs: { value, label }
      });
    }
    if ( userName ) {
      this.setState({
        userName
      });
    }
  }

	// 获取账套
  getAccountsets() {
    this.props.asyncAjax( 'login_user_getas', {
      session: false
    }).done( res => {
      const items = res.data.items;
      const asItem = [];
      items.map(( item ) => {
        return asItem.push({ value: item.asid, label: item.asname });
      });
      this.setState({
        asItem
      });
    }).fail( res => {
      Toast.info( res.info );
    }).catch(() => {
	 		Toast.offline( '网络异常!' );
	 	});
  }

	// 修改找回方式
  changeForgetType( value ) {
    this.setState({
      forgetType: value
    });
  }

	// 确认
  submit() {
    this.props.form.validateFields(( errors, values ) => {
      if ( !errors ) {
        let ajaxType = '';
        if ( this.state.forgetType == 0 ) {
          ajaxType = 'login_sendpwd_phone';
        } else {
          ajaxType = 'login_sendpwd_mail';
        }
        this.props.asyncAjax( ajaxType, {
          session: false,
		 			data: { usercode: values.usercode, asid: values.asid }
		 		}).before(() => {
		 				Toast.loading( '发送中...', 0 );
		 		}).done( res => {
          // console.log(222)
		 				Toast.hide();
		 				Toast.success( '发送成功' );
		 				setTimeout(() => {
		 					this.props.dispatch(
		 						routerRedux.replace( '/Login' )
		 					);
		 				}, 2000 );
		 		}).fail( res => {
   console.log( 111 );
		 				Toast.info( res.info );
		 		}).catch(() => {
		 				Toast.offline( '网络异常!' );
		 		});
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const handleType = [
      { value: 0, label: '短信' },
      { value: 1, label: '邮箱' }
    ];
    return (
      <div className={styles.forgetWrapper}>
        <Helmet title="忘记密码" />
        <WhiteSpace size="lg" />
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

          <Picker
            extra={this.state.initAs.label ? this.state.initAs.label : '请选择账套'}
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

        <List>
          { handleType.map( i => (
            <RadioItem key={i.value} checked={this.state.forgetType === i.value} onChange={() => this.changeForgetType( i.value )}>
              {i.label}
            </RadioItem>
		        )) }
        </List>

        <div style={{ color: 'red', padding: '10px 0 10px 20px', fontSize: '0.25rem' }}>
          <span style={{ paddingRight: '20px' }}>
            {getFieldError( 'usercode' ) ? getFieldError( 'usercode' ).join( ',' ) : ''}
          </span>
          {getFieldError( 'asid' ) ? getFieldError( 'asid' ).join( ',' ) : ''}
        </div>

        <WingBlank>
          <Button className={styles.submitBth} onClick={( e ) => { ::this.submit(); }}>确定</Button>
        </WingBlank>
      </div>
    );
  }
}

export default compose(
	createForm(),
	connect()
)( Forget );
