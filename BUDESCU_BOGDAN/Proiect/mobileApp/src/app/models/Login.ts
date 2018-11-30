export class Login {
    public Email: string;
    public Password: string;
    constructor(email: string, password: string) {
        this.Email = email;
        this.Password = password;
    }
}