const Data = require('../models/Data');
const User = require('../models/User');

const getData = async (req, res) => {
  try {
    const data = await Data.find({ user: req.user.id });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createData = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newData = new Data({
      title,
      content,
      user: req.user.id,
    });

    const data = await newData.save();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateData = async (req, res) => {
  const { title, content } = req.body;

  try {
    let data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: 'Data not found' });
    }

    if (data.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    data.title = title;
    data.content = content;

    await data.save();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteData = async (req, res) => {
  try {
    let data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: 'Data not found' });
    }

    if (data.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await data.remove();
    res.json({ msg: 'Data removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getData, createData, updateData, deleteData };