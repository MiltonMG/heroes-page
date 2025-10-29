import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { CustomHeader } from "@/components/custom/CustomHeader"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { use, useMemo } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

type Tabs = 'all' | 'favorites' | 'heroes' | 'villains'


export default function HomePage() {

  const { favoriteCount, favorites } = use(FavoriteHeroContext);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';
  
  const selectedTab = useMemo(() => {
    const validTabs = [ 'all', 'favorites', 'heroes', 'villains' ]
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab])  

  // const [activeTab, setActiveTab] = useState<Tabs>('all');

  const { data: HeroesResponse } = usePaginatedHero( +page, +limit, category);

  const { data: summary } = useHeroSummary();

  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, []);

  return (
    <>
      <>
        {/* Header */}
        <CustomHeader title="Superhero Universe" description="Explore and manage your superheroes and villians!" />

        {/* <CustomBreadCrumbs currentPage=""/> */}

        {/* Stats Dashboard */}
        <HeroStats />
        
        {/* Tabs */}
        <Tabs value={selectedTab!} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all')
                prev.set('category', 'all')
                prev.set('page', '1')
                return prev
              })}
            >All Characters ({ summary?.totalHeroes })</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev
              })}
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes')
                prev.set('category', 'hero')
                prev.set('page', '1')
                return prev
              })}
            >Heroes ({ summary?.heroCount })</TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains')
                prev.set('category', 'villain')
                prev.set('page', '1')
                return prev
              })}
            >Villains ({ summary?.villainCount })</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={HeroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes Favoritos */}
            <HeroGrid heroes={favorites}/>
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los personajes heroes */}
            <HeroGrid heroes={HeroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los personajes villains */}
            <HeroGrid heroes={HeroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}

        {/* Pagination */}

        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPages={HeroesResponse?.pages ?? 1}/>
          ) 
        }
      </>
    </>
  )
}
