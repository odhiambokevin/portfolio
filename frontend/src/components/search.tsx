'use client'
import { FormEvent, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";

export default function Search() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchString, setSearchString] = useState('');
  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement >)=>{setSearchString(e.currentTarget.value)}
  const inputref = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchString.length > 0)
        {
            inputref.current!.value = '' ;
            setSearchString('')
        } else {
            setIsAnimating(true);
        }}

    useEffect(()=>{
        const timeout = setTimeout(()=> {setIsAnimating(false)},1000);
        return () => clearTimeout(timeout);
    })

  return (
     <div className="mb-10 mt-12 rounded-sm bg-text-mild/20 p-6 shadow-three lg:mt-0">
        <div className="relative w-3/4 mx-auto">
        <form className={`${isAnimating ? 'animate-shake outline-1 outline-accent/80 shadow-sm shadow-accent': 'animate-none'} relative flex items-center gap-[8px] bg-gray-400/90 p-[4px] rounded-[8px] outline outline-accent`} onSubmit={handleSubmit}>
        
            <input onChange={handleSearchInput} type="text" placeholder="search" className="bg-transparent px-1 text-white outline-0" ref={inputref}/>
            <button className="absolute top-0 right-0 bottom-0 bg-accent rounded-md rounded-bl-none rounded-tl-none px-2 py-[px] cursor-pointer">
            <MdSearch className="text-2xl "/>
            </button>
          </form>
        </div>
      </div>
  )
}
