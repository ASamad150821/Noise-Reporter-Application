import { ChangeEvent } from "react";

export function YourDetailsInputField({type, children, error, value, onChange}: {children: string, type: string, error: string | undefined, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void}) {

    return (
        <div>
            <label className="block mb-4">
                <span className="block text-sm font-medium mb-1">{children}</span>
                <input type={type} value={value} onChange={onChange} className={`w-full border rounded p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}></input>
                {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : ''}
            </label>
        </div>
    )
}