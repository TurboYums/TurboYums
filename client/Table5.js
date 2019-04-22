//import liraries
import React, { Component } from 'react';
import { View, Text, PanResponder, Button, Animated, Alert, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, Navigation } from 'react-navigation';
// create a component
class Table5 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY()
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            // Initially, set the value of x and y to 0 (the center of the screen)
            onPanResponderGrant: (e, gestureState) => {
                // Set the initial value to the current state
                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },

            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y },
            ]),

            onPanResponderRelease: (e, { vx, vy }) => {
                // Flatten the offset to avoid erratic behavior
                this.state.pan.flattenOffset();
            }
        });
    }

    render() {
        // Destructure the value of pan from the state
        let { pan } = this.state;

        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let imageStyle = { transform: [{ translateX }, { translateY }] };

        return (
            <Animated.View style={imageStyle}
                {...this._panResponder.panHandlers}
            >
                <View style={styles.table}>
                    <Text style={styles.text}>       #5   </Text>
                </View>


            </Animated.View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    table: {
        height: 70,
        width: 30,
        backgroundColor: 'green',
        flexDirection: 'row'
    },
    text: {
        color: 'white'
    }
});

//make this component available to the app
export default Table5;