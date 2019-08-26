/*import React, { Fragment } from 'react';
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
              variant='h2'>
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
        2 4 5
      </Paper>
    </Grid>
  </Grid >*/



  import React from "react";
  import PropTypes from "prop-types";
  import ListSubheader from "@material-ui/core/ListSubheader";
  import List from "@material-ui/core/List";
  import ListItem from "@material-ui/core/ListItem";
  import ListItemIcon from "@material-ui/core/ListItemIcon";
  import ListItemText from "@material-ui/core/ListItemText";
  import Collapse from "@material-ui/core/Collapse";

  import ExpandLess from "@material-ui/icons/ExpandLess";
  import ExpandMore from "@material-ui/icons/ExpandMore";

  import Divider from "@material-ui/core/Divider";
  import { withStyles } from "@material-ui/core/styles";


  const styles = theme => ({
      root: {
          width: "100%",
          maxWidth: 360,
          background: theme.palette.background.paper
      },
      nested: {
          paddingLeft: theme.spacing.unit * 4
      }
  });


  function getItems() {
      var json = {
          list: [
              {
                  id: 1,
                  title: "Google",
                  items: [
                      {
                          id: 1,
                          name: "Android",
                          subitems: [
                              {
                                  id: 1,
                                  name: "Nougat"
                              },
                              {
                                  id: 2,
                                  name: "Lollipop"
                              }
                          ]
                      },
                      {
                          id: 2,
                          name: "Chrome"
                      }
                  ]
              },
              {
                  id: 2,
                  title: "Apple",
                  items: [
                      {
                          id: 1,
                          name: "Mac"
                      },
                      {
                          id: 2,
                          name: "Iphone",
                          subitems: [
                              {
                                  id: 1,
                                  name: "Iphone 6"
                              },
                              {
                                  id: 2,
                                  name: "Iphone 10"
                              }
                          ]
                      }
                  ]
              },
              {
                  id: 3,
                  title: "Uber",
                  items: [
                      {
                          id: 1,
                          name: "Eats"
                      },
                      {
                          id: 2,
                          name: "Freight"
                      }
                  ]
              }
          ]
      };
      return json;
  }


  class NestedList extends React.Component {
      state = {};
      handleClick = e => {
          this.setState({ [e]: !this.state[e] });
      };
      render() {
          const items = getItems();
          const { classes } = this.props;
          return (
              <div>
                  {items.list.map(list => {
                      return (
                          <List
                              className={classes.root}
                              key={list.id}
                              subheader={
                                  <ListSubheader>{list.title}</ListSubheader>
                              }
                          >
                              {list.items.map(item => {
                                  return (
                                      <div key={item.id}>
                                          {item.subitems != null ? (
                                              <div key={item.id}>
                                                  <ListItem
                                                      button
                                                      key={item.id}
                                                      onClick={this.handleClick.bind(
                                                          this,
                                                          item.name
                                                      )}
                                                  >
                                                    <ListItemText primary={item.name} />
                                                    {this.state[item.name] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}
                                                  </ListItem>
                                                  <Collapse
                                                      key={list.items.id}
                                                      component="li"
                                                      in={this.state[item.name]}
                                                      timeout="auto"
                                                      unmountOnExit
                                                  >
                                                      <List disablePadding>
                                                          {item.subitems.map(
                                                              sitem => {
                                                                  return (
                                                                      <ListItem
                                                                          button
                                                                          key={
                                                                              sitem.id
                                                                          }
                                                                          className={
                                                                              classes.nested
                                                                          }
                                                                      >
                                                                          <ListItemText
                                                                              key={
                                                                                  sitem.id
                                                                              }
                                                                              primary={
                                                                                  sitem.name
                                                                              }
                                                                          />
                                                                      </ListItem>
                                                                  );
                                                              }
                                                          )}
                                                      </List>
                                                  </Collapse>{" "}
                                              </div>
                                          ) : (
                                              <ListItem
                                                  button
                                                  onClick={this.handleClick.bind(
                                                      this,
                                                      item.name
                                                  )}
                                                  key={item.id}
                                              >
                                                  <ListItemText
                                                      primary={item.name}
                                                  />
                                              </ListItem>
                                          )}
                                      </div>
                                  );
                              })}
                              <Divider key={list.id} absolute />
                          </List>
                      );
                  })}
              </div>
          );
      }
  }


  NestedList.propTypes = {
      classes: PropTypes.object.isRequired
  };


  export default withStyles(styles)(NestedList);



/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"

      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
);
}*/
