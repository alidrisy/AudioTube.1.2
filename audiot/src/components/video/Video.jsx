/* eslint-disable react/prop-types */
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MotionTop from "../motion/MotionTop";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Downloader } from "../Downloader";
// 

const Video = ({ video, onClick }) => {
    const [isload, setIsLoad] = useState(false)
    const handleLoad = () => setIsLoad(true);

    return (
        <MotionTop> 
            <Card className="relative flex flex-col justify-between max-w-[400px] max-[650px]:w-full rounded-3xl sm:h-[520px] flex-grow hover:shadow-xl hover:scale-[1.01]">
            {!isload && <Skeleton className="h-[220px]  max-[400px]:h-[180px] w-[400px] max-[650pl cursor-pointer" onClick={onClick} /> }
            <img
                className={isload ? "max-[400px]:h-[180px] rounded-t-3xl max-[650px]:w-full cursor-pointer" : "pl-[100vh]"}
                src={video.thumbnails[video.thumbnails.length - 1].url}
                alt={`${video.title.slice(0, 12)}...`}
                onLoad={handleLoad}
                loading="lazy"
                onClick={onClick}
            /> 
            <span
                className="absolute top-[175px] max-[450px]:top-[135px] right-3 px-4 rounded-2xl bg-gray-300/70 text-[17px] text-gray-900"
            >
            {video.duration}
            </span>
            <CardHeader onClick={onClick} className="flex justify-center items-center w-full cursor-pointer">
                <CardTitle className="w-full text-[17px] sm:text-[20px] text-gray-500 text-center font-sans" dir="auto">
                    {video.title.length <= 45 ? video.title : `${video.title.slice(0, 45)}...`}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around pt-2">
            <div>
                <span className="flex justify-center items-center text-[14px] sm:text-[16px] text-gray-600 bg-gray-200/60 px-4 py-1.5 rounded-3xl">
                {video.viewCount.short}
                </span>
            </div>
            <div>
                <span className="flex justify-center items-center text-[14px] sm:text-[16px] text-gray-600 bg-gray-200/60 px-4 py-1.5 rounded-3xl">
                {video.publishedTime}
                </span>
            </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 sm:px-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-[60px] sm:h-[75px] w-[60px] sm:w-[75px]">
                        <AvatarImage src={video.channel.thumbnails[0].url} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle className="w-full text-[16px] sm:text-[18px] font-medium text-gray-500 text-center" dir="auto">
                        {video.channel.name.length <= 25 ? video.channel.name : `${video.channel.name.slice(0, 25)}...`}
                    </CardTitle>
                </div>
                <Downloader videoId={video.id} />
            </CardFooter>
            </Card>
        </MotionTop>
    );
};
  
  export default Video;
  