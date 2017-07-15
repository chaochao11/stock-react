import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from '../../core';
import { requestError } from '../../components/notify';
import { Switch, Toast } from 'antd-mobile';
import styles from './index.less';
import Delete from './delete';

class FirmByOrder extends React.Component {

  componentDidMount() {
    window.setDocumentTitle( '确认验收' );
  }

  handleSwitchChange = ( checked ) => {
    this.props.dispatch({
      type: 'editbill/store',
      payload: { checkrepeat: checked }
    });
  };

  goFirm() {
    this.props.asyncAjax( 'check_by_num', {
      data: {
        checkrepeat: ~~this.props.editbill.checkrepeat,
        orderdata: this.props.editbill.title.orderdate,
        data: JSON.stringify({
          items: this.props.editbill.addList.map(( detail ) => {
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
    .done(() => {
      Toast.hide();
      this.props.dispatch(
        routerRedux.replace( '/order-success' )
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
      routerRedux.push( '/order/details' )
    );
  }

  render() {
    return (
      <div className={styles.textbody}>
        <div>
          <ul className={styles.textbody}>
            <li>
              <span className={styles.label}>订单信息：{this.props.editbill.title.billno}&nbsp;&nbsp;{this.props.editbill.title.suppliername}</span>
            </li>
            <li>
              <span className={styles.label}>订单日期：{this.props.editbill.title.orderdate}</span>
            </li>
            <li>
              <span className={styles.label}>订单金额：¥{this.props.editbill.title.orderoutmoney} &nbsp;
                <a style={this.props.editbill.title.checkprogress === 100
                      ? { color: '#666' }
                      : { color: '#f00' }}>
                  {`${this.props.editbill.title.checkprogress == null ? '0' : this.props.editbill.title.checkprogress}%`}
                </a>
              </span>
            </li>
            <li>
              <span className={styles.label}>检查重复</span>
              <Switch
                checked={this.props.editbill.checkrepeat}
                onChange={this.handleSwitchChange} />
            </li>
          </ul>
        </div>
        <div className={styles.typename}>
          <span style={{ width: '55%', textAlign: 'left', marginLeft: '.68rem' }}>商品/班组/状态</span>
          <span style={{ width: '30%', textAlign: 'right' }}>验收数量</span>
        </div>
        <Delete billno={this.props.params.billno} />
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
      </div>
    );
  }
}

function editbill({ editbill }) {
  return { editbill };
}

export default connect( editbill )( FirmByOrder );

