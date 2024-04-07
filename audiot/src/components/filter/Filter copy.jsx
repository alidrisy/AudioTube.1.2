import { useState } from "react";

const data = [
    {tag: 'All', catagoryId: 0},
    {tag: 'Music', catagoryId: 10},
    {tag: 'Podcast', catagoryId: 24},
    {tag: 'Books', catagoryId: 27},
]

const Filter = () => {
  const [current, setCurrent ] = useState(0)
  const [status, setStatus ] = useState(false)

  return (
        <div className="flex justify-between px-8">
            <div className="flex-grow">
                <button
                    className={status ? "md:hidden min-w-[100px] justify-evenly z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border-t border-gray-300 rounded-t-3xl hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100" : 
                    "md:hidden min-w-[100px] justify-evenly z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border-t border-gray-300 rounded-3xl hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"}
                    type="button"
                    onClick={() => setStatus(!status)}
                
                >
                    {data[current].tag}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor"  strokeLinecap="round"  strokeLinejoin="round" strokeWidth={2}  d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div id="dropdown" className={status ? "z-10 w-[100px] bg-gray-100 rounded-b-3xl divide-y divide-gray-100 shadow dark:bg-gray-700" : "md:flex hidden"}>
                    <ul className="md:flex md:space-x-5 py-2 text-sm text-gray-700 dark:text-gray-200">
                        { data.map((tag, index) => (
                            <li key={tag.id}>
                                <button type="button"
                                    className={status ? "inline-flex w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" : "inline-flex border-2 w-[80px] px-4 py-2 justify-center items-center py-2.5 px-4 text-sm font-medium text-center rounded-3xl  text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"}
                                    onClick={() => setCurrent(index)}
                                >
                                    {tag.tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <form className="flex h-fit">
                <input type="search" className="p-2.5 text-sm text-gray-900 bg-gray-50 rounded-s-3xl border-y-2 border-l-2 focus:ring-2 focus:outline-none focus:ring-gray-100" placeholder="Search.." required />
                <button type="submit" className="p-2.5  bg-gray-50 flex justify-center items-center text-sm font-medium h-full text-white rounded-e-3xl border-2 border-gray-200 hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-100">
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
