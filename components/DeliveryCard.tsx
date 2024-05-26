import { View, Text } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';

 type prop = {
  order: Order;
  fullwidth?: boolean;
 }

const DeliveryCard = ({order, fullwidth}: prop) => {
  console.log("lat", order);
  return (
    <Card containerStyle={[
      fullwidth ? {borderRadius: 0, 
        margin: 0} : {borderRadius: 8, 
          marginVertical: 8, marginHorizontal: 0},
      {
      backgroundColor: fullwidth ? "#EB6A7C" : "#59C1CC", 
      padding:0, 
      paddingTop: 16, 
      shadowColor: "black", 
      shadowOffset: {width: 0, height: 2}, 
      shadowOpacity: 0.2, 
      shadowRadius: 4}]}>
      <View>
        <Icon name='box' type='entypo' color={"white"} size={50}/>

        <View style={{alignItems: "center", justifyContent: 'center'}}>
          <View>
            <Text style={{
              fontSize: 14, 
              lineHeight: 20, 
              textTransform: 'uppercase', 
              color: "white", 
              fontWeight: 'bold'}}>
                {order.carrier} - {order.trackingId}
            </Text>

            <Text style={{color: "white", fontSize: 18, lineHeight: 20,   fontWeight:'bold'}}> 
              Expected Delivery: {new Date(order.createdAt).  toLocaleDateString()}
            </Text>
            
            <View style={{backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10}}/>
          </View>


          <View>
            <Text style={{textAlign: 'center', color: "white", fontWeight: 'bold', marginTop: 5 , fontSize: 15, lineHeight: 24}}>
              Address: 
            </Text>
            <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', color: "white"}}>{order.Address}, {order.City}</Text>
            <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', color: "white", fontStyle: 'italic'}}>Shipping Cost: €{order.shippingCost}</Text>
          </View>
        </View>
      </View>

      <View style={{backgroundColor: "white", height: 0.5, width: "100%", marginVertical: 10}}/>

    <View style={{padding: 20}}>

      {order.trackingItems.items.map((item) => (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} key={item.item_id}>
          
            <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', color: "white", fontStyle: 'italic'}}>
              {item.name}
            </Text>
            <Text style={{fontSize: 20, lineHeight: 28, textAlign: 'center', color: "white", fontStyle: 'italic'}}>
              x{item.quantity}
            </Text>
          
        </View>
      ))}
    </View>

    <MapView 
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: order.Lat,
        longitude: order.Lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      style={{
        width: "100%",
        //flexGrow: 1,
        ...(fullwidth ? {height: "100%"} : {height: 200})
      }}
    >
      {order.Lat && order.Lng && (
        <Marker 
          coordinate={{
            latitude: order.Lat,
            longitude: order.Lng
          }}
          title='Delivery location'
          description={order.Address}
          identifier='destination'
        />
      )}
    </MapView>
    </Card>
  )
}

export default DeliveryCard