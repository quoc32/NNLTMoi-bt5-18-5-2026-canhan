import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = new Date(targetDate) - new Date();
            
            if (difference <= 0) {
                clearInterval(timer);
            } else {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60))),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-3">
            {[
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl">
                        {String(item.value).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] text-indigo-100 uppercase font-bold mt-1 tracking-wider">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Countdown;
