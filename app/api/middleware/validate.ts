import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export function validateBody(schema: z.ZodType<any, any>) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const result = schema.safeParse(body);
      
      if (!result.success) {
        return NextResponse.json(
          { 
            error: 'Invalid input',
            details: result.error.errors 
          },
          { status: 400 }
        );
      }
      
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }
  };
}

export function validateQuery(schema: z.ZodType<any, any>) {
  return async (req: NextRequest) => {
    try {
      const searchParams = new URL(req.url).searchParams;
      const query = Object.fromEntries(searchParams.entries());
      const result = schema.safeParse(query);
      
      if (!result.success) {
        return NextResponse.json(
          { 
            error: 'Invalid query parameters',
            details: result.error.errors 
          },
          { status: 400 }
        );
      }
      
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid query parameters' },
        { status: 400 }
      );
    }
  };
} 