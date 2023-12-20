import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { getMyBookingFunApi } from "store/booking/booking";
import moment from 'moment';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  ;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ToDoList(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

ToDoList.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  name,
  url,
  startDate,
  endDate,
  status,
  badgeClass,
  completion,
  priority
) {
  return {
    name,
    url,
    startDate,
    endDate,
    status,
    badgeClass,
    completion,
    priority,
  };
}

const rows = [
  createData(
    "Public Beta Release",
    "/images/user1.png",
    "1 Jan 2022",
    "1 Apr 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "Fix Platform Errors",
    "/images/user2.png",
    "1 Mar 2022",
    "1 May 2022",
    "Pending",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "Launch our Mobile App",
    "/images/user3.png",
    "15 Apr 2022",
    "15 Jun 2022",
    "Pending",
    "primaryBadge",
    "7/10",
    "Medium"
  ),
  createData(
    "Add the New Pricing Page",
    "/images/user4.png",
    "15 May 2022",
    "15 Jun 2022",
    "Pending",
    "dangerBadge",
    "1/10",
    "Low"
  ),
  createData(
    "Redesign New Online Shop",
    "/images/user5.png",
    "15 Jun 2022",
    "15 Aug 2022",
    "On Going",
    "primaryBadge",
    "0/10",
    "Low"
  ),
  createData(
    "Material Ui Design",
    "/images/user6.png",
    "15 Jul 2022",
    "15 Sep 2022",
    "On Going",
    "primaryBadge",
    "7/10",
    "Medium"
  ),
  createData(
    "Add Progress Track",
    "/images/user7.png",
    "15 Mar 2022",
    "15 May 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "Web Design",
    "/images/user8.png",
    "15 Aug 2022",
    "15 Dec 2022",
    "On Going",
    "primaryBadge",
    "9/10",
    "High"
  ),
  createData(
    "Web Development",
    "/images/user9.png",
    "15 Nov 2022",
    "15 Jan 2023",
    "On Going",
    "primaryBadge",
    "8/10",
    "High"
  ),
  createData(
    "React App Development",
    "/images/user10.png",
    "15 Jan 2022",
    "15 Mar 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "eCommerce Development",
    "/images/user11.png",
    "15 Mar 2022",
    "15 May 2022",
    "On Going",
    "primaryBadge",
    "8/10",
    "Medium"
  ),
  createData(
    "App Development",
    "/images/user12.png",
    "15 May 2022",
    "15 Jul 2022",
    "On Going",
    "primaryBadge",
    "5/10",
    "Medium"
  ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const Booking = () => {


  const dispatch = useDispatch();

  const { booking } = useSelector((state) => state.booking);
  console.log("booking", booking)
  const { role } = useSelector((state) => state.auth);
  console.log("role", role)


  const { business } = useSelector((state) => state.business);
  console.log("business", business)

  useEffect(() => {
    if (booking.dataFatched !== true) {
      dispatch(
        getMyBookingFunApi({
          businessId: business?.id,
        })
      );
    }
  }, [dispatch, booking.data, booking.dataFatched, business?.id]);

  const bookingData = booking && booking.data ? booking.data : [];


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const router = useRouter();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleNavigate = () => {
    router.push("/services/add-service-type");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            My Booking List
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 930 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Sr.N
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Phone
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  timeSlot
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Price
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Status
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(bookingData > 0
                ? rows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : bookingData
              ).map((row, index) => (

                <TableRow key={row.name}>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    {index + 1}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "500",
                      fontSize: "13px",
                      borderBottom: "1px solid #F7FAFF",
                      color: "#260944",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    {/* <Checkbox {...label} size="small" /> */}
                    {row.name}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    {row.phone}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    {moment(row.date).format('MMMM D, YYYY h:mm A')}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    {row.timeSlot}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                    align="center"
                  >
                    {row.price}
                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "12px",
                      padding: "8px 10px",
                    }}
                  >
                    <span className={
                      row.status === 'Delivered' ? 'successBadge' :
                        row.status === 'Pending' ? 'primaryBadge' :
                          row.status === 'Cancelled' ? 'dangerBadge' : ''
                    }>{row.status}</span>                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ borderBottom: "1px solid #F7FAFF" }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                      }}
                    >

                      <Tooltip title="Rename" placement="top">
                        <IconButton
                          aria-label="rename"
                          size="small"
                          color="primary"
                          className="primary"
                        >
                          <DriveFileRenameOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={4}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>
            {/* <TableBody>
      {bookingData.map((row) => (
        <TableRow key={row._id}>
          <TableCell
            sx={{
              fontWeight: '500',
              fontSize: '13px',
              borderBottom: '1px solid #F7FAFF',
              color: '#260944',
              pt: '16px',
              pb: '16px',
            }}
          >
            <Checkbox size="small" />
            {row.name}
          </TableCell>

          <TableCell
            sx={{
              borderBottom: '1px solid #F7FAFF',
              pt: '16px',
              pb: '16px',
            }}
          >
            <Avatar alt="User" src={row.url} sx={{ width: 35, height: 35 }} />
          </TableCell>
          <TableCell align="right" sx={{ borderBottom: '1px solid #F7FAFF' }}>
            <Box sx={{ display: 'inline-block' }}>
              <Tooltip title="Remove" placement="top">
                <IconButton
                  aria-label="remove"
                  size="small"
                  color="danger"
                  className="danger"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Rename" placement="top">
                <IconButton
                  aria-label="rename"
                  size="small"
                  color="primary"
                  className="primary"
                >
                  <DriveFileRenameOutlineIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        </TableRow>
      ))}
        {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell
            colSpan={4}
            style={{ borderBottom: '1px solid #F7FAFF' }}
          />
        </TableRow>
      )}  
    </TableBody> */}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={ToDoList}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default Booking;
