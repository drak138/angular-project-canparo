import cron from 'node-cron'
import {billService} from "./billService.js"; // Adjust the path as needed

// Schedule the task to run daily at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Executing recurring transactions...");
    try {
        await billService.executeRecurringTransactions();
        console.log("Recurring transactions processed successfully.");
    } catch (error) {
        console.error("Error executing recurring transactions:", error.message);
    }
});