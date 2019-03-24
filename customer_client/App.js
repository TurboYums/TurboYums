import React from 'react';
import { Button, FlatList,View, Text,ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, Image,ImageBackground,Platform, StyleSheet, TouchableNativeFeedback, TextInput, TouchableOpacity } from 'react-native';
import {ListItem} from 'react-native-elements';
import MenuItem from './components/MenuItem'
import { Ionicons } from '@expo/vector-icons';
// import console = require('console');


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
              onPress={() =>{ 
                this.props.navigation.navigate('DineInOut',{order:[]});
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

  _onPressButton(navigate,state,takeOutStatus) {
    // const { navigate } = this.props.navigation;
    // Alert.alert('You clocked in!')
    // var{order} = this.props.navigation.state.params
    // Alert.alert('Navigation'+order)
    // navigate.state.setParams({order:order})
    // console.log("22")
    // console.log(state.params)
    // console.log(state.params.order.length)
    if(!state.params.order.length){
      // console.log('AQUI')
      navigate('Menu',{order:[],takeOut:takeOutStatus});
    }else{
      navigate('Menu',{order:[...state.params.order,1], takeOut:takeOutStatus});
    }
    
  }

  render() {
    const { navigate } = this.props.navigation;
    const {state} = this.props.navigation.state
    console.log("HEREEE")
    console.log(this.props.navigation.state)
    
    // console.log(state.order)
    // alert(this.props.navigation.state.st)
    // var {order} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={{ uri: 'https://png.pngtree.com/element_origin_min_pic/16/10/20/12580841f85545d.jpg' }} style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity
              style={styles.button}
              onPress = {()=>{this._onPressButton(navigate,this.props.navigation.state,0)}}>
              <Text style={styles.buttonText}> Dine In </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress = {()=>{this._onPressButton(navigate,this.props.navigation.state,1)}}>
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
  _onPressButtonPizza(navigate,state) {
    console.log("PIZZA CAT")
    console.log(state)
    navigate("Pizza",{order:state.params.order, takeOut:state.params.takeOut})

    
    // Alert.alert('Thanks for Ordering Pizza')
    // print('here')
  }
  _onPressButtonBurger(navigate,state) {
    console.log(state)
    navigate("Burger",{order:state.params.order, takeOut:state.params.takeOut})
    
    // Alert.alert('Thanks for Ordering Burgers')
  }
  _onPressButtonDrinks(navigate,state) {
    console.log(state)
    navigate("Drinks",{order:state.params.order, takeOut:state.params.takeOut})
    // Alert.alert('Thanks for Ordering Drinks')
  }
  _onConfirm(navigate,state){
    navigate('Summary',{order:state.params.order, takeOut:state.params.takeOut})
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("ARRIVED")
    console.log(this.props.navigation.state)
    const {order_count} = this.props.navigation.state.params.order.length || '0'
    const {order_message}="Order Count is:"+order_count
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
              <Text>{this.order_message}</Text>
              <Text>{order_message}</Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress={()=>{this._onPressButtonPizza(navigate,this.props.navigation.state)}}>
            <MenuItem 
              title='Pizza'
              description='Choose a Pizza. Prepared in Brick Oven. NY Style!'
              source={require('./assets/pizza.jpg')}
              onPress = {()=>{this._onPressButtonPizza(navigate,this.props.navigation.state)}}
            />
            </TouchableOpacity>

            <TouchableOpacity onPress = {()=>{this._onPressButtonBurger(navigate,this.props.navigation.state)}}>
            <MenuItem
              title='Burgers'
              description='Choose a Burger. Served With Fries'
              source={require('./assets/burger.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity  onPress = {()=>{this._onPressButtonDrinks(navigate,this.props.navigation.state)}}>
            <MenuItem
              title='Drinks'
              description='Choose a Drink. Quench your thirst!'
              source={require('./assets/drinks.jpg')}
              onPress = {()=>{this._onPressButtonDrinks(navigate,this.props.navigation.state)}}
            />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress= {()=>{this._onConfirm(navigate,this.props.navigation.state)}} style={styles.TouchableOpacityStyle} >
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
  _onButtonAdd(navigate,state,title,price) {
    console.log("Menu")
    console.log(state)

    if(!state.params.order.length){
      navigate('Menu',{order: [{title:title, price:price}],takeOut:state.params.takeOut});
    }else{
      navigate('Menu',{order:[...state.params.order,{title:title, price:price}], takeOut:state.params.takeOut});
    }
  
  }
  _onConfirm(navigate,state){
    navigate('Summary',{order:state.params.order, takeOut:state.params.takeOut})
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("ARRIVED @ 2")
    console.log(this.props.navigation.state)
    return (
      <View style={{flex: 1}}>
      <View style={styles.MenuSplashStyle}>
        <Image source={require('./assets/pizzaSplash.jpg')} style={{resizeMode:'contain', width:'100%',height:'100%'}}></Image>
      </View>
      <ScrollView style={styles.MenuListStyle}>
        <View style={styles.container}>
        <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Margherita Pizza","2")}}>
          <MenuItem
            title='Margherita Pizza'
            price='$6'
            description='Click to Add'
            source={require('./assets/pizza.jpg')}
          />
          </TouchableOpacity>
          
          <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Pepporoni Pizza","3")}}>
          <MenuItem
            title='Pepporoni Pizza'
            price='$10'
            // description='Served With Fries'
            source={require('./assets/pep-pizza.jpg')}
          />
          </TouchableOpacity>

          <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Veggie Pizza","3")}}>
          <MenuItem
            title='Veggie Lovers Pizza'
            price='$5'
            // description='Quench your thirst!'
            source={require('./assets/veggie_lovers.jpg')}
          />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity activeOpacity={1} onPress= {()=>{this._onConfirm(navigate,this.props.navigation.state)}} style={styles.TouchableOpacityStyle} >
          <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
      </TouchableOpacity>

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
  _onButtonAdd(navigate,state,title,price) {
    console.log("Menu")
    console.log(state)

    if(!state.params.order.length){
      navigate('Menu',{order: [{title:title, price:price}],takeOut:state.params.takeOut});
    }else{
      navigate('Menu',{order:[...state.params.order,{title:title, price:price}], takeOut:state.params.takeOut});
    }
  
  }
  _onConfirm(navigate,state){
    navigate('Summary',{order:state.params.order, takeOut:state.params.takeOut})
  }
  

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View style={styles.MenuSplashStyle}>
          <Image source={require('./assets/burgerSplash.jpg')} style={{resizeMode:'contain', width:'100%',height:'100%'}}></Image>
        </View>
        <ScrollView style={styles.MenuListStyle}>
          <View style={styles.container}>
          <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Hamburger","8")}}>
            <MenuItem
              title='Hamburger'
              price='$8'
              // description='Prepared in Brick Oven. NY Style!'
              source={require('./assets/hamburger.jpg')}
            />
            </TouchableOpacity>
            
            <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Veggie Burger","6")}}>
            <MenuItem
              title='Blackbean Burger Veggie'
              price='$6'
              // description='Served With Fries'
              source={require('./assets/blackbean.jpeg')}
            />
            </TouchableOpacity>

            <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"CheeseBurger","7")}}>
            <MenuItem
              title='Cheeseburger'
              price='$7'
              // description='Quench your thirst!'
              source={require('./assets/cheeseburger.jpg')}
            />
            </TouchableOpacity>
          </View>
        </ScrollView>
      
        <TouchableOpacity activeOpacity={1} onPress= {()=>{this._onConfirm(navigate,this.props.navigation.state)}} style={styles.TouchableOpacityStyle} >
          <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
      </TouchableOpacity>
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

  _onButtonAdd(navigate,state,title,price) {
    console.log("Menu")
    console.log(state)

    if(!state.params.order.length){
      navigate('Menu',{order: [{title:title, price:price}],takeOut:state.params.takeOut});
    }else{
      navigate('Menu',{order:[...state.params.order,{title:title, price:price}], takeOut:state.params.takeOut});
    }
  }

  _onConfirm(navigate,state){
    navigate('Summary',{order:state.params.order, takeOut:state.params.takeOut})
  }
  
  

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
      <View style={styles.MenuSplashStyle}>
        <Image source={require('./assets/DrinksSplash.jpg')} style={{resizeMode:'contain', width:'100%',height:'100%'}}></Image>
      </View>
      <ScrollView style={styles.MenuListStyle}>
        <View style={styles.container}>
        <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Milkshake","3")}}>
          <MenuItem
            title="Milkshake"
            price='$6'
            // description='Prepared in Brick Oven. NY Style!'
            source={require('./assets/milkshake.jpg')}
          />
          </TouchableOpacity>

          <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Soda","2")}}>
          <MenuItem
            title='Soda'
            price='$10'
            // description='Served With Fries'
            source={require('./assets/soda.jpeg')}
          />
          </TouchableOpacity>

          <TouchableOpacity  onPress = {()=>{this._onButtonAdd(navigate,this.props.navigation.state,"Lemonade","2.50")}}>
          <MenuItem
            title='Lemonade'
            price='$5'
            // description='Quench your thirst!'
            source={require('./assets/lemonade.jpg')}
          />
          </TouchableOpacity>

        </View>
      </ScrollView>
      <View>
      <TouchableOpacity activeOpacity={1} onPress= {()=>{this._onConfirm(navigate,this.props.navigation.state)}} style={styles.TouchableOpacityStyle} >
          <Image source={require('./assets/confirm.png')}  style={styles.FloatingButtonStyle} />
      </TouchableOpacity>
      </View>

    </View>
    );
  }
}
class SummaryScreen extends React.Component {
  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.price}
    />
  )

  render() {
    console.log('SUMMARY')
    console.log(this.props.navigation.state.params.order)
    var orderData = this.props.navigation.state.params.order;
    console.log('LOG')
    console.log(orderData)
    return(
    <View>
      <Text>Summary</Text>
      <View>
        <FlatList 
              keyExtractor= {this.keyExtractor}
              data={this.props.navigation.state.params.order}
              renderItem = {this.renderItem}
          />
      </View>
      <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>{ 
                this.props.navigation.navigate('DineInOut',{order:[]});
              }}>
              <Text style={styles.submitButtonText}> Submit Item </Text>
      </TouchableOpacity>
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
    Drinks:DrinkScreen,
    Summary:SummaryScreen,
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
  MenuSplashStyle: {
      flex:1
  },
  MenuListStyle: {
    flex:4
}
})


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
