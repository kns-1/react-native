import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MenuNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Menu"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
      },
    }}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
  );
};


const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
      },
    }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{
        backgroundColor: '#D1C4E9',
    }}>
      <Drawer.Screen name="Home" component={HomeNavigator} options={{
          title: 'Home',
          drawerLabel: 'Home'
        }} />
      <Drawer.Screen name="Menu" component={MenuNavigator} options={{
          title: 'Menu',
          drawerLabel: 'Menu'
        }} />
    </Drawer.Navigator>
  );
};

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dishes: DISHES,
  //     selectedDish: null
  //   };
  // }

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId })
  // }

  render() {

    return (

      // <View>
      //   <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
      //   <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      // </View>

      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }
}

export default Main;