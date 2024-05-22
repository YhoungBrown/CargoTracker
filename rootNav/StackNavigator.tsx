import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';
import TabNavigator from './TabNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphQL/queries';





export type StackParamList = {
  Main : undefined,
  MyModal: {userId: string; name: string},
  Order: {Order : any}
}

// const client = new ApolloClient({
//   uri: 'https://dashboard.stepzen.com/explorer?endpoint=api%2Fgetting-started',
//   cache: new InMemoryCache(),
// });


const client = new ApolloClient({
   uri: 'https://matane.stepzen.net/api/getting-started/__graphql',
  // uri: 'https://dashboard.stepzen.com/explorer?endpoint=api%2Fgetting-started',
  headers: {
    Authorization: 'APIKey matane::stepzen.net+1000::18f4a7b5cc10ec75387dc25d68614b9a7691b601c5ffea36229b13f3a1f7b1e6', // Replace 'YOUR_API_KEY_HERE' with your actual API key
  },
  cache: new InMemoryCache(),
});




//note apollo provider is for connecting our graphql to our front end



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    {/** @ts-ignore - TailWindProvider is mising a type definition */}
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name='Main' component={TabNavigator} options={{headerShown: false}}/>
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  </SafeAreaProvider>
  )
}

export default StackNavigator