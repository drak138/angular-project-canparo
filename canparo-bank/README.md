# CanparoBank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

1.npm install in backend

2.setup account in SendGrid

3.create a API key and save it for later

create a .env file and create a SENDGRID_API_KEY="your SendGrid API key"
5.run back-end with server with npm test in backend

6.npm install in canparo-bank

7.run front-end server with ng serve in canparo-bank

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

15.User can delete the bill from the balance tab

16.When user creates card he can make it debit or credit this has no effect on the site but it will show different depending on if it is visa or mastercard

17.When card is created he will be send an email with the card pin since it will be hashed in the back end.

18.If the bill the card was created on is deleted the card is deleted with is as well.

19.User can update card information and also delete the card if he wants to.

20.In my profile user can check all info about his profile(username,email,bills he has on his name, cards he has on his name, he can delete his account change his password,or loggout.)

21.Every user will automaticaly be logged out after 1 hour in which case his cookies will be deleted and he is requred to login again.
