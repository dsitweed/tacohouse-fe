import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Typography, Form, Input, Switch, App } from "antd";
// images
import signinBg from "@/assets/images/login_1.jpg";

import googleLogo from "@/assets/images/Google_logo.png";
import facebookLogo from "@/assets/images/Facebook_logo.png";
import githubLogo from "@/assets/images/Github_logo.png";
import { useApiClient } from "@/shared/hooks/api";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/slices/authSlice";

const { Title } = Typography;

export default function SignIn() {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const apiLogIn = useApiClient("auth/sign-in");
  const dispatch = useAppDispatch();

  const handleSignIn = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    try {
      const response = await apiLogIn.create({
        email,
        password,
      });
      if (response) {
        // save state to store type in slice
        dispatch(signIn(response.data));
        notification.success({
          message: "Login successful. Enjoy your stay!",
          duration: 2,
        });
        // redirect
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  function onChange(checked: boolean) {
    console.log(`switch to ${checked}`);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="px-6 bg-white">
      <Row gutter={[24, 0]} justify="space-around">
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
        >
          <Title className="mt-8" style={{ fontSize: 48 }}>
            Sign In
          </Title>
          <Title level={5}>Enter your email and password to sign in</Title>
          <Form
            initialValues={{ remember: true }}
            onFinish={handleSignIn}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email!",
                },
              ]}
              initialValue={'a@gmail.com'}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password should be at least 6 characters",
                },
              ]}
              initialValue={'123456'}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item valuePropName="checked">
              <Switch
                className="bg-slate-400 mr-2"
                defaultChecked
                onChange={onChange}
              />
              Remember me
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                className="bg-primary text-base py-5 flex justify-center items-center "
              >
                SIGN IN
              </Button>
            </Form.Item>
            <p className="font-semibold text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/auth/sign-up"
                className="font-bold text-base text-blue-600"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-center mt-8 text-gray-500">or continue with</p>

            {/* login by third party */}
            <div className="flex justify-center gap-6 mt-4">
              <img
                onClick={() => console.log("login by facebook")}
                src={facebookLogo}
                alt="facebook logo"
                className="w-8 h-8 cursor-pointer"
              />
              <img
                onClick={() => console.log("login by google")}
                src={googleLogo}
                alt=" google logo"
                className="w-8 h-8 cursor-pointer"
              />
              <img
                onClick={() => console.log("login by github")}
                src={githubLogo}
                alt="github logo"
                className="w-8 h-8 cursor-pointer"
              />
            </div>

            {/* forgot password */}
            <Link to={"/"} className="flex justify-center mt-6">
              Forgot Password ?
            </Link>
          </Form>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
          <img
            src={signinBg}
            alt="sign image"
            className="m-auto rounded-lg"
            style={{
              maxHeight: "79vh",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
