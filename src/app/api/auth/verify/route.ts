import { AuthSession, User } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

// Mock user data - same as login route
const MOCK_ADMIN = {
	id: 'admin-1',
	email: 'admin@demo.com',
	name: 'Admin User',
	role: 'admin' as const,
	avatar: null,
	createdAt: new Date().toISOString(),
};

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

function verifyToken(token: string): { valid: boolean; payload?: JwtPayload } {
	try {
		// Simple verification - in production, use proper JWT verification
		const parts = token.split('.');
		if (parts.length !== 3) return { valid: false };

		const payload = JSON.parse(atob(parts[1]));
		const now = Math.floor(Date.now() / 1000);

		// Check if token is expired
		if (payload.exp < now) {
			return { valid: false };
		}

		return { valid: true, payload };
	} catch {
		return { valid: false };
	}
}

export async function GET(request: NextRequest) {
	try {
		const authHeader = request.headers.get('authorization');

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json(
				{
					success: false,
					message: 'Token không hợp lệ',
				},
				{ status: 401 }
			);
		}

		const token = authHeader.substring(7);
		const verification = verifyToken(token);

		if (!verification.valid) {
			return NextResponse.json(
				{
					success: false,
					message: 'Token đã hết hạn hoặc không hợp lệ',
				},
				{ status: 401 }
			);
		}

		// In production, get user from database using payload.sub
		const user: User = {
			id: MOCK_ADMIN.id,
			email: MOCK_ADMIN.email,
			name: MOCK_ADMIN.name,
			role: MOCK_ADMIN.role,
			avatar: MOCK_ADMIN.avatar || undefined,
			createdAt: MOCK_ADMIN.createdAt,
			lastLoginAt: new Date().toISOString(),
		};

		const session: AuthSession = {
			user,
			token,
			expiresAt: verification.payload && typeof verification.payload.exp === 'number'
				? new Date(verification.payload.exp * 1000).toISOString()
				: '',
		};

		return NextResponse.json({
			success: true,
			data: {
				user,
				session,
			},
		});
	} catch (error) {
		console.error('Token verification error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Lỗi server',
			},
			{ status: 500 }
		);
	}
}
