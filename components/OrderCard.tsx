import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../rootNav/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../rootNav/StackNavigator';

export type SingleOrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<StackParamList, "SingleOrder">
>;

type Props = {
    item: Order
}

const OrderCard = ({item} : Props) => {
    const navigation = useNavigation<SingleOrderScreenNavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SingleOrder", {Order: item})}>
      <Card containerStyle={{paddingHorizontal: 10, borderRadius: 8}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
                <Icon 
                    name='truck-delivery'
                    color={"#EB6A7C"}
                    type='material-community'
                />

                <Text style={{fontSize: 8}}>{new Date(item.createdAt). toDateString()}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <Text style={{color: "#9cafa3", fontSize: 10}}>{item.carrier} - {item.trackingId}</Text>
                <Text style={{color: "#6b7280", fontSize: 15, lineHeight: 28}}>{item.trackingItems.customer.name}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14, lineHeight: 20, color: "#EB6A7C"}}>{item.trackingItems.items.length} x</Text>
                <Icon style={{marginLeft: 2}} name='box' type='feather' size={20}/>
            </View>

            <View>
                <Text>{}</Text>
            </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default OrderCard