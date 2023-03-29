import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MainSection,
  CurrenciesContainer,
  Input,
  ConvertBtn,
  ResultContainer,
} from './App.styled';

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('uah');
  const [output, setOutput] = useState(0);

  const handleInput = e => {
    let userValue = e.target.value;
    userValue = userValue
      .split('')
      .filter(el => el.trim())
      .join('');
    if (Number.isNaN(Number(userValue))) {
      toast.error('Please enter a number');
    }
    setInput(userValue);
  };

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then(res => {
        setExchangeRates(res.data[from]);
      });
  }, [from]);

  console.log(exchangeRates);

  const currencies = Object.keys(exchangeRates);

  function convert() {
    let rate = exchangeRates[to];
    setOutput(input * rate);
  }

  function flip() {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <MainSection>
      <ToastContainer />
      <h1>Currency converter</h1>
      <CurrenciesContainer>
        <div>
          <h3>Amount</h3>
          <Input
            type="text"
            placeholder="Enter the amount"
            onChange={e => handleInput(e)}
          />
        </div>
        <div>
          <h3>From</h3>
          <Dropdown
            options={currencies}
            onChange={e => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>
        <HiSwitchHorizontal
          style={{
            marginTop: '30px',
            backgroundColor: 'forestgreen',
            borderRadius: '50%',
            padding: '3px',
            cursor: 'pointer',
          }}
          size="30px"
          onClick={() => {
            flip();
          }}
        />
        <div>
          <h3>To</h3>
          <Dropdown
            options={currencies}
            onChange={e => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </CurrenciesContainer>
      <ResultContainer>
        <ConvertBtn
          onClick={() => {
            convert();
          }}
        >
          Convert
        </ConvertBtn>
        <h2>Converted Amount:</h2>
        <p>{input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}</p>
      </ResultContainer>
    </MainSection>
  );
}

export default App;

