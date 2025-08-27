import { v7 as uuidv7 } from "uuid";
import type { Custom } from "vitest";

/**
 * Scenario:
 * Overview:
 *  - Create Customer Coin Wallet System
 *
 * Functional Requirement:
 *  - Can add new customer (set coin balance automatically with zero balance)
 *  - Have a function for Topup Coin Balance
 *  - Have a function for Deduct Coin Balance
 *  - Have a multiple Topup Method (Such as: Transfer, VA, Debit Card, Credit Card, etc)
 *
 * Non-Functional Requirement:
 *  - Built in OOP Principle
 *  - Reliable
 *  - Have a Good Maintainability (Good for Legacy)
 *
 * High Level Architecture:
 *  - Using Programming Language Support OOP Natively (Java, C#, TS)
 *  - Execute or Simulation Cases using unit testing (no need web server or endpoint to hit)
 *  - Well Implemented OOP and SOLID Principle (Encapsulation, Abstraction, Inheritance, Polymorph)
 */

// Abstraction and Encapsulation
export class Customer {
  private id: string; // Encapsulation
  private name: string;
  private email: string;
  customer_wallet = new Map<string, Wallet>();

  constructor(_name: string, _contact: string) {
    this.id = uuidv7();
    this.name = _name;
    this.email = _contact;
  }

  getCustomerName(): string {
    return this.name;
  }

  getCustomerEmail(): string {
    return this.email;
  }

  getWalletInfo(): number {
    return this.customer_wallet.get(this.id)?.getCurrentBalance() ?? 0;
  }

  topupCoinBalance(topupAmount: number): Wallet {
    let currentBalance = this.customer_wallet.get(this.id);
    if (!currentBalance) {
      // If Not Exists do initial Wallet
      currentBalance = new Wallet(this.id, 0);
    }

    //Start To process Topup The Balance
    const topupWallet = new Wallet(this.id, currentBalance.getCurrentBalance());
    topupWallet.addBalance(topupAmount);
    this.customer_wallet.set(this.id, topupWallet); //Override with a new balance

    return topupWallet;
  }

  deductCoinBalance(deductAmount: number): Wallet {
    let currentBalance = this.customer_wallet.get(this.id);
    if (!currentBalance) {
      // If Not Exists do initial Wallet
      currentBalance = new Wallet(this.id, 0);
    }

    //Validate if Deduction Amount is Greather than Current balance
    if (deductAmount > currentBalance.getCurrentBalance()) {
      throw Error("Insufficient Balance to Deduct");
    }

    //Start To process Topup The Balance
    const deductWallet = new Wallet(
      this.id,
      currentBalance.getCurrentBalance()
    );
    deductWallet.deductBalance(deductAmount);
    this.customer_wallet.set(this.id, deductWallet); //Override with a new balance

    return deductWallet;
  }
}

// Encapsulation Wallet and WalletTransactions Class
class Wallet {
  private customer_id: string;
  private balance: number;

  constructor(cust_id: string, amount?: number) {
    this.customer_id = cust_id;
    this.balance = amount ?? 0;
  }

  getCurrentBalance(): number {
    return this.balance;
  }

  addBalance(amount: number): number {
    this.balance += amount;
    return this.balance;
  }

  deductBalance(amount: number): number {
    this.balance -= amount;
    return this.balance;
  }
}
