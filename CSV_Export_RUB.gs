// to create csv required for QBO upload
function saveAsCSVRUB() {
  var today = new Date();
  var dd = today.getDate();
  
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10) 
  {
    dd='0'+dd;
  } 
  
  if(mm<10) 
  {
    mm='0'+mm;
  } 

today = mm+'-'+dd+'-'+yyyy;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("RUB-Transactions");
  var cell = sheet.getRange(2, 9).getValue();
   Logger.log(cell);
  if(cell == "YES"){
   
    var filename = "RUB_Transactions_" + today + ".csv"; // CSV file name
    var Cfilename = "RUB_Transactions.csv"; // CSV file name
    var folder = ""; // Folder ID
    
    var csv = "";
    var v = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("RUB-TRX")
    .getDataRange()
    .getValues();
    v.forEach(function(e) {
      csv += e.join(",") + "\n";
    });
    var url = DriveApp.getFolderById(folder)
    .createFile(filename, csv, MimeType.CSV)
    .getDownloadUrl()
    .replace("?e=download&gd=true","");
    var C_url = DriveApp.getFolderById(folder)
    .createFile(Cfilename, csv, MimeType.CSV)
    .getDownloadUrl()
    .replace("?e=download&gd=true","");
    return url, C_url;
  }
  
  if(cell == "NO"){ 
    
    var Bfilename = "RUB_Transactions.csv"; // Constant CSV file name
    var folder = ""; // Folder ID    
    var csv = "";
    var Bv = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Blank-TRX")
    .getDataRange()
    .getValues();
    Bv.forEach(function(e) {
      csv += e.join(",") + "\n";
    });
    var B_url = DriveApp.getFolderById(folder)
    .createFile(Bfilename, csv, MimeType.CSV)
    .getDownloadUrl()
    .replace("?e=download&gd=true","");
    return B_url;    
    
  }
}
