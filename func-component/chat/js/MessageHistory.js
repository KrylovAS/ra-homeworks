'use strict';

const messageBlock = (list) => {  
  return list.map(message => {
    const { id, from, type, ...data } = message;

    switch (type) {
      case 'response':
        return <Response key={id} message={data} from={from} />;
      case 'message':
        return <Message key={id} message={data} from={from} />;
      default:
        return <Typing key={id} message={data} from={from} />;
    }
  });
};

const MessageHistory = ({ list }) => <ul>{messageBlock(list)}</ul>;

MessageHistory.defaultProps = {
  list: [],
};
