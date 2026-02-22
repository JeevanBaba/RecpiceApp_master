import { View, Text, Image } from 'react-native'; 
import React, { useEffect } from 'react';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from './types'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 

const AView = Animated.View;

export default function Index() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(() => withSpring((ring1padding.value = ring1padding.value + hp(5))), 100);
    setTimeout(() => withSpring((ring2padding.value = ring2padding.value + hp(5.5))), 300);

    setTimeout(() => navigation.navigate('Home'), 2500); 
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-amber-500`}>
      <AView style={[tw`bg-white/20 rounded-full  mb-10`, { padding: ring2padding }]}>
        <AView style={[tw`bg-white/20 rounded-full `, { padding: ring1padding }]}>
          <Image source={require('../assets/images/welcome.png')} style={{ width: hp(20), height: hp(20) }} />
        </AView>
      </AView>
      <View style={tw`flex items-center mb-2`}>
        <Text style={[tw`font-bold text-white tracking-widest mb-2 text-6xl`, { fontSize: hp(7) }]}>Sizzle</Text>
        <Text style={[tw`font-medium text-white tracking-widest text-lg`, { fontSize: hp(2) }]}>Savor the Flavor</Text>
      </View>
    </View>
  );
}
