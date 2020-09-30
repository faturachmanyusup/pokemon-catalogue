import axios from 'axios';

export function defineColor(type) {
  let backgroundColor = '';
  
  switch (type) {
    case 'Fire':
      backgroundColor = '#FF7A00'
      break;
    case 'Bug':
      backgroundColor = '#9DB540';
      break;
    case 'Poison':
      backgroundColor = '#AA22B0';
      break;
    case 'Grass':
      backgroundColor = '#8BC34A';
      break;
    case 'Flying':
      backgroundColor = '#CC9CF7';
      break;
    case 'Water':
      backgroundColor = '#2BC3FF';
      break;
    case 'Normal':
      backgroundColor = '#A8A878';
      break;
    case 'Ground':
      backgroundColor = '#E0C068';
      break;
    case 'Ghost':
      backgroundColor = '#705898';
      break;
    case 'Steel':
      backgroundColor = '#141518';
      break;
    case 'Psychic':
      backgroundColor = '#F85888';
      break;
    case 'Electric':
      backgroundColor = '#F8D030';
      break;
    case 'Ice':
      backgroundColor = '#98D8D8';
      break;
    case 'Dark':
      backgroundColor = '#705848';
      break;
    case 'Fighting':
      backgroundColor = '#C03028';
      break;
    case 'Rock':
      backgroundColor = '#B8A038';
      break;
    case 'Fairy':
      backgroundColor = '#F7A09F';
      break;
    case 'Dragon':
      backgroundColor = '#7038F8';
      break;
    default:
      backgroundColor = '#fff'
      break;
  }

  return {
    backgroundColor,
  }
}

export function fetch(params) {
  return new Promise((resolve) => {
    axios.post("https://pokemon-fclzip.pahamify.com/", {
      query: params.query,
      variables: params.payload
    })
    .then(res => {
      resolve(res.data.data);
    })
    .catch(e => console.log(e));
  })
}