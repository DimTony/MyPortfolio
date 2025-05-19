import Link from "next/link";

const TitleHeader = ({ title, number, text }: {title: any, number: any, text: any}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="gradient-title font-semibold md:text-6xl text-4xl uppercase">
          {title}
        </h1>
        <p className="md:text-3xl md:mt-5">{text}</p>
      </div>
      {/* <div className="items-center gap-7 hidden md:flex">
        <div className="w-36 border border-[var(--border-number)]"></div>
        <p className="gradient-title text-6xl">{number}</p>
      </div> */}

      <Link href="/tech-stacks" className="hover:-translate-y-1 cursor-pointer">
        <span className="gradient-title text-6xl">See All</span>
      </Link>
    </div>
  );
};

export default TitleHeader;
