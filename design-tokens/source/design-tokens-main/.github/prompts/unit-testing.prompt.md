---
mode: 'agent'
model: Claude Sonnet 4
tools: ['githubRepo', 'codebase']
description: 'Generate a new unit test file with a relating mock data file'
---

Write comprehensive Jest unit tests for all exported functions in the one open source file in the editor to achieve 100% code coverage across all metrics for it.

Requirements for the test:

- Place all mock data, mock return values, and type helpers in a separate `.mock.spec.ts` file, if it does not already exist.
- As we are dealing with a fully typed Typescript code base, please make use of all exisiting types, by investigating them, in order to come up with correct and realisitic mock data.
- Import the Jest testing function and necessary Jest types from @jest/globals.
- Place all actual test suites, tests with their assertions in a `.spec.ts` file, if it does not already exist, following the structure and conventions of existing tests (e.g., those in the given example unit test file, which should be very similar to what we need here).
- Ensure all edge cases and error branches are covered, and that the test and mock files are lint-clean and maintainable.
- Do not change the original implementation of the tested source files. Also check that the mock data files (.mock.spec.ts) also have 100% code coverage, which usually means, that there are no obsolete mock data variables in these files.
- Fix all linting errors, especially do not use an `any` type, by resolving data to their correct types (not by disabling lint rules).
- Running the tests and getting the code coverage results, can be done by `npm run test:unit`. Checking for formatting and linting issues, can be checked and partly automatically fixed by running `npm run lint:fix` and `npm run format:fix`.
