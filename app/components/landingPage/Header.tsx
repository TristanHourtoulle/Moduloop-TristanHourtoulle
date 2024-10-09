export type HeaderProps = {
  subtitle: string;
  title: string;
};

export const Header = ({ subtitle, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-1">
      <p className="text-lg lg:text-xl tertiary-color outfit-regular">
        {subtitle}
      </p>
      <p className="text-2xl lg:text-4xl text-primary outfit-bold">
        {title.toUpperCase()}
      </p>
    </div>
  );
};
