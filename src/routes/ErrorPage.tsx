import { Link, useNavigate, useRouteError } from "react-router-dom";

import notFoundBg from "@/assets/images/404_error.gif";
import { Button, Typography } from "antd";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="flex flex-col h-screen w-screen bg-white items-center justify-center gap-8">
      <div
        className="bg-center flex justify-center w-full"
        style={{
          backgroundImage: `url(${notFoundBg})`,
          backgroundRepeat: "no-repeat",
          height: 500,
        }}
      >
        <h1 className="text-9xl">{error.status}</h1>
      </div>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
      <Button
        size="large"
        className="bg-primary"
        type="primary"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </div>
  );
}
