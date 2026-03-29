# SETHU FC Document Generator

A browser-based document generator designed for logistics businesses to quickly create **Quotations, Invoices, Receipts, and Item Lists** with automatic calculations, financial-year numbering, and persistent data storage.

This system is built using **HTML, CSS, and JavaScript**, and runs completely on the client side without requiring any backend server.

---

# Features

## 1. Multiple Document Templates

The system provides four document templates:

* **Quotation**
* **Invoice**
* **Receipt**
* **Item List Declaration**

Each template includes editable fields allowing users to quickly fill customer details, charges, and logistics information.

---

## 2. Automatic Document Number Generation

### Quotation Number

Quotation numbers follow the **Indian Financial Year format (April–March)**.

Example:

QT-25-26/001
QT-25-26/002

The numbering resets automatically every financial year.

---

### Invoice Number

Invoice numbers are generated similarly:

IN-25-26/001
IN-25-26/002

Counters are stored in **localStorage**, ensuring sequential numbering.

---

## 3. Dynamic Charge Calculation

The system automatically calculates:

* Subtotal
* CGST
* SGST
* IGST
* Grand Total

Users can input percentages and charges, and the totals update instantly.

Example calculation:

Freight Charges

* Packing Charges
* Loading Charges
* Unloading Charges
* Rearranging Charges
* Warehousing / Transportation

Subtotal → GST → Grand Total

---

## 4. Amount in Words

The system converts numeric totals into **Indian currency words**.

Example:

12500 → Twelve Thousand Five Hundred Rupees Only

This feature works for:

* Invoice totals
* Quotation totals
* Receipt amounts

---

## 5. Editable Fields

All major fields are **contenteditable**, allowing users to directly type inside the document.

Editable areas include:

* Customer name
* Address
* Mobile number
* GSTIN
* Charges
* Particulars
* Locations
* Dates

No form inputs are required.

---

## 6. Auto Save with Local Storage

All entered data is automatically saved in the browser using **localStorage**.

Features include:

* Automatic save on typing
* Separate storage for each template
* Data persistence after page refresh

---

## 7. Import and Export Backup

Users can create backups of their data.

### Export

Exports all saved documents into a JSON backup file.

### Import

Allows restoring saved data from a backup JSON file.

---

## 8. Dynamic Item List Generator

The item list template generates rows dynamically.

Users can select:

* 20 rows
* 40 rows
* 60 rows

Items are displayed in a **two-column grid format** for compact printing.

Example:

| SL No | Particulars | Qty | SL No | Particulars | Qty |

---

## 9. Automatic Date Filling

All date fields automatically populate with today's date in the format:

DD/MM/YYYY

Example:

04/03/2026

---

## 10. Print Optimization

The system includes **print-ready formatting**:

* A4 layout
* Proper margins
* Print-friendly colors
* Automatic filename generation

Example print file names:

Quotation_QT-25-26/001
Invoice_IN-25-26/005
Receipt_IN-25-26/005

---

## 11. Dark Mode

The interface supports **dark mode** for comfortable editing during extended usage.

---

# Technologies Used

Frontend technologies used in the project:

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Browser LocalStorage API

No external frameworks or libraries are required.

---

# Project Structure

Example project structure:

```
SETHU-FC-Document-System
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

# How to Use

### 1. Open the project

Simply open `index.html` in a browser.

### 2. Select a document type

Choose one of the templates:

* Quotation
* Invoice
* Receipt
* Item List

### 3. Fill the editable fields

Click on any editable area and enter details.

### 4. Enter charges

Add amounts to charge fields to automatically calculate totals.

### 5. Print the document

Click the **Print button** to generate a printable version.

---

# Data Storage

All data is stored locally in the browser using **localStorage**.

Important notes:

* Data will remain after page refresh.
* Clearing browser data will remove saved documents.

---

# Reset Feature

Users can clear current template data using the reset function.

This removes stored data and reloads a fresh template.

---

# Backup Recommendation

It is recommended to regularly export backups using the **Export Data** feature to avoid accidental data loss.

---

# Future Improvements

Possible enhancements include:

* PDF export
* Cloud backup
* Customer database
* Mobile responsive layout
* Multiple GST configurations
* Company branding customization

---

## Authors

| Name | Role |
|-----|-----|
| N. Vera Adithya | Lead Developer |
| D. Sukesh | Co-Developer |
| J. N. Prithiviraaj | Co-Developer |

B.E Computer Science and Engineering
Sethu Institute of Technology

Skills:

* Web Development
* JavaScript
* UI Design
* Frontend Systems

---

# License

This project is intended for educational and internal business usage.
