import React from "react";
import {CheckBox} from 'react-native-elements'
import {ScrollView, Text, View} from "react-native";
import ls from 'local-storage'

let name_table = {"Lactose":"lactose",
    "Corn starch":"Corn starch",
    "PEG":"PEG",
    "Povidone":"Povidone",
    "Carboxymethylcellulose":"Carboxymethylcellulose",
    "Gelatin":"Gelatin",
    "Brilliant blue dye":"blue",
    "Sunset Yellow FCF":"yellow",
    "Allura red":"red",
    "Propylene":"Propylene",
    "Indigo carmine":"Indigo",
    "Mannitol":"Mannitol",
    "Sucrose":"Sucrose",
    "Sodium benzoate":"Sodium benzoate",
    "Parabens":"Parabens",
    "Aspartame":"Aspartame",
    "Erythrosine":"red",
    "Tartrazine":"Tartrazine",
    "Saccharin":"Saccharin",
    "Poloxamer":"Poloxamer",
    "Soybean oil":"Soybean",
    "Benzyl alcohol":"Benzyl",
    "Vanilla":"Vanilla",
    "Castor oil":"Castor oil",
    "Cetyl alcohol":"Cetyl",
    "Sulfite":"Sulfite",
    "PEG castor oils":"castor",
    "Peanut oil":"Peanut",
    "Benzoic acid":"Benzoic",
    "Corn syrup":"Corn",
    "Sesame Oil":"Sesame",
    "Starch wheat":"wheat",
    "Casein food":"Casein",
    "Banana essence":"Banana",
    "Milk":"Milk",
    "Glucosamine":"Glucosamine",
    "New coccine":"red",
    "Stearyl alcohol":"Stearyl alcohol",
}

export default class SensitivitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({sens: this.props.route.params.sens, ids: this.props.route.params.ids, unmounted:false})
    }

    check = (key) => {
        let checkboxes = this.state.sens;
        checkboxes[key] = !this.state.sens[key];
        this.setState({sens: checkboxes});

        let ids = this.state.ids

        if (checkboxes[key] && !this.state.ids[key]) {
            ids[key] = []
            ids["fetchInProgress"] = true
            this.fetchData(key, 0, Number.MAX_SAFE_INTEGER, ids)
            this.setState({ids: ids})
        } else if (!checkboxes[key] && this.state.ids[key]) {
            delete ids[key]
            this.setState({ids: ids})
        }
    }

    fetchData(key, skip, max, ids){
        fetch("https://api.fda.gov/drug/label.json?search=inactive_ingredient:\"" + name_table[key] + "\"&skip=" + skip + "&limit=1000")
            .then(response => response.json())
            .then(responseJSON => {
                for(let entry in responseJSON.results) {
                    if(ids[key]) {
                        ids[key].push(responseJSON.results[entry].set_id)
                    }
                }
                if(skip + 1000 < max){
                    this.fetchData(key, skip+1000, responseJSON.meta.results.total, ids)
                } else {
                    ids["fetchInProgress"] = false
                    if(this.state.unmounted){
                        ls.set('bad_ids', ids)
                    } else {
                        this.setState({ids: ids})
                    }
                }
            })
    }

    componentWillUnmount() {
        this.state.unmounted = true
        ls.set('sens', this.state.sens)
        ls.set('bad_ids', this.state.ids)
    }

    render() {
        let content = []
        for (const [key, value] of Object.entries(this.state.sens)) {
            content.push(<CheckBox
                title={key}
                checked={value}
                key={key}
                onPress={() => this.check(key)}
            />)
        }
        return (
            <ScrollView>
                {content}
            </ScrollView>

        );
    }

}