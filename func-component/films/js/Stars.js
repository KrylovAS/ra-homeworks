'use strict';

function Stars({ count }) {  
  const ganerateStar = count => {    
    if(Number.isInteger(count) && count < 1 || count > 5) return null;    
    const quantityStar = [];
    for (let i = 0; i < count; i++) {
      quantityStar.push(<Star />);
    }
    return quantityStar.map(el => <li>{el}</li>);
  };
  
  return <ul className="card-body-stars u-clearfix">{ganerateStar(count)}</ul>;
}
