import * as React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from '@mui/material/Checkbox';
import styles from '@/styles/PageTitle.module.css'
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { getAllContactFunApi } from "store/admin/services";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// Create new user Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
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
// End Create new user Modal

function MembersLists(props) {
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

MembersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, image, userName, email, message, projects) {
  return {
    name,
    image,
    userName,
    email,
    message,
    projects,
  };
}

const rows = [
  createData(
    "Evangelina Mcclain",
    "/images/user1.png",
    "@jstevenson5c",
    "jordansteve@gmail.com",
    "HTML, CSS & JS",
    "165"
  ),
  createData(
    "Candice Munoz",
    "/images/user2.png",
    "@candice3unoz",
    "candicemunoz@gmail.com",
    "React, Next.js",
    "120"
  ),
  createData(
    "Mike Mcclain",
    "/images/user3.png",
    "@mike4mcclain",
    "mikemcclain@gmail.com",
    "Angular, Gatsby",
    "220"
  ),
  createData(
    "Bernard Langley",
    "/images/user4.png",
    "@bernardlangley",
    "bernardlangley@gmail.com",
    "HTML, React & Sass",
    "122"
  ),
  createData(
    "Kristie Hall",
    "/images/user5.png",
    "@kristie7hall",
    "kristiehall@gmail.com",
    "React, Next.js & Sass",
    "360"
  ),
  createData(
    "Bolton Obrien",
    "/images/user6.png",
    "@bolton4obrien",
    "boltonobrien@gmail.com",
    "Angular, HTML & Sass",
    "250"
  ),
  createData(
    "Dee Alvarado",
    "/images/user7.png",
    "@dee3alvarado",
    "deealvarado@gmail.com",
    "React, Next.js & Sass",
    "140"
  ),

].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function MembersList() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch()
  const { allUsers } = useSelector((state) => state.admin);
  console.log("allUsers", allUsers)

  useEffect(() => {
    if (!allUsers.dataFatched) {
      dispatch(getAllContactFunApi());
    }
  }, [allUsers.dataFatched, dispatch]);


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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
            Users List
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 850 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Name
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Email
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Message
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? allUsers.data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                :
                allUsers.data).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #F7FAFF",
                        paddingTop: "13px",
                        paddingBottom: "13px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        className=""
                      >
                        <Box>
                          <Typography
                            as="h5"
                            sx={{
                              fontWeight: "500",
                              fontSize: "13.5px",
                            }}
                          >
                            {row.name}
                          </Typography>

                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "13px",
                        paddingTop: "13px",
                        paddingBottom: "13px",
                      }}
                    >
                      {row.email}
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "13px",
                        paddingTop: "13px",
                        paddingBottom: "13px",
                      }}
                    >
                      {row.message}
                    </TableCell>

                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={5}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

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
                  ActionsComponent={MembersLists}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Create new user modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Create New User
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose}
              className="modal-close"
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Image
                  </Typography>

                  <TextField
                    autoComplete="image"
                    name="image"
                    required
                    fullWidth
                    id="image"
                    type="file"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Name
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    User Name
                  </Typography>

                  <TextField
                    autoComplete="user-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Email
                  </Typography>

                  <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="example@info.com"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Message
                  </Typography>

                  <TextField
                    autoComplete="tags"
                    name="tags"
                    required
                    fullWidth
                    id="tags"
                    label="Tags"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Projects
                  </Typography>

                  <TextField
                    autoComplete="projects"
                    name="projects"
                    required
                    fullWidth
                    id="projects"
                    label="Example 5"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} textAlign="end">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                    onClick={handleClose}
                    className='mr-15px'
                  >
                    <ClearIcon
                      sx={{
                        position: "relative",
                        top: "-1px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Create New User
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
}
