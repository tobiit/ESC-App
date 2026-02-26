# escapp Design Tokens Builder

This project is the tooling infrastructure around the **A1** Design Tokens. It provides a sophisticated build pipeline, in order to produce multi-dimensional themes for multiple platforms and file formats. Most likely you are not here for the design-token-builder, but rather for [the actual A1 Design Tokens](https://github.developer.escapp.io/a1/design-tokens/tree/main/token-package)?!

## Project Scaffolding

This project consists of two NPM pckages. The root package is the `@escapp/a1-design-tokens-builder`, which generates the design tokens in different file formats, into the second NPM package, the `@escapp/a1-design-tokens`, which then contains the actual distributed design tokens. You can think of it as in the fashion of a monorepo, in which the root projects takes care of all the tooling and in our case also the generation of certain child package files.

### For informations of the actual distributed escapp Design Tokens, please refer to [the README of the token-package](https://github.developer.escapp.io/a1/design-tokens/tree/main/token-package).

### Design Tokens SSOT

The single source of truth (SSOT) of the design tokens can be found in the folder `tokens`. These tokens can not be used in software projects directly, because they first have to undergo several transformations, like i.e. resolution of token references, transformation of token value units and preparations of the token set compositions needed for the final token output files. The tooling and the build process is then generating the actual distributed files for the `token-package` with the design tokens in different file formats for all multi-dimensional theming dimensions.

#### Current Design Token SSOT Structure

```text
tokens
 ├── $metadata.json
 ├── $themes.json
 ├─> a1
 │   ├─> components
 │   │   └─> default
 │   │       ├── accordion.json
 │   │       ├── avatar.json
 │   │       ├── badge.json
 │   │       ├── breadcrumb.json
 │   │       ├── button.json
 │   │       ├── checkbox.json
 │   │       ├── divider.json
 │   │       ├── dropdown.json
 │   │       ├── form-field.json
 │   │       ├── icon.json
 │   │       ├── license-plate.json
 │   │       ├── list.json
 │   │       ├── modal.json
 │   │       ├── pagination.json
 │   │       ├── popover.json
 │   │       ├── price.json
 │   │       ├── radio-button.json
 │   │       ├── rating.json
 │   │       ├── segmented-control.json
 │   │       ├── switch.json
 │   │       ├── tab-m.json
 │   │       ├── tab.json
 │   │       ├── tag.json
 │   │       ├── tile.json
 │   │       ├── toggle-button.json
 │   │       └── tooltip.json
 │   ├─> core
 │   │   ├── colors.json
 │   │   ├── dimensions.json
 │   │   ├── grid.json
 │   │   ├── motion.json
 │   │   └── typography.json
 │   ├─> partials
 │   │   └─> default
 │   │       ├── indicator.json
 │   │       ├── info.json
 │   │       ├── input-field.json
 │   │       └── label.json
 │   ├─> semantic
 │   │   ├─> color-schemes
 │   │   │   ├── dark.json
 │   │   │   └── light.json
 │   │   ├─> combined
 │   │   │   └── composites.json
 │   │   ├─> densities
 │   │   │   ├── compact-l.json
 │   │   │   ├── compact-m.json
 │   │   │   ├── compact.json
 │   │   │   ├── dense-l.json
 │   │   │   ├── dense-m.json
 │   │   │   ├── dense.json
 │   │   │   ├── spacious-l.json
 │   │   │   ├── spacious-m.json
 │   │   │   └── spacious.json
 │   │   └─> motion
 │   │       ├── lively.json
 │   │       └── minimal.json
 │   └─> tools
 │       └─> figma
 │           └─> accent-color
 │               ├── aqua.json
 │               ├── blue.json
 │               ├── gray.json
 │               ├── green.json
 │               ├── orange.json
 │               ├── purple.json
 │               ├── red.json
 │               ├── teal.json
 │               └── yellow.json
 └─> ndbx
     ├─> core
     │   ├── colors.json
     │   └── typography.json
     └─> semantic
         ├─> color-schemes
         │   └── light.json
         └─> densities
             └── spacious.json
```

## Installing the Token NPM Package

Please refer to the description in [the README of the actual token-package](https://github.developer.escapp.io/a1/design-tokens/tree/main/token-package#npm).

## Running the Token Build

Following things need to be done, in order to run the build of the design tokens.

### Prerequisites

- Make sure to be on the right node version with the [node version manager](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html) by running `nvm use`.
- Run `npm ci` to install exact dependencies.

### Build

- Run `npm run build:local`. You should see a `token-package/dist/` and a `token-package/cdn/` folder, with the different output files and formats of the design tokens.
  - The `dist` folder will be used for the published NPM package and the `cdn` folder obviously for the CDN. Only difference between the NPM package and the CDN files are the file names, because we want to have the version in the filename for the CDN file, but not for the npm file, because this would mean unnecessary import path updates, when updating the token-package version in one's project.
- As a by-product the build script is generating intermediate JSON files under `build/by-product/prepared-tokens` of the design tokens, which sometimes are helpful for debugging purposes.
- Further the build folder contains the `build/design-token-builder` distribution files, which are the distributed files of the design-token-builder for its NPM package, which can be used by OEs that want to build on this design token infrastructure.

## Contribution

- Please use the [official Jira sprint board](https://jmp.escapp.net/secure/RapidBoard.jspa?rapidView=18554&view=planning.nodetail) for contributing issues.
- Please use the [official repository on the escapp Enterprise Github](https://github.developer.escapp.io/a1/design-tokens) for pull requests.

There are currently two active remote repositories. One [official repository on the escapp Enterprise Github](https://github.developer.escapp.io/a1/design-tokens) and a temporary private [proxy repository on the public Github.com](https://github.com/KaiserXLabs/a1-design-tokens), which is needed to get the [Token Studio for Figma Plugin](<https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma-(Figma-Tokens)>)'s GIT connection to work properly.

## License

[Copyright (c) 2026 escapp SE](LICENSE)
