import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { categoryData } from '@/constants/Catogarydummy';

const AView = Animated.View;


type Category = {
  strCategory: string;
  strCategoryThumb: string;
};

interface CategoriesProps {
  activeCategory: string;
  categories: Category[]; 
  handleChangeCategory: (category: string) => void;
}

export default function Catogaries({ activeCategory,handleChangeCategory,categories}: CategoriesProps) {
  return (
    <AView entering={FadeInDown.duration(500)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mx-4`}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';

          return (
            <Pressable
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={tw`flex items-center mt-2  mb-1`}
            >
              <View style={tw.style(`rounded-full mt-2 mx-2 p-[4px]`, activeButtonClass)}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={[{ width: hp(9), height: hp(9) }, tw`rounded-full`]}
                />
              </View>
              <Text style={[tw`text-neutral-600`, { fontSize: hp(1.6) }]}>
                {cat.strCategory}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </AView>
  );
}
