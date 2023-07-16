import { Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import { Outlet } from "react-router-dom";
import React from "react";

export default function MangerLayout(): React.ReactElement {
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider />
            <Layout>
                <Header />
                <Layout.Content className="overflow-auto">
                    <div className="mx-6 my-4 ">
                        <Outlet />
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
