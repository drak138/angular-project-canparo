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
            IBAN=this.generateRandomIBAN()
        }
        return await userBill.create({IBAN,billName,balance,ownerId})
    },
  async checkReciver(reciverName,IBAN) {
    const reciverIBAN=await userBill.findOne({IBAN})
    if(reciverIBAN==null){
      return {error:"no such reciever"}
    }
    const ownerInfo=(await reciverIBAN.populate("ownerId")).ownerId
    const ownerName=`${ownerInfo.firstName} ${ownerInfo.lastName}`
    if(ownerName!==reciverName){
      return {error:"no such reciever"}
    }
    else return false
  },
  async transfer(biller,IBAN,amount,reason,more){
    const sender= (await ((await userBill.findOne({IBAN:biller.IBAN})).populate("ownerId"))).ownerId
    const today = new Date();
    const transferDate = today.toISOString().split('T')[0];
    const senderData={
      name:`${sender.firstName} ${sender.lastName}`,
      reason,
      more,
      transferDate,
      amount,
      IBAN:biller.IBAN,
      transferType:'incoming'
    }
    const reciever=(await ((await userBill.findOne({IBAN})).populate("ownerId"))).ownerId
    const recieverData={
      name:`${reciever.firstName} ${reciever.lastName}`,
      reason,
      more,
      transferDate,
      amount,
      IBAN,
      transferType:'outgoing'
    }
    await userBill.findOneAndUpdate({IBAN},{$inc:{balance:amount},$push:{transferHistory:{$each: [senderData],$slice: -20}}})
    await userBill.findOneAndUpdate({IBAN:biller.IBAN},{$inc:{balance:-amount},$push:{transferHistory:{$each: [recieverData],$slice: -20}}})
    return "transfer successful"
  },
  async getHistory(filter,IBAN){
    let history=(await userBill.findOne({IBAN})).transferHistory
    if(filter=="All"){
      return history
    }
    else {
      history=history.filter((el)=>el.transferType===filter)
      return history
    }
  }
}