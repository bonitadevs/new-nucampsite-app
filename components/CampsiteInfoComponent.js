import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments
}; //mapStateToProps tell the redux store which props of the state data is needed for this particular component. We only need the campsites and comments data. 
};

function RenderCampsite(props) {

    const {campsite} = props; //destructure campsite props

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ?  'heart' : 'heart-o'} //if fav has been clicked (true) show heart if not show heart in outline. 
                    type='font-awesome'
                    color='#f50'
                    raised //gives icon subtle shadow effect
                    reverse //reverses the color scheme
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()} //if it is a favorite already log that, if not make favorite
                    />

            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View> //renders comments into final form into text comp 
        );
    }; //gets item prop to destructure out. 
    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false //temporary store of favorite campsite data
        };
    }

    markFavorite() {
        this.setState({favorite: true});
    }//eventHandle that toggles fav prop to true. 

    static navigationOptions = { 
        title: 'Campsite Information' //set title for the screen, campsite info
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId'); //to receive parameter of Campsite ID
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0]; //pull out campsite info with filter index of [0]
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId); //filtered comment we want to render into a new array called comments
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} /> 
                {/* pass comments array into the RenderComments comp */}
            </ScrollView>
        );
    }
}

export default connect (mapStateToProps)(CampsiteInfo);