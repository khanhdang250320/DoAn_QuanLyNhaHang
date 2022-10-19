import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImage from '../components/UploadImage';
import BaseFileChosen from '../base/BaseFileChosen';
import { ENTITY_STATUS } from '../utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import themeSlice from '../redux/slices/themeSlice';
import { saveImage } from '../utils/firebase';
import { createFood } from '../redux/slices/foodSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup.string().required("Tên món ăn không được trống"),
    price: yup.number().typeError("Giá phải là số").required("Đơn giá không được trống"),
    description: yup.string(),
});

function CreateFood() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [errorImage, setErrorImage] = useState<string>('');
    const [avatar, setAvatar] = useState<any[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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

            const food = {
                name: data.name,
                price: data.price,
                description: data.description || '',
                status: ENTITY_STATUS.ACTIVATED,
            };

            saveFood(food);
        }
    }

    const saveFood = async (food: any) => {
        try {
            const avatarUrl = await saveImage("foods", avatar[0]);
            const body = {
                ...food,
                avatar: avatarUrl,
            };

            await dispatch(createFood(body)).unwrap();

            dispatch(
                themeSlice.actions.showToast({
                    content: "Thêm món ăn thành công",
                    type: "success",
                })
            );

            navigate("/foods/list");
        } catch (error) {
            dispatch(
                themeSlice.actions.showToast({
                    content: "Thêm món ăn thất bại",
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
                <div className="font20 font_family_bold mt-2">Thêm món ăn mới</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-4 mt-2">
                        <div className="font18 font_family_bold">Thông tin</div>
                        <div className="font14 font_family_regular mt-2 color_888">
                            Thêm thông tin của món ăn
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
                        <div className="font_family_bold_italic font14">Tên món ăn</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("name")}
                            placeholder="Nhập tên món ăn"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.name?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Đơn giá</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("price")}
                            placeholder="Nhập đơn giá món ăn"
                            type="number"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.price?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Mô tả</div>
                        <textarea
                            {...register("description")}
                            placeholder="Nhập mô tả món ăn"
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
                        type="submit"
                        className="btn bg_primary font14 font_family_bold color_white"
                    >
                        Thêm món ăn
                    </button>
                </div>
            </form>
        </>
    )
}

export default React.memo(CreateFood);