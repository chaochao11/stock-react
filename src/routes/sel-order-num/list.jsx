import React from 'react';
import { ListView, Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { requestError } from '../../components/notify';
import { connect } from '../../core';


class OrderList extends React.Component {
  constructor( props ) {
    super( props );
    const dataSource = new ListView.DataSource({
      rowHasChanged: ( row1, row2 ) => row1 !== row2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      loading: true
    };
  }

  componentDidMount() {
    if ( this.props.orderno ) {
      this.getDetails( this.props.orderno );
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.orderno !== nextProps.orderno && nextProps.orderno ) {
      this.getDetails( nextProps.orderno );
    } else if ( !nextProps.orderno ) {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows([]) });
    }
  }

  // 搜索订单号
  // orderdate:计划日期
  // supplierid:供应商(-1: 全部)
  // dmid:部门(-1: 全部)
  // state:状态(-1：全部 1：未验收 2：已验收)
  // orderno:订单号 模糊查询
  getDetails( orderno ) {
    this.props.asyncAjax( 'pur_order_getbyparam', {
      data: {
        orderno,
        topnum: 50
      }
    })
    .before(() => {
      Toast.loading( '加载中...', 0 );
      this.setState({
        loading: true
      });
    })
    .done(( res ) => {
      Toast.hide();
      this.setState({
        loading: false,
        dataSource: this.state.dataSource.cloneWithRows( res.data.items )
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
  goList( rowData ) {
    this.props.dispatch(
      routerRedux.push( `/order/chk-list-by-order/${rowData.billno}` )
    );
    this.props.dispatch({
      type: 'editbill/remain',
      payload: rowData
    });
    // console.log(rowData)
  }

  render() {

    const row = ( rowData, rowID ) => {
      return (
        <div key={rowID} className="row">
          <div>
            <div
              style={{
                height: '0.68rem',
                borderBottom: '1px solid #ddd',
                lineHeight: '0.68rem',
                paddingLeft: '.2rem',
                fontSize: '.26rem',
                color: '#666'
              }}
              onClick={() => this.goList( rowData )} >
              {rowData.billno}  &nbsp;&nbsp; {rowData.suppliername}
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.Loading ? '加载中...' : '暂无更多数据'}
        </div>}
        style={{
          height: 'calc(100vh - 0.88rem)'
        }}
        renderRow={row}
        className="am-list"
        initialListSize={50}
        pageSize={20}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onEndReachedThreshold={10} />
    );
  }
}

export default connect()( OrderList );
