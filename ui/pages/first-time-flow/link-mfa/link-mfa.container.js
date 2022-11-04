import { connect } from 'react-redux';

import { getOnboardingInitiator } from '../../../selectors';
import { setCompletedOnboarding } from '../../../store/actions';
import LinkMFAScreen from './link-mfa.component';

const mapStateToProps = (state) => {
  return {
    onboardingInitiator: getOnboardingInitiator(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCompletedOnboarding: () => dispatch(setCompletedOnboarding()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkMFAScreen);
