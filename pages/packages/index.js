import React, { useEffect, useState } from "react";
import { Box, IconButton, Switch, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { useDispatch, useSelector } from "react-redux";
import { deletePackageFunApi, getAllPlanFunApi } from "store/plan/plan";
import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";
import { useRouter } from "next/router";

const TemplatesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { plan } = useSelector((state) => state.plan);
  console.log(plan, "plan");



  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  useEffect(() => {
    if (plan.dataFatched !== true) {
      dispatch(getAllPlanFunApi());
    }
  }, [dispatch, plan.data, plan.dataFatched]);

  const nextPage = (id, event) => {
    event.preventDefault();

    console.log("frnotend id of packages", id);
    router.push(`/packages/edit-packages/${id}`);
  };

  const handleDelete = (id) => {
    console.log(id, "id for delete");
    dispatch(deletePackageFunApi(id));
  };

  const [planitem, setPlanitem] = useState({});
console.log("planitem",planitem)
  const [toggledButtons, setToggledButtons] = useState({});
  const handleToggle = (buttonId) => {
    setToggledButtons((prevToggledButtons) => {
      const newToggledButtons = {
        ...prevToggledButtons,
        [buttonId]: !prevToggledButtons[buttonId],
      };

      // Find the item in plan.data corresponding to the buttonId
      const updatedPlanData = plan.data.map((item) => {
        if (item.isFeatured === buttonId) {
          // Assuming each item has an 'id' property
          // Update the isFeatured property based on the button toggle
          return {
            ...item,
            isFeatured: !item.isFeatured,
          };
        }
        console.log("item is", item.isFeatured);
        return item.isFeatured;
      });

      console.log("buttonId:", buttonId);
console.log('updatedPlanData:', updatedPlanData);
      // console.log('prevToggledButtons:', prevToggledButtons);
      
      // Update the state with the modified plan.data
      setPlanitem((prevPlan) => ({
        ...prevPlan,
        data: updatedPlanData.filter((item) => item._id === buttonId) || prevPlan.data,
      }));

      // Call getSpecificFeaturedElement when a button is toggled
      // getSpecificFeaturedElement();

      return newToggledButtons;
    });
  };

  const [dataa, setData] = useState();

  // const handleToggle = () => {
  //   // setData((prevData) => ({
  //   //   ...prevData,
  //   //   [uniqueId]: {
  //   //     ...prevData[uniqueId],
  //   //     isFeatured: !prevData[uniqueId]?.isFeatured || true,
  //   //   },
  //   // }));

  // console.log("data is ",dataa)
  // };
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
                Toggle
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
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  textAlign: "end",
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
                {/* {console.log("iddddd",item.id)}
                 */}
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
                {data.duration}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {formatPrice(data.price)}
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
                  {data?.features?.map((feature, index) => (
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
                {data.isFeatured ? "True" : "False"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {/* <Switch
                  checked={isPrivate}
                  onChange={handleStatus}
                  inputProps={{ "aria-label": "switch" }}
                  // value={data.isFeatured}
                /> */}
                <Switch
                  key={data.id}
                  checked={toggledButtons.isFeatured}
                  onChange={() => handleToggle(data.isFeatured)}
                  inputProps={{ "aria-label": "toggle isFeatured" }}
                  // style={{ background:data.isFeatured? 'green' : 'red' }}
                />
                {/* <Typography>{`Switch is ${detail? 'On' : 'Off'}`}</Typography> */}
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
                    data.status === "active" ? "successBadge" : "dangerBadge"
                  }
                >
                  {data.status ? "Active" : "In Active"}
                </span>
              </TableCell>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                {" "}
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
                    handleSubmit={() => handleDelete(data._id)}
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
                    aria-label="edit"
                    size="small"
                    color="primary"
                    className="primary"
                    onClick={(event) => nextPage(data._id, event)}
                  >
                    <DriveFileRenameOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default TemplatesPage;
