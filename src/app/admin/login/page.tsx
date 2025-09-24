'use client';

import { useAuth } from '@/contexts/AuthContext';
import { cn, isValidEmail } from '@/lib/utils';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login, isLoading } = useAuth();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});

	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loginError, setLoginError] = useState<string>('');

	const redirectTo = searchParams.get('redirect') || '/admin/dashboard';

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {};

		if (!formData.email.trim()) {
			errors.email = 'Vui lòng nhập email';
		} else if (!isValidEmail(formData.email)) {
			errors.email = 'Email không hợp lệ';
		}

		if (!formData.password.trim()) {
			errors.password = 'Vui lòng nhập mật khẩu';
		} else if (formData.password.length < 6) {
			errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);
		setLoginError('');

		try {
			await login(formData);
			router.push(redirectTo);
		} catch (error) {
			setLoginError(error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		// Clear field error when user starts typing
		if (formErrors[field]) {
			setFormErrors((prev) => ({ ...prev, [field]: '' }));
		}

		// Clear login error
		if (loginError) {
			setLoginError('');
		}
	};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='flex flex-col items-center space-y-4'>
					<Loader2 className='h-8 w-8 animate-spin text-blue-600' />
					<p className='text-gray-600'>Đang kiểm tra xác thực...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				{/* Header */}
				<div className='text-center'>
					<Link href='/' className='inline-block'>
						<h1 className='text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors'>
							Portfolio Admin
						</h1>
					</Link>
					<h2 className='mt-6 text-2xl font-semibold text-gray-900'>Đăng nhập quản trị</h2>
					<p className='mt-2 text-sm text-gray-600'>Truy cập vào bảng điều khiển quản trị website</p>
				</div>

				{/* Login Form */}
				<div className='bg-white py-8 px-6 shadow-lg rounded-lg'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						{/* Global Error Message */}
						{loginError && (
							<div className='bg-red-50 border border-red-200 rounded-md p-4'>
								<div className='flex items-center'>
									<AlertCircle className='h-5 w-5 text-red-400 mr-3' />
									<span className='text-sm text-red-800'>{loginError}</span>
								</div>
							</div>
						)}

						{/* Email Field */}
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
								Email
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' />
								</div>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									className={cn(
										'block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
										formErrors.email
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300'
									)}
									placeholder='admin@example.com'
									value={formData.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
								/>
							</div>
							{formErrors.email && <p className='mt-1 text-sm text-red-600'>{formErrors.email}</p>}
						</div>

						{/* Password Field */}
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
								Mật khẩu
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' />
								</div>
								<input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									autoComplete='current-password'
									required
									className={cn(
										'block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
										formErrors.password
											? 'border-red-300 focus:ring-red-500 focus:border-red-500'
											: 'border-gray-300'
									)}
									placeholder='Nhập mật khẩu'
									value={formData.password}
									onChange={(e) => handleInputChange('password', e.target.value)}
								/>
								<button
									type='button'
									className='absolute inset-y-0 right-0 pr-3 flex items-center'
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-600' />
									) : (
										<Eye className='h-5 w-5 text-gray-400 hover:text-gray-600' />
									)}
								</button>
							</div>
							{formErrors.password && <p className='mt-1 text-sm text-red-600'>{formErrors.password}</p>}
						</div>

						{/* Remember Me */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember-me'
									name='remember-me'
									type='checkbox'
									className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
									checked={formData.rememberMe}
									onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
								/>
								<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
									Ghi nhớ đăng nhập
								</label>
							</div>

							<div className='text-sm'>
								<button
									type='button'
									className='font-medium text-blue-600 hover:text-blue-500 transition-colors'
									onClick={() => {
										// TODO: Implement forgot password
										alert('Tính năng quên mật khẩu sẽ được bổ sung sau');
									}}
								>
									Quên mật khẩu?
								</button>
							</div>
						</div>

						{/* Submit Button */}
						<div>
							<button
								type='submit'
								disabled={isSubmitting}
								className={cn(
									'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors',
									isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
								)}
							>
								{isSubmitting ? (
									<>
										<Loader2 className='h-4 w-4 mr-2 animate-spin' />
										Đang đăng nhập...
									</>
								) : (
									'Đăng nhập'
								)}
							</button>
						</div>
					</form>

					{/* Footer Links */}
					<div className='mt-6 text-center'>
						<Link href='/' className='text-sm text-gray-600 hover:text-blue-600 transition-colors'>
							← Quay về trang chủ
						</Link>
					</div>
				</div>

				{/* Demo Credentials */}
				{process.env.NODE_ENV === 'development' && (
					<div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
						<h3 className='text-sm font-medium text-yellow-800 mb-2'>Tài khoản demo:</h3>
						<div className='text-sm text-yellow-700 space-y-1'>
							<p>Email: admin@demo.com</p>
							<p>Mật khẩu: admin123</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
