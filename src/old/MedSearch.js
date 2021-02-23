// @refresh reset

import React, {Component} from 'react';                                         //imports
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { SearchBar, Image} from 'react-native-elements';
import MedList from "./MedList";
import data from "../../assets/dm_spl_zip_files_meta_data";
import {parseString} from "react-native-xml2js";

//TODO: cache recent meds
//TODO: fuzzy search
//TODO: support for CNTM/INGR
//TODO: figure out what redundant names
export default class MedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {medData: {}, search: '', dropdown: [], searching: false, controller: null};
    this.query = this.query.bind(this);
    this.readData();
  }

  static navigationOptions = {
    title: 'Medicines',
  };

  readData() {
    let a = data.split("\n")
    for (let i = 1; i < a.length; i++) {
      let split = a[i].split("|")
      if(split[0] && split[1] && split[4]) {
        let name = split[4].slice(0, split[4].indexOf('[') - 1).toLowerCase()
        let author = split[4].slice(split[4].indexOf('[') + 1, split[4].length - 1)
        let split_name = name.split(" ")
        let key = split_name.length > 1 && split_name[1].startsWith("(") ?
            split_name[0] :
            split_name.slice(0, 4).join(" ").toLowerCase()
        if(!this.state.medData[key]){
          this.state.medData[key] = {
            key: key,
            setId:[],
            zip: [],
            name: [],
            authors: [],
            inact_ing: [],
            act_ing: [],
          }
        }
        if(!this.state.medData[key].authors.includes(author)) {
          this.state.medData[key].setId.push(split[0])
          this.state.medData[key].zip.push(split[1])
          this.state.medData[key].name.push(name)
          this.state.medData[key].authors.push(author)
        }
        }
      }
    }

  query(text){
    this.state.search = text
    let index = this.state.search.length

    if (this.state.search[index - 1] !== " ") {
      this.state.dropdown = []
      for(let key in this.state.medData) {
        let med = this.state.medData[key]
        if (med.key.startsWith(this.state.search.toLowerCase())) {
          this.state.dropdown.push(key)
        }
      }
      this.setState({search: this.state.search, dropdown: this.state.dropdown})
    } else {
      this.setState({search: this.state.search})
    }
  }

  analyze_ingredients(med){
    let inac = []
    let ac = []
    for(let j = 0; j < med.setId.length; j++) {
      fetch("https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/" + med.setId[j] + ".xml")
          .then(response => response.text())
          .then(xml => {
            parseString(xml, function (err, result) {
              const allIng = result.document.component[0].structuredBody[0].component[0].section[0].subject[0].manufacturedProduct[0].manufacturedProduct[0].ingredient;
              const activeIng = [];
              const inactiveIng = [];
              if (allIng) {
                for (var i = 0; i < allIng.length; i++) {
                  const classCode = allIng[i].$["classCode"]
                  const ingName = allIng[i].ingredientSubstance[0].name[0];

                  if (classCode.substring(0, 3) === "ACT") {
                    activeIng.push(ingName)
                  } else if (classCode === "IACT") {
                    inactiveIng.push(ingName);
                  } else {
                    console.log("Unknown ingredient class code:" + allIng[i].$["classCode"]);
                  }
                }
              }
              inac = inactiveIng
              ac = activeIng
            })
          }).finally(() => {
        med.act_ing.push(inac)
        med.inact_ing.push(ac)
      })
    }
  }

  processTitle(title){
    // if(!title) {
    //   return title;
    // }
    // let name = ""
    // let author = ""
    // for (let i = 1; i < title.length; i++){
    //   if(title.charAt(i) === '(' || title.charAt(i) === ')'){
    //       name += "\n"
    //   } else if(title.charAt(i) === ' ' && title.charAt(i-1) === ')') {
    //     continue;
    //   } else if(title.charAt(i) === '[') {
    //     author = title.slice(i+1, title.length-1)
    //     break;
    //   } else {
    //     name += title[i];
    //   }
    // }
    // return [name, author]
  }

  // fetchMeds(page) {
  //   var dict = {}
  //   if(page !== "null") {
  //     fetch("https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?page=" + page)
  //         .then(response => response.json())
  //         .then(responseJSON => {
  //           for (var i = 0; i < responseJSON.metadata.elements_per_page; i++) {
  //             var id = responseJSON.data[i].setid;
  //             fetch("https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/" + id + ".xml")
  //                 .then(response => response.text())
  //                 .then(xml => {
  //                   parseString(xml, function (err, result) {
  //                       JSON.stringify(result);
  //                       try {
  //                           result.document.component[0].structuredBody[0].component[0].section[0].subject[0].manufacturedProduct[0].manufacturedProduct[0].name[0]._;
  //                       } catch {
  //                           console.log(id);
  //                       }
  //                       const name = result.document.component[0].structuredBody[0].component[0].section[0].subject[0].manufacturedProduct[0].manufacturedProduct[0].name[0]._;
  //                       const author = result.document.author[0].assignedEntity[0].representedOrganization[0].name[0];
  //                       const allIng = result.document.component[0].structuredBody[0].component[0].section[0].subject[0].manufacturedProduct[0].manufacturedProduct[0].ingredient;
  //                       const activeIng = [];
  //                       const inactiveIng = [];
  //                       if(allIng) {
  //                           for (var i = 0; i < allIng.length; i++) {
  //                               const classCode = allIng[i].$["classCode"]
  //                               const ingName = allIng[i].ingredientSubstance[0].name[0];
  //
  //                               if (classCode.substring(0, 3) === "ACT") {
  //                                   activeIng.push(ingName)
  //                               } else if (classCode === "IACT") {
  //                                   inactiveIng.push(ingName);
  //                               } else {
  //                                   console.log("Unknown ingredient class code:" + allIng[i].$["classCode"]);
  //                               }
  //                           }
  //                       }
  //                           if(dict[name] !== undefined) {
  //                               dict[name] = ({
  //                                   name: name,
  //                                   author: author,
  //                                   activeIng: activeIng,
  //                                   inactiveIng: inactiveIng
  //                               });
  //                           }
  //                   })
  //                 });
  //           }
  //           console.log(responseJSON.metadata.next_page);
  //           this.fetchMeds(responseJSON.metadata.next_page);
  //         }).done(console.log(dict));
  //   }
  // }

  render() {
    let content = null
    if (this.state.search !== '' && this.state.dropdown.length === 0) {
      content = <Text style={{textAlign: 'center'}}>No medicine found. Please try again!</Text>
    } else {
      let meds = []
      if (this.state.search === '') {
        content = <Text style={{textAlign: 'center'}}>Search any medicine you want</Text>
      } else {
        meds = this.state.dropdown.sort((function(a, b){
          return a.length - b.length;
        })).slice(0, 10)
        content = []
        meds.forEach(med => this.analyze_ingredients(this.state.medData[med]))
        meds.forEach(med =>
            content.push(<MedList
            med={this.state.medData[med]}
            key={this.state.medData[med].setId}
            navigation={this.props.navigation}
        />))
      }
    }
    return (
        <View style={styles.container}>
          <SearchBar
              placeholder="Enter the name of the medicine"
              lightTheme = {true}
              inputContainerStyle = {styles.inputBar}
              containerStyle = {styles.searchBarContainer}
              onChangeText = {this.query}
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