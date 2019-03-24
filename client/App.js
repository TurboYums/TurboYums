import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Alert, AppRegistry, StyleSheet, SectionList, TouchableNativeFeedback, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


const API_URL = 'http://192.168.1.253:5000/';
let currentUser = ' ';
let orderId = '';
let token = '';

class WelcomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
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
              style={styles.button}
              onPress={() => {
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
            <Text style={styles.submitButtonText}> SUBMIT </Text>
          </TouchableOpacity>
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
                        this.props.navigation.navigate('ClockInOut');
                        break;
                      //customer is 1
                      case 1:
                        this.props.navigation.navigate('DineInOut');
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
                      username: currentUser.username,
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
                    username: currentUser.username,
                  }),
                }).then((res) => res.json()).then(resJson => {
                  var today = new Date();
                  var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                  var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  if(resJson.clockOutSuccess){ 
                    this.state.compHours = resJson.totalHours;
                    this._MyComponent.setNativeProps({text:'Total Hours Worked This Pay Period: ' + this.state.compHours});
                    Alert.alert("Successfully Clocked Out: " + currentUser.username, 'Date: ' + currDate + '\nTime: ' + currTime+ '\nShift Length: ' + resJson.sessionHours);
                  
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


        </View>
        <SectionList
          sections={[
            { title: 'Pizza', data: ['3.00'] },
            { title: 'French Toast', data: ['8.00'] },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        <View>
          <Text style={styles.text}>
          You have: {currentUser.rewardpoints}
          </Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
    
            }}>
            <Text style={styles.submitButtonText}> SUBMIT </Text>
          </TouchableOpacity>
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


      fetch(API_URL + 'api/order/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice:'0',
          specialRequest:'None',
          userId:'1'

        }),
      }).then((res) => res.json()).then(resJson => {
         orderId=resJson.order.id;
      });
    
    
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
  _onButtonAdd(navigate,state,title,price) {//on button start
    console.log("Menu")
    console.log(state)

    if(!title||!price){//if start
      Alert.alert('Please select an item to order');
    }else{//if end else start
      fetch(API_URL + 'api/items/create', {//fetch start
        method: 'POST',
        headers: {//header start
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },//header end
        body: JSON.stringify({//body start
          itemName: title,
          itemPrice: price,
        }),//body end
      }).then((res) => res.json()).then(resJson => { //fetch end and json start
        fetch(API_URL + 'api/order/add', {//fetch start
          method: 'POST',
          headers: {//header start
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },//header end
          body: JSON.stringify({//body start
            orderId: orderId,
            itemId: resJson.item.id
          }),//body end
        }).then((res) => res.json()).then(resJson => {//fetch end and json start2
          // if(resJson.creationSuccess){
          //   Alert.alert('Succesfully Added an Item');
          //   // this.props.navigation.navigate('LogIn');
          // }else{
          //   Alert.alert('Error Adding Item!');
          //   // this.props.navigation.navigate('Welcome');
          // }
        });//json end2
        })//json end
    }//else end
    
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
  _onButtonAdd(navigate,state,title,price) {//on button start
    console.log("Menu")
    console.log(state)

    if(!title||!price){//if start
      Alert.alert('Please select an item to order');
    }else{//if end else start
      fetch(API_URL + 'api/items/create', {//fetch start
        method: 'POST',
        headers: {//header start
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },//header end
        body: JSON.stringify({//body start
          itemName: title,
          itemPrice: price,
        }),//body end
      }).then((res) => res.json()).then(resJson => { //fetch end and json start
        fetch(API_URL + 'api/order/add', {//fetch start
          method: 'POST',
          headers: {//header start
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },//header end
          body: JSON.stringify({//body start
            orderId: orderId,
            itemId: resJson.item.id
          }),//body end
        }).then((res) => res.json()).then(resJson => {//fetch end and json start2
          // if(resJson.creationSuccess){
          //   Alert.alert('Succesfully Added an Item');
          //   // this.props.navigation.navigate('LogIn');
          // }else{
          //   Alert.alert('Error Adding Item!');
          //   // this.props.navigation.navigate('Welcome');
          // }
        });//json end2
        })//json end
    }//else end
    
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

  _onButtonAdd(navigate,state,title,price) {//on button start
    console.log("Menu")
    console.log(state)

    if(!title||!price){//if start
      Alert.alert('Please select an item to order');
    }else{//if end else start
      fetch(API_URL + 'api/items/create', {//fetch start
        method: 'POST',
        headers: {//header start
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },//header end
        body: JSON.stringify({//body start
          itemName: title,
          itemPrice: price,
        }),//body end
      }).then((res) => res.json()).then(resJson => { //fetch end and json start
        fetch(API_URL + 'api/order/add', {//fetch start
          method: 'POST',
          headers: {//header start
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },//header end
          body: JSON.stringify({//body start
            orderId: orderId,
            itemId: resJson.item.id
          }),//body end
        }).then((res) => res.json()).then(resJson => {//fetch end and json start2
          // if(resJson.creationSuccess){
          //   Alert.alert('Succesfully Added an Item');
          //   // this.props.navigation.navigate('LogIn');
          // }else{
          //   Alert.alert('Error Adding Item!');
          //   // this.props.navigation.navigate('Welcome');
          // }
        });//json end2
        })//json end
    }//else end
    
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
    Welcome: WelcomeScreen,
    LogIn: LogInScreen,
    ClockInOut: ClockInOutScreen,
    Payment: PaymentScreen,
    Receipt: ReceiptScreen,
    SignUp: SignUpScreen,
    EmployeePortal: EmployeePortalScreen,
    DineInOut: DineInOutScreen,
    Menu: MenuScreen,
    Pizza:PizzaScreen,
    Burger:BurgerScreen,
    Drinks:DrinkScreen,
    Summary:SummaryScreen,
  },
  {
    initialRouteName: 'Welcome',
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'right',
  },
  text: {
    marginTop: 10,
    color: '#101010',
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
  hourViewer: {
    margin: 15,
    backgroundColor: 'transparent',
    height: 40,
    borderColor: 'transparent',
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
