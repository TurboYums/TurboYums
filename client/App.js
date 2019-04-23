import React from 'react';
import { Button, ActivityIndicator, FlatList, View, Text, ScrollView, Dimensions, KeyboardAvoidingView, Switch } from 'react-native';
import { createStackNavigator, createAppContainer, Navigation, createBottomTabNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, Image, StyleSheet, SectionList, TouchableNativeFeedback, TextInput, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { Header, ListItem, Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import MenuItem from './components/MenuItem';
import { unregisterTaskAsync } from 'expo-background-fetch';
//AppRegistry.registerComponent('RNNavigators', () => Drawer );
//=======
//const API_URL = 'http://10.0.1.85:5000/';
// const API_URL = 'http://127.0.0.1:5000/';
//>>>>>>> a674c5b635a6a7884895faea27bede2c24df0da2
const API_URL = 'http://192.168.1.193:5000/';
//const API_URL = 'http://10.0.1.85:5000/';
// const API_URL = 'http://127.0.0.1:5000/';
let currentUser = '';
let order = '';
let token = '';
let items = '';
let employees = '';
let currentItem = '';


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        style={{ alignSelf: 'center', height: 30, width: 30, borderRadius: 0 }}
        source={require('./assets/Logomono.png')}
        // width={Dimensions.get('window').width}
        resizeMode="stretch"
      />
    );
  }
}

class EditButton extends React.Component{
  render(){
    return(
      <EditButton
        onPress={() => alert('This is a button!')}
          title="Edit"
        color="#000000"
      />
    );
  }
}

class WelcomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };
  render() {
    /*const shadowStyle = {
      shadowOpacity: .25
    }*/
    return (
      <View style={styles.container}>
        <View>
          <StatusBar barStyle="dark-content" animated={true} backgroundColor='#fff44f' />
          <ImageBackground source={require('./assets/splash.png')} style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity
              style={styles.logInMenuButton}
              onPress={() => {
                this.props.navigation.navigate('LogIn');
              }
              } >
              <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }
              } >
              <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                this.props.navigation.navigate('Menu');
              }
              } >
              <Text style={styles.buttonText}> Continue As Guest </Text>
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
  static navigationOptions = {
    // headerTitle instead of title
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/Logomono.png')}
        style={[styles.icon]}
      />
    ),
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
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
    const shadowStyle = {
      shadowOpacity: .2
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" animated={true} backgroundColor='#fff44f' />
          <ScrollView style={{ flex: 1 }}>
          <Text style={styles.SignUpText}>
              Welcome!
          </Text>
          <Text style={styles.text}>
            Create your TurboYums account
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
              placeholder="   Account Type (0 is Manager, 1 is Employee, 2 is Customer)"
              autoCapitalize="none"
              onChangeText={this.handleaccounttype} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Email"
              autoCapitalize="none"
              onChangeText={this.handleemail} />
          </ScrollView>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            title="DrawerOpen"
            color='#fff44f'
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.username || !this.state.firstname || !this.state.lastname || !this.state.password || !this.state.accountType || !this.state.email) {
                Alert.alert('Please fill in all fields');
              } else {
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
                  if (resJson.creationSuccess) {
                    Alert.alert('Succesfully Created Account! Please Log In');
                    this.props.navigation.navigate('LogIn');
                  } else {
                    Alert.alert('Error Creating Account!');
                    this.props.navigation.navigate('Welcome');
                  }
                });
              }
            }}>
            <Text style={styles.submitButtonText}> Next </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

class LogInScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => alert('(͠≖ ͜ʖ͠≖)')}
        style={{paddingRight: 15}}
      >
      <View>
       <Image
         style={{ height: 30, width: 30,}}
         source={require('./assets/notif.png')}
         resizeMode="contain"
        />
        <Badge
        value="69"
        status="error"
        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      </View>

       
      </TouchableOpacity>
      ),
  };
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
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" animated={true} backgroundColor='#fff44f' />

        <View style={styles.headerStyle}>
          <Image source={require('./assets/headerBackground.png')} style={{ width: '100%', height: '100%' }}></Image>
        </View>

        <View style={styles.container}>

          <View>

            <Text style={styles.SignUpText}>
              Sign in
          </Text>
            <Text style={styles.text}>
              Welcome to your TurboYums account
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
                        //manager is 0 
                        case 0:
                          this.props.navigation.navigate('ManagerPortal');
                          break;

                        //employee is 1
                        case 1:
                          this.props.navigation.navigate('EmployeePortal');
                          break;

                        //customer is 2
                        case 2:
                          this.props.navigation.navigate('DineInOut');
                          break;

                      }
                    } else {
                      Alert.alert('Incorrect Username or Password.');
                    }
                  });
                }
              }}>
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


class ClockInOutScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
  state = {
    compHours: '',
    latitude: null,
    longitude: null,
    animating: false
  }

  _clockIn = () => {
    this.setState({ animating: true });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(API_URL + 'api/users/clockIn', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: currentUser.username,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        }).then((res) => res.json()).then(resJson => {
          var today = new Date();
          var currDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

          if (resJson.clockInSuccess) {
            Alert.alert("Successfully Clocked In: " + currentUser.firstname + " " + currentUser.lastname, ' Date: ' + currDate + '\nTime: ' + currTime);

          } else {
            Alert.alert(currentUser.firstname + " " + currentUser.lastname + " is already Clocked In!");
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
    );
    this.setState({ animating: false });
  }

  _clockOut = () => {
    this.setState({ animating: true });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(API_URL + 'api/users/clockOut', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: currentUser.username,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        }).then((res) => res.json()).then(resJson => {
          var today = new Date();
          var currDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          if (resJson.clockOutSuccess) {
            this.state.compHours = resJson.totalHours;
            this._MyComponent.setNativeProps({ text: 'Total Hours Worked This Pay Period: ' + this.state.compHours });
            Alert.alert("Successfully Clocked Out: " + currentUser.firstname, 'Date: ' + currDate + '\nTime: ' + currTime + '\nShift Length: ' + resJson.sessionHours);

          } else {
            Alert.alert(currentUser.firstname + " is already Clocked Out!");
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
    );

    this.setState({ animating: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>
            <TextInput style={styles.hourViewer} placeholder="Total Hours Worked This Pay Period: " editable={false} ref={component => this._MyComponent = component} />
            <TouchableOpacity
              style={styles.ClockInButton}
              onPress={() => { this._clockIn() }} >
              <Text style={styles.buttonText}> Clock In </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => { this._clockOut() }} >
              <Text style={styles.buttonText}> Clock Out </Text>
            </TouchableOpacity>

            <ActivityIndicator animating={this.state.animating} size="large" color="#fff44f" />
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class EmployeePortalScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: 'Welcome, Employee!',
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>

            <TouchableOpacity
              style={styles.TablesButton}
              onPress={() => {
                Alert.alert('We have not yet implemented the Table interface!')
              }
              } >
              <Text style={styles.buttonText}> View Tables </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                Alert.alert('We have not yet implemented the Schedule interface!');
              }} >
              <Text style={styles.buttonText}> View Schedule </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Staff');
              }} >
              <Text style={styles.buttonText}> View Staff </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Menu');
              }} >
              <Text style={styles.buttonText}> View Menu </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('ClockInOut');
              }} >
              <Text style={styles.buttonText}> Clock In/Out </Text>
            </TouchableOpacity>

          </ImageBackground>
        </View>
      </View>
    );
  }
}

class ManagerPortalScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: 'Welcome, Manager!',
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>

            <TouchableOpacity
              style={styles.TablesButton}
              onPress={() => {
                Alert.alert('We have not yet implemented the Table interface!')
              }
              } >
              <Text style={styles.buttonText}> View Tables </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                Alert.alert('We have not yet implemented the Schedule interface!');
              }} >
              <Text style={styles.buttonText}> View Schedule </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Staff');
              }} >
              <Text style={styles.buttonText}> View Staff </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Menu'); //will change this to Menu when I have the edit button showing only for manager working
              }} >
              <Text style={styles.buttonText}> View Menu </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('WhichEdit'); //will change this to Menu when I have the edit button showing only for manager working
              }} >
              <Text style={styles.buttonText}> Edit Menu </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('ClockInOut');
              }} >
              <Text style={styles.buttonText}> Clock In/Out </Text>
            </TouchableOpacity>

          </ImageBackground>
        </View>
      </View>
    );
  }
}


class PaymentChoicesScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
  state = {
    cardNumber: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    postalCode: '',
    sources: ''
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

  submitPayment = (item) => {
    fetch(API_URL + "api/charges/create", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: order.totalPrice,
        currency: 'usd',
        source: item.stripe_id,
        description: 'Charge for order #' + order.id,
        customer: currentUser.stripe_id
      }),
    }).then((res) => res.json()).then(resJson => {
      this.props.navigation.navigate('Receipt');
    })
  }

  componentWillMount() {
    fetch(API_URL + 'api/sources/get', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        user: currentUser,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      this.setState({ sources: resJson.sources })
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Choose Method of Payment:
          </Text>
          <FlatList
            data={this.state.sources}
            renderItem={({ item }) => <Text style={styles.menuItem} onPress={() => this.submitPayment(item)}>{item.firstname + " " + item.lastname + " - " + item.last4}</Text>}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { this.props.navigation.navigate('NewPayment'); }}>
            <Text style={styles.submitButtonText}> New Card </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { this.props.navigation.navigate('NewPayment'); }}>
            <Text style={styles.submitButtonText}> Cash </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


class NewPaymentScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
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
          <Text style={styles.SignUpText}>
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
                        amount: order.totalPrice,
                        currency: 'usd',
                        source: resJson.source,
                        description: 'Charge for order #' + order.id,
                        customer: currentUser.stripe_id
                      }),
                    }).then((res) => res.json()).then(resJson => {
                      this.props.navigation.navigate('Receipt');
                    })
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Sumbit </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ReceiptScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerLeft: null
  };
  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.price}
    />
  )
  constructor(props) {
    super(props);
    this.state = {
      order: order,
      items: null
    };
  }

  GetSectionListItem = (item) => {
    currentItem = item;
    this.props.navigation.navigate('ViewItem', { order: order, takeOut: '1' })
  }

  componentWillMount() {
    fetch(API_URL + 'api/order/getItems', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      this.setState({ order: resJson.order })
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
        this.setState({ items: items });;
      }

    })

  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.SignUpText}>
            Receipt:
          </Text>
        </View>
        <View>
          <SectionList
            renderItem={({ item, index, section }) => <Text style={styles.menuItem} key={index} onPress={this.GetSectionListItem.bind(this, item)}> {item.itemName + "       $" + item.itemPrice / 100} </Text>}
            sections={items}
            keyExtractor={(item, index) => item + index}
          />
        </View>
        <Text style={styles.receiptFooter}>Subtotal: ${order.totalPrice / 100}</Text>
        <Text style={styles.receiptFooter}>Tax: ${order.totalPrice * .07 / 100}</Text>
        <Text style={styles.receiptFooter}>Total: ${order.totalPrice * 1.07 / 100}</Text>
        <View>
          <Text style={styles.text}>
            You have: {currentUser.rewardpoints}
          </Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.props.navigation.navigate('Menu');
            }}>
            <Text style={styles.submitButtonText}> Menu </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//ADD NAV BAR
class DineInOutScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
  _onPressButton(navigate) {
    fetch(API_URL + 'api/order/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice: '0',
        specialRequest: 'None',
        userId: '1'

      }),
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order;
    });

    fetch(API_URL + 'api/items/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
      }
      this.props.navigation.navigate('FilterSelection');
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation.state
    console.log("HEREEE")
    console.log(this.props.navigation.state)
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => { this._onPressButton() }}>
              <Text style={styles.buttonText}> Dine In </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tButton}
              onPress={() => { this._onPressButton() }}>
              <Text style={styles.buttonText}> Take Out </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class FilterSelectionScreen extends React.Component{
 
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (<Button
      color='#000000'
      title="Skip"
      style={{marginRight: 30}}
      onPress={() => {
        this.props.navigation.navigate('Menu');//doesnt work yet
        }}>
      </Button>
      )
  };
  constructor() {
    super();
    this.state = {
       listKeys: [
      {key: 'Nuts', switch : false},
      {key: 'Fish', switch : false},
      {key: 'Meat', switch : false},
      {key: 'Shellfish', switch : false},
      {key: 'Milk', switch : false},
      {key: 'Soy', switch : false},
      {key: 'Wheat', switch : false},
      {key: 'Gluten', switch : false},
    ]
    }
  }

  setSwitchValue = (val, ind) => {
      const tempData = _.cloneDeep(this.state.listKeys);
      tempData[ind].switch = val;
      this.setState({ listKeys: tempData });
  }

  listItem = ({item, index}) => (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginTop: 20}}>
      <Text style={styles.item}>{item.key}</Text>
      <Switch
       onValueChange={(value) => !this.setSwitchValue(value, index)}
       value={item.switch}
      />
    </View>
  );


  
  render(){
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation.state)
    
    return (
      <View>
        <Text style={styles.SignUpText}>
              Select
        </Text>
        <Text style={styles.text}>
              your allergies
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
          this.props.navigation.navigate('Menu');
            }}>
          <Text style={styles.submitButtonText}>
             Menu
          </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.listKeys}
          renderItem={this.listItem}
        />
      </View>
    );
  }
}


class MenuScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    //headerRight: <EditButton/>,
  };

  constructor(props) {
    super(props);
    this.state = {
      order: order,
      items: []
    };
  }

  _onConfirm(navigate, state) {
    navigate('Summary')
  }
  GetSectionListItem = (item) => {
    currentItem = item;
    this.props.navigation.navigate('ViewItem', { order: order, takeOut: '1' })
  }

  _onPressOrder = (item) => {
    fetch(API_URL + 'api/order/getItems', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
      }

      this.props.navigation.navigate('Summary', { order: resJson.order, takeOut: '1' })
    });
  }

  componentWillMount() {
    fetch(API_URL + 'api/items/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }

        this.setState({ items: items });;
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if(currentUser.accountType==0){
      button = <EditButton />;
    }
    else{
      button=null;
    }
    console.log("ARRIVED")
    console.log(this.props.navigation.state)
    const { order_count } = 0
    const { order_message } = "Order Count is:" + order_count
    return (
      <View>
        <ScrollView>
          <SectionList
            renderItem={({ item, index, section }) => <Text style={styles.menuItem} key={index} onPress={this.GetSectionListItem.bind(this, item)}> {item.itemName + " - " + "$" + item.itemPrice / 100} </Text>}
            renderSectionHeader={({ section: { category } }) => (
              <Text style={styles.sectionHeader}>{category}</Text>
            )}
            sections={this.state.items}
            keyExtractor={(item, index) => item + index}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { this._onPressOrder() }}>
          <Text style={styles.submitButtonText}> View Order </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

class ManagerMenu extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Edit"
        color="#000000"
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      order: order,
      items: []
    };
  }

  _onConfirm(navigate, state) {
    navigate('Summary')
  }
  GetSectionListItem = (item) => {
    currentItem = item;
    this.props.navigation.navigate('EditItem', { order: order, takeOut: '1' })
  }

  _onPressOrder = (item) => {
    fetch(API_URL + 'api/order/getItems', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
      }

      this.props.navigation.navigate('Summary', { order: resJson.order, takeOut: '1' })
    });
  }

  componentWillMount() {
    fetch(API_URL + 'api/items/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }

        this.setState({ items: items });;
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("ARRIVED")
    console.log(this.props.navigation.state)
    const { order_count } = 0
    const { order_message } = "Order Count is:" + order_count
    return (
      <View>
        <ScrollView>
          <SectionList
            renderItem={({ item, index, section }) => <Text style={styles.menuItem} key={index} onPress={this.GetSectionListItem.bind(this, item)}> {item.itemName + " - " + "$" + item.itemPrice / 100} </Text>}
            renderSectionHeader={({ section: { category } }) => (
              <Text style={styles.sectionHeader}>{category}</Text>
            )}
            sections={this.state.items}
            keyExtractor={(item, index) => item + index}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { this._onPressOrder() }}>
          <Text style={styles.submitButtonText}> View Order </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

class WhichEditScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'What would you like to do?',
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>

            <TouchableOpacity
              style={styles.topButton}
              onPress={() => {
                this.props.navigation.navigate('AddItem');
              }} >
              <Text style={styles.buttonText}> Add New Item </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('EditMenu');
              }} >
              <Text style={styles.buttonText}> Edit Existing Items </Text>
            </TouchableOpacity>
              

          </ImageBackground>
        </View>
      </View>
    );
  }
}

class AddItemScreen extends React.Component {
  state = {
    itemName: '',
    category: '',
    itemPrice: '',
    ingredient: '',
    description: '',
    rating: ''
  }
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
  handleitemName = (text) => {
    this.setState({ itemName: text })
  }
  handlecategory = (text) => {
    this.setState({ category: text })
  }
  handleitemPrice = (text) => {
    this.setState({ itemPrice: text })
  }
  handleingredient = (text) => {
    this.setState({ ingredient: text })
  }
  handledescription = (text) => {
    this.setState({ description: text })
  }
  handlerating = (text) => {
    this.setState({ rating: text })
  }

  render() {
    const shadowStyle = {
      shadowOpacity: .2
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>

          <StatusBar barStyle="dark-content" animated={true} backgroundColor='#fff44f' />
          <ScrollView style={{ flex: 1 }}>
          <Text style={styles.SignUpText}>
              Item Creation
          </Text>
          <Text style={styles.text}>
            Enter details below:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Item Name:"
              autoCapitalize="words"
              onChangeText={this.handleitemName} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Category:"
              autoCapitalize="words"
              onChangeText={this.handlecategory} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Item Price (in cents):"
              autoCapitalize="words"
              onChangeText={this.handleitemPrice} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="   Ingredients (Comma Seperated):"
              autoCapitalize="words"
              onChangeText={this.handleingredient} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Description:"
              autoCapitalize="words"
              onChangeText={this.handledescription} />
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Rating:"
              autoCapitalize="words"
              onChangeText={this.handlerating} />
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.itemName || !this.state.category || !this.state.itemPrice || !this.state.ingredient || !this.state.description || !this.state.rating) {
                Alert.alert('Please fill in all fields');
              } else {
                fetch(API_URL + 'api/items/create', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    itemName: this.state.itemName,
                    category: this.state.category,
                    itemPrice: this.state.itemPrice,
                    ingredient: this.state.ingredient,
                    description: this.state.description,
                    rating: this.state.rating,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if (resJson.creationSuccess) {
                    Alert.alert('Succesfully Created Item!');
                    this.props.navigation.navigate('ManagerPortal');
                  } else {
                    Alert.alert('Error Creating Item!');
                    this.props.navigation.navigate('ManagerPortal');
                  }
                });
              }
            }}>
            <Text style={styles.submitButtonText}> Create </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

class ViewItemScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };

  _onPressAddOrder = () => {
    fetch(API_URL + 'api/order/add', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
        itemId: currentItem.id
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
      }
      this.props.navigation.navigate('Summary', { order: order, takeOut: '1' })
    });

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.SignUpText}>{currentItem.itemName}</Text>
        <Text style={styles.itemPrice}>{'Price: $' + currentItem.itemPrice / 100}</Text>
        <Text style={styles.itemPrice}>{'Description: ' + currentItem.description}</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { this._onPressAddOrder() }}>
          <Text style={styles.submitButtonText}> Add To Order </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class EditItemScreen extends React.Component { //This is where we gotta make changes to edit items @Holly :)
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };

  _onPressAddOrder = () => {
    fetch(API_URL + 'api/order/add', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
        itemId: currentItem.id
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
      }
      this.props.navigation.navigate('Summary', { order: order, takeOut: '1' })
    });

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.SignUpText}>{currentItem.itemName}</Text>
        <Text style={styles.itemPrice}>{'Price: $' + currentItem.itemPrice / 100}</Text>
        <Text style={styles.itemPrice}>{'Description: ' + currentItem.description}</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { this._onPressAddOrder() }}>
          <Text style={styles.submitButtonText}> Add To Order </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class StaffScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };

  constructor(props) {
    super(props);
    this.state = {
      order: order,
      employees: null
    };
  }

  GetSectionListItem = (item) => {
    currentItem = item;
    //this.props.navigation.navigate('ViewEmployee', { order: order, takeOut: '1' })
  }

  componentWillMount() {
    fetch(API_URL + 'api/users/getEmployees', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      this.setState({ employees: resJson.employees });;
    })
  }

  render() {
    return (
      <View>
        <Text>Employees: </Text>
        <View>
          <FlatList
            data={this.state.employees}
            renderItem={({ item }) => <Text>{item.firstname + " " + item.lastname}</Text>}
          />
        </View>
      </View>

    );

  }
}

class SummaryScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  };
  keyExtractor = (item, index) => index.toString()
  deleteItem = (item) => console.log('Deleted ' + item.itemName)
  renderItem = ({ item }) => (
    <ListItem
      title={item.itemName + "        $" + item.itemPrice / 100}
      rightIcon={
        <Image
          source={require('./assets/delete.png')}
          style={{ alignSelf: 'center', height: 25, width: 25, borderRadius: 0 }}
        />
      }
      onPressRightIcon={() => console.log('Pressed !')}
      onPress={this.GetSectionListItem.bind(this, item)}
    />
  )
  constructor(props) {
    super(props);
    this.state = {
      order: order,
      items: null
    };
  }

  GetSectionListItem = (item) => {
    currentItem = item;
    this.props.navigation.navigate('DeleteItem', { order: order, takeOut: '1' })
  }
  componentDidMount() {
    fetch(API_URL + 'api/order/getItems', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      this.setState({ order: resJson.order })
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
        this.setState({ items: items });;
      }

    })
  }
  componentWillMount() {
    fetch(API_URL + 'api/order/getItems', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      this.setState({ order: resJson.order })
      let tempItems = resJson.items;
      items = []

      for (let item of tempItems) {
        console.log(item);
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item);
        }
        else {
          items.push({ category: item.category, data: [item] });
        }
        this.setState({ items: items });;
      }

    })

  }

  render() {

    return (
      <View>
        <Text style={styles.SignUpText}>Order Summary:</Text>
        <View>
          <SectionList
            renderItem={({ item, index, section }) => this.renderItem({ item })

              // <Text style={styles.viewItem} key={index} onPress={this.GetSectionListItem.bind(this, item)}>
              //   {item.itemName + "       $" + item.itemPrice / 100}
              // </Text>
              //<Text style={rightAlignedPrice}>{"$"item.itemPrice / 100}</Text> ALIGN PRICE TO RIGHT
            }
            sections={items}
            keyExtractor={(item, index) => item + index}
          />
        </View>
        <Text style={styles.receiptFooter}>Subtotal: ${order.totalPrice / 100}</Text>
        <Text style={styles.receiptFooter}>Tax: ${(order.totalPrice * .06625 / 100).toFixed(2)}</Text>
        <Text style={styles.receiptFooter}>Total: ${order.totalPrice * 1.07 / 100}</Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.props.navigation.navigate('PaymentChoices', { order: [] });
          }}>
          <Text style={styles.submitButtonText}> Pay </Text>
        </TouchableOpacity>
      </View>

    );

  }
}


const RootStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    LogIn: LogInScreen,
    ClockInOut: ClockInOutScreen,
    NewPayment: NewPaymentScreen,
    PaymentChoices: PaymentChoicesScreen,
    Receipt: ReceiptScreen,
    SignUp: SignUpScreen,
    EmployeePortal: EmployeePortalScreen,
    ManagerPortal: ManagerPortalScreen,
    DineInOut: DineInOutScreen,
    FilterSelection: FilterSelectionScreen, 
    Menu: MenuScreen,
    Summary: SummaryScreen,
    ViewItem: ViewItemScreen,
    Staff: StaffScreen,
    EditMenu: ManagerMenu,
    WhichEdit: WhichEditScreen,
    EditItem: EditItemScreen,
    AddItem: AddItemScreen,
  },
  {
    initialRouteName: 'Welcome',
  }
);

const AppContainer = createAppContainer(RootStack);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 20
  },
  sectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  menuItem: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    textAlign: 'left',
  },
  viewItem: {
    paddingTop: 10,
    //paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    marginLeft: 30,
    textAlign: 'left',
  },
  itemTitle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },
  itemPrice: {
    paddingTop: 10,
    //paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    marginLeft: 30,
    fontSize: 18,
    textAlign: 'left',
  },
  receiptFooter: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    textAlign: 'right',
  },
  item: {
    padding: 10,
    marginLeft: 20,
    fontSize: 18,
    height: 44,
    //marginLeft: 30,
    textAlign: 'right',
  },
  text: {
    marginLeft: 30,
    color: '#5b5b5b',
    //marginTop: 2,
    fontSize: 18,
  },
  SignUpText: {
    marginTop: 10,
    fontSize: 30,
    marginLeft: 30,
    marginTop: 30,
    // fontStyle: 'bold',
    color: 'black',
    margin: 10,
  },
  input: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'white',
    height: 40,
    borderColor: '#dadce0',
    borderWidth: 1,
    borderRadius: 5
  },
  hourViewer: {
    margin: 15,
    backgroundColor: '#fff44f',
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#fff44f',
    padding: 10,
    margin: 30,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    //position: 'absolute',
    //bottom: 0,
    //flex: 1,
    //justifyContent: 'flex-end',
    //marginBottom: 0

  },
  submitButtonText: {
    padding: 2,
    color: 'black'
  },

  logInMenuButton: {
    borderRadius: 100,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    marginTop: 310,
    marginLeft: 68,
    //marginBottom: 10,
    height: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f',
  },
  empMenuButton: {
    marginTop: 230,
    marginLeft: 50,
    marginBottom: 68,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  signUpButton: {
    borderRadius: 100,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 68,
    //marginBottom: 10,
    height: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f',
  },
  guestbutton: {
    borderRadius: 100,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 68,
    //marginBottom: 10,
    height: 60,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f'
  },
  buttonText: {
    padding: 20,
    color: 'black'
  },
  headerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff44f'
  },
  tButton: {
    borderRadius: 100,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    // marginTop: 250,
    marginLeft: 68,
    //marginBottom: 10,
    height: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f',
  },
  submitButton2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff44f',
    borderRadius: 100
  },
  ClockInButton: {
    borderRadius: 100,
    marginTop: 150,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    // marginTop: 250,
    marginLeft: 68,
    //marginBottom: 10,
    height: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f',
  },
  TablesButton: {
    borderRadius: 100,
    marginTop: 120,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    // marginTop: 250,
    marginLeft: 68,
    //marginBottom: 10,
    height: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f',
  },
  topButton: {
    borderRadius: 100,
    marginTop: 120,
    marginBottom: 20,
    //paddingTop:10,
    paddingBottom: 10,
    // marginTop: 250,
    marginLeft: 68,
    //marginBottom: 10,
    height: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#fff44f',
  },
  icon: {
    width: 24,
    height: 24,
  },

});


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
};

