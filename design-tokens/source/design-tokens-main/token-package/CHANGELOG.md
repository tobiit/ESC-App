# Token Changelog
All changes to the single source of truth (SSOT) A1 design token set will be documented in this file. For changes of the token builder (@allianz/a1-design-token-builder) a changelog can be found [here](https://github.developer.allianz.io/a1/design-tokens/blob/main/CHANGELOG.md).
## [1.3.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v1.2.0...tokens-v1.3.0) (2026-02-09)


### Features

* added interactive media concept ([655c5e2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/655c5e28c46aaa693aad4529c83aea11d67420c4))
* introduce a1 meta info extension with specialised A1 token types [A1-1073] ([b21c84f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b21c84fe59a5b61dc7a0ce5ee9d1ea0c765c36b7))


### Bug Fixes

* reworked smaller responsive and linear-responsive sizes to be dynamic instead of static ([cf5680f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cf5680f7484284d67fc98b1c5cdba91d2680a627))

## [1.2.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v1.1.0...tokens-v1.2.0) (2025-12-17)


### Features

* added background subtle color ([68ead02](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/68ead0243a255e3d2dbe9f3a05b05980d1f6761f))
* added content and portal grid to semantic layer ([f18932f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f18932f0e276fe0eada82d422fdcabd89a19a277))
* added interactive on-brand color states ([688267d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/688267d4df18b5b3693b811e05c78c8e5106568c))
* added selection subtle color category (for product tiles) ([54b7c8d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/54b7c8d2bb91c11385960f57f786cda0c015df0c))
* added semantic grid inset ([805f267](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/805f267c2f27fb2cbc083617b1b7c26bd673c890))
* added vertical layout to price component ([44041f0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/44041f0e4b29ede7107764c65faa6b63b43c48dc))
* aligned background subtle and selection subtle tokens ([d30c0c2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d30c0c218898d84a6e626c12e469ddbf45d0205b))
* changed value of background subtle and added dark mode tokens ([237d0ae](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/237d0aeedd792d3daec65b3e240beb13ec4b3af9))


### Bug Fixes

* aligned ndbx theme backdrop token name to the main theme token name ([5bef398](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5bef39837b5507059f12b7b62e7e5b4824113452))
* info-i size ([64a9512](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/64a9512a0dae026b6df529f54bd371b1abae0ea4))
* renamed text breakpoint tokens to name to prevent type conflicts with text composites ([f5e5b64](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f5e5b64188176f9629fabc9334bd2f869cc9e9ab))
* semantic.gap.horizontal.grid.content name missed characteristic ([6fdf51a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6fdf51a3481d5d42ccdfb8ee3b3ade6547c07779))
* value for portal grid gap token in breakpoint xs-s ([a263c0a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a263c0a4a1daa4220c7007715d05b1b90a0811c4))

## [1.1.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v1.0.0...tokens-v1.1.0) (2025-11-18)


### Features

* **migrator:** add comment column to migration mapping files for future additional migration background infos ([eea49f5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/eea49f50319124d7ae8176eb487a3874a5a0914d))


### Bug Fixes

* delete wrong design token migrations from latest migration-mapping file ([057e4c0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/057e4c088671c859b3dca02d2d3506d1144a6003))
* provide easier mixin imports via general design-token mixin [A1-1088] ([cf81932](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cf8193220eead4be8c1e7859f34c1558227da197))
* SCSS mixin output files renamed back to distinct file name [A1-1088] ([8692566](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/86925662b05eb17cf63db79d3aa0a15d58ac0be7))


### Documentation

* fix and update a few minor things in the token-package README ([2d59afe](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2d59afeaf53328cfbc4b6f7a3544fc28ca283d48))

## [1.0.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.8.1...tokens-v1.0.0) (2025-10-29)

### ⚠ BREAKING CHANGES

* renamed design system name interims name azds back to a1 in SSOT
* deleted tokens (border position and text max width) not in use or needed for the release
* support multiple design systems per brand [A1-1062]
* changed shadow.core and shadow.cast color and spacing naming to shadow.first and shadow.second naming
* changed brand.primary color naming to brand.default color naming to improve AI understanding
* gap, stack & distance name and type correction
* elevation and shadow name and type corrections
* type-corrected motion tokens
* remove min-/max-height from components to cater for all use cases (fixed and min/max situations)
* change semantic naming of horizontal to vertical and vice versa for tile component
* removed semantic list tokens to be replaced with new between tokens for a more general application
* clean up token naming schema deviations in various token names
* new surface spacing concept complementing content and component spacing
* de-scoped user-agent font size and moved it to internal since it is only needed in tools like Figma
* de-scoped break-point max-width tokens and moved them to internal since they are only used in tools like Figma
* renamed core grid spacing tokens according to our naming scheme
* removed label tokens from semantic layer
* moved (renamed) icon adjustment tokens into the new appropriate content spacing group and speficied description
* due to indicator refactoring (dependency to component sizes), the text style "indication" is not longer needed
* removed existing indicator sizing, spacing & typography
* removed semantic content sizes l, xl and 2xl which are now replaced by component sizes
* deleted dynamic spacing which is currently not in use and replaced by linear dimension spacing for densities

### Features

* add additional host selector to default CSS output files [A1-1023] ([67718e0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/67718e0577b9027a144b1491d2ae3b4828c04a3f))
* added "between" semantic tokens (a more general term for tokens that can be used for gap + stack -> non-directional). ([a497568](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a4975683c03fe957c0e3a70b7d2cbb46a9653423))
* added a set of surface and distance tokens that are linear (density-based) only ([1530acf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1530acf2a58f0515edc56b5a9cc40dece5f3b3b9))
* added badge height token ([90282b8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/90282b8d172239ae8a1733e42d67fb2728a14423))
* added breadcrumb and tooltip component ([b28704d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b28704d5ddc12c62577178628964ea7cf41ef49b))
* added descriptions for the focus border radius tokens ([4220755](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/422075567dff771f02bcc2455affa9c30760ce1a))
* added descriptions to header spacing tokens for accordion ([9e165a8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9e165a87250cf117e478ca8ea2f476f271ee829f))
* added Figma-specific variable accent color theming option ([6cb7aa0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6cb7aa018ff409792e12ffdd51e42a1146a9162c))
* added first draft of pagination tokens ([e117df8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e117df86561ac65eae9d47312cc59b058fc41f82))
* added headline eyebrow typographic style ([6633fb4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6633fb4c3fb2d5e5a3ffbb6fc9ca064063f2e031))
* added missing size tokens for avatar ([6e14483](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6e144834ac155929cd7922f64aa3b4e94510241b))
* added optical icon adjustment to input field partial (for inputs, e.g. dropdown, or with action on the right, e.g. datepicker) ([7c14fdb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7c14fdb7aa1f476b79bdbd025642533576837558))
* added pointer tokens to popover ([03a3dc6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/03a3dc6ce3f8b57885827e68e92b2d1007543ce6))
* added popover component ([5c5bdca](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5c5bdca6bb0f5cf80a50bf928770c2c74e11ae16))
* added price component and label partial to themes ([73ade72](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/73ade72dab91980f150d451a6a84f8723810e05a))
* added rating component ([66eca7a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/66eca7a0015511e5cd9c1d3fa834daa39ac783c7))
* added semantic border radius none ([051fe63](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/051fe636405642a48fef5d5bbada7c9f583d6d32))
* added the component systematic scale parameters ([c7a0947](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c7a09475f79b1cd3f99f59a17254441ee5200947))
* added tooltip tokens ([160f24d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/160f24d308b61b0af1916e0a9c869eae6552b1be))
* added utility size (and with that the related component size) L ([86538bf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/86538bf22af98a52e4153ea50e08e1c0b9456ff6))
* added vertical and horizontal inset concepts for components that are either square (e.g. Input) or squish (e.g. Button, Tag) ([14794e7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/14794e7fb1701241d3c078d25a00dbccef2d2b5f))
* added x-height and cap-height font core tokens ([f556b12](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f556b124e4bba0ee317c0072fb0ff3be62ce3897))
* changed brand.primary color naming to brand.default color naming to improve AI understanding ([7d25e00](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7d25e00811e6eb5274c4df99deec9df0a93bf906))
* changed shadow.core and shadow.cast color and spacing naming to shadow.first and shadow.second naming ([56ed49e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/56ed49e937395fbeb71c7d0256b74f7ef743e18d))
* completed utility text size l with adding action composite text typography size l ([0ca87c0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0ca87c00221d565ff1a822e210af058b20707b2c))
* continue working on indicator sizing and count typography definition ([d5c703a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d5c703a5a1d3e4fd6b726a8b7b517aae78bf4009))
* deleted tokens (border position and text max width) not in use or needed for the release ([c638d6d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c638d6da8cb761f88408831f24e2d3f0d6b4c117))
* **experimental:** add first draft of inverse theme ([892582f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/892582f9e02d8fd6aea96ac886b0910b550c0459))
* **experimental:** add inverse theming ([ceabc61](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ceabc61e97b9bc64737c94412f5bca8af46214b8))
* **experimental:** added a working draft of a NDBX brand theme ([d945109](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d94510978d1d193a1134b444219a720375ba4d52))
* **experimental:** added NDBX color and brand structure ([0e4daf2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0e4daf2cfd8fa3d9f051b726706409e5eeb4cd33))
* **experimental:** added NDBX font weight specifics ([67a34f9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/67a34f973f306030e53d2bf68049692d22e08706))
* **experimental:** changed warning color mapping for NDBX theme since they are not accessible ([4d9a292](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4d9a292939f4960ce3aca61b39ff835b73eabf46))
* **experimental:** finished first draft of adapting the semantic colors for NDBX theme ([b3f5b75](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b3f5b75dbdc7ea441b50289a94c2c9205fd57fa4))
* **experimental:** finished first draft of adapting the semantic spacing for NDBX theme ([1955d91](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1955d917d7458af998c1c0b52dd64b41dc69e8d1))
* **experimental:** fixing things for semantic colors for NDBX theme ([b4e543b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b4e543b2daefe133473a76b01c99c52f819753f6))
* **experimental:** further theming refinement for NDBX ([69e570e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/69e570edcdc6d6fa8b3f812ad44bc4f7819db5ad))
* **experimental:** transformed NDBX token names to lowercase ([5193ca9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5193ca94ddc1029dde67c9fc3354101ad2633914))
* final editing on price component ([edf0321](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/edf03216f04fd62ede0bd74a9f5b6bf8c8dd1946))
* finished modal token definition ([897469e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/897469e08b541d0d65b6ba7e43dacfe81316c0b0))
* finished pagination tokens ([4585652](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4585652005d19a450d15c26410b0dcb08692efb4))
* finished popover tokenization ([47398b3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/47398b36f6f828e32961ccc3f3ec23d38a9056a1))
* further work on the price, including definitions for the affix (prefix and postfix) ([d0f6682](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d0f66829bfcd8d45e052737db03be359c2fe48c1))
* harmonise and align popover and tooltip tokens ([d58f510](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d58f510c05b58d99d4e69afaae783173457c65c0))
* new price component with compact price display option [A1-1022] ([674b544](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/674b5449ad1d5342263059873462747bbb929bf7))
* new surface spacing concept complementing content and component spacing ([b2f8305](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b2f83054ca35208cf9727bee8cfb4f738fb37ea4))
* provide design tokens SCSS file with mixin of CSS variables and media queries [A1-1023] ([88c969e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/88c969e17d1566a3b25571043f8be5ff8d8f9587))
* provide rem based font-size, line-height and letter-spacing design token values [A1-772] ([272ff66](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/272ff6642f7bc137f62a2697020259f43ba65e04))
* referenced level 300 tokens for level 100 and 200 dark mode elevated surface colors ([cbcec4a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cbcec4a3773757625c63b0993677291894e02ed3))
* renamed component sizes to the naming schema of other semantic dimension tokens ([7c6bfa6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7c6bfa6971d23c3d17fd89d5d4e95b08423334db))
* reworked brand color in dark mode ([15b7ba9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/15b7ba97448081813d94a72a082ce77c0404f11e))
* reworked the scales and values of the semantic between tokens to reflect all circumstances for layout ([294bdcb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/294bdcb9e74de9ab3c206eb57813152b708b2d18))
* updated component sized with systematic sizing and updated the description ([5e0635f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5e0635f731ae417ce8b0ca683154e9e95bc45dab))
* updated the indicator inset with a more precise calculation ([9eb3a50](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9eb3a501a93a046d4fc29888b314c95f55d1d82a))


### Bug Fixes

* 3 digit hex color normalised to 6 digits ([877fb4c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/877fb4c200407db6dda849da8e7a4be6cc0b6812))
* added missing spacing options for semantic content s ([24c616a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/24c616a0766edaf946be2bc84b6ac7c685e5075f))
* added shadow base token color description to dark mode ([f1c17f6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f1c17f6f3008efce8a1f8efcbf0e280c68cdeb21))
* aligned color mask tokens to naming scheme from left right to start end ([759f0d4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/759f0d4561d4d4d393b68f3612ed1f49d07bb901))
* avatar l text style, had line height m ([5093068](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5093068c387a9c19a7bfab1b1a95734887e06c37))
* border and action color appearance in dark mode ([6477b25](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6477b2561107248e6171d65c351caaa886e0a8d3))
* clean up token naming schema deviations in various token names ([9b0fbb0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9b0fbb0956fcab7baa6ca3c9a99f19c6131fd16b))
* correction of misspelled internal "treshhold" tokens to "treshold" ([ab9e2ba](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ab9e2ba616689667c9be9d037a2ec3fd41f43084))
* disabled and backdrop color values ([64e70e2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/64e70e2e5f04a0489d79cadb37e90312aaf20e00))
* **experimental:** delete leftover from NDBX theme (font weight light) ([1a40fb8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1a40fb88385ed5c69824d0d62da13b16364e1a48))
* fixed brand dark colors ([3fccd87](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3fccd87a09627d27a63cfd2f790e37e1d2541c3b))
* gap all linear-responsive 600, 400, 300 breakpoint xs-s and m calculation factor ([63d0387](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/63d03877a6c04912853fc586794a765d98aa9fa9))
* internal sizing factor for small indicator sizes ([d1944e4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d1944e4be51c748bfaa773d739e84bc83f88e5ff))
* prevent wrong core.inset.horizontal.grid inset shorthand extraction ([23bbcb0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/23bbcb02c59c5a96678326b3065be4ce245d3cf1))
* re-add semantic dynamic spacing tokens ([710abf8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/710abf820c625b2dc7a4b89ccc3bd0e12d18440c))
* reference in headline line height 6xl calculation was referring to line height 5xl ([27b6139](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/27b613910f36bb1711cf8befd1f1f3aae9737457))
* remove falsely exposed internal tokens in JS output asset files ([2d05533](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2d05533445d363f24b2893f505ee238ae8666c8e))
* removed label tokens from semantic layer ([c108352](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c108352be16f8c4357d524e3d80b0816f50ba8d7))
* replaced core with semantic tokens in distance and surface semantic tokens ([4df2307](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4df2307fab93e8bb27584669f3505753ee7cca7a))
* reworked linear scale for distance tokens ([1f88b70](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1f88b7068adbded591b754b251597285b00ea49b))
* semantic.inset.vertical.m.component.1400 had wrong calculation base token ([8f7ec53](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8f7ec53b58886b188db3e0b56dc62e4e248200f8))
* split input-field icon adjustment inset in start and end instead of just horizontal ([8b3e59c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8b3e59ce5e7bb22c0177b397306100a3fde6e2d8))
* tertiary border appearance in dark ([82fe1e6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/82fe1e696e17fe821a952bbfcfce209db2ff4599))
* update semantic.color.surface.default-inverse.disabled color value ([7c6417d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7c6417d0de48b6353b7274a0bdc5baeeb080b7bd))
* update to latest token types of DTCG and Tokens Studio [A1-932] ([94ce7b9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/94ce7b9dff2d5224f45fb5e79b424fadbb90649f))
* updated dark mode elevation surface color factor ([fa5a441](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fa5a4414e37bca8965adbd1e9168a270aec5199e))

### Refactors

* change semantic naming of horizontal to vertical and vice versa for tile component ([d2c075a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d2c075a4dd5b4430e4cd8e70148529048d81fec0))
* de-scoped break-point max-width tokens and moved them to internal since they are only used in tools like Figma ([6399a23](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6399a23694d838f4b62d09e84918c15cd2edae6b))
* de-scoped user-agent font size and moved it to internal since it is only needed in tools like Figma ([eadd83f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/eadd83f9f822ce62eb379bc40d5a00b8e4a11aef))
* deleted dynamic spacing which is currently not in use and replaced by linear dimension spacing for densities ([e080277](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e08027713dbdcd148d9a9a298bf75ffd9ec9e3de))
* due to indicator refactoring (dependency to component sizes), the text style "indication" is not longer needed ([b5990ec](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b5990ec0373b0fb50b32a51611a6d33ceb7cdbc1))
* elevation and shadow name and type corrections ([b80d190](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b80d19019c60f52b1cd6b524e292315f8713568e))
* gap, stack & distance name and type correction ([65789f8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/65789f8943888310971adf77806b8dabfa8c3a19))
* moved (renamed) icon adjustment tokens into the new appropriate content spacing group and speficied description ([d0ecc02](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d0ecc026a31d0b3db2293bc83936732584c28f19))
* remove min-/max-height from components to cater for all use cases (fixed and min/max situations) ([06096da](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/06096da359c5656b52414133bb22471980d21157))
* removed existing indicator sizing, spacing & typography ([3582930](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3582930defc8c6b8e61081b53aa0b8ebbc443bb6))
* removed semantic content sizes l, xl and 2xl which are now replaced by component sizes ([aaf1c06](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/aaf1c06499974d67ef76cb9b1c8f08717d5fe5d9))
* removed semantic list tokens to be replaced with new between tokens for a more general application ([d273349](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d273349461c18312a198662831861e4224cd6242))
* renamed core grid spacing tokens according to our naming scheme ([8bb851d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8bb851dc0a11443d885c09cd9bc21709a4a5f413))
* renamed design system name interims name azds back to a1 in SSOT ([6394f8e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6394f8ee8f88d7dbcf5f4e668b55e76e9ddc8c01))
* type-corrected motion tokens ([8cba04d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8cba04d9c4ecaade7316d8c4fe167b9101c2decd))

### [0.8.1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.8.0...tokens-v0.8.1) (2025-09-24)

No token changes, only fixing the missing dist folder in the NPM package of the design tokens.

## [0.8.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.7.0...tokens-v0.8.0) (2025-08-14)


### ⚠ BREAKING CHANGES

* renamed accordion gap (not used since the accordion restructure) to accordion headline gap (introduced to space out the headline and additional elements like icons)

### Features

* added description for new blur token ([82a732a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/82a732a09fa6effcbca0a051b904663118978adc))
* added license-plate component and changed theme configuration ([1046045](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/104604510fb70f64fdecf16d26a056f9a3987828))
* added modal backdrop (semantic: elevation overlay) ([fc8d503](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fc8d503062c3cc5d78e056fe968e7a14a62d6f17))
* added required license plate tokens ([3661933](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3661933e4fa4fd32928e739bead9cdea127aad22))
* renamed accordion gap (not used since the accordion restructure) to accordion headline gap (introduced to space out the headline and additional elements like icons) ([b09b2fe](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b09b2fe0f37af96edbad6d8e83498df490bcc116))


### Bug Fixes

* changed alpha value of semantic elevation overlay in dark mode ([fd1be0f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fd1be0fac34bf094fc6a433dedfe97171369c5f2))
* fixing copy paste typo error in migration file ([45de968](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/45de968a8d7c89d1c871cb0fb23c6b30c659d29e))
* overlay dark alpha value ([833bdf3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/833bdf3e09d4e845bb86c049dc0a0257f5c233d2))
* semantic.letter-spacing.headline.xl at semantic.text.headline.xl ([120f100](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/120f100c63a7271c864761512c4b53e8be2b6a53))


### Documentation

* bigger update of the README files and repo docs ([c26cfed](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c26cfed4d6653755e3e56f35721a1bd042e3b0a1))
* deleted escaped double column marks from design token descriptions ([583a68f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/583a68f87e84c30ade80156aa7e2e3b0967e805c))
* move demo PoCs to poc-experiments repo ([87920e0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/87920e0d0c5db68659be0bebc3505953bf6c4021))

## [0.7.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.6.4...tokens-v0.7.0) (2025-06-02)


### ⚠ BREAKING CHANGES

* reworked semantic action text composites and semantic text decorations to cover all component needs
* reworked icon tokens, based on new semantic sizes

### Features

* added component size xs for the tag and possible future components using this size ([5fa19d5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5fa19d5d3af4c5cb8fd106fa3add407c99893f79))
* added content size XS token for defining the smallest icon size within small components like the badge ([207d280](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/207d2800e7c82ad5b1d4cc6741b43e172ef1889e))
* added responsive component themes (Figma: modes) ([08da7ab](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/08da7ab09933fcf384bff9ef6f46524cfbcf5150))
* decoupled component size tokens from content size tokens by replacing references with line-height references ([6a13a8c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6a13a8cf64fb1e8748addec5fead51683ab1b540))
* reworked content and component size descriptions with the current set of components and a more detailled approach to explain the usage and aim of uniform sizing. ([e499eeb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e499eeb8c3657d2c5da58a09facb49128f236ace))
* reworked icon tokens, based on new semantic sizes ([dc98fec](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dc98fec75062b13141dd4e0aea407e6749f6c6fb))
* reworked semantic action text composites and semantic text decorations to cover all component needs ([98f8c08](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/98f8c085e103b4cb89a8a2e5b27b2405cbcba0f8))


### Bug Fixes

* removed pixel unit from xl and 2xl core breakpoint tokens ([287fa72](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/287fa72fe0e491822e1dea7e64b5fb9c7786697a))

### [0.6.4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.6.3...tokens-v0.6.4) (2025-05-23)


### Bug Fixes

* dark mode token values are not overridden by light mode tokens [A1-943] ([bc65443](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/bc65443b56c4b64372c16d84c13a9b1440df7754))
* **migration:** name of the migration file fixed for migrator naming convention ([b5f7935](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b5f79354c4812c8132c278f15257dcff236eb9d4))


### Documentation

* **demo:** update typography demo file to token release v0.6.4 [A1-804] ([9e4acb1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9e4acb1fbd48965ae084b1c6740b82411244467e))
* fix old file name leftover in token-package README ([3015e87](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3015e87edd9221794eb5ff8046ec4dd1b7d8e20e))

### [0.6.3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.6.2...tokens-v0.6.3) (2025-05-21)


### Features

* added interactive states hover and active for on-attention colors that are required by links and plain buttons (info-i) on promotional elements (accent surfaces) ([31e98f3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/31e98f30eb988ddd5c859c2d5b0266dc71e9f3e1))


### Bug Fixes

* $themes.json breakpoint selectedTokenSets [A1-919] ([dcfe0bc](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dcfe0bc0bd8f62da7359c35499e97d8a82908ee5))
* missing units of the custom math calc resolution ([0d0c48c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0d0c48ca75fd4ea2cf3f6dd60ddb6d5959fcc38f))
* Moved shrink tokens to motion, deleted dark read-only border tokens, changed spacing modifiers to token type number ([1f896f2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1f896f2d2ca265715ae39265396233a992448f72))
* potentially fixing typography calc build performance issue ([5a03754](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5a03754a1b0c6dd5eb1aa9fffa0b38cacbf19432))
* replace hardcoded modify color calculation workaround [A1-900] ([a0284ed](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a0284ed231ccba2bf0a8edd09fac77d2598c3d32))

### [0.6.2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.6.1...tokens-v0.6.2) (2025-03-18)

### Bug Fixes

* delete old unsupported border readonly color token leftovers ([9de6709](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9de67090e5a660420dc8435c2cd9694f0967c799))

### [0.6.1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.6.0...tokens-v0.6.1) (2025-03-18)

### Bug Fixes

* delete wrong compact icon adjustment tokens ([db45fa2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/db45fa27582bf1be205f2f88d92240e2a4ec9e85))
* temporary add hardcoded disabled color calculations (temporary fix) [A1-900] ([16670de](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/16670dee8fde9a19e316430fdfa536f277ee5db7))

## [0.6.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.5.0...tokens-v0.6.0) (2025-03-07)

### ⚠ BREAKING CHANGES

Please be aware of our [pre 1.0.0 versioning guidelines](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package#pre-100-versioning-guidelines).

* remove extracting of unsupported typo properties
* temporarily delete breakpoint specific tab component token (Breaks Figma)
* filter out component theme groups and use densities theme group for adding breakpoint theming dimension
* delete unwanted and obsolete native mobile output file configs
* replaced all component core usages with semantic tokens, refined spacing, error check and added semantic bar border
* replaced every calculation with spacing modifiers with semantic ones
* replaced avatar size tokens with semantic component size
* tile and avator spacing calculations with semantic dimension tokens and updated density spacing
* replaced dropdown tokens with semantic ones
* text-input and text-area component tokens replaced with semantic tokens
* toggle button component tokens replaced with semantic tokens
* checkbox component tokens replaced with semantic tokens
* finished radio-button replacing tokens with semantic ones
* semantic easing motion tokens now not conflicting with composite token names (curves instead of easing)
* radio-button component tokens replaced with semantic tokens
* replaced switch component tokens with semantic tokens
* renamed label hint stack
* replaced label gap with semantic tokens
* reworked gap tokens needed for list component indention stylings
* tab component tokens replaced with semantic tokens
* tag component tokens replaced with semantic tokens
* divider component tokens replaced with semantic tokens
* deleted callout component definition until defined clearly. Aim: set it up in the future as a variant of the badge.
* badge component tokens replaced with semantic tokens
* avatar component tokens replaced with semantic tokens
* accordion component tokens replaced with semantic tokens
* replaced button plain gap with semantic content gap
* link component tokens replaced with semantic ones
* added action composite text styles, preliminary for Figma only since text decoration needs to be included in the text style definition
* added semantic background color tokens to be able to theme all eventualities
* info partial token reduction
* added semantic icon gap tokens to be used whenever you need to place an icon besides a text
* hint partial component token reduction
* changed utility xs typography to utility indication to cover the indicator styling
* button component token reduction
* added new semantic component spacing system
* renamed new utility structure to "helper" to prevent name conflicts with the utility text styles
* removed elevation surface readonly token since they are always the same like disabled tokens
* structured disabled semantic palettes under "utility"
* added missing semantic color definitions to prepare the removal of component color tokens
* add new dynamically calculated typographic system
* completely reworked the segmented control tokens
* changed dropdown.elevation token to dropdown.flyout.elevation token to semantically reference to the usage context
* changed the typography system from static to dynamic to count in future density and breakpoint scenarios or even fluid typography
* deleted deprecated motion token sets
* radio button motion tokens
* checkbox motion tokens
* renamed accordion section to item to have a more neutral naming and to be more consistent with other repeating element patterns like tabs or dropdowns
* accordion motion tokens
* completely reworked motion token concept and structure
* reduced max-width tokens to one value since there is only one text limit possible
* deleted unused dimension tokens that are now not needed anymore due to calculation and the reworked font size system
* removed border position tokens since they are not used anymore and not of kind "dimension"
* reworked the accent and signal color scheme to have just one accent tone per color palette
* semantic compact utility font size naming
* created semantic typography tokens for each typographic dimension (font family, font size, line height, font weight, letter spacing, case)
* renamed to toggle-button according to team agreement on better semantic separation of controls like switches, tabs, segmented controls and toggle buttons based on <https://medium.com/tap-to-dismiss/a-better-segmented-control-9e662de2ef57>
* changes button m countles to countless naming
* added dynamic density to tile component
* finished button dynamic density - now including plain button
* updated name and description of icon correction token
* naming improvements to foster better understanding of dynamic density modifiers
* removed unused radio-button size and border radius tokens
* semantic icon size defines based on the line height for utility text the icon size, and indirectly also the size or height of buttons, checkboxes, radio buttons or switches.
* solved density button contained inset and icon indicator placement by calculation alone
* deleted dense token after creating button m dynamic spacing tokens
* density-based dynamic spacing tokens

### Features

* accordion token cleanup ([ed8330c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ed8330c608acd957584a417d006806e78f455bee))
* add action dark colors ([dbb8cef](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dbb8cef0773966fa2a124738888d9fbbaf020eec))
* add breakpoint theming dimension incorporated as media queries into mobile CSS output files ([5112e46](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5112e462f855398d5636ca2974a7ae60e9427708))
* added accent color button ([204b3c7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/204b3c71bc6234cb6b52ebb2b3f60881595f2452))
* added decicated hover and active text decoration tokens to button and link ([b1a893b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b1a893bef93bdf4e58c873d0479acf3bb0520d44))
* added dependency for dropdown flyout inset to item width ([f83122b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f83122bc006da83b2fbe5f267ea796a3a0c3eb94))
* added dynamic densities to badge ([0031508](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/003150815cd40c10240e6820a34f9043dda87c1d))
* added dynamic density for the input-field partial ([fa99531](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fa99531a1708da4b400be2d388909b289bfcd936))
* added focus transition tokens to semantic layer which is independent of components ([1e205a9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1e205a96c69aaabc3f117d664f0773de6b9c7d00))
* added icon indicator partial ([01a2feb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/01a2feb2c11f7290c3f2595a918a54090570423a))
* added icon only spacing ([7e2290d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7e2290d92c189e3aed37c087757617c8af98b282))
* added icon-text button spacing tokens according to new spacing principle ([d225f86](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d225f86d2911970b451d5a22ee93db8b83946e84))
* added missing semantic accent colors ([705edf2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/705edf2754bbbeabeac08e2e2d897b024643b3d0))
* added missing semantic color definitions to prepare the removal of component color tokens ([8fa5abf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8fa5abfa152940a1a80ab0ab9dff132c467423b4))
* added missing tab focus border radius ([0684a7a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0684a7ac0bffa84994b664fa8c7de53f55b87153))
* added motion duration and scaling modifiers for minimal motion dimension ([b04c128](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b04c12856840073d53df556329b80afeaf7ea1d2))
* added motion tokens to link component ([664a812](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/664a812eaf9116abed3d38c47fe470e0fa436172))
* added new semantic component spacing system ([de15905](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/de159052f7764b9308f2c803bf20c616ca28cffe))
* added radio button and checkbox dynamic density ([7a696ae](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7a696aecc0908ef9d42199ed93ab8ecdb742cd10))
* added ration tokens from smallest to golden ratio to be more flexible for custom use cases ([171131c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/171131c6357148e1d3944e5e65b75dc4f67730ee))
* added selection color tokens ([072fcf3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/072fcf3695f1491ac2f99d4da553154618fd2339))
* added semantic background color tokens to be able to theme all eventualities ([7ddd739](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7ddd739d9c62e28e791d9df3298bcf53b9832114))
* added semantic calculation to the button height ([586438f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/586438f828740b6ea9205555f2b8df362861c0ea))
* added semantic content size for e.g. illustrative icons ([83a91aa](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/83a91aa84ea0906af721952d50be68c2b41e90be))
* added semantic icon gap tokens to be used whenever you need to place an icon besides a text ([93b3caa](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/93b3caac6e403bd2e6169f2f1f3bed06d5b8ed07))
* added semantic list tokens for e.g. radio or checkbox lists ([23be7d8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/23be7d8cdeafbd71ff6680700736bb38ad94375b))
* added semantic motion theme dimension ([d1d685b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d1d685bff73cd97564c29065c4b864074faaf283))
* added text case core tokens ([e32538e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e32538ec9dd3d9a5a041237981654daa3c669204))
* avatar text size aligned with characteristic of icon line width ([94fe4bc](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/94fe4bcad84622aa1fe0143bd8bffe92a448f107))
* changed inverse emphasis colors to match the default emphasis color logic (hue instead of transparency) ([f3a2114](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f3a2114cc1a1fa06cd93bb52640dc1892283c0d2))
* changed subtle signal and accent colors and on colors from 100 to 200 to solve contrast and readability issues on emphasis surfaces ([096a7c1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/096a7c114252f6a4535c19257b091a2fd741104e))
* changed the typography system from static to dynamic to count in future density and breakpoint scenarios or even fluid typography ([8985a1b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8985a1b196879ce3cda300efd59389f030d33b6c))
* changed theme settings to be compatible with Figma variable collections and modes ([5352b08](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5352b08c8d06118209bc93c50a97fe47e16bbbcf))
* consolidated version of tab component (former tokens were just an MVP) ([2baa0f5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2baa0f5a3c7fafca8ac1a62af39e0a8b498b87a8))
* density-based dynamic spacing tokens ([98b0e36](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/98b0e36d15216e4c243f3288b00c8fd172e04300))
* divider height component token ([f893935](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f893935427c27617fdf4f24d15c089d35245355a))
* filter out internal tokens from the token output file assets [A1-877] ([8dcd97f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8dcd97f6a21003d3badee3134da69df151dc9795))
* filter out text-case tokens from the token output file assets [A1-878] ([362b036](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/362b0361c3a1a66ad920540e07d32a4fd4a77254))
* first draft of segmented control tokens ([69b8c39](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/69b8c39921386b593d6f24ef4d2c7a6b137d2c3a))
* input motion tokenization ([732aebb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/732aebb1fa0aec04925d30069f7d884293a7ad47))
* major color system rework especially for dynamically calculated disabled and inverse colors ([7c1c1b3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7c1c1b347799a8c1619ed6428b5479c2a30a4b61))
* moved composites layer into combinations folder and renamed it to composite to be consistent with the other token layers/files ([ca12e1e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ca12e1e8667ccb45de2088aded87c0812e0e4264))
* naming improvements to foster better understanding of dynamic density modifiers ([0ed7dc4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0ed7dc48498e503bf97eee766fc56d73a6b77513))
* reworked typography system to include dedicated breakpoint m typography requested by the design team. ([28b2678](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/28b267839a358566e869ab69086db4d1e9c28ee3))
* solved density button contained inset and icon indicator placement by calculation alone ([9f54119](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9f54119b5783d8925b7d78c467beae25905b8975))
* tokenized the tab mask to be ready for css mask image or other technologies ([8f444d0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8f444d0a55acc3fbbf2d7552f638f989453e533e))

### Bug Fixes

* accordion text font style mapping ([94e047d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/94e047dbf291f5cdf972484ea18a50366c96d319))
* add size relation to core user agent font size to density dimension base font sizes ([059398c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/059398c0859ef47e58f823c58ab5c54490240a08))
* added action composite text styles, preliminary for Figma only since text decoration needs to be included in the text style definition ([dfdc67a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dfdc67a38f424b6ee37b7b4a98dccf8ba74b3fe8))
* added missing "offset" to end/start/top spacings ([df57155](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/df57155f8393461a414e280a784a8042ccd7db29))
* added missing "unselected" group name to toggle button tokens to be consistent with other naming schemes ([5d1bd3c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5d1bd3cdb89db125f7f56409e712d0417ae3bad4))
* added missing hint and message spacing to dropdown to be consistent with input and text area ([993c820](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/993c820520a0d00265e1ecc2e56d380a838dc723))
* added missing line height tokens for typography spacious breakpoint l ([dc6e24f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dc6e24f401225c0b618569c9effc6eb26fa34924))
* aligned the input field height to the semantic component sizes ([06e8834](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/06e8834ee1532215826ab96128478999fb2bf55c))
* avatar and nested indicator sizes ([01cbdb9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/01cbdb955d1581866ea3c5b6c020a4135a55fdc8))
* badge inset ([f47aaea](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f47aaea8cd7c7adbfba22eeeda3d8b6e8f88919f))
* border radius token references ([f80e576](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f80e5764174f6c49b7ba6e529b4ee75a0f943906))
* button, checkbox, radio button, accordion minimal motion token dependencies ([227f547](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/227f54771f626188d5bc1e220cd8ee26d97c66b7))
* changed body l size to align with font size generation ([5636bf2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5636bf20f3b6c8e161d3bfaf5b63b165d02ddaee))
* changed core darkblue color value ([b3b32fb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b3b32fb7b00142ff619a7ba0e2a9aebc046ed906))
* changed core scale token type to number ([b9b8714](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b9b8714b61dcdeb7c35bbd7540e1fd29377b1aa8))
* changed dropdown flyout to new elevated surface color ([0a4a38d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0a4a38d020a83b206eace7fefeee45c14d7c2a8d))
* changed inset calculation of tile after typographic rework ([a25ab28](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a25ab28d7f2f7a47d654c78acfaa983087c9764b))
* changes button m countles to countless naming ([4089d49](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4089d499f06e39dd9caa3d0a3e8eb3725a783ee7))
* dark color dark tones ([a3c4e34](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a3c4e34d5caa109060d7b121264004adeeed0b73))
* dark mode disabled colors ([57c0162](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/57c016295872d0c411d8938744dc0d450383c9ae))
* delete unwanted and obsolete native mobile output file configs ([a86e898](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a86e898c3910c436101ad96939f4833dd8653866))
* deleted callout component definition until defined clearly. Aim: set it up in the future as a variant of the badge. ([c5e7053](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c5e70538dff002a7b0fc39fd71ed370d8aa8fd25))
* deleted dense token after creating button m dynamic spacing tokens ([284ad36](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/284ad36eeb23c5208ea5bdd5d42204527338c256))
* deleted unused dimension tokens that are now not needed anymore due to calculation and the reworked font size system ([05cc30e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/05cc30e6c2b9dbfa807a1d155d7729b79b87f38b))
* dim brand dark colors based on brand feedback ([3846781](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3846781a55bf79007d7dd11c86f5162d84e93c61))
* extracting unsupported font properties not into same level as compositional token object is ([319ae15](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/319ae15669fab68f800f22a7e1370c213b88985a))
* focus border radius ([380926b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/380926bdada52ff76d7c0345d551a443595395e7))
* gray tone for on accent attention color was the same as the surface ([e41e878](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e41e878513b23cd43ca6b39b0910b692f56df498))
* grouped focus transition tokens under "motion" ([22cec04](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/22cec0486c278b0b721ce9fa7bcafcf3586e2695))
* hardcode calculation token value replacements (temporary fix) ([8c4e396](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8c4e3965403f3da75d97538fbad0f7d8de1a0b06))
* indicator partial responsive size and border radius calculation ([8f86690](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8f86690358d991ab63ee06500af31f1483053085))
* linear-gradient SSOT and CSS value [A1-835] ([f663cfa](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f663cfaacbb8c8009a061d6ee17ee89e3de18dcb))
* no inset token adjustments in the core token layer [A1-873] ([362f88c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/362f88ca01a1528db7047b12573f97ff097c0a02))
* optical and one contrast-based remappings of color values to be better visible on emphasis surfaces ([596b8e8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/596b8e827f14eea99d786582c37cd803fb339c3c))
* re-add cubic-bezier CSS function for easing token values [A1-880, A1-834, A1-867] ([e6c39c6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e6c39c63e921a9319f82210fad3ab3b922f9c9ad))
* readded changed button contained m inset tokens ([87161c4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/87161c415b8511cbd08b544c728b28e0abd27a41))
* reduced max-width tokens to one value since there is only one text limit possible ([3b7f276](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3b7f276621c693aae5125c5d881081ec448a9b8f))
* remove extracting of unsupported typo properties ([4751c30](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4751c3015a9beb43861f63037a6683afaa055b0e))
* removed border position tokens since they are not used anymore and not of kind "dimension" ([3791b5f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3791b5fef8e693cb3de8bbf54791337a3ad910d3))
* removed space before bracket for semantic linear gradient tokens ([392c0b1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/392c0b1f40ff2cad561196daa776be3007369940))
* removed unused radio-button size and border radius tokens ([e3229fb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e3229fb5cde5dbd15ad5d0934a62c2a2412392a5))
* removing calculation whitespaces in avatar component and spacious semantic tokens ([7aa3658](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7aa36586335a774b9e38682059f2d5a1865831d3))
* removing calculation whitespaces in tab component and add whitespaces in spacious calculated semantic tokens ([5c40ba1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5c40ba188ae7a33aa59df2858dc41da97b91ca28))
* renaming of "Foundations" theme group to "Core" ([84444e0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/84444e000b913e3ef082d84025b6a4e102388743))
* resolve inset token shorthand calculation correctly [A1-714] ([f099a25](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f099a25b7250fdaa328e6f3ba45c69b20d95fac8))
* semantic compact utility font size naming ([9118a4d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9118a4d6a88db827c16e704bfd268ac097e45a76))
* semantic easing motion tokens now not conflicting with composite token names (curves instead of easing) ([e562ded](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e562ded573a76627aaaaeaeb7f4633a3ade6ef02))
* semantic linear 200 spacing with correct modifier ([c1add19](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c1add19a976dcf880cb84f713f51a2e29d68bd36))
* tag focus border radius (was related to switch) ([bd6e744](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/bd6e744a91e3b15071b1b53ee979ebe73ef82815))
* temporarily delete breakpoint specific tab component token (Breaks Figma) ([bce80d3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/bce80d3bbd863d8e69390346894dfca9060376e3))
* tile spacing after typgraphic changes ([4c88391](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4c8839102496e9a97ff6a95e3da0cb5707f1226a))
* typography calculation factor alignment ([13a4bea](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/13a4bea35e92c58aa45aba5b28c55d8cbb1baa97))
* unified gap and stack values of every form element with grouped behaviour. Now better optimized for dense mode using less space ([eb656c5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/eb656c538a425fe3f19ad63a4ae3ddf7622597b5))
* updated color-scheme configuration to export to Figma in a better way ([6f53b30](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6f53b303286c7c413d57661e8ada929ec6df3e4a))
* updated dropdown spacing after typographic changes ([e70ae95](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e70ae95cc8c1540fb789763f3514dca6b2c34124))
* updated name and description of icon correction token ([58af1f9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/58af1f94fc4775864ab6d18e4613b6bb413c3cfc))
* updated typo factor to fix too large lineheight for density mode compact/dense and utility/body text size s ([a6566ef](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a6566ef88d058be78035023019ce72b1984e3a8b))
* utility xs sizes for use in indicators ([cdca1d8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cdca1d8e6ddaa79c3d3f9b02615adc4f658842e9))
* wrong token font composition case ([7cd9571](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7cd9571c7338e6bf7169cf8833d8dc1b9e822d6d))
* accordion component tokens replaced with semantic tokens ([fa92b7e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fa92b7e11bf022b3ce73b9533fd0446bc933f3c6))
* accordion motion tokens ([2c95dba](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2c95dba8c741f7c8d0407f788f8fd9c3ba00a466))
* add new dynamically calculated typographic system ([c1d2028](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c1d20281fa79eaa8860c9c099946d34528467ba1))
* added dynamic density to choice-button ([98ed43d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/98ed43d6c05cec753d3f1eb5c7ccc960ae91f38c))
* added dynamic density to tile component ([a369d6b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a369d6b999d4d6d27e31bea94c51f1fe1da15723))
* avatar component tokens replaced with semantic tokens ([b333911](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b333911ef9c70b5c273b66971d75c44845250dc2))
* badge component tokens replaced with semantic tokens ([3356a19](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3356a197b81301e899f4f162b09f9d5e2b13e3b8))
* button component token reduction ([e2d070c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e2d070c9d039777af88cdbdf535f48ce7b31b5b8))
* changed dropdown.elevation token to dropdown.flyout.elevation token to semantically reference to the usage context ([2b6ce88](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2b6ce885d26bac1167690e672814d7343d93f0cf))
* changed utility xs typography to utility indication to cover the indicator styling ([7b90782](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7b907826831978fba2f3ec042315e45ccd29b6c9))
* checkbox component tokens replaced with semantic tokens ([99becd6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/99becd6e9953183122665d2447fe8f425913ff8b))
* checkbox motion tokens ([a1424f1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a1424f1bd843a4859ec34eba0d5d18aae7a99c20))
* completely reworked motion token concept and structure ([5435056](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5435056976bba1d8c2ab5a32eec3163c32041de9))
* completely reworked the segmented control tokens ([851d93d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/851d93d092b7733a3f5ff3d6186b538e5b8ec116))
* created semantic typography tokens for each typographic dimension (font family, font size, line height, font weight, letter spacing, case) ([2d30dfe](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2d30dfe996538875e5b3626242154ad52aa516b5))
* deleted deprecated motion token sets ([508ded6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/508ded6fe103a2c2c96fc56a64d455d0fa8dc5b3))
* divider component tokens replaced with semantic tokens ([636b87d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/636b87dc037cf315ceac2d9e9cc3f0e57154b501))
* finished button dynamic density - now including plain button ([b5f4b5d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b5f4b5d2f945e13649edb557b8c7e38498e2c903))
* finished radio-button replacing tokens with semantic ones ([9ef4f6c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9ef4f6c67d854f38de44ae1191e6449788f63fca))
* hint partial component token reduction ([1279880](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/127988027985e3e4bb43db5b946a574db2aeafca))
* info partial token reduction ([96e1ff1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/96e1ff11d0eaca52e86cabec080ae22b53a42498))
* link component tokens replaced with semantic ones ([df4f1d7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/df4f1d7c410d85ced8bf69a6d3396a4e68ef6b0a))
* radio button motion tokens ([360cdd6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/360cdd66d595440df21d7d286a99a2b5e0b65c45))
* radio-button component tokens replaced with semantic tokens ([7c95c3f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7c95c3f91de3312b7e7fb7f321fb622afa965079))
* removed elevation surface readonly token since they are always the same like disabled tokens ([66ebf83](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/66ebf83c20eb99ed641ce0f4f20ce54e31000b7e))
* renamed accordion section to item to have a more neutral naming and to be more consistent with other repeating element patterns like tabs or dropdowns ([ef70b7b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ef70b7b036d36db67dfb001d3e14ebabb9bc328a))
* renamed label hint stack ([1fafbbe](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1fafbbe2f7914aa4524626f67c170d4b5ddb3cc1))
* renamed new utility structure to "helper" to prevent name conflicts with the utility text styles ([1a6b5a9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1a6b5a9cc029ba5f570883aa07d19063f985684b))
* replaced all component core usages with semantic tokens, refined spacing, error check and added semantic bar border ([6de7cdd](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6de7cddb043812c2a5899a00f831d3aa02786cad))
* replaced avatar size tokens with semantic component size ([025f2ec](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/025f2ec0f8d9cd9f7ea169d936fc5ef044a85c3a))
* replaced button plain gap with semantic content gap ([a1d5bdf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a1d5bdf6d6b859da9df8794e9b94d38ed79efd99))
* replaced dropdown tokens with semantic ones ([508f2aa](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/508f2aa48b13bc39e56d5dab4fc0a5ac13bd51a3))
* replaced every calculation with spacing modifiers with semantic ones ([d0e79a1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d0e79a1f48994fecd4be4782c7f01d69a9bef504))
* replaced label gap with semantic tokens ([90c6316](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/90c63165c0cb450a315b124af63332fe4d535fd5))
* replaced switch component tokens with semantic tokens ([caf0d49](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/caf0d490a5a08eab793e2b0e97c0e5f4fc118258))
* reworked gap tokens needed for list component indention stylings ([ed12e64](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ed12e6403a0194b5da641b30fbd07b6429fea5c3))
* reworked the accent and signal color scheme to have just one accent tone per color palette ([fb35608](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fb35608ccaaba1cbc7d9c404d97762074c23030c))
* semantic icon size defines based on the line height for utility text the icon size, and indirectly also the size or height of buttons, checkboxes, radio buttons or switches. ([1123ea7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1123ea7007e08b10453dd426fed5ea001d43bb95))
* structured disabled semantic palettes under "utility" ([d6567f1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d6567f186d3c40b55337df41261185df7ed1b35d))
* tab component tokens replaced with semantic tokens ([036d4df](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/036d4df3005b2c258cb1bd5d7d7b190cef5bae30))
* tag component tokens replaced with semantic tokens ([ef02e04](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ef02e04afc415b4a8bffef9ef961e2ccb133daf8))
* text-input and text-area component tokens replaced with semantic tokens ([0b351ea](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0b351ea7eb088366fb874b7697b55b0eb7f94b13))
* tile and avator spacing calculations with semantic dimension tokens and updated density spacing ([98abc86](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/98abc868d75d73a7e5417d538830bf17df527e54))
* toggle button component tokens replaced with semantic tokens ([012f90a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/012f90abff2ee09285bc2b29fa05aba220e7d2af))
* fix HEX color value casing for responsive-integrated token asset files

### Documentation

* added descriptions for motion modifier tokens ([d021271](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d021271e92b0518499d459de03db87ebbce8ff8c))
* changed semantic content spacing documentation ([82d8c7a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/82d8c7a886d6b3c86b5f1d73f79a3479785bf96e))
* **demo:** update typography demo PoC example with latest tokens ([dd2eb89](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dd2eb89aec01d12a6e1659fa43b3e5eea65e0c5e))
* **readme:** Add standalone design token documentation app link to the README ([16c48e2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/16c48e2e3e35de94acc96f090e14427e018f29b2))
* **readme:** Add versioning guidelines and breaking change definition to the README [A1-800] ([3ef4937](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3ef49378f52b01087f8b7586d90191f734adf442))
* Switch to design-token assets from official OneMarketing Cloudflare R2 bucket ([231c155](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/231c155a6b535389fc525801838618bd3a5fb306))
* update README and demo files ([#113](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/113)) ([c0555da](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c0555da65cd70786c9c819be5e5db2ff11038790))

## [0.5.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.4.1...tokens-v0.5.0) (2024-07-03)

### ⚠ BREAKING CHANGES

* **tile:** Remove wrong leftover motion test tokens for the dense tile component
* **semantic:** Fix set of semantic static spacings
* **core:** Rename core.grid.margin to core.grid.inset tokens [A1-788]
* **core:** Rename core.grid.gutter to core.grid.column-gap tokens [A1-788]

### Bug Fixes

* **callout:** Remove dense callout gap to meet 24px icon interaction boundary ([8497fc9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8497fc94dba1a8c1db376bd823b17160ae512993))
* **core:** changed grid max-width type from spacing to sizing ([4a30441](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4a304419fc4b03d8de5d800fa0a3c56675d06613))
* **core:** Rename core.grid.gutter to core.grid.column-gap tokens [A1-788] ([820f319](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/820f319b810d2d4a9e488dba76f373c50272105f))
* **core:** Rename core.grid.margin to core.grid.inset tokens [A1-788] ([98269cd](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/98269cd302e45baa016ba2dd80b3c72c4f40eb6b))
* Semantic compositional token resolution for dense mode [A1-791] ([b2e2a2b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b2e2a2b85d6718ba62d6135f77955b03950c5d09))
* **semantic:** Fix set of semantic static spacings ([86d24ee](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/86d24eea3ce5bfdf5e1cc6f78d47a6bbf6121b9b))
* **tag:** Adjust selectable spacious inset ([2485c1d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2485c1da683030be58cfa3446eb02aa629161fa4))
* **tile:** Remove wrong leftover motion test tokens for the dense tile component ([895d32e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/895d32e5e9fbe2aa611d812cb84ded8d67c1b920))

### Documentation

* **demo:** Changing demo headline to demo typography and add more typo examples ([dbfe627](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dbfe62739592b5067aec6431402e7a216a35d333))
* **demo:** Fix checkbox read-only and disabled unchecked checkbox sizes ([a8b2528](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a8b25287c6dbc5c4c81dba24f11c08274873f3d2))
* **demo:** Fix radio-button motion tokens to tokens-v.0.4.1 ([d08e9c1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d08e9c10be76d999be47506c4e93ce0245958f97))
* **demo:** Refactor accordion demo logarithimic calculation ([507231b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/507231b52c85e6e25140423208a949bb463b8c86))
* **readme:** Add table of content and integration scenarios to README [A1-725] ([9b90aa3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9b90aa3f4d33bd21ce0d0e6546c462255f9632ef))

### [0.4.1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.4.0...tokens-v0.4.1) (2024-03-20)

### Bug Fixes

* **semantic:** Fix surface hover color for light color-scheme ([c560807](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c560807bf2ed6434858babd544eed93631c17504))

### Documentation

* **demo:** Fix version bump CDN file version in all demo files to v0.4.1 ([74a4e0f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/74a4e0f4685abff126e1f983623517e58f116fef))

## [0.4.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.3.0...tokens-v0.4.0) (2024-03-20)

### ⚠ BREAKING CHANGES

* **button:** Delete ripple related motion tokens
* **motion:** Order of fast duration token and renaming of still to none
* **motion:** Rename motion resting tokens to default
* **tag:** Reworked Tag component naming, structure, colors and spacing

### Features

* Added Button Plain Secondary Inverse ([d06dd52](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d06dd52be9e81e36fd7ff8ef8c58d932567800e9))
* Added secondary inverse link for consistency ([2dc785d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2dc785dc921cbefbf7b52edf315f76c8b20b84e8))
* changed Accordion border color based on Sebastians feedback ([b458ecf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b458ecfd885daa47cf121647f79bc88a57dd913e))
* **indicator:** Add count vertical paddings and add indicator border width ([1e3adea](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1e3adea6a48c71eb4d725541501d722ba31e516c))
* **motion:** Added a new easing curve for ripple ([db0139d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/db0139d1af1892aea518d2bf44d89094a8d5dab0))
* Moved "-EXPERIMENTAL" transparent surface token to surface tokens ([2c1ee91](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2c1ee9185ddd91586e6178d4ea2bb7887cd72462))
* **tag:** Reworked Tag component naming, structure, colors and spacing ([78f1221](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/78f1221bfdd63189517390a8430210efc856ccda))

### Bug Fixes

* **accordion:** Fix log calculation for SASS compiler [A1-735] ([#95](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/95)) ([7b179ea](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7b179eaad416413001342ed6d1fce32942c8500e)), closes [#94](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/94)
* Add missing description field to normalized custom compositional tokens [A1-734]([#96](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/96)) ([c7284f2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c7284f2b31d0e8fd893808394e997c40e082cb86))
* **button:** Delete ripple related motion tokens ([6bd1b80](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6bd1b807c282d9720d9df248bc3870cd0d333f11))
* Changed core grid gutter & margin token type from sizing to spacing ([6799887](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6799887e3705e40c4fa0e565512cb7283abf8916))
* **figma:** Created new style set for cleanup of library ([653d379](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/653d379f146350dfd3543767ae3be7e1ed99e566))
* **motion:** Adjusted some button duration and easing curve of ripple and button ([5a46c2f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5a46c2f39ce5b16e27379ca74cb7931d5856dadc))
* **motion:** Order of fast duration token and renaming of still to none ([ae3158c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ae3158c6ca058b857ee40871c38752987e7e9301))
* **motion:** Rename motion resting tokens to default ([8a38133](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8a3813368c17d908946c0b2d60055a432debf762))
* **motion:** Update Button contained motion tokens ([54895b0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/54895b01991ee35a5701cd86cee2d06926bbd2c2))
* **motion:** Updating animation timing of interaction color fadings ([80f4575](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/80f4575d820c1322aba64b5e0c2ea4f1c8de20cf))
* Secondary on action inverse color value changed ([04fff7b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/04fff7b7d8ec2b10470ae5e6c0552936c5d1f4b7))
* **semantic:** Changed light subtle info aqua color to blue ([4a0dc32](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4a0dc32088806f100723c2582e3180ae488368f4))
* **tag:** Update Tag component dense spacing ([ceb457c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ceb457c2ea9ef22ec60fdd1783019cb69b8f66e0))

### Documentation

* **core:** Adding descriptions to the core grid gutter, margins and max-width tokens ([eb09caf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/eb09caf8d2ecdfbdfd7b0325f777d8a40aefc666))
* **demo:** Cluster and refactor all accordion header styles ([43f02ba](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/43f02ba99abd7d6a63720ec4365642e3c1d68365))
* **demo:** Delete old obsolete button token integration demo ([a4b6a45](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a4b6a4553f1da0373568453f2cbd7acf5fa6a17d))
* **demo:** Delete ripple contained button animation ([f38d078](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f38d078ce997987937dbfbe255f05f3ac4d8e559))
* **demo:** Fix breaking changes of motion tokens in demo files [A1-711, A1-717] ([602e0c9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/602e0c9444dd868e6d64ebd0823c5bf1ee8dd337))
* **demo:** Fix prefix/suffix input field focus outline ([f9b5a4d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f9b5a4d045f1e419f4273c6958d97619dc077d6d))
* **demo:** Fix ripple button effect and revert plain button underline animation attempts ([385f35e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/385f35e5f72d457c16f2298d8400db5d5e1b1534))
* **demo:** Remove Accordion outline on click ([#82](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/82)) ([f0b8d0d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f0b8d0d35f0a2af05dbaa3cb1a1e4a743267628b))
* **demo:** Update Checkbox demo with v0.3.0 tokens [A1-716] ([#84](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/84)) ([3a6cda2](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3a6cda2530342bbf86a92fe4006a941f02fc562a))
* **demo:** Update demo files and add first button motion demo [A1-711, A1-717] ([0992989](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/09929897a5a5e858d5d9645877c09c6a7e857b62))
* **demo:** Update Headline demo [A1-715] ([#85](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/85)) ([de2dab1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/de2dab130d2339b46b4f3b5d66422153c5692ee5))
* **demo:** Using the CDN token asset files for the demos ([e5a107c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/e5a107c29ddb45cadf5952bb5ad807dc92b973df))
* **readme:** Remove obsolete latest docs from the token-package README ([75060fa](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/75060fa85a94113d2902b5dc190c757bdf7703f6))
* **readme:** Reworked and updated README files ([1295122](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/129512274a5ab642e64a9ac1b27cf9fa07a183f7))
* **readme:** Updated missing NPM configurations in the readme file ([6357e4e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6357e4eec3124a2843c57a326086b5ccf8556125))

## [0.3.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.2.1...tokens-v0.3.0) (2023-12-05)

### ⚠ BREAKING CHANGES

* **semantic:** Made signal color naming specific for the corresponding surface same as with information colors
* **semantic:** Added missing case-specific on-color for information semantic colors
* **radio-button:** Reworked Radio-Button tokens and preparations for the radio-button tile component
* **icon:** Reworked icon component variant tokens
* **header:** Deleted very early experimental header tokens for now
* **dropdown:** Reworked and refined dropdown tokens
* **checkbox:** Token checkbox-label-gap renamed to checkbox-gap
* **button:** Updated semantic references and deleted unnecessary state tokens
* **badge:** Restructured Badge tokens into subtle and attention variants with updated semantic references
* **text-area:** Adjusted Text-Area stack token and added message and hint text-area inset tokens
* **text-input:** Renamed component Text-Field to Text-Input
* **semantic:** Responsive headline tokens renamed from viewport to breakpoint key word and interactive shortened to action
* **semantic:** Reworked semantic color tokens a.o. deleted alpha disabled and interactive key word shortened to just action
* **core:** Adding new size 150 and new border-radius 200 and deleting border-width 150 in the core tokens
* **core:** Deleted obsolete alpha core tokens and adjusted inverse colors with special alpha values

### Features

* **checkbox:** Adding on-action checkbox variant, needed in the checkbox-tile component ([181f5f5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/181f5f59b92d4280a503fa53148dd4874689adaf))
* **choice-button:** Prepared Choice-Button component tokens ([90d72d5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/90d72d51201efe46470383c086342452956453ec))
* **core:** Adding new size 150 and new border-radius 200 and deleting border-width 150 in the core tokens ([41c4f28](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/41c4f2834eba863b013a3f3ed75314bc35b37441))
* **dropdown:** Reworked and refined dropdown tokens ([d645901](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d64590122c6a255cb0973ed00864a0a36ddc6fcc))
* **icon:** Reworked icon component variant tokens ([94cfb71](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/94cfb714d0c6ca7f8aca98ca131b34ea668a83c6))
* **motion:** Add new motion token theme dimensions for first components ([2c4c358](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2c4c35855afce0dc569ebb7d3593f438f0efee9c))
* **motion:** first proposal for animation design tokens [A1-569] ([21530a0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/21530a0ed0cd4ae5b6deb4eba7514a7caeef808b))
* **motion:** Reworked first motion tokens and add a few more for the first components ([1abf453](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1abf4535f351e5bf910105467a3408b9b4474e37))
* **output-files:** Providing design and motion tokens as tree shakable ES6 Javascript constants [A1-694] ([f83219b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f83219bef5afc51d76499f2e8d57e44c2a263dc3))
* **partials:** Added Input-Field read-only color ([20bfa8a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/20bfa8a1f50981d3883fafe3bdd52178fa0b55ff))
* **switch:** Added initial Switch component tokens ([2dc4534](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2dc4534a60d50fd0710543ce3c89461c8f7df9c1))
* **tab:** Prepared tab tokens in spacious and dense ([6479982](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/64799825b677abeb845890e2ab8518effc9ea2f1))
* **tag:** Added initial Tag component tokens ([48be552](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/48be552cb70498984b3477df5bbf3483c7c51797))
* **tile:** Added initial Tile component tokens ([f7adf88](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f7adf88b5732347d64d8431e59816d47f05b1cd8))

### Bug Fixes

* **accordion:** Add missing Accordion headline gap token and updated color token ([0bb460e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0bb460ef2ecdd8809542b1f2989b33c4639eca3d))
* **accordion:** Updated Accordion border-color ([c4e92d7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c4e92d7e69765232007d6d012123f70d238dd1e9))
* Added missing checkbox group stack ([772843d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/772843d4876e3d637481ac7440dc6c0c94b9e75d))
* **button:** Updated semantic references and deleted unnecessary state tokens ([fc1d961](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fc1d9614d87fbf9f852767f55c8dc1f36ab6e3fb))
* **checkbox:** Token checkbox-label-gap renamed to checkbox-gap ([9cddd28](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9cddd28ba66723e7997157e119f2987518fd8a63))
* **core:** Deleted obsolete alpha core tokens and adjusted inverse colors with special alpha values ([50ede39](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/50ede39bf62ec214117f5c22a3390027f95d7ccb))
* Fix token set order and animation dimension case ([149c5d8](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/149c5d8e4b8709813dff1cf532cbec9851d4ec23))
* **header:** Deleted very early experimental header tokens for now ([d528ee3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d528ee38f1fd65cf6cd391c69509e02895a3e830))
* **link,callout:** Updated semantic references for callout and link components ([666af79](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/666af799f36b338a949d2b40589f9ec6a4d8b52e))
* **partials:** Updated semantic color references for Hint, Indicator, Input-Field and Label ([a075af7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a075af76fdc2d90e6b28640a657149cd8ffbe12f))
* **semantic:** Added missing case-specific on-color for information semantic colors ([8598ccb](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8598ccb58b5ede7c70366fe63fc2a84f3eb9e8e6))
* **semantic:** Made signal color naming specific for the corresponding surface same as with information colors ([fc7a61c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fc7a61c4970716a77e58a8e91c5451385a756b40))
* **text-area:** Adjusted Text-Area stack token and added message and hint text-area inset tokens ([7ce96bd](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7ce96bdbdd6460bce5911895b72bba7fd5e09601))
* **badge:** Restructured Badge tokens into subtle and attention variants with updated semantic references ([1a34a13](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1a34a13e9c5c73ff49045a48326a5c6f1786558c))
* **radio-button:** Reworked Radio-Button tokens and preparations for the radio-button tile component ([f675856](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f67585622f6d3a18600945665b10606b5ea825e9))
* **semantic:** Responsive headline tokens renamed from viewport to breakpoint key word and interactive shortened to action ([d7613b3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d7613b38115e3260e6fe97761440a0751c5165c4))
* **semantic:** Reworked semantic color tokens a.o. deleted alpha disabled and interactive key word shortened to just action ([c6ebdf4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c6ebdf4d732c3396512565e3434a7ebc97541ff6))
* **text-input:** Renamed component Text-Field to Text-Input ([d55dfab](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d55dfab97d927d8ccdc2885c1026a852aaf96740))

### Documentation

* **accordion:** Added Accordion demo PoC example [A1-652] ([#72](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/72)) ([013a6a1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/013a6a164e2c2769332eea1f0c17c1734871088d))
* **radio-button:** Added Radio-Button demo example [A1-687] ([#74](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/74)) ([32b3e06](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/32b3e06f8741dccbaf5bcdcd3a550e70f969ddab))

### [0.2.1](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.2.0...tokens-v0.2.1) (2023-11-17)

### Bug Fixes

* Fix alpha modify reference resolution [A1-670] ([#71](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/issues/71)) ([a7188a0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/a7188a0519d8a98d8d3b9aaf747974c048f2683d))
* **tokens:** delete obsolete plugin beta version $extensions ids ([18711b6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/18711b6db60e02789691d7886be57ff891e94356))

## [0.2.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.1.0...tokens-v0.2.0) (2023-09-28)

### ⚠ BREAKING CHANGES

* **semantic:** Renamed semantic positive to callout color for the button
* Alpha color values updated, Figma specific theme added, reworked accent disabled readonly colors
* **semantic:** Refactored semantic token set

### Features

* **accordion:** Initial tokens for accordion prepared ([818b97f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/818b97fb6379b161eaf0e896567db7cb1d1061d2))
* Added disabled variant to badge (reason: integration of counter badge for dropdown multiselect select count indication) ([9de8d14](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9de8d14fd83197e6011c19dbfb15609a24d44b24))
* Added max-width tokens for each breakpoint. They are not needed for implementation, but help the design library to support min- and max-width. ([c06ea00](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c06ea0088619b623c5d3dc353014d09227e21d13))
* Added shadows to the core ([5932e57](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5932e571525e8dca6d7ba0731102c2f2d90fe24c))
* **callout:** Separated promotional element badge tokens into own callout component ([ffd6cf5](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ffd6cf50ea0ff26f94a8d3f2742c8bcfa2daa4dc))
* Change of elevation tokens  ([4cf33f9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4cf33f986e36b99385ea8c7992779a557f2d9325))
* **checkbox, radio-button:** Updated readonly check/dot now has a distinct color tokens ([1ab721d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/1ab721d39721f20ff69651d99b33eb0855224cd0))
* **core:** Changed value on gray tones ([c9f18e4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/c9f18e4e4ce8ac0b0694ec07857feba1ab7995dc))
* **divider:** Added new divider component and updated dropdown tokens ([2e35368](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2e353687b626f8a3efbfb2765a8ee9575965faec))
* **dropdown:** Reworked Dropdown item and droplist tokens for dense mode ([eb46f83](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/eb46f838c4cd5cf05899a76a443f8b689b3c6b50))
* **elevation:** Added five elevation levels each consisting of two shadows ([140e717](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/140e7177ae015eedd2618a1c0abe84505840b322))
* Finished defining dropdown flyout incl. elevation ([5b6b074](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5b6b074b0fc55b735de340e243dd76ec905e3687))
* First draft elevation tokens in semantic layer  ([42fd129](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/42fd129d9a434a0ced54a630f0e5484be15dcb36))
* **grid:** Add reworked Grid tokens ([7e5783e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7e5783e0cfeca685c02fefd4332da0963640c1ec))
* Issue with the plugin and communication ("blue dot") of unsent changes ([b1e3292](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b1e3292ed0c86201e3804d6d79390c3950f9a3fa))
* **radio-button:** Added interaction styles to selected radio button ([2db6a51](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2db6a5145c918958641cdefae2642fe8d6abaca4))

### Bug Fixes

* Added missing alpha values ([9561f7b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9561f7bc2108e22e7707fb292168028a615910c7))
* **badge:** Added missing badge border-radius ([d059000](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d059000d62cc5e7fb252408d83e3dcda30b61af9))
* **badge:** badge was located under partials, now it is a component ([9640a62](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/9640a623760d84ae546543f86c6f0d77eeaa0c39))
* **badge:** Fixed callout color from blue to yellow ([4149d38](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4149d385207c70352374c7f6d54986a1dcc1e91f))
* **badge:** Fixed wrong badge color variant names ([8859095](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/88590950ad3db9f5f24bb4a9986433b6c4398afd))
* **callout:** Fixed missing callout border-radius ([7527d2a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7527d2a4bd67fd0e6ee0f06c67bf71f2db7643ff))
* **callout:** Fixed wrong callout color name ([4ae6630](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/4ae6630aa1d688051fec081cd364c17ca6c7cc8d))
* Changed button variant naming from callout to attention ([41c1d92](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/41c1d92986006b21c4e1b9c88c0eca03de3772d5))
* Changed component & partial structure to include "default" for light/spacious tokens ([f5e58d3](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f5e58d3b5eeb81b7c65c9bafff80dcf2aa64de1e))
* **checkbox, radio-button:** Fixed inverse disabled colors ([90f7d1a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/90f7d1a10a6d25935e5b841957f6a9904b7cbbf7))
* **checkbox, radio-button:** Fixed wrong surface/border color naming for checkbox and radio button ([85af41f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/85af41f92cceac1d445a076410a08ae4aded833c))
* Filter out private tokens again [A1-650] ([f2d926d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f2d926dd126a76c925611744cf2e057871d6675f))
* **indicator:** Fixed spacious button plain m count indicator placement ([04ac266](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/04ac266285bb1e6327b55d806a70ab1544cc6cea))
* **input-field:** Replaced private Figma only input height with min-height ([f4ca27c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f4ca27cf2dd6656e3259a1307bea19b80b6ac15f))
* **radio-button:** Add missing dense border-width token to temporarily fix build ([edddf61](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/edddf61657876b7392187a676fd00890b6a35c49))
* **radio-button:** Replace missing dense border-width token with its semantic token reference to fix build ([0bbc2a6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/0bbc2a6e3dc0aba0e26afaccc4cb3800a89e22f9))
* **semantic:** Aligned transparency method in dark tokenset to alpha modifier instead of rgba ([285c556](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/285c556781593c75146e5fa15f9af59e0ae51989))
* **semantic:** Fixed spacious static/dynamic spacing scale ([ed54b11](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/ed54b11682e67174d18a97d773736959cff54209))
* **semantic:** Refactored dark colors according to light refactoring ([cef173e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cef173e2071a27f394d6094e12fac09b0292386a))
* **semantic:** Renamed semantic positive to callout color for the button ([cf9924a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cf9924ac9b32518df281e681b0aa0bbce9ee6072))
* **token-order:** Add manual sorted selectedTokenSets and detailed comment about JS object property order safety [A1-661] ([76e9cf7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/76e9cf72664dbfa83807d48f967c9a48eea9a75a))
* Alpha color values updated, Figma specific theme added, reworked accent disabled readonly colors ([25e2ced](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/25e2ced518b9c88ce37e582463a2f7119fbf4434))
* **semantic:** Refactored semantic token set ([d20e610](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/d20e61009865cb7cea2e6af385e15fb80c065ead))

## [0.1.0](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.0.7...tokens-v0.1.0) (2023-08-17)

### ⚠ BREAKING CHANGES

* Refactored token structure to be more multi-dimensional theming complaint
* **indicator:** Reworked partial indicator details
* **partials:** Removed "partial" from token names in the partial sets
* New token set structure for partials and components

### Features

* **badge:** Finalized badge component tokens ([f024657](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f024657a979986681a45450718ef6f5187621c0f))
* **badge:** Prepared badge component tokens ([639544d](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/639544d7f3712493c8d52d6fcb47e07d0315a4f3))
* New token set structure for partials and components ([2fb96cf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2fb96cf017088403e271c62ad48e6d0596baf28d))
* **partials:** Removed "partial" from token names in the partial sets ([47d03a6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/47d03a60eea26d31369fb5c8d1b3701daff567ae))
* Refactored token structure to be more multi-dimensional theming complaint ([391794b](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/391794b58b9b6e92ebe9be21b2987f3f95b0c2fd))

### Bug Fixes

* **color-schemes:** Replace leftover hardcoded box-shadow values with core token references ([0173663](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/01736630b8f7dfcaa3af8bc1ca353acd2d043657))
* Fix unnecessary whitespaces and delete duplicate viewport core tokens ([8d775c4](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/8d775c4051349fc7df76fe1bd56c9212c4f03c19))
* **indicator:** Reworked partial indicator details ([7da88ac](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/7da88acf7048c0ccf4e8bb4cfe28573835bdbc32))

### Documentation

* **checkbox-radio-button:** align checkbox and radio button micro animation poc [A1-523] ([166c797](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/166c79759ef6a134acd8a9bfa2ec0bcc82b18d64))
* **radio-button:** radio button border animation [A1-523] ([2fd3c0c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2fd3c0c5dcc6211291fca1544321914c42ca942b))

### Refactors

* Moved both densities and color-schemes folder under a semantic folder ([5f8390f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/5f8390f1d67cd4378609edecc0d3683862194d18))

### [0.0.7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.0.6...tokens-v0.0.7) (2023-06-30)

### Features

* **badge:** prepared first badge tokens WIP ([6fe300c](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6fe300c173db2e02e8bc923ac92f0deb52d4ae40))
* **checkbox:** add checkbox tokens ([71c910e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/71c910e3470ddd972d148b42565eb2c6ce3c281d))
* **icon:** add icon tokens ([6bff994](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6bff9942b86b3297cae2ffaf4304225d244fd3e4))
* **label:** add additional "optional" marker text styles ([cf33009](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cf33009c241482f7b469ccbe5b0239a302d16c72))
* **radio-button:** add radio button input tokens ([2cfe063](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2cfe063b2ab7f029eb4857198d34492af8fa0e58))
* **semantic:** add missing dynamic spacing sets (2 + 3 steps down) ([10c0fb9](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/10c0fb9c9558ddb3adb49304e1206b9c143af572))

### Bug Fixes

* **core:** change yellow 100 due to contrast issues ([78ce7c7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/78ce7c7eac0cd3edf5500269f264fc34c63e8d14))
* **focus:** deleted focus partial and put styles back to semantic layer ([47894ef](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/47894efed201d3211a7b1d74749d740a49130d52))
* **semantic:** add a couple more sizes to the semantic layer ([2c05f55](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2c05f55abccdd0365aa854bf5cfa56b96f6cd1a3))
* **semantic:** add missing graphics inverse semantic color tokens ([80aafaf](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/80aafaff9de3ad1e4c0bc2d33232fc17147877f2))

### [0.0.6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/compare/tokens-v0.0.5...tokens-v0.0.6) (2023-06-01)

### Features

* **focus:** Focus is now represented as own partial ([361380e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/361380e2caff35e83f8a867870c7c06ab8bea552))

### Bug Fixes

* **core:** Rename breakpoint to viewport ([2b5038e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2b5038eb27aa1bdb5f690d60c023dec9fc716996))
* **font-family:** fix font family name in quotes [A1-493] ([3b6aea7](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/3b6aea746d6a7ff725838f3d8fe9c9dc16663f09))
* **message:** notification partial renamed to message ([646c401](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/646c40182b9eef82440a61720f756d79b7d9cccf))
* **semantic:** Border-width decision of 1px in order to prevent sub-pixel rounding issues ([28e7657](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/28e765768271ce7436b32d0fdbcb2815f11eeee0))
* **semantic:** Button sizes renamed to t-shirt sizes (m always default, will be part of the docs) ([27009f6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/27009f6b520ed26e684a3440b96e273b83719393))
* **semantic:** Combining static and dynamic spacings in the semantic layer ([fd46c9f](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/fd46c9fd705d2ebb14aed624e0eac3f574b6a758))
* **semantic:** Inverted was renamed to inverse (saved 1 character) ([72ed01e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/72ed01e74cd0e371816657fa771cd75ca7a45e1f))
* **semantic:** Only adds relevant viewport-l headline responsive tokens ([dd4ab4a](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/dd4ab4ad3d5482c6833c2286541bf226b8bc66ac))
* **semantic:** Restructuring t-shirt sizes for the headlines ([b676efc](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/b676efc57ad0863fa1dbae5bdc0b6dfd559ee6a4))
* **semantic:** Token name shortening of text-style to just text ([2f28649](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/2f2864986d22cd8cd23a7b8d46a73bf614390598))
* Several renaming, restructurings in semantic and their reference token updates in the partials and components ([f76887e](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/f76887e28476b2eded3a5e0a599db17e82ce5324))
* **text-decoration:** fix text-decoration to be in lower case [A1-494] ([6d206c6](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/6d206c6d02503e54b8ac6aaf980e75923117c5d7))
