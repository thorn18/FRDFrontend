import Transaction from "./Transaction";

export default interface Account{
    
    transactions:Transaction[] | undefined;
    owner:string | undefined;
    accountID:number | undefined;
    balance:number |undefined;

}

