import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Modal } from 'rsuite';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import BaseSliders from '../../base/BaseSliders';
import BasePagination from '../../base/pagination';
import { AreaType, TableType } from '../../interfaces';
import { findAllAreas } from '../../redux/slices/areaSlice';
import { findAllTables } from '../../redux/slices/table';
import { AppDispatch } from '../../redux/store';
import { ENTITY_STATUS, ICON, Notification } from '../../utils';
import AreaItem from '../book/AreaItem';
import TableItem from '../book/TableItem';
import EmptyTable from '../EmptyTable';

const Wrapper = styled(Modal)`
    width: 1400px;
`;

type ModalChooseProductForBookProps = {
    visible: boolean;
    handleClose: () => void;
    chosenTables: any[];
    handleChoose: (table: any, quantity: number) => void;
}

function ModalChooseTableForBook({ chosenTables, handleChoose, handleClose, visible }: ModalChooseProductForBookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [tables, setTables] = useState<TableType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [areas, setAreas] = useState<AreaType[]>([]);
    const [chosenArea, setChosenArea] = useState<any>({});

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    status: ENTITY_STATUS.ACTIVATED
                }

                const result: any = await dispatch(findAllAreas(params)).unwrap();

                const { data } = result?.data;

                setAreas(data || []);
            } catch (error) {
                Notification("error", "Lấy danh sách khu vực thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [dispatch, visible]);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    areaId: chosenArea?.id,
                    status: ENTITY_STATUS.ACTIVATED
                }

                const result: any = await dispatch(findAllTables(params)).unwrap();

                const { data } = result?.data;

                setTables(data || []);
            } catch (error) {
                Notification("error", "Lấy danh sách bàn thất bại", dispatch);
            } finally {
                setIsLoading(false);
            }
        };
        if (chosenArea?.id)
            initData();
    }, [chosenArea?.id, dispatch, visible])

    const handleShowFilter = () => {
        setIsFilter(!isFilter)
    }

    const handleChooseArea = (area: any) => {
        setChosenArea(area);
    }

    return (
        <Wrapper open={visible} onClose={handleClose} >
            <Modal.Header>
                <Modal.Title>
                    <div className='font16 font_family_bold'>Danh sách bàn</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '570px' }}>
                <div className='divider_vertical_dashed my-3'></div>
                <div className='font14 font_family_bold_italic'>Danh sách khu vực</div>
                <BaseSliders style={{ height: '250px', marginTop: '10px' }} autoplay={false} loop={true} sliderPerView={7} >
                    {areas.map((item: any, index: any) => (
                        <SwiperSlide key={item?.id}>
                            <AreaItem chosenTables={chosenTables} chosenArea={chosenArea} handleChooseArea={handleChooseArea} area={item} />
                        </SwiperSlide>
                    ))}
                </BaseSliders>
                <div className='divider_vertical_dashed my-3'></div>
                <div className='font14 font_family_bold_italic mb-2'>Bàn</div>
                {
                    isLoading ? <div>dsadsa</div>
                        :
                        <>
                            {
                                tables.length === 0 ? <EmptyTable icon={ICON.TABLE} title='Không tìm thấy bàn' />
                                    :
                                    <div className='row m-0 p-0'>
                                        {
                                            tables.map((table: any, index: number) => <TableItem chosenTables={chosenTables} handleChooseTable={handleChoose} key={table?.id} table={table} />)
                                        }
                                    </div>
                            }
                        </>
                }
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className='mt-2 border_black_1px bg_white border_radius_5 mr_10px px-4 py-2 font14 font_family_bold'>Đóng</button>
            </Modal.Footer>
        </Wrapper>
    )
}

export default ModalChooseTableForBook