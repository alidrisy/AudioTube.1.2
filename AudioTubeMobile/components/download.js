import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import axios from "axios";
import { shareAsync } from "expo-sharing";

export const downloadVideo = async (
  format,
  val,
  bottomDrawerRef,
  setProgress,
) => {
  bottomDrawerRef.current.close();
  console.log(format.id, val.id);

  const filename = "dummy.mp4";
  const result = await FileSystem.downloadAsync(
    `http://192.168.43.39:5000/api/v1/download/video/${format.id}/${val.id}`,
    FileSystem.documentDirectory + filename,
  );

  // Log the download result
  // console.log(result);

  // Save the downloaded fle
  saveFile(result.uri, filename, result.headers["Content-Type"]);
};

async function saveFile(uri, filename, mimetype) {
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype,
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => console.log(e));
    } else {
      shareAsync(uri);
    }
  } else {
    shareAsync(uri);
  }
}

export const downloadAudio = async (format, val, bottomDrawerRef) => {
  bottomDrawerRef.current.close();
  console.log(format.id, val.id);

  const url = new URL("http://localhost:5000/audio/");
  url.search = new URLSearchParams({
    quality: format.id,
    url: val.id,
  });

  const filename = "dummy.mp3";
  const result = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + filename,
  );

  // Log the download result
  console.log(result);

  // Save the downloaded file
  saveFile(result.uri, filename, result.headers["Content-Type"]);
};
