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
            handleInputFocus,
            selectedItem,
            handleSaveItemClick,
            savedItems,
            showFound,
        } = this.props;
        return (
            <>
                <form autoComplete="off">
                    <label htmlFor="input" className="input-label">Организация или ИП</label>
                    <input
                        id="input"
                        role="searchbox"
                        value={inputValue}
                        onChange={handeInput}
                        className="input-field"
                        placeholder="Введите название, ИНН или адрес организации"
                        onFocus={handleInputFocus}
                    />
                </form>
                {showFound() && (
                    <ul
                        className="found-items"
                        id="found"
                    >
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
                                    <button onClick={handleItemSelect(item)} className="found-item">
                                        <div className="found-item__name">{itemName}</div>
                                        <div className="found-item__rest">
                                            <span className="found-item__inn">{inn}</span>
                                            <span className="found-item__rest">{locationStr}</span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
                <SelectedItem
                    item={selectedItem}
                    handleSaveItemClick={handleSaveItemClick}
                    savedItems={savedItems}
                />
            </>
        );
    }
}