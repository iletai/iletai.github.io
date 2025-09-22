'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ContactForm } from '@/lib/types';
import { apiClient } from '@/lib/api/client';

interface ContactFormProps {
  className?: string;
}

export default function ContactFormComponent({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreement: false,
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) {
      errors.push('Tên là bắt buộc');
    }

    if (!formData.lastName.trim()) {
      errors.push('Họ là bắt buộc');
    }

    if (!formData.email.trim()) {
      errors.push('Email là bắt buộc');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email không hợp lệ');
    }

    if (!formData.subject) {
      errors.push('Chủ đề là bắt buộc');
    }

    if (!formData.message.trim()) {
      errors.push('Tin nhắn là bắt buộc');
    } else if (formData.message.trim().length < 10) {
      errors.push('Tin nhắn phải có ít nhất 10 ký tự');
    }

    if (!formData.agreement) {
      errors.push('Bạn phải đồng ý với chính sách bảo mật và điều khoản sử dụng');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: errors.join('. '),
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      await apiClient.sendContactForm(formData);

      setStatus({
        type: 'success',
        message: 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi trong vòng 24 giờ.',
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreement: false,
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.',
      });
    }
  };

  const renderStatus = () => {
    if (status.type === 'idle') return null;

    const icons = {
      loading: <Loader2 className="h-5 w-5 animate-spin" />,
      success: <CheckCircle className="h-5 w-5" />,
      error: <AlertCircle className="h-5 w-5" />,
    };

    const colors = {
      loading: 'bg-blue-50 text-blue-800 border-blue-200',
      success: 'bg-green-50 text-green-800 border-green-200',
      error: 'bg-red-50 text-red-800 border-red-200',
    };

    return (
      <div className={`p-4 rounded-lg border flex items-start ${colors[status.type]} mb-6`}>
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {icons[status.type]}
        </div>
        <div>
          <p className="font-medium">
            {status.type === 'loading' && 'Đang gửi tin nhắn...'}
            {status.type === 'success' && 'Gửi thành công!'}
            {status.type === 'error' && 'Có lỗi xảy ra'}
          </p>
          {status.message && (
            <p className="text-sm mt-1">{status.message}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h2>

      {renderStatus()}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              Tên *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={status.type === 'loading'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Họ *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={status.type === 'loading'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Nhập họ của bạn"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={status.type === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={status.type === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="+84 xxx xxx xxx"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Chủ đề *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            disabled={status.type === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Chọn chủ đề</option>
            <option value="project">Thảo luận dự án</option>
            <option value="collaboration">Hợp tác</option>
            <option value="job">Cơ hội việc làm</option>
            <option value="consultation">Tư vấn kỹ thuật</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Tin nhắn *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={status.type === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Hãy chia sẻ chi tiết về dự án hoặc ý tưởng của bạn..."
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.message.length}/1000
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="agreement"
            name="agreement"
            type="checkbox"
            checked={formData.agreement}
            onChange={handleInputChange}
            required
            disabled={status.type === 'loading'}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
          />
          <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
            Tôi đồng ý với{" "}
            <a href="/privacy" className="text-blue-600 hover:text-blue-800" target="_blank">
              chính sách bảo mật
            </a>{" "}
            và{" "}
            <a href="/terms" className="text-blue-600 hover:text-blue-800" target="_blank">
              điều khoản sử dụng
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status.type === 'loading' ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Gửi tin nhắn
            </>
          )}
        </button>
      </form>
    </div>
  );
}
