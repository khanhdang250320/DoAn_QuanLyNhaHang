import React from 'react'
import styled from 'styled-components';
import Avatar from '../Avatar';

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
function TableTop10Customers({ data }: Props) {
    const textAlign = (value: Type) => value;

    const temp =
        [
            {
                name: 'Nguyễn Văn A',
                phone: '0123456789',
                total: 10
            },
            {
                name: 'Nguyễn Văn B',
                phone: '0123456789',
                total: 5
            }
        ]

    const header = [
        {
            name: "Khách hàng",
            width: "50%",
            textAlign: textAlign("left"),
        },
        {
            name: "Số điện thoại",
            width: "30%",
            textAlign: textAlign("left"),
        },
        {
            name: "SL Hoá đơn",
            width: "20%",
            textAlign: textAlign("center"),
        },
    ];
    return (
        <div className='w100_per bg_white border_radius_5 box_shadow_card'>
            <div className='text-center py-2 font16 font_family_bold_italic'>
                Top 10 khách hàng
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
                    {temp.map((item, index) => (
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
                                {item.phone}
                            </TableCell>
                            <TableCell
                                className='font12 font_family_regular'
                                style={{
                                    width: header.at(2)?.width,
                                    textAlign: header.at(2)?.textAlign,
                                }}
                            >
                                {item.total}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableTop10Customers