const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [150, 'Description should not exceed 150 characters'],
        validate: {
            validator: function (v) {
              return typeof v === 'string';
            },
            message: 'Title should be a string'
          }
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
);

const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = Tasks;