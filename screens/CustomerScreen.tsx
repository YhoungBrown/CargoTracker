import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../rootNav/TabNavigator';
import { StackParamList } from '../rootNav/StackNavigator';
import { Image, Input } from '@rneui/themed';
import { gql, useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphQL/queries';
import CustomerCard from '../components/CustomerCard';
//import consoleOveride from '../consoleOverride/consoleOverride';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customer">,
  NativeStackNavigationProp<StackParamList>
>;


const CustomerScreen = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS); 
  console.log(data)

  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>('');

  const safeAreaTop = { paddingTop: useSafeAreaInsets().top };
  const safeAreaBottom = { paddingBottom: useSafeAreaInsets().bottom };

  return (
    <ScrollView style={{backgroundColor: "#59C1CC"}}>
      <Image 
          source={{uri: "http://links.papareact.com/3jc"}}
          containerStyle={{height: 250, width: "100%"}}
          PlaceholderContent={<ActivityIndicator />}
      />

      <Input 
        placeholder='Search by Customer' 
        value={input}
        onChangeText={setInput} //same as (text) => setinput(text)
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Check if data exists, then map over the customers
        data?.getCustomers.map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard 
            key={ID}
            email={email}
            name={name}
            userId={ID}
          />
        )) 
      )}
    </ScrollView>
  );
}

export default CustomerScreen;
