export default class Transaction {

    public transactionString:string|undefined;
    public transactionID:number|undefined;
    public transactionDate:string|undefined;
    public type:string|undefined;

    public Transaction(transactionString:string,transactionDate:string,type:string) {
        this.transactionString=transactionString;
        this.transactionDate=transactionDate;
        this.type=type;
    }


}