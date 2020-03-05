import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import * as SQLite from 'expo-sqlite'
import * as Crypto from 'expo-crypto'

import { updateCurrentUserid } from '../redux/actions.js'
import {connect} from 'react-redux'
import {getPersistor} from '../redux/store.js'


const db = SQLite.openDatabase('users.db')

class LoginScreen extends React.Component {
    state = {
      username: '',
      password: '',
    }

    /* //BUTTON FOR TESTING ONLY
    clearUserData = () => {
      db.transaction(
        tx => {
          tx.executeSql(
            'DROP TABLE IF EXISTS users;',
            null,
            console.log('user table dropped'),
            (_, error) => console.log(`table not dropped error: ${error}`)
          )
        }
      )

    } */

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
                      //store session userid in redux
                      this.props.updateCurrentUserid(rows._array[0].id)

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
      this.props.navigation.navigate('Register')
    }

    /* //FOR TESTING
    handlePersistPurge = () => {

      const p = getPersistor()
      p.purge().then(success => {
        console.log(`persistor succesfully purged ${success}`)
      }, failure => {
        console.log(`ERROR in persistor purge ${failure}`)
      })

    } */
  
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
          {/* <Button title="Drop user table" onPress={this.clearUserData}/>
          <Button title="flush persist for testing" onPress={this.handlePersistPurge} /> */}
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

const mapStateToProps = state => ({
  
  everything: state,

})

  const actions = {
    updateCurrentUserid: updateCurrentUserid,
  }

export default connect(mapStateToProps, actions)(LoginScreen)