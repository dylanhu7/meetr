import { usePathname, useRouter } from "next/navigation";
import { Tabs } from "react-daisyui";
import { Tab } from "../types/tabs";

export default function HeaderTabs() {
  const router = useRouter();
  const path = usePathname();
  const value =
    path === "/profile"
      ? Tab.Profile
      : path === "/meets"
      ? Tab.Meets
      : path === "/"
      ? Tab.Friends
      : undefined;
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
