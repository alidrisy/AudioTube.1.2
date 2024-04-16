/* eslint-disable react/prop-types */
import { Music } from 'lucide-react';
import { Video } from 'lucide-react';
import { useState } from 'react';

//formats.aformats[0].filesize

const Options = ({ format, handleSubmit }) => {
  const [check, setCheck] = useState({})

  return (
    <div className="flex flex-col space-y-4 min-h-[330px] px-8">
        <div>
           <p className="text-xl font-medium text-gray-900/60">Audio</p> 
          <ul className="py-4 pl-3 space-y-5">
            <li className="w-full flex items-center justify-between"
              onClick={() => check?.container === 'mp3' ? setCheck({}) :  setCheck({type: 'audio', container: 'mp3', id: format.aformats[0].id, url: format.aformats[0].url, filesize: format.aformats[0].filesize})}
            >
                <label htmlFor="default-checkbox" className="flex space-x-2 ms-2 text-[17px] font-medium text-gray-900 dark:text-gray-300">
                  <Music />
                  <p>MP3</p>
                </label>
                <div className="flex space-x-3">
                  <p className="text-[15.5px] font-medium text-gray-900/60">{(format.aformats[0].filesize / 1048576).toFixed(2)}MB</p>
                  <input
                    id="default-checkbox"
                    readOnly
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
                    checked={check?.container === 'mp3'}
                  />
                </div>
            </li>
            <li className="w-full flex items-center justify-between"
              onClick={() => check?.container === format.aformats[0].container ? setCheck({}) : setCheck({type: 'audio', container: format.aformats[0].container, id: format.aformats[0].id, url: format.aformats[0].url, filesize: format.aformats[0].filesize})}
            >
              <label htmlFor="default-checkbox" className="flex space-x-2 ms-2 text-[17px] font-medium text-gray-900 dark:text-gray-300">
                <Music />
                <p>M4A</p>
              </label>
              <div className="flex space-x-3">
                <p className="text-[15.5px] text-left font-medium text-gray-900/60">{(format.aformats[0].filesize / 1048576).toFixed(2)}MB</p>
                <input
                  id="default-checkbox"
                  readOnly
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
                  checked={check?.container === format.aformats[0].container}
                />
              </div>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium text-gray-900/60">Video</p>
          <ul className="py-4 pl-3 space-y-5">
            {format.vformats.map(v => (
              <li className="w-full flex items-center justify-between focus:bg-gray-100" key={v.id}
                onClick={() => check?.container === v?.quality ? setCheck({}) : setCheck({type: 'video', container: v?.quality, id: v?.id, url: v.url, filesize: v?.filesize})}
              >
                <label htmlFor="default-checkbox" className="flex space-x-2 ms-2 text-[17px] font-medium text-gray-900 dark:text-gray-300">
                  <Video />
                  <p>{v?.quality}</p>
                </label>
                <div className="flex space-x-4">
                  <p className="text-[15.5px] text-left font-medium text-gray-900/60">{((format.aformats[0]?.filesize + v?.filesize) / 1048576).toFixed(2)}MB</p>
                  <input
                    readOnly
                    id="default-checkbox"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-3xl dark:bg-gray-700 dark:border-gray-600"
                    checked={check?.container === v?.quality}
                  />
                </div>
              </li>
          ))}
          </ul> 
        </div>
        <button
          className="w-full h-10 bg-gray-300/50 border-gray-300 border flex justify-center font-medium	 items-center rounded-lg hover:bg-gray-300/70 outline-none"
          onClick={() => handleSubmit(check)}
        >
          Download
        </button>
    </div>
  )
};

export default Options
