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
        <nav className="bg-black h-12 flex items-center px-4 shadow-md border-b-2 border-gray-700">
            <PlaceholdersAndVanishInput placeholders={["Search"]} onChange={onChange} onSubmit={onSubmit} />
          <ul className="flex space-x-4">
            <li><a href="/dashboard" className="hover:underline">Home</a></li>
            <li><a href="/dashboard/settings" className="hover:underline">Settings</a></li>
            <li><a href="/dashboard/profile" className="hover:underline">Profile</a></li>
          </ul>
        </nav>
    )
}