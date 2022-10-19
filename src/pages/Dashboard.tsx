import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseAnalytic from "../base/BaseAnalytic";
import BaseLoading2 from "../base/BaseLoading2";
import SaleHistoryChart from "../components/analytic/SaleHistoryChart";
import TablePopularProduct from "../components/analytic/TablePopularProduct";
import TableRecentOrder from "../components/analytic/TableRecentOrder";
import TableTop10Customers from "../components/analytic/TableTop10Customers";
import {
  dashboardSelector,
  isLoadingDashboardSelector,
} from "../redux/slices/orderSlice";
// import { isLoginSelector } from "../redux/slices/employeeSlice";

function Dashboard() {
  // const isLogin = useSelector(isLoginSelector);
  const dashboard = useSelector(dashboardSelector);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isLogin === false) navigate("/login");
  // }, isLogin);
  // if (isLoadingDashboard)
  //   return (
  //     <>
  //       <BaseLoading2
  //         top="mt_40vh"
  //         size="icon100x100"
  //         justify="justify-content-center"
  //         display="d-flex"
  //         align="align-items-center"
  //       />
  //     </>
  //   );
  return (
    <>
      <div className="row m-0 p-0">
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={1}
            icon="mdi:currency-usd"
            backgroundIcon="rgb(167, 243, 208)"
            colorIcon="#047857"
            title="Doanh thu"
            extraTitle="(Trong 30 ngày)"
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={2}
            icon="ic:outline-shopping-cart"
            backgroundIcon="#facaca"
            colorIcon="#ff6e6e"
            title="Hoá đơn"
            extraTitle="(Trong 30 ngày)"
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={3}
            icon="uil:usd-circle"
            backgroundIcon="#ffe8b2"
            colorIcon="#ffb300"
            title="Doanh thu trong ngày"
            extraTitle=""
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={4}
            icon="la:user-check"
            backgroundIcon="rgb(147, 197, 253)"
            colorIcon="#1D4ED8"
            title="Khách hàng"
            extraTitle=""
          />
        </div>
      </div>
      <div className="px-2 mt-4">
        {/* <SaleHistoryChart /> */}
      </div>
      <div className="row m-0 p-0">
        <div className="col-12 col-lg-6 px-2 mt-4">
          <TableRecentOrder data={[]} />
        </div>
        <div className="col-12 col-lg-6 px-2 mt-4">
          <TableTop10Customers data={[]} />
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
