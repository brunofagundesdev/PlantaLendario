export default class PasswordValidator {
    static rules = {
        length: {
            min: 10,
            max: 64
        }
    }
    static validate(password) {
        const { length } = this.rules;
        if (password.length < length.min || password.length > length.max) {

        }
        return true;
    }
}