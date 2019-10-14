import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';

const RowDistrict = (props) => {
    let {
      handleClick,
      selectedIndex,
      id,
      open,
      primary='NoData',
      classes,
      child
    } = props;

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

export default RowDistrict;




//избавиться от преобразования в String при сравнении districtsData и selectedIndex
//продумать общую функц тройного цикла
//Переделать ожидание на App
//без useMemo функцКомпонент упадет в рекурсию изза setOpenDistrictMenu(){...setOpen()...}
