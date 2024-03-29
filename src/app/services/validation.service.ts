export class ValidationService {
    static creditCardValidator(creditCard: string): boolean {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (creditCard.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return true;
        } else {
            return false;
        }
    }

    static emailValidator(email: string): boolean {
        // RFC 2822 compliant regex
        if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return true;
        } else {
            return false;
        }
    }

    static passwordValidator(password: string): boolean {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return true;
        } else {
            return false;
        }
    }
}


