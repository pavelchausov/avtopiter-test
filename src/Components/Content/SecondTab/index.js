import React from 'react';

export default class SecondTab extends React.Component {
    render() {
        const {
            savedItems,
            handleDeleteItemClick
        } = this.props;
        return (
            <ul>
                {Object.keys(savedItems).map(item => {
                    const {
                        itemName,
                        addressData: {
                            addressWithPostal
                        },
                        ceoName,
                        inn,
                        kpp,
                        ogrn,
                    } = savedItems[item];
                    return (
                        <li key={inn} >
                            <div>{itemName}</div>
                            <div>Юридический адрес</div>
                            <div>{addressWithPostal}</div>
                            <div>Генеральный директор</div>
                            <div>{ceoName}</div>
                            <div>ИНН {inn}</div>
                            <div>КПП{kpp}</div>
                            <div>ОРГН{ogrn}</div>
                            <a href='#' onClick={handleDeleteItemClick(inn)}>Удалить</a>
                        </li>
                    );
                })}
            </ul>
        )
    }
}