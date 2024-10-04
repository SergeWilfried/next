import { getAllStudents } from "./students";
import { getAllUsers } from "./users";
import { getAllPayments, getPaymentById, createPayment, updatePayment, } from "./accounting";
import { addNewParent, updateParent , getParents, deleteParent} from "./parent";
import { getAllStaff } from "./staff";
import { getAllGrades } from "./grade";
import { getAllApplications } from "./application";
import { getAllAttendances } from "./attendance";
import { getAllReports } from "./report";
import { getAllEnrollments } from "./enrollment";
import { getAllDonations } from "./donation";
export {
  getAllStudents,
  getAllUsers,
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  addNewParent,
  updateParent,
  getParents,
  deleteParent,
  getAllGrades,
  getAllStaff,
  getAllApplications,
  getAllReports,
  getAllAttendances,
  getAllEnrollments,
  getAllDonations
};