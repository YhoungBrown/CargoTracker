import { useQuery } from '@apollo/client';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn';
import CustomerCard from '../components/CustomerCard';
import { GET_CUSTOMERS } from '../graphQL/queries';
import { StackParamList } from '../rootNav/StackNavigator';
import { TabStackParamList } from '../rootNav/TabNavigator';



export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customer">,
  NativeStackNavigationProp<StackParamList>
>;

const CustomerScreen = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS); 
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>('');

  const safeAreaTop = { paddingTop: useSafeAreaInsets().top };
  const safeAreaBottom = { paddingBottom: useSafeAreaInsets().bottom };

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <Image 
          source={{ uri: "http://links.papareact.com/3jc" }}
          containerStyle={{ height: 250, width: "100%" }}
          PlaceholderContent={<ActivityIndicator />}
      />

      <Input 
        placeholder='Search by Customer' 
        value={input}
        onChangeText={setInput} // same as (text) => setInput(text)
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      {loading ? (
        <View style={{ marginTop: 3 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        data?.getCustomers
          .filter((customer: { value: { name: string } }) => customer.value.name.includes(input))
          .map(({ name: ID, value: { email, name } }: { name: string, value: { email: string, name: string } }) => (
            <CustomerCard 
              key={ID}
              email={email}
              name={name}
              userId={ID}
            />
          ))
      )}
      <View style={{ marginTop: 15 }}/>
    </ScrollView>
  );
};

export default CustomerScreen;
