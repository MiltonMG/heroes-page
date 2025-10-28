import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SeachControls } from "./ui/SeachControls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroAction } from "@/heroes/actions/search-heros.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";
// import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {

  const [ searchParams ] = useSearchParams();
  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const {data = []} = useQuery({
    queryKey: ['search',{ name, strength }],
    queryFn: () => searchHeroAction({ name, strength }),
    staleTime: 1000*60*5// 5 minutes
  });

  return (
    <>
      <CustomHeader title="Search your hero!"/>

      {/* <CustomBreadCrumbs currentPage="Search a hero"
        // breadcrumbs={[
        //   { label: 'Home', to: '/' },
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        // ]}
      /> */}
      
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Seach */}
      <SeachControls />

      <HeroGrid heroes={data} />
    </>
  )
}

export default SearchPage;
