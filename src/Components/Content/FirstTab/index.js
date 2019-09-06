import React from 'react';
import SelectedItem from './SelectedItem.js';
import './styles.css';

export default class FirstTab extends React.Component {
    render() {
        const {
            inputValue,
            foundItems,
            handeInput,
            handleItemSelect,
            selectedItem,
            handleSaveItemClick,
            savedItems,
        } = this.props;
        console.log(foundItems);
        return (
            <>
                <form>
                    <input
                        value={inputValue}
                        onChange={handeInput}
                    />
                </form>
                {foundItems.length > 0 && (<ul className="foundOrgsList">
                    {foundItems.map(item => {
                        const {
                            itemName,
                            addressData: {
                                locationStr
                            },
                            inn,
                        } = item;
                        return (
                            <li key={inn}>
                                <a href='#' onClick={handleItemSelect(item)}>
                                    <div className="foundOrganization__name">{itemName}</div>
                                    <div className="foundOrganization__inn">{inn}</div>
                                    <div className="foundOrganization__city">{locationStr}</div>
                                </a>
                            </li>
                        );
                    })}
                </ul>)}
                <SelectedItem
                    item={selectedItem}
                    handleSaveItemClick={handleSaveItemClick}
                    savedItems={savedItems}
                />
            </>
        );
    }
}