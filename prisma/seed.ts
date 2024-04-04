import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error("ADMIN_PASSWORD not set");
        process.exit(1);
    }

    const saltedAdminPassword = await bcrypt.hash(adminPassword, 10);

    const response = await Promise.all([
        prisma.user.upsert({
            where: { email: "wkufj@wku.edu" },
            update: {},
            create: {
                name: "WKU FJ Admin",
                email: "wkufj@wku.edu",
                image: "https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg",
                saltedPassword: saltedAdminPassword
            }
        }),
        prisma.project.upsert({
            where: { projectProductionNumber: 'PRD001' },
            update: {},
            create: {
                projectName: 'Project A',
                projectDescription: 'A thrilling adventure in an ancient world.',
                projectRuntime: '120 minutes',
                projectAspectRatio: '16:9',
                projectRating: 'PG-13',
                projectRatingCriteria: 'Violence, Brief Language',
                projectProductionNumber: 'PRD001',
                projectCategory: 'Adventure',
                projectGenre: 'Action',
                projectLanguage: 'English',
                projectShootingFormat: 'Digital',
                projectFilmSound: 'Dolby 5.1',
                projectFilmSubtitled: false,
                projectTagline: 'An adventure like no other.',
                projectLogLine: 'A hero rises in the ancient world to confront an unseen evil.',
                project25WordPitch: 'An ancient hero\'s quest to save their world from a menacing evil.',
                project50WordPitch: 'In a race against time, a lone hero must navigate the dangers of an ancient world to prevent a catastrophic war.',
                project75WordPitch: 'Facing insurmountable odds, a hero embarks on a perilous journey to thwart a dark force threatening to destroy their home.',
            },
        }),
        prisma.project.upsert({
            where: { projectProductionNumber: 'PRD002' },
            update: {},
            create: {
                projectName: 'Project B',
                projectDescription: 'A heartfelt story of love and loss.',
                projectRuntime: '95 minutes',
                projectAspectRatio: '4:3',
                projectRating: 'PG',
                projectRatingCriteria: 'Thematic Elements',
                projectProductionNumber: 'PRD002',
                projectCategory: 'Drama',
                projectGenre: 'Romance',
                projectLanguage: 'French',
                projectShootingFormat: '35mm',
                projectFilmSound: 'Mono',
                projectFilmSubtitled: true,
                projectTagline: 'Love will find a way.',
                projectLogLine: 'In the heart of Paris, two souls find love amidst tragedy.',
                project25WordPitch: 'A poignant romance unfolds as two lovers face their inevitable fate.',
                project50WordPitch: 'Amid the backdrop of Paris, a powerful story of love and loss captures the heart.',
                project75WordPitch: 'As destiny draws two lovers together, they confront their pasts and embrace the uncertain future with courage.',
            },
        }),
        prisma.project.upsert({
            where: { projectProductionNumber: 'PRD003' },
            update: {},
            create: {
                projectName: 'Project C',
                projectDescription: 'An epic journey through space to discover new worlds.',
                projectRuntime: '150 minutes',
                projectAspectRatio: '21:9',
                projectRating: 'PG-13',
                projectRatingCriteria: 'Sci-Fi Action, Some Language',
                projectProductionNumber: 'PRD003',
                projectCategory: 'Science Fiction',
                projectGenre: 'Adventure',
                projectLanguage: 'English',
                projectShootingFormat: 'IMAX',
                projectFilmSound: 'DTS',
                projectFilmSubtitled: false,
                projectTagline: 'Beyond the stars lies our destiny.',
                projectLogLine: 'A crew of astronauts embarks on a mission to find humanity\'s new home.',
                project25WordPitch: 'In the vastness of space, a crew seeks out new worlds for humanity.',
                project50WordPitch: 'An epic space adventure unfolds as explorers journey to the unknown, facing dangers and marvels beyond imagination.',
                project75WordPitch: 'A daring mission through the cosmos brings encounters with alien civilizations and tests the limits of human bravery.',
            },
        }),
        prisma.project.upsert({
            where: { projectProductionNumber: 'PRD004' },
            update: {},
            create: {
                projectName: 'Project D',
                projectDescription: 'The story of a groundbreaking expedition to the deepest oceans.',
                projectRuntime: '108 minutes',
                projectAspectRatio: '2.35:1',
                projectRating: 'PG',
                projectRatingCriteria: 'Mild Peril, Educational Content',
                projectProductionNumber: 'PRD004',
                projectCategory: 'Documentary',
                projectGenre: 'Nature',
                projectLanguage: 'English',
                projectShootingFormat: '4K Digital',
                projectFilmSound: 'Atmos',
                projectFilmSubtitled: true,
                projectTagline: 'Dive into the unknown.',
                projectLogLine: 'A team of scientists and explorers ventures into the uncharted depths of the ocean, discovering wonders and terrors beyond imagination.',
                project25WordPitch: 'Join an extraordinary expedition into the Earth’s last unexplored frontier, revealing the ocean’s deepest secrets and marvels.',
                project50WordPitch: 'Embarking on a perilous journey, a courageous crew explores the deepest parts of the ocean, uncovering new species and ancient mysteries.',
                project75WordPitch: 'In an unprecedented exploration, scientists dive into the abyss of the oceans, facing challenges and making discoveries that change our understanding of life on Earth.',
            },
        }),
    ]);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
