import { toArray, toReduceDefined } from "../../src/utils";
import { Dev } from "../ref/Dev";

describe("toArray", () => {

  test("from nothing", () => {
    expect(toArray()).toHaveLength(0);
  });

  test("from undefined", () => {
    expect(toArray(undefined)).toHaveLength(0);
  });

  test("from null", () => {
    expect(toArray(null)).toHaveLength(0);
  });

  test("from single item", () => {
    expect(toArray(Dev.Sander)).toHaveLength(1);
  });

  test("from two items", () => {
    expect(toArray(Dev.Sander, Dev.Jeroen)).toHaveLength(2);
  });

  test("from array of two items", () => {
    expect(toArray([Dev.Sander, Dev.Jeroen])).toHaveLength(2);
  });

  test("from spread of two items", () => {
    const spread = [Dev.Sander, Dev.Jeroen];
    expect(toArray(...spread)).toHaveLength(2);
  });
});

describe("toReduce", () => {
  test("Reduces", () => {
    const names = ["Sander", "Jeroen", "Wouter", "Naoufal", "Bas"];
    const n2 = names.reduce((ns, n) => toReduceDefined(ns, n.includes("a"), n), []);
    expect(n2.length).toBe(3);
  })
});