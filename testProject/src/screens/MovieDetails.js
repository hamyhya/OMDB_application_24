import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MovieDetails = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Image
        source={{ uri: movie.Poster }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.detail}>Year: {movie.Year}</Text>
      <Text style={styles.detail}>Type: {movie.Type}</Text>
      <Text style={styles.detail}>IMDb ID: {movie.imdbID}</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    width: '100%',
    height: '30%',
    backgroundColor: '#C70039'
  },
  poster: {
    width: '35%',
    height: 200,
    borderRadius: 10,
    marginTop: '-20%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#fff'
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff'
  },
});
