import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({});


const getInfoData = () => {

};

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    overflowX: 'auto',
  },
  tableBody:{
    width: 20,
  },
  districtLogo: {
   marginRight: 30,
   width: 100,
   height: 100,
 },
 districtNameLogo: {
   paddingTop: theme.spacing(6),
 }
}));


function Info(props){
  //let infoData = getInfoData;
  const classes = useStyles();
  const districtsData = props.data.rows;
  return(
    <div>
      {districtsData.length && (
        <div>
          <Grid container direction='row' justify='center' alignItems='center' className={classes.districtNameLogo}>
            <img alt='districtLogo' src='districtLogo/pk.jpg' className={classes.districtLogo} />
            <Grid  direction='column' justify='center'>
              <Typography variant="h4" id="tableTitle">
                Петропавловс-Камчаткий
              </Typography>
              <Typography variant="h6" id="tableTitle">
                ул. Площадь Ленина, 1
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify='center' alignItems='center'>
            <Paper className={classes.root}>
              <Table>
                <h2>Общая информация</h2>
                <TableBody >
                    <TableRow >
                      <TableCell component="th" scope="row"><b>Оборудование:</b></TableCell>
                      <TableCell align="left">Наименование</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row"><b>Дата монтажа:</b></TableCell>
                      <TableCell align="left">dd/mm/yy</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row"><b>Дата ввода в эксплуатацию:</b></TableCell>
                      <TableCell align="left">dd/mm/yy</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row"><b>Дата ввода в эксплуатацию:</b></TableCell>
                      <TableCell align="left">dd/mm/yy</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </div>
      )}
    </div>
  );
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
