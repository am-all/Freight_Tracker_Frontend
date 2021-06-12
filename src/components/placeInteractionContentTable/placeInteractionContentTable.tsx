import React, { FC, ReactElement } from 'react';
import { withStyles, Theme, createStyles, makeStyles, useTheme, } from '@material-ui/core/styles';

import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, TableFooter, TablePagination, IconButton } from '@material-ui/core';

import { KeyboardArrowLeft, KeyboardArrowRight, } from '@material-ui/icons';

import FirstPageIcon from '@material-ui/icons/FirstPage';

import LastPageIcon from '@material-ui/icons/LastPage';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { setRowsPerPage, setPage } from '../../screen/placeInteraction/placeInteractionSlice';


const StyledTableCell = withStyles((theme: Theme) =>


  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);


const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const PlaceInteractionForm: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    dispatch(setPage(newPage));
  };
  
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };
  
  
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  const vehicleList = useAppSelector((state) => state.vehicleList.value);
  const rowsPerPage = useAppSelector((state) => state.vehicleList.rows_per_page)
  const page = useAppSelector((state) => state.vehicleList.page)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Licence no.</StyledTableCell>
            <StyledTableCell >Time</StyledTableCell>
            <StyledTableCell>Coordinates (lat,lon)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? vehicleList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : vehicleList
          ).map((vehicle, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell >{(index + 1)}</StyledTableCell>
              <StyledTableCell >{vehicle.license}</StyledTableCell>
              <StyledTableCell >{vehicle.date_time}</StyledTableCell>
              <StyledTableCell >{vehicle.lat + "," + vehicle.lng}</StyledTableCell>
            </StyledTableRow>
          ))}
          {vehicleList.length == 0 &&
            <StyledTableRow>
              <StyledTableCell colSpan={4} >No Data</StyledTableCell>
            </StyledTableRow>
          }
        </TableBody>
        {vehicleList.length > 0 && <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={vehicleList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>}
      </Table>
    </TableContainer>
  );
}

export default PlaceInteractionForm;
