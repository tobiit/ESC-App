# Builder Changelog
All changes of the token build process will be documented in this file. See [@allianz/a1-design-token changelog](https://github.developer.allianz.io/a1/design-tokens/blob/main/token-package/CHANGELOG.md) for a detailed history of the A1 design tokens single source of truth (SSOT).
## [1.2.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v1.1.2...builder-v1.2.0) (2026-02-09)


### Features

* prepared puml token file format [A1-1128] ([22062ba](https://github.developer.allianz.io/a1/design-tokens/commit/22062baaa3b3df5208915a781029a3f889056cc3))


### Refactors

* add shared logger suppression mock for cleaner unit test result outputs ([da90d6e](https://github.developer.allianz.io/a1/design-tokens/commit/da90d6ee415ada032516e68ea8d6fae8b72ca8fb))
* code restructure for more targeted CDN asset manipulation ([e73ef2f](https://github.developer.allianz.io/a1/design-tokens/commit/e73ef2f855437596aafb82ee8d7d79f9b684a121))
* improve dist-versioning implementation ([9955454](https://github.developer.allianz.io/a1/design-tokens/commit/9955454722c3be1e4ed686fc4aee0ff4cfaedf76))


### Testing

* refactor the general logger mocking for all tests ([6e335ea](https://github.developer.allianz.io/a1/design-tokens/commit/6e335ea09f156c4e62e42b4c401cbc2c0db005c6))

### [1.1.2](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v1.1.1...builder-v1.1.2) (2025-12-17)


### Bug Fixes

* delete legacy or obsolete Figma styles ([27a5dd4](https://github.developer.allianz.io/a1/design-tokens/commit/27a5dd4287eb017d36227368bbd38b3d655312ba))
* still write a dist-history entry also if comment is empty ([03d6951](https://github.developer.allianz.io/a1/design-tokens/commit/03d6951d96939e4eb4fa4415006b72fee78e2e16))

### [1.1.1](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v1.1.0...builder-v1.1.1) (2025-12-11)


### Bug Fixes

* expr-eval subdenpendency vulnerability fix ([cb295d8](https://github.developer.allianz.io/a1/design-tokens/commit/cb295d85130bc932590bd128b7dbc21e369fbc52))

## [1.1.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v1.0.0...builder-v1.1.0) (2025-11-18)

### Features

* provide easier mixin imports via general design-token mixin barrel file ([cf81932](https://github.developer.allianz.io/a1/design-tokens/tree/main/token-package/commit/cf8193220eead4be8c1e7859f34c1558227da197))

## [1.0.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.4.1...builder-v1.0.0) (2025-10-29)

### ⚠ BREAKING CHANGES

* delete unused SCSS map token file
* renamed design system name interims name azds back to a1 in code
* support multiple design systems per brand [A1-1062]

### Features

* support multiple design systems per brand [A1-1062] ([5cee7e3](https://github.developer.allianz.io/a1/design-tokens/commit/5cee7e325fb24493e59b3c1388d5f1db2038a3c8))

### Bug Fixes

* delete unused SCSS map token file ([2086456](https://github.developer.allianz.io/a1/design-tokens/commit/2086456ff8dfe85dfe2e976e25398617691c1b33))
* **dist-versioning:** improve manual version bumping process ([350d6b1](https://github.developer.allianz.io/a1/design-tokens/commit/350d6b1ca1db05b1cb02f1ac4b8369806eb096d0))
* filter out blacklisted selected token set paths during themes sorting [A1-1017] ([90f46b1](https://github.developer.allianz.io/a1/design-tokens/commit/90f46b18974a4d942afa5905e0c4033d79599fc5))
* filter out new blacklisted theme groups [A1-1017] ([217aa41](https://github.developer.allianz.io/a1/design-tokens/commit/217aa413d566df4a93fc266a1991d7c7f2f18cd4))
* **inset:** ignore internal factor inset tokens [A1-1017] ([cd37b51](https://github.developer.allianz.io/a1/design-tokens/commit/cd37b51389bf5e26019caca4eb524f0cad469fe1))
* rem-unit conversion as round-up step and not as SD action [A1-772] ([a792924](https://github.developer.allianz.io/a1/design-tokens/commit/a79292441b775a41807cb24f642c94c58b6ee987))

### Testing

* fix failing tests after build pipeline refactors and fixes ([82361ca](https://github.developer.allianz.io/a1/design-tokens/commit/82361caee5f8e4dafe7486bf2a972f80a233d751))

### Refactors

* DCTG value type property changes to $value and $type [A1-932] ([5f2d560](https://github.developer.allianz.io/a1/design-tokens/commit/5f2d560caa8350013a47da25301f6ff4559b75f4))
* rem-unit conversion as round-up step and not as SD action [A1-772] ([cfb331f](https://github.developer.allianz.io/a1/design-tokens/commit/cfb331f1638b78774a8028849ab7974615b70e9e))
* renamed design system name interims name azds back to a1 in code ([28ae383](https://github.developer.allianz.io/a1/design-tokens/commit/28ae383e441fb07767f30110832393402d9b4aa7))

### Documentation

* update README files ([b215b1b](https://github.developer.allianz.io/a1/design-tokens/commit/b215b1b1a5ae1dcd87c80c8921e32d5a5f0d4c2d))

### [0.4.1](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.4.0...builder-v0.4.1) (2025-09-24)


### Features

* **ci-cd:** add npm package custom verification step [A1-1018] ([85974e6](https://github.developer.allianz.io/a1/design-tokens/commit/85974e63b4a4a42432a2972d289d312785dabe98))


### Bug Fixes

* **ci-cd:** missing dist folder in NPM packages fixed [A1-1018] ([b47aad2](https://github.developer.allianz.io/a1/design-tokens/commit/b47aad2996b561baa6db3cc8b2167df32d35c733))


### Refactors

* **ci-cd:** improve npm package custom verification step [A1-1018] ([7505142](https://github.developer.allianz.io/a1/design-tokens/commit/750514292f3bf6630a6ab0b03cc331e61ffaa52d))

## [0.4.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.3.5...builder-v0.4.0) (2025-08-14)

### Features

* **responsive-integration:** generically enhance breakpoint diffing not only for m and l breakpoints ([f5014b6](https://github.developer.allianz.io/a1/design-tokens/commit/f5014b6dd63be3f3a1d71643b630c652a3f7c379))


### Bug Fixes

* **ci/cd:** fix Cloudflare R2 bucket single file deployment of dist-history.json [A1-902] ([10eb5ea](https://github.developer.allianz.io/a1/design-tokens/commit/10eb5ea26f31e1bf43155d1b768b5270c2854b31))
* **dist-versioning:** decouple adding dist-history entries from adding version to output file comments [A1-902] ([e32f639](https://github.developer.allianz.io/a1/design-tokens/commit/e32f639410a03ae1647f113e317bdd1fd9152531))


### Testing

* add testing instruction with corresponding prompt file and add disclaimer comment [A1-216] ([f70dd00](https://github.developer.allianz.io/a1/design-tokens/commit/f70dd00faed7f84662f8fdc88f540fa9a4fa2603))
* **ci:** set mandatory 100% code coverage for CI/CD pipeline [A1-216] ([19b21c7](https://github.developer.allianz.io/a1/design-tokens/commit/19b21c792eed7d8b393261d7864b4a0691ceb7d3))
* **color-eight-digit-hex:** add 100% code coverage with unit tests [A1-216] ([a454d0e](https://github.developer.allianz.io/a1/design-tokens/commit/a454d0ea5c3baa7f9af7c669f134b393cdf0536f))
* **cubic-bezier-wrap:** add 100% code coverage with unit tests [A1-216] ([1a1be55](https://github.developer.allianz.io/a1/design-tokens/commit/1a1be5530c8e625561d6a0f52af895c70355f43c))
* **dist-files-utils:** add 100% code coverage with unit tests [A1-216] ([89b82ad](https://github.developer.allianz.io/a1/design-tokens/commit/89b82adc3212aa80192552556908edcd6a1270fc))
* **dist-history-utils:** add 100% code coverage with unit tests [A1-216] ([e6974bf](https://github.developer.allianz.io/a1/design-tokens/commit/e6974bf8bee07ed40fff44f578d83da5beb58031))
* **dist-versioning:** add 100% code coverage with unit tests [A1-216] ([3ec7f30](https://github.developer.allianz.io/a1/design-tokens/commit/3ec7f307c82c71a712ca49eee511e6091b2d647f))
* **exclude-tokens-filter:** add 100% code coverage with unit tests [A1-216] ([f64f418](https://github.developer.allianz.io/a1/design-tokens/commit/f64f418e5876001c2d0c61c5d6b866362b6214da))
* **extract-inset-value-shorthands:** add 100% code coverage with unit tests [A1-216] ([d960a4c](https://github.developer.allianz.io/a1/design-tokens/commit/d960a4cb9459fea9037ce9383893b00dbf848f60))
* **extract-unsupported-component-font-properties:** add 100% code coverage with unit tests [A1-216] ([8ae8291](https://github.developer.allianz.io/a1/design-tokens/commit/8ae82919b14ada442dd6a6a6f67ed717eb91fee5))
* **file-header:** add 100% code coverage with unit tests [A1-216] ([224555e](https://github.developer.allianz.io/a1/design-tokens/commit/224555e3ec43ded17b8540373f75840b8e2e47be))
* **file-helper:** add unit tests for 100% code coverage [A1-216] ([052d087](https://github.developer.allianz.io/a1/design-tokens/commit/052d087e47fea446179704a804da5c12746ad90e))
* **general-configs:** add 100% code coverage with unit tests [A1-216] ([df60f5c](https://github.developer.allianz.io/a1/design-tokens/commit/df60f5cc7d6926a2d15c1ee1681daa31f6c6fbce))
* **general-constants:** add 100% unit test code coverage [A1-216] ([219163e](https://github.developer.allianz.io/a1/design-tokens/commit/219163ea627f129b7979bf7dde28823aebd0659b))
* **inset-shorthand-calc-fix:** add 100% code coverage with unit tests [A1-216] ([4c24142](https://github.developer.allianz.io/a1/design-tokens/commit/4c241421b0714443201c73f672efd58d23d464f0))
* **logger-misc:** add unit tests for 100% code coverage [A1-216] ([aef5758](https://github.developer.allianz.io/a1/design-tokens/commit/aef57582da3caa7e2b67ac89e427d5e0abe55bd6))
* **lower-case-linear-gradient:** add 100% code coverage with unit tests [A1-216] ([f641ad9](https://github.developer.allianz.io/a1/design-tokens/commit/f641ad9b7a5c7641d4a010c266a19addaf30cb88))
* **math-function-resolver:** add 100% code coverage with unit tests [A1-216] ([90acd02](https://github.developer.allianz.io/a1/design-tokens/commit/90acd028f1a68f0e529f004a6be7313e59b16764))
* **object-utils:** add unit tests for 100% code coverage [A1-216] ([1c66e13](https://github.developer.allianz.io/a1/design-tokens/commit/1c66e134585ed31b65d36906cb85ac767ccc4ab9))
* **output-file-configs:** add 100% code coverage with unit tests [A1-216] ([c00f56b](https://github.developer.allianz.io/a1/design-tokens/commit/c00f56bca2cfd21627871e1ccf52a290bb9a500e))
* **package-version:** add unit tests for 100% code coverage [A1-216] ([f862c1d](https://github.developer.allianz.io/a1/design-tokens/commit/f862c1dae7ffd21f0afa14788817066d9a29b586))
* **platform-configs:** add 100% code coverage with unit tests [A1-216] ([04f31ec](https://github.developer.allianz.io/a1/design-tokens/commit/04f31ec7ee5e263d38ff85a3b0119c9cc2faa045))
* **preparations:** add 100% code coverage with unit tests [A1-216] ([40a08dd](https://github.developer.allianz.io/a1/design-tokens/commit/40a08dd997d28edbff9728c1f4112f54af3570fb))
* refactor a few mocked function types into the respective mock data test files [A1-216] ([dbd94d8](https://github.developer.allianz.io/a1/design-tokens/commit/dbd94d81d7855d7a492d0551b1ce0535fd3f74b5))
* refactors after in depth test code review [A1-216] ([3280376](https://github.developer.allianz.io/a1/design-tokens/commit/3280376b8c1d0b7e56c8afab76e2b7ef50f5ae49))
* **remove-unsupported-font-properties:** add 100% code coverage with unit tests [A1-216] ([450aa1b](https://github.developer.allianz.io/a1/design-tokens/commit/450aa1bf338b26bf59b64f8f27650c896b1cd1aa))
* **responsive-integration:** add 100% unit test code coverage [A1-216] ([9565bef](https://github.developer.allianz.io/a1/design-tokens/commit/9565befc0391018824404c58ec6d7568ddf5f0b2))
* **responsive-integration:** adding tests for helper functions permutate-breakpoint-pairs and media-query-generator [A1-216] ([37496f6](https://github.developer.allianz.io/a1/design-tokens/commit/37496f6cfaf55bf99ecb20892e8c805a4a7b6028))
* **responsive-integration:** prepare unit tests for 100% code coverage [A1-216] ([aa2c073](https://github.developer.allianz.io/a1/design-tokens/commit/aa2c073db1ae04cedf062dc9105d859fe55059fc))
* **semver-utils:** add 100% code coverage with unit tests [A1-216] ([9b35d13](https://github.developer.allianz.io/a1/design-tokens/commit/9b35d1394a3c77426b4cd27608461cc0b25752be))
* **signale-logger:** add unit tests for 100% code coverage [A1-216] ([3740c7f](https://github.developer.allianz.io/a1/design-tokens/commit/3740c7f8d95e77e3d748f81f595a515677a386ee))
* **style-dict-build:** add 100% code coverage with unit tests [A1-216] ([28980fd](https://github.developer.allianz.io/a1/design-tokens/commit/28980fdf234c7fa4a840d35ee317a06c12ae05bc))
* **theme-combinator:** add 100% code coverage with unit tests [A1-216] ([b90c5ab](https://github.developer.allianz.io/a1/design-tokens/commit/b90c5abd1fb36dcbb5937b1a76a91e3cc04b4ab9))
* **theme-sorter:** add 100% code coverage with unit tests [A1-216] ([3b470c5](https://github.developer.allianz.io/a1/design-tokens/commit/3b470c530fca977c73b6899a9c121ad0878336a2))
* **time-stamps:** add unit tests for 100% code coverage [A1-216] ([e53f092](https://github.developer.allianz.io/a1/design-tokens/commit/e53f092e94e02aad0cbbcd1ef9ac06b400d76ccc))
* **token-loader:** add 100% code coverage with unit tests [A1-216] ([84dad03](https://github.developer.allianz.io/a1/design-tokens/commit/84dad03f05a344b61196ad21df11908566958698))
* **token-loader:** add 100% code coverage with unit tests [A1-216] ([dbd1e21](https://github.developer.allianz.io/a1/design-tokens/commit/dbd1e21ce2389cb62c8b46de0df3ec7896aa206d))
* **token-set-extension:** add 100% code coverage with unit tests [A1-216] ([2d21390](https://github.developer.allianz.io/a1/design-tokens/commit/2d21390f077f7440cc5b356050a7972c6a03738d))
* **token-utils:** add unit tests for 100% code coverage [A1-216] ([b243b6c](https://github.developer.allianz.io/a1/design-tokens/commit/b243b6ca01af564c87c196a0edc505eb1c5a81d7))
* **user-prompt:** add 100% code coverage with unit tests [A1-216] ([30df7b3](https://github.developer.allianz.io/a1/design-tokens/commit/30df7b3f22e6ed5b4c028fdea3f3bacf83535e4b))


### Refactors

* add small code improvements for the responsive-integration implementation ([44be607](https://github.developer.allianz.io/a1/design-tokens/commit/44be607279e0378238638fd561d5145762b97fbb))
* move helpers and preparators into individual folders as preparation for their coming test files [A1-216] ([f9dbf8b](https://github.developer.allianz.io/a1/design-tokens/commit/f9dbf8beb3d4a13182eed24fd635d4f09ec175b5))
* move the SD transform hooks into respective folders as a preparations for upcoming test files [A1-216] ([c574d1f](https://github.developer.allianz.io/a1/design-tokens/commit/c574d1fa4fecd99f347caac0a3e605bfad37a279))
* moved output-file and platform configs into respective folders as preparation for their test files [A1-216] ([56e6d8d](https://github.developer.allianz.io/a1/design-tokens/commit/56e6d8d3a173f2b98fcd809356a341b384866600))
* **responsive-integration:** clean up after generically enhance breakpoint diffing refactor ([08a3a40](https://github.developer.allianz.io/a1/design-tokens/commit/08a3a40ae31ad7a7ee6f37770a17083d7bab09ec))
* **responsive-integration:** preparing for flexible mobile first breakpoint comparison ([4485866](https://github.developer.allianz.io/a1/design-tokens/commit/448586687c6ff2bdffbdd3d3daba98410580c725))
* restructure shared/utils project scaffolding ([00ce9e7](https://github.developer.allianz.io/a1/design-tokens/commit/00ce9e7c0be2be57a519f924894ab42e8b72bfb5))
* **tests:** update prompts, context details, test descriptions and improve testing logs with less cluttering [A1-216] ([bec37ab](https://github.developer.allianz.io/a1/design-tokens/commit/bec37ab5b7d99c811b138052efadec2033481569))
* **versioning:** move versioning helpers into separate folders [A1-216] ([f432ef0](https://github.developer.allianz.io/a1/design-tokens/commit/f432ef0d7b6ac6444c684426f6441371a3cf2e05))

### [0.3.5](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.3.4...builder-v0.3.5) (2025-05-23)


### Bug Fixes

* adding dist-history copy to cdn folder for CI/CD build run [A1-902] ([d7f0d6c](https://github.developer.allianz.io/a1/design-tokens/commit/d7f0d6ccc9a44bb23a4745c187960c82e1962a8a))
* **tests:** fix missing selectedTokenSet theme sorter for dark mode color scheme [A1-943] ([148b7ff](https://github.developer.allianz.io/a1/design-tokens/commit/148b7ffa7bb0745f7396a147c2ae544a573e81f0))


### Refactors

* **token-file-path-sorter:** improved implementation for easier unit testing ([44fb372](https://github.developer.allianz.io/a1/design-tokens/commit/44fb372215c982e9fd1ce0c2266a5c67f690b9c3))

### [0.3.4](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.3.3...builder-v0.3.4) (2025-05-21)


### Features

* allow brand name definition for the token output folder [A1-920] ([959f070](https://github.developer.allianz.io/a1/design-tokens/commit/959f07031efaae09616badea138e8e2a5deaf87b))
* automatically generate responsive integrated CSS Output File Assets [A1-928] ([12999b7](https://github.developer.allianz.io/a1/design-tokens/commit/12999b7c2acfe6afab75eebc70d265164acb8ed7))
* **ci:** add token builder package CI and CD pipeline steps ([d3fcf7b](https://github.developer.allianz.io/a1/design-tokens/commit/d3fcf7b142b8c39e1df0cac81475e18be1e8668d))
* having the tokens SSOT as separate package ([684875a](https://github.developer.allianz.io/a1/design-tokens/commit/684875a62e764f41e9c2c11f7f5f8f89ce04f3d2))
* prepare copying of A1 SSOT tokens to oe token extension folder ([62b2d29](https://github.developer.allianz.io/a1/design-tokens/commit/62b2d296785468d0527d5df4df1ddc435c6a7bad))
* providing the design-tokens-builder as separate package, including the tokens SSOT ([ae1331d](https://github.developer.allianz.io/a1/design-tokens/commit/ae1331d8a1bddf5772205c09c9654bf74c59e5d3))


### Bug Fixes

* add none breaking $theme.json changes like order of properties [A1-919] ([56bb2e2](https://github.developer.allianz.io/a1/design-tokens/commit/56bb2e2040c87ae53aac7552a871e67f61d9eff3))
* delete legacy linting rule disables ([af84a38](https://github.developer.allianz.io/a1/design-tokens/commit/af84a38da034c2be4c90b18b89cddc35fec2dc99))
* delete obsolete calc result backup value ([ed7d6db](https://github.developer.allianz.io/a1/design-tokens/commit/ed7d6db69a688864d3796412414d6ba5a6f0968b))
* deprecated linting rules replaced by new alternatives ([5c79397](https://github.developer.allianz.io/a1/design-tokens/commit/5c7939778677aed17d453290eb245a962b3844d6))
* dynamically create breakpoint density theme group combination for build pipeline [A1-919] ([3118ae5](https://github.developer.allianz.io/a1/design-tokens/commit/3118ae5f72500c063340b0e408add1b20ace2ba6))
* migrate eslint to v9.26.0 and ESlint flatConfig ([d4f970a](https://github.developer.allianz.io/a1/design-tokens/commit/d4f970a4ee6943c41787bf0d008325158eb2174d))
* revert hardcoded typography calculation result workarounds ([67b808e](https://github.developer.allianz.io/a1/design-tokens/commit/67b808ee8bd3664ed1202cdc80dadfd6b198c983))
* ts-jest configuration setup ([8a866ad](https://github.developer.allianz.io/a1/design-tokens/commit/8a866ad915faca9ed7250d17f51ed2b9c7665a21))
* update selectedTokenSets theme sorter for order logic in semantic layer [A1-919] ([369886e](https://github.developer.allianz.io/a1/design-tokens/commit/369886e2eb290e5aff0bf7ced7ef216926278d80))


### Refactors

* **ci:** restructure CI/CD pipeline for better configuration reuse ([5ecd16a](https://github.developer.allianz.io/a1/design-tokens/commit/5ecd16aa0c540ca2c39a1d93ea695350d050034b))
* clean up and delete temporary workaround responsive integrated CSS output files [A1-928] ([c6b03b0](https://github.developer.allianz.io/a1/design-tokens/commit/c6b03b0dd93f679a75875792682c38f64895193b))
* decouple actual token build pipeline entry point and call of it ([c7c2b1f](https://github.developer.allianz.io/a1/design-tokens/commit/c7c2b1f8783a9d79fa3e127ad19879080b717b07))
* decouple special token name keys from token type definitions ([3984285](https://github.developer.allianz.io/a1/design-tokens/commit/39842851b74147edc2df918108359b17de73a5d2))
* replace eslint-plugin-sort-exports with eslint-plugin-perfectionist/sort-exports ([0437c38](https://github.developer.allianz.io/a1/design-tokens/commit/0437c38b80ecf4b3bf880ead898ba8b219acd4b2))
* slight code improvements for responsive-integration ([6a3d115](https://github.developer.allianz.io/a1/design-tokens/commit/6a3d115660722f2a48d383c44f0581c6fd7b489c))

### [0.3.3](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.3.2...builder-v0.3.3) (2025-03-18)

### Bug Fixes

* remove unwanted whitespace in disabled token mix color values ([c3c3542](https://github.developer.allianz.io/a1/design-tokens/commit/c3c35423462ee1a651b783c954b86a80654f6fe4))

### [0.3.2](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.3.1...builder-v0.3.2) (2025-03-18)

### Bug Fixes

* fix wrong inset-shorthand-calc-fix transform name ([51290bd](https://github.developer.allianz.io/a1/design-tokens/commit/51290bd3d6c9a498ebd6d4f053ae9215434f1baa))
* updating to new DTCG token types ([9ac2248](https://github.developer.allianz.io/a1/design-tokens/commit/9ac22481463cb697e329e5805d3de1ff7e09fe98))

### Documentation

* **demos:** remove duplicate body s letter-spacing style in the typography demo token usages ([56dc5c5](https://github.developer.allianz.io/a1/design-tokens/commit/56dc5c5ec7131a366fcd7d0273648d58a99ddbca))

### [0.3.1](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.3.0...builder-v0.3.1) (2025-03-12)

### Features

* **ci:** having CI/CD package registry and CDN connection health checks [A1-901] ([5bc7f6a](https://github.developer.allianz.io/a1/design-tokens/commit/5bc7f6a798dc9b0614c880301171dcb324a09319))

### Documentation

* **demos:** remove old shorthand key word from the typography demo token usages ([79ce426](https://github.developer.allianz.io/a1/design-tokens/commit/79ce426ea40751c2881d2f62465bda525956bcc4))

## [0.3.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.2.5...builder-v0.3.0) (2025-03-07)

### ⚠ BREAKING CHANGES

* Migrate to Typescript and Style-Dictionary 4
  * Refactor to the build-in Style-Dictionary v4 Preprocessing Hooks [[A1-714](https://jmp.allianz.net/browse/A1-714)]
  * Preserve Token References in Output Files theoretically possible now [[A1-442](https://jmp.allianz.net/browse/A1-442)]
  * Replace "scaling" Custom Token Type with "number" [[A1-803](https://jmp.allianz.net/browse/A1-803)]
  * Change inset right/left to start/end [[A1-833](https://jmp.allianz.net/browse/A1-833)]
  * Duplicate Dist Folder Nesting [[A1-836](https://jmp.allianz.net/browse/A1-836)]
* Major version bump of Style-Dictionary and Tokens-Studio/sd-transforms
* Solve most of the breaking changes from Style-Dictionary v4 version bumping
* revert Style-Dictionary version bump back to v4.3.0

### Features

* add migrator script and update with real first migration mappings [[A1-801](https://jmp.allianz.net/browse/A1-801)] ([#115](https://github.developer.allianz.io/a1/design-tokens/issues/115)) ([eaa761a](https://github.developer.allianz.io/a1/design-tokens/commit/eaa761a6d1d0046392b07803c40a1473c3a11610))
* Improve logical token set error debug message ([8a8ebcc](https://github.developer.allianz.io/a1/design-tokens/commit/8a8ebcc5a9fba376ea5338457ba42a27806123e2))
* **ci:** Add automatic Cloudflare R2 bucket token asset file deployment step [[A1-731](https://jmp.allianz.net/browse/A1-731)] ([3a3faa3](https://github.developer.allianz.io/a1/design-tokens/commit/3a3faa34cfe8cadab6c98292899f06a65d7119d9))

### Bug Fixes

* add breaking math function preprocessor debugger and resolver ([334255b](https://github.developer.allianz.io/a1/design-tokens/commit/334255b943d39f6128868f7abd2614c66b5c6b77))
* add necessary token set adjustments like moving composites.json into default folder ([e28357c](https://github.developer.allianz.io/a1/design-tokens/commit/e28357c74be54aed953e98a6fd129a2479838f40))
* combine filters into single one in order to be properly applied [[A1-877](https://jmp.allianz.net/browse/A1-877), [A1-878](https://jmp.allianz.net/browse/A1-878)] ([af9949d](https://github.developer.allianz.io/a1/design-tokens/commit/af9949d152e6b0edd0424a5632e6b66e8f33311d))
* delete duplicate whitespace in token value calculation ([5688d7a](https://github.developer.allianz.io/a1/design-tokens/commit/5688d7a6f0bc84dbc1c35dd1b1bf963d2bc52cf3))
* filter out component theme groups and use densities theme group for adding breakpoint theming dimension ([4546c12](https://github.developer.allianz.io/a1/design-tokens/commit/4546c12f2aacc3d5a373923238122b6dbc44d33e))
* Fix CI pipeline build reruns and add missing dist-history.json copy within CDN folder ([e0939b3](https://github.developer.allianz.io/a1/design-tokens/commit/e0939b32a175647f03126c2221048f7502a65b00))
* Fix missing error handler import ([897c976](https://github.developer.allianz.io/a1/design-tokens/commit/897c97625f21a961212f06ad5bb6d345feed62e8))
* fix theme token set sorter ([5cd4e9c](https://github.developer.allianz.io/a1/design-tokens/commit/5cd4e9cb1531ead42ee36fb50ba17fe13bee710e))
* Make sure semantic/composites.json is in the right order during preprocessing ([2f4371b](https://github.developer.allianz.io/a1/design-tokens/commit/2f4371be60b270a7e58a183c4a00140a8167a773))
* replace breakpoint ranges in token output file names with dedicated breakpoints ([dbb00f1](https://github.developer.allianz.io/a1/design-tokens/commit/dbb00f14c18b7b454bc3eceab2329a4561a97c5b))
* revert Style-Dictionary version bump back to v4.3.0 ([2abe476](https://github.developer.allianz.io/a1/design-tokens/commit/2abe476d1ecefd9681cdafd666a5a089cd87474d))
* wrap all dynamic token calculations in brackets ([cb2b42f](https://github.developer.allianz.io/a1/design-tokens/commit/cb2b42f314243a0af0391879410af4c90e905150))
* corrected main build script command
* **ci:** fixed prod, dev and staging CDN R2 buckets authentication

### Refactors

* internal renamings and more precise namings ([1862ddc](https://github.developer.allianz.io/a1/design-tokens/commit/1862ddc8c491b25300dcc87bd87f42a7a5c7ae11))
* migrate to typescript and Style-Dictionary 4 [[A1-714](https://jmp.allianz.net/browse/A1-714), [A1-442](https://jmp.allianz.net/browse/A1-442), [A1-803](https://jmp.allianz.net/browse/A1-803), [A1-816](https://jmp.allianz.net/browse/A1-816), [A1-832](https://jmp.allianz.net/browse/A1-832), [A1-833](https://jmp.allianz.net/browse/A1-833), [A1-836](https://jmp.allianz.net/browse/A1-836)] ([ebb5fea](https://github.developer.allianz.io/a1/design-tokens/commit/ebb5fea5ecd760898a44d9879ef4af2fe7bdd388))
* replace while loop with proper recursive implementation in custom math function resolver ([c96e9eb](https://github.developer.allianz.io/a1/design-tokens/commit/c96e9ebf5c46c09ffb94532737b424d8c847f38f))
* Straighten output file name implementation logic ([5c53714](https://github.developer.allianz.io/a1/design-tokens/commit/5c53714a53f501dd0dd20286d185a883bedc4950))

### [0.2.5](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.2.4...builder-v0.2.5) (2024-07-03)

### Refactors

* **demo:** Refactor folder scaffolding for demo folder ([e4b7bc5](https://github.developer.allianz.io/a1/design-tokens/commit/e4b7bc514b8faa2f33ff6096bdf201d8a867ef3b))
* Replace hardcoded token types with constant equivalent ([11bb8eb](https://github.developer.allianz.io/a1/design-tokens/commit/11bb8eb99de7618fe13dfd0908b465144e15b05b))

### [0.2.4](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.2.3...builder-v0.2.4) (2024-03-20)

### Refactors

* **ci:** Simplify NPM publishing endpoint with env variable ([96217a9](https://github.developer.allianz.io/a1/design-tokens/commit/96217a9bf0111f22b27eed53179199d9907ea596))

### [0.2.3](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.2.2...builder-v0.2.3) (2024-03-20)

### Features

* **cdn:** Provide the CDN output files not only with version but also as latest [A1-718] ([82ce63c](https://github.developer.allianz.io/a1/design-tokens/commit/82ce63ce13c0eb64f927c4cdb551080603186a7c))
* **cdn:** Provide the dist-history infos via the CDN for the versioned documentation app ([9c29105](https://github.developer.allianz.io/a1/design-tokens/commit/9c29105f743dc79f4e1113e74978b006608ef935))
* **ci:** Add OneMarketing Cloudflare CDN credentials [A1-618] ([837c7db](https://github.developer.allianz.io/a1/design-tokens/commit/837c7db273d379b845850b8ffcfbbc7985c9eaf6))

### Bug Fixes

* **cdn:** Disable latest CDN folder creation ([#93](https://github.developer.allianz.io/a1/design-tokens/issues/93)) [A1-718] ([c3e6e46](https://github.developer.allianz.io/a1/design-tokens/commit/c3e6e46f15e05f8cddcb6e67d1514084ee750328))
* **ci:** Fix GDF Nexus package registry publish endpoint ([3ae39b1](https://github.developer.allianz.io/a1/design-tokens/commit/3ae39b119c60a4642b4f64aa670ad1eba242788b))

### [0.2.2](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.2.1...builder-v0.2.2) (2023-12-05)

### Features

* **ci:** Add NPM package publishing to GDF Nexus [A1-705] ([#76](https://github.developer.allianz.io/a1/design-tokens/issues/76)) ([671f767](https://github.developer.allianz.io/a1/design-tokens/commit/671f767c1983edecba499e4b2d3cfef70cce680d))

### Bug Fixes

* **ci:** Fix Github action config for OM NPM publishing ([1153617](https://github.developer.allianz.io/a1/design-tokens/commit/1153617d43832ced66cbb70909d477bf786e1912))
* **ci:** Use checkout action v4 and setup node v4 ([ff1168c](https://github.developer.allianz.io/a1/design-tokens/commit/ff1168ccc7a0546ba54dd35653dce12e9e106c0c))

### Refactors

* **utils:** Renaming of some token constants ([b194f9a](https://github.developer.allianz.io/a1/design-tokens/commit/b194f9ac2b48019b5481af83fd957769598aa6c3))
* **utils:** Simplify helper function complementTokensInObject ([d5aa554](https://github.developer.allianz.io/a1/design-tokens/commit/d5aa5546b4070f0537fb3c492bdcfb679967fed3))

### [0.2.1](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.2.0...builder-v0.2.1) (2023-11-17)

### Features

* **cdn:** Add cloudflare deployment [A1-618] ([#63](https://github.developer.allianz.io/a1/design-tokens/issues/63)) ([2fe62fb](https://github.developer.allianz.io/a1/design-tokens/commit/2fe62fb5a2bb68407dd16b7c93c367fe746f782b))

### Bug Fixes

* **preprocessing:** Fix sub token type resolution for component specific compositional tokens ([bae5ca4](https://github.developer.allianz.io/a1/design-tokens/commit/bae5ca4675c6346aceb8213cd08fb5feac131583))

### Refactors

* Reduce technical debts ([#69](https://github.developer.allianz.io/a1/design-tokens/issues/69)) [A1-667] ([3bfe2cc](https://github.developer.allianz.io/a1/design-tokens/commit/3bfe2cc9dfef4bcc0e99f28794d7efc45a366db7))

## [0.2.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.1.0...builder-v0.2.0) (2023-09-28)

### ⚠ BREAKING CHANGES

* **compositional-tokens:** Fix for compositional token resolution in the new token set structure [A1-651]

### Features

* **pre-processes:** Sort selectedTokenSets in theme definitions and sort the file paths in the token loader input [A1-661] ([16f7cc4](https://github.developer.allianz.io/a1/design-tokens/commit/16f7cc41aa06bdf061489ead0dd5333acc83d0a1))

### Bug Fixes

* **compositional-tokens:** Fix for compositional token resolution in the new token set structure [A1-651] ([3702e41](https://github.developer.allianz.io/a1/design-tokens/commit/3702e41c19893ca602da9894b86e0deda502f83f))
* **pre-processing:** Add folder initialization for token meta files ([fda519f](https://github.developer.allianz.io/a1/design-tokens/commit/fda519fc0248320b8e28b4138082cf3b67fdfd61))
* **prettier:** ignore tocken-package package-lock.json file for code formattings ([d92cff4](https://github.developer.allianz.io/a1/design-tokens/commit/d92cff4dbe073831b809fcec799281dda55a2b41))
* **sd-transform:** Enforce hex color values within sd-transform config ([47a58ca](https://github.developer.allianz.io/a1/design-tokens/commit/47a58caa23390a98a7f6b7ae2c2a332b4ce13aa0))
* **style-dictionary:** Fix build to produce output files with same file names by filtering out blacklisted themes [A1-651] ([83b1ca6](https://github.developer.allianz.io/a1/design-tokens/commit/83b1ca694d14c94730a3d66ec07a7a435cb71f00))
* **utils:** Fix hidden regex catastrophic backtracking ([59ac5d8](https://github.developer.allianz.io/a1/design-tokens/commit/59ac5d8e3979037d13ebe34f3097b6e499760a40))
* **versioning:** Fix user prompt text and linting issue ([82ef4cc](https://github.developer.allianz.io/a1/design-tokens/commit/82ef4cc1b259560e2a3012bc1ef720b364f57eae))

## [0.1.0](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.0.5...builder-v0.1.0) (2023-08-17)

### ⚠ BREAKING CHANGES

* **style-dictionary:** Rewrite output file configs for new multi-dimensional theming
* **token-transform:** Switch from token-transformer library to @token-studio/sd-transforms [A1-428]

### Features

* **versioning:** Add created date to output file header comment without interfering with the dist folder hash version change detection ([579c080](https://github.developer.allianz.io/a1/design-tokens/commit/579c0807806f6f6a120a1283ee3106d291b6d1a2))

### Refactors

* **preprocessing:** Add compositional token normalization and compositional token reference resolution [A1-586] ([bae766c](https://github.developer.allianz.io/a1/design-tokens/commit/bae766c7aff22bc9f1d1391c9df91b5b9717e6f8))
* **preprocessing:** Completely rewrite token SSOT preprocessing [A1-586] ([10648fa](https://github.developer.allianz.io/a1/design-tokens/commit/10648fa963ef4dfe2d6ecad7206e7e45efda91a1))
* **style-dictionary:** Rewrite output file configs for new multi-dimensional theming ([da9a393](https://github.developer.allianz.io/a1/design-tokens/commit/da9a393e2a92408012f8cd064d102557c21a70a9))
* **token-transform:** Switch from token-transformer library to @token-studio/sd-transforms [A1-428] ([e18726c](https://github.developer.allianz.io/a1/design-tokens/commit/e18726c63f497614db1ecc81c66967d3543ca57f))
* **versioning:** switch to dist based versioning [A1-541] ([#57](https://github.developer.allianz.io/a1/design-tokens/issues/57)) ([d656957](https://github.developer.allianz.io/a1/design-tokens/commit/d656957a2d71f32c93299d6bc84a05ef2dd7f212))

### [0.0.5](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.0.4...builder-v0.0.5) (2023-06-30)

### Bug Fixes

* **inset-tokens:** extract also single value shorthand spacing inset token values [A1-517] ([8ca404d](https://github.developer.allianz.io/a1/design-tokens/commit/8ca404dc1a155c38d63ae5f1a4111ea6f8ba3866))

### [0.0.4](https://github.developer.allianz.io/a1/design-tokens/compare/builder-v0.0.3...builder-v0.0.4) (2023-06-01)

### Refactors

* **override-only:** simplify implementation for extracting override only token sub set ([8f1b829](https://github.developer.allianz.io/a1/design-tokens/commit/8f1b8291ac9f5edf174580369544a7dbb3a8f9ef))

### Documentation

* **demo:** updating token integration demos to latest design token changes [A1-483] ([49d238e](https://github.developer.allianz.io/a1/design-tokens/commit/49d238efdc0bbcdfe6866e8b8c389540f15006f5))

### [0.0.3](https://github.developer.allianz.io/a1/design-tokens/compare/v0.0.2...v0.0.3) (2023-05-08)

### Features

* **build:** filter out excluded new _private tokens ([af4d3e4](https://github.developer.allianz.io/a1/design-tokens/commit/af4d3e4c0db57f513cafd3c17ba5ac0e479cc825))
* **build:** improve with cleaner and less redundant output file names [A1-457] ([e3d4e53](https://github.developer.allianz.io/a1/design-tokens/commit/e3d4e53bb43039ea7a81533423b374b39ebdf566))
* **build:** provide component specific token sets for each modifier [A1-427] ([d6e8c5e](https://github.developer.allianz.io/a1/design-tokens/commit/d6e8c5e9266729d272e412916d0f76558fbe56b8))
* **token-composition:** add modifier override tokens only token sub set [A1-434] ([#31](https://github.developer.allianz.io/a1/design-tokens/issues/31)) ([7d258f3](https://github.developer.allianz.io/a1/design-tokens/commit/7d258f3ff1c90dc697a2a92f93ae201e0f0664dd))
* **token-transform:** extract inset spacing shorthand values as separate tokens [A1-468] ([c18931c](https://github.developer.allianz.io/a1/design-tokens/commit/c18931cb4d9899b4dcb2a184f40b9f78b6acd6da))
* **tokens:** adding first responsive viewport tokens and several minor token updates ([51f5c43](https://github.developer.allianz.io/a1/design-tokens/commit/51f5c43c18c95e2e7014a5bc9cc0d85650403d84))
* **tokens:** re-added interim dark-mode tokens now on the semantic layer ([e5ff4fa](https://github.developer.allianz.io/a1/design-tokens/commit/e5ff4fad853a31ca3dc0a183e9f661f6c63bc590))
* **tokens:** rework of the structure and the values of the complete token set ([a6f73ae](https://github.developer.allianz.io/a1/design-tokens/commit/a6f73ae4520b7be38f0689f1415ad71e82d1cb5d))
* **versioning:** add version to output files without inferring with file hash change detection [A1-435] ([b8e33e2](https://github.developer.allianz.io/a1/design-tokens/commit/b8e33e235f6c4091bfde9d5b919ff9e1c1db8750))

### Bug Fixes

* **build:** fix partial token name prefix for separate partial token output files [A1-447] ([da0a098](https://github.developer.allianz.io/a1/design-tokens/commit/da0a09871d66d1f0b61577d49ebc98aa28aa59a2))
* **custom-docs:** use correct write file method for html docs ([366ae73](https://github.developer.allianz.io/a1/design-tokens/commit/366ae73c7795a1aaf1185f59543a70f1fc04ae65))
* **token-composition:** ensure correct modifier token sets and modifier override only token sets for new token input [A1-434] ([77245c9](https://github.developer.allianz.io/a1/design-tokens/commit/77245c9f52dac1a8b6fcbe213dc538326fad88a0))
* **token-transformer:** Add missing px unit to core.font-size.user-agent.value during build process [A1-426] ([2cb4700](https://github.developer.allianz.io/a1/design-tokens/commit/2cb47005aac0bd08deef37799d1e9c86da35910d))
* **tokens:** correct spacious headline styles and fixing other minor things ([d91a710](https://github.developer.allianz.io/a1/design-tokens/commit/d91a710f9b8b01256452bef8935b53c7dc132e2d))
* **tokens:** fixed all text-style errors ([d3e2bc4](https://github.developer.allianz.io/a1/design-tokens/commit/d3e2bc45a34a244eba1d7db841752c558c28a832))
* **tokens:** transform letter-spacing values from % to em values [A1-464] ([a1c0ce4](https://github.developer.allianz.io/a1/design-tokens/commit/a1c0ce46a9200fa5c81cc6dbe4b49d4036eedf84))
* **tokens:** update indicator tokens ([42a1c4f](https://github.developer.allianz.io/a1/design-tokens/commit/42a1c4f0bd9204a59133331e4f646a40f4fbd6a8))

### 0.0.2 (2023-03-31)

### Features

* add destination file for Figma token plugin sync ([64c1138](https://github.developer.allianz.io/a1/design-tokens/commit/64c113894f7919633f124ed1ed5154fbe1ef72bb))
* add figma types and figma json output ([2e7f0c7](https://github.developer.allianz.io/a1/design-tokens/commit/2e7f0c78fe01fc4353d13a00e52d04073df35dea))
* adds directory listing for output folder ([bbb964a](https://github.developer.allianz.io/a1/design-tokens/commit/bbb964aa195aab4f28e9504ea3c2a7e5d9acd84e))
* **btw-demo:** add button token integration demo ([d0bc24d](https://github.developer.allianz.io/a1/design-tokens/commit/d0bc24d07669f2c1338357a34ea97570d2a47640))
* **build:** adjusting token-transform and style-dictionary inputs to Figma Token Plugin Pro version [A1-347] ([ea77b73](https://github.developer.allianz.io/a1/design-tokens/commit/ea77b7320e2a28be881dbff4639605ee35a61c20))
* init button and input design tokens ([580f40c](https://github.developer.allianz.io/a1/design-tokens/commit/580f40c4b2085726fce8dca60974733d6398e1f3))
* **logger:** add improved build script logging output [A1-300] ([#7](https://github.developer.allianz.io/a1/design-tokens/issues/7)) ([1924f53](https://github.developer.allianz.io/a1/design-tokens/commit/1924f5351852e04f19cb46974605d38fd1d9e283))
* **token-input:** accumulate all tokens per modifier for further transformations and token set compositions ([4a2bed4](https://github.developer.allianz.io/a1/design-tokens/commit/4a2bed4ed5fe0b4d9a08680bdd747ca8debdbf5a))
* **tokens:** switch to multi file sync and the Figma Token Plugin pro version theme features ([6abcc6a](https://github.developer.allianz.io/a1/design-tokens/commit/6abcc6af7e66ed850471ee001b5aad836ebb3854))
* **versioning:** remove single-file versioning and add package-file versioning [A1-352] ([#17](https://github.developer.allianz.io/a1/design-tokens/issues/17)) ([d0e1247](https://github.developer.allianz.io/a1/design-tokens/commit/d0e124787eebb7094c27dc4840a6135b9a83913f))

### Bug Fixes

* **btn-demo:** explicitly add inverted dark button color tokens ([f4fedba](https://github.developer.allianz.io/a1/design-tokens/commit/f4fedba228b285bbb925cb39a522dacb6fab34eb))
* **build:** enable respective output files per modifier ([3905f98](https://github.developer.allianz.io/a1/design-tokens/commit/3905f988b1a95bcd23b491bec73c2bdce9957056))
* **build:** temporarily disable font and icon style-dictionary build [A1-314, A1-315] ([4671d2e](https://github.developer.allianz.io/a1/design-tokens/commit/4671d2eccc1ea314946f15ef1357e4f901deb132))
* **build:** use single token.json as only input file ([713b7e4](https://github.developer.allianz.io/a1/design-tokens/commit/713b7e468e4a7bf3ccaf26d9e4c64aea0493c8a2))
* delete obsolete duplicate tokens.json file ([afd2aaf](https://github.developer.allianz.io/a1/design-tokens/commit/afd2aaf9a37e7fd0c9db8e504d4f59e415b39577))
* **dependencies:** add npm audit fixes ([ebfa69e](https://github.developer.allianz.io/a1/design-tokens/commit/ebfa69eb3710d4c8c3277dbb451159d20ae94a5b))
* fix build issues ([34151ff](https://github.developer.allianz.io/a1/design-tokens/commit/34151ffbcb202198983669948cf658faf1261dea))
* move tool related output formats to own folder ([08eca9a](https://github.developer.allianz.io/a1/design-tokens/commit/08eca9a81f5fa8665ace819b6c4b59d926f4f664))
* Plain button inverted color transparency ([08f7f68](https://github.developer.allianz.io/a1/design-tokens/commit/08f7f681eb5371eed91b43e01deeb4a046442f8b))
* problem with glob and src file names ([c75ed99](https://github.developer.allianz.io/a1/design-tokens/commit/c75ed997cb8fd0e8f69ae4f67008e525b9c5282e))
* read local json instead of deployed ([20358da](https://github.developer.allianz.io/a1/design-tokens/commit/20358da2095f10d344ed760e570586691c94226a))
* remove config that is part of index.js ([39c13ad](https://github.developer.allianz.io/a1/design-tokens/commit/39c13adfb37033d6921d620acbf72e87cc58372b))
* **token-file-loader:** adjust token-file-loader to folder renamings ([8850ca7](https://github.developer.allianz.io/a1/design-tokens/commit/8850ca70f30f091a9f8ffe4086ea3ffa28b16d87))
* **tokens:** improve output after using official token-transformer lib [A1-353] ([#10](https://github.developer.allianz.io/a1/design-tokens/issues/10)) ([ab3a09f](https://github.developer.allianz.io/a1/design-tokens/commit/ab3a09f70ab88565d34ae11bb5a51428347c2eee))
* **tokens:** interpolate token values depending on base size during build time [A1-293, A1-294] ([3d97487](https://github.developer.allianz.io/a1/design-tokens/commit/3d97487e099572613e04ebf68e3513fa3bcfcc03))
* **tokens:** interpolate token values depending on base size during build time [A1-293] ([7e2aaef](https://github.developer.allianz.io/a1/design-tokens/commit/7e2aaef790eddf07e83fb29c2b2563691efe6f34))
