import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { createProjectSchema } from "~/lib/z";

const todos = [
  ['Pre-Production', 'Script'],
  ['Pre-Production', 'Stripboard'],
  ['Pre-Production', 'Scenechronize Breakdown'],
  ['Pre-Production', 'Performance Agreements'],
  ['Pre-Production', 'Location Agreements'],
  ['Pre-Production', 'Hazardous Activity Form'],
  ['Pre-Production', 'Crew Deal Memos'],
  ['Pre-Production', 'Set Up Schedule'],
  ['Pre-Production', 'Director\'s Breakdown'],
  ['Pre-Production', 'Blocking Overheads'],
  ['Pre-Production', 'Lighting/Camera Diagrams'],
  ['Pre-Production', 'Special Equipment'],
  ['Pre-Production', 'Mood Boards'],
  ['Pre-Production', 'Design Checklist'],
  ['Pre-Production', 'SketchUp Model'],
  ['Pre-Production', 'Final Location Photos'],
  ['Pre-Production', 'Set Dec Mockups'],
  ['Pre-Production', 'Floor Plans'],
  ['Pre-Production', 'Wardrobe Sketches'],
  ['Pre-Production', 'Final Wardrobe Photos'],
  ['Pre-Production', 'Final Prop/SFX/Makeup Photos'],
  ['Pre-Production', 'Correspondence'],

  ['Production', 'Call Sheet and Maps'],
  ['Production', 'Daily Production Reports'],
  ['Production', 'Crew Sign In Sheet'],
  ['Production', 'Cast Sign In Sheet'],
  ['Production', 'Meal Sign In Sheet'],
  ['Production', 'Camera Reports'],
  ['Production', 'Sound Reports'],
  ['Production', 'Script Supervisor Paperwork'],
  ['Production', 'New Deals'],

  ['Post-Production', 'New Deals'],
  ['Post-Production', 'Project Details (website)'],
  ['Post-Production', 'Dailies'],
  ['Post-Production', 'Assembly'],
  ['Post-Production', 'Rough Cut'],
  ['Post-Production', 'Fine Cut'],
  ['Post-Production', 'Picture Lock'],
  ['Post-Production', 'Studio Lock'],
  ['Post-Production', 'VFX'],
  ['Post-Production', 'Sound'],
  ['Post-Production', 'Color'],
  ['Post-Production', 'Marry'],
  ['Post-Production', 'Master'],
  ['Post-Production', 'Festival Delivery'],
  ['Post-Production', 'Trailer'],

  ['Delivery', 'Press Kit Headshots'],
  ['Delivery', 'Press Kit Bios'],
  ['Delivery', 'Poster Template'],
  ['Delivery', 'Poster Graphic Assets'],
  ['Delivery', 'Poster Fonts'],
  ['Delivery', 'Poster PNG/JPEG'],
  ['Delivery', 'Festivals Tab'],
  ['Delivery', 'Media Tab'],
]

export const POST = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: req.auth.user.email
    }
  });
  if (!requester) {
    console.log(req.auth.user.email);
    return NextResponse.json(
      { error: 'impossible...' },
      { status: 500 },
    );
  }

  // throw error if requester is not admin
  if (requester.role !== 1) {
    return NextResponse.json(
      { error: 'You cannot create projects.' },
      { status: 403 },
    );
  }

  const body = await req.json();
  const parsedBody = createProjectSchema.parse(body);
  try {
    await prisma.$transaction(async prisma => {
      const project = await prisma.project.create({
        data: { ...parsedBody }
      });
      for (let p = 0; p < todos.length; p++) {
        await prisma.projectTodo.create({
          data: {
            projectId: project.id,
            name: todos[p][1],
            category: todos[p][0],
          }
        });
      }
    });
    return NextResponse.json(
      { message: "Project added" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  
}) as any;
