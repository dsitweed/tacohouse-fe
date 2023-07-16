import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AuthLayout() {
  return (
    <Layout style={{ height: "100vh" }} >
      {/* Header */}
      <Header />
      <Layout.Content>
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </Layout.Content>
      {/* Footer */}
      <Footer />
    </Layout>
  );
}
