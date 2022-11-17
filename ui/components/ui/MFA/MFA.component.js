import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import { getAuthUrl } from '../../../store/actions';

export default class MFA extends Component {
  static propTypes = {
    username: PropTypes.string,
    preAction: PropTypes.func,
    postAction: PropTypes.func,
    children: PropTypes.string,
    fetchingToken: PropTypes.func,
  };

  static defaultProps = {
    username: 'metamask-test1',
    children: 'Authenticate',
  };

  constructor(props) {
    super(props);
    this.state = { authUrl: '#' };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { authUrl } = this.state;
    return authUrl !== nextState.authUrl;
  }

  _onComponentDidMount() {
    const { username } = this.props;
    getAuthUrl(username).then((authUrl) => {
      this.setState({ authUrl });
    });
  }

  onAuthenticate = async () => {
    const { preAction, postAction, username, fetchingToken } = this.props;
    const { authUrl } = this.state;
    await preAction();
    window.open(authUrl, '_blank', 'noopener,noreferrer');
    await fetchingToken(username);
    await postAction();
  };

  componentDidMount() {
    this._onComponentDidMount();
  }

  render() {
    const { children } = this.props;

    return (
      <Button type="primary" onClick={this.onAuthenticate}>
        {children}
      </Button>
    );
  }
}
