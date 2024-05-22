import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomerScreen from '../screens/CustomerScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { Icon } from '@rneui/themed';



export type TabStackParamList = {
    Customer: undefined,
    Orders: undefined
}

const Tab = createBottomTabNavigator<TabStackParamList>();


const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarActiveTintColor: "#59C1CC",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({focused}) => {
            if(route.name === 'Customer'){
                return (
                    <Icon 
                        name='users'
                        type='entypo'
                        color={focused ? "#59C1CC" : "gray"}
                    />
                )
            } else if (route.name === 'Orders') {
                return(
                    <Icon 
                        name='box'
                        type='entypo'
                        color={focused ? "#EB6A7C" : "gray"}
                    />
                )
            }
        }
    })}>
      <Tab.Screen name="Customer" component={CustomerScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator