import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

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


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  colapseLvl1: {
    paddingLeft: theme.spacing(2),
  },
  colapseLvl2: {
    paddingLeft: theme.spacing(4),
  },
  colapseLvl3: {
    paddingLeft: theme.spacing(6),
  },
}));





const RowDistrict = (props) => {
  console.log(props.handleClick, props.id, props.open);

  let {handleClick, open, id, child, classes} = props;
  return(
      <div>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="component" className={classes}/>
          {child && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {
          child &&
            <Collapse
                key={id}
                component="li"
                in={open}
                timeout="auto"
                unmountOnExit
            >
              <List component="div" disablePadding>
                {child}
              </List>
            </Collapse>
        }
      </div>
  );
}


export default function Test(){
  const classes = useStyles();
  const items = getItems();
  const [ open, setOpen] = useState([]);

  const handleClick = e => {
      console.log("____", e, open, !open[e]);
      setOpen({[e]: !open[e]});
      //setOpen({ ['3']: !open['3'], ['4']: !open['4'] });
  };

  const test2 = <RowDistrict
    handleClick = {handleClick.bind(this, '101')}
    id = {'101'}
    open = {open['101']}
    classes = {useStyles().colapseLvl1}
  />

  return(
    <div>
      <List
        subheader={
          <ListSubheader> 1 </ListSubheader>
        }
        className={classes.root}
      >
        <RowDistrict
          handleClick = {handleClick.bind(this, '1')}
          id = {'1'}
          open = {open['1']}
          child = {test2}
        />

        <ListItem button onClick={handleClick.bind(this,'3')}>
          <ListItemText primary="Inbox2" />
          {open['3'] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
            key={'3'}
            component="li"
            in={open['3']}
            timeout="auto"
            unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem button onClick={handleClick.bind(
                                          this,
                                          ['3','4']
                                      )}>
              <ListItemText primary="Starred" />
              {open['3']&&open['4'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                key={'4'}
                component="li"
                in={open['3']&&open['4']}
                unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred2" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

      </List>
    </div>
  )
}
