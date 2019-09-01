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
import { setViewByCoordinates } from '../MapGis'
import { connect } from 'react-redux';
import { addSelectedStreet } from '../../actions';


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({
  onAddSelectedStreet: (addselectedstreet, latitude, longitude) => {
    console.log(addselectedstreet, latitude, longitude);
    dispatch(addSelectedStreet(addselectedstreet, latitude, longitude));
  }
});


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    colapseLvl1: {
      paddingLeft: theme.spacing(3),
    },
    colapseLvl2: {
      paddingLeft: theme.spacing(6),
    },
    colapseLvl3: {
      paddingLeft: theme.spacing(9),
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
    const districtsData = props.data.rows;
    const selectedIndex = String(props.selectedStreet.selectedIndex);
    const [open, setOpen] = useState({});

    const handleClickCollapse = e => {
        //console.log("____handleClickCollapse()"," event=", e," open=", open," !open=", !open[e]);
        //console.log("e",e,e.length);
        if(e.length != 1){
          setOpen({[e[0]]:open[e[0]], [e[1]]:!open[e[1]]});
        }else{
          setOpen({[e]: !open[e]});
        }
    };

    const handleClickStreet = (id) => {
        if(selectedIndex !== id){
          //выделить
          const street = findStreetInDistrictsData(id);
          props.onAddSelectedStreet(street.id, street.latitude, street.longitude);
          setViewByCoordinates(street.latitude, street.longitude, 15);
        }else{
          //снять выделение
          props.onAddSelectedStreet(undefined, undefined, undefined);
          setViewByCoordinates(undefined, undefined, undefined);
        }
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
                          streets=[];
                          if(village['items']){
                                village.items.map((street) => {
                                  //console.log('lvl_district.name='+ district.name+" districtId="+districtId + ' lvl_2_village.name='+ village.name +" villageId="+villageId+ ' lvl_3 '+ street.name+" streetsId="+streetsId);
                                  streetsId = String(street.id);
                                  streets.push(
                                    <RowDistrict
                                        handleClick={handleClickStreet.bind(this, streetsId)}
                                        selectedIndex={selectedIndex}
                                        id={streetsId}
                                        open={open[streetsId]}
                                        primary={street.name}
                                        classes={classes.colapseLvl2}
                                    />
                                  );
                                })
                          }
                          villages.push(
                            <RowDistrict
                                handleClick = {handleClickCollapse.bind(this, [districtId, villageId])}
                                id = {villageId}
                                open = {open[districtId]&&open[villageId]}
                                primary = {village.name}
                                classes = {classes.colapseLvl1}
                                child = {streets.map((stree) => { return stree})}
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

    const findStreetInDistrictsData = id => {
        let findedStreet;
          districtsData.map((district) => {
            if(district['items']){
                    district.items.map((village) => {
                      if(village['items']){
                            village.items.map((street) => {
                              if(street.id == id){
                                findedStreet = street;
                              }
                            })
                          }
                        })
                      }else{  //здесь ПК итп
                        if(district.id == id){
                          findedStreet = district;
                        }
                      }
          })
          return findedStreet;
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






//избавиться от преобразования в String
//продумать общую функц тройного цикла
