/**
 * Google Apps Script for Zambia Short-Term Survey
 *
 * Spreadsheet: https://docs.google.com/spreadsheets/d/19gGMmjh6DYMe35dySb22fqAEuXUL_lb2Mqkr3sNORXc/edit
 *
 * Setup Instructions:
 * 1. Open the spreadsheet link above
 * 2. Go to Extensions > Apps Script
 * 3. Replace ALL code with this script
 * 4. Click Save (disk icon)
 * 5. Deploy as Web App (Deploy > New deployment)
 * 6. Choose "Execute as: Me"
 * 7. Choose "Who has access: Anyone"
 * 8. Click Deploy
 * 9. Copy the Web App URL and update GOOGLE_APPS_SCRIPT_URL_ZAMBIA in surveySubmission.ts
 */

const SPREADSHEET_ID = '19gGMmjh6DYMe35dySb22fqAEuXUL_lb2Mqkr3sNORXc';

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const data = JSON.parse(e.postData.contents);

    // Get the first sheet or create one if it doesn't exist
    let sheet = spreadsheet.getSheets()[0];

    if (!sheet) {
      sheet = spreadsheet.insertSheet('Responses');
    }

    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [];
      for (let i = 0; i < data.length; i++) {
        headers.push(`Column_${i + 1}`);
      }
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }

    // Check for duplicate submissions (by email - assuming it's in the data)
    const emailColumnIndex = 2; // Adjust based on your data structure
    if (sheet.getLastRow() > 1) {
      const emailColumn = sheet.getRange(2, emailColumnIndex, sheet.getLastRow() - 1, 1).getValues();
      const submittedEmail = data[emailColumnIndex - 1];

      for (let i = 0; i < emailColumn.length; i++) {
        if (emailColumn[i][0] === submittedEmail) {
          return ContentService
            .createTextOutput(JSON.stringify({
              result: 'duplicate',
              message: 'You have already submitted this survey.'
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Append the data as a new row
    sheet.appendRow(data);

    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success',
        message: 'Survey response recorded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error',
        message: 'Server Processing Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Zambia Short-Term Survey submission endpoint is active')
    .setMimeType(ContentService.MimeType.TEXT);
}
