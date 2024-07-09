import api from "@/api";
import { toast } from "react-toastify";

export const downloadVideo = (
  loadId,
  toastId,
  format,
  val,
  setOpen,
  setProgress,
) => {
  loadId.current = toast.loading("Please wait...", { closeButton: true });
  setOpen(false);
  console.log(format.id, val.id);
  api
    .get(`download/video/${format.id}/${val.id}`, {
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
        if (loadId.current) {
          toast.done(loadId.current);
          loadId.current = null;
        }
        setProgress(
          Math.round(
            (progressEvent.loaded * 100) /
              (val.filesize + format.aformats[0].filesize),
          ),
        );
      },
    })
    .then((response) => {
      if (loadId.current) {
        toast.done(loadId.current);
        loadId.current = null;
      }
      if (toastId.current) {
        toast.done(toastId.current);
        toastId.current = null;
        setProgress(0);
      }
      const blob = new Blob([response.data], { type: "video/mp4" });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = format.title.replace(" ", "-") + ".mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
      toast.success("Download complete!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .catch((error) => {
      if (loadId.current) {
        toast.done(loadId.current);
        loadId.current = null;
      }
      toast.error("Error downloading media.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(true);
      console.error("Error downloading audio:", error);
    });
};

export const downloadAudio = (
  loadId,
  toastId,
  format,
  val,
  setOpen,
  setProgress,
) => {
  loadId.current = toast.loading("Please wait...", { closeButton: true });
  setOpen(false);
  api
    .get(`download/audio/${format.id}/${val.container}`, {
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
        if (loadId.current) {
          toast.done(loadId.current);
          loadId.current = null;
        }
        setProgress(
          Math.round(
            (progressEvent.loaded * 100) / format.aformats[0].filesize,
          ),
        );
      },
    })
    .then((response) => {
      if (loadId.current) {
        toast.done(loadId.current);
        loadId.current = null;
      }
      if (toastId.current) {
        toast.done(toastId.current);
        toastId.current = null;
        setProgress(0);
      }
      const blob = new Blob([response.data], {
        type: `audio/${val.container}`,
      });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = format.title.replace(" ", "-") + `.${val.container}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
      toast.success("Download complete!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .catch((error) => {
      if (loadId.current) {
        toast.done(loadId.current);
        loadId.current = null;
      }
      toast.error("Error downloading media.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(true);
      console.error("Error downloading audio:", error);
    });
};
