import { ReactElement } from "react";

export interface IconProps {
  icon: ReactElement;
}

export default function Icon(props: IconProps) {
  return (
    <div
      className="flex items-center justify-center rounded-lg text-white text-xl"
      style={{ backgroundColor: "#1890ff" ,
        width: 48,
        height: 48
    }}
    >
      {props.icon}
    </div>
  );
}
