import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Card, Icon, Image } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import {images} from "../assets/imagesData"


export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
  }

  capitalize (text) {
    n = text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return n
  };

	render() {
    let image = images[this.props.med.product_code]

    return (
      <View>
        <TouchableOpacity style = {styles.container} onPress={() => this.props.navigation.navigate('Med', {
          med: this.props.med})}
          activeOpacity={0.5} >
          <Card
          style = {styles.card}
          title={this.capitalize(this.props.med.medicine_name)} >



          <View style={{flexDirection: "row"}}>
            <View style={{ width: 0, flexGrow: 1, flex: 1,}}>
                <Text style={{fontWeight: 'bold'}}>Manufacturer: </Text>
            </View>

            <View style={{width: 0, flexGrow: 2, flex: 1,}}>
                <Text>{this.capitalize(this.props.med.author)}</Text>
            </View>
          </View>

          <View style={{flexDirection: "row", marginTop: 10}}>
            <View style={{width: 0, flexGrow: 1, flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontWeight: 'bold'}}>Product Code: </Text>
            </View>

            <View style={{width: 0, flexGrow: 2, flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>{this.capitalize(this.props.med.product_code)}</Text>
            </View>

          </View>

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
