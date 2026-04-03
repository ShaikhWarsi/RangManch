import { NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1489477135243673755/pVyiXtPw1m7ps33nT3p1-alGET8Hk07lX63sgyB7t5lu6Xze8gdb7hxp7ugErUVm8G4Q';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Discord API Error:', errorText);
      return NextResponse.json({ success: false, error: 'Discord rejected the message' }, { status: response.status });
    }
  } catch (error) {
    console.error('Contact API Internal Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
