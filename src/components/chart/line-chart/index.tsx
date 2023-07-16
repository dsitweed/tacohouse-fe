import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

export const data = {
  labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "Mobile apps",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      borderColor: "#1890ff",
      backgroundColor: "#1890ff",
    },
    {
      label: "Websites",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      borderColor: "green",
      backgroundColor: "green",
    },
  ],
};

export default function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={4} style={{ marginBottom: -3 }}>
            Active Users
          </Title>
          <Paragraph className="text-gray-400">
            Than last week{" "}
            <span className="font-bold text-base text-light-green">+30%</span>
          </Paragraph>
        </div>
        <div>
          <Line options={options} data={data}/>
        </div>
      </div>
    </>
  );
}
