import React, { Fragment } from 'react';
import { Grid, Paper, Typography, ListItem, ListItemText, ListItemIcon, List, } from '@material-ui/core';

const styles = {
  Paper: {pading: 20, marginTop: 10, marginBottom: 10}
}

let data = ['a', 'b', 'c','d'];

export default () =>
  <Grid container>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {data.map((datus) =>
          <Fragment>
            <Typography
              variant='h3'>
              {datus}
            </Typography>
            <List component='ul'>
              <ListItem button>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
          </Fragment>
        )}
      </Paper>
    </Grid>
    <Grid item sm>
      <Paper style={styles.Paper}>
        2
      </Paper>
    </Grid>
  </Grid >
