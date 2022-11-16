import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class MFA extends Component {
  static AUTHENTICATOR_URL = 'https://localhost:3000/';
  static REQUEST_URL_ENDPOINT = 'request_url';
  static REQUEST_TOKEN_ENDPOINT = 'request_token';

  static propTypes = {
    username: PropTypes.string,
    preAction: PropTypes.func,
    postAction: PropTypes.func,
    children: PropTypes.string,
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

    fetch(`${MFA.AUTHENTICATOR_URL}${MFA.REQUEST_URL_ENDPOINT}`, {
      method: 'POST',
      body: { username },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      response.json().then((result) => {
        const { authUrl } = result;
        if (!authUrl) {
          throw new Error('Unable to find url');
        }
        this.setState({ authUrl });
      });
    });
  }

  _fetchingToken = async () => {
    const { username } = this.props;
    while (true) {
      let response = await fetch(
        `${MFA.AUTHENTICATOR_URL}${MFA.REQUEST_TOKEN_ENDPOINT}?username=${username}`,
        {
          method: 'GET',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let result = await response.json();
      const { verified, token } = result;
      if (verified && token) {
        return token;
      }
      await sleep(2000);
    }
  };

  onAuthenticate = async () => {
    const { preAction, postAction } = this.props;
    const { authUrl } = this.state;
    await preAction();
    window.open(authUrl, '_blank', 'noopener,noreferrer');
    await this._fetchingToken();
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
