import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import './Content.css';
import axios from 'axios';
import { convertObj } from './utils.js';    

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundItems: [],
            savedItems: {}, //TODO: change it to new Map structutre
            selectedItem: {},
            inputValue: '',
            showFoundItems: false,
        };
    }
    handleInputFocus = () => {
        this.setState({ showFoundItems: true });
    }

    showFound = () => {
        const {
            foundItems,
            showFoundItems,
        } = this.state;
        return foundItems.length > 0 && showFoundItems;
    }

    handeInput = ({ target: {value} }) => {
        this.setState({ inputValue: value });
        this.getItems(value);
    }

    handleItemSelect = (item) => (e) => {
        e.preventDefault();
        this.setState({
            selectedItem: { ...item },
            showFoundItems: false,
        })
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
        this.setState({
            foundItems: data.suggestions.map(item => convertObj(item)),
            showFoundItems: true,
        });
    }

    render() {
        const {
            foundItems,
            savedItems,
            selectedItem,
            inputValue,
            showFoundItems,
        } = this.state;
        return (
            <div className="wrapper">
                <div className="title-container">
                    <h1 className="title">Мои организации</h1>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Новая организация</Tab>
                        <Tab>
                            <span>Сохраненные организации </span>
                            <span className="saved-items-counter">({Object.keys(savedItems).length})</span>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="tab-content">
                                <FirstTab 
                                    inputValue={inputValue}
                                    handeInput={this.handeInput}
                                    handleItemSelect={this.handleItemSelect}
                                    handleSaveItemClick={this.handleSaveItemClick}
                                    handleInputFocus={this.handleInputFocus}
                                    handleFoundFocus={this.handleFoundFocus}
                                    handleFocus={this.handleFocus}
                                    showFound={this.showFound}
                                    foundItems={foundItems}
                                    selectedItem={selectedItem}
                                    savedItems={savedItems}
                                    showFoundItems={showFoundItems}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="tab-content">
                                <SecondTab
                                    savedItems={savedItems}
                                    handleDeleteItemClick={this.handleDeleteItemClick}
                                />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        )
    }
}