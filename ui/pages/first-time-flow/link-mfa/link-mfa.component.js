import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MFA from '../../../components/ui/MFA';
import MetaFoxLogo from '../../../components/ui/metafox-logo';
import { INITIALIZE_END_OF_FLOW_ROUTE } from '../../../helpers/constants/routes';

export default class LinkMFAScreen extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static propTypes = {
    history: PropTypes.object,
    username: PropTypes.string,
    onAuthenticationStart: PropTypes.func,
    onAuthenticationFinish: PropTypes.func,
  };

  preAction = async () => {
    const { onAuthenticationStart } = this.props;
    onAuthenticationStart();
  };

  postAction = async () => {
    const { history, onAuthenticationFinish } = this.props;
    onAuthenticationFinish();
    history.push(INITIALIZE_END_OF_FLOW_ROUTE);
  };

  render() {
    const { username } = this.props;

    return (
      <div>
        <MetaFoxLogo />
        <MFA
          preAction={this.preAction}
          postAction={this.postAction}
          username={username}
        ></MFA>
      </div>
    );
  }
}
