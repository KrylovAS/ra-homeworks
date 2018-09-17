'use strict';

const ganerateStar = (count)  => {
  if(Number.isInteger(count) && count < 1 || count > 5) return null;    
    const quantityStar = [];
    for (let i = 0; i < count; i++) {
      quantityStar.push(<Star />);
    }  
    return quantityStar;
}

const  Stars = ({ count }) => <ul className="card-body-stars u-clearfix">
                                {ganerateStar(count).map(el => <li>{el}</li>)}
                              </ul>;

