import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseTableOrder from "../base/table/BaseTableOrder";
import BoxSearchOrder from "../components/order/BoxSearchOrder";
import Pagination from "../components/Pagination";
import { OrderType } from "../interfaces";
import { allOrdersSelector } from "../redux/slices/orderSlice";

const countPerRow = 10;
function Orders() {
  const allOrders = useSelector(allOrdersSelector);
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [ordersByPage, setOrdersByPage] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate()
  useEffect(() => {
    if (allOrders) setOrders(allOrders)
  }, [allOrders]);
  useEffect(() => {
    setPage(1);
    setOrdersByPage(orders.slice(0, countPerRow));
  }, [orders]);
  const handleDetail = (order: OrderType) => {
    navigate(`/orders/${order.id}`)
  }
  const handleChoosePage = (value: any) => {
    setPage(value);
    setOrdersByPage(
      orders.slice(
        (value - 1) * countPerRow,
        (value - 1) * countPerRow + countPerRow
      )
    );
  };
  const handlePrevPage = (value: any) => {
    if (page > 1) {
      setOrdersByPage(
        orders.slice(
          (page - 2) * countPerRow,
          (page - 2) * countPerRow + countPerRow
        )
      );
      setPage(page - 1);
    }
  };
  const handleNextPage = (value: any) => {
    if (page < Math.ceil(orders.length / countPerRow)) {
      setOrdersByPage(
        orders.slice(page * countPerRow, page * countPerRow + countPerRow)
      );
      setPage(page + 1);
    }
  };
  const handleGetEndPage = () => {
    return Math.ceil(orders.length / countPerRow);
  };
  const handleGetListPageCurrent = () => {
    const end = Math.ceil(orders.length / countPerRow);
    if (page < 4 || end <= 4) return [1, 2, 3, 4, end];
    else if (end - page < 4) {
      return [1, end - 3, end - 2, end - 1, end];
    } else return [page - 1, page, page + 1, page + 2];
  };
  const handleFilter = (text: string) => {
    if (text) setOrders(allOrders.filter((order: OrderType) => order.phone.includes(text)))
    else setOrders(allOrders)
  }

  const data = [
    {
        customer: {
            name: "Ronaldo",
            phone: '0123456789'
        },
        total: 100000,
    },
  ]
  return (
    <>
      <BoxSearchOrder handleFilter={handleFilter} />
      <BaseTableOrder countPerRow={countPerRow} handleDetail={handleDetail} data={data} page={page} />
      <div className="d-flex align-items-center justify-content-end mt-4 pagination">
        <Pagination type="change" click={handlePrevPage} value="prev" />
        {handleGetListPageCurrent().map((item, index) => (
          <Pagination
            value={item}
            type="value"
            key={index}
            page={page}
            click={handleChoosePage}
            pageEnd={handleGetEndPage()}
          />
        ))}
        <Pagination
          status="end"
          type="value"
          page={page}
          click={handleChoosePage}
          value={handleGetEndPage()}
        />
        <Pagination type="change" click={handleNextPage} value="next" />
      </div>
    </>
  )
}

export default React.memo(Orders);
