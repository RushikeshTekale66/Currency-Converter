import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrenty] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'amount':
        setAmount(value)
        break;

      case 'fromCurrency':
        setFromCurrenty(value);
        break;

      case 'toCurrenty':
        setToCurrency(value);
        break;
    }
  }

  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    axios.get(apiUrl)
      .then(
        responce => {
          setExchangeRate(responce.data.rates);
        }
      ).catch(error => {
        console.log(error);
      })
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangeRate[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  return (
    <div className="card">
      <h1 className='text-6xl'>Currency Converter</h1>

      <div className='cur-exc'>

        {/* Container 1 */}
        <div className='input-container'>
          <label className='input-label'>Amount : </label>
          <input type='Number' name='amount' className='input-field' value={amount} onChange={handleChange} />
        </div>

        {/* Container 2 */}
        <div className='input-container'>
          <label className='input-label'>From Currency : </label>
          <select name='fromCurrency' value={fromCurrency} onChange={handleChange} className='input-field'>
            {
              Object.keys(exchangeRate).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))
            }
          </select>
        </div>

        {/* Container 3 */}
        <div className='input-container'>
          <label className='input-label'>To Currency : </label>
          <select name='toCurrency' value={toCurrency} onChange={handleChange} id='' className='input-field'>
            {
              Object.keys(exchangeRate).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className='output'>
        <h2 className=''>Converted Amount : <b>{convertedAmount}</b></h2>
      </div>
    </div>
  );
}

export default App;
