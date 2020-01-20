import React from 'react'
import { StyleSheet, TextInput, Button, Text, View, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

import {updateCode} from '../redux/actions'

import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'
import { ScrollView } from 'react-native-gesture-handler'
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
            queryResult: {},

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
        })  
    }

    //handledb query
    handleDataQuery = () => {
        const db = SQLite.openDatabase('rvudb.db')
        try{
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM RVU_APP_DATA WHERE hcpcs = ? or description LIKE ?;",
                    [this.state.code, `%${this.state.description}%`],
                    ((_,  { rows } ) => this.setState({queryResult: rows._array})),
                    ((_, err) => {console.log('error in db select')})
                )
            })
        } catch(err) {
            if (this.state.debugEnabled) {
                console.log('error in handleDataQuery')
            }
        }
        
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

    checkShowResults = () => {
        if(this.state.queryResult[0] === undefined){
            return false
        } else {return true}
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
            <Button
                title='testing db'
                onPress={() => this.handleDataQuery()}
            />
            <Text>
                {this.props.everything.codes.allIds.toString()} {this.state.description}
            </Text>
            <Text>
                Last code entered {this.props.everything.codes.allCodesArr[this.props.everything.codes.allCodesArr.length -1]}
            </Text>
            <Text>
                {this.state.q}
            </Text>
            <ScrollView>
                {this.checkShowResults() && this.state.queryResult.map((value, index) => {
                    return(
                        <TouchableOpacity style={styles.item} key={index} onPress={console.log('pressed')}>
                            <Text key={index}>{value.hcpcs} {value.description}</Text>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
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
    item: {
        borderWidth: 1,
        borderColor: 'black',
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
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