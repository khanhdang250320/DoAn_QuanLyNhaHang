import { Icon } from '@iconify/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    handleFilter: (text: string) => void;
}
function BoxSearchOrder({ handleFilter }: Props) {
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const handleShowFilter = () => {
        setIsFilter(!isFilter)
    }
    return (
        <div className="box_shadow_card bg_white p-4 border_radius_3">
            <div className="row p-0 m-0">
                <div className="col-12 col-lg-3">
                    <div className="font_family_bold font20">Hoá đơn</div>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row m-0 p-0">
                        <div className="col-6 col-lg-8">
                            <input
                                onChange={(e) => {
                                    handleFilter(e.target.value);
                                    // setText(e.target.value);
                                }}
                                placeholder="Nhập số điện thoại"
                                className="h40_px mr_10px w100_per"
                                type="number"
                            />
                        </div>
                        <div className="col-6 col-lg-4 d-flex justify-content-end">
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
                                Lọc theo trạng thái hoá đơn
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BoxSearchOrder);