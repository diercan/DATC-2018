export class Register {
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
    constructor(FirstName: string, LastName: string, Email: string, Password: string, ConfirmPassword: string) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
    }
}