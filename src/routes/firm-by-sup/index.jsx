import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from '../../core';
import { requestError } from '../../components/notify';
import { Switch, Toast } from 'antd-mobile';
import styles from './index.less';
import Delete from './delete';

class FirmBySup extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    window.setDocumentTitle( '确认验收' );
  }

  handleSwitchChange = ( checked ) => {
    this.props.dispatch({
      type: 'editsup/store',
      payload: { checkrepeat: checked }
    });
  };


  goFirm() {
    this.props.asyncAjax( 'check_by_num', {
      data: {
        checkrepeat: ~~this.props.editsup.checkrepeat,
        orderdata: this.props.editsup.name.orderdate,
        data: JSON.stringify({
          items: this.props.editsup.addList.map(( detail ) => {
            return {
              orderguid: detail.orderguid,
              billid: detail.billid,
              houseid: detail.houseid,
              productiondate: detail.productiondate,
              expirydays: detail.expirydays,
              expirydate: detail.expirydate,
              materialbatchno: detail.materialbatchno,
              isgift: detail.isgift,
              amount: detail.amount || ( detail.orderamount - detail.checkamount ),
              note: detail.note,
              inprice: detail.inprice,
              outprice: detail.outprice
            };
          })
        })
      }
    })
    .before(() => {
      Toast.loading( '验收中...', 0 );
      this.setState({
        loading: true
      });
    })
    .done(( res ) => {
      Toast.hide();
      this.props.dispatch(
        routerRedux.push( '/sup-success' )
      );
    })
    .fail(( err ) => {
      Toast.hide();
      this.props.dispatch( requestError({ err }));
    })
    .catch(( err ) => {
      Toast.hide();
      this.props.dispatch( requestError({ err }));
    });
  }

  goDetails() {
    this.props.dispatch(
      routerRedux.push( '/sup/details' )
    );
  }

  render() {

    return ( <div>
      <ul className={styles.textbody}>
        <li>
          <span className={styles.label}>供应商：{this.props.editsup.name.suppliername}</span>
        </li>
        <li>
          <span className={styles.label}>检查重复</span>
          <Switch
            checked={this.props.editsup.checkrepeat}
            onChange={this.handleSwitchChange} />
        </li>
      </ul>
      <div className={styles.typename}>
        <span style={{ width: '60%', textAlign: 'left', marginLeft: '.3rem' }}>订单号/商品/班组/状态</span>
        <span style={{ width: '30%', textAlign: 'right' }}>验收数量</span>
      </div>
      <Delete supplierid={this.props.supplierid} />
      <button
        onClick={() => this.goFirm()}
        style={{
          width: '100%',
          backgroundColor: '#2DB245',
          height: '.8rem',
          fontSize: '0.28rem',
          color: '#fff',
          position: 'fixed',
          bottom: '0px',
          border: 'none'
        }}>验收
      </button>
    </div> );

  }
}


function editsup({ editsup }) {
  return { editsup };
}

export default connect( editsup )( FirmBySup );
