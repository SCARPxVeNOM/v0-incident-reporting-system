import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextRequest } from "next/server"

// GET /api/incidents - Get all incidents or filter by user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    const db = await getDb()
    const incidentsCollection = db.collection("incidents")

    const query: any = {}
    if (userId) {
      query.user_id = userId
    }
    if (status) {
      query.status = status
    }

    const incidents = await incidentsCollection
      .find(query)
      .sort({ created_at: -1 })
      .toArray()

    return Response.json(
      incidents.map((incident) => ({
        id: incident._id.toString(),
        user_id: incident.user_id,
        title: incident.title,
        category: incident.category,
        description: incident.description,
        image_url: incident.image_url,
        location: incident.location,
        latitude: incident.latitude,
        longitude: incident.longitude,
        status: incident.status,
        priority: incident.priority,
        assigned_to: incident.assigned_to,
        created_at: incident.created_at instanceof Date 
          ? incident.created_at.toISOString() 
          : incident.created_at,
        updated_at: incident.updated_at instanceof Date 
          ? incident.updated_at.toISOString() 
          : incident.updated_at,
        resolved_at: incident.resolved_at instanceof Date 
          ? incident.resolved_at.toISOString() 
          : incident.resolved_at,
      }))
    )
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/incidents - Create a new incident
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, title, category, description, image_url, location, latitude, longitude } = body

    if (!user_id || !title || !category || !description || !location) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const incidentsCollection = db.collection("incidents")

    // Check for duplicate incidents (same category, location, and date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingIncident = await incidentsCollection.findOne({
      category,
      location,
      created_at: {
        $gte: today,
        $lt: tomorrow,
      },
    })

    if (existingIncident) {
      return Response.json(
        { error: "An incident for this category and location already exists today" },
        { status: 400 }
      )
    }

    const newIncident = {
      user_id,
      title,
      category,
      description,
      image_url: image_url || null,
      location,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      status: "new",
      priority: 1,
      assigned_to: null,
      created_at: new Date(),
      updated_at: new Date(),
      resolved_at: null,
    }

    const result = await incidentsCollection.insertOne(newIncident)

    return Response.json(
      {
        id: result.insertedId.toString(),
        ...newIncident,
      },
      { status: 201 }
    )
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

