import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from 'expo-router';
import { StatusBar } from "react-native";
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Catogaries from './Catogaries';
import axios from 'axios';
import Recipes from './Recipes';


interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function Home() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState<Meal[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');  
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);  

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  }, [searchTerm, meals]);

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
    setMeals([]);
    getRecipes(category);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('error:', err.message);
      } else {
        console.log('An unexpected error occurred');
      }
    }
  };

  const getRecipes = async (category = activeCategory) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        setMeals(response.data.meals);
        setFilteredMeals(response.data.meals); // Set filtered meals initially
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('error:', err.message);
      } else {
        console.log('An unexpected error occurred');
      }
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={tw`mb-6 pt-14`}
      >
        <View style={tw`mx-4 flex-row justify-between items-center mb-2`}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={{ width: hp(5), height: hp(5.5), borderRadius: hp(2.5), overflow: 'hidden' }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>
        <View style={tw`mx-2 mb-2 mt-2`}>
          <Text style={[tw`text-neutral-600 font-bold`, { fontSize: hp(1.7) }]}>Hello, Arya!</Text>
          <View>
            <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600`]}>Bring the sizzle to your kitchen,</Text>
          </View>
          <Text style={[{ fontSize: hp(3.8) }, tw`font-semibold text-neutral-600`]}>enjoy food at<Text style={tw`text-amber-400 mx-3`}>home.</Text></Text>
        </View>
        <View style={tw`mx-4 flex-row items-center mt-2 rounded-full bg-black/5 p-[6px]`}>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={[{ fontSize: hp(1.7) }, tw`flex-1 mx-2 rounded-full text-base mb-1 pl-3 tracking-wider`]}
            value={searchTerm}  // Bind searchTerm to TextInput
            onChangeText={(text) => setSearchTerm(text)}  // Update searchTerm when text changes
          />
          <View style={tw`bg-white rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>
        <View>
          {categories.length > 0 && <Catogaries categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>
        <View>
          <Recipes meals={filteredMeals} categories={categories} />  
        </View>
      </ScrollView>
    </View>
  );
}
