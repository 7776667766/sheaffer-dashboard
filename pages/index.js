import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Dashboard/eCommerce/Features";
import UserList from "./users";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogTitle,
  List,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  DialogContent,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import Image from "next/image";
import Button from "@mui/material/Button";
import {
  getMyBussinessFunApi,
  regsiterBusinessFunApi,
} from "store/business/services";
import { Twitter } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import copyImage from "@/public/images/icon/solar_copy-bold.png";
import Expired1 from "@/public/images/expired1.png";
import { useFormik } from "formik";
import {
  emailValidation,
  phoneValidation,
  requiredValidation,
  slugValidation,
} from "@/utils/validation";
// import { getMyBusinessBookingFunApi } from "store/booking/service";

export default function DashboardPage() {
  const { user, role } = useSelector((state) => state.auth);
  // console.log("user", user.image);
  const { business, dataFatched } = useSelector((state) => state.business);
  const { businessAll } = useSelector((state) => state.business);
  

  // if (
  //   businessAll.data &&
  //   typeof businessAll.data === "object" &&
  //   Symbol.iterator in businessAll.data
  // ) {
  //   const result = Object.assign({}, ...businessAll.data);
  //   console.log("this first object", result);
  // } else {
  //   console.error("businessAll.data is null or not iterable");
  // }

  // console.log('this is my object',result.bannerImg);
  console.log("business All ", businessAll);
  console.log("only busness ", business);
  const transactionDates = business?.data?.TransactionDate;

  if (transactionDates && transactionDates.length > 0) {
    const parsedDates = transactionDates.map(
      (dateString) => new Date(dateString)
    );
    console.log("parsedDates", parsedDates);
    const currentDate = new Date();
    const isAnyDateBeforeCurrent = parsedDates.some(
      (parsedDate) => parsedDate < currentDate
    );
    console.log("isAnyDateBeforeCurrent", isAnyDateBeforeCurrent);
    if (isAnyDateBeforeCurrent) {
      console.log(`Show popup notification to user subscription ending soon.`);
    }
  } else {
    console.log("Transaction dates are missing or empty.");
  }

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [openthirdDialog, setOpenthirdDialog] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  console.log("selectedBusiness89", selectedBusiness);

  const [avatar, setavatar] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openPending, setOpenPending] = useState(false);
  const [formData, setFormData] = useState({});
  const [otherBusinessData, setotherBusinessData] = useState(false);
  const [otherBusiness, setOtherBusiness] = useState(null);
  const [selectedBusienssId, setselectedBusienssId] = useState(null);
  // dispatch(
  //   getMyBussinessFunApi({
  //     data: {
  //       businessId: business.id,
  //     },
  //     onSuccess: () => {},
  //   })
  // );
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBusiness(selectedValue);
    console.log("selectedValue83", selectedValue);

    const businessIdString = String(selectedValue);
    localStorage.setItem(
      "selectedBusinessId",
      JSON.stringify(businessIdString)
    );

    dispatch(
      getMyBussinessFunApi({
        data: {
          businessId: selectedValue,
        },
        onSuccess: () => {},
      })
    );
  };

  // useEffect(() => {
  //   if (!dataFatched && business?.data?.id) {
  //     dispatch(
  //       getMyBussinessFunApi({
  //         onSuccess: () => {
  //           dispatch(
  //             getMyBusinessBookingFunApi({
  //               data: {
  //                 businessId: business?.data?.id,
  //               },
  //             })
  //           );
  //         },
  //       })
  //     );
  //   }
  // }, [dispatch, dataFatched, business?.data?.id]);

  const initialValue = {
    name: "",
    email: "",
    slug: "",
    bannerText: "",
    address: "",
    description: "",

    countryCode: "",
    phoneNumber: "",
    logo: "",
    googleId: "",
    bookingService: "",
    websiteService: "",
    color: "",
    theme: "",
    file: null,
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      name: requiredValidation("Name"),
      email: emailValidation("Email"),
      phoneNumber: phoneValidation("Phone"),
      slug: slugValidation("Slug"),
      bannerText: requiredValidation("Banner Text"),
      address: requiredValidation("Address"),
      description: requiredValidation("Description"),
    }),
  });

  const handleClose = () => {
    setSelectedBusiness(null);
    setOpenSecondDialog(false);
    setOpenthirdDialog(false);
    setOpen(false);
  };
  const isOwner = role === "owner";

  useEffect(() => {
    console.log("useEffect running");
    if (business?.data) {
      console.log("requestStatus:", business.data.requestStatus);
      if (
        business.data.requestStatus === "pending" ||
        business.data.requestStatus === "rejected"
      ) {
        setOpenPending(true);
      }
    }
  }, [business?.data]);

  const handleOpenRequest = () => {
    setOpenForm(true);
  };

  const handleOthersClickOpen = () => {
    setotherBusinessData(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setotherBusinessData(false);
  };

  const handleClickOpen = (business) => {
    setOpen(true);
    setOpenSecondDialog(true);
    setSelectedBusiness(business);
  };

  const handleBusinessOpen = (business) => {
    setOpenthirdDialog(true);
    setOtherBusiness(business);
    setotherBusinessData(false);
  };

  // useEffect(() => {
  //   if (role === "owner" || role === "manager") {
  //     if (!dataFatched) {
  //       dispatch(getMyBussinessFunApi({

  //       }));
  //     }
  //   }
  // }, [dispatch, dataFatched, role]);

  const otherbusinessList = [
    {
      title: "Register Business",
      image: "",
    },
  ];

  const handleBusinessClick = (businessData) => {
    console.log(``);
  };

  const businessList = [
    {
      title: "Business 1",
      image: "",
    },
    {
      title: "Business 2",
      image: "",
    },
  ];

  const handleAddRequest = () => {
    console.log("formik.values:", formik.values);
    const { countryCode, phoneNumber, ...allvalues } = formik.values;

    let myPhoneNumberArray = formik.values.phoneNumber.split(
      formik.values.countryCode
    );
    const myCountryCode = myPhoneNumberArray[0] + formik.values.countryCode;
    myPhoneNumberArray.shift();

    const myPhoneNumber = myPhoneNumberArray.join(formik.values.countryCode);
    const formattedCountryCode = myCountryCode.startsWith("+")
      ? countryCode
      : `+${countryCode}`;
    dispatch(
      regsiterBusinessFunApi({
        data: {
          ...allvalues,
          phone: {
            code: formattedCountryCode,
            number: myPhoneNumber,
          },
        },
        onSuccess: () => {
          handleClose();
        },
      })
    );
  };

  const handleRegisterBusinessandTheme = () => {
    dispatch(
      regsiterBusinessFunApi({
        data: {
          name: `${user.name} Business`,
          email: user.email,
          phone: user.phone,
          slug: slug,
          logo: avatar,
          description: "My business description goes here ...",
          address: "Address goes here ...",
          googleId: "1234567890",
          socialLinks: [
            {
              name: "facebook",
              link: "https://www.facebook.com/",
            },
            {
              name: "instagram",
              link: "https://www.instagram.com/",
            },
          ],
          images: [
            "https://resortcabanas.com/wp-content/uploads/Learn-to-Differentiate-Your-Spa-Business_Outdoor-Cabanas_39138676_m.jpg",
          ],
        },

        onSuccess: () => {
          window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}templates`;
        },
      })
    );
  };

  const handleRegisterBusiness = () => {
    dispatch(
      regsiterBusinessFunApi({
        data: {
          name: `${user.name} Business`,
          email: user.email,
          phone: user.phone,
          slug: slug,
          logo: avatar,
          description: "My business description goes here ...",
          address: "Address goes here ...",
          googleId: "1234567890",
          socialLinks: [
            {
              name: "facebook",
              link: "https://www.facebook.com/",
            },
            {
              name: "instagram",
              link: "https://www.instagram.com/",
            },
          ],
          images: [
            "https://resortcabanas.com/wp-content/uploads/Learn-to-Differentiate-Your-Spa-Business_Outdoor-Cabanas_39138676_m.jpg",
          ],
        },

        onSuccess: () => {
          handleClose();
        },
      })
    );
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setavatar(file);
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isBookingLinkCopied, setIsBookingLinkCopied] = useState(false);
  const handleSiteCopyLink = () => {
    const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business.data.slug}`;
    navigator.clipboard.writeText(linkToCopy);
    setIsLinkCopied(true);

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  const handleBookingLink = () => {
    const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business.data.slug}`;
    navigator.clipboard.writeText(linkToCopy);
    setIsBookingLinkCopied(true);

    setTimeout(() => {
      setIsBookingLinkCopied(false);
    }, 1000);
  };

  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>MAKELY</h1>
        <ul>
          <li>
            {role === "owner" && (
              <>
                <div style={{ display: "flex", gap: "15px" }}>
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: "0px",
                    }}
                  >
                    <Box>
                      <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel
                          id="demo-select-small"
                          sx={{ fontSize: "14px" }}
                        >
                          Business
                        </InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={selectedBusiness}
                          label="Select"
                          onChange={handleDropdownChange}
                          sx={{
                            fontSize: "14px",
                            variant: "outlined",
                            width: "150px",
                            padding: "0",
                          }}
                          className="select"
                        >
                          {businessAll?.data?.map((business) => (
                            <MenuItem key={business.id} value={business.id}>
                              {business.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box> */}
                  {business.data ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      disabled={business?.data ? true : false}
                      onClick={handleClickOpen}
                    >
                      Sync Business
                    </Button>
                  )}
                  {!business.data && (
                    <Button
                      variant="contained"
                      disabled={business?.data ? true : false}
                      onClick={handleOpenRequest}
                    >
                      Send Custom Booking Request
                    </Button>
                  )}
                  {business.data ? (
                    <Button
                      variant="contained"
                      // disabled={business?.data ? true : false}
                      onClick={handleOthersClickOpen}
                    >
                      Add other Business
                    </Button>
                  ) : (
                    ""
                  )}
                </div>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>
                    Select Your Business
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <List sx={{ pt: 0 }}>
                    {businessList?.map((data, index) => (
                      <ListItem disableGutters key={index}>
                        <ListItemButton
                          onClick={() => handleBusinessClick(data)}
                        >
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText primary={data.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Dialog>

                {/* {FORM FOR REQUEST BUSINESS  } */}

                <Dialog
                  open={openForm}
                  onClose={handleFormClose}
                  maxWidth="lg"
                  PaperProps={{
                    sx: {
                      width: "800px",
                      height: "500px",
                      padding: "20px",
                    },
                  }}
                >
                  <DialogTitle
                    style={{
                      display: "flex",
                      marginLeft: "-20px",
                      // alignItems: "",
                      // justifyContent: "start",
                    }}
                  >
                    Add New Business Detail manually
                    {/* <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleFormClose}
                      aria-label="close"
                    >
                      {/* <CloseIcon /> */}
                    {/* </IconButton> */}
                  </DialogTitle>
                  <form onSubmit={formik.handleSubmit}>
                    <div sx={{ padding: "30px", margin: "16px" }}>
                      <Grid container spacing={2} md>
                        <Grid item xs={12} md={12} lg={12}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "110px",
                              background: "#EBF4FF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {businessAll.data &&
                              typeof businessAll.data === "object" &&
                              Symbol.iterator in businessAll.data &&
                              (() => {
                                const result = Object.assign(
                                  {},
                                  ...businessAll.data
                                );
                                // Log the first object in businessAll.data
                                console.log("this is first object", result);

                                return (
                                  <Image
                                    src={
                                      result.bannerImg ||
                                      "https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    }
                                    height={100}
                                    width={50}
                                    alt="oeoe"
                                  style={{width:"100%"}}
                                  />
                                );
                              })()}
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            name="name"
                            fullWidth
                            id="name"
                            label="Business Name"
                            {...formik.getFieldProps("name")}
                            error={formik.touched.name && formik.errors.name}
                            helperText={
                              formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            name="email"
                            fullWidth
                            id="email"
                            label="Business Email"
                            {...formik.getFieldProps("email")}
                            error={formik.touched.email && formik.errors.email}
                            helperText={
                              formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            name="slug"
                            fullWidth
                            id="slug"
                            label="Business slug"
                            {...formik.getFieldProps("slug")}
                            error={formik.touched.slug && formik.errors.slug}
                            helperText={
                              formik.touched.slug && formik.errors.slug
                                ? formik.errors.slug
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            name="bannerText"
                            fullWidth
                            id="bannerText"
                            label="Enter BannerText"
                            {...formik.getFieldProps("bannerText")}
                            error={
                              formik.touched.bannerText &&
                              formik.errors.bannerText
                            }
                            helperText={
                              formik.touched.bannerText &&
                              formik.errors.bannerText
                                ? formik.errors.bannerText
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                          <TextField
                            name="address"
                            fullWidth
                            id="address"
                            label="Enter Address"
                            {...formik.getFieldProps("address")}
                            error={
                              formik.touched.address && formik.errors.address
                            }
                            helperText={
                              formik.touched.address && formik.errors.address
                                ? formik.errors.address
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                          <PhoneInput
                            international
                            country={"pk"}
                            isValid={(
                              inputNumber,
                              selectedCountry,
                              countries
                            ) => {
                              return countries.some((country) => {
                                return (
                                  startsWith(
                                    inputNumber,
                                    selectedCountry.dialCode
                                  ) ||
                                  startsWith(
                                    selectedCountry.dialCode,
                                    inputNumber
                                  )
                                );
                              });
                            }}
                            {...formik.getFieldProps("phoneNumber")}
                            value={formik.values.phoneNumber || ""}
                            onChange={(value, country) => {
                              console.log(value, "ssss");
                              formik.setFieldValue(
                                "countryCode",
                                country.dialCode
                              );
                              formik.setFieldValue("phoneNumber", value);
                            }}
                            error={
                              formik.touched.phoneNumber &&
                              formik.errors.phoneNumber
                                ? true
                                : false
                            }
                            helperText={
                              formik.touched.phoneNumber &&
                              formik.errors.phoneNumber
                                ? formik.errors.phoneNumber
                                : ""
                            }
                            // defaultErrorMessage={'yyey'}
                            InputProps={{
                              style: { borderRadius: 8, width: "100%" },
                            }}
                            buttonStyle={{
                              border:
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber
                                  ? "1px solid red"
                                  : "1px solid #ced4da",
                            }}
                            inputStyle={{
                              width: "100%",
                              height: "50px",
                              border:
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber
                                  ? "1px solid red"
                                  : "1px solid #ced4da",

                              "&:focus": {
                                borderColor: "green",
                              },
                            }}
                          />
                          {formik.touched.phoneNumber &&
                            formik.errors.phoneNumber && (
                              <Typography variant="caption" color="error">
                                {formik.errors.phoneNumber}
                              </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                          <TextField
                            multiline
                            rows={3}
                            name="description"
                            id="description"
                            label="Enter Description"
                            {...formik.getFieldProps("description")}
                            error={
                              formik.touched.description &&
                              formik.errors.description
                            }
                            helperText={
                              formik.touched.description &&
                              formik.errors.description
                                ? formik.errors.description
                                : ""
                            }
                            style={{
                              width: "100%",
                              color: "blue",
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                          <Box
                            sx={{ display: "flex", alignItems: "end", gap: 1 }}
                          >
                            <Box sx={{ flex: 1 }}></Box>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={1}
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        // sx={{  marginTop: "0px" }}
                      >
                        <Grid
                          item
                          xs={12}
                          md={3}
                          lg={3}
                          order={{ xs: 2, md: 2 }}
                        >
                          <Box>
                            <Button
                              type="button"
                              color="primary"
                              sx={{
                                border: "1px solid #ddd",
                                width: "160px",
                                height: "40px",
                              }}
                              onClick={handleFormClose}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={3}
                          lg={3}
                          order={{ xs: 1, md: 2 }}
                        >
                          <Box>
                            <Button
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={handleAddRequest}
                              sx={{ width: "160px", height: "40px" }}
                            >
                              Save
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  </form>
                </Dialog>
                {/* other business form */}

                <Dialog
                  open={otherBusinessData}
                  onClose={handleFormClose}
                  maxWidth="sm"
                  PaperProps={{
                    sx: {
                      width: "800px",
                      height: "500px",
                      padding: "20px",
                    },
                  }}
                >
                  <DialogTitle open={open} onClose={handleFormClose}>
                    Select Your Business
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleFormClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <List sx={{ pt: 0 }}>
                    {otherbusinessList.map((data, index) => (
                      <ListItem disableGutters key={index}>
                        <ListItemButton
                          onClick={() => handleBusinessOpen(data)}
                        >
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText primary={data.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Dialog>
                {otherBusiness && (
                  <Dialog open={openthirdDialog} onClose={handleClose}>
                    <DialogTitle>
                      Enter Business
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <Grid container spacing={3} paddingX={3} paddingBottom={3}>
                      <Grid item xs={12}>
                        <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "12px",
                          }}
                        >
                          Business Slug
                        </Typography>
                        <TextField
                          label="Slug"
                          name="slug"
                          onChange={(e) => setSlug(e.target.value)}
                          fullWidth
                          InputProps={{
                            style: {
                              borderRadius: "5px",
                              padding: "5px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            as="h5"
                            sx={{
                              fontWeight: "500",
                              fontSize: "14px",
                              mb: "12px",
                            }}
                          >
                            Upload Logo
                          </Typography>

                          <TextField
                            fullWidth
                            name="logo"
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </Box>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{
                          marginRight: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        <Button
                          onClick={handleRegisterBusinessandTheme}
                          variant="contained"
                          color="primary"
                        >
                          Register Business
                        </Button>
                      </Grid>
                    </Grid>
                  </Dialog>
                )}

                {selectedBusiness && (
                  <Dialog open={openSecondDialog} onClose={handleClose}>
                    <DialogTitle>
                      {selectedBusiness?.title} Grid
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <Grid container spacing={3} paddingX={3} paddingBottom={3}>
                      <Grid item xs={12}>
                        <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "12px",
                          }}
                        >
                          Business Slug
                        </Typography>
                        <TextField
                          label="Slug"
                          name="slug"
                          onChange={(e) => setSlug(e.target.value)}
                          fullWidth
                          InputProps={{
                            style: {
                              borderRadius: "5px",
                              padding: "5px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            as="h5"
                            sx={{
                              fontWeight: "500",
                              fontSize: "14px",
                              mb: "12px",
                            }}
                          >
                            Upload Logo
                          </Typography>

                          <TextField
                            fullWidth
                            name="logo"
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </Box>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{
                          marginRight: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        <Button
                          onClick={handleRegisterBusiness}
                          variant="contained"
                          color="primary"
                        >
                          Register Business
                        </Button>
                      </Grid>
                    </Grid>
                  </Dialog>
                )}
              </>
            )}
          </li>
        </ul>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          {business?.data && (
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "0px 0px",
                mb: "15px",
              }}
            >
              <Accordion className="bg-black">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    component="h1"
                    fontWeight="500"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src={
                          "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        width={75}
                        height={50}
                        alt="Logo"
                        style={{
                          objectFit: "contain",
                          borderRadius: "5px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          paddingLeft: "10px",
                        }}
                      >
                        {" "}
                        {business?.data.name}{" "}
                      </span>
                    </Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ marginTop: "-24px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: "15px",
                    }}
                  >
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="p" fontSize={14}>
                        <ul
                          style={{
                            listStyle: "none",
                            marginLeft: "0px",
                            paddingLeft: "0px",
                            lineHeight: "20px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10%",
                              marginBottom: "20px",
                            }}
                          >
                            {business?.data.websiteService === true && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "end",
                                  gap: "4px",
                                }}
                              >
                                <Box>
                                  <Button
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business.data.slug}`}
                                    target="_blank"
                                    sx={{
                                      pt: "2px",
                                      pb: "1px",
                                      textDecoration: "underline",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                      color: "#757FEF",
                                      backgroundColor: "#F1F2FD",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Go to Website
                                  </Button>
                                </Box>
                                <Box>
                                  <Image
                                    src={copyImage}
                                    width={20}
                                    height={20}
                                    alt="copy"
                                    onClick={handleSiteCopyLink}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Box>
                                {isLinkCopied &&
                                  business?.data.websiteService === true && (
                                    <div
                                      style={{
                                        position: "relative",
                                        top: "-2px",
                                        right: "26px",
                                        padding: "3px",
                                        background: "#F1F2FD",
                                        borderRadius: "3px",
                                        color: "#000",
                                      }}
                                    >
                                      Copied!
                                    </div>
                                  )}
                              </Box>
                            )}

                            {business?.data.bookingService === true && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "end",
                                  gap: "4px",
                                }}
                              >
                                <Box>
                                  <Button
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business.data.slug}`}
                                    target="_blank"
                                    sx={{
                                      pt: "2px",
                                      pb: "1px",
                                      textDecoration: "underline",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                      color: "#757FEF",
                                      backgroundColor: "#F1F2FD",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Go to Booking
                                  </Button>
                                </Box>
                                <Box>
                                  <Image
                                    src={copyImage}
                                    width={20}
                                    height={20}
                                    alt="copy"
                                    onClick={handleBookingLink}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Box>
                                {isBookingLinkCopied && (
                                  <div
                                    style={{
                                      position: "relative",
                                      top: "-2px",
                                      right: "26px",
                                      padding: "3px",
                                      background: "#F1F2FD",
                                      borderRadius: "3px",
                                      color: "#000",
                                    }}
                                  >
                                    Copied!
                                  </div>
                                )}
                              </Box>
                            )}
                          </Box>
                          <li style={{ marginBottom: "20px" }}>
                            {business.data.description}
                          </li>
                          <li
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#303030",
                              marginBottom: "5px",
                            }}
                          >
                            {business.data.email}
                          </li>
                          <li
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#303030",
                              marginBottom: "5px",
                            }}
                          >
                            {/* {business.data.phone} */}
                          </li>
                          <li
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#303030",
                              marginBottom: "5px",
                            }}
                          >
                            {business.data.address}
                          </li>
                        </ul>
                      </Typography>
                    </Box>

                    <Box sx={{ width: "50%", textAlign: "right" }}>
                      <Typography variant="p" fontSize={14}>
                        <div
                          style={{
                            listStyle: "none",
                            marginLeft: "0px",
                            paddingLeft: "0px",
                            lineHeight: "35px",
                          }}
                        >
                          <div style={{ height: "100px" }}>
                            {business.data?.images?.map((data, key) => (
                              <Image
                                key={key}
                                src={data}
                                alt={business.data.name}
                                width={100}
                                height={100}
                                style={{
                                  borderRadius: "10px",
                                  marginLeft: "8px",
                                }}
                              />
                            ))}
                          </div>
                          <Box
                            sx={{
                              marginTop: "15px",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            {business.data.socialLinks?.map(
                              (socialLink, index) => (
                                <div key={index}>
                                  <a
                                    rel="noreferrer"
                                    href={socialLink.link}
                                    target="_blank"
                                    className="text-3xl"
                                    style={{
                                      color: "#a8a8a8",
                                      marginRight: "5px",
                                    }}
                                  >
                                    {socialLink.name === "facebook" ? (
                                      <Facebook style={{ fontSize: "30px" }} />
                                    ) : socialLink.name === "instagram" ? (
                                      <Instagram style={{ fontSize: "29px" }} />
                                    ) : (
                                      <Twitter />
                                    )}
                                  </a>
                                </div>
                              )
                            )}
                          </Box>
                        </div>
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Card>
          )}
          <Features />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {isOwner && (
          <Dialog
            open={openPending}
            disableEscapeKeyDown={true}
            disableBackdropClick={true}
          >
            <DialogContent>
              {business?.data?.requestStatus === "pending" ? (
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {" "}
                    <Image
                      src={Expired1}
                      alt="dkkd"
                      width={170}
                      height={170}
                      sx={{ textAlign: "center" }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "10px" }}
                  >
                    Your request is pending. Please wait for approval.
                  </Typography>
                </Box>
              ) : business?.data?.requestStatus === "rejected" ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Your request has been rejected.
                  </Typography>
                  {business?.data?.rejectReason && (
                    <Typography variant="body2" color="error">
                      Reason for rejection: {business?.data?.rejectreason}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="h6" gutterBottom>
                  Some default message if requestStatus is neither pending nor
                  rejected
                </Typography>
              )}
            </DialogContent>
          </Dialog>
        )}

        {role === "admin" && (
          <Grid item xs={12} md={12} lg={12} xl={8}>
            <UserList />
          </Grid>
        )}
      </Grid>
    </>
  );
}
