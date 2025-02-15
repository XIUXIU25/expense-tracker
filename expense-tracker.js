#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const DATA_FILE = path.join(__dirname, 'expenses.json');

// Load expenses from JSON
function loadExpenses() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Save expenses to JSON
function saveExpenses(expenses) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// Add an expense
program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <description>', 'Description of expense')
    .requiredOption('--amount <amount>', 'Amount spent', parseFloat)
    .action((options) => {
        if (options.amount <= 0) {
            console.error('Amount must be positive.');
            process.exit(1);
        }

        const expenses = loadExpenses();
        const newExpense = {
            id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
            date: new Date().toISOString().split('T')[0],
            description: options.description,
            amount: options.amount
        };

        expenses.push(newExpense);
        saveExpenses(expenses);

        console.log(`Expense added successfully (ID: ${newExpense.id})`);
    });

// List all expenses
program
    .command('list')
    .description('List all expenses')
    .action(() => {
        const expenses = loadExpenses();
        console.log('ID   Date        Description    Amount');
        console.log('------------------------------------');
        expenses.forEach(exp => {
            console.log(`${exp.id}    ${exp.date}   ${exp.description}    $${exp.amount}`);
        });
    });

// Delete an expense
program
    .command('delete')
    .description('Delete an expense by ID')
    .requiredOption('--id <id>', 'Expense ID to delete', parseInt)
    .action((options) => {
        let expenses = loadExpenses();
        const initialLength = expenses.length;
        expenses = expenses.filter(exp => exp.id !== options.id);

        if (expenses.length === initialLength) {
            console.error('Expense ID not found.');
            process.exit(1);
        }

        saveExpenses(expenses);
        console.log(`Expense deleted successfully`);
    });

// View total expenses summary
program
    .command('summary')
    .description('View total expenses')
    .option('--month <month>', 'View summary for a specific month (1-12)', parseInt)
    .action((options) => {
        const expenses = loadExpenses();
        let filteredExpenses = expenses;

        if (options.month) {
            const year = new Date().getFullYear();
            filteredExpenses = expenses.filter(exp => {
                const [expYear, expMonth] = exp.date.split('-').map(Number);
                return expYear === year && expMonth === options.month;
            });
        }

        const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        console.log(`Total expenses${options.month ? ` for month ${options.month}` : ''}: $${total}`);
    });

// Parse user commands
program.parse(process.argv);
