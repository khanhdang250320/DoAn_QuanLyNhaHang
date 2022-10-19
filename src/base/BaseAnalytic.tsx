import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";
import { fShortenNumber } from "../utils/format";

type Props = {
  data: number;
  title: string;
  extraTitle?: string;
  icon: string;
  backgroundIcon: string;
  colorIcon: string;
};
const Container = styled.div`
  min-height: 150px;
  height: 100%;
  border-radius: 5px
`;
function BaseAnalytic({
  data,
  title,
  extraTitle,
  icon,
  backgroundIcon,
  colorIcon,
}: Props) {
  return (
    <Container className="w100_per bg_white p-4 d-flex justify-content-between box_shadow_card">
      <div className="d-flex justify-content-between flex-column">
        <div>
          <div className="font16 font_family_bold_italic">{title}</div>
          <div className="font14 font_family_italic color_888">
            {extraTitle}
          </div>
        </div>
        <div className="font20 font_family_bold_italic">{fShortenNumber(data)}</div>
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          background: backgroundIcon,
          width: "50px",
          height: "50px",
          borderRadius: "40px",
        }}
      >
        <Icon className="icon30x30" style={{ color: colorIcon }} icon={icon} />
      </div>
    </Container>
  );
}

export default BaseAnalytic;
