import assert from 'node:assert/strict'

// Run with a Browser skill tab open on /works.
export async function checkWorksAutoscroll(tab) {
  const row = tab.playwright.getByRole('list', { name: '作品列表，可用左右方向鍵切換' })
  const left = () => row.evaluate(el => el.scrollLeft)
  const sample = async () => {
    const before = await left()
    await new Promise(resolve => setTimeout(resolve, 500))
    return { before, after: await left() }
  }
  const bounds = await row.evaluate(el => el.getBoundingClientRect().toJSON())
  const x = Math.min(bounds.width - 50, 550)
  const y = bounds.top + 80
  await tab.cua.move({ x, y: bounds.top - 20 })
  let movement = await sample()
  assert.notEqual(movement.after, movement.before, 'Auto-scroll advances')
  await tab.cua.move({ x, y })
  movement = await sample()
  assert.equal(movement.after, movement.before, 'Hover pauses')
  const beforeDrag = await left()
  await tab.cua.drag({ path: [{ x, y }, { x: x - 40, y }, { x: x - 120, y }] })
  assert.ok(await left() > beforeDrag + 60, 'Dragging still scrolls')
  assert.match(await tab.url(), /\/works\/?$/, 'Dragging does not open a work')
  await tab.playwright.getByRole('button', { name: '暫停自動捲動' }).click()
  movement = await sample()
  assert.equal(movement.after, movement.before, 'Manual pause persists outside the row')
  await tab.playwright.getByRole('button', { name: '繼續自動捲動' }).click()
  const period = await row.evaluate(el => {
    const count = el.children.length / 2
    return el.children[count].offsetLeft - el.children[0].offsetLeft
  })
  await tab.cua.move({ x, y })
  await tab.cua.scroll({ x, y, scrollX: period - await left() - 8, scrollY: 0 })
  await new Promise(resolve => setTimeout(resolve, 500))
  assert.ok(Math.abs(await left() - (period - 8)) < 4, 'Reached loop seam')
  await tab.cua.move({ x, y: bounds.top - 20 })
  await new Promise(resolve => setTimeout(resolve, 1500))
  assert.ok(await left() < 100, 'Loop wraps to the matching first set')
  assert.equal(await tab.playwright.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
}
