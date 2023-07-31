import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "re",
  main_category: [],
  child_category: [],
  customers: [],
  customers_pagination: {},
  countries: [],
  ad_list: [],
  ad_pagination: {},
  ad_detail: {},
  ad_user: [],
  user: {},
  login: {},
  verify: false,
  pagination: {},
  banner_home: [],
  banner_recommend: [],
  banner_splash: [],
  banner_category: [],
  message: "",
  Notifications: {},
  open: false,
};

const Reducer = createSlice({
  name: "808080",
  initialState,
  reducers: {
    Main_Category: (state, action) => {
      const { data } = action.payload;
      state.main_category = data;
    },
    Child_Category: (state, action) => {
      state.child_category = action.payload;
    },
    Customers: (state, action) => {
      console.log(action.payload);
      if (state.customers.length) {
        action.payload.map((data) => {
          state.customers.push(data);
        });
      } else {
        state.customers = action.payload;
      }
    },
    Customers_Pagination: (state, action) => {
      state.customers_pagination = action.payload;
    },
    Countries: (state, action) => {
      state.countries = action.payload;
    },
    Ads_List: (state, action) => {
      const { data, currentPage } = action.payload;
      console.log(action.payload);
      if (currentPage != 1) {
        data.map((ads) => {
          state.ad_list.push(ads);
        });
      } else {
        state.ad_list = data;
      }
      console.log(action.payload);
    },
    Ads_Pagination: (state, action) => {
      state.ad_pagination = action.payload;
    },
    Ad_Detail: (state, action) => {
      state.ad_detail = action.payload;
    },
    Ad_User: (state, action) => {
      state.ad_user = action.payload;
    },
    User: (state, action) => {
      state.user = action.payload;
    },
    Login: (state, action) => {
      state.login = action.payload;
    },
    Verify: (state, action) => {
      state.verify = action.payload;
    },
    Banner_Home: (state, action) => {
      state.banner_home = action.payload;
    },
    Pagination: (state, action) => {
      state.pagination = action.payload;
    },
    Banner_Recommend: (state, action) => {
      state.banner_recommend = action.payload;
    },
    Banner_Splash: (state, action) => {
      state.banner_splash = action.payload;
    },
    Banner_Category: (state, action) => {
      state.banner_category = action.payload;
    },
    Message: (state, action) => {
      const { message, open } = action.payload;

      state.message = message;
      state.open = open;
    },
    Notifications: (state, action) => {
      state.Notifications = action.payload;
    },
  },
});

export const {
  Main_Category,
  Child_Category,
  Customers,
  Customers_Pagination,
  Countries,
  Ads_List,
  Ads_Pagination,
  Ad_Detail,
  Ad_User,
  User,
  Login,
  Verify,
  Banner_Home,
  Pagination,
  Banner_Recommend,
  Banner_Splash,
  Banner_Category,
  Message,
  Notifications,
} = Reducer.actions;
export default Reducer.reducer;
