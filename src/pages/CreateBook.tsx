import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from 'styled-components';
import Avatar from '../components/Avatar'
import QuantityInput from '../components/QuantityInput';
import { defaultAvatar, genAddress, genTypeOfProductType, ICON, Notification, ORDER_STATUS, PAYMENT_METHOD, textAlign } from '../utils';
import { currencyFormat } from '../utils/format';
import DatePicker, { registerLocale } from "react-datepicker";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import ModalListObject from '../components/modal/ModalListObject';
import { findAllCustomers } from '../redux/slices/customerSlice';
import ModalChooseProductForBook from '../components/modal/ModalChooseProductForBook';
import ModalChooseTableForBook from '../components/modal/ModalChooseTableForBook';
import vi from "date-fns/locale/vi";
import { BookDetailType, BookType, TableBookType } from '../interfaces';
import BoxRadio from '../components/BoxRadio';
import { createBook } from '../redux/slices/bookSlice';
import BasePopover from '../base/BasePopover';
import BoxCustomerNote from '../components/book/BoxCustomerNote';
import themeSlice from '../redux/slices/themeSlice';

registerLocale("vi", vi);

type Type =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
const TableCell = styled.td`
  padding: 10px;
`;
const TableCellHead = styled.th`
  padding: 10px;
`;

const options = [
    {
        value: 3600000,
        label: '1h'
    },
    {
        value: 7200000,
        label: '2h'
    },
    {
        value: 10800000,
        label: '3h'
    },
    {
        value: 14400000,
        label: '4h'
    }
]

const headerCustomer = [
    {
        name: "Ảnh đại diện",
        width: "15%",
        dataKey: 'avatar',
        render: (data: any) => <Avatar url={data} size={42} shape="rectangle" />,
        textAlign: textAlign("left"),
    },
    {
        name: "Họ tên",
        width: "30%",
        dataKey: 'name',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Số điện thoại",
        width: "20%",
        dataKey: 'phone',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "Email",
        width: "20%",
        dataKey: 'email',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "CMND/CCCD",
        width: "15%",
        dataKey: 'identity',
        render: (data: any) => <div>{data}</div>,
        textAlign: textAlign("left"),
    },
    {
        name: "",
        width: "5%",
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

export const dataPaymentMethod = [
    {
        name: "Tiền mặt",
        value: PAYMENT_METHOD.CASH,
    },
    {
        name: "Internet Banking",
        value: PAYMENT_METHOD.INTERNET_BANKING,
    },
];

const schema = yup.object({
    quantityCustomer: yup.number().min(0, "Số người sử dụng phải lớn hơn 0").typeError("Số người sử dụng phải là số").required("Số người sử dụng không được trống"),
    note: yup.string(),
});

function CreateBook() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [checkoutAt, setCheckoutAt] = useState<Date>(new Date());
    const [timeToUse, setTimeToUse] = useState<any>();
    const [dataModal, setDataModal] = useState<any>({
        visible: false,
        data: [],
        title: '',
        total: 0,
    });
    const [chosenCustomer, setChosenCustomer] = useState<any>({
        dataKey: 'id',
        data: undefined,
    });
    const [page, setPage] = useState<number>(1);
    const [dataCustomer, setDataCustomer] = useState<any>({
        data: [],
        total: 0,
    });

    const [visibleModalProduct, setVisibleModalProduct] = useState<boolean>(false);
    const [chosenProducts, setChosenProducts] = useState<Array<{
        product: any,
        quantity: number,
        note: string,
    }>>([]);

    const [visibleModalTable, setVisibleModalTable] = useState<boolean>(false);
    const [chosenTables, setChosenTables] = useState<Array<{
        table: any,
        quantity: number,
        note: string,
    }>>([]);
    const [paymentMethod, setPaymentMethod] = useState<number>(PAYMENT_METHOD.CASH);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const quantityCustomer = watch("quantityCustomer");

    const textAlign = (value: Type) => value;

    const headerProduct = [
        {
            name: "Sản phẩm",
            width: "50%",
            textAlign: textAlign("left"),
        },
        {
            name: "Đơn giá",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số lượng",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Thành tiền",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: " ",
            width: "10%",
            textAlign: textAlign("center"),
        },
    ]

    const headerTable = [
        {
            name: "Bàn",
            width: "70%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số lượng người",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: " ",
            width: "10%",
            textAlign: textAlign("center"),
        },
    ]

    useEffect(() => {
        const initData = async () => {
            try {
                const params = {
                    page,
                }

                const result: any = await dispatch(findAllCustomers(params)).unwrap();

                const { data, pagination } = result?.data;

                setDataCustomer((prevState: any) => {
                    return {
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

    const handleChooseCustomer = (e: any) => {
        setChosenCustomer(e);
    }

    const handleCloseModalCustomer = () => {
        setDataModal((prevState: any) => {
            return {
                visible: false,
                data: [],
                title: '',
                total: 0,
            }
        })
    }

    const handleOpenModalCustomer = () => {
        setDataModal((prevState: any) => {
            return {
                visible: true,
                data: dataCustomer?.data || [],
                title: 'Danh sách khách hàng',
                total: dataCustomer?.total || 0,
            }
        })
    }

    const totalPrice = useMemo(() => {
        let result = 0;
        chosenProducts.forEach(item => {
            result += item?.product?.price * item?.quantity;
        });

        return result;
    }, [chosenProducts])

    const onSubmit = (data: any) => {
        dispatch(
            themeSlice.actions.showBackdrop({
                isShow: true,
                content: "",
            })
        );

        const tables: TableBookType[] = chosenTables.map(item => {
            return {
                id: item?.table?.id,
                note: item?.note,
                quantity: item?.quantity
            }
        });

        const bookDetails: BookDetailType[] = chosenProducts.map(item => {
            return {
                productId: item?.product?.id,
                note: item?.note,
                quantity: item?.quantity,
            }
        });

        const book: BookType | any = {
            customerId: chosenCustomer?.data?.id,
            tables,
            checkoutAt,
            timeToUse,
            quantityCustomer: Number(quantityCustomer),
            status: ORDER_STATUS.NOT_USE,
            paymentMethod,
            customerNote: data?.note || '',

            totalPrice,
            deposit: totalPrice * 0.4,
            bookDetailIds: [],
        };

        console.log('book', book);
        console.log('bookDetails', bookDetails);
        saveBook({
            book,
            bookDetails
        });
    }

    const saveBook = async (body: any) => {
        try {
            await dispatch(createBook(body)).unwrap();

            navigate("/books/list");
            Notification("success", "Đặt bàn thành công", dispatch);
        } catch (error) {
            Notification("error", "Đặt bàn thất bại", dispatch);
        } finally {
            dispatch(
                themeSlice.actions.hideBackdrop({
                    isShow: false,
                    content: "",
                })
            );
        }
    }

    const handleCloseModalProduct = () => {
        setVisibleModalProduct(false);
    }

    const handleOpenModalProduct = () => {
        setVisibleModalProduct(true);
    }

    const handleChooseProduct = (product: any, quantity: number, note?: any) => {
        setChosenProducts((prevState: any) => {
            const index = prevState.findIndex((item: any) => item?.product?.id === product.id);
            const newState = [...prevState];

            if (quantity > 0) {
                if (index === -1) {
                    newState.push({
                        product,
                        quantity,
                        note: note || ''
                    })
                } else {
                    newState[index] = {
                        product,
                        quantity,
                        note: note || ''
                    }
                }
            } else {
                newState.splice(index, 1);
            }

            return newState;
        })
    }

    const handleCloseModalTable = () => {
        setVisibleModalTable(false);
    }

    const handleOpenModalTable = () => {
        console.log('timeToUse', timeToUse);
        if (!timeToUse) {
            Notification("error", "Bạn chưa chọn thời gian sử dụng", dispatch);
        } else if (!Number(quantityCustomer)) {
            Notification("error", "Bạn chưa nhập số người sử dụng", dispatch);
        } else {
            setVisibleModalTable(true);
        }
    }

    const handleChooseTable = (table: any, quantity: number, note?: any) => {
        setChosenTables((prevState: any) => {
            const index = prevState.findIndex((item: any) => item?.table?.id === table.id);
            const newState = [...prevState];

            if (quantity > 0) {
                if (index === -1) {
                    newState.push({
                        table,
                        quantity,
                        note: note || ''
                    })
                } else {
                    newState[index] = {
                        table,
                        quantity,
                        note: note || ''
                    }
                }
            } else {
                if (index > -1)
                    newState.splice(index, 1);
            }

            return newState;
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font20 font_family_bold mt-2">Đặt bàn</div>
                <div className='row p-0 m-0 mt-4'>
                    <div className='col-12 col-lg-8 p-2'>
                        <div className='bg_white box_shadow_card border_radius_20'>
                            <table className='w100_per'>
                                <thead>
                                    <tr className='border_bottom_gray_1px'>
                                        {headerProduct.map((item, index) => (
                                            <TableCellHead
                                                key={index}
                                                className="font_family_regular font16 p-3"
                                                style={{
                                                    width: item.width,
                                                    textAlign: item.textAlign,
                                                }}
                                            >
                                                {item.name}
                                            </TableCellHead>
                                        ))}
                                    </tr>
                                </thead>
                                {
                                    chosenProducts.length > 0 &&
                                    <tbody className='w100_per'>
                                        {
                                            chosenProducts.map((item: any, index) =>
                                                <tr className='border_top_gray_1px' key={`${item.id}`}>
                                                    <TableCell className='p-3 d-flex align-items-center' style={{
                                                        width: headerProduct.at(0)?.width,
                                                        textAlign: headerProduct.at(0)?.textAlign,
                                                    }}>
                                                        <Avatar url={item?.product?.avatar} size={64} shape="rectangle" />
                                                        <div className='ml_10px w100_per'>
                                                            <div className='font14 font_family_bold'>{item?.product?.name}</div>
                                                            <div className='mt-1 font12 font_family_italic color_888'>Loại: {item?.product?.productType?.name}</div>
                                                            <div className='mt-2 font12 font_family_bold_italic color_888'>{genTypeOfProductType(item?.product?.productType?.type)}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className='font14 font_family_bold_italic' style={{
                                                        width: headerProduct.at(1)?.width,
                                                        textAlign: headerProduct.at(1)?.textAlign,
                                                    }}>{currencyFormat(item?.product?.price)}</TableCell>
                                                    <TableCell style={{
                                                        width: headerProduct.at(2)?.width,
                                                        textAlign: headerProduct.at(2)?.textAlign,
                                                    }}>
                                                        <QuantityInput quantity={item?.quantity} onChange={(e: any) => {
                                                            handleChooseProduct(item?.product, e);
                                                        }} />
                                                    </TableCell>
                                                    <TableCell className='font14 font_family_bold_italic' style={{
                                                        width: headerProduct.at(3)?.width,
                                                        textAlign: headerProduct.at(3)?.textAlign,
                                                    }}>{currencyFormat(item?.product?.price * item?.quantity)}</TableCell>
                                                    <TableCell style={{
                                                        width: headerProduct.at(4)?.width,
                                                        textAlign: headerProduct.at(4)?.textAlign,
                                                    }}>
                                                        <BasePopover content={<BoxCustomerNote note={item?.note} handleChoose={(e: any) => {
                                                            handleChooseProduct(item?.product, item?.quantity, e);
                                                        }} />}>
                                                            <button type='button' className='p-0 border_radius_30 bg_white'>
                                                                <Icon icon={ICON.NOTE} className="icon25x25 color_yellow" />
                                                            </button>
                                                        </BasePopover>
                                                        <button onClick={() => handleChooseProduct(item?.product, 0)} type='button' className='p-0 border_radius_30 bg_white'>
                                                            <Icon icon={ICON.CLOSE} className="ml_10px icon25x25 color_red" />
                                                        </button>
                                                    </TableCell>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                }
                            </table>
                            {
                                chosenProducts.length === 0 &&
                                <div className='w100_per p-4 d-flex align-items-center justify-content-center flex-column'>
                                    <Icon icon={ICON.PRODUCT} className='icon100x100' />
                                    <div className='mt-4 font16 font_family_bold_italic'>Bạn chưa chọn sản phẩm</div>
                                </div>
                            }
                        </div>
                        <div className='mt-2 d-flex justify-content-end'>
                            <button type='button' className='btn bg_primary font14 font_family_bold_italic color_white' disabled={!chosenCustomer?.data} onClick={handleOpenModalProduct}>Chọn sản phẩm</button>
                        </div>
                        <div className='bg_white box_shadow_card border_radius_20 mt-4'>
                            <table className='w100_per'>
                                <thead>
                                    <tr className='border_bottom_gray_1px'>
                                        {headerTable.map((item, index) => (
                                            <TableCellHead
                                                key={index}
                                                className="font_family_regular font16 p-3"
                                                style={{
                                                    width: item.width,
                                                    textAlign: item.textAlign,
                                                }}
                                            >
                                                {item.name}
                                            </TableCellHead>
                                        ))}
                                    </tr>
                                </thead>
                                {
                                    chosenTables.length > 0 &&
                                    <tbody className='w100_per'>
                                        {
                                            chosenTables.map((item, index) =>
                                                <tr className='border_top_gray_1px' key={`${new Date().getTime() + index}`}>
                                                    <TableCell className='p-3 d-flex align-items-center' style={{
                                                        width: headerTable.at(0)?.width,
                                                        textAlign: headerTable.at(0)?.textAlign,
                                                    }}>
                                                        <Avatar url={item?.table?.area?.avatar} size={64} shape="rectangle" />
                                                        <div className='ml_10px'>
                                                            <div className='font14 font_family_bold'>{item?.table?.name}</div>
                                                            <div className='mt-1 font12 font_family_italic color_888'>Số người tối đa: {item?.table?.quantity}</div>
                                                            <div className='mt-2 font12 font_family_bold_italic color_888'>Khu vực: {item?.table?.area?.name}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell style={{
                                                        width: headerTable.at(1)?.width,
                                                        textAlign: headerTable.at(1)?.textAlign,
                                                    }}>
                                                        <div className='font14 font_family_bold_italic'>
                                                            {item?.quantity}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell style={{
                                                        width: headerTable.at(2)?.width,
                                                        textAlign: headerTable.at(2)?.textAlign,
                                                    }}>
                                                        <BasePopover content={<BoxCustomerNote note={item?.note} handleChoose={(e: any) => {
                                                            handleChooseTable(item?.table, item?.quantity, e);
                                                        }} />}>
                                                            <button type='button' className='p-0 border_radius_30 bg_white'>
                                                                <Icon icon={ICON.NOTE} className="icon25x25 color_yellow" />
                                                            </button>
                                                        </BasePopover>
                                                        <button onClick={() => handleChooseTable(item?.table, 0)} type='button' className='p-0 ml_10px border_radius_30 bg_white'>
                                                            <Icon icon={ICON.CLOSE} className="icon25x25 color_red" />
                                                        </button>
                                                    </TableCell>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                }
                            </table>
                            {
                                chosenTables.length === 0 &&
                                <div className='w100_per p-4 d-flex align-items-center justify-content-center flex-column'>
                                    <Icon icon={ICON.TABLE} className='icon100x100' />
                                    <div className='mt-4 font16 font_family_bold_italic'>Bạn chưa chọn bàn</div>
                                </div>
                            }
                        </div>
                        <div className='mt-2 d-flex justify-content-end'>
                            <button type='button' onClick={handleOpenModalTable} disabled={!chosenCustomer?.data} className='btn bg_primary font14 font_family_bold_italic color_white'>Chọn bàn</button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-4 p-2'>
                        <div className='box_shadow_card bg_white border_radius_5 p-2 d-flex flex-column align-items-center justify-content-center'>
                            <Avatar size={100} shape="rectangle" url={chosenCustomer?.data?.avatar || defaultAvatar} />
                            <div className='mt-2 font_family_bold font16'>{chosenCustomer?.data?.name || `Bạn chưa chọn khách hàng`}</div>
                            <button onClick={handleOpenModalCustomer} type='button' className='btn mt-2 font_family_bold_italic color_white bg_primary px-3 py-2 font12 border_radius_5'>Chọn khách hàng</button>
                            <div className='w100_per p-4'>
                                <div className='d-flex align-items-center'>
                                    <div className='w50_px'>
                                        <Icon icon="fa:phone-square" className="icon30x30 color_primary" />
                                    </div>
                                    <span className='font_family_bold font14'>{chosenCustomer?.data?.phone || `Số điện thoại`}</span>
                                </div>
                                <div className='d-flex align-items-center mt-4'>
                                    <div className='w50_px' style={{ minWidth: '50px' }}>
                                        <Icon icon="ri:map-pin-2-fill" className="icon30x30 color_primary" />
                                    </div>
                                    <span className='font_family_bold font14'>{chosenCustomer?.data?.address ? genAddress(chosenCustomer?.data?.address) : `Địa chỉ`}</span>
                                </div>
                            </div>
                            <div className='divider_vertical_solid' />
                            <div className='mt-2 w100_per'>
                                <div className='font_family_bold_italic font15 w100_per'>Thời gian nhận bàn</div>
                                <DatePicker
                                    minDate={new Date()}
                                    customInput={
                                        <input
                                            className="mt-2 h40_px w100_per"
                                            type="text"
                                        />
                                    }
                                    selected={checkoutAt}
                                    placeholderText="Chọn thời gian"
                                    showTimeSelect
                                    locale="vi"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    onChange={(newValue: Date) => {
                                        setCheckoutAt(newValue);
                                    }}
                                />
                                <div className='font_family_bold_italic font15 w100_per mt-4'>Thời gian sử dụng</div>
                                <Select
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            height: "40px",
                                            marginTop: "8px",
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "#ddd",
                                            primary50: "#ddd",
                                            primary: "rgba(0,159,127)",
                                        },
                                    })}
                                    placeholder="Chọn thời gian sử dụng"
                                    onChange={(value) => setTimeToUse(value?.value)}
                                    options={options}
                                />
                                <div className='font_family_bold_italic font15 w100_per mt-4'>Số người sử dụng</div>
                                <input
                                    {...register("quantityCustomer")}
                                    className="mt-2 h40_px w100_per"
                                    type="number"
                                    placeholder='Nhập số người sử dụng'
                                />
                                <div className="mt-2 font12 ml_5px color_red font_family_italic">
                                    {errors.quantityCustomer?.message}
                                </div>
                                <div className='font_family_bold_italic font15 w100_per mt-4'>Ghi chú</div>
                                <textarea
                                    placeholder="Nhập ghi chú"
                                    className="w100_per mt-2"
                                    rows={5}
                                    {...register("note")}
                                ></textarea>
                                <div className='divider_vertical_dashed my-2'></div>
                                <div className="mt-2">
                                    <div className='mb-2 font15 font_family_bold_italic'>Phương thức thanh toán</div>
                                    <BoxRadio value={paymentMethod} data={dataPaymentMethod} onChange={(e: any) => setPaymentMethod(e)} />
                                </div>
                                <div className='divider_vertical_dashed my-2'></div>
                                <div className='mt-2 d-flex align-items-center justify-content-between'>
                                    <div className='font15 font_family_bold_italic'>Tổng tiền: </div>
                                    <div className='font14 font_family_bold_italic'>{currencyFormat(totalPrice)}</div>
                                </div>
                                <div className='mt-2 d-flex align-items-center justify-content-between'>
                                    <div className='font15 font_family_bold_italic'>Tiền cọc (40%):</div>
                                    <div className='font14 font_family_bold_italic'>{currencyFormat(totalPrice * 0.4)}</div>
                                </div>
                                <button
                                    disabled={Boolean(chosenProducts.length === 0 || chosenTables.length === 0)}
                                    type='submit'
                                    className='btn bg_primary font16 font_family_bold_italic color_white w100_per mt-4'>Đặt bàn</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ModalListObject handleClose={handleCloseModalCustomer} chosenData={chosenCustomer} data={dataModal} header={headerCustomer} onChoose={handleChooseCustomer} />\
            <ModalChooseProductForBook chosenProducts={chosenProducts} visible={visibleModalProduct} handleClose={handleCloseModalProduct} handleChoose={handleChooseProduct} />
            <ModalChooseTableForBook chosenTables={chosenTables} visible={visibleModalTable} handleClose={handleCloseModalTable} handleChoose={handleChooseTable} />
        </>
    )
}

export default CreateBook