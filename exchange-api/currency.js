class Currency {
  constructor(firstCurrency, secondCurrency) {
    this.firstCurrency = firstCurrency;
    this.secondCurrency = secondCurrency;
    this.url =
      "http://api.exchangeratesapi.io/latest?access_key=";//+ apiKey
    this.amount = null;
  }

  async exchange() {
    const response = await fetch(this.url);
    const data = await response.json();
    const parity = data.rates[this.secondCurrency];
    const result = Number(this.amount) * parity;
    return result;
  }

  changeAmount(amount) {
    this.amount = amount;
  }

  changeFirstCurrency(newfirstCurrency) {
    this.firstCurrency = newfirstCurrency;
  }
  changeSecondCurrency(newSecondCurrency) {
    this.secondCurrency = newSecondCurrency;
  }
}
