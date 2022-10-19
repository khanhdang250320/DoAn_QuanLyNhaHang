import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import { Icon } from "@iconify/react";
import moment from "moment";
import BaseFileChosen from "../base/BaseFileChosen";
import location from "../utils/location";
import { Collapse } from "react-bootstrap";
import { saveImage } from "../utils/firebase";
import userSlice, { findOneEmployee } from "../redux/slices/employeeSlice";
import styled from "styled-components";
import { orangeColor, primaryColor, redColor } from "../theme";
import Avatar from "../components/Avatar";
import { genAddress, genGender, ICON } from "../utils";
import BoxAnalyticUserDetail from "../components/analytic/BoxAnalyticUserDetail";
import { currencyFormat, thousandFormat } from "../utils/format";
import { CustomerType, OrderType } from "../interfaces";
import BaseLoading2 from "../base/BaseLoading2";

const BoxLeftTop = styled.div`
  background-color: ${primaryColor};
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  height: 150px;
  padding-top: 30px;
`
const BoxLeftBottom = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 0px 0px 10px 10px;
`

const WrapperAvatar = styled.div`
  border-radius: 152px;
  width: 152px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  position: absolute;
  top: -90px;
  right: calc(50% - 75px);
`

const BoxRight = styled.div``

const BoxChangeAvatar = ({ isShow }: { isShow: boolean }): JSX.Element => {
  const Wrapper = styled.div<{ isShow: boolean }>`
    background-color: #000;
    opacity: ${p => p.isShow ? `0.5` : `0`};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    border-radius: 150px;

    position: absolute;

    transition: all 1s;
  `
  return (
    <Wrapper isShow={isShow}>
      <Icon icon={ICON.CAMERA} className="icon25x25 color_white" />
      <div className="color_white font14 font_family_bold_italic">Đổi ảnh đại diện</div>
    </Wrapper>
  )
}

function EmployeeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [employee, setEmployee] = useState<CustomerType | any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowChangeAvatar, setIsShowChangeAvatar] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initData = async (id: string) => {
      setIsLoading(true);

      try {
        const result = await dispatch(findOneEmployee(id)).unwrap();

        const { employee } = result?.data;

        setEmployee(employee);
      } catch (error: any) {
        navigate("/error");
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) initData(id);
  }, [dispatch, id]);

  return (
    <>
      {
        isLoading ? <BaseLoading2 />
          :
          <>
            <div className="font18 font_family_bold_italic">Thông tin nhân viên</div>
            <div className="row w100_per m-0 p-0 mt-4">
              <div className="col-12 col-lg-4">
                <BoxLeftTop>
                  <div className="font22 font_family_bold_italic color_white">{employee?.name}</div>
                </BoxLeftTop>
                <BoxLeftBottom className="box_shadow_card">
                  <div className="h150_px position-relative border_bottom_gray_1px d-flex align-items-center justify-content-end flex-column py-3">
                    <WrapperAvatar className="box_shadow_card">
                      <Avatar shape="circle" size={150} url={employee?.avatar} />
                    </WrapperAvatar>
                    <div className="font16 font_family_bold">
                      Số điện thoại
                    </div>
                    <div className="font14 font_family_italic">
                      {employee?.phone}
                    </div>
                  </div>
                  <div className="border_bottom_gray_1px py-3 d-flex align-items-center justify-content-end flex-column">
                    <div className="font16 font_family_bold">
                      Giới tính
                    </div>
                    <div className="font14 font_family_italic">
                      {genGender(employee?.gender)}
                    </div>
                    <div className="font16 font_family_bold mt-4">
                      Email
                    </div>
                    <div className="font14 font_family_italic">
                      {employee?.email}
                    </div>
                    <div className="font16 font_family_bold mt-4">
                      Ngày sinh
                    </div>
                    <div className="font14 font_family_italic">
                      {moment(employee?.birthday).format(`DD/MM/YYYY`)}
                    </div>
                  </div>
                  <div className="py-3 d-flex align-items-center justify-content-end flex-column">
                    <div className="font16 font_family_bold">
                      Địa chỉ
                    </div>
                    <div className="font14 font_family_italic text-center">
                      {genAddress(employee?.address)}
                    </div>
                  </div>
                </BoxLeftBottom>
              </div>
              <div className="col-12 col-lg-8 px-4">
                <div className="bg_white border_radius_10 p-2 box_shadow_card">
                  <div className="font16 font_family_bold_italic">Thông tin đặt bàn</div>
                  <div className="divider_vertical_solid my-2"></div>
                  <div className="row p-0 m-0">
                    <div className="col-12 col-lg-4 p-2">
                      <BoxAnalyticUserDetail value={currencyFormat(100000)} title="TỔNG TIỀN" color={primaryColor} />
                    </div>
                    <div className="col-12 col-lg-4 p-2">
                      <BoxAnalyticUserDetail value={thousandFormat(100)} title="ĐƠN ĐẶT BÀN" color={orangeColor} />
                    </div>
                    <div className="col-12 col-lg-4 p-2">
                      <BoxAnalyticUserDetail value={thousandFormat(100)} title="HOÁ ĐƠN" color={redColor} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

      }
    </>
  )
}

export default EmployeeDetail;
