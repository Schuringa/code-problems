import Route from '@ember/routing/route'

export default Route.extend({
  model() {
    return {
      payment: '',
      compoundingRate: '',
      payments: '',
      totalPaid: '',
      totalPayment: '',
      totalInterest: '',
      totalInterestPaid: '',
      savedInterest: ''
    }
  },
  actions: {
    onSubmit(data) {
      alert(JSON.stringify(data))
    },
    compoundingRate: function() {
      return this.get('interestRate') / 100 / 12 // compounding monthly
    },
    payment: function() {
      let loanAmount = +this.get('loanAmount'),
        loanTerm = +this.get('loanTerm'),
        compoundingRate = this.get('compoundingRate')

      if (+compoundingRate === 0) {
        return Math.round(loanAmount / loanTerm, 2)
      }

      let payment =
        (compoundingRate * loanAmount) /
        (1 - Math.pow(1 + compoundingRate, -loanTerm))
      return Math.round(payment, 2)
    },
    payments: function() {
      let principle = +this.get('loanAmount'),
        compoundingRate = this.get('compoundingRate'),
        payment = this.get('payment'),
        extra = +this.get('extraPrinciple'),
        interest,
        startingPrinciple,
        i = 1,
        payments = []
      while (principle > 0) {
        interest = Math.round(principle * compoundingRate, 2)

        if (principle + interest < payment) {
          payment = principle + interest
          extra = 0
        }
        if (principle + interest - payment < extra) {
          extra = principle + interest - payment
        }
        startingPrinciple = principle
        principle = Math.round(principle + interest - payment - extra, 2)
        payments.push({
          id: i++,
          principle,
          interest,
          payment,
          extra,
          startingPrinciple
        })
      }
      return payments
    },
    totalPaid: function() {
      let payments = this.get('payments')
      return Math.sum(payments, 'payment') + Math.sum(payments, 'extra')
    },
    totalPayment: function() {
      let payment = this.get('payment'),
        extra = +this.get('extraPrinciple')

      return Math.round(payment + extra, 2)
    },
    totalInterest: function() {
      let principle = +this.get('loanAmount'),
        compoundingRate = this.get('compoundingRate'),
        payment = this.get('payment'),
        total = 0,
        interest
      while (principle > 0) {
        interest = Math.round(principle * compoundingRate, 2)

        if (principle + interest < payment) {
          payment = principle + interest
        }

        principle = Math.round(principle + interest - payment, 2)
        total = total + interest
      }
      return Math.round(total, 2)
    },
    totalInterestPaid: function() {
      let payments = this.get('payments')
      return Math.round(Math.sum(payments, 'interest'), 2)
    },
    savedInterest: function() {
      let totalInterest = this.get('totalInterest'),
        totalInterestPaid = this.get('totalInterestPaid')
      return totalInterest - totalInterestPaid
    }
  }
})
