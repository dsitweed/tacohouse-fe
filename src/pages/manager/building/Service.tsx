import { useEffect, useState } from "react";
import { ServiceEntity } from "@/model/Service.entity";
import { List } from "antd";
import { BuildingService } from "@/services/Building.service";

export interface ServiceProps {
  building_id: number;
}

const mapToTitle: { [key: string]: string } = {
  electricity_price: "Electricity Price",
  water_price: "Water Price",
  wifi_price: "Wifi fee",
  light_price: "Light fee",
  environment_price: "Environment fee",
};

interface IList {
  title: string;
  value: number;
}

// Service of 1 building
export default function Service(props: ServiceProps) {
  const [data, setData] = useState<ServiceEntity>();
  const [listData, setListData] = useState<IList[]>([]);

  const dataToList = () => {
    let list = [];

    if (!data) return [];
    list = Object.keys(data).map((item, index) => {
      // if (item !== "id" && item !== "building_id") console.log(item);
      return {
        title: mapToTitle[item],
        value: data[item as keyof ServiceEntity],
      } as IList;
    });

    list = list.filter((item) => item.title !== undefined);
    setListData(list);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await BuildingService.getService(props.building_id);
      if (data) {
        setData(data);
      }
    };

    fetchData();
    dataToList();
  }, [data]);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item, index) => (
          <List.Item key={`service-list-${index}`}>
            <List.Item.Meta title={item.title} />
            <p>{item.value.toLocaleString()} VND</p>
          </List.Item>
        )}
      />
    </div>
  );
}
