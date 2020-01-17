import React from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

import {updateCode} from '../redux/actions'

import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'
//import {datapath} from '../assets/db/rvudb.db'


class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Submit Procedure',
    }

    constructor(props) {
        super(props)
        this.state = {
            code: '',
            description: '',
            debugEnabled: true,

        }
    }

    componentDidMount() {

        this.makeSQLiteDir()
        
        //load in db. Usin .mp4 file extension to bypass a known issue
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/rvudb.mp4')).uri,
            `${FileSystem.documentDirectory}SQLite/rvudb.db`
        )
        .then(function({uri}){

            console.log("successfully downoaded db to ", uri)

            let db = SQLite.openDatabase('rvudb.db');
       
            // do whatever else you need here
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM RVU_APP_DATA WHERE hcpcs = 61680;',
                    [],
                    (_, { rows }) => console.log(JSON.stringify(rows)),
                )
            },
            console.log('error in db transaction'),//error message
            )
        
        
        })
    }

    // hacky way of initializing a /sqlite directory on the device. This allows the loading of an already existing db to the same directory
    makeSQLiteDir = () => {

        //creates an empty db that we wont use
        const dbTest = SQLite.openDatabase('dummy.db');
        try {
            const success =  dbTest.transaction(tx => tx.executeSql(''));
            console.log(`sucessful query on dummy db ${success}`)
        } catch(e) {
            if (this.state.debugEnabled) console.log('error while executing SQL in dummy DB');
        }
    }

    handleCodeChange = code => {
       if (code >= 0 && code.length <= 6) {
           this.setState({code})
           console.log('handleCodeChange executed')
       }
    }

    handleSubmit = () => {
        this.props.updateCode(this.state.code)
        console.log(`handleSubmit executed code is ${this.state.code}`)
        console.log(`${Object.keys(this.props.everything.codes.byIds)}`)
        console.log(`${Object.values(this.props.everything.codes.byIds)}`)
    }
    

    render() {
      return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='CPT Code'
                onChangeText={this.handleCodeChange}
                value={this.state.code}
                keyboardType='phone-pad'
            />
            <TextInput
                style={styles.input}
                placeholder='Description'
                onChangeText={description => this.setState({description})}
                value={this.state.description}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.handleSubmit()}
            >
                <Text style={{fontSize: 30}}>Submit Button</Text>
            </TouchableOpacity>
            <Text>
                {this.props.everything.codes.allIds.toString()} {this.state.description}
            </Text>
            <Text>
                Last code entered {this.props.everything.codes.allCodesArr[this.props.everything.codes.allCodesArr.length -1]}
            </Text>
            <Text>
                Entire State {JSON.stringify(this.props.everything)}
            </Text>
          </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    input: {
        fontSize: 40,
        height: 80,
        padding: 10,
        margin: 10,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        borderRadius: 10,
    },
  });

  const mapStateFromTheStoreToProps = state => ({
      //access in component with this.props.codes.codes
      //state.codes come from whatever name is used in the reducer
      everything: state,

  })

  const actions = {
      updateCode: updateCode,
  }

  export default connect(mapStateFromTheStoreToProps, actions)(DetailsScreen)