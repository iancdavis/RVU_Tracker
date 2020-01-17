import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {connect} from 'react-redux'

class HomeScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.historySection}>
            <Text>Placeholder</Text>
            <Text>All Past codes{JSON.stringify(this.props.everything.codes.allCodesArr)}</Text>
          </View>
          <View style={styles.historySection}>
            <Button
              title="Add New Procedure"
              onPress={() => this.props.navigation.navigate('Details')}
            />
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
    },
  });

  const mapStateToProps = state => ({
    //access in component with this.props.codes.codes
    //state.codes come from whatever name is used in the reducer
    everything: state,

})

export default connect(mapStateToProps)(HomeScreen)