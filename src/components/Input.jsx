import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    isMandatory = false,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            <div>
                {isMandatory && <span className='text-red-500'>*</span>}

                {label && <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}>
                    {label}
                </label>
                }
            </div>
            <input
                type={type}
                className={`px-3 py-2 rounded-lg dark:focus:bg-[#222F3E] bg-white dark:bg-[#222F3E] dark:text-gray-300 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 dark:border-[#222F3E] shadow dark:shadow-xl w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input