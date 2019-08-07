// District.jsx

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState,
  CustomTreeData,
  FilteringState,
  IntegratedFiltering,
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableTreeColumn,
  VirtualTable,
  TableFilterRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({});





function District(props) {
  const { rows } = props.data;
  const { columns, tableColumnExtensions } = props.districtTable;
  const [selection, setSelection] = useState(rows);
  const styles = {
    name: {
      backgroundColor: '#a2e2a4',
    },
  };
  const TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => alert(JSON.stringify(row.id))}
      style={{
        cursor: 'pointer',
        ...styles[row.name.toLowerCase()],
      }}
    />
  );  
  console.log("District()= " + selection);

  return (
      <Paper >
          <Grid
            rows={rows}
            columns={columns}
          >
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <TreeDataState />
          <CustomTreeData
            getChildRows={getChildRows}
          />
          <Table
            rowComponent={TableRow}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <TableTreeColumn
            for="name"
          />
        </Grid>
      </Paper>
    );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);