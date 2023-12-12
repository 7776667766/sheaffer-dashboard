import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import Link from "next/link";
import TablePaginationActionList from "@/components/Table/TablePaginationActionList";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getServicesTypeFunApi} from "store/service/services";

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
    "Sr.no",
    "Name",
   
  ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const Services = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = useState([]);
  const {serviceType}=useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    if (serviceType.dataFatched !== true) {
      dispatch(
        getServicesTypeFunApi()
      );
    }
  }, [ dispatch, serviceType.serviceFetch]);
  useEffect(() => {
    setRows(serviceType.data);
  }, [serviceType]);



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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  // End Add Task Modal

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
           Services Types
          </Typography>

          <Link href="/services/add-service-type">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
                color: "#fff !important",
              }}
            >
              <AddIcon
                sx={{ position: "relative", top: "-1px" }}
                className="mr-5px"
              />  
              Add Services Type
            </Button>
          </Link>
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
                  SR.No
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
            Name
            
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
              {(rowsPerPage > 0
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
                    {index + 1 + page * rowsPerPage}
                  </TableCell>

                
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    {row.name}
                  </TableCell>

                  

                

                  <TableCell
                    align="right"
                    sx={{ borderBottom: "1px solid #F7FAFF" }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                      }}
                    >
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
                  ActionsComponent={TablePaginationActionList}
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

export default Services;
