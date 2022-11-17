import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MFA from '../../../components/ui/MFA';
import MetaFoxLogo from '../../../components/ui/metafox-logo';
import { INITIALIZE_END_OF_FLOW_ROUTE } from '../../../helpers/constants/routes';
import DUO_SECURITY_URLS from '../../../helpers/constants/duosecurity_url';

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
    isFirstTimeSetup: PropTypes.bool,
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
    const { t } = this.context;
    const { username, isFirstTimeSetup } = this.props;

    return (
      <div className="first-time-flow__wrapper">
        <MetaFoxLogo />
        <div className="first-time-flow__header">
          {isFirstTimeSetup ? t('linkMFAMessage1') : t('recoveryWithMFAText1')}
        </div>
        {isFirstTimeSetup ? (
          <div>
            <div className="link-mfa__text-1">{t('linkMFAMessage2')}</div>
            <div className="link-mfa__text-2">
              <a
                href={DUO_SECURITY_URLS.WHAT_IS_MFA}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{t('linkMFAMessage3')}</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="link-mfa__text-3">{t('recoveryWithMFAText2')}</div>
            <div className="link-mfa__text-4">{t('recoveryWithMFAText3')}</div>
            <div className="link-mfa__text-4">{t('recoveryWithMFAText4')}</div>
            <div className="link-mfa__text-4">{t('recoveryWithMFAText5')}</div>
          </div>
        )}

        <MFA
          className="link-mfa__mfa"
          preAction={this.preAction}
          postAction={this.postAction}
          username={username}
        >
          {isFirstTimeSetup ? t('linkMFAMessage4') : t('recoveryWithMFAText6')}
        </MFA>
      </div>
    );
  }
}
