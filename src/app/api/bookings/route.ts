
import { NextResponse } from 'next/server';
import connectToMongo from '@/lib/mongodb';
import Booking from '@/models/Bookings';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received booking data:', data); // Debug log

    await connectToMongo();
    const booking = await Booking.create(data);
    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err: any) {
    console.error('Detailed booking error:', {
      message: err.message,
      stack: err.stack,
      data: err
    });
    return NextResponse.json({ 
      success: false, 
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    }, { status: 400 });
  }
}
