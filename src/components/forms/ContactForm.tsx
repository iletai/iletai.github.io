'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiClient } from '@/lib/api/client';
import { ContactForm } from '@/lib/types';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';

// =====================================
// Types & Interfaces
// =====================================
interface ContactFormProps {
    className?: string;
    onSubmitSuccess?: (data: ContactForm) => void;
    onSubmitError?: (error: Error) => void;
}

interface FormErrors {
    [key: string]: string | undefined;
}

interface FormState {
    data: ContactForm;
    errors: FormErrors;
    isSubmitting: boolean;
    submitAttempted: boolean;
}

type FormFieldValue = string | boolean;

type FormAction =
    | { type: 'SET_FIELD'; field: keyof ContactForm; value: FormFieldValue }
    | { type: 'SET_ERRORS'; errors: FormErrors }
    | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
    | { type: 'RESET_FORM' }
    | { type: 'SET_SUBMIT_ATTEMPTED'; attempted: boolean };

interface SubmissionStatus {
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
}

interface FieldConstraints {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

// =====================================
// Constants & Configuration
// =====================================
const FORM_CONSTRAINTS: Record<keyof ContactForm, FieldConstraints> = {
    firstName: { required: true, minLength: 1, maxLength: 50 },
    lastName: { required: true, minLength: 1, maxLength: 50 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { maxLength: 20 },
    subject: { required: true },
    message: { required: true, minLength: 10, maxLength: 1000 },
    agreement: { required: true },
} as const;

const INITIAL_FORM_DATA: ContactForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreement: false,
};

const SUBJECT_OPTIONS: { value: string; label: string }[] = [
    { value: 'project', label: 'Thảo luận dự án' },
    { value: 'collaboration', label: 'Hợp tác' },
    { value: 'job', label: 'Cơ hội việc làm' },
    { value: 'consultation', label: 'Tư vấn kỹ thuật' },
    { value: 'other', label: 'Khác' },
];

// =====================================
// Form State Reducer
// =====================================
function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                data: { ...state.data, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: undefined }, // Clear field error
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors };
        case 'SET_SUBMITTING':
            return { ...state, isSubmitting: action.isSubmitting };
        case 'SET_SUBMIT_ATTEMPTED':
            return { ...state, submitAttempted: action.attempted };
        case 'RESET_FORM':
            return {
                data: INITIAL_FORM_DATA,
                errors: {},
                isSubmitting: false,
                submitAttempted: false,
            };
        default:
            return state;
    }
}

// =====================================
// Validation Utilities
// =====================================
const validateField = (field: keyof ContactForm, value: FormFieldValue): string | undefined => {
    const constraints = FORM_CONSTRAINTS[field];

    if (constraints?.required && (!value || (typeof value === 'string' && !value.trim()))) {
        return getFieldErrorMessage(field, 'required');
    }

    if (typeof value === 'string' && value.trim()) {
        if (constraints?.minLength && value.trim().length < constraints.minLength) {
            return getFieldErrorMessage(field, 'minLength', constraints.minLength);
        }

        if (constraints?.maxLength && value.trim().length > constraints.maxLength) {
            return getFieldErrorMessage(field, 'maxLength', constraints.maxLength);
        }

        if (constraints?.pattern && !constraints.pattern.test(value)) {
            return getFieldErrorMessage(field, 'pattern');
        }
    }

    return undefined;
};

const getFieldErrorMessage = (field: keyof ContactForm, type: string, value?: number): string => {
    const messages: Record<string, Record<string, string>> = {
        firstName: {
            required: 'Tên là bắt buộc',
            maxLength: `Tên không được vượt quá ${value} ký tự`,
        },
        lastName: {
            required: 'Họ là bắt buộc',
            maxLength: `Họ không được vượt quá ${value} ký tự`,
        },
        email: {
            required: 'Email là bắt buộc',
            pattern: 'Email không hợp lệ',
        },
        phone: {
            maxLength: `Số điện thoại không được vượt quá ${value} ký tự`,
        },
        subject: {
            required: 'Chủ đề là bắt buộc',
        },
        message: {
            required: 'Tin nhắn là bắt buộc',
            minLength: `Tin nhắn phải có ít nhất ${value} ký tự`,
            maxLength: `Tin nhắn không được vượt quá ${value} ký tự`,
        },
        agreement: {
            required: 'Bạn phải đồng ý với chính sách bảo mật và điều khoản sử dụng',
        },
    };

    return messages[field]?.[type] || 'Dữ liệu không hợp lệ';
};

const validateForm = (data: ContactForm): FormErrors => {
    const errors: FormErrors = {};

    (Object.keys(FORM_CONSTRAINTS) as Array<keyof ContactForm>).forEach(field => {
        const value = data[field];
        if (value !== undefined) {
            const error = validateField(field, value);
            if (error) {
                errors[field] = error;
            }
        }
    });

    return errors;
};

// =====================================
// Main Component
// =====================================
export default function ContactFormComponent({
    className = '',
    onSubmitSuccess,
    onSubmitError
}: ContactFormProps) {
    const [formState, dispatch] = useReducer(formReducer, {
        data: INITIAL_FORM_DATA,
        errors: {},
        isSubmitting: false,
        submitAttempted: false,
    });

    const [status, setStatus] = useState<SubmissionStatus>({ type: 'idle' });
    const formRef = useRef<HTMLFormElement>(null);

    // =====================================
    // Memoized Values
    // =====================================
    const isFormValid = useMemo(() => {
        return Object.keys(validateForm(formState.data)).length === 0;
    }, [formState.data]);

    const characterCount = useMemo(() => {
        return formState.data.message.length;
    }, [formState.data.message]);

    const isFormDirty = useMemo(() => {
        return JSON.stringify(formState.data) !== JSON.stringify(INITIAL_FORM_DATA);
    }, [formState.data]);

    // =====================================
    // Event Handlers
    // =====================================
    const handleFieldChange = useCallback((
        field: keyof ContactForm,
        value: FormFieldValue
    ) => {
        dispatch({ type: 'SET_FIELD', field, value });

        // Real-time validation for better UX
        if (formState.submitAttempted) {
            const error = validateField(field, value);
            if (error !== formState.errors[field]) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: { ...formState.errors, [field]: error }
                });
            }
        }
    }, [formState.submitAttempted, formState.errors]);

    const handleInputChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        handleFieldChange(name as keyof ContactForm, fieldValue);
    }, [handleFieldChange]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch({ type: 'SET_SUBMIT_ATTEMPTED', attempted: true });

        const errors = validateForm(formState.data);

        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', errors });
            setStatus({
                type: 'error',
                message: Object.values(errors).join('. '),
            });

            // Focus first error field for accessibility
            const firstErrorField = Object.keys(errors)[0];
            const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
            element?.focus();

            return;
        }

        dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
        setStatus({ type: 'loading' });

        try {
            await apiClient.sendContactForm(formState.data);

            setStatus({
                type: 'success',
                message: 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi trong vòng 24 giờ.',
            });

            dispatch({ type: 'RESET_FORM' });
            onSubmitSuccess?.(formState.data);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.';

            console.error('Contact form submission error:', error);
            setStatus({
                type: 'error',
                message: errorMessage,
            });

            onSubmitError?.(error instanceof Error ? error : new Error(errorMessage));
        } finally {
            dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
        }
    }, [formState.data, onSubmitSuccess, onSubmitError]);

    // =====================================
    // Render Helpers
    // =====================================
    const renderStatus = () => {
        if (status.type === 'idle') return null;

        const icons = {
            loading: <Loader2 className="h-4 w-4 animate-spin" />,
            success: <CheckCircle className="h-4 w-4" />,
            error: <AlertCircle className="h-4 w-4" />,
        };

        const badgeVariants = {
            loading: 'default',
            success: 'default',
            error: 'destructive',
        };

        const colors = {
            loading: 'bg-blue-50 text-blue-800 border-blue-200',
            success: 'bg-green-50 text-green-800 border-green-200',
            error: 'bg-red-50 text-red-800 border-red-200',
        };

        return (
            <div
                className={`p-4 rounded-lg border flex items-start ${colors[status.type]} mb-6`}
                role="alert"
                aria-live="polite"
            >
                <div className="flex-shrink-0 mr-3 mt-0.5">
                    {icons[status.type]}
                </div>
                <div>
                    <Badge variant={badgeVariants[status.type] as 'default' | 'destructive'} className="mb-2">
                        {status.type === 'loading' && 'Đang gửi tin nhắn...'}
                        {status.type === 'success' && 'Gửi thành công!'}
                        {status.type === 'error' && 'Có lỗi xảy ra'}
                    </Badge>
                    {status.message && (
                        <p className="text-sm mt-1">{status.message}</p>
                    )}
                </div>
            </div>
        );
    };



    // =====================================
    // Main Render
    // =====================================
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Gửi tin nhắn</CardTitle>
            </CardHeader>
            <CardContent>
                {renderStatus()}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact-firstName">
                                Tên <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="contact-firstName"
                                name="firstName"
                                value={formState.data.firstName}
                                onChange={handleInputChange}
                                placeholder="Nhập tên của bạn"
                                disabled={formState.isSubmitting}
                                className={formState.errors.firstName ? 'border-red-300' : ''}
                            />
                            {formState.errors.firstName && (
                                <p className="text-sm text-red-600">{formState.errors.firstName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-lastName">
                                Họ <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="contact-lastName"
                                name="lastName"
                                value={formState.data.lastName}
                                onChange={handleInputChange}
                                placeholder="Nhập họ của bạn"
                                disabled={formState.isSubmitting}
                                className={formState.errors.lastName ? 'border-red-300' : ''}
                            />
                            {formState.errors.lastName && (
                                <p className="text-sm text-red-600">{formState.errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-email">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="contact-email"
                            name="email"
                            type="email"
                            value={formState.data.email}
                            onChange={handleInputChange}
                            placeholder="youremail@email.com"
                            disabled={formState.isSubmitting}
                            className={formState.errors.email ? 'border-red-300' : ''}
                        />
                        {formState.errors.email && (
                            <p className="text-sm text-red-600">{formState.errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-phone">Số điện thoại</Label>
                        <Input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={formState.data.phone}
                            onChange={handleInputChange}
                            placeholder="+84 xxx xxx xxx"
                            disabled={formState.isSubmitting}
                            className={formState.errors.phone ? 'border-red-300' : ''}
                        />
                        {formState.errors.phone && (
                            <p className="text-sm text-red-600">{formState.errors.phone}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-subject">
                            Chủ đề <span className="text-red-500">*</span>
                        </Label>
                        <select
                            id="contact-subject"
                            name="subject"
                            value={formState.data.subject}
                            onChange={handleInputChange}
                            disabled={formState.isSubmitting}
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${formState.errors.subject ? 'border-red-300' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Chọn chủ đề</option>
                            {SUBJECT_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formState.errors.subject && (
                            <p className="text-sm text-red-600">{formState.errors.subject}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-message">
                            Tin nhắn <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="contact-message"
                            name="message"
                            rows={5}
                            value={formState.data.message}
                            onChange={handleInputChange}
                            placeholder="Hãy chia sẻ chi tiết về dự án hoặc ý tưởng của bạn..."
                            disabled={formState.isSubmitting}
                            className={formState.errors.message ? 'border-red-300' : ''}
                            maxLength={FORM_CONSTRAINTS.message?.maxLength}
                        />
                        <div className="flex justify-between items-center">
                            {formState.errors.message && (
                                <p className="text-sm text-red-600">{formState.errors.message}</p>
                            )}
                            <p className="text-sm text-gray-500 ml-auto">
                                {formState.data.message.length}/{FORM_CONSTRAINTS.message?.maxLength}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <input
                            id="contact-agreement"
                            name="agreement"
                            type="checkbox"
                            checked={formState.data.agreement}
                            onChange={handleInputChange}
                            disabled={formState.isSubmitting}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                        />
                        <Label htmlFor="contact-agreement" className="text-sm">
                            Tôi đồng ý với{' '}
                            <a href="/privacy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                chính sách bảo mật
                            </a>{' '}
                            và{' '}
                            <a href="/terms" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                điều khoản sử dụng
                            </a>
                            {' '}<span className="text-red-500">*</span>
                        </Label>
                    </div>
                    {formState.errors.agreement && (
                        <p className="text-sm text-red-600">{formState.errors.agreement}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="w-full"
                    >
                        {formState.isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Đang gửi...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4 mr-2" />
                                Gửi tin nhắn
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
