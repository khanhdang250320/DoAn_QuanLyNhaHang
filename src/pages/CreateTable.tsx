import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import CreateTableItem from '../components/table/CreateTableItem';
import { findAllAreas } from '../redux/slices/areaSlice';
import { createMultiTable } from '../redux/slices/table';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { ENTITY_STATUS } from '../utils';

function CreateTable() {
    const dispatch = useDispatch<AppDispatch>();
    const [option, setOption] = useState<any[]>([]);
    const [errorImage, setErrorImage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    // page
                }

                const result: any = await dispatch(findAllAreas(params)).unwrap();

                const { data } = result?.data;

                const dataArea: any[] = [];

                (data || []).forEach((area: any) => {
                    dataArea.push({
                        value: {
                            avatar: area?.avatar || '',
                            value: area?.id,
                            name: area?.name
                        },
                        label: area?.name,
                    })
                })

                setOption(dataArea.map((item, index) => {
                    item.label = (
                        <div className="d-flex align-items-center">
                            <Avatar shape='rectangle' size={30} url={item?.value?.avatar} />
                            <span className="ml_10px font14 font_family_bold">{item.label}</span>
                        </div>
                    );
                    return item;
                }));
            } catch (error) {
                dispatch(
                    themeSlice.actions.showToast({
                        content: "L???y danh s??ch khu v???c th???t b???i",
                        type: "error",
                    })
                );
            }
        };

        initData();
    }, [dispatch]);

    const [tables, setTables] = useState<any[]>([
        {
            id: `${new Date().getTime()}`,
            name: '',
            quantity: 0,
            areaId: "",
            status: ENTITY_STATUS.ACTIVATED,
        }
    ]);

    const handleAddTable = () => {
        setTables((prevState: any[]) => {
            const newState = [...prevState];
            newState.push({
                id: `${new Date().getTime()}`,
                name: '',
                quantity: 0,
                areaId: "",
                status: ENTITY_STATUS.ACTIVATED,
            });

            return newState;
        })
    }

    const handleChooseArea = (value: any, index: number) => {
        setTables((prevState: any[]) => {
            const newState = [...prevState];
            newState[index].areaId = value?.value?.value;
            newState[index].name = `${value?.value?.name}-${new Date().getTime()}`;

            return newState;
        })
    }

    const handleChangeInformation = (table: any, index: number) => {
        setTables((prevState: any[]) => {
            const newState = [...prevState];
            newState[index] = table;

            return newState;
        })
    }

    const handleDeleteTable = (index: number) => {
        setTables((prevState: any[]) => {
            const newState = [...prevState];

            newState.splice(index, 1);

            return newState;
        })
    }

    const handleSubmit = () => {
        let flag = true;
        tables.forEach((table: any) => {
            const { name, quantity } = table;

            if (!name || !quantity) flag = false;
        });

        if (!flag) setErrorImage("B???n ch??a nh???p ????? th??ng tin")
        else {
            setErrorImage('');
            console.log(tables);
            saveTables(tables);
        }
    }

    const saveTables = async (tables: any[]) => {
        try {
            const body = {
                tables
            }

            await dispatch(createMultiTable(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Th??m b??n th??nh c??ng",
                    type: "success",
                })
            );

            navigate("/tables/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Th??m b??n th???t b???i",
                    type: "error",
                })
            );
        } finally {
            dispatch(
                themeSlice.actions.hideBackdrop({
                    isShow: false,
                    content: "",
                })
            );
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="font20 font_family_bold mt-2">Th??m khu v???c m???i</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-4 mt-2">
                        <div className="font18 font_family_bold">Th??ng tin</div>
                        <div className="font14 font_family_regular mt-2 color_888">
                            Th??ng tin danh s??ch b??n
                        </div>
                    </div>
                    <div className='col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4'>
                        {
                            tables.map((table: any, index: number) => (
                                <React.Fragment key={table.id}>
                                    <CreateTableItem table={table} index={index}
                                        handleChooseArea={handleChooseArea}
                                        handleChangeInformation={handleChangeInformation}
                                        handleDeleteTable={handleDeleteTable}
                                        option={option}
                                    />
                                    {
                                        index < tables.length - 1 && <div className="my-4 divider_vertical_dashed"></div>
                                    }
                                </React.Fragment>
                            ))
                        }
                        <div className='d-flex justify-content-end w100_per' >
                            <button type='button' className='btn bg_primary font14 font_family_bold color_white mt-4' onClick={handleAddTable}>
                                Th??m b??n
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-4"></div>
                    <div
                        className={`col-12 col-lg-8 border_radius_5 py-2 px-4 color_red ${errorImage.length > 0 ? `bg_red` : `d-none`
                            }`}
                    >
                        {errorImage}
                    </div>
                </div>
                <div className="mt-4 d-flex justify-content-end">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="btn bg_primary font14 font_family_bold color_white"
                    >
                        Th??m danh s??ch b??n m???i
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateTable