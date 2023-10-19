# Bitcoin Price Component for React

![React Logo](https://reactjs.org/logo-og.png) ![Axios Logo](https://axios-http.com/assets/logo.png)

This is a simple React component to display the current Bitcoin price using the [Coindesk API](https://api.coindesk.com/v1/bpi/currentprice.json).

## Installation

```bash
npm install bitcoin-price-component
```

### Usage

Import the component into your React app:

```bash
import BitcoinPrice from 'bitcoin-price-component';
```

You can include some basic css for styling (optional)

```bash
import 'bitcoin-price-component/dist/BitcoinPrice.css';
```

Then use it in your component:

##### note: all the properties are optional, the ones specified below are the default values

```bash
function App() {
  return (
    <div>
      <BitcoinPrice
          label="Current Bitcoin Prices:"
          btnText="Refresh"
          incLabel={true}
          incUSD={true}
          incGBP={true}
          incEUR={true}
          incDisclaimer={true}
          incUpdateTime={true}
        />
    </div>
  );
}
```

## Live Demo

You can see this component in action at [LayerFi](https://layerfi.meta.mt/).

## About the Author

**Abel Rogers** - A seasoned web developer. You can find more about him and his projects:

- [Github Repo](https://github.com/animasoul/bitcoin-price-component)
- [Personal Portfolio](https://www.ajpartnersltd.com/)
- [LayerFi](https://layerfi.meta.mt/)
- [Abel Portfolio](https://abel.meta.mt/)
- [Meta MT](https://www.meta.mt/)
- [Meta MT Jobs](https://jobs.meta.mt/)

## License

This project is licensed under the ISC License.
