import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, StyleSheet, TouchableNativeFeedback, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


const API_URL = 'http://192.168.1.23:5000/';
let currentUser = ' ';

class HomeScreen extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleusername = (text) => {
    this.setState({ username: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  login = (username, word) => {
    alert('username: ' + username + ' password: ' + password)
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg' }} style={{ width: '100%', height: '100%' }}>
            <Text style={styles.text}>
              Login with your Username and Password:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Username"
              autoCapitalize="none"
              onChangeText={this.handleusername} />

            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="   Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword} />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>{
                if(!this.state.username || !this.state.password){
                  Alert.alert('Please enter a username and password.');
                }else{
                  fetch(API_URL + 'api/users/login', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: this.state.username,
                      password: this.state.password,
                    }),
                  }).then((res) => res.json()).then(resJson => {
                    if(resJson.loginValid){
                      switch(resJson.user.accountType){
                        //employee is 0 
                        case 0:
                          currentUser = this.state.username;
                          this.props.navigation.navigate('ClockInOut');
                          break;
                        //customer is 1
                        case 1:
                          currentUser = this.state.username;
                          Alert.alert('We have not yet implemented the customer interface!');
                      }
                    }else{
                      Alert.alert('Incorrect Username or Password.');
                    }
                  });
                }
              } }>
              <Text style={styles.submitButtonText}> SUBMIT </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class ClockInOutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://cdn.shopify.com/s/files/1/2398/3757/products/Pizza-Cloth-Front_1024x1024.jpg?v=1512582067' }} style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                  fetch(API_URL + 'api/users/clockIn', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: currentUser,
                    }),
                  }).then((res) => res.json()).then(resJson => {
                    if(resJson.clockInSuccess){
                      Alert.alert("Successfully Clocked In: " + currentUser);
                    } else{
                      Alert.alert(currentUser + " is already Clocked In!");
                    }
                  });
                }
              } >
              <Text style={styles.buttonText}> Clock In </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                fetch(API_URL + 'api/users/clockOut', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: currentUser,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if(resJson.clockOutSuccess){
                    Alert.alert("Successfully Clocked Out: " + currentUser);
                  } else{
                    Alert.alert(currentUser + " is already Clocked Out!");
                  }
                });
              }
            } >
              <Text style={styles.buttonText}> Clock Out </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    ClockInOut: ClockInOutScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
  },
  text: {
    marginTop: 100,
    color: 'red',
    margin: 10,
    fontSize: 20,
  },
  input: {
    margin: 15,
    backgroundColor: 'white',
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'black'
  },
  button: {
    marginTop: 175,
    marginLeft: 50,
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  buttonText: {
    padding: 20,
    color: 'black'
  }
})


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
