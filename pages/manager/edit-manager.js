import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const EditManger = () => {

    const router =useRouter()
    const { managers } = useSelector((state) => state.manager);


    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          phone: "",
          businessId: business?.id,
        },
        validationSchema: Yup.object({
          phone: phoneValidation(),
          email: emailValidation(),
          name: requiredValidation(),
          confirmPassword: confirmPasswordValidation(),
        }),
        onSubmit: (values) => {
          console.log("Handle Submit", values);
          dispatch(
            addManagerFunApi({
              data: values,
              onSuccess: () => {
                console.log("Add Manager Success");
                router.push("/manager/");
              },
            })
          );
        },
      });

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
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
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
                Name
              </Typography>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label="Enter Name"
                {...formik.addManagerFunApi("name")}
                error={formik.touched.name && formik.errors.name ? true : false}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
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
                Email Address
              </Typography>
              <TextField
                autoComplete="email-address"
                name="emailAddress"
                fullWidth
                id="emailAddress"
                label="Email Address"
                {...formik.addManagerFunApi("email")}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
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
                Phone Number
              </Typography>
              <TextField
                autoComplete="number"
                name="phonenumber"
                fullWidth
                id="phonenumber"
                label="Phone Number"
                {...formik.addManagerFunApi("phone")}
                error={
                  formik.touched.phone && formik.errors.phone ? true : false
                }
                helperText={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid item xs={12} textAlign="left">
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
                  color: "#fff !important",
                }}
              >
                <SendIcon
                  sx={{
                    position: "relative",
                    top: "-2px",
                  }}
                  className="mr-5px"
                />{" "}
                Add Manager
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
export default EditManger;
