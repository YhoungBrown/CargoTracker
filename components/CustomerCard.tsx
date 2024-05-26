import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen';

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = (props:Props) => {
  const { userId, name, email } = props
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyModal', { name, userId })}>
      <Card containerStyle={{ borderRadius: 8, padding: 20 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 24, lineHeight: 32 }}>{name}</Text>
              <Text style={{ fontSize: 14, color: "#59C1CC" }}>ID: {userId}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: "#59C1CC" }}>{loading ? "loading..." : `${orders.length}x`}</Text>
              <Icon
                style={{ marginLeft: 'auto', marginBottom: 20 }}
                name='box'
                type='entypo'
                color={"#59C1CC"}
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
