import { connect } from 'react-redux';
import { addSelectedStreet } from '../../actions';
import DistrictList from './district-list';

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
