type TittleSectionProps = {
  title: string;
  subheading?: string;
  pill: string;
};
const TitleSection = ({ title, subheading, pill }: TittleSectionProps) => {
  return (
    <section className="flex flex-col gap-4 justify-center items-start md:items-center">
      <div className=" bg-red-900 text-sm rounded-full dark:bg-gradient-to-r dark:from-brand-primaryBlue dark: to-brand-primaryPurple ">
        <p className="m-[2px] py-1 rounded-full px-3 dark: bg-black">{pill}</p>
      </div>

      {subheading ? (
        <>
          <h2 className="text-left text-3xl font-bold sm:text-5xl sm:max-w-[750px] md:text-center">
            {title}
          </h2>
          <p className="dark:text-washed-purple-700 sm:max-w-[450px] md:text-center">
            {subheading}
          </p>
        </>
      ) : (
        <h1 className="text-left text-4xl font-semibold sm:text-4xl sm: max-w-[850px] md:text-center dark:text-washed-purple-700">
          {title}
        </h1>
      )}
    </section>
  );
};

export default TitleSection;
