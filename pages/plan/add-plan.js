import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addPlanFunApi } from "store/plan/plan";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const addPlans = () => {
  const { plan ,isLoading} = useSelector((state) => state.plan);
  console.log("plan-------->123", plan)


  const dispatch = useDispatch();


  const plans = [
    {
      name: "3 Months",
      value: "3months",
    },
    { name: "6 Months", value: "6months" },
    { name: "1 Year", value: "1 year" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      duration: formData.get("duration"),
      price: formData.get("Price"),
      description: formData.get("Descripition"),
      features: formData.get("isFeatured") === "on",
    };

    dispatch(addPlanFunApi({ data }));
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "10px",
          }}
        >
          Add Plans
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box sx={{ mb: "10px" }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="duration"  
                  select
                  fullWidth
                  label="Duration"
                  name="duration"  
                >
                  {plans.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="Price"
                  label="Price"
                  type="text"
                  id=""
                  autoComplete="Price"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Descripition"
                  label="Descripition"
                  multiline
                  id=""
                  autoComplete="Descripition"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Box>
            <FormGroup>
            <FormControlLabel
              control={<Checkbox name="isFeatured" defaultChecked />}
              label="Is Featured"
            />
          </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                padding: "12px 10px",
                color: "#fff !important",
                textAlign: "left",
                width: "200px",
              }}
              onClick={isLoading}
            >
              Get Started
            </Button>
          </Grid>
          <Typography fontSize="14px" mt="20px" align="center">
            Already have an account?
            <Link href="#" className="primaryColor text-decoration-none">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default addPlans;
