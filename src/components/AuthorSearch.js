import React, {Component} from 'react';                                         //imports
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { SearchBar, Image} from 'react-native-elements';
import AuthorList from "./AuthorList";
import data from "../../assets/dm_spl_zip_files_meta_data";
import {parseString} from "react-native-xml2js";
import {connect} from "react-redux";

let NOT_PRESENT = "green"
let PRESENT = "red"

let SENSITIVITIES = ["Lactose", "Corn starch", "PEG", "Povidone", "Carboxymethylcellulose", "Gelatin", "Brilliant blue dye",
    "Sunset Yellow FCF", "Allura red", "Propylene", "Indigo carmine", "Mannitol", "Sucrose", "Sodium benzoate", "Parabens",
    "Aspartame", "Erythrosine", "Tartrazine", "Saccharin", "Poloxamer", "Soybean oil", "Benzyl alcohol", "Vanilla",
    "Castor oil", "Cetyl alcohol", "Sulfite", "PEG castor oils", "Peanut oil", "Benzoic acid", "Corn syrup", "Sesame Oil",
    "Starch wheat", "Casein food", "Banana essence", "Milk", "Glucosamine", "New coccine", "Stearyl alcohol"]

class AuthorSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {med: this.props.med, dropdown: this.props.med.authors, sens:new Array(SENSITIVITIES.length).fill(false)};
        for(let i = 0; i < props.indexes.length; i++){
            this.state.sens[props.indexes[i]] = true
        }
    }

    get_status(author){
        let index = this.state.dropdown.indexOf(author)
        for(let i = 0; i < this.state.sens.length; i++){
            if(this.state.sens[i]){
                if(this.state.med.inact_ing[index].map(x => x.toLowerCase()).includes(SENSITIVITIES[i].toLowerCase())){
                    return PRESENT
                }
            }
        }
        return NOT_PRESENT
    }

    capitalize (text) {
        return text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    render() {
        let authors = this.state.dropdown
        let content = []
            authors.forEach(author =>
                    content.push(<AuthorList
                        author={this.capitalize(author)}
                        status={this.get_status(author)}
                        key={author}
                        navigation={this.props.navigation}
                    />))
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <ScrollView>
                        {content}
                    </ScrollView>
                </View>
            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        indexes: state.indexes
    };
}

export default connect(mapStateToProps)(AuthorSearch);


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