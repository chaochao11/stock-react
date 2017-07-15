import React from 'react';
import { SearchBar } from 'antd-mobile';
import { connect } from '../../core';
import OrderList from './list';


class SelSupplier extends React.Component {

  state = {
    focused: true
  };

  componentDidMount() {
    window.setDocumentTitle( '选择供应商' );
    this.props.dispatch({
      type: 'editsup/init'
    });
  }

  handleSubmit( search ) {
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
        <OrderList supplierid={this.state.search} />
      </div>
    );
  }
}

function editsup({ editsup }) {
  return { editsup };
}

export default connect( editsup )( SelSupplier );
