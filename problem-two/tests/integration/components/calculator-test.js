import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    this.set('loanAmount','325000')
    this.set('loanTerm','12')
    this.set('interestRate','3.5')
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('calculate', function(){
      this.onSubmit({
        loanAmount: this.loanAmount,
        loanTerm: this.loanTerm,
        interestRate: this.interestRate
      })
    })

    await render(hbs`
      <Calculator />
    `)

    assert.equal(this.element.textContent.trim(), '')

    // Template block usage:
    await render(hbs`
      <Calculator />
    `)

    assert.equal(this.element.textContent.trim(), '')
  })
})
