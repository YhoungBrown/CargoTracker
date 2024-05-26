import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { CompositeNavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabStackParamList } from '../rootNav/TabNavigator';
import { StackParamList } from '../rootNav/StackNavigator';
import DeliveryCard from '../components/DeliveryCard';


export type SingleOrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<StackParamList>
>;


type SingleOrderScreenRouteProp = RouteProp<StackParamList, 'SingleOrder'>;


const SingleOrderScreen = () => {
  const navigation = useNavigation<SingleOrderScreenNavigationProp>();
  const route = useRoute<SingleOrderScreenRouteProp>();


  const { params: { Order } } = route;

  
  useLayoutEffect(() => {
    navigation.setOptions({
         /** @ts-ignore*/
      headerTitle: Order?.trackingItems?.customer?.name,
      headerBackTitle: "Deliveries",
    });
  }, [navigation, Order]);

  return (
    <View style={{ marginTop: -8 }}>
      <DeliveryCard order={Order} fullwidth/>
    </View>
  );
};

export default SingleOrderScreen;
