import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class LoginScreen extends React.Component {
    state = {
      username: '',
      password: '',
    }

    _login = () => {
        this.props.navigation.navigate('Home')
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