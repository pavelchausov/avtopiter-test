import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import './Content.css';
import base from './base.json';
import axios from 'axios';
import { convertObj } from './utils.js';    

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundItems: [],
            savedItems: {},
            selectedItem: {},
            inputValue: '',
        };
    }

    handeInput = ({ target: {value} }) => {
        this.setState({ inputValue: value });
        this.getItems(value);
    }

    handleItemSelect = (item) => (e) => {
        e.preventDefault();
        this.setState({ selectedItem: { ...item }})
    }

    handleSaveItemClick = (item) => (e) => {
        e.preventDefault();
        const { inn } = item;
        const { savedItems } = this.state;
        this.setState({ savedItems: { ...savedItems, [inn]: item } });
    }

    handleDeleteItemClick = (inn) => (e) => {
        e.preventDefault();
        const { savedItems } = this.state;
        const newSavedItemsKeys = Object.keys(savedItems).filter(key => key !== inn);
        this.setState({ savedItems: newSavedItemsKeys.reduce((acc, key) => ({...acc, [key]: savedItems[key]}), {})});
    }

    getItems = async (term) => {
        const { data } = await axios.post(
            'rs/suggest/party',
            { "query": term },
            {
                baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token 52487570a11fbaef1a0e20f83b6162ca31819f6c',
                },
            }
        );
        console.log({
            term,
            found: data.suggestions,
        });
        this.setState({ foundItems: data.suggestions.map(item => convertObj(item)) });
    }

    // getOrganizations = (term) => {
    //     const found = (term) ? base.suggestions.filter(org => org.data.name.full.indexOf(term.toUpperCase()) >= 0) : [];
    //     this.setState({ foundItems: found });
    // }

    render() {
        const {
            foundItems,
            savedItems,
            selectedItem,
            inputValue,
        } = this.state;
        return (
            <div className="wrapper">
                <div className="title-container">
                    <h1 className="title">Мои организации</h1>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Новая организация</Tab>
                        <Tab>Сохраненные организации ({Object.keys(savedItems).length})</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <FirstTab 
                                inputValue={inputValue}
                                handeInput={this.handeInput}
                                handleItemSelect={this.handleItemSelect}
                                handleSaveItemClick={this.handleSaveItemClick}
                                foundItems={foundItems}
                                selectedItem={selectedItem}
                                savedItems={savedItems}
                            />
                        </TabPanel>
                        <TabPanel>
                                <SecondTab
                                    savedItems={savedItems}
                                    handleDeleteItemClick={this.handleDeleteItemClick}
                                />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        )
    }
}