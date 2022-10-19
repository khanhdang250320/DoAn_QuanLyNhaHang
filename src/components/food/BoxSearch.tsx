import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    handleFilter: (text: string) => void
}
function BoxSearch({ handleFilter }: Props) {
    return (
        <div className='d-flex align-items-center row box_shadow_card bg_white p-4 border_radius_3'>
            <div className='col-12 col-lg-3 font_family_bold font20'>Món ăn</div>
            <div className='mt-md-2 mt-lg-0 col-12 col-lg-9 d-flex align-items-center justify-content-end'>
                <input onChange={(e) => handleFilter(e.target.value)} placeholder='Nhập thông tin tìm kiếm' className='h40_px mr_10px w50_per' type="text" />
                <Link to="/foods/create">
                    <button className='btn bg_primary color_white font12 font_family_bold h40_px'>+ Thêm món ăn</button>
                </Link>
            </div>
        </div>
    )
}

export default React.memo(BoxSearch);