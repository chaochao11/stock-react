

import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from '../../core';
import Helmet from 'react-helmet';
import { Result, Icon, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import styles from './index.less';

class SupSuccess extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      second: 3,
      time: ''
    };
  }

  componentDidMount() {
    window.setDocumentTitle( '成功' );

    this.state.time = setInterval(() => {
      if ( this.state.second > 0 ) {
        let { second } = this.state;
        this.setState({
          second: --second
        });
        if ( this.state.second === 0 ) {
          this.props.dispatch(
						routerRedux.replace( '/scan-page' )
					);
        }
      } else {
        clearInterval( this.state.time );
      }
    }, 1000 );
  }

  componentWillUnmount() {
    clearInterval( this.state.time );
  }
  render() {
    const goScanPage = () => {
      this.props.dispatch(
				routerRedux.push( '/scan-page' )
			);
    };
    const goCheck = () => {
      this.props.dispatch({
        type: 'editsup/init'
      });
      this.props.dispatch(
        routerRedux.push( `/sup/chk-list-by-sup/${this.props.editsup.storeList[0].supplierid} ` )
      );
    };
    return (
      <div >
        <Helmet title="成功" />
        <Result
          img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#1F90E6' }} />}
          title="验收成功" />
        <WhiteSpace />
        <WingBlank>
          <Button className={styles.submitBth} onClick={() => { goScanPage(); }}>回到首页</Button>
        </WingBlank>
        <br />
        <WingBlank>
          <Button className={styles.submitBth} onClick={() => { goCheck(); }}>继续验收</Button>
        </WingBlank>
        <div className={styles.subTitle}>{this.state.second}秒后,自动返回首页</div>
      </div>
    );
  }

}


function editsup({ editsup }) {
  return { editsup };
}
export default connect( editsup )( SupSuccess );
