'use client';
import React, { useState, useRef, useTransition } from 'react';
import { FiMail, FiGithub, FiUser, FiMessageSquare } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im'; // A cool spinner icon
import { sendEmail } from '../../actions';

const Contact = () => {
    const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
    const [isPending, startTransition] = useTransition(); // Hook for loading state
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
        <div className="animated-gradient-bg -m-10 p-10 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto animate-fadeIn bg-slate-900/40 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8 md:p-12">
                {/* Main grid for two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Information */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                                Get In Touch
                            </h1>
                            <p className="text-lg text-gray-300">
                                Have a question, a project idea, or just want to say hello? I'd love to hear from you.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <a href="mailto:vivekchauhan11mg@gmail.com" className="flex items-center gap-4 text-gray-200 hover:text-cyan-400 transition-colors group">
                                <FiMail className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                                <span className="text-lg">vivekchauhan11mg@gmail.com</span>
                            </a>
                            <a href="https://github.com/chauhanvivek11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-200 hover:text-cyan-400 transition-colors group">
                                <FiGithub className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                                <span className="text-lg">github.com/chauhanvivek11</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div>
                        <form ref={formRef} action={handleFormSubmit} className="space-y-6">
                            {/* Input Field: Name */}
                            <div className="relative">
                                <input required type="text" name="name" id="name" placeholder=" " className="peer w-full pl-10 p-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder-transparent" />
                                <label htmlFor="name" className="absolute left-10 -top-2.5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-cyan-400 peer-focus:text-sm">Full Name</label>
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            {/* Input Field: Email */}
                            <div className="relative">
                                <input required type="email" name="email" id="email" placeholder=" " className="peer w-full pl-10 p-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder-transparent" />
                                <label htmlFor="email" className="absolute left-10 -top-2.5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-cyan-400 peer-focus:text-sm">Email Address</label>
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            {/* Input Field: Message */}
                            <div className="relative">
                                <textarea required name="message" id="message" rows={4} placeholder=" " className="peer w-full pl-10 p-3 bg-slate-800/50 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder-transparent"></textarea>
                                <label htmlFor="message" className="absolute left-10 -top-2.5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-cyan-400 peer-focus:text-sm">Your Message</label>
                                <FiMessageSquare className="absolute left-3 top-4 text-gray-400" />
                            </div>
                            <div>
                                <button type="submit" disabled={isPending} className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center">
                                    {isPending ? <ImSpinner2 className="animate-spin" /> : 'Send Message'}
                                </button>
                            </div>
                            {status && (
                                <p className={`text-center font-semibold ${status.success ? 'text-green-400' : 'text-red-400'}`}>
                                    {status.success || status.error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;