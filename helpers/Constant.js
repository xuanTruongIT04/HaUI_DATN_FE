const StatusFavotes = {
  "ACTIVE": 0,
  "INACTIVE": 1,
}

const CheckoutMethods = {
  "CASH": 0,
  "BANKING_INTERNET": 1,
}

const PaymentMethod = {
  '0': 'Tiền mặt',        // Cash
  '1': 'Chuyển khoản',    // QR
}

const PaymentMethodValue = {
  'CASH': "0",
  'BANKING_INTERNET': "1",
  'CANCEL': "2",
}

const StatusOrder = {
  '0': 'Đã đặt hàng',
  '1': 'Đang xử lý',
  '2': 'Đã thanh toán',
  '3': 'Đã huỷ',
}

const StatusOrderValue = {
  'ORDERED': 0,
  'PROCESSING': 1,
  'PAID': 2,
  'CANCELLED': 3,
}

const StatusOrderValueUpdate = {
  'ORDERED': 0,
  'BANKING_ONLINE': 1,
  'CANCEL': 2,
}

export {
  StatusFavotes,
  CheckoutMethods,
  PaymentMethod,
  PaymentMethodValue,
  StatusOrder,
  StatusOrderValue,
  StatusOrderValueUpdate
}
