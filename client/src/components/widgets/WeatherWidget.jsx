import { useEffect, useRef } from 'react';

const WeatherWidget = () => {
  const weatherWidgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div width="375px!important" ref={weatherWidgetRef}>
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/ru/55d7637d62/moscow/"
        data-label_1="МОСКВА"
        data-font="Roboto"
        data-icons="Climacons Animated"
        data-days="3"
        data-theme="clear"
      ></a>
    </div>
  );
};

export default WeatherWidget;
