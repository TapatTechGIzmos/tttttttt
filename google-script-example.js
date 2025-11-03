/**
 * Google Apps Script for Insurance Intelligence Africa Survey Submissions
 *
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the code with this script
 * 4. Deploy as Web App (Deploy > New deployment)
 * 5. Choose "Execute as: Me"
 * 6. Choose "Who has access: Anyone"
 * 7. Copy the deployment URL and add it to your .env file
 *
 * The script will automatically create sheets for each survey type
 * and append responses with timestamps.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const surveyType = data.surveyType || 'Unknown Survey';

    // Get or create the appropriate sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(surveyType);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(surveyType);
      // Add headers on first row
      const headers = Object.keys(data);
      sheet.appendRow(headers);
      // Freeze the header row
      sheet.setFrozenRows(1);
      // Bold the header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }

    // Get headers from the first row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Prepare row data matching header order
    const rowData = headers.map(header => {
      const value = data[header];

      // Handle different data types
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'object') {
        return JSON.stringify(value);
      } else {
        return value;
      }
    });

    // Append the new row
    sheet.appendRow(rowData);

    // Auto-resize columns (optional, can be slow for large sheets)
    // sheet.autoResizeColumns(1, headers.length);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Survey response recorded'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Survey submission endpoint is active')
    .setMimeType(ContentService.MimeType.TEXT);
}
