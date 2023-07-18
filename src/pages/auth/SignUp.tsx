import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Typography, Form, Input, Select, App } from "antd";

// images
import bgImg from "@/assets/images/sign_up_bg.jpg";
import { useApiClient } from "@/shared/hooks/api";
import axios from "axios";

const { Title } = Typography;

export default function SignUp() {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const apiSignUp = useApiClient("/auth/sign-up");

  const handleSignUp = async (values: {
    email: string;
    password: string;
    role: string;
  }) => {
    const { email, password, role } = values;

    try {
      const response = await apiSignUp.create({
        email,
        password,
        role,
      });
      console.log({ response });
      notification.success({ message: "Sign up successful!" });
    } catch (error) {
      console.error(error);
    }
  };

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
            Sign Up
          </Title>
          <Title level={5}>Enter your email and password to sign up</Title>
          <Form
            initialValues={{ remember: true }}
            onFinish={handleSignUp}
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
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirm_password"
              hasFeedback
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input your role!",
                },
              ]}
              initialValue={'MANAGER'}
            >
              <Select
                placeholder="Select your role"
                options={[
                  {
                    label: "Tenant",
                    value: "TENANT",
                  },
                  {
                    label: "Manager",
                    value: "MANAGER",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                className="bg-primary text-base py-5 flex justify-center items-center "
              >
                SIGN UP
              </Button>
            </Form.Item>
            <p className="font-semibold text-slate-600">
              If you already have an account register{" "}
              <Link
                to="/auth/sign-in"
                className="font-bold text-base text-blue-600"
              >
                Sign In
              </Link>
            </p>
          </Form>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
          <img
            src={bgImg}
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
