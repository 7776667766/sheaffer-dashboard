import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState } from "react";
import TablePaginationActionList from "./TablePaginationActionList";

export const CustomPaginationTable = ({
  tableHeaderData,
  tableBodyData,
  tableData,
  isLoading,
  ...props
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columnsLength =
    tableHeaderData !== undefined
      ? tableHeaderData?.props?.children?.length
      : 0;

  return (
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
          <TableRow>{tableHeaderData}</TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columnsLength}
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  textAlign: "center",
                }}
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : tableData?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columnsLength}
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  textAlign: "center",
                }}
              >
                No Record Found
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? tableData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            )?.map((data, index) => (
              <TableRow key={index}>
                {tableBodyData !== undefined &&
                  tableBodyData(data, page * rowsPerPage + index + 1)}
              </TableRow>
            ))
          )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell
                colSpan={columnsLength}
                style={{ borderBottom: "1px solid #F7FAFF" }}
              />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={columnsLength}
              count={tableData?.length || 0}
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
  );
};
