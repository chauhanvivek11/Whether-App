import { SiNextdotjs, SiSupabase, SiTailwindcss, SiPostgresql, SiClerk } from 'react-icons/si';
import { FaCloudSun } from 'react-icons/fa';

const About = () => {
    const technologies = [
        { name: 'Next.js', description: 'A powerful React framework for building fast, server-rendered applications.', icon: <SiNextdotjs className="h-12 w-12" /> },
        { name: 'Clerk', description: 'Handles user authentication with a secure, easy-to-implement solution.', icon: <SiClerk className="h-12 w-12" /> },
        { name: 'Supabase', description: 'An open-source Firebase alternative for our database and backend needs.', icon: <SiSupabase className="h-12 w-12" /> },
        { name: 'PostgreSQL', description: 'The powerful, open-source object-relational database system that backs our data.', icon: <SiPostgresql className="h-12 w-12" /> },
        { name: 'Tailwind CSS', description: 'A utility-first CSS framework for rapid and custom UI development.', icon: <SiTailwindcss className="h-12 w-12" /> },
        { name: 'OpenWeatherMap', description: 'Provides the reliable, up-to-date weather data that powers our forecasts.', icon: <FaCloudSun className="h-12 w-12" /> },
    ];

    return (
        <div className="max-w-5xl mx-auto p-4 animate-fadeIn">
            <section className="text-center py-12 md:py-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    About The Weather App
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Welcome to your personal weather dashboard, designed to provide real-time weather information for the cities that matter most to you.
                </p>
            </section>

            <section className="py-16 md:py-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powered by Modern Technology</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="group flex flex-col items-center text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <div className="text-blue-500 dark:text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110">{tech.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{tech.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{tech.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center py-12 md:py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    To create a simple, intuitive, and beautiful tool that makes it easy to stay informed about the weather. We hope you enjoy using it!
                </p>
            </section>
        </div>
    );
}

export default About;