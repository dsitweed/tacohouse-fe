import cn from 'classnames';

interface StatusProps {
  color: 'red' | 'green' | 'yellow';
  message: string;
  type?: 'classic' | 'modern';
}

const bgColor: Record<string, string> = {
  red: 'bg-rose-50',
  green: 'bg-lime-100',
  yellow: 'bg-orange-100',
};
const textColor: Record<string, string> = {
  red: 'text-red-600',
  green: 'text-green-800',
  yellow: 'text-yellow-800',
};

export default function Status({
  color,
  message,
  type = 'classic',
}: StatusProps) {
  const renderModern = () => {
    return (
      <div className="rounded-full flex w-fit p-2 justify-center items-center bg-[#fde3cf]">
        <div
          className="rounded-full w-3 h-3 mr-2"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm">{message}</span>
      </div>
    );
  };

  const classic = () => {
    return (
      <div
        className={cn(
          'rounded-full flex w-fit py-2 px-4 justify-center items-center font-semibold',
          bgColor[color],
          textColor[color],
        )}
      >
        <span className="text-sm">{message}</span>
      </div>
    );
  };

  switch (type) {
    case 'modern':
      return renderModern();
    case 'classic':
      return classic();
    default:
      return classic();
  }
}
// Currently not in use
