// to create CSV file required for QBO upload
function saveAsCSVPHP() {
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
  var sheet = ss.getSheetByName("PHP-Transactions");
  var cell = sheet.getRange(2, 9).getValue();
   Logger.log(cell);
  if(cell == "YES"){
   
    var filename = "PHP_Transactions_" + today + ".csv"; // CSV file name
    var Cfilename = "PHP_Transactions.cs v"; // CSV file name
    var folder = ""; // Folder ID
    
    var csv = "";
    var v = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("PHP-TRX")
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
    
    var Bfilename = "PHP_Transactions.csv"; // Constant CSV file name
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
};
