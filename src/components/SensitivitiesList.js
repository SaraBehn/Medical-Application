import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements'
import {ScrollView, Text, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import { connect } from 'react-redux';
import ls from 'local-storage'

export default class SensitivitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({sens: this.props.route.params.sens, ids: this.props.route.params.ids, fetchInProgress:false, unmounted:false})
    }

    check = (key) => {
        let checkboxes = this.state.sens;
        checkboxes[key] = !this.state.sens[key];
        this.setState({sens: checkboxes});

        let ids = this.state.ids

        if (checkboxes[key] && !this.state.ids[key]) {
            ids[key] = []
            this.fetchData(key, 0, Number.MAX_SAFE_INTEGER, ids)
            this.setState({ids: ids})
        } else if (!checkboxes[key] && this.state.ids[key]) {
            delete ids[key]
            this.setState({ids: ids})
        }
    }

    fetchData(key, skip, max, ids){
        fetch("https://api.fda.gov/drug/label.json?search=inactive_ingredient:\"" + key + "\"&skip=" + skip + "&limit=1000")
            .then(response => response.json())
            .then(responseJSON => {
                for(let entry in responseJSON.results) {
                    if(ids[key]) {
                        ids[key].push(responseJSON.results[entry].set_id)
                    }
                    else{
                        return;
                    }
                }
                if(skip + 1000 < max){
                    this.fetchData(key, skip+1000, responseJSON.meta.results.total, ids)
                } else {
                    this.state.fetchInProgress = false
                    console.log("done")
                    if(this.state.unmounted){
                        ls.set('bad_ids', ids)
                    } else {
                        this.setState({ids: ids})
                    }
                    return;
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
                onIconPress={() => this.check(key)}
            />)
        }

        for (let index = 0; index < this.state.sens.length; index++){

        }
        return (
            <ScrollView>
                {content}
            </ScrollView>

        );
    }

}