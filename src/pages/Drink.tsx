import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BasePagination from '../base/pagination';
import BaseTableDrink from '../base/table/BaseTableDrink'
import BoxSearch from '../components/drink/BoxSearch'
import { DrinkType } from '../interfaces';
import { findAllDrinks, updateDrink } from '../redux/slices/drinkSlice';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Notification } from '../utils';
import alert2 from '../utils/Sweetalert2';

function Drink() {
    const dispatch = useDispatch<AppDispatch>();
    const [drinks, setDrinks] = useState<DrinkType[]>([]);
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

                const result: any = await dispatch(findAllDrinks(params)).unwrap();

                const { data, pagination } = result?.data;

                setDrinks(data || []);

                setTotal(pagination[0].total);
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "Lấy danh sách đồ uống thất bại",
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

    const handleUpdateStatus = (drink: any, position: number) => {
        const handleConfirm = async () => {
            try {
                const body = {
                    ...drink,
                }
                await dispatch(updateDrink(body)).unwrap();

                setDrinks((prevState: any) => {
                    const newState = prevState.map((item: any, index: number) => {
                        if (position === index) return drink;

                        return item;
                    });

                    return newState;
                });

                Notification("success", "Cập nhật trạng thái đồ uống thành công", dispatch);
            } catch (error) {
                Notification("error", "Cập nhật trạng thái đồ uống thất bại", dispatch);
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
            "Cập nhật đồ uống",
            "Bạn có muốn cập nhật trạng thái của đồ uống không?",
            handleConfirm
        );
    }

    return (
        <>
            <BoxSearch handleFilter={handleFilter} />
            <BaseTableDrink handleUpdateStatus={handleUpdateStatus} data={drinks} />
            <div className='mt-4'>
                <BasePagination total={total} onChange={(e: any) => null} />
            </div>
        </>
    )
}

export default Drink