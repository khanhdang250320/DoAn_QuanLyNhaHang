import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasePagination from '../base/pagination';
import BaseTableBook from '../base/table/BaseTableBook';
import BoxSearchBook from '../components/book/BoxSearchBook'
import Pagination from '../components/Pagination';
import { BookType, OrderType } from '../interfaces';
import { findAllBooks } from '../redux/slices/bookSlice';
import { allOrdersSelector } from '../redux/slices/orderSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';

const countPerRow = 10;
function Book() {
    const dispatch = useDispatch<AppDispatch>();
    const [books, setBooks] = useState<BookType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page
                }

                const result: any = await dispatch(findAllBooks(params)).unwrap();

                const { data, pagination } = result?.data;

                setBooks(data || []);

                setTotal(pagination[0]?.total || 0);
            } catch (error) {
                Notification("error", "Lấy danh sách khu vực thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, page])


    const handleDetail = (id: string) => {
        navigate(`/books/update`)
    }


    const handleFilter = (text: string) => {
        console.log('dsadsa');
    }


    return (
        <>
            <BoxSearchBook handleFilter={handleFilter} />
            <BaseTableBook handleDetail={handleDetail} data={books} />
            <div className='mt-4'>
                <BasePagination page={page} total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default Book