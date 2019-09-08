import React from 'react';
import './styles.css';
import TrashButton from './trashButton.svg';

export default class SecondTab extends React.Component {
    render() {
        
        const {
            savedItems,
            handleDeleteItemClick
        } = this.props;
        return (
            <ul className="saved-items">
                {Object.keys(savedItems).map((item, index) => {
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
                    return (index < 3) ? (
                        <li key={inn} className="saved-item">
                            <div className="saved-item__header">
                                <div className="saved-item__name">{itemName}</div>
                                <button
                                    className="saved-item__delete-button"
                                    onClick={handleDeleteItemClick(inn)}
                                    title="Удалить"
                                >
                                    <img alt='delete' src={TrashButton}/>
                                </button>
                            </div>
                            <div className="saved-item__field">
                                <span className="saved-item__field-name">ИНН</span>
                                <span className="saved-item__field-info">{inn}</span>
                            </div>
                            <div className="saved-item__field">
                                <span className="saved-item__field-name">КПП</span>
                                <span className="saved-item__field-info">{kpp}</span>
                            </div>
                            <div className="saved-item__field">
                                <span className="saved-item__field-name">ОРГН</span>
                                <span className="saved-item__field-info">{ogrn}</span>
                            </div>
                            <div className="saved-item__field">
                                <span className="saved-item__field-name">Юридический адрес</span>
                                <span className="saved-item__field-info">{addressWithPostal}</span>
                            </div>
                            <div className="saved-item__field">
                                <span className="saved-item__field-name">Генеральный директор</span>
                                <span className="saved-item__field-info">{ceoName}</span>
                            </div>
                        </li>
                    ) : null;
                })}
            </ul>
        )
    }
}