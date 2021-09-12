import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import 'react-native-gesture-handler';
import styles from './src/screens/HomeScreen/styles'
import { buttonTextStyle } from './src/screens/HomeScreen/homeScreenStyles'
import { createStackNavigator } from '@react-navigation/stack'
import { firebase } from './src/firebase/config'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
import NotesScreen from './src/screens/NotesScreen'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState(null)

   const logoutUser = () => setUser(null)

   // if (loading) {	
   //   return (	
   //     <></>	
   //   )	
   // }
   
   const logout = () => {
      firebase.auth().signOut()
      logoutUser()
   }
	
	const logoutButton = (
		<TouchableOpacity style={styles.button} onPress={logout}>
			<Text style={buttonTextStyle}>Logout</Text>
		</TouchableOpacity>
	)

      useEffect(() => {
      const usersRef = firebase.firestore().collection('users');
      firebase.auth().onAuthStateChanged(user => {
         if (user) {
            usersRef
               .doc(user.uid)
               .get()
               .then((document) => {
                  const userData = document.data()
                  setLoading(false)
                  setUser(userData)
               })
               .catch((error) => {
                  setLoading(false)
               });
         } else {
            setLoading(false)
         }
      });
   }, []);
   

   return (
      <NavigationContainer>
         <Stack.Navigator>
            {user ? (
				<Stack.Screen 
					name="Home"
					options={{ 
						headerTitle: props => logoutButton,
						headerTitleAlign: 'center'
					}} 
				>
						{props => 
							<NotesScreen user={user}/>
						}
						{/*
						<HomeScreen 
							logoutUser={logoutUser}
							{...props} 
							extraData={user} 
						/>
						*/}
				</Stack.Screen>
            ) : (
               <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />
               </>
            )}
         </Stack.Navigator>
      </NavigationContainer>
   );
}