import Component from '@ember/component'

export default Component.extend({
  loanAmount: '325000',
  loanTerm: '12',
  interestRate: '3.5',
  init() {
    this._super()
    this.onSubmit({
      loanAmount: this.loanAmount,
      loanTerm: this.loanTerm,
      interestRate: this.interestRate
    })
  },
  actions: {
    calculate() {
      this.onSubmit({
        loanAmount: this.loanAmount,
        loanTerm: this.loanTerm,
        interestRate: this.interestRate
      })
    }
  }
})
