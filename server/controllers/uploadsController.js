// responds with path to uploaded file (accessible under /uploads)
export const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const path = `/uploads/${req.file.filename}`;
  res.status(201).json({ path, filename: req.file.filename, originalname: req.file.originalname });
};
