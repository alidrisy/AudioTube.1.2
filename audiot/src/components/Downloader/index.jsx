/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import useScreenSize from "@/utils/useScreenSize"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ArrowDownToLine } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import Options from "./Options";
import api from "@/api";
import { toast } from "react-toastify";
import Toast from "./Toast";
import { downloadAudio, downloadVideo } from "./download";

export function Downloader({ videoId }) {
  const toastId = useRef(null)
  const loadId = useRef(null)
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState({})
  const [progress, setProgress] = useState(0)
  const { width } = useScreenSize("(min-width: 768px)")

  document.onclick
  useEffect(() => {
    const getFormat = async () => {
      try {
        const response = await api.get(`formats/${videoId}`);
        setFormat(response.data);
        console.log(response.data);
      } catch (e) {
        toast.error("Oops! We're having trouble getting the downloading formats. Please try downloading it again.");
        setOpen(false);
      }
    }
    if (open && !Object.keys(format).length) getFormat();
  }, [open]);

  useEffect(() => {
    if (toastId.current === null && progress) {
      toastId.current = toast(<Toast prog={progress} title={format.title} />, { 
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
       });
    } else if (toastId.current) {
        toast.update(toastId.current, {
          render: <Toast prog={progress} title={format.title} />
        });
      }
  }, [progress]);


  const handleSubmit = async (val) => {
    if (!Object.keys(val).length) {
      toast.warn('Please select the download option first and then click download button.')
      return;
    }
    if (val.type === 'audio') {
      downloadAudio(loadId, toastId, format, val, setOpen, setProgress );
    } else if (val.type === 'video') {
      downloadVideo(loadId, toastId, format, val, setOpen, setProgress );
    }
  }

  if (width > 768) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full p-1.5 hover:bg-gray-300/90 focus:bg-white mr-2 outline-none"><ArrowDownToLine className="w-full h-full" /></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-center">
            <DialogTitle className="text-center text-[24px]">Download</DialogTitle>
            <DialogDescription className="text-center text-[16px]">
              Select the option you prefer and click download to download media content.
            </DialogDescription>
          </DialogHeader>
          {Object.keys(format).length ? <Options format={format} handleSubmit={handleSubmit}/> :
            <div className="flex justify-center items-center space-y-4 min-h-[330px] px-4"><div className="lds-ripple"><div></div><div></div></div></div>}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer  open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex justify-center items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full p-1.5 hover:bg-gray-300/90 focus:bg-white mr-2 outline-none"><ArrowDownToLine className="w-full h-full" /></button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-center text-[24px]">Download</DrawerTitle>
          <DrawerDescription className="text-center text-[16px]">
            Select the option you prefer and click download to download media content.
          </DrawerDescription>
        </DrawerHeader>
        {Object.keys(format).length ? <Options format={format} handleSubmit={handleSubmit}/> :
          <div className="flex justify-center items-center space-y-4 min-h-[330px] px-4"><div className="lds-ripple"><div></div><div></div></div></div>}
        <DrawerFooter className="flex pt-3 px-8">
          <DrawerClose asChild>
            <button className="w-full h-10 text-center border-gray-200 border flex justify-center font-medium	 items-center rounded-lg outline-none">Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}