import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | header', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('title', 'Amortization Calculator')
    this.set('subtitle', 'Jordan Schuringa')

    await render(hbs`{{header title=title subtitle=subtitle}}`)

    assert.equal(this.element.textContent.trim(), '')
  })
})
