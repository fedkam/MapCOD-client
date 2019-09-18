import React, { useState, useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { setViewByCoordinates } from '../MapGis'
import { connect } from 'react-redux';
import { addSelectedStreet } from '../../actions';



const mapStateToProps = state => state;



const mapDispatchToProps = dispatch => ({
  onAddSelectedStreet: (addselectedstreet) => {
    dispatch(addSelectedStreet(addselectedstreet));
  }
});



const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100vh',
      overflow: 'auto',
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
    let {handleClick, open, id, child, classes, primary='NoData', selectedIndex} = props;
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
    //const [open, setOpen] = useState({});
    let open={};


    const handleClickStreet = (id) => {
        if(selectedIndex !== id){
          props.onAddSelectedStreet(id);
        }else{
          props.onAddSelectedStreet(undefined);
        }
    };


    const findIdHierarchyInDistrictsData = (id) => {
        let hierarchy = {lvl1:0, lvl2:0, lvl3:0};
          districtsData.map((lvl1) => {
            if(lvl1['items']  &&  lvl1.id != id){
                    lvl1.items.map((lvl2) => {
                      if(lvl2['items']  &&  lvl2.id != id){
                            lvl2.items.map((lvl3) => {
                              if(lvl3.id == id){
                                hierarchy.lvl1 = lvl1.id;
                                hierarchy.lvl2 = lvl2.id;
                                hierarchy.lvl3 = lvl3.id;
                              }
                            })
                      }else{  //здесь ПК итп
                        if(lvl2.id == id){
                          hierarchy.lvl1 = lvl1.id;
                          hierarchy.lvl2 = lvl2.id;
                        }
                      }
                    })
            }else{  //здесь ПК итп
              if(lvl1.id == id){
                hierarchy.lvl1 = lvl1.id;
              }
            }
          })
        return hierarchy;
    };


    const setOpenDistrictMenu = (id) => {
        if(districtsData.length){
          let {lvl1, lvl2, lvl3} = findIdHierarchyInDistrictsData(id);

          if(lvl1!=0 && lvl2!=0){
            open = {[lvl1]:!open[lvl1], [lvl2]:!open[lvl2]};
          }else if(lvl1!=0 && lvl2==0){
            open = {[lvl1] : !open[lvl1]};
          }
        }
    };


    const isEmpty = (obj) => {
     return  JSON.stringify(obj) == "{}";
    }


    const addRowsDistricts = (districtsData) => {
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
                                villages.push(
                                  <RowDistrict
                                      handleClick = {handleClickStreet.bind(this, villageId)}
                                      id = {villageId}
                                      open = {open[districtId]&&open[villageId]}
                                      primary = {village.name}
                                      classes = {classes.colapseLvl1}
                                      child = {streets.map((stree) => { return stree})}
                                    />
                                );
                          }else{
                            villages.push(
                              <RowDistrict
                                  handleClick = {handleClickStreet.bind(this, villageId)}
                                  selectedIndex={selectedIndex}
                                  id = {villageId}
                                  open = {open[districtId]&&open[villageId]}
                                  primary = {village.name}
                                  classes = {classes.colapseLvl1}
                                />
                            );
                          }
                        })
                }
                return(
                  <RowDistrict
                    handleClick = {handleClickStreet.bind(this, districtId)}
                    id = {districtId}
                    open = {open[districtId]}
                    primary = {district.name}
                    child = {villages.map((vill) => { return vill})}
                    />
                  );
              })
        );
    }

    setOpenDistrictMenu(selectedIndex)
    return(
      <div>
        {districtsData.length ? (
          <>
            <List className={classes.root}>
              {addRowsDistricts(districtsData)}
            </List>
          </>
        ):(
          <div>Опять косяк с передачей данных</div>
        )}
      </div>
    )
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(District);






//избавиться от преобразования в String при сравнении districtsData и selectedIndex
//продумать общую функц тройного цикла
//Переделать ожидание на App
//без useMemo функцКомпонент упадет в рекурсию изза setOpenDistrictMenu(){...setOpen()...}
