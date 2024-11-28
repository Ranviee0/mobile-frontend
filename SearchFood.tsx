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
import { useNavigation } from '@react-navigation/native';

type Food = {
  FoodID: number;
  FoodName: string;
  FoodPrice: number;
  FoodImage: string;
};

export default function SearchFood({ route }: any) {
  const { restaurantName } = route.params;
  const [foods, setFoods] = useState<Food[]>([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Food[]>([]);

  const navigation = useNavigation();

  const fetchFoods = async () => {
    try {
      const response = await api.get(`/food/search/?query=${query}&RestaurantName=${restaurantName}`);
      setFoods(response.data);
    } catch (error) {
      console.error('Error searching food:', error);
    }
  };

  useEffect(() => {
    fetchFoods()
  }, []);

  const addToCart = (item: Food) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.FoodPrice, 0);
  };

  const renderFood = ({ item }: { item: Food }) => (
    <View style={styles.foodContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.FoodImage}` }}
        style={styles.image}
      />
      <View>
        <Text style={styles.text}>{item.FoodName}</Text>
        <Text style={styles.text}>Price: ฿{item.FoodPrice}</Text>
        <View style={styles.foodData}>
            <Button title="Add to Cart" onPress={() => addToCart(item)}></Button>
        </View>
      </View>
    </View>
  );

  const renderCartItem = ({ item }: { item: Food }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>{item.FoodName}</Text>
      <Text style={styles.cartItemText}>฿{item.FoodPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search food..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={fetchFoods}
      />
      <FlatList
        data={foods}
        renderItem={renderFood}
        keyExtractor={(item) => item.FoodID.toString()}
        contentContainerStyle={styles.flatListContent}
      />
           <View style={styles.cartMenu}>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.cartItemsList}
        />
        <View style={styles.cartSummary}>
          <Text style={styles.cartTotalText}>Total: ฿{calculateTotal()}</Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                <Text style={styles.clearButtonText}>Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.clearButtonText}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    gap: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  foodData:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodContainer: {
    columnGap: 10,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 10,
  },
  cartMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
    maxHeight: 150, // Limit height for better UX
  },
  cartItemsList: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cartItemText: {
    fontSize: 14,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cartTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#007c00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 160, // Space for the bottom cart menu
  },
});
