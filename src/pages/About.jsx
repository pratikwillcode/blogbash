import Container from "../components/container/Container";
import Animator from "../components/Animator";
function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Animator>
                <Container>
                    <div className="text-center px-8">
                        <h1 className="text-4xl font-bold mb-4">About Us</h1>
                        <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
                            Welcome to BlogBash, your go-to destination for fresh perspectives, insightful commentary, and lively discussions on the latest happenings around the globe. At BlogBash, we believe in the power of storytelling and the importance of fostering an inclusive community where voices from all walks of life are heard and valued.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
                            Our mission is simple: to provide a platform for individuals like you to express your thoughts, share your experiences, and engage in meaningful conversations about the world we live in. Whether you're passionate about politics, technology, culture, travel, or anything in between, BlogBash is the place to be.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
                            What sets us apart is our commitment to diversity, authenticity, and quality. We welcome bloggers of all backgrounds and viewpoints, encouraging a rich tapestry of perspectives that reflects the complexity of our world. From seasoned writers to aspiring wordsmiths, everyone has a place at BlogBash.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
                            So, join us at BlogBash and let your voice be heard. Together, we'll explore the world, one blog post at a time. Welcome to the conversation. Welcome to BlogBash.
                        </p>


                    </div>
                    <div className="w-full px-8  flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4 max-sm:flex max-sm:flex-col max-sm:items-center"><span>Our Team</span> <span className=" text-sm font-normal">actually its just me.😉</span></h2>
                        <div className="flex flex-wrap -mx-4 ">
                            {/* Replace with actual team members */}
                            {['Pratik Awari'].map((name, index) => (
                                <div key={index} className=" w-48 mb-4">
                                    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 text-center">
                                        <div className="mb-4">
                                            {/* Replace with actual image */}
                                            <img src="/profile_pic_resized.png" alt={name} className="mx-auto rounded-full w-24 h-24 object-cover" />
                                        </div>
                                        <h3 className="text-xl font-bold">{name}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Owner</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </Container>
            </Animator>
        </div>
    );
}

export default About;