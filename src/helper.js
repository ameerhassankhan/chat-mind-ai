// true for "**text**" and "(**text**)" only
export function checkHeading(str) {
  return /^\(?\*\*(.+?)\*\*\)?$/.test(str);
}

// true for "**text*" and "(**text*)" only — rejects "**text**"
export function checkSubHeading(str) {
  return /^\(?\*\*(?!.*\*\*$)(.+?)\*\)?$/.test(str);
}

// Removes leading ** and trailing * OR ** (and optional surrounding parentheses).
// Returns the inner text, or the original string if it doesn't match.
export function removeHeadingStars(str) {
  const m = str.match(/^\(?\*\*(.+?)(\*\*|\*)\)?$/);
  return m ? m[1] : str;
}
