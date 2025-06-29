export const SectionHeader = ({
  title,
  subtitle,
  titleClassName = 'text-3xl md:text-4xl font-Spicy_Rice text-gray-700 ',
  subtitleClassName = 'text-lg  text-gray-600 ',
  containerClassName = 'text-center mb-8',
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
      <Tag className={titleClassName}>{title}</Tag>
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
    </div>
  );
};