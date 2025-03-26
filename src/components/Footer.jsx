import React from 'react'

const Footer = () => {
    return (
        <div>
            <div>
                <div className='px-4 text-neutral-400 mt-10 md:flex md:flex-row lg:max-w-[75rem] md:items-center md:justify-between flex-col mx-auto pb-[7rem]'>
                    <div className="space-y-3 underline cursor-pointer">
                        <a href="/" class="block hover:underline">FAQ</a>
                        <a href="/" class="block hover:underline">Help Centre</a>
                        <a href="/" class="block hover:underline">Account</a>
                        <a href="/" class="block hover:underline">Media Centre</a>
                    </div>
                    <div className="space-y-3 underline cursor-pointer">
                        <a href="/" class="block hover:underline">Investor Relations</a>
                        <a href="/" class="block hover:underline">Jobs</a>
                        <a href="/" class="block hover:underline">Ways to Watch</a>
                        <a href="/" class="block hover:underline">Terms of Use</a>
                    </div>
                    <div className="space-y-3 underline cursor-pointer">
                        <a href="/" class="block hover:underline">Privacy</a>
                        <a href="/" class="block hover:underline">Cookie Preferences</a>
                        <a href="/" class="block hover:underline">Corporate Information</a>
                        <a href="/" class="block hover:underline">Contact Us</a>
                    </div>
                    <div className="space-y-3 underline cursor-pointer">
                        <a href="/" class="block hover:underline">Speed Test</a>
                        <a href="/" class="block hover:underline">Legal Notices</a>
                        <a href="/" class="block hover:underline">Only on Netflix</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;