import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import { Home, PokemonInfo, Welcome } from './pages';
import { defineColor } from './helpers';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function HeaderDetail({number, name, type}) {
  return (
    <View style={[defineColor(type), styles.pokemonInfo]}>
      <Text style={styles.headerTitleStyle}>{name}</Text>
      <Text style={styles.headerTitleStyle}>{`#${number}`}</Text>
    </View>
  )
}

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: 'Pokemon Center',
            headerStyle: [styles.header, {backgroundColor: '#E51C23'}],
            headerTitleStyle: styles.headerTitleStyle
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Pokemon Center',
            headerStyle: [styles.header, {backgroundColor: '#E51C23'}],
            headerTitleStyle: styles.headerTitleStyle
          }}
        />
        <Stack.Screen
          name="PokemonInfo"
          component={PokemonInfo}
          options={({ route }) => ({
            headerTitle: () => <HeaderDetail {...route.params} />,
            headerStyle: [styles.header, defineColor(route.params.type)],
            headerTintColor: '#fff'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: screenHeight / 100 * 12
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: screenWidth / 100 * 5,
    color: '#fff'
  },
  pokemonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
