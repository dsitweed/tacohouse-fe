import { Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAppSelector } from "@/store/hooks";

export default function MangerLayout(): React.ReactElement {
    const auth = useAppSelector(state => state.auth);
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider />
            <Layout>
                <Header/>
                <Layout.Content className="overflow-auto">
                    <div className="mx-6 my-4 ">
                        {(auth.user_id && auth.role === 'MANAGER') ? <Outlet /> : <Navigate to={'/auth/sign-in'} replace/>}
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
