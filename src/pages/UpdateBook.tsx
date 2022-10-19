import { Icon } from '@iconify/react';
import moment from 'moment';
import React, { useState } from 'react'
import { Steps } from 'rsuite';
import styled from 'styled-components';
import BasePagination from '../base/pagination';
import BaseTable from '../base/table';
import Avatar from '../components/Avatar';
import Tag from '../components/Tag';
import { ColumnType, OrderType } from '../interfaces';
import { primaryColor } from '../theme';
import { genPaymentMethod, genStatusOrder, ICON } from '../utils';
import { currencyFormat } from '../utils/format';

const Wrapper = styled.div`
    .rs-steps-item-status-process .rs-steps-item-icon-wrapper {
        background-color: ${primaryColor} !important;
        border-color: ${primaryColor} !important;
    }
`

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

function UpdateBook() {
    const [book, setBook] = useState<OrderType | any>(undefined);

    const textAlign = (value: Type) => value;

    const header = [
        {
            name: "Thực đơn",
            width: "70%",
            textAlign: textAlign("left"),
        },
        {
            name: "Tổng tiền",
            width: "30%",
            textAlign: textAlign("right"),
        },
    ];

    const headerTable = [
        {
            name: "Bàn",
            width: "80%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số người",
            width: "20%",
            textAlign: textAlign("right"),
        },
    ];

    const columns: ColumnType[] = [
        {
            align: 'left',
            width: 10,
            dataKey: 'id',
            key: 'id',
            name: 'ID',
            render: (data: any, row: any) => <div style={{ width: '100%' }}>{data}</div>
        },
        {
            align: 'left',
            width: 15,
            dataKey: 'name',
            key: 'id',
            name: 'Tên khách hàng',
            render: (data: any, row: any) => <div>{data}</div>
        },
        {
            width: 15,
            dataKey: 'phone',
            key: 'id',
            name: 'Số điện thoại',
            render: (data: any, row: any) => <div>{data}</div>
        },
        {
            width: 10,
            dataKey: 'total',
            key: 'id',
            name: 'Tổng tiền',
            render: (data: any, row: any) => <div>{currencyFormat(data)}</div>
        },
        {
            width: 15,
            dataKey: 'createdAt',
            key: 'id',
            name: 'Thời gian nhận bàn',
            render: (data: any, row: any) => <div>{moment(data).format(`HH:mm DD/MM/YYYY`)}</div>
        },
        {
            width: 15,
            dataKey: 'orderedAt',
            key: 'id',
            name: 'Thời gian đặt bàn',
            render: (data: any, row: any) => <div>{moment(data).format(`HH:mm DD/MM/YYYY`)}</div>
        },
        {
            width: 15,
            dataKey: 'status',
            key: 'id',
            name: 'Trạng thái',
            render: (data: any, row: any) => <Tag color={genStatusOrder(data).color} name={genStatusOrder(data).name} />
        },
        {
            width: 5,
            dataKey: 'id',
            key: 'id',
            name: 'Chọn',
            align: 'right',
            render: (_: any, row: any) => <div>
                {
                    book?.id === row.id ? <Icon icon={ICON.SELECTED} className="icon20x20 color_primary" />
                        : <Icon icon={ICON.UNSELECT} className="icon20x20 color_primary" />
                }
            </div>
        },
    ]

    const data = [
        {
            id: '123',
            name: 'Nguyễn Văn A',
            phone: '0123456789',
            total: 100000,
            createdAt: new Date(),
            orderedAt: new Date(),
            status: 0,
        },
        {
            id: '456',
            name: 'Nguyễn Văn A',
            phone: '0123456789',
            total: 100000,
            createdAt: new Date(),
            orderedAt: new Date(),
            status: 0,
        }
    ]

    const handleChooseBook = (book: any) => {
        setBook(book);
    }

    return (
        <Wrapper>
            <div className='p-4 bg_white box_shadow_card w100-per'>
                <div className='font16 font_family_bold_italic'>Danh sách đơn đặt bàn</div>
                <BaseTable onRowClick={handleChooseBook} data={data} columns={columns} />
                <BasePagination />
            </div>
            <div className="p-4 bg_white box_shadow_card mt-4">
                {
                    book ?
                        <>
                            <div className="d-flex justify-content-end">
                                <button
                                    // onClick={handleDownloadInvoice}
                                    className="btn btn-primary h40_px d-flex align-items-center font14 font_family_bold_italic"
                                >
                                    <Icon
                                        icon="bi:cloud-arrow-down-fill"
                                        className="icon20x20 mr_10px"
                                    />
                                    In hoá đơn
                                </button>
                            </div>
                            <div className="mt-4">
                                <div className="m-0 p-0 d-flex align-items-center justify-content-between">
                                    <div className="font18 font_family_bold">
                                        ID - {1}
                                    </div>
                                    <div>
                                        <button
                                            // onClick={handleChange}
                                            className="btn h40_px bg_primary color_white font14 font_family_bold_italic"
                                        >
                                            Thay đổi trạng thái
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Steps
                                    current={0}
                                    className="d-flex w100_per justify-content-between flex-row step_order_status m-4"
                                >
                                    {[0, 1, 2, 3].map((item: any, index: number) => (
                                        <Steps.Item
                                            style={{ minWidth: "200px" }}
                                            className="font_family_bold"
                                            description={genStatusOrder(item).name}
                                        />
                                    ))}
                                </Steps>
                            </div>
                            <div className="mt-4">
                                <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
                                    <thead className="bg_ddd">
                                        <tr>
                                            {header.map((item, index) => (
                                                <TableCellHead
                                                    key={index}
                                                    className="font_family_regular font16"
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
                                    <tbody>
                                        {[1, 2].map((item: any, index: number) => (
                                            <tr className="border_top_gray_1px" key={index}>
                                                <TableCell
                                                    style={{
                                                        width: header.at(0)?.width,
                                                        textAlign: header.at(0)?.textAlign,
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <Avatar
                                                            shape="rectangle"
                                                            size={50}
                                                            url={"https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"}
                                                        />
                                                        <div className='ml_10px'>
                                                            <div className="font14 font_family_bold">
                                                                Salad x 1
                                                            </div>
                                                            <div className='mt-2 font12'>
                                                                {currencyFormat(100000)}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        width: header.at(1)?.width,
                                                        textAlign: header.at(1)?.textAlign,
                                                    }}
                                                >
                                                    {currencyFormat(100000)}
                                                </TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='mt-4 d-flex justify-content-end'>
                                    <button
                                        // onClick={handleChange}
                                        className="btn h40_px bg_primary color_white font14 font_family_bold_italic"
                                    >
                                        Thêm món ăn
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
                                    <thead className="bg_ddd">
                                        <tr>
                                            {headerTable.map((item, index) => (
                                                <TableCellHead
                                                    key={index}
                                                    className="font_family_regular font16"
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
                                    <tbody>
                                        {[1, 2].map((item: any, index: number) => (
                                            <tr className="border_top_gray_1px" key={index}>
                                                <TableCell
                                                    style={{
                                                        width: headerTable.at(0)?.width,
                                                        textAlign: headerTable.at(0)?.textAlign,
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <Avatar
                                                            shape="rectangle"
                                                            size={50}
                                                            url={"https://blog-assets.lightspeedhq.com/img/2020/01/9f2593e3-maris-piper-bar-floor-plan.jpg"}
                                                        />
                                                        <div className='ml_10px'>
                                                            <div className="font14 font_family_bold">
                                                                Bàn A
                                                            </div>
                                                            <div className='mt-2 font12'>
                                                                Khu vực: Sảnh A
                                                            </div>
                                                        </div>

                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        width: headerTable.at(1)?.width,
                                                        textAlign: headerTable.at(1)?.textAlign,
                                                    }}
                                                >
                                                    {10}
                                                </TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <div className="row m-0 p-0">
                                    <div className="col-12 col-lg-6 border_top_gray_1px font16 font_family_regular color_888">
                                        <div className="d-flex align-items-center justify-content-between mt-4">
                                            <div>Tiền thực đơn</div>
                                            <div>{currencyFormat(100000)}</div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                            <div>Tiền đã cọc</div>
                                            <div>{currencyFormat(60000)}</div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                            <div className="font_family_bold">Tổng tiền còn lại</div>
                                            <div className="font_family_bold">
                                                {currencyFormat(140000)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 row p-0 m-0">
                                <div className="col-12 col-lg-6 m-0">
                                    <div className="font16 font_family_bold">Thời gian</div>
                                    <div className="divider_vertical_solid d-block my-3"></div>
                                    <div className="font14 font_family_regular">
                                        Thời gian đặt bàn: {moment(new Date()).format(`DD-MM-YYYY HH:mm`)}
                                    </div>
                                    <div className="font14 font_family_regular mt-2">
                                        Thời gian nhận bàn: {moment(new Date()).format(`DD-MM-YYYY HH:mm`)}
                                    </div>
                                    <div className="font14 font_family_regular mt-2">
                                        Thời gian sử dụng bàn: {moment(new Date()).format(`HH:mm`)}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 m-0 pr_10px d-flex flex-column align-items-end">
                                    <div className="font16 font_family_bold">Khách hàng</div>
                                    <div className="divider_vertical_solid d-block my-3"></div>
                                    <div className="font14 font_family_regular">
                                        Nguyễn Văn A
                                    </div>
                                    <div className="font14 font_family_regular mt-2">
                                        0123456789
                                    </div>
                                    <div className="font14 font_family_regular mt-2">
                                        Phương thức thành toán: {genPaymentMethod(0)}
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <Icon className='icon100x100 color_888' icon={ICON.BOOK} />
                            <div className='mt-2 font16 font_family_bold_italic color_888'>
                                Bạn chưa chọn đơn đặt bàn
                            </div>
                        </div>
                }


            </div>
            {/* <div className="d-none">
            <Invoice
              deliveryFee={order?.shipping.fee}
              discount={getDiscount()}
              subTotal={getSubTotal()}
              tax={getTax()}
              order={order}
              printRef={printRef}
            />
          </div> */}
        </Wrapper>
    );
}

export default UpdateBook