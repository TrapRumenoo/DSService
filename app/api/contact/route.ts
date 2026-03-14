import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      message,
      marketing,
    } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 },
      );
    }

    const client = await pool.connect();
    try {
      const text = `
        INSERT INTO contacts
          (first_name, last_name, phone, email, message, marketing, created_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id
      `;
      const values = [
        firstName,
        lastName,
        phone || null,
        email,
        message,
        Boolean(marketing),
      ];

      const result = await client.query(text, values); // query parametrizzata[web:101]
      const insertedId = result.rows[0]?.id;

      return NextResponse.json({ ok: true, id: insertedId }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: 'Errore interno server' },
      { status: 500 },
    );
  }
}
