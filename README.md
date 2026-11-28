# MAD Designer Website

This repository contains the source for the official website of **MAD Designer**, an open-source business intelligence and report designer for iOS, native macOS, and native Windows. The live site is [mad.everydayapps.com](https://mad.everydayapps.com).

The desktop applications ship **0.7**; the engine is **9.0** (`r4433`). **Composition Reports** are new in the upcoming **0.8** release (engine **9.1**). The iOS App Store release returns in early 2027.

## About MAD Designer

MAD Designer lets users design, view, and share custom reports directly from their enterprise data sources. It connects to PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, and SQLite on iPhone, iPad, native macOS, and native Windows, and the same engine runs headless on Linux and Windows through the `mad` CLI.

The application consists of three main components:

1. A **Query Designer** to build ad hoc queries with multiple tables, joins, filters, and groupings.
2. A **Report Designer** to create visually rich reports with data labels, images, and custom formatting.
3. A **Report Viewer** to interact with the generated reports.

Reports are saved as `.mad` files (Mobile Analytics Document), a portable document that holds the schema, query, and layout. The format has an open specification at [docs.everydayapps.com](https://docs.everydayapps.com/).

The application UI is available in English, Simplified Chinese, Japanese, Brazilian Portuguese, German, and Latin American Spanish. The translations are machine-assisted and may contain errors.

## Key Features

* **Direct Database Connectivity**: PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, and SQLite.
* **Powerful Query Builder**: complex queries through a visual table/join canvas or pasted SQL.
* **Rich Report Authoring**: data labels, images, aggregates, barcodes, and custom formatting.
* **Composition Reports**: combine reports from several databases into one portable `.mad` document; every source keeps its own query, layout, and data.
* **Share and Export**: interactive `.mad` files, or PDF, HTML, CSV, and JSON.
* **Headless Engine and CLI**: the same engine as the apps, driven by `mad` and `mad-action`.
* **Open `.mad` Format**: one portable, inspectable document with a published specification.
* **Six UI Languages**: English plus the five translations, with the machine-assisted caveat.

## Target Audience

MAD Designer is built for:

* **Business Analysts** who need to transform raw data into actionable insights.
* **Data Professionals & Developers** who need to test queries, embed the engine, or automate reports.

The desktop builds are unsigned, so the current audience is primarily developers and technical users. The Windows build is unsigned and SmartScreen will ask; the install guidance is in the [Windows guide](https://docs.everydayapps.com/windows.html).

## About This Website

This site is built with Jekyll. English pages are at the repository root; `de/`, `es/`, `ja/`, `pt-br/`, and `zh/` mirror the five content pages. One layout (`_layouts/default.html`) and its includes hold the header, footer, analytics, consent banner, language switcher, and `hreflang` set. All custom styles are in `css/style.css`.

`_data/versions.yml` is the version source. Change it in both this repository and the Reports documentation repository. The English privacy policy is authoritative; translations carry an "English original prevails" notice. The build excludes `README.md`, `AGENTS.md`, and every other Markdown source.

```sh
jekyll build -d _site
python3 scripts/check_site.py
```

The checker also verifies that every docs link on a localized page stays in
that language's docs tree (and that English pages do not link a translated
tree), using `_data/docs_paths.yml`.

This project uses tabs for indentation.

## Other Documents

* [Documentation site](https://docs.everydayapps.com/) — the `.mad` specification, app guides, and developer documentation
* [Developer documentation](https://docs.everydayapps.com/developers/) — format, CLI, architecture, and build records
* [Privacy Policy](privacy.html)
* [About the .MAD File Type](mad-file-type.html)
