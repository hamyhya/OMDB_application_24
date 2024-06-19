import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('love');
  const [noMovie, setNoMovie] = useState(true);

  const fetchMovie = () => {
    setLoading(true)
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=${process.env.EXPO_PUBLIC_OMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          console.log(data.Search)
          setMovies(data.Search);
          setNoMovie(false)
        } else {
          setMovies([]);
          setNoMovie(true)
        }
        setLoading(false);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Failed to fetch movie',
          topOffset: 60
        });
        setLoading(false);
        console.log(error)
      });
  }

  useEffect(() => {
    fetchMovie()
  }, []);

  // Function to chunk movies into rows of 3
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
  };

  // Group movies into rows of 3
  const moviesInRows = chunkArray(movies, 3);

  return (
    <>
      <View style={styles.container}>
      <Toast/>
        <View style={styles.searchBarWrapper}>
          <TextInput onChangeText={setSearch} placeholder='Search titles...' style={styles.searchBar} />
          <TouchableOpacity disabled={search.length === 0} onPress={fetchMovie} style={styles.searchBtn}>
            <Text style={styles.searchBtnTxt}>Search</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="medium" color="#fff" style={styles.loader} />
        ) : noMovie ? (
          <View style={styles.noMovieWrapper}>
            <Text style={styles.noMovie}>No results</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {moviesInRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {row.map((movie, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('MovieDetails', { movie })}>
                    <View style={styles.movieContainer}>
                      <Image
                        source={{ uri: movie.Poster }}
                        style={styles.poster}
                      />
                      <View style={styles.movieTitleWrapper}>
                        <Text style={styles.movieTitle}>{movie.Title.length > 24 ? `${movie.Title.slice(0, 24)}...` : movie.Title}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    width: screenWidth,
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  searchBtn: {
    width: screenWidth * 0.2,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#C70039",
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtnTxt: {
    color: "#fff",
    fontWeight: 'bold'
  },
  searchBar: {
    width: screenWidth * 0.7,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 5
  },
  noMovieWrapper: {
    width: '100%',
    alignItems: 'center',
    height: '90%',
    paddingTop: 5
  },
  noMovie: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  movieContainer: {
    width: screenWidth * 0.3,
    height: 190,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    paddingTop: 0,
    backgroundColor: '#C70039'
  },
  poster: {
    width: screenWidth * 0.3,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  movieTitleWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
