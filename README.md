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
\*\*note: Label is not necessary, if ommited will default to "Bitcoin Price Data:"

```bash
function App() {
  return (
    <div>
      <BitcoinPrice label="Some text Here" />
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
