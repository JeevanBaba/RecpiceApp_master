import { View, ScrollView, Image, Pressable, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { ChevronLeftIcon, ClockIcon, UsersIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: string | undefined;
};

export default function RecipeDetails() {
  const { strMeal, strMealThumb, idMeal } = useLocalSearchParams();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const navigation = useNavigation();
  const [mealData, setMealData] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const mealName = Array.isArray(strMeal) ? strMeal[0] : strMeal;
  const mealThumb = Array.isArray(strMealThumb) ? strMealThumb[0] : strMealThumb;
  const mealId = Array.isArray(idMeal) ? idMeal[0] : idMeal;

  useEffect(() => {
    if (mealId) {
      getMealData(mealId);
    }
  }, [mealId]);

  const getMealData = async (id: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMealData(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Error:', err.message);
      } else {
        console.log('An unexpected error occurred');
      }
    }
  };

  const getIngredientsIndexes = (meal: Meal | null) => {
    if (!meal) return [];
    const indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}` as keyof Meal]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const ingredientsIndexes = getIngredientsIndexes(mealData);

  const getYoutubeVideoId = (url: string | undefined) => {
    if (!url) return undefined;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : undefined;
  };
  
  const splitInstructions = (instructions: string | undefined) => {
    if (!instructions) return [];
    return instructions.split('.').filter(step => step.trim() !== '');
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={tw`flex-row justify-center`}>
        <Image
          source={{ uri: mealThumb }}
          style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
          resizeMode="cover"
        />
      </View>

      <View style={tw`w-full absolute flex-row justify-between items-center pt-10`}>
        <Pressable onPress={() => navigation.goBack()} style={tw`p-2 rounded-full ml-5 bg-white`}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </Pressable>

        <Pressable 
          onPress={() => setIsFavourite(!isFavourite)}  
          style={tw`p-2 rounded-full mr-5 bg-white`}
        >
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
        </Pressable>
      </View>

      <View style={tw`px-4 flex justify-between pt-8`}>
        <View style={tw`mb-4`}>
          <Text style={[{ fontSize: hp(3) }, tw`font-bold text-neutral-700`]}>
            {mealData?.strMeal}
          </Text>
          <Text style={tw`text-lg text-neutral-500`}>Origin: {mealData?.strArea}</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-around`}>
        <View style={tw`flex items-center rounded-full bg-amber-300 p-2`}>
          <View style={[tw`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
            <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
          </View>
          <View style={tw`flex items-center py-2`}>
            <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700`]}>35</Text>
            <Text style={[{ fontSize: hp(1.3) }, tw`font-bold text-neutral-500`]}>Mins</Text>
          </View>
        </View>
        <View style={tw`flex items-center rounded-full bg-amber-300 p-2`}>
          <View style={[tw`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
            <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
          </View>
          <View style={tw`flex items-center py-2`}>
            <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700`]}>03</Text>
            <Text style={[{ fontSize: hp(1.3) }, tw`font-bold text-neutral-500`]}>Servings</Text>
          </View>
        </View>
        <View style={tw`flex items-center rounded-full bg-amber-300 p-2`}>
          <View style={[tw`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
            <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
          </View>
          <View style={tw`flex items-center py-2`}>
            <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700`]}>103</Text>
            <Text style={[{ fontSize: hp(1.3) }, tw`font-bold text-neutral-500`]}>Cal</Text>
          </View>
        </View>
        <View style={tw`flex items-center rounded-full bg-amber-300 p-2`}>
          <View style={[tw`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
            <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
          </View>
          <View style={tw`flex items-center py-2`}>
            <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700`]}>Easy</Text>
          </View> 
        </View>
      </View>

      <View style={tw`px-4 py-8`}>
        <Text style={[{ fontSize: hp(2.5) }, tw`font-bold text-neutral-700 mb-4`]}>Ingredients</Text>
      </View>

      <View style={tw` ml-3`}>
        {ingredientsIndexes.map((i) => (
          <View key={i} style={tw`flex-row items-center`}>
            <View
              style={[
                { height: hp(1.5), width: hp(1.5) },
                tw`bg-amber-300 rounded-full mr-4`,
              ]}
            />
            <View style={tw`flex-row`}>
              <Text style={[tw`font-extrabold text-neutral-700 mr-4`, { fontSize: hp(2) }]}>
                {mealData?.[`strMeasure${i}`]}
              </Text>
              <Text style={[tw`font-extrabold text-neutral-600`, { fontSize: hp(1.7) }]}>
                {mealData?.[`strIngredient${i}`]}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={tw`px-4 py-8`}>
        <Text style={[{ fontSize: hp(2.5) }, tw`font-bold text-neutral-700 mb-4`]}>Instructions</Text>
        {splitInstructions(mealData?.strInstructions).map((step, index) => (
          <Text key={index} style={[{ fontSize: hp(2) }, tw`text-neutral-600 leading-7 mb-2`]}>
            {index + 1}. {step.trim()}.
          </Text>
        ))}
      </View>

      <View style={tw`px-4 py-8`}>
        <Text style={[{ fontSize: hp(2.5) }, tw`font-bold text-neutral-700 mb-4`]}>Watch the Recipe</Text>
        {mealData?.strYoutube && (
          <View style={tw`flex-row justify-center`}>
            <YoutubeIframe
              height={hp(40)}
              videoId={getYoutubeVideoId(mealData?.strYoutube)}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
