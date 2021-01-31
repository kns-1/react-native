import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { View, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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
        headerLeft: () => (<Icon name="list" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
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
        headerLeft: () => (<Icon name="home" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
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
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
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
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
        ),
      }}>
      <Stack.Screen name="Contact Us" component={Contact} />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
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
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
        ),
      }}>
      <Stack.Screen name="Reserve Table" component={Reservation} />
    </Stack.Navigator>
  );
};

const FavoritesNavigator = () => {
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
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
        ),
      }}>
      <Stack.Screen name="My Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

const LoginNavigator = () => {
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
        headerLeft: () => (<Icon name="menu" size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
        ),
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);


const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{
      backgroundColor: '#D1C4E9',
    }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />
      }>

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

      <Drawer.Screen name="Favorites" component={FavoritesNavigator} options={{
        title: 'My Favorites',
        drawerLabel: 'My Favorites',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='heart'
            type='font-awesome'
            sise={24}
            color={tintColor} />
        )
      }} />

      <Drawer.Screen name="Reserve Table" component={ReservationNavigator} options={{
        title: 'Reserve Table',
        drawerLabel: 'Reserve Table',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='cutlery'
            type='font-awesome'
            sise={22}
            color={tintColor} />
        )
      }} />

      <Drawer.Screen name="Login" component={LoginNavigator} options={{
        title: 'Login',
        drawerLabel: 'Login',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='sign-in'
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

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.getConnectionInfo()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }



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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);