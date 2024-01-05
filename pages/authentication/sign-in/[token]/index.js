import SignInForm from "@/components/Authentication/SignInForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginFunApi, checkTokenIsValidFunApi } from "store/auth/services";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("token", router.query.token);
    if (router.query.token) {
      localStorage.setItem("token", router.query.token);
      console.log("token exist", router.query.token);
      dispatch(
        autoLoginFunApi({
          onSuccess: () => {
            router.push("/");
          },
        })
      );
    }
  }, [dispatch, router.query.token]);

  return (
    <>
      <SignInForm />
    </>
  );
}
