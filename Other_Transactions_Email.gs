// to send notification to email address if a new currency has been added to the spreadsheet

function sendNotification() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Other-Transactions");
  var cell = sheet.getRange(2, 16).getValue()
  var recipients = ""; // ENTER EMAIL HERE
  var message = '';
  Logger.log(cell);
  
  if(cell == "ALERT"){ 

  var subject = 'Update to '+sheet.getName();
  var body = sheet.getName() + ' is not blank. Visit ' + ss.getUrl();
  MailApp.sendEmail(recipients, subject, body);
  }
};
