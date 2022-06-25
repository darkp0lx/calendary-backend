const { Router } = require('express')
const { getEvents, createNewEvent, editEvent, deleteEvent } = require('../controllers/events')
const router = Router()


//get events
router.get('/',getEvents)


//create a new event
router.post('/',createNewEvent)


//update an event
router.put('/:id',editEvent)


router.delete('/:id',deleteEvent)

module.exports=router