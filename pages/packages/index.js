import React from "react";
import { Box, Button, TableCell, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { getAllPlanFunApi } from "store/plan/plan";

const PackagePage = () => {
  const dispatch = useDispatch();

  const { plan } = useSelector((state) => state.plan);

  useEffect(() => {
    if (!plan.dataFatched) {
      dispatch(getAllPlanFunApi());
    }
  }, [dispatch, plan.dataFatched]);

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
            Business Packages
          </Typography>

          <Link href="/packages/add-package">
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
              Add Package
            </Button>
          </Link>
        </Box>

        <CustomPaginationTable
          tableData={plan.data}
          isLoading={plan.isLoading}
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
                Duration
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Features
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Featured
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  textAlign: "end",
                }}
              >
                Status
              </TableCell>
            </>
          }
          tableBodyData={(item, index) => (
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
                {item.name}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {item.duration}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {item.price}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <ol
                  style={{
                    padding: 0,
                  }}
                >
                  {item.features.map((feature, index) => (
                    <li key={index}>{feature.trim()}</li>
                  ))}
                </ol>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {item.isFeatured ? "True" : "False"}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: 500,
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "12px",
                }}
              >
                <span
                  className={
                    item.status === "active" ? "successBadge" : "dangerBadge"
                  }
                >
                  {item.status ? "Active" : "In Active"}
                </span>
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default PackagePage;
