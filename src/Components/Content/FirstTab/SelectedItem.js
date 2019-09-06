import React from 'react';

export default class SelectedItem extends React.Component {
    render() {
        const {
            item,
            handleSaveItemClick,
            savedItems,
        } = this.props;
        console.log(item)
        const {
            itemName,
            addressData,
            ceoName,
            inn,
            kpp,
            ogrn,
        } = item;
        return Object.keys(item).length > 0 && ( 
            <div className="selectedItem">
                <div>{itemName}</div>
                <div>Юридический адрес</div>
                <div>{addressData.addressWithPostal}</div>
                <div>Генеральный директор</div>
                <div>{ceoName}</div>
                <div>ИНН {inn}</div>
                <div>КПП{kpp}</div>
                <div>ОРГН{ogrn}</div>
                {(savedItems[inn]) ? (<span>Сохранено</span>) : (<a href='#' onClick={handleSaveItemClick(item)}>Сохранить</a>) }
            </div>
        );
    }
}