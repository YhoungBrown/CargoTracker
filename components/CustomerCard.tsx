import { View, Text } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders'
import { useTailwind } from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen'

type props = {
    userId: String,
    name: String,
    email: String,
}

const CustomerCard = (props: props) => {
    const {userId, name, email} = props
    const {loading, error, orders } = useCustomerOrders(userId)
    const tw = useTailwind();

    const navigation = useNavigation<CustomerScreenNavigationProp>();
  return (
    <View>
      <Text>CustomerCard</Text>
    </View>
  )
}

export default CustomerCard