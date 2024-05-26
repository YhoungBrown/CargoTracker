import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Image } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OrderCard from '../components/OrderCard';
import useOrders from '../hooks/useOrders';
import { StackParamList } from '../rootNav/StackNavigator';
import { TabStackParamList } from '../rootNav/TabNavigator';


//type OrderScreenRouteProp = RouteProp<TabStackParamList, 'Orders'>;


export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<StackParamList>
>;

const OrdersScreen = () => {
  const {loading, error, orders} = useOrders();
  const [ascending, setAsending] = useState <boolean>(false)

  const navigation = useNavigation<OrderScreenNavigationProp>();

  const safeAreaTop = { paddingTop: useSafeAreaInsets().top };

  const sortedorder = orders?.sort((a, b) => {
    if (ascending) {
      return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
    } else {
      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
    }
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({focused, color}) => (
        <Text style={{color: focused ? "#EB6A7C" : color, fontSize: 10}}>Orders</Text>
      )
    })
  }, [])
  return (
    <ScrollView style={{backgroundColor: "#EB6A7C"}}>
      <Image
        containerStyle={{width: "100%", height:256}}
        source={{uri: "https://links.papareact.com/m51"}}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View style={{paddingVertical: 8, paddingHorizontal: 20}}>
        <Button
        color={"pink"}
        titleStyle={{color: "gray", fontWeight: 400}}
        onPress={() => setAsending(!ascending)}
        >
          {ascending ? "Showing: Oldest First" : "Showing : Most Recent First" }
        </Button>

        {sortedorder?.map(order => (
          <OrderCard key={order.trackingId} item={order} />
        ))}
      </View>
    </ScrollView>
  )
}

export default OrdersScreen