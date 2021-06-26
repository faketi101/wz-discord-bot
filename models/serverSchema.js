const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    require: true,
  },

  total_reacts: [],
  solo_reacts: [],
  duo_reacts: [],
  trio_reacts: [],
  squad_reacts: [],

  channels: [
    {
      common_lobby: {
        type: String,
        require: true,
      },
    },
  ],
  roles: [
    {
      common_lobby: {
        type: String,
        require: true,
      },
    },
  ],
  penalty_id: [
    {
      player_id: {
        type: String,
        require: true,
      },
      time: {
        type: String,
        require: true,
      },
    },
  ],
});

const model = mongoose.model("serverdata", serverSchema);
module.exports = model;