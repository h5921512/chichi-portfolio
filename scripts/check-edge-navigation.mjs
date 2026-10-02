import assert from 'node:assert/strict'

// Run in the browser skill session with an About tab and its viewport capability.
export async function checkEdgeNavigation(tab, viewport) {
  const forward = tab.playwright.getByRole('link', { name: '前往 Works 作品頁' })
  const back = tab.playwright.getByRole('link', { name: '返回 About 關於我' })
  try {
    await viewport.set({ width: 1366, height: 900 })
    assert.equal(await forward.isVisible(), true)
    await forward.click()
    assert.match(await tab.url(), /\/works\/?$/)
    assert.equal(await back.isVisible(), true)
    await back.press('Enter')
    assert.equal(await forward.isVisible(), true)
    await forward.click()
    await tab.playwright.getByRole('link', { name: '2026 ABCD Unity-VR · Meta Quest 3 Team9 · 外包協作', exact: true }).click()
    assert.equal(await back.count(), 0)
    assert.equal(await forward.count(), 0)
    await tab.playwright.getByRole('link', { name: 'About', exact: true }).click()
    await viewport.set({ width: 375, height: 812 })
    assert.equal(await forward.isVisible(), false)
    assert.equal(await tab.playwright.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  } finally {
    await viewport.reset()
  }
}
