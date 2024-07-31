import { prisma, UserRole, ApplicationStatus, EnrollmentStatus, PaymentStatus, CommunicationPreference, PaymentMethod } from 'lib/db';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';

async function createRandomUser(role: UserRole) {
  const email = faker.internet.email();
  const name = faker.person.fullName();
  const password = await hash(faker.internet.password(), 10);

  return prisma.user.create({
    data: {
      email,
      name,
      role,
      password,
    },
  });
}

async function createRandomSchool() {
  return prisma.school.create({
    data: {
      name: faker.company.name() + " School",
      address: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
    },
  });
}

async function createRandomParent(schoolId: string) {
  const user = await createRandomUser(UserRole.USER);
  return prisma.parent.create({
    data: {
      userId: user.id,
      phoneNumber: faker.phone.number(),
      communicationPreference: faker.helpers.arrayElement(Object.values(CommunicationPreference)),
      emergencyContacts: [
        { name: faker.person.fullName(), phone: faker.phone.number() },
        { name: faker.person.fullName(), phone: faker.phone.number() },
      ],
      schoolId,
    },
  });
}

async function createRandomStaff(schoolId: string) {
  return prisma.staff.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      position: faker.person.jobTitle(),
      department: faker.person.jobArea(),
      schoolId,
    },
  });
}

async function createRandomPickupPerson(parentId: string, schoolId: string) {
  return prisma.pickupPerson.create({
    data: {
      parentId,
      name: faker.person.fullName(),
      relationship: faker.person.relationshipType(),
      schoolId,
    },
  });
}

async function main() {
  // Create admin user
  await createRandomUser(UserRole.ADMIN);

  // Create a school
  const school = await createRandomSchool();

  // Create multiple parents
  const parents = await Promise.all(Array(5).fill(null).map(() => createRandomParent(school.id)));

  // Create multiple staff members
  await Promise.all(Array(10).fill(null).map(() => createRandomStaff(school.id)));

  // Create pickup persons for each parent
  for (const parent of parents) {
    const numPickupPersons = faker.number.int({ min: 1, max: 3 });
    await Promise.all(Array(numPickupPersons).fill(null).map(() => createRandomPickupPerson(parent.id, school.id)));
  }

  // Create students for some parents
  for (const parent of parents.slice(0, 3)) {
    const numStudents = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < numStudents; i++) {
      const student = await prisma.student.create({
        data: {
          parentId: parent.id,
          dateOfBirth: faker.date.past({ years: 18 }),
          grade: faker.number.int({ min: 1, max: 12 }),
          schoolId: school.id,
        },
      });

      // Create enrollment for each student
      const enrollment = await prisma.enrollment.create({
        data: {
          parentId: parent.id,
          studentId: student.id,
          academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
          grade: student.grade,
          status: EnrollmentStatus.ACTIVE,
          schoolId: school.id,
          totalFee: faker.number.int({ min: 5000, max: 15000 }),
        },
      });

      // Create payment for each enrollment
      await prisma.payment.create({
        data: {
          enrollmentId: enrollment.id,
          amount: faker.number.int({ min: 500, max: 5000 }),
          status: PaymentStatus.PAID,
          paymentDate: faker.date.recent(),
          paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
        },
      });
    }
  }

  // Create applications
  await Promise.all(parents.slice(3).map(parent =>
    prisma.application.create({
      data: {
        parentId: parent.id,
        studentName: faker.person.fullName(),
        desiredGrade: faker.number.int({ min: 1, max: 12 }),
        status: ApplicationStatus.PENDING,
        schoolId: school.id,
      },
    })
  ));

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