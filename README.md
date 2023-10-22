# Bitcoin Price Component for React

![React Logo](https://reactjs.org/logo-og.png) ![Axios Logo](https://axios-http.com/assets/logo.png)

This is a simple (but customisable) React component to display the current Bitcoin price in USD, GBP or EUR using the [Coindesk API](https://api.coindesk.com/v1/bpi/currentprice.json).

No styles or fancy javascript animations!

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
          labelLevel="h3" // options "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          incLabel={true}
          txtHtml="p" //options "p" | "span" | "div";
          incBtn={true}
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

## Updated prices (increased, decreased or unchanged)

When updating/refreshing, an item attribute class of 'increased', 'decreased' or 'unchanged' is placed on the item for 2 seconds, this is so it can be styled, e.g. apply css green for .unchanged, red for .increased, yellow for .decreased

For example:

```bash
.increased {
  color: red;
  transition: color 0.5s ease-out; }
.increased::after {
  content: " ↑"; }

.decreased {
  color: yellow;
  transition: color 0.5s ease-out; }
.decreased::after {
  content: " ↓"; }

.unchanged {
  color: green;
  transition: color 0.5s ease-out; }
.unchanged::after {
  content: " ↔"; }
```

The button will also have disabled attribute for 3 seconds to avoid multiple clicking

Example button css

```bash
button.bpc-refresh {
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
  font-size: 12px;
  padding: 5px 10px; }
  button.bpc-refresh:hover {
    background-color: #aaa;
    border: 1px solid #aaa; }

.bpc-refresh:disabled {
  background-color: grey;
  cursor: not-allowed; }
```

## Live Demo

You can see this component in action at [LayerFi](https://layerfi.meta.mt/).

I have also created a Wordpress plugin based on this npm package, you can find it here...
[Wordpress bitcoin plugin](https://github.com/animasoul/wp-bitcoin-price-plugin)

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
