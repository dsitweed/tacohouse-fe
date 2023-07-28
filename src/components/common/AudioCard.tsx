import { Avatar, Card, List } from "antd";
import { useEffect, useState } from "react";

interface AudioCardProps {
  sounds: string[];
}

export default function AudioCard(props: AudioCardProps) {
  const [data, setData] = useState(() =>
    props.sounds.map((sound) => {
      const parts = sound.split("/");
      const filenameWithExtension = parts[parts.length - 1]; // "Summertime.mp3"
      const filenameWithoutExtension = filenameWithExtension.split(".")[0]; // "Summertime"
      
      return {
        audio: new Audio(sound),
        name: filenameWithoutExtension,
        playing: false,
      };
    })
  );

  const toggle = (index: number) => {
    data[index].playing ? data[index].audio.pause() : data[index].audio.play();
    data[index].playing = !data[index].playing;
    const newData = [...data];
    setData(newData);
  };

  return (
    <div>
      <h1>{data[0].playing ? '1' : '2'}</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <button onClick={() => toggle(index)} key="list-soundItem-play">
                {data[index].playing ? "Stop" : "Play"}
              </button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
