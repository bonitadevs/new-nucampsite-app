import React, { Component } from 'react';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share } from 'react-native';





const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
}; //mapStateToProps tell the redux store which props of the state data is needed for this particular component. We only need the campsites, favorites and comments data. 
};

const mapDispatchToProps = {
    postFavorite,
    postComment
  } //to pass in the post favorite action creator 

  function RenderCampsite(props) {

    const {campsite} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    //dx distance of a gesture across the x axis. This will recognize a horizontal drag less than -200 pixels across the screen

    const recognizeComment = ({dx}) => (dx > 200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }else if (recognizeComment(gestureState)) {
                props.onShowModal();
            }
            return true;
        }
    });

    const shareCampsite = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if (campsite) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}
                >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                        name={props.favorite ?  'heart' : 'heart-o'} //if fav has been clicked (true) show heart if not show heart in outline. 
                        type='font-awesome'
                        color='#f50'
                        raised //gives icon subtle shadow effect
                        reverse //reverses the color scheme
                        onPress={() => props.favorite ? 
                            console.log('Already set as a favorite') : props.markFavorite()} //if it is a favorite already log that, if not make favorite
                        />
                        <Icon
                        name='pencil' 
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse 
                        onPress={() => props.onShowModal()} //opens comment modal when clicked
                        />
                        
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => shareCampsite(campsite.name, campsite.description, baseUrl + campsite.image)} 
                        />
                        
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

function RenderComments({comments}) {
    

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating 
                    startingValue = {item.rating}
                    readonly
                    imageSize={10} 
                    style={{
                        alignItems: 'flex-start',
                        paddingVertical: '5%'
                    }}
                    />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View> //renders comments into final form into text comp 
        );
    }; //gets item prop to destructure out. 
    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}
class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            author: " ",
            text: " ",
            showModal: false 
        };

    }

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }//eventHandle that toggles fav prop to true. 

    static navigationOptions = { 
        title: 'Campsite Information' //set title for the screen, campsite info
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    } //changes show modal view from true to false

    handleComment(campsiteId) {
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            rating: 5,
            author: " ",
            text: " ",
            showModal: false
        });
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId'); //to receive parameter of Campsite ID
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0]; //pull out campsite info with filter index of [0]
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId); 
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)} onShowModal={() => this.toggleModal()}
                    />
                <RenderComments comments={comments} /> 
                {/* pass comments array into the RenderComments comp */}
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                                showRating
                                startingValue = {this.state.rating}
                                imageSize = {40}
                                onFinishRating = {rating => this.setState({rating: rating})} 
                                style={{paddingVertical: 10}}
                            /> 
                        <Input 
                            placeholder = 'Author'
                            leftIcon = {
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                                }
                                leftIconContainerStyle = {{paddingRight: 10}}
                                onChangeText = {author => this.setState({author: author})} 
                        />
                         <Input 
                            placeholder = "Comment"
                            leftIcon = {
                                <Icon
                                    name='comment-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                            leftIconContainerStyle = {{paddingRight: 10}}
                            onChangeText = {text => this.setState({text: text})}
                        />
                        <View style={{margin: 10}}>
                            <Button onPress={() => {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                            }}
                                color='#5637DD'
                                title='Submit' />
                        </View>
                        <View style={{margin: 10}}>
                            <Button onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                            }}
                                color='#808080'
                                title='Cancel' />
                        </View>
                    </View>
                </Modal> 
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);


//you can remove arrow function in mapDispatchToProps

//if the key and value are the same, you can remove the value or just pass the value

