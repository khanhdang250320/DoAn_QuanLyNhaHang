import axios from "axios";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};

const hostnameStatus = `${version.v1}/order-statuses`;
const hostnameCoupon = `${version.v1}/coupons`;
const hostnameTax = `${version.v1}/taxes`;
const hostnameShipping = `${version.v1}/shippings`;
const hostnamePaymentMethod = `${version.v1}/payment-methods`;
const hostnameOrder = `${version.v1}/orders`;

export const getAllOrderStatuses = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameStatus}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrderStatus = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostnameStatus}/create`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.orderStatus;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderStatusById = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.get(`${hostnameStatus}/detail/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.orderStatus;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostnameStatus}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.orderStatus;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCoupons = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameCoupon}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCoupon = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostnameCoupon}/create`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.coupon;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoupon = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(`${hostnameCoupon}/delete/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.coupon;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateCoupon = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostnameCoupon}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    console.log(result.data);
    if (result.status === 200) return result.data.coupon;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getCouponByCode = async (
  header: {},
  body: {},
  param: {},
  code: string
) => {
  try {
    const result = await fetchApi.get(`${hostnameCoupon}/detail/code/${code}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.coupon;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCouponsActive = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameCoupon}/list/active`, {
      headers: {
        ...header,
      },
    });
    return result.data.coupons;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTaxes = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameTax}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTax = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostnameTax}/create`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.tax;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusTax = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.put(
      `${hostnameTax}/edit/${id}`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.tax;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTax = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(`${hostnameTax}/delete/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.tax;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateTax = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostnameTax}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.tax;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getTaxByName = async (
  header: {},
  body: {},
  param: {},
  name: string
) => {
  try {
    const result = await fetchApi.get(`${hostnameTax}/detail/name/${name}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.tax;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getTaxForOrder = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameTax}/detail/order/active`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.tax;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShippings = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameShipping}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createShipping = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostnameShipping}/create`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.shipping;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteShipping = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(`${hostnameShipping}/delete/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.shipping;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateShipping = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostnameShipping}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.shipping;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getShippingByName = async (
  header: {},
  body: {},
  param: {},
  name: string
) => {
  try {
    const result = await fetchApi.get(
      `${hostnameShipping}/detail/name/${name}`,
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.shipping;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPaymentMethod = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnamePaymentMethod}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPaymentMethod = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostnamePaymentMethod}/create`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.paymentMethod;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deletePaymentMethod = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(
      `${hostnamePaymentMethod}/delete/${id}`,
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.paymentMethod;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updatePaymentMethod = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostnamePaymentMethod}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.paymentMethod;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentMethodById = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.get(`${hostnamePaymentMethod}/detail/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.paymentMethod;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusPaymentStatus = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.put(
      `${hostnamePaymentMethod}/edit/${id}`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.paymentMethod;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPaymentMethodsActive = async (
  header: {},
  body: {},
  param: {}
) => {
  try {
    const result = await fetchApi.get(`${hostnamePaymentMethod}/list/active`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.paymentMethods;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameOrder}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostnameOrder}/create`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.order;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostnameOrder}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.order;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(`${hostnameOrder}/delete/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.order;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.get(`${hostnameOrder}/detail/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.order;
    else return null;
  } catch (error) {
    console.log(error);
  }
};



export const getDashboard = async (header: {},
  body: {},
  param: {}) => {
  try {
    const result = await fetchApi.get(`${hostnameOrder}/dashboard`, {
      headers: {
        ...header
      }
    });
    return result.data.dashboard;
  } catch (error) {
    console.log(error)
  }
}