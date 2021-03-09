import React from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets, initialWindowMetrics} from "react-native-safe-area-context";
import { db } from "./database";

export default class App extends React.Component{

  constructor()
  {
    super();
    this.state={
     wordSearched:"Enter the word to be searched",
     word:"",
     lexprop:"",
     defination:"",
     isButtonPressed:false
    }
  }


  getword=(word)=>{
var text=word.toLowerCase();
try{
  var wordSearched=db[text]["word"];
  var lexicalCategory=db[text]["lexicalCategory"];
  var defination=db[text]["definition"];

  this.setState({
    word:wordSearched,
    lexprop:lexicalCategory,
    defination:defination,
    isButtonPressed:true
  });
}
 catch(err){
   alert("NOT FOUND!!");
   this.setState({
     word:"",
     isButtonPressed:false
   })
 }
         
  }
    
  render(){
    return (
      <SafeAreaProvider>
        <Header
  centerComponent={{ text: 'Dictionary-Search', style: { color: '#fff' } }}
/>
     <View style={{flex:1,flexDirection: "column",justifyContent:'space-around',alignItems:'center'}}>
     
<TextInput
        style={{ height: 40,width:200,borderColor: 'gray', borderWidth: 1 ,alignItems:'center',justifyContent:'center',textAlign:'justify'}}
        onChangeText={(text) => {this.setState({wordSearched:text})}}
        value={this.state.wordSearched}
     />
<TouchableOpacity style={styles.button} onPress={()=>{
  this.getword(this.state.wordSearched);
}} >
<Text>Search</Text>
</TouchableOpacity>

<View>
  <Text>
  Word : {" "}
  </Text>

  <Text style={ {fontSize: 18 }}>
  {this.state.word}
  </Text>

  <Text>
  Type : {" "}
  </Text>

  <Text style={ {fontSize: 18 }}>
  {this.state.lexprop}
  </Text>

  <Text>
  defination : {" "}
  </Text>

  <Text style={ {fontSize: 18 }}>
  {this.state.definition}
  </Text>
</View>

     </View>
     </SafeAreaProvider>
    );

  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 200,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 100,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textstyle: {
    fontSize: 14,
    marginTop:20,
    marginLeft:145,
    color:"cyan"
  }
})