const express = require('express');
const { getData, createData, updateData, deleteData } = require('../controllers/dataController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getData);
router.post('/', auth, createData);
router.put('/:id', auth, updateData);
// router.delete('/:id', auth, deleteData);

// DELETE request to delete data by ID
router.delete('/data/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await Data.findByIdAndDelete(id);
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;