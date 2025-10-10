# MAD Designer Website

## Details

MAD Designer is a mobile analytics document designer built for iOS devices (iPhone, iPad, My Mac (designed for iPad)).  It is in the [Apple iPhone App Store](https://apps.apple.com/us/app/mad-designer/id666001433) and the [Mac App Store](https://apps.apple.com/us/app/mad-designer/id666001433).

This project uses tabs for spacing.

Below are some details about the application:

1. `MAD` is short for Mobile Analytics Document (M.A.D.).  The software is a _mobile analytics document designer_.
2. It is not yet localized.  It is currently English only.  Other languages should be coming soon, but no promises.
3. It allows users to connect to the following databases
	1. MySQL
	2. Microsoft SQL Server
4. It is a modern business intelligence platform.
5. The software has three main parts
	1. A query designer
	2. A report designer
	3. A report viewer
6. The target of this application are users and businesses that want to connect to MySQL and Microsoft SQL Server from their iPhone, iPad, or Mac OS.
7. The application name is `MAD Designer`
8. This website is made up of static web files
9. This website is hosted at [mad.everydayapps.com](https://mad.everydayapps.com/) though the repo name is `mad.github.io`.  It is hosted by Github, but the Github URL for the site should not be used.

## App Store Information

**Name**: MAD Designer
**Subtitle**: Mobile BI Report Builder
**Bundle ID**: com.everydayapps.mad.designer
**Apple ID**: 666001433
**Subtitle**: Mobile BI Report Builder
**Category**: _Business_ and _Productivity_
**Age Suitability URL**: There currently isn't one
**Promotional Text**: Design and share custom business intelligence reports on the go. Connect to SQL Server and MySQL, build queries, and export reports instantly.
**Keywords**: intelligence,bi,report,query,sql,server,database,mysql,enterprise,creator,maker,generator,db,data,
**Support URL**: https://mad.everydayapps.com/contact.html
**Marketing URL**: https://mad.everydayapps.com/
**Version**: 9.0
**Copyright**: 2025 Everyday Apps LLC

**Description**
MAD Designer is a powerful mobile business intelligence tool that lets you design, view, and share custom reports directly from your enterprise data. Built for SQL Server and MySQL databases, it enables professionals to transform raw data into clear, actionable insights on iPhone, iPad, and Mac (Designed for iPad).

With MAD Designer, you can connect securely to SQL Server and MySQL databases, design ad hoc queries with multiple tables, joins, groupings, and filters, and build rich reports with data labels, images, summaries, and custom formatting. Reports can be shared as interactive MAD document files with colleagues, or exported as static PDF files for wider distribution.

Sample reports are included so you can get started quickly. Whether you are a business analyst, data professional, or decision-maker, MAD Designer makes it easy to create the reports you need—anytime, anywhere.

**What's New in This Version**
This release brings MAD Designer back to the App Store with updated compatibility and performance improvements. Version 9.0 delivers a smoother experience for designing and sharing reports with SQL Server and MySQL databases.

## Branding Guidelines

**Background Color**: #ffffff;
**Primary Color**: #6A9AD1;
**Accent Color**: #B6494C;

## Logos

_The logos do not have the rounded corners._

The icons are in the `img` folder.  The number at the end of the icon name is the size of the image.  For instance, the one that ends with 20 is a 20x20 icon.  The one that ends in 72 is 72x72.

## Development Guidelines

- **Privacy Policy**: The text content of `privacy.html` is a legal document and **must not be altered**. You may update the styling and layout, but the core text must remain unchanged.
- **Indentation**: Use tabs for indentation in all HTML and CSS files.
- **Website Structure**: The website is built with static HTML and CSS. All styles should be centralized in the `css/style.css` file to maintain a consistent design.
- **Verification**: Before submitting changes, perform frontend verification by running a Playwright script to capture screenshots of the updated pages. Ensure the visual appearance is correct.

## Screenshots and App Preview

- `app-preview.mp4`: This is an App Preview of the iPhone.  It's 29 seconds long and 886 × 1920 resolution.  It is `H.264` encoded `.mp4` file.
- `screenshot-00.png`: This is a screenshot of the file explorer which shows some sample reports.
- `screenshot-01.png`: This is a screenshot how how to create a new report. It shows a screen to choose a datasource by selecting MySQL or Microsoft SQL Server.
- `screenshot-02.png`: This is a screenshot of they query designer.
- `screenshot-03.png`: This is a landscape screenshot of the query designer.
- `screenshot-04.png`: This is a screenshot of the report designer.
- `screenshot-05.png`: This is another screenshot of the report designer.  This one shows a user adding formatting to a data field.
- `screenshot-06.png`: This is how you select a new data field for the report designer.  It has data label, static label, aggregate, image, and whitespace as options.
- `screenshot-07.png`: This is a screenshot shows a sample report.
