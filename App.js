import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import ManageExpenses from './screens/ManageExpenses'
import RecentExpenses from './screens/RecentExpenses'
import AllExpenses from './screens/AllExpenses'
import { GlobalStyles } from './constants/styles'
import IconButton from './components/UI/IconButton'
import ExpensesContextProvider from './store/expenses-context'

const Stack = createStackNavigator()
const BottomStack = createBottomTabNavigator()

const BottomStackNavigatior = () => {
  return (
    <BottomStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton name={'add'} color={tintColor} size={24} onPress={() => navigation.navigate('MangeExpense')} />
          )
        },
      })}
    >
      <BottomStack.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ size, color }) => {
            return (
              <>
                <Ionicons name="hourglass" size={size} color={color} />
              </>
            )
          },
        }}
      />
      <BottomStack.Screen
        name="AllExpense"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="calendar" color={color} size={size} />
          },
        }}
      />
    </BottomStack.Navigator>
  )
}

export default function App() {
  return (
    <>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={BottomStackNavigatior}
              options={{ title: 'Overview', headerShown: false }}
            />
            <Stack.Screen name="MangeExpense" component={ManageExpenses} options={{ presentation: 'modal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}
