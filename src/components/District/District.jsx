// District.jsx

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useStyle } from '@material-ui/styles';
import {
  TreeDataState,
  CustomTreeData,
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Template,
  TemplateConnector,
} from '@devexpress/dx-react-core'
import {
  Grid,
  TableTreeColumn,
  Table,
  VirtualTable,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({});


const Row = ({ tableRow, selected, onToggle, ...restProps }) => {
  //ответ https://stackoverflow.com/questions/25777826/onclick-works-but-ondoubleclick-is-ignored-on-react-component
  let timer = 0;
  let delay = 200;
  let prevent = false;
  const handleClick = () => {
    timer = setTimeout(() => {
      if (!prevent) {
        onToggle();
      }
      prevent = false;
    }, delay);
  };
  const handleDoubleClick = () => {
    clearTimeout(timer);
    prevent = true;
    alert(JSON.stringify(tableRow.row));
  }
  return (
    <Table.Row
      {...restProps}
      style={{
        backgroundColor: selected ? '#9de09d' : undefined,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    />
  );
};


function District(props) {
  const { rows } = props.data;
  const { columns, tableColumnExtensions } = props.districtTable;
  
  return (
      <Paper >
        <Grid
          rows={rows}
          columns={columns}
        >
          <SelectionState />
          <TreeDataState />
          <CustomTreeData
            getChildRows={getChildRows}
          />
          <VirtualTable
            rowComponent={Row}
            height='100vmin'
          />
          <TableTreeColumn
            for='name'
          />
          <TableSelection 
            highlightSelected 
            selectByRowClick 
          />

          <Template
            name="tableRow"
            predicate={({ tableRow }) => tableRow.type === Table.ROW_TYPE}
          >
            {params => (
              <TemplateConnector>
                {({ selection }, { toggleSelection }) => (
                  <Row
                    {...params}
                    selected={selection.findIndex((i) => i === params.tableRow.rowId) > -1}
                    onToggle={() => {toggleSelection({ rowIds: [params.tableRow.rowId] }); console.log("params.tableRow.rowId = " + params.tableRow.rowId + " __selection = " + selection);}}
                  />
                )
                
              }
              </TemplateConnector>
            )}
          </Template>
        </Grid>
      </Paper>
    );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);