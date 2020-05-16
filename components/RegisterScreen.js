import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Item, Form, Input, Button, Label } from 'native-base';
import firebase from '../database/firebase';


export default class RegisterScreen extends Component {

  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      loading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to registerscreen!')
    } else {
      this.setState({
        loading: true,
      })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName
          })
          Alert.alert('Registered successfully!')
          this.setState({
            loading: false,
            displayName: '',
            email: '',
            password: ''
          })
          this.props.navigation.navigate('LoginScreen')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.mainContent}>

          <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Register Screen</Text>
          </View>
          <Form style={{ marginBottom: 50 }}>

            <Item floatingLabel style={{ marginLeft: 10, marginRight: 10 }}>
              <Label>Name</Label>
              <Input
                placeholder="Name"
                keyboardType={"name-phone-pad"}
                value={this.state.displayName}
                onChangeText={(val) => this.updateInputVal(val, 'displayName')}
              />
            </Item>

            <Item floatingLabel style={{ marginLeft: 10, marginRight: 10 }}>
              <Label>Email</Label>
              <Input
                placeholder="Email"
                keyboardType={"email-address"}
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}

              />
            </Item>
            <Item floatingLabel style={{ marginLeft: 10, marginRight: 10 }}>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}

              />
            </Item>

          </Form>

          <Button
            style={{ marginTop: 30, backgroundColor: 'orange' }}
            full
            rounded
            primary
            onPress={() => this.registerUser()}
          >
            <Text style={{ color: 'white' }}> Register</Text>

          </Button>

          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            Have account? Click here to Login
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  mainContent: {
    width: '100%',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20
  }
});