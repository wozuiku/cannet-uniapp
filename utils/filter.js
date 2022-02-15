import { formatMoney, convertCurrency } from '@/utils/common';

const moneyFormater = (value) => {
    return formatMoney(value, 2)
}

const moneyChineseFormater = (value) => {
    return convertCurrency(value)
}

export default functiomoneyFormatern (Vue){
    Vue.filter('', moneyFormater);
    Vue.filter('moneyChineseFormater', moneyChineseFormater);
}
