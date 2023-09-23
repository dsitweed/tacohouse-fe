interface StatusProps {
  color: 'red' | 'green' | 'yellow';
  message: string;
}

export default function Status(props: StatusProps) {
  return (
    <div
      className="rounded-full flex w-fit p-2 justify-center items-center"
      style={{
        backgroundColor: '#fde3cf',
      }}
    >
      <div
        className="rounded-full w-3 h-3 mr-2"
        style={{ backgroundColor: props.color }}
      ></div>
      <span className="text-sm">{props.message}</span>
    </div>
  );
}
