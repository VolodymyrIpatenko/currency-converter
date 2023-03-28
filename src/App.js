import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('uah');
  const [currencies, setCurrencies] = useState([]);
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
        setInfo(res.data[from]);
      });
  }, [from]);

  useEffect(() => {
    setCurrencies(Object.keys(info));
    convert();
  }, [info]);

  function convert() {
    let rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input
            type="text"
            placeholder="Enter the amount"
            onChange={e => handleInput(e)}
          />
        </div>
        <div className="middle">
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
        <div className="switch">
          <HiSwitchHorizontal
            size="30px"
            onClick={() => {
              flip();
            }}
          />
        </div>
        <div className="right">
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
      </div>
      <div className="result">
        <button
          onClick={() => {
            convert();
          }}
        >
          Convert
        </button>
        <h2>Converted Amount:</h2>
        <p>{input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}</p>
      </div>
    </div>
  );
}

export default App;

