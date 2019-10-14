import { connect } from 'react-redux';
import { addSelectedStreet } from '../../actions';
import DistrictList from './DistrictList';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onAddSelectedStreet: (addselectedstreet) => {
    dispatch(addSelectedStreet(addselectedstreet));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistrictList);
