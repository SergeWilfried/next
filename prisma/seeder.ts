import { PrismaClient, UserRole, SchoolCategory, SchoolType, GenderEnum, MaritalStatus, CommunicationPreference, EnrollmentStatus, ApplicationStatus, PaymentStatus, PaymentMethod, AttendanceStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const familyNames = ['Sawadogo', 'Ouedraogo', 'Traore', 'Diallo', 'Sissoko', 'Konate', 'Zongo', 'Kone', 'Sankara', 'Kambou', 'Kouyate', 'Toure', 'Traore', 'Diallo', 'Sissoko', 'Konate', 'Zongo', 'Kone', 'Kambou'];
const MalefirstNames = ['Ibrahim', 'Peter', 'Etan', 'Moussa', 'Pierre', 'Aristide', 'Antoine', ];
const FemalefirstNames = ['Awa', 'Fatoumata', 'Julie', 'Mariama', 'Yvette', 'Pierrette', 'Astride'];
function getRandomName() {
  return {
    firstName: faker.helpers.arrayElement(Array.from(new Set([...MalefirstNames, ...FemalefirstNames]))),
    lastName: faker.helpers.arrayElement(familyNames),
  };
}
async function main() {
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'assitance@bangre.co',
      role: UserRole.SUPER_ADMIN,
      emailVerified: new Date(),
    },
  });

  // Create multiple schools
  const schools = await Promise.all(
    Array.from({ length: 3 }, async () => {
      const address = await prisma.address.create({
        data: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country(),
        },
      });

      return prisma.school.create({
        data: {
          name: faker.company.name() + ' School',
          addressId: address.id,
          phoneNumber: faker.phone.number(),
          category: faker.helpers.arrayElement(Object.values(SchoolCategory)),
          type: faker.helpers.arrayElement(Object.values(SchoolType)),
          userId: admin.id,
        },
      });
    })
  );

  // Create multiple parents and students
  for (let i = 0; i < 5; i++) {
    const { firstName, lastName } = getRandomName();
    const parentUser = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(),
        role: UserRole.PARENT,
      },
    });

    const parentAddress = await prisma.address.create({
      data: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
    });

    const parent = await prisma.parent.create({
      data: {
        firstName,
        lastName,
        middleName: faker.person.middleName(),
        gender: faker.helpers.arrayElement(Object.values(GenderEnum)),
        dateOfBirth: faker.date.past({ years: 40 }),
        maritalStatus: faker.helpers.arrayElement(Object.values(MaritalStatus)),
        phoneNumber: faker.phone.number(),
        communicationPreference: faker.helpers.arrayElement(Object.values(CommunicationPreference)),
        emergencyContacts: [
          { name: faker.person.fullName(), relationship: faker.helpers.arrayElement(['Spouse', 'Sibling', 'Grandparent']), phone: faker.phone.number() },
        ],
        schoolId: faker.helpers.arrayElement(schools).id,
        userId: parentUser.id,
        addressId: parentAddress.id,
      },
    });

    // Create students for each parent
    const numStudents = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < numStudents; j++) {
      const { firstName: studentFirstName, lastName: studentLastName } = getRandomName();
      const student = await prisma.student.create({
        data: {
          firstName: studentFirstName,
          lastName: studentLastName,
          middleName: faker.person.middleName(),
          dateOfBirth: faker.date.past({ years: 18 }),
          gender: faker.helpers.arrayElement(Object.values(GenderEnum)),
          schoolId: faker.helpers.arrayElement(schools).id,
          parentId: parent.id,
          status: EnrollmentStatus.INACTIVE,
        },
      });

      // Create academic year
      const academicYear = await prisma.academicYear.create({
        data: {
          name: '2023-2024',
          startDate: new Date('2023-09-01'),
          endDate: new Date('2024-06-30'),
          schoolId: student.schoolId,
        },
      });

      // Create class
      const class_ = await prisma.class.create({
        data: {
          name: `Grade ${faker.number.int({ min: 1, max: 12 })}`,
          description: faker.lorem.sentence(),
          schoolId: student.schoolId,
        },
      });

      // Create enrollment for each student
      const enrollment = await prisma.enrollment.create({
        data: {
          parentId: parent.id,
          studentId: student.id,
          schoolId: student.schoolId,
          classId: class_.id,
          academicYearId: academicYear.id,
          status: EnrollmentStatus.ACTIVE,
          balance: faker.number.float({ min: 0, max: 1000, precision: 0.01 }),
        },
      });

      // Create payments for each enrollment
      const numPayments = faker.number.int({ min: 1, max: 4 });
      for (let k = 0; k < numPayments; k++) {
        await prisma.payment.create({
          data: {
            enrollmentId: enrollment.id,
            amount: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
            status: faker.helpers.arrayElement(Object.values(PaymentStatus)),
            paymentDate: faker.date.recent(),
            paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
          },
        });
      }

      // Create attendance records
      for (let k = 0; k < 5; k++) {
        await prisma.attendance.create({
          data: {
            studentId: student.id,
            classId: class_.id,
            date: faker.date.recent(),
            status: faker.helpers.arrayElement(Object.values(AttendanceStatus)),
          },
        });
      }
    }
  }

  // Create multiple staff members
  for (let i = 0; i < 10; i++) {
    const { firstName, lastName } = getRandomName();
    const staffUser = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(),
        role: UserRole.TEACHER,
      },
    });

    await prisma.staff.create({
      data: {
        name: staffUser.name ?? `${firstName} ${lastName}`,
        email: staffUser.email ?? '',
        position: faker.helpers.arrayElement(['Teacher', 'Administrator', 'Counselor', 'Librarian']),
        department: faker.helpers.arrayElement(['Mathematics', 'Science', 'English', 'History', 'Physical Education']),
        schoolId: faker.helpers.arrayElement(schools).id,
        phoneNumber: faker.phone.number(),
        userId: staffUser.id,
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