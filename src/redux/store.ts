import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import orderSlice from "./slices/orderSlice";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/employeeSlice";
import employeeSlice from "./slices/employeeSlice";
import foodSlice from "./slices/foodSlice";
import drinkSlice from "./slices/drinkSlice";
import areaSlice from "./slices/areaSlice";
import tableSlice from "./slices/table";
import productSlice from "./slices/productSlice";
import productTypeSlice from "./slices/productTypeSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    order: orderSlice.reducer,
    customer: customerSlice.reducer,
    employee: employeeSlice.reducer,
    food: foodSlice.reducer,
    drink: drinkSlice.reducer,
    area: areaSlice.reducer,
    table: tableSlice.reducer,
    product: productSlice.reducer,
    productType: productTypeSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
