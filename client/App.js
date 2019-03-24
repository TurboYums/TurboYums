import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, StyleSheet, TouchableNativeFeedback, TextInput, ImageBackground, TouchableOpacity } from 'react-native';




const API_URL = 'http://192.168.1.5:5000/';
let currentUser = ' ';

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
  state = {
    compHours: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://cdn.shopify.com/s/files/1/2398/3757/products/Pizza-Cloth-Front_1024x1024.jpg?v=1512582067' }} style={{ width: '100%', height: '100%' }}>
          <TextInput style={styles.hourViewer} placeholder="Total Hours Worked This Pay Period: "  editable={false} ref = {component=>this._MyComponent=component}/>
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
                  var today = new Date();
                  var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                  var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                    if(resJson.clockInSuccess){
                      Alert.alert("Successfully Clocked In: " + currentUser, 'Date: ' + currDate + '\nTime: ' + currTime);

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
                  var today = new Date();
                  var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                  var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  if(resJson.clockOutSuccess){ 
                    this.state.compHours = resJson.totalHours;
                    this._MyComponent.setNativeProps({text:'Total Hours Worked This Pay Period: ' + this.state.compHours});
                    Alert.alert("Successfully Clocked Out: " + currentUser, 'Date: ' + currDate + '\nTime: ' + currTime+ '\nShift Length: ' + resJson.sessionHours);
                  
                  } else{
                    Alert.alert(currentUser + " is already Clocked Out!");
                  }
                });
              }
            } >
              <Text style={styles.buttonText}> Clock Out </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                this.props.navigation.navigate('EmployeePortal');
              }
              } >
              <Text style={styles.buttonText}> Employee Portal </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class EmployeePortalScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/WIP.png')} style={{ width: '100%', height: '100%' }}>
            
          <TouchableOpacity
              style={styles.empMenuButton}
              onPress={() =>{
                Alert.alert('We have not yet implemented the Table interface!')
              }
            } >
              <Text style={styles.buttonText}> View Tables </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                Alert.alert('We have not yet implemented the Schedule interface!');
              }
            } >
              <Text style={styles.buttonText}> View Schedule </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                Alert.alert('We have not yet implemented the Staff interface!');
              }
            } >
              <Text style={styles.buttonText}> View Staff </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() =>{
                Alert.alert('We have not yet implemented the Menu interface!');
              }
            } >
              <Text style={styles.buttonText}> View Menu </Text>
          </TouchableOpacity>

          </ImageBackground>
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
    SignUp: SignUpScreen,
    EmployeePortal: EmployeePortalScreen
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
    color: 'red',
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
    borderColor: 'red',
    borderWidth: 1
  },
  hourViewer: {
    margin: 15,
    backgroundColor: 'transparent',
    height: 40,
    borderColor: 'transparent',
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

  logInMenuButton: {
    marginTop: 270,
    marginLeft: 50,
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  empMenuButton: {
    marginTop: 230,
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
    backgroundColor: 'yellow',
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
