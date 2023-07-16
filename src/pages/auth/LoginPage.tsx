import bgrImage from "../../assets/images/login_1.jpg";
import { Button, Checkbox, Form, Input } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:min-w-[400px] justify-center items-end gap-4">
      <img src={bgrImage} className="-z-10 absolute h-screen w-screen" />
      <div className="bg bg-white p-10 rounded-2xl mr-40">

        {/* header */}
        <div className="flex flex-row justify-between">
          {/* left */}
          <div>
            <p className="text-xl">
              Welcome to
              <span className="text-regal-green">Tacohouse</span>
            </p>
            <p className="text-4xl">Sign In</p>
          </div>
          {/* Right */}
          <div className="cursor-pointer">
            <GlobalOutlined />
          </div>
        </div>

        {/* other service */}
        <div className="mt-6 mb-6 flex flex-row justify-between gap-4">
          <Button className="flex items-center pr-10 pl-4 bg-blue-100 border-none">
            <img
              className="h-4 w-4 mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              alt="google-icon"
            />
            Sign in with Google
          </Button>
          <Button className="flex items-center border-none">
            <img
              className="h-4 w-4"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
              alt="facebook-icon"
            />
          </Button>
          <Button className="flex items-center border-none">
            <img
              className="h-4 w-4"
              src="https://seeklogo.com/images/G/github-logo-5F384D0265-seeklogo.com.png"
              alt="facebook-icon"
            />
          </Button>
        </div>

        {/* Form */}
        <Form layout="vertical" requiredMark={false}>
          <Form.Item
            label="Enter email address"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>
          <Form.Item
            label="Enter your password"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <div className="flex flex-row justify-between -mt-3 mb-6">
            <Checkbox onChange={() => {}}>
                <p>Remember me</p>
            </Checkbox>
            <p className="text-blue-400">Forgot password ?</p>
          </div>

          <Form.Item className="flex  justify-center">
            <Button className="flex items-center bg-regal-green text-white text-base p-5 pr-20 pl-20">
              Sing in
            </Button>
          </Form.Item>
          <span className="text-sm flex justify-end gap-2">
            <h5>No Account ?</h5>
            <h5 className="text-regal-green">Sign up</h5>
          </span>
        </Form>
      </div>
    </div>
  );
}
