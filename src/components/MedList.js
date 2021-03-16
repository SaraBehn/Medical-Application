import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Card} from "react-native-elements";


export default class MedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {meds:{}, bad_ids:this.props.route.params.bad_ids}
    this.getMeds(this.props.route.params.query)
  }

  getMeds(query){
    fetch("https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:"+query+ "+AND+products.marketing_status:Over-the-counter&limit=100")
        .then(response => response.json())
        .then(responseJSON => {
          let ids = {}
          for(let result = 0; result < responseJSON.results.length; result++){
            let core = responseJSON.results[result].openfda
            if(core) {
              for (let i = 0; i < core.brand_name.length; i++) {
                if(core.brand_name[i] !== query) {
                  let flag = true
                  Object.entries(this.state.bad_ids).forEach(([name, bad_ids]) => {
                    if (bad_ids.includes(core.spl_set_id[i])) {
                      flag = false
                    }
                  })
                  if (flag) {
                    ids[core.brand_name[i]] = core.spl_set_id[i]
                  } else{
                    console.log("not okay: " + core.brand_name[i])

                  }
                }
              }
            } else {
              console.log("bad result:" + result)
            }
          }
          this.setState({meds: ids})
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
    Object.entries(this.state.meds).forEach(([name, id]) => {
      content.push(<View key={name}>
        <TouchableOpacity onPress={() => this.props.navigation.push('AuthorSearchScreen', {})} activeOpacity={0.5} >
          <Card title={name}>
            <View style={{flexDirection: "row"}}>
              <View style={{ width: 0, flexGrow: 1, flex: 1,}}>
                <Text style={{fontWeight: 'bold'}}>{this.capitalize(name)}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>)
    });
    return(
        <View>
          <ScrollView>
            {content}
          </ScrollView>
        </View>
    )

  }

}




