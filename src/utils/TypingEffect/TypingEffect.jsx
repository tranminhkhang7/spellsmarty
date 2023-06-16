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
    }, 10);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return (
    <div className="text-white text-base md:text-lg sm:text-sm splash-text p-5 whitespace-pre-line">
      {displayText}
    </div>
  );
};

export default TypingEffect;
