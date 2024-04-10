import { createSlice } from "@reduxjs/toolkit";
interface initialState {
  token: null | string;
  user: null | string;
  email: null | string;
}

// const localToken = () => {
//   if (typeof window !== "undefined") {
//     // Perform localStorage action

//     const data = localStorage.getItem("data") || null;
//     const token = data && JSON.parse(data || "");
//     return token.token;
//   } else {
//     return null;
//   }
// };
// const localname = () => {
//   if (typeof window !== "undefined") {
//     // Perform localStorage action

//     const data = localStorage.getItem("data") || null;
//     const token = data && JSON.parse(data || "");
//     return token.user;
//   }
// };
// const localemail = () => {
//   if (typeof window !== "undefined") {
//     // Perform localStorage action

//     const data = localStorage.getItem("data") || null;
//     const token = data && JSON.parse(data || "");
//     return token.email;
//   }
// };

const initialState: initialState = {
  token: null,
  user: null,
  email: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    useradd: (state, action) => {
      console.log("triggered");
      state.token = action.payload.token;
      state.user = action.payload.firstname;
      state.email = action.payload.email;
      localStorage.setItem(
        "data",
        JSON.stringify({
          token: state.token,
          user: state.user,
          email: state.email,
        })
      );
    },
    userlogout: (state) => {
      (state.user = null), (state.email = null), (state.token = null);
      localStorage.clear();
    },
  },
});
export const { useradd, userlogout } = userSlice.actions;
export default userSlice.reducer;
