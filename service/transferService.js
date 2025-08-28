const { transfers } = require('../model/transferModel');
const { getUser } = require('./userService');

function transferValue({ from, to, value }) {
  if (!from || !to || typeof value !== 'number') return { error: 'Dados obrigatórios ausentes.' };
  const sender = getUser(from);
  const recipient = getUser(to);
  if (!sender || !recipient) return { error: 'Usuário remetente ou destinatário não encontrado.' };
  const isFavorecido = sender.favorecidos && sender.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) return { error: 'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.' };
  const transfer = { from, to, value, date: new Date() };
  transfers.push(transfer);
  return { transfer };
}

function getTransfers() {
  return transfers;
}

module.exports = {
  transferValue,
  getTransfers,
};
