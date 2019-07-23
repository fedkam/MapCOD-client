// District.jsx

import * as React from 'react';
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
} from '@devexpress/dx-react-grid-material-ui';

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

class District extends React.PureComponent {
  render() {
      const { data, columns, tableColumnExtensions } = this.props;
      return (
        <Paper>
          <Grid
            rows={data}
            columns={columns}
          >
            <TreeDataState />
            <CustomTreeData
              getChildRows={getChildRows}
            />
            <Table
              columnExtensions={tableColumnExtensions}
            />
            <TableHeaderRow />
            <TableTreeColumn
              for="name"
            />
          </Grid>
        </Paper>
      );
  }
}

export default District;