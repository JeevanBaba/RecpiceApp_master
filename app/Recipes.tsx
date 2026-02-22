import { View, Text, Image, Pressable } from 'react-native';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { useNavigation } from 'expo-router';

type Category = {
  strMeal: string;
  strMealThumb: string;
};
interface CategoriesProps {
  meals: any[];
  categories: Category[];
}

export default function Recipes({ categories, meals }: CategoriesProps) {
  const navigation = useNavigation();
  return (
    <View style={tw`mx-4 mb-3`}>
      <Text style={[{ fontSize: hp(3) }, tw`font-semibold text-neutral-600`]}>Recipes</Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" style={tw`mt-20`} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item): string => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }: { item: any; index: number; navigation: any }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600).springify().damping(25)}
      style={tw`bg-white rounded-lg p-1`}
    >
      <Pressable
        style={[
          { width: '100%', paddingLeft: isEven ? 0 : 5, paddingRight: isEven ? 5 : 0 },
          tw`flex justify-center mb-4 gap-1`,
        ]}
        onPress={() => navigation.navigate('RecipeDetails', { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={[tw`bg-black/5`, { width: '100%', height: index % 3 ? hp(25) : hp(35), borderRadius: 35 }]}
          resizeMode="cover"
        />
        <Text style={[{ fontSize: hp(1.5) }, tw`ml-2 font-semibold text-neutral-600`]}>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
