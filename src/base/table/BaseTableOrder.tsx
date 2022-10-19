import { Icon } from '@iconify/react';
import moment from 'moment';
import React from 'react'
import styled from 'styled-components';
import { OrderType } from '../../interfaces';
import { currencyFormat } from '../../utils/format';

type Props = {
    data: Array<any>;
    handleDetail: (order: OrderType) => void;
    page: number;
    countPerRow: number
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
function BaseTableOrder({ data, handleDetail, page, countPerRow }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "ID",
            width: "5%",
            textAlign: textAlign("center"),
        },
        {
            name: "Khách hàng",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số điện thoại",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Tổng tiền",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Thời gian đặt bàn",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Thời gian thanh toán",
            width: "15%",
            textAlign: textAlign("left"),
        },
        {
            name: "Hành động",
            width: "20%",
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
                            {countPerRow * (page - 1) + (index + 1)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(1)?.width,
                                textAlign: header.at(1)?.textAlign,
                            }}
                        >
                            {item.customer.name}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(2)?.width,
                                textAlign: header.at(2)?.textAlign,
                            }}
                        >
                            {item.customer.phone}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            {currencyFormat(item.total)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(4)?.width,
                                textAlign: header.at(4)?.textAlign,
                            }}
                        >
                            {moment(new Date()).format(`DD/MM/YYYY HH:mm`)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(5)?.width,
                                textAlign: header.at(5)?.textAlign,
                            }}
                        >{moment(new Date()).format(`DD/MM/YYYY HH:mm`)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(6)?.width,
                                textAlign: header.at(6)?.textAlign,
                            }}
                        >
                            <button
                                onClick={() => handleDetail(item)}
                                className="btn p-0 mr_5px"
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

export default React.memo(BaseTableOrder)