'use strict';

const formValidate = (e) => {
	let regExp;
	if (e.target.name === 'email') {
		regExp = /[^\w\d@_\.-]/i;
	}
	if (e.target.name === 'password') {
		regExp = /[^\w\d_]/i;
	}
	e.target.value = e.target.value.replace(regExp, '');
};

function AuthForm({ onAuth }) {
	const getForm = (e) => {
		e.preventDefault();
		const user = {
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};

		typeof onAuth ? onAuth(user) : null;
	};
	return (
		<form className='ModalForm' action='/404/auth/' method='POST' onSubmit={getForm}>
			<div className='Input'>
				<input required type='text' placeholder='Имя' name='name' />
				<label />
			</div>
			<div className='Input'>
				<input type='email' placeholder='Электронная почта' name='email' onChange={formValidate} />
				<label />
			</div>
			<div className='Input'>
				<input required type='password' placeholder='Пароль' name='password' onChange={formValidate} />
				<label />
			</div>
			<button type='submit'>
				<span>Войти</span>
				<i className='fa fa-fw fa-chevron-right' />
			</button>
		</form>
	);
}
