import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextRequest } from "next/server"

// GET /api/incidents/[id] - Get a specific incident
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid incident ID format" }, { status: 400 })
    }

    const db = await getDb()
    const incidentsCollection = db.collection("incidents")

    const incident = await incidentsCollection.findOne({
      _id: new ObjectId(id),
    })

    if (!incident) {
      return Response.json({ error: "Incident not found" }, { status: 404 })
    }

    return Response.json({
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
    })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/incidents/[id] - Update an incident
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid incident ID format" }, { status: 400 })
    }

    const body = await request.json()
    const db = await getDb()
    const incidentsCollection = db.collection("incidents")

    const updateData: any = {
      updated_at: new Date(),
    }

    if (body.status !== undefined) updateData.status = body.status
    if (body.priority !== undefined) updateData.priority = body.priority
    if (body.assigned_to !== undefined) updateData.assigned_to = body.assigned_to
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.category !== undefined) updateData.category = body.category

    if (body.status === "resolved" && !body.resolved_at) {
      updateData.resolved_at = new Date()
    }

    const result = await incidentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return Response.json({ error: "Incident not found" }, { status: 404 })
    }

    const updatedIncident = await incidentsCollection.findOne({
      _id: new ObjectId(id),
    })

    return Response.json({
      id: updatedIncident!._id.toString(),
      user_id: updatedIncident!.user_id,
      title: updatedIncident!.title,
      category: updatedIncident!.category,
      description: updatedIncident!.description,
      image_url: updatedIncident!.image_url,
      location: updatedIncident!.location,
      latitude: updatedIncident!.latitude,
      longitude: updatedIncident!.longitude,
      status: updatedIncident!.status,
      priority: updatedIncident!.priority,
      assigned_to: updatedIncident!.assigned_to,
      created_at: updatedIncident!.created_at instanceof Date 
        ? updatedIncident!.created_at.toISOString() 
        : updatedIncident!.created_at,
      updated_at: updatedIncident!.updated_at instanceof Date 
        ? updatedIncident!.updated_at.toISOString() 
        : updatedIncident!.updated_at,
      resolved_at: updatedIncident!.resolved_at instanceof Date 
        ? updatedIncident!.resolved_at.toISOString() 
        : updatedIncident!.resolved_at,
    })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/incidents/[id] - Delete an incident
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid incident ID format" }, { status: 400 })
    }

    const db = await getDb()
    const incidentsCollection = db.collection("incidents")

    const result = await incidentsCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return Response.json({ error: "Incident not found" }, { status: 404 })
    }

    return Response.json({ message: "Incident deleted successfully" })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

