# GitHub Copilot Custom Instructions

## Project Overview

This repository contains a fully typed TypeScript codebase, which represents a design token build pipeline. The codebase includes various transforms and configurations for design tokens, mainly on the base of Style-Dictionary and particularly focusing on web and mobile platforms.

### Build Artefacts

The project can be built by running the command `npm run build:local`. The build process generates the following artefacts:

- `token-package/cdn/`: optimized design token assets for run-time usage over the CDN.
- `token-package/dist/`: design token asset files for the NPM package of the design tokens for build-time development usage.

Testing the outcome of code changes should ideally be investigated in the `token-package/dist/` folder, as it represents the raw and not minified design tokens asset files.

## General Coding Styleguide

- Act as a senior Typescript developer, who loves clean code and good software craftmanship, who takes the advices from Uncle Bob aka Robert C. Martin very seriously.
- Creating meaningful separated helper functions within the same file.
- Make sure to only use JS const functionName = arrow functions.
- Try to avoid comments where ever possible, because they are regarded as technical debt and insist on having very meaningful variable names. Therefore rather introduce a few more variables, which later on are also much easier to debug, because there are more possibilities to set a breakpoint.
- Stick to all eslint and prettier formatting rules and explicitly set all Typscript types of all these new private helper functions

## Testing Guidelines

The goal is to achieve 100% code coverage for all exported functions using Jest unit tests.

### General Testing Instructions

- Write comprehensive Jest unit tests for all exported functions.
- Ensure 100% code coverage across all metrics for both the test files and mock data files.
- Cover all edge cases and error branches in your tests.
- Do not modify the original implementation of the source files.
- Import the Jest testing functions and necessary Jest types from `@jest/globals`.

### Test File Structure

- Place all mock data, mock return values, and type helpers in a separate `.mock.spec.ts` file, if it does not already exist.
- Place all test suites and tests with assertions in a `.spec.ts` file, if it does not already exist.
- Follow the structure and conventions of existing tests in the codebase (e.g., those in exisiting unit test files).
- Ensure that mock data files (`.mock.spec.ts`) also have 100% code coverage, which usually means that there are no obsolete mock data variables in these files.

### TypeScript and Mock Data

- Use existing TypeScript types to create realistic mock data.
- As we are dealing with a fully typed TypeScript codebase, please make use of all existing types, by investigating them, in order to come up with correct and realistic mock data.
- Ensure mock data files are free from obsolete mock data variables and achieve 100% code coverage.

### Linting and Code Quality

- Ensure test and mock files are lint-clean and maintainable.
- Fix all linting errors, especially avoid using the `any` type. Resolve data to their correct types instead of disabling lint rules.

## Commands for Testing and Linting

- Run tests and get code coverage results using: `npm run test:unit`.
- Check for formatting and linting issues, and automatically fix them using: `npm run lint:fix` and `npm run format:fix`.

## Additional Notes

- Maintain consistency and readability in test files.
- Regularly give feedback on the instruction file and propose improvements to the instructions as the codebase evolves.
