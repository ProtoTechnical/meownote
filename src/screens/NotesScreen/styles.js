import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
      alignItems: 'center'
   },
   formContainer: {
      flexDirection: 'row',
      height: 80,
      margin: 20,
      marginTop: 30,
      marginBottom: 30,
      flex: 1,
      paddingLeft: 30,
      paddingRight: 30
   },
   input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      paddingLeft: 16,
      marginRight: 5
   },
   button: {
      height: 47,
      borderRadius: 5,
      backgroundColor: '#788eec',
      width: 80,
      alignItems: "center",
      justifyContent: 'center'
   },
   entityContainer: {
      marginTop: 16,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1,
      paddingBottom: 16,
   },
   entityText: {
      fontSize: 20,
      color: '#333333'
   }
})