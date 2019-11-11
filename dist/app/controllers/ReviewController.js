"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class ReviewController {
  async update(req, res) {
    const { fileId } = req.params;

    const file = await _File2.default.findOne({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return res.status(400).json({ error: 'File not found.' });
    }

    await file.update(req.body);

    return res.json(file);
  }
}

exports. default = new ReviewController();
