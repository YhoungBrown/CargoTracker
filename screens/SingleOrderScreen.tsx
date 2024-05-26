import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import DeliveryCard from '../components/DeliveryCard';
import { StackParamList } from '../rootNav/StackNavigator';
import { TabStackParamList } from '../rootNav/TabNavigator';


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
