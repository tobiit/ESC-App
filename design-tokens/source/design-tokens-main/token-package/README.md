# Allianz Design Tokens

These Design Tokens are platform-agnostic, key-value pair encoded design decisions of the Allianz brand. This project is the single source of truth (SSOT) for the technical provisioning of the **A1** Design Tokens.

## Table of Contents

<details>
<summary>Expand contents</summary>

- [Official Design System Documentation](#official-design-system-documentation)
- [When to use and when not to use the A1 Design Tokens?](#when-to-use-and-when-not-to-use-the-a1-design-tokens)
  - [Indirect Distribution of the Design Tokens](#indirect-distribution-of-the-design-tokens)
    - [Official Allianz Angular Brand Kit Component Library](#official-allianz-angular-brand-kit-component-library)
      - [Migrating from Angular NDBX to Angular Brand Kit with A1](#migrating-from-angular-ndbx-to-angular-brand-kit-with-a1)
    - [AEM Web Component Library](#aem-web-component-library)
  - [Direct Distribution of the Design Tokens](#direct-distribution-of-the-design-tokens)
- [Available Platforms & File Formats](#platforms--file-formats)
  - [Advanced Notice](#advanced-notice)
  - [List of Supported Platforms & File Formats](#list-of-supported-platforms--file-formats)
  - [Not Finding Your Format?](#not-finding-your-format)
- [Setups](#npm)
  - [NPM](#npm)
    - [Global Digital Factory Sonatype Nexus Package Registry](#global-digital-factory-gdf-sonatype-nexus-package-registry)
    - [One Marketing jFrog Artifactory Package Registry](#one-marketing-jfrog-artifactory-package-registry)
    - [Install the Package](#install-the-package)
    - [NPM Package File Overview](#npm-package-file-overview)
  - [CDN](#cdn)
    - [Specific Version](#specific-version)
    - [CDN File Overview](#cdn-file-overview)
- [Implementation](#implementation)
  - [Which Token Asset File should I use?](#which-token-asset-file-should-i-use)
  - [Integration Scenarios](#integration-scenarios)
    - [Build Time Integration](#build-time-integration)
      - [Configurable Selector via SCSS Mixins](#configurable-selector-via-scss-mixins)
    - [Run Time Integration](#run-time-integration)
  - [Token Usage](#token-usage)
- [Versioning & Release Cycles](#versioning-release-cycles)
  - [Pre-1.0.0 Versioning Guidelines](#pre-100-versioning-guidelines)
  - [Connected Release Versions](#connected-release-versions)
  - [Definition of Breaking Changes](#definition-of-breaking-changes)
- [Design Token Migration Script](#design-token-migration-script)
- [Background Informations](#background-informations)
  - [Design Decisions](#design-decisions)
  - [Design System Feature Overview](#design-system-feature-overview)
  - [Technical Decisions](#technical-decisions)

</details>

## Official Design System Documentation

Under the official brand guidelines the documentation for the **A1** digital design system, together with the detailed documentation of the design tokens can be found in the [A1 Brand Guidelines](https://one.allianz.com/document/574#/foundation/design-tokens). If you want to learn more about the underlying concepts of our design token system, like design token naming schemas, color and spacing concepts, etc. head over there and dive in.

### Dynamic Design Token Documentation

There is also a standalone and versioned **dynamic documentation of the design tokens** available. It is perfect for explorative searches within the design token set and allows for value previews and quick copy'n'paste of the design token name in the format of your specific platform/programming language. In the future this should also be directly integrated into the aforementioned official **A1** brand guidelines: https://design-tokens-docs.cdn.allianz.com/

## When to use and when not to use the A1 Design Tokens?

In most cases you do not have to integrate and use the **A1** Design Tokens directly yourself. Therefore it depends on your specific nature of your project, what the best approach for using the **A1** design tokens is. In the following you will find a first advice, that should help you make the right choice.

### Indirect Distribution of the Design Tokens

It is highly recommended to stick to one of the official Allianz component libraries like [Angular Brand Kit](https://github.developer.allianz.io/ilt/ngx-brand-kit) or the [AEM web components](https://github.developer.allianz.io/oneMarketing/elements), which represents the indirect integration of the design tokens via these component libraries. If you use these libraries you can still use the design tokens to also style your custom components and overall page layouts.

#### Official Allianz Angular Brand Kit Component Library

For all transactional web applications we recommend using the well established [Allianz Angular Brand Kit component library](https://ngx-brand-kit.frameworks.allianz.io/welcome), formerly known as Angular NDBX.

##### Migrating from Angular NDBX to Angular Brand Kit with A1

If your are faced with migrating an existing Angular NDBX project to the **A1** design, then there are exact migration steps, that you can follow and which roughly outline like this:

- **Milestone 1**: A1 Light Theme
  - Enable and switch on the A1 light theme
- **Milestone 2**: Manual Adjustments on the Way to Full A1
  - Remove NDBX illustrations
  - Left alignement of all text
  - A1 thematic headlines
  - A1 thematic imagery (optional)
  - Spacing adjustments
- **Milestone 3**: Integrated A1 Design Language
  - Component replacement in favour of some full A1 specific components
  - Another round of spacing adjustments
- **Milestone 4**: Target Picture A1
  - Full **A1** switch

Additional migration guides in [the A1 brand guidelines](https://one.allianz.com/document/1025#/migration-from-ndbx/transactional-applications-angular) and [the Allianz Angular Brand Kit component library documentation](https://ngx-brand-kit.frameworks.allianz.io/guides/a1).

#### AEM Web Component Library

For all content related pages within the Adobe Experience Manager (AEM), there is a successor of the PatternLab component library called [A1 Elements](https://github.developer.allianz.io/oneMarketing/elements), developed by DigitalSales (formerly known as OneMarketing). It is a web component library, which is used as presentational components within AEM. More infos in [their Storybook documentation](https://elements.cdn.allianz.com/master/storybook/index.html?path=/docs/general-welcome--docs).

### Direct Distribution of the Design Tokens

In case you are i.e. an operational entity (OE), that has its own component library and is therefore deviating from the recommendations of the global architecture blueprint, you could still make use of the **A1** Design Tokens with its overriding possibilities, which makes it flexible for OE specific adjustments. In this special case its valid to go with a direct integration of the design tokens. Another example would be, if there is no official component library for your platform/programming language. In these cases please first get in contact with us, so that we can consider and clarify on your exact requirements.

## Platforms & File Formats

This is just a quick overview of the supported platforms and file formats. If you need more insights in order to be sure picking the right format for your needs, please jump to the [Implementation](#implementation) section.

### Advanced Notice

**We currently concentrate on providing the A1 design tokens in the different web formats. Therefore the generated tokens for the platforms Android, iOS and for tools like Figma (as a token consumer) are not yet actively developed and maintained. If you are a native mobile developer, I am happy to gather some more detailed requirements from you! Therefore only rely on the tokens provided in the different web formats.**

### List of Supported Platforms & File Formats

- **Android**
  - Kotlin Compose Objects `.kt`
- **iOS**
  - Swift Enums `.swift`
- **Web**
  - CSS variables `.css`
    - Also available with pre-configured breakpoint media queries. Search for the CSS files without the breakpoint theming dimension key in the file name.
  - SCSS variables `.scss`
    - Also available as a mixin for a configurable CSS selector under which the CSS variables are defined in pre-configured breakpoint media queries. Search for the SCSS files ending on `mixins.scss`.
    - Or even better use the single mixin barrel file `tokens-theme-mixins-index.scss` (more details in section [Configurable Selector via SCSS Mixins](#configurable-selector-via-scss-mixins)).
  - Javascript const variables `.js`
  - JSON objects `.json`

### Not Finding Your Format?

There is a [huge list of possible formats](https://styledictionary.com/reference/hooks/formats/predefined/) we could quickly provide. If you have really special needs and requirements, we might also provide a special format tailored to your specific needs. Please get in touch with us, if this is the case, by [opening a ticket in this repository](https://github.developer.allianz.io/a1/design-tokens/issues/new).

## NPM

There are currently two package registries available to get the `@allianz/a1-design-tokens` NPM package from. The GDF's Sonatype Nexus packages registry and the One Marketing jFrog Artifactory package registry. Depending on where your project is located and related to, either one of them might be easier to setup and reach. In the following the setup for each package registry is explained respectively, **but you will only need one of them**. Maybe in the future we can finally rely on a central NPM package registry for Allianz, which then would be our preferred place to receive the NPM package from ([read more in the related ADP ticket](https://github.developer.allianz.io/FutureCloudPlatform/support-and-discuss/issues/43254)).

### Global Digital Factory (GDF) Sonatype Nexus Package Registry

If you might have already a `.npmrc` configuration for the `@allianz/ngx-brand-kit` Angular Brand Kit package (formerly known as Angular NDBX), you should be already setup for the GDF Nexus and can directly jump to the section [Install the Package](https://github.developer.allianz.io/a1/design-tokens/blob/main/token-package/README.md#install-the-package). If not please follow the beneath description for setting up the `.npmrc` configuration for the GDF Nexus package registry, like it is [also described in the Angular Brand Kit package](https://github.developer.allianz.io/ilt/ngx-brand-kit#installation).

#### Access Token

Exactly like written in [the original guides by GDF](https://github.developer.allianz.io/gdf/overflow/issues/10) for setting up a `.npmrc` for local development, please follow these steps:

1. First add the Nexus as the package registry for `@allianz` scoped NPM packages in your local terminal:
   ```bash
   npm config set @allianz:registry "https://nexus-frontend.frameworks.allianz.io/repository/npm-public/"
   ```
2. Setting up the proxy `https_proxy="http://th000-surf.zone3.proxy.allianz:8080/"` mentioned in [the GDF guides](https://github.developer.allianz.io/gdf/overflow/issues/10), is not necessary and can most likely be skipped.
3. Then login to the Nexus package registry with
   ```bash
   npm login --registry https://nexus-frontend.frameworks.allianz.io/repository/npm-public/
   ```
   If asked in the upcoming prompt, add your **BENSL** as the username, your **AVC Windows password** as the password and your **Allianz email** address as the email.
4. Investigate what has been added to your local user `.npmrc` file. It should look like the following:
   ```text
   //nexus-frontend.frameworks.allianz.io/repository/npm-public/:_authToken=<NpmToken.WITH_SOME_LONGER_KEY>
   ```
   `<NpmToken.WITH_SOME_LONGER_KEY>` is a placeholder for your personal Nexus authentication token. **Keep in mind to never ever commit access tokens, auth tokens, passwords etc.!**

#### NPM Settings

1.  Finally the necessary NPM settings in your local user `.npmrc` file should look like this:
    ```text
    @allianz:registry=https://nexus-frontend.frameworks.allianz.io/repository/npm-public/
    //nexus-frontend.frameworks.allianz.io/repository/npm-public/:_authToken=<NpmToken.WITH_SOME_LONGER_KEY>
    ```
2.  If you are using a CI/CD pipeline you need to provide the `authToken` as a Github Action Secret or hidden parameter within Jenkins. Then during your CI/CD run, configure the pipline runners `.npmrc` file with the following npm config commands:
    ```bash
    npm config set @allianz:registry https://nexus-frontend.frameworks.allianz.io/repository/npm-public/
    npm config set //nexus-frontend.frameworks.allianz.io/repository/npm-public/:_authToken ${{NEXUS_AUTH_TOKEN}}
    ```
    Obviously in the above example the Github Action Secret or Jenkins hidden parameter name is `NEXUS_AUTH_TOKEN` and should have the value of the generated `authToken` seen in the previous step.

### One Marketing jFrog Artifactory Package Registry

#### Access Token

Via the Allianz Virtual Client (AVC) or an AMC Mac go to the [jFrog Artifactory](https://diartifactory.jfrog.io/ui/login/). Then use the button **di-selfservice** beneath the login form. You will be redirected to an [Allianz Collaboration login page](https://login.collaboration.allianz.io/auth/realms/ptc/protocol/openid-connect/auth?client_id=nexus&scope=openid%20profile%20email&redirect_uri=https://diartifactory.jfrog.io/artifactory/api/oauth2/loginResponse&state=-5038515227226468818~~~~https%3A%2F%2Fdiartifactory.jfrog.io&response_type=code&approval_prompt=auto). There you again click on the button **Allianz Certificate** beneath the login form. After the login to the Artifactory you click in the top right on your user settings drop down menu and chose ['Edit Profile'](https://diartifactory.jfrog.io/ui/user_profile). Under **Authentication Settings** you can **Generate an Identity Token** which is valid for **_8hrs_**. **Keep in mind to never ever commit access tokens, auth tokens, passwords etc.!**

Further informations:

- https://self-service.collaboration.allianz.io/main/faq
- https://allianz-apac-prd.adobecqms.net/content/dam/onemarketing/ops/selfservice-FAQ.pdf

#### NPM Settings

In your local user `.npmrc` file add the following registry configurations:

```text
@allianz:registry=https://diartifactory.jfrog.io/artifactory/api/npm/npm-all/
//diartifactory.jfrog.io:_authToken=<YOUR_GENERATED_8HRS_TOKEN>
```

Replace `<YOUR_GENERATED_8HRS_TOKEN>` with your generated Identity Token from the Artifactory settings.

In case you need to setup a CI/CD pipeline, better try to use the GDF Nexus packages registry, as their `authToken` is not limited to 8 hours. In case you need CI/CD necessarily with the One Marketing Artifactory, please contact the One Marketing DevOps team, as the 8h `authToken` obviously does not suite the requirements of an automatic build pipeline.

### Install the Package

After setting up all NPM configurations, simply install it with the usual npm command:

```bash
npm i @allianz/a1-design-tokens
```

### NPM Package File Overview

The following listing is an exemplary overview of the available token files in the `dist` folder of the NPM package. The listing below shows which token files for each platform can be expected in the future. If you are not in direct collaboration with us, **please only rely on the tokens under `token-package/dist/allianz/a1/web` for now**.

Recommended **A1** default theming combination is: `light lively spacious`

<details>
<summary>Expand NPM package directory listing</summary>

```text
dist
 └─> allianz
     └─> a1
         ├─> android
         │   ├── tokens-dark-lively-compact-l.kt
         │   ├── tokens-dark-lively-compact-m.kt
         │   ├── tokens-dark-lively-compact-xs.kt
         │   ├── tokens-dark-lively-dense-l.kt
         │   ├── tokens-dark-lively-dense-m.kt
         │   ├── tokens-dark-lively-dense-xs.kt
         │   ├── tokens-dark-lively-spacious-l.kt
         │   ├── tokens-dark-lively-spacious-m.kt
         │   ├── tokens-dark-lively-spacious-xs.kt
         │   ├── tokens-dark-minimal-compact-l.kt
         │   ├── tokens-dark-minimal-compact-m.kt
         │   ├── tokens-dark-minimal-compact-xs.kt
         │   ├── tokens-dark-minimal-dense-l.kt
         │   ├── tokens-dark-minimal-dense-m.kt
         │   ├── tokens-dark-minimal-dense-xs.kt
         │   ├── tokens-dark-minimal-spacious-l.kt
         │   ├── tokens-dark-minimal-spacious-m.kt
         │   ├── tokens-dark-minimal-spacious-xs.kt
         │   ├── tokens-light-lively-compact-l.kt
         │   ├── tokens-light-lively-compact-m.kt
         │   ├── tokens-light-lively-compact-xs.kt
         │   ├── tokens-light-lively-dense-l.kt
         │   ├── tokens-light-lively-dense-m.kt
         │   ├── tokens-light-lively-dense-xs.kt
         │   ├── tokens-light-lively-spacious-l.kt
         │   ├── tokens-light-lively-spacious-m.kt
         │   ├── tokens-light-lively-spacious-xs.kt
         │   ├── tokens-light-minimal-compact-l.kt
         │   ├── tokens-light-minimal-compact-m.kt
         │   ├── tokens-light-minimal-compact-xs.kt
         │   ├── tokens-light-minimal-dense-l.kt
         │   ├── tokens-light-minimal-dense-m.kt
         │   ├── tokens-light-minimal-dense-xs.kt
         │   ├── tokens-light-minimal-spacious-l.kt
         │   ├── tokens-light-minimal-spacious-m.kt
         │   └── tokens-light-minimal-spacious-xs.kt
         ├─> ios
         │   ├── tokens-dark-lively-compact-l.swift
         │   ├── tokens-dark-lively-compact-m.swift
         │   ├── tokens-dark-lively-compact-xs.swift
         │   ├── tokens-dark-lively-dense-l.swift
         │   ├── tokens-dark-lively-dense-m.swift
         │   ├── tokens-dark-lively-dense-xs.swift
         │   ├── tokens-dark-lively-spacious-l.swift
         │   ├── tokens-dark-lively-spacious-m.swift
         │   ├── tokens-dark-lively-spacious-xs.swift
         │   ├── tokens-dark-minimal-compact-l.swift
         │   ├── tokens-dark-minimal-compact-m.swift
         │   ├── tokens-dark-minimal-compact-xs.swift
         │   ├── tokens-dark-minimal-dense-l.swift
         │   ├── tokens-dark-minimal-dense-m.swift
         │   ├── tokens-dark-minimal-dense-xs.swift
         │   ├── tokens-dark-minimal-spacious-l.swift
         │   ├── tokens-dark-minimal-spacious-m.swift
         │   ├── tokens-dark-minimal-spacious-xs.swift
         │   ├── tokens-light-lively-compact-l.swift
         │   ├── tokens-light-lively-compact-m.swift
         │   ├── tokens-light-lively-compact-xs.swift
         │   ├── tokens-light-lively-dense-l.swift
         │   ├── tokens-light-lively-dense-m.swift
         │   ├── tokens-light-lively-dense-xs.swift
         │   ├── tokens-light-lively-spacious-l.swift
         │   ├── tokens-light-lively-spacious-m.swift
         │   ├── tokens-light-lively-spacious-xs.swift
         │   ├── tokens-light-minimal-compact-l.swift
         │   ├── tokens-light-minimal-compact-m.swift
         │   ├── tokens-light-minimal-compact-xs.swift
         │   ├── tokens-light-minimal-dense-l.swift
         │   ├── tokens-light-minimal-dense-m.swift
         │   ├── tokens-light-minimal-dense-xs.swift
         │   ├── tokens-light-minimal-spacious-l.swift
         │   ├── tokens-light-minimal-spacious-m.swift
         │   └── tokens-light-minimal-spacious-xs.swift
         └─> web
             ├── tokens-dark-lively-compact-l.css
             ├── tokens-dark-lively-compact-l.js
             ├── tokens-dark-lively-compact-l.json
             ├── tokens-dark-lively-compact-l.scss
             ├── tokens-dark-lively-compact-m.css
             ├── tokens-dark-lively-compact-m.js
             ├── tokens-dark-lively-compact-m.json
             ├── tokens-dark-lively-compact-m.scss
             ├── tokens-dark-lively-compact-mixins.scss
             ├── tokens-dark-lively-compact-xs.css
             ├── tokens-dark-lively-compact-xs.js
             ├── tokens-dark-lively-compact-xs.json
             ├── tokens-dark-lively-compact-xs.scss
             ├── tokens-dark-lively-compact.css
             ├── tokens-dark-lively-dense-l.css
             ├── tokens-dark-lively-dense-l.js
             ├── tokens-dark-lively-dense-l.json
             ├── tokens-dark-lively-dense-l.scss
             ├── tokens-dark-lively-dense-m.css
             ├── tokens-dark-lively-dense-m.js
             ├── tokens-dark-lively-dense-m.json
             ├── tokens-dark-lively-dense-m.scss
             ├── tokens-dark-lively-dense-mixins.scss
             ├── tokens-dark-lively-dense-xs.css
             ├── tokens-dark-lively-dense-xs.js
             ├── tokens-dark-lively-dense-xs.json
             ├── tokens-dark-lively-dense-xs.scss
             ├── tokens-dark-lively-dense.css
             ├── tokens-dark-lively-spacious-l.css
             ├── tokens-dark-lively-spacious-l.js
             ├── tokens-dark-lively-spacious-l.json
             ├── tokens-dark-lively-spacious-l.scss
             ├── tokens-dark-lively-spacious-m.css
             ├── tokens-dark-lively-spacious-m.js
             ├── tokens-dark-lively-spacious-m.json
             ├── tokens-dark-lively-spacious-m.scss
             ├── tokens-dark-lively-spacious-mixins.scss
             ├── tokens-dark-lively-spacious-xs.css
             ├── tokens-dark-lively-spacious-xs.js
             ├── tokens-dark-lively-spacious-xs.json
             ├── tokens-dark-lively-spacious-xs.scss
             ├── tokens-dark-lively-spacious.css
             ├── tokens-dark-minimal-compact-l.css
             ├── tokens-dark-minimal-compact-l.js
             ├── tokens-dark-minimal-compact-l.json
             ├── tokens-dark-minimal-compact-l.scss
             ├── tokens-dark-minimal-compact-m.css
             ├── tokens-dark-minimal-compact-m.js
             ├── tokens-dark-minimal-compact-m.json
             ├── tokens-dark-minimal-compact-m.scss
             ├── tokens-dark-minimal-compact-mixins.scss
             ├── tokens-dark-minimal-compact-xs.css
             ├── tokens-dark-minimal-compact-xs.js
             ├── tokens-dark-minimal-compact-xs.json
             ├── tokens-dark-minimal-compact-xs.scss
             ├── tokens-dark-minimal-compact.css
             ├── tokens-dark-minimal-dense-l.css
             ├── tokens-dark-minimal-dense-l.js
             ├── tokens-dark-minimal-dense-l.json
             ├── tokens-dark-minimal-dense-l.scss
             ├── tokens-dark-minimal-dense-m.css
             ├── tokens-dark-minimal-dense-m.js
             ├── tokens-dark-minimal-dense-m.json
             ├── tokens-dark-minimal-dense-m.scss
             ├── tokens-dark-minimal-dense-mixins.scss
             ├── tokens-dark-minimal-dense-xs.css
             ├── tokens-dark-minimal-dense-xs.js
             ├── tokens-dark-minimal-dense-xs.json
             ├── tokens-dark-minimal-dense-xs.scss
             ├── tokens-dark-minimal-dense.css
             ├── tokens-dark-minimal-spacious-l.css
             ├── tokens-dark-minimal-spacious-l.js
             ├── tokens-dark-minimal-spacious-l.json
             ├── tokens-dark-minimal-spacious-l.scss
             ├── tokens-dark-minimal-spacious-m.css
             ├── tokens-dark-minimal-spacious-m.js
             ├── tokens-dark-minimal-spacious-m.json
             ├── tokens-dark-minimal-spacious-m.scss
             ├── tokens-dark-minimal-spacious-mixins.scss
             ├── tokens-dark-minimal-spacious-xs.css
             ├── tokens-dark-minimal-spacious-xs.js
             ├── tokens-dark-minimal-spacious-xs.json
             ├── tokens-dark-minimal-spacious-xs.scss
             ├── tokens-dark-minimal-spacious.css
             ├── tokens-light-lively-compact-l.css
             ├── tokens-light-lively-compact-l.js
             ├── tokens-light-lively-compact-l.json
             ├── tokens-light-lively-compact-l.scss
             ├── tokens-light-lively-compact-m.css
             ├── tokens-light-lively-compact-m.js
             ├── tokens-light-lively-compact-m.json
             ├── tokens-light-lively-compact-m.scss
             ├── tokens-light-lively-compact-mixins.scss
             ├── tokens-light-lively-compact-xs.css
             ├── tokens-light-lively-compact-xs.js
             ├── tokens-light-lively-compact-xs.json
             ├── tokens-light-lively-compact-xs.scss
             ├── tokens-light-lively-compact.css
             ├── tokens-light-lively-dense-l.css
             ├── tokens-light-lively-dense-l.js
             ├── tokens-light-lively-dense-l.json
             ├── tokens-light-lively-dense-l.scss
             ├── tokens-light-lively-dense-m.css
             ├── tokens-light-lively-dense-m.js
             ├── tokens-light-lively-dense-m.json
             ├── tokens-light-lively-dense-m.scss
             ├── tokens-light-lively-dense-mixins.scss
             ├── tokens-light-lively-dense-xs.css
             ├── tokens-light-lively-dense-xs.js
             ├── tokens-light-lively-dense-xs.json
             ├── tokens-light-lively-dense-xs.scss
             ├── tokens-light-lively-dense.css
             ├── tokens-light-lively-spacious-l.css
             ├── tokens-light-lively-spacious-l.js
             ├── tokens-light-lively-spacious-l.json
             ├── tokens-light-lively-spacious-l.scss
             ├── tokens-light-lively-spacious-m.css
             ├── tokens-light-lively-spacious-m.js
             ├── tokens-light-lively-spacious-m.json
             ├── tokens-light-lively-spacious-m.scss
             ├── tokens-light-lively-spacious-mixins.scss
             ├── tokens-light-lively-spacious-xs.css
             ├── tokens-light-lively-spacious-xs.js
             ├── tokens-light-lively-spacious-xs.json
             ├── tokens-light-lively-spacious-xs.scss
             ├── tokens-light-lively-spacious.css
             ├── tokens-light-minimal-compact-l.css
             ├── tokens-light-minimal-compact-l.js
             ├── tokens-light-minimal-compact-l.json
             ├── tokens-light-minimal-compact-l.scss
             ├── tokens-light-minimal-compact-m.css
             ├── tokens-light-minimal-compact-m.js
             ├── tokens-light-minimal-compact-m.json
             ├── tokens-light-minimal-compact-m.scss
             ├── tokens-light-minimal-compact-mixins.scss
             ├── tokens-light-minimal-compact-xs.css
             ├── tokens-light-minimal-compact-xs.js
             ├── tokens-light-minimal-compact-xs.json
             ├── tokens-light-minimal-compact-xs.scss
             ├── tokens-light-minimal-compact.css
             ├── tokens-light-minimal-dense-l.css
             ├── tokens-light-minimal-dense-l.js
             ├── tokens-light-minimal-dense-l.json
             ├── tokens-light-minimal-dense-l.scss
             ├── tokens-light-minimal-dense-m.css
             ├── tokens-light-minimal-dense-m.js
             ├── tokens-light-minimal-dense-m.json
             ├── tokens-light-minimal-dense-m.scss
             ├── tokens-light-minimal-dense-mixins.scss
             ├── tokens-light-minimal-dense-xs.css
             ├── tokens-light-minimal-dense-xs.js
             ├── tokens-light-minimal-dense-xs.json
             ├── tokens-light-minimal-dense-xs.scss
             ├── tokens-light-minimal-dense.css
             ├── tokens-light-minimal-spacious-l.css
             ├── tokens-light-minimal-spacious-l.js
             ├── tokens-light-minimal-spacious-l.json
             ├── tokens-light-minimal-spacious-l.scss
             ├── tokens-light-minimal-spacious-m.css
             ├── tokens-light-minimal-spacious-m.js
             ├── tokens-light-minimal-spacious-m.json
             ├── tokens-light-minimal-spacious-m.scss
             ├── tokens-light-minimal-spacious-mixins.scss
             ├── tokens-light-minimal-spacious-xs.css
             ├── tokens-light-minimal-spacious-xs.js
             ├── tokens-light-minimal-spacious-xs.json
             ├── tokens-light-minimal-spacious-xs.scss
             ├── tokens-light-minimal-spacious.css
             └── tokens-theme-mixins-index.scss
```

</details>

## CDN

We are using the Cloudflare CDN procured by Content Management Tribe under the Digital Customer Interaction (DCI). Specifically we have choosen a R2 bucket, which is an S3-compatible object storage that serves the static token assets via the Cloudflare CDN.

### Specific Version

The link to a token file is build up like the following:

```text
https://design-tokens.cdn.allianz.com/<TOKEN_PACKAGE_VERSION>/<PATH_TO_THE_TOKEN_FILE>
```

so for the version 1.2.0 the link looks like the following:

```text
https://design-tokens.cdn.allianz.com/1.2.0/allianz/a1/web/tokens-light-lively-spacious.1.2.0.css
```

### CDN File Overview

The following listing is an exemplary overview of the available token files in the `cdn` folder of the token package. The listing below shows which token files for each platform can be expected in the future. This means that **you please only rely on the tokens under `token-package/cdn/tokens/<TOKEN_PACKAGE_VERSION>/allianz/a1/web` for now**.

Recommended **A1** default theming combination is: `light lively spacious`

<details>
<summary>Expand CDN directory listing</summary>

```text
cdn
 └─> tokens
     ├─> <TOKEN_PACKAGE_VERSION>
     │   └─> allianz
     │       └─> a1
     │           ├─> android
     │           │   ├── tokens-dark-lively-compact-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-compact-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-dense-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-dense-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-dark-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-compact-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-compact-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-dense-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-dense-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.kt
     │           │   ├── tokens-light-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.kt
     │           │   └── tokens-light-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.kt
     │           ├─> ios
     │           │   ├── tokens-dark-lively-compact-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-compact-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-dense-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-dense-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-dark-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-compact-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-compact-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-dense-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-dense-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.swift
     │           │   ├── tokens-light-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.swift
     │           │   └── tokens-light-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.swift
     │           └─> web
     │               ├── tokens-dark-lively-compact-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-compact-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-compact-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-compact-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-compact-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-compact-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-compact-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-compact-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-compact-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-compact.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-dense-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-dense-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-dense-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-dense-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-dense-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-dense-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-dense-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-dense-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-dense-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-dense.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-spacious-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-lively-spacious.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-compact-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-compact.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-dense-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-dense.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-spacious-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-dark-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-dark-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-dark-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-dark-minimal-spacious.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-compact-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-compact-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-compact-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-compact-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-compact-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-compact-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-compact-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-compact-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-compact-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-compact-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-compact.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-dense-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-dense-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-dense-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-dense-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-dense-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-dense-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-dense-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-dense-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-dense-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-dense-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-dense.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-spacious-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-spacious-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-spacious-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-lively-spacious-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-lively-spacious.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-compact-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-compact-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-compact-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-compact-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-compact.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-dense-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-dense-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-dense-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-dense-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-dense.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-spacious-l.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-spacious-m.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-spacious-mixins.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.css
     │               ├── tokens-light-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.js
     │               ├── tokens-light-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.json
     │               ├── tokens-light-minimal-spacious-xs.<TOKEN_PACKAGE_VERSION>.scss
     │               ├── tokens-light-minimal-spacious.<TOKEN_PACKAGE_VERSION>.css
     │               └── tokens-theme-mixins-index.<TOKEN_PACKAGE_VERSION>.scss
     └── dist-history.json
```

</details>

#### Format Considerations

Besides the consideration regarding integrating the design tokens during build- and run-time, there are also other technical considerations, which are important when choosing the right design token format for your web project.

- CSS
  - _Pros_: Can be used across Shadow DOM boundaries during run-time
  - _Cons_: Are not tree-shakable
- SCSS
  - _Pros_: Tree-shakable
  - _Cons_: No overriding during run-time
- JS
  - _Pros_: Tree-shakable; Can be used across Shadow DOM boundaries
  - _Cons_: Performance Overhead, Debugging, Separation of Concerns
- JSON
  - _Pros_: Can be used across Shadow DOM boundaries
  - _Cons_: Performance Overhead, Debugging, Separation of Concerns

## Implementation

### Which Token Asset File should I use?

Recommended **A1** default theming combination is: `light lively spacious`

This **A1** default theming combination and their breakpoints are integrated as media queries in the file `tokens-light-lively-spacious.1.2.0.css`, which makes it the first choice design token asset file, if you do not know exactly, with which file to start with.

As commonly usual in **multi-dimensional theming** set ups, each theming combination is available for each breakpoint (see the respective file listings above). So if you want to rely on other design token asset file formats rather than CSS, you have to take care of switching theme for a certain breakpoint yourself. These breakpoint values themselves are also specified and available as design tokens in the **core** token layer.

### Integration Scenarios

In the realm of application development, the integration of design tokens can be approached in two primary ways: during build time or run-time. Each method carries its distinct advantages and limitations.

Build-time integration is known for its efficiency and performance benefits. By embedding design tokens directly into the application during the build process, we can ensure a seamless user experience with faster load times. However, this method can be less flexible, as any changes to design tokens necessitate a new build and deployment cycle.

On the other hand, run-time integration offers a high degree of flexibility, allowing for design tokens to be altered and applied dynamically without the need for recompiling the application. This can be particularly useful for theming or enabling real-time customization. The trade-off, however, is often a potential impact on performance, as these changes are processed during the application's execution.

As we move forward, we are committed to enhancing our integration strategies to offer a more robust, efficient, and flexible development environment. This will enable us to adapt to changing design requirements swiftly while maintaining high performance and user experience standards.

#### Build Time Integration

For example at the top of your `_variables.scss` file in your general style in your project, import the Allianz default theme, assuming you [installed the design tokens via NPM](https://github.developer.allianz.io/a1/design-tokens/blob/main/token-package/README.md#install-the-package).

```SCSS
// relative path to your node_modules folder most likely varies
@use '../node_modules/@allianz/a1-design-tokens/dist/allianz/a1/web/tokens-light-lively-spacious-xs' as *;
```

Pay attention that you have to take care of the breakpoint media queries yourself in this case, as this example is only using the `xs` breakpoint tokens.

##### Considerations

###### _Pros_

- **Performance:** Design tokens as SCSS variables are tree-shakable during build time and can optimize bundle sizes and therefore load times.
- **Safety:** Ensures during compile time that you do not make use of unsupported design tokens in your code. Maybe caused by misspellings or because a design token name changed. This is especially helpful, if you want to easily migrate to newer design token major versions in the future. There are some helpful browser extensions like [CSS Undefined Variable Checker](https://chromewebstore.google.com/detail/css-undefined-variable-ch/endbpplgeglmgihkpiapmaimegpkhhcn), but unfortunately they can't guarantee to catch all undefined CSS variables across all different states (hover, active, focus, etc.) of a HTML element can have styles defined for. So the most reliable integrations is during build time, like i.e. with SCSS.

###### _Cons_

- **Debugging:** Currently we have not combined CSS variables into the design tokens provided as SCSS variables. Therefore you won't see the respective design token that was used in production of your application, for example in a browser inspector. During development though you can and should have a proper source mapping in place, with which you can inspect your SCSS source files in the browser, as well.
- **Dynamic:** In order to support dynamic theming, like a user switching to the dark theme during run-time, additional logic and a mapping to the CSS variables of the design tokens still needs to be done.

#### Run Time Integration

For example in the `<head>` of you website add the following link tag of the Allianz default theme like the following:

```HTML
<link href="https://design-tokens.cdn.allianz.com/1.2.0/allianz/a1/web/tokens-light-lively-spacious.1.2.0.css" rel="stylesheet" type="text/css" />
```

##### Considerations

###### _Pros_

- **Dynamic:** Allows styles to be applied based on run-time conditions, like a user switching to the dark theme.
- **Debugging:** Prodction applications can be inspected for the actual design tokens that are used.

###### _Cons_

- **Performance:** You will always load all tokens, but normally only a percentage of these tokens are actually needed.
- **Complexity:** Increases codebase complexity due to run-time styling handling, in which the correct themes have to be loaded on demand.
- **Maintainability:** Regarding the ability of the application to be future-proof for major design token updates, it will be harder to migrate to newer design token major versions, because it can't be guaranteed, that all of your tokens are still correct. There are some helpful browser extensions like [CSS Undefined Variable Checker](https://chromewebstore.google.com/detail/css-undefined-variable-ch/endbpplgeglmgihkpiapmaimegpkhhcn), but unfortunately they can't guarantee to catch all undefined CSS variables across all different states (hover, active, focus, etc.) of a HTML element can have styles defined for. So the most reliable integrations is during build time, like i.e. with SCSS.

#### Mixed Integration Scenario

We as the Allianz Studio design system team recognize the importance of both methods, build-time and run-time integrations, and the value they bring to our development process. Our goal for the future is to explore and provide integration scenarios that harness the best of both worlds—combining the speed and reliability of build-time integration with the adaptability of run-time integration. By doing so, we aim to minimize the downsides of each approach. As first approach to this, we are providing a single and configurable SCSS mixin entry point, which provides the design tokens for a specific themeing combination and it's corresponding media queries.

##### Configurable Selector via SCSS Mixins

In case you want to adjust the selector under which all the CSS variable representations of the design tokens are defined, then you can make use of the special configurable SCSS mixins for each theme. These mixins already come fully responsive with media queries for all breakpoints like corresponding CSS files with their incorporated media queries. To make it even more simpler, there is one central entry point like SCSS mixin, which you can pass the wanted theme data as parameters, like the following:

```SCSS
// relative path to your node_modules folder most likely varies
@use '../node_modules/@allianz/a1-design-tokens/dist/allianz/a1/web/tokens-theme-mixins-index' as tokens;

@include tokens.apply-design-tokens('light', 'lively', 'spacious', '.your-custom-selector');
```

which compiles to

```CSS
.your-custom-selector {
  --core-color-blue-100: #F0F7FC;
  ...
}

@media screen and (min-width: 704px) {
  .your-custom-selector {
    ...
  }
}

@media screen and (min-width: 992px) {
  .your-custom-selector {
    ...
  }
}
```

### Token Usage

If you want to quickly understand, how the **A1** design Tokens can be used in your code, you may want ot have a look in [the A1 typography example](https://github.developer.allianz.io/a1/poc-experiments/blob/main/early-demos/demo-typography.html) as CSS variables in a HTML static website. Download the example and just drag'n'drop the file in your browser, then examine the HTML & CSS source code in your browser inspector. The design tokens can be used in CSS for example like the following for a headline:

```html
<style>
	.headline-6xl {
		font: var(--semantic-text-headline-6xl);
		letter-spacing: var(--semantic-letter-spacing-headline-6xl);
	}
</style>

<h1 class="headline-6xl">Headline 6XL</h1>
```

In the linked [PoC Experiments repository](https://github.developer.allianz.io/a1/poc-experiments) a few more example design token integration examples are available. Please acknowledge, that these examples may not be updated to the latest design token release version and are relying on a specific version, that they have been using.

## Versioning & Release Cycles

In the following we describe how versioning is handled, especially with regard to breaking changes. We now have reached 1.0.0 and from then on we will strictly adhere to semantic versioning, where breaking changes will only occur with major version increments, in a half year major version release cycle. This release cycle will start with version 1.0.0 in the end of Oktober 2025.

### Pre-1.0.0 Versioning Guidelines

Before reaching the 1.0.0 release, which typically signifies a stable API, we followed a modified version of semantic versioning that focused on feature increments:

1. **Major Version (0.x.x):** While the project is still in its initial development phase and before we reach a stable API (1.0.0), the major version will remain at 0. This indicates that the project is in a rapid development stage, and users should expect changes and updates frequently.

2. **Minor Version (0.Y.x):** For every new release that includes breaking changes, we will increment the minor version number (Y). This is a departure from post-1.0.0 semantic versioning, where breaking changes would typically increment the major version number. Before 1.0.0, we use the minor version to signal significant updates that may include incompatible API changes, removal of features, or any changes that require users to modify their existing code.

3. **Patch Version (0.0.Z):** The patch version (Z) will be incremented for releases that include backwards-compatible bug fixes, minor improvements, or non-breaking changes that do not add substantial new functionality. These updates focus on improving the stability and performance of the software without affecting its current functionality.

4. **Pre-release Tags:** For any pre-release versions, we may use additional tags such as `alpha`, `beta`, or `rc` (release candidate) to indicate the release's stability and readiness for production use. For example, `0.3.0-alpha` indicates an alpha release of version 0.3.0.

5. **Communicating Changes:** All changes will be documented in the project's CHANGELOG, with clear descriptions of the updates, especially for breaking changes. We encourage contributors to provide detailed commit messages and pull request descriptions to aid in the generation of comprehensive release notes.

By following these guidelines, we aim to provide a clear and predictable path for the project's evolution. Design token consumers should be aware that breaking changes are expected and normal during this early phase of development and that the software should not be considered stable until the version 1.0.0 release.

Remember, the key goal during the pre-1.0.0 phase is to iterate quickly and incorporate feedback to shape the software into a stable and feature-rich product that meets the needs of its users.

### Connected Release Versions

As we have a true end-2-end connection between desgins, design tokens and component libraries it is important to understand, which version of each respective part works together with each of the other parts. Therefore [a release compatibility overview](https://one.allianz.com/document/1025#/updates/releases/changelog) documents the compatible versions.

### Definition of Breaking Changes

In order to get a better understanding, which changes compared to the previous release of the tokens cause a breaking change and which do not, take a look at the following table:

| Action or Change                                | Non-Breaking Change | Breaking Change | Comment                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | ------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adding new token                                | ✅                  |                 | Adding new things without changing existing things, is never breaking anything.                                                                                                                                                                                                                                                                                                                                                                                                       |
| Deleting a token                                |                     | ❌              | If someone has already been using this token, it will break his project, when he wants to use the new version of the tokens and a previously existing token is now missing with the new version.                                                                                                                                                                                                                                                                                      |
| Renaming a token                                |                     | ❌              | The structure in the token set defines the name of the token. If the token name changes, this means a breaking change, cause it has to be manually updated to the new name wherever it is already used.                                                                                                                                                                                                                                                                               |
| Changing the reference of an existing token     | ✅                  |                 | It is a change in the design but not in the token system.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Changing the token type of an existing token    | ✅                  |                 | It is a change in the meta info of a token but not in the token system. Still changing the token type might cause the token value to be parsed differently in the build process of the design tokens, but this is not considered a breaking change in the majority of all cases. It is very unlikely that the unit of the token will change. If this would be the case, this probably has to be handled as a breaking change. TBD                                                     |
| Changing the value of an existing token         | ✅                  |                 | It is a change in the design but not in the token system.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Adding a new theming dimension                  |                     | ❌              | The permutation of all possible theme combinations are currently reflected in the name of the output files. If a file name for a theme changes or is not available anymore, it is a breaking change, because the import paths of people using the tokens do not match any of the provided output files. For example, with the introduction of the animation theming dimension, the default theme file changed from `tokens-spacious-light.css` to `tokens-spacious-light-lively.css`. |
| Deleting a theming dimension                    |                     | ❌              | The permutation of all possible theme combinations are currently reflected in the name of the output files. If a file name for a theme changes or is not available anymore, it is a breaking change.                                                                                                                                                                                                                                                                                  |
| Renaming a theming dimension                    |                     | ❌              | The permutation of all possible theme combinations are currently reflected in the name of the output files. If a file name for a theme changes or is not available anymore, it is a breaking change.                                                                                                                                                                                                                                                                                  |
| Restructuring the tokens in the SSOT JSON files |                     | ❌              | The structure in the token set defines the name of the token. If the token name changes, this means a breaking change, because it has to be manually updated to the new name wherever it is already used.                                                                                                                                                                                                                                                                             |
| Deleting an existing internal token             | ✅                  |                 | Internal tokens are not exposed outside of the SSOT like in the design token output file assets                                                                                                                                                                                                                                                                                                                                                                                       |
| Renaming an existing internal token             | ✅                  |                 | Internal tokens are not exposed outside of the SSOT like in the design token output file assets                                                                                                                                                                                                                                                                                                                                                                                       |

## Design Token Migration Script

If you are already using an older version of the A1 design tokens, you can use the migration script with the corresponding migration file, that is able to resolve all breaking changes connected to design token names between versions of this token-package. In theory it can easily be enhanced with own design token names or design token names in other formats than CSS variables or also with import paths before you run the script. More dedicated details under [Migrations](https://github.developer.allianz.io/a1/design-tokens/tree/main/migrations).

## Background Informations

### Design Token Standard

There are several companies that produce design related products. All of them try to solve the problem of standardise Design Tokens. To find the best solution for the digital design and development industry they formed a community around the topic in July 2019. Among the companies you find names like PenPot, Tokens Studio, Google (Material Design), Framer, Marvel, Zeroheight, Figma, Sketch, Adobe (XD), InVision, Interplay, Knapsack, Arcade, UXPin, Axure, Modulz, Abstract, Zeplin etc. All of them agreed upon the fact that it is hard to find a general approach where every vendor will align to. But they are willing to work on it. We as Allianz will stick to what was decided there to ensure a high level of reusability.

- [W3C Design Tokens](https://www.w3.org/community/design-tokens/)
- [W3C Design Tokens - Working Draft](https://design-tokens.github.io/community-group/format/)

### Design Decisions

Please be aware that the design tokens administered here describe the technically mapped design decisions of Allianz. For all design tokens, there are explanatory and more detailed descriptions of the intended use. In some cases, it may be useful to use these descriptions as a basis for decision-making in order to clarify possible questions. In doubt, please contact the Design System Team within the Allianz Studio.

Find more information here: [A1 Brand Guidelines](https://one.allianz.com/)

### Design System Feature Overview

- Accessible by Design
- Micro Animations as first-class citizens
- Platform-Agnostic
- E2E Technical Integration with Design Tokens
- UI Densities instead of Retail/Expert
- Responsive & Mobile First
- Multi-Dimensional Theming Support

### Technical Decisions

Allianz products and services build upon a broad and heterogeneous technology landscape. This repository is therefore the single source of truth for different kind of platforms, tools and Alllianz brands. The goal is to provide an as simple as possible solution for every consuming party.

- All descriptions and assets are directly accessible via URL (not a bug, it's a feature).
- All files contain a versioning information in the header comment and additionally in the file name for the CDN distribution.
- Obsolete or incorrect released files are not deleted. If there are problems, we will inform you via all channels and will provide a correction with the next release.

### Keep Informed

Updates and announcements will be communicated directly by the Allianz Studio. Apart from purely technical changes, we implicitly ask you to use the official Allianz Studio channels (e-mail, newsletter, Microsoft Teams) for announcements and voting.

Find more information here under [A1 Brand Guidelines](https://one.allianz.com/).
If you have questions feel free to reach out to use via [our Allianz Teams channel](https://teams.microsoft.com/l/team/19%3aExOsuBe8zknc18D-HRrDFdSM1WHXyvPmWDH9HFc_uCw1%40thread.tacv2/conversations?groupId=84dc364c-f66f-4602-81b9-184f4c3f1828&tenantId=6e06e42d-6925-47c6-b9e7-9581c7ca302a).

## License

[Copyright (c) 2026 Allianz SE](LICENSE)
