export class UserModel {

    name: string = '';
    email: string = '';
    password: string = '';
    birthday: string = '';

    constructor(values = {}) {
        Object.keys(this).forEach(key => {
            if (values && values.hasOwnProperty(key))
                this[key] = values[key];
        });
    }

}