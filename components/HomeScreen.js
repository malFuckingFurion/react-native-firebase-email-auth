import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Button, } from 'react-native';

import { ListItem, SearchBar } from 'react-native-elements'
import firebase from '../database/firebase';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      search: '',
      uid: '',
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('LoginScreen')
    })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  makeRemoteRequest = () => {
    const url = `https://api.npoint.io/d3ded9da5bacb6be07b1`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  // Search bar 
  searchFilterFunction = (text, search) => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.movie.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      console.log(textData)
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });

    this.setState({ search });
  };

  renderFooter = () => {
    return (
      <Button
        color="#3740FE"
        title="Logout"
        onPress={() => this.signOut()}
      />
    );
  };
  render() {

    //LOADING
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{marginBottom:120}}>
        <View style={{height:120}}>
          <Text style={styles.textStyle}>
            Hello, {this.state.displayName} {"\n"}
            This is IMDB top 10 list. 
          </Text>
        
        <SearchBar
          icon={styles.searchIconStyle}
          containerStyle={styles.searchContainerStyle}
          inputStyle={styles.searchInputContainerStyle}
          placeholder='Search movie by name'
          lightTheme
          clearIcon={false}
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
        />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={{ margin: 10, borderWidth: 1 }}>
              <ListItem
                hideChevron
                roundAvatar
                title={`${item.movie.title}`}
                subtitle={item.movie.rank}
                containerStyle={{ borderBottomWidth: 0, backgroundColor: '#fff' }}
              />
              <View style={{
                overflow: 'hidden',
                backgroundColor: '#fff',
                width: '100%',
                padding: 10,
              }}>

              </View>
            </View>

          )}
          keyExtractor={item => item.movie.id}
          ListFooterComponent={this.renderFooter}
        />
        <View style={styles.container}></View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  searchContainerStyle: {
    borderTopWidth: 0,
    backgroundColor: '#efefef',
    borderBottomWidth: 0,
    flexDirection: 'row-reverse',
    paddingLeft: 10,

  },
  searchInputContainerStyle: {
    backgroundColor: '#fff',
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
    borderWidth: 1
  },
  searchIconStyle: {
    color: '#111',
    height: 60,
  },
  textStyle:{
    fontSize:20,
    padding:10,
    textAlign:'center'
  }
});