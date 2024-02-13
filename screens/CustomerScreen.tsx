import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomerScreen = () => {
    const tw = useTailwind();

  const safeAreaTop = { paddingTop: useSafeAreaInsets().top };
  const safeAreaBottom = { paddingBottom: useSafeAreaInsets().bottom };


  return (
    <SafeAreaView style={safeAreaTop}>
      <Text style={tw("text-blue-500")}>CustomerScreen deff</Text>
    </SafeAreaView>
  )
}

export default CustomerScreen