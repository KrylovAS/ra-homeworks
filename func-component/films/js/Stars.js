'use strict';

function Stars({count}) {
  const createStar = function(count){
    
    const  quantityStar= [];  
    if( typeof count === "number" && count >= 1 && count <= 5 ) {        
      for (let i = 0; i < count; i++) {
        quantityStar.push(<Star/>);
      }
      return quantityStar.map(el => <li>{el}</li>);
    }

    return null;
}
  return (
   <ul className="card-body-stars u-clearfix">
    {createStar(count)}
  </ul>
  );
}
