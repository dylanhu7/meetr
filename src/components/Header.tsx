import HeaderTabs from "./HeaderTabs";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 w-full items-center justify-between bg-white px-4 drop-shadow-md md:px-6">
      <h1 className="select-none text-4xl font-black">
        <span className="text-[#1459C1]">m</span>
        <span className="text-[#7AB8F1]">e</span>
        <span className="text-[#E9DD74]">e</span>
        <span className="text-[#E1814A]">t</span>
        <span className="text-[#CF2222]">r</span>
      </h1>
      <HeaderTabs />
    </header>
  );
}
