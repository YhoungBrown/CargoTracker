import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';
import { baseUrl } from '../env/codeDefinition';
import { ApiKey } from '../env/env';
import ModalScreen from '../screens/ModalScreen';
import SingleOrderScreen from '../screens/SingleOrderScreen';
import utilities from '../tailwind.json';
import TabNavigator from './TabNavigator';





export type StackParamList = {
  Main : undefined,
  MyModal: {userId: string; name: string},
  SingleOrder: {Order : Order}
}



const client = new ApolloClient({
   uri: baseUrl,
  headers: {
    Authorization: ApiKey, 
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