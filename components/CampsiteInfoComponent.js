import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites'; //imported state data

function RenderCampsite({campsite}) {

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = { 
        title: 'Campsite Information' //set title for the screen, campsite info
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId'); //to receive parameter of Campsite ID
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0]; //pull out campsite info with filter index of [0]
        return <RenderCampsite campsite={campsite} />; //last render info from campsite data
    }
}

export default CampsiteInfo;