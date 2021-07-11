const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    require: true,
  },
  prefix: {
    type: String,
    require: true,
  },
  total_reacts: [],
  solo_reacts: [],
  duo_reacts: [],
  trio_reacts: [],
  squad_reacts: [],
  players: {
    type: String,
    require: true,
  },
  channels: {
    common_lobby: {
      type: String,
      require: true,
    },
    team_command: {
      type: String,
      require: true,
    },
    parent: {
      type: String,
      require: true,
    },
    commands: {
      type: String,
      require: true,
    },
  },

  roles: {
    common_lobby: {
      type: String,
      require: true,
    },
    bot_admin: {
      type: String,
      require: true,
    },
    view_bot_category: {
      type: String,
      require: true,
    },
  },

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
  pend_delete: [
    {
      ch_id: {
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
