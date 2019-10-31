import File from '../models/File';

class ReviewController {
  async update(req, res) {
    const { fileId } = req.params;

    const file = await File.findOne({
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

export default new ReviewController();
