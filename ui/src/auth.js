// auth.js
export const logout = () => {
  localStorage.removeItem("token");
};
