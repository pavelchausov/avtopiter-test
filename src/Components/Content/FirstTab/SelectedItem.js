import React from 'react';
import Plus from './svg/plus.svg';
import CheckMark from './svg/checkMark.svg';

export default class SelectedItem extends React.Component {
    render() {
        const {
            item,
            handleSaveItemClick,
            savedItems,
        } = this.props;
        const {
            itemName,
            addressData,
            ceoName,
            inn,
            kpp,
            ogrn,
        } = item;

        if (Object.keys(item).length === 0) {
            return (
                <div className="placeholder-block">
                    <img src={Plus} alt=""></img>
                    <div className="placeholder-block__text">Для добавления новой организации введите ее название, ИНН или адрес.</div>
                </div>
            )
        }
        return ( 
            <div className="selected-item">
                <div className="selected-item__name">{itemName}</div>
                <div className="selected-item__content">
                    <div className="selected-item__left-block">
                        <div className="selected-item__left-block-item">
                            <div className="selected-item__left-block-label">Юридический адрес</div>
                            <div className="selected-item__left-block-info">{addressData.addressWithPostal}</div>
                        </div>
                        <div className="selected-item__left-block-item">
                            <div className="selected-item__left-block-label">Генеральный директор</div>
                            <div className="selected-item__left-block-info">{ceoName}</div>
                        </div>
                    </div>
                    <div className="selected-item__right-block">
                        <div className="selected-item__right-block-item"><span>ИНН</span> {inn}</div>
                        <div className="selected-item__right-block-item"><span>КПП</span> {kpp}</div>
                        <div className="selected-item__right-block-item"><span>ОРГН</span> {ogrn}</div>
                    </div>
                </div>
                <button
                    onClick={handleSaveItemClick(item)}
                    disabled={savedItems[inn]}
                    className="save-button"
                >
                    {(savedItems[inn]) ? <><img className="saved-img" src={CheckMark} alt=""/>Сохранено</> : 'Сохранить'}
                </button>
            </div>
        );
    }
}