const Event = require('../models/Event')

const getEvents = async (req, res) => {
  const events = await Event.find()
  console.log(events)
  res.json({
    ok: true,
    msg: 'get events',
    events: events
  })
}

const createNewEvent = (req, res) => {
  console.log(req.body)
  const newEvent = new Event(req.body)
  
  newEvent.save()
    .then(event => {
      res.json({
        ok: true,
        msg: 'create new event',
        event: event
      })
    })
    .catch(err => {
      res.json({
        ok: false,
        msg: err.message
      })
    })
}


const editEvent = async(req, res) => {
  const {name,description,date}=req.body
    const eventUpdate={
      name:name,
      description:description,
      date:date
    }

  await Event.findByIdAndUpdate(req.params.id,eventUpdate,{new:true})
    .then(response=>res.json(response))  
    .catch(err=>res.status(400).json(err))

    
}

const deleteEvent = async(req, res) => {
  const { id } = req.params
  const eventFind=await Event.findByIdAndDelete(id)

  if(eventFind){
    res.json({
      ok: true,
      msg: 'delete event'
    })
  }else{
    res.status(404).json({
      ok: false,
      msg: 'event not found to delete'
    })
  }
  res.json({
    ok: true,
    msg: 'delete event'
  })
}


module.exports = { getEvents, createNewEvent, editEvent, deleteEvent }