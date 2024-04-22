export type ToolTipProps = {
  children: React.ReactNode;
  message: string;
};

export const ToolTip = (props: ToolTipProps) => {
  const { children, message } = props;

  return (
    <div className="group relativ flex">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};
