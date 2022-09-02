class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        })
    }

    isValidFields() {
        let valid = true;

        this.formulario.querySelectorAll('.error-text').forEach(element => {
            element.remove();
        });

        for (const field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText;

            if (!field.value) {
                this.createError(field, `Campo ${label} não pode estar em branco.`);
                valid = false;
            }

            if (field.id === 'cpf') {
                if (!this.validCpf(field)) valid = false;
            }

            if (field.id === 'usuario') {
                if (!this.userValid(field)) valid = false;
            }
        }
        return valid;
    }

    userValid(field) {
        const user = field.value;
        let _valid = true;
        if (user.length > 12 || user.length < 3) {
            this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
            _valid = false;
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Nome de usuário só pode conter letras e/ou números');
            _valid = false;
        }

        return _valid;
    }

    validCpf(field) {
        const cpf = new Cpf(field.value);

        if (!cpf.isValid()) {
            this.createError(field, 'CPF inválido')
            return false;
        }
        return true;
    }

    createError(field, message) {
        const div = document.createElement('div');
        div.innerText = message;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }

    isValidPassword() {
        let valid = true;
        const password = this.formulario.querySelector('#senha');
        const repeatPassword = this.formulario.querySelector('#repetir-senha');

        if (password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'Campos senha e repetir senha precisa ser iguais.');
            this.createError(repeatPassword, 'Campos senha e repetir senha precisa ser iguais.');
        }

        if (password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.isValidFields();
        const validPasswords = this.isValidPassword();

        if (validFields && validPasswords) {
            alert('Formulario enviado!');
            this.formulario.submit();
        }
    }
}

const valida = new ValidaFormulario();