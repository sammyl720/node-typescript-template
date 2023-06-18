import { getGreetingMessage } from '../src/util';

test("Should return the correct greeting", () => {
  const greeting = getGreetingMessage("John");
  expect(greeting).toBe("Hello John!");
})