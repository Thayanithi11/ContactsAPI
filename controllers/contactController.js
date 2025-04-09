const asyncHandler=require('express-async-handler')
const mongoose=require('mongoose')
const Contact=require("../models/contactModel")
//Gets all the contacts 
//@route GET /api/contacts
//access:private
const handleGetAllContacts= asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})

//Created a new contact 
//@route POST /api/contacts
//access:private
const handleCreateContact=asyncHandler(async (req,res)=>{
    console.log("The request body is",req.body)
    const {name,email,phone}=req.body
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact=await Contact.create({
        name,email,phone,user_id:req.user.id
    })
    res.status(201).json(contact)
})

//Created a new contact 
//@route GET /api/contacts/:id
//access:private
const handleGetContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404); 
        throw new Error("Invalid contact ID");
    }
    const contact=await Contact.findById(id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
 res.status(200).json(contact)
})
//Created a new contact 
//@route PUT /api/contacts/:id
//access:private
const handleEditContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404); 
        throw new Error("Invalid contact ID");
    }
    const contact=await Contact.findById(id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if(contact.user_id.toString()!==req.user.id){
          res.status(403);
          throw new Error("User dont have permission to update other user contacts")
    }

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})

//Created a new contact 
//@route DELETE /api/contacts/:id
//access:private
const handleDeleteContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404); 
        throw new Error("Invalid contact ID");
    }
    const contact=await Contact.findById(id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to Delete other user contacts")
  }
    await Contact.deleteOne({_id:id})
    res.status(200).json(contact)
}
)

module.exports={handleGetAllContacts,
    handleCreateContact,
    handleGetContact,
    handleEditContact,
    handleDeleteContact}