// =========================================
// 1. Page elements
// document.querySelector() finds one element on the page using a CSS
// selector ("#categories" means the element with id="categories").
// We look each element up once here and store it in a variable, so the
// functions below can show, hide, read, or change it by name.
// =========================================
const categoriesSection = document.querySelector("#categories");

const categoryFlow = document.querySelector("#category-flow");
const flowTitle = document.querySelector("#flow-title");
const backButton = document.querySelector("#back-to-categories");

// Question 1 (the first question for whichever category is open)
const question1Form = document.querySelector("#question1-form");
const question1Fieldset = document.querySelector("#question1-fieldset");
const question1Legend = document.querySelector("#question1-legend");
const question1Hint = document.querySelector("#question1-hint");
const question1Choices = document.querySelector("#question1-choices");
const question1Error = document.querySelector("#question1-error");

// Housing-only supervision question (the housing safeguard)
const supervisionFieldset = document.querySelector("#supervision-fieldset");

// Message box used by the safeguards
const messageBox = document.querySelector("#flow-message");
const messageTitle = document.querySelector("#message-title");
const messageText = document.querySelector("#message-text");

// Question 2 ("Which would you like help with first?")
const question2Form = document.querySelector("#question2-form");
const question2Fieldset = document.querySelector("#question2-fieldset");
const question2Legend = document.querySelector("#question2-legend");
const question2Choices = document.querySelector("#question2-choices");
const question2Error = document.querySelector("#question2-error");

// Result box that lists the three next steps
const nextStepsBox = document.querySelector("#next-steps");
const nextStepsTitle = document.querySelector("#next-steps-title");
const nextStepsList = document.querySelector("#next-steps-list");
const resultNote = document.querySelector("#result-note");

// querySelectorAll() finds EVERY match, not just the first.
// There are five category buttons and two "Change my answers" buttons.
const categoryButtons = document.querySelectorAll(".category-button");
const changeAnswersButtons = document.querySelectorAll(".change-answers");

// =========================================
// 2. Stored data: the content for every category
// CATEGORIES is an object with one entry per category. The key (for example
// "housing") matches the data-category="" attribute on each card's button.
//
// Every category entry has the same fields:
//   title          heading shown at the top of the flow
//   question       question 1
//   hint           short instruction under question 1
//   inputType      "checkbox" (choose several) or "radio" (choose one)
//   options        array of question 1 answers: { value, label }
//   notSureTitle / notSureText   safeguard message for "I'm not sure"
//   conflictText   (only categories with a "none" answer) message for conflicting answers
//   secondQuestion question 2
//   secondError    error if question 2 is left blank
//   needs          object that looks up a readable name for each need key
//   nextSteps      object with an array of three general steps for each need key
//   resultNote     category-specific safety note shown with the steps ("" = none)
//
// All wording is intentionally general: no state rules, fees, office names,
// phone numbers, eligibility decisions, or promises.
// =========================================
const CATEGORIES = {

  // ---------- Vital Documents (same content as V3) ----------
  "vital-documents": {
    title: "Vital Documents",
    question: "Which of these documents do you currently have access to?",
    hint: "Choose all that apply.",
    inputType: "checkbox",
    options: [
      { value: "birth-certificate", label: "Birth Certificate" },
      { value: "social-security-card", label: "Social Security Card" },
      { value: "state-id", label: "State ID" },
      { value: "drivers-license", label: "Driver's License" },
      { value: "none", label: "None of These" },
      { value: "not-sure", label: "I'm Not Sure" },
    ],
    notSureTitle: "Let's check what you have first",
    notSureText:
      "Before NextStep suggests where to begin, it helps to know which documents you currently have access to. " +
      "You could look through any paperwork you kept, or check with family, a case manager, or another trusted person. " +
      "When you know more, come back and update your answers.",
    conflictText:
      "You chose \"None of These\" and also at least one document. " +
      "Please double-check which documents you currently have access to, then update your answers.",
    secondQuestion: "Which document would you like help with first?",
    secondError: "Please choose a document to continue.",
    needs: {
      "birth-certificate": "Birth Certificate",
      "social-security-card": "Social Security Card",
      "state-id": "State ID",
      "drivers-license": "Driver's License",
    },
    nextSteps: {
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
    },
    resultNote: "",
  },

  // ---------- Transportation ----------
  "transportation": {
    title: "Transportation",
    question: "What transportation do you currently have reliable access to?",
    hint: "Choose all that apply.",
    inputType: "checkbox",
    options: [
      { value: "public-transit", label: "Public transit" },
      { value: "bike-walk", label: "Bicycle / walking" },
      { value: "rides", label: "Rides from family, friends, or others" },
      { value: "program-help", label: "Transportation assistance through a program" },
      { value: "vehicle", label: "Personal vehicle" },
      { value: "none", label: "None right now" },
      { value: "not-sure", label: "I'm not sure" },
    ],
    notSureTitle: "Let's check your options first",
    notSureText:
      "Before NextStep suggests where to begin, it helps to know what transportation you can count on right now. " +
      "You could think about how you got to recent appointments, or ask family, a case manager, or another trusted person what options they know of. " +
      "When you know more, come back and update your answers.",
    conflictText:
      "You chose \"None right now\" and also at least one type of transportation. " +
      "Please double-check what you currently have reliable access to, then update your answers.",
    secondQuestion: "Which would you like help with first?",
    secondError: "Please choose one to continue.",
    needs: {
      "use-transit": "Using public transit",
      "find-assistance": "Finding transportation assistance",
      "reliable-plan": "Planning reliable transportation for work or appointments",
      "low-cost": "Exploring low-cost transportation options",
      "personal-transport": "Working toward personal transportation",
    },
    nextSteps: {
      "use-transit": [
        "Learn the routes and stops you would use for your regular trips, such as to work, appointments, or check-ins.",
        "Before you travel, check the schedules, any transfers, and the fare information for those trips.",
        "Plan extra time for important trips, and have a backup option in case a bus or train is late or doesn't come.",
      ],
      "find-assistance": [
        "Make a list of the trips you need to make each week, such as to work, appointments, or check-ins.",
        "Ask a case manager, reentry program, or supervising officer (if you have one) whether they know of transportation help you could look into.",
        "Before relying on any program, ask how it works, such as how far ahead to schedule a ride and which areas it covers.",
      ],
      "reliable-plan": [
        "List your regular trips, including the days, times, and addresses.",
        "For each trip, plan a main way to get there and a backup option in case something falls through.",
        "Leave extra time for important trips, like work or required appointments, especially while a route is new to you.",
      ],
      "low-cost": [
        "Compare the options you might use, such as transit, walking, biking, or shared rides, for the trips you make most often.",
        "Ask a case manager or reentry program whether they know of discounted passes or other low-cost options in your area.",
        "If you share rides, talk ahead of time about schedules and any costs so everyone knows what to expect.",
      ],
      "personal-transport": [
        "If driving is a goal, check whether you have a valid driver's license. The Vital Documents section has general steps for a license.",
        "Look up your state's official motor vehicle agency website to learn what applies to getting a license, registration, and insurance.",
        "Consider lower-cost steps, such as a bicycle, while you plan and save toward a bigger goal.",
      ],
    },
    resultNote: "",
  },

  // ---------- Housing ----------
  "housing": {
    title: "Housing",
    question: "What best describes your housing situation right now?",
    hint: "Choose one.",
    inputType: "radio",
    options: [
      { value: "transitional", label: "I have transitional or reentry housing" },
      { value: "with-others", label: "I'm staying temporarily with family or friends" },
      { value: "shelter", label: "I'm in a shelter or temporary housing" },
      { value: "looking", label: "I'm looking for housing right now" },
      { value: "stable", label: "I have stable housing" },
      { value: "not-sure", label: "I'm not sure what my housing plan is" },
    ],
    notSureTitle: "Let's check your housing plan first",
    notSureText:
      "Before NextStep suggests anything, it helps to know what your housing plan is. " +
      "A case manager, reentry program, or supervising officer (if you have one) may be able to help you confirm it. " +
      "When you know more, come back and update your answers.",
    secondQuestion: "Which would you like help with first?",
    secondError: "Please choose one to continue.",
    needs: {
      "find-transitional": "Finding transitional or reentry housing",
      "find-temporary": "Finding temporary housing",
      "understand-program": "Understanding a housing program before choosing it",
      "location-transport": "Thinking through location and transportation",
      "program-rules": "Identifying questions about program rules or restrictions",
      "long-term": "Planning toward longer-term housing",
    },
    nextSteps: {
      "find-transitional": [
        "Ask a case manager, reentry program, or supervising officer (if you have one) whether they know of transitional or reentry housing programs.",
        "Write down what matters most to you in a program, such as location, length of stay, and support services.",
        "Before choosing, ask each program about its rules, any costs, and what support it offers.",
      ],
      "find-temporary": [
        "If you need a place to stay tonight, contact a local shelter or ask a case manager or reentry program for help finding one.",
        "Keep important papers and a list of phone numbers together in one safe place while your housing is temporary.",
        "Ask how long you can stay and what is expected of you, so you can plan your next step.",
      ],
      "understand-program": [
        "Ask how long you can stay, what it costs (if anything), and what is included, such as meals or support services.",
        "Ask about the program's rules and whether they fit with your other responsibilities. Where they apply, ask about curfews, visitors, required activities, work restrictions, restrictions on leaving the property, and any blackout or adjustment period when you first arrive.",
        "Take notes and compare programs side by side before deciding.",
      ],
      "location-transport": [
        "Think about how far the housing is from work, appointments, and other places you need to go regularly.",
        "Check how you would get to those places from there, including transit routes and travel time.",
        "Consider what everyday needs are nearby, such as groceries, a pharmacy, or support services.",
      ],
      "program-rules": [
        "Ask staff for a written copy of the program's rules if you don't already have one.",
        "Write down any rules you have questions about, such as curfews, visitors, or time away, and ask staff to explain them.",
        "If a rule conflicts with work or another commitment, ask staff or your case manager what options may be available before making any change.",
      ],
      "long-term": [
        "Think about what you would want in longer-term housing, such as location, cost, and who you would live with.",
        "Ask a case manager or reentry program what longer-term housing options they know of and how people usually prepare.",
        "Start gathering things landlords or programs may ask for, such as ID, proof of income, or references.",
      ],
    },
    resultNote: "If your housing is connected to supervision, check with your supervising officer before making any changes.",
  },

  // ---------- Employment ----------
  "employment": {
    title: "Employment",
    question: "What is the biggest employment barrier you're dealing with right now?",
    hint: "Choose one.",
    inputType: "radio",
    options: [
      { value: "find-jobs", label: "I need help finding job opportunities" },
      { value: "background", label: "I'm concerned about my background affecting employment" },
      { value: "experience", label: "I don't have much recent work experience" },
      { value: "resume", label: "I need a resume or help improving one" },
      { value: "apply-online", label: "I need help applying for jobs online" },
      { value: "flexible", label: "I need flexible, temporary, or gig work" },
      { value: "not-sure", label: "I'm not sure where to start" },
    ],
    notSureTitle: "It's okay not to know where to start",
    notSureText:
      "NextStep doesn't have enough information to suggest a starting point yet. " +
      "A case manager, reentry program, or local employment program may be able to talk through your goals with you. " +
      "When you're ready, come back and choose the barrier that feels biggest.",
    secondQuestion: "Which would you like help with first?",
    secondError: "Please choose one to continue.",
    // Each answer maps to exactly one need with the same key, so question 2 is skipped
    needs: {
      "find-jobs": "Finding job opportunities",
      "background": "Preparing to talk about your background",
      "experience": "Building recent work experience",
      "resume": "Creating or improving a resume",
      "apply-online": "Applying for jobs online",
      "flexible": "Finding flexible or temporary work",
    },
    nextSteps: {
      "find-jobs": [
        "Write down the kinds of work you have done or would like to do, including skills from any setting.",
        "Ask a case manager, reentry program, or local employment center about job listings and hiring events.",
        "Keep a simple list of the jobs you apply for, with dates and any follow-up.",
      ],
      "background": [
        "If you have questions about how your record may come up in hiring, talk with a reentry program or legal aid organization. They can explain what applies where you live.",
        "Practice a short, honest explanation that focuses on what you have learned and what you can offer an employer now.",
        "Ask a case manager or reentry program whether they know of employers or programs that describe themselves as open to hiring people with records.",
      ],
      "experience": [
        "List skills you have built anywhere, including past jobs, training, volunteering, or work assignments while incarcerated.",
        "Ask a reentry or employment program about training, apprenticeship, or volunteer options that could build recent experience.",
        "Consider short-term or entry-level work as a way to build a recent work history.",
      ],
      "resume": [
        "Write down your past jobs, training, certificates, and skills, with approximate dates.",
        "Ask a reentry program, library, or employment center whether they offer help with resumes.",
        "Keep a simple, one-page version that you can adjust for different jobs.",
      ],
      "apply-online": [
        "Find a place with computer access, such as a library or employment center, if you don't have your own.",
        "Set up an email address you will check regularly, and keep your login information somewhere safe.",
        "Ask staff at a library, reentry program, or employment center for help with online applications.",
      ],
      "flexible": [
        "Think about the schedule you need, such as time for appointments, check-ins, or family responsibilities.",
        "Ask a reentry program or employment center about temporary staffing agencies or short-term work they know of.",
        "Before starting any gig or temporary job, ask how and when you will be paid and what costs you might need to cover.",
      ],
    },
    resultNote: "NextStep can't tell you how your record may affect a specific job.",
  },

  // ---------- Benefits ----------
  "benefits": {
    title: "Benefits",
    question: "What type of benefits or assistance are you looking for right now?",
    hint: "Choose all that apply.",
    inputType: "checkbox",
    options: [
      { value: "food", label: "Food assistance" },
      { value: "health", label: "Health coverage" },
      { value: "cash", label: "Cash or financial assistance" },
      { value: "disability", label: "Disability-related support or accommodations" },
      { value: "community", label: "Community programs or other assistance" },
      { value: "not-sure", label: "I'm not sure what help may be available" },
    ],
    notSureTitle: "Let's learn what's available first",
    notSureText:
      "NextStep can't tell which kinds of help may fit your situation. " +
      "A case manager, reentry program, or community organization may be able to talk through options with you. " +
      "When you have a better idea of what you're looking for, come back and update your answers.",
    secondQuestion: "Which would you like to look into first?",
    secondError: "Please choose one to continue.",
    // Each answer is also a need key, so the user's answers become the question 2 choices
    needs: {
      "food": "Food assistance",
      "health": "Health coverage",
      "cash": "Cash or financial assistance",
      "disability": "Disability-related support or accommodations",
      "community": "Community programs or other assistance",
    },
    nextSteps: {
      "food": [
        "Look up your state's official food assistance program website to learn how to apply.",
        "Ask a case manager, reentry program, or community organization about local food resources, such as food banks.",
        "Keep notes on anything you apply for, including dates and any letters you receive.",
      ],
      "health": [
        "Look up your state's official health coverage website to learn what options may be available.",
        "If you take medication or have ongoing health needs, write them down so you can ask about them when you look into coverage.",
        "Ask a case manager or reentry program whether they can help you with an application.",
      ],
      "cash": [
        "Look up your state's official public assistance website to learn what programs may exist and how to apply.",
        "Gather documents you already have, such as ID or proof of income, in case you are asked for them.",
        "Ask a case manager, reentry program, or community organization about other financial help they may know of.",
      ],
      "disability": [
        "Write down any conditions or needs you would like support with, and any records or providers connected to them.",
        "Look up the official Social Security Administration website or your state's official disability services website to learn about disability-related programs.",
        "Ask a case manager, reentry program, or disability advocacy organization to help you understand your options, including workplace accommodations.",
      ],
      "community": [
        "Ask a case manager or reentry program what community programs they know of, such as help with clothing, a phone, or mentoring.",
        "Check with local libraries, community centers, or faith-based organizations, which sometimes share information about local help.",
        "Keep a list of the places you contact, with names, dates, and what you learned.",
      ],
    },
    resultNote: "Only the agency that runs a program can decide whether you qualify.",
  },
};

// The four documents, in order. Used by decideVitalDocuments() to work out
// which documents are missing.
const ALL_DOCUMENTS = ["birth-certificate", "social-security-card", "state-id", "drivers-license"];

// =========================================
// 3. State: what the user is doing right now
// These variables change as the user moves around the page ("let" instead
// of "const" because their values are replaced).
// =========================================
let currentCategory = null;     // key of the open category, e.g. "housing"
let lastCategoryButton = null;  // the card button that opened it (for returning focus)

// =========================================
// 4. Showing, hiding, and resetting
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
  question2Form.hidden = true;
  nextStepsBox.hidden = true;
  question2Error.textContent = "";
}

// Puts the open flow back to its starting state.
// form.reset() is a built-in method that unchecks every box and radio
// button inside that form. Then we clear errors and hide later steps.
function resetFlow() {
  question1Form.reset();
  question2Form.reset();
  question1Error.textContent = "";
  hideLaterSteps();
}

// Builds a list of choices (label + checkbox or radio button) inside a container.
//   container:  the empty <div> to fill
//   choices:    array of { value, label }
//   inputType:  "checkbox" or "radio"
//   groupName:  the name="" shared by all inputs in this group
// DOM manipulation: createElement makes a new element, and appendChild
// puts one element inside another.
function buildChoices(container, choices, inputType, groupName) {
  container.innerHTML = "";  // remove choices from any earlier category

  choices.forEach(function (choice) {
    const label = document.createElement("label");
    label.className = "choice";

    const input = document.createElement("input");
    input.type = inputType;
    input.name = groupName;
    input.value = choice.value;

    // The input goes inside the label, so clicking the text also checks the box
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + choice.label));
    container.appendChild(label);
  });
}

// Opens a category: hides the cards, fills the shared flow section with
// this category's content, and shows it.
function openCategory(categoryKey) {
  currentCategory = categoryKey;
  const data = CATEGORIES[categoryKey];

  flowTitle.textContent = data.title;
  question1Legend.textContent = data.question;
  question1Hint.textContent = data.hint;
  buildChoices(question1Choices, data.options, data.inputType, "answer");

  // Only Housing asks the supervision question
  supervisionFieldset.hidden = categoryKey !== "housing";

  resetFlow();
  categoriesSection.hidden = true;
  categoryFlow.hidden = false;
  // Accessibility: move focus to the new heading. Without this, keyboard
  // and screen reader users would be left on a button that just vanished.
  // (The heading has tabindex="-1" in the HTML so it is allowed to receive focus.)
  flowTitle.focus();
}

// Goes back from a flow to the category cards (the "Back" button).
// Focus returns to the card button the user started from.
function showCategories() {
  resetFlow();
  currentCategory = null;
  categoryFlow.hidden = true;
  categoriesSection.hidden = false;
  if (lastCategoryButton !== null) {
    lastCategoryButton.focus();
  }
}

// Fills in and shows the message box. Used when NextStep should NOT
// recommend a path (the safeguards) or has nothing to recommend.
// textContent inserts plain text, which is safer than inserting HTML.
function showMessage(title, text) {
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageBox.hidden = false;
  messageTitle.focus();
}

// =========================================
// 5. Question 1: shared checks for every category
// =========================================

// Collects the answers to question 1 into an array.
// ':checked' matches ticked checkboxes AND selected radio buttons, so this
// works for both kinds of question. Example result: ["rides", "none"]
function getCheckedAnswers() {
  const checkedInputs = question1Form.querySelectorAll('input[name="answer"]:checked');
  const answers = [];
  checkedInputs.forEach(function (input) {
    answers.push(input.value);
  });
  return answers;
}

// Runs when the user presses "Continue" on question 1.
function handleQuestion1Submit(event) {
  // Forms normally reload the page when submitted. preventDefault() stops
  // that so our script can handle the answers instead.
  event.preventDefault();
  question1Error.textContent = "";
  hideLaterSteps();

  const data = CATEGORIES[currentCategory];
  const answers = getCheckedAnswers();

  // ---- Shared safeguards (the same for every category) ----
  // The rules are checked from top to bottom. Each one ends with "return",
  // which exits the function immediately, so only the FIRST matching rule
  // runs. The order matters: safeguards come before any recommendation.

  // Rule 1: nothing selected, so ask the user to choose something
  if (answers.length === 0) {
    question1Error.textContent = "Please choose at least one option to continue.";
    return;
  }

  // Rule 2 (safeguard): "I'm not sure" is selected, even alongside other answers.
  // Every category uses value="not-sure", so one rule covers all five.
  // If the user is unsure, NextStep doesn't guess a path.
  if (answers.includes("not-sure")) {
    showMessage(data.notSureTitle, data.notSureText);
    return;
  }

  // Rule 3 (safeguard): "None" AND another answer are checked ("&&" means both
  // must be true). The answers contradict each other, so we don't guess.
  // Only Vital Documents and Transportation have a "none" answer.
  if (answers.includes("none") && answers.length > 1) {
    showMessage("Your answers don't quite match", data.conflictText);
    return;
  }

  // ---- Category-specific decisions ----
  // Each category has its own small decision function (section 6).
  // This if / else if chain picks the right one for the open category.
  if (currentCategory === "vital-documents") {
    decideVitalDocuments(answers);
  } else if (currentCategory === "transportation") {
    decideTransportation(answers);
  } else if (currentCategory === "housing") {
    decideHousing(answers);
  } else if (currentCategory === "employment") {
    decideEmployment(answers);
  } else if (currentCategory === "benefits") {
    decideBenefits(answers);
  }
}

// =========================================
// 6. Category decision functions
// Each function looks at the answers and either shows a message (and stops)
// or calls showSecondQuestion() with the list of need keys to offer.
// The shared safeguards in section 5 have already run by this point.
// =========================================

// Vital Documents: offer the documents the user is missing.
function decideVitalDocuments(answers) {
  // .filter() builds a new array with only the items where the function
  // returns true. Here: documents that were NOT checked ("!" means not).
  const documentsMissing = ALL_DOCUMENTS.filter(function (doc) {
    return !answers.includes(doc);
  });

  // The user has all four documents, so there is nothing to offer.
  // This prevents showing an empty list of choices.
  if (documentsMissing.length === 0) {
    showMessage(
      "You have all four documents listed",
      "You said you have access to all four documents NextStep covers right now. " +
      "NextStep doesn't offer steps for other documents yet."
    );
    return;
  }

  // "None of These" on its own reaches here with all four documents missing
  showSecondQuestion(documentsMissing);
}

// Transportation: three needs are always offered; the others are offered
// only when the user doesn't already have that kind of transportation.
// The list is never empty, because three needs are always included.
function decideTransportation(answers) {
  const needs = [];

  // Always offered: transit planning helps whether or not the user already
  // rides transit (learning routes, schedules, and backup options)
  needs.push("use-transit");
  if (!answers.includes("program-help")) {
    needs.push("find-assistance");
  }
  needs.push("reliable-plan");  // useful for everyone
  needs.push("low-cost");       // useful for everyone
  if (!answers.includes("vehicle")) {
    needs.push("personal-transport");
  }

  showSecondQuestion(needs);
}

// Housing: check the supervision question FIRST, then offer needs that fit
// the user's situation. No housing step tells anyone to leave, reject, or
// change a placement.
function decideHousing(answers) {
  const supervisionAnswer = question1Form.querySelector('input[name="supervision"]:checked');

  // The supervision question must be answered before we can continue
  if (supervisionAnswer === null) {
    question1Error.textContent = "Please answer both questions to continue.";
    return;
  }

  // Housing safeguard: if housing may be connected to supervision ("yes" or
  // "not sure"), NextStep does not make suggestions. "||" means "or".
  if (supervisionAnswer.value === "yes" || supervisionAnswer.value === "not-sure") {
    showMessage(
      "Check with your supervision contact first",
      "Because your housing may be connected to supervision, NextStep can't make suggestions about it. " +
      "Before making any change to where you live, please check with your supervising officer or case manager. " +
      "They can tell you what applies to your situation."
    );
    return;
  }

  // Housing is a radio question, so there is exactly one answer: answers[0]
  const situation = answers[0];

  if (situation === "transitional") {
    showSecondQuestion(["program-rules", "location-transport", "long-term"]);
  } else if (situation === "with-others" || situation === "shelter") {
    showSecondQuestion(["find-transitional", "understand-program", "location-transport", "long-term"]);
  } else if (situation === "looking") {
    showSecondQuestion(["find-transitional", "find-temporary", "understand-program", "location-transport"]);
  } else if (situation === "stable") {
    showSecondQuestion(["location-transport", "long-term"]);
  }
}

// Employment: each barrier matches exactly one need with the same key,
// so showSecondQuestion() receives one need and goes straight to the steps.
function decideEmployment(answers) {
  showSecondQuestion([answers[0]]);
}

// Benefits: each checked type of help is also a need key, so the user's
// answers become the choices for question 2.
function decideBenefits(answers) {
  showSecondQuestion(answers);
}

// =========================================
// 7. Question 2: which need to start with
// =========================================

// Shows question 2 with only the needs chosen by the decision function.
function showSecondQuestion(needKeys) {
  // If there is only one need, asking "which first?" would be pointless,
  // so skip straight to the next steps.
  if (needKeys.length === 1) {
    showNextSteps(needKeys[0]);
    return;
  }

  const data = CATEGORIES[currentCategory];

  // Turn each need key into a { value, label } choice for buildChoices()
  const choices = [];
  needKeys.forEach(function (key) {
    choices.push({ value: key, label: data.needs[key] });
  });

  question2Legend.textContent = data.secondQuestion;
  buildChoices(question2Choices, choices, "radio", "need");
  question2Form.hidden = false;
  // Accessibility: move focus to question 2 so screen readers read it next
  question2Fieldset.focus();
}

// Runs when the user presses "Show next steps" on question 2.
function handleQuestion2Submit(event) {
  event.preventDefault();
  question2Error.textContent = "";
  nextStepsBox.hidden = true;

  // Find the selected radio button. querySelector returns null
  // (meaning "nothing found") if no radio button is selected.
  const selectedRadio = question2Form.querySelector('input[name="need"]:checked');

  if (selectedRadio === null) {
    question2Error.textContent = CATEGORIES[currentCategory].secondError;
    return;
  }

  showNextSteps(selectedRadio.value);
}

// =========================================
// 8. Result: three general next steps
// =========================================

// Builds the numbered list of steps for the chosen need.
// needKey is one of the keys in the open category's "needs", e.g. "low-cost".
function showNextSteps(needKey) {
  const data = CATEGORIES[currentCategory];
  nextStepsTitle.textContent = "Next steps: " + data.needs[needKey];

  // DOM manipulation: empty the list first so steps from an earlier
  // choice don't pile up, then create one <li> per step and add it.
  nextStepsList.innerHTML = "";
  data.nextSteps[needKey].forEach(function (stepText) {
    const listItem = document.createElement("li");  // make a new <li>
    listItem.textContent = stepText;                  // put the step text inside
    nextStepsList.appendChild(listItem);              // add it to the <ol>
  });

  // Show the category's safety note, or hide the note if this category has none
  resultNote.textContent = data.resultNote;
  resultNote.hidden = data.resultNote === "";

  nextStepsBox.hidden = false;
  nextStepsTitle.focus();
}

// =========================================
// 9. Event listeners
// addEventListener("event", function) tells the browser: "when this event
// happens on this element, run this function." Nothing above runs until
// one of these events happens.
// =========================================

// Every card button opens its own category. The button's data-category
// attribute (read with button.dataset.category) says which one.
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    lastCategoryButton = button;
    openCategory(button.dataset.category);
  });
});

backButton.addEventListener("click", showCategories);

// "submit" fires when a form's submit button is pressed OR Enter is
// pressed inside the form, so keyboard users get the same behavior.
question1Form.addEventListener("submit", handleQuestion1Submit);
question2Form.addEventListener("submit", handleQuestion2Submit);

// "change" fires whenever any answer in question 1 (including the housing
// supervision question) changes. Later steps were based on the old answers,
// so we hide them.
question1Form.addEventListener("change", function () {
  question1Error.textContent = "";
  hideLaterSteps();
});

// If the user picks a different need in question 2, hide the old steps
question2Form.addEventListener("change", function () {
  question2Error.textContent = "";
  nextStepsBox.hidden = true;
});

// Give both "Change my answers" buttons the same behavior:
// clear everything and move focus back to question 1.
changeAnswersButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    resetFlow();
    question1Fieldset.focus();
  });
});
