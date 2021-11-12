const noPunctuation = require("./noPunctuation");

test("replace Punctuation to space", () => {
  expect(noPunctuation(`hello%world`)).toBe(`hello world`);
});

test("replace Punctuation to space", () => {
  expect(noPunctuation(`!hello world`)).toBe(` hello world`);
});

test("replace Punctuation to space", () => {
  expect(noPunctuation(`;hello?world!`)).toBe(` hello world `);
});

test("replace Punctuation to space", () => {
  expect(noPunctuation(`hello;world`)).toBe(`hello world`);
});

test("replace Punctuation to space", () => {
  expect(noPunctuation(`hello world?`)).toBe(`hello world `);
});
