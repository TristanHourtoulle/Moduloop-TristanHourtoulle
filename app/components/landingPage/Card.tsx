import Image from "next/image";

export type CardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="w-[450px] bg-white rounded-xl flex flex-col gap-4 items-start px-[5%] py-[5%] lg:px-[1.5%] lg:py-[1.5%] border-[1.5px] border-[#D0D0D0]">
      {icon}
      <h1 className="w-full text-xl lg:text-2xl outfit-semibold text-start tertiary-color">
        {title.toUpperCase()}
      </h1>
      <p className="w-full text-start text-xs lg:text-sm outfit-regular opacity-90 tertiary-color">
        {description}
      </p>
    </div>
  );
};

export const SmallerCard = ({ icon, title, description }: CardProps) => {
  return (
    <div className="w-[450px] h-[250px] bg-white rounded-xl flex flex-col gap-4 items-start px-[5%] py-[5%] lg:px-[1.5%] lg:py-[1.5%] border-[1.5px] border-[#D0D0D0]">
      {icon}
      <h1 className="w-full text-xl lg:text-2xl outfit-semibold text-start tertiary-color">
        {title.toUpperCase()}
      </h1>
      <p className="w-full text-start text-xs lg:text-sm outfit-regular opacity-90 tertiary-color">
        {description}
      </p>
    </div>
  );
};

export type NoticeCardProps = {
  profilePicture: string;
  fullName: string;
  role: string;
  notice: string;
};

export const NoticeCard = ({
  profilePicture,
  fullName,
  role,
  notice,
}: NoticeCardProps) => {
  return (
    <div className="w-[500px] bg-white rounded-xl flex flex-col gap-4 items-start px-[5%] py-[5%] lg:px-[1.5%] lg:py-[1.5%] border-[1.5px] border-[#D0D0D0]">
      <div className="flex items-center justify-start gap-5">
        <Image
          src={profilePicture}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col gap-0 items-start">
          <p className="outfit-regular primary-color text-2xl">{fullName}</p>
          <p className="outfit-regular text-md tertiary-color">{role}</p>
        </div>
      </div>
      <p className="tertiary-color outfit-regular text-md text-justify leading-tight">
        "{notice}"
      </p>
    </div>
  );
};
