import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
    }; //mapStateToProps tell the redux store which props of the state data is needed for this particular component. We only need the campsites data. 
};

class Directory extends Component { //updated to class comp to store state 

    static navigationOptions = {
        title: 'Directory' //configured text for the title , becomes a navigation option
    }

    render() {
        const { navigate } = this.props.navigation; // each app screen gets the navigation prop automatically
        //navigate prop routes user to the campsite when they select it
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);