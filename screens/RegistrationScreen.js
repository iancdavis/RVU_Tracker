import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import * as SQLite from 'expo-sqlite'
import * as Crypto from 'expo-crypto'

const db = SQLite.openDatabase('users.db')

export default class RegistrationScreen extends React.Component {
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
                    'SELECT * FROM users;',
                    [],
                    (_, {rows}) => console.log(`user db test ${JSON.stringify(rows)}`)
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
      if (!this.state.username | !this.state.password){
        alert('must provide username and password')
        return false
      }else if (this.state.password !== this.state.confirmPassword){
        alert('passwords do not match')
        return false
      }else return true
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
                    "SELECT * FROM users",
                    [],
                    (_, { rows }) => console.log(JSON.stringify(rows))
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