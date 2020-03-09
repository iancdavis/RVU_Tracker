import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import {connect} from 'react-redux'

import {updateTotalRVU, removeProcedure} from '../redux/actions'

class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  calculateTotalRVU = () => {
    let totalRVU = 0
    try {
      if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
        return totalRVU
      } else {
          let arr = this.props.everything.procedure[this.props.currentUserID].allProcedures
          let totalRVU = arr.reduce(rvuSumFunction, 0)
  
          function rvuSumFunction(total, value) {
            return(+total + +value.work_rvu)
          }
          return totalRVU
      }
    } catch (error) {
        console.log(`calculate total rvu in homescreen error ${error}`)
    }
    
  }

  handleHistoryTouch = (value) => {
    console.log(`touched history in handle method index is ${this.props.everything.procedure[this.props.currentUserID].allProcedures.indexOf(value)}`)
    Alert.alert(
      'Do you want to remove this from your procedure history?',
      `${value.description} for ${value.work_rvu} RVUs`,
      [
          {text: 'Cancel', onPress: () => console.log('Cancel pressed')},
          {text: 'Remove', onPress: () => {
              console.log('Remove pressed')
              this.props.removeProcedure(this.props.everything.procedure[this.props.currentUserID].allProcedures.indexOf(value), this.props.currentUserID)

          }},
      ],
    )
  }

  checkShowResults = () => {
    try {
      if(this.props.everything.procedure[this.props.currentUserID].allProcedures[0] === undefined){
        return false
    } else {return true}
    } catch (error) {
      console.log(`checkShowResults error: ${error}`)
      return false
    }
    
  }

  handleCSVExport = () => {
    console.log(`csv export pressed`)
    try {
      let collumnHeaders = Object.keys(this.props.everything.procedure[this.props.currentUserID].allProcedures[0]).join(',')
      let csvContent = 'data:text/csv;charset=utf-8,' + '\r\n' + collumnHeaders + '\r\n'

      this.props.everything.procedure[this.props.currentUserID].allProcedures.forEach(element => {
        let row = Object.values(element).join(',')
        csvContent += row + '\r\n'
        
      })
      console.log(csvContent)
    } catch (error) {
      console.log(error)
    }
  }

    render() {

      const totalRVU = this.calculateTotalRVU()

      return (
        <View style={styles.container}>
          <View style={styles.historySection}>
            <Text style={{fontSize: 30}}>Procedure History</Text>
            <ScrollView>
              {this.checkShowResults() && this.props.everything.procedure[this.props.currentUserID].allProcedures.map((value, index) => {
                if(value.user == this.props.currentUserID){
                  return(
                    <TouchableOpacity style={styles.item} key={index} onPress={() => this.handleHistoryTouch(value)}>
                      <Text style={styles.text} key={index}>{value.hcpcs} {value.description} {value.work_rvu} {'\n'} {(new Date(value.date)).toDateString()}</Text>
                    </TouchableOpacity>
                  )
                }
              })}
            </ScrollView>
            
    <Text style={{fontSize: 20}}>Total RVUs: {totalRVU} </Text>
          </View>
          <View style={styles.buttonSection}>
            <Button
              title="Add New Procedure"
              onPress={() => this.props.navigation.navigate('Details')}
            />
            <View style={styles.buttonSection}>
              <Button
                title="Export Data"
                onPress={() => this.handleCSVExport()}
              />
            </View>
            
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
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    buttonSection: {
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
      marginVertical: 5,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 3,
    },
    text: {
      textAlign: 'center',
    }
  });

  const mapStateToProps = state => ({
    everything: state,
    currentUserID: state.currentUser.currentUserID

})

  const actions = {
    updateTotalRVU: updateTotalRVU,
    removeProcedure: removeProcedure,
  }

export default connect(mapStateToProps, actions)(HomeScreen)