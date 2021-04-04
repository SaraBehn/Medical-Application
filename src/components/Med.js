import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { Card, Icon, Image } from 'react-native-elements';
import {images} from "../../assets/imagesData"
import { Title, RadioButton, Subheading, Searchbar, Divider, Surface, Paragraph} from 'react-native-paper';
import HTML from "react-native-render-html";


export default class Med extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
    fetch("https://api.fda.gov/drug/label.json?search=set_id.exact=\"" + this.props.route.params.set_id + "\"")
        .then(response => response.json())
        .then(responseJSON => {
            this.setState({sub_name:responseJSON.results[0].openfda.substance_name,
                act_ing:responseJSON.results[0].active_ingredient_table,
                inact_ing:responseJSON.results[0].inactive_ingredient,
                man_name:responseJSON.results[0].openfda.manufacturer_name})
        })
    this.capitalize = this.capitalize.bind(this);
  }

  capitalize (text) {
      // if(text) {
      //     let n = text.toLowerCase()
      //         .split(' ')
      //         .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      //         .join(' ');
      //     return n
      // }
      return text
  };


  render() {
      let sub_names = []
      for(let name in this.state.sub_name){
          sub_names.push(<Subheading key={name}>{this.state.sub_name[name]}</Subheading>)
      }

    return (
        <View>
            <Title>{this.capitalize(this.props.route.params.name)}</Title>
            <Subheading>{this.capitalize(this.state.man_name)}</Subheading>
            <Subheading>Active Ingredients:</Subheading>
            {sub_names}
            <Paragraph>{this.state.inact_ing}</Paragraph>
        </View>

	);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
