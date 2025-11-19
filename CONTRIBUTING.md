# Contributing

Welcome, and thanks for your interest in contributing! Please take a moment to
review the following:

## Style Guide

- Commits follow the ["Conventional Commits" specification](https://www.conventionalcommits.org/en/v1.0.0/). This allows for changelogs to be generated automatically upon release.
- Code is formatted via [Prettier](https://prettier.io/)
- JavaScript is written as [TypeScript](https://www.typescriptlang.org/) where possible.

## Getting Started

### Setup

1. [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) and clone to your machine.
2. Create a new branch with your contribution.
3. Install [pnpm](https://pnpm.io/) on your machine.
4. In the repo, install dependencies via:
   ```bash
   pnpm install
   ```
5. Voilà, you're ready to go!

### Scripts

- `pnpm build` – production build
- `pnpm dev` – development build with watch mode
- `pnpm test` – runs tests
- `pnpm test:watch` – runs tests in watch mode
- `pnpm test:coverage` – runs tests with coverage report
- `pnpm typecheck` – type checks
- `pnpm lint` – runs eslint
- `pnpm lint:fix` – runs eslint and fixes issues
- `pnpm format` – formats code with prettier
- `pnpm format:check` – checks code formatting

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `docs`: all changes regarding documentation
- `chore`: all changes to the repository that do not fit into any of the above categories

e.g. `feat(component): add new blur animation to ambient light`

If you are interested in the detailed specification you can visit [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/) or check out the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Testing

Before submitting a pull request, please make sure:

1. All tests pass: `pnpm test`
2. Code is properly formatted: `pnpm format:check`
3. No linting errors: `pnpm lint`
4. Type checking passes: `pnpm typecheck`

Or simply run the pre-publish checks:

```bash
pnpm prepublishOnly
```

## Pull Request Process

1. Update the README.md with details of changes if applicable.
2. Update tests if you're adding new features or fixing bugs.
3. Ensure all tests and checks pass.
4. The PR will be merged once you have the sign-off of the maintainers.

## Releases

Releases are managed by the project maintainer using [standard-version](https://github.com/conventional-changelog/standard-version) which automatically generates the changelog based on conventional commits.
