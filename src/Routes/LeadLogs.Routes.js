import express from 'express';
import { addLeadLog, deleteLeadLog, getAllLeadLogs } from '../Controllers/LeadLogs.controller.js';
import auth from '../Middleware/auth.middleware.js';
import Rbac from '../Middleware/Rbac.middleware.js';

let LeadLog = express.Router();


LeadLog.post('/leadlog/:leadId', auth, addLeadLog);
LeadLog.get('/leadlog/:leadLogId', auth, getAllLeadLogs);
LeadLog.delete('/leadlog/:leadLogId', auth, deleteLeadLog);










export default LeadLog