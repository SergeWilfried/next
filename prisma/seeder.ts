const { Parent, PaymentMethod, PaymentStatus, PrismaClient, Staff, Student } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = {
    id: 'clzk1so1i0000au6ed3effbq2',
  }

  // Create multiple schools
  const schools = await Promise.all(
    Array.from({ length: 3 }, () =>
      prisma.school.create({
        data: {
          name: faker.company.name() + ' School',
          address: faker.location.streetAddress(),
          phoneNumber: faker.phone.number(),
          category: faker.helpers.arrayElement(['PUBLIC', 'PRIVATE']),
          type: faker.helpers.arrayElement(['ELEMENTARY_SCHOOL', 'MIDDLE_SCHOOL', 'HIGH_SCHOOL']),
          userId: admin.id,
        },
      })
    )
  );

  // Create multiple parents and students
  for (let i = 0; i < 5; i++) {
    const parent = await prisma.parent.create({
      data: {
        fullName: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        communicationPreference: faker.helpers.arrayElement(['WHATSAPP', 'PHONE', 'SMS']),
        emergencyContacts: [
          { name: faker.person.fullName(), relationship: faker.helpers.arrayElement(['Spouse', 'Sibling', 'Grandparent']), phone: faker.phone.number() },
        ],
        schoolId: faker.helpers.arrayElement(schools).id
      },
    });
    // Create students for each parent
    const numStudents = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < numStudents; j++) {
      const student = await prisma.student.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          dateOfBirth: faker.date.past({ years: 18 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE', 'OTHER']),
          grade: faker.helpers.arrayElement(['9', '10', '11', '12']),
          schoolId: faker.helpers.arrayElement(schools).id,
          parentId: parent.id,
        },
      });

    

      // Create enrollment for each student
      const enrollment = await prisma.enrollment.create({
        data: {
          parentId: parent.id,
          studentId: student.id,
          schoolId: student.schoolId,
          academicYear: '2023-2024',
          grade: student.grade,
          status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE', 'GRADUATED']),
          totalFee: faker.number.int({ min: 3000, max: 10000 }),
        },
      });

      // Create payments for each enrollment
      const numPayments = faker.number.int({ min: 1, max: 4 });
      for (let k = 0; k < numPayments; k++) {
        await prisma.payment.create({
          data: {
            enrollmentId: enrollment.id,
            amount: faker.number.int({ min: 5000, max: 50000 }),
            status: faker.helpers.arrayElement(['PAID', 'PENDING', 'OVERDUE']),
            paymentDate: faker.date.recent(),
            paymentMethod: faker.helpers.arrayElement(['CREDIT_CARD', 'MOBILE_MONEY', 'CHECK', 'CASH']),
          },
        });
      }
    }
  }

  // Create multiple staff members
  for (let i = 0; i < 10; i++) {
    await prisma.staff.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        position: faker.helpers.arrayElement(['Teacher', 'Administrator', 'Counselor', 'Librarian']),
        department: faker.helpers.arrayElement(['Mathematics', 'Science', 'English', 'History', 'Physical Education']),
        schoolId: faker.helpers.arrayElement(schools).id,
      },
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });