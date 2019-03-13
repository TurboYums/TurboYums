import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';

export default class App extends Component {
API_URL = 'http://172.31.254.237:5000/'
handleGet = async () => {
  fetch(API_URL + 'api/hello', {
      method: 'get',
      header: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then((responseJson) => {
      Alert.alert("message  " + responseJson.express);
    })
  .then(data => {
    console.log(data) // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error))
}

handlePost = async () => {
  fetch('http://172.31.254.237:5000/api/world', {
      method: 'post',
      header: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then((responseJson) => {
      Alert.alert("message  " + responseJson.text);
    })
  .then(data => {
    console.log(data) // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error))
}


  render(){
  return(
     <View style={{paddingTop: 50, paddingLeft: 50 }}>
    <TouchableOpacity onPress={this.handleGet.bind(this)}>
    <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click to test get </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.handlePost.bind(this)}>
    <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click to test post </Text>
    </TouchableOpacity>
    </View>
  );
}
}
