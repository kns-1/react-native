import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, Button, Modal, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return true;
        else
            return false;
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000).then(
                endState => console.log(endState.finished ? 'finished' : 'cancelled')
            );
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress('fav') }
                        },
                    ],
                    { cancelable: false }
                );
                }
            else if (recognizeComment(gestureState)) {
                console.log('Comment gesture'); 
                props.onPress('pen');
            }

            return true;
        }
    })

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Image source={{ uri: baseUrl + dish.image }} />
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress('fav')}
                    />

                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.onPress('pen')}
                    />
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}

// function Dishdetail(props) {
//     return (<RenderDish dish={props.dish} />);
// }

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //  dishes: DISHES,
            //  comments: COMMENTS,
            favorites: [],
            rating: '',
            author: '',
            comment: '',
            showModal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        // this.setState({ favorites: this.state.favorites.concat(dishId) });
        this.props.postFavorite(dishId);
    }


    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleSubmit() {
        this.toggleModal();
        this.props.postComment(this.props.route.params.dishId, this.state.rating, this.state.author, this.state.comment);
    }

    resetForm() {
        this.setState({
            rating: '',
            author: '',
            comment: '',
            showModal: false
        });
    }

    render() {

        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(my_element => my_element === dishId)}
                    onPress={(my_mark) => {
                        if (my_mark == 'fav')
                            this.markFavorite(dishId)
                        else if (my_mark == 'pen')
                            this.toggleModal();
                    }
                    } />

                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>

                        <Rating
                            ratingCount={5}
                            style={styles.modalText}
                            showRating
                            onFinishRating={value => this.setState({ rating: value })}
                        />

                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            style={styles.modalText}
                            onChangeText={value => this.setState({ author: value })}
                        />

                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            style={styles.modalText}
                            onChangeText={value => this.setState({ comment: value })}
                        />

                        <Button
                            onPress={() => { this.handleSubmit(); this.resetForm(); }}
                            color="#512DA8"
                            title="Submit"
                            style={styles.modalText}
                        />

                        <Button
                            onPress={() => { this.toggleModal(); }}
                            color="grey"
                            title="Cancel"
                            style={styles.modalText}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);