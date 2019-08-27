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
  let {handleClick, open, id, child, classes, primary='Test'} = props;
  //console.log(id, open);
  return(
      <div>
        <ListItem button onClick={handleClick}>
          <ListItemText primary={primary} className={classes}/>
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
  const [ open, setOpen] = useState({});

  const handleClickCollapse = e => {
      console.log("____handleClickCollapse()", e, open, !open[e]);
      if(e.length != 1){
        setOpen({[e[0]]:open[e[0]], [e[1]]:!open[e[1]]});
        //setOpen();
      }else{
        setOpen({[e]: !open[e]});
      }
  };

  const handleClickStreet = e => {
      alert("НА нА " + e);
  };

  const test3 = <RowDistrict
      handleClick = {handleClickStreet.bind(this,'103')}
      id = {'103'}
      open = {open['103']}
      primary = "жопа"
      classes = {useStyles().colapseLvl2}
  />

  const test2 = <RowDistrict
    handleClick = {handleClickCollapse.bind(this, ['1','2'])}
    id = {'2'}
    open = {open['1']&&open['2']}
    primary = "ПК"
    child = {test3}
    classes = {useStyles().colapseLvl1}
  />

  const test4 = <RowDistrict
    handleClick = {handleClickCollapse.bind(this, ['8','2'])}
    id = {'2'}
    open = {open['8']&&open['2']}
    primary = "Зав"
    child = {test3}
    classes = {useStyles().colapseLvl1}
  />


  return(
    <div>
      <List className={classes.root}>
        <RowDistrict
          handleClick = {handleClickCollapse.bind(this, '1')}
          id = {'1'}
          open = {open['1']}
          primary = "Камча"
          child = {test2}
        />

        <RowDistrict
          handleClick = {handleClickCollapse.bind(this, '8')}
          id = {'8'}
          open = {open['8']}
          primary = "Вилюч"
          child = {test4}
        />
        <ListItem button onClick={handleClickCollapse.bind(this,'3')}>
          <ListItemText primary="Inbox2" />
          {!open['3'] && <ExpandMore />}
        </ListItem>
        <Collapse
            key={'3'}
            component="li"
            in={open['3']}
            timeout="auto"
            unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem button onClick={handleClickCollapse.bind(
                                          this,
                                          ['3','4']
                                      )}>
              <ListItemText primary="Starred" className={classes.colapseLvl1}/>
              {open['3']&&open['4'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                key={'4'}
                component="li"
                in={open['3']&&open['4']}
                unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem button className={classes.colapseLvl2}>
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
