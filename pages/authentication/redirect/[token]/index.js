import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginFunApi } from "store/auth/services";

export default function RedirectPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  console.log(isLoading, "loading");

  useEffect(() => {
    console.log("token", router.query.token);
    if (router.query.token) {
      localStorage.setItem("token", router.query.token);
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
    <div>
      <h1>please Wait...</h1>
    </div>
  );
}
