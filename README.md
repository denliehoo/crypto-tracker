# crypto tracker project

This project aims to help people track their cryptocurrency portfolio. <br />
This is a full-stack MERN project written in TypeScript.

# Todo Log
**Work on form validation**

**Do a landing page**

**Use MongoDB realm for user authentication instead of firebase** <br />
Rationale being that I don't want to have 2 separate databases

**Refactor Code** 

# Change Log

**30 Aug 2021 - Added charts & form validation**<br />
Installed chart.js and used it in the overview page <br />
Started on form validation for new transactions to ensure that the asset is within the array of tickers <br />
Need to work more on the validation + do validation for edit page

**30 Aug 2021 - Debugged to clear errors in console**<br />

**26 Aug 2021 - Changed to CoinGecko API for Overview Page**<br />

**26 Aug 2021 - Changed to CoinGecko API for AllTransactions Page**<br />
Changed the API to coingecko api for all transactions page. <br />
Moving on to change API to coingecko for Overview page also. 

**24 Aug 2021 - Made a Market Prices page** <br />
Made a market prices page, alone with a MarketDataItem Component. <br />
Still need to work on styling for the page <br />
Moving on to changing the fetching API to coingecko instead of cryptonator <br />


**23 Aug 2021 - Updated OverviewPage & added new component CollatedTransactionItem** <br />
Added a new component called CollatedTransactionItem which is used in OverviewPage <br />
However, still need to add charts (probably using chart.js)

**19 Aug 2021 - Added .env for client** <br />
Added a .env file which contains the firebase this in the client file
Also started using the README.md file
Updated the .gitignore file to exclude the .env file for client folder

**19 Aug 2021 - Passed props through Link Component for Edit Page** <br />
Was previously passing the details through the url for the edit page. Changed it to pass through with props

**18 Aug 2021 - First commit**

# Installation & Instructions

**1. Download files**

**2. cd server and npm install**

**3. cd client and npm install**

**4. Within the server directory, create a nodemon.json folder in the following format:** <br />
{
"env": {
"MONGO_USER": "yourUserName",
"MONGO_PASSWORD": "yourPassword",
"MONGO_DB": "cryptotracker"
}
}
<br />
\*Note: change user and password accordingly to you MongoDB atlas account

**5. Within the client directory, create a .env file in the following format:**<br />
REACT_APP_FIREBASE_KEY= yourFirebaseKey

\*Note: change user and password accordingly to you Firebase Account

**6. npm start (on both client and server)**
