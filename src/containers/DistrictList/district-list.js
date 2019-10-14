import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import { RowDistrict } from '../../components/RowDistrict';

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

function DistrictList(props){
    const classes = useStyles();
    const districtsData = props.data.rows;
    const selectedIndex = props.selectedStreet.selectedIndex;
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
            if(lvl1['items']  &&  lvl1.id !== id){
                    lvl1.items.map((lvl2) => {
                      if(lvl2['items']  &&  lvl2.id !== id){
                            lvl2.items.map((lvl3) => {
                              if(lvl3.id === id){
                                hierarchy.lvl1 = lvl1.id;
                                hierarchy.lvl2 = lvl2.id;
                                hierarchy.lvl3 = lvl3.id;
                              }
                            })
                      }else{  //здесь ПК итп
                        if(lvl2.id === id){
                          hierarchy.lvl1 = lvl1.id;
                          hierarchy.lvl2 = lvl2.id;
                        }
                      }
                    })
            }else{  //здесь ПК итп
              if(lvl1.id === id){
                hierarchy.lvl1 = lvl1.id;
              }
            }
          })
        return hierarchy;
    };

    const setOpenDistrictMenu = (id) => {
        if(districtsData.length){
          let {lvl1, lvl2} = findIdHierarchyInDistrictsData(id);

          if(lvl1!==0 && lvl2!==0){
            open = {[lvl1]:!open[lvl1], [lvl2]:!open[lvl2]};
          }else if(lvl1!==0 && lvl2===0){
            open = {[lvl1] : !open[lvl1]};
          }
        }
    };

    const addRowsDistricts = (districtsData) => {
        return(
              districtsData.map((district) => {
                  let districtId = district.id;
                  let villageId=null;
                  let streetsId=null;
                  let villages=[]; //контенер для сел
                  let streets=[];  //контенер для улиц

                  if(district['items']){
                        district.items.map((village) => {
                          villageId = village.id;
                          streets=[];

                          if(village['items']){
                                village.items.map((street) => {
                                  streetsId = street.id;
                                  streets.push(
                                    <RowDistrict
                                        key={streetsId}
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
                                      key={villageId}
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
                                  key={villageId}
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
                    key={districtId}
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

    return(
      <div>
        {districtsData.length ? (
          <>
            <List className={classes.root}>
              {setOpenDistrictMenu(selectedIndex)}
              {addRowsDistricts(districtsData)}
            </List>
          </>
        ):(
          <div>Опять косяк с передачей данных</div>
        )}
      </div>
    )
}

export default DistrictList;







//избавиться от преобразования в String при сравнении districtsData и selectedIndex
//продумать общую функц тройного цикла
//Переделать ожидание на App
//без useMemo функцКомпонент упадет в рекурсию изза setOpenDistrictMenu(){...setOpen()...}
//избавиться от List
