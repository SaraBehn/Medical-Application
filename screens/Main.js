import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { SearchBar, Image} from 'react-native-elements';

import List from "./List"


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {medData: '', search: '', dropdown: [], last: ''};
    this.textChange = this.textChange.bind(this);

    fetch("https://datadiscovery.nlm.nih.gov/resource/crzr-uvwg.json")
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON)
      this.setState({medData: responseJSON})
    })
  }

  static navigationOptions = {
    title: 'Medicines',
  };

  textChange(text){
    this.state.search = text
    let index = this.state.search.length

    if (this.state.search[index-1]!=" "){
      this.state.dropdown = []

      for (i in this.state.medData){
        med = this.state.medData[i]
        if (med.medicine_name.substr(0, index)==this.state.search){
          this.state.dropdown.push(med)
        }
      }
      this.setState({search: this.state.search, dropdown: this.state.dropdown})
    } else {this.setState({search: this.state.search})}
  }

  render() {
    let content = null
    if (this.state.search!='' && this.state.dropdown.length===0){
      content = <Text style={{textAlign: 'center'}}>No medicine found. Please try again!</Text>
    } else {
      let meds = []
      if (this.state.search===''){
        content = <Text style={{textAlign: 'center'}}>Search any medicine you want</Text>
      } else {
        meds = this.state.dropdown
        content = []
        for (i in meds){
          content.push(<List
            med = {meds[i]}
            key = {i}
            navigation={this.props.navigation}
          />);
      }
    }
  }

    return (
      <View style={styles.container}>
        <SearchBar
        placeholder="Enter the name of the medicine"
        lightTheme = {true}
        inputContainerStyle = {styles.inputBar}
        containerStyle = {styles.searchBarContainer}
        onChangeText = {this.textChange}
        round
        value = {this.state.search}
        autoFocus
        />

        <View style={styles.contentContainer}>
          <ScrollView>
            {content}
          </ScrollView>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },

  searchBarContainer: {
    flex: 20,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBar: {
    backgroundColor: '#F5FCFF',
  },

  contentContainer: {
    flex: 80,
    marginTop: '10%',
    marginBottom: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  }
});


