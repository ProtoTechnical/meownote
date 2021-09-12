import React from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { buttonTextStyle } from './notesScreenStyles'
import { firebase } from '../../firebase/config'
import {
	notesWrapperStyle,
	testTextStyle 
} from './notesScreenStyles'

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
    />
  );
}

export default function NotesScreen({user, ...props}) {
  const [entityText, setEntityText] = React.useState('')
	const [dataHasLoaded, setDataHasLoaded] = React.useState(false)
	
	const entityRef = firebase.firestore().collection('entities')
  const userID = user.id
	const query = entityRef.where('authorId', '==', userID).orderBy('createdAt').limit(1)
	
	
  if (!dataHasLoaded) {	  
	  query.get()
			.then(snapshot => {
				setEntityText(snapshot[0].data().text)
				setDataHasLoaded(true)
			})
  }
	
	
	const onAddButtonPress = () => {
		if (entityText && entityText.length > 0) {
		 const timestamp = firebase.firestore.FieldValue.serverTimestamp()
		 const data = {
			text: entityText,
			authorId: userID,
			createdAt: timestamp,
		 }
		 entityRef
			.add(data)
			.then(_doc => {
				 Keyboard.dismiss()
			})
			.catch((error) => {
				 alert(error)
			})
		}
	}

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: entityText,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}>
      <UselessTextInput
        multiline
        numberOfLines={32}
        onChangeText={setEntityText}
        value={entityText}
      />
			<TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
				 <Text style={buttonTextStyle}>Save</Text>
			</TouchableOpacity>
    </View>
  );
}