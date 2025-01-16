'use client'

import { PlaceholdersAndVanishInput } from './placeholders-and-vanish-input';

export const Navbar = () => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // handle change
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // handle submit
    }
    return (
        <nav className="bg-primary-black flex p-2 px-4 border-b-2 border-border-gray ">
            <div className='w-2/5'>
                <PlaceholdersAndVanishInput placeholders={["Search"]} onChange={onChange} onSubmit={onSubmit} />
            </div>
        </nav>
    )
}