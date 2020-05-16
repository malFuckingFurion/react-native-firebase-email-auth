import React, { Component } from 'react';

import { StyleSheet, Text, View, Keyboard, Alert, ActivityIndicator, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as Facebook from 'expo-facebook';
import firebase from '../database/firebase';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errorMessage:''
    }
  }

  static navigationOptions = {
    headerMode: 'none'
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {

    if (this.state.email.length == 0) {
      alert('Missing email!');
      return;
  }

  if (this.state.password.length == 0) {
      alert('Missing Password!');
      return;
  }
    try{
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('HomeScreen'))
        .catch(error => {   
          alert(error.message);
       })
     }catch(err){
        alert(err);
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

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container style={styles.container}>
        <StatusBar hidden={true} />
          <View style={styles.formViewContainer}>
            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login Screen</Text>
            </View>
            <Form>

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
              onPress={() => this.userLogin()}
            >
              <Text style={{ color: 'white' }}> Login </Text>

            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, textDecorationLine: 'underline' }}>
                  Forgoten password?
                      </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                <Text style={{ fontSize: 12 }}>
                  New user? <Text style={{ fontWeight: 'bold' }}>SIGN UP</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
  formViewContainer: {
    flex: 1,
    justifyContent: "center"
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
  }
});