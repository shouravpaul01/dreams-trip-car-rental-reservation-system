import { TContactInfo } from "../../type";

const ContactInfoCard = ({
  info,
  index,
  borderClassName,
  titleClassName,
  subTitleClassName,
}: {
  info: TContactInfo;
  index: number;
  borderClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}) => {
  return (
    <>
      <div className="flex items-center gap-5">
        <p className="p-3 bg-success rounded-full text-2xl">{info.icon}</p>
        <div className="">
          <p
            className={`font-bold ${
              titleClassName ? titleClassName : "text-white"
            }`}
          >
            {info.title}
          </p>
          <p
            className={`${
              subTitleClassName ? subTitleClassName : "text-gray-500"
            }`}
          >
            {info.subTitle}
          </p>
        </div>
      </div>
      {(index == 0 || index == 1) && (
        <div
          className={`border-b md:border-r ${
            borderClassName
              ? borderClassName
              : "border-slate-50 border-opacity-30"
          }  `}
        ></div>
      )}
    </>
  );
};

export default ContactInfoCard;
