import Card from "./models/cards.js"
import userBill from "./models/userBill.js"

export const cardService={
    async createCardNumber(model){
        let cardNumber=0
        if(model==="Visa"){
            cardNumber=this.generateVisaCardNumber()
        }
        else{
            cardNumber=this.generateMasterCardNumber()
        }
        while(await Card.findOne({cardNumber})){
            if(model==="Visa"){
                cardNumber=this.generateVisaCardNumber()
            }
            else{
                cardNumber=this.generateMasterCardNumber()
            }
        }
        return cardNumber
    }
    ,generateVisaCardNumber() {
        // Start with '4' for Visa
        let cardNumber = "4";
    
        // Generate the next 14 digits randomly (total length will be 15 so far)
        for (let i = 0; i < 14; i++) {
            cardNumber += Math.floor(Math.random() * 10);
        }
    
        // Compute the Luhn check digit and append it
        cardNumber += this.computeLuhnCheckDigit(cardNumber);
    
        return cardNumber;
    },
    generateMasterCardNumber() {
        let cardNumber = "";
    
        // Randomly choose a prefix for MasterCard
        const prefixes = [
            ...Array.from({ length: 5 }, (_, i) => (51 + i).toString()), // 51 to 55
            ...Array.from({ length: 500 }, (_, i) => (2221 + i).toString()) // 2221 to 2720
        ];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        cardNumber += prefix;
    
        // Generate the rest of the digits to make a 15-digit number (excluding the Luhn check digit)
        while (cardNumber.length < 15) {
            cardNumber += Math.floor(Math.random() * 10);
        }
    
        // Compute the Luhn check digit and append it
        cardNumber += this.computeLuhnCheckDigit(cardNumber);
    
        return cardNumber;
    },
    computeLuhnCheckDigit(cardNumber) {
        let sum = 0;
        let shouldDouble = true;
    
        // Start from the rightmost digit and work backwards
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i]);
    
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
    
            sum += digit;
            shouldDouble = !shouldDouble;
        }
    
        // Return the check digit that makes the total sum a multiple of 10
        return (10 - (sum % 10)) % 10;
    },
    createPin(){
        return Math.floor(1000 + Math.random() * 9000);
    },
    createCVV(){
        return Math.floor(100 + Math.random() * 900);
    },
    createExpireDate(){
        const currentDate = new Date();
        const expiryMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        const expiryYear = currentDate.getFullYear() + 4;
    
        // Format the month to always be two digits
        const formattedMonth = expiryMonth.toString().padStart(2, '0');
    
        // Combine month and year into the desired format (MM/YYYY)
        return `${formattedMonth}/${expiryYear}`;
    },
    async createCard(type,expireDate,cardNumber,CVV,IBAN,PIN,ownerId,model,creditAmount){
        const status=true
        const billId=(await userBill.findOne({IBAN}))._id
        const dayWithDrawLimit=1000
        const dayLimitWithTrader=1000
        const dayLimit=1000
        return Card.create({type,expireDate,cardNumber,CVV,status,billId,PIN,ownerId,model,dayWithDrawLimit,dayLimitWithTrader,dayLimit,creditAmount})
    },
    async getCards(IBAN){
        const billId=(await userBill.findOne({IBAN}))._id
        return await Card.find({billId})
    },
    async getDetails(cardId){
        return await Card.findById(cardId)
    },
    async deleteCard(cardId){
        return await Card.findByIdAndDelete(cardId)
    }
    
}