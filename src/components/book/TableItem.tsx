import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { primaryColor } from '../../theme'
import { ICON } from '../../utils'
import Avatar from '../Avatar'

const Wrapper = styled.div`
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    min-height: 150px;
    cursor: pointer;

    position: relative;
`

const IconIsChosen = styled(Icon)`
    position: absolute;
    top: 5px;
    right: 5px;
    color: ${primaryColor}
`

type TableItemProps = {
    table: any;
    handleChooseTable: (table: any, quantity: number) => void;
    chosenTables: any[];
}

function TableItem({ table, handleChooseTable, chosenTables }: TableItemProps) {
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const result = chosenTables.find((item: any) => item?.table?.id === table.id);

        setValue(result?.quantity || 0);
    }, []);

    const chosen = useMemo(() => {
        const result = chosenTables.find((item: any) => item?.table?.id === table.id);

        return {
            isChosen: Boolean(result),
            quantity: result?.quantity,
        }
    }, [chosenTables])

    const onUnChoose = () => {
        setValue(0);
        handleChooseTable(table, 0);
    }

    const onChoose = () => {
        const newValue = Number(value);
        handleChooseTable(table, newValue)
    }

    return (
        <div className='col-6 col-lg-3 m-0 px-3 py-1'>
            <Wrapper>
                <Icon icon={ICON.TABLE} className="icon70x70" />
                <div className='mt-2 font14 font_family_bold'>{table?.name}</div>
                <div className='mt-2 font14 font_family_bold_italic'>Số người tối đa: {table?.quantity}</div>
                {
                    chosen.isChosen && <IconIsChosen className='icon25x25' icon={ICON.SELECTED} />
                }
            </Wrapper>
            <div className={`box_input_quantity_chosen_table`}>
                <button onClick={() => onUnChoose()} className='btn bg_white p-0 '>
                    <Icon icon={ICON.DISMISS} className="icon30x30 color_red" />
                </button>
                <div className='ml_5px'>
                    <input value={value} onChange={(e: any) => {
                        console.log(e?.target?.value.replace(/^0+/, ''));
                        setValue(e?.target?.value.replace(/^0+/, ''));
                    }} type="number" className='h40_px' placeholder='Nhập số người' />
                </div>
                <button onClick={() => onChoose()} className='ml_5px btn bg_white p-0 '>
                    <Icon icon={ICON.SELECTED} className="icon30x30 color_primary" />
                </button>
            </div>
        </div>
    )
}

export default TableItem