import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const formSchema = z.object({
    password: z.string()
        .min(8, 'Must be at least 8 characters')
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    email: z.email("Invalid email")
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
    return error && <span>{error?.message}</span>

}

export default function SignUpForm() {
    const [submissionError, setSubmissionError] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    async function submitHandler(data) {
        console.log(data)
        try {
            setSubmissionError(null)
            const res = await API(data)
            if (res.status === 'ERROR') throw new Error(res.message)
        } catch (error) {
            setSubmissionError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <input type='email' {...register('email')}></input>
            <ErrorField error={errors.email} />
            <input type='password' {...register('password')}></input>
            <ErrorField error={errors.password} />
            <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit'}</button>
            {submissionError && <span>{submissionError}</span>}
        </form>
    )
}
