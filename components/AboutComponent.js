import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


function History() {
    return (
        <Card>
            <Card.Title>Our History</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
           </Text>
            <Text style={{ margin: 10 }}>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}


const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

class About extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         leaders: LEADERS,
    //     };
    // }

    render() {
        const renderLeadersItem = ({ item, index }) => {
            return (
                <ListItem key={index}>
                    <Avatar source={{ uri: baseUrl + item.image }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        // return (
        //     <ScrollView>
        //         <History />

        //         <Card>
        //             <Card.Title>Corporate Leadership</Card.Title>
        //             <Card.Divider />
        //             <FlatList
        //                 //  data={this.state.leaders}
        //                 data={this.props.leaders.leaders}
        //                 renderItem={renderLeadersItem}
        //                 keyExtractor={item => item.id.toString()}
        //             />
        //         </Card>
        //     </ScrollView>
        // );

        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <History />
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>

                        <History />

                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>

                        <History />

                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <FlatList
                                data={this.props.leaders.leaders}
                                renderItem={renderLeadersItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(About);