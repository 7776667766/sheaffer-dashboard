import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
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
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFunApi } from "store/admin/services";
import Image from "next/image";

function UsersLists(props) {
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

UsersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { allUsers } = useSelector((state) => state.admin);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers.dataFatched) {
      dispatch(getAllUsersFunApi());
    }
  }, [allUsers.dataFatched, dispatch]);

  useEffect(() => {
    setRows(allUsers.data);
  }, [allUsers.data]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            My Users
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 600 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Sr
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Phone
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Role
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Verified
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allUsers.isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      textAlign: "center",
                    }}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
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
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell
                      style={{ width: 250, borderBottom: "1px solid #F7FAFF" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={row.image}
                          alt={row.name}
                          width={40}
                          height={40}
                          className="borRadius100 "
                          style={{
                            objectFit: "cover",
                            aspectRatio: "1/1",
                          }}
                        />

                        <Box className="ml-10px">
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                            as="h5"
                          >
                            {row.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#A9A9C8",
                            }}
                          >
                            @{row.name.toLowerCase().split(" ").join("")}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell
                      style={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "13px",
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "13px",
                      }}
                    >
                      {row.phone}
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "13px",
                      }}
                    >
                      <i
                        className={
                          row.role === "admin"
                            ? "ri-macbook-line"
                            : row.role === "owner"
                            ? "ri-shield-user-fill"
                            : row.role === "manager"
                            ? "ri-edit-line"
                            : "ri-user-3-line"
                        }
                      />{" "}
                      {row.role}
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{
                        fontWeight: 500,
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "12px",
                      }}
                    >
                      <span
                        className={
                          row.verified ? "successBadge" : "dangerBadge"
                        }
                      >
                        {row.verified ? "Verified" : "Not Verified"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={4}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
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
                  ActionsComponent={UsersLists}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
