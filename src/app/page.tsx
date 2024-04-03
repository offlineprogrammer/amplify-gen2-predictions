"use client";
import { generateClient } from "aws-amplify/api";
import { type Schema } from "../../amplify/data/resource";
import { getUrl } from "aws-amplify/storage";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import config from "@/../amplifyconfiguration.json";

Amplify.configure(config);

const client = generateClient<Schema>();

export default function Home() {
  const [src, setSrc] = useState("");
  const [file, setFile] = useState("");

  function play() {
    var audio = document.getElementById('a1');
    if (audio) {
      audio.play();
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center  p-24  m-auto ">
      <div className="grid grid-cols-1 gap-4  w-1/2  mx-auto ">
        <div>
          <button
            className="  text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl  "
            onClick={async () => {
              console.log("Synth");
              const { data } = await client.mutations.convertTextToSpeech({
                text: "Welcome to Amplify!",
              });

              setFile(data);
            }}
          >
            Synth
          </button>
        </div>

        <div>
          <button
            className="  text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl  "
            onClick={async () => {
              const res = await getUrl({
                key: file,
                options: {
                  accessLevel: "guest",
                  expiresIn: 60 * 60 * 24,
                },
              });

              console.log(res.url.toString());

              setSrc(res.url.toString());
              play();
            }}
          >
            Fetch audio
          </button>
        </div>
        
     

                <div>
             
                  <a target="_blank"  href={src}><button className=" text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl ">Open File</button></a>
                </div>
      </div>
    </main>
  );
}
