import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { pokemon } from '../queries';
import { defineColor, fetch } from '../helpers';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').height;

export default function PokemonInfo({navigation, route}) {
  const [pokemonData, setPokemonData ] = useState(null);
  
  useEffect(() => {
    fetch({query: pokemon, payload: {id: route.params.id}})
    .then(pokemon => setPokemonData(pokemon.pokemon))
    .catch(e => console.log(e));
  }, []);

  function getPokemon(id, name, type, number) {
    navigation.push('PokemonInfo', {id, name, type, number});
  }
  
  function toString(arr) {
    return arr.map((type, idx) => {
      return type + (arr.length > 1 && idx !== arr.length - 1 ? ', ' : ' ');
    });
  }

  if(!pokemonData) {
    return (
      <View style={[styles.vertical, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{uri: pokemonData.image}} style={styles.image}/>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Types</Text>
          <Text style={styles.detailValue}>{toString(pokemonData.types)}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Classification</Text>
          <Text style={styles.detailValue}>{pokemonData.classification}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Resistant</Text>
          <Text style={styles.detailValue}>{toString(pokemonData.resistant)}</Text>
        </View>
        {pokemonData.evolutions &&
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Evolution</Text>
            {pokemonData.evolutions.map(pokemon => {
              return (
                <TouchableOpacity 
 
 
                  style={styles.card}
                  key={pokemon.id}
                  onPress={() => getPokemon(pokemon.id, pokemon.name, pokemon.types[0], pokemon.number)}
                >
                  <Image source={{uri: pokemon.image}} style={styles.cardImage}/>
                  <View style={styles.cardDetail}>
                    <Text style={{marginBottom: '5%', fontSize: screenHeight / 100 * 3}}>{`#${pokemon.number} - ${pokemon.name}`}</Text>
                    <View style={styles.cardTypes}>
                      {pokemon.types.map((type, idx)=> {
                        return (
                          <View key={idx} style={[defineColor(type), styles.type]}>
                            <Text style={{fontSize: screenHeight / 100 * 2}}>{type}</Text>
                          </View>
                        )
                      })}
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7FA',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  image: {
    height: screenHeight / 100 * 18,
    width: screenHeight / 100 * 18,
    borderRadius: 50,
    marginVertical: '5%'
  },
  details: {
    width: '100%',
    alignSelf: 'flex-start',
    paddingBottom: '7%',
    borderBottomColor: '#7E94B3',
    borderBottomWidth: 1,
    marginBottom: '10%'
  },
  detailLabel: {
    fontSize: screenHeight / 100 * 3,
    marginBottom: '3%',
    color: '#7E94B3',
    fontWeight: 'bold'
  },
  detailValue: {
    fontSize: screenHeight / 100 * 3,
    color: '#40577B'
  },
  vertical: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#E0E8F3',
    width: '100%',
    marginVertical: '2%',
    paddingHorizontal: '3%',
    paddingVertical: '3%'
  },
  cardImage: {
    height: screenWidth / 100 * 10,
    width: screenWidth / 100 * 10,
    borderRadius: 50
  },
  cardDetail: {
    flexDirection: 'column',
    marginHorizontal: '5%',
  },
  cardTypes: {
    flexDirection: "row",
    marginRight: '3%'
  },
  type: {
    borderRadius: 50,
    paddingVertical: '1%',
    paddingHorizontal: '10%',
    marginRight: '5%'
  }
})