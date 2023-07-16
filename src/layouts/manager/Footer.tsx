import { HeartFilled } from "@ant-design/icons";
import { Layout } from "antd";

export default function Footer() {
  return (
    <Layout.Footer className="grid grid-cols-2">
      <div>
        © {new Date().getFullYear()}, made with{" "}
        <HeartFilled style={{ color: "red" }} /> by{" "}
        <span className="font-bold">Nguyen Van Ky </span> for a better web.
      </div>
      <div className="justify-end flex gap-8 text-base" style={{ color: '#8c8c8c'}}>
        <a href="">About us</a>
        <a href="">Blog</a>
        <a href="">License</a>
      </div>
    </Layout.Footer>
  );
}
