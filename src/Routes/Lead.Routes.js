import express from 'express';
import { addLead, deleteLead, getLeadDetails, updateLeadDetails, getAllLeads } from '../Controllers/Leads.controller.js';
import auth from '../Middleware/auth.middleware.js';
import Rbac from '../Middleware/Rbac.middleware.js';

let Lead = express.Router();

Lead.post("/lead", auth, addLead);
Lead.delete("/lead/:leadId", auth, deleteLead);
Lead.get("/lead/:leadId", auth, getLeadDetails);
Lead.patch("/lead/:leadId", auth, updateLeadDetails);
Lead.get("/alllead/:adminId", auth, getAllLeads);



export default Lead