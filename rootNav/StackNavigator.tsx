import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';
import TabNavigator from './TabNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphQL/queries';
import { ApiKey } from '../env/env';
import { baseUrl } from '../env/codeDefinition';
import ModalScreen from '../screens/ModalScreen';
import SingleOrderScreen from '../screens/SingleOrderScreen';





export type StackParamList = {
  Main : undefined,
  MyModal: {userId: string; name: string},
  SingleOrder: {Order : Order}
}



const client = new ApolloClient({
   uri: baseUrl,
  headers: {
    Authorization: ApiKey, // Replace 'YOUR_API_KEY_HERE' with your actual API key
  },
  cache: new InMemoryCache(),
});




//note apollo provider is for connecting our graphql to our front end



const Stack = createNativeStackNavigator<StackParamList>();

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

            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen name='MyModal' component={ModalScreen} options={{headerShown: false}}/>
            </Stack.Group>

            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen name='SingleOrder' component={SingleOrderScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  </SafeAreaProvider>
  )
}

export default StackNavigator