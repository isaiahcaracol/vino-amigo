import React, { useEffect } from "react";
import Quagga from "quagga";

const Scanner = props => {
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
          width: '700',
          height: '700'
        },
        numberOfWorkers: 4,
      },
      locate: true,
      decoder: {
        readers: ["ean_reader"]
      }
    }, function (err) {
      if (err) {
        console.log('something is wrong')
        return 
      }
      Quagga.start();
      console.log('scan started')
    })
    Quagga.onDetected(detected);

    return function cleanup() {
      console.log('cleaning up');
      Quagga.stop();
    }
  });

  const detected = result => {
    props.onDetected(result);
  };

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;