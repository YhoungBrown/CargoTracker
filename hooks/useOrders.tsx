import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../graphQL/queries';

const useOrders = () => {
    const {loading, error, data} = useQuery(GET_ORDERS);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if(!data) return; 

        const orders: Order[] = data.getOrders.map(({value}: OrderResponse) => ({
          Address: value.Address,
          City: value.City,
          carrier: value.carrier,
          createdAt: value.createdAt,
          Lat: value.Lat,
          Lng: value.Lng,
          shippingCost: value.shippingCost,
          trackingId: value.trackingId,
          trackingItems: value.trackingItems,
        }));

        setOrders(orders);
    }, [data])
    
  return {loading, error, orders};
}

export default useOrders;