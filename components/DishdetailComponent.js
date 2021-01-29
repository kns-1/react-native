import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, Button, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


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

    if (dish != null) {
        return (
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
      const postComment = props.postComment;
      const dishId = props.dishId;

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
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //  dishes: DISHES,
            //  comments: COMMENTS,
            favorites: [],
            rating:'',
            author:'',
            comment:'',
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

        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId ===this.props.route.params.dishId)} />
    }

    resetForm() {
        this.setState({
            rating:'',
            author:'',
            comment:'',
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
                            onPress={() => { this.handleSubmit(); }}
                            color="#512DA8"
                            title="Submit"
                            style={styles.modalText}
                        />

                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
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