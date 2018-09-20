'use strict';

'use strict';

class AuthForm extends React.Component {
    render() {
        const sendData = event => {
            event.preventDefault();
            const user = {};
            Array.from(document.forms[0]).forEach(element => {
                if(element.value) {
                    if(element.type === 'text') {
                        return user.name = element.value;
                    }
                    user[element.type] = element.value;
                }
            })
            if(this.props.onAuth && typeof this.props.onAuth === 'function') {
                this.props.onAuth(user);
            }
        }

        function formatInput(event, type) {
            if (type === 'email') {
                event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z0-9_@.-]/g,'');
            } else {
                event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z0-9_@]/g,'');
            }
        }
        return(
            <form className="ModalForm" action="/404/auth/" method="POST">
                <Input required={true} type='text' name='Имя' onSubmit={sendData} onAuth={this.props.onAuth}/>
                <Input required={false} type='email' name='Электронная почта' onSubmit={sendData} onChange={formatInput} onAuth={this.props.onAuth}/>
                <Input required={true} type='password' name='Пароль' onSubmit={sendData} onChange={formatInput} onAuth={this.props.onAuth}/>
                <Button type='submit' onClick={sendData}/>
            </form>
        )
    }
}

class Input extends React.Component {
    render() {
        const required = this.props.required ? true : false;
        const onChange = this.props.onChange ? (event) => this.props.onChange(event, this.props.type) : false;
        return(
            <div className='Input'>
                <input required={required} 
                       type={this.props.type} 
                       placeholder={this.props.name} 
                       onSubmit={event => this.props.onSubmit(event)} 
                       onChange={onChange}/>
                <label></label>
            </div>
        );
    }
}

class Button extends React.Component {
    render() {
        return(
            <button type={this.props.type} onClick={this.props.onClick}>
                <span>Войти</span>
                <i class="fa fa-fw fa-chevron-right"></i>
            </button>
        );
    }
}