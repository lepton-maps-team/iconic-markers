import React, { createElement as h } from "https://esm.sh/react@18.2.0";
import ReactDOM, {
  renderToString,
} from "https://esm.sh/react-dom@18.2.0/server";

function Marker({ src }: { src: string }) {
  return (
    <div className="relative bg-slate-200 h-48 flex flex-col items-center justify-center">
      <img src={src} />
      <button
        className="absolute top-0 right-0 p-1 bg-transparent hover:bg-slate-400 cursor-pointer"
        data-src={src}
      >
        📋
      </button>
      {/* <div className="font-mono">{src}</div> */}
    </div>
  );
}

export function test() {
  return renderToString(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div className="grid grid-cols-4 gap-2 items-center place-center">
          <Marker src="/" />
          <Marker src="/?fillColor=ff0000" />
          <Marker src="/?fillColor=FB923C&strokeColor=78350F" />
          <Marker src="/?fillColor=FB923C&strokeColor=78350F&strokeWidth=2" />
          <Marker src="/?iconColor=ff0000" />
          <Marker src="/?iconColor=ff0000" />
          <Marker src="/?iconColor=ff0000" />
          <Marker src="/?iconColor=ff0000" />
          <Marker src="/?iconColor=ff0000" />
          <Marker src="/?iconColor=ff0000" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.querySelectorAll('button[data-src]').forEach((button) => {
                console.log(button)
                button.addEventListener('click', () => {
                  const src = button.dataset.src;
                  navigator.clipboard.writeText(src);
                })
              })
          `,
          }}
        ></script>
      </body>
    </html>
  );
}
