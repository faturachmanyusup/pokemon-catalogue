import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { pokemons } from '../queries';
import { defineColor, fetch } from '../helpers';

const cardWidth = (Dimensions.get('window').width - 15) / 3;
const cardHeight = (Dimensions.get('window').height - 20) / 5;
const screenWidth = Dimensions.get('window').width;

export default function Home({navigation, route}) {
  const [pokemonsList, setPokemonsList] = useState([]);

  useEffect(() => {
    fetch({query: pokemons, payload: {first: route.params.limit}})
    .then(list => setPokemonsList(list.pokemons))
    .catch(e => console.log(e));
  }, []);

  function handleNavigate(id, name, type, number) {
    navigation.navigate('PokemonInfo', {id, name, type, number});
  }
  
  if(pokemonsList.length < 1) {
    return (
      <View style={[styles.vertical, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
        {pokemonsList.map(pokemon => {
          return (
            <TouchableOpacity
              key={pokemon.id}
              style={styles.card}
              onPress={() => handleNavigate(pokemon.id, pokemon.name, pokemon.types[0], pokemon.number)}
            >
              <Text style={styles.textNumber}>{`#${pokemon.number}`}</Text>
              <Image source={{uri: pokemon.image}} style={styles.cardImage} />
              <Text style={styles.pokemonName}>{pokemon.name}</Text>
              <View style={styles.cardFooter}>
                {pokemon.types.map((type, idx) => {
                  return (
                    <View style={[defineColor(type), styles.type]} key={idx}>
                      <Text style={styles.typeName}>{type}</Text>
                    </View>
                  )
                })}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'scroll',
  },
  card: {
    justifyContent: 'center',
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#fff',
    marginVertical: '2%',
    paddingHorizontal: '2%',
    paddingVertical: '1%'
  },
  pokemonName: {
    textAlign: 'center',
    fontSize: screenWidth / 100 * 4,
    marginVertical: '6%'
  },
  cardImage: {
    height: '40%',
    width: '40%',
    alignSelf: 'center'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  typeName: {
    color: '#fff',
    fontSize: screenWidth / 100 * 2,
  },
  textNumber: {
    color: '#7E94B3',
    fontSize: screenWidth / 100 * 3,
    marginLeft: '5%'
  },
  type: {
    borderRadius: 50,
    paddingVertical: '3%',
    paddingHorizontal: '10%'
  },
  vertical: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
  },
});
