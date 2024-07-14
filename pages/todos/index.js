import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useTodo from "../../hooks/useTodo";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import Link from "next/link";
import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";
import { useRouter } from "next/router";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";

const Specialist = () => {
  const {
    getUserTodoFunApi,
    deleteTodoFunApi
  } = useTodo();

  const [specialist, setSpecialist] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserTodoFunApi({
          onSuccess: (data) => {
            setSpecialist(data);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();

  const nextPage = (id) => {
    console.log("id", id);
    router.push(`/todos/edit?id=${id}`);
  };

  const handleDelete = (id) => {
    deleteTodoFunApi({ todoId: id });

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
            My Todo Lists
          </Typography>

          <Link href={"/todos/add"}>
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
              />{" "}
              Add Todo
            </Button>
          </Link>
        </Box>

        <CustomPaginationTable

          tableData={specialist}
          tableHeaderData={
            <>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Sr.
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Complete
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Title
              </TableCell>



              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Description
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
            </>
          }
          tableBodyData={(data, index) => (
            <>
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
                {index}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                <Checkbox
                  checked={data?.completed}
                  // onChange={handleChange}
                  color="primary"
                  inputProps={{ "aria-label": "Mark Complete" }}
                />
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
                {data.title}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.description}
              </TableCell>

              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Tooltip title="Remove" placement="top">
                    <TransitionsDialog
                      modelButton={
                        <IconButton
                          aria-label="remove"
                          size="small"
                          color="danger"
                          className="danger"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      }
                      submitButtonText="Delete"
                      handleSubmit={() => handleDelete(data.id)}
                    >
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src="/images/icon/alert.png"
                          width={150}
                          height={150}
                          alt="ok"
                        />

                        <Typography sx={{ fontSize: 18 }}>
                          <b>Are You Sure You Want To Delete ?</b>
                          <br />
                          <span style={{ fontSize: 14 }}>
                            You are deleting this data & this action is
                            irreversible
                          </span>
                        </Typography>
                      </div>
                    </TransitionsDialog>
                  </Tooltip>

                  <Tooltip title="Rename" placement="top">
                    <IconButton
                      aria-label="rename"
                      size="small"
                      color="primary"
                      className="primary"
                      onClick={() => nextPage(data.id)}
                    >
                      <DriveFileRenameOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default Specialist;
