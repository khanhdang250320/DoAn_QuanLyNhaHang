import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImage from '../components/UploadImage';
import BaseFileChosen from '../base/BaseFileChosen';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ENTITY_STATUS, genStatusFood, ICON, textAlign } from '../utils';
import { Icon } from '@iconify/react';
import ModalListObject from '../components/modal/ModalListObject';
import Avatar from '../components/Avatar';
import { currencyFormat } from '../utils/format';
import themeSlice from '../redux/slices/themeSlice';
import { saveImage } from '../utils/firebase';
import { findAllAreas, updateArea } from '../redux/slices/areaSlice';

const header = [
    {
        name: "Ảnh đại diện",
        width: "20%",
        dataKey: 'avatar',
        render: (data: any) => <Avatar url={data} size={42} shape="rectangle" />,
        textAlign: textAlign("left"),
    },
    {
        name: "Tên khu vực",
        width: "50%",
        dataKey: 'name',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Trạng thái",
        width: "20%",
        dataKey: 'status',
        render: (data: any) => <div className={`d-inline py-1 px-2 border_radius_10 font12 font_family_bold_italic ${data === ENTITY_STATUS.ACTIVATED ? `bg_primary color_white` : `bg_red color_black`}`}>
            {genStatusFood(data).name}
        </div>,
        textAlign: textAlign("left"),
    },
    {
        name: "",
        width: "10%",
        dataKey: 'id',
        render: (data: any, chosen?: any) => <>
            {
                chosen ? <Icon icon={ICON.SELECTED} className="icon20x20 color_primary" />
                    : <Icon icon={ICON.UNSELECT} className="icon20x20 color_primary" />
            }
        </>,
        textAlign: textAlign("right"),
    },
];

const schema = yup.object({
    name: yup.string().required("Tên khu vực không được trống"),
    description: yup.string(),
});

function UpdateArea() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [errorImage, setErrorImage] = useState<string>('');
    const [avatar, setAvatar] = useState<any[]>([]);
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: 'Danh sách khu vực',
        total: 0,
    });
    const [page, setPage] = useState<number>(1);
    const [chosenArea, setChosenArea] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    page
                }

                const result: any = await dispatch(findAllAreas(params)).unwrap();

                const { data, pagination } = result?.data;

                setDataModal((prevState: any) => {
                    return {
                        ...prevState,
                        data: data || [],
                        total: pagination[0].total | 0
                    }
                })
            } catch (error: any) {
                console.log('error', error);
            }
        }

        initData();
    }, [dispatch, page]);

    const handleChoose = (e: any) => {
        const { name, description, avatar } = e?.data;
        setValue("name", name);
        setValue("description", description);

        setAvatar([avatar]);

        setChosenArea(e);
    }

    const handleCloseModal = () => {
        setDataModal((prevState: any) => {
            return {
                ...prevState,
                visible: false
            }
        })
    }

    const handleOpenModal = () => {
        setDataModal((prevState: any) => {
            return {
                ...prevState,
                visible: true,
            }
        })
    }

    const onSubmit = (data: any) => {
        if (avatar.length === 0) setErrorImage("Bạn chưa chọn ảnh đại diện");
        else {
            setErrorImage("");

            dispatch(
                themeSlice.actions.showBackdrop({
                    isShow: true,
                    content: "",
                })
            );

            const newArea = {
                ...chosenArea?.data,
                name: data.name,
                price: data.price,
                description: data.description || '',
                status: chosenArea?.data?.status,
            };

            saveArea(newArea);
        }
    }

    const saveArea = async (area: any) => {
        try {
            let avatarUrl = chosenArea?.data.avatar;
            if (typeof avatar[0] !== 'string')
                avatarUrl = await saveImage("areas", avatar[0]);
            const body = {
                ...area,
                avatar: avatarUrl,
            };

            await dispatch(updateArea(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật khu vực thành công",
                    type: "success",
                })
            );

            navigate("/areas/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Cập nhật khu vực thất bại",
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

    const onChooseAvatar = (e: any) => {
        const file = e.target.files[0];
        setAvatar([file]);
    };

    const handleDeleteAvatar = (position: number) => {
        setAvatar([]);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font20 font_family_bold mt-2">Cập nhật thông tin khu vực</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="box_shadow_card bg_white border_radius_5 p-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="font16 font_family_bold_italic">
                            Chọn khu vực
                        </div>
                        <button onClick={handleOpenModal} type="button" className="btn bg_primary color_white font16 font_family_bold_italic">Danh sách khu vực</button>
                    </div>
                    <div className="mt-2 d-flex align-items-center justify-content-center flex-column">
                        {
                            chosenArea?.data ?
                                <>
                                    <Icon icon={ICON.SELECTED} className="icon50x50 color_primary" />
                                    <div>Bạn đã chọn khu vực</div>
                                </>
                                :
                                <>
                                    <Icon icon={ICON.CLOSE} className="icon50x50 color_red" />
                                    <div className="mt-2 font14 font_family_bold_italic">Bạn chưa chọn khu vực</div>
                                </>
                        }

                    </div>
                </div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-4 mt-2">
                        <div className="font18 font_family_bold">Thông tin</div>
                        <div className="font14 font_family_regular mt-2 color_888">
                            Thông tin của khu vực
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
                        <div className="font_family_bold_italic font14">Tên khu vực</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("name")}
                            placeholder="Nhập tên khu vực"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.name?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                        <textarea
                            {...register("description")}
                            placeholder="Nhập mô tả khu vực"
                            className="w100_per mt-2"
                            rows={5}
                        ></textarea>
                        <UploadImage onChooseAvatar={onChooseAvatar} />
                        <div className="d-flex flex-wrap mt-2">
                            {avatar.map((item: any, index: any) => (
                                <BaseFileChosen
                                    file={true}
                                    close={handleDeleteAvatar}
                                    index={index}
                                    key={index}
                                    image={item}
                                />
                            ))}
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
                        disabled={Boolean(!chosenArea?.data)}
                        type="submit"
                        className="btn bg_primary font14 font_family_bold color_white"
                    >
                        Cập nhật thông tin
                    </button>
                </div>
            </form>
            <ModalListObject handleClose={handleCloseModal} chosenData={chosenArea} data={dataModal} header={header} onChoose={handleChoose} />
        </>
    )
}

export default UpdateArea