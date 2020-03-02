import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {LineChart, ProgressChart, PieChart} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import Constants from 'expo-constants'

export default class SettingsScreen extends React.Component {
    render() {

      const screenWidth = Dimensions.get("window").width

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
        data: [0.1, 0.6, 0.8]
      }

      const progressChartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
      };

      //Pie Chart info

      const pieChartData = [
        {
          name: "Spine",
          categoryRVU: 1500,
          color: "navy",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Diagnostic",
          categoryRVU: 300,
          color: "purple",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Intracranial",
          categoryRVU: 900,
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
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
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
            height={220}
            chartConfig={progressChartConfig}
            hideLegend={false}
          />

          <Text>RVUs By Category</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="categoryRVU"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
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
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    },
  });