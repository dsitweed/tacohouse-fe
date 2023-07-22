import UploadImage from "@/components/common/UploadImage";
import { useApiClient } from "@/shared/hooks/api";
import { useAppSelector } from "@/store/hooks";
import { App, Button, Form, Input, Modal } from "antd";
import { t } from "i18next";
import { useState } from "react";

interface CreateBuildingForm {
  name: string;
  address: string;
  manager_id: string;
  logo: string;
}

export default function CreateBuilding() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buildingLogo, setBuildingLogo] = useState<string>("");

  const [form] = Form.useForm();
  const buildingAPI = useApiClient("/building");
  const auth = useAppSelector((state) => state.auth);

  const { notification } = App.useApp();

  const handleCreate = async (values: CreateBuildingForm) => {
    values.manager_id = auth.personal_id;

    try {
      const response = await buildingAPI.create(values);

      values.logo = buildingLogo;
      console.log(values);
      if (!response) return; 
      notification.success({ message: "Building successfully created" });
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button className="border border-black" onClick={() => setIsOpen(true)}>
        <span>
          Click to Create <span className="font-bold">new building</span>
        </span>
      </Button>
      {/* popup modal */}
      <Modal
        title={t('building.create')}
        open={isOpen}
        onCancel={onCancel}
        width={1000}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        footer={[
          <Button
            form="createForm"
            key="submit"
            htmlType="submit"
            type="primary"
            className="bg-primary"
          >
            <p className=" text-base">{t('common.create')}</p>
          </Button>,
        ]}
      >
        <Form
          id="createForm"
          layout="vertical"
          autoComplete="true"
          form={form}
          onFinish={handleCreate}
          onFinishFailed={(error) => console.error(error)}
        >
          <Form.Item
            name="address"
            label={t("building.buildingAddress")}
            rules={[{ required: true, message: t("common.pleaseEnter") }]}
          >
            <Input placeholder="Building address" />
          </Form.Item>
          <Form.Item
            name="name"
            label={t("building.buildingName")}
            rules={[{ required: true, message: t("common.pleaseEnter") }]}
          >
            <Input placeholder="Input building name" />
          </Form.Item>
          <Form.Item
            name={"logo"}
            label={t("building.buildingLogo")}
          >
            <UploadImage
              imageUrl={buildingLogo}
              setImageUrl={setBuildingLogo}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
