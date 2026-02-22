import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'
import tw from 'twrnc';

type LoadingProps = React.ComponentProps<typeof ActivityIndicator>;

export default function Loading(props: LoadingProps) {
  return (
    <View style={tw`flex-1 flex justify-center items-center `}>
      <ActivityIndicator {...props}/>
    </View>
  )
}