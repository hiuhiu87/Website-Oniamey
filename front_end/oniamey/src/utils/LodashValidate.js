import _ from 'lodash';

const isCheckEmpty = (str) => {
    return _.isEmpty(str);
}

const isCheckNumberParseInt = (nbr) => {
    return !(_.isNumber(parseInt(nbr)) && parseInt(nbr) > 0);
}

const isCheckNumberParseFloat = (nbr) => {
    return !(_.isNumber(parseFloat(nbr)) && parseFloat(nbr) > 0);
}

export { isCheckEmpty, isCheckNumberParseInt, isCheckNumberParseFloat };