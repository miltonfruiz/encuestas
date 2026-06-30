const Model = require('../models/Model');

async function getAll(req, res) {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(model);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}

async function create(req, res) {
  try {
    const model = new Model(req.body);
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json({ message: 'Error creating data' });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!model) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(model);
    }
  } catch (err) {
    res.status(400).json({ message: 'Error updating data' });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    await Model.findByIdAndRemove(id);
    res.json({ message: 'Data deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
}

async function vote(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      res.status(404).json({ message: 'Not found' });
    } else {
      const option = req.body.option;
      if (!model.options.includes(option)) {
        res.status(400).json({ message: 'Invalid option' });
      } else {
        if (!model.votes[option]) {
          model.votes[option] = 1;
        } else {
          model.votes[option]++;
        }
        await model.save();
        res.json(model);
      }
    }
  } catch (err) {
    res.status(400).json({ message: 'Error voting' });
  }
}

async function getResults(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(model.votes);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results' });
  }
}

module.exports = { getAll, getOne, create, update, remove, vote, getResults };