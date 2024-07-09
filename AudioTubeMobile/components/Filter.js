import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Filter = ({
  catagories,
  search,
  setSearch,
  catagoryId,
  setCatagoryId,
}) => {
  return (
    <View className='w-[100%] p-1 justify-evenly items-center'>
      <View className='w-[100%] p-1 flex-row '>
        <TextInput
          className='input w-[85%] p-1.5 px-3 border-l  border-y border-gray-300 rounded-l-3xl'
          placeholder='Search'
          onChangeText={setSearch}
          value={search}
        />
        <Pressable
          className='px-3  justify-center items-center bg-gray-200 border border-r border-gray-300 rounded-r-3xl'
          onPress={() => console.log("Search")}
        >
          <Ionicons name='search' size={24} color='black' />
        </Pressable>
      </View>

      <View className='w-[100%] p-1 space-x-2 flex-row '>
        {catagories.map((tag) => (
          <Text
            className={`text-[13px] text-gray-600 ${
              catagoryId === tag.catagoryId && "bg-gray-200"
            } w-[70px] text-center py-1.5 rounded-3xl border border-gray-300`}
            onPress={() => setCatagoryId(tag.catagoryId)}
            key={tag.catagoryId}
          >
            {tag.tag}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Filter;
