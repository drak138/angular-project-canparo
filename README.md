1.npm install in backend

2.create a .env file and create a SENDGRID_API_KEY="your SendGrid API key"

3.setup account in SendGrid

4.create a API key and place it in SENDGRID_API_KEY

//NOTE if when running the backend can't connect to the server that is due to change in node.js change from localhost to 0.0.0.0
5. Start your MongoDb and mongosh

6.run back-end with server with npm test in backend

7.npm install in canparo-bank

8.run front-end server with ng serve in canparo-bank

// front-end functunality

User can access contacts,about,partners without registration if he tries to access other parts he is redirected to login

Once registered user has basic functionality to check his profile but unless he has a bill he is resticted. If user tries to enter a page where a bill is required

he is redirected to create one where he can choose if he want's to create a card. If he does he is redirected to create one. Once created user is free to all functionality of the site.

Logged in user can't access login or register page and is instead redirected to home.

User with a bill can make transfers to other users if their bill and user name is correct. The last 20 transfers are saved in the user bill history.

A user can make an automatic payment that is payed every month to a desired user with a desired amount he can delete that reacurringTransaction any time.

Once a transaction is made it will be shown in the user transfer history.

If the reciever IBAN suddenly dissapears the reacurringTransaction is canceled and is deleted from the user bill (in the app i have reversed the logic so instead of the transaction

being lower

than current date i have made it higher for test purposes in backend file cronJobs.js change cron.schedule from ("0 0 * * ") to ("/1 * * * *") so the transaction happens every minute)

16.User can delete the bill from the balance tab

17.When user creates card he can make it debit or credit this has no effect on the site but it will show different depending on if it is visa or mastercard

18.When card is created he will be send an email with the card pin since it will be hashed in the back end.

19.If the bill the card was created on is deleted the card is deleted with is as well.

20.User can update card information and also delete the card if he wants to.

21.In my profile user can check all info about his profile(username,email,bills he has on his name, cards he has on his name, he can delete his account change his password,or loggout.)

22.Every user will automaticaly be logged out after 1 hour in which case his cookies will be deleted and he is requred to login again.