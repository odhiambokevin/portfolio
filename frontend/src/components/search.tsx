import { MdSearch } from "react-icons/md";
export default function Search() {
  return (
     <div className="mb-10 mt-12 rounded-sm bg-text-mild/20 p-6 shadow-three lg:mt-0">
        <div className="relative w-3/4 mx-auto">
        <form className={`relative flex items-center gap-[8px] bg-gray-400/90 p-[4px] rounded-[8px] `}>
            <input type="text" placeholder="search" className="bg-transparent px-1 text-white outline-0"/>
            <button className="absolute top-0 right-0 bottom-0 bg-accent rounded-md rounded-bl-none rounded-tl-none px-2 py-[px] cursor-pointer">
            <MdSearch className="text-2xl "/>
            </button>
          </form>
        </div>
      </div>
  )
}
