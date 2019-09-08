const convertObj = (item) => {
    if (item === null) {
        alert('null');
        return;
    }
    const {
        value: itemName,
        data: {
            address,
            management,
            inn,
            kpp,
            ogrn,
        }
    } = item;
    return {
        itemName,
        addressData: makeAddress(address),
        ceoName: (management) ? management.name : '-',
        inn,
        kpp,
        ogrn,
    };
}

const makeAddress = (address) => {
    const {
        value: addressValue,
        data: {
            postal_code: postalCode,
            settlement_type,
            settlement,
            city_type,
            city,
        },
    } = address;
    const locationStr = (city) ? `${city_type}. ${city}` : `${settlement_type}. ${settlement}`;
    return {
        addressValue,
        addressWithPostal: `${postalCode} ${addressValue}`,
        locationStr,
    };
} 

export { convertObj }; 