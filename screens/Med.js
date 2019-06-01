import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { Card, Icon, Image } from 'react-native-elements';
import {images} from "../assets/imagesData"


export default class Med extends React.Component {

  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.ingredients = this.ingredients.bind(this);
  }

  capitalize (text) {
    n = text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return n
  };

  ingredients (seq){
    let arr = []
    let n = seq.split(";")

    for (i in n){
      el = n[i]
      arr.push(this.capitalize(el)+" ")
    }
    return arr

    }


	render() {

    const { navigation } = this.props;
    const med = navigation.getParam('med', 'None');
    let image = images[med.product_code]
    if (image==="None"){image = null}

    let act = this.ingredients(med.spl_ingredients)
    let inact = this.ingredients(med.spl_inactive_ing)

    return (
      <View style={styles.container}>

        <Card
        style = {styles.card}
        title={this.capitalize(med.medicine_name)} >

        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Image
          style={{width: 200,
            height: 150,
          borderRadius: 5}}
          source={image}
          />
        </View>

        <View
          style={{
            marginTop: 15,
            marginBottom: 15,
            borderBottomColor: '#A6A6A6',
            borderBottomWidth: 1,
          }}
        />

        <View style={{justifyContent: 'center', alignItems: 'center',}}>

          <View style={{flexDirection: "row"}}>
            <View style={{ width: 0, flexGrow: 1, flex: 1,}}>
                <Text style={{fontWeight: 'bold'}}>Manufacturer: </Text>
            </View>

            <View style={{width: 0, flexGrow: 2, flex: 1,}}>
                <Text>{this.capitalize(med.author)}</Text>
            </View>
          </View>
{/* 
          <Text style={{marginTop: 5}}>
            <Text style={{fontWeight: 'bold'}}>Product Code: </Text>
            <Text>{this.capitalize(med.product_code)}</Text>
          </Text> */}

          <Text style={{marginTop: 5}}>
            <Text style={{fontWeight: 'bold'}}>Active Ingredients: </Text>
            <Text>{act}</Text>
          </Text>

          <Text style={{marginTop: 5}}>
            <Text style={{fontWeight: 'bold'}}>Inactive Ingredients: </Text>
            <Text>{inact}</Text>
          </Text>


        </View>

        </Card>

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
