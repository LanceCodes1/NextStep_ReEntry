// =========================================
// 1. Page elements
// document.querySelector() finds one element on the page using a CSS
// selector ("#categories" means the element with id="categories").
// We look each element up once here and store it in a variable, so the
// functions below can show, hide, read, or change it by name.
// =========================================
const categoriesSection = document.querySelector("#categories");
const startDocumentsButton = document.querySelector("#start-documents");

const documentsFlow = document.querySelector("#documents-flow");
const documentsTitle = document.querySelector("#documents-title");
const backButton = document.querySelector("#back-to-categories");

// Question 1 ("Which documents do you have?")
const haveForm = document.querySelector("#have-form");
const haveFieldset = document.querySelector("#have-fieldset");
const haveError = document.querySelector("#have-error");

// Message box used by the safeguard and the "you have all four" case
const messageBox = document.querySelector("#flow-message");
const messageTitle = document.querySelector("#message-title");
const messageText = document.querySelector("#message-text");

// Question 2 ("Which document would you like help with first?")
const firstForm = document.querySelector("#first-form");
const firstFieldset = document.querySelector("#first-fieldset");
const firstError = document.querySelector("#first-error");

// Result box that lists the three next steps
const nextStepsBox = document.querySelector("#next-steps");
const nextStepsTitle = document.querySelector("#next-steps-title");
const nextStepsList = document.querySelector("#next-steps-list");

// querySelectorAll() finds EVERY match, not just the first. There are two
// "Change my answers" buttons (in the message box and in the results).
const changeAnswersButtons = document.querySelectorAll(".change-answers");

// =========================================
// 2. Stored data
// The information the flow needs, kept in one place so it is easy to
// review and edit without touching the logic below.
// =========================================

// Array (ordered list) of the four documents NextStep covers.
// These keys match the value="" attributes on the checkboxes and radio
// buttons in index.html, which is how the script connects answers to data.
const ALL_DOCUMENTS = ["birth-certificate", "social-security-card", "state-id", "drivers-license"];

// Object that looks up a readable name from a key,
// e.g. documentNames["state-id"] gives "State ID".
const documentNames = {
  "birth-certificate": "Birth Certificate",
  "social-security-card": "Social Security Card",
  "state-id": "State ID",
  "drivers-license": "Driver's License",
};

// Object that stores an array of three steps for each document.
// The wording is intentionally general: no state rules, fees, processing
// times, or office details, so nothing reads as an official requirement.
const nextStepsByDocument = {
  "birth-certificate": [
    "Write down what you know about your birth: your full name at birth, your date of birth, and the city, county, and state where you were born.",
    "Look up how the state where you were born handles birth certificate requests. Use an official state government website so the information is accurate.",
    "Ask a case manager, reentry program, or other trusted support person whether they can help you with the request.",
  ],
  "social-security-card": [
    "Gather any identity documents you already have. You may be asked to show proof of who you are.",
    "Look up how to request a replacement card on the official Social Security Administration website, or ask at a Social Security office.",
    "Ask a case manager, reentry program, or other trusted support person whether they can help you with the request.",
  ],
  "state-id": [
    "Make a list of the documents you currently have. States often ask for documents that show who you are and where you live, so it helps to know what you have.",
    "Find your state's official ID or motor vehicle agency website and look up what it lists for getting a state ID.",
    "Ask a case manager, reentry program, or other trusted support person whether they can help you with the process.",
  ],
  "drivers-license": [
    "Think about whether you have had a driver's license before, and gather any old license or related paperwork you still have.",
    "Visit your state's official motor vehicle agency website to learn what applies to your situation.",
    "Ask a case manager, reentry program, or other trusted support person to help you understand your options.",
  ],
};

// =========================================
// 3. Showing, hiding, and resetting
// Every element has a "hidden" property. Setting it to true hides the
// element; setting it to false shows it again. This is how the page moves
// between screens without loading a new page.
// =========================================

// Hides everything that comes after question 1: the message box,
// question 2, and the results. It is called whenever question 1 is
// submitted or changed, so old results never stay on screen next to
// answers they no longer match.
function hideLaterSteps() {
  messageBox.hidden = true;
  firstForm.hidden = true;
  nextStepsBox.hidden = true;
  firstError.textContent = "";
}

// Puts the whole flow back to its starting state.
// form.reset() is a built-in method that unchecks every box and radio
// button inside that form. Then we clear errors and hide later steps.
function resetFlow() {
  haveForm.reset();
  firstForm.reset();
  haveError.textContent = "";
  hideLaterSteps();
}

// Switches from the category cards to the Vital Documents flow.
// It resets first so a returning user always starts with a clean form.
function showDocumentsFlow() {
  resetFlow();
  categoriesSection.hidden = true;
  documentsFlow.hidden = false;
  // Accessibility: move focus to the new heading. Without this, keyboard
  // and screen reader users would be left on a button that just vanished.
  // (The heading has tabindex="-1" in the HTML so it is allowed to receive focus.)
  documentsTitle.focus();
}

// Switches back from the flow to the category cards (the "Back" button).
// Focus returns to the button the user started from.
function showCategories() {
  resetFlow();
  documentsFlow.hidden = true;
  categoriesSection.hidden = false;
  startDocumentsButton.focus();
}

// Fills in and shows the message box. Used when NextStep should NOT
// recommend a path (the safeguard) or has nothing to recommend.
// textContent inserts plain text, which is safer than inserting HTML.
function showMessage(title, text) {
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageBox.hidden = false;
  messageTitle.focus();
}

// =========================================
// 4. Question 1: which documents the user has
// =========================================

// Collects the answers to question 1 into an array.
// ':checked' matches only boxes that are ticked, and .push() adds each
// box's value to the end of the array, e.g. ["state-id", "none"].
function getCheckedAnswers() {
  const checkedBoxes = haveForm.querySelectorAll('input[name="have"]:checked');
  const answers = [];
  checkedBoxes.forEach(function (box) {
    answers.push(box.value);
  });
  return answers;
}

// Runs when the user presses "Continue" on question 1.
// It decides what happens next: an error, a safeguard message, or question 2.
function handleHaveSubmit(event) {
  // Forms normally reload the page when submitted. preventDefault() stops
  // that so our script can handle the answers instead.
  event.preventDefault();
  haveError.textContent = "";
  hideLaterSteps();

  const answers = getCheckedAnswers();

  // .filter() builds a new array containing only the items where the
  // function returns true. Here: which of the four documents were checked?
  const documentsHave = ALL_DOCUMENTS.filter(function (doc) {
    return answers.includes(doc);
  });

  // Same idea, flipped with "!" (not): which documents were NOT checked?
  // These are the documents the user is missing.
  const documentsMissing = ALL_DOCUMENTS.filter(function (doc) {
    return !answers.includes(doc);
  });

  // ---- Decision logic ----
  // The rules are checked from top to bottom. Each one ends with "return",
  // which exits the function immediately, so only the FIRST matching rule
  // runs. The order matters: the safeguards come before any recommendation.

  // Rule 1: nothing selected, so ask the user to choose something
  if (answers.length === 0) {
    haveError.textContent = "Please choose at least one option to continue.";
    return;
  }

  // Rule 2 (safeguard): "I'm Not Sure" is checked, even alongside documents.
  // If the user is unsure about anything, NextStep doesn't guess a path.
  if (answers.includes("not-sure")) {
    showMessage(
      "Let's check what you have first",
      "Before NextStep suggests where to begin, it helps to know which documents you currently have access to. " +
      "You could look through any paperwork you kept, or check with family, a case manager, or another trusted person. " +
      "When you know more, come back and update your answers."
    );
    return;
  }

  // Rule 3 (safeguard): "None of These" AND at least one document are checked.
  // "&&" means both conditions must be true. The answers contradict each
  // other, so we can't tell what is really missing and don't guess.
  if (answers.includes("none") && documentsHave.length > 0) {
    showMessage(
      "Your answers don't quite match",
      "You chose \"None of These\" and also at least one document. " +
      "Please double-check which documents you currently have access to, then update your answers."
    );
    return;
  }

  // Rule 4: the user has all four documents, so there is nothing to offer
  // in question 2. This prevents showing an empty list of choices.
  if (documentsMissing.length === 0) {
    showMessage(
      "You have all four documents listed",
      "You said you have access to all four documents NextStep covers right now. " +
      "NextStep doesn't offer steps for other documents yet."
    );
    return;
  }

  // No rule stopped us, so the answers are clear enough to continue.
  // ("None of These" on its own reaches here with all four documents missing.)
  showFirstDocumentQuestion(documentsMissing);
}

// =========================================
// 5. Question 2: which missing document to start with
// =========================================

// Shows question 2 with only the documents the user is missing.
// All four radio buttons already exist in the HTML; this loop hides the
// ones the user already has instead of building new elements.
function showFirstDocumentQuestion(documentsMissing) {
  const choices = firstForm.querySelectorAll(".choice");

  choices.forEach(function (choice) {
    const radio = choice.querySelector("input");
    const isMissing = documentsMissing.includes(radio.value);
    choice.hidden = !isMissing;  // hide the choice if the user already has it
    radio.checked = false;       // clear any earlier selection
  });

  firstForm.hidden = false;
  // Accessibility: move focus to question 2 so screen readers read it next
  firstFieldset.focus();
}

// Runs when the user presses "Show next steps" on question 2.
function handleFirstSubmit(event) {
  event.preventDefault();
  firstError.textContent = "";
  nextStepsBox.hidden = true;

  // Find the selected radio button. querySelector returns null
  // (meaning "nothing found") if no radio button is selected.
  const selectedRadio = firstForm.querySelector('input[name="first-document"]:checked');

  if (selectedRadio === null) {
    firstError.textContent = "Please choose a document to continue.";
    return;
  }

  showNextSteps(selectedRadio.value);
}

// =========================================
// 6. Result: three general next steps
// =========================================

// Builds the numbered list of steps for the chosen document.
// documentKey is one of the keys from ALL_DOCUMENTS, e.g. "state-id".
function showNextSteps(documentKey) {
  nextStepsTitle.textContent = "Next steps: " + documentNames[documentKey];

  // DOM manipulation: empty the list first so steps from an earlier
  // choice don't pile up, then create one <li> per step and add it.
  nextStepsList.innerHTML = "";
  nextStepsByDocument[documentKey].forEach(function (stepText) {
    const listItem = document.createElement("li");  // make a new <li>
    listItem.textContent = stepText;                  // put the step text inside
    nextStepsList.appendChild(listItem);              // add it to the <ol>
  });

  nextStepsBox.hidden = false;
  nextStepsTitle.focus();
}

// =========================================
// 7. Event listeners
// addEventListener("event", function) tells the browser: "when this event
// happens on this element, run this function." Nothing above runs until
// one of these events happens.
// =========================================

// Buttons that switch between the categories and the flow
startDocumentsButton.addEventListener("click", showDocumentsFlow);
backButton.addEventListener("click", showCategories);

// "submit" fires when a form's submit button is pressed OR Enter is
// pressed inside the form, so keyboard users get the same behavior.
haveForm.addEventListener("submit", handleHaveSubmit);
firstForm.addEventListener("submit", handleFirstSubmit);

// "change" fires whenever any checkbox in question 1 is ticked or unticked.
// Later steps were based on the old answers, so we hide them.
haveForm.addEventListener("change", function () {
  haveError.textContent = "";
  hideLaterSteps();
});

// If the user picks a different document in question 2, hide the old steps
firstForm.addEventListener("change", function () {
  firstError.textContent = "";
  nextStepsBox.hidden = true;
});

// Give both "Change my answers" buttons the same behavior:
// clear everything and move focus back to question 1.
changeAnswersButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    resetFlow();
    haveFieldset.focus();
  });
});
