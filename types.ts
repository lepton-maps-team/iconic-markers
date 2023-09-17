import { z } from "https://deno.land/x/zod/mod.ts";

export const iconMarkerSchema = z
  .object({
    fillColor: z
      .string()
      .optional()
      .default("16A34A")
      .transform((v) => `#${v}`),
    strokeColor: z
      .string()
      .optional()
      .default("auto")
      .transform((v) => (v === "auto" ? "auto" : `#${v}`)),
    strokeWidth: z.coerce.number().optional().default(0.5),
    selectedFillColor: z
      .string()
      .optional()
      .default("16A34A")
      .transform((v) => `#${v}`),
    selected: z.coerce.boolean().optional().default(false)
  })
  .transform((v) => {
    if (v.strokeColor === "auto") {
      v.strokeColor = v.fillColor;
    }
    return v;
  })
  .and(
    z
      .object({
        img: z.string().url(),
        imgColor: z
          .string()
          .optional()
          .default("ffffff")
          .transform((v) => `#${v}`),
        type: z.enum(["img"]).default("img"),
        width: z.number().default(24),
        height: z.number().default(24),
      })
      .or(
        z
          .object({
            icon: z.string().default("ci:dot-05-xl"),
            iconColor: z
              .string()
              .optional()
              .default("ffffff")
              .transform((v) => `#${v}`),
            type: z.enum(["icon"]).default("icon"),
          })
          .or(
            z.object({
              type: z.enum(["plain"]).default("plain"),
            })
          )
      )
  );

export const iconMetadataSchema = z.object({
  body: z.string(),
  width: z.number(),
  height: z.number(),
});

export type IconMetadata = z.infer<typeof iconMetadataSchema>;
export type IconMarkerParams<T> = z.infer<typeof iconMarkerSchema> & {
  type: T;
};
