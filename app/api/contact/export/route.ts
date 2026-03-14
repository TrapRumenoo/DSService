// app/api/contact/export/route.ts
import pg from 'pg';
import { NextResponse } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        phone,
        email,
        message,
        marketing,
        created_at
      FROM contacts
      ORDER BY created_at DESC
      `,
    );

    const rows = result.rows;

    const header = [
      'id',
      'first_name',
      'last_name',
      'phone',
      'email',
      'message',
      'marketing',
      'created_at',
    ];

    const escapeCsv = (value: unknown): string => {
      if (value === null || value === undefined) return '';
      const s = String(value);
      if (
        s.includes('"') ||
        s.includes(',') ||
        s.includes('\n') ||
        s.includes('\r')
      ) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };

    const lines: string[] = [];
    lines.push(header.join(','));

    for (const row of rows) {
      const line = [
        escapeCsv(row.id),
        escapeCsv(row.first_name),
        escapeCsv(row.last_name),
        escapeCsv(row.phone),
        escapeCsv(row.email),
        escapeCsv(row.message),
        escapeCsv(row.marketing),
        escapeCsv(row.created_at),
      ].join(',');
      lines.push(line);
    }

    const csv = lines.join('\r\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="contacts.csv"',
      },
    });
  } catch (error) {
    console.error('Errore export contatti:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'export dei contatti' },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
