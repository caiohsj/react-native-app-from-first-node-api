import React from 'react';
import { WebView } from 'react-native-webview';

const Product = (navigation) => {
  const { product } = navigation.route.params;
  return <WebView source={{ uri: product.url }} />;
};

export default Product;
