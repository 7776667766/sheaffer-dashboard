import React, { useEffect} from "react";
import { Box,  Typography } from "@mui/material";
import Card from "@mui/material/Card";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemplateFunApi } from "store/template/services";

const TemplatesPage = () => {
  const dispatch = useDispatch();
  const { template } = useSelector((state) => state.template);
  console.log(template, "template")

  useEffect(() => {
    if (template.dataFatched !== true) {
      dispatch(
        getAllTemplateFunApi(
        )
      );
    }
  }, [dispatch, template.data, template.dataFatched]);

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
            My Templates
          </Typography>
          <Link href="/templates/add-template">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
              }}
            >
              <AddIcon
                sx={{ position: "relative", top: "-1px" }}
                className="mr-5px"
              />
              Add Template
            </Button>
          </Link>
        </Box>

        <CustomPaginationTable
          tableData={template}
          isLoading={false}
          tableHeaderData={
            <>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Sr.No
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
                Slug
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Website
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Booking
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
                {index + 0}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.name}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.slug}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
               <Link
                  variant="outlined"
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${data.slug}`}
                  target="_blank"
                  sx={{
                    pt: "2px",
                    pb: "1px",
                  }}
                >
                  <img
                    src={data.websiteImage}
                    alt="website Image"
                    style={{
                      width: "50px",
                      height: "50px", 
                    
                    }}
                  />
                </Link>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <Link
                  variant="outlined"
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${data.slug}`}
                  target="_blank"
                  sx={{
                    pt: "2px",
                    pb: "1px",
                  }}
                >
                  <img
                    src={data.bookingImage}
                    style={{
                      width: "50px",
                      height: "50px", 
                    
                    }}
                  />
                </Link>

              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default TemplatesPage;
