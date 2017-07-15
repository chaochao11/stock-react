import React from 'react';
import { routerRedux } from 'dva/router';
import { Stepper } from 'antd-mobile';
import { connect } from '../../core';
import { createForm } from 'rc-form';
import styles from './index.less';

class DetailsOrder extends React.Component {
  constructor( props ) {
    super( props );
    const details = this.props.editbill.details;
    this.state = {
      inprice: details.inprice,
      outprice: details.outprice,
      val: details.amount ||
        Math.max( 0,(
          details.orderamount - details.checkamount
        ))
    };
  }

  componentDidMount() {
    window.setDocumentTitle( '商品详情' );
    if ( this.props.billno ) {
      this.getData( this.props.billno );
    }
  }
  goChk() {
    this.props.dispatch({
      type: 'editbill/saveDetails'
    });
    this.props.dispatch(
      routerRedux.replace( `/order/firm-by-order/${this.props.params.billno}` )
    );
  }
  onchange = ( val ) => {
    this.setState({
      val: val.toFixed( 2 )
    });
    this.props.dispatch({
      type: 'editbill/submit',
      payload: {
        amount: val
      }
    });
  }
  inputValue1 = ( e ) => {
    this.setState({
      inprice: parseFloat( e.target.value ).toFixed( 2 )
    });
    this.props.dispatch({
      type: 'editbill/submit',
      payload: {
        inprice: e.target.value
      }
    });
  }
  inputValue2 = ( e ) => {

    this.setState({
      outprice: parseFloat( e.target.value ).toFixed( 2 )
    });
    this.props.dispatch({
      type: 'editbill/submit',
      payload: {
        outprice: e.target.value
      }
    });
  }
  render() {
    return ( <div>
      <ul className={styles.textbody}>
        <li>
          <span className={styles.label}>订单流水 </span>
          <span className={styles.value}>{this.props.editbill.details.billno}</span>
        </li>
        <li>
          <span className={styles.label}>供应商 </span>
          <span className={styles.value}>{this.props.editbill.details.suppliername}</span>
        </li>
        <li>
          <span className={styles.label}>部门 </span>
          <span className={styles.value}>{this.props.editbill.details.dmname || this.props.editbill.details.housename}</span>
        </li>
        <li>
          <span className={styles.label}>商品名称 </span>
          <span className={styles.value}>{this.props.editbill.details.materialcode}&nbsp;{this.props.editbill.details.materialname}</span>
        </li>
        <li>
          <span className={styles.label}>商品规格 </span>
          <span className={styles.value}>{this.props.editbill.details.materialrule}</span>
        </li>
        <li>
          <span className={styles.label}>订单数量 </span>
          <span className={styles.value}>{this.props.editbill.details.orderamount}{this.props.editbill.details.unitname}</span>
        </li>
        <li>
          <span className={styles.label}>已验数量</span>
          <span className={styles.value}>
            {( Math.abs( this.props.editbill.details.checkamount ))
             .toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, '$1,' )}
            {this.props.editbill.details.unitname}
          </span>
        </li>
        <li>
          <span className={styles.label}>验收数量</span>
          <span className={styles.value}>
            <Stepper
              style={{ width: '2.8rem' }}
              showNumber
              type="number"
              min={0}
              value={this.state.val}
              onChange={this.onchange} />
          </span>
        </li>
        <li>
          <span className={styles.label}>进价</span>
          <span className={styles.value}>
            <input type="number"
              onChange={( e ) => this.inputValue1( e )}
              value={this.state.inprice}
              className={styles.special} />元/{this.props.editbill.details.unitname}
          </span>
        </li>
        <li>
          <span className={styles.label}>售价</span>
          <span className={styles.value}>
            <input type="number"
              onChange={( e ) => this.inputValue2( e )}
              value={this.state.outprice}
              className={styles.special} />元/{this.props.editbill.details.unitname}
          </span>
        </li>
        <li>
          <span className={styles.label}>金额</span>
          <span className={styles.value}>{this.props.editbill.details.orderoutmoney} 元</span>
        </li>
      </ul>
      <button style={{
        width: '100%',
        backgroundColor: '#2DB245',
        height: '.88rem',
        fontSize: '0.28rem',
        color: '#fff',
        position: 'fixed',
        bottom: '0px',
        border: 'none' }}
        onClick={() => this.goChk( this.props.editbill.title )}>确认</button>
    </div>

    );
  }

}

function editbill({ editbill }) {
  return { editbill };
}
const DetailsComponent = createForm()( DetailsOrder );

export default connect( editbill )( DetailsComponent );
