import { NextRequest, NextResponse } from 'next/server'
import { getWebsiteContent, saveWebsiteContent, resetWebsiteContent } from '@/lib/content-store'

export async function GET() {
  try {
    const content = getWebsiteContent()
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve website content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid content payload' },
        { status: 400 }
      )
    }

    const updated = saveWebsiteContent(body)
    return NextResponse.json({
      success: true,
      message: 'Website content updated successfully',
      data: updated,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update website content' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  return POST(request)
}

export async function DELETE() {
  try {
    const reset = resetWebsiteContent()
    return NextResponse.json({
      success: true,
      message: 'Website content reset to factory defaults',
      data: reset,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to reset website content' },
      { status: 500 }
    )
  }
}
