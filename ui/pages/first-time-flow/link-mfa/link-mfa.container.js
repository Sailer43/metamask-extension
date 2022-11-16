import { connect } from 'react-redux';

import { getSelectedAddress } from '../../../selectors';
import LinkMFAScreen from './link-mfa.component';
import {
  hideLoadingIndication,
  showLoadingIndication,
} from '../../../store/actions';

const mapStateToProps = (state) => {
  return {
    username: getSelectedAddress(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticationStart: () =>
      dispatch(
        showLoadingIndication(
          'Please Finish Multi-factor Authentication First!',
        ),
      ),
    onAuthenticationFinish: () => dispatch(hideLoadingIndication()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkMFAScreen);
