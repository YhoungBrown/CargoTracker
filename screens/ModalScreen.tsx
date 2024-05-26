import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { StackParamList } from '../rootNav/StackNavigator';
import { TabStackParamList } from '../rootNav/TabNavigator';
import { CustomerScreenNavigationProp } from './CustomerScreen';
//import { Order } from "../"; // Adjust the import path accordingly
import DeliveryCard from '../components/DeliveryCard'; // Adjust the import path accordingly

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<StackParamList, 'MyModal'>
>;

type ModalScreenProp = RouteProp<StackParamList, 'MyModal'>;

const ModalScreen: React.FC = () => {
  const { params } = useRoute<ModalScreenProp>();
  const { name, userId } = params;
  const safeAreaTop = { paddingTop: useSafeAreaInsets().top };
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const { loading, error, orders } = useCustomerOrders(userId);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={[safeAreaTop, { paddingHorizontal: 20 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', top: 35, right:20, zIndex: 50}}>
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={{ paddingVertical: 20, borderBottomWidth: 1.5, borderColor: '#59C1CC' }}>
        <Text style={{textAlign: "center", justifyContent: "center", fontSize : 20, fontWeight: "bold", color: "#59C1CC"}}>{name}</Text>
        <Text style={{textAlign: 'center', fontSize: 14}}>Deliveries</Text>
      </View>

      <FlatList
        contentContainerStyle={{paddingBottom: 200}}
        data={orders}
        keyExtractor={(order: Order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
