import { connect } from 'react-redux';
import MFA from './MFA.component';
import { fetchingToken } from '../../../store/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingToken: (username) => dispatch(fetchingToken(username)),
  };
};

export default connect(null, mapDispatchToProps)(MFA);
