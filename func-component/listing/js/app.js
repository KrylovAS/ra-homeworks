'use strict';

fetch('https://neto-api.herokuapp.com/etsy')
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
  })
  .then(res => res.json())
  .then(res => getItems(res))
  .catch(err => console.log(err));

function Listing({ items } = []) {
  const itemList = items.map(el => {
    const currencyPrice = (code, price) => {
      switch (code) {
        case 'USD':
          return `$ ${price}`;
        case 'EUR':
          return `€ ${price}`;
        default:
          return `${price} ${code}`;
      }
    };
    const currientQatnity = quantity => {
      return (quantity <= 10 && 'low') || (quantity <= 20 && 'medium') || 'high';
    };
    return (
      <div key={el.listing_id} className="item">
        <div className="item-image">
          <a href={el.url}>
            <img src={el.MainImage.url_570xN} />
          </a>
        </div>
        <div className="item-details">
          <p className="item-title">
            {el.title.length < 50 ? el.title : `${el.title.slice(0, 51)}...`}
          </p>
          <p className="item-price">{currencyPrice(el.currency_code, el.price)}</p>
          <p className={`item-quantity level-${currientQatnity(el.quantity)}`}>{el.quantity}</p>
        </div>
      </div>
    );
  });
  return <div className="item-list">{itemList}</div>;
}

function getItems(items) {
  ReactDOM.render(<Listing items={items} />, document.getElementById('root'));
}

// Listing.defaultProps = {
//   items: [],
// };
