'use client';
import React, { useState, useRef, useTransition } from 'react';
import { FiMail, FiGithub, FiUser, FiMessageSquare } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { sendEmail } from '../../actions';

const Contact = () => {
    const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await sendEmail(formData);
            setStatus(result);
            if (result.success) {
                formRef.current?.reset();
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="space-y-8 text-center md:text-left">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                            Get In Touch
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Have a question, a project idea, or just want to say hello? Fill out the form or use the contact details below.
                        </p>
                    </div>
                    <div className="space-y-4 inline-flex flex-col items-center md:items-start">
                        <a href="mailto:vivekchauhan11mg@gmail.com" className="flex items-center gap-4 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
                            <FiMail className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                            <span className="text-lg">vivekchauhan11mg@gmail.com</span>
                        </a>
                        <a href="https://github.com/chauhanvivek11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
                            <FiGithub className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                            <span className="text-lg">github.com/chauhanvivek11</span>
                        </a>
                    </div>
                </div>
                <div className="p-6 sm:p-8 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg backdrop-blur-md">
                    <form ref={formRef} action={handleFormSubmit} className="space-y-6">
                         {/* Form fields remain the same */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <div className="relative"><FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input required type="text" name="name" id="name" placeholder="Vivek Chauhan" className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500" /></div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <div className="relative"><FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input required type="email" name="email" id="email" placeholder="you@example.com" className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500" /></div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                            <div className="relative"><FiMessageSquare className="absolute left-3 top-4 text-gray-400" /><textarea required name="message" id="message" rows={4} placeholder="Your message..." className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea></div>
                        </div>
                        <div>
                            <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center">{isPending ? <ImSpinner2 className="animate-spin" /> : 'Send Message'}</button>
                        </div>
                        {status && (<p className={`text-center font-semibold ${status.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{status.success || status.error}</p>)}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;