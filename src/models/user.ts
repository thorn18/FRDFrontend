export default class User{
    userID: string | undefined
    username: string | undefined
    password:string | undefined
    role:string | undefined
    address:string | undefined
    email:string | undefined
    dob:string | undefined


    public User(username:string, password:string, role:string, address:string, email:string, dob:string) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.address=address;
        this.email = email;
        this.dob=dob;
    }

    getUserID() {
        return this.userID;
    }

    getPassword() {
        return this.password;
    }

    getUsername() {
        return this.username;
    }

    getRole() {
        return this.role;
    }

    getAddress() {
        return this.address
    }

    getEmail() {
        return this.email;
    }

    getDOB() {
        return this.dob;
    }

    setUsername(username:string) {
        this.username = username;
    }

    setPassword(password:string) {
        this.password = password;
    }

    setRole(role:string) {
        this.role = role;
    }

    setDOB(dob:string) {
        this.dob = dob;
    }

    setAddress(address:string) {
        this.address = address;
    }

    setEmail(email:string) {
        this.email = email;
    }
    

}