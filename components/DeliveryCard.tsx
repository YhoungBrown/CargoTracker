import { View, Text } from 'react-native'
import React from 'react'

 type prop = {
  order: Order
 }

const DeliveryCard = ({order}: prop) => {
  return (
    <View>
      <Text>DeliveryCard</Text>
    </View>
  )
}

export default DeliveryCard