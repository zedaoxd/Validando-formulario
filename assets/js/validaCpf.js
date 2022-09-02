class Cpf {
    constructor(numero) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: numero.replace(/\D+/g, '')
        });
    }

    isSequence() {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }

    espectedDigit(cpfArray) {
        let contador = cpfArray.length + 1;
        let dig = cpfArray.reduce((acumulador, valor) => {
            acumulador += (contador * valor);
            contador--;
            return acumulador;
        }, 0)

        dig = 11 - (dig % 11);
        return dig > 9 ? 0 : dig;
    }

    isValid() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSequence()) return false;

        let cpfArray = Array.from(this.cpfLimpo);
        cpfArray = cpfArray.map(x => Number(x));

        const d1 = this.espectedDigit(cpfArray.slice(0, -2));
        if (d1 !== cpfArray[cpfArray.length - 2]) return false;

        const d2 = this.espectedDigit(cpfArray.slice(0, -1));
        if (d2 !== cpfArray[cpfArray.length - 1]) return false;

        return true;
    }
}
