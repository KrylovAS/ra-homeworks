'use strict';
const form = {
  salutation: 'Мисис',
  name: 'Алевтина',
  subject: 'У меня важный вопрос',
  message: 'Как оформить доставку?',
  email: 'mis@test.co',
  snacks: ['пирог']
};


function checkField(key) {
    if(key === 'salutation') return 'Обращение';
    else if(key === 'name') return 'Имя';
    else if(key === 'email') return 'Почта';
    else if(key === 'subject') return 'Тема';
    else if(key === 'message') return 'Сообщение';
    else return 'Бонус';
}

const FeedbackForm = ({data, onSubmit}) => {
    let form;
    function handleButtonClick (event) {
        event.preventDefault();
        let dataToSend = '';
        const formData = new FormData(form);
        for(const [key,value] of formData) {
            const field = checkField(key);
            dataToSend += `${field}: ${value}; `
        }
        onSubmit(dataToSend)
    }
    return(
        <form className="content__form contact-form" ref={element => form = element}>
            <div className="testing">
                <p>Чем мы можем помочь?</p>
            </div>
            <SalutationField salutation={data.salutation}/>
            <NameField name={data.name}/>
            <EmailField email={data.email}/>
            <QuestionField question={data.subject}/>
            <MessageField message={data.message}/>
            <GiftField gifts={data.snacks}/>
            <button className="contact-form__button" type="submit" onClick={handleButtonClick}>Отправить сообщение!</button>
            <output id="result"/>
        </form>
    );
}

const SalutationField = ({salutation}) => {
    return (
        <div className="contact-form__input-group">
            <SalutationInput value='Мистер' id='salutation-mr' salutation={salutation} />
            <SalutationLabel value='Мистер' id='salutation-mr' />
            <SalutationInput value='Мисис' id='salutation-mrs' salutation={salutation} />
            <SalutationLabel value='Мисис' id='salutation-mrs' />
            <SalutationInput value='Мис' id='salutation-ms' salutation={salutation} />
            <SalutationLabel value='Мис' id='salutation-ms' />
        </div>
    );
}

const SalutationInput = ({value, id, salutation}) => {
    if(value === salutation) {
        return (<input defaultChecked className="contact-form__input contact-form__input--radio" id={id} name="salutation" type="radio" value={value}/>)
    }
    return (<input className="contact-form__input contact-form__input--radio" id={id} name="salutation" type="radio" value={value}/>)
}

const SalutationLabel = ({value, id}) => {
    return (<label className="contact-form__label contact-form__label--radio" htmlFor={id}>{value}</label>)
}

const NameField = ({name}) => {
    return(
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="name">Имя</label>
            <input className="contact-form__input contact-form__input--text" id="name" name="name" type="text" defaultValue={name}/>
        </div>
    );
}

const EmailField = ({email}) => {
    return(
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
            <input className="contact-form__input contact-form__input--email" id="email" name="email" type="email" defaultValue={email}/>
        </div>
    );
}

const QuestionField = ({question}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
            <select className="contact-form__input contact-form__input--select" id="subject" name="subject" defaultValue={question}>
                <option>У меня проблема</option>
                <option>У меня важный вопрос</option>
            </select>
        </div>
    );
}

const MessageField = ({message}) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
            <textarea className="contact-form__input contact-form__input--textarea" 
                      id="message" name="message" rows="6" cols="65" defaultValue={message}></textarea>
        </div>
    );
}

const GiftField = ({gifts}) => {
    return (
        <div className="contact-form__input-group">
            <p className="contact-form__label--checkbox-group">Хочу получить:</p>
                <GiftInput value='пицца' id='snacks-pizza' gifts={gifts} />
                <GiftLabel value='Пиццу' id='snacks-pizza' />
                <GiftInput value='пирог' id='snacks-cake' gifts={gifts} />
                <GiftLabel value='Пирог' id='snacks-cake' />
        </div>
    );
}

const GiftInput = ({value, id, gifts}) => {
    if(gifts) {
        const filtered = gifts.filter(gift => gift === value);
        if(filtered.length === 1) {
            return (<input defaultChecked className="contact-form__input contact-form__input--checkbox" id={id} name="snacks" type="checkbox" value={value}/>)
        }  
    }

    return (<input className="contact-form__input contact-form__input--checkbox" id={id} name="snacks" type="checkbox" value={value}/>)
}

const GiftLabel = ({value, id}) => {
    return (<label className="contact-form__label contact-form__label--checkbox" htmlFor={id}>{value}</label>)
}


function App() {
  let output;
  return (
    <section className="content">
      <h1 className="content__heading">Отправить нам сообщение</h1>
      <p className="content__lede">Используйте эту простую форму чтобы связаться с нами.</p>
      <FeedbackForm data={form} onSubmit={data => output.value = data} />
      <output ref={field => output = field} />
    </section>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);