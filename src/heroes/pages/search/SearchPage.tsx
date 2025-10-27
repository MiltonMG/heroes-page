import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SeachControls } from "./ui/SeachControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {
  return (
    <>
      <CustomHeader title="Search your hero!"/>

      <CustomBreadCrumbs currentPage="Search a hero"
        // breadcrumbs={[
        //   { label: 'Home', to: '/' },
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        // ]}
      />
      
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Seach */}
      <SeachControls />
    </>
  )
}

export default SearchPage;
