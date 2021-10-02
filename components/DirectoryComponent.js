import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component { //updated to class comp to store state 

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        }; //added campsite data to the local state
    }

    static navigationOptions = {
        title: 'Directory' //configured text for the title , becomes a navigation option
    }

    render() {
        const { navigate } = this.props.navigation; // each app screen gets the navigation prop automatically
        //navigate prop routes user to the campsite when they select it
        const renderDirectoryItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            );
        };

        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;