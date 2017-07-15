
import React from 'react';
import { SearchBar } from 'antd-mobile';
import { connect } from '../../core';
import OrderList from './list';

class SelOrderNum extends React.Component {
  state = {
    focused: true
  };

  componentDidMount() {
    window.setDocumentTitle( '选择订单号' );
    this.props.dispatch({
      type: 'editbill/init'
    });
  }

  handleSubmit( search ) {
    // console.log(search)
    this.setState({ search });
  }

  render() {
    return (
      <div>
        <SearchBar
          focused={this.state.focused}
          onFocus={() => {
            this.setState({
              focused: false
            });
          }}
          placeholder="搜索"
          onSubmit={value => this.handleSubmit( value )}
          cancelText="" />
        <OrderList orderno={this.state.search} />
      </div>
    );
  }
}
function editbill({ editbill }) {
  return { editbill };
}
export default connect( editbill )( SelOrderNum );
