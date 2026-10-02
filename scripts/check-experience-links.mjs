import assert from 'node:assert/strict'

// Run in the browser skill session with a tab showing About.
export async function checkExperienceLinks(tab) {
  const destinations = [
    ['A Black Climbing Dog', 'abcd'],
    ['Muze XR', 'muzexr'],
    ['Wave', 'sophon-wave'],
    ['VR 虛擬商城', 'vr-mall'],
    ['VR CPR 教學', 'vr-cpr'],
    ['Explorer', 'explorer'],
  ]
  for (const [name, slug] of destinations) {
    await tab.playwright.getByRole('region', { name: '經歷與學歷 Experience' }).getByRole('link', { name, exact: true }).click()
    assert.equal(new URL(await tab.url()).pathname.split('/').pop(), slug)
    assert.equal(await tab.playwright.getByRole('main').isVisible(), true)
    assert.equal(await tab.playwright.getByText('Page not found.', { exact: true }).count(), 0)
    await tab.playwright.getByRole('link', { name: 'About', exact: true }).click()
  }
}
