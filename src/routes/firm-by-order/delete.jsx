import React from 'react';
import { routerRedux } from 'dva/router';
import { requestError } from '../../components/notify';
import { connect } from '../../core';
import { Icon, ListView, Toast } from 'antd-mobile';
import styles from './delete.less';

class Delete extends React.Component {
  constructor( props ) {
    super( props );
    const dataSource = new ListView.DataSource({
      rowHasChanged: ( row1, row2 ) => row1 !== row2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows( this.props.editbill.addList )
    };
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.editbill.addList !== nextProps.editbill.addList ) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows( nextProps.editbill.addList )
      });
    }
  }

  goDetails( rowData ) {
    this.props.dispatch(
      routerRedux.push( `/order/details-order/${this.props.billno}` )
    );
    // 商品详情页
    this.props.dispatch({
      type: 'editbill/show',
      payload: rowData
    });
  }

  /* 删除*/
  handleRemove( rowData ) {
    this.props.dispatch({
      type: 'editbill/remove',
      payload: rowData
    });
  }

  render() {

    const row = ( rowData ) => {
      const oramount = rowData.orderamount;
      const checkamount = rowData.checkamount;
      let chknum = oramount - checkamount;
      if ( chknum <= 0 ) {
        chknum = 0;
      } else {
        chknum =  chknum ;
      }
      return (
        <div className={styles.listWrapper} >
          <div className={styles.prefaceWrapper} onClick={() => this.handleRemove( rowData )} >
            <Icon type={require( '../../assets/icon/delete.svg' )} className={styles.icon} />
          </div>

          <div className={styles.infoWrapper} onClick={() => this.goDetails( rowData )} >
            <div>
              <span className={styles.date}>
                {rowData.materialname}&nbsp;&nbsp;{rowData.materialrule}
              </span>
              <span className={styles.date} >
                订单量:{rowData.orderamount}
              </span>
            </div>
            <div>
              <span>
                {rowData.dmname || rowData.housename}&nbsp;&nbsp;
                <a style={rowData.checkcomplete ? { color: '#000' } : { color: '#f00' }}>{rowData.checkcomplete ? '已完成' : '未完成' }</a>
              </span>
              <span className={styles.date}>
                已验量:{rowData.checkamount || '0'}
              </span>
            </div>
          </div>
          <div className={styles.num}>
            <span
              style={
                      ( chknum || rowData.amount ) <= '0'
                      ? { color: '#f00', marginRight: '.3rem' }
                      : { color: 'blue', marginRight: '.3rem' }
                    }>
              {
                rowData.amount || Math.max( 0,( rowData.orderamount - rowData.checkamount ))
              }
            </span>
          </div>
        </div>
      );
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '暂无更多数据'}
        </div>}
        style={{
          height: 'calc(80vh - 1.68rem)',
          overflow: 'hidden'
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

function editbill({ editbill }) {
  return { editbill };
}

export default connect( editbill )( Delete );
