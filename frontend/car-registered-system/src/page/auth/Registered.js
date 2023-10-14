import React, { useEffect } from "react";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import { validationsRegistered } from "../../components/validation/Validation";
import { registerAuth } from "../../service";

function Registered() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const registerInfo=useSelector((state)=>state.user.registerUser)

  useEffect(()=>{

  },[registerInfo])

 console.log(registerInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name:"",
      lastName:"",
      userName: "",
      password: "",
      passwordConfirm:"",
    },
    validationSchema:validationsRegistered,

    onSubmit: async (values, bag) => {
      await dispatch(registerAuth({name:values.name,lastName:values.lastName,userName:values.userName,password:values.password}))
      
      formik.values.name=""
      formik.values.lastName=""
      formik.values.userName=""
      formik.values.password=""
      formik.values.passwordConfirm=""



      
    },
  });

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"15px"
        
      }}
    >
      <div
        style={{
          background: "white",
          height:"600px"
         
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            width={"150px"}
            height={"100px"}
            src="https://t3.ftcdn.net/jpg/04/06/91/62/360_F_406916265_hxmrv7wgw9SZN9871yebxQJAX7HsHdNp.jpg"
          />
          <h3 style={{ fontSize: "15px" }}>
            Kayıt Ol
          </h3>

          {
            registerInfo?<h4 style={{color:registerInfo.userName===null?"red":"green"}}>{registerInfo.message}</h4>:""
          }
          
        </section>

        <section style={{ width: "650px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>İsim</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input
                  placeholder="İsim giriniz..."
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.name}
                  </div>
                )}
              </Space>
              <InputLabel>
                <strong>Soyisim</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input
                  placeholder="Soyisim giriniz..."
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.lastName}
                  </div>
                )}
              </Space>

              <InputLabel>
                <strong>Kullanıcı Adı</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input
                  placeholder="Kullanıcı adı giriniz..."
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                {formik.errors.userName && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.userName}
                  </div>
                )}
              </Space>

              <InputLabel>
                <strong>Şifre</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input.Password
                  placeholder="Şifre giriniz..."
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {formik.errors.password && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.password}
                  </div>
                )}
              </Space>

              <InputLabel>
                <strong>Şifre Tekrar</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input.Password
                  placeholder="Şifre giriniz..."
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {formik.errors.passwordConfirm && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.passwordConfirm}
                  </div>
                )}
              </Space>
            </div>

            <div style={{  width: "500px" }}>
              <Button
                onClick={formik.handleSubmit}
                variant="contained"
                style={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                  width: "100%",
                }}
              >
                Kayıt Ol
              </Button>
            </div>
            <div style={{marginTop:"50px"}}>
              Hesabınız var mı ? <Link style={{textDecoration:"none"}} to={"/login"}>Giriş Yap</Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Registered;
