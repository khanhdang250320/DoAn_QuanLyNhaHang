import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCoupons,
  getAllOrders,
  getAllOrderStatuses,
  getAllPaymentMethod,
  getAllShippings,
  getAllTaxes,
  getDashboard,
} from "../../apis";


const defaultState = {
  allOrders: [],
  isLoadingAllOrders: false,
  cart: localStorage.getItem("cart") || JSON.stringify([]),
  allPaymentMethods: [],
  checkout: localStorage.getItem("checkout") || JSON.stringify(null),
  stepOrder: 0,
  isLoadingDashboard: true,
  dashboard: {} as any,
};

const orderSlice = createSlice({
  name: "order",
  initialState: defaultState,
  reducers: {
    updateOrder: (state, action) => {
      const index = state.allOrders.findIndex(
        (order: any) => order.id === action.payload.id
      );
      const newAllOrders = state.allOrders
        .slice(0, index)
        .concat([action.payload as never])
        .concat(state.allOrders.slice(index + 1, state.allOrders.length));
      state.allOrders = newAllOrders;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getApiAllPaymentMethods.fulfilled, (state, action) => {
        state.allPaymentMethods = action.payload;
      })
      .addCase(getApiAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(getApiDashboard.fulfilled, (state, action) => {
        state.isLoadingDashboard = false;
        state.dashboard = action.payload;
      });
  },
});

export default orderSlice;

export const getApiAllOrderStatuses = createAsyncThunk(
  "order/getApiAllOrderStatuses",
  async () => {
    try {
      const result = await getAllOrderStatuses({}, {}, {});
      return result.orderStatuses;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllCoupons = createAsyncThunk(
  "order/getApiAllCoupons",
  async () => {
    try {
      const result = await getAllCoupons({}, {}, {});
      return result.coupons;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllTaxes = createAsyncThunk(
  "order/getApiAllTaxes",
  async () => {
    try {
      const result = await getAllTaxes({}, {}, {});
      return result.taxes;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllShippings = createAsyncThunk(
  "order/getApiAllShipping",
  async () => {
    try {
      const result = await getAllShippings({}, {}, {});
      return result.shippings;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllPaymentMethods = createAsyncThunk(
  "order/getApiAllPaymentMethods",
  async () => {
    try {
      const result = await getAllPaymentMethod({}, {}, {});
      return result.paymentMethods;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiAllOrders = createAsyncThunk(
  "order/getApiAllOrders",
  async () => {
    try {
      const result = await getAllOrders({}, {}, {});
      return result.orders;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getApiDashboard = createAsyncThunk(
  "order/getApiDashboard",
  async () => {
    try {
      const result = await getDashboard({}, {}, {});
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
export const allOrderStatusesSelector = (state: any) =>
  state.order.allOrderStatuses;
export const allCouponsSelector = (state: any) => state.order.allCoupons;
export const allTaxesSelector = (state: any) => state.order.allTaxes;
export const allShippingsSelector = (state: any) => state.order.allShippings;
export const allPaymentMethodsSelector = (state: any) =>
  state.order.allPaymentMethods;
export const allOrdersSelector = (state: any) => state.order.allOrders;
export const checkoutSelector = (state: any) => state.order.checkout;
export const stepOrderSelector = (state: any) => state.order.stepOrder;
export const isLoadingDashboardSelector = (state: any) =>
  state.order.isLoadingDashboard;
  export const dashboardSelector = (state: any) => state.order.dashboard;
