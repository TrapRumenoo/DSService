// app/api/contact/route.ts
import pg from 'pg';
import { NextResponse } from 'next/server';

const { Pool } = pg;

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

    // validazione minima
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 },
      );
    }

    const client = await pool.connect();
    let insertedId: number | null = null;

    try {
      const result = await client.query(
        `
        INSERT INTO contacts
          (first_name, last_name, phone, email, message, marketing, created_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id
        `,
        [
          firstName,
          lastName,
          phone || null,
          email,
          message,
          Boolean(marketing),
        ],
      );

      insertedId = result.rows[0]?.id ?? null;
    } finally {
      client.release();
    }

    return NextResponse.json({ ok: true, id: insertedId }, { status: 201 });
  } catch (error) {
    console.error('Errore salvataggio contatto:', error);
    return NextResponse.json(
      { error: 'Errore interno server' },
      { status: 500 },
    );
  }
}
