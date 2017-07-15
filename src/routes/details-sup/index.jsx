import React from 'react';
import { routerRedux } from 'dva/router';
import { ListView, Stepper } from 'antd-mobile';
import { connect } from '../../core';
import { createForm } from 'rc-form';
import styles from './index.less';

class DetailsSup extends React.Component {
  constructor( props ) {
    super( props );
    const details = this.props.editsup.details;
    this.state = {
      inprice: details.inprice,
      outprice: details.outprice,
      val: details.amount ||
        Math.max( 0, (
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
      type: 'editsup/saveDetails'
    });
    this.props.dispatch(
      routerRedux.push( `/sup/firm-by-sup/${this.props.params.supplierid}` )
   	);
  }

  onChange = ( val ) => {
    // console.log(typeof(val));
    this.setState({
      val: val.toFixed( 2 )
    });
    this.props.dispatch({
      type: 'editsup/submit',
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
      type: 'editsup/submit',
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
      type: 'editsup/submit',
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
          <span className={styles.value}>{this.props.editsup.details.billno}</span>
        </li>
        <li>
          <span className={styles.label}>供应商 </span>
          <span className={styles.value}>{this.props.editsup.details.suppliername}</span>
        </li>
        <li>
          <span className={styles.label}>部门 </span>
          <span className={styles.value}>{this.props.editsup.details.dmname || this.props.editsup.details.housename}</span>
        </li>
        <li>
          <span className={styles.label}>商品名称 </span>
          <span className={styles.value}>{this.props.editsup.details.materialcode}&nbsp;{this.props.editsup.details.materialname}</span>
        </li>
        <li>
          <span className={styles.label}>商品规格 </span>
          <span className={styles.value}>{this.props.editsup.details.materialrule}</span>
        </li>
        <li>
          <span className={styles.label}>订单数量 </span>
          <span className={styles.value}>{this.props.editsup.details.orderamount}{this.props.editsup.details.unitname}</span>
        </li>
        <li>
          <span className={styles.label}>已验数量</span>
          <span className={styles.value}>
            {( Math.abs( this.props.editsup.details.checkamount ))
               .toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, '$1,' )}
            {this.props.editsup.details.unitname}
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
              onChange={this.onChange} />
          </span>
        </li>
        <li>
          <span className={styles.label}>进价</span>
          <span className={styles.value}>
            <input type="number"
              onChange={( e ) => this.inputValue1( e )}
              value={this.state.inprice} className={styles.special} />元/{this.props.editsup.details.unitname}
          </span>
        </li>
        <li>
          <span className={styles.label}>售价</span>
          <span className={styles.value}>
            <input type="number"
              onChange={( e ) => this.inputValue2( e )}
              value={this.state.outprice} className={styles.special} />元/{this.props.editsup.details.unitname}
          </span>
        </li>
        <li>
          <span className={styles.label}>金额</span>
          <span className={styles.value}>{this.props.editsup.details.orderoutmoney}元</span>
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
        onClick={() => this.goChk( this.props.editsup.name )}>确认</button>
    </div>
    );
  }

}


function editsup({ editsup }) {
  return { editsup };
}
const DetailsComponent = createForm()( DetailsSup );

export default connect( editsup )( DetailsComponent );
