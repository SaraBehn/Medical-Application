import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Card, Icon, Image } from 'react-native-elements';
import {images} from "../assets/imagesData"
import {parseString} from 'react-native-xml2js';

export default class MedList extends React.Component {

  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
  }

  capitalize (text) {
    if(!text) {
      return text
    }
    let n = text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return n
  };

  get_author(authors){
    return this.props.med.act_ing.length
    if(authors.length > 1){
      return "Various manufacturers"
    } else {
      return this.capitalize(authors[0])
    }
  }

  get_display_name(names){
    if (names.length === 1){
      return this.capitalize(names[0])
    }
    let max_words = this.get_max_words(names);

    for (let i = 4; i < max_words; i++) {
      let flag = false;
      let before = names[0].split(" ")[i].replace(/\W/g, "");
      for (let n = 1; n < names.length; n++) {
        let next = names[n].split(" ")[i].replace(/\W/g, "");
        if (next === before) {
          before = next;
        } else {
          flag = true;
          break;
        }
      }
      if (flag) {
        return this.capitalize(names[0].split(" ").slice(0, i).join(" "));
      }
    }
    return this.capitalize(names[0].split(" ").slice(0, max_words).join(" "));
  }

  get_max_words(array){
    let max_len = Number.MAX_SAFE_INTEGER;
    for(let a in array){
      if(a.length < max_len){
        max_len = a.length
      }
    }
    return max_len;
  }

  render() {
    // let image = images[this.props.med.product_code]

    return (
      <View>
        <TouchableOpacity style = {styles.container} onPress={() => this.props.navigation.push('AuthorSearch', {
          med: this.props.med})}
          activeOpacity={0.5} >
          <Card
          style = {styles.card}
          title={this.props.med.key} >

            <View style={{flexDirection: "row"}}>
              <View style={{ width: 0, flexGrow: 1, flex: 1,}}>
                <Text style={{fontWeight: 'bold'}}>Medicine name: </Text>
              </View>

              <View style={{width: 0, flexGrow: 2, flex: 1,}}>
                <Text>{this.get_display_name(this.props.med.name)}</Text>
              </View>
            </View>

          <View style={{flexDirection: "row"}}>
            <View style={{ width: 0, flexGrow: 1, flex: 1,}}>
                <Text style={{fontWeight: 'bold'}}>Manufacturer: </Text>
            </View>

            <View style={{width: 0, flexGrow: 2, flex: 1,}}>
                <Text>{this.get_author(this.props.med.author)}</Text>
            </View>
          </View>

          {/*<View style={{flexDirection: "row", marginTop: 10}}>*/}
          {/*  <View style={{width: 0, flexGrow: 1, flex: 1, justifyContent: "center", alignItems: "center"}}>*/}
          {/*      <Text style={{fontWeight: 'bold'}}>Product Code: </Text>*/}
          {/*  </View>*/}

          {/*  <View style={{width: 0, flexGrow: 2, flex: 1, justifyContent: "center", alignItems: "center"}}>*/}
          {/*      /!*<Text>{this.capitalize(this.props.med.product_code)}</Text>*!/*/}
          {/*  </View>*/}

          {/*</View>*/}

          {/* <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <Text>
              <Text style={{fontWeight: 'bold'}}>Manufacturer: </Text>
              <Text>{this.capitalize(this.props.med.author)}</Text>
            </Text> */}

            {/* <Text style={{marginTop: 5}}>
              <Text style={{fontWeight: 'bold'}}>Product Code: </Text>
              <Text>{this.capitalize(this.props.med.product_code)}</Text>
            </Text>
          </View> */}

          </Card>
        </TouchableOpacity>

      </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  
  image: {
    width: 200,
    height: 150,
    borderRadius: 5
  }
  });
