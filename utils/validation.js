import * as Yup from "yup";

export const emailValidation = (name) => {
  return Yup.string()
    .email("Invalid email address")
    .matches(/^\S*$/, "No spaces allowed")
    .matches(
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
      `${
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "Email"
      } is not valid`
    )
    .required(
      `${
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "Email"
      } is Required`
    );
};

export const phoneValidation = (name) => {
  return (
    Yup.string()
      .min(10, "Phone number must be 10 digits")
      .matches(/^\S*$/, "No spaces allowed")
      .matches(
        /^\+(?:[0-9] ?){6,14}[0-9]$/,
        `${
          name ? name.charAt(0).toUpperCase() + name.slice(1) : "Phone"
        } is not valid`
      )
      // .matches(
      //   /^([0-9]{10})*$/,
      //   `${
      //     name ? name.charAt(0).toUpperCase() + name.slice(1) : "Phone"
      //   } is not valid`
      // )
      .required(
        `${
          name ? name.charAt(0).toUpperCase() + name.slice(1) : "Phone"
        } is Required`
      )
  );
};

export const requiredValidation = (name) => {
  return Yup.string().required(
    `${
      name ? name.charAt(0).toUpperCase() + name.slice(1) : "Name"
    } is Required`
  );
};

export const passwordValidation = (name) => {
  return Yup.string()
    .required(
      `${
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "Password"
      } is Required`
    )
    .min(8, "Password must be at least 8 characters");
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
  // );
};

export const confirmPasswordValidation = (password, name) => {
  return Yup.string()
    .required(
      `${
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "Confirm Password"
      } is Required`
    )
    .oneOf(
      [Yup.ref(password || "password"), null],
      `${
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "Passwords"
      } must match`
    );
};
