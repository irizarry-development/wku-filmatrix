import { Project } from "@prisma/client"
import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, resourceFound, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createProjectSchema } from "~/lib/z"

const todos = [
  ["Pre-Production", "Script"],
  ["Pre-Production", "Stripboard"],
  ["Pre-Production", "Scenechronize Breakdown"],
  ["Pre-Production", "Performance Agreements"],
  ["Pre-Production", "Location Agreements"],
  ["Pre-Production", "Hazardous Activity Form"],
  ["Pre-Production", "Crew Deal Memos"],
  ["Pre-Production", "Set Up Schedule"],
  ["Pre-Production", "Director's Breakdown"],
  ["Pre-Production", "Blocking Overheads"],
  ["Pre-Production", "Lighting/Camera Diagrams"],
  ["Pre-Production", "Special Equipment"],
  ["Pre-Production", "Mood Boards"],
  ["Pre-Production", "Design Checklist"],
  ["Pre-Production", "SketchUp Model"],
  ["Pre-Production", "Final Location Photos"],
  ["Pre-Production", "Set Dec Mockups"],
  ["Pre-Production", "Floor Plans"],
  ["Pre-Production", "Wardrobe Sketches"],
  ["Pre-Production", "Final Wardrobe Photos"],
  ["Pre-Production", "Final Prop/SFX/Makeup Photos"],
  ["Pre-Production", "Correspondence"],

  ["Production", "Call Sheet and Maps"],
  ["Production", "Daily Production Reports"],
  ["Production", "Crew Sign In Sheet"],
  ["Production", "Cast Sign In Sheet"],
  ["Production", "Meal Sign In Sheet"],
  ["Production", "Camera Reports"],
  ["Production", "Sound Reports"],
  ["Production", "Script Supervisor Paperwork"],
  ["Production", "New Deals"],

  ["Post-Production", "New Deals"],
  ["Post-Production", "Project Details (website)"],
  ["Post-Production", "Dailies"],
  ["Post-Production", "Assembly"],
  ["Post-Production", "Rough Cut"],
  ["Post-Production", "Fine Cut"],
  ["Post-Production", "Picture Lock"],
  ["Post-Production", "Studio Lock"],
  ["Post-Production", "VFX"],
  ["Post-Production", "Sound"],
  ["Post-Production", "Color"],
  ["Post-Production", "Marry"],
  ["Post-Production", "Master"],
  ["Post-Production", "Festival Delivery"],
  ["Post-Production", "Trailer"],

  ["Delivery", "Press Kit Headshots"],
  ["Delivery", "Press Kit Bios"],
  ["Delivery", "Poster Template"],
  ["Delivery", "Poster Graphic Assets"],
  ["Delivery", "Poster Fonts"],
  ["Delivery", "Poster PNG/JPEG"],
  ["Delivery", "Festivals Tab"],
  ["Delivery", "Media Tab"]
]

export const POST = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse;

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  });
  if (!requester)
    return unexpectedError;
  if (requester.role !== 1)
    return forbiddenResponse;

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = createProjectSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  const existing = await prisma.project.findFirst({
    where: {
      OR: [
        { projectName: parsedBody.projectName },
        { projectProductionNumber: parsedBody.projectProductionNumber }
      ]
    }
  })
  if (existing)
    requestConflict("A project with this name or production number already exists");

  try {
    let project: Project
    await prisma.$transaction(async (prisma) => {
      project = await prisma.project.create({
        data: { ...parsedBody }
      })
      for (let p = 0; p < todos.length; p++) {
        await prisma.projectTodo.create({
          data: {
            projectId: project.id,
            name: todos[p][1],
            category: todos[p][0]
          }
        })
      }
    })
    return resourceFound({project: project!});
  } catch (error) {
    return unexpectedError;
  }
}) as any
