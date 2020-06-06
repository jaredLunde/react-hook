import * as React from 'react'

function useCopy(text: string) {
  const [copied, setCopied] = React.useState(false)
  const reset = React.useRef(() => setCopied(false))
  // Resets 'copied' if text changes
  React.useEffect(() => reset.current, [text])
  return {
    copied,
    copy: React.useCallback(
      () =>
        copyToClipboard(text)
          .then(() => setCopied(true))
          .catch(() => setCopied((copied) => copied)),
      [text]
    ),
    reset: reset.current,
  } as const
}
/* istanbul ignore next */
function copyToClipboard(text: string) {
  // uses the Async Clipboard API when available. Requires a secure browing
  // context (i.e. HTTPS)
  if (navigator.clipboard) return navigator.clipboard.writeText(text)
  // puts the text to copy into a <span>
  const span = document.createElement('span')
  span.textContent = text
  // preserves consecutive spaces and newlines
  span.style.whiteSpace = 'pre'
  // adds the <span> to the page
  document.body.appendChild(span)
  // makes a selection object representing the range of text selected by the user
  const selection = window.getSelection()
  if (!selection) return Promise.reject()
  const range = window.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)
  // copies text to the clipboard
  try {
    window.document.execCommand('copy')
  } catch (err) {
    return Promise.reject()
  }
  // cleans up the dom element and selection
  selection.removeAllRanges()
  window.document.body.removeChild(span)
  // the Async Clipboard API returns a promise that may reject with `undefined`
  // so we match that here for consistency
  return Promise.resolve()
}

export default useCopy
