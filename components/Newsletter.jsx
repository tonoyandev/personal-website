import React from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/FormInput'
import Button from '@/components/Button'
import { IoClose } from 'react-icons/io5'

const IntroMessage = () => (
  <div className="prose dark:prose-invert">
    <h3>
      <em>Stay Tuned</em>
    </h3>
    <h6>Want to become a Solidity pro?</h6>
    <small>
      The best articles, links and news related to web development delivered once a week to your
      inbox.
    </small>
  </div>
)

const ErrorMessage = ({ errors, name }) =>
  errors[name] ? (
    <div className="block bg-red-500/5 px-4 py-1 text-xs text-red-500">{errors[name].message}</div>
  ) : null

const SuccessMessage = ({ handleReset }) => (
  <div className="my-6 mx-auto flex max-w-md justify-between bg-omega-800 p-3">
    <span className="text-alpha">Please check your inbox and confirm your email.</span>
    <button onClick={() => handleReset()} className="h-5 w-5 hover:bg-omega-900">
      <IoClose className="mx-auto h-4 w-4 text-omega-500" />
    </button>
  </div>
)

const Newsletter = ({ className }) => {
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = async () => {}

  return (
    <div className={className}>
      <IntroMessage />
      {isSubmitSuccessful ? (
        <SuccessMessage handleReset={reset} />
      ) : (
        <form
          className="relative mx-auto my-6 flex items-start justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mr-3 inline-block grow">
            <FormInput
              disabled={isSubmitting}
              type="text"
              name="email"
              placeholder="hi@example.com"
              aria-label="email address"
              hasError={errors.email}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required.',
                },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: 'Email is invalid.',
                },
              })}
            />
            <div className="absolute bottom-full left-0 z-10">
              <ErrorMessage errors={errors} name="email" />
            </div>
          </div>
          <Button as="button" type="submit" size="xs" disabled={isSubmitting}>
            Subscribe
          </Button>
        </form>
      )}
    </div>
  )
}

export default Newsletter
