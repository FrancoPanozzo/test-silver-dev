import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import './styles.css';

const formSchema = z.object({
    password: z.string()
        .min(8, 'Must be at least 8 characters')
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    email: z.string().email("Invalid email")
})

function API(data) {
    return new Promise((res) => {
        const isRepeated = data.email === "repeated@gmail.com";
        setTimeout(
            () =>
                res({
                    status: isRepeated ? "ERROR" : "OK",
                    message: isRepeated ? "Email is already taken" : undefined,
                }),
            1000
        );
    });
}

function ErrorField({ error }) {
    return error && <span className="error-message">{error?.message}</span>
}

export default function SignUpForm() {
    const [submissionError, setSubmissionError] = useState()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    async function submitHandler(data) {
        try {
            setSubmissionError(null)
            const res = await API(data)
            if (res.status === 'ERROR') throw new Error(res.message)
            reset()
        } catch (error) {
            setSubmissionError(error.message)
        }
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type='email' {...register('email')} className={errors.email ? 'input-error' : ''} placeholder="your@email.com" />
                <ErrorField error={errors.email} />
            </div>

            <div className="form-field">
                <label htmlFor="password">Password</label>
                <input id="password" type='password' {...register('password')} className={errors.password ? 'input-error' : ''} placeholder="••••••••••••••" />
                <ErrorField error={errors.password} />
            </div>

            <button type='submit' className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Sign Up'}
            </button>

            {submissionError && <div className="submission-error">{submissionError}</div>}
        </form>
    )
}
