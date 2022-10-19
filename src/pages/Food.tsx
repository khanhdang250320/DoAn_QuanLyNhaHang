import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableFood from '../base/table/BaseTableFood'
import BoxSearch from '../components/food/BoxSearch'
import { FoodType } from '../interfaces';
import { findAllFoods, updateFood } from '../redux/slices/foodSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Food() {
    const dispatch = useDispatch<AppDispatch>();
    const [foods, setFoods] = useState<FoodType[]>([]);
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

                const result: any = await dispatch(findAllFoods(params)).unwrap();

                const { data, pagination } = result?.data;

                setFoods(data || []);

                setTotal(pagination[0].total);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách món ăn thất bại",
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
        console.log('cdsad')
    }

    const handleUpdateStatus = (food: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...food,
                }
                await dispatch(updateFood(body)).unwrap();

                setFoods((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return food;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái món ăn thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái món ăn thất bại", dispatch);
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
            "Cập nhật món ăn",
            "Bạn có muốn cập nhật trạng thái của món ăn không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableFood data={foods} handleUpdateStatus={handleUpdateStatus} />
            <div className='mt-4'>
                <BasePagination page={page} total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default Food