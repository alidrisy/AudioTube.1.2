/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const Options = ({ format, handleSubmit }) => {
  const [check, setCheck] = useState({});

  const handleCheck = (type, container, id, url, filesize) => {
    if (check.container === container) {
      setCheck({});
    } else {
      setCheck({ type, container, id, url, filesize });
    }
  };

  return (
    <View className='h-[420px] w-full p-2 justify-between'>
      <View className=''>
        <Text style={styles.sectionTitle}>Audio</Text>

        <Pressable
          className='w-[95%] mb-2 mx-2 py-2 px-[1px] flex-row justify-between items-center '
          onPress={() =>
            handleCheck(
              "audio",
              format.aformats[0].container,
              format.aformats[0].id,
              format.aformats[0].url,
              format.aformats[0].filesize,
            )
          }
        >
          <View style={styles.labelContainer}>
            <Feather name='music' size={22} />
            <Text style={styles.labelText}>
              {format.aformats[0].container?.toUpperCase() || null}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {(format.aformats[0].filesize / 1048576).toFixed(1) || null}MB
            </Text>
            <Checkbox
              value={check.container === format.aformats[0]?.container}
              onValueChange={() =>
                handleCheck(
                  "audio",
                  format.aformats[0].container,
                  format.aformats[0].id,
                  format.aformats[0].url,
                  format.aformats[0].filesize,
                )
              }
              className='rounded-full'
            />
          </View>
        </Pressable>
        <Pressable
          className='w-[95%] mx-2 py-2 px-[1px] flex-row justify-between items-center '
          onPress={() =>
            handleCheck(
              "audio",
              "MP3",
              format.aformats[0].id,
              format.aformats[0].url,
              format.aformats[0].filesize,
            )
          }
        >
          <View style={styles.labelContainer}>
            <Feather name='music' size={22} />
            <Text style={styles.labelText}>MP3</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {(format.aformats[0]?.filesize / 1048576).toFixed(1) || null}MB
            </Text>
            <Checkbox
              value={check.container === "MP3"}
              onValueChange={() =>
                handleCheck(
                  "audio",
                  "MP3",
                  format.aformats[0].id,
                  format.aformats[0].url,
                  format.aformats[0].filesize,
                )
              }
              className='rounded-full'
            />
          </View>
        </Pressable>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Video</Text>
        <FlatList
          data={format.vformats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              className='w-[95%] mx-2 py-2 px-[1px] flex-row justify-between items-center '
              onPress={() =>
                handleCheck(
                  "audio",
                  item.quality,
                  item.id,
                  item.url,
                  item.filesize,
                )
              }
            >
              <View style={styles.labelContainer}>
                <Feather name='music' size={22} />
                <Text style={styles.labelText}>{item.quality}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  {item?.filesize / 1048576 > 1
                    ? (item?.filesize / 1048576).toFixed(1)
                    : (item?.filesize / 1048576).toFixed(2)}
                  MB
                </Text>
                <Checkbox
                  value={check.container === item?.quality}
                  onValueChange={() =>
                    handleCheck(
                      "audio",
                      item.quality,
                      item.id,
                      item.url,
                      item.filesize,
                    )
                  }
                  className='rounded-full'
                />
              </View>
            </Pressable>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit(check)}
        className='w-[95%] mx-2 py-3 px-[1px] flex-row justify-center items-center bg-gray-200 rounded-3xl'
      >
        <Text className='font-[500] text-[15px]'>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 8,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 15,
    color: "#4A4A4A",
    marginRight: 8,
  },
  downloadButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A4A4A",
  },
});

export default Options;
