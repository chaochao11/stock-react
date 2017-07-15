import React from 'react';
import { routerRedux } from 'dva/router';
import { connect, session, compose, config } from '../../core';

class Frame extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentWillMount() {
    this.hasSession();
  }

  hasSession() {
    const userSession = session.get( config.keys.SESSION );
    if ( userSession ) {
      if ( this.props.location.pathname === '/' || this.props.location.pathname === '/login' ) {
     	this.props.dispatch(
				routerRedux.replace( '/scan-page' )
		);
      }
    } else {
      this.props.dispatch(
		routerRedux.replace( '/login' )
	);
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}
export default connect()( Frame );
