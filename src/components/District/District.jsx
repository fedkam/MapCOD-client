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
import { connect } from 'react-redux';

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


const mapStateToProps = state => state.data;


const mapDispatchToProps = dispatch => {
  //onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
};


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


function District(props){
  const classes = useStyles();
  //const items = getItems();
  const districtsData = props.rows;
  const [open, setOpen] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  //console.log(districtsData);

  const handleClickCollapse = e => {
      //console.log("____handleClickCollapse()"," event=", e," open=", open," !open=", !open[e]);
      //console.log("e",e,e.length);
      if(e.length != 1){
        setOpen({[e[0]]:open[e[0]], [e[1]]:!open[e[1]]});
      }else{
        setOpen({[e]: !open[e]});
      }
  };

  const handleClickStreet = (e, id) => {
    if(selectedIndex !== id){
      //выделить
      setSelectedIndex(id);
    }else{
      //снять выделение
      setSelectedIndex(null);
    }
      //alert("НА нА " + e + id);
  };



 const addRowsDistricts = districtsData => {
    return(
      districtsData.map((district) => {
          let districtId = String(district.id);
          let villageId=null;
          let streetsId=null;
          let villages=[]; //контенер для сел
          let streets=[];  //контенер для улиц

          if(district['items']){
              district.items.map((village) => {
                villageId = String(village.id);
                //console.log("districtId=",districtId," villageId=",villageId);
                /*if(village['items']){
                    village.items.map((street) => {
                      console.log('lvl_district.name='+ district.name+" districtId="+districtId + ' lvl_2_village.name='+ village.name +" villageId="+villageId+ ' lvl_3 '+ street.name);
                    })
                }*/
                villages.push(
                  <RowDistrict
                      handleClick = {handleClickCollapse.bind(this, [districtId, villageId])}
                      id = {villageId}
                      open = {open[districtId]&&open[villageId]}
                      primary = {village.name}
                      child = {null}
                      classes = {classes.colapseLvl1}
                    />
                );
              })
        }
        return(
          <RowDistrict
            handleClick = {handleClickCollapse.bind(this, [districtId])}
            id = {districtId}
            open = {open[districtId]}
            primary = {district.name}
            child = {villages.map((vill) => { return vill})}
            />
          );
      })
    );
  }

  return(
    <div>
      <List className={classes.root}>
        {addRowsDistricts(districtsData)}
      </List>
    </div>
  )
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);
