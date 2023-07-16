import { Layout } from "antd";

export default function Header() {
  return (
    <Layout.Header
      className="flex items-center"
      style={{ backgroundColor: "#fafafa" }}
    >
      <h2 className="text-2xl font-semibold">Tacohouse</h2>
    </Layout.Header>
  );
}
