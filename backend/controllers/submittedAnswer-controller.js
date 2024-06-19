const SubmittedAnswer = require('../models/submittedAnswer-model')

// submit answers
const submitAnswers = async (req, res) => {
  try {
    const { room_id, submissions } = req.body;

    const submittedAnswer = new SubmittedAnswer({
      room_id,
      submissions
    });

    await submittedAnswer.save();
    res.status(201).json(submittedAnswer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// trying updating the document to solve conflict
const updateSubmissionsByRoomNumber = async (req, res) => {
    const { room_id, submissions } = req.body;
    // console.log(req.body);
    // console.log(room_id);
    // console.log(submissions[0].student_id);
    // console.log(submissions[0].submitted_option);
    try {
        const updatedDocument = await SubmittedAnswer.findOneAndUpdate(
            { room_id },
            {
                $push: {
                    submissions
                }
            },
            { new: true, upsert: true } // Return the updated document and create if not exists
        );
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// get all submissions for a specific room number
const getSubmissionsByRoomNumber = async (req, res) => {
  try {
    const { room_id } = req.params;

    const submissions = await SubmittedAnswer.findOne({ room_id })
      .populate('submissions.student_id', 'name email')
      .populate('submissions.answers', 'text');

    if (!submissions) {
      return res.status(404).json({ message: 'Submissions not found for this room number' });
    }

    res.json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all submissions
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await SubmittedAnswer.find()
      .populate('submissions.student_id', 'name email')
      .populate('submissions.answers', 'text');

    res.json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSubmissionsByRoomNumber = updateSubmissionsByRoomNumber

exports.submitAnswers = submitAnswers
exports.getSubmissionsByRoomNumber = getSubmissionsByRoomNumber
exports.getAllSubmissions = getAllSubmissions
