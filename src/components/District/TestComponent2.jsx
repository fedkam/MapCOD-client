import React, { useState, Fragment } from "react";
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
    let {handleClick, open, id, child, classes, primary='Test', selectedIndex} = props;
    //console.log(id, open);
    return(
        <div>
          <ListItem
            button
            selected={selectedIndex === id}
            onClick={handleClick}>
            <ListItemText primary={primary} className={classes}/>
            {child && !open && <ExpandMore/>}
          </ListItem>
          { //если prop child = true рисуем tree
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
  const [open, setOpen] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});

  const handleClickCollapse = e => {
      console.log("____handleClickCollapse()", e, open, !open[e]);
      if(e.length != 1){
        setOpen({[e[0]]:open[e[0]], [e[1]]:!open[e[1]]});
        //setOpen();
      }else{
        setOpen({[e]: !open[e]});
      }
  };

  const handleClickStreet = (e, id) => {
    if(selectedIndex !== id){
      setSelectedIndex(id);
    }else{
      setSelectedIndex(null);
    }
      //alert("НА нА " + e + id);
  };


  const test3 = <RowDistrict
      handleClick={e => handleClickStreet(e, '103')}
      selectedIndex={selectedIndex}
      id={'103'}
      open={open['103']}
      primary="жопа"
      classes={useStyles().colapseLvl2}
  />
  const test5 = <RowDistrict
      handleClick={e => handleClickStreet(e, '105')}
      selectedIndex={selectedIndex}
      id={'105'}
      open={open['105']}
      primary="жопа2"
      classes={useStyles().colapseLvl2}
  />
  const test2 = <RowDistrict
    handleClick = {handleClickCollapse.bind(this, ['1','2'])}
    id = {'2'}
    open = {open['1']&&open['2']}
    primary = "ПК"
    child = {test5}
    classes = {useStyles().colapseLvl1}
    />
    const testMulti=[];
    testMulti.push(test3);
    testMulti.push(test5);
  const test4 =
    <RowDistrict
        handleClick = {handleClickCollapse.bind(this, ['8','2'])}
        id = {'2'}
        open = {open['8']&&open['2']}
        primary = "Зав"
        child = {
          testMulti.map((test) => { return test})}
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
      </List>
    </div>
  )
}
