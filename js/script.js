/**
 * SETHU FOOTBALL CLUB - Billing Software
 * 
 * Data structures and HTML Templates for the application.
 */
const templates = {
  receipt: `
        <!-- ==================== RECEIPT HEADER ==================== -->
        <div style="display: flex; justify-content: space-between; font-weight: bold; padding: 10px 40px; font-size: 18px;">
            <div>
                No: 
                <span contenteditable="true" id="receipt-no" style="min-width: 120px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span>
            </div>
            <div>
                Date: 
                <span contenteditable="true" id="receipt-date-display" class="date-field" style="min-width: 180px; display: inline-block; border-bottom: 1px dotted #000; text-align: center; cursor: pointer;"></span>
                <input type="date" id="receipt-date-picker" class="no-print" style="position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;">
            </div>
        </div>
        
        <div style="border-bottom: 2px solid black; margin-bottom: 35px;"></div>
        
        <!-- ==================== RECEIPT TITLE ==================== -->
        <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 30px 0 45px; text-decoration: underline; color: #000; font-family: 'Space Mono', monospace; letter-spacing: 2px;">
            RECEIPT
        </div>
        
        <!-- ==================== RECEIPT BODY ==================== -->
        <div class="receipt-body" style="font-size: 18px; line-height: 3.8; padding: 0 30px 15px; text-align: left; margin: 0 15px;">
            
            <!-- Received From -->
            <div style="margin-bottom: 40px;">
                Received with thanks from 
                <span contenteditable="true" style="min-width: 400px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span>
                <span contenteditable="true" oninput="if(typeof saveData === 'function') saveData();" style="min-width: 150px; flex: 1; display: inline-block; border-bottom: 1px dashed #ccc; text-align: center; outline: none; font-weight: bold;"></span>
                        <select class="no-print" onchange="this.previousElementSibling.innerText = this.value; this.value = ''; if(typeof saveData === 'function') saveData();" style="border: none; outline: none; background: transparent; cursor: pointer; margin-left: 5px; font-size: 15px; font-family: 'Space Mono', monospace;">
                            <option value="" disabled selected>Select Club</option>
                            <option value="Football club">Football club</option>
                            <option value="Soccer club">Soccer club</option>
                            <option value="Academy">Academy</option>
                        </select>
            </div>
            
            <!-- Payment Category Dropdown & Text 
            <div style="margin-bottom: 25px; display: flex; align-items: baseline; justify-content: space-between; width: 100%;">
                
                <div style="display: flex; align-items: baseline; gap: 10px; flex: 1;">
                    <div style="display: flex; align-items: baseline; flex: 1;">
                        <span contenteditable="true" oninput="if(typeof saveData === 'function') saveData();" style="min-width: 150px; flex: 1; display: inline-block; border-bottom: 1px dashed #ccc; text-align: center; outline: none; font-weight: bold;"></span>
                        <select class="no-print" onchange="this.previousElementSibling.innerText = this.value; this.value = ''; if(typeof saveData === 'function') saveData();" style="border: none; outline: none; background: transparent; cursor: pointer; margin-left: 5px; font-size: 15px; font-family: 'Space Mono', monospace;">
                            <option value="" disabled selected>Select Club</option>
                            <option value="Football club">Football club</option>
                            <option value="Soccer club">Soccer club</option>
                            <option value="Academy">Academy</option>
                        </select>
                    </div>
                </div>

                
                <div style="flex: 0 0 auto; text-align: center; margin: 0px 0px 0px 25px;">
                    <span>towards</span>
                </div>

                <div style="display: flex; align-items: baseline; flex: 1; justify-content: flex-end;">
                    <div style="display: flex; align-items: baseline; width: 100%;">
                        <span contenteditable="true" oninput="if(typeof saveData === 'function') saveData();" style="flex: 1; display: inline-block; border-bottom: 1px dashed #ccc; text-align: center; outline: none; font-weight: bold;"></span>
                        <select class="no-print" onchange="this.previousElementSibling.innerText = this.value; this.value = ''; if(typeof saveData === 'function') saveData();" style="border: none; outline: none; background: transparent; cursor: pointer; font-size: 15px; font-family: 'Space Mono', monospace;">
                            <option value="" disabled selected>Select One</option>
                            <option value="Yearly Subscription">Yearly Subscription</option>
                            <option value="Players registration">Players registration</option>
                            <option value="League fee">League fee</option>
                        </select>
                    </div>
                </div>
            </div> -->
            
            <!-- Auto-Calculated Amount in Words -->
            <div class="amount-line">
                <span class="label">the sum of rupees</span>
                <span contenteditable="true" id="amount-words" class="amount"></span>
            </div>
            
            <!-- Payment Mode (Cash/UPI/Bank) -->
            <div style="margin-bottom: 40px;">
                being 
                <!-- <span contenteditable="true" style="min-width: 450px; display: inline-block; border-bottom: 1px dotted #000; text-align: center;"></span>  -->
                                        <span contenteditable="true" oninput="if(typeof saveData === 'function') saveData();" style="flex: 1; display: inline-block; border-bottom: 1px dashed #ccc; text-align: center; outline: none; font-weight: bold;"></span>
                        <select class="no-print" onchange="this.previousElementSibling.innerText = this.value; this.value = ''; if(typeof saveData === 'function') saveData();" style="border: none; outline: none; background: transparent; cursor: pointer; font-size: 15px; font-family: 'Space Mono', monospace;">
                            <option value="" disabled selected>Select One</option>
                            <option value="Yearly Subscription">Yearly Subscription</option>
                            <option value="Players registration">Players registration</option>
                            <option value="League fee">League fee</option>
                        </select>

                by Cash / UPI / Cheque / Bank transfer.
            </div>
            
        </div>

        <!-- ==================== FOOTER (Amount, Logo, Signatures) ==================== -->
        <div class="sign-row" style="margin-top: 25px; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: flex-end;">
            
            <!-- Left: Amount in Numbers -->
            <div style="font-weight: bold; font-size: 20px; display: flex; align-items: flex-end; margin-bottom: 45px;">
                Rs. 
                <span contenteditable="true" style="min-width: 180px; display: inline-block; border-bottom: 1px solid #000; margin-left: 10px; padding-left: 5px; outline: none; text-align: center;" id="receipt-amount" oninput="updateReceiptWords()"></span>
            </div>
            
            <!-- Center: Football Logo Seal -->
            <div style="display: flex; justify-content: center; margin-bottom: 30px;">
                <img src="assets/images/football_logo.jpg" alt="Seal" style="max-height: 65px; border-radius: 50%; filter: hue-rotate(120deg);">
            </div>
            
            <!-- Right: Signatures and Titles -->
            <div style="display: flex; justify-content: flex-end;">
                <div style="text-align: right; font-size: 16px; font-weight: bold; line-height: 1.8;">
                    <img src="assets/images/Seeni_Sign.png" alt="Signature" style="max-height: 45px; display: block; margin-left: auto; margin-bottom: -5px; mix-blend-mode: multiply;">
                    <div>Hony. Treasurer</div>
                    <div>Hony. Secretary</div>
                </div>
            </div>
            
        </div>
    `,
};

/**
 * Global Variables
 */
let currentTemplate = "receipt";

/**
 * Initialization
 * Triggers on page load to set up the default template and date.
 */
document.addEventListener("DOMContentLoaded", () => {
  switchTemplate("receipt");
  applyTodayDate();
});

/**
 * Primary Template Switcher
 * Handles injecting HTML, applying orientation classes, and loading saved local data.
 * 
 * @param {string} type - The template name (e.g. 'receipt')
 */
function switchTemplate(type) {
  currentTemplate = type;
  const container = document.getElementById("template-content");
  const pageContainer = document.getElementById("document-container");

  // Inject Template HTML
  container.innerHTML = templates[type];

  // Handle Orientation
  pageContainer.classList.add("landscape");
  document.body.classList.add("landscape-print");

  // Post-render actions
  applyTodayDate();

  // Load previously saved data for this specific template
  loadData();

  // Validate Old Data formatting
  // If the saved HTML is old (missing IDs), clear it and re-render fresh.
  if (type === "receipt") {
    let recNoEl = document.getElementById("receipt-no");
    if (!recNoEl) {
      // Old saved HTML lacks the ID — clear stale data and reload fresh
      localStorage.removeItem("sethu_fc_data_receipt");
      container.innerHTML = templates["receipt"];
      recNoEl = document.getElementById("receipt-no");
    }
  }
}

/**
 * Data Persistence: Save to LocalStorage
 * We save the entire innerHTML to flexibly preserve user edits across all contenteditable fields.
 */
function saveData() {
  const content = document.getElementById("template-content").innerHTML;
  localStorage.setItem("sethu_fc_data_" + currentTemplate, content);
}

/**
 * Data Persistence: Load from LocalStorage
 * Restores the HTML state of the template if it was saved previously.
 */
function loadData() {
  const saved = localStorage.getItem("sethu_fc_data_" + currentTemplate);
  if (saved) {
    document.getElementById("template-content").innerHTML = saved;
  }
}

/**
 * Auto-save Event Listeners
 * Triggers a save on any input or blur action inside the editable areas.
 */
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

/**
 * Date Picker Logic
 * Handles clicking the date field to open the calendar and updating the display.
 */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("date-field")) {
    const picker = e.target.nextElementSibling;
    if (picker && picker.tagName === "INPUT" && picker.type === "date") {
      try {
        picker.showPicker();
      } catch (err) {
        picker.click();
      }
    }
  }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "receipt-date-picker") {
    const display = document.getElementById("receipt-date-display");
    if (display) {
      const dateVal = e.target.value;
      if (dateVal) {
        const [year, month, day] = dateVal.split("-");
        display.innerText = `${day}/${month}/${year}`;
        saveData();
      }
    }
  }
});

/**
 * Reset Form Data
 * Prompts user confirmation, deletes LocalStorage key, and resets the template.
 */
function resetForm() {
  if (
    confirm(
      "Are you sure you want to clear all entered data for this " +
      currentTemplate +
      "?",
    )
  ) {
    // Clear the specific template "cache" from local storage
    localStorage.removeItem("sethu_fc_data_" + currentTemplate);
    // Hard refresh the page to completely reset state
    window.location.reload();
  }
}

/**
 * Auto-fill Today's Date
 * Finds any date-field lacking input and prepopulates the current DD/MM/YYYY text.
 */
function applyTodayDate() {
  const today = new Date();
  const formatted =
    today.getDate().toString().padStart(2, "0") +
    "/" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    today.getFullYear();

  const yyyymmdd = today.getFullYear() + "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") + "-" +
    today.getDate().toString().padStart(2, "0");

  const dateFields = document.querySelectorAll(".date-field");
  dateFields.forEach((field) => {
    if (!field.innerText.trim()) {
      field.innerText = formatted;
    }
  });

  const picker = document.getElementById("receipt-date-picker");
  if (picker && !picker.value) {
    picker.value = yyyymmdd;
  }
}

/**
 * Auto-calculate Receipt Words
 * Listens for updates to the number amount field and automatically 
 * converts the number value into written words.
 */
function updateReceiptWords() {
  const amountEl = document.getElementById("receipt-amount");
  const wordsEl = document.getElementById("amount-words");

  if (amountEl && wordsEl) {
    // Strip commas and parse as Integer
    let val = parseInt(amountEl.innerText.trim().replace(/,/g, "")) || 0;
    if (val > 0) {
      wordsEl.innerText = numberToWords(val) + " Rupees Only";
    } else {
      wordsEl.innerText = "";
    }
  }
}

/**
 * Number to Indian Words Conversion Logic
 * Core utility that transforms numeric integer into Indian wording format (Lakhs, Crores).
 * 
 * @param {number} num - The amount in numeric format
 * @returns {string} The amount written out in English words
 */
function numberToWords(num) {
  if (num === 0) return "Zero";

  const a = [
    "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ",
    "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "
  ];

  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

  if (!n) return "";

  let str = "";

  // Crores
  str += Number(n[1]) !== 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore " : "";
  // Lakhs
  str += Number(n[2]) !== 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh " : "";
  // Thousands
  str += Number(n[3]) !== 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand " : "";
  // Hundreds
  str += Number(n[4]) !== 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred " : "";

  // Tens and Ones
  if (Number(n[5]) !== 0) {
    str += str !== "" ? "and " : "";
    str += a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]];
  }

  return str.trim();
}

/**
 * Print Document Execution Workflow
 * Configures the document title for saving, clones the HTML for 2-up printing,
 * executes the print request, and safely garbage collects the clones.
 */
function printDocument() {
  const originalTitle = document.title;
  let filename = "SFC";

  // If receipt ID has a value, use it as a custom filename in the print PDF save dialog
  if (currentTemplate === "receipt") {
    const el = document.getElementById("receipt-no");
    if (el && el.innerText.trim()) filename = "Receipt_" + el.innerText.trim();
  }

  // Sanitize filename for compatibility
  filename = filename.replace(/[\/\\?%*:|"<>]/g, "-");
  document.title = filename;

  // Clone the receipt content for double printing on standard page
  const container = document.getElementById("document-container");
  const clone = container.cloneNode(true);
  clone.id = "document-container-clone"; // Assign a unique ID to the clone

  // Apply a page break so we have 2 distinct landscape pages.
  // This allows the user to manually select "Pages per sheet: 2" and "A4" in the print dialog.
  container.style.breakAfter = "page";
  container.style.pageBreakAfter = "always";

  // Insert the clone right after the original container for consistent layout
  container.after(clone);

  // Small delay to ensure browser reliably applies DOM changes before invoking native print prompt
  setTimeout(() => {
    window.print();

    // Remove the clone and the page break styles after a longer delay for safety once dialog opens
    setTimeout(() => {
      document.title = originalTitle;
      container.style.breakAfter = "";
      container.style.pageBreakAfter = "";
      if (clone.parentNode) clone.parentNode.removeChild(clone);
    }, 2000);
  }, 100);
}

