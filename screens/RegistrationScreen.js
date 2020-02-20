import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import * as SQLite from 'expo-sqlite'
import * as Crypto from 'expo-crypto'

import { updateCurrentUserid } from '../redux/actions.js'
import {connect} from 'react-redux'

const db = SQLite.openDatabase('users.db')

class RegistrationScreen extends React.Component {
    state = {
      username: '',
      password: '',
      confirmPassword: '',
    }

    componentDidMount() {
        console.log('component mounted')
        db.transaction(
            tx => {
                console.log('creating database')
                tx.executeSql(
                    `CREATE TABLE if not exists users (
                        id integer primary key AUTOINCREMENT,
                        username varchar(255),
                        password text);`,
                    null,
                    null,
                    (_, error) => console.log(`Error creating user table ${error}`)
                )
            }
        )
      }

    registrationTesting = () => {

        db.transaction(
            tx => {
                tx.executeSql(
                    'SELECT * FROM users WHERE username = ?;',
                    [this.state.username],
                    (_, {rows}) => console.log(`user db test ${JSON.stringify(rows._array.length)}`)
                )
            }
        )
    }

    handleRegistrationButton = () => {
      if (this.validateRegistrationForm()) {
        this._register()
      }   
    }

    validateRegistrationForm = () => {
      //check if username is taken
      db.transaction(
        tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ?;',
                [this.state.username],
                (_, {rows}) => {
                  if(rows._array.length){
                    alert('username is taken')
                    return false
                  }
                }
            )
        }
      )
      
      //both username and password must be provided
      if (!this.state.username | !this.state.password){
        alert('must provide username and password')
        return false 
      }
      //passwords must match
      else if (this.state.password !== this.state.confirmPassword){
        alert('passwords do not match')
        return false
      }
      /* //password must be at least 7 characters long
      else if (this.state.password.length < 7){
        alert('password must be at least 7 characters long')
        return false
      }
      //check if all characters in password are letters
      else if (/^[a-zA-Z]+$/.test(this.state.password)){
        alert('password must contain at least one number')
        return false
      }
      //check if all characters in password are numbers
      else if (/^[0-9]+$/.test(this.state.password)){
        alert('password must contain at least one letter')
        return false
      } */
      //if all checks pass return true
      else return true
    }
    
    _register = async () => {
        let hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, this.state.password)

        db.transaction(
            tx => {
                console.log('registering user')
                tx.executeSql(
                    `INSERT INTO users (username, password) VALUES (?, ?);`,
                    [this.state.username, hash],
                    null,
                    (_, error) => console.log(`Error in db insert ${error}`)
                )
                tx.executeSql(
                  "SELECT * FROM users WHERE username = ?",
                  [this.state.username],
                  (_, { rows }) => {
                    const stringUserid = JSON.stringify(rows._array[0].id)
              
                    this.props.updateCurrentUserid(stringUserid)
                  }
                )
            }
        )
        //TODO only nav to home on succesfull transaction
        this.props.navigation.navigate('Home')
    }

    
  
    handleUsernameUpdate = username => {
      this.setState({username})
    }
  
    handlePasswordUpdate = password => {
      this.setState({password})
    }

    handleConfirmPasswordUpdate = confirmPassword => {
        this.setState({confirmPassword})
      }

  
    render() {
      return (
        <View style={styles.container}>
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
          <TextInput
            placeholder="confirm password"
            value={this.state.confirmPassword}
            onChangeText={this.handleConfirmPasswordUpdate}
            secureTextEntry
          />
          <Button title="Press to Register" onPress={this.handleRegistrationButton} />
          <Button title='db testing' onPress={this.registrationTesting}></Button>
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
  })
  
    const actions = {
      updateCurrentUserid: updateCurrentUserid,
    }
  
  export default connect(null, actions)(RegistrationScreen)