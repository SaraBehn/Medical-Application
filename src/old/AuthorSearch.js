import React, {Component} from 'react';                                         //imports
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { SearchBar, Image} from 'react-native-elements';
import AuthorList from "./AuthorList";
import data from "../../assets/dm_spl_zip_files_meta_data";
import {parseString} from "react-native-xml2js";

let NOT_PRESENT = 0
let PRESENT = 1

export default class AuthorSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {med: this.props.route.params.med, dropdown: this.props.route.params.med.authors};
    }

    get_status(author){
        let index = this.state.dropdown.indexOf(author)
        if(this.state.med.inact_ing[index].includes("SUCROSE") || this.state.med.inact_ing[index].includes("sucrose")){
            return 1
        }
        return 0
    }

    render() {
        let authors = this.state.dropdown
        let content = []
            authors.forEach(author =>
                    content.push(<AuthorList
                        author={author}
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