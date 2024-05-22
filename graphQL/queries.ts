import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
query getCustomers {
  getCustomers {
    name
    value {
      email
      name
    }
  }
}
`

//console.log(JSON.stringify(GET_CUSTOMERS));
//console.log(GET_CUSTOMERS.loc.source.body)


export const GET_ORDERS = gql`
  query getOrders {
  getOrders {
    value {
      Address
      City
      carrier
      createdAt
      lat
      long
      shippingCost
      trackingId
      trackingItems {
        customer_id
        customer {
          email
          name
        }
        items {
          quantity
          price
          name
          item_id
        }
      }
    }
  }
}`