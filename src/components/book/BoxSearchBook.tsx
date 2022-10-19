import { Icon } from '@iconify/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    handleFilter: (text: string) => void;
}
function BoxSearchBook({ handleFilter }: Props) {
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const handleShowFilter = () => {
        setIsFilter(!isFilter)
    }

    return (
        <div className="box_shadow_card bg_white p-4 border_radius_3">
            <div className="row p-0 m-0">
                <div className='col-12 col-lg-3 font_family_bold font20'>Đơn đặt bàn</div>
                <div className='mt-md-2 mt-lg-0 col-12 col-lg-9 d-flex align-items-center justify-content-end'>
                    <input onChange={(e) => handleFilter(e.target.value)} placeholder='Nhập thông tin tìm kiếm' className='h40_px mr_10px w50_per' type="text" />
                    <button className='btn bg_primary color_white font12 font_family_bold h40_px'>Tìm kiếm</button>
                    <button
                        onClick={handleShowFilter}
                        className="d-flex align-items-center btn color_primary font_family_bold_italic font16"
                    >
                        <span>Bộ lọc</span>
                        <Icon
                            className={classNames(
                                "icon20x20 ml_5px",
                                { show: isFilter },
                                "icon_down_product"
                            )}
                            icon="akar-icons:arrow-down"
                        />
                    </button>
                </div>
            </div>
            <div className={classNames({ show: isFilter }, "box_filter_product")}>
                <div className="divider_vertical_dashed"></div>
                <div className="mt-4">
                    <div className="row p-0 m-0">
                        <div className="col-12 col-lg-6 px-2">
                            <div className="font_14 font_family_bold_italic mb-2">
                                Lọc theo ngày đặt bàn
                            </div>

                        </div>
                        <div className="col-12 col-lg-6 px-2">
                            <div className="font_14 font_family_bold_italic mb-2">
                                Lọc theo trạng thái đơn đặt bàn
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BoxSearchBook);