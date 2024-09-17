const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false, // ! Ubah ke true jika menggunakan environment midtrans siap produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = snap;
