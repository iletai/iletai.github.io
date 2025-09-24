import { AuthSession, User } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

// Mock user data - in production, this would come from a database
const MOCK_ADMIN = {
	id: 'admin-1',
	email: 'admin@demo.com',
	password: 'admin123', // In production, this would be hashed
	name: 'Admin User',
	role: 'admin' as const,
	avatar: null,
	createdAt: new Date().toISOString(),
	lastLoginAt: null,
};

// Simple JWT simulation (in production, use proper JWT library)
function generateToken(user: User): string {
	const header = { alg: 'HS256', typ: 'JWT' };
	const now = Math.floor(Date.now() / 1000);
	const payload = {
		sub: user.id,
		email: user.email,
		role: user.role,
		iat: now,
		exp: now + 24 * 60 * 60, // 24 hours
	};

	// In production, use proper JWT signing
	const encodedHeader = btoa(JSON.stringify(header));
	const encodedPayload = btoa(JSON.stringify(payload));
	const signature = btoa(`${encodedHeader}.${encodedPayload}.secret-key`);

	return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, password, rememberMe } = body;

		// Basic validation
		if (!email || !password) {
			return NextResponse.json(
				{
					success: false,
					message: 'Email và mật khẩu không được để trống',
				},
				{ status: 400 }
			);
		}

		// Check credentials (in production, compare with hashed password from database)
		if (email !== MOCK_ADMIN.email || password !== MOCK_ADMIN.password) {
			return NextResponse.json(
				{
					success: false,
					message: 'Email hoặc mật khẩu không chính xác',
				},
				{ status: 401 }
			);
		}

		// Create user object (exclude password)
		const user: User = {
			id: MOCK_ADMIN.id,
			email: MOCK_ADMIN.email,
			name: MOCK_ADMIN.name,
			role: MOCK_ADMIN.role,
			avatar: MOCK_ADMIN.avatar || undefined,
			createdAt: MOCK_ADMIN.createdAt,
			lastLoginAt: new Date().toISOString(),
		};

		// Generate token
		const token = generateToken(user);

		// Create session
		const expiresIn = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day
		const expiresAt = new Date(Date.now() + expiresIn).toISOString();

		const session: AuthSession = {
			user,
			token,
			expiresAt,
		};

		// In production, save session to database or Redis

		return NextResponse.json({
			success: true,
			message: 'Đăng nhập thành công',
			data: {
				user,
				session,
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Lỗi server. Vui lòng thử lại sau.',
			},
			{ status: 500 }
		);
	}
}
