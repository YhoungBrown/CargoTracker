import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';
import TabNavigator from './TabNavigator';





export type StackParamList = {
  Main : undefined,
  MyModal: {userId: string; name: string},
  Order: {order : any}
}

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    {/** @ts-ignore - TailWindProvider is mising a type definition */}
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name='Main' component={TabNavigator} options={{headerShown: false}}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  </SafeAreaProvider>
  )
}

export default StackNavigator