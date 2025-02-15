Expense Tracker CLI

A simple Command Line Interface (CLI) Expense Tracker built with Node.js and JSON storage. This application allows users to add, delete, update, and view expenses, along with summary reports.

🚀 Features

Add an expense with a description and amount.

List all recorded expenses.

Delete an expense by ID.

View a summary of total expenses.

View a monthly summary of expenses.

Export expenses to a CSV file.

🛠 Installation

1️⃣ Clone the Repository
```sh
git clone git@github.com:XIUXIU25/expense-tracker.git
cd expense-tracker
```

2️⃣ Install Dependencies

```sh
npm install
```

3️⃣ Make the Script Executable

```sh
chmod +x expense-tracker.js
```

4️⃣ Link the CLI Globally (Optional)

```sh
sudo npm link
```

Now, you can use expense-tracker as a global command.

📌 Usage

1️⃣ Add an Expense

```sh
expense-tracker add --description "Lunch" --amount 15
```

Output:

Expense added successfully (ID: 1)

2️⃣ List All Expenses

```sh
expense-tracker list
```

Output:

ID   Date       Description  Amount
1    2024-02-15 Lunch        $15

3️⃣ Delete an Expense

```sh
expense-tracker delete --id 1
```

Output:

Expense deleted successfully

4️⃣ View Summary

```sh
expense-tracker summary
```

Output:

Total expenses: $15

5️⃣ View Summary for a Specific Month

```sh
expense-tracker summary --month 2
```

Output:

Total expenses for February: $15

6️⃣ Export to CSV

```sh
expense-tracker export
```

Output:

Expenses exported to expenses.csv

📂 Data Storage

The expenses are stored in a simple JSON file named expenses.json.
Example format:

[
  {
    "id": 1,
    "date": "2024-02-15",
    "description": "Lunch",
    "amount": 15
  }
]

🛠 Built With

Node.js – for command-line execution.

Commander.js – for handling CLI commands.

JSON file storage – for persisting expenses.

📜 License

This project is licensed under the MIT License.

🤝 Contributing

If you find a bug or want to improve the application, feel free to fork the repo and submit a pull request.

git clone git@github.com:XIUXIU25/expense-tracker.git
cd expense-tracker
git checkout -b feature-branch
# Make changes
git commit -m "Added new feature"
git push origin feature-branch

Then create a Pull Request! 🚀

📬 Contact

📧 Email: xiuxiu@example.com
💻 GitHub: XIUXIU25
