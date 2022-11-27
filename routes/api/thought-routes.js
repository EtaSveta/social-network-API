const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    updateThought,
    addThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts GET all and POST a new thought
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/:thoughtId GET one thought, PUT and DELETE by ID
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);  
    
// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);    



module.exports = router;
