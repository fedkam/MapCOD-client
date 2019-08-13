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
  const handleClick = () => {
    onToggle();
  };
  const handleDoubleClick = () => {
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
            showSelectionColumn={false}
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
                    hover
                    selected={selection.findIndex((i) => i === params.tableRow.rowId) > -1}
                    onToggle={() => {
                      if(selection.length){
                        toggleSelection({
                          rowIds: [selection[selection.length-1]] 
                        });
                      }
                      toggleSelection({
                        rowIds: [params.tableRow.rowId] 
                      }); 
                      console.log("params.tableRow.rowId = " + params.tableRow.rowId + " __selection = " + selection);
                  }}
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