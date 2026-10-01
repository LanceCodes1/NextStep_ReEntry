# NextStep

NextStep is a simple interactive reentry tool designed to help people returning home after incarceration identify an immediate need and determine what to tackle first.

Users can explore five common reentry areas:

- Vital Documents
- Transportation
- Housing
- Employment
- Benefits

After answering one or two questions, NextStep provides three general next steps or stops the recommendation when the information needs to be clarified or verified first.

## Why I Built It

Reentry can involve many interconnected and time sensitive needs at once. Someone returning home may be dealing with identification, transportation, housing, employment, benefits, supervision requirements, and other responsibilities simultaneously.

NextStep was designed to reduce some of that overwhelm by helping the user focus on one area at a time.

## Built With

- HTML
- CSS
- JavaScript
- Git and GitHub
- AI-assisted development with Claude Code

## Trustworthy AI

I used the Map, Measure, Manage framework while developing NextStep.

**Map:** General guidance could be incomplete, outdated, or not applicable to a user's individual circumstances. A user could trust that guidance and make a decision that creates delays, setbacks, or other problems.

**Measure:** I tested normal paths along with uncertain, contradictory, boundary, and supervision-sensitive inputs. I also performed regression testing after expanding the application and checked the interface at approximately mobile width.

**Manage:** I built constraints into the JavaScript decision logic. When information is uncertain, contradictory, or requires outside verification, NextStep can stop the normal recommendation flow rather than confidently providing potentially inappropriate next steps.

## Verification

Testing included:

- Normal recommendation paths
- "I'm Not Sure" responses
- Contradictory selections
- Housing involving supervision requirements
- Benefits uncertainty
- Vital Documents regression testing
- Back/reset navigation
- Mobile-width layout testing

During testing, I also identified that an AI-generated version omitted an important public transit use case and made part of the housing guidance too general. I corrected those issues with a tightly scoped prompt and retested the affected flows.

## Current Scope

NextStep is an MVP. It does not currently include:

- User accounts
- A database or backend
- Personal data collection
- Live resource or API integrations
- An AI chatbot
- Legal or eligibility determinations
- County-specific or supervision-specific recommendations

## Development Note

This project was developed with AI-assisted coding tools. AI was used for planning, code generation, debugging, and iteration. All implementation decisions, testing, verification, and final changes were reviewed and controlled by the project author.

## Future Development

Future versions could incorporate verified local resources and location-aware support while maintaining human verification and clear safety boundaries for consequential decisions.
