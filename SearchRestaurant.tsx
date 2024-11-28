import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import api from './api';

export default function SearchRestaurant({ navigation }: any) {
    const [restaurants, setRestaurants] = useState([]);
    const [query, setQuery] = useState('');

    const fetchRestaurants = async () => {
    try {
      const response = await api.get(`/restaurant/search/?query=${query}`);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error searching restaurants:', error);
    }
    };

    useEffect(() => {
      fetchRestaurants()
    }, []);

  const renderRestaurant = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.restaurantContainer}
      onPress={() =>
        navigation.navigate('Food', { restaurantName: item.RestaurantName })
      }
    >
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.RestaurantImage}` }}
        style={styles.image}
      />
      <View>
        <Text>Name:</Text>
        <Text style={styles.text}>{item.RestaurantName}</Text>
        <Text>Coordinates:</Text>
        <Text style={styles.text}>{item.RestaurantLatitude},{item.RestaurantLongitude}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search restaurants..."
        value={query}
        onChangeText={setQuery}
        
      />
      <Button title="Search" onPress={fetchRestaurants} />
      <View style={styles.lists}>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.RestaurantID.toString()}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lists:{
    flex: 1,
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  restaurantContainer: {
    columnGap: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
