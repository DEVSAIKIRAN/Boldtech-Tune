import getSongsByTitle from "@/lib/getSongsByTitle";
import SearchInput from "../(app-components)/SearchInput";
import SearchContent from "../(app-components)/SearchContent";
import PlayerContent from "../(app-components)/PlayerContent";
import Player from "../(app-components)/Player";
export const revalidate = 0;
interface SearchProps {
    searchParams: {
        title: string;
    }
};

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="rounded-lg h-full w-ful overflow-hidden overflow-y-auto p-2">
            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">Search</h1>
                <SearchInput />
            </div>
            <SearchContent songs={songs}/>
            <Player/>
        </div>
    )
}

export default Search