const express = require('express');
const {check, validationResult} = require('express-validator');

const House = require('../models/House');

const router = express.Router();

const validate = [
    check('CustumerID').exists(),
    check('CustumerID.*').notEmpty().withMessage('No id provided'),
     
    check('ListName')
    .isLength({min: 1})
    .withMessage('Name field is empity'),
]

// /api/houses
router.post('/', validate, (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).send({errors: errors.array()})
    }

    const house = new House({
        CustumerID: req.body.CustumerID,
      ListName:req.body.ListName,
        items:req.body.items       
    });

    house.save()
        .then(result => {
            res.send({
                message: 'House data created successfully',
                data: result
            })
        })
        .catch(err => console.log(err))

})

// /api/houses
router.get('/', (req, res) => {
    House.find()
        .then(houses => {
            res.send(houses)
        })
        .catch(err => console.log(err))
});
// /api/houses/ByCustumerId/id
router.get('/ByCustumerId/:id', (req, res) => {
    const CustumerId = req.params.id;
    console.log(CustumerId);
    
    House.find({CustumerID:CustumerId})
        .then(houses => {
            res.send(houses)
        })
        .catch(err => console.log(err))
});

// /api/houses/id
router.get('/:id', (req, res) => {
    const houseId = req.params.id;

    House.findById(houseId)
        .then(house => {
            res.send(house);
        })
        .catch(err => console.log(err))
});

// /api/houses/ListId/id (id of list)
router.put('/ListId/:id', (req, res) => {
    const listId = req.params.id;

 
    House.findById(listId)
        .then(houses => {
            houses.CustumerID.push(req.body.CustumerID)

            return houses.save();
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
});
///api/houses/AddProduct/id   <====add product to list under id
router.put('/AddProduct/:id', (req, res) => {
    const listId = req.params.id;

 
    House.findById(listId)
        .then(houses => {
            houses.items.push(req.body.items)
            

            return houses.save();
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
});


// /api/houses/id
router.delete('/:id', (req, res) => {
    const houseId = req.params.id;

    House.findByIdAndDelete(houseId)
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
})

module.exports = router;