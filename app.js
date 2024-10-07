const apiKey = '8a59f421b1051e61c91dd8fb'; 
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amountInput');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');


async function getCurrencies() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            option2.value = currency;
            option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

    } catch (error) {
        resultDiv.textContent = 'Error al cargar las monedas.';
    }
}

// Función para convertir monedas
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === '' || isNaN(amount)) {
        resultDiv.textContent = 'Por favor, ingresa una cantidad válida.';
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`);
        const data = await response.json();

        const rate = data.conversion_rate;
        const convertedAmount = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${from} equivale a ${convertedAmount} ${to}`;
    } catch (error) {
        resultDiv.textContent = 'Error al realizar la conversión.';
    }
}

// Evento para realizar la conversión al hacer clic en el botón
convertBtn.addEventListener('click', convertCurrency);

// Cargar las monedas al cargar la página
window.onload = getCurrencies;