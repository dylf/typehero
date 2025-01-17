import { z } from 'zod';
import { createNoProfanitySchemaWithValidate } from '~/utils/antiProfanityZod';

export const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
});

export type ApperenceFormSchema = z.infer<typeof appearanceFormSchema>;

export const profileSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: createNoProfanitySchemaWithValidate((str) => str.max(256)),
  userLinks: z.array(
    z.object({
      id: z.union([z.string(), z.null()]),
      url: z.union([
        createNoProfanitySchemaWithValidate((str) => str.url().max(256)),
        z.literal(''),
      ]),
    }),
  ),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
