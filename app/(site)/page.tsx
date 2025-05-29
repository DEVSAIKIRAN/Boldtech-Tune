
import getSongs from "@/lib/getSongs";
import ListItem from "../(app-components)/ListItem";
import PageContent from "../(app-components)/PageContent";
import Player from "../(app-components)/Player";



export default async function Home() {
 const songs = await getSongs()
  return (
    <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto px-2" suppressHydrationWarning>
      <div>
        <div className="mr-2 px-2 ">
          <h1 className="text-white text-3xl font-semibold">Welcome back!</h1>
          <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-col-3 2xl:grid-cols-3 gap-3 mt-4 border-transparent">
            <ListItem name="Liked Songs" image="/images.jpeg" href="/liked"/>
          </div>
        </div>
        
      </div>

      <div className="mr-2 mt-5  px-2">
          <div className="flex justify-between items-center ">
            <h1 className="text-white text-2xl  font-semibold">
              Newest Songs
            </h1>
          </div>
        </div>
        <div className="px-2">
        <PageContent songs={songs}/>
        </div>
        <Player/>
    </div>
  );
}
