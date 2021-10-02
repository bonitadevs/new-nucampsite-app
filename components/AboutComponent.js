import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements';
import {PARTNERS} from '../shared/partners';


class About extends Component {
    constructor() {
        super();

        this.state = {
            partners : PARTNERS
        };
    }
   
    static navigationOptions = { //screen title About in nav options
        title: 'About Us'
    }
    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: require('./images/bootstrap-logo.png')}}
                />
            );
        };
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners" wrapperStyle={{margin: 20}}>
                    <FlatList
                        data={this.state.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        )
    }
}

function Mission () {
    return (
        <Card title="Our Mission" wrapperStyle={{margin: 20}}>
            <Text style={{margin: 10}}>
            We present a curated database of the best campsites in the vast woods and back-country of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    )
}
 


export default About;
