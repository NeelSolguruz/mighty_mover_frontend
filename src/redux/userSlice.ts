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
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.email = action.payload.email;
    },
    update_name: (state, action) => {
      state.user=action.payload
      console.log("update", action.payload);
      const data = localStorage.getItem("data") || null;
      const token = data && JSON.parse(data || "");
      console.log(token)
      localStorage.setItem("data", JSON.stringify({ ...token, user: action.payload }));
    },
    userlogout: (state) => {
      (state.user = null), (state.email = null), (state.token = null);
      localStorage.clear();
    },
  },
});
export const { useradd, userlogout, update_name } = userSlice.actions;
export default userSlice.reducer;
