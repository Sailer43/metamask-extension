import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/ui/button';
import Snackbar from '../../../components/ui/snackbar';
import MetaFoxLogo from '../../../components/ui/metafox-logo';
import { SUPPORT_REQUEST_LINK } from '../../../helpers/constants/common';
import { DEFAULT_ROUTE } from '../../../helpers/constants/routes';
import { returnToOnboardingInitiatorTab } from '../onboarding-initiator-util';
import {
  EVENT,
  EVENT_NAMES,
  CONTEXT_PROPS,
} from '../../../../shared/constants/metametrics';
import ZENDESK_URLS from '../../../helpers/constants/zendesk-url';

export default class LinkMFAScreen extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static propTypes = {
    history: PropTypes.object,
    setCompletedOnboarding: PropTypes.func,
    onboardingInitiator: PropTypes.exact({
      location: PropTypes.string,
      tabId: PropTypes.number,
    }),
  };

  async _beforeUnload() {
    await this._onOnboardingComplete();
  }

  _removeBeforeUnload() {
    window.removeEventListener('beforeunload', this._beforeUnload);
  }

  async _onOnboardingComplete() {
    const { setCompletedOnboarding } = this.props;
    await setCompletedOnboarding();
  }

  onComplete = async () => {
    const { history, onboardingInitiator } = this.props;

    this._removeBeforeUnload();
    await this._onOnboardingComplete();
    if (onboardingInitiator) {
      await returnToOnboardingInitiatorTab(onboardingInitiator);
    }
    history.push(DEFAULT_ROUTE);
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this._beforeUnload.bind(this));
  }

  componentWillUnmount = () => {
    this._removeBeforeUnload();
  };

  render() {
    const { t } = this.context;
    const { onboardingInitiator } = this.props;

    return (
      <div>
        <MetaFoxLogo />
      </div>
    );
  }
}
