import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';


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
      }}
      
      options={{
        headerLeft: () => ( <Icon name="menu" size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } /> 
        ),         
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
    }}
    
    options={{
      headerLeft: () => ( <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> 
      ),         
    }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
      },
    }}
    
    options={{
      headerLeft: () => ( <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> 
      ),         
    }}>
      <Stack.Screen name="About Us" component={About} />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
      },
    }}
    
    options={{
      headerLeft: () => ( <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> 
      ),         
    }}>
      <Stack.Screen name="Contact Us" component={Contact} />
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
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='home'
          type='font-awesome'
          sise={24}
          color={tintColor} />
      )
    }} />
    <Drawer.Screen name="About Us" component={AboutNavigator} options={{
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='info-circle'
          type='font-awesome'
          sise={24}
          color={tintColor} />
      )
    }} />
    <Drawer.Screen name="Menu" component={MenuNavigator} options={{
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='list'
          type='font-awesome'
          sise={24}
          color={tintColor} />
      )
    }} />

    <Drawer.Screen name="Contact Us" component={ContactNavigator} options={{
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='address-card'
          type='font-awesome'
          sise={22}
          color={tintColor} />
      )
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