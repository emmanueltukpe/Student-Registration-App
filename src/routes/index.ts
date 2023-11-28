import { isAdmin, isSuperAdmin } from "./../server/middlewares/admin";
import { Router } from "express";
import validator from "../server/middlewares/validator";
import { auth } from "../server/middlewares/auth";
import {
    changepassword,
    completeRrgistration,
    forgotpassword,
    login,
    loginadmin,
    otp,
    registeradmin,
    resetpassword,
    signup,
    updateadmin,
    updatestudent
} from "../validators";
import { StudentController } from "../server/controllers/student.controller";
import { SubjectController } from "../server/controllers/subject.controller";
import { AdminController } from "../server/controllers/admin.controller";
import { ImageUpload } from "../server/middlewares/image.upload";
const v1Router = Router();
const students = new StudentController();
const subjects = new SubjectController();
const admin = new AdminController();
const imageUpload = new ImageUpload();

v1Router
    .post("/register", validator(signup), students.register)
    .post("/login", validator(login), students.login)
    .post("/verify", validator(otp), students.verifyEmail)
    .post(
        "/complete-registration",
        auth,
        imageUpload.imageUploadMiddleware,
        validator(completeRrgistration),
        students.completeRegistration
    )
    .post(
        "/forgot-password",
        validator(forgotpassword),
        students.forgotPassword
    )
    .post("/reset-password", validator(resetpassword), students.resetPassword)
    .post(
        "/change-password",
        auth,
        validator(changepassword),
        students.changePassword
    )
    .post("/register-subjects", auth, students.subjectRegistration)
    .put(
        "/update-profile/:id",
        auth,
        imageUpload.imageUploadMiddleware,
        validator(updatestudent),
        students.updateStudent
    )
    .post("/suspend/:id", auth, isAdmin, students.suspendStudent)
    .post("/remove-suspension/:id", auth, isAdmin, students.removeSuspension)
    .delete("/expel/:id", auth, isSuperAdmin, students.expelStudent)
    .get("/science-students", students.getAllScienceStudents)
    .get("/social-science-students", students.getAllSocialScienceStudents)
    .get("/students/:id", students.getStudent);

v1Router
    .get("/subjects", subjects.getAllSubjects)
    .get("/subjects/science", subjects.getAllScienceClassSubjects)
    .get("/subjects/social-science", subjects.getAllSocialScienceClassSubjects)
    .get("/subjects/:id", subjects.getSubject);

v1Router
    .post("/admins/signup", validator(registeradmin), admin.signUp)
    .post("/admins/login", validator(loginadmin), admin.login)
    .get("/admins", admin.getAllAdmins)
    .get("/admins/:id", admin.getAdmin)
    .put(
        "/admins/:id",
        auth,
        isAdmin,
        validator(updateadmin),
        admin.updateAdmin
    )
    .delete("/admins/:id", auth, isSuperAdmin, admin.deleteAdmin);

export default v1Router;
