import React from 'react';
import AnimationContainer from "@/components/global/animation-container";
import MagicBadge from '@/components/ui/magic-badge';

const EnterprisePage = () => {
    const proofItems = [
        {
            type: 'image',
            src: '/videos/a.jpg', // Replace with your image path
            alt: 'Description of image 1'
        },
        {
            type: 'image',
            src: '/videos/b.jpg', // Replace with your image path
            alt: 'Description of image 2'
        },
        {
            type: 'image',
            src: '/videos/c.jpg', // Replace with your video link
            title: 'Description of video'
         },
        {
            type: 'video',
            src: '/videos/d.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/e.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/f.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/g.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/h.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/c.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/k1.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/k2.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/k3.mp4', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'image',
            src: '/videos/k4.jpg', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'image',
            src: '/videos/k5.jpeg', // Replace with your video link
            title: 'Description of video'
        },
        {
            type: 'video',
            src: '/videos/k7.mp4', // Replace with your video link
            title: 'Description of video'
        },
        // {
        //     type: 'image',
        //     src: 'http://localhost:3000/videos/k6.jpeg', // Replace with your video link
        //     title: 'Description of video'
        // },
        // Add more items as needed
    ];

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <MagicBadge title="Proof" />
            <AnimationContainer delay={0.1}>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Proof
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                Here are some proofs from our customers and us.
                </p>
            </AnimationContainer>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {proofItems.map((item, index) => (
                    <div key={index} className="shadow-lg rounded-lg overflow-hidden">
                    {item.type === 'image' ? (
    <img 
        src={item.src} 
        alt={item.alt} 
        width="100%"
        height="500"
        className="w-full h-auto max-w-xs" // Set max width for images
    />
) : (
    <video
    width="100%"
    height="500"
    src={item.src}
    controls  // Adds playback controls
    muted  // Prevents autoplay sound
    playsInline  // Optimizes for inline playback
    className="w-full h-auto max-w-xs"
></video>

)}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnterprisePage;
