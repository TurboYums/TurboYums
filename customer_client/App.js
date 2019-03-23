import React from 'react';
import { Button, View, Text,ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, Image,ImageBackground,Platform, StyleSheet, TouchableNativeFeedback, TextInput, TouchableOpacity } from 'react-native';
import { ListItem ,Icon} from 'react-native-elements';
import MenuItem from './components/MenuItem'
import { Ionicons } from '@expo/vector-icons';


class HomeScreen extends React.Component {
  state = {
    email: '',
    password: ''
  }
  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  login = (email, word) => {
    alert('email: ' + email + ' password: ' + password)
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg' }} style={{ width: '100%', height: '100%' }}>
            <Text style={styles.text}>
              Type in e-mail and password to log-in:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.handleEmail} />

            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.handlePassword} />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>{ //temporarily deleted to skip sign in
                this.props.navigation.navigate('DineInOut');
              }}>
              <Text style={styles.submitButtonText}> SUBMIT </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class DineInOutScreen extends React.Component {

  _onPressButton(navigate) {
    // const { navigate } = this.props.navigation;
    // Alert.alert('You clocked in!')
    navigate('Menu')
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://png.pngtree.com/element_origin_min_pic/16/10/20/12580841f85545d.jpg' }} style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity
              style={styles.button}
              onPress = {()=>{this._onPressButton(navigate)}}>
              <Text style={styles.buttonText}> Dine In </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress = {()=>{this._onPressButton(navigate)}}>
              <Text style={styles.buttonText}> Take Out </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class MenuScreen extends React.Component {
 
  static navigationOptions = {
    title: 'Menu',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // headerRight: <Button>'Cart'</Button>
  };
  _onPressButtonPizza(navigate) {
    navigate("Pizza")
    // Alert.alert('Thanks for Ordering Pizza')
    // print('here')
  }
  _onPressButtonBurger(navigate) {
    navigate("Burger")
    // Alert.alert('Thanks for Ordering Burgers')
  }
  _onPressButtonDrinks(navigate) {
    navigate("Drinks")
    // Alert.alert('Thanks for Ordering Drinks')
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={()=>{this._onPressButtonPizza(navigate)}}>
            <MenuItem 
              title='Pizza'
              description='Choose a Pizza. Prepared in Brick Oven. NY Style!'
              source={require('./assets/pizza.jpg')}
              onPress = {()=>{this._onPressButtonPizza(navigate)}}
            />
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{this._onPressButtonBurger(navigate)}}>
            <MenuItem
              title='Burgers'
              description='Choose a Burger. Served With Fries'
              source={require('./assets/burger.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity  onPress = {()=>{this._onPressButtonDrinks(navigate)}}>
            <MenuItem
              title='Drinks'
              description='Choose a Drink. Quench your thirst!'
              source={require('./assets/drinks.jpg')}
              onPress = {()=>{this._onPressButtonDrinks(navigate)}}
            />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={this.FloatingButtonEvent} style={styles.TouchableOpacityStyle} >
            <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class PizzaScreen extends React.Component {
 
  static navigationOptions = {
    title: 'Pizza',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // headerRight: <Button>'Cart'</Button>
  };
  _onPressButton(navigate) {
    Alert.alert('Thanks for Ordering Pizza')
  }
  _onPressButton2(navigate) {
    Alert.alert('Thanks for Ordering Burgers')
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <MenuItem
              title='Pizza'
              price='$6'
              description='Prepared in Brick Oven. NY Style!'
              source={require('./assets/pizza.jpg')}
            />
            <MenuItem
              title='Burgers'
              price='$10'
              description='Served With Fries'
              source={require('./assets/burger.jpg')}
            />
            <MenuItem
              title='Drinks'
              price='$2'
              description='Quench your thirst!'
              source={require('./assets/drinks.jpg')}
            />
            
          </View>
        </ScrollView>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={this.FloatingButtonEvent} style={styles.TouchableOpacityStyle} >
            <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class BurgerScreen extends React.Component {
 
  static navigationOptions = {
    title: 'Burger',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // headerRight: <Button>'Cart'</Button>
  };
  _onPressButton(navigate) {
    Alert.alert('Thanks for Ordering Pizza')
  }
  _onPressButton2(navigate) {
    Alert.alert('Thanks for Ordering Burgers')
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <MenuItem
              title='Pizza'
              price='$6'
              description='Prepared in Brick Oven. NY Style!'
              source={require('./assets/pizza.jpg')}
            />
            <MenuItem
              title='Burgers'
              price='$10'
              description='Served With Fries'
              source={require('./assets/burger.jpg')}
            />
            <MenuItem
              title='Drinks'
              price='$2'
              description='Quench your thirst!'
              source={require('./assets/drinks.jpg')}
            />
            
          </View>
        </ScrollView>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={this.FloatingButtonEvent} style={styles.TouchableOpacityStyle} >
            <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class DrinkScreen extends React.Component {
 
  static navigationOptions = {
    title: 'Drinks',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // headerRight: <Button>'Cart'</Button>
  };
  _onPressButton(navigate) {
    Alert.alert('Thanks for Ordering Pizza')
  }
  _onPressButton2(navigate) {
    Alert.alert('Thanks for Ordering Burgers')
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <MenuItem
              title='Pizza'
              price='$6'
              description='Prepared in Brick Oven. NY Style!'
              source={require('./assets/pizza.jpg')}
            />
            <MenuItem
              title='Burgers'
              price='$10'
              description='Served With Fries'
              source={require('./assets/burger.jpg')}
            />
            <MenuItem
              title='Drinks'
              price='$2'
              description='Quench your thirst!'
              source={require('./assets/drinks.jpg')}
            />
            
          </View>
        </ScrollView>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={this.FloatingButtonEvent} style={styles.TouchableOpacityStyle} >
            <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    DineInOut: DineInOutScreen,
    Menu: MenuScreen,
    Pizza:PizzaScreen,
    Burger:BurgerScreen,
    Drinks:DrinkScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
})


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
