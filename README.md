# DS2 Global — Website (demo)

A lead-generating marketing site for DS2 Global, modeled on silaswandera.com:
Apple-style modern design, offers, a Security Consult offer with appointment
booking, and lead forms that post to a Google Sheet.

## What's here

- `index.html` — the demo site (single self-contained file).
- `apps-script/Code.gs` — the Google Apps Script that receives form
  submissions and appends them to the leads sheet.

## Leads → Google Sheet

Leads sheet: **DS2 Global — Leads**
https://docs.google.com/spreadsheets/d/1SfVF4wmdrYsh3-rZ4ukkRiJhv1vXenv3zbPl0MZGe1I
(also filed in Control Center HQ → DS2 Global on Google Drive, together with
Code.gs)

To connect the live forms (one-time, ~3 minutes):

1. Open the sheet → Extensions → Apps Script → paste in `apps-script/Code.gs`.
2. Set `NOTIFY_EMAIL` in the script to the inbox that should get lead alerts.
3. Deploy → New deployment → Web app (Execute as: Me; Access: Anyone).
4. Copy the Web app URL and set it as `LEADS_ENDPOINT` in `index.html`
   (search the file for `LEADS_ENDPOINT`). Until then the forms run in demo
   mode and show the confirmation without sending data.

Every form posts the same fields; the `source` field says which form it was
(Security Consult / Checklist / Contact), and each new row lands with
Status = New.

## Booking

The "Book appointment" buttons point to a booking link placeholder in
`index.html` (search for `BOOKING_LINK`). Replace it with DS2 Global's real
calendar booking page (e.g., a Google Calendar appointment schedule) when
ready.

## Publishing

This folder is a git repository named `ds2global`. To put it on GitHub:
create an empty repo named `ds2global` under the GitHub account, then push
this folder (the remote URL goes here once the repo exists).
