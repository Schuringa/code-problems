import Controller from '@ember/controller'

export default Controller.extend({
  actions: {
    onSubmit(data) {
      const { loanAmount, loanTerm, interestRate } = data
      this.send('getMonthlyPayment', loanAmount, loanTerm, interestRate)
      this.send('getPayments', loanAmount, interestRate, this.get('payment'))
      this.send(
        'getTotalInterest',
        loanAmount,
        interestRate,
        this.get('payment')
      )
      this.send('getTotalPayment', loanAmount, this.get('totalInterest'))
    },
    getMonthlyPayment: function(loanAmount, loanTerm, interestRate) {
      let compoundingRate = interestRate / 100 / 12
      if (+compoundingRate === 0) {
        return Math.round(loanAmount / loanTerm, 2)
      }
      let payment =
        (compoundingRate * loanAmount) /
        (1 - Math.pow(1 + compoundingRate, -loanTerm))
      this.set('payment', Math.round(payment, 2))
      return Math.round(payment, 2)
    },
    getPayments: function(loanAmount, interestRate, payment) {
      let loanBalance = +loanAmount
      let compoundingRate = interestRate / 100 / 12
      let interest
      let principal
      let cumulativePrincipal = 0
      let cumulativeInterest = 0
      let i = 1
      let payments = []
      while (loanBalance > 0) {
        interest = Math.round(loanBalance * compoundingRate, 2)

        if (loanBalance + interest < payment) {
          payment = Math.round(loanBalance + interest, 2)
        }
        principal = Math.round(payment - interest, 2)
        loanBalance = Math.round(loanBalance + interest - payment, 2)
        cumulativePrincipal = Math.round(cumulativePrincipal + principal, 2)
        cumulativeInterest = Math.round(cumulativeInterest + interest, 2)

        payments.push({
          id: i++,
          principal,
          cumulativePrincipal,
          cumulativeInterest,
          balance: loanBalance,
          interest
        })
      }
      this.set('payments', payments)
      return payments
    },
    getTotalPayment: function(loanAmount, totalInterest) {
      this.set(
        'totalPayment',
        Math.round(Number(loanAmount) + Number(totalInterest), 2)
      )
      return Math.round(Number(loanAmount) + Number(totalInterest), 2)
    },
    getTotalInterest: function(loanAmount, interestRate, payment) {
      let loanBalance = +loanAmount,
        compoundingRate = interestRate / 100 / 12,
        total = 0,
        interest
      while (loanBalance > 0) {
        interest = Math.round(loanBalance * compoundingRate, 2)

        if (loanBalance + interest < payment) {
          payment = loanBalance + interest
        }

        loanBalance = Math.round(loanBalance + interest - payment, 2)
        total = total + interest
      }
      this.set('totalInterest', Math.round(total, 2))
      return Math.round(total, 2)
    }
  }
})
