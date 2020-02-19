import { AsyncStorage } from 'react-native'

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username, password}),
    })
  
    if (response.ok) {
      const {token} = await response.json()
      return token
    }
  
    const errMessage = await response.text()
    throw new Error(errMessage)
  }

export const _storeUserid = async (userid) => {
  try {
    await AsyncStorage.setItem('userid', userid)
    console.log(`user id succesfully stored : ${userid}`)
  } catch (error) {
    console.log(`Error in api.js _storeUserid: ${error}`)
  }
}

export const _retrieveUserid = async () => {
  try {
    const value = await AsyncStorage.getItem('userid')
    if (value !== null) {
      console.log(`user retireved id: ${value}`)
    } else {
      console.log(`value is null : ${value}`)
    }
    return value
  } catch (error) {
    console.log(`Error in api.js _retrieveUserid: ${error}`)
  }
  
}