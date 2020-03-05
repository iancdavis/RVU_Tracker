import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {LineChart, ProgressChart, PieChart} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import Constants from 'expo-constants'

import {connect} from 'react-redux'

class SettingsScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  calculateMonthlyRVUarray = () => {
    let monthlyRVUarray = []
    let arr = []
    if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
      return monthlyRVUarray
    } else {
        for(let i= 0; i < 12; i++){
          arr[i] = this.props.everything.procedure[this.props.currentUserID].allProcedures.filter(element => (new Date(element.date).getMonth() == i))
          monthlyRVUarray[i] = arr[i].reduce(rvuSumFunction, 0)
  
          function rvuSumFunction(total, value) {
            return(+total + +value.work_rvu)
          }
        }
        return monthlyRVUarray
    }
  }

  calculateSpineRVU = () => {
    if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
      return monthlyRVU
    } else {
        let arr = this.props.everything.procedure[this.props.currentUserID].allProcedures.filter(item =>  62263 <= item.hcpcs && item.hcpcs <= 63746 )
        let spineRVU = arr.reduce(rvuSumFunction, 0)

        function rvuSumFunction(total, value) {
          return(+total + +value.work_rvu)
        }
        return spineRVU
    }

  }

  calculateCranialRVU = () => {
    if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
      return cranialRVU
    } else {
        let arr = this.props.everything.procedure[this.props.currentUserID].allProcedures.filter(item =>  61000 <= item.hcpcs && item.hcpcs <= 62258 )
        let cranialRVU = arr.reduce(rvuSumFunction, 0)

        function rvuSumFunction(total, value) {
          return(+total + +value.work_rvu)
        }
        return cranialRVU
    }

  }

  calculateDiagnosticRVU = () => {
    if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
      return diagnosticRVU
    } else {
        let arr = this.props.everything.procedure[this.props.currentUserID].allProcedures.filter(item =>  99201 <= item.hcpcs && item.hcpcs <= 99499 )
        let diagnosticRVU = arr.reduce(rvuSumFunction, 0)

        function rvuSumFunction(total, value) {
          return(+total + +value.work_rvu)
        }
        return diagnosticRVU
    }

  }
  

  calculateTotalRVU = () => {
    let totalRVU = 0
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
  }

  calculateMonthlyRVU = () => {
    let monthlyRVU = 0
    if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
      return monthlyRVU
    } else {
        let arr = this.props.everything.procedure[this.props.currentUserID].allProcedures.filter(item =>  (new Date() - new Date(item.date)) < 2592000000)
        let monthlyRVU = arr.reduce(rvuSumFunction, 0)

        function rvuSumFunction(total, value) {
          return(+total + +value.work_rvu)
        }
        return monthlyRVU
    }

  }

  calculateWeeklyRVU = () => {
    let weeklyRVU = 0
    if (this.props.everything.procedure[this.props.currentUserID].allProcedures === undefined){
      return weeklyRVU
    } else {
        let arr = this.props.everything.procedure[this.props.currentUserID].allProcedures.filter(item =>  (new Date() - new Date(item.date)) < 604800000)
        let weeklyRVU = arr.reduce(rvuSumFunction, 0)

        function rvuSumFunction(total, value) {
          return(+total + +value.work_rvu)
        }
        return weeklyRVU
    }

  }

    render() {

      //Line Chart Calculations
      const monthlyRVUarray = this.calculateMonthlyRVUarray()
      console.log(`monthly rvu array ${monthlyRVUarray}`)
      
      //Progress Chart Calculations
      const total = this.calculateTotalRVU()
      const weekly = this.calculateWeeklyRVU()
      const monthly = this.calculateWeeklyRVU()

      const annualGoalRVU = 10000
      const monthlyGoalRVU = annualGoalRVU/12
      const weeklyGoalRVU = annualGoalRVU/52

      const yearlyRVUProgress = total/annualGoalRVU
      const weeklyRVUProgress = weekly/weeklyGoalRVU
      const monthlyRVUProgress = monthly/monthlyGoalRVU

      //Pie Chart Calculations
      const spineRVU = this.calculateSpineRVU()
      const cranialRVU = this.calculateCranialRVU()
      const diagnosticRVU = this.calculateDiagnosticRVU()


    

      const screenWidth = Dimensions.get("window").width
      const screenHeight = Dimensions.get('window').height

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
      };

      // each value represents a goal ring in Progress chart
      const progressChartData = {
        labels: ["Weekly", "Monthly", "Yearly"], // optional
        data: [weeklyRVUProgress, monthlyRVUProgress, yearlyRVUProgress]
      }

      const progressChartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        style: {
          borderRadius: 16,
        },
      };

      //Pie Chart info

      const pieChartData = [
        {
          name: "Spine",
          categoryRVU: spineRVU,
          color: "navy",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Diagnostic",
          categoryRVU: diagnosticRVU,
          color: "purple",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Intracranial",
          categoryRVU: cranialRVU,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
      ];



      return(
        <View style={styles.container}>
          <Text>RVU By Month</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
              datasets: [
                {
                  data: monthlyRVUarray
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={screenHeight/4}
            //yAxisLabel="$"
            //yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "3",
                stroke: "#ffa726"
              }
            }}
            //bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              
            }}
          />
          
          <Text>Goal Progress</Text>
          <ProgressChart
            data={progressChartData}
            width={Dimensions.get("window").width}
            height={(Dimensions.get('window').height)/4}//220
            chartConfig={progressChartConfig}
            hideLegend={false}
            style={{
              borderRadius: 16
            }}
          />

          <Text>RVUs By Category</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth}
            height={screenHeight/4}
            chartConfig={chartConfig}
            accessor="categoryRVU"
            backgroundColor="lightblue"
            paddingLeft="15"
            absolute
            style={{
              borderRadius: 16
            }}
          />
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
      paddingTop: Constants.statusBarHeight,
    },
  });

const mapStateToProps = state => ({
  everything: state,
  currentUserID: state.currentUser.currentUserID

})

export default connect(mapStateToProps, null)(SettingsScreen)