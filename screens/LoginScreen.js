import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import * as SQLite from 'expo-sqlite'
import * as Crypto from 'expo-crypto'

const db = SQLite.openDatabase('users.db')

export default class LoginScreen extends React.Component {
    state = {
      username: '',
      password: '',
    }

    _login = async () => {

      let hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, this.state.password)

      db.transaction(
        tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ?;',
                [this.state.username],
                (_, {rows}) => {
                  //check to see that the username returned a row
                  if (rows._array.length){
                    //check password
                    if (rows._array[0].password == hash){
                      this.props.navigation.navigate('Home')
                    }
                    else{
                      alert('password incorect')
                    }
                  }
                  else {
                    alert("are you sure you've registered?")
                  }
                  
                }
            )
        }
      )

    
    }
  
    /* _login = async () => {
      try {
        const success = await login(this.state.username, this.state.password)
        this.props.navigation.navigate('Main')
      } catch (err) {
        const errMessage = err.message
        this.setState({err: errMessage})
      }
    } */
  
    handleUsernameUpdate = username => {
      this.setState({username})
    }
  
    handlePasswordUpdate = password => {
      this.setState({password})
    }

    handleRegistration = () => {
      alert('in production')
      this.props.navigation.navigate('Register')
    }
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>Test text</Text>
          </View>
          <Text style={styles.error}>{this.state.err}</Text>
          <TextInput
            placeholder="username"
            value={this.state.username}
            onChangeText={this.handleUsernameUpdate}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="password"
            value={this.state.password}
            onChangeText={this.handlePasswordUpdate}
            secureTextEntry
          />
          <Button title="Press to Log In" onPress={this._login} />
          <View style={styles.fixedFooter}>
            <TouchableOpacity
            onPress={this.handleRegistration}
            >
              <Text style={styles.text}>Need To Register?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
    },
    content: {
      flex: 1,
    },
    text: {
      textAlign: 'center',
      justifyContent: 'center'
    },
    error: {
      textAlign: 'center',
      color: 'red',
    },
    fixedFooter: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: 36,
    },
  })