import { ChangeEvent, useId } from "react";

export function YourDetailsInputField({type, children, error, value, onChange}: {children: string, type: string, error: string | undefined, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void}) {
    const errorId = useId();

    return (
        <div>
            <label className="block mb-4">
                <span className="block text-sm font-medium mb-1">{children}</span>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    className={`w-full border rounded p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
                ></input>
                {error ? <p id={errorId} role="alert" className="text-sm text-red-600 mt-1">{error}</p> : ''}
            </label>
        </div>
    )
}