import userBill from "./models/userBill.js";

export const billService={

    generateRandomIBAN() {
        const countryCode = 'BG';
        const checksum = String(Math.floor(Math.random() * 90) + 10); // Random 2-digit checksum
        const bankCode = this.generateRandomString(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Random 4-letter bank code
        const accountNumber = this.generateRandomString(16, '0123456789'); // Random 16-digit account number
        return `${countryCode}${checksum}${bankCode}${accountNumber}`;
      },

generateRandomString(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },
    async createUserBill(billName,balance,ownerId){
        let IBAN=this.generateRandomIBAN()
        while (await userBill.findOne({IBAN})) {
            console.log("iban exists")
            IBAN=this.generateRandomIBAN()
        }
        return await userBill.create({IBAN,billName,balance,ownerId})
    }
}