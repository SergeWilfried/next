import * as z from "zod";

const studentCSVSchema = z.object({
    firstName: z.string().optional().describe("The first name of the student"),
    lastName: z.string().optional().describe("The last name of the student"),
    middleName: z.string().optional().describe("The middle name of the student"),
    dob: z.string().optional().describe("The date of birth of the student"),
    gender: z.string().optional().describe("The gender of the student"),
  });
  
  const paymentCSVSchema = z.object({
    paymentDate: z.string().optional().describe("The date of the payment"),
    amount: z.number().optional().describe("The amount of the payment"),
    paymentMethod: z.string().optional().describe("The method of the payment"),
    studentName: z.string().optional().describe("The name of the student"),
    studentId: z.string().optional().describe("The id of the student"),
    paymentId: z.string().optional().describe("The id of the payment"),
    grade: z.string().optional().describe("The grade of the student"),
  });
  const studentCsvFieldsMappingsPrompt = `The following columns are the headings from a CSV import file for importing a company's student data. ` +
  `Map these column names to the correct fields in our database (firstName, lastName, middleName, dob, gender) by providing the matching column name for each field.` +
  `You may also consult the first few rows of data to help you make the mapping, but you are mapping the columns, not the values. ` +
  `If you are not sure or there is no matching column, omit the value.\n\n`;
  
  
  const parentsCSVSchema = z.object({
    firstName: z.string().optional().describe("The first name of the parent"),
    lastName: z.string().optional().describe("The last name of the parent"),
    email: z.string().optional().describe("The email of the parent"),
  });
  
  const parentsCsvFieldsMappingsPrompt = `The following columns are the headings from a CSV import file for importing a student's parent data. ` +
  `Map these column names to the correct fields in our database (firstName, lastName, email) by providing the matching column name for each field.` +
  `You may also consult the first few rows of data to help you make the mapping, but you are mapping the columns, not the values. ` +
  `If you are not sure or there is no matching column, omit the value.\n\n`;
  
  const paymentsCSVSchema = z.object({
    paymentDate: z.string().optional().describe("The date of the payment"),
    amount: z.number().optional().describe("The amount of the payment"),
    paymentMethod: z.string().optional().describe("The method of the payment"),
    studentName: z.string().optional().describe("The name of the student"),
    studentId: z.string().optional().describe("The id of the student"),
    paymentId: z.string().optional().describe("The id of the payment"),
    grade: z.string().optional().describe("The grade of the student"),
  });
  
  const paymentsCsvFieldsMappingsPrompt = `The following columns are the headings from a CSV import file for importing a student's payment data. ` +
  `Map these column names to the correct fields in our database (paymentDate, amount, paymentMethod, studentName, studentId, paymentId, grade) by providing the matching column name for each field.` +
  `You may also consult the first few rows of data to help you make the mapping, but you are mapping the columns, not the values. ` +
  `If you are not sure or there is no matching column, omit the value.\n\n`;

  export {
    studentCSVSchema,
    studentCsvFieldsMappingsPrompt,
    parentsCSVSchema,
    parentsCsvFieldsMappingsPrompt,
    paymentsCSVSchema,
    paymentsCsvFieldsMappingsPrompt
  }

  