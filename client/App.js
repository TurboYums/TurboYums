import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, StyleSheet, TouchableNativeFeedback, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


const API_URL = 'http://192.168.1.246:5000/';
let currentUser = ' ';
let token = '';

class WelcomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/splash.png')} style={{ width: '100%', height: '100%' }}>
            

          <TouchableOpacity
              style={styles.logInMenuButton}
              onPress={() =>{
                this.props.navigation.navigate('LogIn');
              }
            } >
              <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                this.props.navigation.navigate('SignUp');
              }
            } >
              <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>

          </ImageBackground>
        </View>
      </View>
    );
  }
}

class SignUpScreen extends React.Component {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    accountType: '',
    email: ''
  }
  handleusername = (text) => {
    this.setState({ username: text })
  }
  handlefirstname = (text) => {
    this.setState({ firstname: text })
  }
  handlelastname = (text) => {
    this.setState({ lastname: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  handleaccounttype = (text) => {
    this.setState({ accountType: text })
  }
  handleemail = (text) => {
    this.setState({ email: text })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg' }} style={{ width: '100%', height: '100%' }}>
            <Text style={styles.SignUpText}>
              Enter your details:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Username"
              autoCapitalize="none"
              onChangeText={this.handleusername} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   First Name"
              autoCapitalize="words"
              onChangeText={this.handlefirstname} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Last Name"
              autoCapitalize="words"
              onChangeText={this.handlelastname} />  
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="   Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Account Type (0 is Employee, 1 is Customer)"
              autoCapitalize="none"
              onChangeText={this.handleaccounttype} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Email"
              autoCapitalize="none"
              onChangeText={this.handleemail} />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>{
                if(!this.state.username || !this.state.firstname || !this.state.lastname || !this.state.password || !this.state.accountType || !this.state.email){
                  Alert.alert('Please fill in all fields');
                }else{
                  fetch(API_URL + 'api/users/create', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: this.state.username,
                      firstname: this.state.firstname,
                      lastname: this.state.lastname,
                      password: this.state.password,
                      accountType: this.state.accountType,
                      email: this.state.email,
                    }),
                  }).then((res) => res.json()).then(resJson => {
                    if(resJson.creationSuccess){
                      Alert.alert('Succesfully Created Account! Please Log In');
                      this.props.navigation.navigate('LogIn');
                    }else{
                      Alert.alert('Error Creating Account!');
                      this.props.navigation.navigate('Welcome');
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

class LogInScreen extends React.Component {
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
              onPress={() => {
                if (!this.state.username || !this.state.password) {
                  Alert.alert('Please enter a username and password.');
                } else {
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
                    if (resJson.loginValid) {
                      currentUser = resJson.user;
                      switch (resJson.user.accountType) {
                        //employee is 0 
                        case 0:
                          currentUser = this.state.username;
                          this.props.navigation.navigate('ClockInOut');
                          break;
                        //customer is 1
                        case 1:
                          this.props.navigation.navigate('Payment');
                          break;
                      }
                    } else {
                      Alert.alert('Incorrect Username or Password.');
                    }
                  });
                }
              }}>
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
              onPress={() => {
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
                  if (resJson.clockInSuccess) {
                    Alert.alert("Successfully Clocked In: " + currentUser);
                  } else {
                    Alert.alert(currentUser + " is already Clocked In!");
                  }
                });
              }
              } >
              <Text style={styles.buttonText}> Clock In </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                fetch(API_URL + 'api/users/clockOut', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: currentUser.username,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if (resJson.clockOutSuccess) {
                    Alert.alert("Successfully Clocked Out: " + currentUser.username);
                  } else {
                    Alert.alert(currentUser.username + " is already Clocked Out!");
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

class PaymentScreen extends React.Component {
  state = {
    cardNumber: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    postalCode: '',
  }
  handlecardNumber = (text) => {
    this.setState({ cardNumber: text })
    if (this.state.cardNumber.length < 16) {
    }
  }
  handleexp_month = (text) => {
    this.setState({ exp_month: text })
  }
  handleexp_year = (text) => {
    this.setState({ exp_year: text })
  }
  handlecvc = (text) => {
    this.setState({ cvc: text })
  }
  handlepostalCode = (text) => {
    this.setState({ postalCode: text })
  }
  login = (username, word) => {
    alert('username: ' + username + ' password: ' + password)
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Enter required fields:
          </Text>
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   Card Number"
            autoCapitalize="none"
            onChangeText={this.handlecardNumber} />

          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   expiration month"
            autoCapitalize="none"
            onChangeText={this.handleexp_month} />

          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   expiration year ="
            autoCapitalize="none"
            onChangeText={this.handleexp_year} />

          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   cvc"
            autoCapitalize="none"
            onChangeText={this.handlecvc} />

          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   postal code"
            autoCapitalize="none"
            onChangeText={this.handlepostalCode} />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.cardNumber || !this.state.exp_month || !this.state.exp_year || !this.state.cvc || !this.state.postalCode) {
                Alert.alert('Please enter information for all of the fields please.');
              } else {
                fetch(API_URL + 'api/sources/create', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    number: this.state.cardNumber,
                    exp_month: this.state.exp_month,
                    exp_year: this.state.exp_year,
                    cvc: this.state.cvc,
                    user: currentUser
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if (resJson.source) {
                    fetch(API_URL + "api/charges/create", {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        amount: '5544',
                        currency: 'usd',
                        source: resJson.source,
                        description: 'The charge for this one',
                        customer: currentUser.stripe_id
                      }),
                    }).then((res) => res.json()).then(resJson => {
                      this.props.navigation.navigate('Receipt');
                    })
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ReceiptScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Receipt:
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
            onPress={() => {
              if (!this.state.username || !this.state.password) {
                Alert.alert('Please enter a username and password.');
              } else {
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
                  if (resJson.loginValid) {
                    currentUser = resJson.user;
                    switch (resJson.user.accountType) {
                      //employee is 0 
                      case 0:
                        currentUser = this.state.username;
                        this.props.navigation.navigate('ClockInOut');
                        break;
                      //customer is 1
                      case 1:
                        this.props.navigation.navigate('Payment');
                        break;
                    }
                  } else {
                    Alert.alert('Incorrect Username or Password.');
                  }
                });
              }
            }}>
            <Text style={styles.submitButtonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const RootStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    LogIn: LogInScreen,
    ClockInOut: ClockInOutScreen,
    Payment: PaymentScreen,
    Receipt: ReceiptScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'Welcome',
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
  },
  text: {
    marginTop: 100,
    color: '#f7df1e',
    margin: 10,
    fontSize: 20,
  },
  SignUpText: {
    marginTop: 10,
    color: 'red',
    margin: 10,
    fontSize: 20,
  },
  input: {
    margin: 15,
    backgroundColor: 'white',
    height: 40,
    borderColor: '#f7df1e',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#f7df1e',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'black'
  },

  logInMenuButton: {
    marginTop: 270,
    marginLeft: 50,
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },

  button: {
    marginTop: 50,
    marginLeft: 50,
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#f7df1e',
    justifyContent: 'center'
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
