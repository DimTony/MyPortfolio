
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const description = await prisma.projectDescription.create({
    data: {
      title: 'Project Description: Credit Monitoring Portal Implementation',
      summary:
        'The Credit Monitoring Portal project aims to automate the monitoring of loan performance across the bank, improving visibility, accountability, and the quality of risk assets through structured daily, weekly, and monthly activities.',
      footer:
        'The portal integrates monitoring, outcome tracking, and resolution tools. Stress levels are color-coded and activities are aligned with SLA requirements. This contributes to enhanced compliance, operational efficiency, and credit performance monitoring.',
      objectives: {
        create: [
          { text: 'End-to-end automation of credit monitoring for loan performance.' },
          { text: 'Centralized dashboard showing activities, outcomes, and resolution tracking.' },
          { text: 'Daily scheduled activities for performance, documentation, deliverables, and contingents.' },
          { text: 'Exception tracking with automated reminders and stress level classification.' },
          { text: 'Drill-down capabilities by SBUs, reviewers, obligors, and timeline.' },
          { text: 'Role-based access control integrated with Active Directory.' },
          { text: 'Data synchronization from SharePoint, Credit 360, and data warehouse.' },
          { text: 'Automated stress analysis based on monitoring completion and outcome quality.' }
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Credit Monitoring Portal',
      description:
        'The Credit Monitoring Portal is a centralized system designed to automate and streamline monitoring activities of obligors across all Strategic Business Units (SBUs). It enables real-time tracking of performance, documentation, exceptions, and resolutions.',
      technologies: JSON.stringify(['SharePoint', 'MS SQL', 'Power BI']),
      role: 'Technical Product Manager',
      dash: '/images/cmp-dash.png',
      thumbnail: '/images/cmp-portal.png',
      releaseStatus: 'Released',
      maintainStatus: 'Maintained',
      date: '2024-09-15',
      desc: {
        connect: { id: description.id },
      },
      comments: {
        create: [
          {
            content: 'Outstanding automation of a previously manual process. The dashboard’s clarity is exceptional.',
            authorName: 'Tolu M.',
            isApproved: true,
            avatarUrl: "/images/user1.svg"
          },
          {
            content: 'The drill-down features and stress color indicators are very effective. Great job!',
            authorName: 'Iniobong E.',
            isApproved: true,
            avatarUrl: "/images/user1.svg"
          },
        ],
      },
    },
  });

  await prisma.chatMessage.createMany({
    data: [
      {
        content: 'Hello, I need help',
        guestName: 'Guest1',
        sessionId: 'session123',
        isFromAdmin: false,
      },
      {
        content: 'Sure, how can I help?',
        guestName: null,
        sessionId: 'session123',
        isFromAdmin: true,
      },
    ],
  });

  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
