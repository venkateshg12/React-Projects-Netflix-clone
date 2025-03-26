import React, { useEffect, useState, useRef } from 'react'

const useHorizontalScroll = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRIght] = useState(false);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const handleScroll = (event) => {
            event.preventDefault();
            element.scrollLeft += event.deltaY;
            updateButtons();
        }

        const updateButtons = () => {
            setCanScrollLeft(element.scrollLeft > 0);
            setCanScrollRIght(element.scrollLeft < element.scrollWidth - element.clientWidth);
        };

        element.addEventListener("wheel", handleScroll, { passive: false });
        element.addEventListener("scroll", updateButtons);

        updateButtons(); // set the initial state

        return () => {
            element.removeEventListener("wheel", handleScroll);
            element.removeEventListener("scroll", updateButtons);
        }
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth * 0.8;
            scrollRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
        }
    };

    return { scrollRef, canScrollLeft, canScrollRight, scroll };
}
export default useHorizontalScroll;