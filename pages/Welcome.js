import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  ImageBackground,
  Alert
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const image = {uri: "https://cdn.bulbagarden.net/upload/a/a7/PSMD_poster.png"};

export default function Welcome({ navigation }) {
  const [limit, setLimit] = useState('');

  function handleChange(inp) {
    setLimit(inp);
  }
  
  function handleInput() {
    if (isNaN(limit)) {
      Alert.alert(
        "Wrong format",
        "input value must be number",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    } else {
      navigation.navigate('Home', {limit});
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.background} imageStyle={{opacity: 0.6}}>
        <View style={styles.card}>
          <Text style={styles.welcome}>Welcome To</Text>
          <Text style={styles.logo}>Pokemon Center</Text>
          <Text style={styles.labelInput}>Enter the number of pokemons you want to see</Text>
          <View style={styles.form}>
            <TextInput
              placeholder='70'
              onChangeText={value => handleChange(value)}
              textAlign='center'
            />
          </View>
          <Button onPress={() => handleInput()} title="Enter" />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  form:{
    width: screenWidth / 100 * 50,
    height: screenHeight / 100 * 5,
    backgroundColor: 'rgba(191, 191, 191, 1)',
    borderRadius: 25,
    marginBottom: '8%',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: screenHeight / 100 * 5,
    color: '#fb5b5a',
    marginBottom: '5%'
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: screenHeight / 100 * 3
  },
  labelInput: {
    fontSize: screenHeight / 100 * 2,
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    textAlign: 'center',
    marginVertical: '3%',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 241, 239, 1)',
    paddingVertical: '15%',
    borderRadius: 20
  }
})