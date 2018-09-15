'use strict';

function Stars({ count }) {
  if (typeof count !== 'number' && count < 1 && count > 5) return null;
  const ganerateStar = count => {
    const quantityStar = [];
    for (let i = 0; i < count; i++) {
      quantityStar.push(<Star />);
    }
    return quantityStar.map(el => <li>{el}</li>);
  };
  return <ul className="card-body-stars u-clearfix">{ganerateStar(count)}</ul>;
}
