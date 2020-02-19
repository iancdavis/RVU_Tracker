import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import {connect} from 'react-redux'

import {updateTotalRVU, removeProcedure} from '../redux/actions'

import { _storeUserid, _retrieveUserid } from '../api.js'

class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  calculateTotalRVU = () => {
    console.log('calculateTotalRVU called')
    let totalRVU = 0
    if (this.props.everything.procedure.allProcedures === undefined){
      return totalRVU
    } else {
        console.log('calculate rvu else called')
        let arr = this.props.everything.procedure.allProcedures
        let totalRVU = arr.reduce(rvuSumFunction, 0)

        function rvuSumFunction(total, value) {
          return(+total + +value.work_rvu)
        }
        console.log(`Total RVU ${JSON.stringify(totalRVU)}`)
        //this.props.updateTotalRVU(totalRVU)
        return totalRVU
    }
  }

  handleHistoryTouch = (value) => {
    console.log(`touched history in handle method index is ${this.props.everything.procedure.allProcedures.indexOf(value)}`)
    Alert.alert(
      'Do you want to remove this from your procedure history?',
      `${value.description} for ${value.work_rvu} RVUs`,
      [
          {text: 'Cancel', onPress: () => console.log('Cancel pressed')},
          {text: 'Remove', onPress: () => {
              console.log('Remove pressed')
              this.props.removeProcedure(this.props.everything.procedure.allProcedures.indexOf(value))

          }},
      ],
    )
  }

  checkShowResults = () => {
    if(this.props.everything.procedure.allProcedures[0] === undefined){
        return false
    } else {return true}
  }

    render() {

      const totalRVU = this.calculateTotalRVU()

      return (
        <View style={styles.container}>
          <View style={styles.historySection}>
            <Text style={{fontSize: 30}}>Your Procedure History</Text>
            <ScrollView>
              {this.checkShowResults() && this.props.everything.procedure.allProcedures.map((value, index) => {
                return(
                <TouchableOpacity style={styles.item} key={index} onPress={() => this.handleHistoryTouch(value)}>
                  <Text key={index}>{value.hcpcs} {value.description} {value.work_rvu} {(new Date(value.date)).toDateString()}</Text>
                </TouchableOpacity>
                )
              })}
            </ScrollView>
            
    <Text style={{fontSize: 20}}>Total RVUs: {totalRVU} </Text>
          </View>
          <View style={styles.historySection}>
            <Button
              title="Add New Procedure"
              onPress={() => this.props.navigation.navigate('Details')}
            />
            {<Button
              title="test user id"
              onPress={() => _retrieveUserid()}
            />}
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    historySection: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
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
  });

  const mapStateToProps = state => ({
    //access in component with this.props.codes.codes
    //state.codes come from whatever name is used in the reducer
    everything: state,

})

  const actions = {
    updateTotalRVU: updateTotalRVU,
    removeProcedure: removeProcedure,
  }

export default connect(mapStateToProps, actions)(HomeScreen)