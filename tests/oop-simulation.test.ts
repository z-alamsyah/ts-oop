import { describe, expect, it } from "vitest";
import { Customer } from "../src/oop-simulation.js";

describe("Test for simulation oop - Wallet System", () => {
  it("Coin Balance Should be zero", () => {
    const customer1 = new Customer("Andre", "andre@gmail.com");
    const result = customer1.getWalletInfo();
    expect(result).toEqual(0);
  });

  it("Coin Balance Should be Successfull Topup (10 Coin)", () => {
    const customer1 = new Customer("Andre", "andre@gmail.com");
    customer1.topupCoinBalance(10);
    const result = customer1.getWalletInfo();
    expect(result).toEqual(10);
  });

  it("Coin Balance Should be Successfull Topup (10 Coin) And Deduct (5 Coin)", () => {
    const customer1 = new Customer("Andre", "andre@gmail.com");
    customer1.topupCoinBalance(10);
    customer1.deductCoinBalance(5);
    const result = customer1.getWalletInfo();
    expect(result).toEqual(5);
  });

  it("Coin Balance Should be Failed to Deduct, Insufficient balance", () => {
    const customer1 = new Customer("Andre", "andre@gmail.com");
    try {
      customer1.deductCoinBalance(5);
    } catch (err) {
      expect(err).toEqual(new Error("Insufficient Balance to Deduct"));
    }
  });
});
