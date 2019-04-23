import React from 'react'
import { Button, ActivityIndicator, FlatList, View, Text, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native'
import { createStackNavigator, createAppContainer, Navigation } from 'react-navigation' // Version can be specified in package.json
import { Alert, AppRegistry, Image, StyleSheet, SectionList, TouchableNativeFeedback, TextInput, ImageBackground, TouchableOpacity, StatusBar } from 'react-native'
import { Header, CheckBox } from 'react-native-elements'
import MenuItem from './components/MenuItem'
import { Ionicons } from '@expo/vector-icons'
import { unregisterTaskAsync } from 'expo-background-fetch'
import { Dropdown } from 'react-native-material-dropdown'
import { Badge, Icon, withBadge, ListItem } from 'react-native-elements'
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';
import Table6 from './Table6';
import Table7 from './Table7';
import Table8 from './Table8';
import Table9 from './Table9';
import Table10 from './Table10';
import Table11 from './Table11';
import Table12 from './Table12';


const API_URL = 'http://172.31.130.218:5000/'
let currentUser = ''
let tip
let order, token, items, employees, currentItem, currentTable, currentEmployee, currentPing = ''
let pings = 0


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        style={{ alignSelf: 'center', height: 30, width: 30, borderRadius: 0 }}
        source={require('./assets/Logomono.png')}
        // width={Dimensions.get('window').width}
        resizeMode="stretch"
      />
    )
  }
}

class EditButton extends React.Component {
  render() {
    return (
      <EditButton
        onPress={() => alert('This is a button!')}
        title="Edit"
        color="#000000"
      />
    )
  }
}

class WelcomeScreen extends React.Component {

  static navigationOptions = {
    // GOTTA CHANGE BAR STYLE TO LIGHT COLOR THIS JUST REMOVES THE HEADER
    header: null,
  }
  render() {
    /*const shadowStyle = {
      shadowOpacity: .25
    }*/
    return (
      <View style={styles.container}>
        <View>
          <StatusBar barStyle="light-content" animated={true} backgroundColor='#fff44f' />
          <ImageBackground source={require('./assets/splash.png')} style={{ width: '100%', height: '100%' }}>

            <TouchableOpacity
              style={styles.logInMenuButton}
              onPress={() => {
                this.props.navigation.navigate('LogIn')
              }
              } >
              <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                this.props.navigation.navigate('SignUp')
              }
              } >
              <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                this.props.navigation.navigate('Menu')
              }
              } >
              <Text style={styles.buttonText}> Continue As Guest </Text>
            </TouchableOpacity>


          </ImageBackground>
        </View>
      </View>
    )
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
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.username || !this.state.firstname || !this.state.lastname || !this.state.password || !this.state.accountType || !this.state.email) {
                Alert.alert('Please fill in all fields')
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
                    Alert.alert('Succesfully Created Account! Please Log In')
                    this.props.navigation.navigate('LogIn')
                  } else {
                    Alert.alert('Error Creating Account!')
                    this.props.navigation.navigate('Welcome')
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Next </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
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
  }
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
                  Alert.alert('Please enter a username and password.')
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
                      currentUser = resJson.user
                      switch (resJson.user.accountType) {
                        //manager is 0 
                        case 0:
                          this.props.navigation.navigate('ManagerPortal')
                          break

                        //employee is 1
                        case 1:
                          this.props.navigation.navigate('EmployeePortal')
                          break

                        //customer is 2
                        case 2:
                          this.props.navigation.navigate('DineInOut')
                          break

                      }
                    } else {
                      Alert.alert('Incorrect Username or Password.')
                    }
                  })
                }
              }}>
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


class ClockInOutScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewPings')}
        style={{ paddingRight: 15 }}
      >
        <View>
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./assets/notif.png')}
            resizeMode="contain"
          />
          <Badge
            value=" "
            status="error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  )
  _clockIn = () => {
    this.setState({ animating: true })
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
          var today = new Date()
          var currDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
          var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

          if (resJson.clockInSuccess) {
            Alert.alert("Successfully Clocked In: " + currentUser.firstname + " " + currentUser.lastname, ' Date: ' + currDate + '\nTime: ' + currTime)

          } else {
            Alert.alert(currentUser.firstname + " " + currentUser.lastname + " is already Clocked In!")
          }
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
    )
    this.setState({ animating: false })
  }

  _clockOut = () => {
    this.setState({ animating: true })
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
          var today = new Date()
          var currDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
          var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
          if (resJson.clockOutSuccess) {
            this.state.compHours = resJson.totalHours
            this._MyComponent.setNativeProps({ text: 'Total Hours Worked This Pay Period: ' + this.state.compHours })
            Alert.alert("Successfully Clocked Out: " + currentUser.firstname, 'Date: ' + currDate + '\nTime: ' + currTime + '\nShift Length: ' + resJson.sessionHours)

          } else {
            Alert.alert(currentUser.firstname + " is already Clocked Out!")
          }
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
    )

    this.setState({ animating: false })
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

          </ImageBackground>
        </View>
      </View>
    )
  }
}


class EmployeePortalScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewPings')}
        style={{ paddingRight: 15 }}
      >
        <View>
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./assets/notif.png')}
            resizeMode="contain"
          />
          <Badge
            value=" "
            status="error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  )

  componentWillMount() {
    fetch(API_URL + 'api/order/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice: '0',
        specialRequest: 'None',
        userId: currentUser.stripe_id

      }),
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>

            <TouchableOpacity
              style={styles.TablesButton}
              onPress={() => {
                this.props.navigation.navigate('TableLayout')
              }
              } >
              <Text style={styles.buttonText}> View Tables </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('ViewSelf')
              }} >
              <Text style={styles.buttonText}> View Profile </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {

                this.props.navigation.navigate('OrderQueue')
              }} >
              <Text style={styles.buttonText}>Order Queue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Menu')
              }} >
              <Text style={styles.buttonText}> View Menu </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('ClockInOut')
              }} >
              <Text style={styles.buttonText}> Clock In/Out </Text>
            </TouchableOpacity>


          </ImageBackground>
        </View>
      </View>
    )
  }
}

class ManagerPortalScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewPings')}
        style={{ paddingRight: 15 }}
      >
        <View>
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./assets/notif.png')}
            resizeMode="contain"
          />
          <Badge
            value=" "
            status="error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  )

  exportPayroll = () => {
    fetch(API_URL + "api/users/export_payroll", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: currentUser.email
      }),
    }).then((res) => res.json()).then(resJson => {
      Alert.alert("Payroll exported and emailed to " + currentUser.email)
    })
  }

  componentWillMount() {
    fetch(API_URL + 'api/order/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice: '0',
        specialRequest: 'None',
        userId: currentUser.stripe_id

      }),
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>

            <TouchableOpacity
              style={styles.TablesButton}
              onPress={() => {
                this.props.navigation.navigate('TableLayout')
              }
              } >
              <Text style={styles.buttonText}>Tables</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.exportPayroll()
              }} >
              <Text style={styles.buttonText}>Export Payroll</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Staff')
              }} >
              <Text style={styles.buttonText}>Staff</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('Menu') //will change this to Menu when I have the edit button showing only for manager working
              }} >
              <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('OrderQueue')
              }} >
              <Text style={styles.buttonText}>Order Queue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('WhichEdit') //will change this to Menu when I have the edit button showing only for manager working
              }} >
              <Text style={styles.buttonText}> Edit Menu </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('ClockInOut')
              }} >
              <Text style={styles.buttonText}> Clock In/Out </Text>
            </TouchableOpacity>

          </ImageBackground>
        </View>
      </View>
    )
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
  }
  state = {
    cardNumber: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    postalCode: '',
    sources: '',
    tip: tip
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
        order_id: order.id,
        amount: order.totalPrice,
        currency: 'usd',
        source: item.stripe_id,
        description: 'Charge for order #' + order.id,
        customer: currentUser.stripe_id
      }),
    }).then((res) => res.json()).then(resJson => {
      this.props.navigation.navigate('Receipt', { tip: this.state.tip })
    })
  }

  componentWillMount() {
    fetch(API_URL + 'api/sources/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
            keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { this.props.navigation.navigate('NewPayment') }}>
            <Text style={styles.submitButtonText}> New Card </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { this.props.navigation.navigate('NewPayment') }}>
            <Text style={styles.submitButtonText}> Cash </Text>
          </TouchableOpacity>


        </View>
      </View>
    )
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
  }
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
                Alert.alert('Please enter information for all of the fields please.')
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
                        customer: currentUser.stripe_id,
                        order_id: order.id
                      }),
                    }).then((res) => res.json()).then(resJson => {
                      this.props.navigation.navigate('Receipt')
                    })
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Sumbit </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
  }
  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.price}
    />
  )
  constructor(props) {
    super(props)
    this.state = {
      order: order,
      tip: tip,
      items: null
    }
  }

  GetSectionListItem = (item) => {
    currentItem = item
    this.props.navigation.navigate('ViewItem', { order: order, takeOut: '1' })
  }

  emailReceipt = () => {
    fetch(API_URL + 'api/order/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
        email: currentUser.email,
        tip: this.state.tip,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      Alert.alert("Emailed!");
    })
  }

  componentWillMount() {
    fetch(API_URL + 'api/order/getItems', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      this.setState({ order: resJson.order })
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }
        this.setState({ items: items })
      }
      this.setState({ tip: tip });
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
        <Text style={styles.receiptFooter}>Tip: ${this.state.tip}</Text>
        <Text style={styles.receiptFooter}>Total: ${order.totalPrice * 1.07 / 100 + parseFloat(this.state.tip)}</Text>
        <View>
          <Text style={styles.text}>
            You have: {currentUser.rewardpoints}
          </Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.emailReceipt()}>
            <Text style={styles.submitButtonText}> Email </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.props.navigation.navigate('Menu')
            }}>
            <Text style={styles.submitButtonText}> Menu </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class DineInOutScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title

    headerTitle: '',
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPingCusty')}
        style={{ paddingRight: 15 }}
      >
        <View>
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./assets/notif.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    )
  }
  )


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
        userId: currentUser.stripe_id

      }),
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
    })

    fetch(API_URL + 'api/items/getAll', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }
      }
      this.props.navigation.navigate('TableLayout')
    })
  }

  render() {
    const { navigate } = this.props.navigation
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
    )
  }
}

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPingCusty')}
        style={{ paddingRight: 15 }}
      >
        <View>
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./assets/notif.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    )
  }
  )
  constructor(props) {
    super(props)
    this.state = {
      order: order,
      items: []
    }
  }

  _onConfirm(navigate, state) {
    navigate('Summary')
  }
  GetSectionListItem = (item) => {
    currentItem = item
    this.props.navigation.navigate('ViewItem', { order: order, takeOut: '1' })
  }

  _onPressOrder = (item) => {
    fetch(API_URL + 'api/order/getItems', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }
      }

      this.props.navigation.navigate('Summary', { order: resJson.order, takeOut: '1' })
    })
  }

  componentWillMount() {
    fetch(API_URL + 'api/items/getAll', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }

        this.setState({ items: items })
      }
    })
  }

  render() {
    const { navigate } = this.props.navigation
    if (currentUser.accountType == 0) {
      button = <EditButton />
    }
    else {
      button = null
    }
    const { order_count } = 0
    const { order_message } = "Order Count is:" + order_count
    return (
      <View>
        <ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { this.props.navigation.navigate("Summary") }}>
            <Text style={styles.submitButtonText}> Pay </Text>
          </TouchableOpacity>
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

    )
  }
}

class ViewPingScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }
  )
  constructor(props) {
    super(props)
    this.state = {
      pings: []
    }
  }

  /*_onConfirm(navigate, state) {
    navigate('Summary')
  }*/
  GetSectionListPing = (ping) => {
    currentPing = ping
    this.props.navigation.navigate('DelPing')
  }

  componentWillMount() {
    fetch(API_URL + 'api/pings/getAll', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempPings = resJson.pings
      pings = []

      for (let ping of tempPings) {
        console.log(ping)
        if (pings[pings.length - 1] && ping.from == pings[pings.length - 1].from) {
          pings[pings.length - 1].data.push(ping)
        }
        else {
          pings.push({ from: ping.from, data: [ping] })
        }

        this.setState({ pings: pings })
      }
    })
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View>
        <ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { this.props.navigation.navigate("AddPingEmp") }}>
            <Text style={styles.submitButtonText}> Send a Ping </Text>
          </TouchableOpacity>
          <SectionList
            renderItem={({ item, index, section }) => <Text style={styles.menuItem} key={index} onPress={this.GetSectionListPing.bind(this, item)}> {item.description} </Text>}
            renderSectionHeader={({ section: { from } }) => (
              <Text style={styles.sectionHeader}>{from}</Text>
            )}
            sections={this.state.pings}
            keyExtractor={(ping, index) => ping + index}
          />
        </ScrollView>

      </View>

    )
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
    /*headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Edit"
        color="#000000"
      />
    ),*/
  }

  constructor(props) {
    super(props)
    this.state = {
      order: order,
      items: []
    }
  }

  _onConfirm(navigate, state) {
    navigate('Summary')
  }
  GetSectionListItem = (item) => {
    currentItem = item
    this.props.navigation.navigate('EditItem', { order: order, takeOut: '1' })
  }

  _onPressOrder = (item) => {
    fetch(API_URL + 'api/order/getItems', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }
      }

      this.props.navigation.navigate('Summary', { order: resJson.order, takeOut: '1' })
    })
  }

  componentWillMount() {
    fetch(API_URL + 'api/items/getAll', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).then(resJson => {
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }

        this.setState({ items: items })
      }
    })
  }

  render() {
    const { navigate } = this.props.navigation
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

    )
  }
}


class DeleteItemScreen extends React.Component {
  static navigationOptions = {

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
      this.props.navigation.state.params.refresh();
      this.props.navigation.navigate('Summary', { order: order, takeOut: '1' })
    });

  }
  _onPressDeleteOrder = () => {
    fetch(API_URL + 'api/order/remove', {//fetch start
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { this._onPressDeleteOrder() }}>
          <Text style={styles.submitButtonText}> Delete Item </Text>

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
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/dine.png')} style={{ width: '100%', height: '100%' }} blurRadius={4}>

            <TouchableOpacity
              style={styles.topButton}
              onPress={() => {
                this.props.navigation.navigate('AddItem')
              }} >
              <Text style={styles.buttonText}> Add New Item </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('EditMenu')
              }} >
              <Text style={styles.buttonText}> Edit Existing Items </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tButton}
              onPress={() => {
                this.props.navigation.navigate('RemoveItem')
              }} >
              <Text style={styles.buttonText}> Remove Item </Text>
            </TouchableOpacity>

          </ImageBackground>
        </View>
      </View>
    )
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
  }
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
                Alert.alert('Please fill in all fields')
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
                    Alert.alert('Succesfully Created Item!')
                    this.props.navigation.navigate('ManagerPortal')
                  } else {
                    Alert.alert('Error Creating Item!')
                    this.props.navigation.navigate('ManagerPortal')
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Create </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
  }
}

class AddPingScreenCust extends React.Component {
  state = {
    description: '',
    from: 'Customer'
  }
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }
  handledescription = (text) => {
    this.setState({ description: text })
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
              Send a Notification
          </Text>
            <Text style={styles.text}>
              Enter your description below:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Description:"
              autoCapitalize="words"
              onChangeText={this.handledescription} />
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.description) {
                Alert.alert('Please fill in your description!')
              } else {
                fetch(API_URL + 'api/pings/create', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: this.state.from,
                    description: this.state.description,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if (resJson.creationSuccess) {
                    Alert.alert('Ping Sent!')
                    pings = parseInt(pings, 10)
                    pings = pings + 1
                    pings = pings.toString()
                  } else {
                    Alert.alert('Error, please contact a staff member.')
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Send </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
  }
}

class AddPingScreenEmp extends React.Component {
  state = {
    description: '',
    from: 'Employee'
  }
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }
  handledescription = (text) => {
    this.setState({ description: text })
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
              Send a Notification
          </Text>
            <Text style={styles.text}>
              Enter your description below:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Description:"
              autoCapitalize="words"
              onChangeText={this.handledescription} />
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.description) {
                Alert.alert('Please fill in your description!')
              } else {
                fetch(API_URL + 'api/pings/create', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: this.state.from,
                    description: this.state.description,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if (resJson.creationSuccess) {
                    Alert.alert('Ping Sent!')
                    pings++
                  } else {
                    Alert.alert('Error, please contact the owner.')
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Send </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
  }
}


class RemoveItemScreen extends React.Component {
  state = {
    itemName: '',
  }
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }
  handleitemName = (text) => {
    this.setState({ itemName: text })
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
              Item Deletion
          </Text>
            <Text style={styles.text}>
              Enter details below:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="   Item Name:"
              autoCapitalize="words"
              onChangeText={this.handleitemName} />
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!this.state.itemName) {
                Alert.alert('Please fill in the field.')
              } else {
                fetch(API_URL + 'api/items/remove', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    itemName: this.state.itemName,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  if (resJson.creationSuccess) {
                    Alert.alert('Succesfully Deleted Item!')
                    this.props.navigation.navigate('ManagerPortal')
                  } else {
                    Alert.alert('Error Deleting Item!')
                    this.props.navigation.navigate('ManagerPortal')
                  }
                })
              }
            }}>
            <Text style={styles.submitButtonText}> Delete </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
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
  }

  _onPressAddOrder = () => {
    fetch(API_URL + 'api/order/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
        itemId: currentItem.id
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      Alert.alert('Added ' + currentItem.itemName + " to order!")
      this.props.navigation.navigate('Menu', { order: order, takeOut: '1' })
    })

  }
  render() {
    const { navigate } = this.props.navigation
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
    )
  }
}

class DelPingScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }

  _onPressDelPing = () => {
    fetch(API_URL + 'api/pings/clear', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: currentPing.description
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      Alert.alert('Ping Removed!')
    })

  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text style={styles.SignUpText}>{'Ping'}</Text>
        <Text style={styles.itemPrice}>{currentPing.from + ": " + currentPing.description}</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => { this._onPressDelPing() }}>
          <Text style={styles.submitButtonText}> Delete Ping </Text>
        </TouchableOpacity>
      </View>
    )
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
  }


  state = {
    itemName: currentItem.itemName,
    itemPrice: "" + currentItem.itemPrice,
    description: currentItem.description,
  }
  handleitemName = (text) => {
    this.setState({ itemName: text })
  }
  handleitemPrice = (text) => {
    this.setState({ itemPrice: text })
  }
  handledescription = (text) => {
    this.setState({ description: text })
  }

  render() {
    const { navigate } = this.props.navigation
    const shadowStyle = {
      shadowOpacity: .2
    }
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View>
            <Text style={styles.SignUpText}>{currentItem.itemName + ' - $' + currentItem.itemPrice / 100}</Text>
            <Text style={styles.itemPrice}>{'Description: ' + currentItem.description}</Text>

          </View>
          <StatusBar barStyle="dark-content" animated={true} backgroundColor='#fff44f' />
          <ScrollView style={{ flex: 1 }}>
            <Text style={styles.SignUpText}>
              Edit Item:
          </Text>
            <Text style={styles.text}>
              Enter Updated Info Below:
          </Text>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.itemName}
              autoCapitalize="words"
              onChangeText={this.handleitemName} />

            <TouchableOpacity
              style={styles.submitButtonEditMenu}
              onPress={() => {
                if (!this.state.itemName) {
                  Alert.alert('Please fill in the updated name field!')
                } else {
                  fetch(API_URL + 'api/items/editName', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      itemName: currentItem.itemName,
                      updatedName: this.state.itemName,
                    }),
                  }).then((res) => res.json()).then(resJson => {
                    if (resJson.nameChange) {
                      currentItem = resJson.item
                      Alert.alert('Succesfully Updated Name!')
                    } else {
                      Alert.alert('Error Updating Name!')
                    }
                  })
                }
              }}>
              <Text style={styles.submitButtonText}> Update Name </Text>
            </TouchableOpacity>

            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.itemPrice}
              autoCapitalize="words"
              onChangeText={this.handleitemPrice} />

            <TouchableOpacity
              style={styles.submitButtonEditMenu}
              onPress={() => {
                if (!this.state.itemPrice) {
                  Alert.alert('Please fill in the updated price field!')
                } else {
                  fetch(API_URL + 'api/items/editPrice', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      itemName: currentItem.itemName,
                      updatedPrice: this.state.itemPrice,
                    }),
                  }).then((res) => res.json()).then(resJson => {
                    if (resJson.priceChange) {
                      Alert.alert('Succesfully Updated Price!')
                    } else {
                      Alert.alert('Error Updating Price!')
                    }
                  })
                }
              }}>
              <Text style={styles.submitButtonText}> Update Price </Text>
            </TouchableOpacity>


            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.description}
              autoCapitalize="words"
              onChangeText={this.handledescription} />

            <TouchableOpacity
              style={styles.submitButtonEditMenu}
              onPress={() => {
                if (!this.state.description) {
                  Alert.alert('Please fill in the updated description field!')
                } else {
                  fetch(API_URL + 'api/items/editDescription', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      itemName: currentItem.itemName,
                      updatedDesc: this.state.description,
                    }),
                  }).then((res) => res.json()).then(resJson => {
                    if (resJson.descChange) {
                      Alert.alert('Succesfully Updated Description!')
                    } else {
                      Alert.alert('Error Updating Description!')
                    }
                  })
                }
              }}>
              <Text style={styles.submitButtonText}> Update Descripton </Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
      </KeyboardAvoidingView>
    )
  }
}

class StaffScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewPings')}
        style={{ paddingRight: 15 }}
      >
        <View>
          <Image
            style={{ height: 30, width: 30, }}
            source={require('./assets/notif.png')}
            resizeMode="contain"
          />
          <Badge
            value=" "
            status="error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  )

  constructor(props) {
    super(props)
    this.state = {
      order: order,
      employees: null,
      employee: null
    }
  }

  GetSectionListItem = (item) => {
    currentItem = item
    //this.props.navigation.navigate('ViewEmployee', { order: order, takeOut: '1' })
  }

  componentWillMount() {
    fetch(API_URL + 'api/users/getEmployees', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      this.setState({ employees: resJson.employees })
    })
  }

  SelectEmployee = (item) => {
    currentEmployee = item;
    this.props.navigation.navigate('ViewEmployee', { order: order, takeOut: '1' })
  }

  render() {
    return (
      <View>
        <Text>Employees: </Text>
        <View>
          <FlatList
            data={this.state.employees}
            renderItem={({ item }) => <Text style={styles.viewItem} onPress={this.SelectEmployee.bind(this, item)}>
              {item.firstname + " " + item.lastname}
            </Text>}
          />
        </View>
      </View>


    )

  }
}

class TableLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table1: 'green',
      table2: 'green',
      table3: 'green',
      table4: 'green',
      table5: 'green',
      table6: 'green',
      table7: 'green',
      table8: 'green',
      table9: 'green',
      table10: 'green',
      table11: 'green',
      table12: 'green',
      reset: 'black',
      legOcc: 'red',
      legDirty: 'coral',
      legReady: 'green',
      tables: null,
      conjoin: false
    };
  }

  componentWillMount() {
    fetch(API_URL + 'api/tables/getAll', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start

      }),//body end
    }).then((res) => res.json()).then(resJson => {
      tables = resJson.tables
      this.setState({ table1: tables[0].status })
      this.setState({ table2: tables[1].status })
      this.setState({ table3: tables[2].status })
      this.setState({ table4: tables[3].status })
      this.setState({ table5: tables[4].status })
      this.setState({ table6: tables[5].status })
      this.setState({ table7: tables[6].status })
      this.setState({ table8: tables[7].status })
      this.setState({ table9: tables[8].status })
      this.setState({ table10: tables[9].status })
      this.setState({ table11: tables[10].status })
      this.setState({ table12: tables[11].status })
    })

  }


  table1Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 1,
            status: this.state.table1,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table1: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table1: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table1: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 1,
            status: this.state.table1,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table1: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table1: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table1: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table1 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 1,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table1: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table1 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 1,
              status: this.state.table1,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table1: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table2Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 2,
            status: this.state.table2,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table2: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table2: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table2: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 2,
            status: this.state.table2,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table2: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table2: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table2: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table2 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 2,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table2: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table2 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 2,
              status: this.state.table2,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table2: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table3Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 3,
            status: this.state.table3,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table3: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table3: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table3: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 3,
            status: this.state.table3,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table3: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table3: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table3: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table3 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 3,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table3: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table3 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 3,
              status: this.state.table3,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table3: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table4Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 4,
            status: this.state.table4,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table4: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table4: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table4: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 4,
            status: this.state.table4,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table4: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table4: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table4: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table4 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 4,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table4: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table4 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 4,
              status: this.state.table4,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table4: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table5Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 5,
            status: this.state.table5,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table5: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table5: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table5: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 5,
            status: this.state.table5,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table5: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table5: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table5: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table5 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 5,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table5: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table5 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 5,
              status: this.state.table5,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table5: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table6Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 6,
            status: this.state.table6,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table6: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table6: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table6: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 6,
            status: this.state.table6,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table6: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table6: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table6: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table6 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 6,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table6: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table6 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 6,
              status: this.state.table6,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table6: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table7Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 7,
            status: this.state.table7,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table7: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table7: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table7: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 7,
            status: this.state.table7,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table7: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table7: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table7: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table7 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 7,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table7: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table7 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 7,
              status: this.state.table7,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table7: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table8Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 8,
            status: this.state.table8,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table8: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table8: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table8: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 8,
            status: this.state.table8,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table8: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table8: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table8: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table8 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 8,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table8: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table8 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 8,
              status: this.state.table8,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table8: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table9Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 9,
            status: this.state.table9,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table9: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table9: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table9: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 9,
            status: this.state.table9,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table9: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table9: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table9: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table9 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 9,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table9: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table9 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 9,
              status: this.state.table9,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table9: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table10Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 10,
            status: this.state.table10,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table10: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table10: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table10: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 10,
            status: this.state.table10,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table10: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table10: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table10: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table10 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 10,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table10: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table10 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 10,
              status: this.state.table10,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table10: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table11Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 11,
            status: this.state.table11,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table11: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table11: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table11: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 11,
            status: this.state.table11,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table11: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table11: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table11: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table11 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 11,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table11: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table11 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 11,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table11: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  table12Select = () => {
    switch (currentUser.accountType) {
      case 0: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 12,
            status: this.state.table12,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table12: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table12: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table12: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 1: {
        fetch(API_URL + 'api/tables/changeStatus', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            table_id: 12,
            status: this.state.table12,
            orderId: order.id
          }),
        }).then((res) => res.json()).then(resJson => {
          currentTable = resJson.table;
          if (resJson.table.status == 'green') {
            this.setState({ table12: 'green' })
            Alert.alert("Table with table ID " + currentTable.id + " is clean");
          } else if (resJson.table.status == 'red') {
            this.setState({ table12: 'red' })
            Alert.alert("Selected valid table with table ID " + currentTable.id);
          } else if (resJson.table.status == 'coral') {
            this.setState({ table12: 'coral' })
            Alert.alert("Table with table ID " + currentTable.id + " is dirty");
          }
        });
      }
      case 2: {
        if (this.state.table12 == "green" && this.state.conjoin == true) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 12,
              status: this.state.table11,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table12: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
            }
            this.setState({ conjoin: false })
            console.log(this.state.conjoin)
          });
        }
        else if (this.state.table12 == "green" && this.state.conjoin == false) {
          fetch(API_URL + 'api/tables/changeStatus', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              table_id: 12,
              status: this.state.table12,
              orderId: order.id
            }),
          }).then((res) => res.json()).then(resJson => {
            currentTable = resJson.table;
            if (resJson.table.status == 'red') {
              this.setState({ table12: 'red' })
              Alert.alert("Selected valid table with table ID " + currentTable.id + ".");
              this.props.navigation.navigate('Menu');
            }
          });
        }
      }
    }
  }

  conjoinButton = () => {
    this.setState({ conjoin: true })
    console.log(this.state.conjoin)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TabTitleCont}>
          <Text style={styles.TabTitle}>
            Table Layout

                        </Text>
        </View>
        <View style={styles.legReady}>
          <Text style={{ color: 'white' }}>       Ready</Text>
        </View>
        <View style={styles.legDirty}>
          <Text style={{ color: 'white' }}>         Dirty</Text>
        </View>
        <View style={styles.legOcc}>
          <Text style={{ color: 'white' }}>    Occupied</Text>
        </View>

        <View style={styles.conjoin}>
          <Button
            color='black'
            title='  Conjoin  '
            onPress={this.conjoinButton.bind(this)}
          />
        </View>


        <View style={styles.table1}>
          <Button
            title="  #1  "
            color={this.state.table1}
            onPress={this.table1Select.bind(this)

            }
          />
        </View>
        <View style={styles.table2}>
          <Button
            title="  #2  "
            color={this.state.table2}
            onPress={this.table2Select.bind(this)
            }
          />
        </View>
        <View style={styles.table3}>
          <Button
            title="  #3  "
            color={this.state.table3}
            onPress={this.table3Select.bind(this)
            }
          />
        </View>
        <View style={styles.table4}>
          <Button
            title="  #4  "
            color={this.state.table4}
            onPress={this.table4Select.bind(this)
            }
          />
        </View>
        <View style={styles.table5}>
          <Button
            title="  #5  "
            color={this.state.table5}
            onPress={this.table5Select.bind(this)
            }
          />
        </View>
        <View style={styles.table6}>
          <Button
            title="  #6  "
            color={this.state.table6}
            onPress={this.table6Select.bind(this)
            }
          />
        </View>
        <View style={styles.table7}>
          <Button
            title="         #7         "
            color={this.state.table7}
            onPress={this.table7Select.bind(this)
            }
          />
        </View>
        <View style={styles.table8}>
          <Button
            title="         #8         "
            color={this.state.table8}
            onPress={this.table8Select.bind(this)
            }
          />
        </View>
        <View style={styles.table9}>
          <Button
            title="         #9         "
            color={this.state.table9}
            onPress={this.table9Select.bind(this)
            }
          />
        </View>
        <View style={styles.table10}>
          <Button
            title="        #10        "
            color={this.state.table10}
            onPress={this.table10Select.bind(this)
            }
          />
        </View>
        <View style={styles.table11}>
          <Button
            title="        #11        "
            color={this.state.table11}
            onPress={this.table11Select.bind(this)
            }
          />
        </View>
        <View style={styles.table12}>
          <Button
            title="        #12        "
            color={this.state.table12}
            onPress={this.table12Select.bind(this)
            }
          />
        </View>
      </View>

    );
  }
}

class Table extends React.Component {
  render() {
    return (
      <View style={styles.tableBackground}>
        <Table1 />
        <Table2 />
        <Table3 />
        <Table4 />
        <Table5 />
        <Table6 />
        <Table7 />
        <Table8 />
        <Table9 />
        <Table10 />
        <Table11 />
        <Table12 />
      </View>
    );
  }
}


class OrderQueueScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }

  constructor(props) {
    super(props)
    this.state = {
      order: order,
      orders: []
    }
  }

  GetSectionListOrder(order) {
    currentOrder = order
    this.props.navigation.navigate('OrderSummaryStaff', { order: order })
  }

  componentWillMount() {
    fetch(API_URL + 'api/order/getOrders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

      }),
    }).then((res) => res.json()).then(resJson => {
      this.setState({ orders: resJson.orders })
    })

  }

  render() {

    return (
      <View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => { this.componentWillMount() }} >
          <Text style={styles.buttonText}> Refresh </Text>
        </TouchableOpacity>
        <Text style={styles.SignUpText}>Active Orders:</Text>
        <View>
          <FlatList
            data={this.state.orders}
            renderItem={({ item }) => <Text style={styles.menuItem} onPress={() => this.GetSectionListOrder(item)}>{"Order #" + item.id + " - " + item.status}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

    )

  }
}

class OrderSummaryStaffScreen extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#fff44f',
    },
    headerTintColor: '#000000',
  }

  constructor(props) {
    super(props)
    this.state = {
      order: order,
      items: items
    }
  }

  GetSectionListItem = (item) => {
    currentItem = item
    this.props.navigation.navigate('ViewItem', { order: order, takeOut: '1' })
  }

  componentWillMount() {
    fetch(API_URL + 'api/order/getItems', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: currentOrder.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      this.setState({ items: resJson.items })
    })
  }

  SetStatus = (status) => {
    fetch(API_URL + 'api/order/setStatus', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: currentOrder.id,
        status: status
      }),
    }).then((res) => res.json()).then(resJson => {
      this.setState({ order: resJson.order })
    })
  }

  render() {
    let data = [{
      value: 'Paid',
    }, {
      value: 'In Progress',
    }, {
      value: 'Ready',
    }, {
      value: 'Served',
    }]
    return (
      <View>
        <Text style={styles.SignUpText}>Order Summary:</Text>
        <View>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => <Text style={styles.menuItem} onPress={() => this.GetSectionListItem(item)}>{item.itemName}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Dropdown
          label='Order Status'
          onChangeText={this.SetStatus}
          data={data}
        />
      </View>

    )

  }
}

class ViewEmployee extends React.Component {
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
      clocks: null,
      employee: null,
      username: ''
    };
  }

  componentWillMount() {

    fetch(API_URL + 'api/users/getEmployee', {//fetch start
      method: 'POST',
      headers: {//header start
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },//header end
      body: JSON.stringify({//body start
        username: currentUser.username,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      currentEmployee = resJson.employee
      this.setState({ employee: resJson.employee });;
    })
  }

  GetSectionListItem = (item) => {
    currentEmployee = item;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.SignUpText}>{currentEmployee.firstname + ' ' + currentEmployee.lastname}</Text>
        <Text style={styles.itemPrice}>{'ID: ' + currentEmployee.stripe_id}</Text>
        <Text style={styles.itemPrice}>{'Email: ' + currentEmployee.email}</Text>
        <Text style={styles.itemPrice}>{'Total Hours Worked: ' + currentEmployee.totalHoursWorked}</Text>
      </View>
    );
  }
}


class ViewSelf extends React.Component {
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
      clocks: null,
      employee: null,
      username: ''
    };
  }

  GetSectionListItem = (item) => {
    currentEmployee = item;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.SignUpText}>{currentUser.firstname + ' ' + currentUser.lastname}</Text>
        <Text style={styles.itemPrice}>{'ID: ' + currentUser.stripe_id}</Text>
        <Text style={styles.itemPrice}>{'Email: ' + currentUser.email}</Text>
        <Text style={styles.itemPrice}>{'Total Hours Worked: ' + currentUser.totalHoursWorked}</Text>
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
  }
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
    super(props)
    this.state = {
      order: order,
      items: null,
      tax: null,
      tip: null,
      total: null,
    }
  }

  handleTip = (text) => {
    this.setState({ tip: parseFloat(text) })
    this.setState({ tax: order.totalPrice * .07 / 100 })
    this.setState({ total: (order.totalPrice * 1.07) / 100 + parseFloat(text) })
    this.setState({ total: (order.totalPrice * 1.07) / 100 + parseFloat(text) })
    tip = parseFloat(text)
    this.forceUpdate()

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
    fetch(API_URL + 'api/order/getItems', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
      }),//body end
    }).then((res) => res.json()).then(resJson => {
      order = resJson.order
      this.setState({ order: resJson.order })
      let tempItems = resJson.items
      items = []

      for (let item of tempItems) {
        console.log(item)
        if (items[items.length - 1] && item.category == items[items.length - 1].category) {
          items[items.length - 1].data.push(item)
        }
        else {
          items.push({ category: item.category, data: [item] })
        }
        this.setState({ items: items })
        this.setState({ subtotal: order.totalPrice / 100 })
        this.setState({ tax: (order.totalPrice * .07 / 100) })
        this.setState({ total: order.totalPrice * 1.07 / 100 })
      }

    }, err => {
      this.setState({ items: null })
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
        <Text style={styles.receiptFooter}>Subtotal: ${this.state.subtotal}</Text>
        <Text style={styles.receiptFooter}>Tax: ${this.state.tax}</Text>
        <Text style={styles.receiptFooter}>Tip: </Text>
        <TextInput style={styles.tipBox}
          underlineColorAndroid="transparent"
          placeholder="00"
          autoCapitalize="none"
          onChangeText={this.handleTip} />

        <Text style={styles.receiptFooter}>Total: ${this.state.total}</Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.props.navigation.navigate('PaymentChoices', { order: [], tip: this.state.tip })
          }}>
          <Text style={styles.submitButtonText}> Pay </Text>
        </TouchableOpacity>
      </View>
    )
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
    Menu: MenuScreen,
    Summary: SummaryScreen,
    ViewItem: ViewItemScreen,
    Staff: StaffScreen,
    OrderQueue: OrderQueueScreen,
    OrderSummaryStaff: OrderSummaryStaffScreen,
    EditMenu: ManagerMenu,
    WhichEdit: WhichEditScreen,
    EditItem: EditItemScreen,
    AddItem: AddItemScreen,
    RemoveItem: RemoveItemScreen,
    AddPingCusty: AddPingScreenCust,
    AddPingEmp: AddPingScreenEmp,
    ViewPings: ViewPingScreen,
    DelPing: DelPingScreen,
    TableLayout: TableLayout,
    ViewEmployee: ViewEmployee,
    ViewSelf: ViewSelf,
    Table: Table,
    DeleteItem: DeleteItemScreen
  },
  {
    initialRouteName: 'Welcome',
  }
)

const AppContainer = createAppContainer(RootStack)

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
  tipBox: {
    marginTop: 20,
    marginLeft: 320,
    marginRight: 15,
    backgroundColor: 'white',
    height: 40,
    borderColor: '#dadce0',
    borderWidth: 1,
    borderRadius: 5
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
  submitButtonEditMenu: {
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
  container100: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  TabTitleCont: {
    position: 'absolute',
    bottom: 575,
    left: 140,
    fontSize: 15
  },
  legOcc: {
    position: 'absolute',
    bottom: 515,
    left: 140,
    height: 45,
    width: 90,
    backgroundColor: 'red',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  legDirty: {
    position: 'absolute',
    bottom: 515,
    left: 255,
    height: 45,
    width: 90,
    backgroundColor: 'coral',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  legReady: {
    position: 'absolute',
    bottom: 515,
    left: 25,
    height: 45,
    width: 90,
    backgroundColor: 'green',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  reset: {
    position: 'absolute',
    bottom: 480,
    left: 140,
    height: 45,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table1: {
    position: 'absolute',
    bottom: 50,
    left: 5,
    height: 75,
    width: 30,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table2: {
    position: 'absolute',
    bottom: 200,
    left: 5,
    height: 75,
    width: 30,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table3: {
    position: 'absolute',
    bottom: 350,
    left: 5,
    height: 75,
    width: 30,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table4: {
    position: 'absolute',
    bottom: 350,
    left: 325,
    height: 75,
    backgroundColor: 'black',
    width: 30,
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table5: {
    position: 'absolute',
    bottom: 200,
    left: 325,
    height: 75,
    width: 30,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table6: {
    position: 'absolute',
    bottom: 50,
    left: 325,
    height: 75,
    width: 30,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table7: {

    position: 'absolute',
    bottom: 60,
    left: 80,
    height: 50,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table8: {
    position: 'absolute',
    bottom: 210,
    left: 80,
    height: 50,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table9: {

    position: 'absolute',
    bottom: 355,
    left: 80,
    height: 80,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row',

  },
  table10: {
    position: 'absolute',
    bottom: 60,
    left: 200,
    height: 50,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table11: {
    position: 'absolute',
    bottom: 210,
    left: 200,
    height: 50,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  table12: {
    position: 'absolute',
    bottom: 355,
    left: 200,
    height: 80,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  },
  tableBackground: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  conjoin: {
    position: 'absolute',
    bottom: 450,
    left: 140,
    height: 45,
    width: 90,
    backgroundColor: 'black',
    aspectRatio: 2,
    flexDirection: 'row'
  }
})


export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
