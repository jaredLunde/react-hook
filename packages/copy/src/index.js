import {useState, useCallback, useEffect} from 'react'


export const copyToClipboard = text => {
  // uses the Async Clipboard API when available. Requires a secure browing
  // context (i.e. HTTPS)
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }
  // puts the text to copy into a <span>
  const span = document.createElement('span')
  span.textContent = text
  // preserves consecutive spaces and newlines
  span.style.whiteSpace = 'pre'
  // adds the <span> to the page
  document.body.appendChild(span)
  // makes a selection object representing the range of text selected by the user
  const selection = window.getSelection()
  const range = window.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)
  // copies text to the clipboard
  let success = false

  try {
    success = window.document.execCommand('copy')
  } catch (err) {
    console.log('error', err)
  }
  // cleans up the dom element and selection
  selection.removeAllRanges()
  window.document.body.removeChild(span)
  // the Async Clipboard API returns a promise that may reject with `undefined`
  // so we match that here for consistency
  return success ? Promise.resolve() : Promise.reject()
}

export default text => {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(
    () => {
      const promise = copyToClipboard(text)

      if (copied === false) {
        promise.then(() => setCopied(true))
      }
    },
    [text]
  )
  // reset 'copied' if text changes
  useEffect(() => () => setCopied(false), [text])
  return [copied, copy]
}
