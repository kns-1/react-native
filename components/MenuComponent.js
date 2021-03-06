import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
//import { ListItem, Avatar } from 'react-native-elements';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

class Menu extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dishes: DISHES,
    //     };
    // }

    static navigationOptions = {
        title: 'Menu'
    };


    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            return (
                // <ListItem key={index}
                //     onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                //     <Avatar source={require('./images/uthappizza.png')} />
                //     <ListItem.Content>
                //         <ListItem.Title>{item.name}</ListItem.Title>
                //         <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                //     </ListItem.Content>
                // </ListItem>

                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            );
        };

        // return (
        //     <FlatList
        //         data={this.props.dishes.dishes}
        //         renderItem={renderMenuItem}
        //         keyExtractor={item => item.id.toString()}
        //     />
        // );

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}


export default connect(mapStateToProps)(Menu);