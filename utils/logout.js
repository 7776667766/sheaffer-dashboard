const handleLogout = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const otpVerified = localStorage.getItem("otpVerified");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("otpVerified");
};
