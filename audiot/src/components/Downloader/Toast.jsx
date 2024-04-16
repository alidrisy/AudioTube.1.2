// eslint-disable-next-line react/prop-types
const Toast = ({ prog, title, closeToast, toastProps }) => {
  return (
    <>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700 dark:text-white">Download</span>
            <span className="text-sm font-medium text-blue-700 dark:text-white">{prog}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${prog}%`}}></div>
        </div>
        <p className="w-full pt-2 text-[16px] sm:text-[18px] font-medium text-gray-500 text-center" dir="auto">
            {title.length <= 25 ? title : `${title.slice(0, 25)}...`}
        </p>
    </>
  )
};

export default Toast;
