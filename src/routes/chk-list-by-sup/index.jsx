import React from 'react';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Toast, Popup } from 'antd-mobile';
import { requestError } from '../../components/notify';
import { connect } from '../../core';
import { createForm } from 'rc-form';
import styles from './index.less';
import AllCheck from './all-check';
import Filter from '../filter/index';


class ChkListBySup extends React.Component {
  constructor( props ) {
    super( props );
    console.log(props)
  }
  // componentWillMount(){
  //   if ( this.props.editsup.name === '' ) {
  //     this.getDetails( this.props.params.supplierid );
  //   }
  // }
  componentDidMount() {
    window.setDocumentTitle( '验收列表' );
    // console.log('didmount', this.props.editsup.name)
    if ( this.props.editsup.name === '' ) {
      this.getDetails( this.props.params.supplierid );
    }
  }

  getDetails( supplierid ) {
    this.props.asyncAjax( 'pur_order_getbysupplier', {
      data: {
        spltypeid: 0,
        wheresql: JSON.stringify({ sidorsname: supplierid.trim()}),
        pageindex: 1,
        pagesize: 30
      }
    })
    .before(() => {
      Toast.loading( '加载中...', 0 );
    })
    .done(( res ) => {
      Toast.hide();
      this.props.dispatch({
        type: 'editsup/remain',
        payload: {
          suppliername: res.data.items[0].suppliername
        }
      });
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

  componentWillUnmount() {
    // 清空modal数据
    Popup.hide();
  }


  goFirm=() => {
    if ( this.props.editsup.addList.length === 0 ) {
      Toast.info( '请至少选择一个商品!' );
    } else {
      this.props.dispatch(
        routerRedux.push( `/sup/firm-by-sup/${this.props.params.supplierid}` )
      );
    }

    if ( this.props.editsup.name === '' ) {
      this.getDetails( this.props.params.supplierid );
    }
  }

  goStore() {
    this.props.dispatch(
      routerRedux.push( '/sup/sel-store-sup' )
    );
  }

  goFilter() {

    const { editsup } = this.props;

    Popup.show(
      <Filter
        dateFrom={editsup.dateFilter.dateFrom}
        dateTo={editsup.dateFilter.dateTo}
        state={editsup.dateFilter.state}
        onSubmit={( values ) => {
          Popup.hide();
          this.props.dispatch({
            type: 'editsup/store',
            payload: {
              dateFilter: {
                key: `${+new Date()}`,
                dateFrom: values.dateFrom.format( 'YYYY-MM-DD' ),
                dateTo: values.dateTo.format( 'YYYY-MM-DD' ),
                state: values.state[0]
              },
            filter: ''
            }
          });
        }} />
    );
  }

  render() {
    const { editsup } = this.props;
    return ( <div>
      <div style={{ margin: '.2rem' }}>
        <span style={{ marginTop: '.1rem' }}>供应商名称：{this.props.editsup.name.suppliername}</span>
        <span style={{ color: '#108EE9', position: 'absolute', right: 0, marginRight: '0.2rem' }} onClick={::this.goFilter}>筛选</span>
      </div>
      <hr style={{ margin: '0px' }} />
      <span
        style={{
          color: '#108EE9',
          display: 'inline-block',
          fontSize: '0.32rem',
          margin: '.3rem'
        }}
        onClick={::this.goStore}>
        筛选部门/库房
      </span>
      <div className={styles.typename}>
        <span style={{ width: '50%' }}>订单号/商品/班组/状态</span>
        <span style={{ width: '30%' }}>进价/售价</span>
        <span style={{ width: '15%' }}>验收情况</span>
      </div>
      <AllCheck
        key={editsup.dateFilter.key}
        dateFrom={editsup.dateFilter.dateFrom}
        dateTo={editsup.dateFilter.dateTo}
        state={editsup.dateFilter.state}
        supplierid={this.props.params.supplierid} />
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
        }}>
        确认
      </button>
    </div> );
  }
}

function editsup({ editsup }) {
  return { editsup };
}

const ChkListBySupComponent = createForm()( ChkListBySup );

export default connect( editsup )( ChkListBySupComponent );

