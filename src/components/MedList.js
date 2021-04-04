import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Card, SearchBar} from "react-native-elements";


export default class MedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {meds:{}, bad_ids:this.props.route.params.bad_ids, query:""}
    this.getMeds(this.props.route.params.query)
  }

  getMeds(query){
    fetch("https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:"+query.toLowerCase()+"+AND+products.marketing_status:Over-the-counter&limit=100")
        .then(response => response.json())
        .then(responseJSON => {
          console.log(query)
          let info = {}
          for(let result = 0; result < responseJSON.results.length; result++){
            let core = responseJSON.results[result].openfda
            if(core && core.brand_name) {
              for (let i = 0; i < core.brand_name.length; i++) {
                if(core.brand_name[i] !== query) {
                  let flag = true
                  Object.entries(this.state.bad_ids).forEach(([name, bad_ids]) => {
                    if (bad_ids.includes(core.spl_set_id[i])) {
                      flag = false
                    }
                  })
                  if (flag) {
                    info[core.brand_name[i]] = [core.manufacturer_name[i], core.spl_set_id[i]]
                  } else{
                    console.log("not okay: " + core.brand_name[i])
                  }
                }
              }
            } else {
              console.log("bad result:" + result)
            }
          }
          this.setState({meds: info})
        })
  }

  capitalize (text) {
    if(!text) {
      return text
    }
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
  }

  render(){
    let content = []
    Object.entries(this.state.meds).forEach(([name, info]) => {
      if(name.toLowerCase().startsWith(this.state.query.toLowerCase())) {
      content.push(<View key={name}>
        <TouchableOpacity onPress={() => this.props.navigation.push('Med', {name:name, set_id:info[1]})} activeOpacity={0.5} >
          <Card title={name}>
            <View style={{flexDirection: "row"}}>
              <View style={{ width: 0, flexGrow: 1, flex: 1,}}>
                <Text style={{fontWeight: 'bold'}}>{this.capitalize(name)}</Text>
                <Text>{this.capitalize(info[0])}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>) }
    });
    return(
        <View style={styles.container}>
          <Text>Showing medicines with the active ingredient {this.props.route.params.query.toLowerCase()}</Text>
          <SearchBar
              placeholder="Filter the list of meds"
              lightTheme = {true}
              inputContainerStyle = {styles.inputBar}
              containerStyle = {styles.searchBarContainer}
              onChangeText = {query => this.setState({query: query})}
              round
              value = {this.state.query}
          />
          <ScrollView>
            {content}
          </ScrollView>
        </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },

  inputBar: {
    backgroundColor: '#F5FCFF',
  },

  button: {
    flex: 20,
  },

  text: {
    flex:20
  },

  contentContainer: {
    flex: 20,
    marginTop: '10%',
    marginBottom: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  }
});



