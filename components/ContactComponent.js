import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';


class Contact extends Component {

    static navigationOptions = { //screen title About in nav options
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Card title="Contact Us" >
                    <Text>1 Nucamp Way</Text>
                    <Text>Seattle, WA 98001</Text>
                    <Text style={{marginBottom: 10}}>U.S.A.</Text>
                    
                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: campsites@nucamp.co</Text>
                </Card>
            </ScrollView>
        )
    }
}

export default Contact;
