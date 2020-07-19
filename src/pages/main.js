import React, { Component } from 'react';

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import api from '../services/api';

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;
    this.setState({
      productInfo,
      products: [...this.state.products, ...docs],
      page,
    });
  };

  loadMore = () => {
    const { page, productInfo } = this.state;
    if (productInfo.pages === page) return;

    const nextPageNumber = page + 1;
    this.loadProducts(nextPageNumber);
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemDescription}>{item.description}</Text>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Product', { product: item })
          }
          style={styles.listItemButton}>
          <Text>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    this.loadProducts();
  }

  render() {
    const { products } = this.state;
    return (
      <View>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={this.renderItem}
          style={styles.list}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#5c5c5c',
    padding: 5,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#2d3436',
    borderRadius: 15,
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItemDescription: {
    color: '#2c2c2c',
    lineHeight: 25,
  },
  listItemButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#2d3436',
    borderRadius: 5,
    marginTop: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
