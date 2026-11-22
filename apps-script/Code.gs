/**
 * DS2 Global — Leads connector
 * Receives lead form submissions from the DS2 Global website and appends
 * them to the "DS2 Global — Leads" Google Sheet, then emails a notification.
 *
 * Sheet: https://docs.google.com/spreadsheets/d/1SfVF4wmdrYsh3-rZ4ukkRiJhv1vXenv3zbPl0MZGe1I
 *
 * SETUP (one time, ~3 minutes):
 * 1. Open the sheet above, then Extensions → Apps Script.
 * 2. Delete any code in the editor and paste this whole file in.
 * 3. Set NOTIFY_EMAIL below to the inbox that should receive lead alerts.
 * 4. Deploy → New deployment → type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and paste it into the site code where it says
 *    LEADS_ENDPOINT (in index.html / the site settings). Every form on the
 *    site posts to that one URL.
 */

// TODO: confirm the notification inbox for DS2 Global leads.
const NOTIFY_EMAIL = "info@ds2global.com";

const HEADERS = [
  "Timestamp",
  "Source",        // which form: Security Consult / Checklist / Contact
  "Name",
  "Email",
  "Company",
  "Company size",
  "Interest",      // offer or service selected
  "What they need",
  "What they've tried",
  "What success looks like",
  "Status"         // New / Contacted / Booked — managed in the sheet
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write the header row the first time the script runs.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      p.source || "",
      p.name || "",
      p.email || "",
      p.company || "",
      p.company_size || "",
      p.interest || "",
      p.need || "",
      p.tried || "",
      p.success || "",
      "New"
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New DS2 Global lead — " + (p.source || "Website") + ": " + (p.name || ""),
        body:
          "A new lead just came in from the DS2 Global website.\n\n" +
          "Source: " + (p.source || "") + "\n" +
          "Name: " + (p.name || "") + "\n" +
          "Email: " + (p.email || "") + "\n" +
          "Company: " + (p.company || "") + "\n" +
          "Company size: " + (p.company_size || "") + "\n" +
          "Interest: " + (p.interest || "") + "\n" +
          "What they need: " + (p.need || "") + "\n" +
          "What they've tried: " + (p.tried || "") + "\n" +
          "What success looks like: " + (p.success || "") + "\n\n" +
          "Full list: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("DS2 Global leads endpoint is live.");
}
