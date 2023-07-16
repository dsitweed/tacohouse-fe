import { BuildingEntity } from "@/model/Building.entity";
import { BuildingService } from "@/services/Building.service";
import { ToTopOutlined } from "@ant-design/icons";
import {
  Button,
  Radio,
  Table,
  Upload,
  Typography,
  message,
  Progress,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

interface BuildingAnalyticProps {
  pageSize?: number;
}

export default function BuildingAnalytic(props: BuildingAnalyticProps) {
  const [data, setData] = useState<BuildingEntity[]>([]);

  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);

  useEffect(() => {
    const fetchData = async () => {
      const data = await BuildingService.getBuildings("Nguyen Thi Mung");
      setData(data);
    };

    fetchData();
  }, []);

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns: ColumnsType<BuildingEntity> = [
    {
      title: "Building",
      dataIndex: "build",
      render: (text, record, index) => (
        <div className="flex gap-2 items-center">
          <img className="h-6 w-6" src={record.icon} alt="building logo" />
          <a>
            <p>{record.name}</p>
            <p className=" text-gray-500 hover:text-inherit">{record.address}</p>
          </a>
        </div>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
    },
    {
      title: "Income",
      dataIndex: "income",
      render: (text, record) => <p>{record.income.toLocaleString()}$</p>,
    },
    {
      title: "COMPLETION",
      dataIndex: "completion",
      render: (text, record) => (
        <Progress
          percent={record.completion}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Title level={4}>Projects</Title>
          <Paragraph>
            Done this month{" "}
            <span className="text-blue-600 font-bold text-base">40%</span>
          </Paragraph>
        </div>
        <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
          <Radio.Group onChange={onChange} defaultValue="a">
            <Radio.Button value="a">ALL</Radio.Button>
            <Radio.Button value="b">ONLINE</Radio.Button>
            <Radio.Button value="c">STORES</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="ant-list-box table-responsive">
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: props.pageSize || 5,
          }}
        />
      </div>

      <div className="w-full">
        <Upload {...uploadProps}>
          <Button icon={<ToTopOutlined />} className="border border-black">
            <span>
              Click to Upload <span className="font-bold">new building</span>
            </span>
          </Button>
        </Upload>
      </div>
    </div>
  );
}
