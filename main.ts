import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import {
  createSingleIconResponse,
  createImgIconResponse,
  createMarkerResponse,
  createMulipleIconResponse
} from "./icon-marker.tsx";
import { iconMarkerSchema, iconMetadataSchema } from "./types.ts";
import { test } from "./test.tsx";



serve(async (request) => {
  const url = new URL(request.url);
  if (url.pathname === '/test') {
    return new Response(test(), {
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      }
    })
  }
  const searchParams = url.searchParams;
  const obj = Object.fromEntries(searchParams.entries())
  const params = iconMarkerSchema.parse(obj)
  console.log(params)
  if (params.type === 'plain') {
    return createMarkerResponse(params)
  } else if (params.type === 'img') {
    return createImgIconResponse(
      params
    );
  }

  const icon = await getIconMetadata(params.icon);
  if (!params.selected) {
    return createSingleIconResponse(
      params,
      icon,
    );
  } else {
    const opt1 = {...params};
    const opt2 = {...params, fillColor: "#123456"}
    return createMultipleIconResponse(
      [opt1, opt2],
      icon,
    );
  }
});

async function getIconMetadata(icon: string) {
  const [set, iconName] = icon.split(":");
  const icons = await fetch(
    `https://api.iconify.design/${set}.json?icons=${iconName}`
  ).then((res) => res.json());
  const metadata = icons.icons[iconName]
  metadata.width ??= icons.width ?? 24
  metadata.height ??= icons.height ?? 24
  return iconMetadataSchema.parse(metadata)
}
