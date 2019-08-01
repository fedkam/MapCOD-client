// District.jsx

import * as React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({
  //onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
});


class District extends React.PureComponent {
  render() {
      const { rows } = this.props.data;
      const { columns, tableColumnExtensions } = this.props.districtTable;
      return (
        <Paper >
          <Grid
            rows = {rows}
            columns = {columns}
          >
            <TreeDataState />
            <CustomTreeData
              getChildRows = {getChildRows}
            />
            <Table
              columnExtensions = {tableColumnExtensions}
            />
            <VirtualTable 
              height='100vmin'
            />
            <TableTreeColumn
              for="name"
            />
          </Grid>
        </Paper>
      );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);