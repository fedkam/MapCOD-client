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
            columnExtensions={tableColumnExtensions}
          />
          <VirtualTable 
            height='100vmin'
          />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <TableTreeColumn
            for="name"
          />
          <TableSelection
            selectByRowClick
            highlightRow
            showSelectionColumn={false}
          />
        </Grid>
      </Paper>
    );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);