import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from '../../core';
import styles from './index.less';


class SelStoreSup extends React.Component {

  componentDidMount() {
    window.setDocumentTitle( '选择' );
  }

  goStore( filter ) {
    console.log( 'filter', filter );
    this.props.dispatch({
      type: 'editsup/store',
      payload: {
        filter
      }
    });
    this.props.dispatch(
      routerRedux.replace( `/sup/chk-list-by-sup/${this.props.storeList[0].supplierid}` )
    );
  }


  render() {
    // console.log(this.props.editsup.storeList)
    const { filter, storeList } = this.props;
    /*
    const arr = storeList.reduce(( arr, item ) => {
      const length = arr.filter(({ dmid }) => item.dmid === dmid ).length;
      if ( length === 0 ) {
        arr.push({
          dmname: item.dmname,
          dmid: item.dmid,
          housename: item.housename });
      }
      return arr;
    }, []);
    */
    const depMap = {};
    storeList.map( item => {
      if ( !depMap[item.dmname || item.housename]) {
        depMap[item.dmname || item.housename] = {
          dmname: item.dmname,
          dmid: item.dmid,
          housename: item.housename,
          finished: 1,
          housecode: item.housecode
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
          {depList.map(({ dmname, dmid, housename, finished, housecode }, houseid ) => {
            return (
              <span
                key={`${houseid}`}
                onClick={() => this.goStore( dmid || housecode )}
                className={( dmid || housecode ) === filter ? styles.selected : finished ? styles.finished : styles.unfinished}>
                {( dmname || housename )}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ editsup }) {
  return {
    filter: editsup.filter,
    storeList: editsup.storeList
  };
}

export default connect( mapStateToProps )( SelStoreSup );
