import * as React from 'react';

const connect = require('react-redux').connect;
const Link = require('react-router').Link;

import { loginUser, logoutUser } from '../actions/session';

import Button from '../../../common/components/button';
import Content from '../../../common/components/content';
import Navigator from '../../../common/components/navigator';
import NavigatorItem from '../../../common/components/navigator-item';

interface IAppProps extends React.Props<any> {
  session: any;
  login: () => void;
  logout: () => void;
};

function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser()),
    logout: () => dispatch(logoutUser()),
  };
}

class App extends React.Component<IAppProps, void> {

  render() {
    const { children, session, login, logout } = this.props;
    const isLoggedIn = true;

    return (
      <div>
        <Navigator>
          <NavigatorItem isVisible={ isLoggedIn } >
            <Link to="/">Users</Link>
          </NavigatorItem>
          <NavigatorItem isVisible={ isLoggedIn }>
            <Button onClick={ logout } className="">
              Logout
            </Button>
          </NavigatorItem>
        </Navigator>
        <Content isVisible={ isLoggedIn }>
          { children }
        </Content>
      </div>
    );
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
