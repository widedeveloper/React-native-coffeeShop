import '../Config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

import firebase from 'firebase';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentWillMount() {
    const fbconfig = {
      apiKey: Config.apiKey,
      authDomain: Config.authDomain,
      databaseURL: Config.databaseURL,
      projectId: Config.projectId,
      storageBucket: Config.storageBucket,
      messagingSenderId: Config.messagingSenderId
    };
    firebase.initializeApp(fbconfig);
    //Geocoder.setApiKey('AIzaSyCtWJcI_aTvehNW_9H8wceaWGPIetvo7us');
    Geocoder.setApiKey(Config.mapApiKey);
  }
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
