import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Select,
} from "antd";

// images
import signinbg from "@/assets/images/sign_up_bg.jpg";

function onChange(checked: boolean) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;

export default function SignUp() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="px-6 bg-white">
      <Row gutter={[24, 0]} justify="space-around">
        <Col
          sm={{ span: 24 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 12 }}
          style={{ paddingLeft: 40 }}
        >
          <Title className="mt-4" style={{ fontSize: 48 }}>
            Sign Up
          </Title>
          <p className="text-sm mb-4" style={{ marginTop: '-4px'}}>
            If you already have an account register
            <br />
            You can{" "}
            <Link
              to={"/auth/sign-in"}
              className="font-bold text-blue-600 text-base"
            >
              Sign in here!
            </Link>
          </p>
          <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              style={{ marginBottom: "8px" }}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirm_password"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: true,
                  message: "Please select your role!",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: "tenant",
                    label: "Tenant",
                  },
                  {
                    value: "manager",
                    label: "Manger",
                  },
                ]}
                defaultValue={"tenant"}
              />
            </Form.Item>

            <Form.Item label="Name" style={{ marginBottom: 0 }}>
              <Form.Item
                name="first_name"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <Input placeholder="First name" />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "calc(50%)",
                  marginLeft: "8px",
                }}
              >
                <Input placeholder="Last name" />
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Phone number"
                name="phone_number"
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Phone number" />
              </Form.Item>
              <Form.Item
                label="address"
                name="address"
                style={{
                  display: "inline-block",
                  width: "calc(50%)",
                  marginLeft: "8px",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Citizen number"
              name="citizen_number"
              rules={[
                {
                  required: true,
                  message: "Please input your Citizen number!",
                },
              ]}
            >
              <Input placeholder="Citizen number" />
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
          </Form>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <img
            src={signinbg}
            alt="sign image"
            className="w-full max-w-lg block m-auto rounded-lg"
          />
        </Col>
      </Row>
    </div>
  );
}
