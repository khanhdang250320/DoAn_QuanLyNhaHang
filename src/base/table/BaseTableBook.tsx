import { Icon } from '@iconify/react';
import moment from 'moment';
import React from 'react'
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import Tag from '../../components/Tag';
import { BookType, OrderType } from '../../interfaces';
import { genStatusOrder, ORDER_STATUS } from '../../utils';
import { currencyFormat } from '../../utils/format';

type Props = {
    data: Array<BookType>;
    handleDetail: (id: string) => void;
}
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
function BaseTableBook({ data, handleDetail }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "ID",
            width: "5%",
            textAlign: textAlign("center"),
        },
        {
            name: "Khách hàng",
            width: "25%",
            textAlign: textAlign("left"),
        },
        {
            name: "Tổng tiền",
            width: "10%",
            textAlign: textAlign("center"),
        },
        {
            name: "Thời gian đặt bàn",
            width: "15%",
            textAlign: textAlign("center"),
        },
        {
            name: "Thời gian nhận bàn",
            width: "15%",
            textAlign: textAlign("center"),
        },
        {
            name: "Số người",
            width: "10%",
            textAlign: textAlign("center"),
        },
        {
            name: "Trạng thái",
            width: "10%",
            textAlign: textAlign("center"),
        },
        {
            name: "Hành động",
            width: "10%",
            textAlign: textAlign("right"),
        },
    ];
    return (
        <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
            <thead className="bg_ddd">
                <tr>
                    {header.map((item, index) => (
                        <TableCellHead
                            key={index}
                            className="font_family_regular font14"
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
                {data.map((item, index) => (
                    <tr className="border_top_gray_1px" key={index}>
                        <TableCell
                            style={{
                                width: header.at(0)?.width,
                                textAlign: header.at(0)?.textAlign,
                            }}
                        >
                            {index + 1}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(1)?.width,
                                textAlign: header.at(1)?.textAlign,
                            }}
                        >
                            <div
                                className='d-flex align-items-center'
                            >
                                <Avatar size={42} url={item?.customer?.avatar} shape="circle" />
                                <div className='ml_10px'>
                                    <div className='font14 font_family_bold_italic'>{item?.customer?.name}</div>
                                    <div className='font12 font_family_bold_italic mt-2 color_888'>SĐT: {item?.customer?.phone}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(2)?.width,
                                textAlign: header.at(2)?.textAlign,
                            }}
                        >
                            {currencyFormat(item?.totalPrice)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            {moment(new Date()).format(`DD/MM/YYYY HH:mm`)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(4)?.width,
                                textAlign: header.at(4)?.textAlign,
                            }}
                        >{moment(new Date()).format(`DD/MM/YYYY HH:mm`)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(5)?.width,
                                textAlign: header.at(5)?.textAlign,
                            }}
                        >
                            {item?.quantityCustomer}
                        </TableCell>
                        <TableCell
                            className='font_family_bold_italic'
                            style={{
                                width: header.at(6)?.width,
                                textAlign: header.at(6)?.textAlign,
                            }}
                        >
                            <Tag color={genStatusOrder(item.status).color} name={genStatusOrder(item.status).name} />
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(7)?.width,
                                textAlign: header.at(7)?.textAlign,
                            }}
                        >
                            {
                                item.status === ORDER_STATUS.USING && <button
                                    onClick={() => handleDetail(item?.id)}
                                    className="btn p-0 mr_5px"
                                    title='Thanh toán'
                                >
                                    <Icon className="icon20x20 color_primary" icon="dashicons:money-alt" />
                                </button>
                            }
                            <button
                                onClick={() => handleDetail(item?.id)}
                                className="btn p-0 mr_5px"
                                title='Xem thông tin'
                            >
                                <Icon className="icon20x20 color_888" icon="akar-icons:eye" />
                            </button>
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default React.memo(BaseTableBook)