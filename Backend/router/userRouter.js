import express from 'express';
import { addNewAdmin, addNewDoctor, getAllDoctors, getuserDetails, login, logoutAdmin, logoutPatient, pateintRegister } from '../controller/userController.js';
import {isAdminAuthenticated, isPatientAuthenticated} from "../middleware/auth.js"

const router = express.Router();
router.post("/patient/register", pateintRegister);
router.post("/login", login);
router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);

router.get("/admin/me", isAdminAuthenticated, getuserDetails);
router.get("/patient/me", isPatientAuthenticated, getuserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);


export default router;