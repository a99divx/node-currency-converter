// You can use the below functions to get Currency, Country or Exchange Rates for any Currenty you want

const axios = require('axios');

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=46d0d391e1402a69fce7d3db8de74133&format=1');
    const rate = response.data.rates;
    const usd = 1 / rate[fromCurrency];
    const exchangeRate = usd * rate[toCurrency];
    
    if(isNaN(exchangeRate)) {
        throw new Error (`Unable to get Currency ${fromCurrency} and ${toCurrency}`);
    }
    return exchangeRate;
}

const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`);
        return response.data.map(country => country.name.common);
    } catch(error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`);
    }
}

const converyCurrency = async (fromCurrency, toCurrency, amount) => {
    const contries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. you can spent these in the following contries ${contries}`;
}

converyCurrency('USD', 'TsRY', '100')
.then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error.message);
})