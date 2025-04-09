const express=require("express");
const {handleGetAllContacts,
    handleCreateContact,
    handleGetContact,
    handleEditContact,
    handleDeleteContact,}=require('../controllers/contactController');
const validateToken = require("../middlewares/validateTokenHandler");
const router=express.Router();

router.use(validateToken)

router.route("/")
.get(handleGetAllContacts)
.post(handleCreateContact)

router.route('/:id')
.get(handleGetContact)
.put(handleEditContact)
.delete(handleDeleteContact)


module.exports=router