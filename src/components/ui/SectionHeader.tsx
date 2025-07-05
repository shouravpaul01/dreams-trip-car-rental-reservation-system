export const SectionHeader = ({
  title,
  subtitle,
  titleClassName = 'text-[26px] md:text-4xl   font-Spicy_Rice  ',
  subtitleClassName = ' text-lg  text-gray-600 mt-2',
  containerClassName = 'flex justify-center items-center text-center mb-8',
  as: Tag = 'h2'
}:{
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) => {
  return (
    <div className={containerClassName}>
      <div className="max-w-lg ">
        <Tag className={titleClassName} >{title}</Tag>
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      </div>
    </div>
  );
};