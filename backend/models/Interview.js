const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['technical', 'behavioral', 'mixed'],
    default: 'technical'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'paused'],
    default: 'in-progress'
  },
  questions: [{
    question: String,
    answer: String,
    feedback: String,
    score: Number,
    timeSpent: Number
  }],
  codeSnippets: [{
    language: String,
    code: String,
    output: String,
    errors: String,
    executionTime: Number
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    strengths: [String],
    areas: [String],
    recommendations: [String]
  },
  duration: Number, // in minutes
  startedAt: Date,
  completedAt: Date
}, {
  timestamps: true
});

// Calculate duration when interview is completed
interviewSchema.pre('save', function(next) {
  if (this.status === 'completed' && this.startedAt && !this.duration) {
    this.duration = Math.round((this.completedAt - this.startedAt) / (1000 * 60));
  }
  next();
});

module.exports = mongoose.model('Interview', interviewSchema);
