# NextStep Prompt Log

## Entry 1 — V1 Planning and Scope

**Date / Week / Day:** September 29, 2026 — Week 3

**Activity:** Planning the first build iteration of NextStep

**Goal:** Create a clear, controlled plan for the first version of the NextStep landing page before allowing AI to write code.

**Original Prompt / D1:**  
I asked Claude to act as an expert in vanilla JavaScript, HTML, and CSS with a forward-looking UI vision. I explained the NextStep reentry problem, the five need categories, the eventual question-and-answer functionality, the features I wanted to leave out, and the failure mode I had identified.

**Why I prompted it this way:**  
I wanted Claude to understand the full purpose of the project, the intended users, the technology I am using, and the boundaries of the MVP.

**AI result:**  
Before building, I used Claude Code Plan Mode to review the project. Claude proposed a static HTML/CSS landing page with a header, main content, five category cards, footer, mobile-first CSS, accessibility considerations, and beginner-readable code.

**What I noticed:**  
My original prompt explained the overall project well, but it did not clearly control what Claude should build in the first iteration. The plan helped separate the full MVP from the first landing-page build.

**What I questioned or verified:**  
I questioned whether limiting the CSS and layout too much could make the interface feel too basic compared with the modern UI I wanted. I also questioned the semantic heading structure and made sure the category order would not imply that every reentry user should follow the same priority.

**What changed in the next iteration:**  
I clarified that V1 should only build the visual HTML/CSS foundation, remain beginner-readable, use system fonts, have a polished and modern design, treat the five categories as choices rather than priorities, and allow AI-drafted card descriptions only after human review.

**Final result:**  
A scoped V1 plan was created before any project code was generated. Claude was instructed to wait for human approval before implementation.

**What I learned:**  
A stronger prompt does more than explain what I want to build. It also defines what the AI is allowed to build now, what it should not build yet, and where human review should happen.


## Entry 2 — V1 Build and Visual Inspection

**Date / Week / Day:** September 29, 2026 — Week 3

**Activity:** Built and inspected the first visual version of NextStep.

**Goal:** Test whether the HTML/CSS landing-page foundation matched the project scope and the modern visual direction I wanted.

**Prompt:**  
I instructed Claude to build only the V1 landing-page structure and visual foundation using HTML and CSS, keep the code beginner-readable and commented, and stop before adding JavaScript functionality.

**Why I prompted it this way:**  
I wanted to control the build in stages instead of asking AI to create the entire application at once. I also wanted to understand and approve the code before moving forward.

**AI result:**  
Claude created a responsive landing page with a header, introduction, five reentry category cards, and footer using HTML and CSS.

**What I noticed:**  
I liked the clean layout, spacing, card design, and overall simplicity. The page looked smooth and organized, but it still felt more basic than the polished, forward-looking UI I originally pictured.

**What I questioned or verified:**  
When I first opened the page, the HTML appeared without styling. Instead of assuming the AI output worked, I checked the HTML/CSS and the verification process. After the CSS write completed and I refreshed the page, the styling loaded correctly. I also reviewed the HTML and CSS before approving Claude's edits.

**What changed in the next iteration:**  
For V2, I want to strengthen the visual design without changing the underlying functionality. I want a richer color spectrum, more translucent/glass-like surfaces, a stronger treatment for the introductory message, a more logo-like NextStep heading, and subtle card hover feedback while keeping the code understandable.

**Final result:**  
V1 successfully established the static HTML/CSS foundation and stayed within the intended scope.

**What I learned:**  
Running the page is part of verification. Code can look correct in the editor but still needs to be rendered and inspected before I decide that it works.


## Entry 3 — V2 Visual Refinement

**Date / Week / Day:** September 29, 2026 — Week 3

**Activity:** Refined the visual design of NextStep based on my V1 inspection.

**Goal:** Make the landing page feel more modern, welcoming, and visually polished without adding functionality or making the code unnecessarily complex.

**Prompt:**  
I asked Claude to keep the existing V1 structure but improve the visual design using a richer color spectrum, subtle glassmorphism, stronger visual emphasis for the introductory message, a more logo-like NextStep heading, and subtle hover feedback on the category cards.

**Why I prompted it this way:**  
After viewing V1 in the browser, I liked the clean layout but thought the page still looked too basic compared with the modern interface I pictured. I wanted someone opening NextStep to feel heard and supported rather than cast aside or overwhelmed.

**AI result:**  
Claude added a more colorful layered background, translucent card surfaces, stronger styling for the introductory message, a more distinctive NextStep treatment, and hover effects for the five category cards.

**What I noticed:**  
The colors are more vibrant, the interface has more depth, and the NextStep heading feels more like a logo. The page still keeps the clean structure I liked from V1.

**What I questioned or verified:**  
I manually hovered over the category cards and confirmed that the hover effect works. I also reviewed the NextStep heading and confirmed that the visual treatment improved the logo feel.

**What changed in the next iteration:**  
I decided to stop adding visual features for now and move to the JavaScript functionality. Additional styling can be saved for a final polish pass if time allows.

**Final result:**  
V2 created a stronger visual identity while preserving the simple MVP structure.

**What I learned:**  
Iteration works better when I inspect a real output and request specific changes instead of asking AI to generally “make it better.” I also learned that visual polish and application functionality can be developed separately.


## Entry 4 — V3 Vital Documents Logic and Verification

**Date / Week / Day:** September 29, 2026 — Week 3

**Activity:** Built and tested the first interactive decision flow for NextStep.

**Goal:** Add working JavaScript functionality to the Vital Documents category while building safeguards into the decision logic.

**Prompt:**  
I instructed Claude to add functionality only to Vital Documents. The user identifies which documents they currently have, chooses a missing document they want help with, and receives three general next steps. I also required the program to stop instead of guessing when the information was uncertain or contradictory.

**Why I prompted it this way:**  
I wanted to build one complete interaction before expanding the same pattern to the other categories. This kept the project easier to understand, test, and control.

**AI result:**  
Claude created a two-question Vital Documents flow using JavaScript. The program compares the user's selections against the documents NextStep currently covers, identifies what is missing, and displays three general next steps for the selected document.

**What I noticed:**  
The JavaScript uses arrays, functions, event listeners, DOM manipulation, and conditional logic to control the flow while keeping everything on one HTML page.

**What I questioned or verified:**  
I tested a normal path, uncertain input, conflicting answers, the all-documents boundary case, reset behavior, and the mobile layout. I confirmed that the program stops rather than guessing when the user selects “I'm Not Sure” or gives contradictory answers such as selecting a document together with “None of These.”

**What changed in the next iteration:**  
After testing the functionality, I improved the code comments so important HTML, CSS, JavaScript, accessibility, and safeguard logic are easier for me to understand and explain.

**Final result:**  
The Vital Documents flow works as intended and includes working safeguards for incomplete or conflicting information.

**What I learned:**  
Testing should include more than the expected user path. Trying uncertain, contradictory, and boundary inputs helped me verify that the safeguards actually change the program's behavior instead of existing only as a warning.


## Entry 5 — V4 Full MVP Expansion and Domain Verification

**Date / Week / Day:** September 30, 2026 — Week 3

**Activity:** Expanded NextStep from one working category to the complete five-category MVP and manually verified the decision flows.

**Goal:** Complete the core NextStep MVP while keeping the application simple, explainable, and within scope. I wanted all five categories to provide useful next steps while stopping or redirecting users when the tool did not have enough information to make a responsible recommendation.

**Prompt:**  
I instructed Claude to preserve the tested Vital Documents flow and extend the same general interaction pattern to Transportation, Housing, Employment, and Benefits. I provided the questions, possible user situations, domain-specific concerns, and safety constraints for each category. I also required Claude to reuse existing architecture where reasonable, keep the JavaScript beginner-readable, avoid APIs or databases, preserve accessibility and navigation, and stop before making recommendations in situations involving uncertainty, conflicting answers, supervision requirements, or benefit eligibility.

**Why I prompted it this way:**  
Before asking AI to build the remaining categories, I thought through common reentry barriers based on my experience. Transportation, housing, employment, and benefits do not all work the same way, so I did not want AI to create generic questions or make assumptions about what returning citizens need.

**AI result:**  
Claude expanded NextStep so all five categories became interactive. It reused shared JavaScript logic while allowing individual categories to have different questions, recommendations, and safeguards.

**What I noticed:**  
The application worked across the major paths I tested, but I noticed that the AI-generated Transportation flow left out help with actually using public transit. I also noticed that the Housing recommendations described program rules too generally and did not clearly include issues such as work restrictions, restrictions on leaving the property, or blackout periods.

**What I questioned or verified:**  
I manually tested normal and edge-case paths across the application. I tested contradictory Transportation answers, the Housing supervision safeguard, the Employment background-barrier path, uncertain Benefits input, a normal Benefits path, and the original Vital Documents contradiction safeguard. I also regression-tested a normal Vital Documents recommendation and checked the application at approximately phone width for layout problems.

**What changed in the next iteration:**  
I gave Claude a tightly scoped correction prompt. I added "Using public transit" as a Transportation need and required three general transit-planning steps without assuming a specific agency, fare, discount, or eligibility. I also required the Housing program guidance to explicitly include questions about work restrictions, leaving the property, and blackout or adjustment periods. I prohibited changes to the architecture, styling, other categories, safeguards, Prompt Log, and unrelated functionality.
  
**Final result:**  
V4 passed the targeted correction tests. All five categories are working, the tested safeguards remain intact, and the original Vital Documents functionality passed regression testing. I verified the final Transportation correction, the updated Housing program guidance, and the Housing supervision safeguard. I also checked the application at approximately phone width and confirmed that the layout remained usable without cut-off buttons or horizontal layout problems. With the core MVP verified, I froze V4 functionality for gate preparation.

**What I learned:**  
A program can work technically and still miss important parts of the real problem. My domain knowledge helped me identify gaps that were not obvious from simply checking whether the code ran. Verification includes reviewing whether the content and decision logic actually match the people and situations the tool is supposed to support.