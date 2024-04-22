export type DeleteBtnProps = {
  text: string;
  cta: () => void;
};

export const DeleteBtn = (props: DeleteBtnProps) => {
  const { text, cta } = props;
  return (
    <div
      className="px-4 py-2 bg-red-custom-transparent border-2 border-red-custom flex items-center cursor-pointer rounded-[8px] transition-all duration-200 hover:opacity-50"
      onClick={cta}
    >
      <p className="text-lg font-bold text-red-custom">{text}</p>
    </div>
  );
};
