import { helper } from '@ember/component/helper'

export function formatCurrency(params) {
  return params.toLocaleString('EN')
}

export default helper(formatCurrency)
