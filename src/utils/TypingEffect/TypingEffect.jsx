import { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      currentText += text[currentIndex];
      setDisplayText(currentText);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(typingInterval);
      }
    }, 20);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return (
    <div className="text-white text-base md:text-3xl sm:text-sm splash-text p-5">{displayText}</div>
  );
};

export default TypingEffect;
