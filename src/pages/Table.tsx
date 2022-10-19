import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableTable from '../base/table/BaseTableTable'
import BoxSearch from '../components/table/BoxSearch'
import { TableType } from '../interfaces';
import { findAllTables, updateTable } from '../redux/slices/table';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Table() {
    const dispatch = useDispatch<AppDispatch>();
    const [tables, setTables] = useState<TableType[]>([]);
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

                const result: any = await dispatch(findAllTables(params)).unwrap();

                const { data, pagination } = result?.data;

                setTables(data || []);

                setTotal(pagination[0].total);
            } catch (error) {
                Notification("error", "Lấy danh sách bàn thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, page])

    const handleFilter = () => {
        console.log('cdsad')
    }

    const handleUpdateStatus = (table: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...table,
                }
                await dispatch(updateTable(body)).unwrap();

                setTables((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return table;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái bàn thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái bàn thất bại", dispatch);
            }
        };

        alert2(
            "Update",
            "question",
            true,
            "Xác nhận",
            "#f55858",
            true,
            "Huỷ bỏ",
            "#000",
            "Cập nhật bàn",
            "Bạn có muốn cập nhật trạng thái của bàn không?",
            handleConfirm
        );
    }


    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableTable handleUpdateStatus={handleUpdateStatus} data={tables} />
            <div className='mt-4'>
                <BasePagination total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default Table