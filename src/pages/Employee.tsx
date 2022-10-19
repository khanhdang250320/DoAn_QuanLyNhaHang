import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasePagination from '../base/pagination';
import BaseTableEmployee from '../base/table/BaseTableEmployee'
import BoxSearch from '../components/employee/BoxSearch'
import Pagination from '../components/Pagination'
import { EmployeeType } from '../interfaces';
import { findAllEmployees } from '../redux/slices/employeeSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';

function Employee() {
    const dispatch = useDispatch<AppDispatch>();
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page
                }

                const result: any = await dispatch(findAllEmployees(params)).unwrap();

                const { data, pagination } = result?.data;

                setEmployees(data || []);

                setTotal(pagination[0].total);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách nhân viên thất bại",
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
            <BaseTableEmployee data={employees} />
            <BasePagination onChange={handleChangePage} total={total} />
        </>
    )
}

export default Employee