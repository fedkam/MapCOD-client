// District.jsx

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useStyle } from '@material-ui/styles';
import {
  TreeDataState,
  CustomTreeData,
  FilteringState,
  IntegratedFiltering,
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Template,
  TemplateConnector,
} from '@devexpress/dx-react-core'
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
  const Row = ({ tableRow, selected, onToggle, ...restProps }) => {
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
    
    console.log("Row");

    return (
      <VirtualTable.Row
        {...restProps}
        className={selected ? 'active' : ''}
        style={{ color: 'green' }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      />
    );
  };
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
          <TableSelection 
            highlightSelected 
            selectByRowClick 
          />
          <TableTreeColumn
            for='name'
          />
          <Template
            name='tableRow'
            predicate={({ tableRow }) => tableRow.type === 'name'}
          >
            {params => (
              <TemplateConnector>
                {({ selection }, { toggleSelection }) => (
                  <Row
                    {...params}
                    selected={selection.has(params.tableRow.rowId)}
                    onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                  />
                )}
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