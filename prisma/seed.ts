import prisma from "../lib/prisma"
import bcrypt from "bcrypt"

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD not set")
    process.exit(1)
  }

  const saltedAdminPassword = await bcrypt.hash(adminPassword, 10)

  const response = await Promise.all([
    prisma.user.upsert({
      where: { email: "wkufj@wku.edu" },
      update: {},
      create: {
        name: "WKU FJ Admin",
        email: "wkufj@wku.edu",
        image:
          "https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg",
        saltedPassword: saltedAdminPassword,
        role: 1
      }
    }),
    prisma.project.upsert({
      where: { projectProductionNumber: "PRD001" },
      update: {},
      create: {
        projectName: "Project A",
        projectDescription: "A thrilling adventure in an ancient world.",
        projectRuntime: "120 minutes",
        projectAspectRatio: "16:9",
        projectRating: "PG-13",
        projectRatingCriteria: "Violence, Brief Language",
        projectProductionNumber: "PRD001",
        projectCategory: "Adventure",
        projectGenre: "Action",
        projectLanguage: "English",
        projectShootingFormat: "Digital",
        projectFilmSound: "Dolby 5.1",
        projectFilmSubtitled: false,
        projectTagline: "An adventure like no other.",
        projectLogLine:
          "A hero rises in the ancient world to confront an unseen evil.",
        project25WordPitch:
          "An ancient hero's quest to save their world from a menacing evil.",
        project50WordPitch:
          "In a race against time, a lone hero must navigate the dangers of an ancient world to prevent a catastrophic war.",
        project75WordPitch:
          "Facing insurmountable odds, a hero embarks on a perilous journey to thwart a dark force threatening to destroy their home."
      }
    }),
    prisma.project.upsert({
      where: { projectProductionNumber: "PRD002" },
      update: {},
      create: {
        projectName: "Project B",
        projectDescription: "A heartfelt story of love and loss.",
        projectRuntime: "95 minutes",
        projectAspectRatio: "4:3",
        projectRating: "PG",
        projectRatingCriteria: "Thematic Elements",
        projectProductionNumber: "PRD002",
        projectCategory: "Drama",
        projectGenre: "Romance",
        projectLanguage: "French",
        projectShootingFormat: "35mm",
        projectFilmSound: "Mono",
        projectFilmSubtitled: true,
        projectTagline: "Love will find a way.",
        projectLogLine:
          "In the heart of Paris, two souls find love amidst tragedy.",
        project25WordPitch:
          "A poignant romance unfolds as two lovers face their inevitable fate.",
        project50WordPitch:
          "Amid the backdrop of Paris, a powerful story of love and loss captures the heart.",
        project75WordPitch:
          "As destiny draws two lovers together, they confront their pasts and embrace the uncertain future with courage."
      }
    }),
    prisma.project.upsert({
      where: { projectProductionNumber: "PRD003" },
      update: {},
      create: {
        projectName: "Project C",
        projectDescription:
          "An epic journey through space to discover new worlds.",
        projectRuntime: "150 minutes",
        projectAspectRatio: "21:9",
        projectRating: "PG-13",
        projectRatingCriteria: "Sci-Fi Action, Some Language",
        projectProductionNumber: "PRD003",
        projectCategory: "Science Fiction",
        projectGenre: "Adventure",
        projectLanguage: "English",
        projectShootingFormat: "IMAX",
        projectFilmSound: "DTS",
        projectFilmSubtitled: false,
        projectTagline: "Beyond the stars lies our destiny.",
        projectLogLine:
          "A crew of astronauts embarks on a mission to find humanity's new home.",
        project25WordPitch:
          "In the vastness of space, a crew seeks out new worlds for humanity.",
        project50WordPitch:
          "An epic space adventure unfolds as explorers journey to the unknown, facing dangers and marvels beyond imagination.",
        project75WordPitch:
          "A daring mission through the cosmos brings encounters with alien civilizations and tests the limits of human bravery."
      }
    }),
    prisma.project.upsert({
      where: { projectProductionNumber: "PRD004" },
      update: {},
      create: {
        projectName: "Project D",
        projectDescription:
          "The story of a groundbreaking expedition to the deepest oceans.",
        projectRuntime: "108 minutes",
        projectAspectRatio: "2.35:1",
        projectRating: "PG",
        projectRatingCriteria: "Mild Peril, Educational Content",
        projectProductionNumber: "PRD004",
        projectCategory: "Documentary",
        projectGenre: "Nature",
        projectLanguage: "English",
        projectShootingFormat: "4K Digital",
        projectFilmSound: "Atmos",
        projectFilmSubtitled: true,
        projectTagline: "Dive into the unknown.",
        projectLogLine:
          "A team of scientists and explorers ventures into the uncharted depths of the ocean, discovering wonders and terrors beyond imagination.",
        project25WordPitch:
          "Join an extraordinary expedition into the Earth's last unexplored frontier, revealing the ocean's deepest secrets and marvels.",
        project50WordPitch:
          "Embarking on a perilous journey, a courageous crew explores the deepest parts of the ocean, uncovering new species and ancient mysteries.",
        project75WordPitch:
          "In an unprecedented exploration, scientists dive into the abyss of the oceans, facing challenges and making discoveries that change our understanding of life on Earth."
      }
    }),
    prisma.user.upsert({
      where: { email: "user1@example.com" },
      update: {},
      create: {
        email: "user1@example.com",
        name: "John Johnson",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Bachelor of Science",
        classYear: "2023",
        address: "123 Main St, Anytown, USA",
        credit: "A+",
        biography: "An enthusiast of technology and innovation.",
        allergies: "None",
        medications: "None",
        conditions: "None",
        emergencyContactName: "Jane Doe",
        emergencyContactPhone: "123-456-7890",
        emergencyContactAddress: "456 Elm St, Anytown, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user2@example.com" },
      update: {},
      create: {
        email: "user2@example.com",
        name: "Brad Pitt",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Master of Arts",
        classYear: "2022",
        address: "234 Second St, Othertown, USA",
        credit: "B",
        biography: "A creative mind and storyteller.",
        allergies: "Pollen",
        medications: "Antihistamines",
        conditions: "None",
        emergencyContactName: "John Smith",
        emergencyContactPhone: "234-567-8901",
        emergencyContactAddress: "567 Pine St, Othertown, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user3@example.com" },
      update: {},
      create: {
        email: "user3@example.com",
        name: "Mike Tyson",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Bachelor of Arts",
        classYear: "2024",
        address: "345 Third St, New City, USA",
        credit: "B-",
        biography: "Passionate about art and design.",
        allergies: "None",
        medications: "None",
        conditions: "Asthma",
        emergencyContactName: "Eve Adams",
        emergencyContactPhone: "345-678-9012",
        emergencyContactAddress: "678 Spruce St, New City, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user4@example.com" },
      update: {},
      create: {
        email: "user4@example.com",
        name: "Angelina Jolie",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Master of Science",
        classYear: "2021",
        address: "456 Fourth St, Another City, USA",
        credit: "A",
        biography: "Interested in sustainable technologies.",
        allergies: "Nuts",
        medications: "Epinephrine",
        conditions: "None",
        emergencyContactName: "Bob Brown",
        emergencyContactPhone: "456-789-0123",
        emergencyContactAddress: "789 Oak St, Another City, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user5@example.com" },
      update: {},
      create: {
        email: "user5@example.com",
        name: "Lejon Brames",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Bachelor of Computer Science",
        classYear: "2025",
        address: "567 Fifth St, Tech City, USA",
        credit: "A-",
        biography:
          "A coding enthusiast with a love for solving complex problems.",
        allergies: "Gluten",
        medications: "None",
        conditions: "None",
        emergencyContactName: "Alice Green",
        emergencyContactPhone: "567-890-1234",
        emergencyContactAddress: "890 Maple St, Tech City, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user6@example.com" },
      update: {},
      create: {
        email: "user6@example.com",
        name: "Garfield",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Master of Business Administration",
        classYear: "2020",
        address: "678 Sixth St, Commerce City, USA",
        credit: "B+",
        biography: "Business strategist and entrepreneur at heart.",
        allergies: "None",
        medications: "None",
        conditions: "None",
        emergencyContactName: "Gary White",
        emergencyContactPhone: "678-901-2345",
        emergencyContactAddress: "901 Birch St, Commerce City, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user7@example.com" },
      update: {},
      create: {
        email: "user7@example.com",
        name: "Ronnie Fieg",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Bachelor of Fine Arts",
        classYear: "2019",
        address: "789 Seventh St, Art Town, USA",
        credit: "A",
        biography: "Exploring the intersection of art and technology.",
        allergies: "Dust",
        medications: "Antihistamines",
        conditions: "None",
        emergencyContactName: "Helen Brown",
        emergencyContactPhone: "789-012-3456",
        emergencyContactAddress: "012 Willow St, Art Town, USA",
        role: 2
      }
    }),
    prisma.user.upsert({
      where: { email: "user8@example.com" },
      update: {},
      create: {
        email: "user8@example.com",
        name: "Abraham Lincoln",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Doctor of Philosophy in Physics",
        classYear: "2018",
        address: "890 Eighth St, Science City, USA",
        credit: "B-",
        biography:
          "Seeking the secrets of the universe, one equation at a time.",
        allergies: "Peanuts",
        medications: "Epinephrine",
        conditions: "None",
        emergencyContactName: "Isaac Newton",
        emergencyContactPhone: "890-123-4567",
        emergencyContactAddress: "123 Cedar St, Science City, USA",
        role: 3
      }
    }),
    prisma.user.upsert({
      where: { email: "user9@example.com" },
      update: {},
      create: {
        email: "user9@example.com",
        name: "John Wick",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Bachelor of Engineering",
        classYear: "2022",
        address: "901 Ninth St, Engineer City, USA",
        credit: "A+",
        biography: "Engineer by day, aspiring inventor by night.",
        allergies: "None",
        medications: "None",
        conditions: "None",
        emergencyContactName: "Nikola Tesla",
        emergencyContactPhone: "901-234-5678",
        emergencyContactAddress: "234 Pine St, Engineer City, USA",
        role: 3
      }
    }),
    prisma.user.upsert({
      where: { email: "user10@example.com" },
      update: {},
      create: {
        email: "user10@example.com",
        name: "Frank Castle",
        saltedPassword:
          "$2b$10$nvATp6aFGXJ..B4vl9LR8e4yi/bTMJtdYZ2mr3SOk64L9xMfoO6/6",
        degree: "Master of Environmental Science",
        classYear: "2021",
        address: "1010 Tenth St, Green City, USA",
        credit: "B",
        biography:
          "Dedicated to making the world a better place through sustainability.",
        allergies: "Bee Stings",
        medications: "Antihistamines",
        conditions: "None",
        emergencyContactName: "Rachel Carson",
        emergencyContactPhone: "101-345-6789",
        emergencyContactAddress: "345 Oak St, Green City, USA",
        role: 3
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Central Park",
        locationAddress: "New York, NY, USA"
      },
      update: {},
      create: {
        locationName: "Central Park",
        locationAddress: "New York, NY, USA",
        locationDescription:
          "A vast green space in the heart of Manhattan, offering numerous outdoor activities and scenic spots.",
        locationPhone: "212-310-6600",
        locationEmail: "info@centralparknyc.org",
        locationContactName: "Park Information",
        locationKeywords: "park, urban, green space"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Golden Gate Bridge",
        locationAddress: "San Francisco, CA, USA"
      },
      update: {},
      create: {
        locationName: "Golden Gate Bridge",
        locationAddress: "San Francisco, CA, USA",
        locationDescription:
          "Iconic suspension bridge spanning the Golden Gate strait, known for its towering red presence.",
        locationPhone: "415-921-5858",
        locationEmail: "info@goldengatebridge.org",
        locationContactName: "Bridge Office",
        locationKeywords: "bridge, landmark, suspension"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "The Louvre",
        locationAddress: "Paris, France"
      },
      update: {},
      create: {
        locationName: "The Louvre",
        locationAddress: "Paris, France",
        locationDescription:
          "The world's largest art museum and a historic monument in Paris, home to thousands of works of art.",
        locationPhone: "+33 1 40 20 50 50",
        locationEmail: "info@louvre.fr",
        locationContactName: "Museum Information",
        locationKeywords: "museum, art, historic"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Eiffel Tower",
        locationAddress: "Paris, France"
      },
      update: {},
      create: {
        locationName: "Eiffel Tower",
        locationAddress: "Paris, France",
        locationDescription:
          "A wrought-iron lattice tower on the Champ de Mars in Paris, France, named after the engineer Gustave Eiffel.",
        locationPhone: "+33 892 70 12 39",
        locationEmail: "contact@toureiffel.paris",
        locationContactName: "Visitor Information",
        locationKeywords: "landmark, tower, iconic"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Great Wall of China",
        locationAddress: "Beijing, China"
      },
      update: {},
      create: {
        locationName: "Great Wall of China",
        locationAddress: "Beijing, China",
        locationDescription:
          "A series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China.",
        locationPhone: "+86 10 6702 0888",
        locationEmail: "info@greatwallchina.com",
        locationContactName: "Tourist Support",
        locationKeywords: "historic, wall, landmark"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Sydney Opera House",
        locationAddress: "Sydney, Australia"
      },
      update: {},
      create: {
        locationName: "Sydney Opera House",
        locationAddress: "Sydney, Australia",
        locationDescription:
          "A multi-venue performing arts centre at Sydney Harbour, known for its unique use of a series of gleaming white sail-shaped shells as its roof structure.",
        locationPhone: "+61 2 9250 7111",
        locationEmail: "info@sydneyoperahouse.com",
        locationContactName: "Customer Service",
        locationKeywords: "opera, architecture, iconic"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Statue of Liberty",
        locationAddress: "New York, NY, USA"
      },
      update: {},
      create: {
        locationName: "Statue of Liberty",
        locationAddress: "New York, NY, USA",
        locationDescription:
          "A colossal neoclassical sculpture on Liberty Island in New York Harbor, symbolizing freedom and democracy.",
        locationPhone: "+1 212-363-3200",
        locationEmail: "info@statueofliberty.org",
        locationContactName: "Visitor Services",
        locationKeywords: "statue, landmark, freedom"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Colosseum",
        locationAddress: "Rome, Italy"
      },
      update: {},
      create: {
        locationName: "Colosseum",
        locationAddress: "Rome, Italy",
        locationDescription:
          "An oval amphitheatre in the centre of the city of Rome, Italy. Largest ancient amphitheatre ever built, and is still the largest standing amphitheater in the world today.",
        locationPhone: "+39 06 3996 7700",
        locationEmail: "info@colosseo.it",
        locationContactName: "Tour Information",
        locationKeywords: "ancient, amphitheater, landmark"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Machu Picchu",
        locationAddress: "Cusco Region, Peru"
      },
      update: {},
      create: {
        locationName: "Machu Picchu",
        locationAddress: "Cusco Region, Peru",
        locationDescription:
          "An Incan city set high in the Andes Mountains in Peru, above the Urubamba River valley, built in the 15th century and later abandoned.",
        locationPhone: "+51 84 582030",
        locationEmail: "info@machupicchu.gob.pe",
        locationContactName: "Tourist Information",
        locationKeywords: "ancient, ruins, Incan"
      }
    }),
    prisma.location.upsert({
      where: {
        locationName: "Taj Mahal",
        locationAddress: "Agra, Uttar Pradesh, India"
      },
      update: {},
      create: {
        locationName: "Taj Mahal",
        locationAddress: "Agra, Uttar Pradesh, India",
        locationDescription:
          "An ivory-white marble mausoleum on the right bank of the Yamuna river. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.",
        locationPhone: "+91 562 222 7261",
        locationEmail: "info@tajmahal.gov.in",
        locationContactName: "Visitor Services",
        locationKeywords: "mausoleum, marble, iconic"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Epic Sound Studios" },
      update: {},
      create: {
        vendorName: "Epic Sound Studios",
        vendorAddress: "123 Audio Ave, Sound City, SC",
        vendorDescription:
          "High-quality recording studios with state-of-the-art equipment for all your audio production needs.",
        vendorPhone: "555-0100",
        vendorEmail: "contact@epicsoundstudios.com",
        vendorContactName: "Avery Soundmaker",
        vendorKeywords: "recording, studio, audio, music production"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Global Film Equipment" },
      update: {},
      create: {
        vendorName: "Global Film Equipment",
        vendorAddress: "456 Camera Blvd, Gear Town, GT",
        vendorDescription:
          "Providing the latest in film production equipment, cameras, lighting, and more.",
        vendorPhone: "555-0200",
        vendorEmail: "info@globalfilmequipment.com",
        vendorContactName: "Casey Gearloose",
        vendorKeywords: "film, equipment, cameras, lighting"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Lighting Pros LLC" },
      update: {},
      create: {
        vendorName: "Lighting Pros LLC",
        vendorAddress: "789 Lumens Lane, Bright City, BC",
        vendorDescription:
          "Expert lighting solutions for film, photography, and live events. From LEDs to spotlights, we have it all.",
        vendorPhone: "555-0300",
        vendorEmail: "sales@lightingprosllc.com",
        vendorContactName: "Lucy Lumens",
        vendorKeywords: "lighting, film, photography, LED, spotlights"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Rigging Experts" },
      update: {},
      create: {
        vendorName: "Rigging Experts",
        vendorAddress: "1010 Gear Ave, Rig Town, RT",
        vendorDescription:
          "Specializing in rigging equipment and safety gear for high-angle and complex shoots.",
        vendorPhone: "555-0400",
        vendorEmail: "help@riggingexperts.com",
        vendorContactName: "Ricky Rigger",
        vendorKeywords: "rigging, safety, equipment"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "CineCostumes" },
      update: {},
      create: {
        vendorName: "CineCostumes",
        vendorAddress: "1212 Dress Up Drive, Costume City, CC",
        vendorDescription:
          "Offering a wide range of costumes and wardrobe services for film and theater productions.",
        vendorPhone: "555-0500",
        vendorEmail: "info@cinecostumes.com",
        vendorContactName: "Wendy Wardrobe",
        vendorKeywords: "costumes, wardrobe, film, theater"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "ProProps" },
      update: {},
      create: {
        vendorName: "ProProps",
        vendorAddress: "1313 Prop St, Propville, PV",
        vendorDescription:
          "Your one-stop shop for production props, from historical pieces to futuristic gadgets.",
        vendorPhone: "555-0600",
        vendorEmail: "contact@proprops.com",
        vendorContactName: "Peter Propman",
        vendorKeywords: "props, production, film, theater"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "SetBuilders Inc." },
      update: {},
      create: {
        vendorName: "SetBuilders Inc.",
        vendorAddress: "1414 Set Piece Rd, Scenery City, SC",
        vendorDescription:
          "Crafting immersive sets for film, television, and stage productions. Custom designs available.",
        vendorPhone: "555-0700",
        vendorEmail: "projects@setbuildersinc.com",
        vendorContactName: "Sammy Setpiece",
        vendorKeywords: "sets, building, design, film, television, stage"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Makeup Masters Studio" },
      update: {},
      create: {
        vendorName: "Makeup Masters Studio",
        vendorAddress: "1515 Makeover Blvd, Beauty Town, BT",
        vendorDescription:
          "Professional makeup services for film, TV, and special events. Special effects makeup available.",
        vendorPhone: "555-0800",
        vendorEmail: "bookings@makeupmastersstudio.com",
        vendorContactName: "Mandy Makeup",
        vendorKeywords: "makeup, special effects, film, TV"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Soundscapes Audio Tech" },
      update: {},
      create: {
        vendorName: "Soundscapes Audio Tech",
        vendorAddress: "1616 Echo Ave, Sound City, SC",
        vendorDescription:
          "Advanced audio tech solutions, from field recording equipment to studio sound engineering.",
        vendorPhone: "555-0900",
        vendorEmail: "support@soundscapesaudiotech.com",
        vendorContactName: "Audrey Audio",
        vendorKeywords: "audio, sound, recording, engineering"
      }
    }),
    prisma.vendor.upsert({
      where: { vendorName: "Visual Effects Visionaries" },
      update: {},
      create: {
        vendorName: "Visual Effects Visionaries",
        vendorAddress: "1717 VFX Blvd, Digital City, DC",
        vendorDescription:
          "Leading the way in digital and practical visual effects for film and television. Bring your vision to life with us.",
        vendorPhone: "555-1000",
        vendorEmail: "inquiries@vfxvisionaries.com",
        vendorContactName: "Vicky VFX",
        vendorKeywords:
          "VFX, digital effects, practical effects, film, television"
      }
    }),
    prisma.actor.createMany({
      data: [
        {
          name: "Alex Smith",
          image: "alex_smith.jpg",
          email: "alex.smith@email.com",
          phone: "+1234567890",
        },
        {
          name: "Jordan Blue",
          image: "jordan_blue.jpg",
          email: "jordan.blue@email.com",
          phone: "+0987654321",
        },
        {
          name: "Chris Green",
          image: "chris_green.jpg",
          email: "chris.green@email.com",
          phone: "+1122334455",
        },
        {
          name: "Taylor White",
          image: "taylor_white.jpg",
          email: "taylor.white@email.com",
          phone: "+1223344556",
        },
        {
          name: "Sam Paterson",
          image: "sam_paterson.jpg",
          email: "sam.paterson@email.com",
          phone: "+1445566778",
        },
        {
          name: "Casey Johnson",
          image: "casey_johnson.jpg",
          email: "casey.johnson@email.com",
          phone: "+1667788990",
        },
        {
          name: "Morgan Bailey",
          image: "morgan_bailey.jpg",
          email: "morgan.bailey@email.com",
          phone: "+1778899001",
        },
        {
          name: "Jamie Parker",
          image: "jamie_parker.jpg",
          email: "jamie.parker@email.com",
          phone: "+1889900112",
        },
        {
          name: "Alexis King",
          image: "alexis_king.jpg",
          email: "alexis.king@email.com",
          phone: "+1990011223",
        },
        {
          name: "Taylor Reed",
          image: "taylor_reed.jpg",
          email: "taylor.reed@email.com",
          phone: "+1011121314",
        }
      ],
      skipDuplicates: true,
    }),
  ])
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
