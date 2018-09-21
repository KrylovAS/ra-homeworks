'use strict';

const FeedbackForm = ({ data, onSubmit }) => {
	const { salutation, name = null, subject, message = null, email = null, snacks = [] } = data;
	const getForm = (e) => {
		e.preventDefault();
		let data = '';
		const form = document.getElementsByTagName('form')[0];
		const formData = new FormData(form);
		for (const [ key, value ] of formData) {
			data += `${key}: '${value}' `;
		}

		onSubmit(JSON.stringify(data));
	};

	return (
		<form className='content__form contact-form'>
			<div className='testing'>
				<p>Чем мы можем помочь?</p>
			</div>
			<div className='contact-form__input-group'>
				<input
					className='contact-form__input contact-form__input--radio'
					id='salutation-mr'
					name='salutation'
					type='radio'
					value='Мистер'
					defaultChecked={'Мистер' === salutation}
				/>
				<label className='contact-form__label contact-form__label--radio' htmlFor='salutation-mr'>
					Мистер
				</label>
				<input
					className='contact-form__input contact-form__input--radio'
					id='salutation-mrs'
					name='salutation'
					type='radio'
					value='Мисис'
					defaultChecked={'Мисис' === salutation}
				/>
				<label className='contact-form__label contact-form__label--radio' htmlFor='salutation-mrs'>
					Мисис
				</label>
				<input
					className='contact-form__input contact-form__input--radio'
					id='salutation-ms'
					name='salutation'
					type='radio'
					value='Мис'
					defaultChecked={'Мис' === salutation}
				/>
				<label className='contact-form__label contact-form__label--radio' htmlFor='salutation-ms'>
					Мис
				</label>
			</div>
			<div className='contact-form__input-group'>
				<label className='contact-form__label' htmlFor='name'>
					Имя
				</label>
				<input
					className='contact-form__input contact-form__input--text'
					id='name'
					name='name'
					type='text'
					value={name}
				/>
			</div>
			<div className='contact-form__input-group'>
				<label className='contact-form__label' htmlFor='email'>
					Адрес электронной почты
				</label>
				<input
					className='contact-form__input contact-form__input--email'
					id='email'
					name='email'
					type='email'
					value={email}
				/>
			</div>
			<div className='contact-form__input-group'>
				<label className='contact-form__label' htmlFor='subject'>
					Чем мы можем помочь?
				</label>
				<select
					className='contact-form__input contact-form__input--select'
					id='subject'
					name='subject'
					defaultValue={subject}
				>
					<option value='У меня проблема'>У меня проблема</option>
					<option value='У меня важный вопрос'>У меня важный вопрос</option>
				</select>
			</div>
			<div className='contact-form__input-group'>
				<label className='contact-form__label' htmlFor='message'>
					Ваше сообщение
				</label>
				<textarea
					className='contact-form__input contact-form__input--textarea'
					id='message'
					name='message'
					rows='6'
					cols='65'
					value={message}
				/>
			</div>
			<div className='contact-form__input-group'>
				<p className='contact-form__label--checkbox-group'>Хочу получить:</p>
				<input
					className='contact-form__input contact-form__input--checkbox'
					id='snacks-pizza'
					name='snacks'
					type='checkbox'
					value='пицца'
					defaultChecked={'пицца' === snacks.join('')}
				/>
				<label className='contact-form__label contact-form__label--checkbox' htmlFor='snacks-pizza'>
					Пиццу
				</label>
				<input
					className='contact-form__input contact-form__input--checkbox'
					id='snacks-cake'
					name='snacks'
					type='checkbox'
					value='пирог'
					defaultChecked={'пирог' === snacks.join('')}
				/>
				<label className='contact-form__label contact-form__label--checkbox' htmlFor='snacks-cake'>
					Пирог
				</label>
			</div>
			<button className='contact-form__button' type='submit' onClick={getForm}>
				Отправить сообщение!
			</button>
			<output id='result' />
		</form>
	);
};
