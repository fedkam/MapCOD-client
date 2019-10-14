import DistrictMap from './district-map';
import { connect } from 'react-redux';
import { addSelectedStreet } from '../../actions';


const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	  onAddSelectedStreet: (addselectedstreet) => {
	    dispatch(addSelectedStreet(addselectedstreet));
	  }
});

export default connect(
	  mapStateToProps,
	  mapDispatchToProps
)(DistrictMap);
