import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from './screens/ContactListScreen';
import CreateContactScreen from './screens/CreateContactScreen';
import UpdateContactScreen from './screens/UpdateContactScreen';
import FavoriteContactListScreen from './screens/FavoriteContactListScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{ title: 'Contact List' }} />
        <Stack.Screen name="CreateContact" component={CreateContactScreen} options={{ title: 'Add New Contact' }} />
        <Stack.Screen name="UpdateContact" component={UpdateContactScreen} options={{ title: 'Update Contact' }} />
        <Stack.Screen name="FavoriteContactList" component={FavoriteContactListScreen} options={{ title: 'Favorite Contact List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
