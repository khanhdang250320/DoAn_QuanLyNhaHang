import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasePagination from "../base/pagination";
import BaseTableUser from "../base/table/BaseTableUser";
import Pagination from "../components/Pagination";
import BoxSearch from "../components/user/BoxSearch";
import { CustomerType } from "../interfaces";
import { findAllCustomers } from "../redux/slices/customerSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Customer() {
  const dispatch = useDispatch<AppDispatch>();
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page,
        };

        const result: any = await dispatch(findAllCustomers(params)).unwrap();

        const { data, pagination } = result?.data;

        setCustomers(data || []);

        setTotal(pagination[0].total);
      } catch (error) {
        dispatch(
          themeSlice.actions.showToast({
            content: "Lấy danh sách khách hàng tất bại",
            type: "error",
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [dispatch, page])

  const handleFilter = () => {
    console.log('dsadsa')
  }

  const handleChangePage = (e: any) => {
    setPage(e || 1);
  }

  return (
    <>
      <BoxSearch handleFilter={handleFilter} />
      <BaseTableUser data={customers} />
      <BasePagination onChange={handleChangePage} total={total} />
    </>
  );
}

export default React.memo(Customer);
