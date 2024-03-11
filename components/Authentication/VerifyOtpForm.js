import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import styles from "@/components/Authentication/Authentication.module.css";
import PinInput from "react-pin-input";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import Image from "next/image";
import { forgetPasswordFunApi, verifyOtpFunApi } from "store/auth/services";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getMyBussinessFunApi } from "store/business/services";

const VerifyOtpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [myPhone, setMyPhone] = useState(""); 

  console.log("myEmail21",myPhone)
  const { user, role, isAuthenticated, otpVerified, isLoading } = useSelector(
    (state) => state.auth
  );
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    if (router.query.data != undefined) {
      setMyPhone(atob(router.query.data));
    } else if (router.query.verify != undefined) {
      setMyPhone(atob(router.query.verify));
    }
  }, [router.query.data, router.query.verify]);

  const handleSubmit = (value) => {
    if (value.length === 6) {
      console.log("Otp Value", value);
      console.log("user ", user);
      dispatch(
        verifyOtpFunApi({
          data: {
            email: myPhone,
            otp: value,
            forLogin: router.query.verify !== undefined,  
          },
          onSuccess: () => {
            if (router.query.data != undefined) {
              router.push(
                `/authentication/reset-password/${router.query.data}`
              );
            } else {
              if (role === "owner") {
                dispatch(getMyBussinessFunApi());
              }
              router.push("/");
            }
          },
          
        })
      );
    }
  };

  const resendOtp = () => {
    setStartTimer(true);
    dispatch(
      forgetPasswordFunApi({
        data: {
          email: myPhone,
        },
        onSuccess: () => {
          toast.success("Otp Sent Successfully");
        },
      })
    );
  };

  const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };
  
  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            maxWidth: "510px",
            ml: "auto",
            mr: "auto",
            padding: "50px 0 100px",
          }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
                Verify OTP{" "}
                <Image
                  width={30}
                  height={30}
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Enter your 6 digit code here
              </Typography>

              <Box component="form" noValidate>
                <Box
                  sx={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                      <PinInput
                        length={6}
                        initialValue={""}
                        secret={false}
                        disabled={isLoading}
                        onChange={(value, index) => {}}
                        type="numeric"
                        inputMode="number"
                        style={{
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        inputStyle={{ borderColor: "#5B5B98" }}
                        inputFocusStyle={{ borderColor: "blue" }}
                        onComplete={(value, index) => handleSubmit(value)}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                as="div"
                sx={{ display: "flex" }}
                alignItems="center"
                justifyContent="center"
                gap={2}
                textAlign="center"
                mt="20px"
              >
                <Typography fontSize="15px">{`Don't get a code`}</Typography>
                <Button
                  className="primaryColor text-decoration-none"
                  disabled={startTimer}
                  onClick={resendOtp}
                >
                  {startTimer ? (
                    <Countdown
                      onComplete={() => {
                        setStartTimer(false);
                      }}
                      renderer={({ hours, minutes, seconds, completed }) => {
                        if (completed) {
                          return "Resend Otp";
                        } else {
                          return (
                            <span>
                              {addLeadingZero(minutes)}:
                              {addLeadingZero(seconds)}
                            </span>
                          );
                        }
                      }}
                      date={Date.now() + 60000}
                    />
                  ) : (
                    "Resend Otp"
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default VerifyOtpForm;
