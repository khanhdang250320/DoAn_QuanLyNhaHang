import moment from 'moment';
import React from 'react'
import styled from 'styled-components';
import { OrderType } from '../../interfaces';
import { genStatusOrder } from '../../utils';
import { currencyFormat } from '../../utils/format';
import Tag from '../Tag';

type Props = {
    data: any[]
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
function TableRecentOrder({ data }: Props) {
    const textAlign = (value: Type) => value;

    const temp = [
        {
            name: "Nguyễn Văn A", total: 100000, date: moment(new Date()).format(`DD/MM/YYYY`), status: 0
        },
        {
            name: "Nguyễn Văn B", total: 200000, date: moment(new Date()).format(`DD/MM/YYYY`), status: 1
        },
    ];

    const header = [
        {
            name: "Khách hàng",
            width: "25%",
            textAlign: textAlign("left"),
        },
        {
            name: "Tổng tiền",
            width: "25%",
            textAlign: textAlign("center"),
        },
        {
            name: "Ngày tạo",
            width: "25%",
            textAlign: textAlign("center"),
        },
        {
            name: "Trạng thái",
            width: "25%",
            textAlign: textAlign("center"),
        },
    ];
    return (
        <div className='w100_per bg_white border_radius_5 box_shadow_card'>
            <div className='text-center py-2 font16 font_family_bold_italic'>
                Hoá đơn mới
            </div>
            <table className="w100_per bg_white">
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
                    {temp.map((item: any, index) => (
                        <tr className="border_top_gray_1px" key={index}>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(0)?.width,
                                    textAlign: header.at(0)?.textAlign,
                                }}
                            >
                                {item.name}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(1)?.width,
                                    textAlign: header.at(1)?.textAlign,
                                }}
                            >
                                {currencyFormat(item?.total)}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(2)?.width,
                                    textAlign: header.at(2)?.textAlign,
                                }}
                            >
                                {item.date}
                            </TableCell>
                            <TableCell
                                className='font_family_bold font12'
                                style={{
                                    width: header.at(3)?.width,
                                    textAlign: header.at(3)?.textAlign
                                }}
                            >
                                <Tag color={genStatusOrder(item?.status).color} name={genStatusOrder(item?.status).name} />
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableRecentOrder