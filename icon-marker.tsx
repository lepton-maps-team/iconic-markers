/** @jsxImportSource https://esm.sh/react@18.2.0 */
import React, { createElement as h } from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";
import { parse } from "https://esm.sh/node-html-parser";
import { Marker } from "./Marker.tsx";
import { IconMarkerParams, IconMetadata } from "./types.ts";

function createElementFromNode(node: any) {
  return h(
    node.tagName.toLowerCase(),
    node.attributes,
    node.childNodes.map(createElementFromNode)
  );
}

export function htmlToJSX(html: string) {
  const root = parse(html);
  return createElementFromNode(root.childNodes[0]);
}

export function createMultipleIconResponse(
  params: IconMarkerParams<"icon">[],
  icon: IconMetadata
) {
  const element = htmlToJSX(icon.body);
  const widthRem = 4;
  const heightRem = widthRem * (icon.height / icon.width);
  return new ImageResponse(
    (
      <div tw="flex flex-row">
        <Marker
          fillColor={params[0].fillColor}
          strokeColor={params[0].strokeColor}
          strokeWidth={params[0].strokeWidth}
        >
          <div
            tw="absolute w-[128px] h-[128px] flex justify-center items-center -top-4"
            style={{
              color: params[0].iconColor,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={widthRem + "rem"}
              height={heightRem + "rem"}
              viewBox={`0 0 ${icon.width} ${icon.height}`}
            >
              {element}
            </svg>
          </div>
        </Marker>
        <Marker
          fillColor={params[1].fillColor}
          strokeColor={params[1].strokeColor}
          strokeWidth={params[1].strokeWidth}
        >
          <div
            tw="absolute w-[128px] h-[128px] flex justify-center items-center -top-4"
            style={{
              color: params[1].iconColor,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={widthRem + "rem"}
              height={heightRem + "rem"}
              viewBox={`0 0 ${icon.width} ${icon.height}`}
            >
              {element}
            </svg>
          </div>
        </Marker>
      </div>
    ),
    {
      height: 128,
      width: 128 * params.length,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    }
  );
}

export function createSingleIconResponse(
  params: IconMarkerParams<"icon">,
  icon: IconMetadata
) {
  const element = htmlToJSX(icon.body);
  const widthRem = 4;
  const heightRem = widthRem * (icon.height / icon.width);
  return new ImageResponse(
    (
      <Marker
        fillColor={params.fillColor}
        strokeColor={params.strokeColor}
        strokeWidth={params.strokeWidth}
      >
        <div
          tw="absolute w-[128px] h-[128px] flex justify-center items-center -top-4"
          style={{
            color: params.iconColor,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={widthRem + "rem"}
            height={heightRem + "rem"}
            viewBox={`0 0 ${icon.width} ${icon.height}`}
          >
            {element}
          </svg>
        </div>
      </Marker>
    ),
    {
      height: 128,
      width: 128,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    }
  );
}

export function createMarkerResponse(params: IconMarkerParams<"plain">) {
  return new ImageResponse(
    (
      <Marker
        fillColor={params.fillColor}
        strokeColor={params.strokeColor}
        strokeWidth={params.strokeWidth}
      >
        <div></div>
      </Marker>
    ),
    {
      height: 128,
      width: 128,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    }
  );
}

export function createIconWithSelectedResponse(
  icon: string,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
  iconColor: string,
  width: number,
  height: number
) {
  const element = htmlToJSX(icon);
  const widthRem = 4;
  const heightRem = widthRem * (height / width);
  return new ImageResponse(
    (
      <Marker
        fillColor={fillColor}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
      >
        <div
          tw="absolute w-[128px] h-[128px] flex justify-center items-center -top-4"
          style={{
            color: iconColor,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={widthRem + "rem"}
            height={heightRem + "rem"}
            viewBox={`0 0 ${width} ${height}`}
          >
            {element}
          </svg>
        </div>
      </Marker>
    ),
    {
      height: 128,
      width: 128,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    }
  );
}

export function createImgIconResponse(params: IconMarkerParams<"img">) {
  return new ImageResponse(
    (
      <Marker
        fillColor={params.fillColor}
        strokeColor={params.strokeColor}
        strokeWidth={params.strokeWidth}
      >
        <div
          tw="absolute w-[128px] h-[128px] flex justify-center items-center -top-4"
          style={{
            color: params.imgColor,
          }}
        >
          <img src={params.img} tw="w-[3rem] h-[3rem]" />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width={widthRem + "rem"}
            height={heightRem + "rem"}
            viewBox={`0 0 ${width} ${height}`}
          >
            {element}
          </svg> */}
        </div>
      </Marker>
    ),
    {
      height: 128,
      width: 128,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    }
  );
}
