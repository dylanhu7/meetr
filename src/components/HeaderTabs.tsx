import { usePathname, useRouter } from "next/navigation";
import { Tabs } from "react-daisyui";
import { Tab } from "../types/tabs";

export default function HeaderTabs() {
  // const size = window.innerWidth < 768 ? "sm" : "md";
  const router = useRouter();
  const path = usePathname();
  const value =
    path === "/" ? Tab.Friends : path === "/meets" ? Tab.Meets : Tab.Profile;
  const handleChange = (value: Tab) => {
    switch (value) {
      case Tab.Friends:
        router.push("/");
        break;
      case Tab.Meets:
        router.push("/meets");
        break;
      case Tab.Profile:
        router.push("/profile");
        break;
    }
  };

  return (
    <Tabs value={value} boxed onChange={handleChange}>
      <Tabs.Tab className="tab-xs min-[400px]:tab-md" value={Tab.Friends}>
        friends
      </Tabs.Tab>
      <Tabs.Tab className="tab-xs min-[400px]:tab-md" value={Tab.Meets}>
        meets
      </Tabs.Tab>
      <Tabs.Tab className="tab-xs min-[400px]:tab-md" value={Tab.Profile}>
        profile
      </Tabs.Tab>
    </Tabs>
  );
}
