const axios = require('axios');
const cheerio = require('cheerio');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'rikard',
    password: 'arsenalfc',
    port: '3306',
    database: 'batti'
})

async function sqlQuery(sql, args) {
	return new Promise((resolve, reject) => {
	  pool.getConnection(function (err, connection) {
		if (err) {
		  return reject(err);
		}
		connection.query(sql, args, function (err, result) {
		  connection.release();
		  if (err) {
			return reject(err);
		  }
		  return resolve(result);
		});
	  });
	});
  }


  // Make request look like from browser

// const config = {
// 	headers: {
// 	  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
// 	  'Accept-Encoding': 'gzip, deflate, br',
// 	  'Accept-Language': 'sv-SE,sv;q=0.9',
// 	  'User-Agent':
// 		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Safari/605.1.15',
// 	},
//   };
//   fetchSites('https://lyko.com/sv', 'Ellos');


let html = `<!DOCTYPE html>
<html lang="sv-SE">

<head>
	<meta charSet="utf-8" />
	<style id="vanilla-css-variables">
		:root {
			--interactionColor: secondary;
			--iconType: Outlined;
			--palette-primary-main: #1E2D37;
			--palette-primary-light: #BDCFDB;
			--palette-primary-dark: #121B21;
			--palette-primary-contrastText: #FFFFFF;
			--palette-primary-contrastTextOnLight: #1F2225;
			--palette-primary-contrastTextOnDark: #FFFFFF;
			--palette-secondary-main: #0A5582;
			--palette-secondary-light: #A0D7F8;
			--palette-secondary-dark: #052E47;
			--palette-secondary-contrastText: #FFFFFF;
			--palette-secondary-contrastTextOnLight: #1F2225;
			--palette-secondary-contrastTextOnDark: #FFFFFF;
			--palette-tertiary-main: #008F64;
			--palette-tertiary-light: #99FFE1;
			--palette-tertiary-dark: #004D36;
			--palette-tertiary-contrastText: #FFFFFF;
			--palette-tertiary-contrastTextOnLight: #1F2225;
			--palette-tertiary-contrastTextOnDark: #FFFFFF;
			--palette-success-main: #008F64;
			--palette-success-light: rgb(89, 147, 64);
			--palette-success-dark: rgb(33, 84, 11);
			--palette-success-contrastText: #FFFFFF;
			--palette-success-contrastTextOnLight: #FFFFFF;
			--palette-success-contrastTextOnDark: #FFFFFF;
			--palette-error-main: #721c24;
			--palette-error-light: rgb(214, 51, 51);
			--palette-error-dark: rgb(142, 0, 0);
			--palette-error-contrastText: #FFFFFF;
			--palette-error-contrastTextOnLight: #FFFFFF;
			--palette-error-contrastTextOnDark: #FFFFFF;
			--palette-warning-main: #ed6c02;
			--palette-warning-light: #ff9800;
			--palette-warning-dark: #e65100;
			--palette-warning-contrastText: #FFFFFF;
			--palette-warning-contrastTextOnLight: #FFFFFF;
			--palette-warning-contrastTextOnDark: #FFFFFF;
			--palette-info-main: #0288d1;
			--palette-info-light: #03a9f4;
			--palette-info-dark: #01579b;
			--palette-info-contrastText: #FFFFFF;
			--palette-info-contrastTextOnLight: #FFFFFF;
			--palette-info-contrastTextOnDark: #FFFFFF;
			--palette-background-paper: #FFFFFF;
			--palette-background-default: #F1F2F3;
			--palette-text-primary: #1F2225;
			--palette-text-secondary: #5D656F;
			--palette-text-hint: #B7BCC3;
			--palette-text-disabled: #B7BCC3;
			--palette-grey-50: #FAFAFA;
			--palette-grey-100: #F1F2F3;
			--palette-grey-200: #ECEEF0;
			--palette-grey-300: #E3E5E7;
			--palette-grey-400: #B7BCC3;
			--palette-grey-500: #959DA7;
			--palette-grey-600: #5D656F;
			--palette-grey-700: #4D545C;
			--palette-grey-800: #3A3F45;
			--palette-grey-900: #1F2225;
			--palette-grey-A100: #D5D5D5;
			--palette-grey-A200: #AAAAAA;
			--palette-grey-A400: #616161;
			--palette-grey-A700: #303030;
			--palette-action-active: rgba(31, 34, 37, 0.54);
			--palette-action-hover: rgba(31, 34, 37, 0.04);
			--palette-action-selected: rgba(31, 34, 37, 0.08);
			--palette-action-focus: rgba(31, 34, 37, 0.12);
			--palette-action-disabledBackground: rgba(31, 34, 37, 0.12);
			--palette-action-disabled: rgba(31, 34, 37, 0.26);
			--palette-common-black: #000000;
			--palette-common-white: #FFFFFF;
			--palette-sustainability-main: #2EB755;
			--palette-sustainability-background: #EDFEF2;
			--palette-sustainability-text: #1D522C;
			--palette-divider: #E3E5E7;
			--palette-borderColor: #E3E5E7;
			--palette-menuColor: #FFFFFF;
			--palette-heroHeaderBackground: transparent;
			--palette-sectionBackground: transparent;
			--palette-interaction-main: #0A5582;
			--palette-interaction-light: #A0D7F8;
			--palette-interaction-dark: #052E47;
			--palette-interaction-contrastText: #FFFFFF;
			--palette-interaction-contrastTextOnLight: #1F2225;
			--palette-interaction-contrastTextOnDark: #FFFFFF;
			--typography-fontFamily: "Gothia Serif", sans-serif;
			--typography-fontSize: 16px;
			--typography-htmlFontSize: 16px;
			--typography-fontWeightLight: 300;
			--typography-fontWeightRegular: 400;
			--typography-fontWeightMedium: 400;
			--typography-fontWeightBold: 700;
			--typography-h1-fontFamily: "Gothia Serif", sans-serif;
			--typography-h1-fontSize: 32px;
			--typography-h1-fontWeight: 700;
			--typography-h1-letterSpacing: 0px;
			--typography-h1-lineHeight: 40px;
			--typography-h1-textTransform: none;
			--typography-h2-fontFamily: "Gothia Serif", sans-serif;
			--typography-h2-fontSize: 28px;
			--typography-h2-fontWeight: 700;
			--typography-h2-letterSpacing: 0px;
			--typography-h2-lineHeight: 36px;
			--typography-h2-textTransform: none;
			--typography-h3-fontFamily: "Gothia Serif", sans-serif;
			--typography-h3-fontSize: 22px;
			--typography-h3-fontWeight: 700;
			--typography-h3-letterSpacing: 0px;
			--typography-h3-lineHeight: 32px;
			--typography-h3-textTransform: none;
			--typography-h4-fontFamily: "Gothia Serif", sans-serif;
			--typography-h4-fontSize: 18px;
			--typography-h4-fontWeight: 700;
			--typography-h4-letterSpacing: 0px;
			--typography-h4-lineHeight: 24px;
			--typography-h4-textTransform: none;
			--typography-h5-fontFamily: "Gothia Serif", sans-serif;
			--typography-h5-fontSize: 18px;
			--typography-h5-fontWeight: 700;
			--typography-h5-letterSpacing: 0px;
			--typography-h5-lineHeight: 24px;
			--typography-h5-textTransform: none;
			--typography-h6-fontFamily: "Gothia Serif", sans-serif;
			--typography-h6-fontSize: 16px;
			--typography-h6-fontWeight: 700;
			--typography-h6-letterSpacing: 0px;
			--typography-h6-lineHeight: 24px;
			--typography-h6-textTransform: none;
			--typography-body1-fontFamily: "Gothia Serif", sans-serif;
			--typography-body1-fontSize: 16px;
			--typography-body1-fontWeight: 400;
			--typography-body1-letterSpacing: 0px;
			--typography-body1-lineHeight: 24px;
			--typography-body1-textTransform: none;
			--typography-body2-fontFamily: "Gothia Serif", sans-serif;
			--typography-body2-fontSize: 14px;
			--typography-body2-fontWeight: 400;
			--typography-body2-letterSpacing: 0px;
			--typography-body2-lineHeight: 20px;
			--typography-body2-textTransform: none;
			--typography-button-fontFamily: "Gothia Serif", sans-serif;
			--typography-button-fontSize: 1rem;
			--typography-button-fontWeight: 700;
			--typography-button-letterSpacing: 0.05em;
			--typography-button-lineHeight: 1.75;
			--typography-button-textTransform: uppercase;
			--typography-caption-fontFamily: "Gothia Serif", sans-serif;
			--typography-caption-fontSize: 12px;
			--typography-caption-fontWeight: 400;
			--typography-caption-letterSpacing: 0px;
			--typography-caption-lineHeight: 16px;
			--typography-caption-textTransform: none;
			--typography-caption1Big-fontFamily: "Gothia Serif", sans-serif;
			--typography-caption1Big-fontSize: 24px;
			--typography-caption1Big-fontWeight: 700;
			--typography-caption1Big-letterSpacing: inherit;
			--typography-caption1Big-lineHeight: 32px;
			--typography-caption1Big-textTransform: inherit;
			--typography-caption2Big-fontFamily: "Gothia Serif", sans-serif;
			--typography-caption2Big-fontSize: 18px;
			--typography-caption2Big-fontWeight: 700;
			--typography-caption2Big-letterSpacing: inherit;
			--typography-caption2Big-lineHeight: 24px;
			--typography-caption2Big-textTransform: uppercase;
			--typography-caption1Small-fontFamily: "Gothia Serif", sans-serif;
			--typography-caption1Small-fontSize: 18px;
			--typography-caption1Small-fontWeight: 700;
			--typography-caption1Small-letterSpacing: inherit;
			--typography-caption1Small-lineHeight: 24px;
			--typography-caption1Small-textTransform: inherit;
			--typography-caption2Small-fontFamily: "Gothia Serif", sans-serif;
			--typography-caption2Small-fontSize: 16px;
			--typography-caption2Small-fontWeight: 700;
			--typography-caption2Small-letterSpacing: inherit;
			--typography-caption2Small-lineHeight: 24px;
			--typography-caption2Small-textTransform: uppercase;
			--typography-chip-fontFamily: "Gothia Serif", sans-serif;
			--typography-chip-fontSize: 12px;
			--typography-chip-fontWeight: 400;
			--typography-chip-letterSpacing: 0.025em;
			--typography-chip-lineHeight: 16px;
			--typography-chip-textTransform: uppercase;
			--typography-overline-fontFamily: "Gothia Serif", sans-serif;
			--typography-overline-fontSize: 12px;
			--typography-overline-fontWeight: 400;
			--typography-overline-letterSpacing: 0.1em;
			--typography-overline-lineHeight: 16px;
			--typography-overline-textTransform: uppercase;
			--typography-subtitle1-fontFamily: "Gothia Serif", sans-serif;
			--typography-subtitle1-fontSize: 18px;
			--typography-subtitle1-fontWeight: 400;
			--typography-subtitle1-letterSpacing: 0px;
			--typography-subtitle1-lineHeight: 24px;
			--typography-subtitle1-textTransform: none;
			--typography-subtitle2-fontFamily: "Gothia Serif", sans-serif;
			--typography-subtitle2-fontSize: 12px;
			--typography-subtitle2-fontWeight: 400;
			--typography-subtitle2-letterSpacing: 0px;
			--typography-subtitle2-lineHeight: 16px;
			--typography-subtitle2-textTransform: none;
			--typography-tag1-fontFamily: "Gothia Serif", sans-serif;
			--typography-tag1-fontSize: 12px;
			--typography-tag1-fontWeight: 400;
			--typography-tag1-letterSpacing: 0.025em;
			--typography-tag1-lineHeight: 16px;
			--typography-tag1-textTransform: uppercase;
			--typography-tag2-fontFamily: "Gothia Serif", sans-serif;
			--typography-tag2-fontSize: 12px;
			--typography-tag2-fontWeight: 400;
			--typography-tag2-letterSpacing: 0.025em;
			--typography-tag2-lineHeight: 16px;
			--typography-tag2-textTransform: none;
			--typography-tooltip-fontFamily: "Gothia Serif", sans-serif;
			--typography-tooltip-fontSize: 9.6px;
			--typography-tooltip-fontWeight: 400;
			--typography-tooltip-letterSpacing: 0px;
			--typography-tooltip-lineHeight: 14px;
			--typography-tooltip-textTransform: none;
			--typography-voucherTitle-fontFamily: "Gothia Serif", sans-serif;
			--typography-voucherTitle-fontSize: 14px;
			--typography-voucherTitle-fontWeight: 400;
			--typography-voucherTitle-letterSpacing: 0px;
			--typography-voucherTitle-lineHeight: 20px;
			--typography-voucherTitle-textTransform: none;
			--typography-voucherTitleTest-fontFamily: "Roboto", sans-serif;
			--typography-voucherTitleTest-fontSize: 12px;
			--typography-voucherTitleTest-fontWeight: 400;
			--typography-voucherTitleTest-letterSpacing: 0px;
			--typography-voucherTitleTest-lineHeight: 16px;
			--typography-voucherTitleTest-textTransform: none;
			--typography-caption1Test-fontFamily: "Roboto", sans-serif;
			--typography-caption1Test-fontSize: 18px;
			--typography-caption1Test-fontWeight: 500;
			--typography-caption1Test-letterSpacing: inherit;
			--typography-caption1Test-lineHeight: 24px;
			--typography-caption1Test-textTransform: uppercase;
			--typography-caption2Test-fontFamily: "Roboto", sans-serif;
			--typography-caption2Test-fontSize: 12px;
			--typography-caption2Test-fontWeight: 500;
			--typography-caption2Test-letterSpacing: inherit;
			--typography-caption2Test-lineHeight: 16px;
			--typography-caption2Test-textTransform: uppercase;
			--typography-tag1Test-fontFamily: "Roboto", sans-serif;
			--typography-tag1Test-fontSize: 8px;
			--typography-tag1Test-fontWeight: 500;
			--typography-tag1Test-letterSpacing: 0px;
			--typography-tag1Test-lineHeight: 10px;
			--typography-tag1Test-textTransform: uppercase;
			--typography-tag2Test-fontFamily: "Roboto", sans-serif;
			--typography-tag2Test-fontSize: 8px;
			--typography-tag2Test-fontWeight: 400;
			--typography-tag2Test-letterSpacing: 0px;
			--typography-tag2Test-lineHeight: 10px;
			--typography-tag2Test-textTransform: none;
			--transitions-easing-easeInOut: cubic-bezier(0.4, 0, 0.2, 1);
			--transitions-easing-easeOut: cubic-bezier(0.0, 0, 0.2, 1);
			--transitions-easing-easeIn: cubic-bezier(0.4, 0, 1, 1);
			--transitions-easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
			--transitions-duration-shortest: 0.150s;
			--transitions-duration-shorter: 0.200s;
			--transitions-duration-short: 0.250s;
			--transitions-duration-standard: 0.300s;
			--transitions-duration-complex: 0.375s;
			--transitions-duration-enteringScreen: 0.225s;
			--transitions-duration-leavingScreen: 0.195s;
			--shape-borderRadius: 0px;
			--shape-borderRadiusLarge: 8px;
			--shape-borderRadiusSmall: 0px;
			--shape-borderRadiusChip: 24px;
			--shape-borderRadiusButton: 21px;
			--shape-borderRadiusInputField: 21px;
			--shadows-0: none;
			--shadows-1: 0px 1px 2px rgba(0, 0, 0, 0.07);
			--shadows-2: 0px 2px 4px rgba(0, 0, 0, 0.08);
			--shadows-3: 0px 3px 6px rgba(0, 0, 0, 0.09);
			--shadows-4: 0px 4px 8px rgba(0, 0, 0, 0.1);
			--shadows-5: 0px 5px 10px rgba(0, 0, 0, 0.11);
			--shadows-6: 0px 6px 12px rgba(0, 0, 0, 0.12);
			--shadows-7: 0px 7px 14px rgba(0, 0, 0, 0.13);
			--shadows-8: 0px -1px 16px rgba(0, 0, 0, 0.14);
			--shadows-9: 0px 9px 18px rgba(0, 0, 0, 0.15);
			--shadows-10: 0px 10px 20px rgba(0, 0, 0, 0.16);
			--shadows-11: 0px 11px 22px rgba(0, 0, 0, 0.17);
			--shadows-12: 0px 12px 24px rgba(0, 0, 0, 0.18);
			--shadows-13: 0px 13px 26px rgba(0, 0, 0, 0.19);
			--shadows-14: 0px 14px 28px rgba(0, 0, 0, 0.2);
			--shadows-15: 0px 15px 30px rgba(0, 0, 0, 0.21);
			--shadows-16: 0px 16px 32px rgba(0, 0, 0, 0.22);
			--shadows-17: 0px 17px 34px rgba(0, 0, 0, 0.23);
			--shadows-18: 0px 18px 36px rgba(0, 0, 0, 0.24);
			--shadows-19: 0px 19px 38px rgba(0, 0, 0, 0.25);
			--shadows-20: 0px 20px 40px rgba(0, 0, 0, 0.26);
			--shadows-21: 0px 21px 42px rgba(0, 0, 0, 0.27);
			--shadows-22: 0px 22px 44px rgba(0, 0, 0, 0.28);
			--shadows-23: 0px 23px 46px rgba(0, 0, 0, 0.29);
			--shadows-24: 0px 24px 48px rgba(0, 0, 0, 0.3);
			--zIndex-mobileStepper: 1000;
			--zIndex-fab: 1050;
			--zIndex-speedDial: 1050;
			--zIndex-appBar: 1100;
			--zIndex-drawer: 1200;
			--zIndex-modal: 1300;
			--zIndex-snackbar: 1400;
			--zIndex-tooltip: 1500;
			--spacing-3XL: 64px;
			--spacing-2XL: 48px;
			--spacing-XL: 32px;
			--spacing-L: 20px;
			--spacing-M: 16px;
			--spacing-S: 12px;
			--spacing-XS: 8px;
			--spacing-2XS: 4px;
			--borderWidth-large: 2px;
			--borderWidth-regular: 1px;
			--containerWidth-default: 1290px;
			--containerWidth-seoContent: 640px;
			--containerWidth-ctaWidth: 210px;
			--containerWidth-cutSize: 24px
		}

		@media (min-width:648px) {
			:root {
				--interactionColor: secondary;
				--iconType: Outlined;
				--palette-primary-main: #1E2D37;
				--palette-primary-light: #BDCFDB;
				--palette-primary-dark: #121B21;
				--palette-primary-contrastText: #FFFFFF;
				--palette-primary-contrastTextOnLight: #1F2225;
				--palette-primary-contrastTextOnDark: #FFFFFF;
				--palette-secondary-main: #0A5582;
				--palette-secondary-light: #A0D7F8;
				--palette-secondary-dark: #052E47;
				--palette-secondary-contrastText: #FFFFFF;
				--palette-secondary-contrastTextOnLight: #1F2225;
				--palette-secondary-contrastTextOnDark: #FFFFFF;
				--palette-tertiary-main: #008F64;
				--palette-tertiary-light: #99FFE1;
				--palette-tertiary-dark: #004D36;
				--palette-tertiary-contrastText: #FFFFFF;
				--palette-tertiary-contrastTextOnLight: #1F2225;
				--palette-tertiary-contrastTextOnDark: #FFFFFF;
				--palette-success-main: #008F64;
				--palette-success-light: rgb(89, 147, 64);
				--palette-success-dark: rgb(33, 84, 11);
				--palette-success-contrastText: #FFFFFF;
				--palette-success-contrastTextOnLight: #FFFFFF;
				--palette-success-contrastTextOnDark: #FFFFFF;
				--palette-error-main: #721c24;
				--palette-error-light: rgb(214, 51, 51);
				--palette-error-dark: rgb(142, 0, 0);
				--palette-error-contrastText: #FFFFFF;
				--palette-error-contrastTextOnLight: #FFFFFF;
				--palette-error-contrastTextOnDark: #FFFFFF;
				--palette-warning-main: #ed6c02;
				--palette-warning-light: #ff9800;
				--palette-warning-dark: #e65100;
				--palette-warning-contrastText: #FFFFFF;
				--palette-warning-contrastTextOnLight: #FFFFFF;
				--palette-warning-contrastTextOnDark: #FFFFFF;
				--palette-info-main: #0288d1;
				--palette-info-light: #03a9f4;
				--palette-info-dark: #01579b;
				--palette-info-contrastText: #FFFFFF;
				--palette-info-contrastTextOnLight: #FFFFFF;
				--palette-info-contrastTextOnDark: #FFFFFF;
				--palette-background-paper: #FFFFFF;
				--palette-background-default: #F1F2F3;
				--palette-text-primary: #1F2225;
				--palette-text-secondary: #5D656F;
				--palette-text-hint: #B7BCC3;
				--palette-text-disabled: #B7BCC3;
				--palette-grey-50: #FAFAFA;
				--palette-grey-100: #F1F2F3;
				--palette-grey-200: #ECEEF0;
				--palette-grey-300: #E3E5E7;
				--palette-grey-400: #B7BCC3;
				--palette-grey-500: #959DA7;
				--palette-grey-600: #5D656F;
				--palette-grey-700: #4D545C;
				--palette-grey-800: #3A3F45;
				--palette-grey-900: #1F2225;
				--palette-grey-A100: #D5D5D5;
				--palette-grey-A200: #AAAAAA;
				--palette-grey-A400: #616161;
				--palette-grey-A700: #303030;
				--palette-action-active: rgba(31, 34, 37, 0.54);
				--palette-action-hover: rgba(31, 34, 37, 0.04);
				--palette-action-selected: rgba(31, 34, 37, 0.08);
				--palette-action-focus: rgba(31, 34, 37, 0.12);
				--palette-action-disabledBackground: rgba(31, 34, 37, 0.12);
				--palette-action-disabled: rgba(31, 34, 37, 0.26);
				--palette-common-black: #000000;
				--palette-common-white: #FFFFFF;
				--palette-sustainability-main: #2EB755;
				--palette-sustainability-background: #EDFEF2;
				--palette-sustainability-text: #1D522C;
				--palette-divider: #E3E5E7;
				--palette-borderColor: #E3E5E7;
				--palette-menuColor: #FFFFFF;
				--palette-heroHeaderBackground: transparent;
				--palette-sectionBackground: transparent;
				--palette-interaction-main: #0A5582;
				--palette-interaction-light: #A0D7F8;
				--palette-interaction-dark: #052E47;
				--palette-interaction-contrastText: #FFFFFF;
				--palette-interaction-contrastTextOnLight: #1F2225;
				--palette-interaction-contrastTextOnDark: #FFFFFF;
				--typography-fontFamily: "Gothia Serif", sans-serif;
				--typography-fontSize: 16px;
				--typography-htmlFontSize: 16px;
				--typography-fontWeightLight: 300;
				--typography-fontWeightRegular: 400;
				--typography-fontWeightMedium: 400;
				--typography-fontWeightBold: 700;
				--typography-h1-fontFamily: "Gothia Serif", sans-serif;
				--typography-h1-fontSize: 40px;
				--typography-h1-fontWeight: 700;
				--typography-h1-letterSpacing: 0px;
				--typography-h1-lineHeight: 48px;
				--typography-h1-textTransform: none;
				--typography-h2-fontFamily: "Gothia Serif", sans-serif;
				--typography-h2-fontSize: 32px;
				--typography-h2-fontWeight: 700;
				--typography-h2-letterSpacing: 0px;
				--typography-h2-lineHeight: 40px;
				--typography-h2-textTransform: none;
				--typography-h3-fontFamily: "Gothia Serif", sans-serif;
				--typography-h3-fontSize: 24px;
				--typography-h3-fontWeight: 700;
				--typography-h3-letterSpacing: 0px;
				--typography-h3-lineHeight: 32px;
				--typography-h3-textTransform: none;
				--typography-h4-fontFamily: "Gothia Serif", sans-serif;
				--typography-h4-fontSize: 20px;
				--typography-h4-fontWeight: 700;
				--typography-h4-letterSpacing: 0px;
				--typography-h4-lineHeight: 28px;
				--typography-h4-textTransform: none;
				--typography-h5-fontFamily: "Gothia Serif", sans-serif;
				--typography-h5-fontSize: 18px;
				--typography-h5-fontWeight: 700;
				--typography-h5-letterSpacing: 0px;
				--typography-h5-lineHeight: 24px;
				--typography-h5-textTransform: none;
				--typography-h6-fontFamily: "Gothia Serif", sans-serif;
				--typography-h6-fontSize: 16px;
				--typography-h6-fontWeight: 700;
				--typography-h6-letterSpacing: 0px;
				--typography-h6-lineHeight: 24px;
				--typography-h6-textTransform: none;
				--typography-body1-fontFamily: "Gothia Serif", sans-serif;
				--typography-body1-fontSize: 16px;
				--typography-body1-fontWeight: 400;
				--typography-body1-letterSpacing: 0px;
				--typography-body1-lineHeight: 24px;
				--typography-body1-textTransform: none;
				--typography-body2-fontFamily: "Gothia Serif", sans-serif;
				--typography-body2-fontSize: 14px;
				--typography-body2-fontWeight: 400;
				--typography-body2-letterSpacing: 0px;
				--typography-body2-lineHeight: 20px;
				--typography-body2-textTransform: none;
				--typography-button-fontFamily: "Gothia Serif", sans-serif;
				--typography-button-fontSize: 1rem;
				--typography-button-fontWeight: 700;
				--typography-button-letterSpacing: 0.05em;
				--typography-button-lineHeight: 1.75;
				--typography-button-textTransform: uppercase;
				--typography-caption-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption-fontSize: 12px;
				--typography-caption-fontWeight: 400;
				--typography-caption-letterSpacing: 0px;
				--typography-caption-lineHeight: 16px;
				--typography-caption-textTransform: none;
				--typography-caption1Big-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption1Big-fontSize: 24px;
				--typography-caption1Big-fontWeight: 700;
				--typography-caption1Big-letterSpacing: inherit;
				--typography-caption1Big-lineHeight: 32px;
				--typography-caption1Big-textTransform: inherit;
				--typography-caption2Big-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption2Big-fontSize: 18px;
				--typography-caption2Big-fontWeight: 700;
				--typography-caption2Big-letterSpacing: inherit;
				--typography-caption2Big-lineHeight: 24px;
				--typography-caption2Big-textTransform: uppercase;
				--typography-caption1Small-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption1Small-fontSize: 18px;
				--typography-caption1Small-fontWeight: 700;
				--typography-caption1Small-letterSpacing: inherit;
				--typography-caption1Small-lineHeight: 24px;
				--typography-caption1Small-textTransform: inherit;
				--typography-caption2Small-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption2Small-fontSize: 16px;
				--typography-caption2Small-fontWeight: 700;
				--typography-caption2Small-letterSpacing: inherit;
				--typography-caption2Small-lineHeight: 24px;
				--typography-caption2Small-textTransform: uppercase;
				--typography-chip-fontFamily: "Gothia Serif", sans-serif;
				--typography-chip-fontSize: 14px;
				--typography-chip-fontWeight: 400;
				--typography-chip-letterSpacing: 0.025em;
				--typography-chip-lineHeight: 20px;
				--typography-chip-textTransform: uppercase;
				--typography-overline-fontFamily: "Gothia Serif", sans-serif;
				--typography-overline-fontSize: 12px;
				--typography-overline-fontWeight: 400;
				--typography-overline-letterSpacing: 0.1em;
				--typography-overline-lineHeight: 16px;
				--typography-overline-textTransform: uppercase;
				--typography-subtitle1-fontFamily: "Gothia Serif", sans-serif;
				--typography-subtitle1-fontSize: 18px;
				--typography-subtitle1-fontWeight: 400;
				--typography-subtitle1-letterSpacing: 0px;
				--typography-subtitle1-lineHeight: 24px;
				--typography-subtitle1-textTransform: none;
				--typography-subtitle2-fontFamily: "Gothia Serif", sans-serif;
				--typography-subtitle2-fontSize: 16px;
				--typography-subtitle2-fontWeight: 400;
				--typography-subtitle2-letterSpacing: 0px;
				--typography-subtitle2-lineHeight: 24px;
				--typography-subtitle2-textTransform: none;
				--typography-tag1-fontFamily: "Gothia Serif", sans-serif;
				--typography-tag1-fontSize: 12px;
				--typography-tag1-fontWeight: 400;
				--typography-tag1-letterSpacing: 0.025em;
				--typography-tag1-lineHeight: 16px;
				--typography-tag1-textTransform: uppercase;
				--typography-tag2-fontFamily: "Gothia Serif", sans-serif;
				--typography-tag2-fontSize: 12px;
				--typography-tag2-fontWeight: 400;
				--typography-tag2-letterSpacing: 0.025em;
				--typography-tag2-lineHeight: 16px;
				--typography-tag2-textTransform: none;
				--typography-tooltip-fontFamily: "Gothia Serif", sans-serif;
				--typography-tooltip-fontSize: 9.6px;
				--typography-tooltip-fontWeight: 400;
				--typography-tooltip-letterSpacing: 0px;
				--typography-tooltip-lineHeight: 14px;
				--typography-tooltip-textTransform: none;
				--typography-voucherTitle-fontFamily: "Gothia Serif", sans-serif;
				--typography-voucherTitle-fontSize: 18px;
				--typography-voucherTitle-fontWeight: 400;
				--typography-voucherTitle-letterSpacing: 0px;
				--typography-voucherTitle-lineHeight: 24px;
				--typography-voucherTitle-textTransform: none;
				--typography-voucherTitleTest-fontFamily: "Gothia Serif", sans-serif;
				--typography-voucherTitleTest-fontSize: 18px;
				--typography-voucherTitleTest-fontWeight: 400;
				--typography-voucherTitleTest-letterSpacing: 0px;
				--typography-voucherTitleTest-lineHeight: 24px;
				--typography-voucherTitleTest-textTransform: none;
				--typography-caption1Test-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption1Test-fontSize: 28px;
				--typography-caption1Test-fontWeight: 500;
				--typography-caption1Test-letterSpacing: inherit;
				--typography-caption1Test-lineHeight: 30px;
				--typography-caption1Test-textTransform: uppercase;
				--typography-caption2Test-fontFamily: "Gothia Serif", sans-serif;
				--typography-caption2Test-fontSize: 18px;
				--typography-caption2Test-fontWeight: 500;
				--typography-caption2Test-letterSpacing: inherit;
				--typography-caption2Test-lineHeight: 24px;
				--typography-caption2Test-textTransform: uppercase;
				--typography-tag1Test-fontFamily: "Gothia Serif", sans-serif;
				--typography-tag1Test-fontSize: 10px;
				--typography-tag1Test-fontWeight: 500;
				--typography-tag1Test-letterSpacing: 0px;
				--typography-tag1Test-lineHeight: 12px;
				--typography-tag1Test-textTransform: uppercase;
				--typography-tag2Test-fontFamily: "Gothia Serif", sans-serif;
				--typography-tag2Test-fontSize: 10px;
				--typography-tag2Test-fontWeight: 400;
				--typography-tag2Test-letterSpacing: 0px;
				--typography-tag2Test-lineHeight: 12px;
				--typography-tag2Test-textTransform: none;
				--transitions-easing-easeInOut: cubic-bezier(0.4, 0, 0.2, 1);
				--transitions-easing-easeOut: cubic-bezier(0.0, 0, 0.2, 1);
				--transitions-easing-easeIn: cubic-bezier(0.4, 0, 1, 1);
				--transitions-easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
				--transitions-duration-shortest: 0.150s;
				--transitions-duration-shorter: 0.200s;
				--transitions-duration-short: 0.250s;
				--transitions-duration-standard: 0.300s;
				--transitions-duration-complex: 0.375s;
				--transitions-duration-enteringScreen: 0.225s;
				--transitions-duration-leavingScreen: 0.195s;
				--shape-borderRadius: 0px;
				--shape-borderRadiusLarge: 8px;
				--shape-borderRadiusSmall: 0px;
				--shape-borderRadiusChip: 24px;
				--shape-borderRadiusButton: 21px;
				--shape-borderRadiusInputField: 21px;
				--shadows-0: none;
				--shadows-1: 0px 1px 2px rgba(0, 0, 0, 0.07);
				--shadows-2: 0px 2px 4px rgba(0, 0, 0, 0.08);
				--shadows-3: 0px 3px 6px rgba(0, 0, 0, 0.09);
				--shadows-4: 0px 4px 8px rgba(0, 0, 0, 0.1);
				--shadows-5: 0px 5px 10px rgba(0, 0, 0, 0.11);
				--shadows-6: 0px 6px 12px rgba(0, 0, 0, 0.12);
				--shadows-7: 0px 7px 14px rgba(0, 0, 0, 0.13);
				--shadows-8: 0px -1px 16px rgba(0, 0, 0, 0.14);
				--shadows-9: 0px 9px 18px rgba(0, 0, 0, 0.15);
				--shadows-10: 0px 10px 20px rgba(0, 0, 0, 0.16);
				--shadows-11: 0px 11px 22px rgba(0, 0, 0, 0.17);
				--shadows-12: 0px 12px 24px rgba(0, 0, 0, 0.18);
				--shadows-13: 0px 13px 26px rgba(0, 0, 0, 0.19);
				--shadows-14: 0px 14px 28px rgba(0, 0, 0, 0.2);
				--shadows-15: 0px 15px 30px rgba(0, 0, 0, 0.21);
				--shadows-16: 0px 16px 32px rgba(0, 0, 0, 0.22);
				--shadows-17: 0px 17px 34px rgba(0, 0, 0, 0.23);
				--shadows-18: 0px 18px 36px rgba(0, 0, 0, 0.24);
				--shadows-19: 0px 19px 38px rgba(0, 0, 0, 0.25);
				--shadows-20: 0px 20px 40px rgba(0, 0, 0, 0.26);
				--shadows-21: 0px 21px 42px rgba(0, 0, 0, 0.27);
				--shadows-22: 0px 22px 44px rgba(0, 0, 0, 0.28);
				--shadows-23: 0px 23px 46px rgba(0, 0, 0, 0.29);
				--shadows-24: 0px 24px 48px rgba(0, 0, 0, 0.3);
				--zIndex-mobileStepper: 1000;
				--zIndex-fab: 1050;
				--zIndex-speedDial: 1050;
				--zIndex-appBar: 1100;
				--zIndex-drawer: 1200;
				--zIndex-modal: 1300;
				--zIndex-snackbar: 1400;
				--zIndex-tooltip: 1500;
				--spacing-3XL: 88px;
				--spacing-2XL: 64px;
				--spacing-XL: 48px;
				--spacing-L: 32px;
				--spacing-M: 24px;
				--spacing-S: 16px;
				--spacing-XS: 8px;
				--spacing-2XS: 4px;
				--borderWidth-large: 2px;
				--borderWidth-regular: 1px;
				--containerWidth-default: 1290px;
				--containerWidth-seoContent: 640px;
				--containerWidth-ctaWidth: 210px;
				--containerWidth-cutSize: 24px
			}
		}
	</style>
	<script id="gtm-script">
		window.dataLayer=window.dataLayer||[];
                window.dataLayer.push({
                    'docVersion': '',
                    'isSnippetEnabled': true,
                    'pageType': 'catalog_coupons_retailer',
                    'webTheme': window.innerWidth < 648 ? 'mobile/tablet' : 'desktop',
                    'userType': 'visitor',
                    'sourceRid': '536',
                    'sourceRQ': '5',
                    'retailerName': "NLY MAN",
                    'isM': true
                });
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P4ZJTLF');
	</script>
	<script>
		window.megatronObj = { name: '_mt' };
            window._mt = function () {
                (window._mt.q = window._mt.q || []).push(arguments);
            };
            window._mt.d = 'https://' + window.location.hostname + '/megatron-mgt/h';
            o = document.createElement('script');
            n = document.getElementsByTagName('script')[0];
            o.async = true;
            o.src = 'https://' + window.location.hostname + '/megatron.js';
            n.parentNode.insertBefore(o, n);
        window._mt('set', 'platformID', '6598f8de42724d6ab2a0486fc3637422');
        
        window._mt('send', 'pageview');
	</script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
		data-testid="meta-viewport" />
	<title data-testid="title">NLY MAN rabattkod: 20% Rabattkod för oktober 2022 - GP.se</title>
	<meta name="description" content="Här hittar du alla aktiva &amp; giltiga NLY MAN kuponger under 2022"
		data-testid="meta-description" />
	<link rel="icon" href="https://rabattkod.gp.se/assets/images/favicons/gpse.ico" data-testid="link-favicon" />
	<link rel="preconnect" href="https://dxrhpnm3x1ev1.cloudfront.net/" />
	<script id="structured-data" type="application/ld+json" data-testid="structured-data">
		{"@context":"http://schema.org","@graph":[{"@type":"WebPage","name":"NLY MAN rabattkod: 20% Rabattkod för oktober 2022 - GP.se","description":"Här hittar du alla aktiva & giltiga NLY MAN kuponger under 2022"}]}
	</script>
	<meta name="robots" content="index, follow" data-testid="robots" />
	<link rel="canonical" href="https://rabattkod.gp.se/nly-man" data-testid="link-canonical" />
	<link rel="preload" href="https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.woff2"
		type="font/woff2" as="font" crossorigin="anonymous" />
	<link rel="preload" href="https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Medium.woff2"
		type="font/woff2" as="font" crossorigin="anonymous" />
	<link rel="preload" href="https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.woff2"
		type="font/woff2" as="font" crossorigin="anonymous" />
	<style>
		@font-face {
			font-family: 'Gothia Serif';
			src: url('https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.woff2') format('woff2');
			font-weight: 400;
			font-display: swap;
		}

		@font-face {
			font-family: 'Gothia Serif';
			src: url('https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Medium.woff2') format('woff2');
			font-weight: 600;
			font-display: swap;
		}

		@font-face {
			font-family: 'Gothia Serif';
			src: url('https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.woff2') format('woff2');
			font-weight: 700;
			font-display: swap;
		}
	</style>
	<meta property="og:url" content="https://rabattkod.gp.se/nly-man" data-testid="og:url" />
	<meta property="og:title" content="NLY MAN rabattkod: 20% Rabattkod för oktober 2022 - GP.se"
		data-testid="og:title" />
	<meta property="og:type" content="website" data-testid="og:type" />
	<meta property="og:description" content="Här hittar du alla aktiva &amp; giltiga NLY MAN kuponger under 2022"
		data-testid="og:description" />
	<meta property="og:image" content="https://dxrhpnm3x1ev1.cloudfront.net/260x136/images/n/NLYMAN.png"
		data-testid="og:image" />
	<link rel="preload" as="image"
		imageSrcSet="https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png 2x" />
	<meta name="next-head-count" content="22" />
	<meta charSet="utf-8" data-testid="meta-charset" />
	<link rel="preconnect" href="https://consentmanager.mgr.consensu.org/" crossorigin="crossOrigin" />
	<link rel="dns-prefetch" href="https://consentmanager.mgr.consensu.org/" />
	<link rel="preconnect" href="https://cdn.consentmanager.mgr.consensu.org/" crossorigin="crossOrigin" />
	<link rel="dns-prefetch" href="https://cdn.consentmanager.mgr.consensu.org/" />
	<link rel="dns-prefetch" href="https://www.google-analytics.com/" />
	<link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
	<link rel="dns-prefetch" href="https://tag.rmp.rakuten.com/" />
	<script type="application/javascript" data-cmp-ab="1">
		window.cmp_block_inline = false;
                    window.cmp_block_unkown = true;
                    window.cmp_block_sync = true;
                    window.cmp_block_img = false;
                    window.cmp_block_samedomain = false;
                    window.cmp_block_ignoredomains = ["cloudfront.net", "www.googletagmanager.com"];
	</script>
	<script type="application/javascript" data-cmp-ab="1"
		src="https://cdn.consentmanager.mgr.consensu.org/delivery/automatic.min.js" data-cmp-id="47287"
		data-cmp-host="consentmanager.mgr.consensu.org" data-cmp-cdn="cdn.consentmanager.mgr.consensu.org"></script>
	<style data-emotion="gsg gsg-global s1ccm8 gsg 10n7nnm bnaw88 mjywep rsaxgi 1hyj3zf a3xyjy 1lvvwdx jrsr9g 4oomy7"
		data-server-styles="css-critical">
		html {
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			box-sizing: border-box;
			-webkit-text-size-adjust: 100%;
		}

		*,
		*::before,
		*::after {
			box-sizing: inherit;
		}

		strong,
		b {
			font-weight: 700;
		}

		body {
			margin: 0;
			color: #1F2225;
			font-family: "Gothia Serif", sans-serif;
			font-size: 16px;
			font-weight: 400;
			letter-spacing: 0px;
			line-height: 24px;
			text-transform: none;
			background-color: #F1F2F3;
		}

		@media print {
			body {
				background-color: #FFFFFF;
			}
		}

		body::backdrop {
			background-color: #F1F2F3;
		}

		body {
			font-size: 14px;
			line-height: 20px;
			letter-spacing: 0px;
		}

		.gsg-10n7nnm {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			width: 100%;
			box-sizing: border-box;
			-webkit-flex-shrink: 0;
			-ms-flex-negative: 0;
			flex-shrink: 0;
			position: -webkit-sticky;
			position: sticky;
			z-index: 1100;
			top: 0;
			left: auto;
			right: 0;
			background-color: #1E2D37;
			color: #FFFFFF;
		}

		.gsg-bnaw88 {
			background-color: #FFFFFF;
			color: #1F2225;
			-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			width: 100%;
			box-sizing: border-box;
			-webkit-flex-shrink: 0;
			-ms-flex-negative: 0;
			flex-shrink: 0;
			position: -webkit-sticky;
			position: sticky;
			z-index: 1100;
			top: 0;
			left: auto;
			right: 0;
			background-color: #1E2D37;
			color: #FFFFFF;
		}

		.gsg-mjywep {
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-align-items: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			min-height: 48px;
		}

		.gsg-rsaxgi {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			width: 1em;
			height: 1em;
			display: inline-block;
			fill: currentColor;
			-webkit-flex-shrink: 0;
			-ms-flex-negative: 0;
			flex-shrink: 0;
			-webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			font-size: 1.7142857142857142rem;
			font-size: 1.5rem;
		}

		.gsg-1hyj3zf {
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-align-items: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			padding-left: 16px;
			padding-right: 16px;
			min-height: 48px;
		}

		@media (min-width:320px) {
			.gsg-1hyj3zf {
				padding-left: 24px;
				padding-right: 24px;
			}
		}

		.gsg-a3xyjy {
			z-index: 1200;
		}

		.gsg-1lvvwdx {
			z-index: 1500;
			pointer-events: none;
		}

		.gsg-1lvvwdx[data-popper-placement*="bottom"] .MuiTooltip-arrow {
			top: 0;
			margin-top: -0.71em;
		}

		.gsg-1lvvwdx[data-popper-placement*="bottom"] .MuiTooltip-arrow::before {
			transform-origin: 0 100%;
		}

		.gsg-1lvvwdx[data-popper-placement*="top"] .MuiTooltip-arrow {
			bottom: 0;
			margin-bottom: -0.71em;
		}

		.gsg-1lvvwdx[data-popper-placement*="top"] .MuiTooltip-arrow::before {
			transform-origin: 100% 0;
		}

		.gsg-1lvvwdx[data-popper-placement*="right"] .MuiTooltip-arrow {
			left: 0;
			margin-left: -0.71em;
			height: 1em;
			width: 0.71em;
		}

		.gsg-1lvvwdx[data-popper-placement*="right"] .MuiTooltip-arrow::before {
			transform-origin: 100% 100%;
		}

		.gsg-1lvvwdx[data-popper-placement*="left"] .MuiTooltip-arrow {
			right: 0;
			margin-right: -0.71em;
			height: 1em;
			width: 0.71em;
		}

		.gsg-1lvvwdx[data-popper-placement*="left"] .MuiTooltip-arrow::before {
			transform-origin: 0 0;
		}

		.gsg-jrsr9g {
			z-index: 1500;
			pointer-events: none;
		}

		.gsg-jrsr9g[data-popper-placement*="bottom"] .MuiTooltip-arrow {
			top: 0;
			margin-top: -0.71em;
		}

		.gsg-jrsr9g[data-popper-placement*="bottom"] .MuiTooltip-arrow::before {
			transform-origin: 0 100%;
		}

		.gsg-jrsr9g[data-popper-placement*="top"] .MuiTooltip-arrow {
			bottom: 0;
			margin-bottom: -0.71em;
		}

		.gsg-jrsr9g[data-popper-placement*="top"] .MuiTooltip-arrow::before {
			transform-origin: 100% 0;
		}

		.gsg-jrsr9g[data-popper-placement*="right"] .MuiTooltip-arrow {
			left: 0;
			margin-left: -0.71em;
			height: 1em;
			width: 0.71em;
		}

		.gsg-jrsr9g[data-popper-placement*="right"] .MuiTooltip-arrow::before {
			transform-origin: 100% 100%;
		}

		.gsg-jrsr9g[data-popper-placement*="left"] .MuiTooltip-arrow {
			right: 0;
			margin-right: -0.71em;
			height: 1em;
			width: 0.71em;
		}

		.gsg-jrsr9g[data-popper-placement*="left"] .MuiTooltip-arrow::before {
			transform-origin: 0 0;
		}

		.gsg-4oomy7 {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			width: 1em;
			height: 1em;
			display: inline-block;
			fill: currentColor;
			-webkit-flex-shrink: 0;
			-ms-flex-negative: 0;
			flex-shrink: 0;
			-webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			font-size: 1.4285714285714284rem;
			font-size: 1.5rem;
			font-size: 1.25rem;
		}
	</style>
	<link rel="preload" href="/_next/static/css/fb559b0a04485f98.css" as="style" />
	<link rel="stylesheet" href="/_next/static/css/fb559b0a04485f98.css" data-n-g="" />
	<link rel="preload" href="/_next/static/css/61f58ac3a4132918.css" as="style" />
	<link rel="stylesheet" href="/_next/static/css/61f58ac3a4132918.css" data-n-p="" />
	<link rel="preload" href="/_next/static/css/752b76bb2b422b3a.css" as="style" />
	<link rel="stylesheet" href="/_next/static/css/752b76bb2b422b3a.css" data-n-p="" />
	<link rel="preload" href="/_next/static/css/3dcf16b4b52c691f.css" as="style" />
	<link rel="stylesheet" href="/_next/static/css/3dcf16b4b52c691f.css" data-n-p="" />
	<link rel="preload" href="/_next/static/css/2c63d2a35b32d23e.css" as="style" />
	<link rel="stylesheet" href="/_next/static/css/2c63d2a35b32d23e.css" data-n-p="" /><noscript
		data-n-css=""></noscript>
	<script defer="" nomodule="" src="/_next/static/chunks/polyfills-5cd94c89d3acac5f.js"></script>
	<script src="/_next/static/chunks/webpack-ea828d8194c25621.js" defer=""></script>
	<script src="/_next/static/chunks/framework-4ed89e9640adfb9e.js" defer=""></script>
	<script src="/_next/static/chunks/main-e2ee11b57fed2c20.js" defer=""></script>
	<script src="/_next/static/chunks/pages/_app-3712d50a201a263e.js" defer=""></script>
	<script src="/_next/static/chunks/3682-386f600327ac4765.js" defer=""></script>
	<script src="/_next/static/chunks/8402-b959db57291168ab.js" defer=""></script>
	<script src="/_next/static/chunks/8486-5127d1d3d975a17b.js" defer=""></script>
	<script src="/_next/static/chunks/2109-7e06ffe99c517ad4.js" defer=""></script>
	<script src="/_next/static/chunks/7503-8c24040a491a9e42.js" defer=""></script>
	<script src="/_next/static/chunks/4990-c78f60fa3c262401.js" defer=""></script>
	<script src="/_next/static/chunks/9057-e3a8e2b5357d6bd6.js" defer=""></script>
	<script src="/_next/static/chunks/950-38f64d9fb9453ec6.js" defer=""></script>
	<script src="/_next/static/chunks/8644-97e67833fc35cd45.js" defer=""></script>
	<script src="/_next/static/chunks/9399-91edf4bf0f9786b5.js" defer=""></script>
	<script src="/_next/static/chunks/840-ea1fc012601498bf.js" defer=""></script>
	<script src="/_next/static/chunks/8221-9b5f8c2563db0ea3.js" defer=""></script>
	<script src="/_next/static/chunks/3567-38483a270b073dbb.js" defer=""></script>
	<script src="/_next/static/chunks/pages/%5BclientId%5D/rlp/%5B...url%5D-f2c6d3448ed832b2.js" defer=""></script>
	<script src="/_next/static/B4vhlqN5IYH3rWTpKEB7k/_buildManifest.js" defer=""></script>
	<script src="/_next/static/B4vhlqN5IYH3rWTpKEB7k/_ssgManifest.js" defer=""></script>
	<script src="/_next/static/B4vhlqN5IYH3rWTpKEB7k/_middlewareManifest.js" defer=""></script>
</head>

<body>
	<div>

		<head>
			<style>
				@font-face {
					font-family: Vocento Web Lig;
					src: url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.eot);
					src: url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.eot?#iefix) format("embedded-opentype"), url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.woff) format("woff"), url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.woff2) format("woff2"), url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.ttf) format("truetype");
					font-weight: 400;
					font-style: normal
				}

				@font-face {
					font-family: Vocento Web Lig;
					src: url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.eot);
					src: url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.eot?#iefix) format("embedded-opentype"), url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.woff) format("woff"), url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.woff2) format("woff2"), url(https://static2.ideal.es/squido/6.0.28/assets/fonts/vocento-icons/VocentoWebLig-Regular.ttf) format("truetype");
					font-weight: 400;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-RegularItalic.woff2) format("woff2");
					font-weight: 400;
					font-weight: 400;
					font-style: italic
				}

				@font-face {
					font-family: "Gothia Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-SemiBold.woff2) format("woff2");
					font-weight: 600;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.woff2) format("woff2"), url(https://rabattkod.gp.se/assets/fonts/GothiaSerif//GothiaGPSerif-Bold.otf) format("otf");
					font-weight: 700;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Sans Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.woff2) format("woff2"), url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.otf) format("otf");
					font-weight: 400;
					font-weight: 400;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Sans Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.woff2) format("woff2"), url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.otf) format("otf");
					font-weight: 700;
					font-style: normal
				}

				#ve-header-desktop {
					/*! Resource contributed from: 3.374334.1655797742 /style.css*/
					/*! Resource contributed from: 3.374331.1655797716 /style.css*/
					/*! Resource contributed from: 3.374328.1655797694 /style.css*/
					/*! Resource contributed from: 3.374325.1655797685 /style.css*/
					/*! Resource contributed from: 3.334697.1655797741 /style.css*/
					/*! Resource contributed from: 3.334693.1655797683 /style.css*/
					/*! Resource contributed from: 3.334691.1655797682 /style.css*/
					/*! modern-normalize | MIT License | https://github.com/sindresorhus/modern-normalize */
				}

				#ve-header-desktop html {
					box-sizing: border-box;
					-webkit-text-size-adjust: none;
					touch-action: manipulation
				}

				#ve-header-desktop *,
				#ve-header-desktop ::after,
				#ve-header-desktop ::before {
					box-sizing: inherit
				}

				#ve-header-desktop :root {
					-moz-tab-size: 4;
					tab-size: 4
				}

				#ve-header-desktop html {
					line-height: 1.15
				}

				#ve-header-desktop body {
					margin: 0
				}

				#ve-header-desktop body {
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
				}

				#ve-header-desktop h2,
				#ve-header-desktop h3,
				#ve-header-desktop h4 {
					margin-top: 0;
					margin-bottom: 8px
				}

				#ve-header-desktop button,
				#ve-header-desktop input {
					font-family: inherit;
					font-size: 100%;
					line-height: 1.15;
					margin: 0
				}

				#ve-header-desktop button {
					text-transform: none;
					cursor: pointer
				}

				#ve-header-desktop [type=button],
				#ve-header-desktop button {
					-webkit-appearance: button
				}

				#ve-header-desktop [type=button]::-moz-focus-inner,
				#ve-header-desktop button::-moz-focus-inner {
					border-style: none;
					padding: 0
				}

				#ve-header-desktop [type=button]:-moz-focusring,
				#ve-header-desktop button:-moz-focusring {
					outline: 1px dotted ButtonText
				}

				#ve-header-desktop ::-webkit-file-upload-button {
					-webkit-appearance: button;
					font: inherit
				}

				#ve-header-desktop .visuallyhidden {
					border: 0;
					clip: rect(0 0 0 0);
					height: 1px;
					margin: -1px;
					overflow: hidden;
					padding: 0;
					position: absolute;
					width: 1px
				}

				#ve-header-desktop :root {
					--black-lighten: rgba(0, 0, 0, 0.5);
					--black: #1e2d37;
					--blue-darken: #0a324b;
					--blue-lighten: #78b4dc;
					--blue: #0a5582;
					--gray-bg: rgba(0, 0, 0, 0.05);
					--gray-darken: #78878c;
					--gray-lighten: #dce1e1;
					--gray: #aab9be;
					--green-bg: #e1f5f0;
					--green-lighten: #00c389;
					--green: #006b52;
					--orange-bg: #fff0eb;
					--orange-lighten: #efac6f;
					--orange: #e66432;
					--pink-bg: #fff1eb;
					--pink-lighten: #ee94ad;
					--pink: #dd3b71;
					--purple-lighten: #c8a0c8;
					--purple: #532e7f;
					--red: #ff4226;
					--red-darken: #721c24;
					--yellow: #ffcd00;
					--yellow-mate: #fff6bf;
					--yellow-lighten: #fcf5e5;
					--white-transparent: rgba(255, 255, 255, 0.7);
					--white: #fff;
					--white-darken: #f3f1ee
				}

				#ve-header-desktop body {
					--corp-color-primary: #324650;
					--corp-color-darken: #0a324b;
					--corp-color-lighten: #78878c;
					--corp-logo-color: #0a324b;
					--media-bg-color: 0, 0, 0
				}

				#ve-header-desktop h2,
				#ve-header-desktop h3,
				#ve-header-desktop h4 {
					margin-bottom: 8px;
					font-family: "Gothia Serif", Serif;
					font-weight: 700;
					line-height: 1.2
				}

				#ve-header-desktop h2 {
					font-size: 32px
				}

				#ve-header-desktop h3 {
					font-size: 28px
				}

				#ve-header-desktop h4 {
					font-size: 24px
				}

				#ve-header-desktop .c-header__menu .c-header__menu__list,
				#ve-header-desktop .c-header__service-links .c-header__service-links__list,
				#ve-header-desktop .c-header__sitemap .c-header__sitemap__list,
				#ve-header-desktop .c-header__submenu,
				#ve-header-desktop .c-user-menu__list {
					list-style: none;
					margin-bottom: 0;
					margin-top: 0;
					padding-left: 0
				}

				#ve-header-desktop .c-user-login,
				#ve-header-desktop .o-container--header {
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-pack: center;
					-ms-flex-pack: center;
					justify-content: center
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--foljer,
				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--nyhetsbrev,
				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--puzzle,
				#ve-header-desktop .c-user-menu__item.js-epaper-trigger {
					background-color: #21455b;
					color: rgba(255, 255, 255, .9)
				}

				#ve-header-desktop .u-hidden {
					display: none
				}

				#ve-header-desktop .o-container {
					max-width: 1290px;
					margin-right: auto;
					margin-left: auto;
					padding-right: 20px;
					padding-left: 20px
				}

				#ve-header-desktop .o-flex {
					display: -ms-flexbox !important;
					display: -webkit-box !important;
					display: flex !important
				}

				#ve-header-desktop .o-flex--column {
					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					-ms-flex-direction: column;
					flex-direction: column
				}

				#ve-header-desktop .o-flex--wrap {
					-ms-flex-wrap: wrap;
					flex-wrap: wrap
				}

				#ve-header-desktop a {
					color: #1e2d37;
					text-decoration: none;
					background-color: transparent;
					-webkit-text-decoration-skip: objects;
					cursor: pointer
				}

				#ve-header-desktop a:hover {
					color: #78878c;
					text-decoration: none
				}

				#ve-header-desktop body {
					width: 100%;
					background-color: #f3f3f3;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-size: 16px;
					font-weight: 400;
					line-height: 1.5;
					color: #1e2d37;
					color: var(--black);
					text-align: left;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale
				}

				#ve-header-desktop input[type=search] {
					background-clip: padding-box;
					background-color: #f3f3f3;
					border-radius: 4px;
					border: 1px solid rgba(0, 0, 0, .1);
					color: #495057;
					display: block;
					font-size: 16px;
					line-height: 1.5;
					padding: 6px 12px;
					-webkit-transition: border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					transition: border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
					transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					width: 100%;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
				}

				#ve-header-desktop input:focus {
					border-color: var(--corp-color-primary);
					-webkit-box-shadow: 0 0 0 3px var(--gray-lighten);
					box-shadow: 0 0 0 3px var(--gray-lighten);
					outline: 0
				}

				#ve-header-desktop p {
					margin-top: 0;
					margin-bottom: 20px
				}

				#ve-header-desktop svg {
					overflow: hidden;
					vertical-align: middle
				}

				#ve-header-desktop .c-alert {
					padding: 10px 15px;
					margin-bottom: 10px;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-size: 15px;
					border: 1px solid transparent;
					border-radius: 4px
				}

				#ve-header-desktop .c-alert--success {
					color: #155724;
					background-color: #d4edda;
					border-color: #c3e6cb
				}

				#ve-header-desktop .c-alert--error {
					color: #721c24;
					background-color: #f8d7da;
					border-color: #f5c6cb
				}

				#ve-header-desktop .c-btn {
					display: inline-block;
					font-weight: 400;
					text-align: center;
					white-space: nowrap;
					vertical-align: middle;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					border: 1px solid transparent;
					padding: 6px 12px;
					cursor: pointer;
					font-size: 16px;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					line-height: 1.5;
					border-radius: 4px;
					outline: 0;
					-webkit-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
					transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					text-decoration: none
				}

				#ve-header-desktop .c-btn:hover {
					text-decoration: none
				}

				#ve-header-desktop .c-btn--promo {
					border-color: #00c389;
					background-color: #00c389;
					color: #fff
				}

				#ve-header-desktop .c-btn--promo:hover {
					background-color: #006b52;
					border-color: #006b52;
					color: #fff
				}

				#ve-header-desktop .c-btn--promo:focus {
					border-color: #006b52
				}

				#ve-header-desktop .c-btn--small {
					padding: 4px 12px;
					font-size: 14px;
					line-height: 1.5;
					border-radius: 3.2px
				}

				#ve-header-desktop .c-btn--round {
					border-radius: 30px
				}

				#ve-header-desktop .c-header {
					background-color: #fff
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header {
						border-top: 3px solid var(--corp-color-darken);
						position: relative
					}

					#ve-header-desktop .c-header::before {
						content: "";
						display: block;
						width: 100%;
						background-color: #00000013;
						bottom: 50px;
						position: absolute
					}
				}

				#ve-header-desktop .o-container--header {
					-ms-flex-wrap: wrap;
					flex-wrap: wrap;
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					justify-content: space-between;
					position: relative
				}

				#ve-header-desktop .o-container--header::before {
					-ms-flex-order: 5;
					-webkit-box-ordinal-group: 6;
					order: 5
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .o-container--header::before {
						content: "";
						width: 100%;
						background-color: transparent;
						-ms-flex-order: 4;
						-webkit-box-ordinal-group: 5;
						order: 4
					}
				}

				#ve-header-desktop .c-header__brand {
					clear: left;
					-ms-flex-order: 2;
					-webkit-box-ordinal-group: 3;
					order: 2;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					overflow: hidden;
					height: 50px
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__brand {
						-ms-flex-order: 1;
						-webkit-box-ordinal-group: 2;
						order: 1;
						height: 78px;
						margin: auto
					}
				}

				#ve-header-desktop .c-header__brand svg {
					fill: var(--corp-logo-color);
					max-height: 30px;
					max-width: calc(100vw - 185px);
					width: 100vw;
					height: 100vh
				}

				@media screen and (min-width:374.08px) {
					#ve-header-desktop .c-header__brand svg {
						max-width: 200px;
						max-height: 31px
					}
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__submenu {
						background-color: #fff !important;
						z-index: 2000 !important
					}
				}

				#ve-header-desktop .c-header__search {
					display: none;
					color: var(--corp-color-darken);
					margin-left: 15px;
					margin-top: 1px;
					cursor: pointer
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__search {
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-ms-flex-align: center;
						align-items: center;
						-webkit-box-pack: center;
						-ms-flex-pack: center;
						justify-content: center;
						-ms-flex-order: 6;
						-webkit-box-ordinal-group: 7;
						order: 6;
						width: 50px;
						margin-top: 0;
						margin-right: 0;
						margin-left: 0;
						height: 50px;
						border-left: 1px solid rgba(0, 0, 0, .075);
						border-right: 1px solid rgba(0, 0, 0, .075)
					}
				}

				#ve-header-desktop .c-header__search:hover {
					color: var(--black-lighten);
					color: rgba(0, 0, 0, .5)
				}

				#ve-header-desktop .c-header__nav-toggle {
					cursor: pointer;
					display: block;
					height: 50px;
					margin-left: 24px;
					position: relative;
					overflow: hidden;
					-ms-flex-order: 4;
					-webkit-box-ordinal-group: 5;
					order: 4
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__nav-toggle {
						-ms-flex-order: 5;
						-webkit-box-ordinal-group: 6;
						order: 5;
						margin-right: 0;
						margin-left: 0;
						width: 50px;
						border-left: 1px solid rgba(0, 0, 0, .075);
						display: none
					}
				}

				#ve-header-desktop .c-header__nav-toggle:hover span {
					background-color: var(--black-lighten);
					background-color: rgba(0, 0, 0, .5)
				}

				#ve-header-desktop .c-header__nav-toggle span {
					background-color: var(--corp-color-darken);
					border-radius: 1px;
					display: block;
					height: 2px;
					left: calc(50% - 11px);
					opacity: 1;
					position: absolute;
					-webkit-transform: rotate(0);
					transform: rotate(0);
					-webkit-transition: .25s ease-in-out;
					transition: .25s ease-in-out;
					width: 22px
				}

				#ve-header-desktop .c-header__nav-toggle span:nth-child(1) {
					top: calc(50% - 10px)
				}

				#ve-header-desktop .c-header__nav-toggle span:nth-child(2),
				#ve-header-desktop .c-header__nav-toggle span:nth-child(3) {
					top: calc(50% - 2px);
					width: 16px
				}

				#ve-header-desktop .c-header__nav-toggle span:nth-child(4) {
					top: calc(50% - -6px)
				}

				#ve-header-desktop .c-header__menu {
					border-top: 1px solid rgba(0, 0, 0, .075);
					color: var(--black);
					overflow: hidden;
					position: relative;
					height: 40px;
					width: calc(100% - -40px);
					margin-left: -20px;
					padding-left: 12px;
					-webkit-box-flex: 0;
					-ms-flex: none;
					flex: none;
					-ms-flex-order: 6;
					-webkit-box-ordinal-group: 7;
					order: 6
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__menu {
						-ms-flex-order: 4;
						-webkit-box-ordinal-group: 5;
						order: 4;
						height: 56px;
						width: auto;
						max-width: calc(100% - 185px);
						border-top: 0;
						margin-left: -12px
					}
				}

				@media screen and (min-width:992px) {
					#ve-header-desktop .c-header__menu {
						overflow: visible;
						max-width: calc(100% - 534px);
						margin: auto
					}
				}

				@media screen and (min-width:1200px) {
					#ve-header-desktop .c-header__menu {
						max-width: none
					}
				}

				#ve-header-desktop .c-header__menu::after {
					background: -webkit-gradient(linear, left top, right top, color-stop(0, rgba(255, 255, 255, 0)), color-stop(25%, rgba(255, 255, 255, .5)), to(var(--white)));
					background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .5) 25%, var(--white));
					content: "";
					display: block;
					height: 100%;
					pointer-events: none;
					position: absolute;
					right: 0;
					top: 0;
					z-index: 0;
					width: 20px
				}

				#ve-header-desktop .c-header__menu .c-header__menu__search {
					display: none
				}

				#ve-header-desktop .c-header__menu .c-header__menu__list {
					white-space: nowrap;
					-webkit-overflow-scrolling: touch;
					z-index: 0;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-orient: horizontal;
					-webkit-box-direction: normal;
					-ms-flex-direction: row;
					flex-direction: row;
					-webkit-box-pack: start;
					-ms-flex-pack: start;
					justify-content: flex-start
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__menu .c-header__menu__list {
						padding-left: 0
					}
				}

				@media screen and (min-width:992px) {
					#ve-header-desktop .c-header__menu .c-header__menu__list {
						overflow-x: hidden;
						overflow-y: visible;
						width: fit-content
					}
				}

				@media screen and (max-width:767px) {
					#ve-header-desktop .c-header__menu .c-header__menu__item {
						position: relative
					}

					#ve-header-desktop .voc-main-menu.is_active {
						height: 100vh;
						z-index: 2000
					}
				}

				#ve-header-desktop .c-header__menu .c-header__menu__item.is-active .c-header__menu__link {
					position: relative
				}

				#ve-header-desktop .c-header__menu .c-header__menu__item.is-active .c-header__menu__link::after {
					content: "";
					display: none;
					height: 3px;
					width: 100%;
					position: absolute;
					left: 0;
					background-color: var(--corp-color-darken);
					padding-left: 7px;
					padding-right: 7px;
					background-clip: content-box
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__menu .c-header__menu__item.is-active .c-header__menu__link::after {
						display: block;
						bottom: 0;
						padding-left: 10px;
						padding-right: 10px
					}
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__menu .c-header__menu__item.has-dropdown:hover .c-header__submenu {
						list-style: none;
						display: block;
						position: fixed;
						background-color: #fff;
						margin-left: -10px;
						-webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2);
						box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2);
						border-radius: 0 0 5px 5px;
						min-width: 130px;
						z-index: 1000;
						border-bottom: 2px solid rgba(0, 0, 0, .1);
						border-top: 1px solid rgba(0, 0, 0, .1)
					}

					#ve-header-desktop .c-header__menu .c-header__menu__item.has-dropdown:hover .c-header__submenu li:first-child a {
						border-top: 0
					}

					#ve-header-desktop .c-header__menu .c-header__menu__item.has-dropdown:hover .c-header__submenu a {
						padding-left: 20px;
						padding-right: 20px;
						padding-top: 5px;
						padding-bottom: 5px;
						display: block;
						font-size: 16px;
						text-decoration: none;
						color: #78878c !important;
						color: var(--gray-darken);
						font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
						border-top: 1px solid rgba(0, 0, 0, .075)
					}

					#ve-header-desktop .c-header__menu .c-header__menu__item.has-dropdown:hover .c-header__submenu a:hover {
						color: #1e2d37;
						color: var(--black)
					}
				}

				#ve-header-desktop .c-header__menu .c-header__menu__item.is-service-link {
					display: none;
					color: #fff;
					position: absolute;
					top: 50%;
					-ms-transform: translateY(-50%);
					transform: translateY(-50%)
				}

				#ve-header-desktop .c-header__menu .c-header__menu__item.is-service-link.is-service-link:not(.is-tipsa) {
					color: #fff;
					background-color: var(--corp-color-darken)
				}

				#ve-header-desktop .c-header__menu .c-header__menu__item.is-service-link.is-service-link:not(.is-tipsa)::before {
					content: "";
					display: block;
					width: calc(100% - 40px);
					height: 1px;
					background-color: #517388;
					position: absolute;
					bottom: 0;
					left: 0;
					margin-left: 20px
				}

				#ve-header-desktop .c-header__menu .c-header__menu__item.is-service-link .c-icon {
					margin-right: 6.4px
				}

				#ve-header-desktop .c-header__menu .c-header__menu__arrow {
					display: none;
					color: var(--corp-color-darken)
				}

				#ve-header-desktop .c-header__menu .c-header__menu__arrow:hover {
					color: var(--corp-color-primary)
				}

				#ve-header-desktop .c-header__menu .c-header__menu__link {
					color: #1a1a1a;
					text-decoration: none;
					font-family: "Gothia Serif", Serif;
					font-size: 17.008px;
					font-weight: 500;
					padding-left: 7px;
					padding-right: 7px;
					height: 40px;
					line-height: 39px;
					display: inline-block;
					position: relative
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__menu .c-header__menu__link {
						font-size: 16px;
						line-height: 24px;
						padding-left: 10px;
						padding-right: 10px;
						padding-top: 16px
					}

					#ve-header-desktop a.c-header__menu__link:hover {
						color: #1e2d37
					}
				}

				#ve-header-desktop .c-header__menu .c-header__menu__link:hover {
					opacity: .5;
					text-decoration: none
				}

				#ve-header-desktop #top-department-a-z {
					display: none
				}

				#ve-header-desktop .c-header__submenu--sitemap li {
					clear: both
				}

				#ve-header-desktop .c-header__submenu--sitemap li a {
					padding-left: 55px !important
				}

				#ve-header-desktop .c-header__submenu--sitemap h4 {
					float: left;
					margin-left: 20px;
					font-size: 20px;
					color: var(--black-lighten);
					padding-top: 1px;
					margin-bottom: 0
				}

				#ve-header-desktop :not(.is-menu-open) .c-header__menu .c-header__submenu {
					display: none
				}

				#ve-header-desktop .c-header__sitemap {
					display: none
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-header__sitemap {
						border-top: 1px solid rgba(0, 0, 0, .1);
						position: relative;
						z-index: 1000;
						background-color: var(--white);
						padding-top: 30px;
						padding-bottom: 30px;
						width: 100vw;
						height: calc(100vh - 130px);
						top: 131px;
						left: 0;
						border-bottom: 2px solid rgba(0, 0, 0, .1)
					}
				}

				#ve-header-desktop .c-header__sitemap .c-header__sitemap__list {
					height: calc(100vh - 220px);
					-ms-flex-wrap: wrap;
					flex-wrap: wrap;
					-webkit-box-orient: horizontal;
					-webkit-box-direction: normal;
					-ms-flex-direction: row;
					flex-direction: row
				}

				#ve-header-desktop .c-header__sitemap .c-header__sitemap__item {
					border-top: 3px solid var(--corp-color-darken);
					margin-top: 20px;
					padding-top: 10px;
					width: 15%;
					margin-right: 5%
				}

				#ve-header-desktop .c-header__sitemap a {
					display: block;
					color: var(--gray-darken);
					font-weight: 400;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
				}

				#ve-header-desktop .c-header__service-links {
					-ms-flex-order: 8;
					-webkit-box-ordinal-group: 9;
					order: 8;
					display: none;
					margin-left: auto;
					padding-left: 6px;
					padding-right: 6px
				}

				#ve-header-desktop .c-header__service-links .c-header__service-links__item {
					display: inline-block;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-size: 16px;
					padding-left: 16px;
					padding-right: 16px
				}

				#ve-header-desktop .c-header__service-links .c-header__service-links__item--tipsa {
					border-left: 1px solid rgba(0, 0, 0, .075);
					border-right: 1px solid rgba(0, 0, 0, .075);
					line-height: 1;
					padding: 14px 20px
				}

				#ve-header-desktop .c-header__service-links .c-header__service-links__item--otv-speaking-web {
					display: none
				}

				#ve-header-desktop .c-header__service-links a {
					text-decoration: none;
					cursor: pointer;
					color: #78878c !important;
					color: var(--gray-darken)
				}

				#ve-header-desktop .c-header__service-links a:hover {
					color: #1e2d37;
					color: var(--black)
				}

				#ve-header-desktop .c-header__service-links__item--mina-sidor,
				#ve-header-desktop .c-user-notifications__text {
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-size: 16px
				}

				#ve-header-desktop .c-header__service-links__item--mina-sidor a,
				#ve-header-desktop .c-user-notifications__text a {
					text-decoration: none;
					cursor: pointer;
					color: #78878c;
					color: var(--gray-darken)
				}

				#ve-header-desktop .c-header__service-links__item--mina-sidor a:hover,
				#ve-header-desktop .c-user-notifications__text a:hover {
					color: #1e2d37;
					color: var(--black)
				}

				#ve-header-desktop body:not(.is-menu-open) .c-header__menu {
					max-height: 40px;
					-webkit-transition: max-height .2s ease-in;
					transition: max-height .2s ease-in
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop body:not(.is-menu-open) .c-header__menu {
						max-height: none;
						-webkit-transition: none;
						transition: none
					}
				}

				#ve-header-desktop .c-icon {
					fill: currentColor;
					height: 1em;
					overflow: hidden;
					vertical-align: -.15em;
					width: 1em
				}

				#ve-header-desktop .c-icon--primary {
					fill: var(--corp-color-darken)
				}

				#ve-header-desktop .c-icon--primary:hover {
					fill: var(--corp-color-primary)
				}

				#ve-header-desktop .c-icon--16 {
					width: 16px;
					height: 16px
				}

				#ve-header-desktop .c-icon--22 {
					width: 22px;
					height: 22px
				}

				#ve-header-desktop .c-icon--24 {
					width: 24px;
					height: 24px
				}

				#ve-header-desktop .c-icon--32 {
					width: 32px;
					height: 32px
				}

				#ve-header-desktop .c-modal__close__icon {
					position: relative;
					width: 100%;
					height: 100%
				}

				#ve-header-desktop .c-modal__close__icon::after,
				#ve-header-desktop .c-modal__close__icon::before {
					content: "";
					width: 100%;
					height: 2px;
					background-color: var(--black);
					position: absolute;
					top: 50%;
					left: 0;
					-webkit-transform-origin: 50% 50%;
					transform-origin: 50% 50%
				}

				#ve-header-desktop .c-modal__close__icon::before {
					-webkit-transform: rotate(45deg);
					transform: rotate(45deg)
				}

				#ve-header-desktop .c-modal__close__icon::after {
					-webkit-transform: rotate(-45deg);
					transform: rotate(-45deg)
				}

				#ve-header-desktop .c-nav-dropdown__item a span::before .c-nav-dropdown__item:not(.is-active):not(.c-nav-dropdown__item--toggle):nav-dropdown__item--mypagesubpage {
					display: none
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--foljer {
					order: 2
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--foljer span {
					font-weight: 700
				}

				#ve-header-desktop .c-nav-dropdown__item--profil a span::before {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjY2NjIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0yNyAwaC0yNGMtMS42NSAwLTMgMS4zNS0zIDN2MjZjMCAxLjY1IDEuMzUgMyAzIDNoMjRjMS42NSAwIDMtMS4zNSAzLTN2LTI2YzAtMS42NS0xLjM1LTMtMy0zek0yNiAyOGgtMjJ2LTI0aDIydjI0ek04IDE4aDE0djJoLTE0ek04IDIyaDE0djJoLTE0ek0xMCA5YzAtMS42NTcgMS4zNDMtMyAzLTNzMyAxLjM0MyAzIDNjMCAxLjY1Ny0xLjM0MyAzLTMgM3MtMy0xLjM0My0zLTN6TTE1IDEyaC00Yy0xLjY1IDAtMyAwLjktMyAydjJoMTB2LTJjMC0xLjEtMS4zNS0yLTMtMnoiPjwvcGF0aD48L3N2Zz4=)
				}

				#ve-header-desktop .c-nav-dropdown__item--prenumeration a span::before {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNyZWRpdC1jYXJkIj48cmVjdCB4PSIxIiB5PSI0IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxsaW5lIHgxPSIxIiB5MT0iMTAiIHgyPSIyMyIgeTI9IjEwIj48L2xpbmU+PC9zdmc+)
				}

				#ve-header-desktop .c-nav-dropdown__item--kundforum a span::before {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWhlbHAtY2lyY2xlIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPgo8cGF0aCBkPSJNOS4wOSA5YTMgMyAwIDAgMSA1LjgzIDFjMCAyLTMgMy0zIDMiPjwvcGF0aD4KPGxpbmUgeDE9IjEyIiB5MT0iMTciIHgyPSIxMiIgeTI9IjE3Ij48L2xpbmU+Cjwvc3ZnPg==)
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--nyhetsbrev {
					order: 4
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--nyhetsbrev span {
					font-weight: 700
				}

				#ve-header-desktop .c-nav-dropdown__item a span::before .c-nav-dropdown__item:not(.is-active):not(.c-nav-dropdown__item--toggle):nav-dropdown__item--mypagesubpage {
					display: none
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--foljer {
					order: 2
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--foljer span {
					font-weight: 700
				}

				#ve-header-desktop .c-nav-dropdown__item--profil a span::before {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjY2NjIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0yNyAwaC0yNGMtMS42NSAwLTMgMS4zNS0zIDN2MjZjMCAxLjY1IDEuMzUgMyAzIDNoMjRjMS42NSAwIDMtMS4zNSAzLTN2LTI2YzAtMS42NS0xLjM1LTMtMy0zek0yNiAyOGgtMjJ2LTI0aDIydjI0ek04IDE4aDE0djJoLTE0ek04IDIyaDE0djJoLTE0ek0xMCA5YzAtMS42NTcgMS4zNDMtMyAzLTNzMyAxLjM0MyAzIDNjMCAxLjY1Ny0xLjM0MyAzLTMgM3MtMy0xLjM0My0zLTN6TTE1IDEyaC00Yy0xLjY1IDAtMyAwLjktMyAydjJoMTB2LTJjMC0xLjEtMS4zNS0yLTMtMnoiPjwvcGF0aD48L3N2Zz4=)
				}

				#ve-header-desktop .c-nav-dropdown__item--prenumeration a span::before {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNyZWRpdC1jYXJkIj48cmVjdCB4PSIxIiB5PSI0IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxsaW5lIHgxPSIxIiB5MT0iMTAiIHgyPSIyMyIgeTI9IjEwIj48L2xpbmU+PC9zdmc+)
				}

				#ve-header-desktop .c-nav-dropdown__item--kundforum a span::before {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWhlbHAtY2lyY2xlIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPgo8cGF0aCBkPSJNOS4wOSA5YTMgMyAwIDAgMSA1LjgzIDFjMCAyLTMgMy0zIDMiPjwvcGF0aD4KPGxpbmUgeDE9IjEyIiB5MT0iMTciIHgyPSIxMiIgeTI9IjE3Ij48L2xpbmU+Cjwvc3ZnPg==)
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--nyhetsbrev {
					order: 4
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--nyhetsbrev span {
					font-weight: 700
				}

				#ve-header-desktop .c-search-box {
					position: relative
				}

				#ve-header-desktop .c-search-box .c-search-box__button {
					background-color: transparent;
					border: 0;
					padding: 7px 12px 6px;
					position: absolute;
					right: 0;
					top: 0;
					transition: transform .1s ease-in-out
				}

				#ve-header-desktop .c-search-box .c-search-box__button svg {
					color: var(--gray)
				}

				@-moz-document url-prefix() {
					#ve-header-desktop .c-search-box .c-search-box__button {
						transition: none
					}
				}

				#ve-header-desktop .c-search-box__field {
					-webkit-appearance: none
				}

				#ve-header-desktop .c-subselect__viewport__version-two .c-subselect__toggle-choice__item>:checked+label::before {
					background-color: #00c389;
					background-color: var(--green-lighten)
				}

				#ve-header-desktop .c-subselect__viewport__version-two .c-subselect__toggle-choice__item>:checked+label::after {
					transform: translateX(35px)
				}

				#ve-header-desktop .c-user-login {
					width: 100%;
					position: relative;
					margin-bottom: 3px;
					-webkit-box-ordinal-group: 2;
					-ms-flex-order: 1;
					order: 1
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-login {
						-webkit-box-ordinal-group: 3;
						-ms-flex-order: 2;
						order: 2;
						width: auto;
						display: inline;
						margin-left: auto;
						margin-bottom: 0
					}
				}

				#ve-header-desktop .c-user-login::after {
					content: "";
					height: 1px;
					background-color: rgba(0, 0, 0, .1);
					width: calc(100% - -40px);
					display: block;
					position: absolute;
					bottom: -3px;
					left: -20px
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-login::after {
						display: none
					}
				}

				#ve-header-desktop .c-user-login p {
					font-size: 13px;
					line-height: 1.1;
					font-family: "Gothia Serif", Serif;
					margin-bottom: 0;
					padding-right: 15px
				}

				@media screen and (min-width:480px) {
					#ve-header-desktop .c-user-login p {
						font-size: 18px
					}
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-login p {
						display: none
					}
				}

				@media screen and (min-width:992px) {
					#ve-header-desktop .c-user-login p {
						display: inline-block
					}
				}

				#ve-header-desktop .c-user-login .c-btn--promo {
					height: 32px;
					line-height: 1;
					padding-top: 7px;
					margin-left: auto
				}

				#ve-header-desktop .c-user-login button {
					line-height: 1;
					-ms-flex-item-align: center;
					align-self: center;
					height: 30px;
					margin-top: 10px;
					margin-bottom: 10px
				}

				@media screen and (min-width:480px) {
					#ve-header-desktop .c-user-login button {
						font-size: 16px
					}
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-login button {
						margin-top: 0;
						margin-bottom: 0;
						height: 32px
					}
				}

				#ve-header-desktop .c-user-login__login {
					margin-left: 10px;
					background-color: transparent;
					border-color: var(--corp-color-darken);
					color: var(--corp-color-darken)
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-login__login {
						margin-left: 5px
					}
				}

				#ve-header-desktop .c-user-login__login:hover {
					background-color: var(--corp-color-darken);
					color: var(--white)
				}

				#ve-header-desktop .c-login {
					width: 100%;
					height: 100vh;
					background-color: var(--white);
					border-top: 3px solid var(--corp-color-primary);
					z-index: 1000;
					position: absolute;
					top: 103px;
					right: 0;
					border-bottom: 2px solid rgba(0, 107, 82, .2);
					border-radius: 0 0 5px 5px;
					padding: 20px 20px 0 20px
				}

				#ve-header-desktop .c-login .c-login__description,
				#ve-header-desktop .c-login .c-login__headline {
					text-align: left
				}

				#ve-header-desktop .c-login .c-btn--promo {
					width: fit-content;
					padding-right: 30px;
					padding-left: 30px
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-login {
						max-width: 320px;
						height: auto;
						top: 69px;
						-webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2);
						box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2);
						right: 20px
					}
				}

				#ve-header-desktop .c-login:not(.c-follow):before {
					border: solid transparent;
					content: "";
					height: 0;
					width: 0;
					position: absolute;
					pointer-events: none;
					border-bottom-color: var(--corp-color-primary);
					border-width: 8px;
					margin-left: -8px;
					top: -19px;
					right: 68px
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-login:not(.c-follow):before {
						right: 8px
					}
				}

				#ve-header-desktop .c-login__subscribe-teaser>* {
					max-width: 500px;
					margin-right: auto
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-login__subscribe-teaser>* {
						max-width: none
					}
				}

				#ve-header-desktop .c-login__description {
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					margin-bottom: 0
				}

				#ve-header-desktop .c-login p {
					font-size: 15px
				}

				#ve-header-desktop .c-login__choices__wrapper {
					width: fit-content;
					margin: 0 auto
				}

				#ve-header-desktop .c-login__choices {
					clear: both;
					font-size: 14px;
					color: var(--gray-darken);
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					justify-content: space-between;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
				}

				#ve-header-desktop .c-login__choices.c-create__free__account {
					margin-bottom: 15px
				}

				#ve-header-desktop .c-login__choices.already_subscriber {
					margin-top: 5px
				}

				#ve-header-desktop .c-login__choices a {
					position: relative;
					text-decoration: underline;
					padding: 0;
					border: 0
				}

				#ve-header-desktop .c-login__choices.c-create__free__account a {
					text-decoration: none;
					font-weight: 700;
					color: var(--corp-color-primary)
				}

				#ve-header-desktop .c-login__choices:not(.c-create__free__account) a:before {
					display: inline-block
				}

				#ve-header-desktop .c-login__subscribe-teaser {
					text-align: center;
					margin: 0 auto;
					border-top: 3px solid var(--green-lighten);
					background-color: var(--green-bg);
					width: calc(100% - -40px);
					height: 100%;
					margin-left: -20px;
					padding: 30px 20px 20px 20px;
					border-radius: 0 0 5px 5px;
					margin-top: 30px
				}

				#ve-header-desktop .c-login__subscribe-teaser a {
					text-align: center;
					margin: 20px auto 0 auto;
					display: block;
					max-width: 295px;
					width: 100%
				}

				#ve-header-desktop .c-user-notifications {
					width: auto;
					height: 32px;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-pack: center;
					-ms-flex-pack: center;
					justify-content: center;
					color: var(--corp-color-darken)
				}

				#ve-header-desktop .c-user-notifications__text {
					display: none;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-notifications__text {
						display: inline
					}
				}

				#ve-header-desktop .c-user-notifications__icon {
					background: 0 0;
					border: 0;
					outline: 0;
					cursor: pointer;
					position: relative;
					padding: 0;
					width: 32px;
					height: 32px
				}

				#ve-header-desktop .c-user-navigation {
					display: flex;
					-webkit-box-ordinal-group: 4;
					-ms-flex-order: 3;
					order: 3;
					margin-left: auto
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop body:not(.s-app):not(.s-longread) .c-user-navigation {
						margin-left: 3px
					}
				}

				#ve-header-desktop body:not(.is-header-sticky):not(.has-no-products) .c-user-navigation .c-user-navigation__item.has-subscription {
					display: none
				}

				#ve-header-desktop .c-user-navigation .has-subscription {
					display: none
				}

				@media screen and (min-width:480px) {
					#ve-header-desktop .c-user-navigation .has-subscription {
						display: block
					}
				}

				#ve-header-desktop .c-user-navigation .has-subscription a {
					height: 32px;
					font-size: 16px;
					line-height: 1
				}

				#ve-header-desktop .c-user-navigation__item {
					margin-left: 8px
				}

				@media screen and (min-width:992px) {
					#ve-header-desktop .c-user-navigation__item {
						margin-left: 0
					}
				}

				#ve-header-desktop .c-user-navigation__item.has-mypages-link {
					display: none
				}

				#ve-header-desktop .c-user-avatar {
					border-radius: 50%;
					border: 1px solid var(--corp-color-darken);
					height: 32px;
					width: 32px;
					cursor: pointer;
					-webkit-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
					transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
					background-color: transparent;
					color: var(--corp-color-darken);
					display: block;
					padding: 0
				}

				#ve-header-desktop .c-user-avatar:hover {
					border-color: var(--corp-color-lighten);
					color: var(--white);
					background-color: var(--corp-color-lighten)
				}

				#ve-header-desktop .c-user-avatar:focus {
					outline: 0
				}

				#ve-header-desktop .c-user-avatar--initials {
					display: none;
					background-color: var(--corp-color-darken);
					border-color: var(--corp-color-darken);
					text-align: center;
					position: relative
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-avatar--initials {
						margin-right: 25px
					}
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-avatar--initials::after {
						content: "";
						display: block;
						height: 32px;
						width: 30px;
						right: -25px;
						top: 0;
						position: absolute;
						background-repeat: no-repeat;
						background-position: 14px 11px;
						background-size: 24px 24px;
						background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMEEzMjRCIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTcuMjQ4IDguNTA1TC40IDEuODVBMS4wNjIgMS4wNjIgMCAwIDEgLjQuMzE3YTEuMTM4IDEuMTM4IDAgMCAxIDEuNTc3IDBsNi4wNiA1Ljg4OUwxNC4wOTUuMzE4YTEuMTM5IDEuMTM5IDAgMCAxIDEuNTc3IDAgMS4wNiAxLjA2IDAgMCAxIDAgMS41MzJMOC44MjUgOC41MDVhMS4xMjggMS4xMjggMCAwIDEtLjc4OS4zMTcgMS4xMyAxLjEzIDAgMCAxLS43ODgtLjMxN3oiLz48L3N2Zz4=)
					}
				}

				#ve-header-desktop .c-user-avatar--initials span {
					color: #fff;
					text-transform: uppercase;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-weight: 700
				}

				#ve-header-desktop .c-user-menu {
					width: fit-content !important;
					-webkit-box-ordinal-group: 7;
					-ms-flex-order: 6;
					order: 6;
					width: 100%;
					height: 100vh;
					color: var(--white);
					border-top: 3px solid var(--corp-color-primary);
					z-index: 1001;
					position: absolute;
					top: 51px;
					right: 0;
					border-bottom: 2px solid rgba(0, 0, 0, .1);
					border-radius: 0 0 5px 5px
				}

				@media screen and (max-width:480px) {
					#ve-header-desktop .c-user-menu {
						top: 50px;
						overflow: auto !important;
						overscroll-behavior-y: contain !important;
						height: calc(var(--innerHeight) - 185px)
					}
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-menu {
						max-width: 240px;
						height: auto;
						top: 69px;
						right: 20px;
						-webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2);
						box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2)
					}
				}

				#ve-header-desktop .c-user-menu:before {
					border: solid transparent;
					content: "";
					height: 0;
					width: 0;
					position: absolute;
					pointer-events: none;
					border-bottom-color: var(--corp-color-darken);
					border-width: 8px;
					margin-left: -8px;
					top: -19px;
					right: 68px
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-menu:before {
						top: -23px;
						right: 32px;
						border-width: 10px;
						margin-left: -10px
					}
				}

				#ve-header-desktop .c-user-menu .c-header__submenu {
					font-size: 15px;
					padding-left: 0;
					font-size: 13px;
					padding-bottom: 13px;
					list-style: none;
					margin-top: 8px
				}

				#ve-header-desktop .c-user-menu .c-header__submenu li {
					border-top: 0;
					padding-top: 4px;
					padding-bottom: 9px;
					padding-left: 0
				}

				#ve-header-desktop .c-user-menu .c-header__submenu li:before {
					display: inline-block
				}

				#ve-header-desktop .c-user-menu__title {
					margin-bottom: 0;
					padding-left: 18px;
					padding-top: 15px;
					padding-bottom: 20px;
					background-color: var(--corp-color-darken)
				}

				#ve-header-desktop .c-user-menu__title h3 {
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-size: 20px;
					margin-bottom: 10px;
					font-weight: 600
				}

				#ve-header-desktop #logoutButtonContainer span:hover {
					text-decoration: underline
				}

				#ve-header-desktop .c-user-menu__list {
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-ms-flex-wrap: wrap;
					flex-wrap: wrap;
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					color: var(--white);
					z-index: 1
				}

				#ve-header-desktop .c-user-menu__list .c-nav-dropdown__item--divider {
					display: none
				}

				#ve-header-desktop .c-user-menu__list li {
					background-color: var(--corp-color-darken)
				}

				#ve-header-desktop .c-user-menu__list li.c-nav-dropdown__item--kundforum {
					display: none
				}

				#ve-header-desktop .c-user-menu__list a {
					text-decoration: none
				}

				#ve-header-desktop .c-user-menu__list a:hover {
					text-decoration: underline
				}

				#ve-header-desktop .c-user-menu__list .border {
					margin-top: 0 !important
				}

				#ve-header-desktop .c-user-menu__list .c-header__submenu {
					font-size: 15px;
					padding-left: 0;
					font-size: 14px;
					font-weight: 600;
					list-style: none;
					margin-top: 15px
				}

				@media screen and (max-width:991px) {
					#ve-header-desktop .c-user-menu__list .c-header__submenu li:before {
						display: inline-block
					}
				}

				@media screen and (max-width:991px) {
					#ve-header-desktop .c-user-menu__list .c-header__submenu li {
						font-size: 16px;
						margin: 16px 0
					}
				}

				@media screen and (max-width:992px) {
					#ve-header-desktop .c-header__menu {
						margin: auto
					}
				}

				#ve-header-desktop .c-user-menu__item {
					-ms-flex-preferred-size: 50%;
					flex-basis: 50%;
					-ms-flex-preferred-size: 100%;
					flex-basis: 100%;
					border-top: 1px solid var(--gray);
					padding-top: 15px;
					padding-bottom: 15px;
					padding-left: 20px;
					cursor: pointer;
					flex-direction: column;
					-webkit-tap-highlight-color: transparent
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-menu__item {
						padding-top: 11px;
						padding-bottom: 11px
					}
				}

				#ve-header-desktop .c-user-menu__item.js-epaper-trigger {
					order: 1
				}

				#ve-header-desktop .c-user-menu__item.js-epaper-trigger a {
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					text-decoration: none
				}

				#ve-header-desktop .c-user-menu__item.js-epaper-trigger span {
					font-weight: 700
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--puzzle {
					order: 3
				}

				#ve-header-desktop body:not(.site-gp) .c-user-menu__item.c-nav-dropdown__item--puzzle {
					display: none
				}

				#ve-header-desktop .c-user-menu__item.c-nav-dropdown__item--puzzle span {
					font-weight: 700
				}

				#ve-header-desktop .c-user-menu__item.triggerToggle {
					display: block;
					position: relative;
					text-align: left
				}

				#ve-header-desktop .c-user-menu__item.triggerToggle:not(.c-nav-dropdown--open) ul {
					display: none
				}

				#ve-header-desktop body:not(.s-app) .c-user-menu__item.c-nav-dropdown__item--app-settings {
					display: none
				}

				#ve-header-desktop .c-user-menu__item.js-logout-trigger {
					order: 6
				}

				#ve-header-desktop .c-user-menu__item.triggerToggle svg {
					width: 15px;
					position: absolute;
					right: 15px
				}

				#ve-header-desktop .c-user-menu__item span {
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-weight: 400;
					margin-top: 0;
					font-size: 17px;
					padding-left: 18px;
					padding-left: 0
				}

				@media screen and (min-width:768px) {
					#ve-header-desktop .c-user-menu__item span {
						font-size: 15px
					}

					#ve-header-desktop .voc-main-menu-onplus {
						display: none
					}
				}

				#ve-header-desktop li.c-user-menu__item-filler {
					height: 0;
					order: 99
				}

				#ve-header-desktop .c-gallery__arrow:not(:focus) {
					transition-property: -webkit-transform, opacity;
					-webkit-transition-property: opacity, -webkit-transform;
					transition-property: opacity, -webkit-transform;
					transition-property: transform, opacity;
					transition-property: transform, opacity, -webkit-transform;
					-webkit-transition-duration: .3s;
					transition-duration: .3s
				}

				#ve-header-desktop .c-gallery__fullscreen-btn:not(:focus) {
					transition-property: -webkit-transform, opacity;
					-webkit-transition-property: opacity, -webkit-transform;
					transition-property: opacity, -webkit-transform;
					transition-property: transform, opacity;
					transition-property: transform, opacity, -webkit-transform;
					-webkit-transition-duration: .3s;
					transition-duration: .3s
				}

				#ve-header-desktop .c-user-menu__title h3 {
					font-size: 1px;
					color: transparent
				}

				#ve-header-desktop .c-user-menu__title h3::before {
					content: "Hej!";
					color: #fff;
					font-size: 20px
				}

				#ve-header-desktop .user-menu-container .c-nav-dropdown__item--prenumeration>svg,
				#ve-header-desktop .user-menu-container .c-nav-dropdown__item--prenumeration>ul {
					display: none !important
				}

				#ve-header-desktop #top-department-korsord {
					display: none !important
				}

				#ve-header-desktop .c-user-notifications svg.c-icon {
					pointer-events: none
				}

				#ve-header-desktop #top-department-korsord {
					display: none
				}

				@media screen and (max-width:767px) {
					#ve-header-desktop .c-header__menu__item .customer-service {
						color: #fff;
						position: absolute;
						top: 50%;
						-ms-transform: translateY(-50%);
						transform: translateY(-50%)
					}

					#ve-header-desktop .c-header__nav-toggle {
						position: absolute;
						top: 0;
						left: 0
					}

					#ve-header-desktop .c-header__brand {
						margin: auto;
						margin-top: 0
					}

					#ve-header-desktop .o-container--header {
						height: 100%
					}

					#ve-header-desktop .voc-container-button-menu-header {
						align-items: center;
						background-color: transparent;
						cursor: pointer;
						display: inline-flex;
						flex-direction: row;
						justify-content: center;
						height: 48px;
						max-width: 48px;
						padding: 0 4px;
						position: relative;
						transition: all .3s ease
					}

					#ve-header-desktop .hamburger {
						align-items: center;
						background-color: transparent;
						cursor: pointer;
						display: flex;
						flex-direction: column;
						position: relative;
						transform: translateZ(0);
						transition: transform .25s cubic-bezier(.05, 1.04, .72, .98);
						-webkit-user-select: none;
						-moz-user-select: none;
						-ms-user-select: none;
						user-select: none;
						z-index: 1002
					}

					#ve-header-desktop ._layer {
						background: #1d8244;
						border-radius: 4px;
						height: 2px;
						margin-bottom: 5px;
						opacity: 1;
						transform: translateZ(0);
						transition: all .25s cubic-bezier(.05, 1.04, .72, .98);
						width: 24px
					}

					#ve-header-desktop .-bottom {
						margin-bottom: 0
					}

					#ve-header-desktop .hamburger.is-active .-bottom {
						background: #fff;
						-webkit-transform: translateY(-210%) rotate(135deg);
						-ms-transform: translateY(-210%) rotate(135deg);
						transform: translateY(-210%) rotate(135deg)
					}

					#ve-header-desktop .hamburger.is-active .-mid {
						opacity: 0
					}

					#ve-header-desktop .hamburger.is-active .-top {
						background: #fff;
						-webkit-transform: translateY(490%) rotate(45deg);
						-ms-transform: translateY(490%) rotate(45deg);
						transform: translateY(490%) rotate(45deg)
					}

					#ve-header-desktop .voc-main-menu.is_active {
						transform: translateX(0)
					}

					#ve-header-desktop .hamburger.is-active {
						background-color: transparent
					}

					#ve-header-desktop .voc-container-button-menu-header {
						align-items: center;
						background-color: transparent;
						cursor: pointer;
						display: inline-flex;
						flex-direction: row;
						justify-content: center;
						height: 48px;
						max-width: 48px;
						padding: 0 4px;
						position: relative;
						transition: all .3s ease
					}

					@media (min-width:699px) {
						#ve-header-desktop .voc-container-button-menu-header {
							padding: 0;
							max-width: 110px
						}
					}

					#ve-header-desktop .voc-container-button-menu-header:hover {
						background-color: #f7f7f8
					}

					#ve-header-desktop .voc-container-button-menu-header:hover {
						background: 0 0
					}

					#ve-header-desktop .voc-container-button-menu-header span {
						color: #1a1a1a;
						display: inline-block;
						font-family: Gothia Sans Serif, sans-serif;
						font-size: 13px;
						position: absolute;
						right: 15px;
						text-transform: uppercase;
						top: 1px
					}

					#ve-header-desktop .voc-container-button-menu-header span {
						top: 2px
					}

					#ve-header-desktop .voc-container-button-menu-header.is_active {
						background-color: #1e2d37
					}

					#ve-header-desktop .voc-container-button-menu-header.is_active span {
						color: #fff
					}

					#ve-header-desktop .c-header__menu {
						display: none
					}

					#ve-header-desktop .voc-main-menu {
						position: absolute !important;
						z-index: 1400
					}

					#ve-header-desktop .voc-main-menu {
						transform: translateX(-455px)
					}

					#ve-header-desktop .voc-main-menu {
						background: #fff;
						box-shadow: 10px 6px 10px 1px rgba(0, 0, 0, .1);
						border-top: 1px solid #f7f7f8;
						font: 15px/15px Gothia Sans Serif, sans-serif;
						height: 100%;
						position: fixed;
						top: 49px;
						transition: transform .1s ease-in;
						width: 440px;
						z-index: 1031
					}

					#ve-header-desktop .voc-main-menu {
						border-top: none;
						box-shadow: none;
						transform: translateX(-100%);
						top: 0;
						width: 100%;
						right: 0
					}

					#ve-header-desktop .voc-main-menu ul {
						list-style: none;
						padding: 0
					}

					#ve-header-desktop .voc-main-menu ul.voc-menu-level-1st {
						background-color: #fff;
						min-height: calc(100vh - 90px);
						margin: 0;
						padding: 0;
						width: 100%
					}

					#ve-header-desktop .voc-main-menu h3,
					#ve-header-desktop .voc-main-menu h4 {
						font: 16px/16px Gothia Sans Serif, sans-serif;
						margin: 0
					}

					#ve-header-desktop .voc-main-menu h4 a {
						color: #78878c;
						opacity: 1;
						transition: opacity .2s ease
					}

					#ve-header-desktop .voc-main-menu h4 a:hover {
						color: #1e2d37
					}

					#ve-header-desktop .voc-main-menu h3,
					#ve-header-desktop .voc-main-menu h4 {
						font: 17px/17px Gothia Sans Serif, sans-serif
					}

					#ve-header-desktop .voc-main-menu h4 {
						font: 15px/15px Gothia Sans Serif, sans-serif
					}

					#ve-header-desktop .voc-main-menu .voc-menu-sections h4,
					#ve-header-desktop .voc-main-menu .voc-menu-services h3 {
						font: 15px/15px Gothia Sans Serif, sans-serif;
						margin-top: 12px;
						padding: 12px 0 0 12px
					}

					#ve-header-desktop .voc-main-menu .voc-menu-services h3 {
						border-top: none;
						font: 17px/17px Gothia Sans Serif, sans-serif;
						margin: 0;
						padding: 0
					}

					#ve-header-desktop .voc-main-menu .voc-menu-services h3 {
						padding-left: 0
					}

					#ve-header-desktop .voc-close-burguer-mobile-onplus {
						background: 0 0;
						border: none;
						display: block;
						height: 48px;
						position: absolute;
						padding: 0;
						right: 4px;
						top: 4px;
						width: 48px;
						z-index: 1
					}

					#ve-header-desktop .voc-main-menu li a.voc-antropia-section {
						-webkit-animation: color-change 10s infinite;
						animation: color-change 10s infinite
					}

					#ve-header-desktop .voc-main-menu-onplus .voc-select-menu {
						width: 50%;
						margin: 10px 0 0
					}

					#ve-header-desktop .voc-close-burguer-mobile-onplus {
						background: 0 0;
						border: none;
						display: block;
						height: 48px;
						position: absolute;
						padding: 0;
						right: 4px;
						top: 4px;
						width: 48px;
						z-index: 1
					}

					#ve-header-desktop .voc-close-burguer-mobile-onplus i {
						color: #fff;
						font-size: 24px
					}

					#ve-header-desktop .voc-content-menu {
						background: linear-gradient(90deg, #fff 0, #fff calc(50% - 8px), #f7f7f8 calc(50% - 8px), #f7f7f8 calc(50% - 8px), #f7f7f8);
						height: calc(100% - 90px);
						overflow-y: scroll
					}

					#ve-header-desktop .voc-content-menu .downArrow {
						cursor: pointer;
						float: right
					}

					#ve-header-desktop .voc-menu-level-1st {
						float: left;
						width: 50%
					}

					#ve-header-desktop .voc-menu-sections li {
						padding: 12px 12px 11px 24px;
						cursor: pointer
					}

					#ve-header-desktop .voc-menu-sections li .voc-icons {
						cursor: pointer;
						float: right
					}

					#ve-header-desktop .voc-menu-sections li {
						padding: 10px 16px 10px;
						position: relative;
						min-height: 40px
					}

					#ve-header-desktop .voc-menu-sections li:active {
						background: #f7f7f8
					}

					#ve-header-desktop .voc-menu-sections li:last-child {
						margin-bottom: 40px
					}

					#ve-header-desktop .voc-icons {
						font-family: Vocento Web Lig;
						font-style: normal;
						font-variant-ligatures: discretionary-ligatures
					}

					#ve-header-desktop .voc-icons.close-x:before {
						content: "w"
					}

					#ve-header-desktop .voc-icons.downArrow:before {
					}

					#ve-header-desktop .downArrow[aria-expanded=true]:before {
					}

					#ve-header-desktop .voc-detail-nav .voc-icons {
						font-size: 28px
					}

					#ve-header-desktop .voc-search-container button .voc-icons {
						color: #fff;
						display: block;
						font-size: 18px;
						width: 28px
					}

					#ve-header-desktop .voc-menu-sections li .voc-icons {
						cursor: pointer;
						float: right
					}

					#ve-header-desktop .voc-content-menu .downArrow {
						cursor: pointer;
						float: right
					}

					#ve-header-desktop .collapse.in {
						display: block
					}

					#ve-header-desktop .collapse {
						display: none
					}

					#ve-header-desktop .container-menu-onplus2 {
						position: relative;
						background-color: #1e2d37;
						height: 124px;
						padding: 0 20px;
						display: none
					}

					#ve-header-desktop .container-menu-onplus2 {
						display: flex;
						flex-direction: column
					}

					#ve-header-desktop .container-menu-onplus2 {
						height: 60px
					}

					#ve-header-desktop span.dropdown-title {
						float: left;
						font-size: 20px;
						color: #00000080;
						padding-top: 1px;
						margin-bottom: 0;
						font-family: "Gothia Serif", Serif;
						font-weight: 700;
						margin-right: 20px
					}

					#ve-header-desktop span.dropdown-title-empty {
						color: transparent
					}

					#ve-header-desktop h4.link-06-dropdown {
						padding: 11px 0 0 0 !important
					}
				}

				@media screen and (max-width:1024px) {
					#ve-header-desktop .o-container.o-container--header {
						z-index: 1199
					}
				}
			</style>
		</head>

		<body>
			<div id=ve-header-desktop>
				<header class="c-header o-grid__header">
					<div class="o-container o-container--header">
						<div class=c-header__brand itemid=http://www.gp.se itemscope
							itemtype=http://schema.org/NewsMediaOrganization> <meta content=Göteborgs-Posten
							itemprop=name>
							<span itemprop=logo itemscope itemtype=https://schema.org/ImageObject><link href=/polopoly_fs/3.200.1655797719!/images/se.gp/fallback-og-image.png itemprop=url></span>
							<a href=https://www.gp.se itemprop=url> <svg class=gp id=brand-gp
									preserveAspectRatio="xMinYMid meet" viewBox="0 0 370 51"
									xmlns=http://www.w3.org/2000/svg> <path
									d=M413.85,390.87c0,.21.2.21.41.21H419c.21,0,.41,0,.41-.21v-8.4c0-.21,0-.42-.41-.42h-3.7c-.2,0-.2,0-.41.42a15.31,15.31,0,0,0-.82,2.1c-.2.21-.2.21-.41,0a7,7,0,0,0-5.75-2.73c-3.91,0-7.81,3.57-7.81,9s2.47,7.55,3.08,8.18,1.44,1.05,4.52,2.1c2.88.84,2.67.84,3.08,1.05a2.31,2.31,0,0,1,1.24,2.1c0,1.47-1.24,2.1-2.67,2.1a4.74,4.74,0,0,1-4.11-3.36c0-.21,0-.42-.62-.42h-4.93c-.41,0-.41.21-.41.63v8.39c0,.21,0,.42.2.42h4.94a.73.73,0,0,0,.41-.21,12.86,12.86,0,0,1,.82-1.89c.2-.21.2,0,.2.21a6.16,6.16,0,0,0,5.14,2.52c3.7,0,8.83-2.1,8.83-9.44,0-6.09-3.28-7.77-4.11-8.4-1.23-.84-4.72-1.89-5.75-2.31-.61-.2-2.46-1-2.46-2.72,0-1.26,1.43-2.1,2.67-2.1,2.46,0,3.7,1.68,3.7,2.31v.84Zm10.06-9.24c.21-.42,3.29-6.29,3.49-6.71s.21-.42.62-.42h4.32a.45.45,0,0,1,.41.42v6.71c0,.21,0,.42.2.42h4.52c.21,0,.41,0,.41.21v6.93c0,.21,0,.21-.2.21H433c-.2,0-.2,0-.2.21v13a2.7,2.7,0,0,0,2.87,3.15,15.52,15.52,0,0,0,1.85-.21c.21,0,.21,0,.21.21v5.87c0,.21,0,.21-.21.42a27.24,27.24,0,0,1-5.55.63c-3.28,0-8.21-1.05-8.21-8V389.61c0-.21,0-.21-.21-.21h-2.88c-.2,0-.2.21-.2,0v-6.93a.2.2,0,0,1,.2-.21h2.47c.41-.21.82-.42.82-.63ZM216.83,401.36c0-.21,0-.21-.21-.21h-6.16c-.21,0-.21,0-.21.21s0,4-3.28,4c-2.88,0-3.5-3.36-3.5-5.67v-2.1a.21.21,0,0,1,.21-.21h12.53c.21,0,.21,0,.21-.21v-1.89s.82-14.06-10.69-14.06c-10.89,0-10.47,13.43-10.47,14.9V398c0,12.59,8,14.48,11.09,14.48C217,412.69,216.83,401.57,216.83,401.36Zm-13.36-9.86c0-.84.62-3.57,2.47-3.57,2.26,0,2.26,3.36,2.26,4v1.25c0,.21,0,.42-.21.42h-4.31c-.21,0-.21-.21-.21-.42Zm256.39,9.86c0-.21,0-.21-.2-.21H453.5c-.21,0-.21,0-.21.21s0,4-3.29,4c-2.87,0-3.49-3.36-3.49-5.67v-2.1a.21.21,0,0,1,.21-.21h12.53c.2,0,.2,0,.2-.21v-1.89s.83-14.06-10.68-14.06c-10.89,0-10.48,13.43-10.48,14.9V398c0,12.59,8,14.48,11.1,14.48C460.07,412.69,459.86,401.57,459.86,401.36Zm-13.35-9.86c0-.84.62-3.57,2.47-3.57,2.26,0,2.26,3.36,2.26,4v1.25c0,.21,0,.42-.21.42h-4.31c-.21,0-.21-.21-.21-.42V391.5ZM165.88,412.9c-7.19,0-11.51-5.45-11.51-14.9v-1.89c0-9.44,4.11-14.9,11.51-14.9,7.19,0,11.5,5.46,11.5,14.9V398C177.38,407.45,173.07,412.9,165.88,412.9Zm2.26-16.79c0-6.29-.62-8-2.26-8s-2.26,1.68-2.26,8V398c0,6.3.61,8,2.26,8s2.26-1.68,2.26-8ZM164,379.53c.2,0,.41,0,.41-.21v-5.45c0-.21,0-.42-.41-.42h-6c-.2,0-.41,0-.41.42v5.45a.45.45,0,0,0,.41.42C158.69,379.53,164,379.53,164,379.53Zm9.65,0c.21,0,.42,0,.42-.21v-5.45c0-.21,0-.42-.42-.42h-6c-.21,0-.41,0-.41.42v5.45a.44.44,0,0,0,.41.42C168.34,379.53,173.68,379.53,173.68,379.53Zm80.95,33.37c-7.19,0-11.51-5.45-11.51-14.9v-1.89c0-9.44,4.11-14.9,11.51-14.9,7.19,0,11.5,5.46,11.5,14.9V398C266.13,407.45,261.82,412.9,254.63,412.9Zm2.26-16.79c0-6.29-.62-8-2.26-8s-2.26,1.68-2.26,8V398c0,6.3.61,8,2.26,8s2.26-1.68,2.26-8Zm-76.22-14.27c.2-.42,3.29-6.3,3.49-6.71s.21-.42.62-.42h4.31a.44.44,0,0,1,.41.42v6.71c0,.21,0,.42.21.42h4.52c.2,0,.41,0,.41.21V389c0,.21,0,.21-.21.21h-4.72c-.21,0-.21,0-.21.21v13.43a2.71,2.71,0,0,0,2.88,3.15,15.52,15.52,0,0,0,1.85-.21c.2,0,.2,0,.2.21v5.87c0,.21,0,.21-.2.42a27.5,27.5,0,0,1-5.55.63c-3.29,0-8.22-1-8.22-8V389.4c0-.21,0-.21-.2-.21h-2.88c-.2,0-.2-.21-.2-.42v-6.51a.2.2,0,0,1,.2-.21h2.67A.91.91,0,0,0,180.67,381.84Zm146.48,9c0,.21.2.21.41.21h4.73c.2,0,.41,0,.41-.21v-8.4c0-.21,0-.42-.41-.42h-3.7c-.21,0-.21,0-.41.42a14.29,14.29,0,0,0-.83,2.1c-.2.21-.2.21-.41,0-.61-.21-2.26-2.52-6.16-2.52s-7.81,3.57-7.81,9,2.47,7.55,3.09,8.18,1.43,1.05,4.51,2.1c2.88.84,2.68.84,3.09,1.05a2.31,2.31,0,0,1,1.23,2.1c0,1.47-1.23,2.1-2.67,2.1a4.75,4.75,0,0,1-4.11-3.36c0-.21,0-.42-.62-.42h-4.93c-.41,0-.41.21-.41.63v8.39c0,.21,0,.42.21.42h4.93a.73.73,0,0,0,.41-.21,14,14,0,0,1,.82-1.89c.21-.21.21,0,.21.21a6.11,6.11,0,0,0,5.13,2.52c3.7,0,8.84-2.1,8.84-9.44,0-6.09-3.29-7.77-4.11-8.4-1.24-.84-4.73-1.89-5.76-2.31-.61-.21-2.46-1-2.46-2.72,0-1.26,1.44-2.1,2.67-2.1,2.47,0,3.7,1.68,3.7,2.31C327.15,390.66,327.15,390.87,327.15,390.87Zm59.78,22c-7.19,0-11.5-5.45-11.5-14.9v-1.89c0-9.44,4.31-14.9,11.5-14.9s11.51,5.46,11.51,14.9V398C398.44,407.45,394.33,412.9,386.93,412.9Zm2.26-16.79c0-6.29-.61-8-2.26-8s-2.26,1.68-2.26,8V398c0,6.3.62,8,2.26,8s2.26-1.68,2.26-8Zm89.57,16.16a.45.45,0,0,1-.41-.42V391.5c0-.84-.2-2.52-2.87-2.52a2.73,2.73,0,0,0-2.67,2.73v12.8c0,.42.2.42.41.42a11.37,11.37,0,0,1,2.46.84c.41.21.41.42.41.63v5c0,.42,0,.63-.41.63H461.1c-.41,0-.41-.21-.41-.42v-5.45c0-.42.2-.42.41-.63.2,0,2-.63,2.26-.63s.41,0,.41-.42V389a.21.21,0,0,0-.21-.21c-.2,0-2.46-.84-2.87-.84-.21,0-.21-.21-.21-.42v-5.25a.21.21,0,0,1,.21-.21H471a.45.45,0,0,1,.41.42v4c0,.42.2.21.41,0,.21-.42,2.26-4.83,8.42-4.83,5.14,0,6.78,4,6.78,7.77v15.32c0,.42.21.42.41.42s2.26.84,2.67.84c.42.21.42.21.42.42v5.24c0,.42,0,.63-.42.63C487.19,412.48,478.76,412.27,478.76,412.27ZM278.25,386.88c0,.21-.41.42-.41,0v-4.2a.44.44,0,0,0-.41-.42H267.16c-.41,0-.21.21-.21.21v5.25c0,.21,0,.21.21.42.21,0,2.67.84,2.88.84a.2.2,0,0,1,.2.21v15.53c0,.42-.2.42-.41.42s-2.05.63-2.26.63-.41.21-.41.63v5.45a.45.45,0,0,0,.41.42h14.59c.41,0,.41-.21.41-.63v-5c0-.21,0-.42-.41-.63a17,17,0,0,1-2.47-.84.45.45,0,0,1-.41-.42V394.64c0-3.56,2.26-4.4,3.9-4.4a27.66,27.66,0,0,1,2.88.21c.41,0,.41-.21.41-.42v-8c0-.63,0-1.05-.61-.84-1,.21-6,1.05-7.61,5.67Zm68.62,11.75c.21,0,.21,0,.21-.21v-7.55c0-.21,0-.21-.41-.21h-11.1c-.2,0-.41,0-.41.42v7.34a.45.45,0,0,0,.41.42C336.6,398.63,346.87,398.63,346.87,398.63Z
									fill=#0a324b transform="translate(-120.48 -371.56)"></path>
									<path
										d=M360.43,404.51v-6.3c0-.21,0-.42.41-.42h3.7c1.23,0,11.3.21,11.3-13.43S361.87,372,359.4,372H347.9s-.21,0-.21.42v5.87c0,.21.21.21.41.42.21,0,2.06.63,2.47.63.2,0,.41,0,.41.42V404.3c0,.42-.21.42-.41.42s-2.06.63-2.26.63-.41.21-.41.63v5.66a.44.44,0,0,0,.41.42h15.2c.41,0,.41-.21.41-.63v-5.24c0-.21,0-.42-.41-.63a16.81,16.81,0,0,1-2.46-.84C360.64,404.93,360.43,404.93,360.43,404.51ZM366,384.36c0,2.94-.41,6.3-5.55,6.3-.2,0-.41,0-.41-.42V379.32c0-.21.41-.42.41-.42C365.57,378.9,366,382.47,366,384.36Zm-53.83-2.31H301.88c-.21,0-.41,0-.41.21v4.41c0,.21-.21.21-.21,0s-1.85-5.67-6.78-5.67c-8.83,0-8,14.27-8,18.68,0,2.31.21,12.59,8.22,12.59,2.67,0,5.14-2.31,5.34-2.52s.41-.21.41.21v2.94c0,1.68-.82,3.36-2.67,3.36s-2.46-1.05-2.46-1.26,0-.21-.42-.21h-6.57c-.2,0-.2.21-.2.42,0,.42,1,7.35,10.06,7.35,10.68,0,10.89-9.45,10.89-13V389.19c0-.42.21-.42.41-.42.62.21,2.26-.42,2.67-.42.21,0,.41,0,.41-.42v-5.67A.62.62,0,0,0,312.15,382.05ZM300.44,400.1c0,1-.61,5.25-2.46,5.25-2.67,0-2.47-6.51-2.47-7.56s-.2-9,2.26-9,2.67,4.19,2.67,4.61Zm-67-18.68c-2.67,0-5.14,2.73-5.34,2.94s-.41.21-.41-.21V372.4c0-.21,0-.42-.42-.42H215.8c-.41,0-.21.21-.21.21v5.24c0,.21,0,.21.21.42.21,0,2.67.84,2.88.84a.2.2,0,0,1,.2.21v32.74c0,.42,0,.63.41.63h5.14c.2,0,.41,0,.41-.21s1.64-2.93,1.64-3.14c.21-.21.21-.21.21,0a7.61,7.61,0,0,0,7,4c4.32,0,8.22-4.4,8.22-14.48V393.8C241.89,391.29,241.07,381.42,233.47,381.42Zm-3.08,24.35c-2.47,0-2.67-4.2-2.67-4.62v-6.51c0-1.05.61-5.24,2.46-5.24,2.67,0,2.47,6.5,2.47,7.55C232.65,397.79,232.85,405.77,230.39,405.77Zm-95.74-34.21c-5.34,0-14.17,4.4-14.17,20.57,0,16.37,6.77,21,13.55,21,5.14,0,8-2.73,9.25-5.24.2-.42.2-.42.41,0,0,.42.82,4,.82,4.19s.21.21.41.21h5.34c.21,0,.21-.21.21-.42V398.42c0-.42.2-.42.41-.42h1.85a.45.45,0,0,0,.41-.42v-6.29c0-.42-.21-.42-.21-.42h-16s-.21,0-.21.42v6.29a.45.45,0,0,0,.42.42H140c.21,0,.41,0,.41.42,0,3.15-1,5.46-4.31,5.46-2.88,0-4.32-2.52-4.73-5.88a50.52,50.52,0,0,1-.41-5.87,54.09,54.09,0,0,1,.41-5.88c.41-3.57,2.06-6.3,5.14-6.3,4.31,0,5.34,5.25,5.55,6.72,0,.42.41.42.82.42h6.78c.82,0,.82-.42.82-.84V373c0-.63,0-.84-.62-.84h-3.08c-.2,0-.41,0-.41.42-.2.21-1.23,2.52-1.85,3.77C143.69,375.13,141.43,371.56,134.65,371.56Z
										fill=#0a324b transform="translate(-120.48 -371.56)"></path>
								</svg> </a> </div>
						<div class="c-header__nav-toggle js-menu-button voc-header-left" aria-label=Menu href=#
							id=navBtn role=button title=A-Ö>
							<div class=voc-container-button-menu-header data-voc-burguer-header="">
								<div class="hamburger voc-header-nav" data-ol-has-click-handler="">
									<div class="_layer -top"></div>
									<div class="_layer -mid"></div>
									<div class="_layer -bottom"></div>
								</div>
							</div>
						</div>
						<nav class="voc-main-menu voc-main-menu-onplus">
							<button class=voc-close-burguer-mobile-onplus data-ol-has-click-handler=""type=button> <i class="voc-icons close-x"></i></button>
							<div class=container-menu-onplus2>
								<div class=login-user-new data-voc-username-hamburguer=""></div>
							</div>
							<div class=voc-content-menu>
								<ul class="voc-menu-level-1st voc-menu-sections">
									<li>
										<h3> <a href=https://www.gp.se title=Nyheter
												target=_self>Nyheter</a><i class="voc-icons downArrow"data-target=#linkmainsubmenu01 data-toggle=collapse></i>
										</h3>
										<hgroup class=collapse id=linkmainsubmenu01>
											<h4> <a href=https://www.gp.se/nyheter/g%C3%B6teborg title=Göteborg
													target=_self>Göteborg</a> </h4>
											<h4> <a href=https://www.gp.se/nyheter/storg%C3%B6teborg title=Storgöteborg
													target=_self>Storgöteborg</a> </h4>
											<h4> <a href=https://www.gp.se/nyheter/v%C3%A4stsverige title=Västsverige
													target=_self>Västsverige</a> </h4>
											<h4> <a href=https://www.gp.se/nyheter/sverige title=Sverige
													target=_self>Sverige</a> </h4>
											<h4> <a href=https://www.gp.se/nyheter/v%C3%A4rlden title=Världen
													target=_self>Världen</a> </h4>
											<h4> <a href=https://www.gp.se/nyheter/lyssna-p%C3%A5-gp
													title="Lyssna på GP " target=_self>Lyssna på GP </a> </h4>
											<h4> <a href=https://www.gp.se/nyheter/gp-granskar title="GP granskar"
													target=_self>GP granskar</a> </h4>
										</hgroup>
									</li>
									<li>
										<h3> <a href=https://www.gp.se/ekonomi title=Ekonomi
												target=_self>Ekonomi</a><i class="voc-icons downArrow"data-target=#linkmainsubmenu02 data-toggle=collapse></i>
										</h3>
										<hgroup class=collapse id=linkmainsubmenu02>
											<h4> <a href=https://www.gp.se/livsstil/bostad title=Bostad
													target=_self>Bostad</a> </h4>
											<h4> <a href=https://www.gp.se/livsstil/konsument title=Konsument
													target=_self>Konsument</a> </h4>
											<h4> <a href=https://www.gp.se/ekonomi/lagfarter title=Lagfarter
													target=_self>Lagfarter</a> </h4>
										</hgroup>
									</li>
									<li>
										<h3> <a href=https://www.gp.se/sport/ title=Sport
												target=_self>Sport</a><i class="voc-icons downArrow"data-target=#linkmainsubmenu03 data-toggle=collapse></i>
										</h3>
										<hgroup class=collapse id=linkmainsubmenu03>
											<h4><a href=https://www.gp.se/sport/fotboll title=Fotboll
													target=_self>Fotboll</a></h4>
											<h4> <a href=https://www.gp.se/sport/ishockey>Ishockey </a> </h4> <h4> <a
														href=https://www.gp.se/sport/handboll>Handboll </a> </h4> <h4>
														<a href=https://www.gp.se/sport/031-hockey>031 hockey</a> </h4>
															<h4> <a href=https://www.gp.se/sport/031-fotboll>031
																fotboll</a> </h4> <h4> <a
																	href=https://www.ideal.es/deportes/deporte-femenino/
																	title="Deporte Femenino" target=_self>Deporte
																	Femenino</a> </h4>
											<h4> <a href=https://www.gp.se/sport/m%C3%A5lservice>Målservice </a> </h4>
													<h4><a href=https://www.gp.se/sport/resultat-tabeller>Resultat &
														tabeller</a> </h4> </hgroup> </li> <li id=top-department-kultur>
														<h3> <a href=https://www.gp.se/kultur title=kultur
																target=_self>Kultur</a><i class="voc-icons downArrow"data-target=#linkmainsubmenu04 data-toggle=collapse></i>
														</h3>
														<hgroup class=collapse id=linkmainsubmenu04>
															<h4><a href=https://www.gp.se/kultur/konsertsommaren>Konsertsommaren
																	</a> </h4> <h4> <a
																		href=https://www.gp.se/kultur/musik>Musik </a>
																		</h4> <h4> <a
																			href=https://www.gp.se/kultur/film-tv>Film/TV
																			</a> </h4> <h4> <a
																				href=https://www.gp.se/kultur/litteratur>Litteratur
																				</a> </h4> <h4> <a
																					href=https://www.gp.se/livsstil/tv%C3%A5-dagar>Två
																					Dagar</a> </h4> <h4> <a
																						href=https://www.gp.se/livsstil/v%C3%A4rldens-g%C3%A5ng>Världens
																						Gång</a> </h4> <h4> <a
																							href=https://www.gp.se/kultur/konst>Konst
																							</a> </h4> <h4> <a
																								href=https://www.gp.se/kultur/scen>Scen
																								</a> </h4> <h4> <a
																									href=https://www.gp.se/kultur/mat-dryck>Mat
																									& Dryck</a> </h4>
																									</hgroup> </li> <li>
																									<h3> <a href=https://www.gp.se/ledare/
																											title=Ledare
																											target=_self
																											id=top-department-ledare>Ledare</a>
																									</h3>
									</li>
									<li>
										<h3> <a href=https://www.gp.se/debatt title=Debatt
												target=_self>Debatt</a><i class="voc-icons downArrow"data-target=#linkmainsubmenu05 data-toggle=collapse></i>
										</h3>
										<hgroup class=collapse id=linkmainsubmenu05>
											<h4><a href=https://www.gp.se/debatt/fria-ord>Fria ord</a> </h4> </hgroup>
													</li> <li>
													<h3> <a href=https://www.gp.se/val-2022 title="Val 2022"
															target=_self>Val 2022</a> </h3>
									</li>
									<li class="c-header__menu__item is-service-link" aria-hidden=true
										style=background-color:#1e2d37> <a href=https://info.gp.se/kundservice/
											title=Kundservice class="c-header__menu__link customer-service">💬
											Kundservice </a> </li>
									<li class="c-header__menu__item is-service-link is-tipsa"> <a
											href=https://www.gp.se/nyheter/tipsa-oss title="Tipsa oss"
											class=c-header__menu__link>📞 Tipsa oss </a> </li>
								</ul>
							</div>
						</nav>
						<nav class=c-header__menu role=navigation>
							<ul class=c-header__menu__list>
								<li class="c-header__menu__item has-dropdown" id=top-department-korsord> <a
										href=https://www.gp.se/korsord class=c-header__menu__link>Korsord</a>
									<ul class=c-header__submenu id=sub-department-korsord>
										<li> <a href=https://www.gp.se/korsord/bildkryss>bildkryss </a> </li> </ul> <a
												href=# class="c-header__menu__arrow js-menu-accordion"
												aria-label="Toggle menu" role=button> </a> </li>
										<li class="c-header__menu__item has-dropdown is-active"
											id=top-department-nyheter> <a href=https://www.gp.se/
												class=c-header__menu__link>Nyheter</a>
											<ul class=c-header__submenu id=sub-department-nyheter>
												<li> <a href=https://www.gp.se/nyheter/g%C3%B6teborg>Göteborg </a> </li>
														<li> <a
															href=https://www.gp.se/nyheter/storg%C3%B6teborg>Storgöteborg
															</a> </li> <li> <a
																href=https://www.gp.se/nyheter/v%C3%A4stsverige>Västsverige
																</a> </li> <li> <a
																	href=https://www.gp.se/nyheter/sverige>Sverige </a>
																	</li> <li> <a
																		href=https://www.gp.se/nyheter/v%C3%A4rlden>Världen
																		</a> </li> <li> <a
																			href=https://www.gp.se/nyheter/lyssna-p%C3%A5-gp>Lyssna
																			på GP </a> </li> <li> <a
																				href=https://www.gp.se/nyheter/gp-granskar>GP
																				granskar</a> </li> </ul> <a href=#
																				class="c-header__menu__arrow js-menu-accordion"
																				aria-label="Toggle menu" role=button>
																			</a> </li>
												<li class="c-header__menu__item has-dropdown" id=top-department-ekonomi>
													<a href=https://www.gp.se/ekonomi
														class=c-header__menu__link>Ekonomi</a>
													<ul class=c-header__submenu id=sub-department-ekonomi>
														<li> <a href=https://www.gp.se/livsstil/bostad>Bostad </a> </li>
																<li> <a
																	href=https://www.gp.se/livsstil/konsument>Konsument
																	</a> </li> <li> <a
																		href=https://www.gp.se/ekonomi/lagfarter>Lagfarter
																		</a> </li> </ul> <a href=#
																		class="c-header__menu__arrow js-menu-accordion"
																		aria-label="Toggle menu" role=button> </a> </li>
														<li class="c-header__menu__item has-dropdown"
															id=top-department-sport> <a href=https://www.gp.se/sport
																class=c-header__menu__link>Sport</a>
															<ul class=c-header__submenu id=sub-department-sport>
																<li> <a href=https://www.gp.se/sport/fotboll>Fotboll
																		</a> </li> <li> <a
																			href=https://www.gp.se/sport/ishockey>Ishockey
																			</a> </li> <li> <a
																				href=https://www.gp.se/sport/handboll>Handboll
																				</a> </li> <li> <a
																					href=https://www.gp.se/sport/031-hockey>031
																					hockey</a> </li> <li> <a
																						href=https://www.gp.se/sport/031-fotboll>031
																						fotboll</a> </li> <li> <a
																							href=https://www.gp.se/sport/m%C3%A5lservice>Målservice
																							</a> </li> <li> <a
																								href=https://www.gp.se/sport/resultat-tabeller>Resultat
																								& tabeller</a> </li>
																								</ul> <a href=#
																								class="c-header__menu__arrow js-menu-accordion"
																								aria-label="Toggle menu"
																								role=button> </a> </li>
																<li class="c-header__menu__item has-dropdown"
																	id=top-department-kultur> <a
																		href=https://www.gp.se/kultur
																		class=c-header__menu__link>Kultur</a>
																	<ul class=c-header__submenu
																		id=sub-department-kultur>
																		<li> <a href=https://www.gp.se/kultur/konsertsommaren>Konsertsommaren
																				</a> </li> <li> <a
																					href=https://www.gp.se/kultur/musik>Musik
																					</a> </li> <li> <a
																						href=https://www.gp.se/kultur/film-tv>Film/TV
																						</a> </li> <li> <a
																							href=https://www.gp.se/kultur/litteratur>Litteratur
																							</a> </li> <li> <a
																								href=https://www.gp.se/livsstil/tv%C3%A5-dagar>Två
																								Dagar</a> </li> <li> <a
																									href=https://www.gp.se/livsstil/v%C3%A4rldens-g%C3%A5ng>Världens
																									Gång</a> </li> <li>
																									<a href=https://www.gp.se/kultur/konst>Konst
																										</a> </li> <li>
																										<a href=https://www.gp.se/kultur/scen>Scen
																											</a> </li>
																											<li> <a
																												href=https://www.gp.se/kultur/mat-dryck>Mat
																												&
																												Dryck</a>
																												</li>
																												</ul> <a
																												href=#
																												class="c-header__menu__arrow js-menu-accordion"
																												aria-label="Toggle menu"
																												role=button>
																											</a> </li>
																		<li class=c-header__menu__item
																			id=top-department-ledare> <a
																				href=https://www.gp.se/ledare
																				class=c-header__menu__link>Ledare</a>
																		</li>
																		<li class="c-header__menu__item has-dropdown"
																			id=top-department-debatt> <a
																				href=https://www.gp.se/debatt
																				class=c-header__menu__link>Debatt</a>
																			<ul class=c-header__submenu
																				id=sub-department-debatt>
																				<li> <a href=https://www.gp.se/debatt/fria-ord>Fria
																						ord</a> </li> </ul> <a href=#
																						class="c-header__menu__arrow js-menu-accordion"
																						aria-label="Toggle menu"
																						role=button> </a> </li>
																				<li class=c-header__menu__item
																					id=top-department-val> <a
																						href=https://www.gp.se/val-2022
																						class=c-header__menu__link>Val
																						2022</a> </li>
																				<li class=c-header__menu__item
																					id=top-department-a-z
																					aria-hidden=true> <a href=#
																						class="c-header__menu__arrow js-menu-accordion"
																						aria-label="Toggle menu"
																						role=button> </a>
																					<ul
																						class="c-header__submenu c-header__submenu--sitemap">
																						<li>
																							<h4>0</h4> <a
																								href=https://www.gp.se/sport/031-fotboll>031
																								fotboll</a> <a
																								href=https://www.gp.se/sport/031-hockey>031
																								hockey</a> </li> <li>
																								<h4>A</h4> <a
																									href=https://foretag.stampenmedia.se/titlar/goteborgsposten/>Annonsera
																									företag</a> <a
																									href=https://info.gp.se/annonsera-privat/>Annonsera
																									privat</a> </li>
																									<li>
																									<h4>B</h4> <a
																										href=https://www.gp.se/korsord/bildkryss>bildkryss
																										</a> <a
																										href=https://www.gp.se/livsstil/bostad>Bostad
																										</a> </li> <li>
																										<h4>D</h4> <a
																											href=https://www.gp.se/debatt>Debatt
																											</a> </li>
																											<li>
																											<h4>E</h4>
																											<a href=https://etidning.gp.se/>eGP
																												</a> <a
																												href=https://www.gp.se/ekonomi>Ekonomi
																												</a> <a
																												href=http://info.gp.se/goteborgs-postens-etiska-regler/>Etiska
																												regler</a>
																												</li>
																												<li>
																												<h4>F
																												</h4> <a
																													href=http://www.gp.se/familjeannonser>Familjeannonser
																													</a>
																													<a
																													href=https://www.gp.se/kultur/film-tv>Film/TV
																													</a>
																													<a
																													href=https://www.gp.se/sport/fotboll>Fotboll
																													</a>
																													<a
																													href=https://www.gp.se/debatt/fria-ord>Fria
																													ord</a>
																													</li>
																													<li>
																													<h4>G
																													</h4>
																													<a href=https://www.gp.se/nyheter/gp-granskar>GP
																														granskar</a>
																														<a
																														href=http://www.gp.se/live>GP
																														Live</a>
																														<a
																														href=https://www.gp.se/kultur/guiden>Guiden
																														</a>
																														<a
																														href=https://www.gp.se/nyheter/g%C3%B6teborg>Göteborg
																														</a>
																														</li>
																														<li>
																														<h4>H
																														</h4>
																														<a href=https://www.gp.se/sport/handboll>Handboll
																															</a>
																															<a
																															href=https://www.gp.se/livsstil/h%C3%A4lsa>Hälsa
																															</a>
																															</li>
																															<li>
																															<h4>I
																															</h4>
																															<a href=https://www.gp.se/sport/ishockey>Ishockey
																																</a>
																																</li>
																																<li>
																																<h4>J
																																</h4>
																																<a href=http://jobb.gp.se>Jobb
																																	</a>
																																	</li>
																																	<li>
																																	<h4>K
																																	</h4>
																																	<a href=https://www.gp.se/kultur/konsertsommaren>Konsertsommaren
																																		</a>
																																		<a
																																		href=https://www.gp.se/kultur/konst>Konst
																																		</a>
																																		<a
																																		href=https://www.gp.se/livsstil/konsument>Konsument
																																		</a>
																																		<a
																																		href=https://www.gp.se/korsord>Korsord
																																		</a>
																																		<a
																																		href=https://www.gp.se/kultur>Kultur
																																		</a>
																																		<a
																																		href=http://info.gp.se/kundservice/>Kundservice
																																		</a>
																																		<a
																																		href="http://gp.lokus.se/?counties=19">Köp-
																																		och
																																		säljannonser</a>
																						</li>
																						<li>
																							<h4>L</h4> <a
																								href=https://www.gp.se/ekonomi/lagfarter>Lagfarter
																								</a> <a
																								href=https://www.gp.se/ledare>Ledare
																								</a> <a
																								href="https://system.webday.se/SLM/rekrytera/cgi-shl/User_Applicants.exe?districtId=1">Lediga
																								tjänster</a> <a
																								href=https://www.gp.se/kultur/litteratur>Litteratur
																								</a> <a
																								href=https://www.gp.se/livsstil>Livsstil
																								</a> <a
																								href=https://www.gp.se/nyheter/lyssna-p%C3%A5-gp>Lyssna
																								på GP </a> </li> <li>
																								<h4>M</h4> <a
																									href=https://www.gp.se/kultur/mat-dryck>Mat
																									& Dryck</a> <a
																									href="https://medlem.gp.se/?utm_source=gp&utm_medium=ao&utm_campaign=minaerbjudanden">Mina
																									erbjudanden</a> <a
																									href=https://www.gp.se/mina-sidor/>Mitt
																									konto</a> <a
																									href=https://www.gp.se/kultur/musik>Musik
																									</a> <a
																									href=https://www.gp.se/sport/m%C3%A5lservice>Målservice
																									</a> </li> <li>
																									<h4>N</h4> <a
																										href=http://www.gp.se/om/Namnporträtt>Namnporträtt
																										</a> <a
																										href=https://www.gp.se/nyheter>Nyheter
																										</a> <a
																										href=https://www.gp.se/nyhetsbrev>Nyhetsbrev
																										</a> </li> <li>
																										<h4>P</h4> <a
																											href=https://www.gp.se/nyheter/lyssna-p%C3%A5-gp>Podcast
																											</a> </li>
																											<li>
																											<h4>R</h4>
																											<a href=http://www.gp.se/kultur/mat-dryck>Restauranger
																												</a> <a
																												href=https://www.gp.se/sport/resultat-tabeller>Resultat
																												&
																												tabeller</a>
																												</li>
																												<li>
																												<h4>S
																												</h4> <a
																													href=https://www.gp.se/kultur/scen>Scen
																													</a>
																													<a
																													href=https://www.gp.se/sport>Sport
																													</a>
																													<a
																													href=https://www.gp.se/nyheter/storg%C3%B6teborg>Storgöteborg
																													</a>
																													<a
																													href=https://www.gp.se/nyheter/sverige>Sverige
																													</a>
																													<a
																													href=https://www.gp.se/systrar>Systrar
																													</a>
																													</li>
																													<li>
																													<h4>T
																													</h4>
																													<a href=http://www.gp.se/nyheter/tipsa-oss>Tipsa
																														oss</a>
																														<a
																														href=https://www.gp.se/livsstil/tv%C3%A5-dagar>Två
																														Dagar</a>
																														</li>
																														<li>
																														<h4>U
																														</h4>
																														<a href=http://www.gp.se/kultur/mat-dryck>Uteätarna
																															</a>
																															</li>
																															<li>
																															<h4>V
																															</h4>
																															<a href=https://www.gp.se/val-2022>Val
																																2022</a>
																																<a
																																href=https://www.gp.se/video>Video
																																</a>
																																<a
																																href=https://www.gp.se/nyheter/v%C3%A4rlden>Världen
																																</a>
																																<a
																																href=https://www.gp.se/livsstil/v%C3%A4rldens-g%C3%A5ng>Världens
																																Gång</a>
																																<a
																																href=https://www.gp.se/nyheter/v%C3%A4stsverige>Västsverige
																																</a>
																																</li>
																																</ul>
																																</li>
																																<li
																																class="c-header__menu__item is-service-link is-hidden-on-logout"
																																aria-hidden=true>
																																<a href=https://www.gp.se/mina-sidor/prenumeration
																																	class=c-header__menu__link>
																																	Mitt
																																	GP
																																</a>
																						</li>
																						<li class="c-header__menu__item is-service-link"
																							aria-hidden=true> <a
																								href=https://info.gp.se/kundservice/
																								title=Kundservice
																								class=c-header__menu__link>
																								Kundservice </a> </li>
																						<li
																							class="c-header__menu__item is-service-link is-tipsa">
																							<a href=https://www.gp.se/nyheter/tipsa-oss
																								title="Tipsa oss"
																								class=c-header__menu__link>
																								Tipsa oss </a> </li>
																					</ul>
						</nav>
					</div>
				</header>
			</div>
			<script>
				const navBtn=document.getElementById("navBtn");navBtn.addEventListener("click",function(){})
			</script>
			<script>
				function openBurger(){document.querySelector(".voc-header-nav.hamburger").classList.toggle("is-active"),document.querySelector(".voc-container-button-menu-header").classList.toggle("is_active"),document.querySelector(".voc-main-menu.voc-main-menu-onplus").classList.toggle("is_active")}document.querySelector(".voc-header-nav.hamburger").addEventListener("click",openBurger);var first=document.querySelectorAll(".voc-icons.downArrow")[0],listOne=document.querySelectorAll('.collapse:not([id*="linkmainsubmenu01"]'),listTry=document.querySelectorAll(".voc-icons.downArrow:not(collapsed)"),firstList=document.querySelector("#linkmainsubmenu01");function openOne(){first.classList.toggle("collapsed"),firstList.classList.toggle("in"),listOne.forEach(t=>{t.classList.contains("in")&&t.classList.remove("in")}),listTry.forEach(t=>{t.getAttribute("aria-expanded","true")&&t.setAttribute("aria-expanded","false")}),firstList.classList.contains("in")?(firstList.setAttribute("aria-expanded","true"),first.setAttribute("aria-expanded","true")):(firstList.setAttribute("aria-expanded","false"),first.setAttribute("aria-expanded","false")),"0px"===firstList.style.height||firstList.classList.contains("in")?firstList.style.height="":firstList.style.height="0px"}first.setAttribute("aria-expanded","false"),firstList.setAttribute("aria-expanded","false"),first.addEventListener("click",openOne);var second=document.querySelectorAll(".voc-icons.downArrow")[1],secondList=document.querySelector("#linkmainsubmenu02"),listTwo=document.querySelectorAll('.collapse:not([id*="linkmainsubmenu02"]'),listTryTwo=document.querySelectorAll(".voc-icons.downArrow:not(collapsed)");function openTwo(){second.classList.toggle("collapsed"),secondList.classList.toggle("in"),listTwo.forEach(t=>{t.classList.contains("in")&&t.classList.remove("in")}),listTryTwo.forEach(t=>{t.getAttribute("aria-expanded","true")&&t.setAttribute("aria-expanded","false")}),secondList.classList.contains("in")?(secondList.setAttribute("aria-expanded","true"),second.setAttribute("aria-expanded","true")):(secondList.setAttribute("aria-expanded","false"),second.setAttribute("aria-expanded","false")),"0px"===secondList.style.height||secondList.classList.contains("in")?secondList.style.height="":secondList.style.height="0px"}second.setAttribute("aria-expanded","false"),secondList.setAttribute("aria-expanded","false"),second.addEventListener("click",openTwo);var third=document.querySelectorAll(".voc-icons.downArrow")[2],thirdList=document.querySelector("#linkmainsubmenu03"),listThree=document.querySelectorAll('.collapse:not([id*="linkmainsubmenu03"]'),listTryThree=document.querySelectorAll(".voc-icons.downArrow:not(collapsed)");function openThree(){third.classList.toggle("collapsed"),thirdList.classList.toggle("in"),listThree.forEach(t=>{t.classList.contains("in")&&t.classList.remove("in")}),listTryThree.forEach(t=>{t.getAttribute("aria-expanded","true")&&t.setAttribute("aria-expanded","false")}),thirdList.classList.contains("in")?(thirdList.setAttribute("aria-expanded","true"),third.setAttribute("aria-expanded","true")):(thirdList.setAttribute("aria-expanded","false"),third.setAttribute("aria-expanded","false")),"0px"===thirdList.style.height||thirdList.classList.contains("in")?thirdList.style.height="":thirdList.style.height="0px"}third.setAttribute("aria-expanded","false"),thirdList.setAttribute("aria-expanded","false"),third.addEventListener("click",openThree);var fourth=document.querySelectorAll(".voc-icons.downArrow")[3],fourthList=document.querySelector("#linkmainsubmenu04"),listFour=document.querySelectorAll('.collapse:not([id*="linkmainsubmenu04"]'),listTryFour=document.querySelectorAll(".voc-icons.downArrow:not(collapsed)");function openFour(){fourth.classList.toggle("collapsed"),fourthList.classList.toggle("in"),listFour.forEach(t=>{t.classList.contains("in")&&t.classList.remove("in")}),listTryFour.forEach(t=>{t.getAttribute("aria-expanded","true")&&t.setAttribute("aria-expanded","false")}),fourthList.classList.contains("in")?(fourthList.setAttribute("aria-expanded","true"),fourth.setAttribute("aria-expanded","true")):(fourthList.setAttribute("aria-expanded","false"),fourth.setAttribute("aria-expanded","false")),"0px"===fourthList.style.height||fourthList.classList.contains("in")?fourthList.style.height="":fourthList.style.height="0px"}fourth.setAttribute("aria-expanded","false"),fourthList.setAttribute("aria-expanded","false"),fourth.addEventListener("click",openFour);var fifth=document.querySelectorAll(".voc-icons.downArrow")[4],fifthList=document.querySelector("#linkmainsubmenu05"),listFive=document.querySelectorAll('.collapse:not([id*="linkmainsubmenu05"]'),listTryFive=document.querySelectorAll(".voc-icons.downArrow:not(collapsed)");function openFive(){fifth.classList.toggle("collapsed"),fifthList.classList.toggle("in"),listFive.forEach(t=>{t.classList.contains("in")&&t.classList.remove("in")}),listTryFive.forEach(t=>{t.getAttribute("aria-expanded","true")&&t.setAttribute("aria-expanded","false")}),fifthList.classList.contains("in")?(fifthList.setAttribute("aria-expanded","true"),fifth.setAttribute("aria-expanded","true")):(fifthList.setAttribute("aria-expanded","false"),fifth.setAttribute("aria-expanded","false")),"0px"===fifthList.style.height||fifthList.classList.contains("in")?fifthList.style.height="":fifthList.style.height="0px"}function closeBurger(){document.querySelector(".voc-header-nav.hamburger").classList.toggle("is-active"),document.querySelector(".voc-container-button-menu-header").classList.toggle("is_active"),document.querySelector(".voc-main-menu.voc-main-menu-onplus").classList.toggle("is_active")}fifth.setAttribute("aria-expanded","false"),fifthList.setAttribute("aria-expanded","false"),fifth.addEventListener("click",openFive),document.querySelector(".voc-close-burguer-mobile-onplus").addEventListener("click",closeBurger)
			</script>
	</div>
	<div id="__next">
		<style data-emotion="gsg-global s1ccm8">
			html {
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				box-sizing: border-box;
				-webkit-text-size-adjust: 100%;
			}

			*,
			*::before,
			*::after {
				box-sizing: inherit;
			}

			strong,
			b {
				font-weight: 700;
			}

			body {
				margin: 0;
				color: #1F2225;
				font-family: "Gothia Serif", sans-serif;
				font-size: 16px;
				font-weight: 400;
				letter-spacing: 0px;
				line-height: 24px;
				text-transform: none;
				background-color: #F1F2F3;
			}

			@media print {
				body {
					background-color: #FFFFFF;
				}
			}

			body::backdrop {
				background-color: #F1F2F3;
			}

			body {
				font-size: 14px;
				line-height: 20px;
				letter-spacing: 0px;
			}
		</style>
		<main><noscript data-testid="gtm-body-script"
				data-test-src="//www.googletagmanager.com/ns.html?id=GTM-P4ZJTLF"><iframe title="GTM Body Script"
					src="//www.googletagmanager.com/ns.html?id=GTM-P4ZJTLF" height="0" width="0"
					style="display:none;visibility:hidden"></iframe></noscript>
			<div class="_11aesl00">
				<header class="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root 
                        _11aesl01
                        
                        
                     MuiAppBar-colorPrimary _11aesl02 MuiAppBar-positionSticky gsg-bnaw88">
					<div class="desktopOnly">
						<div class="MuiToolbar-root MuiToolbar-dense _11aesl06 gsg-mjywep">
							<div data-testid="menu-item" class="
                        hveu0l1
                        
                    "><a href="https://rabattkod.gp.se/" class=" xi0mv8f xi0mv8q xi0mv8o" data-testid="main-menu-item"
									data-internal="true">Hem</a></div>
							<div data-testid="menu-item" class="
                        hveu0l1
                        
                    ">
								<div data-testid="menu-dropdown" aria-controls="menu-1" aria-haspopup="true"
									role="button" tabindex="0"
									class="wpyze0i wpyze0l wpyze0o wpyze0q wpyze0r wpyze0u wpyze012 wpyze0h _1y2a2md0">
									Alla
									butiker<span class="wpyze02"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium gsg-rsaxgi" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreOutlinedIcon"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg></span>
								</div>
							</div>
							<div data-testid="menu-item" class="
                        hveu0l1
                        
                    "><a href="https://rabattkod.gp.se/topp20" class=" xi0mv8f xi0mv8q xi0mv8o"
									data-testid="main-menu-item" data-internal="true">Topp 20</a></div>
							<div class="hveu0l0"></div>
							<div data-testid="desktopMenu-search" style="flex:1 1 100%;max-width:200px"></div>
						</div>
					</div>
					<div class="noDesktop">
						<div
							class="MuiToolbar-root MuiToolbar-gutters _11aesl0a MuiToolbar-dense _11aesl06 gsg-1hyj3zf">
							<div data-testid="mobileMenu-drawer" aria-haspopup="true" role="button" tabindex="0"
								class="wpyze0i wpyze0l wpyze0o wpyze0q wpyze0r wpyze0u wpyze012 wpyze0h _11aesl08">
								Meny<span class="wpyze02"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium gsg-rsaxgi" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreOutlinedIcon"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg></span>
							</div>
							<div class="_11aesl07"></div>
							<button type="button" data-testid="mobileMenu-search" aria-label="search" class="_16y77hr0 _16y77hr4 _16y77hr7 _11aesl09"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium gsg-rsaxgi" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchOutlinedIcon"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
						</div>
					</div>
				</header>
			</div>
			<div class="_11dia2y0 " data-testid="disclaimer">
				<div class="_11dia2y2"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium _11dia2y3 gsg-rsaxgi"
						focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoOutlinedIcon"
						type="Sharp">
						<path
							d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z">
						</path>
					</svg>
					<p class="_11dia2y4">Alla erbjudanden på denna sida är annonser</p>
				</div>
			</div>
			<div>
				<div data-testid="header-section-widgets" class="ns4s16a">
					<div data-testid="header-header-1" class="_1rfgee60 ">
						<div class="b9fnlj0 b9fnlj4 b9fnlj1 b9fnlj6">
							<div class="b9fnlj7 b9fnlja b9fnlj9">
								<div class="b9fnljp b9fnljr">
									<h1 class="b9fnljs b9fnljt b9fnlju">Spara med en NLY MAN rabattkod hos GP
										Rabattkoder</h1><button type="button" class="b9fnljc b9fnljg b9fnlje b9fnlji undefined"><div class="njlxh80 njlxh82 njlxh83 b9fnljl"><div class="b9fnljm b9fnljo"><div class="lvacvc5"><div class="lvacvc7"><img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="224" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div><img alt="NLY MAN rabattkod" data-testid="logo" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png" height="224" width="224" decoding="async" data-nimg="raw" class="
         
        lvacvc0 
        lvacvc1 
        undefined
        lvacvcb" style="aspect-ratio:224 / 224"/></div></div></div></button>
								</div>
								<div class="b9fnljz b9fnlj10">
									<h2 class="b9fnljx b9fnlj12">Här hittar du alla aktiva &amp; giltiga NLY MAN
										kuponger under 2022</h2>
								</div>
							</div>
							<div id="logoWrapper" class="b9fnljj"><button type="button" class="b9fnljc b9fnljg b9fnlje b9fnljh undefined"><div class="njlxh80 njlxh82 njlxh83 b9fnljl"><div class="b9fnljm b9fnljo"><div class="lvacvc5"><div class="lvacvc7"><img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="74" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div><img alt="NLY MAN rabattkod" data-testid="logo" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/224x/images/n/NLYMAN.png" height="74" width="224" decoding="async" data-nimg="raw" class="
         
        lvacvc0 
        lvacvc1 
        undefined
        lvacvcb" style="aspect-ratio:224 / 74"/></div></div></div></button></div>
						</div>
					</div>
				</div>
				<div class="ns4s161 ns4s164">
					<div data-testid="main-section-widgets" class="ns4s16c">
						<div data-testid="active-vouchers-main-1" class="_1rfgee61 _1rfgee68">
							<div class="rgd4cw0">
								<div class="o02lbv0">
									<div class="o02lbv4">
										<ul data-testid="filters-wrapper" class="o02lbv5">
											<li data-testid="All" class="tncs2j0"><button type="button" class="
                        _1jtvtk50 _1jtvtk57 _1jtvtk51 _1jtvtk5c
                    ">Alla  (6)</button></li>
											<li data-testid="Codes" class="tncs2j0"><button type="button" class="
                        _1jtvtk50 _1jtvtk57 _1jtvtk52 _1jtvtk5b
                    ">Rabattkoder (1)</button></li>
											<li data-testid="Deals" class="tncs2j0"><button type="button" class="
                        _1jtvtk50 _1jtvtk57 _1jtvtk52 _1jtvtk5b
                    ">Erbjudanden (5)</button></li>
											<li data-testid="FreeDelivery" class="tncs2j0"><button type="button" class="
                        _1jtvtk50 _1jtvtk57 _1jtvtk52 _1jtvtk5b
                    ">Fri frakt (1)</button></li>
										</ul>
									</div>
								</div>
							</div>
							<div data-testid="active-vouchers-widget" class="_15mbvey0">
								<div class="_15mbvey5">
									<div class="_15mbvey1" data-attribute="0" data-id="se_613381" data-old-id="783731">
									</div>
									<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-783731 hasCaptions"
										data-attribute="0">
										<div class="_163biu93">
											<div class="tabletUp">
												<div style="--alpha-12-Background:rgba(31, 34, 37, 0.12)"
													data-testid="badge" class="_1dc1xib0 _1dc1xib3">
													<div class="_1dc1xib1">Bästa rabattkod</div>
													<div class="_1dc1xib4 _1dc1xib7" data-testid="badge-triangle"></div>
												</div>
											</div>
											<div class="mobileOnly">
												<div style="--alpha-12-Background:rgba(31, 34, 37, 0.12)"
													data-testid="badge" class="_1dc1xib0 _1dc1xib3">
													<div class="_1dc1xib1">Bästa rabattkod</div>
													<div class="_1dc1xib5 _1dc1xib7" data-testid="badge-triangle"></div>
												</div>
											</div>
										</div>
										<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
											<div class="_163biu92 tabletUpFlex">
												<div id="caption" class="_11se7ch0 "><span class="_1xj46po0">20%</span>
													<div class="_11se7ch1"><span class="_1xj46po3">Rabattkod</span>
													</div>
												</div>
												<img src="/api/label/gpse/primary/Rabattkod?small=false" alt="Rabattkod" style="width:calc(9ch + 24px);height:24px"/></div>
												<div class="_163biu94">
													<div class="_163biu95"></div>
												</div>
												<h3 class="_163biu99 couponShape">Bli medlem och få en 20% NLY MAN
													rabattkod</h3>
												<div class="_163biu9a _163biu9b"><img src="/api/label/gpse/primary/Rabattkod?small=true" alt="Rabattkod" style="width:calc(9ch + 8px);height:14px"/>
													<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
														<span class="_1uoxkl7b _1uoxkl7d">Verifierad</span></div>
												</div>
												<div class="_163biu9h  couponShape">
													<div role="button" tabindex="0">
														<div style="--verticalPadding:10px;--borderRadiusButton:10px"
															role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
															tabindex="0">ng<div class="_1fdk0lb3"></div>
															<div class="_6o5mg73 _1fdk0lb6">
																<div class="_1fdk0lb7"></div>
																<div class="_1fdk0lb8"></div>
															</div>
															<div class="_6o5mg73 _1fdk0lb5">
																<div class="_6o5mg70 _6o5mg72">
																	<div id="caption" class="_11se7ch0 mobileOnlyFlex">
																		<span class="_1xj46po2">20%</span>
																		<div class="_11se7ch1">
																			<span class="_1xj46po3">Rabattkod</span>
																		</div>
																	</div>
																</div>
																<div class="_6o5mg71">
																	<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																		class="">Visa rabattkod</div>
																</div>
															</div>
														</div>
													</div>
													<div class="_1w5fcfx0 _163biu9c">
														<div>Utgångsdatum
															<!-- -->:</div>
														<div> 
															<!-- -->20 februari</div>
													</div>
												</div>
												<div class="_1w5fcfx0 _163biu9d couponShape">
													<div>Utgångsdatum
														<!-- -->:</div>
													<div> 
														<!-- -->20 februari</div>
												</div>
											</div>
										</div>
									</div>
									<div class="_15mbvey5">
										<div class="_15mbvey1" data-attribute="1" data-id="se_609971"
											data-old-id="779503"></div>
										<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-779503 hasCaptions"
											data-attribute="1">
											<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
												<div class="_163biu92 tabletUpFlex">
													<div id="caption" class="_11se7ch0 ">
														<span class="_1xj46po0">Fri</span>
														<div class="_11se7ch1"><span class="_1xj46po2">Frakt</span>
														</div>
													</div>
												</div>
												<div class="_163biu94">
													<div class="_163biu95"></div>
												</div>
												<h3 class="_163biu99 couponShape">Få fri frakt på ditt köp hos NLY MAN
												</h3>
												<div class="_163biu9a _163biu9b">
													<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 "><svg
															class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall _1uoxkl7u gsg-4oomy7"
															focusable="false" aria-hidden="true" viewBox="0 0 24 24"
															data-testid="StarOutlinedIcon">
															<path
																d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z">
															</path>
														</svg><span class="_1uoxkl7b _1uoxkl7e">Gratis frakt</span>
													</div>
												</div>
												<div class="_163biu9h  couponShape">
													<div role="button" tabindex="0">
														<div role="button" tabindex="0"
															class="wpyze0i wpyze0k wpyze0m wpyze0q wpyze0s wpyze0t wpyze014 wpyze08 _6o5mg73">
															<div class="_6o5mg70 _6o5mg72">
																<div id="caption" class="_11se7ch0 mobileOnlyFlex">
																	<span class="_1xj46po2">Fri</span>
																	<div class="_11se7ch1">
																		<span class="_1xj46po3">Frakt</span></div>
																</div>
															</div>
															<div class="_6o5mg71">
																<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																	class="">Visa rabatt</div>
															</div> ​
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="_15mbvey5">
										<div class="_15mbvey1" data-attribute="1" data-id="se_614977"
											data-old-id="785768"></div>
										<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-785768 hasCaptions"
											data-attribute="1">
											<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
												<div class="_163biu92 tabletUpFlex">
													<div id="caption" class="_11se7ch0 ">
														<span class="_1xj46po0">70%</span>
														<div class="_11se7ch1"><span class="_1xj46po2">Rabatt</span>
														</div>
													</div>
												</div>
												<div class="_163biu94">
													<div class="_163biu95"></div>
												</div>
												<h3 class="_163biu99 couponShape">mellandagsrea hos NLY MAN - spara upp
													till 70%</h3>
												<div class="_163biu9a _163biu9b"></div>
												<div class="_163biu9h  couponShape">
													<div role="button" tabindex="0">
														<div role="button" tabindex="0"
															class="wpyze0i wpyze0k wpyze0m wpyze0q wpyze0s wpyze0t wpyze014 wpyze08 _6o5mg73">
															<div class="_6o5mg70 _6o5mg72">
																<div id="caption" class="_11se7ch0 mobileOnlyFlex">
																	<span class="_1xj46po2">70%</span>
																	<div class="_11se7ch1">
																		<span class="_1xj46po3">Rabatt</span></div>
																</div>
															</div>
															<div class="_6o5mg71">
																<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																	class="">Visa rabatt</div>
															</div> ​
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="_15mbvey5">
										<div class="_15mbvey1" data-attribute="1" data-id="se_613844"
											data-old-id="784324"></div>
										<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-784324 hasCaptions"
											data-attribute="1">
											<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
												<div class="_163biu92 tabletUpFlex">
													<div id="caption" class="_11se7ch0 ">
														<span class="_1xj46po0">20%</span>
														<div class="_11se7ch1"><span class="_1xj46po2">Rabatt</span>
														</div>
													</div>
												</div>
												<div class="_163biu94">
													<div class="_163biu95"></div>
												</div>
												<h3 class="_163biu99 couponShape">Spara 20% på utvalda T-shirts och
													tröjor hos NLY MAN</h3>
												<div class="_163biu9a _163biu9b">
													<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
														<span class="_1uoxkl7b _1uoxkl7d">Utgår snart</span></div>
												</div>
												<div class="_163biu9h  couponShape">
													<div role="button" tabindex="0">
														<div role="button" tabindex="0"
															class="wpyze0i wpyze0k wpyze0m wpyze0q wpyze0s wpyze0t wpyze014 wpyze08 _6o5mg73">
															<div class="_6o5mg70 _6o5mg72">
																<div id="caption" class="_11se7ch0 mobileOnlyFlex">
																	<span class="_1xj46po2">20%</span>
																	<div class="_11se7ch1">
																		<span class="_1xj46po3">Rabatt</span></div>
																</div>
															</div>
															<div class="_6o5mg71">
																<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																	class="">Visa rabatt</div>
															</div> ​
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="_15mbvey2"></div>
									<div></div>
									<div class="_15mbvey5">
										<div class="_15mbvey1" data-attribute="1" data-id="se_610701"
											data-old-id="780397"></div>
										<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-780397 hasCaptions"
											data-attribute="1">
											<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
												<div class="_163biu92 tabletUpFlex">
													<div id="caption" class="_11se7ch0 ">
														<span class="_1xj46po0">Från</span>
														<div class="_11se7ch1"><span class="_1xj46po2">299 kr</span>
														</div>
													</div>
												</div>
												<div class="_163biu94">
													<div class="_163biu95"></div>
												</div>
												<h3 class="_163biu99 couponShape">Shoppa somriga linnekläder från 299 kr
													hos NLY MAN</h3>
												<div class="_163biu9a _163biu9b"></div>
												<div class="_163biu9h  couponShape">
													<div role="button" tabindex="0">
														<div role="button" tabindex="0"
															class="wpyze0i wpyze0k wpyze0m wpyze0q wpyze0s wpyze0t wpyze014 wpyze08 _6o5mg73">
															<div class="_6o5mg70 _6o5mg72">
																<div id="caption" class="_11se7ch0 mobileOnlyFlex">
																	<span class="_1xj46po2">Från</span>
																	<div class="_11se7ch1">
																		<span class="_1xj46po3">299 kr</span></div>
																</div>
															</div>
															<div class="_6o5mg71">
																<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																	class="">Visa rabatt</div>
															</div> ​
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="_15mbvey5">
										<div class="_15mbvey1" data-attribute="1" data-id="se_610572"
											data-old-id="780232"></div>
										<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-780232 hasCaptions"
											data-attribute="1">
											<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
												<div class="_163biu92 tabletUpFlex">
													<div id="caption" class="_11se7ch0 ">
														<span class="_1xj46po0">60%</span>
														<div class="_11se7ch1"><span class="_1xj46po2">Rabatt</span>
														</div>
													</div>
												</div>
												<div class="_163biu94">
													<div class="_163biu95"></div>
												</div>
												<h3 class="_163biu99 couponShape">Spara mellan 30-60% på utvalda
													märkeskepsar från Gant, Parajumpers, New era</h3>
												<div class="_163biu9a _163biu9b"></div>
												<div class="_163biu9h  couponShape">
													<div role="button" tabindex="0">
														<div role="button" tabindex="0"
															class="wpyze0i wpyze0k wpyze0m wpyze0q wpyze0s wpyze0t wpyze014 wpyze08 _6o5mg73">
															<div class="_6o5mg70 _6o5mg72">
																<div id="caption" class="_11se7ch0 mobileOnlyFlex">
																	<span class="_1xj46po2">60%</span>
																	<div class="_11se7ch1">
																		<span class="_1xj46po3">Rabatt</span></div>
																</div>
															</div>
															<div class="_6o5mg71">
																<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																	class="">Visa rabatt</div>
															</div> ​
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div data-testid="expired-vouchers-main-1" class="_1rfgee61 _1rfgee68">
								<div class="qxubyt0">
									<h2 class="
         
        _1sromm80 
        _1sromm84 
        qxubyt1 
        ">Utgångna NLY MAN rabattkoder</h2>
									<div class="qxubyt2">
										<div data-id="se_609970" data-old-id="779502" data-attribute="0"></div>
										<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-779502 expired hasCaptions"
											data-attribute="0">
											<div style="--containerWidth-ctaWidth:184px" class="_163biu91 flexButton">
												<div class="_163biu92 tabletUpFlex">
													<div id="caption" class="_11se7ch0 ">
														<span class="_1xj46po0">20%</span>
														<div class="_11se7ch1"><span class="_1xj46po3">Rabattkod</span>
														</div>
													</div>
													<img src="/api/label/gpse/primary/Rabattkod?small=false" alt="Rabattkod" style="width:calc(9ch + 24px);height:24px"/></div>
													<div class="_163biu94">
														<div class="_163biu95"></div>
													</div>
													<h3 class="_163biu99 couponShape">Bli medlem och spara 20% på ditt
														första köp med en NLY MAN rabattkod</h3>
													<div class="_163biu9a _163biu9b"><img src="/api/label/gpse/primary/Rabattkod?small=true" alt="Rabattkod" style="width:calc(9ch + 8px);height:14px"/>
														<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
															<span class="_1uoxkl7b _1uoxkl7d">Verifierad</span></div>
													</div>
													<div class="_163biu9h  couponShape">
														<div role="button" tabindex="0">
															<div style="--verticalPadding:10px;--borderRadiusButton:10px"
																role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
																tabindex="0">ng<div class="_1fdk0lb3"></div>
																<div class="_6o5mg73 _1fdk0lb6">
																	<div class="_1fdk0lb7"></div>
																	<div class="_1fdk0lb8"></div>
																</div>
																<div class="_6o5mg73 _1fdk0lb5">
																	<div class="_6o5mg70 _6o5mg72">
																		<div id="caption"
																			class="_11se7ch0 mobileOnlyFlex">
																			<span class="_1xj46po2">20%</span>
																			<div class="_11se7ch1">
																				<span class="_1xj46po3">Rabattkod</span>
																			</div>
																		</div>
																	</div>
																	<div class="_6o5mg71">
																		<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																			class="">Visa rabattkod</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="_1w5fcfx0 _163biu9c">
															<div>Utgångsdatum
																<!-- -->:</div>
															<div> 
																<!-- -->22 augusti</div>
														</div>
													</div>
													<div class="_1w5fcfx0 _163biu9d couponShape">
														<div>Utgångsdatum
															<!-- -->:</div>
														<div> 
															<!-- -->22 augusti</div>
													</div>
												</div>
											</div>
										</div>
										<div class="qxubyt2">
											<div data-id="se_611827" data-old-id="781788" data-attribute="0"></div>
											<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-781788 expired hasCaptions"
												data-attribute="0">
												<div style="--containerWidth-ctaWidth:184px"
													class="_163biu91 flexButton">
													<div class="_163biu92 tabletUpFlex">
														<div id="caption" class="_11se7ch0 ">
															<span class="_1xj46po0">20%</span>
															<div class="_11se7ch1">
																<span class="_1xj46po3">Rabattkod</span></div>
														</div>
														<img src="/api/label/gpse/primary/Rabattkod?small=false" alt="Rabattkod" style="width:calc(9ch + 24px);height:24px"/></div>
														<div class="_163biu94">
															<div class="_163biu95"></div>
														</div>
														<h3 class="_163biu99 couponShape">NLY MAN rabattkod ger dig 20%
															rabatt på bästsäljare - passa på!</h3>
														<div class="_163biu9a _163biu9b"><img src="/api/label/gpse/primary/Rabattkod?small=true" alt="Rabattkod" style="width:calc(9ch + 8px);height:14px"/>
															<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
																<span class="_1uoxkl7b _1uoxkl7d">Verifierad</span>
															</div>
														</div>
														<div class="_163biu9h  couponShape">
															<div role="button" tabindex="0">
																<div style="--verticalPadding:10px;--borderRadiusButton:10px"
																	role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
																	tabindex="0">20<div class="_1fdk0lb3"></div>
																	<div class="_6o5mg73 _1fdk0lb6">
																		<div class="_1fdk0lb7"></div>
																		<div class="_1fdk0lb8"></div>
																	</div>
																	<div class="_6o5mg73 _1fdk0lb5">
																		<div class="_6o5mg70 _6o5mg72">
																			<div id="caption"
																				class="_11se7ch0 mobileOnlyFlex">
																				<span class="_1xj46po2">20%</span>
																				<div class="_11se7ch1">
																					<span class="_1xj46po3">Rabattkod</span>
																				</div>
																			</div>
																		</div>
																		<div class="_6o5mg71">
																			<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																				class="">Visa rabattkod</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="_1w5fcfx0 _163biu9c">
																<div>Utgångsdatum
																	<!-- -->:</div>
																<div> 
																	<!-- -->7 augusti</div>
															</div>
														</div>
														<div class="_1w5fcfx0 _163biu9d couponShape">
															<div>Utgångsdatum
																<!-- -->:</div>
															<div> 
																<!-- -->7 augusti</div>
														</div>
													</div>
												</div>
											</div>
											<div class="qxubyt2">
												<div data-id="se_609969" data-old-id="779501" data-attribute="1"></div>
												<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-779501 expired hasCaptions"
													data-attribute="1">
													<div style="--containerWidth-ctaWidth:184px"
														class="_163biu91 flexButton">
														<div class="_163biu92 tabletUpFlex">
															<div id="caption" class="_11se7ch0 ">
																<span class="_1xj46po0">70%</span>
																<div class="_11se7ch1">
																	<span class="_1xj46po2">Rabatt</span></div>
															</div>
														</div>
														<div class="_163biu94">
															<div class="_163biu95"></div>
														</div>
														<h3 class="_163biu99 couponShape">Sommarrea hos NLY MAN - spara
															upp till 70% på tusentals plagg</h3>
														<div class="_163biu9a _163biu9b"></div>
														<div class="_163biu9h  couponShape">
															<div role="button" tabindex="0">
																<div role="button" tabindex="0"
																	class="wpyze0i wpyze0k wpyze0m wpyze0q wpyze0s wpyze0t wpyze014 wpyze08 _6o5mg73">
																	<div class="_6o5mg70 _6o5mg72">
																		<div id="caption"
																			class="_11se7ch0 mobileOnlyFlex">
																			<span class="_1xj46po2">70%</span>
																			<div class="_11se7ch1">
																				<span class="_1xj46po3">Rabatt</span>
																			</div>
																		</div>
																	</div>
																	<div class="_6o5mg71">
																		<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																			class="">Visa rabatt</div>
																	</div> ​
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="njlxh80 njlxh82 njlxh83 _1rfgee61 _1rfgee66 _1rfgee67"
										data-testid="faq-widget-main-1">
										<h2 class="
         
        _1sromm80 
        _1sromm84 
        _1u1c8ki0 
        ">Andra frågar också</h2>
										<div class="njlxh80 njlxh82 njlxh86 ">
											<div class="_1rj4gf41 _1rj4gf43 _1u1c8ki1">
												<div tabindex="0" aria-expanded="false"
													aria-controls="content0.3399806500499414" role="button"
													class="_1rj4gf44 _1rj4gf40 _1rj4gf45">
													<div class="_1rj4gf47">
														<h3 class="
         
        _1sromm80 
        _1sromm86 
         
        ">Finns det NLY MAN studentrabatt?</h3>
													</div>
													<div class="_1rj4gf48"><svg
															class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium _1rj4gf49 _1rj4gf40 gsg-rsaxgi"
															focusable="false" aria-hidden="true" viewBox="0 0 24 24"
															data-testid="ExpandMoreOutlinedIcon">
															<path
																d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z">
															</path>
														</svg></div>
												</div>
												<div id="content0.3399806500499414" aria-expanded="false"
													aria-hidden="true" class="_1rj4gf4a">
													<div class="_1rj4gf4b">
														<div class="_12lk62r6">
															<div data-testid="rich-text-root"
																class="_12lk62r2 _12lk62r9 _12lk62r0">
																<p>Jajamensan! Du som student kan ta del av en NLY MAN
																	rabattkod som gör ditt köp 10% billigare. Du behöver
																	bara verifiera dig som student och handla genom ditt
																	studentkort.</p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="_1rj4gf41 _1rj4gf43 _1u1c8ki1">
												<div tabindex="0" aria-expanded="false"
													aria-controls="content0.5051974366592538" role="button"
													class="_1rj4gf44 _1rj4gf40 _1rj4gf45">
													<div class="_1rj4gf47">
														<h3 class="
         
        _1sromm80 
        _1sromm86 
         
        ">Har NLY MAN en storleksguide?</h3>
													</div>
													<div class="_1rj4gf48"><svg
															class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium _1rj4gf49 _1rj4gf40 gsg-rsaxgi"
															focusable="false" aria-hidden="true" viewBox="0 0 24 24"
															data-testid="ExpandMoreOutlinedIcon">
															<path
																d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z">
															</path>
														</svg></div>
												</div>
												<div id="content0.5051974366592538" aria-expanded="false"
													aria-hidden="true" class="_1rj4gf4a">
													<div class="_1rj4gf4b">
														<div class="_12lk62r6">
															<div data-testid="rich-text-root"
																class="_12lk62r2 _12lk62r9 _12lk62r0">
																<p>Det finns ingen storleksguide hos NLY MAN. Det står
																	dock info om hur lång modellen är vilken storlek han
																	bär, vilket brukar vara hjälpsamt!</p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="_1rj4gf41 _1rj4gf43 _1u1c8ki1">
												<div tabindex="0" aria-expanded="false"
													aria-controls="content0.905984067217326" role="button"
													class="_1rj4gf44 _1rj4gf40 _1rj4gf45">
													<div class="_1rj4gf47">
														<h3 class="
         
        _1sromm80 
        _1sromm86 
         
        ">Erbjuder NLY MAN rabatt för nya kunder?</h3>
													</div>
													<div class="_1rj4gf48"><svg
															class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium _1rj4gf49 _1rj4gf40 gsg-rsaxgi"
															focusable="false" aria-hidden="true" viewBox="0 0 24 24"
															data-testid="ExpandMoreOutlinedIcon">
															<path
																d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z">
															</path>
														</svg></div>
												</div>
												<div id="content0.905984067217326" aria-expanded="false"
													aria-hidden="true" class="_1rj4gf4a">
													<div class="_1rj4gf4b">
														<div class="_12lk62r6">
															<div data-testid="rich-text-root"
																class="_12lk62r2 _12lk62r9 _12lk62r0">
																<p>Ja, alla nya kunder får 20% rabatt på sitt första
																	köp. Denna får man tillgång till när man blir
																	medlem.</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<script type="application/ld+json">
											{"@context":"http://schema.org/","@type":"FAQPage","@id":"/faq","mainEntity":[{"@type":"Question","name":"Finns det NLY MAN studentrabatt?","acceptedAnswer":{"@type":"Answer","text":"<p>Jajamensan! Du som student kan ta del av en NLY MAN rabattkod som gör ditt köp 10% billigare. Du behöver bara verifiera dig som student och handla genom ditt studentkort.</p>"}},{"@type":"Question","name":"Har NLY MAN en storleksguide?","acceptedAnswer":{"@type":"Answer","text":"<p>Det finns ingen storleksguide hos NLY MAN. Det står dock info om hur lång modellen är vilken storlek han bär, vilket brukar vara hjälpsamt!</p>"}},{"@type":"Question","name":"Erbjuder NLY MAN rabatt för nya kunder?","acceptedAnswer":{"@type":"Answer","text":"<p>Ja, alla nya kunder får 20% rabatt på sitt första köp. Denna får man tillgång till när man blir medlem.</p>"}}]}
										</script>
									</div>
									<div class="njlxh80 njlxh82 njlxh83 _1rfgee61 _1rfgee66 _1rfgee67"
										data-testid="saving-tips-theme-a-c2-main-1">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm84 
        _10f10zi0 
        ">Spara ännu mer hos NLY MAN</h2>
											<div class="_10f10zi1 ">
												<div style="--tipBoxRootAlign:left"
													class="njlxh80 njlxh82 njlxh83 _11mj05z0 _11mj05z8"
													data-testid="tipbox">
													<div class="_11mj05z2" data-testid="logoContainer">
														<div class="lvacvc4" style="width:35px;height:35px"><img alt="Fri frakt och gratis retur" data-testid="icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="35" width="35" decoding="async" data-nimg="raw" class="
         
        lvacvc0 
         
        undefined
        " style="aspect-ratio:35 / 35"/><noscript><img alt="Fri frakt och gratis retur" data-testid="icon" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/48x/images/media/30/s/SavingTipsIcon_ThemeC2_Shipping.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/96x/images/media/30/s/SavingTipsIcon_ThemeC2_Shipping.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/96x/images/media/30/s/SavingTipsIcon_ThemeC2_Shipping.png" height="35" width="35" decoding="async" data-nimg="raw" style="aspect-ratio:35 / 35" class="
         
        lvacvc0 
         
        undefined
        " loading="lazy"/></noscript></div>
													</div>
													<div class="_11mj05z1" data-testid="tipcontent">
														<h3 class="
         
        _1sromm80 
        _1sromm85 
        _11mj05z3 
        ">Fri frakt och gratis retur</h3>
														<div class="_12lk62r6">
															<div data-testid="rich-text-root"
																class="_12lk62r2 _12lk62r9 _12lk62r0">Genom att beställa
																för mer än 399 kr garanterar du fri frakt på din order
																från NLY MAN. Du får dessutom gratis retur på ditt köp
																ifall något inte skulle passa eller du ångrat dig helt
																enkelt. </div>
														</div>
													</div>
												</div>
												<div style="--tipBoxRootAlign:left"
													class="njlxh80 njlxh82 njlxh83 _11mj05z0 _11mj05z8"
													data-testid="tipbox">
													<div class="_11mj05z2" data-testid="logoContainer">
														<div class="lvacvc4" style="width:35px;height:35px"><img alt="Följ NLY MAN på Instagram" data-testid="icon" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="35" width="35" decoding="async" data-nimg="raw" class="
         
        lvacvc0 
         
        undefined
        " style="aspect-ratio:35 / 35"/><noscript><img alt="Följ NLY MAN på Instagram" data-testid="icon" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/48x/images/media/30/s/SavingTipsIcon_ThemeC2_APP.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/96x/images/media/30/s/SavingTipsIcon_ThemeC2_APP.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/96x/images/media/30/s/SavingTipsIcon_ThemeC2_APP.png" height="35" width="35" decoding="async" data-nimg="raw" style="aspect-ratio:35 / 35" class="
         
        lvacvc0 
         
        undefined
        " loading="lazy"/></noscript></div>
													</div>
													<div class="_11mj05z1" data-testid="tipcontent">
														<h3 class="
         
        _1sromm80 
        _1sromm85 
        _11mj05z3 
        ">Följ NLY MAN på Instagram</h3>
														<div class="_12lk62r6">
															<div data-testid="rich-text-root"
																class="_12lk62r2 _12lk62r9 _12lk62r0">Håll koll på
																trender och nyheter genom att följa NLY MAN på
																Instagram. Förutom en massa inspiration på outfits får
																du också ta del av NLY MAN rabattkoder, kampanjer, när
																de släpper rean och utvalda erbjudanden som du bara inte
																vill missa.</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div data-testid="similar-vouchers-main-1" class="_1rfgee61 _1rfgee68">
										<div class="_1oghgt70">
											<h2 class="
         
        _1sromm80 
        _1sromm84 
        _1oghgt71 
        ">Rabattkoder till liknande butiker som NLY MAN</h2>
											<div data-id="se_605313" data-old-id="786258" class="_1oghgt72">
												<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-786258 hasLogo"
													data-attribute="0">
													<div style="--containerWidth-ctaWidth:184px"
														class="_163biu91 flexButton">
														<div class="_163biu98 mobileOnly">
															<div role="button" tabindex="0"><a href="/zalando-lounge"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:50px;height:50px">
																		<img alt="Zalando Lounge" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="50" width="50" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" style="aspect-ratio:50 / 50;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/25x/filters:blur(75)//images/l/Logo_Zalando-Lounge_06-08-2021.png&quot;);background-position:0% 0%"/><noscript><img alt="Zalando Lounge" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/64x//images/l/Logo_Zalando-Lounge_06-08-2021.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/128x//images/l/Logo_Zalando-Lounge_06-08-2021.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/128x//images/l/Logo_Zalando-Lounge_06-08-2021.png" height="50" width="50" decoding="async" data-nimg="raw" style="aspect-ratio:50 / 50" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu92 tabletUpFlex">
															<div id="caption" class="_11se7ch0 "></div>
															<div role="button" tabindex="0"><a href="/zalando-lounge"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:66px;height:66px">
																		<img alt="Zalando Lounge" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="66" width="66" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" style="aspect-ratio:66 / 66;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/33x/filters:blur(75)//images/l/Logo_Zalando-Lounge_06-08-2021.png&quot;);background-position:0% 0%"/><noscript><img alt="Zalando Lounge" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/l/Logo_Zalando-Lounge_06-08-2021.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/l/Logo_Zalando-Lounge_06-08-2021.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/l/Logo_Zalando-Lounge_06-08-2021.png" height="66" width="66" decoding="async" data-nimg="raw" style="aspect-ratio:66 / 66" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu94">
															<div class="_163biu95"></div>
														</div>
														<h3 class="_163biu99 couponShape">Nu får du gratis frakt på din
															beställning med Zalando Lounge rabattkod</h3>
														<div class="_163biu9a _163biu9b">
															<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
																<span class="_1uoxkl7b _1uoxkl7d">Verifierad</span>
															</div>
														</div>
														<div class="_163biu9h  couponShape">
															<div role="button" tabindex="0">
																<div style="--verticalPadding:10px;--borderRadiusButton:10px"
																	role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
																	tabindex="0">22<div class="_1fdk0lb3"></div>
																	<div class="_6o5mg73 _1fdk0lb6">
																		<div class="_1fdk0lb7"></div>
																		<div class="_1fdk0lb8"></div>
																	</div>
																	<div class="_6o5mg73 _1fdk0lb5">
																		<div class="_6o5mg70 _6o5mg72">
																			<div>Visa rabattkod</div>
																		</div>
																		<div class="_6o5mg71">
																			<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																				class="">Visa rabattkod</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="_1w5fcfx0 _163biu9c">
																<div>Utgångsdatum
																	<!-- -->:</div>
																<div> 
																	<!-- -->2 november</div>
															</div>
														</div>
														<div class="_1w5fcfx0 _163biu9d couponShape">
															<div>Utgångsdatum
																<!-- -->:</div>
															<div> 
																<!-- -->2 november</div>
														</div>
													</div>
												</div>
											</div>
											<div data-id="se_612567" data-old-id="786264" class="_1oghgt72">
												<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-786264 hasLogo"
													data-attribute="0">
													<div style="--containerWidth-ctaWidth:184px"
														class="_163biu91 flexButton">
														<div class="_163biu98 mobileOnly">
															<div role="button" tabindex="0"><a href="/db"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:50px;height:50px">
																		<img alt="Db" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="50" width="50" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" style="aspect-ratio:50 / 50;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/25x/filters:blur(75)//images/d/DbJourney_Logo.png&quot;);background-position:0% 0%"/><noscript><img alt="Db" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/64x//images/d/DbJourney_Logo.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/128x//images/d/DbJourney_Logo.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/128x//images/d/DbJourney_Logo.png" height="50" width="50" decoding="async" data-nimg="raw" style="aspect-ratio:50 / 50" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu92 tabletUpFlex">
															<div id="caption" class="_11se7ch0 "></div>
															<div role="button" tabindex="0"><a href="/db"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:66px;height:66px">
																		<img alt="Db" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="66" width="66" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" style="aspect-ratio:66 / 66;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/33x/filters:blur(75)//images/d/DbJourney_Logo.png&quot;);background-position:0% 0%"/><noscript><img alt="Db" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/d/DbJourney_Logo.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/d/DbJourney_Logo.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/d/DbJourney_Logo.png" height="66" width="66" decoding="async" data-nimg="raw" style="aspect-ratio:66 / 66" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu94">
															<div class="_163biu95"></div>
														</div>
														<h3 class="_163biu99 couponShape">Tipsa en vän och ni båda får
															varsin DoucheBags rabattkod på 15%</h3>
														<div class="_163biu9a _163biu9b">
															<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
																<span class="_1uoxkl7b _1uoxkl7d">Verifierad</span>
															</div>
														</div>
														<div class="_163biu9h  couponShape">
															<div role="button" tabindex="0">
																<div style="--verticalPadding:10px;--borderRadiusButton:10px"
																	role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
																	tabindex="0">il<div class="_1fdk0lb3"></div>
																	<div class="_6o5mg73 _1fdk0lb6">
																		<div class="_1fdk0lb7"></div>
																		<div class="_1fdk0lb8"></div>
																	</div>
																	<div class="_6o5mg73 _1fdk0lb5">
																		<div class="_6o5mg70 _6o5mg72">
																			<div>Visa rabattkod</div>
																		</div>
																		<div class="_6o5mg71">
																			<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																				class="">Visa rabattkod</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="_1w5fcfx0 _163biu9c">
																<div>Utgångsdatum
																	<!-- -->:</div>
																<div> 
																	<!-- -->24 oktober</div>
															</div>
														</div>
														<div class="_1w5fcfx0 _163biu9d couponShape">
															<div>Utgångsdatum
																<!-- -->:</div>
															<div> 
																<!-- -->24 oktober</div>
														</div>
													</div>
												</div>
											</div>
											<div data-id="se_513348" data-old-id="779295" class="_1oghgt72">
												<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-779295 hasLogo"
													data-attribute="0">
													<div style="--containerWidth-ctaWidth:184px"
														class="_163biu91 flexButton">
														<div class="_163biu98 mobileOnly">
															<div role="button" tabindex="0"><a href="/emp"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:50px;height:50px">
																		<img alt="EMP" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="50" width="50" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" style="aspect-ratio:50 / 50;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/25x/filters:blur(75)//images/e/EMP.png&quot;);background-position:0% 0%"/><noscript><img alt="EMP" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/64x//images/e/EMP.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/128x//images/e/EMP.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/128x//images/e/EMP.png" height="50" width="50" decoding="async" data-nimg="raw" style="aspect-ratio:50 / 50" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu92 tabletUpFlex">
															<div id="caption" class="_11se7ch0 "></div>
															<div role="button" tabindex="0"><a href="/emp"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:66px;height:66px">
																		<img alt="EMP" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="66" width="66" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" style="aspect-ratio:66 / 66;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/33x/filters:blur(75)//images/e/EMP.png&quot;);background-position:0% 0%"/><noscript><img alt="EMP" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/e/EMP.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/e/EMP.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/e/EMP.png" height="66" width="66" decoding="async" data-nimg="raw" style="aspect-ratio:66 / 66" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu94">
															<div class="_163biu95"></div>
														</div>
														<h3 class="_163biu99 couponShape">Prenumerera på nyhetsbrevet
															och spara 15% med EMP rabattkod</h3>
														<div class="_163biu9a _163biu9b"></div>
														<div class="_163biu9h  couponShape">
															<div role="button" tabindex="0">
																<div style="--verticalPadding:10px;--borderRadiusButton:10px"
																	role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
																	tabindex="0">ng<div class="_1fdk0lb3"></div>
																	<div class="_6o5mg73 _1fdk0lb6">
																		<div class="_1fdk0lb7"></div>
																		<div class="_1fdk0lb8"></div>
																	</div>
																	<div class="_6o5mg73 _1fdk0lb5">
																		<div class="_6o5mg70 _6o5mg72">
																			<div>Visa rabattkod</div>
																		</div>
																		<div class="_6o5mg71">
																			<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																				class="">Visa rabattkod</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="_1w5fcfx0 _163biu9c">
																<div>Utgångsdatum
																	<!-- -->:</div>
																<div> 
																	<!-- -->29 november</div>
															</div>
														</div>
														<div class="_1w5fcfx0 _163biu9d couponShape">
															<div>Utgångsdatum
																<!-- -->:</div>
															<div> 
																<!-- -->29 november</div>
														</div>
													</div>
												</div>
											</div>
											<div data-id="se_614981" data-old-id="785774" class="_1oghgt72">
												<div class="njlxh80 njlxh81 njlxh86 _163biu90 VoucherCard #voucher-785774 hasLogo"
													data-attribute="0">
													<div style="--containerWidth-ctaWidth:184px"
														class="_163biu91 flexButton">
														<div class="_163biu98 mobileOnly">
															<div role="button" tabindex="0"><a href="/minfot"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:50px;height:50px">
																		<img alt="Minfot" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="50" width="50" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" style="aspect-ratio:50 / 50;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/25x/filters:blur(75)//images/m/Minfot.png&quot;);background-position:0% 0%"/><noscript><img alt="Minfot" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/64x//images/m/Minfot.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/128x//images/m/Minfot.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/128x//images/m/Minfot.png" height="50" width="50" decoding="async" data-nimg="raw" style="aspect-ratio:50 / 50" class="
        lvacvc2 
        lvacvc0 
         
        _163biu97
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu92 tabletUpFlex">
															<div id="caption" class="_11se7ch0 "></div>
															<div role="button" tabindex="0"><a href="/minfot"
																	class=" xi0mv81 xi0mv8r xi0mv8o"
																	data-internal="true">
																	<div class="lvacvc4" style="width:66px;height:66px">
																		<img alt="Minfot" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="66" width="66" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" style="aspect-ratio:66 / 66;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/33x/filters:blur(75)//images/m/Minfot.png&quot;);background-position:0% 0%"/><noscript><img alt="Minfot" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/m/Minfot.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/m/Minfot.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/m/Minfot.png" height="66" width="66" decoding="async" data-nimg="raw" style="aspect-ratio:66 / 66" class="
        lvacvc2 
        lvacvc0 
         
        _163biu96
        lvacvcb" loading="lazy"/></noscript></div>
																</a></div>
														</div>
														<div class="_163biu94">
															<div class="_163biu95"></div>
														</div>
														<h3 class="_163biu99 couponShape">Spara 20% på skor från New
															feet med Minfot rabattkod</h3>
														<div class="_163biu9a _163biu9b">
															<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
																<span class="_1uoxkl7b _1uoxkl7d">Utgår snart</span>
															</div>
															<div class="_1uoxkl70 _1uoxkl73 _1uoxkl79 _1uoxkl71 ">
																<span class="_1uoxkl7b _1uoxkl7d">Verifierad</span>
															</div>
														</div>
														<div class="_163biu9h  couponShape">
															<div role="button" tabindex="0">
																<div style="--verticalPadding:10px;--borderRadiusButton:10px"
																	role="button" class="_6o5mg73 _1fdk0lb0 _1fdk0lb2 "
																	tabindex="0">ET<div class="_1fdk0lb3"></div>
																	<div class="_6o5mg73 _1fdk0lb6">
																		<div class="_1fdk0lb7"></div>
																		<div class="_1fdk0lb8"></div>
																	</div>
																	<div class="_6o5mg73 _1fdk0lb5">
																		<div class="_6o5mg70 _6o5mg72">
																			<div>Visa rabattkod</div>
																		</div>
																		<div class="_6o5mg71">
																			<div aria-label="NLY MAN sida kommer att öppnas i en ny flik"
																				class="">Visa rabattkod</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="_1w5fcfx0 _163biu9c">
																<div>Utgår imorgon</div>
															</div>
														</div>
														<div class="_1w5fcfx0 _163biu9d couponShape">
															<div>Utgår imorgon</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div data-testid="featured-snippet-main-1" class="_1rfgee61 _1rfgee68">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm84 
        fha4540 
        ">Populära NLY MAN rabattkoder hos GP Rabattkoder</h2>
											<div class="afwfjb0 afwfjb1 afwfjb3">
												<table class="afwfjb5">
													<thead>
														<tr class="afwfjb9">
															<th class="afwfjb6 afwfjb8 afwfjba">Beskrivning:</th>
															<th class="afwfjb6 afwfjb8 afwfjba">Rabatt:</th>
															<th class="afwfjb6 afwfjb8 afwfjba">Giltig till:</th>
														</tr>
													</thead>
													<tbody>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Bli medlem och få en 20% NLY MAN
																rabattkod</td>
															<td class="afwfjb6 afwfjb8">20% Rabattkod</td>
															<td class="afwfjb6 afwfjb8">20 februari</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Få fri frakt på ditt köp hos NLY
																MAN</td>
															<td class="afwfjb6 afwfjb8">Fri Frakt</td>
															<td class="afwfjb6 afwfjb8">3 november</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">mellandagsrea hos NLY MAN -
																spara upp till 70%</td>
															<td class="afwfjb6 afwfjb8">70% Rabatt</td>
															<td class="afwfjb6 afwfjb8">16 november</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Spara 20% på utvalda T-shirts
																och tröjor hos NLY MAN</td>
															<td class="afwfjb6 afwfjb8">20% Rabatt</td>
															<td class="afwfjb6 afwfjb8">19 oktober</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Shoppa somriga linnekläder från
																299 kr hos NLY MAN</td>
															<td class="afwfjb6 afwfjb8">Från 299 kr</td>
															<td class="afwfjb6 afwfjb8">6 november</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div data-testid="breadcrumbs-main-1" class="_1rfgee61 _1rfgee68">
										<script type="application/ld+json">
											{"@context":"http://schema.org/","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Hem","item":"https://rabattkod.gp.se/"},{"@type":"ListItem","position":2,"name":"Alla butiker","item":"https://rabattkod.gp.se/butiker"},{"@type":"ListItem","position":3,"name":"NLY MAN rabattkod","item":"https://rabattkod.gp.se/nly-man"}]}
										</script>
										<nav class="w2gozo5"><a href="https://rabattkod.gp.se/"
												class=" xi0mv81 xi0mv8r xi0mv8n w2gozo1"
												data-internal="true">Hem</a><span class="w2gozo2">/</span><a
												href="https://rabattkod.gp.se/butiker"
												class=" xi0mv81 xi0mv8r xi0mv8n w2gozo1" data-internal="true">Alla
												butiker</a><span class="w2gozo2">/</span>
											<p class="
         
        _1sromm80 
        _1sromm89 
        w2gozo0 
        ">NLY MAN rabattkod</p>
										</nav>
									</div>
								</div>
								<div data-testid="sidebar-section-widgets" class="ns4s16d ns4s16e ns4s16f">
									<div data-testid="summary-widget-sidebar-1" class="_1rfgee62 _1rfgee63 _1rfgee69">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm85 
        _1y0ay0v0 
        ">Översikt av våra rabattkoder</h2>
											<div class="afwfjb0 afwfjb1 afwfjb3">
												<table class="afwfjb5">
													<thead>
														<tr class="afwfjb9"></tr>
													</thead>
													<tbody>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Rabattkoder</td>
															<td class="afwfjb6 afwfjb8">1</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Antal rabatter</td>
															<td class="afwfjb6 afwfjb8">6</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Högsta rabatt</td>
															<td class="afwfjb6 afwfjb8">70%</td>
														</tr>
														<tr class="afwfjb9">
															<td class="afwfjb6 afwfjb8">Antal fri frakt rabatter</td>
															<td class="afwfjb6 afwfjb8">1</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div class="njlxh80 njlxh82 njlxh83 _1rfgee62 _1rfgee65 _1rfgee66 _1rfgee67"
										data-testid="saving-possibilities-theme-c2-sidebar-1">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm84 
         
        ">Bli medlem och spara mer</h2>
											<div class="_1cfkalc2 _1cfkalc0">
												<h3 class="
         
        _1sromm80 
        _1sromm85 
        _1cfkalc1 
        "> </h3>
												<div class="_12lk62r6">
													<div data-testid="rich-text-root"
														class="_12lk62r2 _12lk62r9 _12lk62r0">Du som ny kund får ta del
														av en 20% NLY MAN rabattkod när du blir medlem. Glöm inte att
														prenumerera på deras nyhetsbrev också när du skapar din profil.
														Då missar du aldrig några rabattkoder och rabatter. Som medlem
														har du också stenkoll på dina beställningar och din
														orderhistorik. Du kan även spara dina favoriter om du vill lägga
														beställningen vid ett senare tillfälle. </div>
												</div>
											</div>
										</div>
									</div>
									<div class="njlxh80 njlxh82 njlxh83 _1rfgee62 _1rfgee65 _1rfgee66 _1rfgee67"
										data-testid="default-sidebar-1">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm85 
        _1di6apk0 
        ">Fynda i NLY MAN rea</h2>
											<div class="_12lk62r6">
												<div data-testid="rich-text-root" class="_12lk62r2 _12lk62r9 _12lk62r0">
													Ibland finns det inte alltid en NLY MAN kupong tillgänglig. Detta
													behöver dock inte betyda att du inte kan spara ändå. NLY MAN har
													nämligen en stor rea-avdelning där du alltid hittar produkter med
													sänkt pris. Du kan klicka dig runt bland olika kategorier för att
													hitta det du söker. Allt i rean är nedsatt med upp till 70% rabatt,
													helt galet bra priser alltså. Det är bara att shoppa loss! </div>
											</div>
										</div>
									</div>
									<div data-testid="similar-shops-sidebar-1" class="_1rfgee62 _1rfgee63 _1rfgee69">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm85 
        _127i92c0 
        ">Butiker i samma kategori som NLY MAN</h2>
											<div class="_1hm4lrt0 _1hm4lrt2">
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Similar Stores"
													data-gtm-target-retailer="Jack &amp; Jones"
													data-gtm-widget-location="right"><a href="/jack-jones"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="Jack and Jones rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/j/Jack_Jones.png&quot;);background-position:0% 0%"/><noscript><img alt="Jack and Jones rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/j/Jack_Jones.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/j/Jack_Jones.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/j/Jack_Jones.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Similar Stores"
													data-gtm-target-retailer="John Henric"
													data-gtm-widget-location="right"><a href="/john-henric"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="John Henric rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/j/John-Henric.png&quot;);background-position:0% 0%"/><noscript><img alt="John Henric rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/j/John-Henric.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/j/John-Henric.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/j/John-Henric.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Similar Stores"
													data-gtm-target-retailer="Sneakersnstuff"
													data-gtm-widget-location="right"><a href="/sneakersnstuff"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="Sneakersnstuff rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/s/Sneakersnstuff.png&quot;);background-position:0% 0%"/><noscript><img alt="Sneakersnstuff rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/s/Sneakersnstuff.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/s/Sneakersnstuff.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/s/Sneakersnstuff.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
											</div>
										</div>
									</div>
									<div data-testid="popular-shops-sidebar-1" class="_1rfgee62 _1rfgee63 _1rfgee69">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm85 
        _8uohy40 
        ">Mest populära butiker</h2>
											<div class="_1hm4lrt0 _1hm4lrt2">
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="ASOS" data-gtm-widget-location="right"><a
														href="/asos" class=" xi0mv81 xi0mv8r xi0mv8o"
														data-testid="shopLinkLogo-link" rel="follow"
														data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="ASOS rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/a/Asos.png&quot;);background-position:0% 0%"/><noscript><img alt="ASOS rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/a/Asos.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/a/Asos.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/a/Asos.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="Designlite"
													data-gtm-widget-location="right"><a href="/designlite"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="Designlite rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/d/Designlite.png&quot;);background-position:0% 0%"/><noscript><img alt="Designlite rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/d/Designlite.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/d/Designlite.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/d/Designlite.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="F-Secure"
													data-gtm-widget-location="right"><a href="/f-secure"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="F-Secure rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/f/Fsecure_Logo.png&quot;);background-position:0% 0%"/><noscript><img alt="F-Secure rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/f/Fsecure_Logo.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/f/Fsecure_Logo.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/f/Fsecure_Logo.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="Hemtex" data-gtm-widget-location="right">
													<a href="/hemtex" class=" xi0mv81 xi0mv8r xi0mv8o"
														data-testid="shopLinkLogo-link" rel="follow"
														data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="Hemtex rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/h/Hemtex.png&quot;);background-position:0% 0%"/><noscript><img alt="Hemtex rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/h/Hemtex.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/h/Hemtex.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/h/Hemtex.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="JD Sports"
													data-gtm-widget-location="right"><a href="/jd-sports"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="JD Sports rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/j/JD-Sports.png&quot;);background-position:0% 0%"/><noscript><img alt="JD Sports rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/j/JD-Sports.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/j/JD-Sports.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/j/JD-Sports.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="KidsBrandStore"
													data-gtm-widget-location="right"><a href="/kidsbrandstore-se"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="KidsBrandStore rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/k/KidsBrandStore.png&quot;);background-position:0% 0%"/><noscript><img alt="KidsBrandStore rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/k/KidsBrandStore.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/k/KidsBrandStore.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/k/KidsBrandStore.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="Luxplus" data-gtm-widget-location="right">
													<a href="/luxplus" class=" xi0mv81 xi0mv8r xi0mv8o"
														data-testid="shopLinkLogo-link" rel="follow"
														data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="Luxplus rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/l/Luxplus.png&quot;);background-position:0% 0%"/><noscript><img alt="Luxplus rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/l/Luxplus.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/l/Luxplus.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/l/Luxplus.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="SmartaSaker"
													data-gtm-widget-location="right"><a href="/smarta-saker"
														class=" xi0mv81 xi0mv8r xi0mv8o" data-testid="shopLinkLogo-link"
														rel="follow" data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="Smartasaker rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/s/smartasakernewlogo.png&quot;);background-position:0% 0%"/><noscript><img alt="Smartasaker rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/s/smartasakernewlogo.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/s/smartasakernewlogo.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/s/smartasakernewlogo.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="TT-Line" data-gtm-widget-location="right">
													<a href="/tt-line" class=" xi0mv81 xi0mv8r xi0mv8o"
														data-testid="shopLinkLogo-link" rel="follow"
														data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="TT-Line rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/t/TT-Line.png&quot;);background-position:0% 0%"/><noscript><img alt="TT-Line rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/t/TT-Line.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/t/TT-Line.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/t/TT-Line.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
												<div class="_1hm4lrt3 _1hm4lrt5" data-gtm-shops-widget="true"
													data-gtm-widget-name="Most Popular Shops"
													data-gtm-target-retailer="adidas" data-gtm-widget-location="right">
													<a href="/adidas" class=" xi0mv81 xi0mv8r xi0mv8o"
														data-testid="shopLinkLogo-link" rel="follow"
														data-internal="true">
														<div class="njlxh80 njlxh82 njlxh83 sdk2zy0">
															<div class="lvacvc5">
																<div class="lvacvc7">
																	<img class="lvacvc8" alt="" aria-hidden="true" role="presentation" height="80" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjE1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="/></div>
																	<img alt="adidas rabattkod" data-testid="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" height="80" width="80" decoding="async" data-nimg="raw" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" style="aspect-ratio:80 / 80;filter:blur(20px);background-size:cover;background-image:url(&quot;https://dxrhpnm3x1ev1.cloudfront.net/80x/filters:blur(80)//images/a/adidas.png&quot;);background-position:0% 0%"/><noscript><img alt="adidas rabattkod" data-testid="image" srcSet="https://dxrhpnm3x1ev1.cloudfront.net/96x//images/a/adidas.png 1x, https://dxrhpnm3x1ev1.cloudfront.net/256x//images/a/adidas.png 2x" src="https://dxrhpnm3x1ev1.cloudfront.net/256x//images/a/adidas.png" height="80" width="80" decoding="async" data-nimg="raw" style="aspect-ratio:80 / 80" class="
        lvacvc2 
        lvacvc0 
        lvacvc1 
        sdk2zy1
        lvacvcb" loading="lazy"/></noscript></div>
															</div>
													</a></div>
											</div>
										</div>
									</div>
									<div class="njlxh80 njlxh82 njlxh83 _1rfgee62 _1rfgee65 _1rfgee66 _1rfgee67"
										data-testid="default-sidebar-2">
										<div>
											<h2 class="
         
        _1sromm80 
        _1sromm85 
        _1di6apk0 
        ">Om NLY MAN</h2>
											<div class="_12lk62r6">
												<div data-testid="rich-text-root" class="_12lk62r2 _12lk62r9 _12lk62r0">
													NLY MAN erbjuder mode på nätet för unga killar. Deras sortiment
													består av trendiga kläder från 100 kända varumärken. Det finns allt
													från kläder till skor och accessoarer, som passar till olika typer
													av tillfällen. Oavsett om du är på jakt efter sportkläder eller en
													ny festoutfit hittar du det hos NLY MAN. </div>
											</div>
										</div>
									</div>
									<div data-testid="submit-code-sidebar-1" class="_1rfgee62 _1rfgee63 _1rfgee69">
									</div>
									<div data-testid="share-code-sidebar-1" class="_1rfgee62 _1rfgee63 _1rfgee69"></div>
								</div>
							</div>
						</div>
						<div class="_1av21ef0">
							<div class="p0obiq0 p0obiq2">
								<div class="p0obiq4"><span class="
         
        _1sromm80 
        _1sromm89 
        p0obiq3 
        ">GP Rabattkoder</span><a href="https://rabattkod.gp.se/foretagsuppgifter"
										class=" xi0mv81 xi0mv8t xi0mv8n p0obiq6" data-internal="true"
										rel="follow">Företagsuppgifter</a><span class="p0obiq7"> <!-- -->|<!-- --> </span><a
										href="https://rabattkod.gp.se/om-oss" class=" xi0mv81 xi0mv8t xi0mv8n p0obiq6"
										data-internal="true" rel="follow">Om
										oss</a><span class="p0obiq7"> <!-- -->|<!-- --> </span><a
										href="https://rabattkod.gp.se/integritetspolicy"
										class=" xi0mv81 xi0mv8t xi0mv8n p0obiq6" data-internal="true"
										rel="follow">Integritetspolicy</a><span class="p0obiq7"> <!-- -->|<!-- --> </span><a
										href="https://rabattkod.gp.se/kontakt" class=" xi0mv81 xi0mv8t xi0mv8n p0obiq6"
										data-internal="true"
										rel="follow">Kontakt</a><span class="p0obiq7"> <!-- -->|<!-- --> </span><a
										href="https://rabattkod.gp.se/faq" class=" xi0mv81 xi0mv8t xi0mv8n p0obiq6"
										data-internal="true"
										rel="follow">FAQ</a><span class="p0obiq7"> <!-- -->|<!-- --> </span><a
										href="https://rabattkod.gp.se/cookies" class=" xi0mv81 xi0mv8t xi0mv8n p0obiq6"
										data-internal="true"
										rel="follow">Cookies</a><span class="p0obiq7"> <!-- -->|<!-- --> </span>
									<p class="
        _1sromm8n 
        _1sromm80 
        _1sromm89 
        p0obiq6 
        "><button class="p0obiqe" type="button">Cookies inställningar</button></p>
								</div>
							</div>
						</div>
		</main>
	</div>
	<div>

		<head>
			<style>
				#ve-footer-desktop {
					/*! Resource contributed from: 3.374334.1655797742 /style.css*/
					/*! Resource contributed from: 3.374331.1655797716 /style.css*/
					/*! Resource contributed from: 3.374328.1655797694 /style.css*/
					/*! Resource contributed from: 3.374325.1655797685 /style.css*/
					/*! Resource contributed from: 3.334697.1655797741 /style.css*/
					/*! Resource contributed from: 3.334693.1655797683 /style.css*/
					/*! Resource contributed from: 3.334691.1655797682 /style.css*/
					/*! modern-normalize | MIT License | https://github.com/sindresorhus/modern-normalize */
				}

				#ve-footer-desktop {
					box-sizing: border-box;
					-webkit-text-size-adjust: none;
					touch-action: manipulation
				}

				#ve-footer-desktop *,
				#ve-footer-desktop ::after,
				#ve-footer-desktop ::before {
					box-sizing: border-box
				}

				#ve-footer-desktop {
					-moz-tab-size: 4;
					tab-size: 4
				}

				#ve-footer-desktop body {
					margin: 0
				}

				#ve-footer-desktop {
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
					line-height: 1.5
				}

				#ve-footer-desktop h5 {
					margin-top: 0;
					margin-bottom: 8px
				}

				#ve-footer-desktop strong {
					font-weight: bolder
				}

				#ve-footer-desktop ::-webkit-file-upload-button {
					-webkit-appearance: button;
					font: inherit
				}

				#ve-footer-desktop img {
					display: block;
					max-width: 100%;
					height: auto;
					border: 0
				}

				@font-face {
					font-family: "Gothia Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-RegularItalic.woff2) format("woff2");
					font-weight: 400;
					font-weight: 400;
					font-style: italic
				}

				@font-face {
					font-family: "Gothia Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-SemiBold.woff2) format("woff2");
					font-weight: 600;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.woff2) format("woff2"), url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.otf) format("otf");
					font-weight: 700;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Sans Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.woff2) format("woff2"), url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.woff2) format("otf");
					font-weight: 400;
					font-weight: 400;
					font-style: normal
				}

				@font-face {
					font-family: "Gothia Sans Serif";
					src: url(https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Medium.woff2) format("woff2");
					font-weight: 500;
					font-style: normal
				}

				@media screen and (max-width:1024px) {
					#ve-footer-desktop .c-footer.o-grid__footer .o-container {
						display: block;
						text-align: center;
						flex-direction: column;
						align-items: unset
					}

					#ve-footer-desktop .c-footer .o-container .c-footer__brand {
						height: 34px;
						display: block;
						margin-top: 10px;
						margin-left: auto;
						margin-right: auto;
						margin-bottom: 30px
					}

					#ve-footer-desktop .c-footer .o-container .c-footer__symbol {
						margin-right: 0;
						display: inline;
						flex-basis: unset
					}

					#ve-footer-desktop .o-container .c-footer__links {
						margin-top: 30px;
						flex-basis: unset;
						padding-left: 0;
						border-left: none
					}

					#ve-footer-desktop .o-container .c-footer__info-brand {
						flex-basis: unset
					}

					#ve-footer-desktop .o-container .c-footer__info-brand p {
						color: rgba(255, 255, 255, .7);
						padding-bottom: 50px;
						margin-bottom: 50px;
						border-bottom: 1px solid #fff
					}

					#ve-footer-desktop .o-container h5 {
						margin-bottom: 8px;
						font-size: 20px;
						font-weight: 700;
						line-height: 24px
					}

					#ve-footer-desktop .o-container .c-footer__mediagroup {
						flex-direction: column
					}

					#ve-footer-desktop .o-container strong {
						font-size: 16px
					}

					#ve-footer-desktop .c-footer__mediagroup.o-container a,
					#ve-footer-desktop .c-footer__mediagroup.o-container strong {
						font-size: 13px;
						line-height: 20px
					}
				}

				#ve-footer-desktop h5 {
					margin-bottom: 8px;
					font-family: "Gothia Serif", Serif;
					font-weight: 700;
					line-height: 1.2
				}

				#ve-footer-desktop h5 {
					font-size: 20px
				}

				#ve-footer-desktop .c-footer__links {
					list-style: none;
					margin-bottom: 0;
					margin-top: 0;
					padding-left: 0
				}

				#ve-footer-desktop .o-container {
					max-width: 1290px;
					margin-right: auto;
					margin-left: auto;
					padding-right: 20px;
					padding-left: 20px
				}

				#ve-footer-desktop a {
					color: #0a5582;
					text-decoration: none;
					background-color: transparent;
					-webkit-text-decoration-skip: objects;
					cursor: pointer
				}

				#ve-footer-desktop a:hover {
					color: #0a324b;
					text-decoration: underline
				}

				#ve-footer-desktop body {
					width: 100%;
					background-color: #f3f3f3;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
					font-size: 16px;
					font-weight: 400;
					line-height: 1.5;
					color: #1e2d37;
					text-align: left;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale
				}

				#ve-footer-desktop p {
					margin-top: 0;
					margin-bottom: 20px
				}

				#ve-footer-desktop svg {
					overflow: hidden;
					vertical-align: middle
				}

				#ve-footer-desktop .c-footer {
					width: 100%;
					margin-top: auto;
					align-self: flex-end;
					background-color: #0a324b;
					padding-top: 80px;
					padding-bottom: 20px;
					text-align: left;
					font-family: "Gothia Sans Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
				}

				@media screen and (min-width:992px) {
					#ve-footer-desktop .c-footer {
						font-size: 100%
					}
				}

				#ve-footer-desktop .c-footer .o-container {
					text-align: center
				}

				@media screen and (min-width:768px) {
					#ve-footer-desktop .c-footer .o-container {
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						-ms-flex-wrap: nowrap;
						flex-wrap: nowrap;
						-webkit-box-orient: horizontal;
						-webkit-box-direction: normal;
						-ms-flex-direction: row;
						flex-direction: row;
						-webkit-box-pack: justify;
						-ms-flex-pack: justify;
						justify-content: space-between;
						-webkit-box-align: start;
						-ms-flex-align: start;
						align-items: flex-start;
						text-align: left
					}
				}

				#ve-footer-desktop .c-footer .c-footer__symbol {
					width: 90px;
					height: auto;
					display: initial
				}

				@media screen and (min-width:768px) {
					#ve-footer-desktop .c-footer .c-footer__symbol {
						-ms-flex-preferred-size: 15%;
						flex-basis: 15%;
						margin-right: 2%
					}
				}

				@media screen and (min-width:992px) {
					#ve-footer-desktop .c-footer .c-footer__symbol {
						-ms-flex-preferred-size: 17%;
						flex-basis: 17%
					}
				}

				#ve-footer-desktop .c-footer .c-footer__brand {
					fill: #fff;
					height: 34px;
					display: block;
					margin-top: 10px;
					margin-left: auto;
					margin-right: auto;
					margin-bottom: 30px
				}

				@media screen and (min-width:768px) {
					#ve-footer-desktop .c-footer .c-footer__brand {
						margin-top: 0;
						margin-bottom: 10px;
						margin-right: 0;
						margin-left: 0
					}
				}

				#ve-footer-desktop .c-footer strong {
					color: #fff
				}

				@media screen and (min-width:768px) {
					#ve-footer-desktop .c-footer__info-brand {
						-ms-flex-preferred-size: 35%;
						flex-basis: 35%
					}
				}

				@media screen and (min-width:992px) {
					#ve-footer-desktop .c-footer__info-brand {
						margin-right: auto
					}
				}

				#ve-footer-desktop .c-footer__info-brand p {
					color: rgba(255, 255, 255, .7);
					padding-bottom: 50px;
					margin-bottom: 50px;
					border-bottom: 1px solid #fff
				}

				@media screen and (min-width:768px) {
					#ve-footer-desktop .c-footer__info-brand p {
						border-bottom: 0;
						padding-bottom: 0;
						margin-bottom: 0
					}
				}

				#ve-footer-desktop .c-footer__links {
					margin-top: 30px
				}

				@media screen and (min-width:768px) {
					#ve-footer-desktop .c-footer__links {
						margin-top: 0;
						-ms-flex-preferred-size: 15%;
						flex-basis: 15%;
						border-left: 1px solid rgba(255, 255, 255, .7);
						padding-left: 16px;
						height: 180px
					}
				}

				#ve-footer-desktop .c-footer__links h5 {
					color: #fff
				}

				#ve-footer-desktop .c-footer__links a {
					font-weight: 400;
					color: rgba(255, 255, 255, .7)
				}

				#ve-footer-desktop .c-footer__mediagroup {
					margin-top: 50px;
					font-size: 13px;
					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					-ms-flex-direction: column;
					flex-direction: column
				}

				#ve-footer-desktop .c-footer__mediagroup a {
					font-weight: 400;
					color: #fff
				}

				#ve-footer-desktop .c-footer__stampen {
					color: #fff;
					width: 120px;
					height: 40px;
					margin-bottom: 20px
				}

				@media screen and (min-width:992px) {
					#ve-footer-desktop .c-footer__stampen {
						margin-bottom: 0;
						margin-right: 20px
					}
				}

				#ve-footer-desktop .c-footer__stampen:hover {
					color: #fff
				}

				#ve-footer-desktop .c-nav-dropdown__item a span::before .c-nav-dropdown__item:not(.is-active):not(.c-nav-dropdown__item--toggle):nav-dropdown__item--mypagesubpage {
					display: none
				}

				#ve-footer-desktop .c-nav-dropdown__item a span::before .c-nav-dropdown__item:not(.is-active):not(.c-nav-dropdown__item--toggle):nav-dropdown__item--mypagesubpage {
					display: none
				}

				#ve-footer-desktop .c-subselect__viewport__version-two .c-subselect__toggle-choice__item>:checked+label::before {
					background-color: #00c389
				}

				#ve-footer-desktop .c-subselect__viewport__version-two .c-subselect__toggle-choice__item>:checked+label::after {
					transform: translateX(35px)
				}

				#ve-footer-desktop .c-gallery__arrow:not(:focus) {
					transition-property: -webkit-transform, opacity;
					-webkit-transition-property: opacity, -webkit-transform;
					transition-property: opacity, -webkit-transform;
					transition-property: transform, opacity;
					transition-property: transform, opacity, -webkit-transform;
					-webkit-transition-duration: .3s;
					transition-duration: .3s
				}

				#ve-footer-desktop .c-gallery__fullscreen-btn:not(:focus) {
					transition-property: -webkit-transform, opacity;
					-webkit-transition-property: opacity, -webkit-transform;
					transition-property: opacity, -webkit-transform;
					transition-property: transform, opacity;
					transition-property: transform, opacity, -webkit-transform;
					-webkit-transition-duration: .3s;
					transition-duration: .3s
				}
			</style>
		</head>

		<body>
			<div id=ve-footer-desktop>
				<footer class="c-footer o-grid__footer">
					<div class=o-container> <img src=https://www.gp.se/polopoly_fs/3.200.1655797719!/images/se.gp/fyr.png class=c-footer__symbol>
						<div class=c-footer__info-brand> <a href=https://www.gp.se/ target=_self> <svg
									class="FooterBrand__BrandLogo-sc-1intyfu-2 c-footer__brand exfSHe gp"
									viewBox="0 0 370 51" xmlns=http://www.w3.org/2000/svg
									preserveAspectRatio="xMidYMid meet">
									<path
										d=M413.85,390.87c0,.21.2.21.41.21H419c.21,0,.41,0,.41-.21v-8.4c0-.21,0-.42-.41-.42h-3.7c-.2,0-.2,0-.41.42a15.31,15.31,0,0,0-.82,2.1c-.2.21-.2.21-.41,0a7,7,0,0,0-5.75-2.73c-3.91,0-7.81,3.57-7.81,9s2.47,7.55,3.08,8.18,1.44,1.05,4.52,2.1c2.88.84,2.67.84,3.08,1.05a2.31,2.31,0,0,1,1.24,2.1c0,1.47-1.24,2.1-2.67,2.1a4.74,4.74,0,0,1-4.11-3.36c0-.21,0-.42-.62-.42h-4.93c-.41,0-.41.21-.41.63v8.39c0,.21,0,.42.2.42h4.94a.73.73,0,0,0,.41-.21,12.86,12.86,0,0,1,.82-1.89c.2-.21.2,0,.2.21a6.16,6.16,0,0,0,5.14,2.52c3.7,0,8.83-2.1,8.83-9.44,0-6.09-3.28-7.77-4.11-8.4-1.23-.84-4.72-1.89-5.75-2.31-.61-.2-2.46-1-2.46-2.72,0-1.26,1.43-2.1,2.67-2.1,2.46,0,3.7,1.68,3.7,2.31v.84Zm10.06-9.24c.21-.42,3.29-6.29,3.49-6.71s.21-.42.62-.42h4.32a.45.45,0,0,1,.41.42v6.71c0,.21,0,.42.2.42h4.52c.21,0,.41,0,.41.21v6.93c0,.21,0,.21-.2.21H433c-.2,0-.2,0-.2.21v13a2.7,2.7,0,0,0,2.87,3.15,15.52,15.52,0,0,0,1.85-.21c.21,0,.21,0,.21.21v5.87c0,.21,0,.21-.21.42a27.24,27.24,0,0,1-5.55.63c-3.28,0-8.21-1.05-8.21-8V389.61c0-.21,0-.21-.21-.21h-2.88c-.2,0-.2.21-.2,0v-6.93a.2.2,0,0,1,.2-.21h2.47c.41-.21.82-.42.82-.63ZM216.83,401.36c0-.21,0-.21-.21-.21h-6.16c-.21,0-.21,0-.21.21s0,4-3.28,4c-2.88,0-3.5-3.36-3.5-5.67v-2.1a.21.21,0,0,1,.21-.21h12.53c.21,0,.21,0,.21-.21v-1.89s.82-14.06-10.69-14.06c-10.89,0-10.47,13.43-10.47,14.9V398c0,12.59,8,14.48,11.09,14.48C217,412.69,216.83,401.57,216.83,401.36Zm-13.36-9.86c0-.84.62-3.57,2.47-3.57,2.26,0,2.26,3.36,2.26,4v1.25c0,.21,0,.42-.21.42h-4.31c-.21,0-.21-.21-.21-.42Zm256.39,9.86c0-.21,0-.21-.2-.21H453.5c-.21,0-.21,0-.21.21s0,4-3.29,4c-2.87,0-3.49-3.36-3.49-5.67v-2.1a.21.21,0,0,1,.21-.21h12.53c.2,0,.2,0,.2-.21v-1.89s.83-14.06-10.68-14.06c-10.89,0-10.48,13.43-10.48,14.9V398c0,12.59,8,14.48,11.1,14.48C460.07,412.69,459.86,401.57,459.86,401.36Zm-13.35-9.86c0-.84.62-3.57,2.47-3.57,2.26,0,2.26,3.36,2.26,4v1.25c0,.21,0,.42-.21.42h-4.31c-.21,0-.21-.21-.21-.42V391.5ZM165.88,412.9c-7.19,0-11.51-5.45-11.51-14.9v-1.89c0-9.44,4.11-14.9,11.51-14.9,7.19,0,11.5,5.46,11.5,14.9V398C177.38,407.45,173.07,412.9,165.88,412.9Zm2.26-16.79c0-6.29-.62-8-2.26-8s-2.26,1.68-2.26,8V398c0,6.3.61,8,2.26,8s2.26-1.68,2.26-8ZM164,379.53c.2,0,.41,0,.41-.21v-5.45c0-.21,0-.42-.41-.42h-6c-.2,0-.41,0-.41.42v5.45a.45.45,0,0,0,.41.42C158.69,379.53,164,379.53,164,379.53Zm9.65,0c.21,0,.42,0,.42-.21v-5.45c0-.21,0-.42-.42-.42h-6c-.21,0-.41,0-.41.42v5.45a.44.44,0,0,0,.41.42C168.34,379.53,173.68,379.53,173.68,379.53Zm80.95,33.37c-7.19,0-11.51-5.45-11.51-14.9v-1.89c0-9.44,4.11-14.9,11.51-14.9,7.19,0,11.5,5.46,11.5,14.9V398C266.13,407.45,261.82,412.9,254.63,412.9Zm2.26-16.79c0-6.29-.62-8-2.26-8s-2.26,1.68-2.26,8V398c0,6.3.61,8,2.26,8s2.26-1.68,2.26-8Zm-76.22-14.27c.2-.42,3.29-6.3,3.49-6.71s.21-.42.62-.42h4.31a.44.44,0,0,1,.41.42v6.71c0,.21,0,.42.21.42h4.52c.2,0,.41,0,.41.21V389c0,.21,0,.21-.21.21h-4.72c-.21,0-.21,0-.21.21v13.43a2.71,2.71,0,0,0,2.88,3.15,15.52,15.52,0,0,0,1.85-.21c.2,0,.2,0,.2.21v5.87c0,.21,0,.21-.2.42a27.5,27.5,0,0,1-5.55.63c-3.29,0-8.22-1-8.22-8V389.4c0-.21,0-.21-.2-.21h-2.88c-.2,0-.2-.21-.2-.42v-6.51a.2.2,0,0,1,.2-.21h2.67A.91.91,0,0,0,180.67,381.84Zm146.48,9c0,.21.2.21.41.21h4.73c.2,0,.41,0,.41-.21v-8.4c0-.21,0-.42-.41-.42h-3.7c-.21,0-.21,0-.41.42a14.29,14.29,0,0,0-.83,2.1c-.2.21-.2.21-.41,0-.61-.21-2.26-2.52-6.16-2.52s-7.81,3.57-7.81,9,2.47,7.55,3.09,8.18,1.43,1.05,4.51,2.1c2.88.84,2.68.84,3.09,1.05a2.31,2.31,0,0,1,1.23,2.1c0,1.47-1.23,2.1-2.67,2.1a4.75,4.75,0,0,1-4.11-3.36c0-.21,0-.42-.62-.42h-4.93c-.41,0-.41.21-.41.63v8.39c0,.21,0,.42.21.42h4.93a.73.73,0,0,0,.41-.21,14,14,0,0,1,.82-1.89c.21-.21.21,0,.21.21a6.11,6.11,0,0,0,5.13,2.52c3.7,0,8.84-2.1,8.84-9.44,0-6.09-3.29-7.77-4.11-8.4-1.24-.84-4.73-1.89-5.76-2.31-.61-.21-2.46-1-2.46-2.72,0-1.26,1.44-2.1,2.67-2.1,2.47,0,3.7,1.68,3.7,2.31C327.15,390.66,327.15,390.87,327.15,390.87Zm59.78,22c-7.19,0-11.5-5.45-11.5-14.9v-1.89c0-9.44,4.31-14.9,11.5-14.9s11.51,5.46,11.51,14.9V398C398.44,407.45,394.33,412.9,386.93,412.9Zm2.26-16.79c0-6.29-.61-8-2.26-8s-2.26,1.68-2.26,8V398c0,6.3.62,8,2.26,8s2.26-1.68,2.26-8Zm89.57,16.16a.45.45,0,0,1-.41-.42V391.5c0-.84-.2-2.52-2.87-2.52a2.73,2.73,0,0,0-2.67,2.73v12.8c0,.42.2.42.41.42a11.37,11.37,0,0,1,2.46.84c.41.21.41.42.41.63v5c0,.42,0,.63-.41.63H461.1c-.41,0-.41-.21-.41-.42v-5.45c0-.42.2-.42.41-.63.2,0,2-.63,2.26-.63s.41,0,.41-.42V389a.21.21,0,0,0-.21-.21c-.2,0-2.46-.84-2.87-.84-.21,0-.21-.21-.21-.42v-5.25a.21.21,0,0,1,.21-.21H471a.45.45,0,0,1,.41.42v4c0,.42.2.21.41,0,.21-.42,2.26-4.83,8.42-4.83,5.14,0,6.78,4,6.78,7.77v15.32c0,.42.21.42.41.42s2.26.84,2.67.84c.42.21.42.21.42.42v5.24c0,.42,0,.63-.42.63C487.19,412.48,478.76,412.27,478.76,412.27ZM278.25,386.88c0,.21-.41.42-.41,0v-4.2a.44.44,0,0,0-.41-.42H267.16c-.41,0-.21.21-.21.21v5.25c0,.21,0,.21.21.42.21,0,2.67.84,2.88.84a.2.2,0,0,1,.2.21v15.53c0,.42-.2.42-.41.42s-2.05.63-2.26.63-.41.21-.41.63v5.45a.45.45,0,0,0,.41.42h14.59c.41,0,.41-.21.41-.63v-5c0-.21,0-.42-.41-.63a17,17,0,0,1-2.47-.84.45.45,0,0,1-.41-.42V394.64c0-3.56,2.26-4.4,3.9-4.4a27.66,27.66,0,0,1,2.88.21c.41,0,.41-.21.41-.42v-8c0-.63,0-1.05-.61-.84-1,.21-6,1.05-7.61,5.67Zm68.62,11.75c.21,0,.21,0,.21-.21v-7.55c0-.21,0-.21-.41-.21h-11.1c-.2,0-.41,0-.41.42v7.34a.45.45,0,0,0,.41.42C336.6,398.63,346.87,398.63,346.87,398.63Z
										transform="translate(-120.48 -371.56)"></path>
									<path
										d=M360.43,404.51v-6.3c0-.21,0-.42.41-.42h3.7c1.23,0,11.3.21,11.3-13.43S361.87,372,359.4,372H347.9s-.21,0-.21.42v5.87c0,.21.21.21.41.42.21,0,2.06.63,2.47.63.2,0,.41,0,.41.42V404.3c0,.42-.21.42-.41.42s-2.06.63-2.26.63-.41.21-.41.63v5.66a.44.44,0,0,0,.41.42h15.2c.41,0,.41-.21.41-.63v-5.24c0-.21,0-.42-.41-.63a16.81,16.81,0,0,1-2.46-.84C360.64,404.93,360.43,404.93,360.43,404.51ZM366,384.36c0,2.94-.41,6.3-5.55,6.3-.2,0-.41,0-.41-.42V379.32c0-.21.41-.42.41-.42C365.57,378.9,366,382.47,366,384.36Zm-53.83-2.31H301.88c-.21,0-.41,0-.41.21v4.41c0,.21-.21.21-.21,0s-1.85-5.67-6.78-5.67c-8.83,0-8,14.27-8,18.68,0,2.31.21,12.59,8.22,12.59,2.67,0,5.14-2.31,5.34-2.52s.41-.21.41.21v2.94c0,1.68-.82,3.36-2.67,3.36s-2.46-1.05-2.46-1.26,0-.21-.42-.21h-6.57c-.2,0-.2.21-.2.42,0,.42,1,7.35,10.06,7.35,10.68,0,10.89-9.45,10.89-13V389.19c0-.42.21-.42.41-.42.62.21,2.26-.42,2.67-.42.21,0,.41,0,.41-.42v-5.67A.62.62,0,0,0,312.15,382.05ZM300.44,400.1c0,1-.61,5.25-2.46,5.25-2.67,0-2.47-6.51-2.47-7.56s-.2-9,2.26-9,2.67,4.19,2.67,4.61Zm-67-18.68c-2.67,0-5.14,2.73-5.34,2.94s-.41.21-.41-.21V372.4c0-.21,0-.42-.42-.42H215.8c-.41,0-.21.21-.21.21v5.24c0,.21,0,.21.21.42.21,0,2.67.84,2.88.84a.2.2,0,0,1,.2.21v32.74c0,.42,0,.63.41.63h5.14c.2,0,.41,0,.41-.21s1.64-2.93,1.64-3.14c.21-.21.21-.21.21,0a7.61,7.61,0,0,0,7,4c4.32,0,8.22-4.4,8.22-14.48V393.8C241.89,391.29,241.07,381.42,233.47,381.42Zm-3.08,24.35c-2.47,0-2.67-4.2-2.67-4.62v-6.51c0-1.05.61-5.24,2.46-5.24,2.67,0,2.47,6.5,2.47,7.55C232.65,397.79,232.85,405.77,230.39,405.77Zm-95.74-34.21c-5.34,0-14.17,4.4-14.17,20.57,0,16.37,6.77,21,13.55,21,5.14,0,8-2.73,9.25-5.24.2-.42.2-.42.41,0,0,.42.82,4,.82,4.19s.21.21.41.21h5.34c.21,0,.21-.21.21-.42V398.42c0-.42.2-.42.41-.42h1.85a.45.45,0,0,0,.41-.42v-6.29c0-.42-.21-.42-.21-.42h-16s-.21,0-.21.42v6.29a.45.45,0,0,0,.42.42H140c.21,0,.41,0,.41.42,0,3.15-1,5.46-4.31,5.46-2.88,0-4.32-2.52-4.73-5.88a50.52,50.52,0,0,1-.41-5.87,54.09,54.09,0,0,1,.41-5.88c.41-3.57,2.06-6.3,5.14-6.3,4.31,0,5.34,5.25,5.55,6.72,0,.42.41.42.82.42h6.78c.82,0,.82-.42.82-.84V373c0-.63,0-.84-.62-.84h-3.08c-.2,0-.41,0-.41.42-.2.21-1.23,2.52-1.85,3.77C143.69,375.13,141.43,371.56,134.65,371.56Z
										transform="translate(-120.48 -371.56)"></path>
								</svg> </a>
							<p> <strong>Grundades 1813 som Göteborgs-Posten.</strong><br>
								<strong>Ansvarig utgivare:</strong> Christofer Ahlqvist<br> <br>
								<strong>Adress:</strong> Göteborgs-Posten, Polhemsplatsen
								5,<br> 405 02 Göteborg Sverige<br> <br> <strong>Telefon:</strong> 031-62 40 00 </p>
						</div>
						<ul class=c-footer__links>
							<li>
								<h5>Mina sidor</h5>
							</li>
							<li><a href=http://www.gp.se/prenumerera class=apphide>Prenumerera</a></li>
							<li><a href=https://info.gp.se/annons/>Annonsera </a> </li> <li><a href=http://www.gp.se/egp
										class=apphide>E-tidningen</a></li>
							<li><a href=https://www.gp.se/korsord/>Korsord </a> </li> <li><a
										href=https://info.gp.se/kundservice/ class=apphide>Kundservice</a></li>
						</ul>
						<ul class=c-footer__links>
							<li>
								<h5>Sociala medier</h5>
							</li>
							<li><a href=https://www.facebook.com/goteborgsposten>Facebook </a> </li> <li><a
										href=https://www.instagram.com/goteborgsposten>Instagram </a> </li> <li><a
											href=https://www.linkedin.com/company/g-teborgs-posten/>Linkedin </a> </li>
											<li><a href=https://twitter.com/goteborgsposten>Twitter </a> </li> </ul> <ul
												class=c-footer__links>
							<li>
								<h5>Om GP</h5>
							</li>
							<li> <a
									href="https://system.webday.se/SLM/rekrytera/cgi-shl/User_Applicants.exe?districtId=1">Lediga
									tjänster</a> </li>
							<li><a href=https://www.gp.se/dokument/1.6177376>Regler & Villkor</a> </li> <li><a
										href=https://www.gp.se/dokument/1.6177862>Cookies </a> </li> <li><a
											href=https://www.gp.se/dokument/1.6174623>Integritetspolicy </a> </li>
											<li><a href=https://info.gp.se/>Om GP</a> </li> </ul> </div> <div
												class="o-container c-footer__mediagroup"> <a
													href=https://www.stampen.com/> <svg
													class="FooterMediaGroup__LogoSvg-num02c-2 c-footer__stampen ieZBiZ"
													viewBox="0 0 405.493 149.688" xmlns=http://www.w3.org/2000/svg
													enable-background="0 0 405.493 149.688">
													<symbol id=icon-user viewBox="0 0 24 24" fill=none
														stroke=currentColor stroke-linecap=round stroke-linejoin=round
														stroke-width=2>
														<title>user</title>
														<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
														<circle cx=12 cy=7 r=4></circle>
													</symbol>
													<symbol id=icon-newspaper viewBox="0 0 24 24" fill=currentColor
														height=24 width=24>
														<title>newspaper</title>
														<path
															d="M21 6v-3h-21v16.5c0 0.828 0.672 1.5 1.5 1.5h20.25c1.243 0 2.25-1.007 2.25-2.25v-12.75h-3zM19.5 19.5h-18v-15h18v15zM3 7.5h15v1.5h-15zM12 10.5h6v1.5h-6zM12 13.5h6v1.5h-6zM12 16.5h4.5v1.5h-4.5zM3 10.5h7.5v7.5h-7.5z">
														</path>
													</symbol>
													<symbol id=icon-logout viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>logout</title>
														<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
														<polyline points="16 17 21 12 16 7"></polyline>
														<line x1=21 x2=9 y1=12 y2=12></line>
													</symbol>
													<symbol id=icon-offer viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>offer</title>
														<polyline points="20 12 20 22 4 22 4 12"></polyline>
														<rect height=5 width=20 x=2 y=7></rect>
														<line x1=12 x2=12 y1=22 y2=7></line>
														<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
														<path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
													</symbol>
													<symbol id=icon-arrow-down viewBox="0 0 16 9">
														<title>arrow</title>
														<path
															d="M7.248 8.505L.4 1.85A1.062 1.062 0 0 1 .4.317a1.138 1.138 0 0 1 1.577 0l6.06 5.889L14.095.318a1.139 1.139 0 0 1 1.577 0 1.06 1.06 0 0 1 0 1.532L8.825 8.505a1.128 1.128 0 0 1-.789.317 1.13 1.13 0 0 1-.788-.317z">
														</path>
													</symbol>
													<symbol id=icon-comments viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>comments</title>
														<path
															d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
														</path>
													</symbol>
													<symbol id=icon-search viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>Sök</title>
														<circle cx=11 cy=11 r=8></circle>
														<line x1=21 x2=16.65 y1=21 y2=16.65></line>
													</symbol>
													<symbol id=icon-location viewBox="0 0 24 24" fill=currentColor
														height=21 width=23 stroke=none>
														<title>Superlokalt</title>
														<path
															d="M12 0c-4.142 0-7.5 3.358-7.5 7.5 0 7.5 7.5 16.5 7.5 16.5s7.5-9 7.5-16.5c0-4.142-3.358-7.5-7.5-7.5zM12 12c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z">
														</path>
													</symbol>
													<symbol id=icon-clock viewBox="0 0 24 24" fill=none
														stroke=currentColor stroke-linecap=round stroke-linejoin=round
														stroke-width=2>
														<title>clock</title>
														<circle cx=12 cy=12 r=10></circle>
														<polyline points="12 6 12 12 16 14"></polyline>
													</symbol>
													<symbol id=icon-play viewBox="0 0 24 24" fill=currentColor height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>play</title>
														<polygon points="5 3 19 12 5 21 5 3"></polygon>
													</symbol>
													<symbol id=icon-twitter>
														<title>twitter</title>
														<path
															d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z">
														</path>
													</symbol>
													<symbol id=icon-facebook>
														<title>facebook</title>
														<path
															d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z">
														</path>
													</symbol>
													<symbol id=icon-instagram viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>instagram</title>
														<rect height=20 width=20 x=2 y=2 rx=5 ry=5></rect>
														<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z">
														</path>
														<line x1=17.5 x2=17.5 y1=6.5 y2=6.5></line>
													</symbol>
													<symbol id=icon-copy viewBox="0 0 24 24" fill=none
														stroke=currentColor stroke-linecap=round stroke-linejoin=round
														stroke-width=2>
														<path
															d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71">
														</path>
														<path
															d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71">
														</path>
													</symbol>
													<symbol id=icon-bell viewBox="0 0 32 32">
														<title>Notifikationer</title>
														<path
															d="M30.7,23.9c-2.9-2.5-5.5-6-5.5-14.7c-0.2-5.1-4.4-9.1-9.5-8.9c-4.8,0.2-8.7,4-8.9,8.9c0,8.8-2.7,12.3-5.5,14.7 C0.5,24.6,0,25.6,0,26.6c0,0.6,0.5,1,1,1H11c0.6,2.8,3.3,4.5,6.1,4c2-0.4,3.5-2,4-4h9.9c0.6,0,1-0.5,1-1 C32,25.6,31.5,24.6,30.7,23.9L30.7,23.9z M16,29.7c-1.3,0-2.4-0.8-2.8-2h5.7C18.4,28.9,17.3,29.7,16,29.7L16,29.7z M2.5,25.6 l0.1-0.1C7,21.7,8.8,16.8,8.8,9.2c0-3.9,3.2-7.1,7.1-7.1S23,5.2,23,9.2c0,7.6,1.9,12.5,6.2,16.3l0.1,0.1H2.5z">
														</path>
													</symbol>
													<symbol id=icon-bell-off viewBox="0 0 500 500">
														<title>Notifikationer av</title>
														<path
															d=M414.6,345.74c-32.11-27.77-61.84-67-61.84-164.79a102.77,102.77,0,0,0-205.53,0c0,97.92-29.7,137.06-61.85,164.82a40.7,40.7,0,0,0-14,30.67A11.7,11.7,0,0,0,83,388.13H194a57.22,57.22,0,0,0,112,0H417a11.7,11.7,0,0,0,11.69-11.69,40.47,40.47,0,0,0-14-30.7ZM250,410.3a33.93,33.93,0,0,1-31.77-22.17h63.54A33.93,33.93,0,0,1,250,410.3ZM99.34,364.75a16.86,16.86,0,0,1,1.35-1.32c49-42.31,69.92-96.88,69.92-182.48a79.39,79.39,0,0,1,158.77,0c0,85.52,20.92,140.09,69.95,182.49a16.75,16.75,0,0,1,1.35,1.31Zm0,0
															class=cls-1 style=fill:#aab9be></path>
														<path
															d=M384.67,463.19a18.93,18.93,0,0,1-16.42-9.48L124.5,31.53a18.93,18.93,0,0,1,32.8-18.92L401.05,434.79a18.94,18.94,0,0,1-16.38,28.4Z
															class=cls-2 style=fill:#fff></path>
														<path
															d=M384.65,455.39a11.07,11.07,0,0,1-9.63-5.57L131.27,27.64A11.13,11.13,0,1,1,150.54,16.5L394.29,438.69a11.13,11.13,0,0,1-9.64,16.7Z
															class=cls-1 style=fill:#aab9be></path>
													</symbol>
													<symbol id=icon-star viewBox="0 0 30 30" fill=currentColor>
														<title>Notifikationer</title>
														<path
															d="M8.18 26.58a1.12 1.12 0 01-.63-.2 1.08 1.08 0 01-.43-1.05l1.21-7-5.14-5a1.08 1.08 0 01-.27-1.09 1.06 1.06 0 01.86-.72l7.1-1L14.05 4a1 1 0 01.95-.58A1 1 0 0116 4l3.18 6.43 7.09 1a1.07 1.07 0 01.59 1.82l-5.13 5 1.2 7a1.08 1.08 0 01-1.57 1.14L15 23.14l-6.31 3.32a1.13 1.13 0 01-.51.12zM7.9 25zm7.1-3.6a1.13 1.13 0 01.5.13l5.5 2.84-1-6.12a1.08 1.08 0 01.3-.95l4.4-4.3-6.16-.9a1 1 0 01-.78-.57L15 5.92l-2.75 5.58a1 1 0 01-.79.57L5.31 13l4.44 4.3a1.08 1.08 0 01.31.95L9 24.37l5.5-2.89a1 1 0 01.5-.13zm-.3 1.6zm.61 0zm-6.75-4.48zM8.38 18zM4 13.16zm21.94 0zm-.35-1.08z">
														</path>
													</symbol>
													<symbol id=icon-star-with-dot viewBox="0 0 30 30">
														<path
															d=M8.18,26.58a1.12,1.12,0,0,1-.63-.2,1.08,1.08,0,0,1-.43-1.05l1.21-7-5.14-5a1.08,1.08,0,0,1-.27-1.09,1.06,1.06,0,0,1,.86-.72l7.1-1L14.05,4A1,1,0,0,1,15,3.42h0A1,1,0,0,1,16,4l3.18,6.43,7.09,1a1.07,1.07,0,0,1,.59,1.82l-5.13,5,1.2,7a1.08,1.08,0,0,1-1.57,1.14L15,23.14,8.69,26.46A1.13,1.13,0,0,1,8.18,26.58ZM7.9,25h0Zm7.1-3.6a1.13,1.13,0,0,1,.5.13L21,24.37,20,18.25a1.08,1.08,0,0,1,.3-.95L24.7,13l-6.16-.9a1,1,0,0,1-.78-.57L15,5.92,12.25,11.5a1,1,0,0,1-.79.57L5.31,13,9.75,17.3a1.08,1.08,0,0,1,.31.95L9,24.37l5.5-2.89A1,1,0,0,1,15,21.35ZM14.7,23h0Zm.61,0h0ZM8.56,18.52h0ZM8.38,18h0ZM4,13.16H4Zm21.94,0Zm-.35-1.08Z>
														</path>
														<circle cx=24.92 cy=11.31 r=4.23 fill=#e40000></circle>
													</symbol>
													<symbol id=symbol-stampen viewBox="0 0 405.493 149.688"
														fill=currentColor>
														<title>stampen</title>
														<path
															d="M26.281,66.449c-9.726,0-18.987-3.498-26.086-9.842L0,56.432l8.278-9.906l0.199,0.168 c6.083,5.019,11.817,7.361,18.066,7.361c5.356,0,8.547-2.035,8.547-5.444v-0.174c0-2.851-1.452-6.143-12.249-8.904 C10.311,36.327,2.54,31.899,2.54,19.765v-0.174C2.54,8.425,12.074,0,24.713,0c8.693,0,16.381,2.63,22.846,7.821l0.195,0.154 l-7.27,10.549l-0.22-0.151c-5.792-4.017-10.933-5.971-15.726-5.971c-3.232,0-7.813,2.202-8.024,6.336 c-0.125,2.469,1.423,4.241,4.713,5.409l1.261,0.446c2.266,0.811,4.519,1.614,6.797,2.45c0.734,0.27,1.448,0.523,2.141,0.778 c2.457,0.88,4.573,1.641,6.473,2.55c7.776,3.738,11.24,8.906,11.24,16.749v0.189C49.14,59.11,40.38,66.449,26.281,66.449">
														</path>
														<polygon
															points="215.098,64.921 215.098,24.846 197.966,50.849 197.323,50.849 180.365,25.109 180.365,64.921 166.39,64.921 166.39,2.05 181.58,2.05 197.825,28.005 214.061,2.05 229.425,2.05 229.425,64.921 ">
														</polygon>
														<polygon
															points="70.193,64.921 70.193,14.734 52.733,14.734 52.733,2.05 102.113,2.05 102.113,14.734 84.483,14.734 84.483,64.921 ">
														</polygon>
														<path
															d="M145.021,64.921l-5.373-13.213h-23.892l-5.208,13.213h-15.75l27.215-62.87h11.722l27.394,62.87H145.021z M134.756,39.557l-7.278-18.373l-7.195,18.373H134.756z">
														</path>
														<path
															d="M241.794,64.921V2.052h23.456c15.916,0,23.986,6.462,23.986,19.197c0,13.031-7.643,19.375-23.368,19.375h-9.788 v24.298H241.794z M264.985,28.462c3.522,0,9.431-0.934,9.431-7.213c0-6.311-6.589-7.046-11.547-7.046h-6.788v14.259H264.985z">
														</path>
														<polygon
															points="297.167,64.921 297.167,2.05 340.116,2.05 340.116,15.265 311.453,15.265 311.453,26.35 338.526,26.35 338.526,39.563 311.453,39.563 311.453,51.71 341.701,51.71 341.701,64.921 ">
														</polygon>
														<polygon
															points="389.562,64.921 365.334,26.333 365.334,64.921 351.356,64.921 351.356,2.05 366.135,2.05 389.562,38.765 389.562,2.05 403.881,2.05 403.881,64.921 ">
														</polygon>
														<path
															d="M395.809,130.361c5.365,0,9.684,4.298,9.684,9.659c0,5.353-4.318,9.668-9.684,9.668s-9.676-4.315-9.676-9.668 C386.133,134.659,390.444,130.361,395.809,130.361">
														</path>
														<polygon
															points="144.112,148.651 144.112,108.577 126.976,134.584 126.337,134.584 109.375,108.844 109.375,148.651 95.4,148.651 95.4,85.788 110.595,85.788 126.839,111.739 143.075,85.788 158.436,85.788 158.436,148.651 ">
														</polygon>
														<polygon
															points="170.614,148.651 170.614,85.788 213.559,85.788 213.559,98.997 184.9,98.997 184.9,110.085 211.969,110.085 211.969,123.298 184.9,123.298 184.9,135.444 215.145,135.444 215.145,148.651 ">
														</polygon>
														<path
															d="M226.157,148.651V85.788h20.9c10.795,0,19.846,2.477,26.178,7.168c7.322,5.438,11.037,13.659,11.037,24.443 c0,9.556-3.686,17.601-10.668,23.261c-6.357,5.153-15.125,7.991-24.693,7.991H226.157z M247.327,135.444 c14.684,0,22.127-6.312,22.127-18.751c0-13.047-10.93-17.696-21.16-17.696h-7.848v36.447H247.327z">
														</path>
														<rect height=62.865 width=14.291 x=293.266 y=85.79></rect>
														<path
															d="M365.5,148.651l-5.381-13.203h-23.891l-5.203,13.203h-15.752l27.215-62.863h11.723l27.393,62.863H365.5z M355.237,123.291l-7.283-18.375l-7.195,18.375H355.237z">
														</path>
													</symbol>
													<symbol id=icon-pencil viewBox="0 0 32 32" fill=currentColor
														height=32 width=32>
														<title>pencil</title>
														<path
															d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z">
														</path>
													</symbol>
													<symbol id=icon-users viewBox="0 0 36 32" fill=currentColor>
														<title>users</title>
														<path
															d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
														</path>
														<path
															d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z">
														</path>
													</symbol>
													<symbol id=icon-users-outlined viewBox="0 0 32 32" fill=currentColor
														height=32 width=32>
														<title>users outlined</title>
														<path
															d="M18 21v-2c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464h-8c-1.38 0-2.632 0.561-3.536 1.464s-1.464 2.156-1.464 3.536v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.829 0.335-1.577 0.879-2.121s1.292-0.879 2.121-0.879h8c0.829 0 1.577 0.335 2.121 0.879s0.879 1.292 0.879 2.121v2c0 0.552 0.448 1 1 1s1-0.448 1-1zM14 7c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464-2.632 0.561-3.536 1.464-1.464 2.156-1.464 3.536 0.561 2.632 1.464 3.536 2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536zM12 7c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121 0.335-1.577 0.879-2.121 1.292-0.879 2.121-0.879 1.577 0.335 2.121 0.879 0.879 1.292 0.879 2.121zM24 21v-2c-0.001-1.245-0.457-2.385-1.215-3.261-0.652-0.753-1.528-1.311-2.529-1.576-0.534-0.141-1.081 0.177-1.222 0.711s0.177 1.081 0.711 1.222c0.607 0.161 1.136 0.498 1.528 0.952 0.454 0.526 0.726 1.206 0.727 1.952v2c0 0.552 0.448 1 1 1s1-0.448 1-1zM15.752 4.099c0.803 0.206 1.445 0.715 1.837 1.377s0.531 1.47 0.325 2.273c-0.176 0.688-0.575 1.256-1.105 1.652-0.314 0.235-0.675 0.409-1.063 0.511-0.534 0.14-0.854 0.687-0.713 1.221s0.687 0.854 1.221 0.713c0.637-0.167 1.232-0.455 1.752-0.844 0.884-0.66 1.552-1.613 1.845-2.758 0.342-1.337 0.11-2.689-0.542-3.788s-1.725-1.953-3.062-2.296c-0.535-0.137-1.080 0.186-1.217 0.721s0.186 1.080 0.721 1.217z">
														</path>
													</symbol>
													<symbol id=icon-clock viewBox="0 0 32 32" fill=currentColor
														height=32 width=32>
														<title>clock</title>
														<path
															d="M20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414zM16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z">
														</path>
													</symbol>
													<symbol id=icon-lock viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>lock</title>
														<rect height=11 width=18 x=3 y=11 rx=2 ry=2></rect>
														<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
													</symbol>
													<symbol id=icon-database viewBox="0 0 24 24" fill=none height=24
														width=24 stroke=currentColor stroke-linecap=round
														stroke-linejoin=round stroke-width=2>
														<title>database</title>
														<ellipse cx=12 cy=5 rx=9 ry=3></ellipse>
														<path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
														<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
													</symbol>
													<symbol id=icon-checkbox-checked viewBox="0 0 32 32"
														fill=currentColor>
														<title>checkbox-checked</title>
														<path
															d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z">
														</path>
													</symbol>
													<symbol id=icon-checkbox-unchecked viewBox="0 0 32 32"
														fill=currentColor>
														<title>checkbox-unchecked</title>
														<path
															d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM28 28h-24v-24h24v24z">
														</path>
													</symbol>
													<symbol id=icon-like viewBox="0 0 32 32" fill=currentColor>
														<title>like</title>
														<path
															d="M29.164 10.472c-1.25-0.328-4.189-0.324-8.488-0.438 0.203-0.938 0.25-1.784 0.25-3.286 0-3.588-2.614-6.748-4.926-6.748-1.633 0-2.979 1.335-3 2.977-0.022 2.014-0.645 5.492-4 7.256-0.246 0.13-0.95 0.477-1.053 0.522l0.053 0.045c-0.525-0.453-1.253-0.8-2-0.8h-3c-1.654 0-3 1.346-3 3v16c0 1.654 1.346 3 3 3h3c1.19 0 2.186-0.719 2.668-1.727 0.012 0.004 0.033 0.010 0.047 0.012 0.066 0.018 0.144 0.037 0.239 0.062 0.018 0.005 0.027 0.007 0.046 0.012 0.576 0.143 1.685 0.408 4.055 0.953 0.508 0.116 3.192 0.688 5.972 0.688h5.467c1.666 0 2.867-0.641 3.582-1.928 0.010-0.020 0.24-0.469 0.428-1.076 0.141-0.457 0.193-1.104 0.023-1.76 1.074-0.738 1.42-1.854 1.645-2.58 0.377-1.191 0.264-2.086 0.002-2.727 0.604-0.57 1.119-1.439 1.336-2.766 0.135-0.822-0.010-1.668-0.389-2.372 0.566-0.636 0.824-1.436 0.854-2.176l0.012-0.209c0.007-0.131 0.013-0.212 0.013-0.5 0-1.263-0.875-2.874-2.836-3.434zM7 29c0 0.553-0.447 1-1 1h-3c-0.553 0-1-0.447-1-1v-16c0-0.553 0.447-1 1-1h3c0.553 0 1 0.447 1 1v16zM29.977 14.535c-0.020 0.494-0.227 1.465-1.977 1.465-1.5 0-2 0-2 0-0.277 0-0.5 0.224-0.5 0.5s0.223 0.5 0.5 0.5c0 0 0.438 0 1.938 0s1.697 1.244 1.6 1.844c-0.124 0.746-0.474 2.156-2.163 2.156-1.687 0-2.375 0-2.375 0-0.277 0-0.5 0.223-0.5 0.5 0 0.275 0.223 0.5 0.5 0.5 0 0 1.188 0 1.969 0 1.688 0 1.539 1.287 1.297 2.055-0.319 1.009-0.514 1.945-2.641 1.945-0.719 0-1.631 0-1.631 0-0.277 0-0.5 0.223-0.5 0.5 0 0.275 0.223 0.5 0.5 0.5 0 0 0.693 0 1.568 0 1.094 0 1.145 1.035 1.031 1.406-0.125 0.406-0.273 0.707-0.279 0.721-0.302 0.545-0.789 0.873-1.82 0.873h-5.467c-2.746 0-5.47-0.623-5.54-0.639-4.154-0.957-4.373-1.031-4.634-1.105 0 0-0.846-0.143-0.846-0.881l-0.007-13.812c0-0.469 0.299-0.893 0.794-1.042 0.062-0.024 0.146-0.050 0.206-0.075 4.568-1.892 5.959-6.040 6-9.446 0.006-0.479 0.375-1 1-1 1.057 0 2.926 2.122 2.926 4.748 0 2.371-0.096 2.781-0.926 5.252 10 0 9.93 0.144 10.812 0.375 1.094 0.313 1.188 1.219 1.188 1.531 0 0.343-0.010 0.293-0.023 0.629zM4.5 26c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5zM4.5 28c-0.275 0-0.5-0.225-0.5-0.5s0.225-0.5 0.5-0.5 0.5 0.225 0.5 0.5-0.225 0.5-0.5 0.5z">
														</path>
													</symbol>
													<symbol id=icon-check-circle viewBox="0 0 24 24">
														<title>check_circle</title>
														<path
															d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z">
														</path>
													</symbol>
													<symbol id=icon-exclamation-circle viewBox="0 0 20 20">
														<title>exclamation-solid</title>
														<path
															d="M2.93 17.070c-1.884-1.821-3.053-4.37-3.053-7.193 0-5.523 4.477-10 10-10 2.823 0 5.372 1.169 7.19 3.050l0.003 0.003c1.737 1.796 2.807 4.247 2.807 6.947 0 5.523-4.477 10-10 10-2.7 0-5.151-1.070-6.95-2.81l0.003 0.003zM9 5v6h2v-6h-2zM9 13v2h2v-2h-2z">
														</path>
													</symbol>
													<symbol id=icon-settings viewBox="0 0 24 24" fill=currentColor
														height=24 width=24>
														<path
															d="M21.886 14.303c-1.259-2.181-0.502-4.976 1.691-6.246l-2.358-4.085c-0.674 0.395-1.457 0.622-2.293 0.622-2.52 0-4.563-2.057-4.563-4.594h-4.717c0.006 0.783-0.189 1.577-0.608 2.303-1.259 2.181-4.058 2.923-6.255 1.658l-2.358 4.085c0.679 0.386 1.267 0.951 1.685 1.675 1.257 2.178 0.504 4.967-1.681 6.24l2.358 4.085c0.671-0.391 1.451-0.615 2.283-0.615 2.512 0 4.55 2.044 4.563 4.569h4.717c-0.002-0.775 0.194-1.56 0.609-2.279 1.257-2.177 4.049-2.92 6.244-1.664l2.358-4.085c-0.675-0.386-1.258-0.949-1.674-1.669zM12 16.859c-2.684 0-4.859-2.176-4.859-4.859s2.176-4.859 4.859-4.859c2.684 0 4.859 2.176 4.859 4.859s-2.176 4.859-4.859 4.859z">
														</path>
													</symbol>
													<symbol id=icon-grade viewBox="56.4 124.6 86.2 160">
														<title>grade</title>
														<path
															d="M77.8,201.6H59.2v-21.8h18.6V201.6z M140.2,201.8h-19.4V180h19.4V201.8z M142.6,210.8v-33.2h-21.8v-18 l7.8-8.6l-28-17.8V126c-0.2-0.8-0.8-1.4-1.4-1.4c0,0-0.8,0-1.8,1.4v7.6L70,151l7.8,8.8v17.8H56.4v33.2H70v73.8h58.6v-73.8 L142.6,210.8L142.6,210.8z">
														</path>
													</symbol>
													<symbol id=icon-phone viewBox="0 0 24 24">
														<path
															d="M15 12q0-1.219-0.891-2.109t-2.109-0.891v-2.016q2.063 0 3.539 1.477t1.477 3.539h-2.016zM18.984 12q0-2.906-2.039-4.945t-4.945-2.039v-2.016q3.75 0 6.375 2.625t2.625 6.375h-2.016zM20.016 15.516q0.422 0 0.703 0.281t0.281 0.703v3.516q0 0.422-0.281 0.703t-0.703 0.281q-7.031 0-12.023-4.992t-4.992-12.023q0-0.422 0.281-0.703t0.703-0.281h3.516q0.422 0 0.703 0.281t0.281 0.703v0.047q0 1.922 0.563 3.516 0.094 0.188 0.094 0.328 0 0.469-0.328 0.703l-2.203 2.203q0.938 1.781 2.883 3.727t3.727 2.883l2.203-2.203q0.328-0.328 0.703-0.328 0.141 0 0.328 0.094 1.688 0.563 3.563 0.563z">
														</path>
													</symbol>
													<symbol id=icon-chat viewBox="0 0 24 24">
														<path
															d="M18 8.016v-2.016h-12v2.016h12zM14.016 14.016v-2.016h-8.016v2.016h8.016zM6 9v2.016h12v-2.016h-12zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-14.016l-3.984 3.984v-18q0-0.797 0.586-1.383t1.383-0.586h16.031z">
														</path>
													</symbol>
													<symbol id=icon-share viewBox="0 0 30 30">
														<path
															d=M15,22.77a.8.8,0,0,1-.8-.8V1.34a.8.8,0,0,1,1.6,0V22A.8.8,0,0,1,15,22.77Z>
														</path>
														<path
															d=M9.52,7.31A.81.81,0,0,1,9,7.07.8.8,0,0,1,9,5.94L14.42.48a.79.79,0,0,1,1.13,0,.8.8,0,0,1,0,1.13L10.09,7.07A.8.8,0,0,1,9.52,7.31Z>
														</path>
														<path
															d=M20.48,7.33a.78.78,0,0,1-.57-.23L14.42,1.61A.8.8,0,1,1,15.56.48L21.05,6a.8.8,0,0,1-.57,1.36Z>
														</path>
														<path
															d=M25.16,29.76H4.84a2.41,2.41,0,0,1-2.4-2.41V13.55a2.41,2.41,0,0,1,2.4-2.4h5.78a.8.8,0,0,1,0,1.6H4.84a.8.8,0,0,0-.8.8v13.8a.8.8,0,0,0,.8.8H25.16a.8.8,0,0,0,.8-.8V13.55a.8.8,0,0,0-.8-.8H19.29a.8.8,0,0,1,0-1.6h5.87a2.41,2.41,0,0,1,2.4,2.4v13.8A2.41,2.41,0,0,1,25.16,29.76Z>
														</path>
													</symbol>
													<symbol id=icon-phone-material>
														<path d="M0 0h24v24H0z" fill=none></path>
														<path
															d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z">
														</path>
													</symbol>
													<symbol id=icon-arrow-ios>
														<path
															d="M4.29642509,11.9999996 L12.7875444,3.27301622 C13.0763983,2.97613862 13.0698938,2.50130943 12.7730162,2.21245555 C12.4761386,1.92360167 12.0013094,1.93010618 11.7124556,2.22698378 L2.71245555,11.4769838 C2.42918148,11.7681266 2.42918148,12.2318734 2.71245555,12.5230162 L11.7124556,21.7730162 C12.0013094,22.0698938 12.4761386,22.0763983 12.7730162,21.7875444 C13.0698938,21.4986906 13.0763983,21.0238614 12.7875444,20.7269838 L4.29642509,11.9999996 Z">
														</path>
													</symbol>
													<use href=#symbol-stampen></use>
													</svg>
												</a>
												<div>
													<strong>Göteborgs-Posten ingår i Stampen Media, tillsammans med</strong>
													<a href=https://www.gp.se/ target=_blank>Göteborgs-Posten</a> <a
														href=http://www.bohuslaningen.se/
														target=_blank>Bohusläningen</a> <a href=https://www.hn.se/
														target=_blank>Hallands Nyheter</a> <a
														href=https://www.hallandsposten.se/
														target=_blank>Hallandsposten</a> <a
														href=https://kungsbackaposten.se/
														target=_blank>Kungsbacka-Posten</a> <a
														href=https://kungalvsposten.se/
														target=_blank>Kungälvs-Posten</a> <a
														href=https://molndalsposten.se/
														target=_blank>Mölndals-Posten</a> <a
														href=https://www.stromstadstidning.se/ target=_blank>Strömstads
														Tidning</a> <a href=https://www.ttela.se/
														target=_blank>TTELA</a> <a href=http://www.alingsaskuriren.se/
														target=_blank>Alingsås-Kuriren</a> <a
														href=https://www.lerumstidning.se/ target=_blank>Lerums
														Tidning</a> <a href=https://www.sttidningen.se/
														target=_blank>ST-tidningen</a> <a
														href=https://www.partilletidning.se/ target=_blank>Partille
														Tidning</a> <a href=https://www.nyavarbergsposten.se/
														target=_blank>Nya Varbergsposten</a> <a
														href=https://www.alingsastidning.se/ target=_blank>Alingsås
														Tidning</a> <a href=http://www.vtd.se/ target=_blank>Västsvensk
														Tidningsdistribution</a> <a href=https://wallstreetmedia.se/
														target=_blank>Wallstreet Media</a> </div>
					</div>
					<style>
						.c-article__body__content .article__review__content .article__review__content__grade svg {
							display: none
						}
					</style>
					<img src="https://inviso.rampanel.com/ram/Inviso?i=15376&c=90&t=6&cg=1&r=1&rdir=1"style=display:none> </footer>
			</div>
	</div>
	<script id="__NEXT_DATA__" type="application/json">
		{"props":{"pageProps":{"translations":{"ts_404_button":"KOLLA VÅRA BÄSTA RABATTKODER","ts_404_link":"GÅ TILL STARTSIDAN","ts_404_subtitle":"Tyvärr, sidan du försöker hitta finns inte.","ts_404_text":"VÄLJ ETT AV DESSA ALTERNATIV:","ts_404_title":"404-SIDA","ts_best_offer_label":"Bästa rabattkod","ts_breadcrumbs_label_allShops":"Alla butiker","ts_breadcrumbs_label_home":"Hem","ts_breadcrumbs_label_search":"Sök","ts_breadcrumbs_label_top20":"Top 20","ts_caption_1":"Rabatt","ts_caption_2":"Lägsta ordervärde","ts_caption_3":"Kunder","ts_caption_4":"Varumärke","ts_caption_5":"Krav","ts_contact_form_email_error":"Felaktig mailadress","ts_contact_form_email_placeholder":"Email","ts_contact_form_error_message_heading":"Något gick fel. Var god försök igen.","ts_contact_form_input_required_error":"Detta fält måste fyllas i.\n","ts_contact_form_message_placeholder":"Meddelande","ts_contact_form_name_placeholder":"Namn","ts_contact_form_privacy_terms":"Jag har läst \u003ca target=\"_blank\" href=\"https://rabattkod.gp.se/integritetspolicy\"\u003e\u003c/a\u003eSekretesspolicy och godkänner att min persondata behandlas av GP Rabattkoder befattande min förfrågan.","ts_contact_form_reason_select_options":"[\"Förfrågan\", \"Hjälp\", \"Vad tycker du om sidan?\"]","ts_contact_form_reason_select_placeholder":"Välj","ts_contact_form_recaptcha_button_label":"Klick","ts_contact_form_recaptcha_snackbar_message":"Vänligen godkänn Googles ReCaptchas sekretesspolicy","ts_contact_form_send_button_label":"Skicka","ts_contact_form_success_message_heading":"Ditt mail har skickats","ts_desktop_menu_show_more_title":"Visa mera","ts_disclaimer_text":"Alla erbjudanden på denna sida är annonser","ts_error_button2_url":"NOT CREATED YET","ts_filters_all":"Alla ","ts_filters_codes":"Rabattkoder","ts_filters_deals":"Erbjudanden","ts_filters_exclusive":"Exklusiva","ts_filters_expsoon":"Utgår snart","ts_filters_free_delivery":"Fri frakt","ts_filters_verified":"Verifierade","ts_footer_consent_label":"Cookies inställningar","ts_footer_label":"GP Rabattkoder","ts_gad_header_image_alt":"GP Rabattkoder för Sverige","ts_gad_offer_label_times_used":"Används för #min minut(er) sedan","ts_homepage_voucher_expire_on_label":"Utgångsdatum","ts_nav_menu_mobile_title":"Meny","ts_placeholder_date":"oktober 2022","ts_placeholder_exclusive":"Exklusiv","ts_placeholder_expsoon":"Går snart ut","ts_placeholder_platform":"GP Rabattkoder","ts_placeholder_voucher_kw":"Rabattkod","ts_recaptcha_consent_message":"Vänligen acceptera Googles recaptcha-policy","ts_rlp_best_historical_coupon_button":"Gå vidare till butiken","ts_rlp_expired_vouchers_title":"Utgångna NLY MAN rabattkoder","ts_rlp_load_more_vouchers":"Se mer","ts_rlp_popular_shop_title":"Mest populära butiker","ts_rlp_rating_thank_you":"Tack för din röst","ts_rlp_rating_widget_subtitle":"Ranking: %average_vote% (%total_votes% votes)","ts_rlp_rating_widget_title":"Betygsätt våra NLY MAN rabattkoder","ts_rlp_search_all_results":"Se alla resultat","ts_rlp_search_input":"Sök på butiker","ts_rlp_search_no_results":"Tyvärr, din sökning gav inga resultat.","ts_rlp_search_offers":"Tillgängliga rabattkoder","ts_rlp_search_results_title":"Resultat:","ts_rlp_share_code_widget_title":"Dela","ts_rlp_similar_shop_title":"Butiker i samma kategori som NLY MAN","ts_rlp_similar_vouchers_title":"Rabattkoder till liknande butiker som NLY MAN","ts_rlp_submit_code_widget_link_label":"Ange din rabattkod här","ts_rlp_submit_code_widget_subtitle":"Meddela oss om vi saknar en rabattkod!","ts_rlp_submit_code_widget_title":"Har du en rabattkod att dela med oss?","ts_rlp_subscription_button_label":"Prenumerera","ts_rlp_subscription_email_error":"Ogiltig mejladress","ts_rlp_subscription_heading":"Signa upp på nyhetsbrevet för att ta del av erbjudanden från NLY MAN och liknande butiker!","ts_rlp_subscription_input_placeholder":"E-postadress","ts_rlp_subscription_response400":"Registreringen misslyckades. Vänligen testa igen!","ts_rlp_subscription_success_heading":"Du är nästan där!","ts_rlp_subscription_success_subheading":"Vänligen klicka på länken som skickats till din mejl för att verifiera ditt konto. ","ts_rlp_subscription_terms":"Få de senaste exklusiva rabattkoderna och erbjudandena från NLY MAN samt andra butiker.\nRegistrera dig här för att få sparmöjligheter från \u003ca target=“_blank” href=\"https://www.tradera.com/rabattkoder/sekretess-policy#section02\"\u003eGlobal Savings Group\u003c/a\u003e via email. Jag har läst \u003ca target=“_blank” href=\"https://www.tradera.com/rabattkoder/sekretess-policy#section05\"\u003eSekretesspolicyn\u003c/a\u003e.\nIntegritetsmeddelande: Du kan \u003ca target=“_blank” href=\"https://www.tradera.com/rabattkoder/sekretess-policy#section05\"\u003eavprenumerera\u003c/a\u003e från utskick av email närsomhelst.","ts_rlp_summary_widget_cashback":"Cashback värde upp till","ts_rlp_summary_widget_codes":"Rabattkoder","ts_rlp_summary_widget_exclusive":"Exklusiv rabattkod","ts_rlp_summary_widget_freedelivery":"Antal fri frakt rabatter","ts_rlp_summary_widget_highest_discount":"Högsta rabatt","ts_rlp_summary_widget_highest_reward":"Högsta belöning","ts_rlp_summary_widget_hourago":"timmar sedan","ts_rlp_summary_widget_lastupdated":"Senast uppdaterad:\t","ts_rlp_summary_widget_offer_thisweek":"Nya rabattkoder denna vecka","ts_rlp_summary_widget_title":"Översikt av våra rabattkoder","ts_rlp_summary_widget_today":"idag","ts_rlp_summary_widget_total_offers":"Antal rabatter","ts_rlp_summary_widget_verified_offers":"Veriferade rabattkoder","ts_rlp_summary_widget_yesterday":"igår","ts_search_alternative_header_subtitle":"Oroa dig inte! Vi adderar nya erbjudanden varje dag! Kolla snart sidan igen för nya koder och erbjudanden. Du kan även kontrollera din stavning och försöka igen","ts_search_alternative_header_title":"Det finns inga resultat som överensstämmer med: \"#search-term\"\n","ts_search_header_subtitle":"Aktiva rabatter","ts_search_header_title":"Sökresultat för:  \"#search-term\"","ts_search_popular_shop_title":"Populära butiker","ts_search_result_retailers_tab_label":"Butiker","ts_search_result_retailers_tab_load_more_label":"Mer","ts_search_result_voucher_section_button_label":"Alla koder","ts_search_result_voucher_section_title":"Kolla in dagens bästa erbjudanden","ts_search_result_vouchers_tab_label":"Rabattkoder","ts_seo_text_widget_read_less_button":"Se mindre","ts_seo_text_widget_read_more_button":"Se mer","ts_submit_coupon_form_code_placeholder":"Rabattkod","ts_submit_coupon_form_date_label":"Utgångsdatum","ts_submit_coupon_form_description_placeholder":"Beskrivning","ts_submit_coupon_form_email_error":"E-post är inte giltig.","ts_submit_coupon_form_email_placeholder":"E-post","ts_submit_coupon_form_error_message_heading":"Något gick fel. Var god försök igen.","ts_submit_coupon_form_input_required_error":"Detta fält är obligatoriskt.","ts_submit_coupon_form_name_placeholder":"Namn","ts_submit_coupon_form_privacy_terms":"Jag har läst \u003ca target=\"_blank\" href=\"https://rabattkod.gp.se/integritetspolicy\"\u003e\u003c/a\u003eSekretesspolicy och godkänner att min persondata behandlas av GP Rabattkoder befattande min förfrågan.","ts_submit_coupon_form_recaptcha_button_label":"Klick","ts_submit_coupon_form_recaptcha_snackbar_message":"Vänligen godkänn Googles ReCaptchas sekretesspolicy","ts_submit_coupon_form_send_button_label":"Skicka in","ts_submit_coupon_form_success_message_heading":"Tack!","ts_subscribed_subtitle":"Du kommer att få våra bästa rabattkoder och rabatter levererade direkt till din inkorg. Glad shopping!","ts_subscribed_title":"Jippi! Du har framgångsrikt registrerat dig till vårt nyhetsbrev.","ts_subscription_reward_already_signed":"Du har redan registrerat dig för denna reward","ts_subscription_reward_button_label":"Få reward","ts_subscription_reward_general_error":"Något gick fel, var vänligen att ladda om sidan","ts_subscription_reward_heading":"Ta del av uppdateringar om rewards:","ts_subscription_reward_option_text":"Ja, skicka mig rabattkoder och erbjudanden","ts_subscription_reward_placeholder":"Din e-postadress","ts_subscription_reward_terms":"Genom att ange min e-postadress ovan godkänner jag att ta emot nyhetsbrev från GP Rabattkoder (\u003ca target=\"_blank\" href=\"https://rabattkod.gp.se/integritetspolicy/\"\u003e GP Rabattkoder \u003c/a\u003e) med rabatter och koder. Jag har läst och accepterat integritetspolicyn.","ts_terms_see_less_label":"Se mindre","ts_terms_see_more_label":"Se mer","ts_top20_popular_shop_title":"Populära butiker","ts_unsubscribed_title":"Du har avslutat din prenumeration från vår listan.","ts_voucher_code_cta_label":"Visa rabattkod","ts_voucher_code_cta_tooltip":"NLY MAN sida kommer att öppnas i en ny flik","ts_voucher_code_label":"Rabattkod","ts_voucher_deal_cta_label":"Visa rabatt","ts_voucher_deal_cta_tooltip":"NLY MAN sida kommer att öppnas i en ny flik","ts_voucher_deal_label":"Rabatt","ts_voucher_expired_on_label":"Utgångsdatum: %exp_date%","ts_voucher_expires_today":"Utgår idag","ts_voucher_expires_tomorrow":"Utgår imorgon","ts_voucher_grid_show_less":"Se mindre","ts_voucher_popup_back_label":"Gå till butiken","ts_voucher_popup_code_copied":"Rabattkoden är kopierad","ts_voucher_popup_copy_code":"Kopiera rabattkod","ts_voucher_popup_expiration_label":"Utgångsdatum: oktober 2022","ts_voucher_popup_feedback_question":"Fungerade koden?","ts_voucher_popup_feedback_thank_you":"Tack för din feedback","ts_voucher_popup_goToShop_cta_label":"Gå till butiken","ts_voucher_popup_goToShop_tooltip":"Butikens webbplats öppnas i en ny flik","ts_voucher_popup_no_code_required":"Inget behov av en rabattkod","ts_voucher_popup_reward_complete_body":"Gå direkt till butiken och genomför ditt köp. Inget behov av en rabattkod, bara se till att ditt köp uppfyller villkoren. ","ts_voucher_popup_reward_complete_title":"Genomför ditt köp","ts_voucher_popup_reward_how_it_works":"Hur det fungerar","ts_voucher_popup_reward_please_wait":"Var god att vänta..","ts_voucher_popup_reward_receive_body":"Mottag din reward direkt ner i din inkorg. Hela processen tar mellan 1-3 månader.","ts_voucher_popup_reward_receive_title":"Mottag din reward","ts_voucher_popup_reward_share_email_body":"Dela din e-postadress med oss så vi kan hålla dig uppdaterad om din belöning. Du kommer få 3 e-postmeddelanden från oss som uppdaterar dig om statusen för din reward.","ts_voucher_popup_reward_share_email_title":"Ange din e-postadress","ts_voucher_popup_reward_submitted":"Första steget avklarat!","ts_voucher_popup_share_options_title":"Dela denna rabatt","ts_voucher_popup_subscription_heading":"Signa upp på nyhetsbrevet för att få del av NLY MAN rabattkoder och rabatter direkt i din inkorg.","ts_voucher_popup_suggestions_title":"Se också dessa rabattkoder:","ts_voucher_popup_terms_label":"Villkor","ts_voucher_reward_cta_label":"Se gåva","ts_voucher_reward_cta_tooltip":"NLY MAN sida kommer att öppnas i en ny flik","ts_voucher_reward_label":"Reward","ts_voucher_tag_branded":"Exklusiv","ts_voucher_tag_editors_pick":"Vi rekommenderar","ts_voucher_tag_exclusive":"Exklusiv","ts_voucher_tag_expiring_soon":"Utgår snart","ts_voucher_tag_free_delivery":"Gratis frakt","ts_voucher_tag_verified":"Verifierad","ts_voucher_terms":"Villkor","ts_voucher_type_code":"Rabattkod","ts_voucher_type_deal":"Rabatt","ts_voucher_type_reward":"Gåva"},"configs":{"allShopsUrl":"/butiker","couponShapeOnVoucher":"true","disableOfferLabelDeal":"true","disableSearchGlobalNav":"[\"Home\"]","disclaimerExpandButton":"false","disclaimerNoPaper":"true","domainUrl":"https://rabattkod.gp.se","enableDisclaimer":"true","faviconUrl":"https://rabattkod.gp.se/assets/images/favicon.ico","fonts":"{\n  \"customFonts\": [{\n    \"fontFamily\": \"Gothia Serif\",\n    \"fontUrl\": \"https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSans-Regular.woff2\",\n    \"fontType\": \"woff2\",\n    \"fontWeight\": 400,\n    \"fontDisplay\": \"swap\"\n  }, {\n    \"fontFamily\": \"Gothia Serif\",\n    \"fontUrl\": \"https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Medium.woff2\",\n    \"fontType\": \"woff2\",\n    \"fontWeight\": 600,\n    \"fontDisplay\": \"swap\"\n  },\n  {\n    \"fontFamily\": \"Gothia Serif\",\n    \"fontUrl\": \"https://rabattkod.gp.se/assets/fonts/GothiaSerif/GothiaGPSerif-Bold.woff2\",\n    \"fontType\": \"woff2\",\n    \"fontWeight\": 700,\n    \"fontDisplay\": \"swap\"\n  }]\n}","footerSeparator":"line","globalNavColor":"primary","gtmId":"GTM-P4ZJTLF","hideNavMenu":"[\"Gad\"]","homepageUrl":"/","imageCDN":"https://dxrhpnm3x1ev1.cloudfront.net","locale":"sv-SE","navBarContainerWidth":"false","popularShopVariant":"logo","rakutenScriptBody":"(function ttt(t,n){var e,r=document.createElement(\"script\"),a=document.getElementsByTagName(\"script\")[0],o={cb:n},i=20;e=function(){window.___RMCMPW\u0026\u0026\"function\"==typeof window.___RMCMPW ? window.___RMCMPW(o):i\u003c1?o.cb({status:3,isGdpr:function(){var t=[\"DE\",\"UK\",\"GB\",\"FR\",\"IT\",\"ES\",\"PL\",\"NL\",\"RO\",\"BE\",\"CZ\",\"SE\",\"HU\",\"EL\",\"GR\",\"PT\",\"AT\",\"OE\",\"DK\",\"FI\",\"SK\",\"IE\",\"BG\",\"HR\",\"LT\",\"LV\",\"SI\",\"EE\",\"CY\",\"LU\",\"MT\",\"150\",\"039\",\"151\",\"154\",\"155\"],n=[].concat(navigator.languages||[]);n.push(navigator.userLanguage||navigator.language||\"\");for(var e=null,r=0;r\u003cn.length;r++)for(var a=n[r].split(\"-\"),o=a.length\u003e6?6:a.length,i=1;i\u003co;i++)if(e=!0,t.indexOf(a[i].toUpperCase())\u003e1)return!0;return null==e\u0026\u0026null}()}):(i=1,window.setTimeout(e, 100))},r.setAttribute(\"src\",t),a.parentNode.insertBefore(r,a),e()} (\"//tag.rmp.rakuten.com/123440.ct.js\",function(co){}));","rlpBestHistoricalBackground":"primary","rlpFAQExpanded":"false","rlpFlexibleContentContanerised":"false","rlpHeaderLogoPosition":"right","rlpNewsletterPosition":"4","rlpSavingTipsUseIcon":"true","rlpSidebarPosition":"right","rlpVideoVariant":"2","rlpWidgetOrder":"{\n\t\"main\": [\n\t\t\"active-vouchers\", \n                \"expired-vouchers\",\n\t\t\"main-1\", \n\t\t\"main-2\",\n\t\t\"similar-vouchers\",\n\t\t\"main-3\", \n\t\t\"main-4\", \n\t\t\"main-5\", \n\t\t\"main-6\",\n                \"html-widget\",\n                \"feature-snippet\",\n                \"breadcrumbs\"\n\t],\n\t\"sidebar\": [\"summary-widget\",\n\t\t\"rating\",\n\t\t\"sidebar-1\", \n\t\t\"sidebar-2\", \n\t\t\"similar-shops\",\n\t\t\"popular-shops\",\n\t\t\"sidebar-3\", \n\t\t\"sidebar-4\", \n\t\t\"sidebar-5\", \n\t\t\"sidebar-6\", \n\t\t\"sidebar-7\", \n\t\t\"sidebar-8\",\n                \"submit-code\",\n                \"share-code\"\n\t],\n\t\"header\": [\n\t\t\"retailer-header\"\n\t]\n}","rlpWrappedWidgets":"[\"default\",\"flexible-content\",\"faq-widget\",\"publisher-content\",\"best-historical-coupon-theme-c2\",\"saving-tips-theme-a-c2\",\"saving-possibilities-theme-c2\",\"video\",\"feature-snippet\"]","searchResultsPageUrl":"https://rabattkod.gp.se/search?query=","similarShopVariant":"logo","styleGuide":"","submitCodeLink":"https://rabattkod.gp.se/user/submit","svgOfferLabelCode":"true","top20Url":"basta-rabattkoderna","voucherCTAButton":"184","voucherPopupAlign":"left"},"globalNav":[{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Hem","foreignKey":null,"url":"https://rabattkod.gp.se/"},{"buttonType":1,"seeAllTitle":"Se alla butiker","children":[{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Arket","foreignKey":"2fe60ba0-233e-4de2-9091-9cca0f1bca76","url":"arket"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Boohoo","foreignKey":"5236e171-08a2-4847-9e94-95f4960df024","url":"boohoo"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"CDON","foreignKey":"63c1d8c8-7dda-449b-8215-c5bf5fb3e76f","url":"cdon"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Coop","foreignKey":"d08147d3-28ae-489a-9968-1692ad295f55","url":"coop"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Disney+","foreignKey":"7ed7a2a4-9609-4368-98ad-b58c4168db5d","url":"disney-plus"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Ellos","foreignKey":"62cb765b-6abe-46df-b2ef-dc73daf9b780","url":"ellos"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"HelloFresh","foreignKey":"49666da6-c5d9-459e-b367-dc69193e7be5","url":"hellofresh"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Hotels.com","foreignKey":"893b5633-c619-4ec6-a203-9a8342458656","url":"hotels-com"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"MEDS","foreignKey":"8a9fe4eb-2baa-4fab-8fc1-9f1ed986d017","url":"meds"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Miinto","foreignKey":"79526b59-e58d-41d7-a455-be066fe11081","url":"miinto"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Milrab","foreignKey":"0e3efa13-7e8d-49fc-8282-f43329d01b1f","url":"milrab"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"MyFujifilm","foreignKey":"fd962997-4d3c-4f35-beda-02f0a644c49d","url":"myfujifilm"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"NA-KD","foreignKey":"73d0e582-2b6d-4521-8503-15984e6eae7a","url":"na-kd"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Nelly","foreignKey":"31b84a37-19f6-42bf-866e-0fd118d2b125","url":"nelly"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Nextory","foreignKey":"8206c5cd-ad7a-4d4b-84f3-ef2e55e52a3a","url":"nextory"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Power","foreignKey":"f5462117-f757-4e20-9272-9f9cb81ce2fe","url":"power"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Weekday","foreignKey":"6bfe05b9-61ab-4746-82ff-6493aec41a6e","url":"weekday"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Zalando","foreignKey":"0c909ed0-ea51-471c-8ba2-c590daa0631e","url":"zalando"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Zara","foreignKey":"18be6f3f-34ba-409c-b4ac-ce438a15b9f6","url":"zara"},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Matsmart","foreignKey":"33d71221-d735-4fad-816f-e00392c74741","url":"matsmart"}],"imageUrl":null,"seeAllButton":true,"seeAllUrl":"https://rabattkod.gp.se/butiker","partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":1,"title":"Alla butiker","foreignKey":null,"url":null},{"buttonType":0,"seeAllTitle":null,"children":[],"imageUrl":null,"seeAllButton":false,"seeAllUrl":null,"partnerId":"6598f8de42724d6ab2a0486fc3637422","childrenType":0,"title":"Topp 20","foreignKey":null,"url":"https://rabattkod.gp.se/topp20"}],"footerLinks":[{"items":[{"caption":"Företagsuppgifter","nofollow":false,"pos":0,"url":"https://rabattkod.gp.se/foretagsuppgifter"},{"caption":"Om oss","nofollow":false,"pos":1,"url":"https://rabattkod.gp.se/om-oss"},{"caption":"Integritetspolicy","nofollow":false,"pos":2,"url":"https://rabattkod.gp.se/integritetspolicy"},{"caption":"Kontakt","nofollow":false,"pos":3,"url":"https://rabattkod.gp.se/kontakt"},{"caption":"FAQ","nofollow":false,"pos":4,"url":"https://rabattkod.gp.se/faq"},{"caption":"Cookies","nofollow":false,"pos":5,"url":"https://rabattkod.gp.se/cookies"}]}],"theme":{"mobile":{"interactionColor":"secondary","iconType":"Outlined","palette":{"primary":{"main":"#1E2D37","light":"#BDCFDB","dark":"#121B21","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"},"secondary":{"main":"#0A5582","light":"#A0D7F8","dark":"#052E47","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"},"tertiary":{"main":"#008F64","light":"#99FFE1","dark":"#004D36","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"},"success":{"main":"#008F64","light":"rgb(89, 147, 64)","dark":"rgb(33, 84, 11)","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"error":{"main":"#721c24","light":"rgb(214, 51, 51)","dark":"rgb(142, 0, 0)","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"warning":{"main":"#ed6c02","light":"#ff9800","dark":"#e65100","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"info":{"main":"#0288d1","light":"#03a9f4","dark":"#01579b","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"background":{"paper":"#FFFFFF","default":"#F1F2F3"},"text":{"primary":"#1F2225","secondary":"#5D656F","hint":"#B7BCC3","disabled":"#B7BCC3"},"grey":{"50":"#FAFAFA","100":"#F1F2F3","200":"#ECEEF0","300":"#E3E5E7","400":"#B7BCC3","500":"#959DA7","600":"#5D656F","700":"#4D545C","800":"#3A3F45","900":"#1F2225","A100":"#D5D5D5","A200":"#AAAAAA","A400":"#616161","A700":"#303030"},"action":{"active":"rgba(31, 34, 37, 0.54)","hover":"rgba(31, 34, 37, 0.04)","selected":"rgba(31, 34, 37, 0.08)","focus":"rgba(31, 34, 37, 0.12)","disabledBackground":"rgba(31, 34, 37, 0.12)","disabled":"rgba(31, 34, 37, 0.26)"},"common":{"black":"#000000","white":"#FFFFFF"},"sustainability":{"main":"#2EB755","background":"#EDFEF2","text":"#1D522C"},"divider":"#E3E5E7","borderColor":"#E3E5E7","menuColor":"#FFFFFF","heroHeaderBackground":"transparent","sectionBackground":"transparent","interaction":{"main":"#0A5582","light":"#A0D7F8","dark":"#052E47","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"}},"typography":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","htmlFontSize":"16px","fontWeightLight":300,"fontWeightRegular":400,"fontWeightMedium":400,"fontWeightBold":700,"h1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"32px","fontWeight":700,"letterSpacing":"0px","lineHeight":"40px","textTransform":"none"},"h2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"28px","fontWeight":700,"letterSpacing":"0px","lineHeight":"36px","textTransform":"none"},"h3":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"22px","fontWeight":700,"letterSpacing":"0px","lineHeight":"32px","textTransform":"none"},"h4":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"h5":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"h6":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":700,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"body1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"body2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"14px","fontWeight":400,"letterSpacing":"0px","lineHeight":"20px","textTransform":"none"},"button":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"1rem","fontWeight":700,"letterSpacing":"0.05em","lineHeight":1.75,"textTransform":"uppercase"},"caption":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0px","lineHeight":"16px","textTransform":"none"},"caption1Big":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"24px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"32px","textTransform":"inherit"},"caption2Big":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"uppercase"},"caption1Small":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"inherit"},"caption2Small":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"uppercase"},"chip":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.025em","lineHeight":"16px","textTransform":"uppercase"},"overline":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.1em","lineHeight":"16px","textTransform":"uppercase"},"subtitle1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"subtitle2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0px","lineHeight":"16px","textTransform":"none"},"tag1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.025em","lineHeight":"16px","textTransform":"uppercase"},"tag2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.025em","lineHeight":"16px","textTransform":"none"},"tooltip":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"9.6px","fontWeight":400,"letterSpacing":"0px","lineHeight":"14px","textTransform":"none"},"voucherTitle":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"14px","fontWeight":400,"letterSpacing":"0px","lineHeight":"20px","textTransform":"none"},"voucherTitleTest":{"fontFamily":"\"Roboto\", sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0px","lineHeight":"16px","textTransform":"none"},"caption1Test":{"fontFamily":"\"Roboto\", sans-serif","fontSize":"18px","fontWeight":500,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"uppercase"},"caption2Test":{"fontFamily":"\"Roboto\", sans-serif","fontSize":"12px","fontWeight":500,"letterSpacing":"inherit","lineHeight":"16px","textTransform":"uppercase"},"tag1Test":{"fontFamily":"\"Roboto\", sans-serif","fontSize":"8px","fontWeight":500,"letterSpacing":"0px","lineHeight":"10px","textTransform":"uppercase"},"tag2Test":{"fontFamily":"\"Roboto\", sans-serif","fontSize":"8px","fontWeight":400,"letterSpacing":"0px","lineHeight":"10px","textTransform":"none"}},"transitions":{"easing":{"easeInOut":"cubic-bezier(0.4, 0, 0.2, 1)","easeOut":"cubic-bezier(0.0, 0, 0.2, 1)","easeIn":"cubic-bezier(0.4, 0, 1, 1)","sharp":"cubic-bezier(0.4, 0, 0.6, 1)"},"duration":{"shortest":150,"shorter":200,"short":250,"standard":300,"complex":375,"enteringScreen":225,"leavingScreen":195}},"shape":{"borderRadius":"0px","borderRadiusLarge":"8px","borderRadiusSmall":"0px","borderRadiusChip":"24px","borderRadiusButton":"21px","borderRadiusInputField":"21px"},"shadows":{"0":"none","1":"0px 1px 2px rgba(0, 0, 0, 0.07)","2":"0px 2px 4px rgba(0, 0, 0, 0.08)","3":"0px 3px 6px rgba(0, 0, 0, 0.09)","4":"0px 4px 8px rgba(0, 0, 0, 0.1)","5":"0px 5px 10px rgba(0, 0, 0, 0.11)","6":"0px 6px 12px rgba(0, 0, 0, 0.12)","7":"0px 7px 14px rgba(0, 0, 0, 0.13)","8":"0px -1px 16px rgba(0, 0, 0, 0.14)","9":"0px 9px 18px rgba(0, 0, 0, 0.15)","10":"0px 10px 20px rgba(0, 0, 0, 0.16)","11":"0px 11px 22px rgba(0, 0, 0, 0.17)","12":"0px 12px 24px rgba(0, 0, 0, 0.18)","13":"0px 13px 26px rgba(0, 0, 0, 0.19)","14":"0px 14px 28px rgba(0, 0, 0, 0.2)","15":"0px 15px 30px rgba(0, 0, 0, 0.21)","16":"0px 16px 32px rgba(0, 0, 0, 0.22)","17":"0px 17px 34px rgba(0, 0, 0, 0.23)","18":"0px 18px 36px rgba(0, 0, 0, 0.24)","19":"0px 19px 38px rgba(0, 0, 0, 0.25)","20":"0px 20px 40px rgba(0, 0, 0, 0.26)","21":"0px 21px 42px rgba(0, 0, 0, 0.27)","22":"0px 22px 44px rgba(0, 0, 0, 0.28)","23":"0px 23px 46px rgba(0, 0, 0, 0.29)","24":"0px 24px 48px rgba(0, 0, 0, 0.3)"},"zIndex":{"mobileStepper":1000,"fab":1050,"speedDial":1050,"appBar":1100,"drawer":1200,"modal":1300,"snackbar":1400,"tooltip":1500},"spacing":{"3XL":8,"2XL":6,"XL":4,"L":2.5,"M":2,"S":1.5,"XS":1,"2XS":0.5},"borderWidth":{"large":"2px","regular":"1px"},"containerWidth":{"default":"1290px","seoContent":"640px","ctaWidth":"210px","cutSize":"24px"}},"tablet":{"interactionColor":"secondary","iconType":"Outlined","palette":{"primary":{"main":"#1E2D37","light":"#BDCFDB","dark":"#121B21","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"},"secondary":{"main":"#0A5582","light":"#A0D7F8","dark":"#052E47","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"},"tertiary":{"main":"#008F64","light":"#99FFE1","dark":"#004D36","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"},"success":{"main":"#008F64","light":"rgb(89, 147, 64)","dark":"rgb(33, 84, 11)","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"error":{"main":"#721c24","light":"rgb(214, 51, 51)","dark":"rgb(142, 0, 0)","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"warning":{"main":"#ed6c02","light":"#ff9800","dark":"#e65100","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"info":{"main":"#0288d1","light":"#03a9f4","dark":"#01579b","contrastText":"#FFFFFF","contrastTextOnLight":"#FFFFFF","contrastTextOnDark":"#FFFFFF"},"background":{"paper":"#FFFFFF","default":"#F1F2F3"},"text":{"primary":"#1F2225","secondary":"#5D656F","hint":"#B7BCC3","disabled":"#B7BCC3"},"grey":{"50":"#FAFAFA","100":"#F1F2F3","200":"#ECEEF0","300":"#E3E5E7","400":"#B7BCC3","500":"#959DA7","600":"#5D656F","700":"#4D545C","800":"#3A3F45","900":"#1F2225","A100":"#D5D5D5","A200":"#AAAAAA","A400":"#616161","A700":"#303030"},"action":{"active":"rgba(31, 34, 37, 0.54)","hover":"rgba(31, 34, 37, 0.04)","selected":"rgba(31, 34, 37, 0.08)","focus":"rgba(31, 34, 37, 0.12)","disabledBackground":"rgba(31, 34, 37, 0.12)","disabled":"rgba(31, 34, 37, 0.26)"},"common":{"black":"#000000","white":"#FFFFFF"},"sustainability":{"main":"#2EB755","background":"#EDFEF2","text":"#1D522C"},"divider":"#E3E5E7","borderColor":"#E3E5E7","menuColor":"#FFFFFF","heroHeaderBackground":"transparent","sectionBackground":"transparent","interaction":{"main":"#0A5582","light":"#A0D7F8","dark":"#052E47","contrastText":"#FFFFFF","contrastTextOnLight":"#1F2225","contrastTextOnDark":"#FFFFFF"}},"typography":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","htmlFontSize":"16px","fontWeightLight":300,"fontWeightRegular":400,"fontWeightMedium":400,"fontWeightBold":700,"h1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"40px","fontWeight":700,"letterSpacing":"0px","lineHeight":"48px","textTransform":"none"},"h2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"32px","fontWeight":700,"letterSpacing":"0px","lineHeight":"40px","textTransform":"none"},"h3":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"24px","fontWeight":700,"letterSpacing":"0px","lineHeight":"32px","textTransform":"none"},"h4":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"20px","fontWeight":700,"letterSpacing":"0px","lineHeight":"28px","textTransform":"none"},"h5":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"h6":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":700,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"body1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"body2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"14px","fontWeight":400,"letterSpacing":"0px","lineHeight":"20px","textTransform":"none"},"button":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"1rem","fontWeight":700,"letterSpacing":"0.05em","lineHeight":1.75,"textTransform":"uppercase"},"caption":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0px","lineHeight":"16px","textTransform":"none"},"caption1Big":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"24px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"32px","textTransform":"inherit"},"caption2Big":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"uppercase"},"caption1Small":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"inherit"},"caption2Small":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":700,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"uppercase"},"chip":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"14px","fontWeight":400,"letterSpacing":"0.025em","lineHeight":"20px","textTransform":"uppercase"},"overline":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.1em","lineHeight":"16px","textTransform":"uppercase"},"subtitle1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"subtitle2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"16px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"tag1":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.025em","lineHeight":"16px","textTransform":"uppercase"},"tag2":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"12px","fontWeight":400,"letterSpacing":"0.025em","lineHeight":"16px","textTransform":"none"},"tooltip":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"9.6px","fontWeight":400,"letterSpacing":"0px","lineHeight":"14px","textTransform":"none"},"voucherTitle":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"voucherTitleTest":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":400,"letterSpacing":"0px","lineHeight":"24px","textTransform":"none"},"caption1Test":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"28px","fontWeight":500,"letterSpacing":"inherit","lineHeight":"30px","textTransform":"uppercase"},"caption2Test":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"18px","fontWeight":500,"letterSpacing":"inherit","lineHeight":"24px","textTransform":"uppercase"},"tag1Test":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"10px","fontWeight":500,"letterSpacing":"0px","lineHeight":"12px","textTransform":"uppercase"},"tag2Test":{"fontFamily":"\"Gothia Serif\",sans-serif","fontSize":"10px","fontWeight":400,"letterSpacing":"0px","lineHeight":"12px","textTransform":"none"}},"transitions":{"easing":{"easeInOut":"cubic-bezier(0.4, 0, 0.2, 1)","easeOut":"cubic-bezier(0.0, 0, 0.2, 1)","easeIn":"cubic-bezier(0.4, 0, 1, 1)","sharp":"cubic-bezier(0.4, 0, 0.6, 1)"},"duration":{"shortest":150,"shorter":200,"short":250,"standard":300,"complex":375,"enteringScreen":225,"leavingScreen":195}},"shape":{"borderRadius":"0px","borderRadiusLarge":"8px","borderRadiusSmall":"0px","borderRadiusChip":"24px","borderRadiusButton":"21px","borderRadiusInputField":"21px"},"shadows":{"0":"none","1":"0px 1px 2px rgba(0, 0, 0, 0.07)","2":"0px 2px 4px rgba(0, 0, 0, 0.08)","3":"0px 3px 6px rgba(0, 0, 0, 0.09)","4":"0px 4px 8px rgba(0, 0, 0, 0.1)","5":"0px 5px 10px rgba(0, 0, 0, 0.11)","6":"0px 6px 12px rgba(0, 0, 0, 0.12)","7":"0px 7px 14px rgba(0, 0, 0, 0.13)","8":"0px -1px 16px rgba(0, 0, 0, 0.14)","9":"0px 9px 18px rgba(0, 0, 0, 0.15)","10":"0px 10px 20px rgba(0, 0, 0, 0.16)","11":"0px 11px 22px rgba(0, 0, 0, 0.17)","12":"0px 12px 24px rgba(0, 0, 0, 0.18)","13":"0px 13px 26px rgba(0, 0, 0, 0.19)","14":"0px 14px 28px rgba(0, 0, 0, 0.2)","15":"0px 15px 30px rgba(0, 0, 0, 0.21)","16":"0px 16px 32px rgba(0, 0, 0, 0.22)","17":"0px 17px 34px rgba(0, 0, 0, 0.23)","18":"0px 18px 36px rgba(0, 0, 0, 0.24)","19":"0px 19px 38px rgba(0, 0, 0, 0.25)","20":"0px 20px 40px rgba(0, 0, 0, 0.26)","21":"0px 21px 42px rgba(0, 0, 0, 0.27)","22":"0px 22px 44px rgba(0, 0, 0, 0.28)","23":"0px 23px 46px rgba(0, 0, 0, 0.29)","24":"0px 24px 48px rgba(0, 0, 0, 0.3)"},"zIndex":{"mobileStepper":1000,"fab":1050,"speedDial":1050,"appBar":1100,"drawer":1200,"modal":1300,"snackbar":1400,"tooltip":1500},"spacing":{"3XL":11,"2XL":8,"XL":6,"L":4,"M":3,"S":2,"XS":1,"2XS":0.5},"borderWidth":{"large":"2px","regular":"1px"},"containerWidth":{"default":"1290px","seoContent":"640px","ctaWidth":"210px","cutSize":"24px"}}},"page":{"seo_follow":true,"seo_index":true,"seo_meta_title":"NLY MAN rabattkod: 20% Rabattkod för oktober 2022 - GP.se","seo_meta_description":"Här hittar du alla aktiva \u0026 giltiga NLY MAN kuponger under 2022","id_client":"6598f8de42724d6ab2a0486fc3637422","enable_script_injection":false,"content_head_script":null,"page_type":"Rlp","publish_status":"PUBLISHED","redirection_type":null,"crm_flag":true,"redirect_url":null,"title":"NLY MAN","url":"nly-man","id_voucher_list":"rlp_6598f8de42724d6ab2a0486fc3637422_se_536"},"retailer":{"id_merchant":48030,"id_merchant_pool":536,"image_alt":"NLY MAN rabattkod","logo":"/images/n/NLYMAN.png","name":"NLY MAN","quality_pos":5,"monetized":true},"widgets":[{"widget_api_mapping":"wtRightSideBar1","canBeUsedByTableOfContent":true,"widget_type":"saving-possibilities-theme-c2","widgetData":{"stories":[{"title":" ","description":"Du som ny kund får ta del av en 20% NLY MAN rabattkod när du blir medlem. Glöm inte att prenumerera på deras nyhetsbrev också när du skapar din profil. Då missar du aldrig några rabattkoder och rabatter. Som medlem har du också stenkoll på dina beställningar och din orderhistorik. Du kan även spara dina favoriter om du vill lägga beställningen vid ett senare tillfälle. "}],"retailerStoryWidgetTitle":"Bli medlem och spara mer","widget_type":"saving-possibilities-theme-c2"}},{"widget_type":"faq-widget","widget_api_mapping":"wtMainColumn1","widget_data":{"title":"Andra frågar också","sections":[{"question":"Finns det NLY MAN studentrabatt?","answer":"\u003cp\u003eJajamensan! Du som student kan ta del av en NLY MAN rabattkod som gör ditt köp 10% billigare. Du behöver bara verifiera dig som student och handla genom ditt studentkort.\u003c/p\u003e"},{"question":"Har NLY MAN en storleksguide?","answer":"\u003cp\u003eDet finns ingen storleksguide hos NLY MAN. Det står dock info om hur lång modellen är vilken storlek han bär, vilket brukar vara hjälpsamt!\u003c/p\u003e"},{"question":"Erbjuder NLY MAN rabatt för nya kunder?","answer":"\u003cp\u003eJa, alla nya kunder får 20% rabatt på sitt första köp. Denna får man tillgång till när man blir medlem.\u003c/p\u003e"}]}},{"widget_api_mapping":"wtFeaturedSnippet","canBeUsedByTableOfContent":false,"widget_type":"featured-snippet","widgetData":{"table_data":{"position":"below_expired_vouchers","rows":4,"config":[{"headerPlaceholder":"Description","headerName":"Beskrivning:","placeholder":"%voucher_title"},{"headerPlaceholder":"Caption","headerName":"Rabatt:","placeholder":"%voucher_caption"},{"headerPlaceholder":"Expires","headerName":"Giltig till:","placeholder":"%expiration_date"}]},"table_title":"Populära NLY MAN rabattkoder hos GP Rabattkoder","widget_type":"featured-snippet","table_type":"type_1"}},{"widget_api_mapping":"wtRightSideBar2","canBeUsedByTableOfContent":true,"widget_type":"default","widgetData":{"description":"Ibland finns det inte alltid en NLY MAN kupong tillgänglig. Detta behöver dock inte betyda att du inte kan spara ändå. NLY MAN har nämligen en stor rea-avdelning där du alltid hittar produkter med sänkt pris. Du kan klicka dig runt bland olika kategorier för att hitta det du söker. Allt i rean är nedsatt med upp till 70% rabatt, helt galet bra priser alltså. Det är bara att shoppa loss! ","section":"sidebar widgets","title":"Fynda i NLY MAN rea","widget_type":"default"}},{"widget_api_mapping":"wtMainColumn2","canBeUsedByTableOfContent":true,"widget_type":"saving-tips-theme-a-c2","widgetData":{"savingTipsWidgetTitle":"Spara ännu mer hos NLY MAN","tips":[{"title":"Fri frakt och gratis retur","description":"Genom att beställa för mer än 399 kr garanterar du fri frakt på din order från NLY MAN. Du får dessutom gratis retur på ditt köp ifall något inte skulle passa eller du ångrat dig helt enkelt. ","icon":"images/media/30/s/SavingTipsIcon_ThemeC2_Shipping.png","backgroundType":"primary"},{"title":"Följ NLY MAN på Instagram","description":"Håll koll på trender och nyheter genom att följa NLY MAN på Instagram. Förutom en massa inspiration på outfits får du också ta del av NLY MAN rabattkoder, kampanjer, när de släpper rean och utvalda erbjudanden som du bara inte vill missa.","icon":"images/media/30/s/SavingTipsIcon_ThemeC2_APP.png","backgroundType":"secondary"}],"widget_type":"saving-tips-theme-a-c2","useImage":false}},{"widget_api_mapping":"wtRightSideBar3","canBeUsedByTableOfContent":true,"widget_type":"default","widgetData":{"description":"NLY MAN erbjuder mode på nätet för unga killar. Deras sortiment består av trendiga kläder från 100 kända varumärken. Det finns allt från kläder till skor och accessoarer, som passar till olika typer av tillfällen. Oavsett om du är på jakt efter sportkläder eller en ny festoutfit hittar du det hos NLY MAN. ","section":"sidebar widgets","title":"Om NLY MAN","widget_type":"default"}},{"widget_api_mapping":"wtExpiredVouchersWidget","canBeUsedByTableOfContent":false,"widget_type":"expired-vouchers","expired_codes":[{"voucher_type":0,"branded_voucher":false,"caption_1":"20%","caption_2":"Rabattkod","captions":[],"code":"...ing","creation_time":"2022-07-07T11:07:47.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"Y2J0bHVMU0xRRDVXUloyR1kyTldCbHMvRGoxTkVOd1AxRWpKY0ZXWllXY0pDUTJkVzF4VFhNVTJ0dGJNYWFKc1pXWjNDOVYwemlpeE5OY2NEd2gyTWpHbmwwSmRUVHRNTWxqeld6VW89NFlVSjJOVXVOV1lrNXl4WVdYWWxrV1FCTlFaUmpOYWpqMW1HWnpaWVpUbHltbVV5aWtYbGtOVGxZTXkxemRXT3dZODJNU0JOVHZpRUpua1lDWUMwNFU0Uk0wek5FWlZPbFFUNVIwTWFEVWtYRjBqMVp4ckVESmxNZEpWPU5KRDVlWkw1a3lrVWNjTW5vWXpZWnphVzMwNjAwY1E-01","end_time":"2022-08-22T21:59:59.000Z","exclusive_voucher":false,"id_pool":"se_609970","id_voucher":779502,"id_voucher_pool":609970,"start_time":"2022-07-07T11:07:00.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Bli medlem och spara 20% på ditt första köp med en NLY MAN rabattkod","verified":"2022-07-07T09:07:06.000Z"},{"voucher_type":0,"branded_voucher":false,"caption_1":"20%","caption_2":"Rabattkod","captions":[],"code":"...T20","creation_time":"2022-08-03T12:20:48.000Z","description":null,"editors_pick":false,"encrypted_affiliate_url":"a1R5ZHpHMHZKaGp5ellFUTJZR01BaGJPUW96NVpiUmxkNFhTSjM5TVcweD1sTUhSMFd6MlpZYUdNREc5MzExYnUyeVprbEZkVGlaam9SY0l4VVZhT0JUSldZMmhOY05lVVRrV2IyWXlGbHl3c1IxcG13ZDV6bmhaOTRZMFVpTU50UlRZWFlFdE50RWptNVFaalhkM2dZMklMY2JTdEpqcFprRVdEMGQyTWpiVXp6TVc5a05ibVpZM0R5OXlSVVpkYWNWRVljWWw1d1pCNENkVkxra2xGTkRkM0d1cG16SVE-01","end_time":"2022-08-07T21:59:00.000Z","exclusive_voucher":false,"id_pool":"se_611827","id_voucher":781788,"id_voucher_pool":611827,"start_time":"2022-08-03T12:19:01.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"NLY MAN rabattkod ger dig 20% rabatt på bästsäljare - passa på!","verified":"2022-08-03T10:19:05.000Z"}],"expired_deals":[{"voucher_type":1,"branded_voucher":false,"caption_1":"70%","caption_2":"Rabatt","captions":[],"code":"","creation_time":"2022-07-07T11:06:43.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"cGNRZHVFZGlYaFZRWlVXamsxOGp5TW9uaWxNbGNKMW5FbWprTlRtOG1ZeTAwTmJoRnlaUTJ3Vz15ZFRaWXowazhMMTFWRkhua3dETms5dzlHVWRHTmJPWUo5eXlUaGpKZHBUZFczSVR0MnlNWVFNTTBWdldKVEpZMm00RjA1d21EeVpSdUVOUk5jUk5RTTFNMk1TWnlWemtZVkVYV2xqWW13WjMyUllWUXlManRKTk1ZWWNVeDBXPTNteVVXT2pNY2xrMFpKanRNV1R6V1FNVmsxV0ZnYmpjcGp6VlVONU94YWx5NE5Xa2lERmF3NUdiaFNKd1liWjBWUkpMajJRTVpNWWJEVll5bVN4cA--01","end_time":"2022-08-31T21:59:00.000Z","exclusive_voucher":false,"id_pool":"se_609969","id_voucher":779501,"id_voucher_pool":609969,"start_time":"2022-07-07T11:06:23.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Sommarrea hos NLY MAN - spara upp till 70% på tusentals plagg","verified":null}]},{"widget_api_mapping":"wtGuru","canBeUsedByTableOfContent":false,"widget_type":"guru","data":{"guru":{"key":"63","id_config":"6598f8de42724d6ab2a0486fc3637422_guru","name":"Per Andersson","name_internal":"Per Andersson","image":"/images/e/expert_per-andersson_2.png","image_alt":"Rabattkod","googleplus_id":null},"guru_text":null}},{"widget_api_mapping":"wtHeader","canBeUsedByTableOfContent":false,"widget_type":"header","widgetData":{"subtitle":"Här hittar du alla aktiva \u0026 giltiga NLY MAN kuponger under 2022","title":"Spara med en NLY MAN rabattkod hos GP Rabattkoder","widget_type":"header"}},{"widget_api_mapping":"wtRlpMonetizedVoucher","canBeUsedByTableOfContent":false,"widget_type":"monetized-vouchers","widgetData":{"widget_type":"monetized-vouchers"}},{"widget_api_mapping":"wtPopularShopsWidget","canBeUsedByTableOfContent":false,"widget_type":"popular-shops","popular_shops":[{"url":"asos","label":"ASOS","logo":"/images/a/Asos.png","image_alt":"ASOS rabattkod"},{"url":"designlite","label":"Designlite","logo":"/images/d/Designlite.png","image_alt":"Designlite rabattkod"},{"url":"f-secure","label":"F-Secure","logo":"/images/f/Fsecure_Logo.png","image_alt":"F-Secure rabattkod"},{"url":"hemtex","label":"Hemtex","logo":"/images/h/Hemtex.png","image_alt":"Hemtex rabattkod"},{"url":"jd-sports","label":"JD Sports","logo":"/images/j/JD-Sports.png","image_alt":"JD Sports rabattkod"},{"url":"kidsbrandstore-se","label":"KidsBrandStore","logo":"/images/k/KidsBrandStore.png","image_alt":"KidsBrandStore rabattkod"},{"url":"luxplus","label":"Luxplus","logo":"/images/l/Luxplus.png","image_alt":"Luxplus rabattkod"},{"url":"smarta-saker","label":"SmartaSaker","logo":"/images/s/smartasakernewlogo.png","image_alt":"Smartasaker rabattkod"},{"url":"tt-line","label":"TT-Line","logo":"/images/t/TT-Line.png","image_alt":"TT-Line rabattkod"},{"url":"adidas","label":"adidas","logo":"/images/a/adidas.png","image_alt":"adidas rabattkod"}]},{"widget_api_mapping":"wtSimilarShopsWidget","canBeUsedByTableOfContent":false,"getSimilarShops":[{"url":"jack-jones","label":"Jack \u0026 Jones","logo":"/images/j/Jack_Jones.png","image_alt":"Jack and Jones rabattkod"},{"url":"john-henric","label":"John Henric","logo":"/images/j/John-Henric.png","image_alt":"John Henric rabattkod"},{"url":"sneakersnstuff","label":"Sneakersnstuff","logo":"/images/s/Sneakersnstuff.png","image_alt":"Sneakersnstuff rabattkod"}]},{"widget_api_mapping":"wtSimilarVouchers","canBeUsedByTableOfContent":false,"widgetData":[{"voucher_type":0,"branded_voucher":false,"caption_1":"Fri","caption_2":"Frakt","captions":[],"code":"...T22","creation_time":"2022-10-12T11:23:36.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"bmh6R2NZUmxIWmkzUW5VUmRZTU1WYnViVW1Renl5Q2FYTXlXMDJTMDFXMlpsTFNOYU1adlUyVE1UZFpWYjV4TE1QeVdRaXhOUlpZd1hkakZXRFlVdTBrWmpHR2t6alJWNjFKVjJsbGpRampsY2tYdVhUR0dmVWxsejlsV080VWRaeFdtR1JsbWtkSmRka1NuVDRtRmJ5eT1sWGJ4cFZuQmFUMXpjdVlOeXlKZElRUmMxYlZNNFZNM0JHVnpXaURFUlkwUEN3bD1kcGw4YnB4anBFYkp1M3phYUFXYTl2YXoyMnlXeFlGV1kweEF6YlltUk0ySnpRWFFkbD0wR1gwRlRiM1NKSkVsTVpHWnpFVEowV2xkMk1oMkVHWWpGWTJKSjFOaDgzdEVtVnB1d1JTTkhsQjVKTnhWeUNGc25iSmlrWkdjVHpSTU5zMU8yZDJ6Y2xFSmZJTk10TTMxbFNYV1lSRnpWNVRMSTN2WWpaRU5HVlJtTVFNSXcxbDA-01","end_time":"2022-11-02T22:59:00.000Z","exclusive_voucher":false,"id_pool":"se_605313","id_voucher":786258,"id_voucher_pool":605313,"start_time":"2022-04-14T20:00:00.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Nu får du gratis frakt på din beställning med Zalando Lounge rabattkod","verified":"2022-04-13T17:22:42.000Z","rlp_thin_page":{"url":"zalando-lounge","label":"Zalando Lounge","logo":"/images/l/Logo_Zalando-Lounge_06-08-2021.png","image_alt":"Zalando Lounge rabattkod"},"retailer":{"id_merchant_pool":2926,"name":"Zalando Lounge"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"15%","caption_2":"Rabattkod","captions":[],"code":"...ail","creation_time":"2022-10-12T11:55:15.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"VjlpQ1FZV3R2UUJXY2hXMGRYSkVITmo0WlRQUEJZSTFYPVpUYWtDYkx2RnpOSkczQmtQWWNXM3dVRVdOSFlqd1JoWmJab2RPbWJEU1RkM1pvTVZ1V1Mwb1k1UndiMlpXPVp0VG1YRkdybmE1VjlOWlN6VEU5MlowTVlhbk4zOXpiY1djbk84ZEhZTnVJMnlObXpkeUZtaGE5ajZOcVVtZERaamJ4Skp6aGx3UlJtUnpoWVcwekw1NVYzbHlZWFdKT3BVWVIyaW5OQm5Za2ludmEya2hkTlh0WTNFajRwNTlPWVN6SEx5ZGpZZDF5VlFh01","end_time":"2022-10-24T21:59:00.000Z","exclusive_voucher":false,"id_pool":"se_612567","id_voucher":786264,"id_voucher_pool":612567,"start_time":"2022-08-16T13:31:35.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Tipsa en vän och ni båda får varsin DoucheBags rabattkod på 15%","verified":"2022-08-16T11:32:09.000Z","rlp_thin_page":{"url":"db","label":"Db","logo":"/images/d/DbJourney_Logo.png","image_alt":"DoucheBags rabattkod"},"retailer":{"id_merchant_pool":2921,"name":"Db"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"15%","caption_2":"Rabattkod","captions":[],"code":"...ing","creation_time":"2022-07-06T10:40:25.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"OWxFeVdwa01UM2pEPW9uakdPYll5MGJ5emFCd3RTWU9jV1NCbXl3R2RGemtqeVZOT1loNFJXRU5kWFFhaz1YM1Eyc1o9Ym1aYTJVVEZZZENZaXBqVVVjRlYwVDRZTjlkeW1uTk55YzBaWnRyaFlrTmNqUTFMMU1ZbHM4WlJadk0yMHQzME5HUzkwV1NReEo5SE9FYWtGTWExelRFYnpQc0QyM3VaWWRXTDNKWQ--01","end_time":"2022-11-29T22:59:00.000Z","exclusive_voucher":false,"id_pool":"se_513348","id_voucher":779295,"id_voucher_pool":513348,"start_time":"2020-03-05T15:02:05.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Prenumerera på nyhetsbrevet och spara 15% med EMP rabattkod","verified":null,"rlp_thin_page":{"url":"emp","label":"EMP","logo":"/images/e/EMP.png","image_alt":"EMP rabattkod"},"retailer":{"id_merchant_pool":319,"name":"EMP"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"20%","caption_2":"Rabattkod","captions":[{"text":"20%","id_caption":"ts_caption_1"},{"text":"Nya kunder","id_caption":"ts_caption_3"},{"text":"New feet","id_caption":"ts_caption_4"},{"text":"Gäller ej med andra erbjudanden ","id_caption":"ts_caption_5"}],"code":"...EET","creation_time":"2022-10-05T12:56:03.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"V1RaUkl3TVVQam4xeVIyY1QzTW05MUZhaj1OVFhadFdrWFBZUjRtaHk5aGh3U25VTDE9ZzAydG13YzFCYU9ZOXhWYmFkRXZsdjA1WjNtWXpOUWUwWUpkVTFKT2xDWE5jUmlFdlRVbE1NTVJXMnUzNTF6Y21OTWk5VkU5elFFV21YZG1XY1dEblRvWWROWk5VUWxXbEVFWUN2V1FoWk5EWmpRYUJCdjNkVHlhU056TVhsbFduUXhQT3Zhbjlsb2VHYXVnWUozSDFIOTh6WDkwR3kxbTB6UmNMRFJ5a0V3ejhkbDBSeVFNTjB1VTROMDN3dHpZRDNHVERNZGNaZDJ3T1FaTkx6NWV5WWh1MU5WalRaNGt5dEpWVU5SaVcxSnVZWTYyWA--01","end_time":"2022-10-20T21:59:00.000Z","exclusive_voucher":false,"id_pool":"se_614981","id_voucher":785774,"id_voucher_pool":614981,"start_time":"2022-10-05T12:30:54.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Spara 20% på skor från New feet med Minfot rabattkod","verified":"2022-10-05T10:30:55.000Z","rlp_thin_page":{"url":"minfot","label":"Minfot","logo":"/images/m/Minfot.png","image_alt":"Minfot rabattkod"},"retailer":{"id_merchant_pool":1057,"name":"Minfot"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"10%","caption_2":"Rabattkod","captions":[],"code":"...ing","creation_time":"2022-08-29T09:42:49.000Z","description":null,"editors_pick":false,"encrypted_affiliate_url":"Wm8xMUUyUURONW9pYTAzT2N6MnUxZFozUkpaemE9NVZZQzVhUVdVWVpIaFdCTHRpNVRWdmp0Yk16TkdWdlpwMlozR1lkVVZXTmJid1JUNlNUWWhzaFRSYmJOM3RYdU05bUpabmpRVGRuUz1YMjJXYU1WWVIycHlNMVpNUUdBTWxTRWlHemt6V1lkb25tM1ZYVHhzWWxkNXdDNHlYelpkMlc5bUdrSGRNalpaSElBVUZ3dkJaTVdzUTF0aGNkVWlkUzRUWUdkM0dXaXp4a016OWh5UWRKTUhZeVJqWk5NT3pBWmI5d0ViM2JXNHk-01","end_time":"2023-01-23T22:59:00.000Z","exclusive_voucher":false,"id_pool":"se_613243","id_voucher":783562,"id_voucher_pool":613243,"start_time":"2022-08-29T09:41:35.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Alla nya medlemmar får en 10% Hunkemöller rabattkod att handla för","verified":"2022-08-29T07:41:43.000Z","rlp_thin_page":{"url":"hunkemoller","label":"Hunkemöller","logo":"/images/h/Hunkemoller.png","image_alt":"Hunkemöller rabattkod"},"retailer":{"id_merchant_pool":1061,"name":"Hunkemöller"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"15%","caption_2":"Rabattkod","captions":[],"code":"...L15","creation_time":"2022-10-12T11:54:18.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"cFpzelJ4aVhZTWtOVXlqeTRjMD1XOU9sdVNtdE4xV0dwc1pRSnRORDNMd0xKbGhNampVeE9hSFdtamRoelpkYlRiaXdkY0oyOWFQeUUyVkZqUjJUMk8yR2RvT3UxbXlEVWRRWU5BeFpsU3ZOT1lWWTRCVzF6VnpUMkpqZEVid2RYSmFSbWtOWXRQaz1CMlFZTndZRTRUTjNRZGtXMFdkWVk1ej0wbHd5anRqVA--01","end_time":"2023-01-02T22:59:00.000Z","exclusive_voucher":true,"id_pool":"se_598190","id_voucher":786263,"id_voucher_pool":598190,"start_time":"2022-01-10T09:14:55.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Spara 15% på ditt köp med vår exklusiva DoucheBags kampanjkod","verified":"2022-01-10T08:18:13.000Z","rlp_thin_page":{"url":"db","label":"Db","logo":"/images/d/DbJourney_Logo.png","image_alt":"DoucheBags rabattkod"},"retailer":{"id_merchant_pool":2921,"name":"Db"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"15%","caption_2":"Rabattkod","captions":[{"text":"10-15%","id_caption":"ts_caption_1"},{"text":"Studenter","id_caption":"ts_caption_3"}],"code":"...ter","creation_time":"2022-10-12T12:39:02.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"VjJZcjRrdlhSbjN5Y3NOOVpkSDB1TW16OFI4cFdPWWlhalFVY2RETGNHTXp6PW91empQR0FkcldSMmdIWGhqemtRcGRkMTZkY3Bad1k5QzlXYmxYYk5OTUhSMGVoaGlXaFpSVEdvejJkd01aWjNjQzN5MFpzbFMxQjJaVVpHRkxhVzFaYjJ4WXpPZGRMTll2VU5KUVlKTGI9WmtUMjRrWVloT0dsUT11VDF1YVpFbG1ZUTlPVnZrSkVNVngxamlWR1l0M1lSR2pZTVJ5eTJNdmRkV3cxSldXbDMwM2MwYTJ4OTRtMWpZdDFZV2lrZEpjVzFUM0xjUEowMnVk01","end_time":"2023-01-10T22:59:59.000Z","exclusive_voucher":false,"id_pool":"se_615401","id_voucher":786267,"id_voucher_pool":615401,"start_time":"2022-10-12T12:37:28.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Som student får du 10-15% studentrabatt att med DoucheBags rabattkod","verified":"2022-10-12T10:38:34.000Z","rlp_thin_page":{"url":"db","label":"Db","logo":"/images/d/DbJourney_Logo.png","image_alt":"DoucheBags rabattkod"},"retailer":{"id_merchant_pool":2921,"name":"Db"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"15%","caption_2":"Rabattkod","captions":[],"code":"...022","creation_time":"2022-09-12T09:36:09.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"OWxFeVdwa01UM2pEPW9uakdPYll5MGJ5emFCd3RTWU9jV1NCbXl3R2RGemtqeVZOT1loNFJXRU5kWFFhaz1YM1Eyc1o9Ym1aYTJVVEZZZENZaXBqVVVjRlYwVDRZTjlkeW1uTk55YzBaWnRyaFlrTmNqUTFMMU1ZbHM4WlJadk0yMHQzME5HUzkwV1NReEo5SE9FYWtGTWExelRFYnpQc0QyM3VaWWRXTDNKWQ--01","end_time":"2022-10-31T22:59:00.000Z","exclusive_voucher":true,"id_pool":"se_613904","id_voucher":784408,"id_voucher_pool":613904,"start_time":"2022-10-16T22:01:00.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Handla för minst 599 kr och få 15% rabatt med exklusiv EMP rabattkod","verified":"2022-09-12T07:25:10.000Z","rlp_thin_page":{"url":"emp","label":"EMP","logo":"/images/e/EMP.png","image_alt":"EMP rabattkod"},"retailer":{"id_merchant_pool":319,"name":"EMP"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"10%","caption_2":"Rabattkod","captions":[],"code":"...E10","creation_time":"2022-10-12T11:56:01.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"cFpzelJ4aVhZTWtOVXlqeTRjMD1XOU9sdVNtdE4xV0dwc1pRSnRORDNMd0xKbGhNampVeE9hSFdtamRoelpkYlRiaXdkY0oyOWFQeUUyVkZqUjJUMk8yR2RvT3UxbXlEVWRRWU5BeFpsU3ZOT1lWWTRCVzF6VnpUMkpqZEVid2RYSmFSbWtOWXRQaz1CMlFZTndZRTRUTjNRZGtXMFdkWVk1ej0wbHd5anRqVA--01","end_time":"2022-11-08T22:59:00.000Z","exclusive_voucher":false,"id_pool":"se_580591","id_voucher":786265,"id_voucher_pool":580591,"start_time":"2021-06-22T13:06:57.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Använd denna DoucheBags rabattkod och njut av 10% rabatt + fri frakt","verified":"2021-06-22T11:08:55.000Z","rlp_thin_page":{"url":"db","label":"Db","logo":"/images/d/DbJourney_Logo.png","image_alt":"DoucheBags rabattkod"},"retailer":{"id_merchant_pool":2921,"name":"Db"},"isSimilar":true},{"voucher_type":0,"branded_voucher":false,"caption_1":"20%","caption_2":"Rabattkod","captions":[],"code":"...NDI","creation_time":"2022-10-12T06:48:39.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"OEM5ZE50TGxSZGpjSjAwOVpuYTBSTmxQMGJYUWxuTXpWVk94VWcwVU41eU1OU0JNTjFOY2RWV1plejNZVjB6QnVZVWFZbE5ka01NbUpMVVVaV2ptZEpJM0VSbVpORWpaelA0VHJRY01XUW0yc3ZYYm1NOXZRWW55VWVYNFQzMmlCVkVTRXpVWDFZTzA5dTFSWXowSW1QZFJPcDNFSlluTm14V1UwTlJYMi9hQk0yaTNRbTNYMFN4WWtjQnlUbmJ3UWo9VDBRSEV3VVdqNEZZTTFNVGF6ZHVCamlWbnluOFN3VlVOU1RzTlhaa3lOYzJOMERaODRDdWdsdDJhdnZONElEVXp5NGFEVkMxSlRNSGRSVWJIWEV5akJrSmh6bE1Ka0lWdWNDV01HMnpWMFl6YXpHVlpkUkZSSGNXUFJGZ3ZObVIySVQxUz1hRXQxamRzdkgwUlFvMDBSVVE5a3VrWTN6UmpXWllaM3V3VFhWdmxWVTlW01","end_time":"2022-10-20T21:59:00.000Z","exclusive_voucher":false,"id_pool":"se_615367","id_voucher":786220,"id_voucher_pool":615367,"start_time":"2022-10-12T06:47:46.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Med Minfot kampanjkod sparar du 20% på allt från ECCO \u0026 Tretorn","verified":"2022-10-12T04:47:46.000Z","rlp_thin_page":{"url":"minfot","label":"Minfot","logo":"/images/m/Minfot.png","image_alt":"Minfot rabattkod"},"retailer":{"id_merchant_pool":1057,"name":"Minfot"},"isSimilar":true}],"widget_type":"similar-vouchers"}],"vouchers":[{"voucher_type":0,"branded_voucher":false,"caption_1":"20%","caption_2":"Rabattkod","captions":[],"code":"...ing","creation_time":"2022-08-31T11:03:05.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"Y2J0bHVMU0xRRDVXUloyR1kyTldCbHMvRGoxTkVOd1AxRWpKY0ZXWllXY0pDUTJkVzF4VFhNVTJ0dGJNYWFKc1pXWjNDOVYwemlpeE5OY2NEd2gyTWpHbmwwSmRUVHRNTWxqeld6VW89NFlVSjJOVXVOV1lrNXl4WVdYWWxrV1FCTlFaUmpOYWpqMW1HWnpaWVpUbHltbVV5aWtYbGtOVGxZTXkxemRXT3dZODJNU0JOVHZpRUpua1lDWUMwNFU0Uk0wek5FWlZPbFFUNVIwTWFEVWtYRjBqMVp4ckVESmxNZEpWPU5KRDVlWkw1a3lrVWNjTW5vWXpZWnphVzMwNjAwY1E-01","end_time":"Mon Feb 20 2023 22:59:00 GMT+0000 (Coordinated Universal Time)","exclusive_voucher":false,"id_pool":"se_613381","id_voucher":783731,"id_voucher_pool":613381,"start_time":"2022-08-31T11:02:39.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Bli medlem och få en 20% NLY MAN rabattkod","verified":"2022-08-31T09:02:43.000Z","rlp_thin_page":{"url":"nly-man","label":"NLY MAN","logo":"/images/n/NLYMAN.png","image_alt":"NLY MAN rabattkod"},"isFreeDelivery":false,"termsCaptions":[],"generatedRandomTimeLabel":4,"showUntruncatedTerms":false},{"voucher_type":1,"branded_voucher":false,"caption_1":"Fri","caption_2":"Frakt","captions":[],"code":"","creation_time":"2022-07-07T11:08:28.000Z","description":null,"editors_pick":false,"encrypted_affiliate_url":"Y2J0bHVMU0xRRDVXUloyR1kyTldCbHMvRGoxTkVOd1AxRWpKY0ZXWllXY0pDUTJkVzF4VFhNVTJ0dGJNYWFKc1pXWjNDOVYwemlpeE5OY2NEd2gyTWpHbmwwSmRUVHRNTWxqeld6VW89NFlVSjJOVXVOV1lrNXl4WVdYWWxrV1FCTlFaUmpOYWpqMW1HWnpaWVpUbHltbVV5aWtYbGtOVGxZTXkxemRXT3dZODJNU0JOVHZpRUpua1lDWUMwNFU0Uk0wek5FWlZPbFFUNVIwTWFEVWtYRjBqMVp4ckVESmxNZEpWPU5KRDVlWkw1a3lrVWNjTW5vWXpZWnphVzMwNjAwY1E-01","end_time":"Thu Nov 03 2022 22:59:59 GMT+0000 (Coordinated Universal Time)","exclusive_voucher":false,"id_pool":"se_609971","id_voucher":779503,"id_voucher_pool":609971,"start_time":"2022-07-07T11:08:09.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Få fri frakt på ditt köp hos NLY MAN","verified":null,"rlp_thin_page":{"url":"nly-man","label":"NLY MAN","logo":"/images/n/NLYMAN.png","image_alt":"NLY MAN rabattkod"},"isFreeDelivery":true,"termsCaptions":[],"generatedRandomTimeLabel":14,"showUntruncatedTerms":false},{"voucher_type":1,"branded_voucher":false,"caption_1":"70%","caption_2":"Rabatt","captions":[],"code":"","creation_time":"2022-10-05T12:20:08.000Z","description":null,"editors_pick":false,"encrypted_affiliate_url":"dkUwbFVtejJaVGRZa1Zqd2RhMEdXek1OVjh6V1o5TlJFWWFPTmJqY1VrQjV4V04zd0R6Y2gxTTJaYllMeVc9UnppRFRFYXd4WW1MUUFjUVpoa1lWWWwwMnVZa3VVOWRYeWhaTk5RTzJEWkMybVl1amRZWFhaLzA9U2pUd2pYMWxaR2tKeVRoQmpiNGpyZGFOWVhPUmN5Mkc-01","end_time":"Wed Nov 16 2022 22:59:59 GMT+0000 (Coordinated Universal Time)","exclusive_voucher":false,"id_pool":"se_614977","id_voucher":785768,"id_voucher_pool":614977,"start_time":"2022-10-05T12:19:17.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"mellandagsrea hos NLY MAN - spara upp till 70%","verified":null,"rlp_thin_page":{"url":"nly-man","label":"NLY MAN","logo":"/images/n/NLYMAN.png","image_alt":"NLY MAN rabattkod"},"isFreeDelivery":false,"termsCaptions":[],"generatedRandomTimeLabel":8,"showUntruncatedTerms":false},{"voucher_type":1,"branded_voucher":false,"caption_1":"20%","caption_2":"Rabatt","captions":[],"code":"","creation_time":"2022-09-09T12:13:32.000Z","description":null,"editors_pick":false,"encrypted_affiliate_url":"MGpCZVNXWjJtVERYWVF5emtaWjlrbVdHVnhWWkIxY01sTXpkelZiUGdXV0xMYVdHMVVwZE1jREVKanZpWEpHbGR3aVk0WXdPZDJSaEpkT2lWem1XWll5aUh4ak1XUUZrNGJ2RnVacE1RVFk1Q2JidHZPem5XbHp5VU5UVE52UVhqTjAxUmxtY2J1M2hkVVpFSm1ta3k2SllWTmhOY2RERXNkM29NVEZHV04zMkRiTjlNR1phTFdqTFoxSFZZekUxcGtaTk09NEpYVXdiUVlCbHhWWmpZelkwd3pRcmp6SmE-01","end_time":"Wed Oct 19 2022 21:59:59 GMT+0000 (Coordinated Universal Time)","exclusive_voucher":false,"id_pool":"se_613844","id_voucher":784324,"id_voucher_pool":613844,"start_time":"2022-09-09T12:13:12.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Spara 20% på utvalda T-shirts och tröjor hos NLY MAN","verified":null,"rlp_thin_page":{"url":"nly-man","label":"NLY MAN","logo":"/images/n/NLYMAN.png","image_alt":"NLY MAN rabattkod"},"isFreeDelivery":false,"termsCaptions":[],"generatedRandomTimeLabel":12,"showUntruncatedTerms":false},{"voucher_type":1,"branded_voucher":false,"caption_1":"Från","caption_2":"299 kr","captions":[],"code":"","creation_time":"2022-07-15T12:54:46.000Z","description":null,"editors_pick":false,"encrypted_affiliate_url":"YVlsVWxpbGRwYXlGbEJrbXlaTnRNTlR3ZFpRTlRSSlJKelYwWlRpWmRUWVFaYldtRHlXMm1RMFc0R3p5bUNFd01aVnpXZGpUMWt6TVZUM1pPQ0w5amQzTXhMMk12OHVZUzBPM0p1NVdkWWJadGhSbFlPSkdPVm1hRDF4aDV6WWtiRG5ta1c1V05kPWtOWlcwek1SWlp6TXdNdVhrb0pNMFBaVHp3RU5VV2pXWDBGQ1pUV1ZraGQySHpOanR6UVlDMzFqYjJZR0pZRUd1UEVQVVdTTnlhRmlRVDRiY3NUd0Y-01","end_time":"Sun Nov 06 2022 22:59:59 GMT+0000 (Coordinated Universal Time)","exclusive_voucher":false,"id_pool":"se_610701","id_voucher":780397,"id_voucher_pool":610701,"start_time":"2022-07-15T12:54:20.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Shoppa somriga linnekläder från 299 kr hos NLY MAN","verified":null,"rlp_thin_page":{"url":"nly-man","label":"NLY MAN","logo":"/images/n/NLYMAN.png","image_alt":"NLY MAN rabattkod"},"isFreeDelivery":false,"termsCaptions":[],"generatedRandomTimeLabel":2,"showUntruncatedTerms":false},{"voucher_type":1,"branded_voucher":false,"caption_1":"60%","caption_2":"Rabatt","captions":[],"code":"","creation_time":"2022-07-14T09:06:23.000Z","description":"","editors_pick":false,"encrypted_affiliate_url":"bEo1eU1UdlRNWTBwVU1WbUdVRDJsbnpOZFppYmlsVFRSTG1aTmxrVXRlSldkeUdaME5ZRGhUR3lYc0pob3pKekNwRFQ0RXpOR0owSmpNVkx3RGNXaTFEMmJUeG1aSlkxUmFzTnZXZGx6bVZObUZZZ2gyekxoY2t1ZE5UY211OTIxWlJ3am1OTlZHV01tY1Z4VmxtWVFSQnpGTkdPND1Kej1qTjRFeXdVV1drWVJQM0JsRXBjUW5STlNHeFZXVFl6TUNkakJjTzFKVHQwYzVMSDMwRHpkWU1VTVVWVFpsMk56SHlJWVpWSk1kVWJZRW9jdGk9NVpsRk85WUI1VU56WXp4TUJsWm05eUdsTTBZR1o5MGpNWnBVaUJRakxrUmg501","end_time":"Sun Nov 13 2022 22:59:59 GMT+0000 (Coordinated Universal Time)","exclusive_voucher":false,"id_pool":"se_610572","id_voucher":780232,"id_voucher_pool":610572,"start_time":"2022-07-14T08:56:39.000Z","submitted_by_user":false,"terms_and_conditions":"","terms_and_conditions_first_load":false,"title":"Spara mellan 30-60% på utvalda märkeskepsar från Gant, Parajumpers, New era","verified":null,"rlp_thin_page":{"url":"nly-man","label":"NLY MAN","logo":"/images/n/NLYMAN.png","image_alt":"NLY MAN rabattkod"},"isFreeDelivery":false,"termsCaptions":[],"generatedRandomTimeLabel":5,"showUntruncatedTerms":false}]},"__N_SSG":true},"page":"/[clientId]/rlp/[...url]","query":{"clientId":"6598f8de42724d6ab2a0486fc3637422","url":["nly-man"]},"buildId":"B4vhlqN5IYH3rWTpKEB7k","isFallback":false,"gsp":true,"scriptLoader":[]}
	</script>
</body>

</html>`


/**
 * Get all the voucher ids from gp
 */
const $ = cheerio.load(html);
const el = $('div[data-testid="active-vouchers-main-1"]');
let arr = [];
$('div', el).each(function () {
	if ($(this).attr('data-id')) {
		arr.push($(this).attr('data-id'));
	}
});

/**
 * Add ids to vouche_queue
 */

arr.forEach(element => {
	add_to_queue(element);
});

async function add_to_queue(voucher_id) {
	const query = {
		text: 'INSERT INTO voucher_queue (voucher_id, retailer_id) VALUES (?, ?)',
		values: [voucher_id, 2],
	}
	
	await sqlQuery(query.text, query.values).then((res) => {
		console.log(`Added ${voucher_id} to database`)
	}).catch((err) => console.log(err));
}



