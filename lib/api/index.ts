import { getStudents } from "./students";
import { getUsers } from "./users";
import { getAllPayments, getPaymentById, createPayment, updatePayment, } from "./accounting";
import { addNewParent, updateParent , getParents, deleteParent} from "./parent";
import { getStaffs } from "./staff";
import { getAllGrades } from "./grade";
import { getAllApplications } from "./application";
import { getAllAttendances } from "./attendance";
import { getAllReports } from "./report";
import { getAllEnrollments } from "./enrollment";
import { getAllDonations } from "./donation";
export {
  getStudents,
  getUsers,
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  addNewParent,
  updateParent,
  getParents,
  deleteParent,
  getAllGrades,
  getStaffs,
  getAllApplications,
  getAllReports,
  getAllAttendances,
  getAllEnrollments,
  getAllDonations
};