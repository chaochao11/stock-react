import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from '../../core';
import styles from './index.less';


class SelStoreOrder extends React.Component {

  componentDidMount() {
    window.setDocumentTitle( '选择' );
  }

  goStore( filter ) {
    console.log( filter );
    this.props.dispatch({
      type: 'editbill/store',
      payload: {
        filter
      }
    });
    this.props.dispatch(
      routerRedux.replace( `/order/chk-list-by-order/${this.props.storeList[0].billno}` )
    );
  }


  render() {

    const { filter, storeList } = this.props;

    /*
    const arr = storeList.reduce(( arr, item ) => {
      const length = arr.filter(({ dmcode }) => item.dmcode === dmcode ).length;
      if ( length === 0 ) {
        arr.push({
          dmname: item.dmname,
          dmcode: item.dmcode,
          housename: item.housename
        });
      }
      return arr;
    }, []);
    */
    const depMap = {};
    storeList.map( item => {
      if ( !depMap[item.dmname || item.housename]) {
        depMap[item.dmname || item.housename] = {
          dmname: item.dmname,
          housecode: item.housecode,
          dmid: item.dmid,
          housename: item.housename,
          finished: 1
        };
      }
      if ( !item.checkcomplete ) {
        depMap[item.dmname || item.housename].finished = 0;
      }
    });
    const depList = [];// dep = department
    for ( const key in depMap ) {
      depList.push( depMap[key]);
    }
    return (
      <div style={{ backgroundColor: '#626264' }}>
        <div className={styles.myStore}>
          <p>部门/库房列表</p>
          <span
            onClick={() => this.goStore( '' )}
            className={( filter === '' ) ? styles.selected : ''}>
            全部
          </span>
          {depList.map(({ dmname, dmid, housename, finished,housecode }, houseid ) => {
            return (
              <span
                key={`${houseid}`}
                onClick={() => this.goStore( dmid ||housecode)}
                className={( dmid ||housecode) === filter ? styles.selected : finished ? styles.finished : styles.unfinished} >
                {dmname || housename}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ editbill }) {
  return {
    filter: editbill.filter,
    storeList: editbill.storeList
  };
}

export default connect( mapStateToProps )( SelStoreOrder );
