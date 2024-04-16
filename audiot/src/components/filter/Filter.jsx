/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { ArrowLeft } from 'lucide-react';

const Filter = ({catagoryId, setCatagoryId, data, search, setSearch, getVideos}) => {
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (getVideos) {
        getVideos()
    } else {
        navigate('/videos')
    }
  }

  return (
    <div className={data ? "flex flex-col-reverse md:flex-row justify-between px-6 sm:px-8 gap-3 sm:gap-5" : "flex flex-row items-center justify-between px-6 sm:px-8 gap-3 sm:gap-5"}>
         {data ?
            <div  className="flex">
                <ul className="flex space-x-3 sm:space-x-5 py-2 text-gray-700 dark:text-gray-200 overflow-x-scroll hide-scrollbar sm:overflow-hidden">
                    {data.map((tag) => (
                        <li key={tag.catagoryId}>
                            <button type="button"
                                className={catagoryId === tag.catagoryId ? "inline-flex text-[14px] border-2 w-[70px] sm:w-[80px] justify-center items-center py-2 sm:py-2.5 px-4 sm:text-sm font-medium text-center rounded-3xl bg-gray-200 text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white outline-none" : 
                                "inline-flex text-[14px] border-2 w-[70px] sm:w-[80px] justify-center items-center py-2 sm:py-2.5 px-4 sm:text-sm font-medium text-center rounded-3xl  text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white outline-none"}
                                onClick={() => setCatagoryId(tag.catagoryId)}
                            >
                                {tag.tag}
                            </button>
                        </li>
                    ))}
                </ul>
            </div> : 
            <button 
                className="flex justify-center items-center h-10 w-10 -ml-5 mt-[1px] rounded-full hover:bg-gray-200 outline-none"
                onClick={() => navigate('/')}
            >
                    <ArrowLeft  size={34} strokeWidth={1.4} color="#2b2b2b" />
                </button>}
            <form className="flex h-fit py-2 flex-grow justify-end" onSubmit={handleSubmit} >
                <input
                    type="search"
                    className={data ? "w-full md:max-w-[350px] flex-grow p-2 pl-2 text-gray-900 bg-gray-50 rounded-s-3xl border-y-2 border-l-2 focus:ring-2 focus:outline-none focus:ring-gray-100"
                    : "w-full max-w-[350px] flex-grow min-w-[95%] p-2 pl-3 text-gray-900 bg-gray-50 rounded-s-3xl border-y-2 border-l-2 focus:ring-2 focus:outline-none focus:ring-gray-100"}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search.." 
                    required
                />
                <button type="submit" className="p-[10px]  bg-gray-50 flex justify-center items-center text-sm font-medium h-full text-white rounded-e-3xl border-2 border-gray-200 hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-100" >
                    <svg className="w-5 h-5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
                </form>
        </div>
  );
};

export default Filter;
