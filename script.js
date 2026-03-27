document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded — DOM ready");

  const tpl = document.getElementById("template-content");
  console.log("template-content element:", tpl);

  if (tpl) {
    tpl.innerHTML =
      '<div style="padding:8px;color:#1c4b82;font-style:italic">Quotation will be default (rendered by JS)</div>';
  }
});

// Data structures and Templates
const templates = {
  receipt: `
        <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 10px 0 25px; text-decoration: underline; color: #000; font-family: sans-serif; letter-spacing: 2px;">
            RECEIPT
        </div>
        <div class="receipt-body" style="font-size: 18px; line-height: 2.8; padding: 20px 40px; text-align: left; margin: 0 20px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 25px;">
                <div>No. <span contenteditable="true" id="receipt-no" style="min-width: 120px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span></div>
                <div>Date <span contenteditable="true" style="min-width: 180px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span></div>
            </div>
            
            <div style="margin-bottom: 15px;">
                Received with thanks from <span contenteditable="true" style="min-width: 450px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span>
            </div>
            
            <div style="margin-bottom: 15px;">
                the sum of rupees <span contenteditable="true" id="amount-words" style="min-width: 500px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span>
            </div>
            
            <div style="margin-bottom: 15px;">
                being <span contenteditable="true" style="min-width: 450px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span>  by Cash / UPI / Cheque .
            
                </div>
            
            
        </div>

        <!-- Amount + Signature -->
        <div class="sign-row" style="margin-top: 40px; padding: 0 40px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div style="font-weight: bold; font-size: 20px; display: flex; align-items: flex-end;">
                Rs. <span contenteditable="true" style="min-width: 180px; display: inline-block; border-bottom: 1px solid #000; margin-left: 10px; padding-left: 5px; outline: none; text-align: center;" id="receipt-amount" oninput="updateReceiptWords()"></span>
            </div>
            <div style="text-align: right; font-size: 16px; font-weight: bold; line-height: 1.8;">
                <div>Hony. Treasurer</div>
                <div>Hony. Secretary</div>
            </div>
        </div>
    `,


};

let currentTemplate = "quotation";
function getFinancialYear() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  // Financial year starts April
  if (month >= 4) {
    return year + 1;
  } else {
    return year;
  }
}

function generateQuotationNo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const fyStart = month >= 4 ? year : year - 1;
  const fyEnd = fyStart + 1;

  const counterKey = "qt_counter_" + fyStart;

  let counter = parseInt(localStorage.getItem(counterKey) || "0");
  counter++;
  localStorage.setItem(counterKey, counter);

  const padded = counter.toString().padStart(3, "0");
  const fyLabel =
    fyStart.toString().slice(-2) + "-" + fyEnd.toString().slice(-2);

  return `QT-${fyLabel}/${padded}`;
}

let sessionQuoteNo = generateQuotationNo();

function generateInvoiceNo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 1 = Jan, 4 = April

  // Indian Financial Year: April 1 of year X to March 31 of year X+1
  // FY start year: if month >= 4, it's the current year; else previous year
  const fyStart = month >= 4 ? year : year - 1;
  const fyEnd = fyStart + 1;

  const counterKey = "inv_counter_" + fyStart;

  let counter = parseInt(localStorage.getItem(counterKey) || "0");
  counter++;
  localStorage.setItem(counterKey, counter);

  const padded = counter.toString().padStart(3, "0");
  const fyLabel =
    fyStart.toString().slice(-2) + "-" + fyEnd.toString().slice(-2);

  return `IN-${fyLabel}/${padded}`;
}

let sessionInvoiceNo = generateInvoiceNo();

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Load last active template or default to quotation
  const lastTemplate =
    localStorage.getItem("ark_packers_last_template") || "quotation";
  switchTemplate(lastTemplate);
  applyTodayDate();
});

// Primary Template Switcher
function switchTemplate(type) {
  currentTemplate = type;
  localStorage.setItem("ark_packers_last_template", type);
  const container = document.getElementById("template-content");
  const pageContainer = document.getElementById("document-container");

  container.innerHTML = templates[type];

  // Handle Orientation
  const isLandscape = type === "invoice" || type === "receipt";
  if (isLandscape) {
    pageContainer.classList.add("landscape");
    document.body.classList.add("landscape-print");
  } else {
    pageContainer.classList.remove("landscape");
    document.body.classList.remove("landscape-print");
  }

  // Post-render actions
  applyTodayDate();

  if (type === "itemlist") {
    renderItemRows(40); // default 40 rows (spec: 1-20 left, 21-40 right)
  }

  // Load previously saved data for this specific template
  loadData();

  // Stamp auto-generated numbers AFTER loadData so they aren't overwritten.
  // If the saved HTML is old (missing IDs), clear it and re-render fresh.
  if (type === "quotation") {
    const quoteEl = document.getElementById("quotation-no");
    if (quoteEl) quoteEl.innerText = sessionQuoteNo;
  } else if (type === "invoice") {
    const invEl = document.getElementById("invoice-no");
    if (invEl) invEl.innerText = sessionInvoiceNo;
    calculateTotal();
  } else if (type === "receipt") {
    let recNoEl = document.getElementById("receipt-no");
    if (!recNoEl) {
      // Old saved HTML lacks the ID — clear stale data and reload fresh
      localStorage.removeItem("ark_packers_data_receipt");
      container.innerHTML = templates["receipt"];
      recNoEl = document.getElementById("receipt-no");
    }
  } else if (type === "itemlist") {
    let itemNoEl = document.getElementById("itemlist-no");
    if (!itemNoEl) {
      // Old saved HTML lacks the ID — clear stale data and reload fresh
      localStorage.removeItem("ark_packers_data_itemlist");
      container.innerHTML = templates["itemlist"];
      applyTodayDate();
      renderItemRows(40);
      itemNoEl = document.getElementById("itemlist-no");
    }
    if (itemNoEl) itemNoEl.innerText = sessionInvoiceNo;
  }
}

// Data Persistence (LocalStorage)
function saveData() {
  const content = document.getElementById("template-content").innerHTML;
  // We save the entire innerHTML to preserve user edits in contenteditable fields
  localStorage.setItem("ark_packers_data_" + currentTemplate, content);

  // Also save global fields like GSTIN
  const gstinEl = document.getElementById("gstin-val");
  if (gstinEl) {
    localStorage.setItem("ark_packers_gstin", gstinEl.innerText);
  }
}

function loadData() {
  const saved = localStorage.getItem("ark_packers_data_" + currentTemplate);
  if (saved) {
    document.getElementById("template-content").innerHTML = saved;
    // Re-attach calculations if needed
    if (currentTemplate === "quotation") calculateTotal();
  }

  // Load global fields
  const savedGstin = localStorage.getItem("ark_packers_gstin");
  const gstinEl = document.getElementById("gstin-val");
  if (savedGstin && gstinEl) {
    gstinEl.innerText = savedGstin;
  }
}

// Auto-save on any input or change
document.addEventListener("input", (e) => {
  if (
    e.target.hasAttribute("contenteditable") ||
    e.target.classList.contains("charge-amount")
  ) {
    saveData();
  }
});

document.addEventListener(
  "blur",
  (e) => {
    if (e.target.hasAttribute("contenteditable")) {
      saveData();
    }
  },
  true,
);

// Reset Form Data
function resetForm() {
  if (
    confirm(
      "Are you sure you want to clear all entered data for this " +
      currentTemplate +
      "?",
    )
  ) {
    localStorage.removeItem("ark_packers_data_" + currentTemplate);
    switchTemplate(currentTemplate);
  }
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Auto-fill today's date
function applyTodayDate() {
  const today = new Date();
  const formatted =
    today.getDate().toString().padStart(2, "0") +
    "/" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    today.getFullYear();
  const dateFields = document.querySelectorAll(".date-field");
  dateFields.forEach((field) => {
    if (!field.innerText.trim()) {
      field.innerText = formatted;
    }
  });
}

// Auto Calculate Grand Total
function calculateTotal() {
  const chargeFields = document.querySelectorAll(".charge-amount");
  let subtotal = 0;

  chargeFields.forEach((field) => {
    let value = field.innerText.replace(/[^\d.]/g, "");
    subtotal += Number(value) || 0;
  });

  // Update Subtotal (Invoice template)
  const subTotalEl = document.getElementById("sub-total");
  if (subTotalEl) {
    subTotalEl.innerText = subtotal.toLocaleString("en-IN");
  }

  // Update Subtotal (Quotation template)
  const qtSubtotalEl = document.getElementById("qt-subtotal");
  if (qtSubtotalEl) {
    qtSubtotalEl.innerText = subtotal.toLocaleString("en-IN");
  }

  // ── Invoice GST ──
  const cgst = Number(document.getElementById("cgst-pct")?.innerText) || 0;
  const sgst = Number(document.getElementById("sgst-pct")?.innerText) || 0;
  const igst = Number(document.getElementById("igst-pct")?.innerText) || 0;
  const cgstAmount = subtotal * (cgst / 100);
  const sgstAmount = subtotal * (sgst / 100);
  const igstAmount = subtotal * (igst / 100);

  const fmt = (v) =>
    v.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  const cgstAmtEl = document.getElementById("cgst-amt");
  const sgstAmtEl = document.getElementById("sgst-amt");
  const igstAmtEl = document.getElementById("igst-amt");
  if (cgstAmtEl) cgstAmtEl.innerText = fmt(cgstAmount);
  if (sgstAmtEl) sgstAmtEl.innerText = fmt(sgstAmount);
  if (igstAmtEl) igstAmtEl.innerText = fmt(igstAmount);

  // ── Quotation GST ──
  const qtGst = Number(document.getElementById("qt-gst-pct")?.innerText) || 0;
  const qtGstAmt = subtotal * (qtGst / 100);

  const qtGstEl = document.getElementById("qt-gst-amt");
  if (qtGstEl)
    qtGstEl.innerText = qtGstAmt.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  // Grand Total (works for both templates — only one set of elements will be present)
  const grandTotal = document.getElementById("qt-gst-pct")
    ? subtotal + qtGstAmt
    : subtotal + cgstAmount + sgstAmount + igstAmount;

  // Update Grand Total
  const grandTotalEl = document.getElementById("grand-total");
  if (grandTotalEl) {
    grandTotalEl.innerText = Math.round(grandTotal).toLocaleString("en-IN");
  }

  // Update Amount in Words
  const grandTotalWordsEl = document.getElementById("grand-total-words");
  if (grandTotalWordsEl) {
    grandTotalWordsEl.innerText =
      grandTotal > 0
        ? numberToWords(Math.round(grandTotal)) + " Rupees Only"
        : "Zero Rupees Only";
  }
}

// Receipt Number to Words
function updateReceiptWords() {
  const amountEl = document.getElementById("receipt-amount");
  const wordsEl = document.getElementById("amount-words");

  if (amountEl && wordsEl) {
    let val = parseInt(amountEl.innerText.trim().replace(/,/g, "")) || 0;
    if (val > 0) {
      wordsEl.innerText = numberToWords(val) + " Rupees Only";
    } else {
      wordsEl.innerText = "";
    }
  }
}

// Item List - Dynamic Rows
function changeRowsCount(count) {
  renderItemRows(count);
}

function renderItemRows(totalItems) {
  const tbody = document.getElementById("items-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  // 2 columns of items (e.g., 1-20 left, 21-40 right if total is 40)
  let half = Math.ceil(totalItems / 2);

  for (let i = 1; i <= half; i++) {
    let tr = document.createElement("tr");
    tr.style.height = "22px";

    // Left Side
    tr.innerHTML += `
            <td style="text-align: center; font-size: 11px; padding: 1px;">${i}</td>
            <td><div contenteditable="true" style="width: 100%; border: none; outline: none; font-size: 11px; padding: 1px;"></div></td>
            <td><div contenteditable="true" style="width: 100%; border: none; outline: none; font-size: 11px; text-align: center; padding: 1px;"></div></td>
        `;

    // Right Side
    let rightIndex = i + half;
    if (rightIndex <= totalItems) {
      tr.innerHTML += `
                <td style="text-align: center; font-size: 11px; padding: 1px;">${rightIndex}</td>
                <td><div contenteditable="true" style="width: 100%; border: none; outline: none; font-size: 11px; padding: 1px;"></div></td>
                <td><div contenteditable="true" style="width: 100%; border: none; outline: none; font-size: 11px; text-align: center; padding: 1px;"></div></td>
            `;
    } else {
      tr.innerHTML += `<td></td><td></td><td></td>`;
    }

    tbody.appendChild(tr);
  }
}

// Utility: Number to Indian Words
function numberToWords(num) {
  if (num === 0) return "Zero";

  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return "";

  let str = "";
  str +=
    Number(n[1]) !== 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    Number(n[2]) !== 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    Number(n[3]) !== 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    Number(n[4]) !== 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";

  if (Number(n[5]) !== 0) {
    str += str !== "" ? "and " : "";
    str += a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]];
  }

  return str.trim();
}

// Export/Import Features
function exportData() {
  const data = {
    quotation: localStorage.getItem("ark_packers_data_quotation"),
    receipt: localStorage.getItem("ark_packers_data_receipt"),
    itemlist: localStorage.getItem("ark_packers_data_itemlist"),
    gstin: localStorage.getItem("ark_packers_gstin"),
    lastTemplate: localStorage.getItem("ark_packers_last_template"),
    timestamp: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ARK_Data_Backup_${new Date().toLocaleDateString().replace(/\//g, "-")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function triggerImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.quotation)
          localStorage.setItem("ark_packers_data_quotation", data.quotation);
        if (data.receipt)
          localStorage.setItem("ark_packers_data_receipt", data.receipt);
        if (data.itemlist)
          localStorage.setItem("ark_packers_data_itemlist", data.itemlist);
        if (data.gstin) localStorage.setItem("ark_packers_gstin", data.gstin);
        if (data.lastTemplate)
          localStorage.setItem("ark_packers_last_template", data.lastTemplate);

        alert("Data imported successfully! Refreshing template...");
        switchTemplate(currentTemplate);
      } catch (err) {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function printDocument() {
  const originalTitle = document.title;
  let filename = "ARK_Document";

  if (currentTemplate === "quotation") {
    const el = document.getElementById("quotation-no");
    if (el && el.innerText.trim())
      filename = "Quotation_" + el.innerText.trim();
  } else if (currentTemplate === "invoice") {
    const el = document.getElementById("invoice-no");
    if (el && el.innerText.trim()) filename = "Invoice_" + el.innerText.trim();
  } else if (currentTemplate === "receipt") {
    const el = document.getElementById("receipt-no");
    if (el && el.innerText.trim()) filename = "Receipt_" + el.innerText.trim();
  } else if (currentTemplate === "itemlist") {
    const el = document.getElementById("itemlist-no");
    if (el && el.innerText.trim()) filename = "ItemList_" + el.innerText.trim();
  }

  // Sanitize filename
  filename = filename.replace(/[/\\?%*:|"<>]/g, "-");

  document.title = filename;
  window.print();

  // Restore title after a brief delay so the print dialog captures it
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}
