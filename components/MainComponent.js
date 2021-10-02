import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

//createStackNavigator is a function that requires one function. It lists which components will be available for the stack.
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory', //when navigator is open, it'll default to show this component
        defaultNavigationOptions: { //configure the settings for the header
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator( //needs an object that contains screens that will be in the drawer
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        About: {screen: AboutNavigator },
        Contact: {screen: ContactNavigator }
         //routed through stack navigator not the components themselves
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

const AppNavigator = createAppContainer(MainNavigator) //MainNavigator is the top navigator, which is the home navigator

//will return an app component to tie top level navigator to top level environment. Always wrap top level nav with AppNavigator 
class Main extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight //IOS fix, Checks if the Platform is ios. 
            }}>
                <AppNavigator /> 
                {/* contains screens for directory and campsite components */}
            </View>
        );
    }
}

export default Main;

//campsites data was moved to Directory component
//Navigator will handle the routing to the directory site so remove event handler
