'use strict';

function MessageHistory({list=[]}) {
  const messageBlock =  list.map(message => { 
    const {id, from, type, ...data} = message;
    
    switch(type){
      case 'response': return <Response key={id} message={data} from={from}/>;      
      case 'message': return <Message key={id} message={data} from={from}/>;          
      default: return <Typing key={id} message={data} from={from}/>
    } 
  });

  return (
    <ul>  
      {messageBlock}
    </ul>
  );
}