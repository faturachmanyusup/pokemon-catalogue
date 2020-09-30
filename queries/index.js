export const pokemons = `
  query($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }`

export const pokemon = `
  query($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      types
      image
      evolutions {
        id
        name
        types
        image
        number
      }
      classification
      resistant
    }
  }`