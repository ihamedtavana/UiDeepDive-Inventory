export const description = "Auth components are the building blocks of the Sign in, Email OTP, Reset password and Sign up screens: Step Icon (animated tile above each heading), OTP Input, Password Rules, Profile Photo, Verified Details and ID Badge. The fields themselves use Input Field and messages use Callout."
export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."
export const auditIntro = "Findings collected while documenting these components. Nothing has been changed in the components or tokens — these are suggestions for the team to review."

export const metrics = [
  ["6", "Components"],
  ["31", "Variants in total"],
  ["55", "Instances on the Final page"],
  ["25+", "Auth screens"],
] as const

export const guidelines = [
  ["Use one Step Icon per step, matching what the step is doing.", "Use the in-progress icons (Verifying, Creating) on a static step."],
  ["Let the OTP accept paste and auto-advance.", "Make people click each box."],
  ["Show the password rules while typing, not only after submit.", "Hide the rules until there is an error."],
] as const

export const anatomyHeadings = ["Component", "Size", "Details"] as const
export const anatomy = [
  ["Auth / Step Icon", "56×56", "background/surface/secondary · border/primary · radius/XL · 24px icon. In-progress states add an orange arc."],
  ["Auth / OTP Input", "400×100", "Label “Verification code” (Label/SM-Default) · 6 digit boxes 60×52 (radius/MD, Gap/MD) · helper (Caption/SM-Regular). One real input with autocomplete=\"one-time-code\"."],
  ["Auth / Password Rules", "400×56", "3 rules: 8 characters · upper and lower case · one number. Icon + Caption/SM-Regular; met = green."],
  ["Auth / Profile Photo", "400×80", "Avatar (radius/full) · title · hint · Replace / Remove / Upload buttons."],
  ["Auth / Verified Details", "400×107", "Read-only rows: Email + Verified badge + Change; Role “set by your admin”."],
  ["Auth / ID Badge", "280×284", "Staff card on the welcome screen: logo, photo or avatar, name, role, badge ID, Verified."],
] as const

export const propertiesHeadings = ["Component", "Property", "Type", "Values"] as const
export const properties = [
  ["Step Icon", "State", "Variant", "Key · Lock · Email · Verifying · Code Error · Expired · User Add · Profile Search · Profile · Profile Error · Creating · Processing · Confirmed · Error"],
  ["OTP Input", "State", "Variant", "Empty · Focused · Typing · Filled · Error · Blocked · Verifying"],
  ["Password Rules", "State", "Variant", "Empty · Partial · Met"],
  ["Profile Photo", "Source", "Variant", "Directory · Empty · Uploading"],
  ["Verified Details", "Email · Role · Show Role", "Text · Text · Variant", "Any · Any · Yes / No"],
  ["ID Badge", "Name · Role · Badge ID · Show Role · Photo", "Text ×3 · Boolean · Variant", "Any · true/false · Yes / No"],
] as const

export const statesHeadings = ["OTP state", "Digit boxes", "Helper"] as const
export const states = [
  ["Empty", "border/primary/default", "“Enter the 6-digit code. You can paste it.”"],
  ["Focused", "First box border/accent", "Same"],
  ["Typing · Filled", "border/strong-subtle, digits text/primary", "Same"],
  ["Error", "feedback/error/secondary/border", "“That code isn’t right.” (error text)"],
  ["Blocked", "background/surface/secondary", "“Send a new code to continue.”"],
  ["Verifying", "Digits text/tertiary", "Same"],
] as const

export const tokensHeadings = ["Part", "Token", "Note"] as const
export const tokens = [
  ["Tiles · boxes", "background/surface/secondary · /primary · border/primary · border/accent · feedback/error/secondary/border · radius/XL · radius/MD", "—"],
  ["Text", "Label/SM-Default · Label/MD · Caption/SM · Title/SM · Title/MD · text/primary / secondary / tertiary", "—"],
  ["Rules", "icon/tertiary · feedback/success/primary/text", "Met 5.02:1"],
  ["ID Badge", "background/brand/primary · background/primary · radius/XL · radius/full", "background/primary is outside the background/surface/… naming"],
] as const

export const contextHeadings = ["Variant", "Example", "Count"] as const
export const context = [
  ["Step Icon", "13 of 14 states, one per step across Sign in, OTP, Reset password and Sign up", "29"],
  ["OTP Input", "Typing, Focused, Error, Blocked, Verifying — RC-02, SU-03, SI-05 to SI-10", "8"],
  ["Password Rules", "Met, Partial, Empty — RC-03, SU-05, SU-06, SU-08, SU-09", "6"],
  ["Profile Photo", "Directory, Empty — SU-05, SU-06, SU-08, SU-09", "5"],
  ["Verified Details", "Show Role Yes / No — SU-05 to SU-09", "5"],
  ["ID Badge", "Photo Yes — SI-11 Welcome back · SU-11 Welcome aboard", "2"],
  ["Not used", "Step Icon · Processing · OTP · Empty, Filled · Profile Photo · Uploading · ID Badge · no photo", "0"],
] as const

export const accessibilityHeadings = ["Check", "Detail", "Status"] as const
export const accessibility = [
  ["OTP", "One real input with autocomplete=\"one-time-code\" (per the description).", "Pass"],
  ["Step Icon", "Decorative — hide from screen readers; the heading carries the meaning.", "Required"],
  ["Password rules", "Unmet rules use text/tertiary (2.52:1); announce changes with aria-live.", "Fail"],
  ["Helper text", "OTP helper and Verified Details labels use text/tertiary.", "Fail"],
  ["Motion", "Step Icon arcs and ID Badge entrance must respect reduced motion.", "Required"],
] as const

export const auditHeadings = ["Finding", "Where", "Details", "Severity"] as const
export const audit = [
  ["Variant used as boolean", "Verified Details · ID Badge", "“Show Role” is a Variant (Yes / No) in Verified Details but a Boolean in ID Badge. “Photo” is also a Yes / No variant.", "Warning"],
  ["Text not exposed", "OTP Input · Password Rules", "OTP label and helper, and the three password rules, are fixed text. The Error helper can’t show “4 tries left”.", "Warning"],
  ["Mixed meaning in one property", "Step Icon", "14 states mix the icon (Key, Email, Profile) with the status (Verifying, Error). Splitting into Icon × Status would cut variants.", "Info"],
  ["Naming", "All six", "“Auth / …” prefix differs from other feature components (Input Field, Callout have none).", "Info"],
  ["Layer names", "ID Badge · Verified Details", "8 + 3 layers keep default names.", "Info"],
  ["Token naming", "ID Badge", "Uses background/primary, outside the background/surface/… structure.", "Info"],
  ["Contrast", "Rules · helpers", "text/tertiary 2.52:1.", "Error"],
  ["Not tokenized", "Preview spacing", "Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.", "Not tokenized"],
] as const
