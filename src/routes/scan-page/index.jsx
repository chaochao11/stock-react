import React from 'react';
import { routerRedux } from 'dva/router';
import { connect, session, storage, compose, config } from '../../core';
import { createForm } from 'rc-form';
import { SearchBar, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import styles from './index.less';
import ScanBox from './scan-box';

class ScanPage extends React.Component {
  state = {
    value: '',
    focused: false
  };

  componentDidMount() {
    window.setDocumentTitle( '首页' );
    this.props.dispatch({
      type: 'editbill/init'
    });
    this.props.dispatch({
      type: 'editsup/init'
    });
  }

  render() {
    const goSelOrderNum = () => {
      this.props.dispatch(
        routerRedux.push( '/order/sel-order-num' )
      );
    };
    const goBeforeSelSup = () => {
      this.props.dispatch(
        routerRedux.push( '/sup/sel-supplier' )
      );
    };
    return ( <div>
      <WhiteSpace />
        <Button style={{ width: '5.6rem', height: '1.28rem', lineHeight: '1.28rem', margin: '0 auto', position: 'relative' }} onClick={() => { goSelOrderNum(); }}>
          <text style={{ position: 'absolute', left: '0.76rem', color: '#ccc', fontSize: '.38rem' }}>请输入订单号</text>
          <Icon type="search" style={{ color: '#ccc', position: 'absolute', top: '0.43rem', left: '0.3rem' }} />
        </Button>

      <WhiteSpace />

      <ScanBox />

      <WingBlank style={{ height: 'calc(20vh - 1rem)' }} />
        <div className="checkBtn">
          <Button style={{ backgroundColor: 'rgb(45, 178, 69)', width: '5.6rem', height: '1.28rem', lineHeight: '1.28rem', margin: '0 auto', color: '#fff' }} onClick={() => { goBeforeSelSup(); }}>按供方验收</Button>
        </div>

    </div> );
  }
}
function editbill({ editbill }) {
  return { editbill };
}

export default connect(editbill )( ScanPage );
