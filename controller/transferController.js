const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  try {
    const result = transferService.transferValue(req.body);
    res.status(201).json(result.transfer);
  } catch (err) {
    if (err.name === 'BadRequestError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getTransfers());
};
