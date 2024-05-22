type Customer = {
    email: String;
    name: String;
};

type CustomerList = {
    name : ID;
    value: Customer;
};

type Order  = {
  carrier: String
  createdAt: Date
  shippingCost: Int
  trackingId: String
  Address: String
  City: String
  lat: Float
  long: Float
  trackingItems: TrackingItems
}

type OrderResponse = {
    value: Order;
}

type Items = {
    item_id: Int
    name: String
    price: Float
    quantity: Int
  }
  
  type TrackingItems = {
    customer_id: String
    items: [Items]
    customer: Customer
  }
  
  type TrackingItemsList = {
    name: ID
    value: TrackingItems
  }

  type CustomerResponse = {
    name : ID;
    value: Customer;
  }