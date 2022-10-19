import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AES, enc } from "crypto-js";
import Logo from "../components/navbar/Logo";
import { grayColor } from "../theme";
import { login } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.form`
  background: ${grayColor};
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const crypto_key = process.env.REACT_APP_CRYPTO_KEY || "1";
function Login() {
  // const isLogin = useSelector(isLoginSelector);

  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(
    localStorage.getItem("rememberMe") ? true : false
  );
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // useEffect(() => {
  //   if (isLogin) {
  //     navigate("/");
  //   } else {
  //     const bytes = AES.decrypt(
  //       localStorage.getItem("password") || "",
  //       crypto_key
  //     );
  //     const originalText = bytes.toString(enc.Utf8);
  //     setValue("username", localStorage.getItem("username") || "");
  //     setValue("password", originalText);
  //   }
  // }, [isLogin]);
  const onSubmit = (data: any) => {
    console.log('data', data);
    handleLogin(data);
  };
  const handleLogin = async (body: any) => {
    navigate('/');
    // const result = await login({}, body, {});
    // if (result) {
    //   setError("");
    //   if (rememberMe) {
    //     localStorage.setItem("rememberMe", "true");
    //     localStorage.setItem("username", body.username);
    //     localStorage.setItem(
    //       "password",
    //       AES.encrypt(body.password, crypto_key).toString()
    //     );
    //   } else {
    //     localStorage.removeItem("rememberMe");
    //     localStorage.removeItem("username");
    //     localStorage.removeItem("password");
    //   }
    //   sessionStorage.setItem("access-token", result.accessToken);
    //   sessionStorage.setItem("isLogin", "true");
    //   sessionStorage.setItem("user", JSON.stringify(result));
    //   window.location.reload();
    // } else {
    //   setError("Username or password is Incorrect");
    // }
  };
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <div className="box_shadow_card box_login">
        <Logo url="https://cdn-icons-png.flaticon.com/512/5141/5141534.png" />
        <div className="mt-3 font16 font_family_italic color_888">
          Login to Admin
        </div>
        <div className="w100_per mt-4">
          <div className="font18 font_family_bold_italic">Username</div>
          <input
            {...register("username")}
            type="text"
            placeholder="Type Username"
            className="mt-2 w100_per h50_px"
          />
          <div className="mt-2 font14 font_family_italic color_red">
            {errors.username?.message}
          </div>
          <div className="mt-4 font18 font_family_bold_italic">Password</div>
          <div className="position-relative d-flex align-items-center">
            <input
              {...register("password")}
              type={isShowPassword ? "text" : "password"}
              placeholder="Type password"
              className="mt-2 w100_per h50_px pr_20px"
            />
            <button
              onClick={() => setIsShowPassword(!isShowPassword)}
              type="button"
              className="btn position-absolute p-0 mr_10px mt-1 right0"
            >
              <Icon
                icon={
                  !isShowPassword
                    ? "akar-icons:eye-open"
                    : "akar-icons:eye-slashed"
                }
                className="icon20x20 color_888"
              />
            </button>
          </div>
          <div className="mt-2 font14 font_family_italic color_red">
            {errors.password?.message}
          </div>
        </div>
        <div className="mt-4 w100_per d-flex align-items-center">
          <input
            onChange={() => setRememberMe(!rememberMe)}
            checked={rememberMe}
            type="checkbox"
          />
          <span className="ml_10px font16 font_family_italic">Remember me</span>
        </div>
        <div className="mt-2 font14 font_family_italic color_red">{error}</div>
        <button
          type="submit"
          className="btn w100_per mt-4 bg_primary color_white font18 font_family_italic"
        >
          Login
        </button>
      </div>
    </Container>
  );
}

export default Login;
