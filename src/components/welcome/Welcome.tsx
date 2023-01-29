import { SignIn } from "./actions";

export default function Welcome() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="select-none text-5xl font-black">
        <span className="text-[#1459C1]">m</span>
        <span className="text-[#7AB8F1]">e</span>
        <span className="text-[#E9DD74]">e</span>
        <span className="text-[#E1814A]">t</span>
        <span className="text-[#CF2222]">r</span>
      </h1>
      <SignIn />
    </div>
  );
}
